import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { apprenticeDb, StoredApprentice } from './src/server/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// ==========================================
// API REST: GESTIÓN DE APRENDICES E INDUCCIÓN
// ==========================================

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'SENA Inducción API', timestamp: new Date().toISOString() });
});

// 1. Listar aprendices con filtros (Instructor Dashboard)
app.get('/api/apprentices', (req: Request, res: Response) => {
  try {
    const all = apprenticeDb.readAll();
    const { ficha, status, search } = req.query;

    let filtered = all;

    if (ficha && typeof ficha === 'string' && ficha !== 'all') {
      filtered = filtered.filter(a => a.ficha === ficha);
    }

    if (status && typeof status === 'string' && status !== 'all') {
      filtered = filtered.filter(a => a.status === status);
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(q) ||
        a.documentNumber.includes(q) ||
        a.ficha.includes(q) ||
        (a.program && a.program.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      total: filtered.length,
      apprentices: filtered
    });
  } catch (error: any) {
    console.error('Error fetching apprentices:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor al consultar aprendices' });
  }
});

// 2. Verificar duplicado por tipo y número de documento
app.get('/api/apprentices/check-duplicate', (req: Request, res: Response) => {
  try {
    const { documentType, documentNumber } = req.query;

    if (!documentType || !documentNumber) {
      return res.status(400).json({ 
        success: false, 
        error: 'Debe especificar el tipo y número de documento' 
      });
    }

    const existing = apprenticeDb.findByDocument(String(documentType), String(documentNumber));

    if (existing) {
      return res.json({
        exists: true,
        message: 'El documento ya está registrado en la base de datos de inducción.',
        apprentice: existing
      });
    }

    return res.json({ exists: false });
  } catch (error: any) {
    console.error('Error checking duplicate:', error);
    res.status(500).json({ success: false, error: 'Error al verificar duplicidad' });
  }
});

// 3. Registrar un nuevo aprendiz con validación y consentimiento Ley 1581 de 2012
app.post('/api/apprentices/register', (req: Request, res: Response) => {
  try {
    const {
      name,
      documentType,
      documentNumber,
      ficha,
      program,
      regional,
      trainingCenter,
      hasConsentLaw1581
    } = req.body;

    // Validación de obligatoriedad de campos
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: 'El nombre completo es obligatorio y debe tener al menos 3 caracteres.'
      });
    }

    if (!documentType || typeof documentType !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'El tipo de documento es obligatorio.'
      });
    }

    const validDocTypes = ['CC', 'TI', 'CE', 'PEP', 'PPT'];
    const cleanDocType = documentType.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (!validDocTypes.includes(cleanDocType)) {
      return res.status(400).json({
        success: false,
        error: `Tipo de documento inválido. Opciones válidas: ${validDocTypes.join(', ')}`
      });
    }

    if (!documentNumber || typeof documentNumber !== 'string' || documentNumber.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'El número de documento es obligatorio y debe tener mínimo 5 dígitos.'
      });
    }

    if (!ficha || typeof ficha !== 'string' || ficha.trim().length < 4) {
      return res.status(400).json({
        success: false,
        error: 'El número de ficha de caracterización es obligatorio (mínimo 4 dígitos).'
      });
    }

    // Validación estricta Ley 1581 de 2012 (Habeas Data)
    if (hasConsentLaw1581 !== true) {
      return res.status(400).json({
        success: false,
        error: 'Debe aceptar de forma explícita el tratamiento de datos personales conforme a la Ley 1581 de 2012 para continuar con la inducción.'
      });
    }

    // Prevención de registros duplicados
    const existing = apprenticeDb.findByDocument(cleanDocType, documentNumber);
    if (existing) {
      return res.status(409).json({
        success: false,
        isDuplicate: true,
        error: 'Ya existe un aprendiz registrado con este tipo y número de documento en el sistema de inducción.',
        existingApprentice: existing
      });
    }

    // Creación en base de datos persistente
    const newRecord = apprenticeDb.create({
      name: name.trim(),
      documentType: cleanDocType,
      documentNumber: documentNumber.trim(),
      ficha: ficha.trim(),
      program: (program && String(program).trim()) || 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      regional: (regional && String(regional).trim()) || 'Regional Distrito Capital',
      trainingCenter: (trainingCenter && String(trainingCenter).trim()) || 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
      hasConsentLaw1581: true,
      consentTimestamp: new Date().toISOString(),
      completedModules: [],
      progressPercentage: 0,
      status: 'Registrado',
      examScore: 0,
      examPassed: false,
      evaluatedAt: null,
      certificateCode: null,
      weakArea: 'Pendiente de inicio'
    });

    res.status(201).json({
      success: true,
      message: 'Aprendiz registrado exitosamente en la base de datos institucional.',
      apprentice: newRecord
    });
  } catch (error: any) {
    console.error('Error registering apprentice:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor al procesar el registro' });
  }
});

