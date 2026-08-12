import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  BookOpen,
  FileCheck,
  Compass,
  ArrowRight,
  Pause,
  Play,
  Building2,
  Sparkles,
  Users,
  Globe2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPageHeroImage } from '../utils/pageMedia';

import uniHeroImg1 from '../assets/images/edu_russia_university_1785951841700.jpg';
import eduGradImg from '../assets/images/edu_grad_ceremony_1785951865071.jpg';
import uniRudnImg from '../assets/images/uni_rudn_moscow_1785952523851.jpg';
import uniSpbsuImg from '../assets/images/uni_spbsu_petersburg_1785952511367.jpg';

const SLIDES = [
  {
    id: 'russian-campuses',
    image: getPageHeroImage('studyInRussia', 0, uniHeroImg1),
    tagKey: 'studyPage.hero.slides.campuses.tag',
    captionKey: 'studyPage.hero.slides.campuses.caption'
  },
  {
    id: 'graduation-excellence',
    image: getPageHeroImage('studyInRussia', 1, eduGradImg),
    tagKey: 'studyPage.hero.slides.graduates.tag',
    captionKey: 'studyPage.hero.slides.graduates.caption'
  },
  {
    id: 'university-grounds',
    image: getPageHeroImage('studyInRussia', 2, uniRudnImg),
    tagKey: 'studyPage.hero.slides.rudn.tag',
    captionKey: 'studyPage.hero.slides.rudn.caption'
  },
  {
    id: 'petersburg-faculties',
    image: getPageHeroImage('studyInRussia', 3, uniSpbsuImg),
    tagKey: 'studyPage.hero.slides.spbsu.tag',
    captionKey: 'studyPage.hero.slides.spbsu.caption'
  }
];

const NAV_CHIPS = [
  { id: 'education-overview', labelKey: 'studyPage.hero.chips.overview', icon: BookOpen },
  { id: 'featured-universities', labelKey: 'studyPage.hero.chips.universities', icon: Building2 },
  { id: 'degree-programs', labelKey: 'studyPage.hero.chips.programs', icon: GraduationCap },
  { id: 'admission-journey', labelKey: 'studyPage.hero.chips.visa', icon: FileCheck },
  { id: 'scholarship-quotas', labelKey: 'studyPage.hero.chips.scholarships', icon: Award }
];

interface StudyInRussiaHeroProps {
  onOpenInquiry: (subject?: string) => void;
}

export const StudyInRussiaHero: React.FC<StudyInRussiaHeroProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNav, setActiveNav] = useState('education-overview');

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
    } else {
      onOpenInquiry(t('studyPage.hero.fallbackInquiry'));
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
              alt={t(SLIDES[currentSlide].captionKey)}
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

        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 1000 600">
          <motion.path
            d="M 150 450 Q 500 150 850 450"
            fill="none"
            stroke="#0039a6"
            strokeWidth="2"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, -120] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          <circle cx="150" cy="450" r="5" fill="#0039a6" />
          <circle cx="150" cy="450" r="12" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite" />
          </circle>

          <circle cx="500" cy="300" r="6" fill="#38bdf8" />
          <circle cx="500" cy="300" r="14" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;20;6" dur="4s" repeatCount="indefinite" />
          </circle>

          <circle cx="850" cy="450" r="5" fill="#0039a6" />
          <circle cx="850" cy="450" r="12" fill="none" stroke="#0039a6" strokeWidth="1" opacity="0.6">
            <animate attributeName="r" values="6;18;6" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </svg>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-center items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/35 text-[#fff4f5] text-xs font-extrabold uppercase tracking-widest shadow-xl backdrop-blur-md mb-6"
        >
          <GraduationCap className="w-4 h-4 text-[#f8dadd]" />
          <span>{t('studyPage.hero.badge')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('studyPage.hero.title')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('studyPage.hero.accent')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('studyPage.hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenInquiry(t('studyPage.hero.inquiry'))}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#668bc2] to-[#5379b3] hover:from-[#7799ca] hover:to-[#668bc2] text-[#ffffff] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/15 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <span>{t('studyPage.hero.apply')}</span>
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
            const isActive = activeNav === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => scrollToSection(chip.id)}
                className={`px-4 py-2.5 rounded-full font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-lg backdrop-blur-md group ${
                  isActive
                    ? 'bg-[#dce7f6] text-[#294f7a] border border-[#aac0df] shadow-blue-900/10 scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/40 hover:scale-102'
                }`}
                id={`study-hero-chip-${chip.id}`}
              >
                <IconComp className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#416a9c]' : 'text-[#f8dadd]'}`} />
                <span>{t(chip.labelKey)}</span>
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
                  currentSlide === idx ? 'w-8 bg-[#d49aa2]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={t(slide.tagKey)}
                aria-label={`${t('studyPage.hero.slide')} ${idx + 1}`}
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
            className="text-slate-400 hover:text-[#ffd9dd] transition-colors p-0.5"
            aria-label={t(isPlaying ? 'studyPage.hero.pause' : 'studyPage.hero.play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>

      <div className="relative z-10 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f4aeb6] shrink-0" />
            <span className="font-medium text-slate-300 truncate max-w-xl sm:max-w-none">
              {t(SLIDES[currentSlide].captionKey)}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#ffd9dd] font-mono text-[11px]">
            <span>{t('studyPage.hero.slide').toUpperCase()} {currentSlide + 1} {t('studyPage.hero.of').toUpperCase()} {SLIDES.length}</span>
          </div>
        </div>
      </div>

    </section>
  );
};
