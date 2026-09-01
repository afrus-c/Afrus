# AFRUS deployment with Coolify

This repository includes a Docker Compose deployment with two services:

- `web`: builds the Vite application and serves the public website and `/admin/` through Nginx.
- `oauth`: runs the private GitHub OAuth service used by Decap CMS. It is reachable only from the internal Compose network.

## Create the Coolify resource

1. In Coolify, create a resource from the GitHub repository `afrus-c/Afrus`.
2. Select Docker Compose as the build pack and use `docker-compose.yaml` from the repository root.
3. Assign the production domain to the `web` service on container port `80`.
4. Enable HTTPS in Coolify.

Do not assign a public domain or host port to the `oauth` service. Nginx forwards same-origin `/api/*` requests to it privately.

## Required environment variables

Use `.env.coolify.example` as the reference and configure its values in Coolify. Mark secrets as protected and never commit their real values:

```text
GITHUB_CLIENT_ID=<GitHub OAuth App client ID>
GITHUB_CLIENT_SECRET=<GitHub OAuth App client secret>
GITHUB_REPOSITORY=afrus-c/Afrus
OAUTH_STATE_SECRET=<random value of at least 32 characters>
CMS_ORIGIN=https://www.afrusculture.ru
```

Replace `CMS_ORIGIN` if another production domain will be used. It must contain only the public origin, without a trailing path.

## GitHub OAuth App

Create or update the GitHub OAuth App with:

- Homepage URL: the same value used for `CMS_ORIGIN`
- Authorization callback URL: `<CMS_ORIGIN>/api/callback`

The authenticated GitHub user must have write access to `afrus-c/Afrus`.

## Verification after deployment

Verify each workflow independently:

1. The public origin loads the current AFRUS website.
2. `/legal`, `/privacy`, and `/terms` load after direct navigation and refresh.
3. `/admin/` displays **Login with GitHub**, not the local **Connect** option.
4. `/api/health` returns `{"ok":true}`.
5. GitHub login returns to the admin portal.
6. An authorized test edit creates a commit in `afrus-c/Afrus` and appears on the public website after redeployment.

A successful image build alone does not prove steps 4–6.
