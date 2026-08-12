import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import operationalSettings from '../content/operational-settings.json';

export const SeoDefaults: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const { seo } = operationalSettings;
    const route = seo.routes.find((entry) => entry.path === pathname) || seo.routes.find((entry) => entry.path !== '/' && pathname.startsWith(`${entry.path}/`));
    document.title = route?.title || seo.defaultTitle;
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) { element = document.createElement('meta'); property ? element.setAttribute('property', name) : element.setAttribute('name', name); document.head.appendChild(element); }
      element.content = content;
    };
    const description = route?.description || seo.defaultDescription;
    setMeta('description', description);
    setMeta('robots', seo.indexSite && (route?.index ?? true) ? 'index,follow' : 'noindex,nofollow');
    setMeta('og:title', route?.title || seo.defaultTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', route?.image || seo.socialImage, true);
  }, [pathname]);
  return null;
};
