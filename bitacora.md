# Bitácora — Primer Diciembre juntos

Registro cronológico de decisiones, fases, validaciones y aprendizajes. Mantener las entradas históricas; no reescribir el pasado para que parezca que una decisión estuvo tomada desde el inicio.

## 2026-11-25 — Definición inicial del proyecto

Se plantea crear un calendario de adviento extendido para Isabela, desarrollado desde cero con React. La aplicación tendrá 31 días de diciembre y será exclusivamente frontend, sin servidor ni base de datos remota, para simplificar el despliegue en Vercel.

Se propone IndexedDB para conservar el progreso local. Se aclara que IndexedDB no reemplaza un backend: los datos permanecen en el navegador/dispositivo y no se sincronizan entre equipos.

## 2026-11-25 — Persistencia y contenido

Se define como criterio que IndexedDB almacene progreso y preferencias, no el contenido de las sorpresas. Cartas, imágenes, videos y demás recursos estáticos pertenecen al bundle o a los assets del sitio.

Se considera Dexie como wrapper de IndexedDB para evitar manejar directamente la API de bajo nivel.

## 2026-11-25 — Desbloqueo del calendario

Se plantea desbloqueo progresivo por fecha local del dispositivo. Los días desbloqueados pueden volver a visitarse. Se acepta que cambiar manualmente el reloj del dispositivo puede alterar el desbloqueo, dado que no habrá servidor que proporcione una fecha confiable.

Queda pendiente definir de forma precisa la zona horaria y los límites del comportamiento al cambiar la zona horaria durante diciembre.

## 2026-11-25 — Identidad visual

Se define una dirección visual romántica, elegante y personal, con lila/lavanda como color principal porque es el color favorito de Isabela. Se propone Liquid Glass moderado, evitando una interfaz recargada o excesivamente navideña.

Paleta inicial propuesta:
- Lavender `#A98BCB`
- Lilac `#CDB5E8`
- Soft Lilac `#EAE0F5`
- Violet `#80639E`
- Deep Plum `#514064`
- Blush `#E9CADB`
- Ivory `#F6EEDF`
- Snow `#F8F5FC`

Tipografías propuestas: Cormorant Garamond para títulos, DM Sans para interfaz y Caveat para detalles manuscritos puntuales. Estos tokens y fuentes requieren validación visual y de contraste.

## 2026-11-25 — Estructura de experiencias

Se plantean las siguientes vistas:
- Welcome / Access (`/`)
- Calendar (`/calendar`)
- Surprise (`/surprise/:dayId`)
- Memories (`/memories`)
- Finale (`/finale`)

Se contemplan cartas, galerías, recuerdos, audio, actividades interactivas, contenido multimedia, sorpresas especiales y una experiencia final el 31 de diciembre.

La distribución exacta de tipos y el contenido de cada día permanecen pendientes de definición. No deben tratarse como contenido aprobado.

## 2026-11-25 — Stack técnico propuesto

Stack considerado:
- React 19, TypeScript estricto, Vite y pnpm.
- React Router 7 si se confirma la necesidad de rutas.
- Framer Motion y Lucide React.
- CSS Modules, CSS variables y design system propio.
- Dexie.js para IndexedDB.
- `vite-plugin-pwa` como mejora opcional posterior.
- Vercel para hosting estático.

El bootstrap se ejecutó el 26/11/2026; las dependencias adicionales siguen pendientes de aprobación.

## 2026-11-26 — Nombre del proyecto y bootstrap

Tras revisar varias opciones, se elige el nombre oficial **Primer Diciembre juntos**, en español y sin subtítulo. Es el primer diciembre que Isabela y el desarrollador comparten, por lo que el nombre describe una situación real y no una plantilla.

Se descartan las decisiones anteriores sobre el nombre y el subtítulo opcional. El proyecto no llevará sufijos de edición o variante. La carpeta de trabajo se renombra a `primerDiciembreJuntos` (camelCase) y el identificador de paquete/Vercel a `primer-diciembre-juntos`.

El bootstrap de Vite se ejecutó en la carpeta existente con `pnpm create vite . --template react-ts`, conservando la documentación. Resultado: React 19.3.1, Vite 8.3.6, TypeScript y ESLint instalados; React Router, Framer Motion, Lucide, Dexie y fuentes aún no instalados.

## Estado inicial de la bitácora

- Documentación base generada: `AGENTS.md`, `constitution.md`, `SKILL.md` y `bitacora.md`.
- Bootstrap del proyecto: ejecutado el 26/11/2026.
- Specs funcionales: pendientes.
- Diseño implementado: no confirmado.
- Persistencia IndexedDB: pendiente.
- Contenido de las 31 sorpresas: pendiente.
- Pruebas y despliegue: pendientes.

