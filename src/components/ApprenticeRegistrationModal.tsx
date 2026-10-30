import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Info,
  Sparkles,
  Lock
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { registerApprentice, checkDuplicate } from '../services/apprenticeApi';
import { ApprenticeProfile } from '../types/induction';

interface ApprenticeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisteredSuccess: (profile: ApprenticeProfile) => void;
}

export const ApprenticeRegistrationModal: React.FC<ApprenticeRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisteredSuccess
}) => {
  // Form State
  const [name, setName] = useState('');
  const [documentType, setDocumentType] = useState('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [ficha, setFicha] = useState('2824910');
  const [program, setProgram] = useState('Tecnólogo en Análisis y Desarrollo de Software (ADSO)');
  const [regional, setRegional] = useState('Regional Distrito Capital');
  const [trainingCenter, setTrainingCenter] = useState('Centro de Gestión de Mercados, Logística y Tecnologías de la Información');

  // Mandatory Law 1581 of 2012 Consent - UNCHECKED BY DEFAULT
  const [hasConsentLaw1581, setHasConsentLaw1581] = useState(false);
  
  // UI States
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<{
    message: string;
    existingApprentice: any;
  } | null>(null);

  if (!isOpen) return null;

  // Real-time duplicate check when user finishes typing document number
  const handleDocumentBlur = async () => {
    if (documentNumber.trim().length >= 6) {
      const check = await checkDuplicate(documentType, documentNumber.trim());
      if (check.exists && check.apprentice) {
        setDuplicateWarning({
          message: `Ya existe un registro en la base de datos para ${documentType} ${documentNumber.trim()} a nombre de ${check.apprentice.name}.`,
          existingApprentice: check.apprentice
        });
      } else {
        setDuplicateWarning(null);
      }
    }
  };

  const handleResumeExisting = () => {
    if (!duplicateWarning?.existingApprentice) return;
    const existing = duplicateWarning.existingApprentice;
    const profile: ApprenticeProfile = {
      id: existing.id,
      name: existing.name,
      documentType: existing.documentType,
      documentNumber: existing.documentNumber,
      regional: existing.regional || 'Regional Distrito Capital',
      trainingCenter: existing.trainingCenter || 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
      programName: existing.program || 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      fichaNumber: existing.ficha,
      avatarSeed: existing.name.toLowerCase().replace(/\s+/g, '-')
    };
    onRegisteredSuccess(profile);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim() || name.trim().length < 3) {
      setErrorMessage('Por favor ingrese su nombre y apellidos completos (mínimo 3 letras).');
      return;
    }

    if (!documentNumber.trim() || documentNumber.trim().length < 5) {
      setErrorMessage('Por favor ingrese un número de documento válido (mínimo 5 dígitos).');
      return;
    }

    if (!ficha.trim() || ficha.trim().length < 4) {
      setErrorMessage('Por favor ingrese el número de ficha de caracterización asignado a su formación.');
      return;
    }

    if (!hasConsentLaw1581) {
      setErrorMessage('Es un requisito legal aceptar expresamente el tratamiento de datos personales conforme a la Ley 1581 de 2012 para participar en la inducción.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerApprentice({
        name: name.trim(),
        documentType,
        documentNumber: documentNumber.trim(),
        ficha: ficha.trim(),
        program,
        regional,
        trainingCenter,
        hasConsentLaw1581
      });

      if (!response.success) {
        if (response.isDuplicate && response.existingApprentice) {
          setDuplicateWarning({
            message: response.error || 'Este aprendiz ya se encuentra registrado en el sistema.',
            existingApprentice: response.existingApprentice
          });
        } else {
          setErrorMessage(response.error || 'Ocurrió un error al registrar en la base de datos.');
        }
        setIsLoading(false);
        return;
      }

      if (response.apprentice) {
        const profile: ApprenticeProfile = {
          id: response.apprentice.id,
          name: response.apprentice.name,
          documentType: response.apprentice.documentType,
          documentNumber: response.apprentice.documentNumber,
          regional: response.apprentice.regional,
          trainingCenter: response.apprentice.trainingCenter,
          programName: response.apprentice.program,
          fichaNumber: response.apprentice.ficha,
          avatarSeed: response.apprentice.name.toLowerCase().replace(/\s+/g, '-')
        };

        onRegisteredSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage('Error de conexión con la base de datos. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-modal-title"
      >
        <div className="w-full max-w-2xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00324D] to-[#004b73] text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <SenaLogo variant="white" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-300 font-bold tracking-wider uppercase block">
                  Sistema Oficial de Inducción FPI
                </span>
                <h2 id="register-modal-title" className="text-base sm:text-lg font-bold text-white">
                  Registro Oficial del Aprendiz
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Cerrar formulario de registro"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
            {/* Context Notice */}
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-emerald-950 dark:text-emerald-100">
                  Requisito Indispensable de Inducción (Acuerdo 009 de 2024)
                </p>
                <p className="text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">
                  El registro individual es obligatorio para que sus <strong>40 horas de inducción</strong>, avance en los módulos y puntaje de evaluación queden formalmente asentados en la base de datos institucional del Centro de Formación.
                </p>
              </div>
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-3 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Duplicate Detected Warning & Resume Action */}
            {duplicateWarning && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Registro Preexistente Identificado</p>
                    <p className="mt-0.5 text-amber-800 dark:text-amber-300">{duplicateWarning.message}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-amber-200 dark:border-amber-800">
                  <span className="text-[11px] text-amber-700 dark:text-amber-400">
                    Puedes continuar con tu progreso guardado previamente:
                  </span>
                  <button
                    type="button"
                    onClick={handleResumeExisting}
                    className="px-3.5 py-1.5 bg-[#00324D] hover:bg-[#002235] text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <span>Reanudar Mi Proceso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Fields Grid */}
            <div className="space-y-4">
              {/* Row 1: Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Nombres y Apellidos Completos <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ej: Laura Sofía Martínez Gómez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                />
              </div>

              {/* Row 2: Document Type and Number */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tipo de Documento <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={documentType}
                    onChange={e => setDocumentType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                  >
                    <option value="CC">Cédula de Ciudadanía (C.C.)</option>
                    <option value="TI">Tarjeta de Identidad (T.I.)</option>
                    <option value="CE">Cédula de Extranjería (C.E.)</option>
                    <option value="PPT">Permiso Protección Temporal (P.P.T.)</option>
                    <option value="PEP">Permiso Especial Permanencia (P.E.P.)</option>
                  </select>
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Número de Documento de Identidad <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={documentNumber}
                    onBlur={handleDocumentBlur}
                    onChange={e => {
                      setDocumentNumber(e.target.value);
                      if (duplicateWarning) setDuplicateWarning(null);
                    }}
                    placeholder="Ej: 1032489201"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Ficha and Program */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Número de Ficha <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={ficha}
                    onChange={e => setFicha(e.target.value)}
                    placeholder="Ej: 2824910"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                  />
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Programa de Formación
                  </label>
                  <input
                    type="text"
                    required
                    value={program}
                    onChange={e => setProgram(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Regional y Centro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Regional SENA
                  </label>
                  <input
                    type="text"
                    value={regional}
                    onChange={e => setRegional(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Centro de Formación
                  </label>
                  <input
                    type="text"
                    value={trainingCenter}
                    onChange={e => setTrainingCenter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs truncate"
                  />
                </div>
              </div>
            </div>

            {/* HABEAS DATA & PRIVACY MESSAGING (Law 1581 of 2012) */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                  <span className="font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                    Aviso de Privacidad y Tratamiento de Datos (Ley 1581 de 2012)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPolicyModalOpen(true)}
                  className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Leer Política Completa</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Explanatory summary for Law 1581 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Finalidad y Uso:</span>
                  <span>Registro oficial de asistencia a las 40 horas de inducción, seguimiento pedagógico a resultados y expedición de la constancia digital verificable.</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Acceso y Derechos:</span>
                  <span>Acceso restringido a instructores y coordinación. Puede ejercer sus derechos ARCO (conocer, rectificar o suprimir) en <strong className="font-mono text-emerald-700 dark:text-emerald-400">habeasdata@sena.edu.co</strong>.</span>
                </div>
              </div>

              {/* MANDATORY UNCHECKED CHECKBOX */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={hasConsentLaw1581}
                    onChange={e => setHasConsentLaw1581(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#39A900] border-slate-300 focus:ring-[#39A900] cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-white">Autorización Expresa: </strong>
                    Autorizo de manera previa, libre e informada al SENA para recolectar y tratar mis datos personales de acuerdo con la <strong>Ley 1581 de 2012</strong> y su <strong>Política de Protección de Datos Personales</strong>, con el fin exclusivo de registrar mi proceso de inducción y evaluar mis competencias.
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading || !hasConsentLaw1581 || !name || !documentNumber || !ficha}
                className={`w-full sm:w-auto px-6 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  !hasConsentLaw1581 || !name || !documentNumber || !ficha || isLoading
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-[#39A900] hover:bg-[#2e8800] text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <span>Registrando en la Base de Datos...</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Formalizar Registro e Iniciar Inducción</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onAcceptAndClose={() => {
          setHasConsentLaw1581(true);
          setIsPolicyModalOpen(false);
        }}
      />
    </>
  );
};
