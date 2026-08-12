import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Globe2, GraduationCap, Building2, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import aboutContent from '../content/pages/about-page.json';
import { resolveCmsText } from '../content/types';

interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  subtext: string;
  icon: React.ElementType;
}

export const StatsSection: React.FC = () => {
  const { language } = useLanguage();

  const icons: Record<string, React.ElementType> = { Globe2, GraduationCap, Building2, Calendar };

  const stats: StatItem[] = aboutContent.stats.map((stat) => ({
    ...stat,
    prefix: stat.prefix || undefined,
    suffix: stat.suffix || undefined,
    label: resolveCmsText(stat.label, language),
    subtext: resolveCmsText(stat.subtext, language),
    icon: icons[stat.icon] || Globe2
  }));

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative border-t border-b border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-900/90 border border-amber-500/20 backdrop-blur-xl text-center flex flex-col items-center justify-center space-y-3 shadow-2xl hover:border-amber-400 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md">
                  <IconComp className="w-7 h-7" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline justify-center">
                  {stat.prefix}
                  <CountUp value={stat.value} duration={2} start={isInView} />
                  {stat.suffix}
                </div>

                <div className="text-base font-extrabold text-amber-400">
                  {stat.label}
                </div>

                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
const CountUp: React.FC<{ value: number; duration: number; start: boolean }> = ({ value, duration, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, start]);

  return <span>{count.toLocaleString()}</span>;
};
