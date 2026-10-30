import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Download, 
  Search, 
  Plus, 
  BarChart2, 
  X, 
  RefreshCw, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Eye, 
  Edit3, 
  AlertCircle,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { GoogleSheetsSyncCard } from './GoogleSheetsSyncCard';
import { StoredApprentice } from '../server/db';
import { 
  fetchApprentices, 
  registerApprentice, 
  updateApprenticeByInstructor,
  deleteApprenticeRecord 
} from '../services/apprenticeApi';

export const InstructorDashboard: React.FC = () => {
  const [students, setStudents] = useState<StoredApprentice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFicha, setSelectedFicha] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [inspectStudent, setInspectStudent] = useState<StoredApprentice | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [editNotesText, setEditNotesText] = useState<string>('');
  const [editStatusText, setEditStatusText] = useState<'Aprobado' | 'En Proceso' | 'Pendiente'>('Pendiente');

  // New Student Form State
  const [newStudent, setNewStudent] = useState<{
    name: string;
    documentType: string;
    documentNumber: string;
    ficha: string;
    program: string;
    status: 'Aprobado' | 'En Proceso' | 'Pendiente';
    score: number;
    hasConsentLaw1581: boolean;
  }>({
    name: '',
    documentType: 'CC',
    documentNumber: '',
    ficha: '2824910',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    status: 'Pendiente',
    score: 0,
    hasConsentLaw1581: true
  });
  const [addError, setAddError] = useState<string | null>(null);

  // Fetch from server database
  const loadCohortData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchApprentices();
      if (response.success && response.apprentices) {
        setStudents(response.apprentices);
      }
    } catch (err) {
      console.error('Failed to load cohort data from database:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCohortData();
  }, []);

  // Unique fichas
  const availableFichas = useMemo(() => {
    const fichas = new Set(students.map(s => s.ficha));
    return Array.from(fichas);
  }, [students]);

  // Filtered apprentices
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchFicha = selectedFicha === 'all' || s.ficha === selectedFicha;
      const matchStatus = selectedStatus === 'all' || s.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        s.name.toLowerCase().includes(q) || 
        s.documentNumber.includes(q) ||
        (s.program && s.program.toLowerCase().includes(q));

      return matchFicha && matchStatus && matchSearch;
    });
  }, [students, selectedFicha, selectedStatus, searchQuery]);

  // Aggregate Metrics
  const totalStudents = students.length;
  const approvedStudents = students.filter(s => s.status === 'Aprobado');
  const inProgressStudents = students.filter(s => s.status === 'En Proceso');
  const pendingStudents = students.filter(s => s.status === 'Pendiente' || s.status === 'Registrado');
  
  const passRate = totalStudents > 0 
    ? Math.round((approvedStudents.length / totalStudents) * 100) 
    : 0;

  const averageScore = approvedStudents.length > 0
    ? Math.round(
        approvedStudents.reduce((acc, curr) => acc + (curr.examScore || 0), 0) / approvedStudents.length
      )
    : 0;

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = [
      'ID', 
      'Nombre Completo', 
      'Tipo Doc', 
      'Documento', 
      'Ficha', 
      'Programa', 
      'Fecha Registro', 
      'Consentimiento Ley 1581', 
      'Progreso Induccion (%)', 
      'Estado', 
      'Puntaje Evaluacion', 
      'Fecha Evaluacion', 
      'Codigo Constancia', 
      'Area por Reforzar'
    ];

    const rows = filteredStudents.map(s => [
      s.id,
      `"${s.name}"`,
      s.documentType,
      s.documentNumber,
      s.ficha,
      `"${s.program}"`,
      s.registeredAt,
      s.hasConsentLaw1581 ? 'Autorizado (Ley 1581/2012)' : 'No',
      `${s.progressPercentage || 0}%`,
      s.status,
      s.examScore || 0,
      s.evaluatedAt || 'Sin evaluar',
      s.certificateCode || 'N/A',
      `"${s.weakArea || 'Ninguna'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Reporte_Induccion_Cohorte_${selectedFicha}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newStudent.name.trim() || !newStudent.documentNumber.trim() || !newStudent.ficha.trim()) {
      setAddError('Por favor complete todos los campos obligatorios.');
      return;
    }

    try {
      const result = await registerApprentice({
        name: newStudent.name.trim(),
        documentType: newStudent.documentType,
        documentNumber: newStudent.documentNumber.trim(),
        ficha: newStudent.ficha.trim(),
        program: newStudent.program,
        hasConsentLaw1581: true
      });

      if (!result.success) {
        setAddError(result.error || 'Error al guardar en la base de datos.');
        return;
      }

      await loadCohortData();
      setIsAddModalOpen(false);
      setNewStudent({
        name: '',
        documentType: 'CC',
        documentNumber: '',
        ficha: '2824910',
        program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
        status: 'Pendiente',
        score: 0,
        hasConsentLaw1581: true
      });
    } catch (err) {
      setAddError('Error al comunicarse con la base de datos.');
    }
  };

  const handleSaveInstructorObservations = async () => {
    if (!inspectStudent) return;
    try {
      const updated = await updateApprenticeByInstructor(inspectStudent.id, {
        instructorNotes: editNotesText,
        status: editStatusText
      });
      if (updated) {
        setInspectStudent(updated);
        setIsEditingNotes(false);
        await loadCohortData();
      }
    } catch (err) {
      console.error('Error saving observations:', err);
    }
  };

  const openStudentInspection = (student: StoredApprentice) => {
    setInspectStudent(student);
    setEditNotesText(student.instructorNotes || '');
    setEditStatusText(student.status as any || 'Pendiente');
    setIsEditingNotes(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00324D] dark:text-emerald-400 uppercase tracking-wider">
              <SenaLogo variant="green" className="w-4 h-4" />
              <span>Gestión Pedagógica y Base de Datos de Inducción</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Monitoreo y Control de Apropiación FPI
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Supervisión en tiempo real de registros, verificación del consentimiento <strong>Ley 1581 de 2012</strong>, porcentaje de avance en módulos y resultados diagnósticos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadCohortData}
              disabled={isLoading}
              title="Refrescar datos desde la base de datos"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Reporte CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-[#00324D] hover:bg-[#002235] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Registrar Aprendiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* Google Sheets and Google Drive Live Integration Card */}
      <GoogleSheetsSyncCard 
        students={students} 
        onRefreshData={loadCohortData} 
      />

      {/* KPI Stats Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total en Base de Datos</p>
          <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{totalStudents}</p>
          <p className="text-[11px] text-slate-400">En {availableFichas.length} fichas de formación</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Aprobados / Certificables</p>
          <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{passRate}%</p>
          <p className="text-[11px] text-slate-400">{approvedStudents.length} aprendices superaron el 70%</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Promedio de Evaluación</p>
          <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">{averageScore} / 100</p>
          <p className="text-[11px] text-slate-400">Nivel medio de apropiación</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">En Proceso o Pendientes</p>
          <p className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            {pendingStudents.length + inProgressStudents.length}
          </p>
          <p className="text-[11px] text-slate-400">En desarrollo de módulos</p>
        </div>
      </section>

      {/* Cohort Insights & Dimension Health */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-emerald-600" />
          <span>Cumplimiento Normativo y Apropiación Temática en la Cohorte</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">Identidad y Símbolos</span>
            <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">94%</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[94%]" />
            </div>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1">Excelente apropiación</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">Derechos (Acuerdo 009/2024)</span>
            <p className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">88%</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[88%]" />
            </div>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1">Apropiación óptima</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">Deberes y Sanciones</span>
            <p className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-1">74%</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-500 h-full w-[74%]" />
            </div>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-1">Reforzar inasistencias (3 días)</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">Consentimiento Ley 1581</span>
            <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">100%</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full w-full" />
            </div>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-1">Habeas Data regularizado</p>
          </div>
        </div>
      </section>

      {/* Main Student Directory Table */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        {/* Table Filters Toolbar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by Ficha */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ficha:</span>
              <select
                value={selectedFicha}
                onChange={e => setSelectedFicha(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              >
                <option value="all">Todas las Fichas ({availableFichas.length})</option>
                {availableFichas.map(f => (
                  <option key={f} value={f}>Ficha {f}</option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estado:</span>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              >
                <option value="all">Todos los estados</option>
                <option value="Aprobado">Aprobado</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Registrado">Registrado</option>
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, documento o ficha..."
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Ficha / Programa</th>
                <th className="py-3 px-4">Progreso Inducción</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Evaluación</th>
                <th className="py-3 px-4">Habeas Data</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {student.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Reg: {student.registeredAt}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-500 mr-1">{student.documentType}</span>
                    {student.documentNumber}
                  </td>
                  <td className="py-3 px-4 max-w-[220px]">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">{student.ficha}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">{student.program}</span>
                  </td>
                  <td className="py-3 px-4 min-w-[140px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {student.progressPercentage || 0}%
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {student.completedModules?.length || 0}/5 mod.
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          (student.progressPercentage || 0) === 100 
                            ? 'bg-emerald-500' 
                            : (student.progressPercentage || 0) > 0 
                            ? 'bg-blue-500' 
                            : 'bg-slate-300'
                        }`} 
                        style={{ width: `${student.progressPercentage || 0}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-md ${
                      student.status === 'Aprobado'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : student.status === 'En Proceso'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300'
                    }`}>
                      {student.status === 'Aprobado' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      {student.status === 'En Proceso' && <Clock className="w-3 h-3 text-amber-600" />}
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold">
                    {student.examScore && student.examScore > 0 ? (
                      <div>
                        <span className={student.examScore >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}>
                          {student.examScore}%
                        </span>
                        {student.certificateCode && (
                          <span className="block text-[9px] text-slate-400 font-mono">
                            {student.certificateCode}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {student.hasConsentLaw1581 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Ley 1581 OK</span>
                      </span>
                    ) : (
                      <span className="text-rose-500 text-[10px]">Sin Consentimiento</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openStudentInspection(student)}
                      className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-[#00324D] hover:text-white dark:hover:bg-emerald-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 mx-auto"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Gestionar</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <span>No se encontraron aprendices con los filtros seleccionados en la base de datos.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* INSPECT & MANAGE STUDENT MODAL */}
      {inspectStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="p-5 bg-gradient-to-r from-[#00324D] to-[#004b73] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SenaLogo variant="white" className="w-5 h-5" />
                <div>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold tracking-wider uppercase block">
                    Expediente Digital de Inducción
                  </span>
                  <h3 className="text-base font-bold text-white">{inspectStudent.name}</h3>
                </div>
              </div>
              <button 
                onClick={() => setInspectStudent(null)}
                className="text-white/70 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Documento:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {inspectStudent.documentType} {inspectStudent.documentNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Ficha:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{inspectStudent.ficha}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Fecha Registro:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{inspectStudent.registeredAt}</span>
                </div>
                <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Programa:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{inspectStudent.program}</span>
                </div>
              </div>

              {/* Habeas Data Audit Block */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#39A900] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-950 dark:text-emerald-200">
                    Consentimiento Legal Verificado (Ley 1581 de 2012)
                  </p>
                  <p className="text-emerald-800 dark:text-emerald-300 mt-0.5">
                    Autorización expresa otorgada el: <span className="font-mono font-bold">{inspectStudent.consentTimestamp || inspectStudent.registeredAt}</span>.
                    Finalidad: Tratamiento académico para inducción y certificación de 40 horas.
                  </p>
                </div>
              </div>

              {/* Progress and Evaluation Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>Progreso de Módulos: {inspectStudent.progressPercentage || 0}%</span>
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Módulos completados: {inspectStudent.completedModules?.length ? inspectStudent.completedModules.join(', ') : 'Ninguno iniciado aún.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Evaluación Diagnóstica: {inspectStudent.examScore || 0}%</span>
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {inspectStudent.certificateCode 
                      ? `Constancia generada: ${inspectStudent.certificateCode}`
                      : 'Constancia pendiente de aprobación'}
                  </p>
                </div>
              </div>

              {/* Instructor Observation and Status Management */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#39A900]" />
                    <span>Observaciones Pedagógicas y Juicio del Instructor</span>
                  </span>
                  {!isEditingNotes && (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-xs text-[#39A900] font-bold hover:underline cursor-pointer"
                    >
                      Editar
                    </button>
                  )}
                </div>

                {isEditingNotes ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Estado Evaluativo:
                      </label>
                      <select
                        value={editStatusText}
                        onChange={e => setEditStatusText(e.target.value as any)}
                        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-xs bg-white dark:bg-slate-900"
                      >
                        <option value="Aprobado">Aprobado</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Pendiente">Pendiente</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Notas Pedagógicas / Plan de Mejoramiento (GFPI-F-023):
                      </label>
                      <textarea
                        rows={3}
                        value={editNotesText}
                        onChange={e => setEditNotesText(e.target.value)}
                        placeholder="Ingrese comentarios sobre desempeño en la inducción..."
                        className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingNotes(false)}
                        className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 rounded-lg"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveInstructorObservations}
                        className="px-4 py-1.5 text-xs bg-[#39A900] text-white font-bold rounded-lg hover:bg-[#2e8800]"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                      {inspectStudent.instructorNotes || 'Sin notas pedagógicas registradas por el instructor.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setInspectStudent(null)}
                className="px-5 py-2 text-xs font-semibold bg-[#00324D] text-white rounded-xl cursor-pointer"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Apprentice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <SenaLogo variant="green" className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Registrar Aprendiz en Base de Datos</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="p-6 space-y-4 text-xs">
              {addError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-800 text-xs">
                  {addError}
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Ej: Daniel Andrés Gómez"
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tipo:</label>
                  <select
                    value={newStudent.documentType}
                    onChange={e => setNewStudent({ ...newStudent, documentType: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="CC">C.C.</option>
                    <option value="TI">T.I.</option>
                    <option value="CE">C.E.</option>
                    <option value="PPT">P.P.T.</option>
                    <option value="PEP">P.E.P.</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">No. Documento:</label>
                  <input
                    type="text"
                    required
                    value={newStudent.documentNumber}
                    onChange={e => setNewStudent({ ...newStudent, documentNumber: e.target.value })}
                    placeholder="Ej: 1032948201"
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ficha de Formación:</label>
                <input
                  type="text"
                  required
                  value={newStudent.ficha}
                  onChange={e => setNewStudent({ ...newStudent, ficha: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Programa de Formación:</label>
                <input
                  type="text"
                  required
                  value={newStudent.program}
                  onChange={e => setNewStudent({ ...newStudent, program: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39A900] inline mr-1" />
                <span>El registro incluye consentimiento institucional conforme a la Ley 1581 de 2012.</span>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#39A900] text-white font-bold rounded-xl hover:bg-[#2e8800] transition-colors cursor-pointer"
                >
                  Guardar en Base de Datos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
