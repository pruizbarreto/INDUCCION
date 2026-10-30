import {
  SenaSymbol,
  InstitutionalValue,
  RightOrDuty,
  PracticeCase,
  AssessmentQuestion,
  ApprenticeRecord,
  RegulationChapter
} from '../types/induction';

export const SENA_MISSION = {
  title: 'Misión Institucional',
  text: 'El Servicio Nacional de Aprendizaje (SENA) está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.'
};

export const SENA_VISION = {
  title: 'Visión Institucional',
  text: 'Para el año 2026, el SENA continuará siendo una entidad de clase mundial en formación profesional integral, reconocida por su contribución decisiva a la empleabilidad, al emprendimiento, a la innovación tecnológica y a la paz con justicia social en todos los territorios de Colombia.'
};

export const SENA_SYMBOLS: SenaSymbol[] = [
  {
    id: 'escudo',
    title: 'El Escudo del SENA',
    shortDesc: 'Refleja los tres sectores de la economía nacional sobre los cuales actúa la formación profesional.',
    fullMeaning: 'Diseñado en los orígenes de la institución, representa la convergencia de las fuerzas productivas de Colombia que son capacitadas integralmente.',
    elements: [
      { name: 'El Piñón / Rueda Dentada', meaning: 'Simboliza el sector industrial, la fuerza motriz, la tecnología, la manufactura y la maquinaria productiva.' },
      { name: 'El Caduceo', meaning: 'Simboliza el sector de comercio y servicios, las finanzas, la logística y la actividad mercantil.' },
      { name: 'El Café y las Espigas', meaning: 'Simbolizan el sector agropecuario, la riqueza del campo colombiano, la soberanía alimentaria y la ruralidad.' }
    ],
    tag: 'Símbolo Heráldico'
  },
  {
    id: 'bandera',
    title: 'La Bandera Institucional',
    shortDesc: 'Lienzo blanco con el escudo del SENA ubicado exactamente en el centro.',
    fullMeaning: 'El color blanco simboliza la paz, la tranquilidad, la transparencia, la armonía y la pureza de propósitos que persigue la formación para la vida y el trabajo en Colombia.',
    elements: [
      { name: 'Fondo Blanco', meaning: 'Representa la concordia, la inclusión social sin distingo de raza, credo ni condición económica, y la búsqueda incansable de la paz.' },
      { name: 'Escudo Centrado', meaning: 'El compromiso de poner el desarrollo técnico y productivo al servicio de toda la nación colombiana.' }
    ],
    tag: 'Símbolo Patrio e Institucional'
  },
  {
    id: 'logosimbolo',
    title: 'El Logosímbolo (Silueta)',
    shortDesc: 'El ser humano que avanza con paso firme hacia un sendero de superación y progreso.',
    fullMeaning: 'Creado para proyectar una imagen dinámica, humanista y moderna del aprendiz como protagonista activo de su propio proyecto de vida.',
    elements: [
      { name: 'La Silueta Humana', meaning: 'El aprendiz en el centro del modelo pedagógico, con cabeza en alto y brazos abiertos al conocimiento.' },
      { name: 'El Sendero / Camino', meaning: 'Los peldaños y la senda ascendente que representa la formación profesional integral y la movilidad social.' },
      { name: 'El Punto / Cabeza', meaning: 'La inteligencia, la ética y la capacidad innovadora de cada trabajador colombiano.' }
    ],
    tag: 'Identidad Visual'
  },
  {
    id: 'himno',
    title: 'Himno del SENA',
    shortDesc: 'Canto institucional a la disciplina, al trabajo digno y al amor por la patria.',
    fullMeaning: 'Con letra de Luis Alfredo Sánchez y música del maestro Daniel Marlez, el himno exalta el valor del esfuerzo personal y colectivo en las aulas y talleres de la entidad.',
    elements: [
      { name: 'Coro', meaning: 'Estudiantes del SENA adelante, por Colombia luchad con amor, con el ánimo noble y radiante transformemos el mundo mejor.' },
      { name: 'Mensaje Central', meaning: 'La formación para el trabajo no es solo técnica, sino un acto cívico y de transformación social positiva.' }
    ],
    tag: 'Canto Cívico'
  }
];

export const HYMN_LYRICS = [
  {
    section: 'Coro',
    text: `Estudiantes del SENA adelante
por Colombia luchad con amor
con el ánimo noble y radiante
transformemos el mundo mejor.`
  },
  {
    section: 'Estrofa I',
    text: `De la patria el futuro destino,
en las manos del joven está,
el trabajo es seguro camino,
que la paz y el progreso nos da.`
  },
  {
    section: 'Estrofa II',
    text: `En la forja del SENA se forman,
hombres libres que saben triunfar,
con la ciencia y la técnica aprenden
el valor de saber trabajar.`
  },
  {
    section: 'Estrofa III',
    text: `Hoy la patria nos llama a la lucha,
con la mente y el brazo creador,
el que busca la meta la alcanza,
con paciencia, disciplina y honor.`
  }
];

