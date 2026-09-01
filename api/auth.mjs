import { configuration, createState, errorPage, methodAllowed, rateLimited, secure } from './_oauth.mjs';

export default function handler(request, response) {
  secure(response);
  if (!methodAllowed(request, response)) return;

  try {
    if (rateLimited(request)) return response.status(429).send(errorPage('Too many login attempts. Please wait and try again.'));
    const config = configuration();
    const authorize = new URL('https://github.com/login/oauth/authorize');
    authorize.searchParams.set('client_id', config.clientId);
    authorize.searchParams.set('redirect_uri', config.callbackUrl);
    authorize.searchParams.set('scope', 'repo');
    authorize.searchParams.set('state', createState(config.stateSecret));
    const handshake = 'authorizing:github';
    response.status(200).send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>AFRUS GitHub Login</title></head><body><script nonce="afrus-oauth">
      const targetOrigin = ${JSON.stringify(config.origin)};
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
  } catch (error) {
    console.error(error);
    response.status(500).send(errorPage('OAuth is not configured on this deployment.'));
  }
}