## 2026-11-26 — Paleta confirmada y spec de acceso iniciada

**Contexto:** se cerró la base visual antes de construir la primera vista y se inició la definición de la pantalla de acceso con código local.

**Decisiones:** la paleta queda confirmada con los nombres Lavender Mist, Soft Lilac, Pastel Lilac, Lavender, Dusty Violet, Deep Plum, Blush Pink y Warm Ivory, más blanco para superficies. La distribución por uso se registró en `PALETA.md`. El acceso se trata como barrera de experiencia local, sin servidor ni autenticación real. La spec `001-acceso` queda en estado borrador, con dudas abiertas.

**Implementación:** archivos nuevos `PALETA.md` y `specs/001-acceso/spec.md`. Actualización de `AGENTS.md`. No se creó aún el plan, las tareas ni código de la vista.

**Validación:** paleta documentada; sin validación visual en componentes todavía.

**Pendiente:** código exacto, normalización del código, persistencia del acceso, feedback de error, límite de intentos y destino tras acertar.

## 2026-11-26 — Spec 001 implementada

**Contexto:** primera vista de la aplicación: acceso local por código numérico antes de mostrar cualquier contenido.

**Decisiones:** código temporal de desarrollo `2026`, aislado en `TEMP_ACCESS_CODE`; comparación solo con dígitos y `trim`; sin persistencia; error amable con reintentos ilimitados; bienvenida provisional tras acertar; CSS global con tokens, sin dependencias nuevas ni rutas.

**Implementación:** `tokens.css`, `index.css`, `accessRules.ts`, `AccessView.tsx/.css`, `WelcomeView.tsx/.css` y `App.tsx`. Se eliminó `App.css` del template. Spec, plan y tareas en `specs/001-acceso/`.

**Validación:** `pnpm lint` y `pnpm build` correctos. Reglas puras compiladas y ejecutadas: `2026` y `  2026  ` válidos; vacío, `abc`, `20a6` y `1234` inválidos con el mensaje esperado. Sin `fetch`, almacenamiento ni dependencias nuevas en `src/`.

**Pendiente:** revisión manual en navegador de teclado/foco, móvil/escritorio, `prefers-reduced-motion` y pestaña Network; sustituir el código temporal por el definitivo antes del despliegue; decidir CSS Modules y React Router en fases posteriores.

## 2026-11-26 — Convenciones de código aprobadas

**Contexto:** el usuario pidió reglas explícitas de estilo y estructura para evitar soluciones rápidas y código parcheado.

**Decisiones:** funciones flecha obligatorias, sin declaraciones `function`; sintaxis moderna de TypeScript; separación entre vistas, componentes, hooks y reglas puras; estructura feature-based; un commit por tarea validada. Quedan prohibidos los parches temporales que oculten deuda.

**Implementación:** archivo nuevo `CONVENTIONS.md`; referencias añadidas en `AGENTS.md`, `constitution.md`, `.opencode/skills/sdd/SKILL.md` y tareas de la Spec 001.

**Validación:** documentación verificada; sin cambios de código en esta entrada.

**Pendiente:** aplicar las convenciones al código existente y hacer un commit por tarea.

## 2026-11-26 — Refactor según convenciones

**Contexto:** el código inicial funcionaba, pero no seguía la estructura ni el estilo exigidos por `CONVENTIONS.md`.

**Decisiones:** `App.tsx` se movió a `src/app/`; el feature `access` se dividió en `components/`, `hooks/`, `rules/` y `types.ts`; la lógica del formulario pasó al hook `useAccessForm`; las reglas puras son funciones flecha; se eliminaron declaraciones `function`.

**Implementación:** archivos nuevos `types.ts`, `rules/accessRules.ts`, `hooks/useAccessForm.ts`, `components/AccessForm.tsx/.css`; `AccessView`, `WelcomeView`, `App` y `main.tsx` reescritos con sintaxis moderna. Se eliminaron los archivos antiguos `src/App.tsx` y `src/features/access/accessRules.ts`. Sin cambios de comportamiento.

**Validación:** `pnpm lint` y `pnpm build` correctos; búsqueda de `function` y `var` en TypeScript sin coincidencias. Las reglas puras se volverán a ejecutar en la siguiente tarea de validación.

**Pendiente:** validación final y commit por tarea.

## 2026-11-26 — Revalidación posterior al refactor

