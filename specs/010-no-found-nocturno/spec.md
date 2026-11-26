# Spec 010 — Not found nocturno

Estado: **implementada y validada en navegador** el 26/11/2026.

## Contexto y objetivo

Portada, calendario y vista de sorpresa ya comparten la escena nocturna. `NotFoundView`, que se usa tanto para rutas desconocidas como para identificadores de día inválidos, sigue con la paleta clara anterior y además no tiene foco visible ni reglas de `forced-colors`.

El objetivo es alinear esta vista con la misma noche y completar su accesibilidad, sin cambiar rutas ni mensajes.

## Historias de usuario

- HU-1. Como Isabela, quiero que incluso una ruta equivocada se sienta dentro de la misma experiencia nocturna.
- HU-2. Como Isabela, quiero volver al inicio con un enlace legible y foco visible.
- HU-3. Como desarrollador, quiero reutilizar los tokens nocturnos aprobados sin añadir dependencias ni lógica.

## Requisitos funcionales

- **RF-1:** CUANDO se muestra una ruta desconocida o un identificador de día inválido, EL SISTEMA muestra fondo plum profundo con halo lila y acentos dorados, coherente con el resto de la experiencia.
- **RF-2:** MIENTRAS se muestra el mensaje de no encontrado, EL SISTEMA usa tarjeta glass lila oscura, texto Warm Ivory, eyebrow dorado y enlace de retorno dorado.
- **RF-3:** EL SISTEMA conserva los textos actuales, las rutas y la ausencia de control de acceso en `*`; no cambia la redirección de días bloqueados.
- **RF-4:** EL SISTEMA mantiene foco visible, `forced-colors`, `prefers-reduced-motion` y sin desbordamiento a 390×844 ni a 1280×800.
- **RF-5:** `pnpm lint` y `pnpm build` terminan correctamente y la revisión en navegador comprueba ambas entradas a la vista.

## Criterios de aceptación

- `/no-existe` y `/surprise/abc` muestran la misma gama nocturna.
- El eyebrow, el título, el mensaje y el enlace son legibles y conservan su jerarquía.
- El enlace tiene foco visible y responde a `forced-colors` y movimiento reducido.
- No hay desbordamiento móvil ni de escritorio; consola y peticiones siguen limpias.
- `pnpm lint`, `pnpm build` y la validación en navegador terminan correctamente.
