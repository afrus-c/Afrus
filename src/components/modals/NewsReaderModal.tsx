import React from 'react';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';
import { NewsItem } from '../../types';
import { useTranslation } from 'react-i18next';

interface NewsReaderModalProps {
  article: NewsItem | null;
  onClose: () => void;
}

export const NewsReaderModal: React.FC<NewsReaderModalProps> = ({ article, onClose }) => {
  const { t } = useTranslation();
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl my-auto">
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 text-white border border-slate-700"
            id="news-modal-close"
            aria-label={t('newsPage.reader.closeLabel')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 inline-block">
              {article.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              {article.title}
            </h3>
          </div>
        </div>
        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {article.readTime}
              </span>
            </div>
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <User className="w-3.5 h-3.5 text-amber-400" />
              {article.author}
            </span>
          </div>

          <div className="text-base text-amber-300/90 font-medium leading-relaxed italic p-4 rounded-xl bg-slate-950 border border-slate-800">
            "{article.excerpt}"
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {article.content}
          </p>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              {t('newsPage.reader.publishedBy')} <strong>{t('newsPage.reader.publisher')}</strong>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase"
            >
              {t('newsPage.reader.close')}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