**Contexto:** el cambio de estructura podía romper imports o alterar el comportamiento de las reglas puras.

**Decisiones:** no se modifica el comportamiento; solo se comprueba que el refactor conserva los resultados acordados.

**Implementación:** sin cambios de código; actualización de tareas y de esta bitácora.

**Validación:** `pnpm lint` y `pnpm build` correctos tras el refactor. Reglas puras compiladas desde `src/features/access/rules/accessRules.ts` y ejecutadas: seis casos en verde. Búsqueda de `function` y `var` en TypeScript sin coincidencias.

**Pendiente:** validación manual en navegador de teclado/foco, móvil/escritorio, `prefers-reduced-motion` y pestaña Network; sustituir `2026` por el código definitivo; aprobar CSS Modules y React Router si se llegan a necesitar.

## 2026-11-26 — Foco visible del formulario mejorado

**Contexto:** el usuario revisó la vista en Chrome DevTools y no le gustó el foco del input: era el contorno gris/morado genérico del navegador.

**Decisiones:** el foco se diseña con un halo lila suave de 4px y borde violeta, en lugar del `outline` por defecto. El botón recibe el mismo tratamiento. Se documenta en `CONVENTIONS.md` que, si se suprime `outline`, debe existir fallback para `forced-colors`.

**Implementación:** `src/features/access/components/AccessForm.css` incorpora `--focus-ring`, transición de `box-shadow`, `:focus-visible` para input y botón, y un bloque `@media (forced-colors: active)` con contorno de 2px.

**Validación:** comprobado en Chrome DevTools con estilos computados: halo `rgba(128, 99, 158, 0.22) 0 0 0 4px` en input y botón, `outline: none`, `Tab` y `Shift+Tab` recorren campo y botón, y en colores forzados aparece `outline: 2px solid CanvasText`. `pnpm lint` y `pnpm build` correctos.

**Pendiente:** nada de esta tarea. Sigue pendiente sustituir el código temporal `2026`.

## 2026-11-26 — Spec 001 validada en navegador

**Contexto:** la validación manual estaba pendiente porque no se había comprobado el comportamiento real en un navegador. Se usaron las herramientas de Chrome DevTools disponibles en la sesión.

**Decisiones:** no se modifica el comportamiento. Se considera cerrada la T7 de la Spec 001 y se actualiza el estado de `AGENTS.md`.

**Implementación:** sin cambios de código; actualización de `specs/001-acceso/tasks.md`, `AGENTS.md` y esta bitácora.

**Validación:** `Tab` y `Shift+Tab` recorren campo y botón con foco visible; `1234 + Enter` muestra «Ese código no es correcto» con `role="alert"`; `2026 + Enter` muestra «Bienvenida, Isabela»; la recarga vuelve al acceso; no hay peticiones XHR/fetch; viewport móvil 390×844 y `prefers-reduced-motion: reduce` con transiciones de `0.16s` reducidas a `0.01ms`. `pnpm lint` y `pnpm build` correctos.

**Pendiente:** sustituir el código temporal `2026` por el definitivo antes del despliegue; aprobar CSS Modules y React Router cuando se necesiten.

## 2026-11-26 — React Router 8 y CSS Modules aprobados

**Contexto:** antes de escribir la spec del calendario había dos decisiones pendientes que afectaban su arquitectura: navegación por estado frente a rutas reales, y CSS global frente a CSS Modules.

**Decisiones:** se aprueba React Router (paquete `react-router`) para las cinco vistas previstas y se aprueba CSS Modules para los estilos de componentes. La versión concreta se ajustó a 8 el mismo día; ver entrada siguiente. Los tokens y estilos globales siguen en `design-system/` e `index.css`. El despliegue en Vercel requerirá un rewrite SPA a `index.html`.

**Documentación:** `AGENTS.md` mueve ambas decisiones a confirmadas, actualiza el stack, el orden de construcción y los comandos; `CONVENTIONS.md` fija `router.tsx`, Context de acceso, rutas protegidas con `<Navigate replace />` y el patrón `*.module.css`; `spec.md` de la Spec 001 aclara que esas decisiones son posteriores a su alcance.

**Validación:** documentación revisada; sin cambios de código ni dependencias instaladas todavía.

**Pendiente:** redactar la spec de la base de navegación y estilos con plan y tareas, y obtener aprobación antes de instalar o migrar.

## 2026-11-26 — React Router 8 instalado (T1 de Spec 002)

**Contexto:** la spec proponía la versión 7, pero `pnpm add react-router` descargó la 8. El usuario indicó que si se descargaba la 8, se usara la 8.

