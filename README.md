# AFRUS web platform

React, Vite and TypeScript website with a Decap CMS administration portal at `/admin/`. Public content supports English, French and Russian; the admin interface defaults to French.

## Local development

```powershell
npm install
npm run dev
```

For local CMS editing, start `npm run cms:local` in a second terminal and open `http://localhost:3000/admin/`. See `LOCAL_CMS_TESTING.md` for the safe testing procedure.

## Verification

```powershell
npm run lint
npm run build
npm run deploy:check
```

## Production

For Coolify, use the included `docker-compose.yml` and follow `COOLIFY_DEPLOYMENT.md`. The Compose deployment serves the static Vite build through Nginx and runs the GitHub OAuth service on a private internal network.

For a manual OVH deployment, follow `OVH_DEPLOYMENT.md`. Never commit GitHub client secrets or OAuth state secrets.

Choose the repository before deployment:

```powershell
npm run cms:configure -- github-owner/repository-name
```
