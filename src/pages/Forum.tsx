import React from 'react';
import { Users, Building2, CheckCircle2, ArrowRight, Landmark, Award, TrendingUp, Calendar, MapPin, Ticket, ShieldCheck, Sparkles } from 'lucide-react';
import { EconomicForumHero } from '../components/EconomicForumHero';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedEvents } from '../utils/contentLocalization';

interface ForumProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Forum: React.FC<ForumProps> = ({ onOpenInquiry }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const forumEvents = getLocalizedEvents(language).filter((e) => e.id === 'event-1' || e.id === 'event-4');

  const roundtables = [
    {
      key: 'energy'
    },
    {
      key: 'agriculture'
    },
    {
      key: 'finance'
    },
    {
      key: 'sez'
    }
  ];

  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <EconomicForumHero onOpenInquiry={onOpenInquiry} />
      <section id="summit-schedule" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>{t('forumPage.schedule.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{t('forumPage.schedule.title')}</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {t('forumPage.schedule.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {forumEvents.map((evt) => (
            <div key={evt.id} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 hover:border-amber-500/40 transition-all shadow-xl group">
              <div className="h-56 rounded-2xl overflow-hidden relative">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-md">
                  {evt.type}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{evt.date} • {evt.location}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">{evt.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{evt.description}</p>

                {evt.speakers && (
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                    <strong className="text-amber-400 uppercase tracking-wider text-[11px] block mb-1">{t('forumPage.schedule.delegates')}</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {evt.speakers.map((spk, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                          {spk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => onOpenInquiry(t('forumPage.subjects.delegation', { title: evt.title }))}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{t('forumPage.schedule.cta')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="roundtables" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-2">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>{t('forumPage.roundtables.eyebrow')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {t('forumPage.roundtables.title')}
              </h3>
            </div>
            <button
              onClick={() => onOpenInquiry(t('forumPage.subjects.speaker'))}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shrink-0 self-start md:self-auto"
            >
              {t('forumPage.roundtables.cta')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roundtables.map((rt, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-amber-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-bold text-white">{t(`forumPage.roundtables.items.${rt.key}.title`)}</h4>
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{t(`forumPage.roundtables.items.${rt.key}.focus`)}</p>
                <div className="text-[11px] font-semibold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg inline-block">
                  <strong>{t('forumPage.roundtables.attendance')}</strong> {t(`forumPage.roundtables.items.${rt.key}.delegates`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="delegation-access" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('forumPage.vip.eyebrow')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {t('forumPage.vip.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('forumPage.vip.description')}
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry(t('forumPage.subjects.vip'))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all shrink-0"
          >
            {t('forumPage.vip.cta')}
          </button>
        </div>
      </section>
      <section id="matchmaking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>{t('forumPage.matchmaking.eyebrow')}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t('forumPage.matchmaking.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('forumPage.matchmaking.description')}
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('forumPage.matchmaking.bullets.profiles')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('forumPage.matchmaking.bullets.translators')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('forumPage.matchmaking.bullets.mou')}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
            <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">{t('forumPage.matchmaking.cardTitle')}</div>
            <p className="text-xs text-slate-300">
              {t('forumPage.matchmaking.cardDescription')}
            </p>
            <button
              onClick={() => onOpenInquiry(t('forumPage.subjects.matchmaking'))}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs uppercase tracking-widest border border-amber-500/30 transition-all text-center"
            >
              {t('forumPage.matchmaking.cta')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
