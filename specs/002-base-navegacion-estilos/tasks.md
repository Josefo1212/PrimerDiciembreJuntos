# Tareas 002 — Base de navegación y estilos

- [x] **T1. Instalar `react-router` en versión 8 y verificar el lockfile.** RF-1.
  - Hecho cuando: `package.json` declara `react-router` con versión 8, `pnpm-lock.yaml` está actualizado y `pnpm build` termina correctamente.
  - **Resultado:** `react-router@8.5.3` instalado y build correcto. El usuario confirmó que usara la versión 8 descargada por pnpm.

- [x] **T2. Migrar los estilos del feature `access` a CSS Modules.** RF-8, RF-9.
  - Hecho cuando: `AccessView.css`, `WelcomeView.css` y `AccessForm.css` pasan a `*.module.css`; los componentes consumen `styles.nombreClase`; no quedan selectores globales nuevos; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** clases simples en camelCase; Chrome DevTools muestra names con hash (`_page_2d4hd_1`, `_input_1kadn_16`); el halo de foco sigue aplicado.

- [x] **T3. Extraer el estado de acceso a `AccessProvider` y `useAccess`.** RF-2, RF-3, RF-4, RF-7.
  - Hecho cuando: `App.tsx` ya no posee el `useState` de acceso; el provider inicializa en `'locked'`; `useAccess` falla explícitamente fuera del provider; el comportamiento de la Spec 001 sigue intacto.
  - **Resultado:** `AccessContext`, `AccessProvider`, `useAccess` y `AccessRoute`; `AccessForm` obtiene `unlock` del hook, sin prop drilling. Comprobado en navegador: error, bienvenida y recarga al acceso.

- [x] **T4. Crear `app/router.tsx` con `createBrowserRouter` y montar `RouterProvider`.** RF-1, RF-5, RF-6.
  - Hecho cuando: existen las rutas `/` y `*`; `NotFoundView` es accesible; no hay rutas de vistas no aprobadas; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** v8 importa `createBrowserRouter` desde `react-router` y `RouterProvider` desde `react-router/dom`. En navegador, `/no-existe` muestra la vista de no encontrada y el enlace devuelve a `/`.

- [ ] **T5. Añadir `vercel.json` con el rewrite SPA.** RF-10.
  - Hecho cuando: el archivo contiene `{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}` y es JSON válido.

- [ ] **T6. Validar el conjunto con lint, build y Chrome DevTools.** Criterios de aceptación completos.
  - Hecho cuando: se comprueban acceso, bienvenida, recarga, error, teclado y foco, ruta no encontrada, clases con scope local y ausencia de peticiones de red; `pnpm lint` y `pnpm build` terminan correctamente.
