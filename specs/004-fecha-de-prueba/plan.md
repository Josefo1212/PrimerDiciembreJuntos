# Plan — Spec 004: fecha de prueba para desarrollo

## Objetivo y alcance

Añadir una herramienta de desarrollo, invisible en producción, para sustituir temporalmente la fecha local usada por las reglas de desbloqueo. El cambio se limita a la obtención de la fecha en vistas de calendario y sorpresa; las reglas puras y el registro de visitas no cambian su comportamiento.

## Estructura y responsabilidades

### `src/shared/time/previewDate.ts`

Módulo sin `import.meta.env` para poder comprobarlo con Node.

- `PREVIEW_DATE_STORAGE_KEY`: clave de `sessionStorage`.
- `parsePreviewDate(value: string): Date | null`: valida `AAAA-MM-DD` y construye la fecha a mediodía local.
- `formatPreviewDate(date: Date): string`: formatea una fecha local como `AAAA-MM-DD`.
- `getPreviewDate(): Date | null`: lee la sesión con manejo explícito de errores; si no hay almacenamiento, usa una variable en memoria.
- `setPreviewDate(value: string): boolean`: valida, guarda y devuelve si se aplicó.
- `clearPreviewDate(): void`: borra la fecha de la sesión y de memoria.

### `src/shared/time/unlockDate.ts`

- `getUnlockDate(): Date`: devuelve la fecha de prueba solo cuando `import.meta.env.DEV` es verdadero; en producción devuelve `new Date()`.
- Responsabilidad: único punto donde se decide qué fecha usa el desbloqueo.

### `src/features/calendar/components/DevDatePanel.tsx` y `.module.css`

- Formulario visible solo en desarrollo.
- Campo `type="date"`, botón «Aplicar fecha» y botón «Usar fecha real».
- Muestra un estado `aria-live="polite"` con la fecha activa.
- No usa animaciones.

### Modificaciones

- `CalendarView.tsx`: usar `getUnlockDate()` y renderizar `DevDatePanel`; una actualización local fuerza el recálculo de las tarjetas al aplicar o limpiar la fecha.
- `SurpriseView.tsx`: usar `getUnlockDate()` para decidir si el día está desbloqueado.
- `ProgressProvider.tsx`: conserva `new Date()` para las marcas de tiempo; añadir un comentario breve que evite una futura sustitución accidental.
- `rules/dateRules.ts`: sin cambios; sigue recibiendo la fecha como parámetro.

## Contratos TypeScript

```ts
type PreviewDateParseResult = Date | null
type ApplyPreviewDateResult = boolean
```

No se introducen tipos nuevos en el dominio del calendario. La fecha de prueba nunca se escribe en IndexedDB.

## Decisiones técnicas

- **Guard en `unlockDate.ts`, no en `previewDate.ts`:** así el módulo de parseo puede ejecutarse con Node y comprobarse sin `import.meta.env`.
- **`sessionStorage` con respaldo en memoria:** cubre navegación y recarga dentro de la pestaña sin persistir entre sesiones; si el almacenamiento falla, la herramienta sigue funcionando mientras la página esté viva.
- **Fecha a mediodía local:** evita que una conversión UTC cambie el día en zonas horarias distintas; coherente con la regla ya aprobada de usar componentes locales.
- **Sin rutas ni parámetros de URL:** la opción elegida es un panel visible en desarrollo; no se añade una superficie de URL adicional.
- **Sin cambios en `ProgressProvider`:** la fecha simulada no debe contaminar `firstVisit`/`lastVisit`.
- **Sin dependencias nuevas:** se aprovechan `sessionStorage`, `type="date"` y las comprobaciones existentes.

## Alternativas descartadas

- Cambiar el reloj del sistema: no deja una herramienta en el proyecto y afecta a todo el sistema.
- Parámetro `?previewDate=...`: no fue la opción elegida; además exigiría propagarlo por enlaces si se recarga una ruta.
- Modificar `vite.config.ts` para definir una fecha global: mezclaría compilación con comportamiento de sesión y no ofrecería una forma de volver a la fecha real.
- Hacer visible el panel en producción: permitiría alterar la barrera local de experiencia y fue descartado explícitamente.

## Estrategia de pruebas

- `previewDate.check.ts`: casos válidos, inválidos, formato local y manejo sin `sessionStorage`, ejecutables con Node.
- Navegador con `pnpm dev`: panel, aplicación y limpieza de fecha; estados del calendario; `/surprise/:dayId`; recarga y vuelta a fecha real.
- IndexedDB: comprobar que las marcas de tiempo siguen siendo la fecha real.
- Accesibilidad: teclado, foco visible y estado anunciado.
- `pnpm lint` y `pnpm build`.
- Búsqueda en `dist` de textos y clave de almacenamiento para verificar que la herramienta no llega a producción.

## Relación plan — requisitos

| Parte del plan | Requisitos cubiertos |
| --- | --- |
| `previewDate.ts` y `previewDate.check.ts` | RF-4, RF-6 |
| `unlockDate.ts` | RF-2, RF-7 |
| `DevDatePanel` | RF-1, RF-5, RF-8 |
| `CalendarView` y `SurpriseView` | RF-1, RF-2, RF-5 |
| `ProgressProvider` sin cambios funcionales | RF-3 |
| Build y búsqueda en `dist` | RF-7 |
| Sin dependencias nuevas | Requisitos no funcionales |
