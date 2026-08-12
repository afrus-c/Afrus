import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe2,
  TrendingUp,
  Wheat,
  Coffee,
  Ship,
  FileText,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Anchor,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { getPageHeroImage } from '../utils/pageMedia';
import cargoShipImg from '../assets/images/trade_cargo_ship_sea_1785937421418.jpg';
import portCraneImg from '../assets/images/trade_port_crane_twilight_1785937435057.jpg';
import logisticsHubImg from '../assets/images/trade_logistics_hub_1785919873629.jpg';
import wheatGrainImg from '../assets/images/commodity_wheat_grain_1785939049088.jpg';

export const TradeHero: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNav, setActiveNav] = useState('trade-stats');

  const SLIDES = [
    {
      id: 'maritime-routes',
      image: getPageHeroImage('trade', 0, cargoShipImg),
      tag: t('tradePage.tradeHero.text_001'),
      caption: t('tradePage.tradeHero.text_002')
    },
    {
      id: 'port-logistics',
      image: getPageHeroImage('trade', 1, portCraneImg),
      tag: t('tradePage.tradeHero.text_003'),
      caption: t('tradePage.tradeHero.text_004')
    },
    {
      id: 'trade-infrastructure',
      image: getPageHeroImage('trade', 2, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80'),
      tag: t('tradePage.tradeHero.text_005'),
      caption: t('tradePage.tradeHero.text_006')
    },
    {
      id: 'bulk-terminal',
      image: getPageHeroImage('trade', 3, wheatGrainImg),
      tag: t('tradePage.tradeHero.text_007'),
      caption: t('tradePage.tradeHero.text_008')
    }
  ];

  const NAV_CHIPS = [
    { id: 'trade-stats', label: t('tradePage.tradeHero.text_009'), icon: TrendingUp },
    { id: 'russia-exports', label: t('tradePage.tradeHero.text_010'), icon: Wheat },
    { id: 'africa-imports', label: t('tradePage.tradeHero.text_011'), icon: Coffee },
    { id: 'freight-corridors', label: t('tradePage.tradeHero.text_012'), icon: Ship },
    { id: 'trade-docs', label: t('tradePage.tradeHero.text_013'), icon: FileText }
  ];

  const HERO_STATS = [
    {
      value: '54',
      label: t('tradePage.tradeHero.text_014'),
      detail: t('tradePage.tradeHero.text_015')
    },
    {
      value: '4',
      label: t('tradePage.tradeHero.text_016'),
      detail: t('tradePage.tradeHero.text_017')
    },
    {
      value: '70%+',
      label: t('tradePage.tradeHero.text_018'),
      detail: t('tradePage.tradeHero.text_019')
    },
    {
      value: '$20B+',
      label: t('tradePage.tradeHero.text_020'),
      detail: t('tradePage.tradeHero.text_021')
    }
  ];
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
      const scrollPosition = window.scrollY + 300;

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
              alt={SLIDES[currentSlide].caption}
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] saturate-[1.12]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-sky-500/10 pointer-events-none" />
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 30, 0],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[160px] pointer-events-none"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M 0 150 Q 500 120 1000 150" fill="none" stroke="rgba(0, 57, 166, 0.3)" strokeWidth="1" strokeDasharray="6 6" />
          <path d="M 0 350 Q 500 320 1000 350" fill="none" stroke="rgba(0, 57, 166, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <motion.path
            d="M 580 180 Q 480 260 420 380"
            fill="none"
            stroke="#0039a6"
            strokeWidth="2"
            strokeDasharray="8 6"
            animate={{ strokeDashoffset: [100, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 580 180 Q 620 320 540 460"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="8 6"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="580" cy="180" r="5" fill="#0039a6" />
          <circle cx="580" cy="180" r="12" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
          </circle>

          <circle cx="420" cy="380" r="4" fill="#38bdf8" />
          <circle cx="420" cy="380" r="10" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="5;14;5" dur="4s" repeatCount="indefinite" />
          </circle>

          <circle cx="540" cy="460" r="4" fill="#0039a6" />
          <circle cx="540" cy="460" r="10" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="5;14;5" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-md mb-6"
        >
          <Globe2 className="w-4 h-4 animate-spin-slow text-amber-400" />
          <span>{t('tradePage.tradeHero.text_022')}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('tradePage.tradeHero.text_023')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('tradePage.tradeHero.text_024')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('tradePage.tradeHero.text_025')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3"
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
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 hover:scale-102'
                }`}
                id={`hero-chip-${chip.id}`}
              >
                <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-md"
        >
            <div className="flex items-center gap-1.5">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={slide.tag}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="h-3 w-px bg-slate-800" />

            <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
              {SLIDES[currentSlide].tag}
            </span>

            <div className="h-3 w-px bg-slate-800" />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </motion.div>

      </div>
      <div className="relative z-10 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {HERO_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 transition-all group"
              >
                <div className="text-xl sm:text-3xl font-black text-amber-400 tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
