# Tareas — Spec 010: Not found nocturno

- [x] **T1. Alinear `NotFoundView` con la noche y validarla.** RF-1 a RF-5.
  - Hecho cuando: `NotFoundView.module.css` usa fondo nocturno, tarjeta glass, texto Warm Ivory, eyebrow y enlace dorados, con foco, `forced-colors` y movimiento reducido; se comprueban `/no-existe` y `/surprise/abc`, móvil/escritorio, consola y peticiones; `pnpm lint` y `pnpm build` terminan correctamente y la documentación queda actualizada.
  - **Resultado:** `/no-existe` y `/surprise/abc` muestran el mismo plum/lila con halo, tarjeta glass `rgba(46, 34, 64, 0.72)`, eyebrow y enlace Gold Light. A 390×844 y 1280×800 no hay desbordamiento y la tarjeta queda centrada. Se añadieron foco dorado, `forced-colors` y movimiento reducido, que antes faltaban. Consola sin errores y peticiones solo locales. `pnpm lint` y `pnpm build` correctos.
