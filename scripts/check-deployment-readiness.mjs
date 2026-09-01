import fs from 'node:fs';

const requiredFiles = [
  'public/admin/index.html',
  'public/admin/config.yml',
  'server/oauth-server.mjs',
  '.deploy/afrus-oauth.service',
  '.deploy/nginx-afrus-http.conf',
  '.deploy/nginx-afrus.conf',
  '.deploy/nginx-coolify.conf',
  '.github/workflows/deploy-ovh.yml',
  '.env.ovh.example',
  '.dockerignore',
  'Dockerfile',
  'docker-compose.yml',
  'COOLIFY_DEPLOYMENT.md'
];

const errors = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) errors.push(`Missing required deployment file: ${file}`);
}

const config = fs.readFileSync('public/admin/config.yml', 'utf8');
const expectedConfig = [
  ['GitHub repository', /^\s*repo:\s*[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\s*$/m],
  ['main branch', /^\s*branch:\s*main\s*$/m],
  ['production OAuth origin', /^\s*base_url:\s*https:\/\/www\.afrusculture\.ru\s*$/m],
  ['OAuth endpoint', /^\s*auth_endpoint:\s*api\/auth\s*$/m],
  ['editorial workflow', /^\s*publish_mode:\s*editorial_workflow\s*$/m],
  ['uploads folder', /^\s*media_folder:\s*public\/uploads\s*$/m]
];
for (const [label, pattern] of expectedConfig) {
  if (!pattern.test(config)) errors.push(`Admin config is missing the expected ${label}.`);
}
if (/^\s*local_backend\s*:/m.test(config)) {
  errors.push('Production admin config must not enable the unauthenticated local backend.');
}

const configuredRepository = config.match(/^\s*repo:\s*([^\s]+)\s*$/m)?.[1];
if (process.env.GITHUB_REPOSITORY && configuredRepository !== process.env.GITHUB_REPOSITORY) {
  errors.push(`Admin repository ${configuredRepository} does not match GITHUB_REPOSITORY ${process.env.GITHUB_REPOSITORY}.`);
}

const workflow = fs.readFileSync('.github/workflows/deploy-ovh.yml', 'utf8');
if (!workflow.includes("vars.OVH_DEPLOY_ENABLED == 'true'")) {
  errors.push('OVH deployment must remain gated by OVH_DEPLOY_ENABLED.');
}
if (!workflow.includes('OVH_DEPLOY_PATH must be /var/www/afrus/current/dist')) {
  errors.push('OVH workflow must require the document root used by the Nginx template.');
}
if (!workflow.includes('Verify remote deployment directory')) {
  errors.push('OVH workflow must verify that the remote deployment directory is writable.');
}

const nginx = fs.readFileSync('.deploy/nginx-afrus.conf', 'utf8');
const expectedNginx = [
  ['HTTPS redirect', /return\s+301\s+https:\/\/www\.afrusculture\.ru\$request_uri;/],
  ['TLS certificate', /ssl_certificate\s+\/etc\/letsencrypt\/live\/afrusculture\.ru\/fullchain\.pem;/],
  ['TLS private key', /ssl_certificate_key\s+\/etc\/letsencrypt\/live\/afrusculture\.ru\/privkey\.pem;/],
  ['OAuth reverse proxy', /proxy_pass\s+http:\/\/127\.0\.0\.1:8787;/],
  ['SPA fallback', /try_files\s+\$uri\s+\$uri\/\s+\/index\.html;/],
  ['admin fallback', /location\s+\^~\s+\/admin\/\s*\{[\s\S]*?try_files\s+\$uri\s+\$uri\/\s+\/admin\/index\.html;/]
];
for (const [label, pattern] of expectedNginx) {
  if (!pattern.test(nginx)) errors.push(`Nginx template is missing the expected ${label}.`);
}

const bootstrapNginx = fs.readFileSync('.deploy/nginx-afrus-http.conf', 'utf8');
if (!/location\s+\/\.well-known\/acme-challenge\//.test(bootstrapNginx)) {
  errors.push('HTTP Nginx bootstrap template is missing the ACME challenge route.');
}

const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
for (const [label, pattern] of [
  ['web image target', /FROM\s+nginx:[^\s]+\s+AS\s+web/i],
  ['OAuth image target', /FROM\s+node:[^\s]+\s+AS\s+oauth/i],
  ['production dependency install', /npm\s+ci\s+--omit=dev/]
]) {
  if (!pattern.test(dockerfile)) errors.push(`Dockerfile is missing the expected ${label}.`);
}

const compose = fs.readFileSync('docker-compose.yml', 'utf8');
if (!/^\s{2}web:\s*$/m.test(compose) || !/^\s{2}oauth:\s*$/m.test(compose)) {
  errors.push('Docker Compose must define separate web and oauth services.');
}
if (!/GITHUB_REPOSITORY:\s*\$\{GITHUB_REPOSITORY:-afrus-c\/Afrus\}/.test(compose)) {
  errors.push('Docker Compose must default to the afrus-c/Afrus repository.');
}
if (/^\s{4}ports:\s*$/m.test(compose)) {
  errors.push('Docker Compose must not publish container ports directly; Coolify handles public routing.');
}

const coolifyNginx = fs.readFileSync('.deploy/nginx-coolify.conf', 'utf8');
if (!/proxy_pass\s+http:\/\/oauth:8787;/.test(coolifyNginx)) {
  errors.push('Coolify Nginx config must proxy OAuth requests over the private Compose network.');
}

const oauthServer = fs.readFileSync('server/oauth-server.mjs', 'utf8');
if (!/process\.env\.OAUTH_HOST/.test(oauthServer) || !/0\.0\.0\.0/.test(oauthServer)) {
  errors.push('OAuth service must support an explicit container-network bind address.');
}

const oauthEnvironment = fs.readFileSync('.env.ovh.example', 'utf8');
for (const name of ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_REPOSITORY', 'OAUTH_STATE_SECRET', 'CMS_ORIGIN', 'OAUTH_PORT']) {
  if (!new RegExp(`^${name}=.+$`, 'm').test(oauthEnvironment)) {
    errors.push(`OVH environment template is missing ${name}.`);
  }
}
const exampleRepository = oauthEnvironment.match(/^GITHUB_REPOSITORY=(.+)$/m)?.[1]?.trim();
if (exampleRepository !== configuredRepository) {
  errors.push(`OVH environment template repository ${exampleRepository || '(missing)'} does not match admin repository ${configuredRepository}.`);
}

const ignored = fs.readFileSync('.gitignore', 'utf8');
if (!/^\.env\*$/m.test(ignored)) errors.push('.gitignore must exclude real environment files.');

if (errors.length) {
  console.error('Deployment readiness check failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

if (configuredRepository === 'your-github-owner/your-repository') {
  console.log('AFRUS deployment template is ready. Choose a repository with: npm run cms:configure -- owner/repository');
} else {
  console.log(`AFRUS deployment configuration is ready for ${configuredRepository}, Coolify, and OVH connection.`);
}
