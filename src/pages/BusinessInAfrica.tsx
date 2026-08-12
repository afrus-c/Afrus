import React from 'react';
import { Globe2, Briefcase, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, Building2, Landmark } from 'lucide-react';
import { BusinessInAfricaHero } from '../components/BusinessInAfricaHero';
import { useTranslation } from 'react-i18next';

interface BusinessInAfricaProps {
  onOpenInquiry: (subject?: string) => void;
}

export const BusinessInAfrica: React.FC<BusinessInAfricaProps> = ({ onOpenInquiry }) => {
  const { t } = useTranslation();
  const regions = [
    { key: 'west' }, { key: 'central' }, { key: 'east' }, { key: 'southern' }
  ];

  const afcftaPillars = [
    { key: 'tariffs' }, { key: 'standards' }, { key: 'papss' }, { key: 'hubs' }
  ];

  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <BusinessInAfricaHero onOpenInquiry={onOpenInquiry} />
      <section id="regional-blocs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Globe2 className="w-4 h-4 text-amber-400" />
            <span>{t('businessAfrica.regions.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t('businessAfrica.regions.title')}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {t('businessAfrica.regions.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((reg, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-amber-500/30 transition-all">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{t(`businessAfrica.regions.items.${reg.key}.name`)}</span>
              <h3 className="text-lg font-bold text-white">{t('businessAfrica.regions.hubsLabel')} {t(`businessAfrica.regions.items.${reg.key}.hubs`)}</h3>
              <p className="text-xs text-slate-300 leading-relaxed"><strong>{t('businessAfrica.regions.opportunitiesLabel')}</strong> {t(`businessAfrica.regions.items.${reg.key}.sectors`)}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="afcfta-integration" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>{t('businessAfrica.afcfta.eyebrow')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {t('businessAfrica.afcfta.title')}
              </h3>
            </div>
            <button
              onClick={() => onOpenInquiry(t('businessAfrica.subjects.afcfta'))}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shrink-0 self-start md:self-auto"
            >
              {t('businessAfrica.afcfta.cta')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {afcftaPillars.map((p, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">{t(`businessAfrica.afcfta.pillars.${p.key}.title`)}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{t(`businessAfrica.afcfta.pillars.${p.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="joint-ventures" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{t('businessAfrica.ventures.eyebrow')}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t('businessAfrica.ventures.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('businessAfrica.ventures.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('businessAfrica.ventures.spv')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('businessAfrica.ventures.tax')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
            <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">{t('businessAfrica.ventures.inquiryTitle')}</div>
            <p className="text-xs text-slate-300">
              {t('businessAfrica.ventures.inquiryDescription')}
            </p>
            <button
              onClick={() => onOpenInquiry(t('businessAfrica.subjects.venture'))}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
            >
              {t('businessAfrica.ventures.cta')}
            </button>
          </div>
        </div>
      </section>
      <section id="partner-vetting" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t('businessAfrica.vetting.eyebrow')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('businessAfrica.vetting.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('businessAfrica.vetting.description')}
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry(t('businessAfrica.subjects.vetting'))}
            className="px-8 py-4 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-black text-xs uppercase tracking-widest border border-amber-500/30 transition-all shrink-0"
          >
            {t('businessAfrica.vetting.cta')}
          </button>
        </div>
      </section>
    </div>
  );
};
