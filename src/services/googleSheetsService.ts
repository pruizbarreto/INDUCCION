import { getAccessToken } from './googleAuth';
import { StoredApprentice } from '../server/db';

const STORAGE_KEY_SHEET_ID = 'sena_google_sheet_id';
const STORAGE_KEY_SHEET_URL = 'sena_google_sheet_url';

export const SHEET_NAME = 'Control_Induccion';

export const SHEET_HEADERS = [
  'ID Aprendiz',
  'Tipo Doc',
  'Número Documento',
  'Nombres y Apellidos',
  'Ficha de Formación',
  'Programa de Formación',
  'Regional / Centro',
  'Habeas Data (Ley 1581)',
  'Fecha y Hora Registro',
  'Progreso Inducción',
  'Módulos Completados',
  'Puntaje Evaluación',
  'Estado Inducción',
  'Código Constancia',
  'Última Sincronización'
];

export interface GoogleSheetSyncResult {
  success: boolean;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  action?: 'created' | 'updated' | 'appended' | 'synced_all';
  message?: string;
  error?: string;
}

export function getStoredSpreadsheetId(): string | null {
  return localStorage.getItem(STORAGE_KEY_SHEET_ID);
}

export function getStoredSpreadsheetUrl(): string | null {
  const stored = localStorage.getItem(STORAGE_KEY_SHEET_URL);
  if (stored) return stored;
  const id = getStoredSpreadsheetId();
  return id ? `https://docs.google.com/spreadsheets/d/${id}/edit` : null;
}

export function setStoredSpreadsheet(id: string, url: string): void {
  localStorage.setItem(STORAGE_KEY_SHEET_ID, id);
  localStorage.setItem(STORAGE_KEY_SHEET_URL, url);
}

export function clearStoredSpreadsheet(): void {
  localStorage.removeItem(STORAGE_KEY_SHEET_ID);
  localStorage.removeItem(STORAGE_KEY_SHEET_URL);
}

/**
 * Convierte un objeto StoredApprentice en un arreglo de celdas para la hoja de cálculo
 */
export function apprenticeToRow(apprentice: StoredApprentice): (string | number)[] {
  const completedStr = (apprentice.completedModules && apprentice.completedModules.length > 0)
    ? apprentice.completedModules.join(', ')
    : 'Sin módulos completados';

  const consentStr = apprentice.hasConsentLaw1581
    ? `Aceptado (${apprentice.consentTimestamp ? apprentice.consentTimestamp.slice(0, 16).replace('T', ' ') : 'Ley 1581'})`
    : 'Pendiente de aceptación';

  const scoreStr = apprentice.examScore !== undefined && apprentice.examScore !== null
    ? `${apprentice.examScore}%`
    : '0%';

  const nowFormatted = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'short',
    timeStyle: 'medium'
  });

  return [
    apprentice.id,
    apprentice.documentType,
    apprentice.documentNumber,
    apprentice.name,
    apprentice.ficha,
    apprentice.program || 'ADSO',
    apprentice.regional ? `${apprentice.regional} - ${apprentice.trainingCenter || ''}` : 'Regional Distrito Capital',
    consentStr,
    apprentice.registeredAt || nowFormatted,
    `${apprentice.progressPercentage || 0}%`,
    completedStr,
    scoreStr,
    apprentice.status || 'Registrado',
    apprentice.certificateCode || (apprentice.examPassed ? 'Verificado' : 'Sin constancia'),
    nowFormatted
  ];
}

/**
 * Crea una nueva hoja de cálculo en el Google Drive del instructor con diseño institucional SENA
 */
export async function createSenaSpreadsheet(): Promise<{ id: string; url: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No hay sesión de Google activa. Por favor vincula tu cuenta de Google Drive.');
  }

  // 1. Crear Spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: `SENA - Control de Inducción de Aprendices FPI (${new Date().toLocaleDateString('es-CO')})`
      },
      sheets: [
        {
          properties: {
            title: SHEET_NAME,
            gridProperties: {
              frozenRowCount: 1,
              columnCount: 20
            }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'Error al crear la hoja de cálculo en Google Drive.');
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Insertar encabezados institucionales
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A1:O1?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [SHEET_HEADERS]
    })
  });

  // 3. Dar formato visual institucional SENA (Verde #39A900, texto blanco negrita)
  try {
    const sheetId = sheetData.sheets?.[0]?.properties?.sheetId || 0;
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          // Color de fondo verde SENA (#39A900 -> R:0.2235, G:0.6627, B:0.0) y texto blanco negrita en cabecera
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: SHEET_HEADERS.length
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.2235, green: 0.6627, blue: 0.0 },
                  textFormat: {
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                    bold: true,
                    fontSize: 10
                  },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
            }
          },
          // Congelar la fila 1
          {
            updateSheetProperties: {
              properties: {
                sheetId: sheetId,
                gridProperties: {
                  frozenRowCount: 1
                }
              },
              fields: 'gridProperties.frozenRowCount'
            }
          }
        ]
      })
    });
  } catch (fmtErr) {
    console.warn('Could not apply advanced formatting to sheet:', fmtErr);
  }

  // Guardar ID y URL en almacenamiento local
  setStoredSpreadsheet(spreadsheetId, spreadsheetUrl);
  return { id: spreadsheetId, url: spreadsheetUrl };
}

