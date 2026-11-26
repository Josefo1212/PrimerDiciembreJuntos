# Tareas — Spec 006: Portada nocturna y animaciones

- [x] **T1. Añadir tokens nocturnos y documentar la paleta.** RF-8.
  - Hecho cuando: `tokens.css` define `--night`, `--night-soft`, `--gold` y `--gold-light`; `PALETA.md` los documenta como extensión; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `--night: #1F172B`, `--night-soft: #2E2240`, `--gold: #C9A45C` y `--gold-light: #E4C783` disponibles globalmente. `PALETA.md` registra la extensión y restringe su uso a la portada. `pnpm lint` y `pnpm build` correctos.

- [x] **T2. Crear la escena compartida con animaciones de entrada.** RF-1, RF-3, RF-5, RF-7.
  - Hecho cuando: `CoverScene.tsx` y su CSS Module reúnen fondo nocturno, estrellas, halo, columna editorial y panel; la entrada es escalonada, el móvil no desborda y la decoración es `aria-hidden`; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** componente compartido con fondo degradado nocturno, 14 estrellas con parpadeo desfasado, halo pulsante, columna editorial con `rise` escalonado y panel con `panelIn`. Decoración `aria-hidden` y sin foco. Incluye reglas explícitas para movimiento reducido y `forced-colors`. `pnpm lint` y `pnpm build` correctos; la comprobación visual se completa al conectar las vistas en T4.

- [x] **T3. Enriquecer el sobre y sus animaciones.** RF-1, RF-2, RF-3, RF-5.
  - Hecho cuando: `CoverMotif` incluye textura, pliegues, sombra, sello dorado, brillo, solapa animada y carta que sale en la variante abierta; sigue siendo decorativo y respeta movimiento reducido; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** sobre con textura de papel, pliegues degradados, sombra proyectada, lacre dorado con brillo periódico, solapa con vaivén en cerrado y giro en abierto, carta con líneas y fecha manuscrita que sale al abrir, y halo/destellos animados. `aria-hidden` conservado. Reglas explícitas de movimiento reducido y `forced-colors`. `pnpm lint` y `pnpm build` correctos.

- [ ] **T4. Adaptar formulario y CTA, y conectar las vistas.** RF-2, RF-4, RF-6.
  - Hecho cuando: `AccessForm` y el CTA usan superficies oscuras, botón dorado y foco visible; `AccessView` y `WelcomeView` consumen `CoverScene` sin duplicar estilos; el código `2026` y el error accesible siguen funcionando; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T5. Validar y cerrar la spec.** RF-1 a RF-8.
  - Hecho cuando: se revisan lint, build, salida `dist`, ausencia de dependencias nuevas y peticiones externas, `aria-hidden`, foco, `forced-colors`, movimiento reducido y documentación actualizada.