**Decisiones:** se mantiene `react-router@8.5.3` y se actualizan `AGENTS.md`, Spec 002 y esta bitácora. La API confirmada en la documentación de v8 es `createBrowserRouter` desde `react-router` y `RouterProvider` desde `react-router/dom`.

**Implementación:** instalación de la dependencia; `package.json` y `pnpm-lock.yaml` actualizados. Sin cambios de código todavía.

**Validación:** `pnpm build` terminó correctamente tras la instalación.

**Pendiente:** T2 a T6 de la Spec 002.

## 2026-11-26 — T2: CSS Modules en el acceso

**Contexto:** la Spec 002 exige estilos con scope local antes de crear más componentes.

**Decisiones:** los tres CSS del feature se renombran a `*.module.css`, las clases pasan a nombres simples en camelCase y se consumen con el objeto `styles`. `index.css` y `tokens.css` siguen siendo los únicos globales.

**Implementación:** `AccessView.module.css`, `WelcomeView.module.css` y `AccessForm.module.css`; sus TSX actualizados; se eliminaron los tres archivos CSS antiguos. Sin cambios de comportamiento.

**Validación:** `pnpm lint` y `pnpm build` correctos. En Chrome DevTools se observan clases con hash y el input enfocado conserva el halo `rgba(128, 99, 158, 0.22) 0 0 0 4px`.

**Pendiente:** T3 a T6 de la Spec 002.

## 2026-11-26 — T3: estado de acceso en Context

**Contexto:** `App.tsx` todavía guardaba el estado de acceso con `useState` y lo pasaba por props hasta el formulario.

**Decisiones:** el estado vive en `AccessProvider` (`app/providers/`), se consume con `useAccess` (`features/access/hooks/`) y una ruta `AccessRoute` elige entre acceso y bienvenida. `useAccess` lanza un error explícito si se usa fuera del provider.

**Implementación:** archivos nuevos `context.ts`, `hooks/useAccess.ts`, `providers/AccessProvider.tsx` y `AccessRoute.tsx`. `AccessForm` ya no recibe `onSuccess`; obtiene `unlock` del hook. `App.tsx` solo compone provider y ruta.

**Validación:** `pnpm lint` y `pnpm build` correctos. En Chrome DevTools: `1234` muestra el error, `2026` muestra la bienvenida y la recarga vuelve al acceso.

**Pendiente:** T4 a T6 de la Spec 002.

## 2026-11-26 — T4: router real con React Router 8

**Contexto:** la aplicación necesita URLs reales antes de añadir el calendario.

**Decisiones:** las únicas rutas son `/` y `*`. `createBrowserRouter` se importa desde `react-router` y `RouterProvider` desde `react-router/dom`, según la API de v8. No se crean rutas de vistas no aprobadas.

**Implementación:** `app/router.tsx`, `features/access/components/NotFoundView.tsx` y su módulo CSS; `App.tsx` monta `AccessProvider` fuera de `RouterProvider`.

**Validación:** `pnpm lint` y `pnpm build` correctos. En Chrome DevTools, `/` muestra acceso y `/no-existe` muestra «Esta página no existe» con enlace «Volver al inicio», que navega de vuelta a `/`.

**Pendiente:** T5 y T6 de la Spec 002.

## 2026-11-26 — T5: rewrite SPA en Vercel

**Contexto:** sin rewrite, una visita directa a una ruta del router devolvería 404 en Vercel.

**Decisión:** `vercel.json` reescribe `/(.*)` a `/index.html` y deja que el router decida qué vista mostrar. La documentación de Vercel confirma este patrón para SPAs.

**Implementación:** archivo `vercel.json` nuevo con `$schema` y la regla de rewrite.

**Validación:** JSON parseado con Node y regla comprobada. No se ha desplegado todavía; el comportamiento en Vercel queda por verificar en el despliegue final.

**Pendiente:** T6 de la Spec 002.

## 2026-11-26 — Spec 002 validada y cerrada

**Contexto:** última tarea de la Spec 002. Se validó el conjunto completo con lint, build y Chrome DevTools.

**Decisiones:** se considera cerrada la Spec 002; el router y los módulos CSS pasan a ser la base del proyecto. El estado del proyecto se actualiza en `AGENTS.md`.

**Implementación:** sin cambios de código; actualización de `spec.md`, `tasks.md`, `AGENTS.md` y esta bitácora.

