import React, { useState } from 'react';
import { LEARNER_SERVICES_DATA } from '../data/instructorData';
import { LearnerService } from '../types/induction';
import { 
  HeartHandshake, 
  Coins, 
  Sparkles, 
  Users, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  Info,
  Calendar,
  Building
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const LearnerServicesModule: React.FC = () => {
  const [selectedService, setSelectedService] = useState<LearnerService>(LEARNER_SERVICES_DATA[0]);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Coins':
        return <Coins className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <HeartHandshake className="w-5 h-5 text-[#39A900]" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#00324D] to-[#004e75] text-white p-6 sm:p-8 border border-slate-700 shadow-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2 tracking-wider uppercase">
          <SenaLogo variant="white" className="w-4 h-4" />
          <span>Bienestar al Aprendiz SENA</span>
          <span>·</span>
          <span className="text-slate-300">Formación Integral</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Servicios y Beneficios de Bienestar al Aprendiz
        </h1>
        <p className="text-sm text-slate-200 mt-2 max-w-3xl leading-relaxed">
          El SENA no solo te capacita técnicamente: te acompaña con un ecosistema completo de apoyo socioeconómico (apoyos FIC), monitorías con remuneración, salud ocupacional, actividades deportivas, cultura y orientación psicosocial durante toda tu permanencia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Services (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
            Líneas de Atención Institucional
          </span>
          {LEARNER_SERVICES_DATA.map(service => {
            const isSelected = selectedService.id === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-[#39A900] shadow-sm ring-1 ring-[#39A900]'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/60 flex items-center justify-center shrink-0">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {service.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {service.title}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#39A900] translate-x-1' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Service Detailed Card (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                {selectedService.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              {getServiceIcon(selectedService.iconName)}
              <span>{selectedService.title}</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {selectedService.description}
            </p>
          </div>

          {/* Benefits Bullet Points */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Beneficios Concretos para el Aprendiz
            </h3>
            <ul className="space-y-2.5">
              {selectedService.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility & Procedure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>Requisitos de Elegibilidad</span>
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedService.eligibility}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Cómo Acceder o Postularte</span>
              </span>
              <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed">
                {selectedService.contactOrProcedure}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
