import React, { useState } from 'react';
import { InductionTab, ApprenticeProfile, AssessmentResult, UserRole } from '../types/induction';
import { TEACHING_RESOURCES, LEARNER_SERVICES_DATA } from '../data/instructorData';
import { SenaLogo } from './SenaLogo';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Scale,
  Award,
  CheckCircle2,
  FileCheck,
  Building,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  Sparkles,
  HeartHandshake,
  Check,
  Lock,
  Unlock,
  FileText,
  Download,
  AlertTriangle,
  Layers,
  BarChart2,
  CalendarCheck,
  Coins,
  UserCheck,
  ExternalLink,
  Mail,
  Play,
  Video
} from 'lucide-react';
import { VideoTutorialModal } from './VideoTutorialModal';

interface LandingPageProps {
  setActiveTab: (tab: InductionTab) => void;
  apprentice: ApprenticeProfile;
  assessmentResult: AssessmentResult | null;
  onOpenCertificate: () => void;
  userRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  isAuthenticatedInstructor: boolean;
  onOpenInstructorAuth: () => void;
  isRegisteredApprentice: boolean;
  onOpenRegisterModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenManualModal?: () => void;
  onOpenVideoTutorial?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveTab,
  apprentice,
  assessmentResult,
  onOpenCertificate,
  userRole,
  onSwitchRole,
  isAuthenticatedInstructor,
  onOpenInstructorAuth,
  isRegisteredApprentice,
  onOpenRegisterModal,
  onOpenPrivacyModal,
  onOpenManualModal,
  onOpenVideoTutorial
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [previewResource, setPreviewResource] = useState<typeof TEACHING_RESOURCES[0] | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const handleOpenVideoTutorial = () => {
    if (onOpenVideoTutorial) {
      onOpenVideoTutorial();
    } else {
      setIsVideoModalOpen(true);
    }
  };

  const hasPassed = assessmentResult?.passed ?? false;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const apprenticeFaqs = [
    {
      q: '¿El proceso de inducción es de carácter obligatorio para todos los aprendices?',
      a: 'Sí. De acuerdo con el Acuerdo 009 de 2024 (Reglamento del Aprendiz SENA), la inducción comprende 40 horas académicas iniciales indispensables para formalizar tu proceso formativo, conocer tus derechos, deberes y apropiar la cultura de la Formación Profesional Integral (FPI).'
    },
    {
      q: '¿Cuál es el puntaje mínimo para aprobar la evaluación y obtener la constancia?',
      a: 'El umbral de aprobación establecido es del 70% o superior (mínimo 9 de 12 respuestas correctas). Al alcanzarlo, el sistema generará de forma automática tu Constancia Oficial de Inducción con código QR y hash de verificación para tu portafolio de evidencias en Zajuna.'
    },
    {
      q: '¿Qué ocurre si no alcanzo el 70% en el primer intento?',
      a: 'Puedes revisar nuevamente los módulos de Identidad, Reglamento del Aprendiz y el Simulador de Casos las veces que sea necesario y presentar un nuevo intento sin penalización. El propósito pedagógico es garantizar la verdadera apropiación del proceso.'
    },
    {
      q: '¿Cómo puedo acceder a los apoyos de sostenimiento FIC y monitorías?',
      a: 'La Oficina de Bienestar al Aprendiz de tu Centro de Formación abre convocatorias trimestrales a través de Sofia Plus. En el módulo de "Servicios de Bienestar" de esta plataforma puedes consultar los requisitos de estratificación (estratos 1 y 2 o SISBEN A/B) y el procedimiento para radicar tu postulación.'
    }
  ];

