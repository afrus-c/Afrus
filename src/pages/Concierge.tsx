import React from 'react';
import { ConciergeSection } from '../components/ConciergeSection';
import { ConciergeHero } from '../components/ConciergeHero';

interface ConciergeProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Concierge: React.FC<ConciergeProps> = ({ onOpenInquiry }) => {
  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <ConciergeHero onOpenInquiry={onOpenInquiry} />
      <ConciergeSection onOpenInquiry={onOpenInquiry} />
    </div>
  );
};
