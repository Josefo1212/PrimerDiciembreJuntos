# Plan 003 — Calendario, fechas y progreso local

## Objetivo técnico y alcance

Implementar los RF-1 a RF-18 de `spec.md`: regla pura de desbloqueo, calendario accesible, guarda de acceso, vista provisional de sorpresa y persistencia de visitas con Dexie. Sin contenido editorial definitivo ni rutas no aprobadas.

## Estructura de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `package.json`, `pnpm-lock.yaml` | Dependencia `dexie`. |
| `src/features/calendar/types.ts` | `DayStatus`, constantes del calendario y tipos compartidos del feature. |
| `src/features/calendar/rules/dateRules.ts` | Reglas puras de identificador, desbloqueo y estado. |
| `src/features/calendar/rules/dateRules.check.ts` | Casos comprobables ejecutados con Node; sin dependencia de pruebas. |
| `src/features/calendar/components/DayCard.tsx` | Tarjeta de un día con estado accesible. |
| `src/features/calendar/components/CalendarGrid.tsx` | Cuadrícula de 31 tarjetas y progreso. |
| `src/features/calendar/CalendarView.tsx` | Vista de `/calendar`. |
| `src/features/surprises/SurpriseView.tsx` | Vista provisional de `/surprise/:dayId`; registra la visita. |
| `src/features/access/WelcomeView.tsx` | Añade el enlace «Abrir mi calendario». |
| `src/app/providers/RequireAccess.tsx` | Guarda de acceso con `<Navigate to="/" replace />`. |
| `src/app/providers/ProgressProvider.tsx` | Estado de visitas, estado del almacenamiento y degradación. |
| `src/shared/progress/context.ts` | Contexto de progreso. |
| `src/shared/progress/types.ts` | `DayProgressRecord` y `ProgressContextValue`. |
| `src/shared/progress/hooks/useProgress.ts` | Hook de consumo del progreso. |
| `src/database/db.ts` | Instancia de Dexie y esquema versionado. |
| `src/database/progress.ts` | Lectura y escritura encapsuladas de visitas. |
| `src/app/router.tsx` | Rutas `/calendar` y `/surprise/:dayId` protegidas. |

Los módulos CSS nuevos acompañan a su componente (`CalendarView.module.css`, `DayCard.module.css`, `SurpriseView.module.css`). No se crean `components/ui/`, `memories/`, `finale/` ni `data/` sin código real que los justifique.

## Modelo de datos y contratos

```ts
type DayStatus = 'locked' | 'available' | 'visited'

type DayProgressRecord = {
  dayId: number // 1..31, clave primaria
  firstVisit: string // ISO
  lastVisit: string // ISO
}

type StorageStatus = 'loading' | 'ready' | 'unavailable'

type ProgressContextValue = {
  visitedDayIds: ReadonlySet<number>
  storageStatus: StorageStatus
  markVisited: (dayId: number) => Promise<void>
}
```

- Dexie: `new Dexie('primerDiciembreJuntos')` con `db.version(1).stores({ dayProgress: 'dayId' })`.
- `getVisitedDayIds()` devuelve las claves primarias existentes.
- `registerDayVisit(dayId, now)` usa una transacción `rw`: si ya existe el registro, conserva `firstVisit` y reemplaza `lastVisit`.
- El proveedor carga las visitas al montarse. Si la carga o la escritura falla, fija `storageStatus` en `'unavailable'` y sigue manteniendo `visitedDayIds` en memoria.
- El estado calculado no se escribe en IndexedDB.

## Reglas puras

```ts
const isValidDayId = (value: unknown): value is number
const isDayUnlocked = (dayId: number, now: Date): boolean
const getDayStatus = (dayId: number, now: Date, visitedDayIds: ReadonlySet<number>): DayStatus
```

- `isDayUnlocked` compara la fecha local del dispositivo con diciembre de 2026: antes de ese mes devuelve `false`; después de diciembre devuelve `true`; dentro del mes compara `now.getDate() >= dayId`.
- `getDayStatus` devuelve `'locked'` si no está desbloqueado; si lo está, `'visited'` cuando el conjunto contiene el día y `'available'` en caso contrario.
- `isValidDayId` exige entero entre 1 y 31.
- Estas funciones no importan React, DOM, Dexie ni el router.

## Estrategia de persistencia y errores

- Las vistas no importan Dexie: solo consumen `useProgress`.
- `ProgressProvider` monta el estado en `'loading'`; tras la lectura pasa a `'ready'` o `'unavailable'`.
- Un único aviso visible cuando `storageStatus === 'unavailable'`: «No pudimos guardar tu progreso en este navegador. Lo que abras hoy solo durará hasta que cierres la página.». No se repite en cada tarjeta.
- Si falla una escritura, se añade el día al conjunto en memoria para que la sesión siga siendo coherente; no se muestra mensaje de guardado correcto.
- Borrar los datos del navegador se trata como base vacía: no se lanza error al usuario.
- Sin sincronización: la spec y la interfaz no prometen respaldo.

## Decisiones técnicas

- **Una sola spec** para calendario y persistencia: el estado «visitado» es visible en la cuadrícula y separarlo exigiría rehacerla. Alternativa descartada: dos specs independientes.
- **Estado derivado y no persistido:** evita que un cambio de fecha o un registro corrupto contradiga la regla de desbloqueo.
- **Context de progreso:** el día se marca en `SurpriseView` y debe reflejarse al volver a `/calendar`. Alternativa descartada: releer Dexie en cada vista, que duplicaría estados de carga y errores.
- **Sin estado «completado»:** no hay acción verificable aprobada. Añadirlo después es un cambio de spec, no un flag suelto.
- **Sin librería de pruebas:** Node 26 importa TypeScript directamente; un script de casos puros basta para esta regla y evita una dependencia nueva. Las operaciones de IndexedDB se validan en navegador.
- **Contenido provisional:** se mantiene el alcance visual y de interacción sin inventar cartas ni multimedia.

## Estrategia de pruebas y validación

- Reglas puras: ejecutar `dateRules.check.ts` con Node y comprobar los casos de la tabla de la spec.
- `pnpm lint` y `pnpm build` en las tareas con código.
- Chrome DevTools:
  - Acceso correcto → enlace del calendario → 31 tarjetas y progreso.
  - Día desbloqueado → sorpresa provisional → visita registrada → volver al calendario con el día marcado → recarga conserva la visita.
  - URL de día futuro y de identificador inválido.
  - Sin acceso: redirección a `/`.
  - IndexedDB no disponible: aviso único, calendario usable y visita solo en memoria.
  - Teclado, foco visible, móvil 390×844, escritorio, `prefers-reduced-motion` y `forced-colors`.
  - Lista de red sin XHR/fetch.
- No se afirmará que Vercel está validado: solo existe el rewrite de la Spec 002.

## Relación plan ↔ requisitos

| Parte del plan | RF cubiertos |
| --- | --- |
| Reglas puras y su script | RF-1, RF-2, RF-3, RF-4 |
| `CalendarView`, `CalendarGrid`, `DayCard` | RF-1, RF-11, RF-17 |
| `RequireAccess`, `router.tsx`, `WelcomeView` | RF-9, RF-10 |
| `SurpriseView` y reglas de identificador | RF-5, RF-6, RF-7, RF-8 |
| `db.ts`, `progress.ts`, `ProgressProvider` | RF-12, RF-13, RF-14, RF-18 |
| Ausencia de llamadas de red y de persistencia de estado/acceso | RF-15, RF-16 |
| Validación en navegador y scripts | Criterios de aceptación |
