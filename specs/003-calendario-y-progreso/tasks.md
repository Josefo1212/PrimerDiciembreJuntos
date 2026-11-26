# Tareas 003 — Calendario, fechas y progreso local

- [x] **T1. Instalar `dexie` y verificar el lockfile.** RF-12.
  - Hecho cuando: `package.json` declara `dexie`, `pnpm-lock.yaml` está actualizado y `pnpm build` termina correctamente.
  - **Resultado:** `dexie@4.4.7` instalado; build correcto. Sin cambios de código todavía.

- [ ] **T2. Implementar y comprobar las reglas puras de fecha y estado.** RF-1, RF-2, RF-3, RF-4.
  - Hecho cuando: `dateRules.ts` expone `isValidDayId`, `isDayUnlocked` y `getDayStatus` sin React ni DOM; el script de casos con Node comprueba 30/11, 1/12, 5/12, 31/12, 1/1/2027, identificadores inválidos y día visitado; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T3. Definir el esquema de Dexie y encapsular el acceso a IndexedDB.** RF-12, RF-6.
  - Hecho cuando: `db.ts` declara la versión 1 con `dayProgress: 'dayId'`; `progress.ts` expone lectura de visitas y registro de visita con transacción que conserva `firstVisit`; ninguna vista importa Dexie; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T4. Crear el proveedor de progreso con estado degradado.** RF-13, RF-14, RF-18.
  - Hecho cuando: `ProgressProvider` expone `visitedDayIds`, `storageStatus` y `markVisited`; carga al montar; si falla, mantiene visitas en memoria y no afirma que se guardó; `pnpm lint`, `pnpm build` y la comprobación en navegador terminan correctamente.

- [ ] **T5. Construir el calendario accesible de 31 días.** RF-1, RF-11, RF-17.
  - Hecho cuando: `/calendar` muestra 31 tarjetas con número, estado por texto/forma/color y progreso «N de 31 días visitados»; navegación por teclado, foco visible y `prefers-reduced-motion` verificados; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T6. Añadir rutas protegidas y el enlace desde la bienvenida.** RF-9, RF-10.
  - Hecho cuando: `/calendar` y `/surprise/:dayId` están tras `RequireAccess`; sin acceso redirigen a `/`; con acceso válido la bienvenida ofrece «Abrir mi calendario» sin navegar automáticamente; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T7. Crear la vista provisional de sorpresa y registrar la visita.** RF-5, RF-6, RF-7, RF-8.
  - Hecho cuando: un día desbloqueado muestra contenido provisional e incrementa el progreso; reabrirlo conserva `firstVisit`; un día futuro redirige a `/calendar` sin registrar visita; un identificador inválido muestra la no encontrada; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T8. Validar la spec completa y cerrarla.** Criterios de aceptación.
  - Hecho cuando: se comprueban reglas con Node, acceso y calendario, persistencia y recarga, almacenamiento no disponible, redirecciones, teclado y foco, móvil y escritorio, movimiento reducido, `forced-colors` y ausencia de XHR/fetch; `pnpm lint` y `pnpm build` terminan correctamente; `spec.md`, `AGENTS.md` y `bitacora.md` quedan actualizados.
