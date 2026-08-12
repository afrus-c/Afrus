import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wheat,
  Coffee,
  Ship,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Globe2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  HelpCircle,
  ChevronDown,
  Layers,
  Sprout,
  Gem,
  Shirt,
  Flame,
  Lightbulb,
  Box,
  Anchor,
  FileCheck2,
  BookOpen
} from 'lucide-react';

import { ExportImportHero } from '../components/ExportImportHero';
import { CommodityDetailModal, CommodityProfile } from '../components/CommodityDetailModal';
import { useLanguage } from '../context/LanguageContext';
import wheatGrainImg from '../assets/images/commodity_wheat_grain_1785939049088.jpg';
import sunflowerOilImg from '../assets/images/commodity_sunflower_oil_1785939669666.jpg';
import fertilizerPlantImg from '../assets/images/commodity_fertilizer_plant_1785939686222.jpg';
import agriTractorImg from '../assets/images/commodity_agri_tractor_1785939701049.jpg';
import powerGeneratorImg from '../assets/images/commodity_power_generator_1785939715283.jpg';

import coffeeCocoaImg from '../assets/images/commodity_coffee_cocoa_1785939066266.jpg';
import tropicalFruitsImg from '../assets/images/commodity_tropical_fruits_1785939736517.jpg';
import strategicMineralsImg from '../assets/images/commodity_strategic_minerals_1785939095875.jpg';
import sheaButterImg from '../assets/images/commodity_shea_butter_1785939752757.jpg';
import africanTextilesImg from '../assets/images/commodity_african_textiles_1785939767889.jpg';

interface ExportImportProps {
  onOpenInquiry?: (subject?: string) => void;
}

