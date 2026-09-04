import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const required = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_REPOSITORY', 'OAUTH_STATE_SECRET', 'CMS_ORIGIN'];
const values = Object.fromEntries(required.map((name) => [name, process.env[name]?.trim()]));
const missing = required.filter((name) => !values[name]);

if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(values.GITHUB_REPOSITORY)) {
  throw new Error('GITHUB_REPOSITORY must use owner/repository format.');
}
if (values.OAUTH_STATE_SECRET.length < 32) {
  throw new Error('OAUTH_STATE_SECRET must contain at least 32 characters.');
}

const origin = new URL(values.CMS_ORIGIN).origin;
if (new URL(values.CMS_ORIGIN).protocol !== 'https:') {
  throw new Error('CMS_ORIGIN must use HTTPS.');
}

const app = express();
const port = Number(process.env.PORT || process.env.OAUTH_PORT || 3000);
const callbackUrl = `${origin}/api/callback`;
const rateBuckets = new Map();
const distDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

app.disable('x-powered-by');
app.set('trust proxy', 1);

const sign = (value) => crypto.createHmac('sha256', values.OAUTH_STATE_SECRET).update(value).digest('base64url');

const createState = () => {
  const payload = Buffer.from(JSON.stringify({
    timestamp: Date.now(),
    nonce: crypto.randomBytes(18).toString('hex')
  })).toString('base64url');
  return `${payload}.${sign(payload)}`;
};

const validState = (state = '') => {
  try {
    const [payload, signature] = state.split('.');
    if (!payload || !signature) return false;
    const expected = sign(payload);
    if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Date.now() - parsed.timestamp < 10 * 60 * 1000;
  } catch {
    return false;
  }
};

const secure = (_request, response, next) => {
  response.set({
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'none'; script-src 'nonce-afrus-oauth'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  });
  next();
};

const rateLimit = (request, response, next) => {
  const now = Date.now();
  const key = request.ip || request.socket.remoteAddress || 'unknown';
  const bucket = rateBuckets.get(key);
  if (!bucket || now - bucket.startedAt > 15 * 60 * 1000) {
    rateBuckets.set(key, { startedAt: now, count: 1 });
    return next();
  }
  bucket.count += 1;
  if (bucket.count > 60) return response.status(429).send(errorPage('Too many login attempts. Please wait and try again.'));
  next();
};

const escapeHtml = (message) => String(message).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

const errorPage = (message) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>AFRUS Admin Login</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#020617;color:#e2e8f0;font:16px system-ui}.card{max-width:32rem;margin:1rem;padding:2rem;border:1px solid #334155;border-radius:1rem;background:#0f172a;text-align:center}h1{color:#f59e0b}p{line-height:1.6}</style></head><body><main class="card"><h1>Authentication failed</h1><p>${escapeHtml(message)}</p></main></body></html>`;

const githubRequest = (url, token) => fetch(url, {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'AFRUS-CMS-OAuth',
    'X-GitHub-Api-Version': '2022-11-28'
  },
  signal: AbortSignal.timeout(10000)
});

app.use('/api', secure);
app.get('/api/health', (_request, response) => response.json({ ok: true }));

app.get('/api/auth', rateLimit, (_request, response) => {
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', values.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', callbackUrl);
  authorize.searchParams.set('scope', 'repo');
  authorize.searchParams.set('state', createState());
  const handshake = 'authorizing:github';

  response.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>AFRUS GitHub Login</title></head><body><script nonce="afrus-oauth">
    const targetOrigin = ${JSON.stringify(origin)};
    const handshake = ${JSON.stringify(handshake)};
    const authorizeUrl = ${JSON.stringify(authorize.toString())};
    if (!window.opener) {
      document.body.textContent = 'Return to the AFRUS admin portal and start the GitHub login again.';
    } else {
      window.addEventListener('message', (event) => {
        if (event.origin === targetOrigin && event.data === handshake) window.location.assign(authorizeUrl);
      });
      window.opener.postMessage(handshake, targetOrigin);
    }
  </script><p>Connecting to GitHub...</p></body></html>`);
});

app.get('/api/callback', rateLimit, async (request, response) => {
  try {
    if (!request.query.code || !validState(String(request.query.state || ''))) {
      return response.status(400).send(errorPage('Invalid or expired authorization request.'));
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: values.GITHUB_CLIENT_ID,
        client_secret: values.GITHUB_CLIENT_SECRET,
        code: request.query.code,
        redirect_uri: callbackUrl
      }),
      signal: AbortSignal.timeout(10000)
    });
    const result = await tokenResponse.json();
    if (!tokenResponse.ok || !result.access_token) throw new Error(result.error_description || 'GitHub did not return an access token.');

    const repositoryResponse = await githubRequest(`https://api.github.com/repos/${values.GITHUB_REPOSITORY}`, result.access_token);
    const repositoryResult = await repositoryResponse.json();
    const permissions = repositoryResult.permissions || {};
    if (!repositoryResponse.ok || !(permissions.push || permissions.maintain || permissions.admin)) {
      return response.status(403).send(errorPage(`Your GitHub account does not have write access to ${values.GITHUB_REPOSITORY}.`));
    }

    const message = `authorization:github:success:${JSON.stringify({ token: result.access_token, provider: 'github' })}`;
    response.type('html').send(`<!doctype html><html><body><script nonce="afrus-oauth">
      const message = ${JSON.stringify(message)};
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('afrus-oauth');
        channel.postMessage(message);
        channel.close();
      }
      if (window.opener) window.opener.postMessage(message, ${JSON.stringify(origin)});
      window.close();
    </script><p>Authentication complete. You may close this window.</p></body></html>`);
  } catch (error) {
    console.error(error);
    response.status(500).send(errorPage('GitHub authentication failed. Please try again or contact an administrator.'));
  }
});

app.use('/admin', express.static(path.join(distDirectory, 'admin'), {
  etag: true,
  maxAge: 0,
  setHeaders: (response) => response.setHeader('Cache-Control', 'no-cache')
}));
app.use(express.static(distDirectory, { etag: true, maxAge: '7d', index: false }));
app.get('*', (_request, response) => response.sendFile(path.join(distDirectory, 'index.html')));

app.listen(port, () => console.log(`AFRUS LWS application listening on port ${port}`));
