import React from 'react';
import { ApprenticeProfile, AssessmentResult } from '../types/induction';
import { X, Printer, CheckCircle, Award } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentice: ApprenticeProfile;
  result: AssessmentResult | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  apprentice,
  result
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2.5">
            <SenaLogo variant="green" className="w-5 h-5" />
            <span className="text-sm font-bold text-slate-800">
              Constancia Oficial de Apropiación de Inducción
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Container */}
        <div 
          id="induction-certificate"
          className="p-8 sm:p-12 bg-white text-slate-900 relative border-8 border-double border-slate-200 m-4 rounded-xl"
        >
          {/* Subtle Institutional Watermark Border */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] flex items-center justify-center">
            <SenaLogo variant="dark" className="w-80 h-80" />
          </div>

          {/* Top Header */}
          <div className="text-center space-y-2 mb-8 relative">
            <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200 shadow-xs mb-1">
              <SenaLogo variant="green" className="w-14 h-14" />
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">
              República de Colombia · Ministerio del Trabajo
            </p>
            <h1 className="text-xl sm:text-2xl font-black text-[#00324D] uppercase tracking-wider">
              Servicio Nacional de Aprendizaje — SENA
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {apprentice.regional} · {apprentice.trainingCenter}
            </p>
            <div className="w-24 h-1 bg-[#39A900] mx-auto mt-3 rounded-full" />
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-6 max-w-xl mx-auto my-8 relative">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
              HACE CONSTAR QUE EL (LA) APRENDIZ
            </p>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
                {apprentice.name}
              </h2>
              <p className="text-xs font-mono text-slate-600 mt-1">
                {apprentice.documentType} N° {apprentice.documentNumber}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Cumplió satisfactoriamente con la totalidad de los módulos, actividades pedagógicas y la validación de conocimientos de la <strong>Inducción Institucional a la Formación Profesional Integral</strong> con una intensidad de <strong>40 horas</strong> reglamentarias, demostrando apropiación de los derechos, deberes y valores del SENA.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-4 text-left text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Programa:</span>
                <span className="font-semibold text-slate-900 block truncate">{apprentice.programName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Ficha de Caracterización:</span>
                <span className="font-mono font-bold text-slate-900">{apprentice.fichaNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Fecha de Aprobación:</span>
                <span className="text-slate-800">{result?.completedAt || '27 de Octubre de 2026'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Nivel de Apropiación:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {result?.percentage || 92}% (Aprobado)
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & QR Footing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-10 mt-8 border-t border-slate-200 text-center relative">
            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-sm text-slate-600">Firmado digitalmente</span>
              </div>
              <div className="w-40 h-[1px] bg-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-900">Subdirección de Centro</p>
              <p className="text-[10px] text-slate-500">Centro de Formación SENA</p>
            </div>

            {/* QR & Verification Code */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-16 h-16 bg-slate-100 border border-slate-300 p-1 flex items-center justify-center rounded">
                <div className="grid grid-cols-4 gap-0.5 w-full h-full p-1 bg-slate-900 rounded-xs">
                  <div className="bg-white col-span-2 row-span-2" />
                  <div className="bg-white col-span-1" />
                  <div className="bg-white" />
                  <div className="bg-white col-span-2 row-span-2" />
                  <div className="bg-white" />
                </div>
              </div>
              <p className="text-[9px] font-mono text-slate-500">
                Código: {result?.certificateCode || 'SENA-IND-282491'}
              </p>
              <p className="text-[9px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Certificación Verificada
              </p>
            </div>

            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-sm text-slate-600">Firmado digitalmente</span>
              </div>
              <div className="w-40 h-[1px] bg-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-900">Coordinación Misional</p>
              <p className="text-[10px] text-slate-500">Gestión de la Formación Profesional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
