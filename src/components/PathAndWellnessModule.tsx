import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle, 
  Clock 
} from 'lucide-react';

export const PathAndWellnessModule: React.FC = () => {
  const [activeStageTab, setActiveStageTab] = useState<'lectiva' | 'productiva'>('lectiva');
  const [selectedAlternative, setSelectedAlternative] = useState<number>(0);

  const productivaAlternatives = [
    {
      title: 'Contrato de Aprendizaje',
      badge: 'Modalidad Principal',
      description: 'Acuerdo formativo formal entre una empresa patrocinadora y el aprendiz, regulado por la Ley 789 de 2002.',
      requirements: [
        'Registro en el Sistema de Gestión Virtual de Aprendices (SGVA)',
        'Apoyo de sostenimiento mensual mínimo legal estipulado por ley',
        'Afiliación a ARL y EPS por parte de la empresa patrocinadora'
      ],
      duration: 'Hasta 6 meses (o según diseño curricular del programa)'
    },
    {
      title: 'Proyecto Productivo',
      badge: 'Emprendimiento',
      description: 'Desarrollo de una idea de negocio rentable e innovadora formulada durante la etapa lectiva con apoyo de Fondo Emprender.',
      requirements: [
        'Aprobación de la unidad productiva por el comité técnico de centro',
        'Plan de negocio estructurado y evidencias de validación de mercado',
        'Asesoría técnica continua con instructores del área de emprendimiento'
      ],
      duration: 'Equivalente a las horas requeridas de etapa práctica'
    },
    {
      title: 'Vínculo Laboral o Contractual',
      badge: 'Trabajo Activo',
      description: 'Aplica si el aprendiz ya labora en una empresa desempeñando funciones afines y directas a las competencias de su programa.',
      requirements: [
        'Certificación laboral expedida por la empresa con detalle de funciones',
        'Concertación de plan de trabajo y bitácoras quincenales validadas',
        'Aval previo de la Coordinación Académica del Centro de Formación'
      ],
      duration: 'Cobertura del periodo de etapa práctica del programa'
    },
    {
      title: 'Pasantía',
      badge: 'Institucional',
      description: 'Práctica concertada en entidades públicas, ONG, empresas o unidades comunales para resolver necesidades puntuales.',
      requirements: [
        'Convenio o carta de aceptación entre la entidad y el SENA',
        'Afiliación a ARL a cargo de la entidad receptora o del SENA',
        'Plan concertado de actividades técnicas y bitácoras quincenales'
      ],
      duration: 'Hasta 6 meses según intensidad horaria'
    },
    {
      title: 'Monitoría Institucional',
      badge: 'Mérito Académico',
      description: 'Apoyo pedagógico y técnico en ambientes de aprendizaje, laboratorios, bibliotecas o proyectos del Centro de Formación.',
      requirements: [
        'Haber obtenido excelente desempeño académico durante la etapa lectiva',
        'Participar y ganar la convocatoria pública de monitorías del Centro',
        'Dedicación horaria semanal compatible con la formación'
      ],
      duration: 'Por resolución de subdirección de centro'
    }
  ];

  const wellnessAxes = [
    {
      title: 'Salud Integral',
      desc: 'Prevención de la salud, jornadas de vacunación, ergonomía y tamizajes médicos.',
      tag: 'Bienestar Físico'
    },
    {
      title: 'Cultura y Expresión Artística',
      desc: 'Grupos representativos de danza, música folclórica y moderna, teatro, pintura y cuentería.',
      tag: 'Expresión'
    },
    {
      title: 'Deporte y Recreación',
      desc: 'Torneos intercentros de fútbol, voleibol, baloncesto, atletismo y juegos tradicionales.',
      tag: 'Actividad Física'
    },
    {
      title: 'Apoyos de Sostenimiento',
      desc: 'Convocatorias de apoyo económico regular y FIC para aprendices en condiciones socioeconómicas vulnerables.',
      tag: 'Socioeconómico'
    },
    {
      title: 'Orientación Psicológica',
      desc: 'Acompañamiento profesional en habilidades socioemocionales, manejo del estrés y resiliencia.',
      tag: 'Salud Mental'
    },
    {
      title: 'Liderazgo y Habilidades Blandas',
      desc: 'Escuela de líderes SENA para representantes, voceros y aprendices con espíritu de servicio comunitario.',
      tag: 'Liderazgo'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
            Módulo 3 · Ciclo de Vida del Aprendiz
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">
            Ruta Formativa, Etapas y Bienestar al Aprendiz
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Tu paso por el SENA consta de dos grandes momentos pedagógicos interconectados: la apropiación de conocimientos en los ambientes y la aplicación real en el mundo empresarial.
          </p>
        </div>

        {/* Roadmap visual flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-xs font-mono font-bold text-emerald-700">Fase 1</span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Inducción Institucional</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Semana inicial donde reconoces el reglamento, los valores institucionales y organizas tu proyecto de formación.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
            <span className="text-xs font-mono font-bold text-sky-700">Fase 2</span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Etapa Lectiva</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Desarrollo de competencias técnicas, transversales (inglés, TIC, ética) y proyectos formativos guiados.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-xs font-mono font-bold text-amber-700">Fase 3</span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Etapa Productiva</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Aplicación de competencias en empresas o proyectos con bitácoras de seguimiento y aval para la certificación oficial.
            </p>
          </div>
        </div>
      </section>

      {/* Etapa Lectiva vs Etapa Productiva Deep Dive */}
      <section className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Alternativas de la Etapa Productiva</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Conoce las modalidades oficiales en las que puedes desarrollar y certificar tus horas prácticas.
            </p>
          </div>

          {/* Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveStageTab('lectiva')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeStageTab === 'lectiva' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Etapa Lectiva
            </button>
            <button
              onClick={() => setActiveStageTab('productiva')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeStageTab === 'productiva' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Etapa Productiva ({productivaAlternatives.length} Opciones)
            </button>
          </div>
        </div>

        {activeStageTab === 'productiva' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* List of alternatives */}
            <div className="lg:col-span-5 space-y-2">
              {productivaAlternatives.map((alt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedAlternative(idx)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedAlternative === idx
                      ? 'border-[#39A900] bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{alt.title}</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                      {alt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {alt.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected alternative detail */}
            <div className="lg:col-span-7 bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-5">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-semibold">
                  Modalidad Oficial #{selectedAlternative + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {productivaAlternatives[selectedAlternative].title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {productivaAlternatives[selectedAlternative].description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Requisitos y Compromisos Clave
                </h4>
                <ul className="space-y-2">
                  {productivaAlternatives[selectedAlternative].requirements.map((req, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Duración Reglamentaria:
                </span>
                <strong className="text-slate-900">{productivaAlternatives[selectedAlternative].duration}</strong>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
                📌 <em>Bitácoras de Seguimiento:</em> Durante la etapa productiva, debes registrar quincenalmente el formato F023 (bitácora de evidencias) con el aval de tu jefe inmediato y enviarlo a tu instructor de seguimiento asignado.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">¿Qué comprende la Etapa Lectiva?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Es el período durante el cual el aprendiz adquiere y apropia los conocimientos técnicos, procedimentales y axiológicos del programa formativo.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Guías de aprendizaje y talleres prácticos en ambientes reales o simulados.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Competencias transversales: Inglés, TIC, Ética, Seguridad y Salud en el Trabajo, Emprendimiento.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Proyecto formativo que resuelve un problema real del sector productivo.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Criterio de Evaluación SENA</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                En el SENA no se evalúa con notas numéricas tradicionales de 1 a 5, sino por <strong>Logro de Competencias</strong>:
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="text-xl font-bold text-emerald-700 font-mono">A</span>
                  <p className="text-xs font-bold text-emerald-900 mt-0.5">Aprobado</p>
                  <p className="text-[10px] text-emerald-700 mt-1">Evidencia cumple con el 100% de los criterios.</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                  <span className="text-xl font-bold text-rose-700 font-mono">D</span>
                  <p className="text-xs font-bold text-rose-900 mt-0.5">Deficiente / No Aprobado</p>
                  <p className="text-[10px] text-rose-700 mt-1">Requiere plan de mejoramiento con el instructor.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Bienestar al Aprendiz */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">Acompañamiento Integral</span>
          <h2 className="text-2xl font-bold text-slate-900">Ejes de Bienestar al Aprendiz</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            El Plan Nacional de Bienestar garantiza que tu experiencia en el SENA sea enriquecedora en lo humano, físico, socioemocional y cultural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wellnessAxes.map((axis, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">{axis.tag}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 mb-2">{axis.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {axis.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Acceso gratuito</span>
                <span className="text-emerald-700 font-medium">Oficina de Bienestar</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Convivencia y Comité de Evaluación */}
      <section className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Debido Proceso y Convivencia</span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">El Comité de Evaluación y Seguimiento</h2>
          <p className="text-xs text-slate-500 mt-1">
            Instancia que analiza las situaciones académicas o disciplinarias de los aprendices, garantizando siempre el derecho a la defensa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              Medidas Formativas (Pedagógicas)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tienen como objetivo orientar al aprendiz para que supere deficiencias académicas o conductuales sin carácter punitivo:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li><strong>1. Llamado de atención verbal:</strong> Reflexión directa con el instructor sobre una conducta u omisión.</li>
              <li><strong>2. Plan de mejoramiento académico:</strong> Actividades pedagógicas complementarias pactadas para alcanzar resultados de aprendizaje no aprobados.</li>
              <li><strong>3. Plan de mejoramiento disciplinario:</strong> Compromiso ético y formativo de conducta firmado por el aprendiz.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-200 space-y-3">
            <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
              <Scale className="w-4 h-4 text-rose-600" />
              Medidas Sancionatorias (Por Falta Grave o Reincidencia)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recomendadas por el Comité y emitidas mediante Resolución formal por la Subdirección de Centro:
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li><strong>1. Llamado de atención por escrito:</strong> Con copia a la hoja de vida del aprendiz en el sistema Sofia Plus.</li>
              <li><strong>2. Condicionamiento de matrícula:</strong> Pérdida de beneficios institucionales y última oportunidad para rectificar la conducta.</li>
              <li><strong>3. Cancelación de matrícula:</strong> Pérdida definitiva del cupo con inhabilidad para matricularse en el SENA entre 6 meses y 2 años.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