export const INSTITUTIONAL_VALUES: InstitutionalValue[] = [
  {
    id: 'respeto',
    name: 'Respeto',
    description: 'Reconocer, apreciar y valorar a mi persona, a los demás y al entorno institucional en todo momento.',
    exampleInSena: 'Escuchar activamente a compañeros e instructores, sin juzgar ni discriminar por origen, identidad o capacidades.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'solidaridad',
    name: 'Solidaridad',
    description: 'Brindar apoyo mutuo e incondicional a los miembros de la comunidad formativa frente a cualquier desafío.',
    exampleInSena: 'Apoyar a compañeros que presentan dudas técnicas o dificultades de conectividad en el aula o taller.',
    iconName: 'Users'
  },
  {
    id: 'honestidad',
    name: 'Honestidad e Integridad',
    description: 'Actuar siempre con la verdad, honradez y coherencia entre lo que se piensa, se dice y se hace.',
    exampleInSena: 'Citar fuentes en las evidencias de aprendizaje y evitar cualquier modalidad de plagio o fraude académico.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'justicia',
    name: 'Justicia y Equidad',
    description: 'Dar a cada uno lo que le corresponde garantizando igualdad de oportunidades y debido proceso.',
    exampleInSena: 'Participar limpiamente en la elección de voceros de ficha y acatar las deliberaciones del comité.',
    iconName: 'Scale'
  },
  {
    id: 'liderazgo',
    name: 'Liderazgo Transformador',
    description: 'Inspirar y guiar a otros con el ejemplo personal hacia el logro de metas colectivas que beneficien a la comunidad.',
    exampleInSena: 'Proponer iniciativas de mejora tecnológica, bienestar o cuidado ecológico en el centro de formación.',
    iconName: 'Compass'
  },
  {
    id: 'compromiso',
    name: 'Compromiso y Diligencia',
    description: 'Asumir con entusiasmo, puntualidad y excelencia las responsabilidades del proceso de formación integral.',
    exampleInSena: 'Llegar a tiempo a las sesiones presenciales o virtuales y entregar las evidencias en los plazos fijados.',
    iconName: 'CheckCircle2'
  }
];

