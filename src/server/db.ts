import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory and file path
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'apprentices.json');

export interface StoredApprentice {
  id: string;
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP' | 'PPT' | string;
  documentNumber: string;
  ficha: string;
  program: string;
  regional: string;
  trainingCenter: string;
  avatarSeed?: string;
  
  // Habeas Data / Law 1581 of 2012 compliance
  hasConsentLaw1581: boolean;
  consentTimestamp: string;
  ipAddress?: string;

  // Timestamps
  registeredAt: string;
  updatedAt: string;

  // Induction Progress Tracking
  completedModules: string[];
  progressPercentage: number;
  lastModuleVisited?: string;

  // Exam and Evaluation
  status: 'Registrado' | 'En Proceso' | 'Aprobado' | 'No Aprobado' | 'Pendiente';
  examScore: number;
  examPassed: boolean;
  evaluatedAt: string | null;
  certificateCode: string | null;
  categoryScores?: {
    category: string;
    score: number;
    total: number;
    percentage: number;
  }[];
  weakArea?: string;
  instructorNotes?: string;
}

// Initial Seed Apprentices for real-time cohort monitoring
const INITIAL_APPRENTICES_SEED: StoredApprentice[] = [
  {
    id: 'apr-1',
    name: 'Carlos Eduardo Ramírez Peña',
    documentType: 'CC',
    documentNumber: '1020304050',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-25T08:15:00.000Z',
    registeredAt: '2026-10-25 08:15',
    updatedAt: '2026-10-27 10:20',
    completedModules: ['identity', 'rights-duties', 'formation-path', 'learner-services', 'case-simulator', 'assessment'],
    progressPercentage: 100,
    status: 'Aprobado',
    examScore: 92,
    examPassed: true,
    evaluatedAt: '2026-10-27 10:20',
    certificateCode: 'SENA-IND-849201',
    weakArea: 'Ninguna'
  },
  {
    id: 'apr-2',
    name: 'Valentina Morales Zuluaga',
    documentType: 'TI',
    documentNumber: '1098765432',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-26T09:00:00.000Z',
    registeredAt: '2026-10-26 09:00',
    updatedAt: '2026-10-27 14:15',
    completedModules: ['identity', 'rights-duties', 'formation-path'],
    progressPercentage: 60,
    status: 'En Proceso',
    examScore: 0,
    examPassed: false,
    evaluatedAt: null,
    certificateCode: null,
    weakArea: 'Deberes y Prohibiciones (Acuerdo 009 de 2024)'
  },
  {
    id: 'apr-3',
    name: 'Jhoan Sebastián Rojas Castro',
    documentType: 'CC',
    documentNumber: '1014235890',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-26T10:30:00.000Z',
    registeredAt: '2026-10-26 10:30',
    updatedAt: '2026-10-27 16:45',
    completedModules: ['identity', 'rights-duties', 'formation-path', 'learner-services', 'case-simulator', 'assessment'],
    progressPercentage: 100,
    status: 'Aprobado',
    examScore: 84,
    examPassed: true,
    evaluatedAt: '2026-10-27 16:45',
    certificateCode: 'SENA-IND-739102',
    weakArea: 'Ninguna'
  },
  {
    id: 'apr-4',
    name: 'Laura Camila Henao Restrepo',
    documentType: 'CC',
    documentNumber: '1035928471',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-27T07:45:00.000Z',
    registeredAt: '2026-10-27 07:45',
    updatedAt: '2026-10-27 07:45',
    completedModules: ['identity'],
    progressPercentage: 20,
    status: 'Pendiente',
    examScore: 0,
    examPassed: false,
    evaluatedAt: null,
    certificateCode: null,
    weakArea: 'Pendiente de inicio de evaluación'
  },
  {
    id: 'apr-5',
    name: 'Mateo Alejandro Vargas Silva',
    documentType: 'PPT',
    documentNumber: '9283746150',
    ficha: '2831204',
    program: 'Técnico en Programación de Aplicaciones para Dispositivos Móviles',
    regional: 'Regional Antioquia',
    trainingCenter: 'Centro de Formación en Tecnologías de la Información y las Comunicaciones',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-26T11:20:00.000Z',
    registeredAt: '2026-10-26 11:20',
    updatedAt: '2026-10-27 11:30',
    completedModules: ['identity', 'rights-duties', 'case-simulator'],
    progressPercentage: 50,
    status: 'En Proceso',
    examScore: 65,
    examPassed: false,
    evaluatedAt: '2026-10-27 11:30',
    certificateCode: null,
    weakArea: 'Identidad y Símbolos'
  },
  {
    id: 'apr-6',
    name: 'Sebastián Ospina Cuartas',
    documentType: 'CC',
    documentNumber: '1073829451',
    ficha: '2845119',
    program: 'Tecnólogo en Animación Digital y 3D',
    regional: 'Regional Caldas',
    trainingCenter: 'Centro de Procesos Industriales',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-27T12:00:00.000Z',
    registeredAt: '2026-10-27 12:00',
    updatedAt: '2026-10-27 12:00',
    completedModules: [],
    progressPercentage: 0,
    status: 'Pendiente',
    examScore: 0,
    examPassed: false,
    evaluatedAt: null,
    certificateCode: null,
    weakArea: 'Sin evaluar'
  },
  {
    id: 'apr-7',
    name: 'Angie Paola Gutiérrez Chaves',
    documentType: 'CC',
    documentNumber: '1019283746',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    hasConsentLaw1581: true,
    consentTimestamp: '2026-10-25T08:00:00.000Z',
    registeredAt: '2026-10-25 08:00',
    updatedAt: '2026-10-27 08:10',
    completedModules: ['identity', 'rights-duties', 'formation-path', 'learner-services', 'case-simulator', 'assessment'],
    progressPercentage: 100,
    status: 'Aprobado',
    examScore: 95,
    examPassed: true,
    evaluatedAt: '2026-10-27 08:10',
    certificateCode: 'SENA-IND-912834',
    weakArea: 'Ninguna'
  }
];

