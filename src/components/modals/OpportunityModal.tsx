import React from 'react';
import { X, Calendar, MapPin, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { OpportunityItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface OpportunityModalProps {
  opportunity: OpportunityItem | null;
  onClose: () => void;
  onApply: (subject: string) => void;
}

export const OpportunityModal: React.FC<OpportunityModalProps> = ({ opportunity, onClose, onApply }) => {
  const { trans } = useLanguage();
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl my-auto">
        <div className="relative h-64 overflow-hidden">
          <img
            src={opportunity.image}
            alt={opportunity.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 text-white border border-slate-700"
            id="opp-modal-close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 inline-block">
              {opportunity.category}
            </span>
            <h3 className="text-2xl font-black text-white leading-tight">
              {opportunity.title}
            </h3>
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{trans('Location', 'Lieu', 'Место')}: {opportunity.location}</span>
            </div>
            {opportunity.deadline && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{trans('Deadline', 'Date limite', 'Срок подачи')}: {opportunity.deadline}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {opportunity.description}
          </p>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {trans('Included Program Benefits', 'Avantages inclus dans le programme', 'Преимущества программы')}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {opportunity.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-200 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {trans('Eligibility & Application Requirements', 'Conditions d’admissibilité et de candidature', 'Требования к участию и заявке')}:
            </h4>
            <div className="space-y-1.5">
              {opportunity.requirements.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 font-bold text-xs uppercase"
            >
              {trans('Close', 'Fermer', 'Закрыть')}
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(`Application: ${opportunity.title}`);
              }}
              className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
              id="opp-modal-apply-btn"
            >
              <span>{trans('Submit Application', 'Soumettre la candidature', 'Подать заявку')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
