import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, Mail, ExternalLink, Scale } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndClose?: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  onAcceptAndClose
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-800 dark:text-slate-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#39A900] tracking-wider uppercase">
                <span>Ley 1581 de 2012</span>
                <span>·</span>
                <span>Habeas Data Colombia</span>
              </div>
              <h2 id="privacy-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Política de Protección y Tratamiento de Datos Personales del SENA
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar política de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Institutional Compliance Notice */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
            <Scale className="w-5 h-5 text-[#39A900] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs uppercase tracking-wide">Marco Normativo Vigente</p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                El Servicio Nacional de Aprendizaje (SENA), establecimiento público del orden nacional, actúa como <strong>Responsable del Tratamiento</strong> de sus datos personales en estricto acatamiento de la <strong>Ley Estatutaria 1581 de 2012</strong>, su <strong>Decreto Reglamentario 1377 de 2013</strong> y la <strong>Resolución Interna SENA No. 1-02684 de 2018</strong>.
              </p>
            </div>
          </div>

          {/* Section 1: Por qué se recolectan los datos */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#39A900]" />
              <span>1. Finalidad de la Recolección de Datos (¿Por qué los solicitamos?)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              La recolección de sus datos básicos de identificación (nombre completo, tipo y número de documento de identidad y ficha de caracterización) obedece exclusivamente a finalidades de índole académico, pedagógico e institucional requeridas para la <strong>Inducción a la Formación Profesional Integral (FPI)</strong> reglamentada por el <strong>Acuerdo 009 de 2024</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
              <li>Formalizar e individualizar su matrícula y participación activa en las 40 horas obligatorias de inducción institucional.</li>
              <li>Registrar su avance modular y calificar la evaluación diagnóstica de apropiación del reglamento y de la cultura SENA.</li>
              <li>Generar de forma automatizada su Constancia Oficial de Inducción con firma digital y código de verificación verificable por los instructores de su ficha.</li>
              <li>Asentar los juicios evaluativos pertinentes en los sistemas de gestión académica institucional Sofia Plus y el ecosistema Zajuna.</li>
            </ul>
          </section>

          {/* Section 2: Cómo se utilizan */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>2. Uso y Protección de la Información (¿Cómo se utilizan?)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Sus datos son almacenados en la base de datos institucional protegida con controles de seguridad técnica, física y administrativa. <strong>El SENA garantiza que:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
              <li>No comercializa, no cede ni transfiere sus datos personales a terceros comerciales ni empresas privadas de mercadeo.</li>
              <li>Los datos no se emplean para fines distintos a los expresamente autorizados en este documento.</li>
              <li>Se aplican medidas para evitar la adulteración, pérdida, consulta o acceso no autorizado de su registro.</li>
            </ul>
          </section>

          {/* Section 3: Quién puede acceder a ellos */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>3. Acceso Restringido y Destinatarios (¿Quién tiene acceso?)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              El acceso a sus registros está estrictamente delimitado bajo el principio de necesidad y rol (RBAC):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Instructores Asignados</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Verifican el cumplimiento del módulo de inducción y asientan planes pedagógicos.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Coordinación Académica</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Supervisa la cohorte del Centro de Formación y valida la certificación formal.</span>
              </div>
            </div>
          </section>

          {/* Section 4: Derechos ARCO y Canales de Atención */}
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>4. Sus Derechos como Titular (Derechos ARCO)</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Conforme al artículo 8 de la Ley 1581 de 2012, usted tiene derecho en cualquier momento y de forma gratuita a:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
              <li><strong>Conocer:</strong> Solicitar prueba de la autorización otorgada y consultar los datos personales que reposan en las bases de datos.</li>
              <li><strong>Actualizar y Rectificar:</strong> Modificar datos parciales, inexactos, incompletos o desactualizados.</li>
              <li><strong>Suprimir o Revocar:</strong> Solicitar la eliminación de sus datos o revocar la autorización cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales.</li>
            </ul>
          </section>

          {/* Section 5: Canales Oficiales de Atención */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-xs text-slate-900 dark:text-white block">Canales Oficiales para Ejercer sus Derechos (Habeas Data SENA):</span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#39A900]" />
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">habeasdata@sena.edu.co</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Línea Gratuita Nacional:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">01 8000 910 270</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dirección General: Calle 57 No. 8-69, Bogotá D.C., Colombia · Radicación electrónica en www.sena.edu.co
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <SenaLogo variant="green" className="w-4 h-4" />
            <span>Resolución SENA No. 1-02684 de 2018</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            {onAcceptAndClose && (
              <button
                onClick={onAcceptAndClose}
                className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Entendido y Autorizar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
