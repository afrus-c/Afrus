import React from 'react';
import { StudyInRussia as StudyInRussiaComponent } from '../components/StudyInRussia';
import { StudyInRussiaHero } from '../components/StudyInRussiaHero';

interface StudyInRussiaProps {
  onOpenInquiry: (subject?: string) => void;
}

export const StudyInRussia: React.FC<StudyInRussiaProps> = ({ onOpenInquiry }) => {
  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <StudyInRussiaHero onOpenInquiry={onOpenInquiry} />

      <StudyInRussiaComponent onOpenInquiry={onOpenInquiry} />
    </div>
  );
};
