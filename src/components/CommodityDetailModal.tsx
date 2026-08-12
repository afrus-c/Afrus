import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Globe2,
  Ship,
  CheckCircle2,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  FileCheck2,
  Anchor,
  Box
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface CommodityProfile {
  id: string;
  name: string;
  stream: 'russia-to-africa' | 'africa-to-russia';
  category: string;
  image: string;
  shortDescription: string;
  regions: string;
  industries: string[];
  tradeImportance: string;
  hsCode: string;
  shippingMethod: string;
  keyPorts: string[];
  marketInsights: string;
  seasonality?: string;
  phytosanitaryReqs?: string;
  keyStats?: { label: string; value: string }[];
}

interface CommodityDetailModalProps {
  commodity: CommodityProfile | null;
  onClose: () => void;
}

export const CommodityDetailModal: React.FC<CommodityDetailModalProps> = ({ commodity, onClose }) => {
  const { t } = useLanguage();
  if (!commodity) return null;

  const isRussianStream = commodity.stream === 'russia-to-africa';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-0"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col"
        >
          <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden bg-slate-950">
            <img
              src={commodity.image}
              alt={commodity.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-500 transition-all z-20"
              aria-label={t('tradePage.commodityDetailModal.close')}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  isRussianStream
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-emerald-500 text-slate-950 shadow-md'
                }`}>
                  {isRussianStream
                    ? t('tradePage.commodityDetailModal.text_001')
                    : t('tradePage.commodityDetailModal.text_002')
                  }
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-[11px] font-bold border border-slate-700">
                  {commodity.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-mono border border-slate-700">
                  {t('tradePage.commodityDetailModal.hsCode')} {commodity.hsCode}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {commodity.name}
              </h2>
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest">
                <BookOpen className="w-4 h-4" />
                <span>{t('tradePage.commodityDetailModal.text_003')}</span>
              </div>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {commodity.shortDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>{t('tradePage.commodityDetailModal.text_004')}</span>
                </div>
                <div className="text-sm text-white font-semibold leading-relaxed">
                  {commodity.regions}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>{t('tradePage.commodityDetailModal.text_005')}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {commodity.industries.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>{t('tradePage.commodityDetailModal.text_006')}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                {commodity.tradeImportance}
              </p>
            </div>
            <div className="space-y-4 border-t border-slate-800 pt-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Ship className="w-5 h-5 text-amber-400" />
                <span>{t('tradePage.commodityDetailModal.text_007')}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {t('tradePage.commodityDetailModal.text_008')}
                  </span>
                  <div className="text-xs font-semibold text-white">
                    {commodity.shippingMethod}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {t('tradePage.commodityDetailModal.text_009')}
                  </span>
                  <div className="text-xs font-semibold text-amber-300">
                    {commodity.keyPorts.join(', ')}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {t('tradePage.commodityDetailModal.text_010')}
                  </span>
                  <div className="text-xs font-semibold text-white">
                    {commodity.seasonality || t('tradePage.commodityDetailModal.text_011')}
                  </div>
                </div>

              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800 pt-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t('tradePage.commodityDetailModal.text_012')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {commodity.marketInsights}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4" />
                  <span>{t('tradePage.commodityDetailModal.text_013')}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {commodity.phytosanitaryReqs || t('tradePage.commodityDetailModal.text_014')}
                </p>
              </div>

            </div>

          </div>
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              {t('tradePage.commodityDetailModal.text_015')}
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors ml-auto"
            >
              {t('tradePage.commodityDetailModal.text_016')}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