export const RIGHTS_AND_DUTIES: RightOrDuty[] = [
  // Derechos
  {
    id: 'der-1',
    type: 'derecho',
    category: 'Academico',
    title: 'Recibir Formación Profesional Integral',
    description: 'Recibir una formación acorde con el programa matriculado, que fomente el desarrollo armónico de las dimensiones humana y técnica.',
    articleRef: 'Reglamento Art. 7, Numeral 1',
    practicalTip: 'Tienes derecho a que tus guías de aprendizaje y rúbricas de evaluación sean socializadas con claridad desde el primer día.'
  },
  {
    id: 'der-2',
    type: 'derecho',
    category: 'Disciplinario',
    title: 'Debido Proceso en Procedimientos Disciplinarios',
    description: 'Ser escuchado, presentar descargos, aportar pruebas y contar con acompañamiento en caso de requerimiento ante el Comité de Evaluación.',
    articleRef: 'Reglamento Art. 7, Numeral 11',
    practicalTip: 'Ninguna sanción puede ser impuesta sin notificación previa y oportunidad de presentar pruebas justificadas.'
  },
  {
    id: 'der-3',
    type: 'derecho',
    category: 'Academico',
    title: 'Uso de Ambientes, Recursos y Bibliotecas',
    description: 'Disponer de la infraestructura física, tecnológica, talleres, herramientas y recursos bibliográficos físicos y digitales del SENA.',
    articleRef: 'Reglamento Art. 7, Numeral 4',
    practicalTip: 'Puedes acceder a las bases de datos bibliográficas de la Biblioteca Virtual SENA y a laboratorios con previo agendamiento.'
  },
  {
    id: 'der-4',
    type: 'derecho',
    category: 'Convivencia',
    title: 'Elegir y Ser Elegido Vocero / Representante',
    description: 'Postularse y participar democráticamente en la elección de voceros de ficha y representantes de aprendices ante el Centro.',
    articleRef: 'Reglamento Art. 7, Numeral 9',
    practicalTip: 'El vocero es el puente oficial de comunicación propositiva entre los aprendices, instructores y la coordinación académica.'
  },
  {
    id: 'der-5',
    type: 'derecho',
    category: 'Seguridad',
    title: 'Póliza de Seguro Contra Accidentes',
    description: 'Contar con la cobertura de la póliza colectiva de seguro de accidentes personales durante el tiempo que dure la formación.',
    articleRef: 'Reglamento Art. 7, Numeral 8',
    practicalTip: 'Cubre accidentes ocurridos durante actividades formativas autorizadas tanto en sede como en salidas pedagógicas.'
  },
  {
    id: 'der-6',
    type: 'derecho',
    category: 'Academico',
    title: 'Conocer Calificaciones y Rúbricas Oportunamente',
    description: 'Recibir retroalimentación y conocer el resultado de la evaluación de las evidencias dentro de los plazos establecidos (máx 8 días hábiles).',
    articleRef: 'Reglamento Art. 7, Numeral 6',
    practicalTip: 'Puedes solicitar aclaración respetuosa si tienes dudas sobre la calificación obtenida en Sofia Plus o Zajuna.'
  },

  // Deberes
  {
    id: 'deb-1',
    type: 'deber',
    category: 'Academico',
    title: 'Cumplir con las Actividades y Evidencias',
    description: 'Participar activamente en las sesiones de formación y cumplir oportunamente con las actividades programadas en la ruta formativa.',
    articleRef: 'Reglamento Art. 9, Numeral 1',
    practicalTip: 'La entrega a tiempo demuestra tu disciplina profesional ante los futuros empleadores en tu etapa productiva.'
  },
  {
    id: 'deb-2',
    type: 'deber',
    category: 'Disciplinario',
    title: 'Portar el Carné Institucional Visible',
    description: 'Portar permanentemente en lugar visible el carné que lo acredita como aprendiz SENA en todas las sedes y ambientes.',
    articleRef: 'Reglamento Art. 9, Numeral 7',
    practicalTip: 'El carné es personal e intransferible. Facilita el ingreso seguro y el control de accesos a talleres y laboratorios.'
  },
  {
    id: 'deb-3',
    type: 'deber',
    category: 'Seguridad',
    title: 'Usar Elementos de Protección Personal (EPP)',
    description: 'Utilizar la indumentaria reglamentaria y los EPP exigidos para cada ambiente de formación y taller técnico según normas SST.',
    articleRef: 'Reglamento Art. 9, Numeral 13',
    practicalTip: 'Botas de seguridad, gafas, overol o bata según tu especialidad; protegen tu vida e integridad física.'
  },
  {
    id: 'deb-4',
    type: 'deber',
    category: 'Disciplinario',
    title: 'Justificar Inasistencias en el Plazo Legal',
    description: 'Presentar soporte médico o justificación válida de inasistencia ante el instructor dentro de los tres (3) días hábiles siguientes.',
    articleRef: 'Reglamento Art. 9, Numeral 5',
    practicalTip: 'Inasistencias injustificadas repetidas (3 días consecutivos) configuran causal de deserción de la matrícula.'
  },
  {
    id: 'deb-5',
    type: 'deber',
    category: 'Convivencia',
    title: 'Cuidar las Instalaciones y Equipos',
    description: 'Hacer uso responsable y cuidar las instalaciones, maquinaria, herramientas, computadores y mobiliario del Centro.',
    articleRef: 'Reglamento Art. 9, Numeral 10',
    practicalTip: 'Reporta de inmediato cualquier falla técnica o daño previo para evitar ser corresponsable por negligencia.'
  },
  {
    id: 'deb-6',
    type: 'deber',
    category: 'Convivencia',
    title: 'Mantener Trato Digno y Respetuoso',
    description: 'Observar normas de respeto y sana convivencia con compañeros, instructores, directivos, vigilantes y personal de aseo.',
    articleRef: 'Reglamento Art. 9, Numeral 15',
    practicalTip: 'La comunicación asertiva previene conflictos y fortalece las habilidades socioemocionales para el mundo laboral.'
  },

  // Prohibiciones
  {
    id: 'pro-1',
    type: 'prohibicion',
    category: 'Disciplinario',
    title: 'Plagio y Fraude en Evidencias de Aprendizaje',
    description: 'Copiar total o parcialmente trabajos ajenos, suplantar la identidad en evaluaciones o comprar proyectos académicos.',
    articleRef: 'Reglamento Art. 10, Numeral 1',
    practicalTip: 'Constituye falta grave o gravísima sujeta a sanción de condicionamiento o cancelación definitiva de matrícula.'
  },
  {
    id: 'pro-2',
    type: 'prohibicion',
    category: 'Seguridad',
    title: 'Consumo o Tenencia de Sustancias Psicoactivas o Alcohol',
    description: 'Ingresar o permanecer en el Centro bajo efectos del alcohol o sustancias psicoactivas, o distribuirlas dentro de la sede.',
    articleRef: 'Reglamento Art. 10, Numeral 4',
    practicalTip: 'Es causal directa de remisión inmediata al Comité de Evaluación con sanción severa por seguridad integral.'
  },
  {
    id: 'pro-3',
    type: 'prohibicion',
    category: 'Disciplinario',
    title: 'Portar Armas o Elementos Bélicos',
    description: 'Portar armas de fuego, armas blancas, explosivos o cualquier elemento contundente que ponga en riesgo la integridad de la comunidad.',
    articleRef: 'Reglamento Art. 10, Numeral 5',
    practicalTip: 'Falta gravísima con reporte a autoridades competentes.'
  },
  {
    id: 'pro-4',
    type: 'prohibicion',
    category: 'Convivencia',
    title: 'Comercializar Productos sin Autorización',
    description: 'Realizar rifas, ventas ambulantes, colectas o actividades comerciales dentro de los ambientes de formación sin permiso directivo.',
    articleRef: 'Reglamento Art. 10, Numeral 9',
    practicalTip: 'Los ambientes de aprendizaje están destinados exclusivamente a fines pedagógicos y formativos.'
  }
];

