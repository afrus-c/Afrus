import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { CMS_NEWS } from '../data/editorialContent';
import { NewsItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedNews } from '../utils/contentLocalization';

interface LatestNewsProps {
  onSelectNews: (news: NewsItem) => void;
  selectedCategory?: string;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ onSelectNews, selectedCategory = 'All' }) => {
  const { language, t, trans } = useLanguage();
  const localizedNews = getLocalizedNews(language).map(article => ({
    ...article,
    content: t(`newsPage.articles.${article.id}.content`, article.content)
  }));

  const filteredNews = selectedCategory === 'All'
    ? localizedNews
    : localizedNews.filter((article) => CMS_NEWS.find(source => source.id === article.id)?.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const displayNews = filteredNews.length > 0 ? filteredNews : localizedNews;

  return (
    <section id="news-articles-grid" className="py-16 bg-slate-950 border-t border-slate-800 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Newspaper className="w-4 h-4" />
            <span>{trans('Official Insights & Press', 'Presse & Analyses Officielles', 'Пресса и Официальная Аналитика')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {trans('Latest AFRUS News & Intelligence', 'Dernières Actualités & Analyses AFRUS', 'Последние Новости и Аналитика AFRUS')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {trans(
              'Stay informed on bilateral policy updates, scholarship quota releases, trade statistics, and diplomatic summits.',
              'Restez informé des politiques bilatérales, bourses, statistiques commerciales et sommets diplomatiques.',
              'Будьте в курсе изменений двусторонней политики, квот на обучение, торговли и дипломатических встреч.'
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayNews.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1 font-semibold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {article.readTime}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onSelectNews(article)}
                    className="w-full py-3 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-800 hover:border-amber-400 shadow-sm"
                    id={`news-read-btn-${article.id}`}
                  >
                    <span>{trans('Read Full Article', 'Lire l\'Article Complet', 'Читать Полностью')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
