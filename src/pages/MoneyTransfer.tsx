import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard,
  Landmark,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Globe2,
  BookOpen,
  FileText,
  Calculator,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Scale,
  Sparkles,
  Lock,
  Search,
  Info,
  Clock,
  Coins,
  ArrowRight,
  Layers,
  Lightbulb,
  FileCheck2,
  Receipt,
  Network
} from 'lucide-react';
import universityCampusImg from '../assets/images/university_campus_russia_1785919887504.jpg';
import { useLanguage } from '../context/LanguageContext';
import { usePageTranslation } from '../utils/usePageTranslation';
import moneyTransferContent from '../content/pages/money-transfer.json';
import { resolveCmsText } from '../content/types';

interface MoneyTransferProps {
  onOpenInquiry?: (subject?: string) => void;
}


export const MoneyTransfer: React.FC<MoneyTransferProps> = ({ onOpenInquiry }) => {
  const { language } = useLanguage();
  const pageRef = usePageTranslation(language);
  const cmsText = (value: { en: string; fr: string; ru: string }) => resolveCmsText(value, language);
  const HERO_SLIDES = moneyTransferContent.hero.slides.map((slide) => ({ ...slide, tag: cmsText(slide.tag), caption: cmsText(slide.caption) }));
  const GLOSSARY_ITEMS = moneyTransferContent.glossary.map((item) => ({ term: cmsText(item.term), def: cmsText(item.definition) }));
  const FAQS = moneyTransferContent.faqs.map((item) => ({ q: cmsText(item.question), a: cmsText(item.answer) }));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transferType, setTransferType] = useState<'tuition' | 'trade' | 'remittance'>('tuition');
  const [currencyPair, setCurrencyPair] = useState<'RUB-NGN' | 'RUB-XAF' | 'RUB-USD' | 'NGN-RUB' | 'XAF-RUB'>('RUB-NGN');
  const [inputAmount, setInputAmount] = useState<number>(100000);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [openGlossaryIndex, setOpenGlossaryIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeComplianceTab, setActiveComplianceTab] = useState<'students' | 'businesses' | 'individuals'>('students');
  useEffect(() => {
    if (!isPlaying || HERO_SLIDES.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };
  const calculateEstimate = () => {
    let rate = 1;
    let labelFrom = 'RUB';
    let labelTo = 'NGN';

    switch (currencyPair) {
      case 'RUB-NGN':
        rate = 16.5; // 1 RUB = ~16.5 NGN
        labelFrom = 'RUB (Ruble)';
        labelTo = 'NGN (Naira)';
        break;
      case 'RUB-XAF':
        rate = 6.4; // 1 RUB = ~6.4 XAF
        labelFrom = 'RUB (Ruble)';
        labelTo = 'XAF (BEAC Franc)';
        break;
      case 'RUB-USD':
        rate = 0.011; // 1 RUB = ~0.011 USD
        labelFrom = 'RUB (Ruble)';
        labelTo = 'USD (Dollar)';
        break;
      case 'NGN-RUB':
        rate = 0.061; // 1 NGN = ~0.061 RUB
        labelFrom = 'NGN (Naira)';
        labelTo = 'RUB (Ruble)';
        break;
      case 'XAF-RUB':
        rate = 0.156; // 1 XAF = ~0.156 RUB
        labelFrom = 'XAF (BEAC Franc)';
        labelTo = 'RUB (Ruble)';
        break;
    }

    const estimatedConverted = (inputAmount * rate).toLocaleString('en-US', {
      maximumFractionDigits: 2
    });

    const feeMin = transferType === 'trade' ? 1.5 : transferType === 'tuition' ? 0.8 : 1.2;
    const feeMax = transferType === 'trade' ? 2.5 : transferType === 'tuition' ? 1.5 : 2.0;

    return {
      converted: estimatedConverted,
      labelFrom,
      labelTo,
      feeRange: `${feeMin}% – ${feeMax}%`,
      estTime: transferType === 'tuition' ? '1 – 2 Business Days' : '2 – 4 Business Days'
    };
  };

  const calcResult = calculateEstimate();
  const filteredGlossary = GLOSSARY_ITEMS.filter(
    (item) =>
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  if (HERO_SLIDES.length === 0) return null;
  return (
    <div ref={pageRef} className="pb-20 space-y-20 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* ==========================================
          1. HERO SECTION WITH CINEMATIC SLIDESHOW
          ========================================== */}
      <section className="relative min-h-[88vh] flex flex-col justify-between bg-slate-950 border-b border-slate-800/80 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].caption}
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
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[160px] pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 30, -30, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[180px] pointer-events-none"
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {['₽', '₦', 'FCFA', '$', '€', '¥'].map((symbol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: [0.1, 0.35, 0.1],
                  y: [-20, -120, -20],
                  x: [0, idx % 2 === 0 ? 30 : -30, 0]
                }}
                transition={{
                  duration: 12 + idx * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 1.5
                }}
                className="absolute text-amber-400/30 font-black text-2xl sm:text-4xl"
                style={{
                  left: `${15 + idx * 15}%`,
                  top: `${40 + (idx % 3) * 15}%`
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>
          <svg
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M 50 150 Q 500 120 950 150" fill="none" stroke="rgba(0, 57, 166, 0.2)" strokeWidth="1" strokeDasharray="6 6" />
            <path d="M 50 300 Q 500 280 950 300" fill="none" stroke="rgba(0, 57, 166, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
            <motion.path
              d="M 580 160 Q 480 260 420 380"
              fill="none"
              stroke="#0039a6"
              strokeWidth="2"
              strokeDasharray="8 6"
              animate={{ strokeDashoffset: [100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d="M 580 160 Q 520 280 480 390"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="8 6"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            <circle cx="580" cy="160" r="5" fill="#0039a6" />
            <circle cx="420" cy="380" r="4" fill="#38bdf8" />
            <circle cx="480" cy="390" r="4" fill="#10b981" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-md mb-6"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>{cmsText(moneyTransferContent.hero.badge)}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-5xl leading-none drop-shadow-2xl"
          >
            {cmsText(moneyTransferContent.hero.title)} <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              {cmsText(moneyTransferContent.hero.titleAccent)}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-slate-200 text-base sm:text-xl max-w-3xl leading-relaxed font-normal drop-shadow-lg"
          >
            {cmsText(moneyTransferContent.hero.description)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('payment-methods')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2 group"
            >
              <span>{cmsText(moneyTransferContent.hero.primaryCta)}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('commercial-settlements')}
              className="px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-widest shadow-xl backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>{cmsText(moneyTransferContent.hero.secondaryCta)}</span>
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/85 border border-slate-800/80 backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={slide.tag}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="h-3 w-px bg-slate-800" />

            <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
              {HERO_SLIDES[currentSlide].tag}
            </span>
          </motion.div>

        </div>

      </section>

      {/* ==========================================
          2. CORE FUNDAMENTALS: HOW TRANSFERS WORK
          ========================================== */}
      <section id="payment-methods" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>EDUCATIONAL FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How International Money Transfers Work
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Cross-border financial transactions rely on structured interbank protocols, messaging rails, and statutory compliance checks to route funds safely across international borders.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Payer Initiation & KYC',
              desc: 'The sender provides beneficiary details, commercial invoice or admission letter, and undergoes Know Your Customer (KYC) identity verification at their bank.',
              icon: FileText
            },
            {
              step: '02',
              title: 'Intermediary Clearing',
              desc: 'Funds enter international correspondent banking channels. Nostro and Vostro accounts are debited and credited via secure financial messaging networks.',
              icon: Network
            },
            {
              step: '03',
              title: 'Foreign Exchange (FX)',
              desc: 'The transaction currency is converted (e.g., NGN/XAF to RUB or EUR/CNY) based on interbank exchange rates and specified settlement terms.',
              icon: Coins
            },
            {
              step: '04',
              title: 'Beneficiary Crediting',
              desc: 'The destination bank receives clearing confirmation (e.g., SWIFT MT103), performs local regulatory checks, and credits the beneficiary account.',
              icon: CheckCircle2
            }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      STEP {item.step}
                    </span>
                    <IconComp className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Role of Financial Institutions</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commercial banks, central banks, and authorized payment service providers manage liquidity reserves, issue credit letters, and ensure orderly currency clearing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Compliance & Regulations</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              International transfers comply with statutory Anti-Money Laundering (AML) controls, sanction screening databases, and foreign exchange declaration rules.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Security & Encryption</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modern interbank networks use end-to-end cryptographic protocols to safeguard sensitive financial data and prevent unauthorized transaction tampering.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. REGIONAL PAYMENT CORRIDORS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Globe2 className="w-4 h-4" />
              <span>REGIONAL PAYMENT EXAMPLES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Bilateral Payment Corridors & Case Studies
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore educational overviews of how payments are structured across key regional trade corridors and academic routes connecting Russia and Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-widest">
                    REGIONAL CORRIDOR 01
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Russia ↔ Central Africa (BEAC / XAF Zone)
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ArrowLeftRight className="w-6 h-6" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Businesses and individuals conducting transactions between Russia and Central African nations—including <strong>Cameroon, Gabon, Republic of the Congo, Chad, and Central African Republic</strong>—navigate foreign exchange rules defined by the Bank of Central African States (BEAC).
              </p>

              <div className="space-y-3 bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Currencies Involved: </strong>
                    <span className="text-slate-300">Central African CFA Franc (XAF), Russian Ruble (RUB), Euros (EUR), Yuan (CNY).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">BEAC FX Declarations: </strong>
                    <span className="text-slate-300">Outbound commercial transfers above statutory thresholds require BEAC authorization and verified import documentation.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Correspondent Clearing: </strong>
                    <span className="text-slate-300">Transactions frequently route through third-country correspondent hubs with dual-currency clearing capabilities.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                    REGIONAL CORRIDOR 02
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Russia ↔ Nigeria (CBN / NGN Corridor)
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Commercial payments supporting bilateral trade in <strong>agricultural wheat, fertilizers, industrial machinery, raw cocoa, and consumer goods</strong> follow regulations established by the Central Bank of Nigeria (CBN).
              </p>

              <div className="space-y-3 bg-slate-900 p-5 rounded-2xl border border-slate-800 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Statutory Documentation: </strong>
                    <span className="text-slate-300">Importers file <strong>Form M</strong> through authorized dealer banks, while exporters utilize <strong>Form NXP</strong> for regulatory clearing.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Trade Invoicing Options: </strong>
                    <span className="text-slate-300">Commercial contracts are increasingly denominated in neutral trade currencies or direct local currency settlement channels.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">FX Liquidity Windows: </strong>
                    <span className="text-slate-300">Understanding official interbank windows helps commercial entities anticipate processing timelines.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-widest border border-amber-500/30">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC FINANCIAL GUIDANCE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Student Tuition & Living Expense Transfers
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tens of thousands of African students pursue higher education across Russian universities. Paying tuition fees, dormitory charges, and living stipends requires clear procedural planning.
                </p>
              </div>

              <div className="shrink-0">
                <img
                  src={universityCampusImg}
                  alt="Russian University Campus"
                  className="w-36 h-28 object-cover rounded-2xl border border-slate-700 shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold text-xs">1. Verify University Details</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Always obtain the official invoice from the university accounting department. Verify the INN, KPP, BIC, and full Russian bank account number.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold text-xs">2. Reference Identification</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Include the student’s full name (as written in passport), student ID number, and tuition contract number in the wire transfer comment field.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold text-xs">3. Retain Bank Receipts</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Keep stamped bank payment receipts (or SWIFT MT103 confirmations). These are required by university registrars and visa renewal officers.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          4. COMMERCIAL TRADE SETTLEMENTS
          ========================================== */}
      <section id="commercial-settlements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
            <Scale className="w-4 h-4" />
            <span>TRADE FINANCE INSTRUMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Commercial Trade Settlement Mechanisms
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Understanding standard trade finance instruments helps buyers and sellers structure secure commercial agreements that mitigate cross-border counterparty risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
              Commercial Invoices & Wire Transfers (T/T)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Telegraphic Transfers (T/T) are standard interbank wire payments executed directly between buyer and seller banks based on mutually agreed commercial invoices.
            </p>
            <div className="text-[11px] font-bold text-amber-400 pt-2 border-t border-slate-800">
              Best used for: Established long-term supplier relationships.
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
              Letters of Credit (L/C)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Irrevocable Letters of Credit issued by the buyer’s bank guarantee payment to the exporter once compliant shipping and phytosanitary documents are presented.
            </p>
            <div className="text-[11px] font-bold text-sky-400 pt-2 border-t border-slate-800">
              Best used for: High-value bulk commodity & machinery shipments.
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
              Escrow & Neutral Holding
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              An escrow agreement holds buyer funds with a neutral banking agent until cargo inspection reports (e.g. SGS) verify quality at destination loading ports.
            </p>
            <div className="text-[11px] font-bold text-emerald-400 pt-2 border-t border-slate-800">
              Best used for: New trading partners and custom equipment orders.
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
              Documentary Collections (D/P, D/A)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Documents Against Payment (D/P) or Acceptance (D/A) involve shipping documents being released to the importer only after bank payment or acceptance.
            </p>
            <div className="text-[11px] font-bold text-purple-400 pt-2 border-t border-slate-800">
              Best used for: Containerized agricultural produce & consumer goods.
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
              Deferred Payment Terms
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Credit agreements allowing buyers 30, 60, or 90 days after bill of lading issuance to complete payment, often backed by trade insurance policies.
            </p>
            <div className="text-[11px] font-bold text-amber-400 pt-2 border-t border-slate-800">
              Best used for: High-turnover agricultural and commodity distributors.
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
              Bilateral Clearing Accounts
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Specialized interbank accounts established between partner commercial banks allowing direct settlement in national currencies without third-country conversions.
            </p>
            <div className="text-[11px] font-bold text-sky-400 pt-2 border-t border-slate-800">
              Best used for: Direct government-to-government & major corporate trade.
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          5. EDUCATIONAL CURRENCY & FEE SIMULATOR
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-widest">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE EDUCATIONAL TOOL</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Currency & Clearing Fee Simulator
              </h2>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-xs">
              <Info className="w-4 h-4 text-amber-400 inline mr-1" />
              Non-binding simulation demonstrating standard interbank cost models.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6 lg:col-span-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Transaction Type:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tuition', label: 'Tuition' },
                    { id: 'trade', label: 'Trade' },
                    { id: 'remittance', label: 'Family' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTransferType(t.id as any)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        transferType === t.id
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Select Currency Route:
                </label>
                <select
                  value={currencyPair}
                  onChange={(e) => setCurrencyPair(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="RUB-NGN">RUB (Ruble) → NGN (Naira)</option>
                  <option value="RUB-XAF">RUB (Ruble) → XAF (CFA Franc)</option>
                  <option value="RUB-USD">RUB (Ruble) → USD (US Dollar)</option>
                  <option value="NGN-RUB">NGN (Naira) → RUB (Ruble)</option>
                  <option value="XAF-RUB">XAF (CFA Franc) → RUB (Ruble)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Amount to Transfer:
                </label>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-base font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Estimated Conversion Output (Mid-Market Baseline)
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-3xl sm:text-5xl font-black text-amber-400">
                    {calcResult.converted} <span className="text-lg font-bold text-slate-300">{calcResult.labelTo.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Baseline for {inputAmount.toLocaleString()} {calcResult.labelFrom}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-medium">Intermediary Fee Model:</span>
                    <div className="text-sm font-bold text-white">{calcResult.feeRange}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-medium">Interbank Transit Time:</span>
                    <div className="text-sm font-bold text-white">{calcResult.estTime}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Educational Simulator Disclaimer: </strong>
                This tool provides conceptual estimates based on standard international interbank clearing formulas. AFRUS is an information platform and does not provide financial advice, take deposits, or execute wire transfers.
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          6. INTERNATIONAL BANKING MESSAGING RAILS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Network className="w-4 h-4" />
              <span>FINANCIAL INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              International Banking & Messaging Systems
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Understand the difference between financial messaging networks (which transmit instructions) and clearing houses (which move real money reserves).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">01. SWIFT Network</div>
              <h3 className="text-lg font-bold text-white">Global Interbank Messaging</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                SWIFT uses standardized message formats (such as MT103 for customer transfers and MT202 for bank settlements) to instruct banks on fund distribution worldwide.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">02. SPFS & CIPS Systems</div>
              <h3 className="text-lg font-bold text-white">Alternative Messaging Rails</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                SPFS (Russia) and CIPS (China) provide independent, secure messaging channels connecting participating banks across Eurasia, Asia, and partner African institutions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sky-400 font-bold text-xs uppercase tracking-wider">03. Bilateral Nostro Links</div>
              <h3 className="text-lg font-bold text-white">Direct Reserve Settlement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Commercial banks holding direct accounts with one another clear funds directly without third-country intermediary delays, enhancing execution speed.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          7. COMPLIANCE & CHECKLIST TABBED SECTION
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-widest">
                <FileCheck2 className="w-4 h-4" />
                <span>REGULATORY COMPLIANCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Required Payment Documentation Checklist
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
              {[
                { id: 'students', label: 'Students' },
                { id: 'businesses', label: 'Businesses' },
                { id: 'individuals', label: 'Individuals' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveComplianceTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeComplianceTab === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {activeComplianceTab === 'students' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Official Russian University Invoice / Tuition Contract Number',
                  'Passport copy with valid Russian student visa page',
                  'Correct Bank Details (University INN, KPP, BIC, IBAN/Account Number)',
                  'Full Student Name and Reference Code in Transfer Purpose Field',
                  'Stamped Bank Receipt / SWIFT MT103 confirmation copy'
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeComplianceTab === 'businesses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Signed International Commercial Sales Contract',
                  'Pro-Forma Invoice & Final Commercial Invoice',
                  'Bill of Lading / Air Waybill Transport Document',
                  'Customs Export/Import Declarations (e.g. Form M / BEAC)',
                  'Phytosanitary or SGS Cargo Inspection Certificates'
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeComplianceTab === 'individuals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Government-Issued Photo Identification (Passport / National ID)',
                  'Proof of Source of Funds (Salary Statement / Bank Record)',
                  'Verified Beneficiary Bank Account Details',
                  'Declaration of Non-Commercial Family Remittance Purpose',
                  'Tax Identification Number (TIN) where applicable'
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ==========================================
          8. FINANCIAL TERMINOLOGY GLOSSARY
          ========================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>FINANCIAL GLOSSARY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Key Financial Terminology
          </h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search financial terms (e.g. L/C, Nostro, Form M, SWIFT)..."
            value={glossarySearch}
            onChange={(e) => setGlossarySearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="space-y-3">
          {filteredGlossary.map((item, idx) => {
            const isOpen = openGlossaryIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenGlossaryIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm hover:text-amber-400 transition-colors"
                >
                  <span>{item.term}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3"
                    >
                      {item.def}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          9. PRACTICAL TIPS FOR BUSINESSES & STUDENTS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
              <Lightbulb className="w-4 h-4" />
              <span>BEST PRACTICES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Practical Guidance for Smooth Transfers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-black text-xs uppercase tracking-wider">01. Verify Account Codes</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always double-check Russian INN, KPP, and BIC codes before executing tuition or invoice transfers. A single digit mismatch can delay clearing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-black text-xs uppercase tracking-wider">02. Plan Processing Buffers</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allow 3 to 5 business days for statutory compliance reviews, especially prior to university tuition deadlines or customs cargo arrivals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-sky-400 font-black text-xs uppercase tracking-wider">03. Store Official Receipts</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always request and archive the official SWIFT MT103 copy or stamped bank receipt. Keep digital copies for immigration and tax records.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-purple-400 font-black text-xs uppercase tracking-wider">04. Monitor FX Trends</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Understand mid-market exchange rate trends and compare bank spreads to optimize large commercial invoice or annual tuition payments.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          10. FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>EDUCATIONAL FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Financial Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          11. FINAL SINGLE CALL TO ACTION AT BOTTOM
          ========================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/40 text-center space-y-6 shadow-2xl">
          
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
            <Building2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Need More Information About Russia–Africa Cross-Border Payments?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            If you have questions about international payment systems, trade settlements, tuition transfers, or financial processes related to Russia and Africa, the AFRUS team is available to provide guidance and direct you to appropriate resources.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onOpenInquiry?.('Cross-Border Payments Guidance')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>Contact AFRUS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
