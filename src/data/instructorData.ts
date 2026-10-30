import { InstructorSession, PedagogicalGuideline, TeachingResource, LearnerService } from '../types/induction';

export const DEMO_INSTRUCTOR_CREDENTIALS = {
  documentId: 'INST-2024-CBA',
  pin: '1957',
  profile: {
    id: 'inst-001',
    name: 'Ing. Carlos Alberto Mendoza',
    documentId: 'INST-2024-CBA',
    center: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Regional Distrito Capital',
    assignedFichas: ['2824910', '2824911', '2819002'],
    roleTitle: 'Instructor Técnico FPI / Gestor de Inducción',
    token: 'sena_jwt_auth_inst_2824910_valid',
    authenticatedAt: ''
  } as InstructorSession
};

export const PEDAGOGICAL_GUIDELINES: PedagogicalGuideline[] = [
  {
    id: 'guide-01',
    code: 'GFPI-G-001',
    title: 'Formulación y Gestión de la Guía de Aprendizaje en la Inducción FPI',
    category: 'Guía de Aprendizaje',
    summary: 'Estructuración de las 4 fases metodológicas de la guía para las 40 horas de inducción institucional, asegurando la apropiación de la cultura SENA.',
    fpiPhase: 'Inducción',
    keyInstructions: [
      '1. Identificación de la Guía: Código de ficha, programa formativo, competencia clave de inducción y Resultados de Aprendizaje de Inducción (RAP-IND).',
      '2. Presentación y Motivación: Contextualización del rol del aprendiz en la economía productiva del país y el impacto social del SENA.',
      '3. Formulación de Actividades: Reflexión inicial, contextualización e identificación de conocimientos previos, apropiación del conocimiento y transferencia.',
      '4. Criterios de Evaluación y Técnicas: Listas de chequeo para evaluar el portafolio de evidencias y la constancia de inducción en Sofia Plus/Zajuna.'
    ],
    associatedFormat: 'Formato GFPI-F-135 (Versión 02)',
    normativeSupport: 'Procedimiento Ejecución de la Formación Profesional Integral (FPI) · Código GFPI-P-006'
  },
  {
    id: 'guide-02',
    code: 'GFPI-P-004',
    title: 'Planeación Pedagógica del Proyecto Formativo y Articulación con RAPs',
    category: 'Planeación Curricular',
    summary: 'Lineamientos para concertar el plan de trabajo con la cohorte, articular las competencias técnicas y transversales y calendarizar la etapa lectiva.',
    fpiPhase: 'Planeación',
    keyInstructions: [
      'Concertación inicial del plan de evaluación con los aprendices durante la semana de inducción, dejando constancia firmada en acta.',
      'Asignación equilibrada de horas presenciales en ambientes de formación y horas en la plataforma LMS Zajuna.',
      'Integración transversal de las competencias de ética, comunicación, seguridad y salud en el trabajo (SST) y bilingüismo.',
      'Publicación del cronograma oficial de fases del proyecto formativo en el tablero de anuncios de la ficha.'
    ],
    associatedFormat: 'Formato GFPI-F-134 Planeación Pedagógica FPI',
    normativeSupport: 'Resolución de Diseño Curricular SENA y Sistema Integrado de Gestión y Autocontrol (SIGA)'
  },
  {
    id: 'guide-03',
    code: 'ACU-009-P-02',
    title: 'Debido Proceso Disciplinario y Académico según el Acuerdo 009 de 2024',
    category: 'Debido Proceso',
    summary: 'Ruta obligatoria para instructores ante novedades disciplinarias, inasistencias injustificadas superiores a 3 días y remisión a comités.',
    fpiPhase: 'Ejecución',
    keyInstructions: [
      'Paso 1: Agotamiento de medidas formativas pedagógicas iniciales (llamado de atención verbal y concertación escrita con el aprendiz).',
      'Paso 2: Registro riguroso de asistencia. Si el aprendiz acumula 3 días continuos de inasistencia injustificada, se activa el protocolo de deserción con reporte formal al Coordinador Académico.',
      'Paso 3: Notificación oficial de citación a Comité de Evaluación y Seguimiento con 5 días hábiles de anticipación garantizando el derecho a la defensa y contradicción.',
      'Paso 4: Formulación del Plan de Mejoramiento (GFPI-F-023) con metas verificables, fecha límite y rúbrica de seguimiento.',
      'Paso 5: Respeto estricto al recurso de apelación en Segunda Instancia ante el Subdirector de Centro dentro de los 5 días siguientes a la notificación.'
    ],
    associatedFormat: 'Acta de Citación a Comité y Formato GFPI-F-023',
    normativeSupport: 'Acuerdo 009 de 2024 (Reglamento del Aprendiz SENA), Capítulos IV (Faltas) y V (Procedimiento y Comités)'
  },
  {
    id: 'guide-04',
    code: 'GFPI-E-012',
    title: 'Protocolo de Emisión de Juicios Evaluativos y Rúbricas Socioformativas',
    category: 'Evaluación Formativa',
    summary: 'Directrices técnicas para asentar calificaciones de Aprobado (A) o No Aprobado (D) en el aplicativo Sofia Plus y retroalimentación oportuna.',
    fpiPhase: 'Evaluación',
    keyInstructions: [
      'El juicio evaluativo en el SENA es cualitativo: Aprobado (A) o No Aprobado (D). No se manejan escalas numéricas en los certificados oficiales.',
      'El instructor dispone de un plazo máximo de cinco (5) días hábiles tras la entrega de la evidencia para emitir el juicio y registrar la retroalimentación escrita en Zajuna.',
      'En caso de juicio No Aprobado (D), es obligatorio activar de inmediato un Plan de Mejoramiento concertado con el aprendiz para que logre la competencia.',
      'Verificación y cierre de los juicios del Resultado de Inducción para permitir la transición formal a la primera fase técnica del programa.'
    ],
    associatedFormat: 'Matriz de Juicios Evaluativos Sofia Plus / Zajuna',
    normativeSupport: 'Estatuto de la Formación Profesional y Guía de Evaluación del Aprendizaje GFPI'
  }
];

