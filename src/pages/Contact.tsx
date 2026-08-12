import React from 'react';
import { ContactHero } from '../components/ContactHero';
import { ContactSection } from '../components/ContactSection';

export const Contact: React.FC = () => {
  return (
    <div className="pb-16 space-y-12 bg-slate-950 text-slate-100">
      <ContactHero />
      <ContactSection />
    </div>
  );
};
