import { useEffect, useRef } from 'react';
import i18n from '../i18n';
import { Language } from '../i18n/translations';
import { getCmsNamespaceEntries } from '../content/cmsTranslations';

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const TRANSLATABLE_ATTRIBUTES = ['placeholder', 'title', 'aria-label'];

const getPageDictionary = (language: Language): Map<string, string> => {
  if (language === 'EN') return new Map();
  const locale = language.toLowerCase() as 'fr' | 'ru';
  const cmsEntries = getCmsNamespaceEntries('moneyTransferContent');
  if (cmsEntries.length > 0) {
    return new Map(cmsEntries.map((entry) => [entry.en, entry[locale] || entry.en]));
  }
  const english = i18n.getResourceBundle('en', 'translation')?.moneyTransferContent ?? {};
  const localized = i18n.getResourceBundle(language.toLowerCase(), 'translation')?.moneyTransferContent ?? {};
  return new Map(Object.keys(english).map((key) => [english[key], localized[key] ?? english[key]]));
};

/** Applies centralized locale resources to the legacy Money Transfer markup. */
export const usePageTranslation = (language: Language) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const dictionary = getPageDictionary(language);
    const translate = (source: string) => dictionary.get(source) ?? source;

    const applyTranslations = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode() as Text | null;
      while (node) {
        const saved = originalText.get(node) ?? node.nodeValue ?? '';
        if (!originalText.has(node)) originalText.set(node, saved);
        const leading = saved.match(/^\s*/)?.[0] ?? '';
        const trailing = saved.match(/\s*$/)?.[0] ?? '';
        const source = saved.trim();
        const nextValue = `${leading}${source ? translate(source) : source}${trailing}`;
        if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
        node = walker.nextNode() as Text | null;
      }

      root.querySelectorAll('*').forEach((element) => {
        let saved = originalAttributes.get(element);
        if (!saved) {
          saved = new Map();
          originalAttributes.set(element, saved);
        }
        TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
          const current = element.getAttribute(attribute);
          if (current === null) return;
          if (!saved!.has(attribute)) saved!.set(attribute, current);
          const nextValue = translate(saved!.get(attribute)!);
          if (current !== nextValue) element.setAttribute(attribute, nextValue);
        });
      });
    };

    applyTranslations();
    const observer = new MutationObserver(applyTranslations);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  });

  return rootRef;
};
