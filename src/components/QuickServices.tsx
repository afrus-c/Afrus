import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Ship,
  GraduationCap,
  Building2,
  Globe2,
  Banknote,
  ShoppingBag,
  Sparkles,
  Users,
  Crown,
  Languages,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedQuickServices } from '../utils/contentLocalization';

interface QuickServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Ship,
  GraduationCap,
  Building2,
  Globe2,
  Banknote,
  ShoppingBag,
  Sparkles,
  Users,
  Crown,
  Languages
};

const SERVICE_PATH_MAP: Record<string, string> = {
  'export-import': '/trade',
  'study-in-russia': '/education',
  'business-russia': '/business',
  'business-africa': '/business',
  'money-transfer': '/trade',
  'store-crafts': '/store',
  'festivals-culture': '/events',
  'business-forum': '/events',
  'concierge': '/concierge',
  'learn-languages': '/language'
};

export const QuickServices: React.FC<QuickServicesProps> = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const localizedServices = getLocalizedQuickServices(language);

  return (
    <section id="services" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <span>{t('homePage.quickServices.text_001')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('homePage.quickServices.text_002')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            {t('homePage.quickServices.text_003')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {localizedServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Globe2;
            const targetPath = SERVICE_PATH_MAP[service.id] || '/';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => navigate(targetPath)}
                className={`group cursor-pointer rounded-2xl p-5 transition-all relative flex flex-col justify-between border ${
                  service.featured
                    ? 'bg-gradient-to-b from-slate-800/90 to-slate-900 border-amber-500/40 shadow-xl shadow-amber-500/10 hover:border-amber-400'
                    : 'bg-slate-950/80 hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
                }`}
                id={`service-card-${service.id}`}
              >
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider border border-amber-500/45 shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>{t('homePage.quickServices.text_004')}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
