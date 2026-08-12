import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Music,
  Palette,
  Film,
  Ticket,
  Pause,
  Play,
  ArrowRight,
  Globe2,
  Award
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import festivalsContent from '../content/pages/festivals.json';
import { resolveCmsText } from '../content/types';

interface FestivalsHeroProps {
  onOpenInquiry: (subject?: string) => void;
}

export const FestivalsHero: React.FC<FestivalsHeroProps> = ({ onOpenInquiry }) => {
  const { language } = useLanguage();
  const text = (value: { en: string; fr: string; ru: string }) => resolveCmsText(value, language);
  const SLIDES = festivalsContent.hero.slides;
  const chipIcons = { 'festival-highlights': Sparkles, 'music-stage': Music, 'art-exhibits': Palette, 'film-cinema': Film };
  const NAV_CHIPS = festivalsContent.hero.chips.map(chip => ({ ...chip, icon: chipIcons[chip.id as keyof typeof chipIcons] || Sparkles }));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNav, setActiveNav] = useState('festival-highlights');
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_CHIPS.map((chip) => document.getElementById(chip.id));
      const scrollPosition = window.scrollY + 280;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveNav(NAV_CHIPS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    } else {
      const festList = document.getElementById('festivals-grid');
      if (festList) {
        festList.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between bg-slate-950 border-b border-slate-800/80 overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.12, x: -6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: 6 }}
            transition={{
              opacity: { duration: 1.5, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'easeOut' },
              x: { duration: 8, ease: 'easeOut' }
            }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[currentSlide].image}
              alt={text(SLIDES[currentSlide].caption)}
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] saturate-[1.12]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-transparent to-purple-600/15 pointer-events-none" />
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-amber-500/25 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-purple-500/25 rounded-full blur-[170px] pointer-events-none"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M 100 200 C 300 100, 700 500, 900 400" fill="none" stroke="rgba(0, 57, 166, 0.25)" strokeWidth="1.5" strokeDasharray="8 8" />
          <path d="M 100 400 C 400 500, 600 100, 900 200" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="500" cy="300" r="7" fill="#0039a6" />
          <circle cx="500" cy="300" r="24" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.7">
            <animate attributeName="r" values="10;36;10" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-md mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{text(festivalsContent.hero.badge)}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {text(festivalsContent.hero.titlePrefix)} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {text(festivalsContent.hero.titleAccent)}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {text(festivalsContent.hero.subtitle)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenInquiry(text(festivalsContent.hero.inquirySubject))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <Ticket className="w-4 h-4" />
            <span>{text(festivalsContent.hero.primaryCta)}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('festival-highlights')}
            className="px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest shadow-xl backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{text(festivalsContent.hero.secondaryCta)}</span>
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
            const isActive = activeNav === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => scrollToSection(chip.id)}
                className={`px-4 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md group ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border border-amber-400 shadow-amber-500/20 scale-105'
                    : 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 hover:scale-102'
                }`}
                id={`hero-chip-festivals-${chip.id}`}
              >
                <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{text(chip.label)}</span>
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
                title={text(slide.tag)}
                aria-label={`${text(slide.tag)} ${idx + 1}`}
              />
            ))}
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
            {text(SLIDES[currentSlide].tag)}
          </span>

          <div className="h-3 w-px bg-slate-800" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
            aria-label={isPlaying ? text(festivalsContent.hero.pause) : text(festivalsContent.hero.play)}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>

    </section>
  );
};
