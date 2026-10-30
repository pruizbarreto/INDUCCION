import React, { useState, useEffect } from 'react';
import { InductionTab, UserRole, ApprenticeProfile, AssessmentResult, InstructorSession } from './types/induction';
import { DEFAULT_CURRENT_APPRENTICE } from './data/inductionData';
import { Header } from './components/Header';
import { IdentityModule } from './components/IdentityModule';
import { RightsDutiesModule } from './components/RightsDutiesModule';
import { PathAndWellnessModule } from './components/PathAndWellnessModule';
import { CaseSimulator } from './components/CaseSimulator';
import { AssessmentModule } from './components/AssessmentModule';
import { InstructorDashboard } from './components/InstructorDashboard';
import { PedagogicalGuidelinesModule } from './components/PedagogicalGuidelinesModule';
import { LearnerServicesModule } from './components/LearnerServicesModule';
import { InstructorAuthModal } from './components/InstructorAuthModal';
import { CertificateModal } from './components/CertificateModal';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { ApprenticeRegistrationModal } from './components/ApprenticeRegistrationModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { ManualModal } from './components/ManualModal';
import { VideoTutorialModal } from './components/VideoTutorialModal';
import { LandingPage } from './components/LandingPage';
import { SenaLogo } from './components/SenaLogo';
import { updateApprenticeProgress } from './services/apprenticeApi';

