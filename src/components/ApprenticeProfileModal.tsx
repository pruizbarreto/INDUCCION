import React, { useState } from 'react';
import { ApprenticeProfile } from '../types/induction';
import { X, Check } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentice: ApprenticeProfile;
  onSave: (updated: ApprenticeProfile) => void;
}

export const ApprenticeProfileModal: React.FC<ApprenticeProfileModalProps> = ({
  isOpen,
  onClose,
  apprentice,
  onSave
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>(apprentice);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <SenaLogo variant="green" className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-900">
              Datos del Aprendiz en Inducción
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nombre Completo del Aprendiz:</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#39A900] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tipo Doc:</label>
              <select
                value={formData.documentType}
                onChange={e => setFormData({ ...formData, documentType: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs"
              >
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="PEP">PEP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Número de Documento:</label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={e => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Número de Ficha:</label>
              <input
                type="text"
                required
                value={formData.fichaNumber}
                onChange={e => setFormData({ ...formData, fichaNumber: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Regional:</label>
              <input
                type="text"
                required
                value={formData.regional}
                onChange={e => setFormData({ ...formData, regional: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Programa de Formación:</label>
            <input
              type="text"
              required
              value={formData.programName}
              onChange={e => setFormData({ ...formData, programName: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Centro de Formación:</label>
            <input
              type="text"
              required
              value={formData.trainingCenter}
              onChange={e => setFormData({ ...formData, trainingCenter: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <p className="text-[11px] text-slate-500 pt-2">
            Estos datos se imprimirán exactamente en la Constancia Oficial de Inducción al aprobar la evaluación.
          </p>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#39A900] text-white font-bold rounded-lg hover:bg-[#2e8800] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
