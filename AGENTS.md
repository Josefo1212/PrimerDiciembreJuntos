# AGENTS.md — Primer Diciembre juntos

Aplicación web personal creada como un calendario de adviento extendido para Isabela. Contendrá una experiencia por cada día del **1 al 31 de diciembre de 2026**. Cada día presentará una sorpresa preparada por el desarrollador: cartas, fotografías, recuerdos, audio, videos, actividades interactivas y experiencias especiales.

Es un proyecto personal de alcance deliberadamente acotado: **un frontend estático, sin backend y sin base de datos remota**, desplegado en Vercel. La ausencia de backend no justifica descuidar la arquitectura, la experiencia de usuario, la accesibilidad ni la integridad del progreso local.

La regla general es: **hacerlo personal y pulido, no innecesariamente complejo**. Cada decisión técnica debe resolver una necesidad real. No agregar infraestructura, dependencias o abstracciones por anticipación.

**Nombre del proyecto:** `Primer Diciembre juntos`  
**Carpeta de trabajo:** `primerDiciembreJuntos`  
**Identificador de paquete / Vercel:** `primer-diciembre-juntos`  
No se usa subtítulo. El nombre no lleva sufijos de edición o variante.

**Idioma:** interfaz y contenido dirigidos a Isabela en español, salvo frases deliberadas en inglés puntuales. Código, identificadores, nombres de archivos y APIs en inglés, salvo que el dominio justifique lo contrario. Mantener una convención consistente: `camelCase` para variables y funciones TypeScript, `PascalCase` para componentes y tipos.

## Estado actual — leer antes de nada

El proyecto está en etapa de definición y preparación. Los documentos de referencia de Civik se usaron únicamente como modelo de estructura, profundidad y disciplina documental; sus decisiones de backend, Rust, PostgreSQL, hexagonalidad, auditoría y despliegue no se trasladan a este proyecto.

**Estado:** bootstrap ejecutado; Specs 001 de acceso, 002 de navegación y estilos, 003 de calendario y progreso, 004 de fecha de prueba y 005 de portada de acceso y bienvenida implementadas y validadas en navegador el 26/11/2026 (React 19 + TypeScript + Vite + pnpm + React Router 8 + CSS Modules + Dexie + Fontsource). El despliegue en Vercel quedó corregido con `outputDirectory: "dist"`. Tampoco asumir que las 31 sorpresas están escritas o que los recursos multimedia ya están organizados: el contenido actual es provisional.

### Decisiones confirmadas

- Aplicación de una sola página/interfaz React, sin backend.
- Sin base de datos remota ni servicios propios.
- Despliegue previsto en Vercel.
- Calendario de 31 días, del 1 al 31 de diciembre de 2026.
- Desbloqueo progresivo según la fecha local del dispositivo.
- Una vez que un día se desbloquea, puede volver a visitarse.
- IndexedDB se utilizará para persistir progreso y preferencias locales; Dexie es el wrapper aprobado e instalado en la Spec 003 para simplificar su acceso.
- El contenido estático de las sorpresas forma parte del bundle o de los assets estáticos. No se almacena en IndexedDB.
- El código de acceso, si se implementa, será una barrera de experiencia local, no autenticación ni seguridad real.
- La fecha del dispositivo puede modificarse; no se implementará una verificación de fecha confiable desde servidor.
- Durante el desarrollo existe un panel para simular la fecha local; afecta solo al desbloqueo, se guarda en la sesión de la pestaña, no toca las visitas persistidas y no se incluye en producción.
- Dirección visual: elegante, romántica y personal, con lavanda/lila como color protagonista y una estética Liquid Glass moderada.
- Diseño mobile-first, adaptable a escritorio, con respeto por `prefers-reduced-motion`.
- El audio no se reproduce automáticamente.
- React Router 8 para rutas reales, aprobado el 26/11/2026.
- CSS Modules para estilos de componentes, aprobado el 26/11/2026.
- Fuentes locales instaladas con Fontsource el 26/11/2026: Cormorant Garamond, DM Sans y Caveat; sin CDN.

### Decisiones propuestas o pendientes de aprobación

Los puntos que siguen siendo propuesta no deben convertirse silenciosamente en requisitos cerrados:

