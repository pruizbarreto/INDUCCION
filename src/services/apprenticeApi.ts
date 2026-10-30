import { StoredApprentice } from '../server/db';
import { AssessmentResult } from '../types/induction';
import { triggerApprenticeSync } from './googleSheetsService';

export interface RegisterApprenticePayload {
  name: string;
  documentType: string;
  documentNumber: string;
  ficha: string;
  program?: string;
  regional?: string;
  trainingCenter?: string;
  hasConsentLaw1581: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  isDuplicate?: boolean;
  apprentice?: StoredApprentice;
  existingApprentice?: StoredApprentice;
}

export interface CheckDuplicateResponse {
  exists: boolean;
  message?: string;
  apprentice?: StoredApprentice;
}

export interface FetchApprenticesResponse {
  success: boolean;
  total: number;
  apprentices: StoredApprentice[];
  error?: string;
}

// 1. Registrar aprendiz en la base de datos persistente
export async function registerApprentice(payload: RegisterApprenticePayload): Promise<RegisterResponse> {
  try {
    const res = await fetch('/api/apprentices/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || 'Error al registrar aprendiz',
        isDuplicate: res.status === 409 || data.isDuplicate,
        existingApprentice: data.existingApprentice
      };
    }

    if (data.apprentice) {
      triggerApprenticeSync(data.apprentice);
    }

    return data;
  } catch (err: any) {
    console.error('Network error during registration:', err);
    return {
      success: false,
      error: 'No se pudo conectar con el servidor de la base de datos de inducción.'
    };
  }
}

// 2. Verificar duplicidad de documento en tiempo real
export async function checkDuplicate(documentType: string, documentNumber: string): Promise<CheckDuplicateResponse> {
  try {
    const params = new URLSearchParams({
      documentType,
      documentNumber
    });
    const res = await fetch(`/api/apprentices/check-duplicate?${params.toString()}`);
    if (!res.ok) return { exists: false };
    return await res.json();
  } catch (err) {
    console.error('Error checking duplicate:', err);
    return { exists: false };
  }
}

// 3. Obtener listado de aprendices para el panel del instructor
export async function fetchApprentices(params?: {
  ficha?: string;
  status?: string;
  search?: string;
}): Promise<FetchApprenticesResponse> {
  try {
    const query = new URLSearchParams();
    if (params?.ficha && params.ficha !== 'all') query.append('ficha', params.ficha);
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.search && params.search.trim()) query.append('search', params.search.trim());

    const res = await fetch(`/api/apprentices?${query.toString()}`);
    if (!res.ok) {
      throw new Error('Error al consultar base de datos de aprendices');
    }
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching apprentices:', err);
    return {
      success: false,
      total: 0,
      apprentices: [],
      error: err.message
    };
  }
}

// 4. Actualizar progreso de módulo visitado
export async function updateApprenticeProgress(apprenticeId: string, moduleId: string): Promise<StoredApprentice | null> {
  try {
    const res = await fetch(`/api/apprentices/${encodeURIComponent(apprenticeId)}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.apprentice) {
      triggerApprenticeSync(data.apprentice);
    }
    return data.apprentice || null;
  } catch (err) {
    console.error('Error updating module progress:', err);
    return null;
  }
}

// 5. Guardar resultado de evaluación de inducción
export async function saveApprenticeExamResult(
  apprenticeId: string,
  result: AssessmentResult
): Promise<StoredApprentice | null> {
  try {
    const res = await fetch(`/api/apprentices/${encodeURIComponent(apprenticeId)}/exam`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: result.percentage,
        passed: result.passed,
        categoryScores: result.categoryScores,
        certificateCode: result.certificateCode,
        weakArea: result.passed ? 'Ninguna' : 'Deberes y Sanciones (Acuerdo 009/2024)'
      })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.apprentice) {
      triggerApprenticeSync(data.apprentice);
    }
    return data.apprentice || null;
  } catch (err) {
    console.error('Error saving exam result in database:', err);
    return null;
  }
}

// 6. Actualización por parte del instructor
export async function updateApprenticeByInstructor(
  apprenticeId: string,
  updates: {
    status?: 'Aprobado' | 'En Proceso' | 'Pendiente';
    instructorNotes?: string;
    weakArea?: string;
    score?: number;
  }
): Promise<StoredApprentice | null> {
  try {
    const res = await fetch(`/api/apprentices/${encodeURIComponent(apprenticeId)}/manage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.apprentice) {
      triggerApprenticeSync(data.apprentice);
    }
    return data.apprentice || null;
  } catch (err) {
    console.error('Error managing apprentice record:', err);
    return null;
  }
}

// 7. Eliminar aprendiz
export async function deleteApprenticeRecord(apprenticeId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/apprentices/${encodeURIComponent(apprenticeId)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.error('Error deleting apprentice:', err);
    return false;
  }
}
