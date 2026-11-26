# Tareas — Spec 005: Portada de acceso y bienvenida

- [x] **T1. Instalar fuentes y actualizar tokens tipográficos.** RF-3.
  - Hecho cuando: los tres paquetes Fontsource están instalados, `main.tsx` importa solo los pesos usados, `index.css` expone `--font-heading`, `--font-body` y `--font-handwritten` con respaldo, y `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `@fontsource/cormorant-garamond`, `@fontsource/dm-sans` y `@fontsource/caveat` 5.3.0. Se importan únicamente los subconjuntos `latin` y los pesos 400/500/600 de Cormorant y Caveat, 400/500/600/700 de DM Sans, más Cormorant 400 itálica. Las fuentes se emiten como assets locales en `dist`. `pnpm lint` y `pnpm build` correctos.

- [x] **T2. Crear el motivo del sobre.** RF-4, RF-6, RF-7.
  - Hecho cuando: `CoverMotif.tsx` y su CSS Module ofrecen las variantes `closed` y `open`, son `aria-hidden`, no reciben foco y no rompen `forced-colors` ni movimiento reducido; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** componente decorativo con sobre, solapa, carta, pliegues y sello; variantes `closed` y `open`. Sin elementos interactivos y con `aria-hidden`. Incluye animación suave del halo, desactivada con `prefers-reduced-motion`, y fallback de borde en `forced-colors`. `pnpm lint` y `pnpm build` correctos; la comprobación visual se completa al integrarlo en T3 y T4.

- [ ] **T3. Rediseñar la pantalla de acceso.** RF-1, RF-5, RF-8.
  - Hecho cuando: `AccessView` y `AccessForm` muestran una portada con sobre cerrado, jerarquía clara y campo accesible; el código `2026` sigue funcionando y el error mantiene `role="alert"`; sin desbordamiento a 390×844 y composición equilibrada a 1280×800; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T4. Rediseñar la bienvenida.** RF-2, RF-5, RF-7.
  - Hecho cuando: `WelcomeView` muestra el sobre abierto, nota manuscrita y CTA protagonista; no hay desbordamiento móvil, el enlace conserva foco visible y `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T5. Validar y cerrar la spec.** RF-1 a RF-8.
  - Hecho cuando: se comprueba en navegador el flujo acceso-error-bienvenida-recarga, foco, `forced-colors`, movimiento reducido y ausencia de peticiones externas; se actualizan `spec.md`, `AGENTS.md` y `bitacora.md`; `pnpm lint` y `pnpm build` terminan correctamente.
