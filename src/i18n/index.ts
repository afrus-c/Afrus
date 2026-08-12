import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';
import fr from './locales/fr.json';

const LANGUAGE_STORAGE_KEY = 'afrus_preferred_language';

const getInitialLanguage = (): string => {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved) {
      const upper = saved.toUpperCase();
      if (upper === 'EN' || upper === 'RU' || upper === 'FR') {
        return upper.toLowerCase();
      }
    }
  } catch {
  }
  return 'en';
};

const initialLang = getInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      fr: { translation: fr }
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const updateDocumentDirection = (langCode: string) => {
  const norm = (langCode || 'en').toLowerCase();
  const isRtl = false;
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = norm;
  if (isRtl) {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
};
updateDocumentDirection(initialLang);
i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng.toUpperCase());
  } catch {
  }
});

export default i18n;
