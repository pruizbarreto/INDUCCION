import React, { useState } from 'react';
import { InstructorSession } from '../types/induction';
import { DEMO_INSTRUCTOR_CREDENTIALS } from '../data/instructorData';
import { SenaLogo } from './SenaLogo';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface InstructorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: InstructorSession) => void;
}

export const InstructorAuthModal: React.FC<InstructorAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [documentId, setDocumentId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setDocumentId(DEMO_INSTRUCTOR_CREDENTIALS.documentId);
    setPin(DEMO_INSTRUCTOR_CREDENTIALS.pin);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanDoc = documentId.trim().toUpperCase();
    const cleanPin = pin.trim();

    if (!cleanDoc || !cleanPin) {
      setError('Por favor ingrese el documento/código y su clave PIN.');
      return;
    }

    setIsLoading(true);

    // Simulate verification of institutional credentials
    setTimeout(() => {
      setIsLoading(false);
      if (
        (cleanDoc === DEMO_INSTRUCTOR_CREDENTIALS.documentId && cleanPin === DEMO_INSTRUCTOR_CREDENTIALS.pin) ||
        (cleanDoc.length >= 6 && cleanPin === '1957') // Allow instructor's cédula with 1957 (foundation year)
      ) {
        const session: InstructorSession = {
          ...DEMO_INSTRUCTOR_CREDENTIALS.profile,
          documentId: cleanDoc,
          name: cleanDoc === DEMO_INSTRUCTOR_CREDENTIALS.documentId 
            ? DEMO_INSTRUCTOR_CREDENTIALS.profile.name 
            : `Instructor FPI (${cleanDoc})`,
          token: `sena_token_${Date.now()}`,
          authenticatedAt: new Date().toISOString()
        };

        // Persist session to local storage
        localStorage.setItem('sena_instructor_auth', JSON.stringify(session));
        localStorage.setItem('sena_active_role', 'instructor');

        onSuccess(session);
        onClose();
      } else {
        setError('Credenciales no autorizadas. Use el identificador institucional demo INST-2024-CBA y PIN 1957.');
      }
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Institutional Header */}
        <div className="bg-[#00324D] dark:bg-[#002235] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal de autenticación"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2">
              <SenaLogo variant="white" className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
                Control de Acceso FPI
              </span>
              <h2 id="auth-modal-title" className="text-xl font-bold text-white leading-tight">
                Ingreso de Instructores
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            El acceso a las guías pedagógicas, formatos de comités de evaluación y gestión de cohortes requiere validación de identidad docente.
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Credenciales Oficiales de Demostración:
                </p>
                <p className="text-emerald-800 dark:text-emerald-400 mt-0.5 font-mono text-[11px]">
                  ID: <strong>INST-2024-CBA</strong> · PIN: <strong>1957</strong>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-[#00324D] dark:text-emerald-300 hover:text-[#39A900] underline underline-offset-2 shrink-0 cursor-pointer"
            >
              Autocompletar
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Documento de Identidad o Código de Instructor
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={documentId}
                onChange={e => setDocumentId(e.target.value)}
                placeholder="Ej. INST-2024-CBA o Cédula"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Clave PIN de Acceso Institucional
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="Ingrese su PIN de 4 dígitos (ej. 1957)"
                maxLength={8}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#39A900] shrink-0" />
            <span>Sesión segura cifrada con token institucional en almacenamiento local.</span>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Permanecer como Aprendiz
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <span>Validando...</span>
              ) : (
                <>
                  <span>Verificar e Ingresar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