class Database {
  private inMemoryCache: StoredApprentice[] | null = null;

  constructor() {
    this.ensureDatabaseExists();
  }

  private ensureDatabaseExists() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_APPRENTICES_SEED, null, 2), 'utf-8');
        this.inMemoryCache = [...INITIAL_APPRENTICES_SEED];
      } else {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.inMemoryCache = JSON.parse(raw);
      }
    } catch (err) {
      console.error('Failed to initialize apprentices database file:', err);
      this.inMemoryCache = [...INITIAL_APPRENTICES_SEED];
    }
  }

  public readAll(): StoredApprentice[] {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.inMemoryCache = JSON.parse(raw);
        return this.inMemoryCache || [];
      }
    } catch (err) {
      console.error('Error reading DB_FILE:', err);
    }
    return this.inMemoryCache || [];
  }

  public writeAll(records: StoredApprentice[]): void {
    this.inMemoryCache = records;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(records, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing DB_FILE:', err);
    }
  }

  public findByDocument(docType: string, docNumber: string): StoredApprentice | undefined {
    const list = this.readAll();
    const cleanType = docType.trim().toUpperCase();
    const cleanNum = docNumber.trim().replace(/\D/g, '') || docNumber.trim();
    
    return list.find(item => {
      const itemType = (item.documentType || '').trim().toUpperCase();
      const itemNum = (item.documentNumber || '').trim().replace(/\D/g, '') || item.documentNumber.trim();
      return itemType === cleanType && itemNum === cleanNum;
    });
  }

  public findById(id: string): StoredApprentice | undefined {
    const list = this.readAll();
    return list.find(item => item.id === id);
  }

  public create(newApprentice: Omit<StoredApprentice, 'id' | 'registeredAt' | 'updatedAt'>): StoredApprentice {
    const list = this.readAll();
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16).replace('T', ' ');

    const record: StoredApprentice = {
      id: `apr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...newApprentice,
      registeredAt: formattedDate,
      updatedAt: formattedDate,
      completedModules: newApprentice.completedModules || [],
      progressPercentage: newApprentice.progressPercentage || 0,
      status: newApprentice.status || 'Registrado',
      examScore: newApprentice.examScore || 0,
      examPassed: newApprentice.examPassed || false,
      evaluatedAt: newApprentice.evaluatedAt || null,
      certificateCode: newApprentice.certificateCode || null
    };

    const updated = [record, ...list];
    this.writeAll(updated);
    return record;
  }

  public update(id: string, updates: Partial<StoredApprentice>): StoredApprentice | null {
    const list = this.readAll();
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return null;

    const existing = list[idx];
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16).replace('T', ' ');

    const updated: StoredApprentice = {
      ...existing,
      ...updates,
      updatedAt: formattedDate
    };

    list[idx] = updated;
    this.writeAll(list);
    return updated;
  }

  public delete(id: string): boolean {
    const list = this.readAll();
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length !== list.length) {
      this.writeAll(filtered);
      return true;
    }
    return false;
  }
}

export const apprenticeDb = new Database();
