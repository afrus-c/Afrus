import fs from 'node:fs/promises';
import path from 'node:path';

const root = 'src/content';
const targets = ['fr', 'ru'];
const files = [];
const cache = { fr: new Map(), ru: new Map() };

async function collectFiles(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectFiles(file);
    else if (entry.name.endsWith('.json')) files.push(file);
  }
}

function needsTranslation(en, value) {
  if (typeof en === 'string') return en.trim() && (!value || value === en);
  if (Array.isArray(en)) return !Array.isArray(value) || JSON.stringify(en) === JSON.stringify(value);
  return false;
}

function gather(value) {
  if (!value || typeof value !== 'object') return;
  if (!Array.isArray(value) && ['en', 'fr', 'ru'].every((key) => key in value)) {
    for (const language of targets) {
      if (typeof value.en === 'string' && needsTranslation(value.en, value[language])) cache[language].set(value.en, null);
      if (Array.isArray(value.en) && needsTranslation(value.en, value[language])) {
        for (const item of value.en) if (typeof item === 'string' && item.trim()) cache[language].set(item, null);
      }
    }
  }
  for (const child of Object.values(value)) gather(child);
}

function protect(text) {
  const values = [];
  return {
    text: text.replace(/\{\{[^}]+\}\}|https?:\/\/\S+|\$\{[^}]+\}/g, (match) => {
      values.push(match);
      return `ZXQPH${values.length - 1}QXZ`;
    }),
    restore: (translated) => translated.replace(/ZXQPH\s*(\d+)\s*QXZ/gi, (_, index) => values[Number(index)] ?? _),
  };
}

async function translate(text, language) {
  if (/^[\d\s$€₽.,%+/#–—()-]+$/.test(text)) return text;
  const guarded = protect(text);
  const params = new URLSearchParams({ client: 'gtx', sl: 'en', tl: language, dt: 't', q: guarded.text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
  const payload = await response.json();
  return guarded.restore(payload[0].map((part) => part[0]).join(''));
}

async function translateAll(language) {
  const entries = [...cache[language].keys()];
  let cursor = 0;
  async function worker() {
    while (cursor < entries.length) {
      const text = entries[cursor++];
      cache[language].set(text, await translate(text, language));
      if (cursor % 25 === 0) console.log(`${language}: ${cursor}/${entries.length}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
}

function apply(value) {
  if (!value || typeof value !== 'object') return;
  if (!Array.isArray(value) && ['en', 'fr', 'ru'].every((key) => key in value)) {
    for (const language of targets) {
      if (typeof value.en === 'string' && needsTranslation(value.en, value[language])) value[language] = cache[language].get(value.en) || value[language];
      if (Array.isArray(value.en) && needsTranslation(value.en, value[language])) {
        value[language] = value.en.map((item) => typeof item === 'string' ? (cache[language].get(item) || item) : item);
      }
    }
  }
  for (const child of Object.values(value)) apply(child);
}

await collectFiles(root);
const documents = [];
for (const file of files) {
  const data = JSON.parse(await fs.readFile(file, 'utf8'));
  gather(data);
  documents.push({ file, data });
}
console.log(`Files: ${documents.length}; French: ${cache.fr.size}; Russian: ${cache.ru.size}`);
await translateAll('fr');
await translateAll('ru');
for (const document of documents) {
  const before = JSON.stringify(document.data);
  apply(document.data);
  if (JSON.stringify(document.data) !== before) await fs.writeFile(document.file, `${JSON.stringify(document.data, null, 2)}\n`, 'utf8');
}
console.log('CMS translations written successfully.');
