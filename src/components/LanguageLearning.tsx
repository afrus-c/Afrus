import React from 'react';
import { motion } from 'motion/react';
import { Languages, Globe, BookOpen, MessageSquareText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedLanguageCourses } from '../utils/contentLocalization';

interface LanguageLearningProps {
  onOpenInquiry: (subject?: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Languages,
  Globe,
  BookOpen,
  MessageSquareText
};

export const LanguageLearning: React.FC<LanguageLearningProps> = ({ onOpenInquiry }) => {
  const { language, t, trans } = useLanguage();
  const courses = getLocalizedLanguageCourses(language);
  return (
    <section id="languages" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Languages className="w-4 h-4" />
            <span>{trans('AFRUS Language Academy', 'Académie de Langues AFRUS', 'Академия Языков AFRUS')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {trans('Master English, French & Russian', 'Maîtrisez l\'Anglais, le Français & le Russe', 'Освойте Английский, Французский и Русский')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {trans(
              'Specialized immersion programs tailored for university admission, international trade negotiations, diplomatic protocol, and cultural fluency.',
              'Programmes d\'immersion spécialisés conçus pour l\'admission universitaire, le commerce international, la diplomatie et l\'aisance culturelle.',
              'Языковые программы для поступления в ВУЗы, международных переговоров, дипломатии и культурной интеграции.'
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const IconComp = ICON_MAP[course.icon] || Languages;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950 rounded-3xl border border-slate-800 hover:border-amber-500/50 p-8 flex flex-col justify-between group shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black border border-amber-200 shadow-sm">
                      {course.format}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors mb-2">
                    {course.title}
                  </h3>

                  <div className="text-xs font-semibold text-amber-400 mb-3">
                    {course.level} • {course.duration}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {course.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-slate-900">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                      {trans('Course Highlights:', 'Points Forts du Cours:', 'Особенности Курса:')}
                    </div>
                    {course.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-900">
                  <button
                    onClick={() => onOpenInquiry(t('languagePages.common.enrollmentSubject', { course: course.language }))}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-800 hover:border-amber-400 shadow-md"
                    id={`lang-enroll-btn-${course.id}`}
                  >
                    <span>{trans('Enroll in Academy', 'S\'inscrire à l\'Académie', 'Записаться в Академию')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
