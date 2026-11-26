# Tareas 002 — Base de navegación y estilos

- [ ] **T1. Instalar `react-router` en versión 7 y verificar el lockfile.** RF-1.
  - Hecho cuando: `package.json` declara `react-router` con versión 7, `pnpm-lock.yaml` está actualizado y `pnpm build` termina correctamente.

- [ ] **T2. Migrar los estilos del feature `access` a CSS Modules.** RF-8, RF-9.
  - Hecho cuando: `AccessView.css`, `WelcomeView.css` y `AccessForm.css` pasan a `*.module.css`; los componentes consumen `styles.nombreClase`; no quedan selectores globales nuevos; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T3. Extraer el estado de acceso a `AccessProvider` y `useAccess`.** RF-2, RF-3, RF-4, RF-7.
  - Hecho cuando: `App.tsx` ya no posee el `useState` de acceso; el provider inicializa en `'locked'`; `useAccess` falla explícitamente fuera del provider; el comportamiento de la Spec 001 sigue intacto.

- [ ] **T4. Crear `app/router.tsx` con `createBrowserRouter` y montar `RouterProvider`.** RF-1, RF-5, RF-6.
  - Hecho cuando: existen las rutas `/` y `*`; `NotFoundView` es accesible; no hay rutas de vistas no aprobadas; `pnpm lint` y `pnpm build` terminan correctamente.

- [ ] **T5. Añadir `vercel.json` con el rewrite SPA.** RF-10.
  - Hecho cuando: el archivo contiene `{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}` y es JSON válido.

- [ ] **T6. Validar el conjunto con lint, build y Chrome DevTools.** Criterios de aceptación completos.
  - Hecho cuando: se comprueban acceso, bienvenida, recarga, error, teclado y foco, ruta no encontrada, clases con scope local y ausencia de peticiones de red; `pnpm lint` y `pnpm build` terminan correctamente.
