import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Building2,
  Globe2,
  Sparkles,
  Pause,
  Play,
  ArrowRight,
  Headphones
} from 'lucide-react';

import { WHATSAPP_CONFIG, getWhatsAppConsultationUrl } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { getPageHeroImage } from '../utils/pageMedia';

interface ContactHeroProps {
  onOpenInquiry?: (subject?: string) => void;
}

const SLIDES = [
  {
    id: 'moscow-hq-liaison',
    image: getPageHeroImage('contact', 0, 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'contactPage.hero.slides.moscow.tag',
    captionKey: 'contactPage.hero.slides.moscow.caption'
  },
  {
    id: 'digital-hotlines',
    image: getPageHeroImage('contact', 1, 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'contactPage.hero.slides.digital.tag',
    captionKey: 'contactPage.hero.slides.digital.caption'
  },
  {
    id: 'yaounde-hub',
    image: getPageHeroImage('contact', 2, 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'contactPage.hero.slides.yaounde.tag',
    captionKey: 'contactPage.hero.slides.yaounde.caption'
  },
  {
    id: 'executive-desk',
    image: getPageHeroImage('contact', 3, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=80'),
    tagKey: 'contactPage.hero.slides.advisory.tag',
    captionKey: 'contactPage.hero.slides.advisory.caption'
  }
];

const NAV_CHIPS = [
  { id: 'moscow-hq', labelKey: 'contactPage.hero.chips.moscow', icon: Building2, targetId: 'contact-offices-grid' },
  { id: 'yaounde-hub', labelKey: 'contactPage.hero.chips.yaounde', icon: MapPin, targetId: 'contact-offices-grid' },
  { id: 'whatsapp-direct', labelKey: 'contactPage.hero.chips.whatsapp', icon: MessageCircle, targetId: 'contact-channels' },
  { id: 'email-direct', labelKey: 'contactPage.hero.chips.email', icon: Mail, targetId: 'contact-channels' }
];

export const ContactHero: React.FC<ContactHeroProps> = ({ onOpenInquiry }) => {
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

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between bg-slate-950 border-b border-slate-800/80 overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.12, x: 8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -8 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'easeOut' },
              x: { duration: 8, ease: 'easeOut' }
            }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[currentSlide].image}
              alt={t(SLIDES[currentSlide].captionKey)}
              className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.08] saturate-[1.12]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-transparent to-emerald-500/15 pointer-events-none" />
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 40, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-emerald-500/20 rounded-full blur-[160px] pointer-events-none"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="500" cy="300" r="100" fill="none" stroke="rgba(0, 57, 166, 0.4)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="300" r="220" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="500" cy="300" r="340" fill="none" stroke="rgba(0, 57, 166, 0.2)" strokeWidth="1" />
          <circle cx="500" cy="300" r="180" fill="none" stroke="#0039a6" strokeWidth="1.5">
            <animate attributeName="r" values="50;350;50" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="8s" repeatCount="indefinite" />
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
          <Mail className="w-4 h-4 text-amber-400" />
          <span>{t('contactPage.hero.badge')}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
        >
          {t('contactPage.hero.title')} <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {t('contactPage.hero.accent')}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
        >
          {t('contactPage.hero.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('contact-channels')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            <Mail className="w-4 h-4" />
            <span>{t('contactPage.hero.directChannels')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={getWhatsAppConsultationUrl(t('contactPage.hero.whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>{t('contactPage.hero.whatsappDesk')}</span>
          </a>
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
                onClick={() => scrollToSection(chip.targetId)}
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
                aria-label={`${t('contactPage.hero.slideLabel')} ${idx + 1}`}
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
            aria-label={t(isPlaying ? 'contactPage.hero.pause' : 'contactPage.hero.play')}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

      </div>

    </section>
  );
};
