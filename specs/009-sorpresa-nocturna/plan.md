# Plan — Spec 009: Sorpresa nocturna

## Decisión técnica

El cambio se limita a `src/features/surprises/SurpriseView.module.css`. No se toca `SurpriseView.tsx`: ya entrega el eyebrow, el título, el mensaje y el enlace, y su lógica de visita/bloqueo debe permanecer intacta.

Se reutilizan los tokens existentes `--night`, `--night-soft`, `--gold`, `--gold-light`, `--pastel-lilac`, `--lavender`, `--blush-pink` y `--warm-ivory`. No se crean tokens nuevos ni se añaden dependencias.

## Cambios por selector

- `.page`: mismo degradado plum/lila y halo suave que `CalendarView.module.css`, con entrada opaca breve y regla de movimiento reducido.
- `.card`: superficie glass nocturna con borde lila translúcido, blur y sombra profunda; el texto pasa a Warm Ivory.
- `.eyebrow`: Gold Light sobre fondo oscuro.
- `.title`: Warm Ivory con brillo lila contenido.
- `.message`: Warm Ivory atenuado para conservar jerarquía sin perder contraste.
- `.backLink`: píldora outline dorada sobre plum, con hover suave y halo de foco dorado.
- `@media (forced-colors: active)`: fondo, borde, texto y foco usando `Canvas`/`CanvasText`.

## Contratos

No hay contratos nuevos. `CalendarDay`, `DayStatus`, `parseDayId`, `isDayUnlocked` y `markVisited` se conservan.

## Estrategia de validación

- `pnpm lint` y `pnpm build`.
- En navegador, con fecha de prueba `2026-12-05`:
  - abrir `/surprise/5` desde el calendario y comprobar colores computados;
  - volver al calendario y comprobar que el día 5 sigue marcado como visitado;
  - intentar `/surprise/6` y confirmar redirección a `/calendar`;
  - revisar 390×844 y 1280×800 sin desbordamiento;
  - revisar foco por teclado, `forced-colors` y `prefers-reduced-motion`;
  - revisar consola y peticiones de red.

## Tareas

1. T1 — Aplicar la paleta nocturna a `SurpriseView.module.css` y validar la spec completa.
