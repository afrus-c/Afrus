import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LearnEnglishHero } from '../components/LearnEnglishHero';
import { useTranslation } from 'react-i18next';

interface LearnEnglishProps {
  onOpenInquiry: (subject?: string) => void;
}

export const LearnEnglish: React.FC<LearnEnglishProps> = ({ onOpenInquiry }) => {
  const { t } = useTranslation();
  const highlights = [
    'fluency', 'instructors', 'diplomacy', 'certification'
  ];

  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <LearnEnglishHero onOpenInquiry={onOpenInquiry} />

      <section id="english-highlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((h, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4 hover:border-amber-500/30 transition-all">
              <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">{t(`languagePages.english.highlights.${h}.title`)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t(`languagePages.english.highlights.${h}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