/**
 * Obtiene el ID de la hoja actual o la crea si no existe
 */
export async function getOrCreateSpreadsheet(): Promise<{ id: string; url: string }> {
  const existingId = getStoredSpreadsheetId();
  const token = await getAccessToken();

  if (existingId && token) {
    // Validar si aún existe en Google Drive
    try {
      const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${existingId}?fields=spreadsheetId,spreadsheetUrl`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (checkRes.ok) {
        const data = await checkRes.json();
        const url = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${existingId}/edit`;
        return { id: existingId, url };
      }
    } catch {
      // Ignorar y recrear
    }
  }

  return await createSenaSpreadsheet();
}

/**
 * Sincroniza un aprendiz individual (Inserta o Actualiza su fila según el número de documento)
 */
export async function syncApprenticeToSheet(apprentice: StoredApprentice): Promise<GoogleSheetSyncResult> {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, error: 'No hay token de acceso a Google Drive' };
  }

  try {
    const { id: spreadsheetId, url: spreadsheetUrl } = await getOrCreateSpreadsheet();

    // 1. Buscar si el aprendiz ya está registrado buscando por columna C (Número Documento)
    const readRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!C:C`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    let targetRowIndex = -1;
    if (readRes.ok) {
      const readData = await readRes.json();
      const rows: string[][] = readData.values || [];
      const cleanDocNumber = apprentice.documentNumber.trim().replace(/\D/g, '') || apprentice.documentNumber.trim();

      for (let i = 1; i < rows.length; i++) {
        const cellDoc = (rows[i]?.[0] || '').trim().replace(/\D/g, '') || (rows[i]?.[0] || '').trim();
        if (cellDoc === cleanDocNumber) {
          targetRowIndex = i + 1; // 1-indexed for A1 notation
          break;
        }
      }
    }

    const rowValues = apprenticeToRow(apprentice);

    if (targetRowIndex > 1) {
      // Actualizar fila existente
      const updateRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A${targetRowIndex}:O${targetRowIndex}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [rowValues] })
        }
      );

      if (!updateRes.ok) {
        throw new Error('Error al actualizar la fila del aprendiz en Google Sheets');
      }

      return {
        success: true,
        action: 'updated',
        spreadsheetId,
        spreadsheetUrl,
        message: `Fila de ${apprentice.name} actualizada correctamente en Google Sheets.`
      };
    } else {
      // Agregar nueva fila al final
      const appendRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A:O:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ values: [rowValues] })
        }
      );

      if (!appendRes.ok) {
        throw new Error('Error al insertar fila en Google Sheets');
      }

      return {
        success: true,
        action: 'appended',
        spreadsheetId,
        spreadsheetUrl,
        message: `Aprendiz ${apprentice.name} registrado en Google Sheets.`
      };
    }
  } catch (err: any) {
    console.error('Error syncing apprentice with Google Sheets:', err);
    return { success: false, error: err.message || 'Error de sincronización con Google Sheets' };
  }
}

/**
 * Sincronización masiva de todos los aprendices almacenados
 */
export async function syncAllApprenticesToSheet(apprentices: StoredApprentice[]): Promise<GoogleSheetSyncResult> {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, error: 'No hay token de acceso a Google Drive' };
  }

  try {
    const { id: spreadsheetId, url: spreadsheetUrl } = await getOrCreateSpreadsheet();

    // Reconstruir todas las filas a partir de la fila 2
    const allRows = [SHEET_HEADERS, ...apprentices.map(apprenticeToRow)];

    // Limpiar y escribir la hoja completa
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A1:O${allRows.length}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: allRows })
      }
    );

    if (!updateRes.ok) {
      throw new Error('Error al sincronizar listado completo en Google Sheets');
    }

    return {
      success: true,
      action: 'synced_all',
      spreadsheetId,
      spreadsheetUrl,
      message: `${apprentices.length} aprendices sincronizados en la hoja de Google Drive.`
    };
  } catch (err: any) {
    console.error('Error bulk syncing to Google Sheets:', err);
    return { success: false, error: err.message || 'Error en sincronización masiva' };
  }
}

// Global Event Dispatcher to trigger sync when apprentice state changes
export const APPRENTICE_SYNC_EVENT = 'sena_apprentice_sync_event';

export function triggerApprenticeSync(apprentice: StoredApprentice) {
  try {
    const event = new CustomEvent(APPRENTICE_SYNC_EVENT, { detail: apprentice });
    window.dispatchEvent(event);
  } catch (err) {
    console.warn('Could not dispatch custom sync event:', err);
  }
}
