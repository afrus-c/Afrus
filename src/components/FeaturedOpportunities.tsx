import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Ship, TrendingUp, Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { OpportunityItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedOpportunities } from '../utils/contentLocalization';

interface FeaturedOpportunitiesProps {
  onSelectOpportunity: (opportunity: OpportunityItem) => void;
}

export const FeaturedOpportunities: React.FC<FeaturedOpportunitiesProps> = ({ onSelectOpportunity }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { language, t, trans } = useLanguage();

  const localizedOpps = getLocalizedOpportunities(language);

  const categories = [
    { id: 'all', label: trans('All Opportunities', 'Toutes les Opportunités', 'Все Возможности') },
    { id: 'scholarship', label: trans('Scholarships', 'Bourses d\'Études', 'Гранты и Стипендии'), icon: GraduationCap },
    { id: 'business', label: trans('Business', 'Affaires & Commerce', 'Бизнес и Инвестиции'), icon: Briefcase },
    { id: 'trade', label: trans('Trade & Logistics', 'Commerce & Logistique', 'Торговля и Логистика'), icon: Ship },
    { id: 'investment', label: trans('Investment', 'Investissements', 'Инвестиции'), icon: TrendingUp },
    { id: 'cultural', label: trans('Cultural Exchange', 'Échanges Culturels', 'Культурный Обмен'), icon: Sparkles }
  ];

  const filteredOpportunities = activeCategory === 'all'
    ? localizedOpps
    : localizedOpps.filter(o => o.category === activeCategory);

  return (
    <section id="opportunities" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>{trans('High-Impact Programs', 'Programmes à Fort Impact', 'Программы Высокого Влияния')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {trans('Featured Bilateral Opportunities', 'Opportunités Bilatérales Vedettes', 'Избранные Двусторонние Возможности')}
          </h2>

          <p className="text-slate-300 text-base">
            {trans(
              'Handpicked scholarships, investment zones, trade agreements, and cultural delegations curated for immediate participation.',
              'Bourses d\'études, zones d\'investissement, accords commerciaux et délégations culturelles sélectionnés pour une participation immédiate.',
              'Гранты, зоны инвестиций, торговые соглашения и культурные миссии для вашего участия.'
            )}
          </p>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
                id={`opp-tab-${cat.id}`}
              >
                {IconComp && <IconComp className="w-4 h-4" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredOpportunities.map((opp, index) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <img
                  src={opp.image}
                  alt={opp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                    {opp.category}
                  </span>
                </div>
                {opp.deadline && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-amber-400 text-xs font-semibold border border-amber-500/30">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{trans('Deadline:', 'Date limite :', 'Срок:')} {opp.deadline}</span>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{opp.location}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-snug mb-3">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {opp.description}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{trans('Key Benefits:', 'Avantages Clés :', 'Ключевые Преимущества:')}</div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {opp.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-5 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectOpportunity(opp)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn shadow-md"
                    id={`opp-apply-btn-${opp.id}`}
                  >
                    <span>{trans('View Requirements & Apply', 'Voir les Conditions & Postuler', 'Условия и Подача Заявки')}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
