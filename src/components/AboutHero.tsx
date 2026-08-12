import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  Target,
  Compass,
  Award,
  Users,
  Building2,
  Sparkles,
  Pause,
  Play,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPageHeroImage } from '../utils/pageMedia';

interface AboutHeroProps {
  onOpenInquiry?: (subject?: string) => void;
}

const SLIDES = [
  {
    id: 'executive-partnership',
    image: getPageHeroImage('about', 0, 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'aboutPage.hero.slides.executive.tag',
    captionKey: 'aboutPage.hero.slides.executive.caption'
  },
  {
    id: 'diplomatic-summit',
    image: getPageHeroImage('about', 1, 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'aboutPage.hero.slides.summit.tag',
    captionKey: 'aboutPage.hero.slides.summit.caption'
  },
  {
    id: 'corporate-hq',
    image: getPageHeroImage('about', 2, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'aboutPage.hero.slides.headquarters.tag',
    captionKey: 'aboutPage.hero.slides.headquarters.caption'
  },
  {
    id: 'global-advisory',
    image: getPageHeroImage('about', 3, 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'aboutPage.hero.slides.leadership.tag',
    captionKey: 'aboutPage.hero.slides.leadership.caption'
  }
];

const NAV_CHIPS = [
  { id: 'our-mission', labelKey: 'aboutPage.hero.chips.mission', icon: Target, selector: 'about-mission-section' },
  { id: 'why-afrus', labelKey: 'aboutPage.hero.chips.bridge', icon: ShieldCheck, selector: 'why-choose-afrus-section' },
  { id: 'impact-metrics', labelKey: 'aboutPage.hero.chips.impact', icon: Award, selector: 'stats-metrics-section' },
  { id: 'partner-network', labelKey: 'aboutPage.hero.chips.alliances', icon: Building2, selector: 'partners-marquee-section' }
];

export const AboutHero: React.FC<AboutHeroProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const scrollToSection = (selector: string) => {
    const el = document.getElementById(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between bg-slate-950 border-b border-slate-800/80 overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'easeOut' },
              y: { duration: 8, ease: 'easeOut' }
            }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[currentSlide].image}
              alt={t(SLIDES[currentSlide].captionKey)}
              className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] saturate-[1.15]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-transparent to-yellow-500/15 pointer-events-none" />
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -40, 50, 0],
            opacity: [0.2, 0.45, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -40, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/5 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[170px] pointer-events-none"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="500" cy="300" rx="420" ry="200" fill="none" stroke="rgba(0, 57, 166, 0.35)" strokeWidth="1" strokeDasharray="6 6">
            <animate attributeName="stroke-dashoffset" values="0;120" dur="25s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="500" cy="300" rx="320" ry="140" fill="none" stroke="rgba(234, 179, 8, 0.25)" strokeWidth="1" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="120;0" dur="20s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="280" cy="220" r="4" fill="#0039a6" />
          <circle cx="720" cy="380" r="4" fill="#eab308" />
          <line x1="280" y1="220" x2="720" y2="380" stroke="rgba(0, 57, 166, 0.2)" strokeWidth="1.5" strokeDasharray="5 5" />
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-md mb-6"
        >
          <Globe2 className="w-4 h-4 text-amber-400" />
          <span>{t('aboutPage.hero.badge')}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('aboutPage.hero.title')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('aboutPage.hero.accent')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('aboutPage.hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenInquiry && onOpenInquiry(t('aboutPage.hero.inquirySubject'))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <span>{t('aboutPage.hero.partner')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('about-mission-section')}
            className="px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest shadow-xl backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{t('aboutPage.hero.explore')}</span>
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3"
        >
          {NAV_CHIPS.map((chip) => {
            const IconComp = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => scrollToSection(chip.selector)}
                className="px-4 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 hover:scale-102 group"
              >
                <IconComp className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
                <span>{t(chip.labelKey)}</span>
              </button>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/85 border border-slate-800/80 backdrop-blur-md"
        >
          <div className="flex items-center gap-1.5">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={t(slide.tagKey)}
                aria-label={`${t('aboutPage.hero.slideLabel')} ${idx + 1}`}
              />
            ))}
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
            {t(SLIDES[currentSlide].tagKey)}
          </span>

          <div className="h-3 w-px bg-slate-800" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
            aria-label={t(isPlaying ? 'aboutPage.hero.pause' : 'aboutPage.hero.play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>

    </section>
  );
};
