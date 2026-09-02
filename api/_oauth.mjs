import crypto from 'node:crypto';

const required = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_REPOSITORY', 'OAUTH_STATE_SECRET', 'CMS_ORIGIN'];
const rateBuckets = new Map();

export const configuration = () => {
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  const values = Object.fromEntries(required.map((name) => [name, process.env[name].trim()]));
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

  return {
    callbackUrl: `${origin}/api/callback`,
    clientId: values.GITHUB_CLIENT_ID,
    clientSecret: values.GITHUB_CLIENT_SECRET,
    origin,
    repository: values.GITHUB_REPOSITORY,
    stateSecret: values.OAUTH_STATE_SECRET
  };
};

const sign = (value, secret) => crypto.createHmac('sha256', secret).update(value).digest('base64url');

export const createState = (secret) => {
  const payload = Buffer.from(JSON.stringify({
    timestamp: Date.now(),
    nonce: crypto.randomBytes(18).toString('hex')
  })).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
};

export const validState = (state = '', secret) => {
  try {
    const [payload, signature] = state.split('.');
    if (!payload || !signature) return false;
    const expected = sign(payload, secret);
    if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Date.now() - parsed.timestamp < 10 * 60 * 1000;
  } catch {
    return false;
  }
};

export const secure = (response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'nonce-afrus-oauth'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'");
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
};

export const rateLimited = (request) => {
  const now = Date.now();
  const forwarded = String(request.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const key = forwarded || request.socket?.remoteAddress || 'unknown';
  const bucket = rateBuckets.get(key);
  if (!bucket || now - bucket.startedAt > 15 * 60 * 1000) {
    rateBuckets.set(key, { startedAt: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > 60;
};

export const errorPage = (message) => {
  const safeMessage = String(message).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>AFRUS Admin Login</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#020617;color:#e2e8f0;font:16px system-ui}.card{max-width:32rem;margin:1rem;padding:2rem;border:1px solid #334155;border-radius:1rem;background:#0f172a;text-align:center}h1{color:#f59e0b}p{line-height:1.6}</style></head><body><main class="card"><h1>Authentication failed</h1><p>${safeMessage}</p></main></body></html>`;
};

export const methodAllowed = (request, response) => {
  if (request.method === 'GET') return true;
  response.setHeader('Allow', 'GET');
  response.status(405).send('Method Not Allowed');
  return false;
};