export default function App() {
  const [activeTab, setActiveTab] = useState<InductionTab>('overview');
  
  // Persistent Role & Session State
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('sena_active_role');
    return saved === 'instructor' ? 'instructor' : 'apprentice';
  });

  const [instructorSession, setInstructorSession] = useState<InstructorSession | null>(() => {
    try {
      const savedAuth = localStorage.getItem('sena_instructor_auth');
      return savedAuth ? JSON.parse(savedAuth) : null;
    } catch {
      return null;
    }
  });

  // Apprentice Profile and Database Registration State
  const [apprentice, setApprentice] = useState<ApprenticeProfile>(DEFAULT_CURRENT_APPRENTICE);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);
  
  // Modals state
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const isAuthenticatedInstructor = !!instructorSession?.token;
  const hasPassed = assessmentResult?.passed ?? false;

  // Hydrate apprentice profile from primary database if active session exists
  useEffect(() => {
    const activeId = localStorage.getItem('sena_active_apprentice_id');
    if (activeId) {
      fetch(`/api/apprentices/${encodeURIComponent(activeId)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.apprentice) {
            const st = data.apprentice;
            setApprentice({
              id: st.id,
              name: st.name,
              documentType: st.documentType,
              documentNumber: st.documentNumber,
              regional: st.regional || 'Regional Distrito Capital',
              trainingCenter: st.trainingCenter || 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
              programName: st.program,
              fichaNumber: st.ficha,
              avatarSeed: st.name.toLowerCase().replace(/\s+/g, '-')
            });
            setIsRegistered(true);

            if (st.examPassed && st.examScore) {
              setAssessmentResult({
                score: st.examScore,
                percentage: st.examScore,
                totalQuestions: 12,
                correctAnswers: Math.round((st.examScore / 100) * 12),
                passed: true,
                categoryScores: st.categoryScores || [],
                completedAt: st.evaluatedAt || new Date().toISOString(),
                certificateCode: st.certificateCode || 'SENA-IND-VERIFIED'
              });
            }
          }
        })
        .catch(err => {
          console.error('Database connection error during hydration:', err);
        });
    }
  }, []);

  // Sync role state with authentication security rules
  const handleSwitchRole = (newRole: UserRole) => {
    if (newRole === 'instructor') {
      if (isAuthenticatedInstructor) {
        setUserRole('instructor');
        localStorage.setItem('sena_active_role', 'instructor');
      } else {
        // Enforce RBAC authentication gate
        setIsAuthModalOpen(true);
      }
    } else {
      setUserRole('apprentice');
      localStorage.setItem('sena_active_role', 'apprentice');
      // If was in instructor-only tab, return to overview
      if (activeTab === 'instructor-dashboard' || activeTab === 'pedagogical-guidelines') {
        setActiveTab('overview');
      }
    }
  };

  const handleAuthSuccess = (session: InstructorSession) => {
    setInstructorSession(session);
    setUserRole('instructor');
    localStorage.setItem('sena_active_role', 'instructor');
    setIsAuthModalOpen(false);
  };

  const handleLogoutInstructor = () => {
    localStorage.removeItem('sena_instructor_auth');
    localStorage.setItem('sena_active_role', 'apprentice');
    setInstructorSession(null);
    setUserRole('apprentice');
    if (activeTab === 'instructor-dashboard' || activeTab === 'pedagogical-guidelines') {
      setActiveTab('overview');
    }
  };

  const handleToggleTheme = () => {
    setIsBlurTransitioning(true);
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }

    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 420);
  };

  // Guard protected tabs for instructor and mandatory registration for apprentice
  const handleSafeTabChange = (tab: InductionTab) => {
    // Instructor gate
    if ((tab === 'instructor-dashboard' || tab === 'pedagogical-guidelines') && !isAuthenticatedInstructor) {
      setIsAuthModalOpen(true);
      return;
    }

    // Apprentice mandatory registration gate before starting induction
    if (userRole === 'apprentice' && tab !== 'overview' && !isRegistered) {
      setIsRegisterModalOpen(true);
      return;
    }

    // Sincronizar avance con base de datos
    if (userRole === 'apprentice' && isRegistered && tab !== 'overview') {
      updateApprenticeProgress(apprentice.id, tab).catch(err => {
        console.error('Progress sync error:', err);
      });
    }

    setActiveTab(tab);
  };

  const handleRegistrationSuccess = (profile: ApprenticeProfile) => {
    setApprentice(profile);
    setIsRegistered(true);
    localStorage.setItem('sena_active_apprentice_id', profile.id);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#070d18] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative`}>
      {/* Full-screen backdrop blur effect during theme transition */}
      {isBlurTransitioning && (
        <div 
          className="fixed inset-0 pointer-events-none z-50 backdrop-blur-md bg-emerald-950/10 dark:bg-black/20 transition-all duration-300"
          aria-hidden="true"
        />
      )}

      {/* Institutional Top Bar compliant with 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleSafeTabChange}
        userRole={userRole}
        onSwitchRole={handleSwitchRole}
        apprentice={apprentice}
        instructorSession={instructorSession}
        isAuthenticatedInstructor={isAuthenticatedInstructor}
        onOpenInstructorAuth={() => setIsAuthModalOpen(true)}
        onLogoutInstructor={handleLogoutInstructor}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        hasPassedAssessment={hasPassed}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 ${isBlurTransitioning ? 'theme-blur-active' : ''}`}>
        {/* VIEW 1: LANDING PAGE & INDUCTION HUB (Dual-role) */}
        {activeTab === 'overview' && (
          <LandingPage
            setActiveTab={handleSafeTabChange}
            apprentice={apprentice}
            assessmentResult={assessmentResult}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            userRole={userRole}
            onSwitchRole={handleSwitchRole}
            isAuthenticatedInstructor={isAuthenticatedInstructor}
            onOpenInstructorAuth={() => setIsAuthModalOpen(true)}
            isRegisteredApprentice={isRegistered}
            onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            onOpenPrivacyModal={() => setIsPolicyModalOpen(true)}
            onOpenManualModal={() => setIsManualModalOpen(true)}
            onOpenVideoTutorial={() => setIsVideoModalOpen(true)}
          />
        )}

        {/* VIEW 2: IDENTIDAD INSTITUCIONAL */}
        {activeTab === 'identity' && <IdentityModule />}

        {/* VIEW 3: DERECHOS Y DEBERES (Acuerdo 009 de 2024) */}
        {activeTab === 'rights-duties' && <RightsDutiesModule />}

        {/* VIEW 4: RUTA FORMATIVA */}
        {activeTab === 'formation-path' && <PathAndWellnessModule />}

        {/* VIEW 5: SERVICIOS DE BIENESTAR AL APRENDIZ */}
        {activeTab === 'learner-services' && <LearnerServicesModule />}

        {/* VIEW 6: SIMULADOR DE CASOS */}
        {activeTab === 'case-simulator' && <CaseSimulator />}

        {/* VIEW 7: EVALUACIÓN DIAGNÓSTICA DE APROPIACIÓN */}
        {activeTab === 'assessment' && (
          <AssessmentModule
            apprentice={apprentice}
            assessmentResult={assessmentResult}
            setAssessmentResult={setAssessmentResult}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {/* VIEW 8: PANEL DE GESTIÓN DEL INSTRUCTOR (Protected) */}
        {activeTab === 'instructor-dashboard' && (
          isAuthenticatedInstructor ? (
            <InstructorDashboard />
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700 text-center max-w-xl mx-auto space-y-4">
              <SenaLogo variant="green" className="w-12 h-12 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Acceso Restringido a Instructores</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Para consultar el seguimiento de la cohorte y asentar juicios de inducción debe autenticar su cuenta de docente SENA.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Ingresar Credenciales
              </button>
            </div>
          )
        )}

        {/* VIEW 9: GUÍAS Y FORMATOS PEDAGÓGICOS GFPI (Protected / Instructor) */}
        {activeTab === 'pedagogical-guidelines' && (
          isAuthenticatedInstructor ? (
            <PedagogicalGuidelinesModule />
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700 text-center max-w-xl mx-auto space-y-4">
              <SenaLogo variant="green" className="w-12 h-12 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Acceso Restringido</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Los lineamientos curriculares y formatos de comités están reservados para el equipo de instructores.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Ingresar Credenciales
              </button>
            </div>
          )
        )}
      </main>

      {/* Apprentice Registration Modal (Mandatory Before Induction) */}
      <ApprenticeRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisteredSuccess={handleRegistrationSuccess}
      />

      {/* Law 1581 of 2012 / Habeas Data Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />

      {/* Instructor Authentication Modal */}
      <InstructorAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        apprentice={apprentice}
        result={assessmentResult}
      />

      {/* Apprentice Profile Modal */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        apprentice={apprentice}
        onSave={updated => setApprentice(updated)}
      />

      {/* Apprentice Induction Manual Modal */}
      <ManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      {/* Video Tutorial Floating Modal */}
      <VideoTutorialModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onStartInduction={() => {
          if (!isRegistered) {
            setIsRegisterModalOpen(true);
          } else {
            handleSafeTabChange('identity');
          }
        }}
      />

      {/* Institutional Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 py-8 px-4 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SenaLogo variant="green" className="w-5 h-5" />
            <span className="font-bold text-slate-800 dark:text-slate-200">SENA</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>Servicio Nacional de Aprendizaje — Colombia</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-400 dark:text-slate-500">
            <span>Reglamento del Aprendiz (Acuerdo 009 de 2024 - Vigente)</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline underline-offset-2 cursor-pointer flex items-center gap-1"
            >
              Video Tutorial
            </button>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline underline-offset-2 cursor-pointer flex items-center gap-1"
            >
              Manual del Aprendiz (Manual.md)
            </button>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <button
              onClick={() => setIsPolicyModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              Protección de Datos (Ley 1581 de 2012)
            </button>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span>Inducción FPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
