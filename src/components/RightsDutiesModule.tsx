import React, { useState, useMemo } from 'react';
import { RIGHTS_AND_DUTIES, REGULATION_CHAPTERS_009 } from '../data/inductionData';
import { RightOrDuty, RegulationChapter } from '../types/induction';
import { 
  ShieldCheck, 
  BookCheck, 
  AlertTriangle, 
  Search, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Info, 
  Layers,
  BookOpen,
  Scale,
  Award,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const RightsDutiesModule: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'derecho' | 'deber' | 'prohibicion'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Chapter Explorer State for Chapters I, IV, and V
  const [selectedChapterId, setSelectedChapterId] = useState<string>('cap-1');
  const activeChapter = REGULATION_CHAPTERS_009.find(c => c.id === selectedChapterId) || REGULATION_CHAPTERS_009[0];

  // Interactive mini-game: "Clasificador de Normativa"
  const challengeItems = useMemo(() => [
    {
      id: 'c1',
      scenario: 'Disponer de los talleres, laboratorios y herramientas especializadas para las prácticas formativas presenciales y virtuales.',
      correctType: 'derecho',
      explanation: 'Es un Derecho Académico (Art. 7). El SENA garantiza ambientes físicos y virtuales adecuados para la Formación Profesional Integral (Capítulo I y IV del Acuerdo 009 de 2024).'
    },
    {
      id: 'c2',
      scenario: 'Presentar soporte legal dentro de los 3 días hábiles siguientes tras una inasistencia a formación.',
      correctType: 'deber',
      explanation: 'Es un Deber de Permanencia (Capítulo IV). Dejar de justificar 3 días seguidos es causal de deserción y remisión a comité.'
    },
    {
      id: 'c3',
      scenario: 'Copiar código fuente o informes técnicos de un compañero sin citar o comprar proyectos formativos.',
      correctType: 'prohibicion',
      explanation: 'Es una Prohibición estricta tipificada como falta grave o gravísima contra la propiedad intelectual y la ética formativa (Capítulo V).'
    },
    {
      id: 'c4',
      scenario: 'Portar obligatoriamente las gafas de seguridad, botas y elementos de protección personal (EPP) en talleres.',
      correctType: 'deber',
      explanation: 'Es un Deber de Seguridad y Salud en el Trabajo para proteger la vida y la integridad física de la comunidad educativa (Capítulo I y V).'
    },
    {
      id: 'c5',
      scenario: 'Ser escuchado, presentar descargos, aportar pruebas y recurrir en segunda instancia antes de que se emita una sanción definitiva.',
      correctType: 'derecho',
      explanation: 'Es el Derecho Fundamental al Debido Proceso y a la Segunda Instancia (Capítulo V del Acuerdo 009 de 2024).'
    }
  ], []);

  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, { choice: string; isCorrect: boolean }>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const currentChallenge = challengeItems[activeChallengeIndex];

  const handleSelectChoice = (type: 'derecho' | 'deber' | 'prohibicion') => {
    const isCorrect = currentChallenge.correctType === type;
    setChallengeAnswers(prev => ({
      ...prev,
      [currentChallenge.id]: { choice: type, isCorrect }
    }));
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setShowExplanation(false);
    if (activeChallengeIndex < challengeItems.length - 1) {
      setActiveChallengeIndex(prev => prev + 1);
    } else {
      setActiveChallengeIndex(0);
    }
  };

  // Filtered list
  const filteredList = useMemo(() => {
    return RIGHTS_AND_DUTIES.filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.articleRef.toLowerCase().includes(query) ||
        item.practicalTip.toLowerCase().includes(query);

      return matchesType && matchesCategory && matchesSearch;
    });
  }, [filterType, filterCategory, searchQuery]);

  const getTypeBadge = (type: RightOrDuty['type']) => {
    switch (type) {
      case 'derecho':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Derecho
          </span>
        );
      case 'deber':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            <BookCheck className="w-3.5 h-3.5 text-blue-600" />
            Deber
          </span>
        );
      case 'prohibicion':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Prohibición
          </span>
        );
    }
  };

  return (
    <div className="space-y-12">
      {/* Visual Header */}
      <section className="relative overflow-hidden rounded-2xl bg-[#001C2B] text-white border border-slate-700 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-3 tracking-wide uppercase">
                <BookCheck className="w-4 h-4" />
                <span>Módulo 2 · Reglamento del Aprendiz (Acuerdo 009 de 2024 - Vigente)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Derechos, Deberes y Convivencia
              </h1>
              <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                El Reglamento del Aprendiz vigente (Acuerdo 009 de 2024) es la carta de navegación que garantiza un ambiente armónico, seguro, equitativo y respetuoso del debido proceso. Conoce a profundidad los <strong>Capítulos I, IV y V</strong> que rigen tu vida institucional desde el ingreso hasta tu certificación.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-700/80 mt-8 text-xs text-slate-300 flex flex-wrap items-center gap-4">
              <div>
                <span className="text-white font-bold">Norma Vigente:</span> Acuerdo 009 de 2024
              </div>
              <span className="text-slate-500">·</span>
              <div>
                <span className="text-white font-bold">Capítulos Esenciales:</span> I, IV y V
              </div>
              <span className="text-slate-500">·</span>
              <div>
                <span className="text-white font-bold">Garantías:</span> Doble Instancia y Debido Proceso
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/sena_rights_duties_cases_1793115108418.jpg"
              alt="Derechos y Deberes SENA"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001C2B]/90 via-[#001C2B]/20 to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* NEW: Capítulos Clave I, IV y V del Acuerdo 009 de 2024 */}
      <section className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Estructura Oficial del Reglamento Vigente</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Capítulos I, IV y V del Acuerdo 009 de 2024
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Explora los tres capítulos angulares que definen tu condición jurídica como aprendiz, los trámites de ingreso y permanencia, y las garantías del régimen disciplinario.
            </p>
          </div>

          <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 shrink-0 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Documento Oficial Vigente</span>
          </div>
        </div>

        {/* Chapter Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {REGULATION_CHAPTERS_009.map(chap => {
            const isSelected = selectedChapterId === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => setSelectedChapterId(chap.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/60 shadow-sm ring-1 ring-emerald-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-mono font-bold uppercase ${
                      isSelected ? 'text-[#39A900]' : 'text-slate-500'
                    }`}>
                      {chap.chapterNumber}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {chap.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {chap.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Deep Dive */}
        <div className="p-6 lg:p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                {activeChapter.chapterNumber} · Acuerdo 009 de 2024
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                {activeChapter.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                {activeChapter.shortDesc}
              </p>
            </div>

            <div className="text-xs text-slate-500 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shrink-0">
              <span className="font-semibold text-slate-700">Ámbito de Aplicación: </span>
              {activeChapter.scope}
            </div>
          </div>

          {/* Key Articles Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Disposiciones y Artículos Clave del {activeChapter.chapterNumber}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeChapter.keyArticles.map((art, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900">
                        {art.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-7">
                      {art.description}
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-700">
                    <span className="font-semibold text-emerald-800">En la práctica del aprendiz: </span>
                    {art.practicalApplication}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Visual Diagram / Flow for Chapter IV & V */}
          {activeChapter.id === 'cap-5' && (
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Ruta Constitucional del Debido Proceso y Doble Instancia (Capítulo V)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 mx-auto rounded-full bg-[#00324D] text-white text-[10px] font-bold flex items-center justify-center mb-1">1</span>
                  <p className="font-bold text-slate-900">Notificación Formal</p>
                  <p className="text-[10px] text-slate-500 mt-1">Formulación clara de los hechos y cargos.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 mx-auto rounded-full bg-[#00324D] text-white text-[10px] font-bold flex items-center justify-center mb-1">2</span>
                  <p className="font-bold text-slate-900">Descargos y Pruebas</p>
                  <p className="text-[10px] text-slate-500 mt-1">Derecho de defensa por escrito o en audiencia.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 mx-auto rounded-full bg-[#00324D] text-white text-[10px] font-bold flex items-center justify-center mb-1">3</span>
                  <p className="font-bold text-slate-900">Comité de Evaluación</p>
                  <p className="text-[10px] text-slate-500 mt-1">Sesiona y emite concepto motivado.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="w-5 h-5 mx-auto rounded-full bg-[#00324D] text-white text-[10px] font-bold flex items-center justify-center mb-1">4</span>
                  <p className="font-bold text-slate-900">Resolución de Centro</p>
                  <p className="text-[10px] text-slate-500 mt-1">Subdirección adopta medida formativa o sanción.</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="w-5 h-5 mx-auto rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center mb-1">5</span>
                  <p className="font-bold text-emerald-950">Segunda Instancia</p>
                  <p className="text-[10px] text-emerald-800 mt-1">Recurso de apelación ante autoridad superior.</p>
                </div>
              </div>
            </div>
          )}

          {activeChapter.id === 'cap-4' && (
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Ciclo de Vida del Aprendiz: Ingreso, Permanencia y Certificación (Capítulo IV)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-emerald-700 font-bold block mb-1">1. Matrícula</span>
                  <p className="text-[11px] text-slate-600">Legalización formal con entrega de soportes y registro oficial.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-emerald-700 font-bold block mb-1">2. Permanencia</span>
                  <p className="text-[11px] text-slate-600">Participación continua y justificación de novedades en máx 3 días hábiles.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-emerald-700 font-bold block mb-1">3. Trámites</span>
                  <p className="text-[11px] text-slate-600">Traslados, aplazamientos justificados y retiro voluntario oportuno.</p>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800 font-bold block mb-1">4. Certificación</span>
                  <p className="text-[11px] text-emerald-950">Aprobación del 100% de etapas lectiva y productiva con paz y salvo.</p>
                </div>
              </div>
            </div>
          )}

          {/* Pedagogical Tip */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-950">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Recomendación Pedagógica de Inducción: </span>
              {activeChapter.pedagogicalTip}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Mini-Game / Self-Test: "Clasificador: ¿Derecho, Deber o Prohibición?" */}
      <section className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Gimnasio Normativo Rápido</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Desafío de Clasificación: ¿Derecho, Deber o Prohibición?
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Caso {activeChallengeIndex + 1} de {challengeItems.length}
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
          <p className="text-base text-slate-800 font-medium leading-relaxed">
            "{currentChallenge.scenario}"
          </p>
        </div>

        {/* Action Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => handleSelectChoice('derecho')}
            disabled={showExplanation}
            className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              challengeAnswers[currentChallenge.id]?.choice === 'derecho'
                ? challengeAnswers[currentChallenge.id]?.isCorrect
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-rose-100 border-rose-400 text-rose-900'
                : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Es un Derecho</span>
          </button>

          <button
            onClick={() => handleSelectChoice('deber')}
            disabled={showExplanation}
            className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              challengeAnswers[currentChallenge.id]?.choice === 'deber'
                ? challengeAnswers[currentChallenge.id]?.isCorrect
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-rose-100 border-rose-400 text-rose-900'
                : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-slate-800'
            }`}
          >
            <BookCheck className="w-4 h-4 text-blue-600" />
            <span>Es un Deber</span>
          </button>

          <button
            onClick={() => handleSelectChoice('prohibicion')}
            disabled={showExplanation}
            className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              challengeAnswers[currentChallenge.id]?.choice === 'prohibicion'
                ? challengeAnswers[currentChallenge.id]?.isCorrect
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-rose-100 border-rose-400 text-rose-900'
                : 'bg-white border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 text-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Es una Prohibición</span>
          </button>
        </div>

        {/* Immediate Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start justify-between gap-4 animate-in fade-in duration-200 ${
            challengeAnswers[currentChallenge.id]?.isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-start gap-2.5">
              {challengeAnswers[currentChallenge.id]?.isCorrect ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm mb-1">
                  {challengeAnswers[currentChallenge.id]?.isCorrect ? '¡Apropiación Correcta!' : '¡Refuerzo Normativo!'}
                </p>
                <p>{currentChallenge.explanation}</p>
              </div>
            </div>

            <button
              onClick={handleNextChallenge}
              className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>{activeChallengeIndex === challengeItems.length - 1 ? 'Reiniciar' : 'Siguiente'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* Explorador Filtrable de Normas y Artículos */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Compendio Normativo de Derechos y Deberes</h2>
            <p className="text-sm text-slate-500 mt-1">
              Listado articulado de derechos, deberes y prohibiciones en concordancia con el Acuerdo 009 de 2024.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por artículo o palabra..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-100 rounded-xl">
          {/* Filter Type Segmented Control */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({RIGHTS_AND_DUTIES.length})
            </button>
            <button
              onClick={() => setFilterType('derecho')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterType === 'derecho'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Derechos
            </button>
            <button
              onClick={() => setFilterType('deber')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterType === 'deber'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Deberes
            </button>
            <button
              onClick={() => setFilterType('prohibicion')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterType === 'prohibicion'
                  ? 'bg-rose-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prohibiciones
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Categoría:</span>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-white border border-slate-200 text-xs text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            >
              <option value="all">Todas las categorías</option>
              <option value="Academico">Académico</option>
              <option value="Disciplinario">Disciplinario</option>
              <option value="Convivencia">Convivencia</option>
              <option value="Seguridad">Seguridad y Salud (SST)</option>
            </select>
          </div>
        </div>

        {/* Norm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {getTypeBadge(item.type)}
                  <span className="text-xs text-slate-400 font-mono">
                    {item.articleRef}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Aplicación práctica: </span>
                {item.practicalTip}
              </div>
            </div>
          ))}

          {filteredList.length === 0 && (
            <div className="col-span-2 p-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No se encontraron artículos</p>
              <p className="text-xs text-slate-500 mt-1">Intenta con otro término o limpia los filtros.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trámites Académico-Administrativos (Novedades - Capítulo IV) */}
      <section className="bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-200">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-semibold text-[#00324D] uppercase tracking-wider">Capítulo IV · Novedades y Trámites</span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Gestión de Novedades del Aprendiz</h2>
          <p className="text-xs text-slate-600 mt-1">
            Situaciones administrativas reguladas en el Capítulo IV del Acuerdo 009 de 2024 que puedes tramitar formalmente a través del sistema Sofia Plus / Zajuna durante tu ciclo formativo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Traslado</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cambio de jornada, centro o programa afín, previa verificación de disponibilidad de cupo y justificación aprobada por comités.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Aplazamiento</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Suspensión temporal de estudios por motivos de fuerza mayor (salud, maternidad, servicio militar). Plazo máximo reglamentario: 6 meses (prorrogable).
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Reingreso</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solicitud formal para reanudar el proceso formativo tras un aplazamiento previo, sujeto a la vigencia del diseño curricular del programa.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Retiro Voluntario</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manifestación expresa del aprendiz de retirarse del programa. Si se hace oportunamente evita la sanción de inhabilidad de 6 meses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
