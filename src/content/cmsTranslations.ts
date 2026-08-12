import { Language } from '../i18n/translations';
import inlineTranslations from './inline-translations.json';

interface CmsTranslationEntry { key: string; en: string; fr: string; ru: string }
interface CmsTranslationFile { namespace: string; entries: CmsTranslationEntry[] }

const modules = import.meta.glob('./translations/*.json', { eager: true, import: 'default' });
const entries = Object.values(modules)
  .flatMap((module) => (module as CmsTranslationFile).entries);
const entryByKey = new Map(entries.map((entry) => [entry.key, entry]));
const inlineEntryByEnglish = new Map(inlineTranslations.entries.map((entry) => [entry.en, entry]));

export const getCmsTranslation = (key: string, language: Language): string | undefined => {
  const entry = entryByKey.get(key);
  if (!entry) return undefined;
  const locale = language.toLowerCase() as 'en' | 'fr' | 'ru';
  return entry[locale] || entry.en || undefined;
};

export const getCmsNamespaceEntries = (namespace: string): CmsTranslationEntry[] =>
  entries.filter((entry) => entry.key === namespace || entry.key.startsWith(`${namespace}.`));

export const getCmsInlineTranslation = (englishText: string, language: Language): string | undefined => {
  const entry = inlineEntryByEnglish.get(englishText);
  if (!entry) return undefined;
  const locale = language.toLowerCase() as 'en' | 'fr' | 'ru';
  return entry[locale] || entry.en;
};
