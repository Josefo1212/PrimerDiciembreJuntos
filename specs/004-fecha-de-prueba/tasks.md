# Tareas — Spec 004: fecha de prueba para desarrollo

- [x] **T1. Crear las reglas puras y el almacenamiento de sesión de la fecha de prueba.** RF-4, RF-6.
  - Hecho cuando: `previewDate.ts` expone parseo, formato, lectura, escritura y limpieza; `node src/shared/time/previewDate.check.ts` valida fechas correctas e incorrectas y el uso sin `sessionStorage`; `pnpm lint` termina correctamente.
  - **Resultado:** `src/shared/time/previewDate.ts` y `previewDate.check.ts`. 15/15 casos correctos con Node; `pnpm lint` correcto. El módulo usa `sessionStorage` con respaldo en memoria y no depende de `import.meta.env`.

- [x] **T2. Unificar la fecha de desbloqueo con un guard de desarrollo.** RF-2, RF-7.
  - Hecho cuando: `getUnlockDate()` usa la fecha de prueba solo con `import.meta.env.DEV`; `CalendarView` y `SurpriseView` lo usan en lugar de `new Date()`; `ProgressProvider` conserva la fecha real; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `src/shared/time/unlockDate.ts` centraliza la fecha de desbloqueo. `CalendarView` y `SurpriseView` lo consumen; `ProgressProvider` sigue usando `new Date()` con un comentario que lo protege. `pnpm lint` y `pnpm build` correctos; `dist` no contiene `previewDate` ni `getPreviewDate`.

- [ ] **T3. Añadir el panel de fecha de prueba al calendario.** RF-1, RF-4, RF-5, RF-8.
  - Hecho cuando: el panel aparece solo en desarrollo; aplicar una fecha actualiza las 31 tarjetas; «Usar fecha real» restaura el estado; la fecha sigue activa al navegar, recargar y volver; teclado, foco y estado anunciado verificados.

- [ ] **T4. Validar la spec completa y cerrarla.** RF-2, RF-3, RF-7, RF-8.
  - Hecho cuando: en navegador se comprueban los estados con 5/12/2026, la visita guarda la fecha real, el panel no aparece en producción, `dist` no contiene los textos ni la clave de prueba, no hay peticiones XHR/fetch, y `spec.md`, `AGENTS.md` y `bitacora.md` quedan actualizados.
