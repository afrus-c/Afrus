import React from 'react';
import { EventsSection } from '../components/EventsSection';
import { EventsHero } from '../components/EventsHero';

interface EventsProps {
  onOpenInquiry: (subject?: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onOpenInquiry }) => {
  return (
    <div className="pb-16 space-y-16 bg-slate-950 text-slate-100">
      <EventsHero onOpenInquiry={onOpenInquiry} />
      <div id="events-section">
        <EventsSection onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
};
