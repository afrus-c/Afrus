import React, { useState } from 'react';
import {
  Ship,
  Anchor,
  Truck,
  Plane,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Globe2,
  HelpCircle,
  Info,
  Layers,
  Box,
  TrendingUp,
  BarChart3,
  Scale,
  Compass,
  FileText,
  Sparkles,
  Wheat,
  Coffee,
  ArrowRight,
  Mail,
  Zap,
  Building2,
  ChevronDown,
  Sprout,
  Gem,
  Shirt
} from 'lucide-react';
import { TradeSection } from '../components/TradeSection';
import { TradeHero } from '../components/TradeHero';
import { useLanguage } from '../context/LanguageContext';

interface TradeProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Trade: React.FC<TradeProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const tradeStats = [
    {
      label: t('tradePage.trade.text_001'),
      value: '$20 Billion+',
      note: t('tradePage.trade.text_002')
    },
    {
      label: t('tradePage.trade.text_003'),
      value: t('tradePage.trade.text_004'),
      note: t('tradePage.trade.text_005')
    },
    {
      label: t('tradePage.trade.text_006'),
      value: t('tradePage.trade.text_007'),
      note: t('tradePage.trade.text_008')
    },
    {
      label: t('tradePage.trade.text_009'),
      value: t('tradePage.trade.text_010'),
      note: t('tradePage.trade.text_011')
    }
  ];

  const russianExports = [
    {
      title: t('tradePage.trade.text_012'),
      category: t('tradePage.trade.text_013'),
      icon: Wheat,
      description: t('tradePage.trade.text_014'),
      importance: t('tradePage.trade.text_015')
    },
    {
      title: t('tradePage.trade.text_016'),
      category: t('tradePage.trade.text_017'),
      icon: Sprout,
      description: t('tradePage.trade.text_018'),
      importance: t('tradePage.trade.text_019')
    },
    {
      title: t('tradePage.trade.text_020'),
      category: t('tradePage.trade.text_021'),
      icon: Building2,
      description: t('tradePage.trade.text_022'),
      importance: t('tradePage.trade.text_023')
    },
    {
      title: t('tradePage.trade.text_024'),
      category: t('tradePage.trade.text_025'),
      icon: Zap,
      description: t('tradePage.trade.text_026'),
      importance: t('tradePage.trade.text_027')
    },
    {
      title: t('tradePage.trade.text_028'),
      category: t('tradePage.trade.text_029'),
      icon: Box,
      description: t('tradePage.trade.text_030'),
      importance: t('tradePage.trade.text_031')
    },
    {
      title: t('tradePage.trade.text_032'),
      category: t('tradePage.trade.text_033'),
      icon: Layers,
      description: t('tradePage.trade.text_034'),
      importance: t('tradePage.trade.text_035')
    }
  ];

  const africanExports = [
    {
      title: t('tradePage.trade.text_036'),
      category: t('tradePage.trade.text_037'),
      icon: Coffee,
      origin: t('tradePage.trade.text_038'),
      description: t('tradePage.trade.text_039'),
      impact: t('tradePage.trade.text_040')
    },
    {
      title: t('tradePage.trade.text_041'),
      category: t('tradePage.trade.text_042'),
      icon: Sparkles,
      origin: t('tradePage.trade.text_043'),
      description: t('tradePage.trade.text_044'),
      impact: t('tradePage.trade.text_045')
    },
    {
      title: t('tradePage.trade.text_046'),
      category: t('tradePage.trade.text_047'),
      icon: Sprout,
      origin: t('tradePage.trade.text_048'),
      description: t('tradePage.trade.text_049'),
      impact: t('tradePage.trade.text_050')
    },
    {
      title: t('tradePage.trade.text_051'),
      category: t('tradePage.trade.text_052'),
      icon: Gem,
      origin: t('tradePage.trade.text_053'),
      description: t('tradePage.trade.text_054'),
      impact: t('tradePage.trade.text_055')
    },
    {
      title: t('tradePage.trade.text_056'),
      category: t('tradePage.trade.text_057'),
      icon: Shirt,
      origin: t('tradePage.trade.text_058'),
      description: t('tradePage.trade.text_059'),
      impact: t('tradePage.trade.text_060')
    },
    {
      title: t('tradePage.trade.text_061'),
      category: t('tradePage.trade.text_062'),
      icon: TrendingUp,
      origin: t('tradePage.trade.text_063'),
      description: t('tradePage.trade.text_064'),
      impact: t('tradePage.trade.text_065')
    }
  ];

  const tradeDocuments = [
    {
      name: t('tradePage.trade.text_066'),
      code: t('tradePage.trade.text_067'),
      description: t('tradePage.trade.text_068')
    },
    {
      name: t('tradePage.trade.text_069'),
      code: t('tradePage.trade.text_070'),
      description: t('tradePage.trade.text_071')
    },
    {
      name: t('tradePage.trade.text_072'),
      code: t('tradePage.trade.text_073'),
      description: t('tradePage.trade.text_074')
    },
    {
      name: t('tradePage.trade.text_075'),
      code: t('tradePage.trade.text_076'),
      description: t('tradePage.trade.text_077')
    },
    {
      name: t('tradePage.trade.text_078'),
      code: t('tradePage.trade.text_079'),
      description: t('tradePage.trade.text_080')
    }
  ];

  const incotermsList = [
    {
      code: 'FOB',
      name: t('tradePage.trade.text_081'),
      sellerRole: t('tradePage.trade.text_082'),
      buyerRole: t('tradePage.trade.text_083'),
      bestFor: t('tradePage.trade.text_084')
    },
    {
      code: 'CIF',
      name: t('tradePage.trade.text_085'),
      sellerRole: t('tradePage.trade.text_086'),
      buyerRole: t('tradePage.trade.text_087'),
      bestFor: t('tradePage.trade.text_088')
    },
    {
      code: 'EXW',
      name: t('tradePage.trade.text_089'),
      sellerRole: t('tradePage.trade.text_090'),
      buyerRole: t('tradePage.trade.text_091'),
      bestFor: t('tradePage.trade.text_092')
    },
    {
      code: 'DDP',
      name: t('tradePage.trade.text_093'),
      sellerRole: t('tradePage.trade.text_094'),
      buyerRole: t('tradePage.trade.text_095'),
      bestFor: t('tradePage.trade.text_096')
    }
  ];

  const faqs = [
    {
      q: t('tradePage.trade.text_097'),
      a: t('tradePage.trade.text_098')
    },
    {
      q: t('tradePage.trade.text_099'),
      a: t('tradePage.trade.text_100')
    },
    {
      q: t('tradePage.trade.text_101'),
      a: t('tradePage.trade.text_102')
    },
    {
      q: t('tradePage.trade.text_103'),
      a: t('tradePage.trade.text_104')
    },
    {
      q: t('tradePage.trade.text_105'),
      a: t('tradePage.trade.text_106')
    }
  ];

  return (
    <div className="pb-16 space-y-20 bg-slate-950 text-slate-100">
      <TradeHero />
      <section id="trade-stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            <span>{t('tradePage.trade.text_107')}</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            {t('tradePage.trade.text_108')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('tradePage.trade.text_109')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tradeStats.map((stat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-amber-500/30 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">{stat.label}</div>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">{stat.note}</p>
            </div>
          ))}
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              {t('tradePage.trade.text_110')}
            </span>
            <h3 className="text-lg font-bold text-white">
              {t('tradePage.trade.text_111')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('tradePage.trade.text_112')}
            </p>
          </div>
        </div>
      </section>
      <TradeSection />
      <section id="russia-exports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Wheat className="w-4 h-4" />
            <span>{t('tradePage.trade.text_113')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('tradePage.trade.text_114')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('tradePage.trade.text_115')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {russianExports.map((exp, idx) => {
            const IconComp = exp.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {exp.category}
                    </span>
                    <IconComp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">
                    {t('tradePage.trade.text_116')}
                  </span>
                  <p className="leading-normal">{exp.importance}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="africa-imports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Coffee className="w-4 h-4" />
            <span>{t('tradePage.trade.text_117')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {t('tradePage.trade.text_118')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('tradePage.trade.text_119')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {africanExports.map((imp, idx) => {
            const IconComp = imp.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {imp.category}
                    </span>
                    <IconComp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{imp.title}</h3>
                  <div className="text-[11px] text-amber-300 font-medium">
                    {t('tradePage.trade.text_120')} {imp.origin}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{imp.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">
                    {t('tradePage.trade.text_121')}
                  </span>
                  <p className="leading-normal">{imp.impact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="freight-corridors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Ship className="w-4 h-4" />
            <span>{t('tradePage.trade.text_122')}</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            {t('tradePage.trade.text_123')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('tradePage.trade.text_124')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Anchor className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('tradePage.trade.text_125')}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('tradePage.trade.text_126')}
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">
                {t('tradePage.trade.text_127')}
              </span>
              <p>
                {t('tradePage.trade.text_128')}
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('tradePage.trade.text_129')}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('tradePage.trade.text_130')}
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">
                {t('tradePage.trade.text_131')}
              </span>
              <p>
                {t('tradePage.trade.text_132')}
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('tradePage.trade.text_133')}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('tradePage.trade.text_134')}
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">
                {t('tradePage.trade.text_135')}
              </span>
              <p>
                {t('tradePage.trade.text_136')}
              </p>
            </div>
          </div>

        </div>
      </section>
      <section id="trade-docs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>{t('tradePage.trade.text_137')}</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            {t('tradePage.trade.text_138')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('tradePage.trade.text_139')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">
                {t('tradePage.trade.text_140')}
              </h3>
            </div>

            <div className="space-y-4">
              {tradeDocuments.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">{doc.name}</span>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{doc.code}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">
                {t('tradePage.trade.text_141')}
              </h3>
            </div>

            <div className="space-y-4">
              {incotermsList.map((inco, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                      {inco.code}
                    </span>
                    <span className="text-xs font-extrabold text-white">{inco.name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="text-slate-300">
                      <span className="text-amber-400 font-semibold block">
                        {t('tradePage.trade.text_142')}
                      </span>
                      {inco.sellerRole}
                    </div>
                    <div className="text-slate-300">
                      <span className="text-amber-400 font-semibold block">
                        {t('tradePage.trade.text_143')}
                      </span>
                      {inco.buyerRole}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                    {t('tradePage.trade.text_144')} {inco.bestFor}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>{t('tradePage.trade.text_145')}</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            {t('tradePage.trade.text_146')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('tradePage.trade.text_147')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Mail className="w-4 h-4" />
              <span>{t('tradePage.trade.text_148')}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t('tradePage.trade.text_149')}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('tradePage.trade.text_150')}
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => onOpenInquiry(t('tradePage.inquiry.knowledgeHub'))}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                id="trade-final-contact-btn"
              >
                <span>{t('tradePage.trade.text_151')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
