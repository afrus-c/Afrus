import React, { useState } from 'react';
import { MessageCircle, Send, X, PhoneCall } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div className="mb-3 bg-slate-950/95 backdrop-blur-2xl border border-amber-500/40 rounded-2xl p-4 shadow-2xl w-72 max-w-[calc(100vw-2rem)] space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t('homePage.floatingContact.direct')}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300">
            {t('homePage.floatingContact.intro')}
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${CONTACT_INFO.phones[0].raw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center justify-between group"
              id="float-wa-rus"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{t('homePage.floatingContact.wa')}</span>
              </div>
              <span className="text-[10px] text-emerald-400 group-hover:text-white font-mono">
                {CONTACT_INFO.phones[0].number}
              </span>
            </a>

            <a
              href={`tel:+${CONTACT_INFO.phones[1].raw}`}
              className="w-full py-2 px-3 rounded-xl bg-amber-600/20 hover:bg-amber-600 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold transition-all flex items-center justify-between group"
              id="float-call-afr"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>{t('homePage.floatingContact.phone')}</span>
              </div>
              <span className="text-[10px] text-amber-400 group-hover:text-white font-mono">
                {CONTACT_INFO.phones[1].number}
              </span>
            </a>

            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600 border border-sky-500/40 text-sky-300 hover:text-white text-xs font-bold transition-all flex items-center justify-between group"
              id="float-tg-link"
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>{t('homePage.floatingContact.telegram')}</span>
              </div>
              <span className="text-[10px] text-sky-400 group-hover:text-white font-mono">
                {CONTACT_INFO.telegram}
              </span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-2xl shadow-amber-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        aria-label={t('homePage.floatingContact.open')}
        id="floating-support-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        )}
      </button>
    </div>
  );
};
