# Plan — Spec 005: Portada de acceso y bienvenida

## Decisiones técnicas

- Las fuentes se instalan desde npm con `@fontsource/cormorant-garamond`, `@fontsource/dm-sans` y `@fontsource/caveat`. Se importan desde `src/main.tsx` solo los pesos usados, antes de `index.css`.
- `index.css` define `--font-heading`, `--font-body` y `--font-handwritten` con pilas de respaldo; `tokens.css` sigue siendo la fuente de los colores.
- El motivo del sobre se implementa como un componente visual en `src/features/access/components/CoverMotif.tsx`, con CSS Module propio y una prop `variant: 'closed' | 'open'`.
- El motivo es decorativo: contenedor con `aria-hidden="true"`, sin controles interactivos y sin texto que communicate estado.
- La composición se resuelve con CSS Grid/Flexbox y pseudo-elementos; no se añaden librerías de animación.
- La animación se limita a transiciones cortas de hover/foco y algún desplazamiento suave del sello; `prefers-reduced-motion` ya los anula globalmente en `index.css`.
- El formulario y el enlace conservan su lógica actual: no se tocan hooks, rutas ni persistencia.
- La validación visual se realiza en `pnpm dev` con Chrome DevTools a 390×844 y 1280×800, con foco por teclado, `prefers-reduced-motion` y `forced-colors`.

## Contratos

### `CoverMotif`

```ts
type CoverMotifVariant = 'closed' | 'open'

type CoverMotifProps = {
  variant: CoverMotifVariant
}
```

- `closed`: sobre color marfil con solapa lila y sello de lacre centrado.
- `open`: sobre abierto con carta sobresaliendo y sello a un lado.
- El componente devuelve un `<div>` decorativo con `aria-hidden="true"`.

### Fuentes

- Cormorant Garamond: títulos (`--font-heading`).
- DM Sans: interfaz y lectura (`--font-body`).
- Caveat: nota manuscrita breve (`--font-handwritten`).

## Secuencia de tareas

1. T1 — instalar fuentes y actualizar tokens.
2. T2 — crear `CoverMotif`.
3. T3 — rediseñar acceso.
4. T4 — rediseñar bienvenida.
5. T5 — validar y cerrar la spec.

Cada tarea se valida con `pnpm lint` y `pnpm build` antes de su commit. T5 añade comprobación en navegador y actualización documental.
