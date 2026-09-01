# AFRUS deployment on OVH

The website and `/admin/` are static Vite output. A small OAuth process runs privately on `127.0.0.1:8787` so Decap can authenticate editors with GitHub.

## GitHub repository configuration

The website repository is `afrus-c/Afrus`. If it is ever moved, update Decap with:

```bash
npm run cms:configure -- new-owner/new-repository-name
```

Add a protected `production` environment to that repository with these secrets:

- `OVH_HOST`: server hostname or IP
- `OVH_PORT`: SSH port, normally `22`
- `OVH_USER`: dedicated deployment user
- `OVH_SSH_KEY`: private key for that deployment user
- `OVH_KNOWN_HOSTS`: verified server host-key line
- `OVH_DEPLOY_PATH`: static document root, normally `/var/www/afrus/current/dist`

After the server values have been verified, create the repository variable `OVH_DEPLOY_ENABLED` with the value `true`. Until then, GitHub validates and builds changes but safely skips deployment.

The workflow validates and builds before uploading. It intentionally does not delete remote files.

## GitHub OAuth application

Create a GitHub OAuth App under the repository owner's account:

- Homepage URL: `https://www.afrusculture.ru`
- Authorization callback URL: `https://www.afrusculture.ru/api/callback`

Copy `.env.ovh.example` to a root-owned environment file outside the public website directory. Never commit the real values.

The private OVH environment file must use `GITHUB_REPOSITORY=afrus-c/Afrus`, matching Decap. The OAuth service verifies that the authenticated GitHub user has push, maintain, or admin permission before returning a token to Decap.

## OAuth service

Install the OAuth service separately under `/opt/afrus-oauth`; it must not live inside the public document root. Copy `server/`, `package.json`, and `package-lock.json` there, run `npm ci --omit=dev`, and run the service under systemd with an unprivileged account.

## Nginx routes

Add these locations to the HTTPS virtual host:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

Only GitHub users with repository write access can publish through Decap CMS.

## DNS and HTTPS prerequisite

This deployment targets an OVH VPS or cloud server with SSH, Nginx, Node.js 22,
and systemd. It is not compatible with OVH shared hosting because the private
OAuth process must remain running.

Before requesting a certificate, point both DNS records to the OVH server:

- `afrusculture.ru` -> server IPv4 address (`A` record)
- `www.afrusculture.ru` -> `afrusculture.ru` (`CNAME`) or the same IPv4 address

Create `/var/www/afrus/current/dist`, place an initial production build there,
and install `.deploy/nginx-afrus-http.conf` first. After `sudo nginx -t` passes,
reload Nginx and request the certificate:

```bash
sudo certbot certonly --webroot \
  --webroot-path /var/www/afrus/current/dist \
  -d afrusculture.ru \
  -d www.afrusculture.ru
```

The final template expects the resulting files under
`/etc/letsencrypt/live/afrusculture.ru/`. Install `.deploy/nginx-afrus.conf`
only after those files exist, then run `sudo nginx -t` before reloading. Verify
automatic renewal with `sudo certbot renew --dry-run`.

## Production installation templates

Templates are provided in `.deploy/afrus-oauth.service` and `.deploy/nginx-afrus.conf`. Review the OVH username and deployment paths before installing them.

Create the static deployment directory and make the dedicated GitHub Actions
SSH user its owner. Replace `OVH_DEPLOY_USER` with the actual account name:

```bash
sudo install -d -o OVH_DEPLOY_USER -g OVH_DEPLOY_USER -m 0755 /var/www/afrus/current/dist
```

```bash
sudo install -d -m 0750 /etc/afrus
sudo install -m 0600 .env.ovh /etc/afrus/oauth.env
sudo install -d -o afrus -g afrus -m 0750 /opt/afrus-oauth
# Copy server/, package.json and package-lock.json to /opt/afrus-oauth,
# then run: cd /opt/afrus-oauth && sudo -u afrus npm ci --omit=dev
sudo install -m 0644 .deploy/afrus-oauth.service /etc/systemd/system/afrus-oauth.service
sudo systemctl daemon-reload
sudo systemctl enable --now afrus-oauth
sudo systemctl status afrus-oauth
```

Install the reviewed Nginx server block using the filename and location required by the OVH Linux image, then validate before reloading:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Verify OAuth locally on the server and through the public HTTPS proxy:

```bash
npm run oauth:health
npm run oauth:health -- https://www.afrusculture.ru/api/health
```

Before enabling deployment, run `npm run deploy:check`. Set `OVH_DEPLOY_PATH` to `/var/www/afrus/current/dist` when using the provided Nginx template. The GitHub workflow uploads only the static `dist/` build; OAuth service updates are deliberate server-maintenance operations.

The service applies secure response headers, ten-minute signed OAuth state expiry, outbound GitHub request timeouts, repository permission verification, and an in-memory limit of 60 authentication requests per IP per 15 minutes.
