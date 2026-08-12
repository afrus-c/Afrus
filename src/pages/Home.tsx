import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Newspaper,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  Send,
  ExternalLink
} from 'lucide-react';

import { Hero } from '../components/Hero';
import { AboutAfrus } from '../components/AboutAfrus';
import { QuickServices } from '../components/QuickServices';
import { WhyChooseAfrus } from '../components/WhyChooseAfrus';

import { STORE_PRODUCTS } from '../data/storeProducts';
import { getDualPrice } from '../utils/currency';
import { CONTACT_INFO, WHATSAPP_CONFIG, getWhatsAppConsultationUrl } from '../data/content';
import { NewsItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedEvents, getLocalizedNews } from '../utils/contentLocalization';
import { getLocalizedCategory, getLocalizedProducts } from '../utils/productLocalization';

interface HomeProps {
  onOpenInquiry: (subject?: string) => void;
  onSelectNews: (news: NewsItem) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenInquiry, onSelectNews }) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const featuredProducts = getLocalizedProducts(STORE_PRODUCTS, language).slice(0, 4);
  const featuredEvents = getLocalizedEvents(language).slice(0, 3);
  const featuredNews = getLocalizedNews(language).slice(0, 3);

  return (
    <div className="space-y-0 bg-slate-950">
      <Hero onOpenInquiry={onOpenInquiry} />
      <AboutAfrus onOpenInquiry={onOpenInquiry} />
      <QuickServices />
      <WhyChooseAfrus />
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('homePage.home.text_001')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {t('homePage.home.text_002')}
              </h2>
            </div>

            <Link
              to="/store"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all self-start md:self-auto shadow-lg shadow-amber-500/20"
              id="home-visit-store-btn"
            >
              <span>{t('homePage.home.text_003')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/store/product/${prod.id}`)}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/90 text-amber-400 text-[10px] font-bold uppercase border border-slate-800">
                    {getLocalizedCategory(prod.category, language)}
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-black text-amber-400 mb-1 flex items-center gap-1.5">
                      <span>{getDualPrice(prod.priceUsd, undefined, prod.priceRub).rub}</span>
                      <span className="text-xs text-slate-300 font-normal">({getDualPrice(prod.priceUsd, undefined, prod.priceRub).usd})</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:text-amber-300">
                    <span>{t('homePage.home.text_004')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('homePage.home.text_005')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {t('homePage.home.text_006')}
              </h2>
            </div>

            <Link
              to="/events"
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all self-start md:self-auto"
              id="home-view-events-btn"
            >
              <span>{t('homePage.home.text_007')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="h-44 relative overflow-hidden bg-slate-900">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/90 text-amber-400 text-[10px] font-bold uppercase border border-slate-800">
                    {evt.type}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      {evt.date}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <Link
                    to="/events"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{t('homePage.home.text_008')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                <Newspaper className="w-3.5 h-3.5" />
                <span>{t('homePage.home.text_009')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {t('homePage.home.text_010')}
              </h2>
            </div>

            <Link
              to="/news"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all self-start md:self-auto"
              id="home-view-news-btn"
            >
              <span>{t('homePage.home.text_011')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((article) => (
              <div
                key={article.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-colors flex flex-col justify-between group"
              >
                <div className="h-44 relative overflow-hidden bg-slate-950">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                    {article.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[11px] text-amber-400 font-semibold mb-1">
                      {article.date} • {article.readTime}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectNews(article)}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{t('homePage.home.text_012')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900/90 rounded-3xl border border-amber-500/30 p-8 sm:p-12 shadow-2xl space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {t('homePage.home.text_013')}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                {t('homePage.home.text_014')}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenInquiry(t('homePage.contact.inquirySubject'))}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center gap-2"
                id="home-contact-afrus-btn"
              >
                <Mail className="w-4 h-4" />
                <span>{t('homePage.home.text_015')}</span>
              </button>

              <a
                href={getWhatsAppConsultationUrl(t('homePage.home.misc_whatsapp_message'))}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/20 transition-all flex items-center gap-2"
                id="home-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
            <div className="pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center sm:text-left">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{t('homePage.home.text_016')}</div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-bold text-white hover:text-amber-400 transition-colors block">
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{t('homePage.home.text_017')}</div>
                <a href={`https://wa.me/${WHATSAPP_CONFIG.number}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-amber-400 transition-colors block">
                  {WHATSAPP_CONFIG.formatted}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{t('homePage.home.text_018')}</div>
                <a href={`tel:+${CONTACT_INFO.phones[1].raw}`} className="text-sm font-bold text-white hover:text-amber-400 transition-colors block">
                  {CONTACT_INFO.phones[1].number}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Telegram</div>
                <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-amber-400 transition-colors block">
                  {CONTACT_INFO.telegram}
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
