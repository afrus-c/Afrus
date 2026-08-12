import React from 'react';
import { Sparkles, MapPin, Calendar, Ticket } from 'lucide-react';
import { FestivalsHero } from '../components/FestivalsHero';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedEvents } from '../utils/contentLocalization';
import festivalsContent from '../content/pages/festivals.json';
import { resolveCmsText } from '../content/types';

interface FestivalsProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Festivals: React.FC<FestivalsProps> = ({ onOpenInquiry }) => {
  const { language } = useLanguage();
  const text = (value: { en: string; fr: string; ru: string }) => resolveCmsText(value, language);
  const festivalEvents = getLocalizedEvents(language).filter((e) => e.id === 'event-2' || e.id === 'event-3');

  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <FestivalsHero onOpenInquiry={onOpenInquiry} />
      <section id="festival-highlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>{text(festivalsContent.lineup.eyebrow)}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">{text(festivalsContent.lineup.title)}</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {text(festivalsContent.lineup.description)}
          </p>
        </div>

        <div id="festivals-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {festivalEvents.map((evt) => (
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

                <button
                  onClick={() => onOpenInquiry(`${text(festivalsContent.lineup.inquiryPrefix)}: ${evt.title}`)}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{text(festivalsContent.lineup.cta)}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
