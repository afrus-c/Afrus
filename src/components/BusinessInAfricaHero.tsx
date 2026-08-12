import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  Pause,
  Play,
  ArrowRight,
  Compass,
  Building2,
  Sparkles,
  Layers
} from 'lucide-react';
import logisticsHubImg from '../assets/images/trade_logistics_hub_1785919873629.jpg';
import mineralsImg from '../assets/images/commodity_strategic_minerals_1785939095875.jpg';
import agriTractorImg from '../assets/images/commodity_agri_tractor_1785939701049.jpg';
import { useTranslation } from 'react-i18next';
import { getPageHeroImage } from '../utils/pageMedia';

interface BusinessInAfricaHeroProps {
  onOpenInquiry: (subject?: string) => void;
}

const SLIDES = [
  {
    id: 'logistics-hubs',
    image: getPageHeroImage('businessInAfrica', 0, logisticsHubImg),
    key: 'logistics'
  },
  {
    id: 'strategic-minerals',
    image: getPageHeroImage('businessInAfrica', 1, mineralsImg),
    key: 'minerals'
  },
  {
    id: 'agri-mechanization',
    image: getPageHeroImage('businessInAfrica', 2, agriTractorImg),
    key: 'agriculture'
  },
  {
    id: 'metropolitan-center',
    image: getPageHeroImage('businessInAfrica', 3, 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80'),
    key: 'cities'
  }
];

const NAV_CHIPS = [
  { id: 'regional-blocs', key: 'regions', icon: Globe2 },
  { id: 'afcfta-integration', key: 'afcfta', icon: TrendingUp },
  { id: 'joint-ventures', key: 'ventures', icon: Briefcase },
  { id: 'partner-vetting', key: 'vetting', icon: ShieldCheck }
];

export const BusinessInAfricaHero: React.FC<BusinessInAfricaHeroProps> = ({ onOpenInquiry }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNav, setActiveNav] = useState('regional-blocs');
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
              alt={t(`businessAfrica.hero.slides.${SLIDES[currentSlide].key}.caption`)}
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] saturate-[1.12]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-emerald-500/20 rounded-full blur-[170px] pointer-events-none"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M 150 150 Q 500 100 850 150" stroke="rgba(0, 57, 166, 0.25)" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M 150 350 Q 500 300 850 350" stroke="rgba(0, 57, 166, 0.2)" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="350" cy="250" r="5" fill="#0039a6" />
          <circle cx="350" cy="250" r="14" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;20;6" dur="3.5s" repeatCount="indefinite" />
          </circle>

          <circle cx="650" cy="380" r="5" fill="#10b981" />
          <circle cx="650" cy="380" r="14" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;20;6" dur="4s" repeatCount="indefinite" />
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
          <Globe2 className="w-4 h-4 text-amber-400" />
          <span>{t('businessAfrica.hero.badge')}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('businessAfrica.hero.titlePrefix')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('businessAfrica.hero.titleAccent')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('businessAfrica.hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenInquiry(t('businessAfrica.subjects.entry'))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <span>{t('businessAfrica.hero.primaryCta')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('regional-blocs')}
            className="px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest shadow-xl backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{t('businessAfrica.hero.secondaryCta')}</span>
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
                id={`hero-chip-biz-af-${chip.id}`}
              >
                <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{t(`businessAfrica.hero.chips.${chip.key}`)}</span>
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
                title={t(`businessAfrica.hero.slides.${slide.key}.tag`)}
                aria-label={t('businessAfrica.hero.slideLabel', { number: idx + 1 })}
              />
            ))}
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
            {t(`businessAfrica.hero.slides.${SLIDES[currentSlide].key}.tag`)}
          </span>

          <div className="h-3 w-px bg-slate-800" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
            aria-label={isPlaying ? t('businessAfrica.hero.pause') : t('businessAfrica.hero.play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>

    </section>
  );
};