export const ExportImport: React.FC<ExportImportProps> = () => {
  const { t } = useLanguage();
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStream, setSelectedStream] = useState<'All' | 'russia-to-africa' | 'africa-to-russia'>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const ALL_COMMODITIES: CommodityProfile[] = [
    {
      id: 'ru-wheat-grain',
      name: t('exportImportPage.exportImport.text_001'),
      stream: 'russia-to-africa',
      category: 'Agricultural & Food',
      image: wheatGrainImg,
      shortDescription: t('exportImportPage.exportImport.text_002'),
      regions: t('exportImportPage.exportImport.text_003'),
      industries: [
        t('exportImportPage.exportImport.text_004'),
        t('exportImportPage.exportImport.text_005'),
        t('exportImportPage.exportImport.text_006')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_007'),
      hsCode: 'HS 1001.99',
      shippingMethod: t('exportImportPage.exportImport.text_008'),
      keyPorts: ['Novorossiysk', 'Kavkaz', 'Alexandria', 'Port Said', 'Lagos / Lekki'],
      marketInsights: t('exportImportPage.exportImport.text_009'),
      seasonality: t('exportImportPage.exportImport.text_010'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_011')
    },
    {
      id: 'ru-sunflower-oil',
      name: t('exportImportPage.exportImport.text_012'),
      stream: 'russia-to-africa',
      category: 'Agricultural & Food',
      image: sunflowerOilImg,
      shortDescription: t('exportImportPage.exportImport.text_013'),
      regions: t('exportImportPage.exportImport.text_014'),
      industries: [
        t('exportImportPage.exportImport.text_015'),
        t('exportImportPage.exportImport.text_016'),
        t('exportImportPage.exportImport.text_017')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_018'),
      hsCode: 'HS 1512.11',
      shippingMethod: t('exportImportPage.exportImport.text_019'),
      keyPorts: ['Novorossiysk', 'Mersin', 'Casablanca', 'Tema', 'Douala'],
      marketInsights: t('exportImportPage.exportImport.text_020'),
      seasonality: t('exportImportPage.exportImport.text_021'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_022')
    },
    {
      id: 'ru-fertilizers',
      name: t('exportImportPage.exportImport.text_023'),
      stream: 'russia-to-africa',
      category: 'Fertilizers & Agro',
      image: fertilizerPlantImg,
      shortDescription: t('exportImportPage.exportImport.text_024'),
      regions: t('exportImportPage.exportImport.text_025'),
      industries: [
        t('exportImportPage.exportImport.text_026'),
        t('exportImportPage.exportImport.text_027'),
        t('exportImportPage.exportImport.text_028')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_029'),
      hsCode: 'HS 3102.10 (Urea) / HS 3105.20 (NPK)',
      shippingMethod: t('exportImportPage.exportImport.text_030'),
      keyPorts: ['St. Petersburg', 'Murmansk', 'Mombasa', 'Durban', 'Abidjan'],
      marketInsights: t('exportImportPage.exportImport.text_031'),
      seasonality: t('exportImportPage.exportImport.text_032'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_033')
    },
    {
      id: 'ru-agri-machinery',
      name: t('exportImportPage.exportImport.text_034'),
      stream: 'russia-to-africa',
      category: 'Minerals & Industrial',
      image: agriTractorImg,
      shortDescription: t('exportImportPage.exportImport.text_035'),
      regions: t('exportImportPage.exportImport.text_036'),
      industries: [
        t('exportImportPage.exportImport.text_037'),
        t('exportImportPage.exportImport.text_038')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_039'),
      hsCode: 'HS 8433.51',
      shippingMethod: t('exportImportPage.exportImport.text_040'),
      keyPorts: ['St. Petersburg', 'Novorossiysk', 'Lagos', 'Dar es Salaam'],
      marketInsights: t('exportImportPage.exportImport.text_041'),
      seasonality: t('exportImportPage.exportImport.text_042'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_043')
    },
    {
      id: 'ru-industrial-power',
      name: t('exportImportPage.exportImport.text_044'),
      stream: 'russia-to-africa',
      category: 'Minerals & Industrial',
      image: powerGeneratorImg,
      shortDescription: t('exportImportPage.exportImport.text_045'),
      regions: t('exportImportPage.exportImport.text_046'),
      industries: [
        t('exportImportPage.exportImport.text_047'),
        t('exportImportPage.exportImport.text_048'),
        t('exportImportPage.exportImport.text_049')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_050'),
      hsCode: 'HS 8502.13',
      shippingMethod: t('exportImportPage.exportImport.text_051'),
      keyPorts: ['St. Petersburg', 'Novorossiysk', 'Walvis Bay', 'Djibouti'],
      marketInsights: t('exportImportPage.exportImport.text_052'),
      seasonality: t('exportImportPage.exportImport.text_053'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_054')
    },
    {
      id: 'af-coffee-cocoa',
      name: t('exportImportPage.exportImport.text_055'),
      stream: 'africa-to-russia',
      category: 'Agricultural & Food',
      image: coffeeCocoaImg,
      shortDescription: t('exportImportPage.exportImport.text_056'),
      regions: t('exportImportPage.exportImport.text_057'),
      industries: [
        t('exportImportPage.exportImport.text_058'),
        t('exportImportPage.exportImport.text_059'),
        t('exportImportPage.exportImport.text_060')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_061'),
      hsCode: 'HS 0901.11 (Coffee) / HS 1801.00 (Cocoa)',
      shippingMethod: t('exportImportPage.exportImport.text_062'),
      keyPorts: ['Abidjan', 'Tema', 'Djibouti', 'St. Petersburg', 'Novorossiysk'],
      marketInsights: t('exportImportPage.exportImport.text_063'),
      seasonality: t('exportImportPage.exportImport.text_064'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_065')
    },
    {
      id: 'af-tropical-fruits',
      name: t('exportImportPage.exportImport.text_066'),
      stream: 'africa-to-russia',
      category: 'Agricultural & Food',
      image: tropicalFruitsImg,
      shortDescription: t('exportImportPage.exportImport.text_067'),
      regions: t('exportImportPage.exportImport.text_068'),
      industries: [
        t('exportImportPage.exportImport.text_069'),
        t('exportImportPage.exportImport.text_070'),
        t('exportImportPage.exportImport.text_071')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_072'),
      hsCode: 'HS 0805.10 (Citrus) / HS 0804.40 (Avocados)',
      shippingMethod: t('exportImportPage.exportImport.text_073'),
      keyPorts: ['Durban', 'Alexandria', 'Mombasa', 'Novorossiysk', 'St. Petersburg'],
      marketInsights: t('exportImportPage.exportImport.text_074'),
      seasonality: t('exportImportPage.exportImport.text_075'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_076')
    },
    {
      id: 'af-minerals',
      name: t('exportImportPage.exportImport.text_077'),
      stream: 'africa-to-russia',
      category: 'Minerals & Industrial',
      image: strategicMineralsImg,
      shortDescription: t('exportImportPage.exportImport.text_078'),
      regions: t('exportImportPage.exportImport.text_079'),
      industries: [
        t('exportImportPage.exportImport.text_080'),
        t('exportImportPage.exportImport.text_081'),
        t('exportImportPage.exportImport.text_082')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_083'),
      hsCode: 'HS 7403.11 (Copper) / HS 2605.00 (Cobalt)',
      shippingMethod: t('exportImportPage.exportImport.text_084'),
      keyPorts: ['Dar es Salaam', 'Walvis Bay', 'Durban', 'Vladivostok', 'St. Petersburg'],
      marketInsights: t('exportImportPage.exportImport.text_085'),
      seasonality: t('exportImportPage.exportImport.text_086'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_087')
    },
    {
      id: 'af-shea-butter',
      name: t('exportImportPage.exportImport.text_088'),
      stream: 'africa-to-russia',
      category: 'Consumer & Textiles',
      image: sheaButterImg,
      shortDescription: t('exportImportPage.exportImport.text_089'),
      regions: t('exportImportPage.exportImport.text_090'),
      industries: [
        t('exportImportPage.exportImport.text_091'),
        t('exportImportPage.exportImport.text_092'),
        t('exportImportPage.exportImport.text_093')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_094'),
      hsCode: 'HS 1515.90',
      shippingMethod: t('exportImportPage.exportImport.text_095'),
      keyPorts: ['Tema', 'Lagos', 'St. Petersburg'],
      marketInsights: t('exportImportPage.exportImport.text_096'),
      seasonality: t('exportImportPage.exportImport.text_097'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_098')
    },
    {
      id: 'af-textiles-crafts',
      name: t('exportImportPage.exportImport.text_099'),
      stream: 'africa-to-russia',
      category: 'Consumer & Textiles',
      image: africanTextilesImg,
      shortDescription: t('exportImportPage.exportImport.text_100'),
      regions: t('exportImportPage.exportImport.text_101'),
      industries: [
        t('exportImportPage.exportImport.text_102'),
        t('exportImportPage.exportImport.text_103'),
        t('exportImportPage.exportImport.text_104')
      ],
      tradeImportance: t('exportImportPage.exportImport.text_105'),
      hsCode: 'HS 5201.00 (Cotton) / HS 4420.10 (Wood Carvings)',
      shippingMethod: t('exportImportPage.exportImport.text_106'),
      keyPorts: ['Alexandria', 'Djibouti', 'Mombasa', 'Novorossiysk'],
      marketInsights: t('exportImportPage.exportImport.text_107'),
      seasonality: t('exportImportPage.exportImport.text_108'),
      phytosanitaryReqs: t('exportImportPage.exportImport.text_109')
    }
  ];
  const filteredCommodities = ALL_COMMODITIES.filter((item) => {
    const matchesStream = selectedStream === 'All' || item.stream === selectedStream;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStream && matchesCategory && matchesSearch;
  });

  const russianStreamItems = filteredCommodities.filter((item) => item.stream === 'russia-to-africa');
  const africanStreamItems = filteredCommodities.filter((item) => item.stream === 'africa-to-russia');
  const FAQS = [
    {
      question: t('exportImportPage.exportImport.text_110'),
      answer: t('exportImportPage.exportImport.text_111')
    },
    {
      question: t('exportImportPage.exportImport.text_112'),
      answer: t('exportImportPage.exportImport.text_113')
    },
    {
      question: t('exportImportPage.exportImport.text_114'),
      answer: t('exportImportPage.exportImport.text_115')
    },
    {
      question: t('exportImportPage.exportImport.text_116'),
      answer: t('exportImportPage.exportImport.text_117')
    },
    {
      question: t('exportImportPage.exportImport.text_118'),
      answer: t('exportImportPage.exportImport.text_119')
    }
  ];

  return (
    <div className="pb-20 space-y-20 bg-slate-950 text-slate-100 min-h-screen">
      <ExportImportHero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" />
                <span>{t('exportImportPage.exportImport.text_120')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {t('exportImportPage.exportImport.text_121')}
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {t('exportImportPage.exportImport.text_122')}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-2xl sm:text-4xl font-black text-amber-400">54</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">{t('exportImportPage.exportImport.text_123')}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t('exportImportPage.exportImport.text_124')}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-2xl sm:text-4xl font-black text-emerald-400">70%+</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">{t('exportImportPage.exportImport.text_125')}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t('exportImportPage.exportImport.text_126')}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-2xl sm:text-4xl font-black text-sky-400">14–21</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">{t('exportImportPage.exportImport.text_127')}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t('exportImportPage.exportImport.text_128')}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-2xl sm:text-4xl font-black text-amber-400">$20B+</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">{t('exportImportPage.exportImport.text_129')}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t('exportImportPage.exportImport.text_130')}</div>
            </div>
          </div>
        </div>
      </section>
      <section id="commodity-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('exportImportPage.exportImport.text_131')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  {t('exportImportPage.exportImport.text_132')}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full lg:w-auto overflow-x-auto">
              {[
                { id: 'All', label: t('exportImportPage.exportImport.text_133') },
                { id: 'russia-to-africa', label: t('exportImportPage.exportImport.text_134') },
                { id: 'africa-to-russia', label: t('exportImportPage.exportImport.text_135') }
              ].map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => setSelectedStream(stream.id as any)}
                  className={`flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedStream === stream.id
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {stream.label}
                </button>
              ))}
            </div>

          </div>
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>{t('exportImportPage.exportImport.text_136')}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {[
                { id: 'All', name: t('exportImportPage.exportImport.text_137') },
                { id: 'Agricultural & Food', name: t('exportImportPage.exportImport.text_138') },
                { id: 'Fertilizers & Agro', name: t('exportImportPage.exportImport.text_139') },
                { id: 'Minerals & Industrial', name: t('exportImportPage.exportImport.text_140') },
                { id: 'Consumer & Textiles', name: t('exportImportPage.exportImport.text_141') }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>
      {(selectedStream === 'All' || selectedStream === 'russia-to-africa') && (
        <section id="russian-exports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Wheat className="w-4 h-4" />
              <span>{t('exportImportPage.exportImport.text_142')}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t('exportImportPage.exportImport.text_143')}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl">
              {t('exportImportPage.exportImport.text_144')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {russianStreamItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className="space-y-4">
                  <div className="relative h-52 rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase border border-amber-500/30">
                      {item.category}
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 text-[10px] font-mono border border-slate-800">
                      {item.hsCode}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.shortDescription}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                      <div>
                        <span className="font-bold text-amber-400">{t('exportImportPage.exportImport.text_145')}</span>
                        <span className="text-slate-300">{item.regions}</span>
                      </div>
                      <div>
                        <span className="font-bold text-amber-400">{t('exportImportPage.exportImport.text_146')}</span>
                        <span className="text-slate-300 line-clamp-2">{item.tradeImportance}</span>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedCommodity(item)}
                    className="w-full py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t('exportImportPage.exportImport.text_147')}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Lightbulb className="w-8 h-8" />
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="text-xs font-black text-amber-400 uppercase tracking-widest">
                {t('exportImportPage.exportImport.text_148')}
              </div>
              <h3 className="text-xl font-black text-white">
                {t('exportImportPage.exportImport.text_149')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t('exportImportPage.exportImport.text_150')}
              </p>
            </div>
          </div>

        </section>
      )}
      {(selectedStream === 'All' || selectedStream === 'africa-to-russia') && (
        <section id="african-exports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest">
              <Coffee className="w-4 h-4" />
              <span>{t('exportImportPage.exportImport.text_151')}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t('exportImportPage.exportImport.text_152')}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl">
              {t('exportImportPage.exportImport.text_153')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {africanStreamItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="space-y-4">
                  <div className="relative h-52 rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/30">
                      {item.category}
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 text-[10px] font-mono border border-slate-800">
                      {item.hsCode}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.shortDescription}
                    </p>
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
                      <div>
                        <span className="font-bold text-emerald-400">{t('exportImportPage.exportImport.text_154')}</span>
                        <span className="text-slate-300">{item.regions}</span>
                      </div>
                      <div>
                        <span className="font-bold text-emerald-400">{t('exportImportPage.exportImport.text_155')}</span>
                        <span className="text-slate-300 line-clamp-2">{item.tradeImportance}</span>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedCommodity(item)}
                    className="w-full py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t('exportImportPage.exportImport.text_156')}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Lightbulb className="w-8 h-8" />
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                {t('exportImportPage.exportImport.text_157')}
              </div>
              <h3 className="text-xl font-black text-white">
                {t('exportImportPage.exportImport.text_158')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t('exportImportPage.exportImport.text_159')}
              </p>
            </div>
          </div>

        </section>
      )}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Box className="w-4 h-4" />
              <span>{t('exportImportPage.exportImport.text_160')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('exportImportPage.exportImport.text_161')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('exportImportPage.exportImport.text_162')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: t('exportImportPage.exportImport.text_163'),
                desc: t('exportImportPage.exportImport.text_164')
              },
              {
                step: '02',
                title: t('exportImportPage.exportImport.text_165'),
                desc: t('exportImportPage.exportImport.text_166')
              },
              {
                step: '03',
                title: t('exportImportPage.exportImport.text_167'),
                desc: t('exportImportPage.exportImport.text_168')
              },
              {
                step: '04',
                title: t('exportImportPage.exportImport.text_169'),
                desc: t('exportImportPage.exportImport.text_170')
              },
              {
                step: '05',
                title: t('exportImportPage.exportImport.text_171'),
                desc: t('exportImportPage.exportImport.text_172')
              }
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative hover:border-amber-500/40 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-black">
                  {p.step}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
      <section id="freight-corridors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Ship className="w-4 h-4" />
              <span>{t('exportImportPage.exportImport.text_173')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('exportImportPage.exportImport.text_174')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('exportImportPage.exportImport.text_175')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Anchor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                {t('exportImportPage.exportImport.text_176')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('exportImportPage.exportImport.text_177')}
              </p>
              <div className="text-[11px] font-bold text-amber-400 pt-2 border-t border-slate-800">
                {t('exportImportPage.exportImport.text_178')}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                {t('exportImportPage.exportImport.text_179')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('exportImportPage.exportImport.text_180')}
              </p>
              <div className="text-[11px] font-bold text-sky-400 pt-2 border-t border-slate-800">
                {t('exportImportPage.exportImport.text_181')}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                {t('exportImportPage.exportImport.text_182')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('exportImportPage.exportImport.text_183')}
              </p>
              <div className="text-[11px] font-bold text-emerald-400 pt-2 border-t border-slate-800">
                {t('exportImportPage.exportImport.text_184')}
              </div>
            </div>

          </div>

        </div>
      </section>
      <section id="customs-incoterms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <FileCheck2 className="w-4 h-4" />
              <span>{t('exportImportPage.exportImport.text_185')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('exportImportPage.exportImport.text_186')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('exportImportPage.exportImport.text_187')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-amber-400 text-xs font-black uppercase tracking-wider">
                {t('exportImportPage.exportImport.text_188')}
              </div>
              <h3 className="text-base font-bold text-white">{t('exportImportPage.exportImport.text_189')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('exportImportPage.exportImport.text_190')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-emerald-400 text-xs font-black uppercase tracking-wider">
                {t('exportImportPage.exportImport.text_191')}
              </div>
              <h3 className="text-base font-bold text-white">{t('exportImportPage.exportImport.text_192')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('exportImportPage.exportImport.text_193')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sky-400 text-xs font-black uppercase tracking-wider">
                {t('exportImportPage.exportImport.text_194')}
              </div>
              <h3 className="text-base font-bold text-white">{t('exportImportPage.exportImport.text_195')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t('exportImportPage.exportImport.text_196')}
              </p>
            </div>

          </div>

        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>{t('exportImportPage.exportImport.text_197')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t('exportImportPage.exportImport.text_198')}
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <CommodityDetailModal
        commodity={selectedCommodity}
        onClose={() => setSelectedCommodity(null)}
      />

    </div>
  );
};
