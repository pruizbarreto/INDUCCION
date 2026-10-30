import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle, 
  LogOut, 
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react';
import { StoredApprentice } from '../server/db';
import { 
  signInWithGoogle, 
  logoutGoogle, 
  initAuth, 
  getAccessToken,
  isGoogleConnected
} from '../services/googleAuth';
import { 
  getOrCreateSpreadsheet, 
  getStoredSpreadsheetUrl, 
  getStoredSpreadsheetId,
  syncAllApprenticesToSheet,
  syncApprenticeToSheet,
  APPRENTICE_SYNC_EVENT
} from '../services/googleSheetsService';
import { User } from 'firebase/auth';

interface GoogleSheetsSyncCardProps {
  students: StoredApprentice[];
  onRefreshData?: () => void;
}

export const GoogleSheetsSyncCard: React.FC<GoogleSheetsSyncCardProps> = ({
  students,
  onRefreshData
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(getStoredSpreadsheetUrl());
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(getStoredSpreadsheetId());
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncStatus, setLastSyncStatus] = useState<{
    time: string;
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Confirmation modal for bulk sync or destructive operations (Mandatory per Workspace Skill)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<'bulk_sync' | 'create_new' | null>(null);

  // Live real-time notification pill
  const [liveSyncToast, setLiveSyncToast] = useState<string | null>(null);

  // Monitor auth state on component mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, _token) => {
        setCurrentUser(user);
        setIsConnected(true);
        const storedUrl = getStoredSpreadsheetUrl();
        const storedId = getStoredSpreadsheetId();
        if (storedUrl) setSpreadsheetUrl(storedUrl);
        if (storedId) setSpreadsheetId(storedId);
      },
      () => {
        setCurrentUser(null);
        setIsConnected(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Listen to live apprentice events (registration, module progress, exam results)
  const handleLiveApprenticeSync = useCallback(async (event: Event) => {
    const customEvent = event as CustomEvent<StoredApprentice>;
    const apprentice = customEvent.detail;
    if (!apprentice) return;

    const token = await getAccessToken();
    if (!token) return;

    try {
      setLiveSyncToast(`Sincronizando en Google Sheets: ${apprentice.name}...`);
      const result = await syncApprenticeToSheet(apprentice);
      if (result.success) {
        if (result.spreadsheetUrl) setSpreadsheetUrl(result.spreadsheetUrl);
        if (result.spreadsheetId) setSpreadsheetId(result.spreadsheetId);
        
        const now = new Date().toLocaleTimeString('es-CO');
        setLastSyncStatus({
          time: now,
          message: `Sincronización en vivo: ${apprentice.name} (${apprentice.status})`,
          type: 'success'
        });
        setLiveSyncToast(`¡Actualizado en Google Sheets!: ${apprentice.name} (${apprentice.progressPercentage || 0}%)`);
        setTimeout(() => setLiveSyncToast(null), 4000);

        if (onRefreshData) onRefreshData();
      }
    } catch (err: any) {
      console.error('Real-time sync failed:', err);
      setLiveSyncToast(null);
    }
  }, [onRefreshData]);

  useEffect(() => {
    window.addEventListener(APPRENTICE_SYNC_EVENT, handleLiveApprenticeSync);
    return () => {
      window.removeEventListener(APPRENTICE_SYNC_EVENT, handleLiveApprenticeSync);
    };
  }, [handleLiveApprenticeSync]);

  // Connect Google Account & Automatically Create/Link Sheet
  const handleConnectGoogle = async () => {
    setIsAuthenticating(true);
    setLastSyncStatus(null);
    try {
      const { user } = await signInWithGoogle();
      setCurrentUser(user);
      setIsConnected(true);

      // Crear o verificar la hoja de cálculo en su Google Drive
      setIsSyncing(true);
      const sheet = await getOrCreateSpreadsheet();
      setSpreadsheetId(sheet.id);
      setSpreadsheetUrl(sheet.url);

      // Sincronizar los aprendices existentes inicialmente
      if (students.length > 0) {
        await syncAllApprenticesToSheet(students);
      }

      const now = new Date().toLocaleTimeString('es-CO');
      setLastSyncStatus({
        time: now,
        message: `Hoja de cálculo creada y sincronizada con ${students.length} aprendices.`,
        type: 'success'
      });
    } catch (err: any) {
      console.error('Error connecting Google:', err);
      setLastSyncStatus({
        time: new Date().toLocaleTimeString('es-CO'),
        message: err.message || 'Error al conectar con Google Drive',
        type: 'error'
      });
    } finally {
      setIsAuthenticating(false);
      setIsSyncing(false);
    }
  };

  const handleDisconnectGoogle = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setIsConnected(false);
      setLastSyncStatus({
        time: new Date().toLocaleTimeString('es-CO'),
        message: 'Cuenta de Google desconectada.',
        type: 'info'
      });
    } catch (err) {
      console.error('Error disconnecting:', err);
    }
  };

  // Perform confirmed action
  const executeConfirmedAction = async () => {
    if (confirmAction === 'bulk_sync') {
      setIsConfirmModalOpen(false);
      setIsSyncing(true);
      try {
        const result = await syncAllApprenticesToSheet(students);
        if (result.success) {
          setSpreadsheetUrl(result.spreadsheetUrl || spreadsheetUrl);
          setSpreadsheetId(result.spreadsheetId || spreadsheetId);
          setLastSyncStatus({
            time: new Date().toLocaleTimeString('es-CO'),
            message: `Sincronización masiva exitosa: ${students.length} aprendices en Google Sheets.`,
            type: 'success'
          });
        } else {
          setLastSyncStatus({
            time: new Date().toLocaleTimeString('es-CO'),
            message: result.error || 'Error al sincronizar datos',
            type: 'error'
          });
        }
      } catch (err: any) {
        setLastSyncStatus({
          time: new Date().toLocaleTimeString('es-CO'),
          message: err.message || 'Error inesperado durante la sincronización',
          type: 'error'
        });
      } finally {
        setIsSyncing(false);
        setConfirmAction(null);
      }
    } else if (confirmAction === 'create_new') {
      setIsConfirmModalOpen(false);
      setIsSyncing(true);
      try {
        const sheet = await getOrCreateSpreadsheet();
        setSpreadsheetId(sheet.id);
        setSpreadsheetUrl(sheet.url);
        await syncAllApprenticesToSheet(students);
        setLastSyncStatus({
          time: new Date().toLocaleTimeString('es-CO'),
          message: `Nueva hoja creada en Google Drive con ${students.length} registros.`,
          type: 'success'
        });
      } catch (err: any) {
        setLastSyncStatus({
          time: new Date().toLocaleTimeString('es-CO'),
          message: err.message || 'Error al crear la nueva hoja',
          type: 'error'
        });
      } finally {
        setIsSyncing(false);
        setConfirmAction(null);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/10 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-800/80 dark:to-slate-900 rounded-3xl p-6 lg:p-7 border border-emerald-500/20 dark:border-emerald-500/30 shadow-xs relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Live sync pill badge */}
      {liveSyncToast && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#39A900] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-in fade-in slide-in-from-top-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>{liveSyncToast}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Branding and Info */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Google Sheets & Google Drive Oficial</span>
            </span>

            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Sincronización en Tiempo Real Activa</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Listo para vincular
              </span>
            )}
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Sincronización Automática de Inducción FPI
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Cada vez que un aprendiz se registra, completa un módulo de inducción o presenta la evaluación de conocimientos, los datos se guardan y actualizan <strong>en tiempo real</strong> en una hoja de cálculo institucional creada en tu propio <strong>Google Drive</strong>.
          </p>

          {/* Connected User Badge */}
          {isConnected && currentUser && (
            <div className="flex items-center gap-3 pt-1 text-xs text-slate-700 dark:text-slate-300">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'Google'} 
                  className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {(currentUser.displayName || currentUser.email || 'G').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-semibold text-slate-900 dark:text-white">
                {currentUser.displayName || 'Instructor SENA'}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                ({currentUser.email})
              </span>
              <button
                onClick={handleDisconnectGoogle}
                title="Desconectar cuenta de Google"
                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Actions and Link */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          {!isConnected ? (
            <button
              onClick={handleConnectGoogle}
              disabled={isAuthenticating}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-slate-400 rounded-2xl font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Official Google 'G' icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isAuthenticating ? 'Conectando con Google...' : 'Vincular Google Drive y Crear Hoja'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              {/* Primary Direct Link to Google Drive Sheet */}
              {spreadsheetUrl && (
                <a
                  href={spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Abrir Hoja de Cálculo en Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                </a>
              )}

              {/* Force Bulk Sync Button */}
              <button
                onClick={() => {
                  setConfirmAction('bulk_sync');
                  setIsConfirmModalOpen(true);
                }}
                disabled={isSyncing}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : `Sincronizar Histórico (${students.length} Aprendices)`}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sync Status Banner */}
      {lastSyncStatus && (
        <div className={`mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs ${
          lastSyncStatus.type === 'success' ? 'text-emerald-700 dark:text-emerald-400' :
          lastSyncStatus.type === 'error' ? 'text-rose-600 dark:text-rose-400' :
          'text-slate-600 dark:text-slate-400'
        }`}>
          <div className="flex items-center gap-2">
            {lastSyncStatus.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
            {lastSyncStatus.type === 'error' && <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{lastSyncStatus.message}</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            {lastSyncStatus.time}
          </span>
        </div>
      )}

      {/* MANDATORY CONFIRMATION MODAL FOR WORKSPACE MUTATIONS */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-2xl shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  ¿Confirmar Sincronización en Google Drive?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Esta acción actualizará la hoja de cálculo <strong>"SENA - Control de Inducción de Aprendices FPI"</strong> con los datos de <strong>{students.length} aprendices</strong> actualmente registrados en la plataforma.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Campos a sincronizar:</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                • Documento, Nombre y Ficha de Caracterización<br />
                • Consentimiento expreso Ley 1581 de 2012 (Habeas Data)<br />
                • Porcentaje de avance de inducción y módulos aprobados<br />
                • Calificación de la prueba de apropiación y constancia oficial
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeConfirmedAction}
                className="px-5 py-2 text-xs font-bold bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Confirmar y Sincronizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
