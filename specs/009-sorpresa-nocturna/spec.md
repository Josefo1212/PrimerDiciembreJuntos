# Spec 009 — Sorpresa nocturna

Estado: **implementada y validada en navegador** el 26/11/2026.

## Contexto y objetivo

La Spec 008 llevó la gama nocturna de la portada al calendario. Al abrir un día desbloqueado, `SurpriseView` sigue usando la paleta clara anterior, lo que rompe la continuidad justo en el momento más importante del recorrido.

El objetivo es que la vista de sorpresa use la misma noche: plum profundo, halo lila, superficie glass y acentos dorados, sin alterar lo que hace la vista.

## Historias de usuario

- HU-1. Como Isabela, quiero que abrir un día se sienta como continuar la noche del calendario.
- HU-2. Como Isabela, quiero leer el mensaje del día con buen contraste y volver al calendario sin esfuerzo.
- HU-3. Como desarrollador, quiero reutilizar los tokens nocturnos ya aprobados, sin añadir dependencias ni cambiar reglas.

## Requisitos funcionales

- **RF-1:** CUANDO se abre un día desbloqueado en `/surprise/:dayId`, EL SISTEMA muestra un fondo plum profundo con halo lila y acentos dorados, coherente con portada y calendario.
- **RF-2:** MIENTRAS se muestra la sorpresa, EL SISTEMA presenta el mensaje sobre una tarjeta glass lila oscura, con texto Warm Ivory, eyebrow dorado y enlace de retorno dorado.
- **RF-3:** EL SISTEMA conserva el contenido provisional, el registro de visita, la redirección de días bloqueados y las rutas actuales.
- **RF-4:** EL SISTEMA mantiene foco visible, `forced-colors`, `prefers-reduced-motion` y sin desbordamiento a 390×844 ni a 1280×800.
- **RF-5:** `pnpm lint` y `pnpm build` terminan correctamente y la revisión en navegador comprueba la vista real.

## Criterios de aceptación

- La vista de día usa la misma gama nocturna que portada y calendario.
- El mensaje, el eyebrow y el enlace de retorno son legibles y mantienen su jerarquía.
- Abrir un día sigue marcando la visita; un día bloqueado sigue redirigiendo al calendario.
- Foco, `forced-colors` y movimiento reducido siguen funcionando; no hay desbordamiento móvil ni de escritorio.
- `pnpm lint`, `pnpm build` y la validación en navegador terminan correctamente.

## Fuera de alcance

- Escribir o cambiar el contenido definitivo de las 31 sorpresas.
- Ajustar `NotFoundView`, `/memories` o `/finale`.
- Modificar fechas, persistencia, acceso ni dependencias.