export const TEACHING_RESOURCES: TeachingResource[] = [
  {
    id: 'res-01',
    code: 'GFPI-F-135',
    title: 'Formato Oficial: Guía de Aprendizaje FPI (Inducción y Fase Técnica)',
    type: 'Formato GFPI',
    formatExtension: 'DOCX',
    description: 'Plantilla institucional estándar avalada por la Dirección de Formación Profesional para estructurar los momentos pedagógicos de la inducción y el desarrollo de competencias.',
    usageTip: 'Utilice este formato en todas las fichas activas. Diligencie las 4 actividades de aprendizaje conforme a la taxonomía socioformativa.',
    officialCode: 'GFPI-F-135 V.02',
    contentSample: `SERVICIO NACIONAL DE APRENDIZAJE SENA
SISTEMA INTEGRADO DE GESTIÓN Y AUTOCONTROL (SIGA)
GUÍA DE APRENDIZAJE: INDUCCIÓN A LA FORMACIÓN PROFESIONAL INTEGRAL

1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE:
   - Denominación del Programa: Técnico / Tecnólogo
   - Código del Programa: 228106
   - Fase del Proyecto: Inducción (40 Horas reglamentarias)
   - Actividad de Proyecto: Apropiar la cultura institucional, derechos, deberes y modelo pedagógico SENA.
   - Competencia: Inducción a la Formación Profesional Integral.
   - Resultados de Aprendizaje: Reconocer el rol de los participantes en el proceso formativo, el papel de los ambientes de aprendizaje y la metodología de formación SENA según dinámica organizacional.

2. PRESENTACIÓN
3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE (Reflexión Inicial, Contextualización, Apropiación, Transferencia)
4. ACTIVIDADES DE EVALUACIÓN (Evidencias de Conocimiento, Desempeño y Producto)`
  },
  {
    id: 'res-02',
    code: 'GFPI-F-023',
    title: 'Formato de Plan de Mejoramiento Académico y Disciplinario',
    type: 'Formato GFPI',
    formatExtension: 'DOCX',
    description: 'Instrumento legal y pedagógico exigido por el Acuerdo 009 de 2024 para acordar compromisos de recuperación con aprendices con rezago o faltas formativas.',
    usageTip: 'Debe ser concertado y firmado por instructor y aprendiz con fecha perentoria no superior a 30 días calendario.',
    officialCode: 'GFPI-F-023 V.04',
    contentSample: `SERVICIO NACIONAL DE APRENDIZAJE SENA
ACTA DE CONCERTACIÓN - PLAN DE MEJORAMIENTO (ACUERDO 009 DE 2024)

Centro de Formación: __________________________________
Nombre del Aprendiz: __________________________________ Documento: _______________
Ficha de Caracterización: _______________ Programa: _______________________________
Instructor Responsable: ___________________________________________________________

1. JUSTIFICACIÓN PEDAGÓGICA / DISCIPLINARIA
   (Descripción de la deficiencia detectada en el resultado de aprendizaje o conducta sujeta a medida formativa)

2. ACTIVIDADES PEDAGÓGICAS COMPLEMENTARIAS ASIGNADAS
   - Actividad 1: ________________________________________________ Fecha Límite: _______
   - Actividad 2: ________________________________________________ Fecha Límite: _______

3. CRITERIOS DE EVALUACIÓN Y EVIDENCIA ESPERADA
4. COMPROMISOS DEL APRENDIZ Y FIRMAS DE CONFORMIDAD`
  },
  {
    id: 'res-03',
    code: 'COM-EVAL-CIT',
    title: 'Modelo Oficial de Citación a Comité de Evaluación y Seguimiento',
    type: 'Protocolo',
    formatExtension: 'DOCX',
    description: 'Documento formal de notificación conforme al debido proceso, otorgando el término de ley de 5 días hábiles para presentación de descargos.',
    usageTip: 'Enviar al correo institucional @soy.sena.edu.co registrado por el aprendiz con acuse de recibo y copia al expediente del centro.',
    officialCode: 'PRO-GFPI-COM-01',
    contentSample: `COMUNICACIÓN OFICIAL SENA - CITACIÓN A COMITÉ DE EVALUACIÓN Y SEGUIMIENTO
Fecha: [Fecha Actual]
Para: [Nombre del Aprendiz] - Documento: [Número]
Ficha: [Número de Ficha] - Programa: [Nombre del Programa]

Asunto: Citación a Audiencia de Comité de Evaluación y Seguimiento - Acuerdo 009 de 2024

Por medio de la presente se le notifica formalmente la apertura de proceso disciplinario/académico en su contra, fundamentado en los siguientes hechos:
[Descripción detallada de la presunta falta o inasistencia de más de 3 días hábiles según artículo aplicable del Acuerdo 009 de 2024].

Se le cita a comparecer el día [Fecha], a las [Hora], en [Lugar o Enlace Virtual].
Se le recuerda su derecho constitucional y reglamentario a:
1. Rendir descargos verbales o escritos de manera libre.
2. Aportar y solicitar las pruebas que considere pertinentes.
3. Asistir acompañado por un representante de aprendices o asesor.`
  },
  {
    id: 'res-04',
    code: 'GFPI-F-045',
    title: 'Lista de Chequeo para Evaluación de la Inducción y Portafolio',
    type: 'Rúbrica',
    formatExtension: 'XLSX',
    description: 'Matriz estandarizada con criterios observables de desempeño para verificar la apropiación de la inducción, símbolos, deberes y portafolio digital.',
    usageTip: 'Permite asentar con objetividad el juicio de Aprobado (A) o No Aprobado (D) de la fase de inducción institucional.',
    officialCode: 'GFPI-F-045 V.03',
    contentSample: `MATRIZ DE VALORACIÓN - EVALUACIÓN DIAGNÓSTICA DE INDUCCIÓN
Variables / Criterios Evaluados:
1. Identifica la misión, visión y símbolos del SENA (Escudo, Bandera, Logosímbolo, Himno). Cumple: [SÍ/NO]
2. Reconoce sus derechos y deberes fundamentales bajo el Acuerdo 009 de 2024. Cumple: [SÍ/NO]
3. Conoce las 6 alternativas habilitadas para el desarrollo de la etapa productiva. Cumple: [SÍ/NO]
4. Resuelve dilemas éticos y procedimentales aplicando el debido proceso institucional. Cumple: [SÍ/NO]
5. Demuestra superación de la prueba diagnóstica con puntaje igual o superior al 70%. Cumple: [SÍ/NO]`
  },
  {
    id: 'res-05',
    code: 'ALERTA-DESERCION',
    title: 'Matriz de Alerta Temprana de Deserción Escolar (3 Días Hábiles)',
    type: 'Plantilla',
    formatExtension: 'XLSX',
    description: 'Herramienta operativa preventiva para monitorear inasistencias continuas, contactar al aprendiz y coordinar con Bienestar antes del vencimiento del plazo de ley.',
    usageTip: 'Actualizar semanalmente. Al día 2 de inasistencia sin justificar, activar contacto vía Bienestar al Aprendiz.',
    officialCode: 'ALERTA-GFPI-DES-03',
    contentSample: `CONTROL PREVENTIVO DE INASISTENCIAS Y DESERCIÓN SENA
Ficha: [Ficha] | Trimestre: I | Instructor Vocero: [Nombre]

Protocolo de Acción:
- Día 1 Inasistencia: Registro en sistema y mensaje preventivo por correo institucional.
- Día 2 Inasistencia: Llamada telefónica de contacto y remisión a Bienestar al Aprendiz.
- Día 3 Inasistencia Continua: Notificación de advertencia formal de deserción según Acuerdo 009 de 2024.
- Día 5 Hábiles: Radicación formal de novedad de deserción ante Coordinación Académica si no hay respuesta justificada.`
  }
];

