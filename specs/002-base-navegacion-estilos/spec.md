# Spec 002 — Base de navegación y estilos

Estado: **propuesta**, pendiente de aprobación.

## Contexto y objetivo

La Spec 001 validó el acceso con navegación por estado local y CSS global. El 26/11/2026 se aprobaron React Router 7 y CSS Modules. Antes de construir el calendario conviene dejar esa base instalada y migrada, para no crear componentes sobre una arquitectura que luego habría que rehacer.

El objetivo es establecer rutas reales, estilos con scope local y el despliegue SPA en Vercel, conservando exactamente el comportamiento ya aprobado de la Spec 001.

## Usuarios

- Isabela, que abre la aplicación en su dispositivo y necesita que la navegación y la recarga sean predecibles.
- El desarrollador, que necesita una base estable para añadir el calendario y las demás vistas.

## Historias de usuario

- HU-1. Como Isabela, quiero que la aplicación tenga una URL estable y que la recarga me devuelva al acceso.
- HU-2. Como desarrollador, quiero definir las rutas en un único archivo para añadir vistas futuras sin improvisar.
- HU-3. Como desarrollador, quiero estilos con scope local para que crear muchos componentes no provoque colisiones de clases.

## Definiciones

- **Router:** instancia creada con `createBrowserRouter` y montada con `RouterProvider`.
- **Ruta protegida:** ruta que solo puede renderizarse con acceso válido. Se implementará cuando exista una vista aprobada que proteger; en esta spec solo se prepara la convención.
- **Acceso válido:** estado en memoria que sustituye al `useState` actual de `App.tsx`. No se persiste.

## Requisitos funcionales

- **RF-1:** EL SISTEMA monta la aplicación con `RouterProvider` sobre un router creado con `createBrowserRouter`.
- **RF-2:** LA RUTA `/` muestra `AccessView` mientras el acceso está bloqueado y `WelcomeView` cuando es válido.
- **RF-3:** CUANDO el código es correcto, EL SISTEMA actualiza el estado de acceso y muestra la bienvenida sin cambiar de ruta.
- **RF-4:** AL RECARGAR la página, EL SISTEMA vuelve a mostrar `AccessView` en `/`.
- **RF-5:** EL SISTEMA muestra una vista de «página no encontrada» accesible para cualquier ruta no definida.
- **RF-6:** EL SISTEMA define las rutas exclusivamente en `src/app/router.tsx`.
- **RF-7:** EL SISTEMA conserva íntegramente los requisitos RF-1 a RF-12 de la Spec 001.
- **RF-8:** LOS ESTILOS de cada componente viven en archivos `*.module.css` y se aplican mediante el objeto `styles`.
- **RF-9:** SOLO `src/index.css` y los archivos de `src/design-system/` permanecen como CSS global.
- **RF-10:** EL SISTEMA incluye `vercel.json` con un rewrite de `/(.*)` a `/index.html` para que las rutas directas funcionen en Vercel.

## Requisitos no funcionales

- Única dependencia nueva: `react-router` en su versión 7. CSS Modules no añade dependencias porque Vite lo soporta de forma nativa.
- `tsconfig.app.json` ya incluye `vite/client`, por lo que los tipos de los módulos CSS están disponibles sin declaraciones adicionales.
- Se mantienen la paleta de `PALETA.md`, el diseño mobile-first, `prefers-reduced-motion`, el foco diseñado y el fallback de `forced-colors`.
- No se añade persistencia: el acceso sigue vivo solo en memoria.
- No se instalan fuentes, Framer Motion, Lucide, Dexie ni `vite-plugin-pwa`.

## Reglas de negocio

- El código sigue siendo una barrera de experiencia local, no autenticación.
- No se crean rutas ni pantallas de funcionalidades cuyas specs no estén aprobadas.
- Las rutas protegidas reales se añadirán con la spec del calendario; esta spec solo fija la convención.

## Casos límite

- Recarga en `/`: el estado en memoria se pierde y aparece `AccessView`.
- URL directa a una ruta no definida: se muestra la vista de no encontrada, no una pantalla en blanco.
- Cambio de ruta con el foco en un control: la vista nueva conserva foco visible y navegación por teclado.
- Tokens CSS globales usados desde módulos: siguen disponibles porque `tokens.css` se importa en el CSS global.
- Despliegue sin rewrite: las rutas directas darían 404; RF-10 lo evita.

## Fuera de alcance

- Calendario, surprise, memories y finale.
- Rutas protegidas reales y guard de acceso aplicado.
- Persistencia, IndexedDB, Dexie y lógica de fechas.
- Sustituir el código temporal `2026`.
- Fuentes tipográficas, animaciones e iconos.

## Criterios de aceptación

- `react-router` está instalado y `pnpm-lock.yaml` refleja la versión 7.
- `src/app/router.tsx` existe y contiene `/` más una ruta comodín; no hay rutas de vistas no aprobadas.
- Al abrir `/` aparece el acceso; con `2026` aparece la bienvenida; al recargar vuelve el acceso.
- Los mensajes de error, reintentos, teclado y foco siguen funcionando como en la Spec 001.
- `AccessView.css`, `WelcomeView.css` y `AccessForm.css` pasan a `*.module.css` y las clases se consumen con `styles`.
- En Chrome DevTools se observan nombres de clase con scope local, sin fugas globales.
- `vercel.json` contiene el rewrite SPA a `/index.html`.
- No hay peticiones de red para validar el código ni almacenamiento local.
- `pnpm lint` y `pnpm build` terminan correctamente.

## Decisiones cerradas (26/11/2026)

- React Router 7 en modo librería: `createBrowserRouter` + `RouterProvider`.
- El estado de acceso pasa de `App.tsx` a un provider en `app/providers/` con un hook en `features/access/hooks/`.
- CSS Modules con nomenclatura `Componente.module.css`; globales solo `index.css` y `design-system/`.
- Rewrite SPA en `vercel.json` con `/(.*)` → `/index.html`.
- Sin persistencia del acceso.
