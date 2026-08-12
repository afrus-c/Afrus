import React from 'react';
import { motion } from 'motion/react';
import { Ship, Anchor, Truck, Handshake, CheckCircle2, Globe2, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import tradeHubImg from '../assets/images/trade_logistics_hub_1785919873629.jpg';
import { useLanguage } from '../context/LanguageContext';

interface TradeSectionProps {
  onOpenInquiry?: (subject?: string) => void;
}

export const TradeSection: React.FC<TradeSectionProps> = () => {
  const { language, t } = useLanguage();
  const tradePillars = [
    {
      id: 'export-russia',
      title: t('tradePage.tradeSection.text_001'),
      subtitle: t('tradePage.tradeSection.text_002'),
      icon: Ship,
      description: t('tradePage.tradeSection.text_003'),
      items: [
        {
          label: t('tradePage.tradeSection.text_004'),
          detail: t('tradePage.tradeSection.text_005')
        },
        {
          label: t('tradePage.tradeSection.text_006'),
          detail: t('tradePage.tradeSection.text_007')
        },
        {
          label: t('tradePage.tradeSection.text_008'),
          detail: t('tradePage.tradeSection.text_009')
        },
        {
          label: t('tradePage.tradeSection.text_010'),
          detail: t('tradePage.tradeSection.text_011')
        }
      ]
    },
    {
      id: 'import-africa',
      title: t('tradePage.tradeSection.text_012'),
      subtitle: t('tradePage.tradeSection.text_013'),
      icon: Anchor,
      description: t('tradePage.tradeSection.text_014'),
      items: [
        {
          label: t('tradePage.tradeSection.text_015'),
          detail: t('tradePage.tradeSection.text_016')
        },
        {
          label: t('tradePage.tradeSection.text_017'),
          detail: t('tradePage.tradeSection.text_018')
        },
        {
          label: t('tradePage.tradeSection.text_019'),
          detail: t('tradePage.tradeSection.text_020')
        },
        {
          label: t('tradePage.tradeSection.text_021'),
          detail: t('tradePage.tradeSection.text_022')
        }
      ]
    },
    {
      id: 'logistics',
      title: t('tradePage.tradeSection.text_023'),
      subtitle: t('tradePage.tradeSection.text_024'),
      icon: Truck,
      description: t('tradePage.tradeSection.text_025'),
      items: [
        {
          label: t('tradePage.tradeSection.text_026'),
          detail: t('tradePage.tradeSection.text_027')
        },
        {
          label: t('tradePage.tradeSection.text_028'),
          detail: t('tradePage.tradeSection.text_029')
        },
        {
          label: t('tradePage.tradeSection.text_030'),
          detail: t('tradePage.tradeSection.text_031')
        },
        {
          label: t('tradePage.tradeSection.text_032'),
          detail: t('tradePage.tradeSection.text_033')
        }
      ]
    },
    {
      id: 'partnerships',
      title: t('tradePage.tradeSection.text_034'),
      subtitle: t('tradePage.tradeSection.text_035'),
      icon: Handshake,
      description: t('tradePage.tradeSection.text_036'),
      items: [
        {
          label: t('tradePage.tradeSection.text_037'),
          detail: t('tradePage.tradeSection.text_038')
        },
        {
          label: t('tradePage.tradeSection.text_039'),
          detail: t('tradePage.tradeSection.text_040')
        },
        {
          label: t('tradePage.tradeSection.text_041'),
          detail: t('tradePage.tradeSection.text_042')
        },
        {
          label: t('tradePage.tradeSection.text_043'),
          detail: t('tradePage.tradeSection.text_044')
        }
      ]
    }
  ];

  return (
    <section id="trade" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>{t('tradePage.tradeSection.text_045')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('tradePage.tradeSection.text_046')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('tradePage.tradeSection.text_047')}
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl mb-16 group">
          <img
            src={tradeHubImg}
            alt={t('tradePage.tradeSection.portAlt')}
            className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-center max-w-2xl space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider w-max">
              {t('tradePage.tradeSection.text_048')}
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {t('tradePage.tradeSection.text_049')}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('tradePage.tradeSection.text_050')}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-amber-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{t('tradePage.tradeSection.text_051')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{t('tradePage.tradeSection.text_052')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{t('tradePage.tradeSection.text_053')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tradePillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                        {pillar.title}
                      </h3>
                      <div className="text-xs text-amber-400/90 font-medium">
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="space-y-4">
                    {pillar.items.map((item, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <p className="text-xs text-slate-300 pl-5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