  const instructorFaqs = [
    {
      q: '¿Cuál es el procedimiento reglamentario ante 3 días hábiles de inasistencia injustificada?',
      a: 'El Acuerdo 009 de 2024 tipifica la inasistencia injustificada por más de tres (3) días hábiles continuos como causal objetiva de deserción. El instructor debe reportar la novedad al Coordinador Académico previa verificación de alertas tempranas con Bienestar al Aprendiz. Posteriormente se cita al aprendiz otorgándole 5 días hábiles para justificar su inasistencia antes de emitir resolución de cancelación de matrícula.'
    },
    {
      q: '¿Qué plazos rigen las citaciones a Comité de Evaluación y Seguimiento?',
      a: 'La notificación debe realizarse por escrito al correo institucional del aprendiz con una anticipación mínima de cinco (5) días hábiles a la fecha de la sesión, indicando con precisión los hechos investigados, las normas presuntamente infringidas y su derecho a presentar descargos y aportar pruebas.'
    },
    {
      q: '¿Cómo debe formularse el Plan de Mejoramiento (Formato GFPI-F-023)?',
      a: 'El Plan de Mejoramiento debe ser concertado por escrito entre instructor y aprendiz, definiendo evidencias pedagógicas claras, criterios observables de evaluación y una fecha límite perentoria no superior a 30 días calendario. Si el aprendiz cumple satisfactoriamente, se asienta el juicio Aprobado (A); de lo contrario, se remite a comité.'
    },
    {
      q: '¿Cuál es el plazo reglamentario para emitir juicios evaluativos en Sofia Plus / Zajuna?',
      a: 'El instructor dispone de un plazo máximo de cinco (5) días hábiles a partir de la entrega de la evidencia por parte del aprendiz para calificar y registrar la retroalimentación cualitativa (Aprobado o No Aprobado).'
    }
  ];

  const activeFaqs = userRole === 'apprentice' ? apprenticeFaqs : instructorFaqs;

