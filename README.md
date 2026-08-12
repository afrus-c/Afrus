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

The static Vite build is deployed to OVH. A private Node process handles GitHub OAuth for Decap CMS behind the same HTTPS origin. Follow `OVH_DEPLOYMENT.md`; never commit GitHub client secrets or OAuth state secrets.

Choose the repository before deployment:

```powershell
npm run cms:configure -- github-owner/repository-name
```
