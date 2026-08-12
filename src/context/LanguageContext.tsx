import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n, { updateDocumentDirection } from '../i18n';
import { Language } from '../i18n/translations';
import { getCmsInlineTranslation, getCmsTranslation } from '../content/cmsTranslations';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallbackOrOptions?: string | Record<string, string | number>) => string;
  trans: (enText: string, frText: string, ruText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'afrus_preferred_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'EN' || saved === 'FR' || saved === 'RU') {
        return saved as Language;
      }
    } catch {
    }
    const currentI18n = (i18n.language || 'en').toUpperCase();
    if (currentI18n === 'FR' || currentI18n === 'RU') {
      return currentI18n as Language;
    }
    return 'EN';
  });

  useEffect(() => {
    const langCode = language.toLowerCase();
    if (i18n.language !== langCode) {
      i18n.changeLanguage(langCode);
    }
    updateDocumentDirection(langCode);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const langCode = lang.toLowerCase();
    i18n.changeLanguage(langCode);
    updateDocumentDirection(langCode);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
    }
  };

  const t = (key: string, fallbackOrOptions?: string | Record<string, string | number>): string => {
    const options = typeof fallbackOrOptions === 'object' ? fallbackOrOptions : undefined;
    const interpolate = (value: string) => options
      ? value.replace(/\{\{\s*([^}\s]+)\s*\}\}/g, (match, token: string) =>
          options[token] !== undefined ? String(options[token]) : match)
      : value;
    const cmsValue = getCmsTranslation(key, language);
    if (cmsValue !== undefined) return interpolate(cmsValue);
    if (i18n.exists(key)) {
      return i18n.t(key, options);
    }
    return typeof fallbackOrOptions === 'string' ? fallbackOrOptions : key;
  };

  const trans = (enText: string, frText: string, ruText: string): string => {
    const cmsValue = getCmsInlineTranslation(enText, language);
    if (cmsValue !== undefined) return cmsValue;
    if (language === 'FR') return frText || enText;
    if (language === 'RU') return ruText || enText;
    return enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, trans }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
