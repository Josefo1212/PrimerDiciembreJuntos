# Plan — Spec 008: Calendario nocturno

## Decisiones técnicas

- No se crean tokens nuevos: `CalendarView`, `DayCard` y `DevDatePanel` consumen directamente `--night`, `--night-soft`, `--gold`, `--gold-light`, `--pastel-lilac`, `--warm-ivory` y `--blush-pink`, ya definidos en `tokens.css`.
- `CalendarView.module.css` replica el fondo degradado de `CoverScene.module.css`, con texto Warm Ivory, eyebrow Gold Light, advertencia glass y enlace de retorno dorado.
- `DayCard.module.css` convierte la tarjeta en superficie glass nocturna:
  - `locked`: borde discontinuo lila apagado, texto lila legible.
  - `available`: borde Lavender y número Warm Ivory.
  - `visited`: borde Gold Light, relleno lila suave y `✓` existente.
  - El foco pasa a un halo dorado; se mantiene el anillo sólido en `forced-colors`.
- `DevDatePanel.module.css` adapta el panel, el campo, el botón principal dorado y el botón secundario outline a la misma gama.
- `CalendarGrid.module.css` permanece intacto: la estructura de 4/6/8 columnas no forma parte del cambio.
- No se modifica TypeScript: `DayCard` ya entrega las etiquetas y el símbolo que garantizan que el estado no dependa solo del color.

## Contratos

No hay contratos nuevos. La forma de los datos (`CalendarDay`, `DayStatus`) y las reglas puras de fecha se conservan.

## Estrategia de validación

- `pnpm lint` y `pnpm build`.
- Revisión en navegador con Chrome DevTools:
  - flujo real `2026` → bienvenida → calendario;
  - fecha de prueba `2026-12-05` para ver estados abiertos y visitados;
  - 390×844 y 1280×800 sin desbordamiento;
  - foco por teclado, `forced-colors` y `prefers-reduced-motion`;
  - consola sin errores y sin peticiones a dominios externos.
- Revisión estática del bundle: tokens nocturnos presentes y reglas de accesibilidad conservadas.

## Secuencia de tareas

1. T1 — fondo y cabecera nocturnos en `CalendarView`.
2. T2 — tarjetas de día con la misma gama y estados reforzados.
3. T3 — panel de fecha de prueba y advertencia adaptados.
4. T4 — validación en navegador, lint/build y cierre de la spec.
