# Convenciones de código — Primer Diciembre juntos

Estado: **aprobadas** el 26/11/2026.

Estas reglas aplican a todo el código del proyecto. No son preferencias estéticas: son criterios de revisión. Una tarea no se considera terminada si el código las incumple.

## Principios

- Claridad antes que brevedad. El código se escribe para volverse a leer.
- No se aceptan soluciones rápidas ni parches que “sirvan por ahora” y dejen deuda oculta.
- No se añade abstracción, dependencia ni capa sin una necesidad demostrable.
- Cada pieza tiene una responsabilidad única y verificable.
- Si una decisión técnica no está en la spec o en el plan, se pregunta antes de improvisar.

## Funciones y estilo

- **Usar siempre funciones flecha.** No se usan declaraciones `function` en código de aplicación.
- Preferir `const`. Usar `let` solo cuando exista reasignación real. Nunca `var`.
- Los componentes se declaran como `const Componente = (...) => ...` y se exportan con `export default Componente`.
- Los manejadores de eventos se declaran como constantes flecha dentro del componente o del hook.
- Usar `import type` para tipos y valores que solo se usan como tipos.
- Tipar props y resultados de hooks con `type` o `interface`, según corresponda.
- Evitar `any`, aserciones inseguras y conversiones sin justificación documentada.
- Emplear sintaxis moderna de TypeScript/JavaScript: *optional chaining*, *nullish coalescing*, *template literals*, destructuring y `satisfies` cuando mejore la inferencia.
- No usar `arguments`, callbacks `function`, bucles `for` cuando un método funcional exprese mejor la intención.

## Estructura de carpetas

```text
src/
├── app/
│   ├── App.tsx
│   └── router.tsx
├── components/
│   └── ui/                 # solo controles reutilizables de verdad
├── design-system/
│   └── tokens.css
├── features/
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── rules/
│       ├── types.ts
│       ├── <Feature>View.tsx
│       └── <Feature>View.module.css
├── styles/                 # estilos globales, si se requieren además de index.css
└── main.tsx
```

- `app/`: composición de la aplicación. No lógica de dominio.
- `components/ui/`: componentes visuales sin conocimiento del dominio.
- `features/<feature>/components/`: piezas visuales usadas por esa funcionalidad.
- `features/<feature>/hooks/`: estado y efectos reutilizables dentro de la funcionalidad.
- `features/<feature>/rules/`: reglas puras, sin React ni DOM.
- `types.ts`: tipos compartidos dentro de la funcionalidad.
- No crear carpetas vacías ni carpetas “por si acaso”.

## React

- Un componente por archivo.
- Los hooks personalizados empiezan con `use` y viven en `hooks/`.
- La vista compone; el componente renderiza; el hook gestiona estado y efectos; las reglas puras deciden.
- Usar `useCallback` solo cuando haya una razón real, no por costumbre.
- Los efectos se limpian siempre que suscriban algo.
- Accesibilidad desde el inicio: etiquetas, `aria-*`, foco visible, mensajes anunciables y navegación por teclado.
- No depender solo del color para comunicar estado.
- No reproducir multimedia automáticamente.
- Las rutas se definen en `src/app/router.tsx` con `createBrowserRouter` (desde `react-router`) y `RouterProvider` (desde `react-router/dom`, API de v8). El estado de acceso se provee por Context y las rutas protegidas redirigen con `<Navigate to="/" replace />`.
- No crear rutas ni pantallas de funcionalidades cuyas specs no estén aprobadas.

## Estilos

- Los colores viven en `src/design-system/tokens.css` y en `PALETA.md`.
- Los estilos de componentes usan CSS Modules: `Componente.module.css`, importado como `styles` y aplicado con `styles.nombreClase`.
- Solo `src/index.css` y los archivos de `design-system/` son globales; el resto se scoppea con Modules.
- Mobile-first, con media queries para crecer.
- `prefers-reduced-motion` reduce o elimina animaciones no esenciales.
- El foco visible se diseña, no se hereda del navegador: halo suave con un token de la paleta y suficiente contraste. Si se suprime `outline`, se incluye un fallback con `@media (forced-colors: active)`.
- Liquid Glass moderado: blur y transparencias solo en superficies flotantes o destacadas.

## Validación y commits

- Antes de marcar una tarea como terminada: `pnpm lint`, `pnpm build` y la comprobación concreta de su condición “Hecho cuando”.
- **Un commit por tarea validada.** No agrupar tareas distintas en un mismo commit.
- Mensajes de commit cortos, imperativos y con prefijo de tipo, por ejemplo `docs: ...`, `refactor: ...`, `feat: ...`, `test: ...`.
- No commitear `dist`, `node_modules`, secretos ni código temporal definitivo sin marcarlo como provisional.
- Si una validación no se pudo ejecutar, se registra como pendiente; no se afirma que pasó.
