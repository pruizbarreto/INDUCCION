# Plan de Implementación: Sincronización en Tiempo Real con Google Drive y Google Sheets

Este plan describe la arquitectura y los pasos técnicos para crear automáticamente un libro de cálculo en el Google Drive del instructor y sincronizar en tiempo real el registro, progreso de módulos y resultados de la evaluación interactiva de los aprendices del SENA.

---

## 1. Arquitectura y Flujo de Autenticación (Google Workspace OAuth)

### 1.1 Configuración OAuth Client-Side
- Se utilizará la herramienta oficial `set_up_oauth` configurando los alcances estrictamente necesarios para Google Sheets y Google Drive:
  - `https://www.googleapis.com/auth/spreadsheets`: Para crear, formatear y actualizar filas y celdas.
  - `https://www.googleapis.com/auth/drive.file`: Para crear el archivo en la unidad del instructor y obtener su enlace permanente con los permisos adecuados.
- **Flujo de Seguridad**:
  - No se manejan claves secretas en el frontend.
  - El token de acceso se gestiona de forma segura a través de Google Identity Services (GIS) / Token Client en el navegador del instructor.
  - El instructor autoriza su cuenta directamente desde el **Panel del Instructor**.

---

## 2. Estructura y Diseño Institucional del Libro de Cálculo

### 2.1 Metadatos y Estilo SENA
- **Nombre del Documento**: `SENA - Control de Inducción de Aprendices - [Regional / Centro]`
- **Identidad Visual**:
  - Encabezado con color verde institucional SENA (`#39A900`), texto blanco en negrita (`#FFFFFF`).
  - Primera fila congelada (*Freeze Row 1*) para facilitar la navegación con muchos registros.
  - Formato condicional automático en la columna de estado:
    - Verde claro para aprendices con evaluación aprobada (≥ 80%).
    - Amarillo/naranja para aprendices con plan de mejoramiento pedagógico GFPI-F-023 (< 80%).
    - Azul claro para aprendices en curso.

### 2.2 Columnas de la Hoja Unificada
| Columna | Nombre de Campo | Descripción |
| :---: | :--- | :--- |
| **A** | `ID Aprendiz` | Identificador único del sistema |
| **B** | `Tipo Documento` | CC, TI, CE, PEP, PPT |
| **C** | `Número Documento` | Número de identificación validado |
| **D** | `Nombres y Apellidos` | Nombre completo del aprendiz |
| **E** | `Correo Electrónico` | Correo institucional o personal registrado |
| **F** | `Ficha de Formación` | Número de ficha (cohorte) |
| **G** | `Regional / Centro` | Regional y Centro de Formación |
| **H** | `Consentimiento Ley 1581` | Auditoría Habeas Data (Aceptado + Fecha y Hora exacta) |
| **I** | `Fecha y Hora Registro` | Timestamp ISO / Hora local colombiana |
| **J** | `Progreso Inducción (%)` | Porcentaje de avance (0% a 100%) |
| **K** | `Módulos Completados` | Lista de módulos completados (Identidad, Derechos/Deberes, Modelo, Bienestar) |
| **L** | `Puntaje Evaluación` | Calificación numérica (0 a 100 puntos) |
| **M** | `Estado Evaluación` | APROBADO (≥80%) / PLAN DE MEJORAMIENTO (<80%) / PENDIENTE |
| **N** | `Intentos Evaluación` | Número de intentos realizados en la prueba |
| **O** | `Última Sincronización` | Marca temporal de la última actualización en vivo |

---

## 3. Mecanismo de Sincronización en Tiempo Real

### 3.1 Puntos de Disparo de Eventos (Event Hooks)
1. **Evento de Registro de Aprendiz (`POST /api/apprentices/register`)**:
   - Inserción de una nueva fila en Google Sheets con los datos biográficos, ficha, consentimiento legal y estado inicial (`Progreso: 0%`, `Evaluación: Pendiente`).
2. **Evento de Avance de Módulo (`PUT /api/apprentices/:id/progress`)**:
   - Búsqueda de la fila del aprendiz por su tipo y número de documento (para evitar duplicados).
   - Actualización en vivo de las columnas `Progreso Inducción (%)`, `Módulos Completados` y `Última Sincronización`.
3. **Evento de Finalización de Evaluación (`POST /api/apprentices/:id/exam`)**:
   - Actualización inmediata de `Puntaje Evaluación`, `Estado Evaluación` (con indicación de aprobación o plan de mejoramiento GFPI-F-023) y `Intentos Evaluación`.

### 3.2 Resiliencia y Manejo de Cola de Sincronización (Sync Queue)
- Implementación de un gestor de cola local (`SyncQueue`): Si el navegador del aprendiz o instructor experimenta microcortes de red, las peticiones de actualización a la API de Google Sheets se encolan y se reintentan exponencialmente con retroceso (*exponential backoff*).
- Validación de idempotencia: Toda actualización busca la celda correspondiente mediante coincidencia de número de documento, garantizando que no se generen filas duplicadas por reintentos.

---

## 4. Experiencia de Usuario en el Panel del Instructor

- **Módulo de Vinculación con Google Workspace**:
  - Botón destacado: **"Vincular Google Drive"** con el logotipo oficial de Google.
  - Una vez vinculado:
    - Indicador de estado: **"Conectado a Google Drive"** con la cuenta activa.
    - Botón de acceso directo: **"Abrir Hoja de Control en Google Drive"** que abre el documento en una pestaña nueva.
    - Botón **"Sincronizar Histórico Completo"**: Permite exportar/sincronizar de una sola vez todos los aprendices previamente registrados en la base de datos local hacia la hoja de cálculo.
    - Indicador visual animado de sincronización en vivo cada vez que un aprendiz registra una respuesta o avance.

---

## 5. Fases de Ejecución

1. **Fase 1: Aprobación y Provisión de OAuth**:
   - Ejecutar `set_up_oauth` con `userConfirmedInUI: false` para solicitar autorización de los scopes de Google Drive y Sheets.
   - Detener la conversación para que el usuario acepte en la interfaz de AI Studio, y tras la confirmación, finalizar la provisión con `userConfirmedInUI: true`.
2. **Fase 2: Servicio Google Sheets & Drive (`src/services/googleSheetsService.ts`)**:
   - Crear el servicio cliente TypeScript con inicialización de gapi/GIS, creación de libro con diseño institucional SENA, formato de celdas, búsqueda de fila por documento y actualización de rangos.
3. **Fase 3: Integración en Componentes de Aprendiz y Servidor**:
   - Conectar los eventos de registro, avance de módulo y entrega de evaluación interactiva para emitir la sincronización hacia Google Sheets.
4. **Fase 4: Panel del Instructor y Auditoría**:
   - Integrar controles de Google Drive en `src/components/InstructorDashboard.tsx` (conectar, desconectar, abrir hoja, sincronización manual de contingencia).
5. **Fase 5: Validación y Pruebas**:
   - Ejecutar `compile_applet` y validar pruebas end-to-end simulando registro de aprendiz, resolución de preguntas del quiz y verificación de datos en la hoja.
