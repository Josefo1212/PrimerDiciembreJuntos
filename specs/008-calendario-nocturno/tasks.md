# Tareas — Spec 008: Calendario nocturno

- [x] **T1. Aplicar el fondo nocturno a la estructura del calendario.** RF-1, RF-5.
  - Hecho cuando: `CalendarView.module.css` usa plum profundo, halo lila, texto Warm Ivory, eyebrow dorado y enlace de retorno coherente; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** el fondo replica la escena nocturna de la portada, con degradados plum/lila y halo suave. Título y progreso pasan a Warm Ivory con acento dorado; la advertencia es glass nocturna y el enlace de retorno usa borde y texto dorados. Se añaden reglas de movimiento reducido y `forced-colors`. `pnpm lint` y `pnpm build` correctos.

- [ ] **T2. Adaptar las tarjetas de los 31 días.** RF-2, RF-3, RF-5.
  - Hecho cuando: `DayCard.module.css` muestra superficie glass nocturna, distingue bloqueado/disponible/visitado con borde, relleno y texto legibles, conserva etiquetas y `✓`, y mantiene foco, movimiento reducido y `forced-colors`; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T3. Adaptar el panel de fecha de prueba y la advertencia.** RF-4, RF-5, RF-6.
  - Hecho cuando: `DevDatePanel.module.css` y la advertencia de almacenamiento usan la misma gama sin perder contraste ni foco; el panel sigue siendo solo de desarrollo; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T4. Validar en navegador y cerrar la spec.** RF-1 a RF-7.
  - Hecho cuando: se comprueba el flujo real de acceso, los estados de los días, móvil/escritorio, teclado, `forced-colors`, movimiento reducido, consola y peticiones; `pnpm lint` y `pnpm build` terminan correctamente y la documentación queda actualizada.
