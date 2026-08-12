import React from 'react';
import { CMS_PARTNERS } from '../data/editorialContent';
import { useLanguage } from '../context/LanguageContext';

export const PartnersMarquee: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language.toLowerCase() as 'en' | 'fr' | 'ru';
  const marqueeItems = [...CMS_PARTNERS, ...CMS_PARTNERS, ...CMS_PARTNERS];

  return (
    <div className="py-12 bg-slate-950 border-t border-b border-slate-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {t('aboutPage.partnersMarquee.text_001')}
        </span>
      </div>

      <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex shrink-0 items-center justify-around gap-12 animate-marquee py-2">
          {marqueeItems.map((partner, i) => (
            <div
              key={i}
              className="flex min-w-max items-center gap-3 overflow-hidden rounded-2xl bg-slate-900/80 px-5 py-3 sm:px-6 border border-slate-800/80 shadow-md shrink-0 group hover:border-amber-500/40 transition-colors"
            >
              <div className="inline-flex min-h-8 min-w-12 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 font-mono text-[10px] font-black leading-none text-amber-400">
                {partner.logoText}
              </div>
              <span className="whitespace-nowrap text-sm font-semibold text-slate-300 group-hover:text-amber-400 transition-colors">
                {partner.nameI18n?.[locale] || partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
