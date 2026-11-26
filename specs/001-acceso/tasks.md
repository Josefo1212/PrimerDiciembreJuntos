# Tareas 001 — Acceso local inicial

- [x] **T1. Crear `src/design-system/tokens.css` con los tokens confirmados de `PALETA.md`.** Requisitos no funcionales de paleta.
  - Hecho cuando: los nueve tokens (`--lavender-mist`, `--soft-lilac`, `--pastel-lilac`, `--lavender`, `--dusty-violet`, `--deep-plum`, `--blush-pink`, `--warm-ivory`, `--surface`) están definidos con los valores exactos y `PALETA.md` coincide con ellos.

- [x] **T2. Ajustar `src/index.css` como estilo global base e importar los tokens.** Requisitos no funcionales de paleta y mobile-first.
  - Hecho cuando: el fondo es `--lavender-mist`, el texto base es `--deep-plum`, hay un reset mínimo y el archivo importa `tokens.css`.

- [x] **T3. Implementar `src/features/access/accessRules.ts` con la lógica pura de validación.** RF-2, RF-3, RF-8, RF-9, RF-12.
  - Hecho cuando: `normalizeCode`, `getAccessError` e `isCodeValid` producen los resultados de los criterios de aceptación, incluidos `  2026  `, `abc`, `20a6` y campo vacío.

- [x] **T4. Construir `AccessView.tsx` y `AccessView.css` con el formulario de acceso.** RF-1, RF-3, RF-7, RF-12; paleta y movimiento reducido.
  - Hecho cuando: hay un campo etiquetado, un botón, mensaje de error anunciable, estados de foco visibles, diseño móvil/escritorio y sin dependencia del color para el error.

- [x] **T5. Construir `WelcomeView.tsx` y `WelcomeView.css` como pantalla provisional.** RF-11; paleta y movimiento reducido.
  - Hecho cuando: muestra un mensaje de bienvenida personal sin calendario ni rutas, usando los tokens y sin animaciones no esenciales.

- [x] **T6. Integrar ambas vistas en `App.tsx` con estado local `locked | unlocked`.** RF-1, RF-6, RF-10, RF-11.
  - Hecho cuando: al cargar aparece `AccessView`; con `2026` aparece `WelcomeView`; al recargar vuelve `AccessView`; no hay `fetch` ni almacenamiento.

- [x] **T7. Validar el conjunto con lint, build y comprobación en navegador.** Criterios de aceptación completos.
  - Hecho cuando: `pnpm lint` y `pnpm build` terminan correctamente y se han recorrido uno a uno los casos de aceptación, incluidos teclado, recarga, red, móvil/escritorio y `prefers-reduced-motion`.
  - **Validado:** reglas puras con seis casos en verde; `pnpm lint` y `pnpm build` correctos; sin `fetch`, almacenamiento ni dependencias nuevas. En Chrome DevTools: `Tab` al campo y al botón con halo visible, `Shift+Tab` de vuelta al campo, `1234 + Enter` muestra el error anunciado, `2026 + Enter` abre la bienvenida, recarga vuelve al acceso, sin peticiones XHR/fetch, viewport 390×844 y `prefers-reduced-motion: reduce` con transiciones reducidas.

- [x] **T8. Documentar y aplicar las convenciones de código aprobadas.** Convenciones generales del proyecto.
  - Hecho cuando: existe `CONVENTIONS.md` con funciones flecha obligatorias, sintaxis moderna, estructura feature-based, hooks/reglas separados y commit por tarea; `AGENTS.md`, `constitution.md` y `SKILL.md` la referencian; el código existente cumple las reglas y cada tarea tiene su commit.

- [x] **T9. Refactorizar el acceso a la estructura y estilo de `CONVENTIONS.md`.** Convenciones generales del proyecto; RF-1 a RF-12 sin cambios de comportamiento.
  - Hecho cuando: `App.tsx` vive en `src/app/`; el feature `access` tiene `components/`, `hooks/`, `rules/` y `types.ts`; no hay declaraciones `function` ni `var` en TypeScript; las reglas puras siguen pasando los seis casos; `pnpm lint` y `pnpm build` terminan correctamente.

- [x] **T10. Revalidar reglas puras, lint y build después del refactor.** T9; RF-2, RF-3, RF-8, RF-9, RF-12.
  - Hecho cuando: los seis casos de reglas puras pasan desde la nueva ruta `rules/accessRules.ts`, y `pnpm lint` y `pnpm build` terminan correctamente tras el cambio de estructura.

- [x] **T11. Mejorar el foco visible del campo y del botón.** Requisitos no funcionales de accesibilidad y paleta.
  - Hecho cuando: el foco ya no es el contorno genérico; input y botón muestran un halo lila suave con borde violeta en `:focus-visible`; `Shift+Tab` vuelve al campo; `@media (forced-colors: active)` restaura un contorno de 2px; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Validado en Chrome DevTools:** estilos computados del halo (`rgba(128, 99, 158, 0.22) 0 0 0 4px`) en input y botón; `Tab`, `Shift+Tab` y colores forzados comprobados.
