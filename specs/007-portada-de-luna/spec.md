# Spec 007 — Portada de luna y estrellas

Estado: **aprobada** el 26/11/2026.

## Contexto y objetivo

La Spec 006 sustituyó el sobre por una escena nocturna, pero el usuario no quiere que la luna se presente como un sobre que se abre. Prefiere un motivo de **luna y estrellas**, con la noche conservada y animación elegante y contenida.

El objetivo es eliminar el sobre, usar una luna como hilo conductor entre acceso y bienvenida y dejar una portada cinematográfica pero sobria.

## Decisiones confirmadas

- Motivo: luna y estrellas; se elimina el sobre y todas sus referencias visuales.
- Fondo: se mantiene la escena nocturna de la Spec 006.
- Movimiento: elegante y contenido; se reducen los `keyframes` y se eliminan los que pertenecían al sobre.
- Sin Framer Motion; CSS y Web Animations.
- Sin cambios en código de acceso, rutas ni persistencia.

## Historia de usuario

- Como Isabela, quiero una portada nocturna serena con una luna presente, sin objetos que se abran.
- Como desarrollador, quiero que la luna comunique continuidad entre acceso y bienvenida sin añadir texto ni interactividad.

## Requisitos funcionales

- **RF-1:** CUANDO se carga `/`, EL SISTEMA muestra una luna creciente, estrellas y el formulario dentro del panel nocturno.
- **RF-2:** CUANDO se introduce el código correcto, EL SISTEMA muestra la luna llena y el CTA al calendario, sin sobre ni carta.
- **RF-3:** EL SISTEMA elimina `CoverMotif` y cualquier texto que hable de sobre, carta o lacre en la portada.
- **RF-4:** EL SISTEMA mantiene las animaciones de entrada y el parpadeo de estrellas, con movimiento suave y sin rebotes llamativos.
- **RF-5:** Toda la decoración sigue siendo `aria-hidden` y no recibe foco.
- **RF-6:** Se conservan foco visible, `forced-colors`, `prefers-reduced-motion` y ausencia de desbordamiento móvil.
- **RF-7:** `pnpm lint` y `pnpm build` terminan correctamente y `dist` no contiene textos del sobre eliminado.

## Fuera de alcance

- Cambiar el código `2026` o la persistencia del acceso.
- Rediseñar el resto de la aplicación.
- Añadir dependencias o multimedia.

## Criterios de aceptación

- No existe `CoverMotif` ni textos de sobre/carta/lacre en `src` ni en `dist`.
- La luna es creciente en acceso y llena en bienvenida.
- Las animaciones restantes son suaves y se desactivan con movimiento reducido.
- Sin dependencias nuevas ni peticiones externas; lint y build correctos.
