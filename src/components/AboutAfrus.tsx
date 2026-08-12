import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Globe2, ShieldCheck, Award, Users } from 'lucide-react';
import heroBridgeImg from '../assets/images/hero_russia_africa_bridge_1785919860735.jpg';
import { useLanguage } from '../context/LanguageContext';

interface AboutAfrusProps {
  onOpenInquiry: (subject?: string) => void;
}

export const AboutAfrus: React.FC = ({ onOpenInquiry }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section id="intro" className="py-20 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
              <img
                src={heroBridgeImg}
            alt={t('homePage.aboutAfrus.misc_hero_alt')}
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-extrabold text-xl">
                    54+
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm sm:text-base">{t('homePage.aboutAfrus.text_001')}</div>
                    <div className="text-slate-400 text-xs">{t('homePage.aboutAfrus.text_002')}</div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
                  <Globe2 className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl border-2 border-amber-500/20 -z-10 hidden sm:block" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('homePage.aboutAfrus.text_003')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {t('homePage.aboutAfrus.text_004')}
            </h2>

            <p className="text-slate-200 text-lg sm:text-xl font-medium leading-relaxed">
              {t('homePage.aboutAfrus.text_005')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-300">{t('homePage.aboutAfrus.text_006')}</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-300">{t('homePage.aboutAfrus.text_007')}</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-300">{t('homePage.aboutAfrus.text_008')}</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-300">{t('homePage.aboutAfrus.text_009')}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  navigate('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
                id="discover-afrus-btn"
              >
                <span>{t('homePage.aboutAfrus.text_010')}</span>
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