- React 19 + TypeScript estricto + Vite + pnpm.
- Framer Motion para animaciones y Lucide React para iconografía.
- `vite-plugin-pwa` para una posible fase PWA.
- Exportación/importación de progreso en JSON.
- Persistencia de la sesión de acceso.
- Texto/código de acceso definitivo.
- Contenido, título y formato concreto de cada uno de los 31 días.

Cuando una decisión pendiente afecte una spec, detenerse y pedir aclaración antes de implementarla.

## Stack previsto

Stack aprobado hasta ahora; el resto sigue propuesto hasta su aprobación explícita:

```text
React 19
TypeScript (strict)
Vite
pnpm
React Router 8 (paquete `react-router`) — aprobado 26/11/2026
Framer Motion
Lucide React
Dexie.js (IndexedDB, aprobado 26/11/2026)
CSS Modules (aprobado 26/11/2026) + CSS Variables
Fontsource (fuentes locales, aprobado 26/11/2026)
Vercel (hosting estático)
vite-plugin-pwa (opcional, fase posterior)
```

No incorporar Redux, Zustand, Axios, backend, PostgreSQL, ORM ni librerías de UI completas sin una necesidad demostrable. El estado compartido inicial puede resolverse con hooks y Context cuando corresponda.

Las fuentes quedaron instaladas e integradas en la Spec 005: Cormorant Garamond para títulos, DM Sans para interfaz y Caveat para detalles manuscritos puntuales. Se sirven desde el bundle, sin CDN.

## Producto y experiencia

### Propósito

Crear una experiencia privada, cuidada y navegable que acompañe a Isabela durante diciembre. El calendario no debe sentirse como un panel administrativo ni como una plantilla genérica: debe transmitir intención, continuidad y atención al detalle.

### Vistas previstas

1. **Welcome / Access (`/`)**: bienvenida y, si se mantiene la decisión, entrada mediante un código secreto local.
2. **Calendar (`/calendar`)**: calendario con los 31 días, estado de cada día y progreso.
3. **Surprise (`/surprise/:dayId`)**: presentación de la sorpresa correspondiente a un día.
4. **Memories (`/memories`)**: archivo de las sorpresas visitadas o completadas.
5. **Finale (`/finale`)**: experiencia especial del 31 de diciembre, con recapitulación y carta final.

Las rutas son una propuesta de organización. No crear todas las pantallas ni rutas antes de que sus specs estén aprobadas.

### Estados de los días

Distinguir explícitamente:

- **Bloqueado:** la fecha local todavía es anterior al día correspondiente.
- **Disponible:** la fecha ya permite abrir el día y todavía no se ha registrado como visitado.
- **Visitado:** se abrió anteriormente. Sigue disponible para volver a entrar.
- **Completado:** descartado el 26/11/2026. No existe hasta que se defina una acción verificable que lo justifique; abrir un día solo registra «visitado».

La disponibilidad se calcula a partir de la fecha local del dispositivo. IndexedDB conserva el historial/progreso, pero no decide por sí sola qué día está desbloqueado.

### Tipos de experiencias

Tipos contemplados, sin que esto implique que cada día tenga ya contenido definitivo:

- Carta o mensaje.
- Galería de fotografías.
- Recuerdo.
- Audio o música.
- Video o contenido multimedia.
- Actividad interactiva.
- Sorpresa especial.
- Experiencia final.

La distribución preliminar de tipos se puede revisar al elaborar el calendario editorial. No codificarla como una regla rígida antes de aprobar el contenido.

## Persistencia local

IndexedDB es almacenamiento local del navegador. No sincroniza datos entre dispositivos, navegadores ni perfiles.

Datos candidatos a persistir:

- Progreso por día: identificador del día, fecha de primera visita y última visita. El estado se deriva de la fecha local y de la existencia del registro; no se persiste.
- Preferencias de interfaz que realmente existan.
- Estado de acceso local, únicamente si se decide que debe sobrevivir al cierre del navegador.

No guardar en IndexedDB el texto de cartas, fotos, videos, audios ni el contenido principal de las sorpresas. Ese contenido es estático y debe residir en el proyecto o en sus assets.

Un registro por día con `dayId` como clave primaria es el esquema descrito en la Spec 003, que debe implementarse antes de escribir a IndexedDB.

