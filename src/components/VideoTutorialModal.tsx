import React, { useEffect, useRef } from 'react';
import { X, Play, Video, Volume2, Maximize, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartInduction?: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen,
  onClose,
  onStartInduction
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on ESC key and pause video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Attempt autoplay if browser allows
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay policy might require user interaction, controls remain available
        });
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-tutorial-title"
      onClick={handleClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/95 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#39A900] to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 shrink-0">
              <Play className="w-5 h-5 fill-white translate-x-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Tutorial Multimedia
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">· SENA FPI</span>
              </div>
              <h2 id="video-tutorial-title" className="text-base sm:text-lg font-bold text-white leading-tight">
                Video Tutorial de Inducción
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Cerrar video tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/assets/aistudio/2026__11_51_80055e8f.mp4"
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full max-h-[62vh] aspect-video object-contain bg-black focus:outline-none"
          >
            Tu navegador no soporta la reproducción de video HTML5. Puedes acceder al video en la ruta institucional.
          </video>
        </div>

        {/* Modal Footer / Helpful Guidance */}
        <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-white">Controles disponibles:</strong> Reproducir/Pausar, barra de tiempo, volumen y pantalla completa.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {onStartInduction && (
              <button
                onClick={() => {
                  handleClose();
                  onStartInduction();
                }}
                className="px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white font-bold rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-sm"
              >
                <span>Comenzar Inducción</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium rounded-xl transition-colors cursor-pointer text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
