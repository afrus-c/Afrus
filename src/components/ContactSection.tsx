import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  MapPin,
  Copy,
  Check,
  Building,
  Globe2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import siteSettings from '../content/site-settings.json';
import { resolveCmsText } from '../content/types';

export const ContactSection: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Mail className="w-4 h-4" />
            <span>{t('contactPage.section.text_001')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('contactPage.section.text_002')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {t('contactPage.section.text_003')}
          </p>
        </div>
        <div id="contact-channels" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-mt-28">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                {t('contactPage.section.text_004')}
              </div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-base font-black text-white hover:text-amber-400 transition-colors break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
            <button
              onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center justify-between"
              id="copy-email-btn"
            >
              <span>{copiedText === 'email' ? t('contactPage.section.text_005') : t('contactPage.section.text_006')}</span>
              {copiedText === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                {t('contactPage.section.text_007')}
              </div>
              <a
                href={`https://wa.me/${CONTACT_INFO.phones[0].raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-black text-white hover:text-emerald-400 transition-colors"
              >
                {CONTACT_INFO.phones[0].number}
              </a>
            </div>
            <a
              href={`https://wa.me/${CONTACT_INFO.phones[0].raw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center justify-between"
              id="wa-rus-link"
            >
              <span>{t('contactPage.section.text_008')}</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                {t('contactPage.section.text_009')}
              </div>
              <a
                href={`tel:+${CONTACT_INFO.phones[1].raw}`}
                className="text-base font-black text-white hover:text-amber-400 transition-colors"
              >
                {CONTACT_INFO.phones[1].number}
              </a>
            </div>
            <a
              href={`tel:+${CONTACT_INFO.phones[1].raw}`}
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-between"
              id="call-afr-link"
            >
              <span>{t('contactPage.section.text_010')}</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Send className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                {t('contactPage.section.text_011')}
              </div>
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-black text-white hover:text-sky-400 transition-colors"
              >
                {CONTACT_INFO.telegram}
              </a>
            </div>
            <a
              href={CONTACT_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-slate-800 text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center justify-between"
              id="tg-channel-link"
            >
              <span>{t('contactPage.section.text_012')}</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
        <div id="contact-offices-grid" className="scroll-mt-28 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Building className="w-4 h-4" />
              <span>{t('contactPage.section.text_013')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('contactPage.section.text_014')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {t('contactPage.section.text_015')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-white">
                    {resolveCmsText(siteSettings.offices[0].title, language)}
                  </h4>
                  <div className="text-xs font-mono text-amber-400 mt-0.5">
                    {CONTACT_INFO.offices[0].coordinates}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{resolveCmsText(siteSettings.offices[0].address, language)}</span>
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{t('contactPage.section.text_018')}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('contactPage.section.text_019')}</span>
                </div>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center mx-auto animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-extrabold text-white">{t('contactPage.section.text_020')}</div>
                  <div className="text-xs text-slate-400">{t('contactPage.section.text_021')}</div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-white">
                    {resolveCmsText(siteSettings.offices[1].title, language)}
                  </h4>
                  <div className="text-xs font-mono text-emerald-400 mt-0.5">
                    {CONTACT_INFO.offices[1].coordinates}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{resolveCmsText(siteSettings.offices[1].address, language)}</span>
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{t('contactPage.section.text_024')}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('contactPage.section.text_025')}</span>
                </div>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-extrabold text-white">{t('contactPage.section.text_026')}</div>
                  <div className="text-xs text-slate-400">{t('contactPage.section.text_027')}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
