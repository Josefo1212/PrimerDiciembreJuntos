# Plan 002 — Base de navegación y estilos

## Objetivo técnico y alcance

Sustituir la navegación por estado local por un router real y migrar los estilos del feature `access` a CSS Modules, sin cambiar el comportamiento aprobado en la Spec 001. Dejar `vercel.json` preparado para rutas directas. Cubre RF-1 a RF-10 de `spec.md`.

## Estructura de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `package.json`, `pnpm-lock.yaml` | Nueva dependencia `react-router` en versión 8. |
| `src/app/router.tsx` | Definición única de rutas con `createBrowserRouter`. |
| `src/app/providers/AccessProvider.tsx` | Context con el estado `locked | unlocked`. |
| `src/app/App.tsx` | Monta `RouterProvider` y `AccessProvider`. |
| `src/features/access/hooks/useAccess.ts` | Hook para leer el estado de acceso y el setter. |
| `src/features/access/AccessView.tsx` | Consulta el contexto para elegir entre acceso y bienvenida. |
| `src/features/access/components/AccessForm.tsx` | Usa el hook de acceso al acertar. |
| `src/features/access/components/NotFoundView.tsx` | Vista accesible para la ruta comodín. |
| `src/features/access/**/*.module.css` | Estilos con scope local del feature. |
| `vercel.json` | Rewrite SPA a `index.html`. |

`src/index.css` y `src/design-system/tokens.css` siguen globales. No se crean `components/ui/`, `database/` ni carpetas de vistas futuras.

## Modelo de datos y contratos

Estado en memoria, sin persistencia:

```ts
type AccessState = 'locked' | 'unlocked'

type AccessContextValue = {
  accessState: AccessState
  unlock: () => void
}
```

- `AccessProvider` inicializa `accessState` en `'locked'` y expone `unlock` como función flecha estable.
- `useAccess` lanza un error explícito si se usa fuera del provider, en lugar de devolver un valor falso.
- `AccessView` elige vista con `accessState === 'unlocked'`.
- `AccessForm` llama a `unlock()` cuando `getAccessError` devuelve `null`.

Las reglas puras de `rules/accessRules.ts` no cambian.

## Rutas

```text
/     -> AccessView (acceso o bienvenida según estado)
*     -> NotFoundView
```

No se registra `/calendar`, `/surprise/:dayId`, `/memories` ni `/finale`: sus specs no están aprobadas. La convención de rutas protegidas con `<Navigate to="/" replace />` se aplicará cuando exista la primera vista protegida.

## Estrategia de estilos

- Renombrar los tres CSS del feature a `*.module.css`.
- Importar como `import styles from './AccessView.module.css'` y sustituir `className="access__title"` por `className={styles.title}`.
- Mantener los guiones BEM solo como nombres de clase hasta la migración; a partir de ahí usar nombres simples en camelCase.
- Los tokens globales (`var(--dusty-violet)`, etc.) siguen funcionando porque se definen en `:root`.
- Pseudo-clases (` :focus-visible`, `[aria-invalid='true']`) y `@media` permanecen dentro de cada módulo.
- No se configura `localsConvention`: se usa el objeto `styles` por defecto.

## Decisiones técnicas

- **Router en modo librería:** suficiente para una SPA estática; no se activa el modo framework ni loaders. En v8, `createBrowserRouter` se importa desde `react-router` y `RouterProvider` desde `react-router/dom`.
- **Context de acceso:** sustituye al prop `onSuccess` para que el estado no dependa del árbol de props. Alternativa descartada: seguir pasando props y añadir rutas protegidas sin provider.
- **Sin persistencia:** RF-4 de la Spec 001 y RF-4 de esta spec exigen que la recarga vuelva al acceso.
- **Sin pruebas automatizadas nuevas:** se mantiene la validación con lint, build y Chrome DevTools; Vitest sigue sin aprobación.

## Estrategia de pruebas y validación

- `pnpm lint` y `pnpm build` al final de cada tarea de código.
- En Chrome DevTools, con el servidor de Vite:
  - `/` muestra acceso; `2026` muestra bienvenida; recarga vuelve al acceso.
  - `1234` muestra el error y `role="alert"` sigue anunciándolo.
  - `Tab` y `Shift+Tab` recorren campo y botón con halo visible.
  - `/no-existe` muestra la vista de no encontrada con foco y texto accesible.
  - Las clases inspeccionadas en Elements tienen hashes locales, no nombres globales.
  - Lista de red sin peticiones XHR/fetch durante la validación.
- Revisar que `vercel.json` es JSON válido y que el rewrite apunta a `/index.html`.

## Relación plan ↔ requisitos

| Parte del plan | RF cubiertos |
| --- | --- |
| `package.json` con `react-router` | RF-1 |
| `app/router.tsx` y `App.tsx` | RF-1, RF-5, RF-6 |
| `AccessProvider` y `useAccess` | RF-2, RF-3, RF-4, RF-7 |
| Migración a `*.module.css` | RF-8, RF-9 |
| Vistas y estilos existentes | RF-7, no funcionales |
| `vercel.json` | RF-10 |