La aplicación debe tolerar que el almacenamiento del navegador se borre, que el usuario cambie de navegador o que IndexedDB no esté disponible. Definir comportamiento de error y una experiencia degradada; no fingir que los datos se sincronizan o respaldan automáticamente.

## Reglas de fecha

- La fecha objetivo es diciembre de 2026.
- El calendario muestra los días 1–31.
- La regla de desbloqueo utiliza la fecha local del dispositivo.
- Un día anterior al día local actual está desbloqueado.
- El día actual está desbloqueado.
- Un día futuro permanece bloqueado.
- Después del 31 de diciembre, todos los días pueden permanecer accesibles.
- La navegación directa a una ruta de día no debe permitir saltarse el bloqueo.
- La fecha local no es una fuente confiable de seguridad. Cambiar el reloj del dispositivo puede alterar el desbloqueo y esto se acepta explícitamente para un proyecto sin servidor.

Aclarado el 26/11/2026: se leen los componentes locales del dispositivo (`getFullYear`, `getMonth`, `getDate`), sin conversiones UTC. Si el dispositivo cambia de zona horaria o de reloj, el desbloqueo se recalcula con la nueva fecha local; esto se acepta explícitamente por tratarse de una barrera local sin servidor.

## Dirección visual

### Identidad

- Lavanda y lila como base cromática, porque es el color favorito de Isabela.
- Sensación romántica, elegante, cálida y personal.
- Liquid Glass moderado: reservar blur/transparencias para superficies flotantes o elementos destacados.
- Diciembre como contexto estacional sutil; evitar saturación de símbolos navideños.
- Evitar estética infantil, exceso de brillos, gradientes agresivos o una interfaz que parezca un dashboard empresarial.

### Paleta confirmada

La paleta quedó cerrada el 26/11/2026 y se documenta en `PALETA.md`.

```css
--lavender-mist: #F8F5FC;
--soft-lilac: #EAE0F5;
--pastel-lilac: #CDB5E8;
--lavender: #A98BCB;
--dusty-violet: #80639E;
--deep-plum: #514064;
--blush-pink: #E9CADB;
--warm-ivory: #F6EEDF;
--surface: #FFFFFF;
```

La distribución por uso está en `PALETA.md`. Seguir validando contraste y legibilidad en los estados reales de la interfaz.

### Tipografía confirmada

- Cormorant Garamond: títulos y encabezados expresivos.
- DM Sans: interfaz, controles y texto de lectura.
- Caveat: notas manuscritas breves y ocasionales.
- Instaladas con Fontsource e importadas desde `src/main.tsx`; las variables están en `src/index.css`.

### UX y accesibilidad

- Mobile-first; comprobar también tablet y escritorio.
- Objetivos táctiles cómodos y estados interactivos claros.
- Navegación por teclado y foco visible.
- Contraste suficiente en texto, botones y estados.
- `prefers-reduced-motion` debe reducir o eliminar animaciones no esenciales.
- No usar autoplay para audio o video con sonido.
- Cargar multimedia bajo demanda y ofrecer controles nativos o accesibles.
- No depender exclusivamente del color para comunicar bloqueado, disponible, visitado o completado.
- Evitar transiciones que retrasen el acceso al contenido.

## Arquitectura y estructura de carpetas

Estructura objetivo, sujeta a evolución conforme existan módulos reales:

