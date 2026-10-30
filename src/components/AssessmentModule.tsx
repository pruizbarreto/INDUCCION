import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/inductionData';
import { AssessmentResult, ApprenticeProfile } from '../types/induction';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  BarChart3
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { saveApprenticeExamResult } from '../services/apprenticeApi';

interface AssessmentModuleProps {
  apprentice: ApprenticeProfile;
  assessmentResult: AssessmentResult | null;
  setAssessmentResult: (result: AssessmentResult | null) => void;
  onOpenCertificate: () => void;
}

export const AssessmentModule: React.FC<AssessmentModuleProps> = ({
  apprentice,
  assessmentResult,
  setAssessmentResult,
  onOpenCertificate
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!assessmentResult);
  const [showReviewDetails, setShowReviewDetails] = useState<boolean>(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleFinishEvaluation = () => {
    // Tally answers
    let correctCount = 0;
    const categoryTotals: Record<string, { correct: number; total: number; label: string }> = {
      identidad: { correct: 0, total: 0, label: 'Identidad y Símbolos' },
      derechos: { correct: 0, total: 0, label: 'Derechos del Aprendiz' },
      deberes_prohibiciones: { correct: 0, total: 0, label: 'Deberes y Prohibiciones' },
      ruta_convivencia: { correct: 0, total: 0, label: 'Ruta Formativa y Convivencia' }
    };

    ASSESSMENT_QUESTIONS.forEach(q => {
      const isCorrect = selectedAnswers[q.id] === q.correctOptionId;
      if (isCorrect) correctCount++;
      if (categoryTotals[q.category]) {
        categoryTotals[q.category].total++;
        if (isCorrect) categoryTotals[q.category].correct++;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 70;

    const categoryScores = Object.entries(categoryTotals).map(([key, data]) => ({
      category: data.label,
      score: data.correct,
      total: data.total,
      percentage: Math.round((data.correct / data.total) * 100)
    }));

    const verificationCode = `SENA-IND-${Math.floor(100000 + Math.random() * 900000)}`;

    const result: AssessmentResult = {
      score: percentage,
      percentage,
      totalQuestions,
      correctAnswers: correctCount,
      passed,
      categoryScores,
      completedAt: new Date().toLocaleDateString('es-CO', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      certificateCode: verificationCode
    };

    setAssessmentResult(result);
    setIsSubmitted(true);

    // Persist result securely to server database
    saveApprenticeExamResult(apprentice.id, result).catch(err => {
      console.error('Failed to persist assessment in database:', err);
    });

    if (passed) {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowReviewDetails(false);
    setCurrentQuestionIndex(0);
    setAssessmentResult(null);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <section className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <SenaLogo variant="green" className="w-4 h-4" />
              <span>Evaluación Diagnóstica de Apropiación</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1">
              Validación de Conocimientos de Inducción
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Esta evaluación interactiva identifica si has apropiado los valores institucionales, el reglamento y la ruta formativa del SENA.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 shrink-0">
            <Award className="w-5 h-5 text-emerald-600" />
            <div className="text-xs">
              <p className="text-slate-500">Criterio de Aprobación</p>
              <p className="font-mono font-bold text-slate-900">Mínimo 70% (84 / 100)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container: Exam Mode OR Results Diagnostic Mode */}
      {!isSubmitted ? (
        <section className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
              <span className="font-mono">{answeredCount} de {totalQuestions} respondidas ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#39A900] h-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Quick jump question numbers */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#00324D] text-white ring-2 ring-[#00324D]/30'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                {currentQ.categoryLabel}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-3 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map(opt => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-[#39A900] bg-emerald-50/60 shadow-sm ring-1 ring-emerald-500/30 text-slate-900 font-medium'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold uppercase ${
                      isSelected
                        ? 'border-[#39A900] bg-[#39A900] text-white'
                        : 'border-slate-400 text-slate-600'
                    }`}>
                      {opt.id}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed flex-1">
                      {opt.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 flex-wrap gap-3">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-3">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishEvaluation}
                  disabled={answeredCount < totalQuestions}
                  className="px-5 py-2.5 bg-[#39A900] text-white rounded-lg text-xs font-bold hover:bg-[#2e8800] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finalizar y Obtener Diagnóstico</span>
                </button>
              )}
            </div>
          </div>

          {answeredCount < totalQuestions && (
            <p className="text-[11px] text-slate-400 text-center">
              Faltan {totalQuestions - answeredCount} preguntas por responder para habilitar la calificación oficial.
            </p>
          )}
        </section>
      ) : (
        /* Results & Appropriation Diagnostic View */
        <section className="space-y-8 animate-in fade-in duration-300">
          {/* Main Diagnostic Banner */}
          <div className={`p-8 rounded-2xl border ${
            assessmentResult?.passed 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {assessmentResult?.passed ? (
                    <span className="p-2 bg-emerald-600 text-white rounded-lg">
                      <Award className="w-6 h-6" />
                    </span>
                  ) : (
                    <span className="p-2 bg-amber-600 text-white rounded-lg">
                      <AlertCircle className="w-6 h-6" />
                    </span>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">
                      {assessmentResult?.passed
                        ? '¡Felicitaciones! Has Apropiado la Inducción SENA'
                        : 'Evaluación Completada — Requiere Refuerzo Formativo'}
                    </h2>
                    <p className="text-xs text-current/80">
                      Aprendiz: <strong>{apprentice.name}</strong> · Ficha: <strong>{apprentice.fichaNumber}</strong>
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed max-w-2xl pt-2">
                  {assessmentResult?.passed
                    ? 'Has demostrado una apropiación sólida de la identidad institucional, tus deberes y derechos consagrados en el Reglamento del Aprendiz, y la ruta de formación profesional integral.'
                    : 'Obtuviste un porcentaje inferior al umbral mínimo reglamentario (70%). Te recomendamos repasar los módulos donde tuviste fallas y realizar un nuevo intento para consolidar tu aprendizaje.'}
                </p>
              </div>

              {/* Score visual metric */}
              <div className="bg-white p-6 rounded-xl border border-current/20 text-center shrink-0 min-w-[180px] shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Apropiación Global</p>
                <p className="text-4xl font-extrabold font-mono text-slate-900 my-1">
                  {assessmentResult?.percentage}%
                </p>
                <p className="text-[11px] text-slate-600">
                  {assessmentResult?.correctAnswers} de {assessmentResult?.totalQuestions} correctas
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    assessmentResult?.passed 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {assessmentResult?.passed ? 'COMPETENTE / A' : 'POR MEJORAR / D'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-current/15 flex-wrap">
              {assessmentResult?.passed && (
                <button
                  onClick={onOpenCertificate}
                  className="px-5 py-2.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver y Descargar Constancia Oficial</span>
                </button>
              )}

              <button
                onClick={() => setShowReviewDetails(!showReviewDetails)}
                className="px-4 py-2 bg-white text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{showReviewDetails ? 'Ocultar Justificaciones' : 'Revisar Preguntas y Artículos'}</span>
              </button>

              <button
                onClick={handleRetake}
                className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Intentar Nueva Evaluación</span>
              </button>
            </div>
          </div>

          {/* Breakdown by Dimensions */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>Desglose Diagnóstico por Dimensiones Formativas</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentResult?.categoryScores.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.category}</span>
                    <span className="font-mono font-bold text-slate-900">{cat.score}/{cat.total} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        cat.percentage >= 70 ? 'bg-[#39A900]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {cat.percentage >= 70
                      ? 'Nivel de apropiación satisfactorio.'
                      : 'Se sugiere reforzar lectura en la guía y reglamento.'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Question Review with Regulations References */}
          {showReviewDetails && (
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900">
                Auditoría de Respuestas y Fundamentos del Reglamento
              </h3>

              <div className="space-y-4">
                {ASSESSMENT_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctOptionId;
                  const chosenOpt = q.options.find(o => o.id === userAnswer);
                  const correctOpt = q.options.find(o => o.id === q.correctOptionId);

                  return (
                    <div 
                      key={q.id}
                      className={`p-5 rounded-xl border transition-all ${
                        isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-700">
                          Pregunta {idx + 1} · {q.categoryLabel}
                        </span>
                        <span className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? 'Correcta' : 'Incorrecta'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-3">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2.5 rounded bg-white border border-slate-200">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Tu respuesta:</span>
                          <span className={isCorrect ? 'text-emerald-800 font-medium' : 'text-rose-800 font-medium'}>
                            {chosenOpt?.text || 'No respondida'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">
                            <span className="text-emerald-700 block text-[10px] uppercase font-bold">Respuesta correcta:</span>
                            <span className="text-emerald-950 font-medium">{correctOpt?.text}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 bg-white/80 rounded-lg text-xs text-slate-600 border border-slate-200/80">
                        <p><strong>Explicación:</strong> {q.explanation}</p>
                        <p className="text-slate-400 text-[11px] mt-1 font-mono">Sustento: {q.ruleCitation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
