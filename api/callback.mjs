import { configuration, errorPage, methodAllowed, rateLimited, secure, validState } from './_oauth.mjs';

const githubRequest = (url, token) => fetch(url, {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'AFRUS-CMS-OAuth',
    'X-GitHub-Api-Version': '2022-11-28'
  },
  signal: AbortSignal.timeout(10000)
});

export default async function handler(request, response) {
  secure(response);
  if (!methodAllowed(request, response)) return;

  try {
    if (rateLimited(request)) return response.status(429).send(errorPage('Too many login attempts. Please wait and try again.'));
    const config = configuration();
    if (!request.query.code || !validState(String(request.query.state || ''), config.stateSecret)) {
      return response.status(400).send(errorPage('Invalid or expired authorization request.'));
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: request.query.code,
        redirect_uri: config.callbackUrl
      }),
      signal: AbortSignal.timeout(10000)
    });
    const result = await tokenResponse.json();
    if (!tokenResponse.ok || !result.access_token) throw new Error(result.error_description || 'GitHub did not return an access token.');

    const repositoryResponse = await githubRequest(`https://api.github.com/repos/${config.repository}`, result.access_token);
    const repositoryResult = await repositoryResponse.json();
    const permissions = repositoryResult.permissions || {};
    if (!repositoryResponse.ok || !(permissions.push || permissions.maintain || permissions.admin)) {
      return response.status(403).send(errorPage(`Your GitHub account does not have write access to ${config.repository}.`));
    }

    const message = `authorization:github:success:${JSON.stringify({ token: result.access_token, provider: 'github' })}`;
    response.status(200).send(`<!doctype html><html><body><script nonce="afrus-oauth">window.opener.postMessage(${JSON.stringify(message)}, ${JSON.stringify(config.origin)});window.close();</script><p>Authentication complete. You may close this window.</p></body></html>`);
  } catch (error) {
    console.error(error);
    response.status(500).send(errorPage('GitHub authentication failed. Please try again or contact an administrator.'));
  }
}
