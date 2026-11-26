# Plan — Spec 010: Not found nocturno

## Decisión técnica

El cambio se limita a `src/features/access/components/NotFoundView.module.css`. No se toca `NotFoundView.tsx`, `router.tsx` ni `SurpriseView.tsx`: los textos, las rutas y las condiciones de acceso deben permanecer intactos.

Se reutilizan `--night`, `--night-soft`, `--gold`, `--gold-light`, `--pastel-lilac` y `--warm-ivory`. No se crean tokens ni dependencias nuevas.

## Cambios por selector

- `.page`: degradado plum/lila con halo suave, mismo que `SurpriseView`.
- `.card`: superficie glass nocturna con borde lila, blur y sombra profunda; añade ficha dorada superior.
- `.eyebrow`, `.title`, `.message`: Gold Light y Warm Ivory con jerarquía conservada.
- `.link`: píldora outline dorada sobre plum, con hover suave y halo de foco dorado.
- Añadir `@media (prefers-reduced-motion: reduce)` y `@media (forced-colors: active)`, ausentes hoy.

## Contratos

No hay contratos nuevos. La ruta `*` sigue sin `RequireAccess` y `SurpriseView` sigue decidiendo cuándo renderizar `NotFoundView`.

## Estrategia de validación

- `pnpm lint` y `pnpm build`.
- En navegador:
  - abrir `/no-existe` directamente y comprobar estilos computados;
  - con acceso y fecha de prueba `2026-12-05`, navegar internamente a `/surprise/abc` y comprobar la misma vista;
  - revisar 390×844 y 1280×800, foco por teclado, `forced-colors`, movimiento reducido, consola y peticiones.

## Tareas

1. T1 — Aplicar la paleta nocturna y la accesibilidad a `NotFoundView.module.css`, y validar la spec completa.
