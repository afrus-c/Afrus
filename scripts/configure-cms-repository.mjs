import fs from 'node:fs';

const repository = process.argv[2];
const repositoryPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

if (!repositoryPattern.test(repository || '')) {
  console.error('Usage: npm run cms:configure -- github-owner/repository');
  process.exit(1);
}

const configPath = 'public/admin/config.yml';
const config = fs.readFileSync(configPath, 'utf8');
const updated = config.replace(/^(\s*repo:)\s*[^\r\n]+/m, `$1 ${repository}`);

if (updated === config) {
  console.error('Could not find the Decap CMS repository setting.');
  process.exit(1);
}

fs.writeFileSync(configPath, updated, 'utf8');
console.log(`Decap CMS repository configured as ${repository}.`);
console.log(`Set GITHUB_REPOSITORY=${repository} in the private OVH OAuth environment file.`);
