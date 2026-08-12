import fs from 'node:fs';

const requiredFiles = [
  'public/admin/index.html',
  'public/admin/config.yml',
  'server/oauth-server.mjs',
  '.deploy/afrus-oauth.service',
  '.deploy/nginx-afrus.conf',
  '.github/workflows/deploy-ovh.yml',
  '.env.ovh.example'
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

const configuredRepository = config.match(/^\s*repo:\s*([^\s]+)\s*$/m)?.[1];
if (process.env.GITHUB_REPOSITORY && configuredRepository !== process.env.GITHUB_REPOSITORY) {
  errors.push(`Admin repository ${configuredRepository} does not match GITHUB_REPOSITORY ${process.env.GITHUB_REPOSITORY}.`);
}

const workflow = fs.readFileSync('.github/workflows/deploy-ovh.yml', 'utf8');
if (!workflow.includes("vars.OVH_DEPLOY_ENABLED == 'true'")) {
  errors.push('OVH deployment must remain gated by OVH_DEPLOY_ENABLED.');
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
  console.log(`AFRUS deployment configuration is ready for ${configuredRepository} and OVH connection.`);
}
