# Tareas — Spec 007: Portada de luna y estrellas

- [x] **T1. Crear el motivo lunar y eliminar el sobre.** RF-1, RF-2, RF-3, RF-5.
  - Hecho cuando: existe `MoonMotif` con fases `crescent` y `full`, `CoverMotif` y sus referencias desaparecen, y `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `MoonMotif.tsx` y `MoonMotif.module.css` construyen la luna con CSS: disco texturizado, cráteres sutiles, halo, destellos y órbita solo en fase llena. Se eliminan `CoverMotif.tsx` y `CoverMotif.module.css`. El motivo sigue siendo `aria-hidden`. `pnpm lint` y `pnpm build` correctos.

- [x] **T2. Conectar la escena y actualizar los textos.** RF-1, RF-2, RF-3.
  - Hecho cuando: `CoverScene` usa `phase` y las vistas muestran luna creciente en acceso y llena en bienvenida, sin textos de sobre/carta/lacre; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** `CoverScene` cambia `variant` por `phase` y renderiza `MoonMotif`. Acceso usa luna creciente con «La noche te espera» y «Descubre tu diciembre»; bienvenida usa luna llena con «La luna está contigo» y la nota «Esta noche es tuya.». `grep` no encuentra sobre/carta/lacre/flap/seal en `src`. Ambas tareas se entregan juntas porque el contrato de `CoverScene` y las vistas debían cambiar a la vez para que el build siga siendo válido. `pnpm lint` y `pnpm build` correctos.

- [x] **T3. Suavizar el movimiento.** RF-4, RF-6.
  - Hecho cuando: solo quedan animaciones suaves de entrada, estrellas, halo, luna y órbita; movimiento reducido y `forced-colors` siguen cubiertos; `pnpm lint` y `pnpm build` terminan correctamente.
  - **Resultado:** las entradas bajan a 560–640 ms con desplazamientos de 12–16 px y escalado casi imperceptible. El parpadeo de estrellas y destellos pasa a rangos de opacidad 0.35–0.85 y 0.4–0.9 con escalado 0.9–1.1; halo, luna y órbita usan ciclos de 12–32 s. Se conservan `prefers-reduced-motion` y `forced-colors`. `pnpm lint` y `pnpm build` correctos.

- [x] **T4. Validar y cerrar la spec.** RF-1 a RF-7.
  - Hecho cuando: se verifica que no hay rastro del sobre en `src` ni `dist`, se revisa el bundle, se actualiza documentación y se registra con honestidad la validación visual pendiente.
  - **Resultado:** `pnpm lint` y `pnpm build` correctos. En `src` y en el bundle no aparecen sobre/carta/lacre ni los textos antiguos; sí aparecen los cuatro textos nuevos. `dist` contiene 10 `@keyframes` (los del sobre desaparecieron) y las reglas `prefers-reduced-motion` y `forced-colors`. No hay URLs externas en HTML/CSS ni `fetch`/`XMLHttpRequest`/URLs en el código fuente; el JS de Dexie incluye un `bit.ly` dentro de un mensaje de error, no como petición. No hay dependencias de Framer Motion/Lucide ni `function`, `var` o `any`. **Validación visual y funcional en navegador pendiente**: no hay herramienta de navegador en esta sesión; debe comprobarse con `pnpm dev` el flujo `2026`/error, foco, responsive y apariencia final. Documentación actualizada.
