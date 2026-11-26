# Spec 008 — Calendario nocturno

Estado: **aprobada** el 26/11/2026.

## Contexto y objetivo

La Spec 007 dio a la portada una escena nocturna de plum profundo, halo lila y acentos dorados. El calendario conserva todavía la gama clara anterior, por lo que el paso de la bienvenida al calendario rompe la continuidad visual.

El objetivo es aplicar al calendario la misma gama cromática de la portada, sin cambiar su estructura, sus estados ni sus reglas.

## Decisiones confirmadas

- Fondo nocturno completo, igual que la portada.
- Se conserva el sistema actual de estados: `Bloqueado`, `Disponible` y `Visitado`, con el símbolo `✓` en visitados.
- El color refuerza el estado, pero no lo comunica en exclusiva.
- Se reutilizan los tokens `--night`, `--night-soft`, `--gold` y `--gold-light`; no se añaden colores nuevos.
- No cambian fecha, desbloqueo, progreso, rutas ni contenido.

## Historias de usuario

- HU-1. Como Isabela, quiero que el calendario se sienta continuación de la noche de la portada.
- HU-2. Como Isabela, quiero seguir distinguiendo sin esfuerzo qué días están bloqueados, disponibles y visitados.
- HU-3. Como desarrollador, quiero reutilizar la paleta ya aprobada sin duplicar valores ni añadir dependencias.

## Requisitos funcionales

- **RF-1:** CUANDO se abre `/calendar` con acceso desbloqueado, EL SISTEMA muestra fondo plum profundo con halo lila y acentos dorados, coherente con la portada.
- **RF-2:** MIENTRAS se muestran los 31 días, EL SISTEMA conserva las etiquetas `Bloqueado`, `Disponible` y `Visitado` y el `✓` de los días visitados.
- **RF-3:** CUANDO se representa un día, EL SISTEMA usa una tarjeta glass lila sobre el fondo nocturno, con los tres estados diferenciados por borde, relleno y texto legible.
- **RF-4:** CUANDO se muestra la advertencia de almacenamiento o el panel de fecha de prueba, EL SISTEMA aplica la misma gama sin reducir contraste ni foco.
- **RF-5:** EL SISTEMA mantiene foco visible, `forced-colors`, `prefers-reduced-motion` y sin desbordamiento a 390×844.
- **RF-6:** EL SISTEMA no modifica las reglas de fecha, la persistencia, las rutas ni el contenido de los días.
- **RF-7:** `pnpm lint` y `pnpm build` terminan correctamente y la revisión en navegador comprueba el flujo y los estados reales.

## Criterios de aceptación

- El calendario usa la misma gama nocturna que la portada y mantiene las tres etiquetas y el check.
- Los días bloqueados, disponibles y visitados siguen siendo distinguibles sin depender solo del color.
- Foco, `forced-colors` y movimiento reducido siguen funcionando; no hay desbordamiento móvil.
- El panel de fecha de prueba sigue existiendo solo en desarrollo y las reglas de desbloqueo no cambian.
- `pnpm lint`, `pnpm build` y la validación en navegador terminan correctamente.