```text
primerDiciembreJuntos/
├── public/
│   ├── icons/
│   └── media/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── design-system/
│   │   ├── tokens.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── glass.css
│   ├── features/
│   │   ├── access/
│   │   ├── calendar/
│   │   ├── surprises/
│   │   ├── memories/
│   │   └── finale/
│   ├── data/
│   ├── database/
│   ├── shared/
│   ├── styles/
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**No crear una carpeta hasta que haya código real que la llene.** Evitar `utils/` o `helpers/` genéricos. Compartir componentes o lógica solo cuando exista una responsabilidad común clara.

Responsabilidades sugeridas:

- `app/`: composición de la aplicación, router y providers globales.
- `components/ui/`: controles visuales reutilizables y sin lógica de dominio.
- `components/layout/`: estructura compartida de pantallas.
- `design-system/`: tokens, tipografía, animaciones y estilos de superficies.
- `features/`: módulos organizados por experiencia/funcionalidad.
- `data/`: definición estática de días y contenido de las sorpresas.
- `database/`: esquema y acceso a IndexedDB mediante Dexie.
- `shared/`: código realmente compartido entre módulos.
- `styles/`: estilos globales y resets.

No introducir capas de servicios/repositorios/puertos por imitación de un backend. La separación debe responder al tamaño real del frontend.

## Orden de construcción propuesto

El orden definitivo se aprueba fase por fase mediante SDD.

1. **Bootstrap y base visual:** crear proyecto, configurar TypeScript, scripts, estructura mínima, estilos globales y tokens.
2. **Welcome / Access:** construir bienvenida y resolver el comportamiento del código local, si se mantiene.
3. **Base de navegación y estilos:** instalar React Router 8, migrar a CSS Modules y configurar el rewrite de Vercel.
4. **Calendario:** cuadrícula de 31 días, estados visuales y navegación.
5. **Persistencia y fechas:** IndexedDB, progreso, desbloqueo por fecha y casos de error.
6. **Motor de sorpresas:** modelo de contenido y renderizado de los tipos aprobados.
7. **Memories y Finale:** archivo de visitas y experiencia especial final.
8. **PWA opcional:** instalación y comportamiento offline, solo si se aprueba.
9. **Validación y despliegue:** pruebas, accesibilidad, rendimiento, revisión responsive y Vercel.

## Comandos previstos

Bootstrap ejecutado el 26/11/2026 en la carpeta existente; la documentación se conservó:

```bash
pnpm create vite . --template react-ts
pnpm install
pnpm dev
```

Después se renombraron la carpeta a `primerDiciembreJuntos` y el paquete a `primer-diciembre-juntos`. React Router 8 y CSS Modules están aprobados; el resto de dependencias siguen pendientes.

Dependencias posteriores, solo cuando la fase correspondiente esté aprobada:

```bash
pnpm add react-router
pnpm add dexie
pnpm add @fontsource/cormorant-garamond @fontsource/dm-sans @fontsource/caveat
pnpm add -D vite-plugin-pwa
```

Scripts esperados:

```bash
pnpm dev
pnpm lint
pnpm build
pnpm preview
```

`pnpm build` debe terminar correctamente antes de considerar una fase validada. No afirmar que un comando pasó sin ejecutarlo.

## Criterios de calidad

- Aplicar siempre las convenciones de `CONVENTIONS.md`.
- Usar funciones flecha; no declaraciones `function`.
- Separar vistas, componentes, hooks y reglas puras según la estructura de `CONVENTIONS.md`.
- Cada tarea validada termina con un commit; no agrupar tareas distintas en un mismo commit.
- TypeScript estricto; evitar `any` salvo justificación documentada.
- Componentes pequeños con responsabilidades claras; no fragmentar por deporte.
- Lógica de fechas y desbloqueo separada de la presentación para poder probarla.
- Persistencia encapsulada; las vistas no deben manipular IndexedDB directamente.
- Manejo explícito de errores de almacenamiento.
- Evitar dependencias redundantes y abstracciones prematuras.
- No almacenar secretos reales ni datos sensibles en el cliente.
- Probar navegación directa, recarga, cambio de fecha, estados del calendario y pérdida/no disponibilidad del almacenamiento.
- Verificar diseño en viewport móvil y escritorio, teclado, contraste y movimiento reducido.
- Optimizar imágenes y cargar audio/video solo cuando se soliciten.

## Documentación del proyecto

- `AGENTS.md`: contexto operativo, decisiones, arquitectura, estructura y estado.
- `constitution.md`: principios técnicos innegociables.
- `CONVENTIONS.md`: convenciones de código, estructura y commits.
- `PALETA.md`: paleta confirmada, tokens y distribución por uso.
- `SKILL.md`: metodología de trabajo SDD y reglas de aprobación.
- `bitacora.md`: registro cronológico de decisiones, fases, pruebas y cambios.
- `specs/`: requisitos, planes y tareas por funcionalidad/fase.

Al terminar una fase aprobada, actualizar `AGENTS.md` y `bitacora.md`. Mantener claramente separados los hechos implementados, las decisiones aprobadas y las propuestas pendientes.
