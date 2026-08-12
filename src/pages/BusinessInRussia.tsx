import React from 'react';
import { Building2, ShieldCheck, CheckCircle2, ArrowRight, Landmark, Briefcase, Sparkles } from 'lucide-react';
import { BusinessInRussiaHero } from '../components/BusinessInRussiaHero';
import { useTranslation } from 'react-i18next';

interface BusinessInRussiaProps {
  onOpenInquiry: (subject?: string) => void;
}

export const BusinessInRussia: React.FC<BusinessInRussiaProps> = ({ onOpenInquiry }) => {
  const { t } = useTranslation();
  const steps = [
    { title: t('businessRussia.steps.legal.title'), desc: t('businessRussia.steps.legal.desc') },
    { title: t('businessRussia.steps.sez.title'), desc: t('businessRussia.steps.sez.desc') },
    { title: t('businessRussia.steps.banking.title'), desc: t('businessRussia.steps.banking.desc') },
    { title: t('businessRussia.steps.visas.title'), desc: t('businessRussia.steps.visas.desc') }
  ];

  const sezZones = [
    { name: t('businessRussia.zones.moscow.name'), focus: t('businessRussia.zones.moscow.focus'), perk: t('businessRussia.zones.moscow.perk') },
    { name: t('businessRussia.zones.alabuga.name'), focus: t('businessRussia.zones.alabuga.focus'), perk: t('businessRussia.zones.alabuga.perk') },
    { name: t('businessRussia.zones.innopolis.name'), focus: t('businessRussia.zones.innopolis.focus'), perk: t('businessRussia.zones.innopolis.perk') },
    { name: t('businessRussia.zones.kaluga.name'), focus: t('businessRussia.zones.kaluga.focus'), perk: t('businessRussia.zones.kaluga.perk') }
  ];

  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <BusinessInRussiaHero onOpenInquiry={onOpenInquiry} />
      <section id="russia-roadmap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>{t('businessRussia.roadmap.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t('businessRussia.roadmap.title')}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {t('businessRussia.roadmap.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3">
              <div className="text-xs font-black text-amber-400 uppercase tracking-widest">{step.title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="sez-incentives" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{t('businessRussia.sez.eyebrow')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {t('businessRussia.sez.title')}
              </h3>
            </div>
            <button
              onClick={() => onOpenInquiry(t('businessRussia.subjects.sez'))}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shrink-0 self-start md:self-auto"
            >
              {t('businessRussia.sez.cta')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sezZones.map((zone, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-amber-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">{zone.name}</h4>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-slate-300"><strong>{t('businessRussia.sez.focusLabel')}</strong> {zone.focus}</p>
                <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg inline-block">
                  {zone.perk}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="banking-corridors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{t('businessRussia.banking.eyebrow')}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t('businessRussia.banking.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('businessRussia.banking.description')}
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('businessRussia.banking.bullets.transfers')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('businessRussia.banking.bullets.hedging')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('businessRussia.banking.bullets.managers')}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">{t('businessRussia.banking.currenciesTitle')}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-sm font-black text-white">RUB (₽)</div>
                <div className="text-[11px] text-slate-400">{t('businessRussia.currencies.rub')}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-sm font-black text-white">CNY (¥)</div>
                <div className="text-[11px] text-slate-400">{t('businessRussia.currencies.cny')}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-sm font-black text-white">XAF / XOF</div>
                <div className="text-[11px] text-slate-400">{t('businessRussia.currencies.cfa')}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-sm font-black text-white">AED (د.إ)</div>
                <div className="text-[11px] text-slate-400">{t('businessRussia.currencies.aed')}</div>
              </div>
            </div>
            <button
              onClick={() => onOpenInquiry(t('businessRussia.subjects.banking'))}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs uppercase tracking-widest border border-amber-500/30 transition-all text-center"
            >
              {t('businessRussia.banking.cta')}
            </button>
          </div>
        </div>
      </section>
      <section id="executive-visas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{t('businessRussia.visas.eyebrow')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('businessRussia.visas.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('businessRussia.visas.description')}
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry(t('businessRussia.subjects.visa'))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all shrink-0"
          >
            {t('businessRussia.visas.cta')}
          </button>
        </div>
      </section>
    </div>
  );
};