export const PRACTICE_CASES: PracticeCase[] = [
  {
    id: 'caso-1',
    title: 'Caso 1: Inasistencia por Incapacidad Médica',
    context: 'Carlos es aprendiz de Tecnólogo en Gestión Contable. Sufrió una gastroenteritis aguda el lunes y el médico de su EPS le otorgó 3 días de incapacidad.',
    situation: 'Carlos regresa al Centro el viernes, pero no avisa a su instructor sino hasta la siguiente semana (5 días hábiles después). ¿Cuál es la ruta correcta según el reglamento?',
    options: [
      {
        id: 'opt-1a',
        text: 'No presentar nada porque el médico le dijo que guardara reposo y las notas se recuperan al final del trimestre.',
        isCorrect: false,
        explanation: 'Incorrecto. El reglamento exige radicar formalmente la incapacidad para que no se compute como inasistencia injustificada.'
      },
      {
        id: 'opt-1b',
        text: 'Radicar la incapacidad de la EPS dentro de los tres (3) días hábiles siguientes a la inasistencia ante la coordinación/instructor.',
        isCorrect: true,
        explanation: '¡Correcto! El Art. 9, numeral 5 del Reglamento fija un plazo perentorio de máximo 3 días hábiles para justificar cualquier inasistencia con soporte legal.'
      },
      {
        id: 'opt-1c',
        text: 'Pedirle a un compañero que falsifique una firma en la lista de asistencia para no perder la ficha.',
        isCorrect: false,
        explanation: 'Incorrecto. Alterar listas de asistencia constituye falta gravísima por falsedad documental y acarrea cancelación de matrícula.'
      }
    ],
    normativeReference: 'Acuerdo 009 de 2024 (Reglamento Vigente), Deberes e Inasistencias',
    learningCategory: 'Gestión de Novedades y Asistencia'
  },
  {
    id: 'caso-2',
    title: 'Caso 2: Uso de Inteligencia Artificial en Evidencias de Proyecto',
    context: 'Camila y su equipo deben entregar un informe técnico sobre arquitectura de software. Para acelerar la entrega, un compañero genera todo el texto con una IA y lo entregan sin revisar ni citar fuentes.',
    situation: 'El instructor detecta que el documento no refleja la práctica de laboratorio ni cita el origen de los diagramas. ¿Cómo debieron proceder Camila y su equipo?',
    options: [
      {
        id: 'opt-2a',
        text: 'Negar todo y decir que el sistema del SENA se equivocó en el análisis.',
        isCorrect: false,
        explanation: 'Falta a la honestidad institucional. Asumir responsabilidad con transparencia es un principio clave del aprendiz SENA.'
      },
      {
        id: 'opt-2b',
        text: 'Utilizar la IA como herramienta de apoyo, contrastando con la práctica real de taller y referenciando explícitamente su aporte según normas éticas.',
        isCorrect: true,
        explanation: '¡Excelente! La tecnología y la IA son bienvenidas en el SENA como soporte formativo, siempre que haya producción propia, análisis crítico y respeto a los derechos de autor.'
      },
      {
        id: 'opt-2c',
        text: 'Borrar la evidencia de la plataforma para que el instructor no la pueda evaluar.',
        isCorrect: false,
        explanation: 'Eliminar evidencias no exime del cumplimiento y puede retrasar tu plan de mejoramiento académico.'
      }
    ],
    normativeReference: 'Reglamento del Aprendiz, Art. 10 (Prohibición de Plagio y Fraude)',
    learningCategory: 'Ética Digital y Propiedad Intelectual'
  },
  {
    id: 'caso-3',
    title: 'Caso 3: Daño Involuntario en Maquinaria de Taller',
    context: 'Durante una práctica en el torno industrial, Felipe comete un error de calibración y quiebra una broca especializada. Nadie lo vio en ese instante.',
    situation: '¿Qué debe hacer Felipe en coherencia con los valores del SENA y las normas de seguridad y salud en el trabajo?',
    options: [
      {
        id: 'opt-3a',
        text: 'Guardar la broca rota en la gaveta de otro compañero para no tener que responder económicamente.',
        isCorrect: false,
        explanation: 'Inaceptable. Culpar a otros o esconder daños vulnera la solidaridad, la justicia y atenta contra la convivencia.'
      },
      {
        id: 'opt-3b',
        text: 'Detener la máquina de inmediato, aplicar el protocolo de paro de emergencia y reportar la novedad al instructor técnico de inmediato.',
        isCorrect: true,
        explanation: '¡Exacto! El reporte inmediato evita accidentes a otros aprendices y permite al instructor enseñar el procedimiento correctivo sin sanción maliciosa.'
      },
      {
        id: 'opt-3c',
        text: 'Seguir operando la máquina forzándola para terminar la pieza antes de que termine el turno.',
        isCorrect: false,
        explanation: 'Peligroso. Operar maquinaria en mal estado pone en riesgo tu vida y la de tus compañeros de ambiente de aprendizaje.'
      }
    ],
    normativeReference: 'Reglamento del Aprendiz, Art. 9 (Cuidado de Bienes y Protocolos SST)',
    learningCategory: 'Seguridad en Ambientes de Aprendizaje'
  },
  {
    id: 'caso-4',
    title: 'Caso 4: Elección de Modalidad de Etapa Productiva',
    context: 'Luisa está por culminar su etapa lectiva. Ha recibido una oferta de Contrato de Aprendizaje con una empresa y también tiene una propuesta para Proyecto Productivo en el Fondo Emprender.',
    situation: '¿Qué requisito es fundamental para que su etapa productiva sea válida y reconocida para su certificación?',
    options: [
      {
        id: 'opt-4a',
        text: 'Comenzar a trabajar de palabra sin registrar la alternativa ante el coordinador de formación ni asignar instructor de seguimiento.',
        isCorrect: false,
        explanation: 'Incorrecto. Toda etapa productiva requiere registro oficial y aval previo de la coordinación para que las horas sean certificables.'
      },
      {
        id: 'opt-4b',
        text: 'Registrar la alternativa elegida en el Sistema de Gestión Virtual de Aprendices (SGVA) y contar con plan de concertación y seguimiento de bitácoras.',
        isCorrect: true,
        explanation: '¡Muy bien! Las bitácoras quincenales y las visitas de seguimiento del instructor técnico garantizan que apliques las competencias de tu formación.'
      },
      {
        id: 'opt-4c',
        text: 'Esperar un año después de graduarse para pensar en qué alternativa postularse.',
        isCorrect: false,
        explanation: 'El aprendiz tiene un plazo reglamentario máximo (hasta 2 años) para culminar su etapa productiva tras terminar la etapa lectiva.'
      }
    ],
    normativeReference: 'Reglamento del Aprendiz, Capítulo V (De la Etapa Productiva)',
    learningCategory: 'Ruta Formativa y Certificación'
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    category: 'identidad',
    categoryLabel: 'Identidad y Símbolos',
    question: 'En el escudo del SENA, ¿qué representa la rueda dentada o piñón?',
    options: [
      { id: 'a', text: 'El sector agropecuario y la cosecha de café.' },
      { id: 'b', text: 'El sector industrial, la manufactura y la tecnología.' },
      { id: 'c', text: 'El sector de comercio y servicios financieros.' },
      { id: 'd', text: 'La paz y los recursos naturales colombianos.' }
    ],
    correctOptionId: 'b',
    explanation: 'El piñón representa la industria y la fuerza transformadora de la tecnología y manufactura en Colombia.',
    ruleCitation: 'Manual de Identidad Institucional SENA'
  },
  {
    id: 'q2',
    category: 'identidad',
    categoryLabel: 'Identidad y Símbolos',
    question: '¿Cuál es el significado del logosímbolo del SENA (la silueta con el camino)?',
    options: [
      { id: 'a', text: 'Un atleta cruzando una meta deportiva nacional.' },
      { id: 'b', text: 'El ser humano que se proyecta hacia el futuro mediante la formación integral y el trabajo digno.' },
      { id: 'c', text: 'Una brújula para orientar a los trabajadores en el extranjero.' },
      { id: 'd', text: 'Una pirámide jerárquica de cargos en el estado colombiano.' }
    ],
    correctOptionId: 'b',
    explanation: 'El logosímbolo sitúa al ser humano como centro de la formación, proyectándose con optimismo hacia un camino de progreso.',
    ruleCitation: 'Estatuto de la Formación Profesional Integral'
  },
  {
    id: 'q3',
    category: 'identidad',
    categoryLabel: 'Identidad y Símbolos',
    question: '¿En qué año fue fundado el SENA y gracias a la iniciativa de qué líder visionario colombiano?',
    options: [
      { id: 'a', text: 'En 1957 por el economista cartagenero Rodolfo Martínez Tono.' },
      { id: 'b', text: 'En 1991 por la Asamblea Nacional Constituyente.' },
      { id: 'c', text: 'En 1975 por el Ministerio de Trabajo y Seguridad Social.' },
      { id: 'd', text: 'En 1948 tras los sucesos del Bogotazo.' }
    ],
    correctOptionId: 'a',
    explanation: 'El SENA nació en 1957 mediante el Decreto Ley 118 de 1957, impulsado por Rodolfo Martínez Tono.',
    ruleCitation: 'Historia Institucional SENA'
  },
  {
    id: 'q4',
    category: 'derechos',
    categoryLabel: 'Derechos del Aprendiz',
    question: '¿Cuál de las siguientes situaciones describe un DERECHO fundamental del aprendiz SENA?',
    options: [
      { id: 'a', text: 'Prestar el carné a familiares para que ingresen al gimnasio del centro.' },
      { id: 'b', text: 'Recibir retroalimentación y conocer los resultados de evaluación oportunamente con el debido proceso.' },
      { id: 'c', text: 'Faltar a formación hasta 5 días consecutivos sin presentar ninguna justificación.' },
      { id: 'd', text: 'Organizar rifas y ventas en los talleres para costear viajes personales.' }
    ],
    correctOptionId: 'b',
    explanation: 'El Art. 7 del Reglamento garantiza el derecho a recibir retroalimentación formativa y a gozar del debido proceso.',
    ruleCitation: 'Reglamento del Aprendiz, Art. 7 Numerales 6 y 11'
  },
  {
    id: 'q5',
    category: 'derechos',
    categoryLabel: 'Derechos del Aprendiz',
    question: 'Si un aprendiz sufre un percance físico durante una práctica autorizada de laboratorio, ¿qué derecho lo ampara?',
    options: [
      { id: 'a', text: 'Exigir que la empresa patrocinadora le pague una indemnización inmediata.' },
      { id: 'b', text: 'Contar con la cobertura de la póliza de seguro contra accidentes para aprendices vigente.' },
      { id: 'c', text: 'Pedir la aprobación automática de todas las competencias sin evidencias.' },
      { id: 'd', text: 'Suspender las clases de toda la ficha por tiempo indefinido.' }
    ],
    correctOptionId: 'b',
    explanation: 'Todo aprendiz activo matriculado en formación titulada cuenta con una póliza de seguro de accidentes personales provista por el SENA.',
    ruleCitation: 'Reglamento del Aprendiz, Art. 7 Numeral 8'
  },
  {
    id: 'q6',
    category: 'deberes_prohibiciones',
    categoryLabel: 'Deberes y Prohibiciones',
    question: '¿Cuál es el plazo máximo que tiene el aprendiz para presentar los soportes válidos de una inasistencia?',
    options: [
      { id: 'a', text: 'Hasta el último día del trimestre lectivo.' },
      { id: 'b', text: 'Máximo tres (3) días hábiles siguientes a la fecha de la inasistencia.' },
      { id: 'c', text: 'Quince (15) días calendario.' },
      { id: 'd', text: 'No es necesario presentar soportes si el vocero avisa por WhatsApp.' }
    ],
    correctOptionId: 'b',
    explanation: 'El Art. 9 Numeral 5 estipula que las justificaciones deben radicarse dentro de los 3 días hábiles siguientes.',
    ruleCitation: 'Reglamento del Aprendiz, Art. 9 Numeral 5'
  },
  {
    id: 'q7',
    category: 'deberes_prohibiciones',
    categoryLabel: 'Deberes y Prohibiciones',
    question: '¿Qué consecuencia directa acarrea el plagio comprobado de evidencias o suplantación en evaluaciones?',
    options: [
      { id: 'a', text: 'Solo una llamada de atención verbal sin registro alguno en Sofia Plus.' },
      { id: 'b', text: 'Es considerado falta grave o gravísima que da inicio al debido proceso sancionatorio.' },
      { id: 'c', text: 'Un descuento en el costo de la matrícula del siguiente semestre.' },
      { id: 'd', text: 'El instructor debe terminar el trabajo por el aprendiz.' }
    ],
    correctOptionId: 'b',
    explanation: 'El plagio viola la ética académica y está tipificado como falta grave/gravísima en el Art. 10 del Reglamento.',
    ruleCitation: 'Reglamento del Aprendiz, Art. 10 Numeral 1 y Art. 25'
  },
  {
    id: 'q8',
    category: 'deberes_prohibiciones',
    categoryLabel: 'Deberes y Prohibiciones',
    question: 'Respecto al porte del carné y los elementos de protección personal (EPP):',
    options: [
      { id: 'a', text: 'Son opcionales y solo se usan si hay visita de inspectores externos.' },
      { id: 'b', text: 'Son deberes obligatorios para salvaguardar la seguridad, la identidad y la convivencia.' },
      { id: 'c', text: 'El carné solo se exige a los instructores, no a los aprendices.' },
      { id: 'd', text: 'Se pueden compartir o prestar a personas ajenas a la institución.' }
    ],
    correctOptionId: 'b',
    explanation: 'Portar el carné visible y utilizar los EPP en los ambientes de taller son deberes explícitos del aprendiz para garantizar la seguridad de todos.',
    ruleCitation: 'Reglamento del Aprendiz, Art. 9 Numerales 7 y 13'
  },
  {
    id: 'q9',
    category: 'ruta_convivencia',
    categoryLabel: 'Ruta Formativa y Bienestar',
    question: '¿Cuáles son las dos grandes etapas secuenciales que componen la formación profesional en el SENA?',
    options: [
      { id: 'a', text: 'Etapa Teórica y Etapa Filosófica.' },
      { id: 'b', text: 'Etapa Lectiva y Etapa Productiva.' },
      { id: 'c', text: 'Etapa de Admisión y Etapa de Empleo Directo.' },
      { id: 'd', text: 'Etapa Presencial y Etapa de Grado.' }
    ],
    correctOptionId: 'b',
    explanation: 'La Formación Profesional Integral del SENA se estructura en la Etapa Lectiva (apropiación en ambientes) y la Etapa Productiva (aplicación real en el entorno productivo).',
    ruleCitation: 'Estatuto de Formación Profesional'
  },
  {
    id: 'q10',
    category: 'ruta_convivencia',
    categoryLabel: 'Ruta Formativa y Bienestar',
    question: '¿Cuál de las siguientes NO es una alternativa válida reglamentaria para la Etapa Productiva?',
    options: [
      { id: 'a', text: 'Contrato de Aprendizaje con empresa patrocinadora.' },
      { id: 'b', text: 'Participación en Proyecto Productivo SENA o Fondo Emprender.' },
      { id: 'c', text: 'Pagar una cuota económica al Centro para homologar las horas sin trabajar.' },
      { id: 'd', text: 'Pasantía técnica o monitoría institucional concertada.' }
    ],
    correctOptionId: 'c',
    explanation: 'La etapa productiva no se puede comprar ni exonerar monetariamente; requiere ejecución real de competencias técnicas comprobables mediante bitácoras.',
    ruleCitation: 'Reglamento del Aprendiz, Capítulo V'
  },
  {
    id: 'q11',
    category: 'ruta_convivencia',
    categoryLabel: 'Ruta Formativa y Bienestar',
    question: '¿Qué instancia institucional analiza las faltas disciplinarias y recomienda las medidas al Subdirector de Centro?',
    options: [
      { id: 'a', text: 'El Consejo Directivo Nacional en Bogotá.' },
      { id: 'b', text: 'El Comité de Evaluación y Seguimiento del Centro de Formación.' },
      { id: 'c', text: 'El equipo de seguridad privada del complejo.' },
      { id: 'd', text: 'La personería municipal.' }
    ],
    correctOptionId: 'b',
    explanation: 'El Comité de Evaluación y Seguimiento sesiona para evaluar los casos con presencia del vocero, instructor y el aprendiz investigado.',
    ruleCitation: 'Reglamento del Aprendiz, Art. 29'
  },
  {
    id: 'q12',
    category: 'ruta_convivencia',
    categoryLabel: 'Ruta Formativa y Bienestar',
    question: '¿Qué beneficios ofrece la coordinación de Bienestar al Aprendiz en los centros SENA?',
    options: [
      { id: 'a', text: 'Venta de uniformes y carnés con costo adicional.' },
      { id: 'b', text: 'Programas de salud integral, deporte, cultura, liderazgo, orientación psicológica y apoyos de sostenimiento.' },
      { id: 'c', text: 'Gestión exclusiva de trámites notariales externos.' },
      { id: 'd', text: 'Exámenes de admisión universitaria.' }
    ],
    correctOptionId: 'b',
    explanation: 'Bienestar al Aprendiz acompaña el desarrollo biopsicosocial del estudiante a través de estímulos, deporte, salud y cultura.',
    ruleCitation: 'Plan Nacional de Bienestar al Aprendiz SENA'
  }
];

