import React, { useState, useEffect, useRef } from 'react';
import { 
  SENA_MISSION, 
  SENA_VISION, 
  SENA_SYMBOLS, 
  HYMN_LYRICS, 
  INSTITUTIONAL_VALUES 
} from '../data/inductionData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  HeartHandshake, 
  Users, 
  Scale, 
  Compass, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const IdentityModule: React.FC = () => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [isPlayingHymn, setIsPlayingHymn] = useState<boolean>(false);
  const [activeHymnStanza, setActiveHymnStanza] = useState<number>(0);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Audio synthesizer ref
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeOscillatorsRef = useRef<OscillatorNode[]>([]);

  const selectedSymbol = SENA_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  // Notes sequence for celebratory institutional melody
  const hymnNotes = [
    { freq: 392.00, dur: 0.6 }, // G4
    { freq: 523.25, dur: 0.8 }, // C5
    { freq: 659.25, dur: 0.6 }, // E5
    { freq: 523.25, dur: 0.8 }, // C5
    { freq: 587.33, dur: 0.6 }, // D5
    { freq: 659.25, dur: 0.6 }, // E5
    { freq: 783.99, dur: 1.2 }, // G5
    { freq: 659.25, dur: 0.8 }, // E5
    { freq: 587.33, dur: 0.8 }, // D5
    { freq: 523.25, dur: 1.4 }, // C5
  ];

  const playTone = (freq: number, duration: number) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration - 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
      activeOscillatorsRef.current.push(osc);
    } catch {
      // Audio fallback silent
    }
  };

  const handleToggleHymn = () => {
    if (isPlayingHymn) {
      setIsPlayingHymn(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlayingHymn(true);
      playTone(523.25, 0.5);
    }
  };

  const handleResetHymn = () => {
    setIsPlayingHymn(false);
    setAudioProgress(0);
    setActiveHymnStanza(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Hymn loop ticker
  useEffect(() => {
    if (isPlayingHymn) {
      timerRef.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingHymn(false);
            return 0;
          }
          const next = prev + 1;
          const stanzaIndex = Math.min(
            Math.floor((next / 100) * HYMN_LYRICS.length),
            HYMN_LYRICS.length - 1
          );
          setActiveHymnStanza(stanzaIndex);

          // Trigger harmonic notes at intervals
          if (next % 10 === 0) {
            const noteIndex = Math.floor((next / 10) % hymnNotes.length);
            playTone(hymnNotes[noteIndex].freq, hymnNotes[noteIndex].dur);
          }
          return next;
        });
      }, 350);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingHymn, isMuted]);

  const getValueIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-emerald-600" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-emerald-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-[#00324D] text-white border border-slate-700 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-3 tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Módulo 1 · Conociendo Mi Institución</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Identidad, Mística y Valores SENA
              </h1>
              <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                El SENA es el lugar donde el talento de los colombianos se convierte en fuerza productiva y transformación social. Conoce nuestros pilares fundacionales, la heráldica institucional y los principios que guían a cada aprendiz.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-700/80 mt-8 text-xs text-slate-300">
              <div>
                <p className="text-xl font-bold font-mono text-emerald-400">1957</p>
                <p className="text-slate-400 mt-0.5">Año de fundación</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-white">33</p>
                <p className="text-slate-400 mt-0.5">Regionales en el país</p>
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-white">118</p>
                <p className="text-slate-400 mt-0.5">Centros de Formación</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/sena_symbols_identity_1793115108525.jpg"
              alt="Identidad y Símbolos del SENA"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00324D]/90 via-[#00324D]/30 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Misión y Visión Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
              <h2 className="text-xl font-bold text-slate-900">{SENA_MISSION.title}</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {SENA_MISSION.text}
            </p>
          </div>
          <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-950 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Propósito del Aprendiz:</strong> Aportar al aparato productivo de Colombia con excelencia técnica, ética inquebrantable y responsabilidad social.
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00324D]" />
              <h2 className="text-xl font-bold text-slate-900">{SENA_VISION.title}</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {SENA_VISION.text}
            </p>
          </div>
          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-lg text-xs text-sky-950 flex items-start gap-3">
            <Award className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <span>
              <strong>Visión de Futuro:</strong> Formación pertinente con enfoque en tecnologías 4.0, sostenibilidad ambiental y justicia económica.
            </span>
          </div>
        </div>
      </section>

      {/* Símbolos Institucionales Interactivos */}
      <section className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
            <div>
              <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">Heráldica e Imagen</span>
              <h2 className="text-2xl font-bold text-slate-900">Símbolos Institucionales del SENA</h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Selecciona cada símbolo para explorar sus elementos constitutivos y significado normativo.
            </p>
          </div>

          {/* Interactive Symbol Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 mt-6">
            {SENA_SYMBOLS.map(sym => (
              <button
                key={sym.id}
                onClick={() => setSelectedSymbolId(sym.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] whitespace-nowrap cursor-pointer ${
                  selectedSymbolId === sym.id
                    ? 'border-[#39A900] text-[#00324D] font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {sym.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Symbol Deep Dive */}
        {selectedSymbol.id !== 'himno' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-mono">{selectedSymbol.tag}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">{selectedSymbol.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedSymbol.fullMeaning}
              </p>

              {/* Graphic Representation */}
              <div className="h-48 bg-white rounded-lg border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                {selectedSymbol.id === 'escudo' && (
                  <div className="space-y-2">
                    <div className="w-24 h-24 mx-auto flex items-center justify-center">
                      <img
                        src="/src/assets/images/escudo_sena.png"
                        alt="Escudo Oficial del SENA"
                        className="w-full h-full object-contain drop-shadow-xs"
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Escudo Heráldico Oficial</p>
                    <p className="text-[11px] text-slate-500">Caduceo · Piñón · Café y Espigas</p>
                  </div>
                )}
                {selectedSymbol.id === 'bandera' && (
                  <div className="space-y-2">
                    <div className="w-28 h-18 mx-auto bg-white border-2 border-slate-300 shadow-sm flex items-center justify-center p-1.5 rounded-sm">
                      <img
                        src="/src/assets/images/escudo_sena.png"
                        alt="Escudo en Bandera SENA"
                        className="w-11 h-11 object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Lienzo Blanco de Paz</p>
                    <p className="text-[11px] text-slate-500">Paz, tranquilidad y el Escudo oficial centrado</p>
                  </div>
                )}
                {selectedSymbol.id === 'logosimbolo' && (
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-slate-200 p-2 shadow-xs flex items-center justify-center">
                      <SenaLogo variant="green" className="w-14 h-14" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">El Ser Humano en Evolución</p>
                    <p className="text-[11px] text-slate-500">Sendero ascendente hacia el conocimiento</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Desglose de Elementos Clave
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {selectedSymbol.elements.map((el, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900">{el.name}</h5>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-7">
                      {el.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Himno del SENA Interactive Player */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-xl border border-slate-800 space-y-6">
              <div>
                <span className="text-xs text-emerald-400 font-mono">Letra: Luis Alfredo Sánchez</span>
                <h3 className="text-xl font-bold text-white mt-1">Reproductor Cívico del Himno</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Música: Daniel Marlez. Canto institucional entonado en ceremonias y actos oficiales.
                </p>
              </div>

              {/* Player UI */}
              <div className="bg-slate-800/80 p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Progreso: {audioProgress}%</span>
                  <span>{isPlayingHymn ? 'Reproduciendo fanfarria...' : 'En pausa'}</span>
                </div>

                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#39A900] h-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleHymn}
                      className="px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isPlayingHymn ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlayingHymn ? 'Pausar Himno' : 'Reproducir'}</span>
                    </button>
                    <button
                      onClick={handleResetHymn}
                      className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Reiniciar Himno"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 p-3 bg-slate-800/50 rounded-lg border border-slate-700/60 leading-relaxed">
                💡 <em>Dato Histórico:</em> El himno se canta con postura de respeto y fervor cívico. Durante la inducción, los aprendices aprenden a reconocer en su letra el llamado al trabajo digno y al amor patrio.
              </div>
            </div>

            {/* Lyrics Karaoke / Display */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Letra Oficial Completa
                </h4>
                <span className="text-xs text-emerald-700 font-medium">
                  {isPlayingHymn ? `Entonando: ${HYMN_LYRICS[activeHymnStanza]?.section}` : 'Lectura guiada'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HYMN_LYRICS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isPlayingHymn && activeHymnStanza === idx
                        ? 'border-[#39A900] bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${
                      isPlayingHymn && activeHymnStanza === idx ? 'text-[#39A900]' : 'text-slate-400'
                    }`}>
                      {item.section}
                    </span>
                    <pre className="font-sans text-xs text-slate-700 leading-relaxed whitespace-pre-line mt-2 font-medium">
                      {item.text}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Principios y Valores Institucionales */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">Cultura Formativa</span>
          <h2 className="text-2xl font-bold text-slate-900">Valores Institucionales del Aprendiz</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            La formación en el SENA es integral: combina el dominio de habilidades técnicas con una sólida estatura moral y ciudadana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INSTITUTIONAL_VALUES.map(val => (
            <div 
              key={val.id}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                  {getValueIcon(val.iconName)}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{val.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {val.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-semibold text-emerald-800">En la cotidianidad SENA: </span>
                {val.exampleInSena}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
