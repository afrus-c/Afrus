import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Network, TrendingUp, Headset } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseAfrus: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'trusted-info',
      title: t('homePage.whyChooseAfrus.text_001'),
      description: t('homePage.whyChooseAfrus.text_002'),
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-amber-600/5'
    },
    {
      id: 'international-network',
      title: t('homePage.whyChooseAfrus.text_003'),
      description: t('homePage.whyChooseAfrus.text_004'),
      icon: Network,
      color: 'from-blue-500/20 to-blue-600/5'
    },
    {
      id: 'business-opportunities',
      title: t('homePage.whyChooseAfrus.text_005'),
      description: t('homePage.whyChooseAfrus.text_006'),
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-emerald-600/5'
    },
    {
      id: 'professional-support',
      title: t('homePage.whyChooseAfrus.text_007'),
      description: t('homePage.whyChooseAfrus.text_008'),
      icon: Headset,
      color: 'from-purple-500/20 to-purple-600/5'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <span>{t('homePage.whyChooseAfrus.text_009')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('homePage.whyChooseAfrus.text_010')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {t('homePage.whyChooseAfrus.text_011')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{t('homePage.whyChooseAfrus.text_012')}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
