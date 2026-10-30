export type InductionTab = 
  | 'overview'
  | 'identity'
  | 'rights-duties'
  | 'formation-path'
  | 'learner-services'
  | 'case-simulator'
  | 'assessment'
  | 'instructor-dashboard'
  | 'pedagogical-guidelines'
  | 'teaching-resources';

export type UserRole = 'apprentice' | 'instructor';

export interface InstructorSession {
  id: string;
  name: string;
  documentId: string;
  center: string;
  regional: string;
  assignedFichas: string[];
  roleTitle: string;
  token: string;
  authenticatedAt: string;
}

export interface PedagogicalGuideline {
  id: string;
  code: string;
  title: string;
  category: 'Guía de Aprendizaje' | 'Planeación Curricular' | 'Evaluación Formativa' | 'Debido Proceso';
  summary: string;
  fpiPhase: 'Inducción' | 'Análisis' | 'Planeación' | 'Ejecución' | 'Evaluación';
  keyInstructions: string[];
  associatedFormat: string;
  normativeSupport: string;
}

export interface LearnerService {
  id: string;
  title: string;
  category: 'Apoyo Socioeconómico' | 'Salud Integral' | 'Deporte y Cultura' | 'Liderazgo' | 'Consejería';
  description: string;
  benefits: string[];
  eligibility: string;
  contactOrProcedure: string;
  iconName: string;
}

export interface TeachingResource {
  id: string;
  code: string;
  title: string;
  type: 'Formato GFPI' | 'Rúbrica' | 'Plantilla' | 'Protocolo';
  formatExtension: 'PDF' | 'DOCX' | 'XLSX';
  description: string;
  usageTip: string;
  officialCode: string;
  contentSample: string;
}

export interface ApprenticeProfile {
  id: string;
  name: string;
  documentType: string;
  documentNumber: string;
  regional: string;
  trainingCenter: string;
  programName: string;
  fichaNumber: string;
  avatarSeed: string;
}

export interface SenaSymbol {
  id: string;
  title: string;
  shortDesc: string;
  fullMeaning: string;
  elements: { name: string; meaning: string }[];
  tag: string;
}

export interface InstitutionalValue {
  id: string;
  name: string;
  description: string;
  exampleInSena: string;
  iconName: string;
}

export interface RightOrDuty {
  id: string;
  type: 'derecho' | 'deber' | 'prohibicion';
  category: 'Academico' | 'Disciplinario' | 'Convivencia' | 'Seguridad';
  title: string;
  description: string;
  articleRef: string;
  practicalTip: string;
}

export interface PracticeCase {
  id: string;
  title: string;
  context: string;
  situation: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  normativeReference: string;
  learningCategory: string;
}

export interface AssessmentQuestion {
  id: string;
  category: 'identidad' | 'derechos' | 'deberes_prohibiciones' | 'ruta_convivencia';
  categoryLabel: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  ruleCitation: string;
}

export interface AssessmentResult {
  score: number;
  percentage: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  categoryScores: {
    category: string;
    score: number;
    total: number;
    percentage: number;
  }[];
  completedAt: string;
  certificateCode: string;
}

export interface ApprenticeRecord {
  id: string;
  name: string;
  documentNumber: string;
  ficha: string;
  program: string;
  status: 'Aprobado' | 'En Proceso' | 'Pendiente';
  score: number;
  evaluatedAt: string | null;
  weakArea?: string;
}

export interface RegulationChapter {
  id: string;
  chapterNumber: string;
  title: string;
  shortDesc: string;
  scope: string;
  keyArticles: {
    title: string;
    description: string;
    practicalApplication: string;
  }[];
  pedagogicalTip: string;
}
