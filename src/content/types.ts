import { Language } from '../i18n/translations';

export type CmsLocale = 'en' | 'fr' | 'ru';
export type LocalizedText = Record<CmsLocale, string>;

export const cmsLocaleFor = (language: Language): CmsLocale => language.toLowerCase() as CmsLocale;

export const resolveCmsText = (value: LocalizedText | undefined, language: Language): string => {
  if (!value) return '';
  return value[cmsLocaleFor(language)] || value.en || '';
};

export interface CmsHeroSlide {
  id: string;
  image: string;
  tag: LocalizedText;
  caption: LocalizedText;
}

export interface CmsNavigationChip {
  id: string;
  label: LocalizedText;
}
