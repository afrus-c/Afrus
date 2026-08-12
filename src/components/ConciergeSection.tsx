import React from 'react';
import { motion } from 'motion/react';
import {
  Crown,
  Plane,
  FileCheck,
  Languages,
  Hotel,
  Handshake,
  HeartPulse,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedConciergeServices } from '../utils/contentLocalization';
import conciergeImg from '../assets/images/concierge_executive_1785919904384.jpg';

interface ConciergeSectionProps {
  onOpenInquiry: (subject?: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Plane,
  FileCheck,
  Languages,
  Hotel,
  Handshake,
  HeartPulse
};

export const ConciergeSection: React.FC<ConciergeSectionProps> = ({ onOpenInquiry }) => {
  const { language, t, trans } = useLanguage();
  const services = getLocalizedConciergeServices(language);
  return (
    <section id="concierge" className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-4 h-4" />
            <span>{trans('VIP Hospitality & Executive Support', 'Hospitalité VIP & Conciergerie Exécutive', 'VIP Сервис и Поддержка')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {trans('AFRUS Luxury Concierge & Travel', 'Conciergerie De Luxe & Voyages AFRUS', 'VIP Консьерж и Путешествия AFRUS')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {trans(
              'Bespoke, high-touch services designed for international diplomats, corporate CEOs, university deans, and distinguished travelers.',
              'Services sur mesure et haut de gamme conçus pour les diplomates, PDG, doyens d\'université et voyageurs de marque.',
              'Эксклюзивные услуги премиум-класса для дипломатов, руководителей компаний и вип-гостей.'
            )}
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl mb-16 group">
          <img
            src={conciergeImg}
            alt="AFRUS VIP Executive Concierge"
            className="w-full h-80 sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

          <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-center max-w-xl space-y-5">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest w-max shadow-lg">
              {trans('24/7 Diplomatic Concierge Suite', 'Suite Conciergerie Diplomatique 24/7', 'Дипломатический Консьерж 24/7')}
            </span>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {trans('Flawless Comfort & Diplomatic Discretion', 'Confort Parfait & Discrétion Diplomatique', 'Безупречный Комфорт и Дискреция')}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {trans(
                'From private jet tarmac receptions in Moscow to executive security motorcades and certified court translation, AFRUS handles every detail with ultimate precision.',
                'De l\'accueil sur le tarmac des jets privés à Moscou aux escortes sécurisées et à la traduction certifiée, AFRUS gère chaque détail avec précision.',
                'От встречи частных самолетов в Москве до кортежей безопасности и заверенного перевода — AFRUS контролирует каждую деталь.'
              )}
            </p>

            <div>
              <button
                onClick={() => onOpenInquiry(t('conciergePage.subjects.vip'))}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2"
                id="concierge-vip-book-btn"
              >
                <span>{trans('Book VIP Concierge', 'Réserver Conciergerie VIP', 'Заказать VIP Консьерж')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const IconComp = ICON_MAP[item.icon] || Crown;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                      {trans('Included Premium Features:', 'Services Haut de Gamme Inclus:', 'Включенные Премиум Услуги:')}
                    </div>
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => onOpenInquiry(t('conciergePage.subjects.service').replace('{{title}}', item.title))}
                    className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-500/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    id={`concierge-card-btn-${item.id}`}
                  >
                    <span>{trans('Request Service', 'Demander un Service', 'Заказать Услугу')}</span>
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
