import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Languages,
  Globe,
  MessageSquareText,
  CheckCircle2,
  ArrowRight,
  Pause,
  Play,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import eduLabImg from '../assets/images/edu_language_lab_1785951854541.jpg';
import uniItmoImg from '../assets/images/uni_itmo_petersburg_1785952559343.jpg';
import { useLanguage } from '../context/LanguageContext';
import { getPageHeroImage } from '../utils/pageMedia';

const SLIDES = [
  {
    id: 'language-lab',
    image: getPageHeroImage('learnEnglish', 0, eduLabImg),
    key: 'lab'
  },
  {
    id: 'itmo-innovation',
    image: getPageHeroImage('learnEnglish', 1, uniItmoImg),
    key: 'itmo'
  },
  {
    id: 'executive-english-seminar',
    image: getPageHeroImage('learnEnglish', 2, 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80'),
    key: 'dialogue'
  },
  {
    id: 'academic-certification',
    image: getPageHeroImage('learnEnglish', 3, 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80'),
    key: 'certificate'
  }
];

const NAV_CHIPS = [
  { id: 'english-highlights', key: 'highlights', icon: BookOpen },
  { id: 'business-c1', key: 'fluency', icon: Award },
  { id: 'native-instructors', key: 'instructors', icon: Languages },
  { id: 'certification', key: 'certification', icon: CheckCircle2 }
];

interface LearnEnglishHeroProps {
  onOpenInquiry: (subject?: string) => void;
}

export const LearnEnglishHero: React.FC<LearnEnglishHeroProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNav, setActiveNav] = useState('english-highlights');
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
              alt={t(`languagePages.english.hero.slides.${SLIDES[currentSlide].key}.caption`)}
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
          className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-sky-500/20 rounded-full blur-[170px] pointer-events-none"
        />
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 1000 600">
          <motion.path
            d="M 100 300 Q 250 180 400 300 T 700 300 T 1000 300"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M 100 320 Q 250 420 400 320 T 700 320 T 1000 320"
            fill="none"
            stroke="#0039a6"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-md mb-6"
        >
          <Languages className="w-4 h-4 text-amber-400" />
          <span>{t('languagePages.english.hero.badge')}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('languagePages.english.hero.titlePrefix')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('languagePages.english.hero.titleAccent')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('languagePages.english.hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenInquiry(t('languagePages.english.hero.subject'))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <span>{t('languagePages.english.hero.cta')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3"
        >
          {NAV_CHIPS.map((chip) => {
            const IconComp = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => onOpenInquiry(t('languagePages.english.hero.chipSubject', { topic: t(`languagePages.english.hero.chips.${chip.key}`) }))}
                className="px-4 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 hover:scale-102 group"
              >
                <IconComp className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
                <span>{t(`languagePages.english.hero.chips.${chip.key}`)}</span>
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
                title={t(`languagePages.english.hero.slides.${slide.key}.tag`)}
                aria-label={t('languagePages.common.slideLabel', { number: idx + 1 })}
              />
            ))}
          </div>

          <div className="h-3 w-px bg-slate-800" />

          <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
            {t(`languagePages.english.hero.slides.${SLIDES[currentSlide].key}.tag`)}
          </span>

          <div className="h-3 w-px bg-slate-800" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-400 hover:text-amber-400 transition-colors p-0.5"
            aria-label={isPlaying ? t('languagePages.common.pause') : t('languagePages.common.play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>
      <div className="relative z-10 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium text-slate-300 truncate max-w-xl sm:max-w-none">
              {t(`languagePages.english.hero.slides.${SLIDES[currentSlide].key}.caption`)}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-amber-400 font-mono text-[11px]">
            <span>{t('languagePages.common.counter', { current: currentSlide + 1, total: SLIDES.length })}</span>
          </div>
        </div>
      </div>

    </section>
  );
};
