import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  Download, 
  Printer, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  FileText,
  UserCheck,
  Compass,
  HeartHandshake
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<string>('intro');

  if (!isOpen) return null;

  const sections = [
    { id: 'intro', label: '1. Presentación y Requisitos', icon: BookOpen },
    { id: 'registro', label: '2. Registro y Habeas Data', icon: UserCheck },
    { id: 'panel', label: '3. Panel Principal (Hub)', icon: Compass },
    { id: 'identidad', label: '4. Identidad Institucional', icon: ShieldCheck },
    { id: 'derechos', label: '5. Derechos y Deberes (Acuerdo 009/2024)', icon: FileText },
    { id: 'ruta', label: '6. Ruta Formativa (FPI)', icon: Compass },
    { id: 'bienestar', label: '7. Bienestar al Aprendiz', icon: HeartHandshake },
    { id: 'casos', label: '8. Simulador de Casos', icon: CheckCircle2 },
    { id: 'evaluacion', label: '9. Evaluación y Constancia QR', icon: Award },
    { id: 'faq', label: '10. Preguntas Frecuentes', icon: HelpCircle },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text download of the manual
    const element = document.createElement("a");
    element.href = "/Manual.md";
    element.setAttribute("download", "Manual_Aprendiz_Induccion_SENA.md");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#00324D] dark:bg-[#001824] px-6 py-4 flex items-center justify-between text-white border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <SenaLogo variant="white" className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  M-GFPI-IND-01
                </span>
                <span className="text-xs text-slate-300">Acuerdo 009 de 2024</span>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-white">Manual del Aprendiz — Inducción FPI</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              title="Descargar archivo Manual.md"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar .MD</span>
            </button>
            <button
              onClick={handlePrint}
              title="Imprimir Manual"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-600/80 text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar & Subheader */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tema, norma o módulo..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Archivo oficial ubicado en la raíz del repositorio: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">/Manual.md</code>
          </div>
        </div>

        {/* Content Body: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 overflow-y-auto hidden md:block shrink-0 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Índice Temático
            </p>
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#39A900] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            
            {/* 1. Presentación y Requisitos */}
            <section id="intro" className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 1</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Presentación y Propósito Pedagógico</h3>
              </div>
              <p>
                ¡Bienvenido(a) a la familia SENA! Este entorno digital interactivo ha sido desarrollado para acompañarte en tu primera gran etapa formativa: <strong>La Inducción a la Formación Profesional Integral (FPI)</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 p-4 rounded-2xl">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-xs mb-1">Objetivo General</h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200/80">
                    Facilitar tu inmersión en la cultura institucional, derechos, deberes y servicios de bienestar bajo el <strong>Acuerdo 009 de 2024</strong>.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 p-4 rounded-2xl">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 text-xs mb-1">Requisitos de Acceso</h4>
                  <p className="text-xs text-blue-800 dark:text-blue-200/80">
                    Disponer de documento de identidad oficial y número de Ficha de Caracterización Sofia Plus / Zajuna.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Registro y Habeas Data */}
            <section id="registro" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 2</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Registro Obligatorio y Protección de Datos (Ley 1581 de 2012)</h3>
              </div>
              <p>
                Antes de acceder a las actividades diagnósticas, debes completar tu registro inicial. La herramienta valida campos obligatorios y previene registros duplicados asociando tu documento de identidad con tu Ficha.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li><strong>Finalidad Exclusiva:</strong> Seguimiento académico, control de asistencia y expedición de la Constancia Digital.</li>
                <li><strong>Consentimiento Expreso:</strong> Checkbox obligatorio desmarcado por defecto, cumpliendo los principios de libertad y transparencia de la Ley 1581 de 2012.</li>
                <li><strong>Derechos ARCO:</strong> Puedes solicitar actualización o corrección de datos en cualquier momento desde el menú de perfil de aprendiz.</li>
              </ul>
            </section>

            {/* 3. Panel Principal */}
            <section id="panel" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 3</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Panel Principal e Inducción Hub</h3>
              </div>
              <p>
                Tu panel principal te permite monitorear el progreso acumulado en cada módulo, alternar el modo oscuro/claro y acceder de forma directa a la evaluación diagnóstica una vez hayas explorado los contenidos.
              </p>
            </section>

            {/* 4. Identidad Institucional */}
            <section id="identidad" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 4</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Identidad Institucional, Símbolos y Valores</h3>
              </div>
              <p>
                Aprenderás sobre el Escudo (sectores de la economía), la Bandera blanca de paz y transparencia, el Logo-símbolo (el ser humano proyectado al futuro), el Himno institucional y los seis valores del Código de Integridad (Honestidad, Respeto, Compromiso, Diligencia, Justicia y Solidaridad).
              </p>
            </section>

            {/* 5. Derechos y Deberes */}
            <section id="derechos" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 5</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Derechos, Deberes y Prohibiciones (Acuerdo 009 de 2024)</h3>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-4 rounded-2xl">
                <p className="text-xs text-amber-900 dark:text-amber-200">
                  <strong>Actualización Normativa:</strong> El Acuerdo 009 de 2024 constituye el Reglamento del Aprendiz vigente. Reemplaza normativas anteriores (Acuerdo 007 de 2012) e introduce definiciones claras sobre faltas leves, graves y gravísimas, así como los protocolos de debido proceso ante el Comité de Evaluación y Seguimiento (Formato GFPI-F-023).
                </p>
              </div>
            </section>

            {/* 6. Ruta Formativa */}
            <section id="ruta" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 6</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ruta de Formación Profesional Integral (Lectiva y Productiva)</h3>
              </div>
              <p>
                Guía completa sobre el desarrollo por proyectos, elaboración de guías de aprendizaje (GFPI-G-014), portafolio de evidencias y las 5 alternativas avaladas para el desarrollo de la Etapa Productiva (Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo, Pasantía y Monitoría).
              </p>
            </section>

            {/* 7. Bienestar al Aprendiz */}
            <section id="bienestar" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 7</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Servicios de Bienestar al Aprendiz</h3>
              </div>
              <p>
                Información de contacto, requisitos y convocatorias para apoyos de sostenimiento (regular y FIC), atención en salud integral y primeros auxilios, actividades culturales y deportivas, y orientación psicosocial.
              </p>
            </section>

            {/* 8. Simulador de Casos */}
            <section id="casos" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 8</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Simulador de Casos y Dilemas Éticos</h3>
              </div>
              <p>
                Módulo práctico para experimentar la toma de decisiones basada en el reglamento, con retroalimentación inmediata fundamentada en los artículos del Acuerdo 009 de 2024.
              </p>
            </section>

            {/* 9. Evaluación y Constancia */}
            <section id="evaluacion" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 9</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Evaluación Diagnóstica y Constancia Digital QR</h3>
              </div>
              <p>
                Cuestionario de 12 preguntas diagnósticas con un umbral de aprobación del 70%. Al aprobar se genera tu <strong>Constancia Digital con Código QR de verificación</strong> y código alfanumérico único para anexar a tu portafolio de evidencias.
              </p>
            </section>

            {/* 10. FAQ */}
            <section id="faq" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Capítulo 10</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Preguntas Frecuentes y Soporte Técnico</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">¿Qué hago si me equivoqué en mis datos?</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Haz clic en tu nombre en la barra superior para abrir el modal de edición de perfil y guardar tus cambios.</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">¿Cómo sabe el instructor que aprobé?</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Tu resultado se guarda de inmediato en la base de datos y se sincroniza en tiempo real con la hoja de cálculo de Google Sheets de tu instructor.</p>
                </div>
              </div>
            </section>

          </main>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Manual Oficial para Aprendices SENA</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium rounded-xl cursor-pointer text-xs"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
