import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedTestimonials } from '../utils/contentLocalization';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, t } = useLanguage();
  const localizedTestimonials = getLocalizedTestimonials(language);

  const activeTestimonial = localizedTestimonials[currentIndex] || localizedTestimonials[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % localizedTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + localizedTestimonials.length) % localizedTestimonials.length);
  };

  if (!activeTestimonial) return null;

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <MessageSquareQuote className="w-4 h-4" />
            <span>{t('aboutPage.testimonials.text_001')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('aboutPage.testimonials.text_002')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {t('aboutPage.testimonials.text_003')}
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-8 sm:p-14 relative shadow-2xl">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-amber-500/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-lg sm:text-2xl text-slate-200 font-medium leading-relaxed italic">
                "{activeTestimonial.quote}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-900">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40 shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {activeTestimonial.name}
                  </h4>
                  <div className="text-xs text-amber-400 font-semibold">
                    {activeTestimonial.role} • {activeTestimonial.organization}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t('aboutPage.testimonials.text_004')} {activeTestimonial.country}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-between pt-8 border-t border-slate-900 mt-8">
            <div className="flex items-center gap-2">
              {localizedTestimonials.map((testimonial, idx) => (
                <button
                  key={testimonial.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 h-2.5 bg-amber-400 rounded-full'
                      : 'w-2.5 h-2.5 bg-slate-700 rounded-full hover:bg-slate-500'
                  }`}
                  aria-label={`${t('aboutPage.testimonials.goTo')} ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800 transition-colors"
                aria-label={t('aboutPage.testimonials.previous')}
                id="testimonial-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800 transition-colors"
                aria-label={t('aboutPage.testimonials.next')}
                id="testimonial-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