export const INITIAL_COHORT_STUDENTS: ApprenticeRecord[] = [
  {
    id: 'apr-1',
    name: 'Valentina Restrepo Mejia',
    documentNumber: '1020485923',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    status: 'Aprobado',
    score: 92,
    evaluatedAt: '2026-10-24 10:15',
    weakArea: 'Ninguna'
  },
  {
    id: 'apr-2',
    name: 'Juan David Morales Caicedo',
    documentNumber: '1098471204',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    status: 'Aprobado',
    score: 83,
    evaluatedAt: '2026-10-25 14:30',
    weakArea: 'Ruta y Convivencia'
  },
  {
    id: 'apr-3',
    name: 'Daniela Sofía Vargas Gómez',
    documentNumber: '1032890145',
    ficha: '2831002',
    program: 'Técnico en Gestión Contable y Tributaria',
    status: 'Aprobado',
    score: 100,
    evaluatedAt: '2026-10-25 16:40',
    weakArea: 'Ninguna'
  },
  {
    id: 'apr-4',
    name: 'Mateo Alejandro Torres Ortiz',
    documentNumber: '1014298731',
    ficha: '2831002',
    program: 'Técnico en Gestión Contable y Tributaria',
    status: 'En Proceso',
    score: 67,
    evaluatedAt: '2026-10-26 09:20',
    weakArea: 'Deberes y Prohibiciones'
  },
  {
    id: 'apr-5',
    name: 'Laura Camila Benítez Rojas',
    documentNumber: '1005829143',
    ficha: '2845119',
    program: 'Tecnólogo en Animación Digital y 3D',
    status: 'Aprobado',
    score: 88,
    evaluatedAt: '2026-10-26 11:05',
    weakArea: 'Identidad y Símbolos'
  },
  {
    id: 'apr-6',
    name: 'Sebastián Ospina Cuartas',
    documentNumber: '1073829451',
    ficha: '2845119',
    program: 'Tecnólogo en Animación Digital y 3D',
    status: 'Pendiente',
    score: 0,
    evaluatedAt: null
  },
  {
    id: 'apr-7',
    name: 'Angie Paola Gutiérrez Chaves',
    documentNumber: '1019283746',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    status: 'Aprobado',
    score: 95,
    evaluatedAt: '2026-10-27 08:10',
    weakArea: 'Ninguna'
  }
];

