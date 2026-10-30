import React, { useState } from 'react';
import { PEDAGOGICAL_GUIDELINES, TEACHING_RESOURCES } from '../data/instructorData';
import { PedagogicalGuideline, TeachingResource } from '../types/induction';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ShieldAlert, 
  Scale, 
  Search, 
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const PedagogicalGuidelinesModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGuideline, setSelectedGuideline] = useState<PedagogicalGuideline>(PEDAGOGICAL_GUIDELINES[0]);
  const [activeTab, setActiveTab] = useState<'guidelines' | 'resources'>('guidelines');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewResource, setPreviewResource] = useState<TeachingResource | null>(null);

  const categories = ['all', 'Guía de Aprendizaje', 'Planeación Curricular', 'Evaluación Formativa', 'Debido Proceso'];

  const filteredGuidelines = PEDAGOGICAL_GUIDELINES.filter(g => 
    selectedCategory === 'all' || g.category === selectedCategory
  );

  const handleCopySample = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadTemplate = (resource: TeachingResource) => {
    const blob = new Blob([resource.contentSample], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SENA_${resource.code}_Plantilla.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#00324D] to-[#004e75] text-white p-6 sm:p-8 border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2 tracking-wider uppercase">
              <SenaLogo variant="white" className="w-4 h-4" />
              <span>Dirección de Formación Profesional · GFPI</span>
              <span>·</span>
              <span className="text-slate-300">Gestión Pedagógica y Normativa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lineamientos Pedagógicos y Banco de Recursos FPI
            </h1>
            <p className="text-sm text-slate-200 mt-2 max-w-3xl leading-relaxed">
              Repositorio normativo y metodológico para instructores: guías de inducción, planeación curricular por competencias, administración del debido proceso (Acuerdo 009 de 2024) y formatos oficiales descargables.
            </p>
          </div>

          {/* Sub-navigation tabs */}
          <div className="flex bg-white/10 p-1 rounded-xl shrink-0 border border-white/10 self-start md:self-center">
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'guidelines'
                  ? 'bg-white text-[#00324D] shadow-xs'
                  : 'text-white hover:text-emerald-300'
              }`}
            >
              Guías y Políticas
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-white text-[#00324D] shadow-xs'
                  : 'text-white hover:text-emerald-300'
              }`}
            >
              Formatos y Rúbricas
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'guidelines' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Guidelines Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#00324D] dark:bg-emerald-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Todos los lineamientos' : cat}
                </button>
              ))}
            </div>

            {/* Guidelines List */}
            <div className="space-y-3">
              {filteredGuidelines.map(g => {
                const isSelected = selectedGuideline.id === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGuideline(g)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-[#39A900] shadow-sm ring-1 ring-[#39A900]'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {g.code}
                      </span>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                        Fase: {g.fpiPhase}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {g.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Guideline Deep-Dive (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  {selectedGuideline.code}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Categoría: <strong>{selectedGuideline.category}</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {selectedGuideline.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {selectedGuideline.summary}
              </p>
            </div>

            {/* Key Instructions Step-by-Step */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#39A900]" />
                <span>Instrucciones Operativas y Pasos Clave para el Instructor</span>
              </h3>
              <div className="space-y-3">
                {selectedGuideline.keyInstructions.map((instruction, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {instruction}
                  </div>
                ))}
              </div>
            </div>

            {/* Normative Support and Official Formats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 block mb-1">
                  Soporte Jurídico / Normativo
                </span>
                <p className="text-xs text-blue-800 dark:text-blue-400">
                  {selectedGuideline.normativeSupport}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                  Formato Institucional Vinculado
                </span>
                <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                  {selectedGuideline.associatedFormat}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Teaching Resources Grid */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEACHING_RESOURCES.map(res => (
              <div
                key={res.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between hover:border-[#39A900] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      {res.officialCode}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">
                      {res.type}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 mb-4">
                    <strong>Recomendación:</strong> {res.usageTip}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Visualizar Modelo</span>
                  </button>

                  <button
                    onClick={() => handleDownloadTemplate(res)}
                    className="px-3 py-1.5 bg-[#00324D] hover:bg-[#004e75] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resource Preview Modal */}
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
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Estructura oficial del documento editable:
                </span>
                <button
                  onClick={() => handleCopySample(previewResource.contentSample, previewResource.id)}
                  className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === previewResource.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#39A900]" />
                      <span>Copiado al portapapeles</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Contenido</span>
                    </>
                  )}
                </button>
              </div>

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
                  onClick={() => handleDownloadTemplate(previewResource)}
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Plantilla (.txt/.docx)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
