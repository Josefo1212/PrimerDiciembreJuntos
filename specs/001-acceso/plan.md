# Plan 001 — Acceso local inicial

## Objetivo técnico y alcance

Construir la primera vista de la aplicación: un formulario de acceso local con validación numérica, feedback de error amable y una pantalla provisional de bienvenida tras acertar. Sin backend, sin persistencia, sin rutas y sin dependencias nuevas.

Cubre los RF-1 a RF-12 de `spec.md`.

## Estructura de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `src/design-system/tokens.css` | Variables CSS de la paleta confirmada en `PALETA.md`. |
| `src/index.css` | Estilos globales mínimos: reset ligero, tipografía base, fondo Lavender Mist. Importa `tokens.css`. |
| `src/main.tsx` | Punto de entrada existente; se ajusta solo si es necesario para los imports. |
| `src/features/access/accessRules.ts` | Lógica pura: normalización, validación y mensajes de error. |
| `src/features/access/AccessView.tsx` | Vista del formulario: campo, botón, mensaje y estado local. |
| `src/features/access/AccessView.css` | Estilos de la vista de acceso usando los tokens. |
| `src/features/access/WelcomeView.tsx` | Pantalla provisional mostrada tras acertar. |
| `src/features/access/WelcomeView.css` | Estilos de la bienvenida provisional. |
| `src/App.tsx` | Composición: elige entre `AccessView` y `WelcomeView` según estado local. |

No se crea `src/features/access/` hasta que exista código real: en este plan ya existe, por lo que sí se crea. No se crean carpetas para módulos futuros.

## Modelo de datos y contratos

No hay modelo persistido. Estado local en `App.tsx`:

```ts
type AccessState = 'locked' | 'unlocked';
```

Contratos puros en `accessRules.ts`:

```ts
export const TEMP_ACCESS_CODE = '2026';

export function normalizeCode(value: string): string;
export function getAccessError(value: string): string | null;
export function isCodeValid(value: string): boolean;
```

- `normalizeCode`: recorta espacios (`trim`).
- `getAccessError`: devuelve `null` si el valor es válido; `'Introduce el código'` si está vacío; `'Solo números'` si contiene caracteres no dígitos; `'Ese código no es correcto'` en cualquier otro caso.
- `isCodeValid`: `getAccessError(value) === null`.

El código temporal vive aislado en `TEMP_ACCESS_CODE` para poder sustituirlo en un solo punto.

## Reglas de dominio puras

- RF-2, RF-8, RF-9 y RF-12 se resuelven en `accessRules.ts`, separadas de React y del DOM.
- RF-3 depende del mensaje devuelto por `getAccessError`.
- RF-11 depende de `isCodeValid` y del cambio de estado en `App.tsx`.

## Estrategia de persistencia

Ninguna. No se usa IndexedDB, `localStorage` ni `sessionStorage` en esta fase. RF-10 se cumple porque el estado `'unlocked'` vive solo en memoria: al recargar, `App.tsx` empieza en `'locked'`.

Si IndexedDB no está disponible, no hay efecto: esta vista no la utiliza.

## Decisiones técnicas

- **React puro con `useState`:** suficiente para dos estados; no se añade Context ni gestor de estado.
- **CSS global con variables:** evita decidir CSS Modules antes de que se apruebe. Los estilos se agrupan por archivo junto a cada componente y se importan explícitamente.
- **Sin React Router:** la navegación se resuelve con estado local; las rutas quedan para la fase en que se aprueben. Alternativa descartada por ahora: introducir `react-router` solo para dos pantallas.
- **Sin dependencias de animación:** `prefers-reduced-motion` se atiende con CSS, sin Framer Motion.
- **Sin runner de pruebas:** no se añade Vitest en esta fase porque no está aprobado. La validación se hace con `pnpm lint`, `pnpm build` y comprobación manual. Queda pendiente incorporar pruebas automatizadas cuando se apruebe la dependencia.

## Estrategia de pruebas y validación

- `pnpm lint` y `pnpm build` deben terminar correctamente.
- Comprobación manual de los casos de aceptación:
  - `2026` y `  2026  ` conceden acceso.
  - `abc`, `20a6` y campo vacío no conceden acceso y muestran el mensaje correcto.
  - Reintentos ilimitados tras error.
  - Recarga vuelve a la vista de acceso.
  - Navegación por teclado con `Tab`, `Enter` y foco visible.
  - Viewport móvil y escritorio.
  - `prefers-reduced-motion` activado desde el sistema o DevTools.
  - Sin peticiones de red durante la validación (pestaña Network).

## Relación plan ↔ requisitos

| Parte del plan | RF cubiertos |
| --- | --- |
| `App.tsx` con `AccessState` | RF-1, RF-6, RF-10, RF-11 |
| `accessRules.ts` | RF-2, RF-3, RF-8, RF-9, RF-12 |
| `AccessView.tsx` y su CSS | RF-3, RF-7, RF-12, no funcionales de paleta/movimiento |
| `WelcomeView.tsx` y su CSS | RF-11, no funcionales de paleta/movimiento |
| `tokens.css` e `index.css` | Requisitos no funcionales de paleta y accesibilidad |
| Ausencia de fetch y de almacenamiento | RF-4, RF-5, RF-10 |
