import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Award,
  FileText,
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Search,
  Building2,
  MapPin,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedUniversities } from '../utils/contentLocalization';
import fallbackUniImg from '../assets/images/edu_russia_university_1785951841700.jpg';

interface StudyInRussiaProps {
  onOpenInquiry: (subject?: string) => void;
}

export const StudyInRussia: React.FC<StudyInRussiaProps> = ({ onOpenInquiry }) => {
  const { language, t } = useLanguage();
  const universities = useMemo(() => getLocalizedUniversities(language), [language]);
  const [activeUniversityIndex, setActiveUniversityIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const activeUniversity = universities[activeUniversityIndex] || universities[0];

  const cities = useMemo(() => {
    const citySet = new Set<string>();
    universities.forEach((university) => {
      if (university.city.includes('/')) {
        university.city.split('/').forEach((city) => citySet.add(city.trim()));
      } else {
        citySet.add(university.city.trim());
      }
    });
    return ['All', ...Array.from(citySet)];
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const matchesQuery =
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.programs.some((program) => program.toLowerCase().includes(searchQuery.toLowerCase())) ||
        university.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === 'All' || university.city.toLowerCase().includes(selectedCity.toLowerCase());

      return matchesQuery && matchesCity;
    });
  }, [universities, searchQuery, selectedCity]);

  const visaSteps = [
    {
      step: '01',
      title: t('studyPage.content.text_001'),
      desc: t('studyPage.content.text_002')
    },
    {
      step: '02',
      title: t('studyPage.content.text_003'),
      desc: t('studyPage.content.text_004')
    },
    {
      step: '03',
      title: t('studyPage.content.text_005'),
      desc: t('studyPage.content.text_006')
    },
    {
      step: '04',
      title: t('studyPage.content.text_007'),
      desc: t('studyPage.content.text_008')
    }
  ];

  const handleNextUni = () => {
    setActiveUniversityIndex((previousIndex) => (previousIndex + 1) % universities.length);
  };

  const handlePrevUni = () => {
    setActiveUniversityIndex(
      (previousIndex) => (previousIndex - 1 + universities.length) % universities.length
    );
  };

  if (!activeUniversity) return null;

  return (
    <section id="education-overview" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbf3f4] border border-[#e8cdd1] text-[#8b5960] text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-[#a56870]" />
            <span>{t('studyPage.content.text_009')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('studyPage.content.text_010')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {t('studyPage.content.text_011')}
          </p>
        </div>

        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 mb-20 shadow-2xl relative">
          <div className="text-xs font-black uppercase tracking-widest text-[#8b5960] mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#a56870]" />
            <span>{t('studyPage.content.text_012')} ({activeUniversityIndex + 1} {t('studyPage.content.text_013')} {universities.length})</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-72 sm:h-[400px] group border border-amber-500/20 shadow-xl">
              <img
                src={activeUniversity.image}
                alt={activeUniversity.name}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackUniImg; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#f4e2e5] text-[#713f47] text-xs font-black uppercase tracking-wider border border-[#dfbcc1] shadow-sm">
                  {activeUniversity.ranking}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#e5eef9] text-[#31577f] border border-[#bfd0e7] text-xs font-extrabold shadow-sm">
                  {activeUniversity.city}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-800">
                <span>{t('studyPage.content.text_014')} <strong className="text-[#8b5960]">{activeUniversity.tuitionRange}</strong></span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" /> {t('studyPage.content.text_015')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-bold text-[#8b5960] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#a56870]" />
                  <span>{activeUniversity.city}, {t('studyPage.content.text_016')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                  {activeUniversity.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeUniversity.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t('studyPage.content.text_017')}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeUniversity.programs.map((program) => (
                    <span
                      key={program}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[#45688f] text-xs font-medium"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevUni}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-[#e5eef9] hover:text-[#31577f] text-[#8b5960] border border-slate-800 transition-colors"
                    aria-label={t('studyPage.content.previousUniversity')}
                    id="uni-slider-prev"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextUni}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-[#e5eef9] hover:text-[#31577f] text-[#8b5960] border border-slate-800 transition-colors"
                    aria-label={t('studyPage.content.nextUniversity')}
                    id="uni-slider-next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-slate-400 ml-2 font-mono">
                    {activeUniversityIndex + 1} / {universities.length}
                  </span>
                </div>

                <button
                  onClick={() => onOpenInquiry(t('studyPage.subjects.admission', { university: activeUniversity.name }))}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#668bc2] to-[#5379b3] hover:from-[#7799ca] hover:to-[#668bc2] text-[#ffffff] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  id="uni-apply-btn"
                >
                  <span>{t('studyPage.content.text_018')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        <div id="featured-universities" className="space-y-8 mb-20 scroll-mt-24">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#8b5960] mb-2">
                <Building2 className="w-4 h-4 text-[#a56870]" />
                <span>{t('studyPage.content.text_019')}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white">
                {t('studyPage.content.text_020')} ({universities.length})
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {t('studyPage.content.text_021')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t('studyPage.content.text_022')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-slate-900 text-slate-200">
                    {t('studyPage.content.text_023')} {city === 'All' ? t('studyPage.content.text_024') : city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni, idx) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all group overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackUniImg; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-extrabold">
                      <span className="px-2.5 py-1 rounded-full bg-[#f4e2e5] text-[#713f47] uppercase border border-[#dfbcc1] shadow-sm">
                        {uni.ranking}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#e5eef9] text-[#31577f] border border-[#bfd0e7] backdrop-blur-md shadow-sm">
                        {uni.city}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 text-xs text-[#8b5960] font-bold bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80">
                      {t('studyPage.content.text_025')} {uni.tuitionRange}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#8b5960] transition-colors leading-snug">
                        {uni.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {t(`studyPage.universityDescriptions.${uni.id}`, uni.description)}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t('studyPage.content.text_026')}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {uni.programs.map((prog, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-900/80 mt-4">
                  <div className="flex items-center justify-between mb-3 text-[11px]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t('studyPage.content.text_027')}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenInquiry(t('studyPage.subjects.admission', { university: uni.name }))}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#e5eef9] hover:text-[#31577f] text-[#45688f] font-bold text-xs uppercase tracking-wider border border-[#cbd8e9] hover:border-[#aac0df] transition-all flex items-center justify-center gap-2 group/btn"
                    id={`apply-uni-${uni.id}`}
                  >
                    <span>{t('studyPage.content.text_028')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-sm">
              {t('studyPage.content.text_029')} "{searchQuery}".
            </div>
          )}

        </div>

        <div id="admission-journey" className="space-y-8 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">
              {t('studyPage.content.text_030')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('studyPage.content.text_031')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visaSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="text-3xl font-black text-amber-500/40 font-mono mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-base font-extrabold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-900 flex items-center gap-1.5 text-[11px] font-semibold text-[#8b5960]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('studyPage.content.text_032')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => onOpenInquiry(t('studyPage.subjects.general'))}
              className="px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-[#eef3fa] border border-[#cbd8e9] text-[#45688f] font-bold text-xs uppercase tracking-widest transition-all shadow-md"
              id="study-consult-btn"
            >
              {t('studyPage.content.text_033')}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