  return (
    <div className="space-y-16 lg:space-y-24 animate-in fade-in duration-300">
      {/* 0. DUAL-ROLE SELECTOR HEADER BAR (Anti-pill, distinct, unboxed) */}
      <section 
        aria-label="Selector de rol de navegación"
        className="bg-white dark:bg-slate-800/90 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Espacio de Trabajo Activo:
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
            userRole === 'apprentice'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
              : 'bg-blue-100 text-[#00324D] dark:bg-blue-950/80 dark:text-blue-300'
          }`}>
            {userRole === 'apprentice' ? 'Rol Aprendiz (Formación FPI)' : 'Rol Instructor (Gestión y Pedagogía)'}
          </span>
        </div>

        {/* Segmented Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => onSwitchRole('apprentice')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              userRole === 'apprentice'
                ? 'bg-white dark:bg-slate-800 text-[#00324D] dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#39A900]" />
            <span>Vista Aprendiz</span>
          </button>

          <button
            onClick={() => {
              if (isAuthenticatedInstructor) {
                onSwitchRole('instructor');
              } else {
                onOpenInstructorAuth();
              }
            }}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              userRole === 'instructor'
                ? 'bg-white dark:bg-slate-800 text-[#00324D] dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isAuthenticatedInstructor ? (
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>Vista Instructor</span>
            {!isAuthenticatedInstructor && (
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                (Acceso Seguro)
              </span>
            )}
          </button>
        </div>
      </section>

      {/* 0.1 REGISTRATION STATUS / MANDATORY ONBOARDING GATE (APPRENTICE ONLY) */}
      {userRole === 'apprentice' && (
        !isRegisteredApprentice ? (
          <section 
            aria-label="Registro previo obligatorio de inducción"
            className="bg-gradient-to-r from-[#00324D] via-[#014264] to-[#002235] text-white p-6 sm:p-7 rounded-3xl border border-emerald-500/40 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-md font-bold">
                      Paso 1 Obligatorio
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">Ley 1581 de 2012 · Habeas Data</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                    Formaliza Tu Registro Oficial para Iniciar la Inducción
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                    Antes de ingresar a los módulos de aprendizaje debes inscribir tu documento y ficha de caracterización en la base de datos oficial. Así se computarán tus <strong>40 horas académicas</strong> y podrás certificar tu apropiación.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="text-xs text-emerald-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Política de Privacidad
                </button>
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/40 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Completar Registro Oficial</span>
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section 
            aria-label="Aprendiz formalmente registrado"
            className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Aprendiz Registrado en Base de Datos: {apprentice.name}
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded font-bold">
                    Ley 1581 OK
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] font-mono mt-0.5">
                  Documento: {apprentice.documentType} {apprentice.documentNumber} · Ficha: {apprentice.fichaNumber} · Centro: {apprentice.trainingCenter}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenRegisterModal}
              className="text-xs font-semibold text-[#00324D] dark:text-emerald-400 hover:underline cursor-pointer shrink-0"
            >
              Cambiar / Registrar Otro Aprendiz
            </button>
          </section>
        )
      )}

      {/* 1. HERO SECTION (Tailored by Role) */}
      {userRole === 'apprentice' ? (
        /* APPRENTICE HERO */
        <section className="relative overflow-hidden rounded-3xl bg-[#00324D] dark:bg-[#002235] text-white border border-slate-700/80 dark:border-slate-800 shadow-xl">
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
            {/* Hero Copy (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-5 tracking-wider uppercase">
                  <SenaLogo variant="white" className="w-5 h-5 shrink-0" />
                  <span>Inducción Oficial</span>
                  <span className="text-slate-400" aria-hidden="true">·</span>
                  <span className="text-slate-300">Formación Profesional Integral</span>
                  <span className="text-slate-400" aria-hidden="true">·</span>
                  <span className="text-emerald-300 font-mono">2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5 text-balance">
                  Bienvenido al SENA: Transforma Tu Talento en{' '}
                  <span className="text-[#39A900] underline decoration-[#39A900]/40 decoration-wavy decoration-2">
                    Futuro Productivo
                  </span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-8">
                  Inicia con éxito tu formación técnica o tecnológica. Apropia la misión y los símbolos institucionales, domina tus derechos y deberes bajo el <strong>Acuerdo 009 de 2024</strong> y supera la evaluación diagnóstica para certificar tus <strong>40 horas reglamentarias de inducción</strong>.
                </p>
              </div>

              {/* Primary Actions for Apprentice */}
              <div className="pt-6 border-t border-slate-700/80 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    if (!isRegisteredApprentice) {
                      onOpenRegisterModal();
                    } else {
                      setActiveTab('identity');
                    }
                  }}
                  className="px-6 py-3.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-sm font-bold rounded-xl flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-emerald-950/30 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                >
                  <span>Iniciar Recorrido de Inducción</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleOpenVideoTutorial}
                  className="px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-emerald-950/30 hover:scale-[1.02] active:scale-[0.98] min-h-[48px] border border-emerald-400/30"
                  title="Reproducir Video Tutorial de la inducción con controles"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Video Tutorial</span>
                </button>

                <button
                  onClick={() => {
                    if (!isRegisteredApprentice) {
                      onOpenRegisterModal();
                    } else {
                      setActiveTab('assessment');
                    }
                  }}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-white/20 min-h-[48px]"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Presentar Evaluación</span>
                </button>

                <button
                  onClick={() => setActiveTab('learner-services')}
                  className="px-4 py-3.5 text-xs font-semibold text-emerald-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Servicios de Bienestar</span>
                </button>

                {onOpenManualModal && (
                  <button
                    onClick={onOpenManualModal}
                    className="px-4 py-3.5 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-xl border border-white/10"
                    title="Consultar el Manual del Aprendiz en línea"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Manual del Aprendiz</span>
                  </button>
                )}

                {hasPassed && (
                  <button
                    onClick={onOpenCertificate}
                    className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md min-h-[48px]"
                  >
                    <Award className="w-4 h-4" />
                    <span>Ver Mi Constancia</span>
                  </button>
                )}
              </div>
            </div>

            {/* Hero Visual Container */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <img
                src="/src/assets/images/landing_hero_students_1793199456906.jpg"
                alt="Aprendices del SENA colaborando en centro de formación tecnológica"
                className="absolute inset-0 w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00324D] via-[#00324D]/30 to-transparent lg:hidden" />
            </div>
          </div>
        </section>
      ) : (
        /* INSTRUCTOR HERO */
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002235] via-[#00324D] to-[#014264] text-white border border-slate-700 shadow-xl">
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[440px]">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-400 mb-4 tracking-wider uppercase">
                <SenaLogo variant="white" className="w-5 h-5 shrink-0" />
                <span>Gestión Pedagógica y Docente FPI</span>
                <span className="text-slate-400" aria-hidden="true">·</span>
                <span className="text-slate-300">Dirección de Formación Profesional</span>
                <span className="text-slate-400" aria-hidden="true">·</span>
                <span className="text-emerald-300 font-mono">GFPI</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl text-balance">
                Panel de Orientación Pedagógica y{' '}
                <span className="text-[#39A900] underline decoration-[#39A900]/40 decoration-2">
                  Gestión Docente FPI
                </span>
              </h1>

              <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mb-8">
                Lidera con rigor técnico y calidez pedagógica el proceso de inducción de tus aprendices. Consulta las <strong>Guías de Aprendizaje GFPI</strong>, administra el debido proceso y comités conforme al <strong>Acuerdo 009 de 2024</strong> y descarga los formatos oficiales institucionales.
              </p>
            </div>

            {/* Instructor Quick Actions */}
            <div className="pt-6 border-t border-slate-700/80 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('instructor-dashboard')}
                className="px-6 py-3.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-sm font-bold rounded-xl flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-emerald-950/30 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Abrir Panel de Gestión de Cohorte</span>
              </button>

              <button
                onClick={handleOpenVideoTutorial}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-white/20 min-h-[48px]"
                title="Reproducir Video Tutorial de la inducción con controles"
              >
                <Play className="w-4 h-4 fill-white text-emerald-400" />
                <span>Video Tutorial</span>
              </button>

              <button
                onClick={() => setActiveTab('pedagogical-guidelines')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-white/20 min-h-[48px]"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Lineamientos y Formatos GFPI</span>
              </button>

              <button
                onClick={() => setActiveTab('rights-duties')}
                className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-white/10 min-h-[48px]"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Régimen Disciplinario y Comités</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. VALUE PROPOSITION & TRUST INDICATORS (4-column row tailored to active role) */}
      <section aria-label="Indicadores institucionales">
        {userRole === 'apprentice' ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tabular-nums">40 Horas</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Intensidad formativa obligatoria</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Acuerdo 009/2024</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reglamento del Aprendiz Vigente</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">100% Gratuito</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Educación pública e incluyente</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Constancia QR</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verificable para tu portafolio</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">100% Cobertura</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Seguimiento individual de cohorte</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3 Días Hábiles</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Límite legal para control de deserción</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Formatos GFPI</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Guías 135 y Planes 023 estandarizados</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-3.5 transition-all hover:border-[#39A900]/50">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5 Días Término</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Para citaciones y juicios en Zajuna</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. BENTO GRID OF CORE PILLARS (Tailored to active role) */}
      {userRole === 'apprentice' ? (
        /* APPRENTICE BENTO GRID */
        <section className="space-y-8" aria-labelledby="benefits-heading">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              Ventajas de una Inducción Completa
            </span>
            <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 text-balance">
              ¿Por Qué Este Proceso Marca la Diferencia en Tu Carrera?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              La inducción te entrega las herramientas normativas, técnicas y humanas para transitar con seguridad desde tu primer día en el aula hasta tu inserción productiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit 1 (Wide card on desktop) */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">Pilar 01</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                  Seguridad Jurídica y Garantía de Debido Proceso
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  El <strong>Acuerdo 009 de 2024</strong> consagra tus derechos fundamentales como aprendiz. Conoce con total claridad los plazos de descargos (5 días hábiles), la conformación del Comité de Evaluación y tu derecho inalienable a la <strong>Segunda Instancia</strong> ante el Subdirector de Centro, evitando arbitrariedades.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Tipificación de faltas leves, graves y gravísimas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Medidas formativas pedagógicas previas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Control de deserción (3 días continuos)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Regulación de trámites de aplazamiento y reingreso</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('rights-duties')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explorar Capítulos I, IV y V en Detalle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-blue-700 dark:text-blue-400 font-bold uppercase">Pilar 02</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Identidad y Sentido de Pertenencia
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Conoce el Escudo oficial, la Bandera, el Logosímbolo del cadete y los 7 valores éticos que rigen a la comunidad del SENA en todo el país.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('identity')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ver Símbolos Institucionales</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase">Pilar 03</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Modelo Pedagógico FPI
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Aprende haciendo bajo el enfoque de competencias laborales: etapa lectiva teórica y práctica en talleres reales, complementada por la etapa productiva.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('formation-path')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ver Ruta Formativa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-purple-700 dark:text-purple-400 font-bold uppercase">Pilar 04</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  6 Alternativas de Etapa Productiva
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Contrato de Aprendizaje empresarial, Proyecto Productivo, Pasantía, Monitorías académicas, Vínculo Laboral y Apoyo a Entidades Estatales.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('formation-path')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explorar Modalidades</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-rose-700 dark:text-rose-400 font-bold uppercase">Pilar 05</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Servicios de Bienestar al Aprendiz
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Apoyos de sostenimiento FIC para aprendices vulnerables, enfermería, seguro de accidentes 24/7, torneos deportivos, arte y orientación psicológica.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('learner-services')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ver Directorio de Servicios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* INSTRUCTOR BENTO GRID */
        <section className="space-y-8" aria-labelledby="instructor-pillars">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              Responsabilidades y Procesos Docentes FPI
            </span>
            <h2 id="instructor-pillars" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 text-balance">
              Gestión Pedagógica y Administrativa del Instructor
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              El rol del instructor combina la excelencia técnica, la planeación curricular mediante Guías de Aprendizaje y la garantía del debido proceso disciplinario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Responsabilidad 1 */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">Gestión 01</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                  Planeación Pedagógica FPI y Guías de Aprendizaje
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Elaboración y ejecución del proyecto formativo a través del <strong>Formato GFPI-F-135</strong>. Estructuración de las 4 actividades de aprendizaje (reflexión inicial, contextualización, apropiación y transferencia) y articulación directa con los Resultados de Aprendizaje (RAP).
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Concertación formal del plan de inducción de 40 horas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Cronograma de actividades en Sofia Plus y Zajuna</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Integración transversal de competencias blandas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Instrumentos y listas de chequeo de desempeño</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('pedagogical-guidelines')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Ver Formato GFPI-F-135 y Guía Metodológica</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsabilidad 2 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                  <Scale className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-blue-700 dark:text-blue-400 font-bold uppercase">Gestión 02</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Debido Proceso y Comités
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Citación formal a comités de evaluación con 5 días hábiles de anticipación, actas de compromiso y respeto irrestricto a la doble instancia ante el Subdirector.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('rights-duties')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Articulado Acuerdo 009/2024</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsabilidad 3 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-rose-700 dark:text-rose-400 font-bold uppercase">Gestión 03</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Control de Inasistencias y Deserción
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Protocolo preventivo ante los 3 días continuos injustificados: registro de alertas tempranas y reporte inmediato a Coordinación Académica.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('instructor-dashboard')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Monitorear Cohorte</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsabilidad 4 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase">Gestión 04</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Planes de Mejoramiento (GFPI-F-023)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Concertación pedagógica con aprendices en riesgo académico, fijando actividades complementarias y plazos máximos no mayores a 30 días.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('pedagogical-guidelines')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Descargar Plantilla GFPI-F-023</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsabilidad 5 */}
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-purple-700 dark:text-purple-400 font-bold uppercase">Gestión 05</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  Emisión de Juicios Evaluativos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Registro cualitativo de Aprobado (A) o Por Mejorar (D) en Sofia Plus / Zajuna con un tiempo máximo de respuesta de 5 días hábiles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('instructor-dashboard')}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Exportar Reporte de Juicios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. TEACHING RESOURCES QUICK REPOSITORY (Specifically for Instructors) */}
      {userRole === 'instructor' && (
        <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                Formatos Oficiales Descargables
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                Banco de Recursos Docentes y Formatos GFPI
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Plantillas oficiales de gestión formativa avaladas por el Sistema Integrado de Gestión y Autocontrol (SIGA).
              </p>
            </div>
            <button
              onClick={() => setActiveTab('pedagogical-guidelines')}
              className="px-4 py-2.5 bg-[#00324D] hover:bg-[#004e75] text-white text-xs font-bold rounded-xl flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ver Catálogo Completo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEACHING_RESOURCES.slice(0, 3).map(res => (
              <div
                key={res.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-xs hover:border-[#39A900] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      {res.officialCode}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      {res.formatExtension}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {res.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] cursor-pointer"
                  >
                    Visualizar Modelo
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([res.contentSample], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `SENA_${res.code}_Plantilla.txt`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="p-1.5 text-slate-500 hover:text-[#39A900] dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                    title="Descargar plantilla"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LEARNER SERVICES SPOTLIGHT (Specifically for Apprentices) */}
      {userRole === 'apprentice' && (
        <section className="bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-transparent rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                Bienestar Integral
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                Servicios y Oportunidades para Tu Permanencia
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Conoce los beneficios económicos, de salud y liderazgo a los que tienes derecho desde tu primer día de matrícula.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('learner-services')}
              className="px-4 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-xs"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Ver Todos los Servicios de Bienestar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEARNER_SERVICES_DATA.slice(0, 3).map(serv => (
              <div
                key={serv.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-xs hover:border-[#39A900] transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md inline-block mb-2">
                    {serv.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                    {serv.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTab('learner-services')}
                    className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Conocer requisitos y convocatoria</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. 4-STEP PATHWAY SECTION (Tailored to active role) */}
      <section className="space-y-8" aria-labelledby="pathway-heading">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
            {userRole === 'apprentice' ? 'Ruta de Aprendizaje' : 'Ruta Metodológica Docente'}
          </span>
          <h2 id="pathway-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 text-balance">
            {userRole === 'apprentice'
              ? '4 Pasos Hacia la Apropiación y Certificación'
              : '4 Fases para la Conducción Efectiva de la Inducción'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {userRole === 'apprentice'
              ? 'Sigue este recorrido paso a paso para completar tus 40 horas académicas y generar tu constancia oficial.'
              : 'Flujo cronológico de gestión formativa desde la bienvenida hasta el asentamiento de los juicios evaluativos en Sofia Plus.'}
          </p>
        </div>

        {userRole === 'apprentice' ? (
          /* Apprentice Steps */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">01</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Identidad y Valores
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Conoce el Escudo, Bandera, Logosímbolo, la misión institucional y los 7 principios de la cultura SENA.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('identity')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explorar Módulo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">02</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Derechos y Deberes
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Estudia los Capítulos I, IV y V del Acuerdo 009 de 2024: debido proceso, faltas y comités de evaluación.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('rights-duties')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Revisar Normativa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">03</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Simulador de Casos
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Entrénate con 6 situaciones reales de convivencia, propiedad intelectual y alternativas de etapa productiva.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('case-simulator')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Resolver Casos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">04</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Evaluación y Constancia
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Supera la prueba con 70% o más y descarga tu Constancia Oficial con código QR para tu portafolio en Zajuna.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('assessment')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Presentar Prueba</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Instructor Steps */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">01</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Concertación FPI
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Presentación de la Guía GFPI-F-135, cronograma de las 40 horas y concertación del plan de evaluación.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('pedagogical-guidelines')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ver Guías GFPI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">02</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Seguimiento de Asistencia
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Control diario de presencialidad y alertas preventivas ante inasistencias superiores a 2 días hábiles.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('instructor-dashboard')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Monitorear Cohorte</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">03</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Planes de Mejoramiento
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Aplicación del formato GFPI-F-023 con metas pedagógicas y remisión a comités si no hay subsanación.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('pedagogical-guidelines')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Descargar Formatos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">04</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                  Juicio Evaluativo
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Asentamiento del juicio cualitativo Aprobado (A) o No Aprobado (D) en Sofia Plus y cierre de inducción.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('instructor-dashboard')}
                className="mt-6 text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Asentar Juicios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 7. FAQ ACCORDION SECTION (Tailored to active role) */}
      <section className="space-y-6 max-w-4xl mx-auto" aria-labelledby="faq-heading">
        <div className="text-center">
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
            {userRole === 'apprentice' ? 'Preguntas Frecuentes de Aprendices' : 'Preguntas Frecuentes de Instructores'}
          </span>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Resolvemos Tus Dudas Clave
          </h2>
        </div>

        <div className="space-y-3">
          {activeFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-300">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* HABEAS DATA & COLOMBIA LAW 1581 OF 2012 COMPLIANCE SECTION */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                Compromiso Institucional y Legal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Protección y Tratamiento de Datos Personales (Ley 1581 de 2012)
              </h2>
            </div>
          </div>

          <button
            onClick={onOpenPrivacyModal}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <FileText className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Consultar Política Integral SENA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          El Servicio Nacional de Aprendizaje (SENA) garantiza la confidencialidad, seguridad e integridad de los datos personales recolectados durante la inducción. En cumplimiento del principio de legalidad, libertad y finalidad establecido en la <strong>Ley Estatutaria 1581 de 2012</strong>, informamos a los aprendices e instructores:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">1. ¿Por qué se recolectan?</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Para individualizar al aprendiz en la inducción FPI, computar las 40 horas reglamentarias y vincular sus evidencias de aprendizaje con la matrícula institucional.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">2. ¿Cómo se utilizan?</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Para el seguimiento pedagógico a competencias, registro de calificaciones diagnósticas en Sofia Plus/Zajuna y generación de la constancia digital verificable con QR.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">3. ¿Quién tiene acceso?</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Exclusivamente los instructores asignados a su ficha y la Coordinación Académica del Centro bajo modelo RBAC. Jamás se comparte con terceros ni empresas comerciales.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white block">4. Derechos ARCO</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Puede conocer, actualizar, rectificar o revocar su autorización enviando su solicitud formal al canal institucional oficial <strong className="font-mono text-emerald-700 dark:text-emerald-400">habeasdata@sena.edu.co</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION STRIP */}
      <section className="rounded-3xl bg-[#00324D] dark:bg-[#002235] text-white p-8 sm:p-12 text-center relative overflow-hidden border border-slate-700 shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <SenaLogo variant="white" className="w-10 h-10 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {userRole === 'apprentice'
              ? '¿Listo para Comenzar Tu Formación Profesional?'
              : 'Gestión Rigurosa para el Éxito de la Cohorte'}
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            {userRole === 'apprentice'
              ? 'Completa los módulos interactivos, fortalece tu criterio con el simulador de casos y asegura tu constancia oficial de inducción.'
              : 'Verifica el progreso de tus aprendices en tiempo real, asienta novedades y descarga los reportes para los comités de centro.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {userRole === 'apprentice' ? (
              <>
                <button
                  onClick={() => setActiveTab('identity')}
                  className="px-6 py-3.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Comenzar Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleOpenVideoTutorial}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-white/20"
                  title="Reproducir Video Tutorial de la inducción con controles"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Video Tutorial</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('instructor-dashboard')}
                  className="px-6 py-3.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Ir al Panel de Aprendices</span>
                </button>

                <button
                  onClick={handleOpenVideoTutorial}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-white/20"
                  title="Reproducir Video Tutorial de la inducción con controles"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Video Tutorial</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Floating Video Tutorial Modal */}
      <VideoTutorialModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onStartInduction={() => {
          if (!isRegisteredApprentice) {
            onOpenRegisterModal();
          } else {
            setActiveTab('identity');
          }
        }}
      />

      {/* Resource Quick Preview Modal */}
      {previewResource && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#00324D] dark:bg-[#002235] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                  {previewResource.officialCode} · {previewResource.type}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {previewResource.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto max-h-80 whitespace-pre-wrap leading-relaxed border border-slate-800">
                {previewResource.contentSample}
              </pre>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setPreviewResource(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([previewResource.contentSample], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `SENA_${previewResource.code}_Plantilla.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Plantilla (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
