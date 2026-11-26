# Tareas 003 — Calendario, fechas y progreso local

- [x] **T1. Instalar `dexie` y verificar el lockfile.** RF-12.
  - Hecho cuando: `package.json` declara `dexie`, `pnpm-lock.yaml` está actualizado y `pnpm build` termina correctamente.
  - **Resultado:** `dexie@4.4.7` instalado; build correcto. Sin cambios de código todavía.

- [x] **T2. Implementar y comprobar las reglas puras de fecha y estado.** RF-1, RF-2, RF-3, RF-4.
  - Hecho cuando: `dateRules.ts` expone `isValidDayId`, `isDayUnlocked` y `getDayStatus` sin React ni DOM; el script de casos con Node comprueba 30/11, 1/12, 5/12, 31/12, 1/1/2027, identificadores inválidos y día visitado; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** 22/22 casos correctos con Node 26; `parseDayId` añadido para la ruta; lint y build correctos.

- [x] **T3. Definir el esquema de Dexie y encapsular el acceso a IndexedDB.** RF-12, RF-6.
  - Hecho cuando: `db.ts` declara la versión 1 con `dayProgress: 'dayId'`; `progress.ts` expone lectura de visitas y registro de visita con transacción que conserva `firstVisit`; ninguna vista importa Dexie; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `shared/progress/types.ts`, `database/db.ts` y `database/progress.ts`. Comprobado con búsqueda que ninguna vista ni componente importa Dexie.

- [x] **T4. Crear el proveedor de progreso con estado degradado.** RF-13, RF-14, RF-18.
  - Hecho cuando: `ProgressProvider` expone `visitedDayIds`, `storageStatus` y `markVisited`; carga al montar; si falla, mantiene visitas en memoria y no afirma que se guardó; `pnpm lint`, `pnpm build` y la comprobación en navegador terminan correctamente.
  - **Resultado:** `ProgressContext`, `useProgress` y `ProgressProvider` montados desde `App.tsx`. En Chrome DevTools se creó la base `primerDiciembreJuntos` sin errores de consola; la visita real y la degradación se comprueban en T7 y T8.

- [x] **T5. Construir el calendario accesible de 31 días.** RF-1, RF-11, RF-17.
  - Hecho cuando: `/calendar` muestra 31 tarjetas con número, estado por texto/forma/color y progreso «N de 31 días visitados»; navegación por teclado, foco visible y `prefers-reduced-motion` verificados; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `CalendarView`, `CalendarGrid` y `DayCard` con módulos CSS. Se registra `/calendar` en el router para poder validarlo; T6 añadirá la guarda. Con la fecha real (26/11) hay 31 tarjetas bloqueadas, sin enlaces en los días futuros y progreso «0 de 31 días visitados». `Tab` llega directamente a «Volver al inicio». Movimiento reducido se revisa en T8.

- [x] **T6. Añadir rutas protegidas y el enlace desde la bienvenida.** RF-9, RF-10.
  - Hecho cuando: `/calendar` y `/surprise/:dayId` están tras `RequireAccess`; sin acceso redirigen a `/`; con acceso válido la bienvenida ofrece «Abrir mi calendario» sin navegar automáticamente; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `RequireAccess` aplicado a `/calendar` y a `/surprise/:dayId`. Sin acceso, ambas rutas redirigen a `/`. Con fecha simulada 5/12 y código válido, el enlace de bienvenida lleva al calendario y muestra 5 días disponibles y 26 bloqueados, sin navegación automática.

- [x] **T7. Crear la vista provisional de sorpresa y registrar la visita.** RF-5, RF-6, RF-7, RF-8.
  - Hecho cuando: un día desbloqueado muestra contenido provisional e incrementa el progreso; reabrirlo conserva `firstVisit`; un día futuro redirige a `/calendar` sin registrar visita; un identificador inválido muestra la no encontrada; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `SurpriseView` protegida en el router. Con fecha simulada, el día 1 se registra (`firstVisit` 5/12, `lastVisit` 6/12 al reabrir) y el calendario pasa a «1 de 31 días visitados». `/surprise/9` redirige al calendario sin registro; `/surprise/32` muestra la no encontrada; sin acceso, `/surprise/1` redirige a `/`. La recarga conserva la visita.

- [x] **T8. Validar la spec completa y cerrarla.** Criterios de aceptación.
  - Hecho cuando: se comprueban reglas con Node, acceso y calendario, persistencia y recarga, almacenamiento no disponible, redirecciones, teclado y foco, móvil y escritorio, movimiento reducido, `forced-colors` y ausencia de XHR/fetch; `pnpm lint` y `pnpm build` terminan correctamente; `spec.md`, `AGENTS.md` y `bitacora.md` quedan actualizados.
  - **Resultado:** 22/22 reglas con Node; lint y build correctos; sin `function`, `var` ni `any`. En navegador: acceso, calendario, visita y recarga; `/surprise/9` redirige, `/surprise/32` no encontrada y sin acceso vuelve a `/`. Con `indexedDB.open` bloqueado temporalmente aparece un único aviso y la visita vive solo en la sesión; el parche temporal se retiró. Móvil 390×844 con 4 columnas, escritorio 1280×800 con 8, movimiento reducido sin transición, `forced-colors` con outline sólido de 2px y clases CSS con hash; sin XHR/fetch.
