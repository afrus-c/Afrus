import React from 'react';
import { Cookie, FileText, LockKeyhole, Mail, Scale, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../data/content';

const sections = [
  { key: 'privacy', icon: LockKeyhole },
  { key: 'cookies', icon: Cookie },
  { key: 'terms', icon: FileText },
  { key: 'services', icon: Scale },
  { key: 'rights', icon: ShieldCheck }
] as const;

export const Legal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800 pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_34%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            <ShieldCheck className="h-4 w-4" />
            {t('legal.badge')}
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('legal.title')}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {t('legal.intro')}
          </p>
          <p className="mt-4 text-sm font-semibold text-amber-300">
            {t('legal.effectiveDate')}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6">
          {sections.map(({ key, icon: Icon }, index) => (
            <article key={key} id={key} className="scroll-mt-28 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/10 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    {t(`legal.sections.${key}.title`)}
                  </h2>
                </div>
              </div>
              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-300 sm:text-base">
                {t(`legal.sections.${key}.body`)}
              </p>
            </article>
          ))}
        </div>

        <aside className="mt-8 rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-emerald-300">
            <Mail className="h-5 w-5" />
            <h2 className="text-xl font-bold">{t('legal.contact.title')}</h2>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{t('legal.contact.body')}</p>
          <a className="mt-4 inline-flex font-bold text-white underline decoration-emerald-400 underline-offset-4 hover:text-emerald-300" href={`mailto:${CONTACT_INFO.email}`}>
            {CONTACT_INFO.email}
          </a>
        </aside>
      </section>
    </div>
  );
};
