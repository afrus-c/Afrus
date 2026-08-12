import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPageHeroImage } from '../utils/pageMedia';
import { motion, AnimatePresence } from 'motion/react';
import {
  Newspaper,
  Globe2,
  TrendingUp,
  Landmark,
  GraduationCap,
  Sparkles,
  Pause,
  Play,
  ArrowRight,
  Rss,
  Bell,
  Search
} from 'lucide-react';

interface NewsHeroProps {
  onSearchChange?: (term: string) => void;
  onCategorySelect?: (category: string) => void;
}

const SLIDES = [
  {
    id: 'press-conference',
    image: getPageHeroImage('news', 0, 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1920&q=80'),
    key: 'diplomacy'
  },
  {
    id: 'global-journalism',
    image: getPageHeroImage('news', 1, 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80'),
    key: 'trade'
  },
  {
    id: 'satellite-information',
    image: getPageHeroImage('news', 2, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80'),
    key: 'network'
  },
  {
    id: 'market-analytics',
    image: getPageHeroImage('news', 3, 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80'),
    key: 'analytics'
  }
];

const NAV_CHIPS = [
  { id: 'all-articles', key: 'all', icon: Newspaper, category: 'All' },
  { id: 'diplomatic-news', key: 'diplomacy', icon: Landmark, category: 'Diplomacy' },
  { id: 'trade-bulletins', key: 'trade', icon: TrendingUp, category: 'Trade' },
  { id: 'education-quotas', key: 'education', icon: GraduationCap, category: 'Education' }
];

export const NewsHero: React.FC<NewsHeroProps> = ({ onCategorySelect }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChip, setActiveChip] = useState('all-articles');
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleChipClick = (chip: typeof NAV_CHIPS[0]) => {
    setActiveChip(chip.id);
    if (onCategorySelect) {
      onCategorySelect(chip.category);
    }
    const newsGrid = document.getElementById('news-articles-grid');
    if (newsGrid) {
      newsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNewsGrid = () => {
    const newsGrid = document.getElementById('news-articles-grid');
    if (newsGrid) {
      newsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between bg-slate-950 border-b border-slate-800/80 overflow-hidden pt-20">
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
              alt={t(`newsPage.hero.slides.${SLIDES[currentSlide].key}.caption`)}
              className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.08] saturate-[1.12]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-transparent to-cyan-500/15 pointer-events-none" />
        <motion.div
          animate={{
            x: [0, 45, -35, 0],
            y: [0, -35, 45, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-amber-500/25 rounded-full blur-[160px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 35, -35, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-cyan-500/25 rounded-full blur-[180px] pointer-events-none"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M 0 150 Q 250 100 500 150 T 1000 150" fill="none" stroke="rgba(0, 57, 166, 0.3)" strokeWidth="1.5" strokeDasharray="8 8">
            <animate attributeName="stroke-dashoffset" values="0;100" dur="20s" repeatCount="indefinite" />
          </path>
          <path d="M 0 450 Q 250 500 500 450 T 1000 450" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" strokeDasharray="8 8">
            <animate attributeName="stroke-dashoffset" values="100;0" dur="20s" repeatCount="indefinite" />
          </path>
          <circle cx="500" cy="300" r="6" fill="#0039a6" />
          <circle cx="500" cy="300" r="28" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="8;40;8" dur="4s" repeatCount="indefinite" />
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
          <Newspaper className="w-4 h-4 text-amber-400" />
          <span>{t('newsPage.hero.badge')}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('newsPage.hero.titlePrefix')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('newsPage.hero.titleAccent')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('newsPage.hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToNewsGrid}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <Rss className="w-4 h-4" />
            <span>{t('newsPage.hero.cta')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            const isActive = activeChip === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => handleChipClick(chip)}
                className={`px-4 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md group ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border border-amber-400 shadow-amber-500/20 scale-105'
                    : 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 hover:scale-102'
                }`}
                id={`hero-chip-news-${chip.id}`}
              >
                <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{t(`newsPage.hero.chips.${chip.key}`)}</span>
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
                title={t(`newsPage.hero.slides.${slide.key}.tag`)}
                aria-label={t('newsPage.hero.slideLabel', { number: idx + 1 })}
              />
            ))}
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
            {t(`newsPage.hero.slides.${SLIDES[currentSlide].key}.tag`)}
          </span>

          <div className="h-3 w-px bg-slate-800" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
            aria-label={isPlaying ? t('newsPage.hero.pause') : t('newsPage.hero.play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>

    </section>
  );
};
