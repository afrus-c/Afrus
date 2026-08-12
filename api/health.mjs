import { configuration, methodAllowed, secure } from './_oauth.mjs';

export default function handler(request, response) {
  secure(response);
  if (!methodAllowed(request, response)) return;
  try {
    configuration();
    response.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid OAuth configuration.';
    response.status(503).json({ ok: false, configured: false, error: message });
  }
}