// 4. Obtener perfil de aprendiz por ID
app.get('/api/apprentices/:id', (req: Request, res: Response) => {
  try {
    const apprentice = apprenticeDb.findById(req.params.id);
    if (!apprentice) {
      return res.status(404).json({ success: false, error: 'Aprendiz no encontrado' });
    }
    res.json({ success: true, apprentice });
  } catch (error: any) {
    console.error('Error fetching apprentice:', error);
    res.status(500).json({ success: false, error: 'Error al consultar aprendiz' });
  }
});

// 5. Actualizar progreso de módulos de inducción
app.put('/api/apprentices/:id/progress', (req: Request, res: Response) => {
  try {
    const { moduleId } = req.body;
    const apprentice = apprenticeDb.findById(req.params.id);

    if (!apprentice) {
      return res.status(404).json({ success: false, error: 'Aprendiz no encontrado' });
    }

    const currentModules = new Set(apprentice.completedModules || []);
    if (moduleId && typeof moduleId === 'string') {
      currentModules.add(moduleId);
    }

    // 5 módulos principales de inducción
    const coreModules = ['identity', 'rights-duties', 'formation-path', 'learner-services', 'case-simulator'];
    const completedCount = coreModules.filter(m => currentModules.has(m)).length;
    let progressPercentage = Math.round((completedCount / coreModules.length) * 100);

    if (apprentice.examPassed) {
      progressPercentage = 100;
    }

    const newStatus = apprentice.examPassed 
      ? 'Aprobado' 
      : progressPercentage > 0 ? 'En Proceso' : apprentice.status;

    const updated = apprenticeDb.update(req.params.id, {
      completedModules: Array.from(currentModules),
      progressPercentage,
      lastModuleVisited: moduleId,
      status: newStatus
    });

    res.json({
      success: true,
      message: 'Progreso de inducción sincronizado con la base de datos.',
      apprentice: updated
    });
  } catch (error: any) {
    console.error('Error updating progress:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar progreso' });
  }
});

// 6. Registrar resultado de evaluación diagnóstica de inducción
app.post('/api/apprentices/:id/exam', (req: Request, res: Response) => {
  try {
    const { score, passed, categoryScores, certificateCode, weakArea } = req.body;
    const apprentice = apprenticeDb.findById(req.params.id);

    if (!apprentice) {
      return res.status(404).json({ success: false, error: 'Aprendiz no encontrado' });
    }

    const currentModules = new Set(apprentice.completedModules || []);
    if (passed) {
      currentModules.add('assessment');
    }

    const updated = apprenticeDb.update(req.params.id, {
      examScore: Number(score) || 0,
      examPassed: Boolean(passed),
      evaluatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      certificateCode: certificateCode || (passed ? `SENA-IND-${Math.floor(100000 + Math.random() * 900000)}` : null),
      categoryScores: categoryScores || [],
      status: passed ? 'Aprobado' : 'En Proceso',
      progressPercentage: passed ? 100 : Math.max(apprentice.progressPercentage, 85),
      weakArea: weakArea || (passed ? 'Ninguna' : 'Deberes y Sanciones (Acuerdo 009 de 2024)')
    });

    res.json({
      success: true,
      message: 'Resultado de evaluación guardado en la base de datos oficial.',
      apprentice: updated
    });
  } catch (error: any) {
    console.error('Error saving exam result:', error);
    res.status(500).json({ success: false, error: 'Error al guardar resultado de evaluación' });
  }
});

// 7. Modificar aprendiz desde el Panel de Gestión del Instructor (RBAC)
app.put('/api/apprentices/:id/manage', (req: Request, res: Response) => {
  try {
    const { status, instructorNotes, weakArea, score } = req.body;
    const apprentice = apprenticeDb.findById(req.params.id);

    if (!apprentice) {
      return res.status(404).json({ success: false, error: 'Aprendiz no encontrado' });
    }

    const updates: Partial<StoredApprentice> = {};
    if (status) updates.status = status;
    if (instructorNotes !== undefined) updates.instructorNotes = instructorNotes;
    if (weakArea !== undefined) updates.weakArea = weakArea;
    if (score !== undefined) updates.examScore = Number(score);

    const updated = apprenticeDb.update(req.params.id, updates);

    res.json({
      success: true,
      message: 'Registro actualizado por el instructor.',
      apprentice: updated
    });
  } catch (error: any) {
    console.error('Error updating apprentice by instructor:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar registro de aprendiz' });
  }
});

// 8. Eliminar o reiniciar registro (Instructor)
app.delete('/api/apprentices/:id', (req: Request, res: Response) => {
  try {
    const success = apprenticeDb.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Aprendiz no encontrado para eliminar' });
    }
    res.json({ success: true, message: 'Registro de aprendiz eliminado de la base de datos.' });
  } catch (error: any) {
    console.error('Error deleting apprentice:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar aprendiz' });
  }
});

// ==========================================
// VITE MIDDLEWARES & DEV / PROD SERVER
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SENA Server] Running on http://0.0.0.0:${PORT} (PID: ${process.pid})`);
  });
}

startServer().catch(err => {
  console.error('[SENA Server] Failed to start:', err);
  process.exit(1);
});
