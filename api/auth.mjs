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
    response.redirect(302, authorize.toString());
  } catch (error) {
    console.error(error);
    response.status(500).send(errorPage('OAuth is not configured on this deployment.'));
  }
}
