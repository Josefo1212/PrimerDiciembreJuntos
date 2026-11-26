# Plan — Spec 007: Portada de luna y estrellas

## Decisiones técnicas

- Se elimina `CoverMotif.tsx` y `CoverMotif.module.css`; no quedan referencias al sobre en código ni en textos.
- Se crea `MoonMotif.tsx` y `MoonMotif.module.css` con dos fases: `crescent` para acceso y `full` para bienvenida.
- La luna se construye con CSS: disco con degradado, cráteres sutiles, halo y, en fase creciente, una máscara radial que recorta el disco. La fase llena añade un anillo orbital delgado con un punto satélite.
- Las estrellas de fondo ya viven en `CoverScene`; el motivo añade solo dos destellos cercanos a la luna.
- Se reducen las animaciones: desaparecen `flapRest`, `flapOpen`, `letterOut`, `sealShine` y `sealLift`; quedan `sceneIn`, `rise`, `panelIn`, `twinkle`, `breathe`, `moonGlow` y `orbit`.
- `CoverScene` cambia la prop `variant` por `phase`, tipada desde `MoonMotif`.
- Se actualizan los textos de panel para hablar de noche/luna, no de sobre.

## Secuencia de tareas

1. T1 — crear `MoonMotif` y eliminar `CoverMotif`.
2. T2 — conectar `CoverScene` y las dos vistas; actualizar textos.
3. T3 — reducir y suavizar las animaciones restantes.
4. T4 — validar estáticamente y cerrar la spec.
