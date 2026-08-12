import React from 'react';
import { motion } from 'motion/react';
import { Target, Compass } from 'lucide-react';
import { AboutHero } from '../components/AboutHero';
import { WhyChooseAfrus } from '../components/WhyChooseAfrus';
import { StatsSection } from '../components/StatsSection';
import { Testimonials } from '../components/Testimonials';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { useLanguage } from '../context/LanguageContext';
import aboutContent from '../content/pages/about-page.json';
import { resolveCmsText } from '../content/types';

interface AboutProps {
  onOpenInquiry: (subject?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenInquiry }) => {
  const { language } = useLanguage();
  const cmsText = (value: { en: string; fr: string; ru: string }) => resolveCmsText(value, language);
  return (
    <div className="pb-16 space-y-20 bg-slate-950 text-slate-100">
      <AboutHero onOpenInquiry={onOpenInquiry} />
      <section id="about-mission-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white">{cmsText(aboutContent.mission.title)}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {cmsText(aboutContent.mission.description)}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white">{cmsText(aboutContent.vision.title)}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {cmsText(aboutContent.vision.description)}
            </p>
          </div>

        </div>
      </section>
      <div id="why-choose-afrus-section" className="scroll-mt-24">
        <WhyChooseAfrus />
      </div>
      <div id="stats-metrics-section" className="scroll-mt-24">
        <StatsSection />
      </div>
      <Testimonials />
      <div id="partners-marquee-section" className="scroll-mt-24">
        <PartnersMarquee />
      </div>

    </div>
  );
};