export const LEARNER_SERVICES_DATA: LearnerService[] = [
  {
    id: 'serv-01',
    title: 'Apoyo de Sostenimiento FIC y Regular',
    category: 'Apoyo Socioeconómico',
    description: 'Auxilio económico mensual destinado a aprendices en condiciones de vulnerabilidad socioeconómica (estratos 1 y 2 o SISBEN A/B) para transporte, alimentación y sostenimiento durante su etapa lectiva.',
    benefits: [
      'Asignación mensual proporcional al salario mínimo legal vigente (SMLV)',
      'Priorización para aprendices de programas vinculados a la industria de la construcción (FIC)',
      'Continuidad durante toda la fase lectiva mientras mantenga rendimiento académico Aprobado'
    ],
    eligibility: 'Aprendices de formación titulada presencial sin contrato de aprendizaje vigente ni otro subsidio del Estado, pertenecientes a estratos 1 o 2.',
    contactOrProcedure: 'Convocatorias trimestrales publicadas por la Oficina de Bienestar de tu Centro de Formación y registro a través de Sofia Plus.',
    iconName: 'Coins'
  },
  {
    id: 'serv-02',
    title: 'Monitorías Académicas y Tecnológicas',
    category: 'Apoyo Socioeconómico',
    description: 'Oportunidad de desarrollo y estímulo económico para aprendices destacados que apoyan a sus instructores en ambientes de aprendizaje, laboratorios de cómputo y asesoría pedagógica a compañeros.',
    benefits: [
      'Estímulo económico mensual equivalente al 50% del salario mínimo legal vigente',
      'Certificación oficial de monitoría que enriquece significativamente tu hoja de vida',
      'Desarrollo de competencias pedagógicas, liderazgo técnico y trabajo en equipo'
    ],
    eligibility: 'Haber aprobado mínimo el primer trimestre formativo con excelente desempeño académico y disciplinario, sin sanciones en el historial.',
    contactOrProcedure: 'Postulación semestral en la Coordinación Académica y sustentación técnica ante el comité evaluador de tu centro.',
    iconName: 'Sparkles'
  },
  {
    id: 'serv-03',
    title: 'Salud Integral, Deporte y Expresión Cultural',
    category: 'Salud Integral',
    description: 'Espacios de atención primaria de enfermería, primeros auxilios, torneos deportivos intercentros, grupos de danza, teatro, música y bienestar emocional.',
    benefits: [
      'Póliza de seguro de accidentes estudiantiles con cobertura 24/7 en ambientes y desplazamientos',
      'Participación en Juegos Nacionales de la Confraternidad SENA y festivales culturales',
      'Talleres de manejo de estrés, inteligencia emocional y prevención del consumo de sustancias'
    ],
    eligibility: 'Todos los aprendices SENA con matrícula activa en programas técnicos, tecnológicos y operarios.',
    contactOrProcedure: 'Atención directa en la enfermería del Centro y coordinadores deportivos de Bienestar al Aprendiz.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'serv-04',
    title: 'Consejería Psicosocial y Orientación Ocupacional (APE)',
    category: 'Consejería',
    description: 'Acompañamiento profesional personalizado con psicólogos y trabajadores sociales para resolver dificultades personales, adaptación a la vida académica y preparación para la Agencia Pública de Empleo.',
    benefits: [
      'Sesiones individuales confidenciales de orientación emocional y académica',
      'Talleres de preparación para entrevistas laborales y construcción de hoja de vida (APE SENA)',
      'Acompañamiento en resolución de conflictos entre compañeros o instructores'
    ],
    eligibility: 'Acceso universal y gratuito para todos los aprendices durante toda su formación.',
    contactOrProcedure: 'Agenda tu cita en la oficina de Bienestar al Aprendiz de tu Centro o a través de la mesa de ayuda virtual.',
    iconName: 'Users'
  },
  {
    id: 'serv-05',
    title: 'Liderazgo, Vocería y Representación Estudiantil',
    category: 'Liderazgo',
    description: 'Estructura democrática para elegir voceros de ficha y representantes de aprendices ante el Consejo Directivo y los Comités de Evaluación de Centro.',
    benefits: [
      'Formación en la Escuela Nacional de Líderes SENA en habilidades directivas y debate',
      'Voz y voto en los comités de centro para defender los intereses colectivos de los aprendices',
      'Reconocimiento institucional y oportunidades de movilidad académica nacional'
    ],
    eligibility: 'Elección democrática por votación de los aprendices de la ficha o de todo el centro.',
    contactOrProcedure: 'Elecciones de vocero durante el primer mes de formación en cada ficha de caracterización.',
    iconName: 'Award'
  }
];