**Validación:** `pnpm lint` y `pnpm build` correctos. Sin `function`, `var` ni `any` en TypeScript. En navegador: acceso, error anunciado, bienvenida y recarga; `Tab` y `Shift+Tab` con halo visible; `/no-existe` con enlace de vuelta; clases CSS con hash; sin peticiones XHR/fetch; viewport 390×844 y `prefers-reduced-motion: reduce`; `vercel.json` con rewrite correcto.

**Pendiente:** Spec 003 del calendario y sustituir el código temporal `2026`.

## 2026-11-26 — Decisiones para la Spec 003

**Contexto:** antes de redactar la spec del calendario quedaban tres decisiones que afectaban al modelo de datos y al comportamiento observable.

**Decisiones:**
- Se aprueba **Dexie** como wrapper de IndexedDB. IndexedDB ya era la decisión confirmada; Dexie solo reduce el código de esquema, transacciones y errores. No añade backend ni sincronización.
- Se descarta el estado **«completado»**. Abrir un día registra únicamente «visitado»; no se inventa una acción verificable para marcarlo.
- La fecha se interpreta con los componentes locales del dispositivo (`getFullYear`, `getMonth`, `getDate`), sin conversiones UTC. Un cambio de reloj o zona horaria recalcula el desbloqueo y se acepta explícitamente.
- La próxima spec agrupará calendario, fechas y persistencia en una sola unidad, porque el calendario debe mostrar el estado «visitado».

**Documentación:** `AGENTS.md` mueve Dexie a decisiones confirmadas y stack aprobado, elimina la política de completado de pendientes y aclara el criterio de zona horaria; `CONVENTIONS.md` añade reglas de dominio y persistencia.

**Validación:** documentación revisada; sin cambios de código ni dependencias instaladas todavía.

**Pendiente:** escribir `spec.md`, `plan.md` y `tasks.md` de la Spec 003 y obtener aprobación antes de implementar.

## 2026-11-26 — T1: Dexie instalado

**Contexto:** la Spec 003 necesita la dependencia aprobada para persistir visitas.

**Decisión:** se instala la versión que pnpm resuelve, `dexie@4.4.7`, sin fijar una versión anterior.

**Implementación:** `package.json` y `pnpm-lock.yaml` actualizados; sin código nuevo.

**Validación:** `pnpm build` terminó correctamente.

**Pendiente:** T2 a T8 de la Spec 003.

## 2026-11-26 — T2: reglas puras de fecha y estado

**Contexto:** el desbloqueo debe poder comprobarse sin navegador y no debe vivir en los componentes.

**Decisión:** las reglas se implementan con componentes de fecha local (`getFullYear`, `getMonth`, `getDate`) y una clave `año * 100 + mes`. Se añade `parseDayId` para validar el parámetro de la ruta. El script de casos usa Node 26 con type stripping, sin añadir Vitest.

**Implementación:** `features/calendar/types.ts`, `rules/dateRules.ts` y `rules/dateRules.check.ts`. Las importaciones entre módulos incluyen la extensión `.ts` para que Node pueda resolverlas.

**Validación:** 22/22 casos correctos; cubre 30/11, 1/12, 5/12, 31/12, 1/1/2027, 31/12/2025, identificadores inválidos y estados con/sin visita. `pnpm lint` y `pnpm build` correctos.

**Pendiente:** T3 a T8 de la Spec 003.

## 2026-11-26 — T3: esquema y acceso a IndexedDB

**Contexto:** las vistas no deben conocer Dexie ni abrir transacciones.

**Decisión:** un único object store `dayProgress` con `dayId` como clave primaria, versión 1. La escritura ocurre dentro de una transacción `rw` que lee el registro previo para conservar `firstVisit`.

**Implementación:** `shared/progress/types.ts` con `DayProgressRecord`, `StorageStatus` y `ProgressContextValue`; `database/db.ts` con la instancia de Dexie; `database/progress.ts` con `getVisitedDayIds` y `registerDayVisit`.

**Validación:** `pnpm lint` y `pnpm build` correctos. Búsqueda de importaciones: ninguna vista o componente importa Dexie ni el módulo de base de datos. La operación real contra IndexedDB se validará en T4 y T7.

**Pendiente:** T4 a T8 de la Spec 003.

## Plantilla para próximas entradas

```markdown
## YYYY-MM-DD — <Fase, decisión o cambio>

**Contexto:** qué motivó el trabajo.

**Decisiones:** qué se aprobó y qué alternativas se descartaron.

**Implementación:** archivos o módulos afectados; describir solo lo que realmente se hizo.

**Validación:** comandos ejecutados, pruebas y resultados observados.

**Pendiente:** asuntos que no quedaron resueltos.
```