export const DEFAULT_CURRENT_APPRENTICE = {
  id: 'current-user-1',
  name: 'Andrés Felipe Cárdenas Silva',
  documentType: 'C.C.',
  documentNumber: '1032489201',
  regional: 'Regional Distrito Capital',
  trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  programName: 'Tecnólogo en Análisis y Desarrollo de Software',
  fichaNumber: '2824910',
  avatarSeed: 'andres-sena'
};

export const REGULATION_CHAPTERS_009: RegulationChapter[] = [
  {
    id: 'cap-1',
    chapterNumber: 'Capítulo I',
    title: 'Definiciones y Marco General',
    shortDesc: 'Conceptos fundamentales y terminología técnica oficial que rige la relación formativa en el SENA bajo el Acuerdo 009 de 2024.',
    scope: 'Aplica a todas las modalidades: Presencial, Virtual, A Distancia y Combinada.',
    pedagogicalTip: 'Comprender la diferencia jurídica entre ser aspirante y aprendiz formaliza tus garantías y deberes legales.',
    keyArticles: [
      {
        title: 'Formación Profesional Integral (FPI)',
        description: 'Proceso educativo teórico-práctico permanente que propende por el desarrollo integral de las dimensiones técnica, humana y social del individuo para el trabajo y la vida.',
        practicalApplication: 'En el SENA no solo aprendes una técnica; adquieres competencias ciudadanas, socioemocionales y éticas.'
      },
      {
        title: 'Aspirante vs. Aprendiz SENA',
        description: 'Aspirante es la persona en trámite de inscripción y selección. Aprendiz es quien formaliza y legaliza la matrícula en un programa formativo, adquiriendo derechos y deberes.',
        practicalApplication: 'Desde el primer día de matrícula cuentas con póliza de seguro, acceso a ambientes tecnológicos y carné institucional.'
      },
      {
        title: 'Comunidad Educativa Institucional',
        description: 'Integrada por aprendices, instructores, directivos, personal administrativo y de apoyo, egresados y representantes del sector productivo empresarial.',
        practicalApplication: 'Todos los estamentos interactúan bajo el principio de respeto mutuo y convivencia armónica.'
      },
      {
        title: 'Ambientes de Aprendizaje Físicos y Digitales',
        description: 'Espacios reales en sede (talleres, laboratorios) y plataformas tecnológicas (ecosistema Zajuna, Sofia Plus, bibliotecas virtuales) donde se ejecutan los resultados de aprendizaje.',
        practicalApplication: 'Las normas del reglamento se aplican con igual rigor tanto en un taller físico como en foros o sesiones de Zajuna.'
      }
    ]
  },
  {
    id: 'cap-4',
    chapterNumber: 'Capítulo IV',
    title: 'Ingreso, Permanencia y Certificación',
    shortDesc: 'Reglas para el ciclo de vida del aprendiz: legalización de matrícula, asistencia activa, trámites de novedades y requisitos de titulación.',
    scope: 'Programas de Formación Titulada (Operario, Técnico, Tecnólogo) y Complementaria.',
    pedagogicalTip: 'Radica tus novedades a tiempo en el sistema oficial para proteger tu hoja de vida académica de sanciones.',
    keyArticles: [
      {
        title: 'Ingreso y Legalización de Matrícula',
        description: 'Acto jurídico formal mediante el cual el aspirante admitido entrega la documentación exigida, adquiere la condición de aprendiz y acepta el reglamento institucional.',
        practicalApplication: 'La matrícula debe ser formalizada dentro de los calendarios institucionales establecidos.'
      },
      {
        title: 'Permanencia y Asistencia Activa',
        description: 'Obligación del aprendiz de participar activa y continuamente en las sesiones presenciales o virtuales y entregar oportunamente las evidencias concertadas.',
        practicalApplication: 'Inasistencias injustificadas reiteradas (3 días consecutivos) configuran causal directa de deserción.'
      },
      {
        title: 'Gestión de Novedades Académico-Administrativas',
        description: 'Trámites regulados que el aprendiz puede solicitar: Traslado (cambio de ficha/sede), Aplazamiento (suspensión justificada por salud o fuerza mayor), Reingreso y Retiro Voluntario.',
        practicalApplication: 'El retiro voluntario radicado oportunamente no genera la inhabilidad de 6 meses para volver a inscribirse.'
      },
      {
        title: 'Requisitos para la Certificación Oficial',
        description: 'Aprobación del 100% de los resultados de aprendizaje de las etapas lectiva y productiva, paz y salvo integral de almacén y biblioteca, y registro documental completo.',
        practicalApplication: 'Haber aprobado la totalidad de las competencias y bitácoras quincenales de la etapa productiva.'
      }
    ]
  },
  {
    id: 'cap-5',
    chapterNumber: 'Capítulo V',
    title: 'Régimen de Faltas, Medidas Formativas, Sanciones y Debido Proceso',
    shortDesc: 'Tipificación de faltas académicas y disciplinarias, medidas pedagógicas, sanciones y las plenas garantías del debido proceso con doble instancia.',
    scope: 'Actuaciones preventivas y sancionatorias ante el Comité de Evaluación y Seguimiento.',
    pedagogicalTip: 'El debido proceso te garantiza el derecho constitucional a presentar descargos y acudir a una segunda instancia.',
    keyArticles: [
      {
        title: 'Clasificación y Graduación de Faltas',
        description: 'Las conductas se catalogan como académicas o disciplinarias, y se gradúan en Leves, Graves o Gravísimas según el daño, reincidencia o premeditación.',
        practicalApplication: 'El fraude, el plagio y la agresión física o verbal son consideradas faltas graves o gravísimas.'
      },
      {
        title: 'Medidas Formativas (Preventivas y Pedagógicas)',
        description: 'Acciones orientadoras que no tienen carácter sancionatorio: Llamado de atención verbal, Plan de Mejoramiento Académico y Plan de Mejoramiento Disciplinario.',
        practicalApplication: 'Buscan orientar al aprendiz para subsanar deficiencias y continuar su ruta formativa con éxito.'
      },
      {
        title: 'Sanciones Disciplinarias (Vía Acto Administrativo)',
        description: 'Impuestas por la Subdirección de Centro ante faltas graves o reincidencia: Llamado de atención escrito con copia a la hoja de vida, Condicionamiento de matrícula y Cancelación definitiva de matrícula.',
        practicalApplication: 'La cancelación de matrícula conlleva la pérdida del cupo e inhabilidad para matricularse en el SENA entre 6 y 24 meses.'
      },
      {
        title: 'Garantías del Debido Proceso y Segunda Instancia',
        description: 'Notificación formal de cargos, derecho a presentar descargos con pruebas, audiencia ante el Comité, resolución motivada y recurso de apelación ante la Segunda Instancia.',
        practicalApplication: 'Ninguna sanción puede aplicarse de plano; tienes derecho a ser escuchado y a controvertir las pruebas.'
      }
    ]
  }
];

