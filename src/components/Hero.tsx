import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Globe2, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedHeroSlides } from '../utils/contentLocalization';

interface HeroProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const slides = getLocalizedHeroSlides(language);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!activeSlide) return null;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlide.headline}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent z-10 pointer-events-none" />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          <motion.div
            key={`cat-${activeSlide.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 backdrop-blur-md shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {activeSlide.category}
            </span>
          </motion.div>
          <motion.h1
            key={`head-${activeSlide.id}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
          >
            {activeSlide.headline}
          </motion.h1>
          <motion.p
            key={`desc-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl"
          >
            {activeSlide.description}
          </motion.p>
          <motion.div
            key={`cta-${activeSlide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => navigate(activeSlide.path)}
              className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group whitespace-nowrap"
              id={`hero-cta-btn-${activeSlide.id}`}
            >
              <span className="whitespace-nowrap">{activeSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
            <button
              onClick={() => handleScrollToSection('contact')}
              className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-white font-bold text-sm sm:text-base shadow-lg backdrop-blur-md transition-all flex items-center justify-center gap-3 group whitespace-nowrap"
              id="hero-contact-afrus-btn"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="whitespace-nowrap">{t('nav.contact', 'Contact AFRUS')}</span>
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400"
          >
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-300">{t('homePage.hero.text_001')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-300">{t('homePage.hero.text_002')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="font-semibold text-slate-300">{t('homePage.hero.text_003')}</span>
            </div>
          </motion.div>

        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-slate-800 shadow-xl">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold ${
              currentSlide === index
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            aria-label={`Go to slide ${index + 1}: ${slide.category}`}
          >
            <span>0{index + 1}</span>
            {currentSlide === index && (
              <span className="hidden lg:inline uppercase text-[10px] tracking-wider">{slide.id}</span>
            )}
          </button>
        ))}
      </div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer hidden sm:flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
        onClick={() => handleScrollToSection('intro')}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">{t('homePage.hero.text_004')}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>

    </section>
  );
};
