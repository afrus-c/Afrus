import { configuration, methodAllowed, secure } from './_oauth.mjs';

export default function handler(request, response) {
  secure(response);
  if (!methodAllowed(request, response)) return;
  try {
    configuration();
    response.status(200).json({ ok: true });
  } catch {
    response.status(503).json({ ok: false, configured: false });
  }
}
