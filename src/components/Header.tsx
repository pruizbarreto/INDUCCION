import React from 'react';
import { InductionTab, UserRole, ApprenticeProfile, InstructorSession } from '../types/induction';
import { Award, User, GraduationCap, Sun, Moon, ShieldCheck, Lock, LogOut, HeartHandshake, BookOpen, BarChart2 } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  activeTab: InductionTab;
  setActiveTab: (tab: InductionTab) => void;
  userRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  apprentice: ApprenticeProfile;
  instructorSession: InstructorSession | null;
  isAuthenticatedInstructor: boolean;
  onOpenInstructorAuth: () => void;
  onLogoutInstructor: () => void;
  onOpenProfile: () => void;
  hasPassedAssessment: boolean;
  onOpenCertificate: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  onSwitchRole,
  apprentice,
  instructorSession,
  isAuthenticatedInstructor,
  onOpenInstructorAuth,
  onLogoutInstructor,
  onOpenProfile,
  hasPassedAssessment,
  onOpenCertificate,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Institutional Top Strip */}
      <div className="bg-[#00324D] dark:bg-[#001824] text-white px-4 lg:px-8 py-1.5 text-xs flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <SenaLogo variant="white" className="w-4 h-4 shrink-0" />
          <span className="font-semibold text-emerald-400">SENA</span>
          <span className="text-slate-300">·</span>
          {userRole === 'instructor' && isAuthenticatedInstructor && instructorSession ? (
            <span className="text-slate-200 truncate max-w-[280px] sm:max-w-none">
              {instructorSession.regional} — {instructorSession.center}
            </span>
          ) : (
            <span className="text-slate-200 truncate max-w-[280px] sm:max-w-none">
              {apprentice.regional} — {apprentice.trainingCenter}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          {userRole === 'instructor' && isAuthenticatedInstructor && instructorSession ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline font-mono text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                {instructorSession.name}
              </span>
              <span className="text-slate-400">·</span>
              <button
                onClick={onLogoutInstructor}
                className="text-xs text-rose-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium underline underline-offset-2"
                title="Cerrar sesión de instructor y volver a aprendiz"
              >
                <LogOut className="w-3 h-3" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : (
            <>
              <span className="hidden md:inline font-mono text-[11px]">
                Ficha: <strong className="text-white">{apprentice.fichaNumber}</strong>
              </span>
              <span className="text-slate-400">·</span>
              <button
                onClick={() => {
                  if (isAuthenticatedInstructor) {
                    onSwitchRole('instructor');
                  } else {
                    onOpenInstructorAuth();
                  }
                }}
                className="text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-medium underline underline-offset-2"
              >
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Acceso Instructor</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Top Bar strictly honoring 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, text element) */}
        <div 
          onClick={() => setActiveTab('overview')} 
          className="flex items-center gap-3 cursor-pointer shrink-0 select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shadow-xs">
            <SenaLogo variant="green" className="w-7 h-7" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block leading-tight">
              SENA <span className="text-[#39A900]">Inducción</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block -mt-0.5">
              {userRole === 'apprentice' ? 'Portal del Aprendiz' : 'Portal del Instructor FPI'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Tailored to active role) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Inicio
          </button>

          {userRole === 'apprentice' ? (
            /* APPRENTICE NAV ITEMS */
            <>
              <button
                onClick={() => setActiveTab('identity')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'identity'
                    ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Identidad y Valores
              </button>
              <button
                onClick={() => setActiveTab('rights-duties')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'rights-duties'
                    ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Derechos y Deberes
              </button>
              <button
                onClick={() => setActiveTab('formation-path')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'formation-path'
                    ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Ruta Formativa
              </button>
              <button
                onClick={() => setActiveTab('learner-services')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'learner-services'
                    ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Servicios de Bienestar
              </button>
              <button
                onClick={() => setActiveTab('case-simulator')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'case-simulator'
                    ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Simulador de Casos
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'assessment'
                    ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Evaluación
              </button>
            </>
          ) : (
            /* INSTRUCTOR NAV ITEMS */
            <>
              <button
                onClick={() => setActiveTab('instructor-dashboard')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'instructor-dashboard'
                    ? 'border-[#00324D] dark:border-emerald-400 text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Panel de Cohorte
              </button>
              <button
                onClick={() => setActiveTab('pedagogical-guidelines')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'pedagogical-guidelines'
                    ? 'border-[#00324D] dark:border-emerald-400 text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Guías y Formatos GFPI
              </button>
              <button
                onClick={() => setActiveTab('rights-duties')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'rights-duties'
                    ? 'border-[#00324D] dark:border-emerald-400 text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Régimen y Comités
              </button>
              <button
                onClick={() => setActiveTab('case-simulator')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'case-simulator'
                    ? 'border-[#00324D] dark:border-emerald-400 text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Simulador de Casos
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeTab === 'assessment'
                    ? 'border-[#00324D] dark:border-emerald-400 text-[#00324D] dark:text-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Prueba Diagnóstica
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1 primary action + theme toggle + profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {userRole === 'apprentice' ? (
            hasPassedAssessment ? (
              <button
                onClick={onOpenCertificate}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Ver Constancia</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('assessment')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] rounded-lg hover:bg-[#2e8800] transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Evaluar Apropiación</span>
              </button>
            )
          ) : (
            <button
              onClick={() => setActiveTab('instructor-dashboard')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#00324D] dark:bg-emerald-600 rounded-lg hover:bg-[#004e75] dark:hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Gestionar Ficha</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-slate-200/60 dark:border-slate-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
          
          <button
            onClick={onOpenProfile}
            title="Editar datos del aprendiz"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-nav for mobile screens */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded whitespace-nowrap ${
            activeTab === 'overview' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Inicio
        </button>

        {userRole === 'apprentice' ? (
          <>
            <button
              onClick={() => setActiveTab('identity')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'identity' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Identidad
            </button>
            <button
              onClick={() => setActiveTab('rights-duties')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'rights-duties' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Derechos/Deberes
            </button>
            <button
              onClick={() => setActiveTab('formation-path')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'formation-path' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Ruta
            </button>
            <button
              onClick={() => setActiveTab('learner-services')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'learner-services' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Bienestar
            </button>
            <button
              onClick={() => setActiveTab('case-simulator')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'case-simulator' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Casos
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'assessment' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Evaluación
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('instructor-dashboard')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'instructor-dashboard' ? 'bg-[#00324D] dark:bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Cohorte
            </button>
            <button
              onClick={() => setActiveTab('pedagogical-guidelines')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'pedagogical-guidelines' ? 'bg-[#00324D] dark:bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Guías GFPI
            </button>
            <button
              onClick={() => setActiveTab('rights-duties')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'rights-duties' ? 'bg-[#00324D] dark:bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Normativa
            </button>
            <button
              onClick={() => setActiveTab('case-simulator')}
              className={`px-3 py-1.5 rounded whitespace-nowrap ${
                activeTab === 'case-simulator' ? 'bg-[#00324D] dark:bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Casos
            </button>
          </>
        )}
      </div>
    </header>
  );
};
