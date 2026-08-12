import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Ticket, Sparkles, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedEvents } from '../utils/contentLocalization';
import { CMS_EVENTS } from '../data/editorialContent';

interface EventsSectionProps {
  onOpenInquiry: (subject?: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { language, t, trans } = useLanguage();
  const localizedEvents = getLocalizedEvents(language);

  const filterTabs = [
    { key: 'all', label: trans('All Events', 'Tous les Événements', 'Все События') },
    { key: 'Business Forum', label: trans('Business Forum', 'Forum d\'Affaires', 'Бизнес-Форум') },
    { key: 'Festival', label: trans('Festival', 'Festival', 'Фестиваль') },
    { key: 'Conference', label: trans('Conference', 'Conférence', 'Конференция') },
    { key: 'Networking', label: trans('Networking', 'Réseautage', 'Нетворкинг') }
  ];

  const filteredEvents = activeTab === 'all'
    ? localizedEvents
    : localizedEvents.filter(e => CMS_EVENTS.find(source => source.id === e.id)?.type === activeTab);

  return (
    <section id="events" className="py-24 bg-slate-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>{trans('Summit & Cultural Schedule', 'Calendrier des Sommets & Culture', 'Расписание Саммитов и Событий')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {trans('Upcoming Russia – Africa Events', 'Événements À Venir Russie – Afrique', 'Предстоящие События Россия – Африка')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {trans(
              'Connect directly with diplomatic delegations, university deans, export executives, and artists at high-profile summits and festivals.',
              'Échangez directement avec des délégations diplomatiques, doyens d\'universités, dirigeants d\'exportation et artistes lors de sommets prestigieux.',
              'Встречайтесь с дипломатическими делегациями, деканами ВУЗов, экспортерами и деятелями культуры на высшем уровне.'
            )}
          </p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.key
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
              id={`event-tab-${tab.key.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                    {event.type}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-bold bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{event.location}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug mb-3">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {event.description}
                  </p>
                  {event.speakers && (
                    <div className="pt-3 border-t border-slate-900">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                        {trans('Key Speakers & Guests:', 'Intervenants & Invités Clés :', 'Ключевые Спикеры и Гости:')}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {event.speakers.map((spk, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800">
                            {spk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-5 border-t border-slate-800/80">
                  <button
                    onClick={() => onOpenInquiry(t('eventsPage.registrationSubject').replace('{{title}}', event.title))}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    id={`event-register-btn-${event.id}`}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{trans('Register / Attend Event', 'S\'inscrire / Participer', 'Зарегистрироваться на Событие')}</span>
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
