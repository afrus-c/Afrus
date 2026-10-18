# SpaceWeb deployment

The public website and Decap CMS admin page are built as static files and deployed to SpaceWeb shared hosting. CMS authentication remains on Vercel at `https://afrus-psi.vercel.app`.

## GitHub Actions setup

Add these Actions repository secrets:

- `SPACEWEB_FTP_SERVER`: the FTP/FTPS hostname shown in the SpaceWeb panel
- `SPACEWEB_FTP_USERNAME`: the FTP account username
- `SPACEWEB_FTP_PASSWORD`: the FTP account password

Add this Actions repository variable:

- `SPACEWEB_SERVER_DIR`: the destination path relative to the FTP account's assigned folder, ending in `/`. The FTP account shown in the SpaceWeb panel is assigned to `/home/a/afrusssglob/`, and the site's document root is its `public_html` subfolder, so use `public_html/`.

The `Build and deploy to SpaceWeb` workflow uses standard FTP on port 21 and deploys the built `dist/` directory on every push to `main`. It can also be started manually in GitHub Actions. It does not delete unrelated files on the server. Verify the remote path before the first deployment so it points at the correct domain's document root.

## Domain and HTTPS

In SpaceWeb, attach `www.afrusculture.ru` to the site and enable its HTTPS certificate. Point the domain's DNS records to the values SpaceWeb provides. DNS changes and certificate activation are managed in the SpaceWeb account; this repository does not contain account access.

The CMS config uses `https://www.afrusculture.ru` for the site and `https://afrus-psi.vercel.app` for the OAuth service. Confirm that the Vercel OAuth deployment has `CMS_ORIGIN=https://www.afrusculture.ru`, and that the GitHub OAuth App callback URL is `https://www.afrusculture.ru/api/callback`.

## CMS publishing

Editors publish content to the GitHub repository through Decap CMS. Each resulting commit to `main` triggers the SpaceWeb workflow, which rebuilds and uploads the static site. The change appears on the public site after that workflow succeeds.

## Manual upload

To deploy without GitHub Actions, run:

```powershell
npm ci
npm run build
```

Upload the **contents** of `dist/` to the SpaceWeb document root. Keep the `admin/` directory and its files. Configure the web server to serve `index.html` for application routes that do not match a file, so React Router URLs load correctly. The `/admin` path should serve or redirect to `/admin/index.html`.
