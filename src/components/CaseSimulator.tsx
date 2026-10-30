import React, { useState } from 'react';
import { PRACTICE_CASES } from '../data/inductionData';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  ShieldAlert,
  Award
} from 'lucide-react';

export const CaseSimulator: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [userSelections, setUserSelections] = useState<Record<string, string>>({});
  const [completedCases, setCompletedCases] = useState<Record<string, boolean>>({});

  const currentCase = PRACTICE_CASES[selectedCaseIndex];
  const selectedOptionId = userSelections[currentCase.id];
  const selectedOption = currentCase.options.find(o => o.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    setUserSelections(prev => ({
      ...prev,
      [currentCase.id]: optionId
    }));

    const opt = currentCase.options.find(o => o.id === optionId);
    if (opt?.isCorrect) {
      setCompletedCases(prev => ({ ...prev, [currentCase.id]: true }));
    }
  };

  const handleNextCase = () => {
    if (selectedCaseIndex < PRACTICE_CASES.length - 1) {
      setSelectedCaseIndex(prev => prev + 1);
    } else {
      setSelectedCaseIndex(0);
    }
  };

  const handleResetCurrentCase = () => {
    setUserSelections(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
  };

  const solvedCount = Object.keys(completedCases).length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Simulador Práctico de Convivencia</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1">
              Dilemas Cotidianos del Aprendiz SENA
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Enfréntate a situaciones reales que ocurren en los centros de formación y toma la decisión correcta según el Reglamento del Aprendiz y los valores institucionales.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 shrink-0">
            <Award className="w-5 h-5 text-emerald-600" />
            <div className="text-xs">
              <p className="text-slate-500">Casos Resueltos</p>
              <p className="font-mono font-bold text-slate-900 text-sm">
                {solvedCount} / {PRACTICE_CASES.length}
              </p>
            </div>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 mt-6">
          {PRACTICE_CASES.map((item, idx) => {
            const isSolved = !!completedCases[item.id];
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCaseIndex(idx)}
                className={`px-3.5 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  selectedCaseIndex === idx
                    ? 'border-[#39A900] text-[#00324D] font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Caso {idx + 1}</span>
                {isSolved && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Case Card */}
      <section className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
              {currentCase.learningCategory}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Ref: {currentCase.normativeReference}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{currentCase.title}</h2>
        </div>

        {/* Story context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Contexto de la situación
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentCase.context}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              El Dilema a Resolver
            </span>
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
              {currentCase.situation}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            ¿Qué acción debe tomar el aprendiz? Selecciona una alternativa:
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {currentCase.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

              if (isSelected) {
                if (option.isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500/30';
                } else {
                  optionStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 ring-1 ring-rose-400/30';
                }
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {isSelected ? (
                        option.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <span>{option.id.slice(-1).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm leading-relaxed font-medium">
                        {option.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decision Result & Feedback */}
        {selectedOption && (
          <div className={`p-6 rounded-xl border animate-in fade-in duration-200 ${
            selectedOption.isCorrect 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  {selectedOption.isCorrect ? (
                    <span className="font-bold text-sm text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ¡Decisión Conforme al Reglamento y a la Ética SENA!
                    </span>
                  ) : (
                    <span className="font-bold text-sm text-rose-800 flex items-center gap-1.5">
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                      Decisión Errada o Riesgo Normativo
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {selectedOption.explanation}
                </p>
                <div className="text-xs text-slate-600 pt-2 border-t border-current/10">
                  <span className="font-semibold">Fundamento: </span>
                  {currentCase.normativeReference}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!selectedOption.isCorrect && (
                  <button
                    onClick={handleResetCurrentCase}
                    className="px-3 py-1.5 bg-white text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Intentar de nuevo</span>
                  </button>
                )}

                <button
                  onClick={handleNextCase}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{selectedCaseIndex === PRACTICE_CASES.length - 1 ? 'Volver al Inicio' : 'Siguiente Caso'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
