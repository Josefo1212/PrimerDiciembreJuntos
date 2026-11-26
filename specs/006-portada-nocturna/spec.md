# Spec 006 — Portada nocturna y animaciones

Estado: **implementada y validada estáticamente** el 26/11/2026.

## Contexto y objetivo

La Spec 005 dejó una portada clara que el usuario no considera suficientemente profesional ni elaborada. Se pide una dirección más cinematográfica, con más capas visuales, animaciones y transiciones, sin cambiar el flujo de acceso.

El objetivo es convertir el inicio en una escena de noche de diciembre: fondo plum profundo, halo lila, estrellas sutiles, sello dorado y un sobre físico más detallado que se abre al entrar.

## Decisiones confirmadas

- Dirección: **Noche de diciembre**.
- Motor de animación: **CSS y Web Animations**, sin Framer Motion.
- Motivo: conservar y enriquecer el sobre cerrado/abierto.
- No cambiar código de acceso, rutas, persistencia ni contenido de los días.

## Usuarios e historias

- HU-1. Como Isabela, quiero una portada que se sienta cuidada y especial desde el primer segundo.
- HU-2. Como Isabela, quiero que la transición al entrar acompañe la sensación de abrir un sobre.
- HU-3. Como desarrollador, quiero animaciones que respeten `prefers-reduced-motion` y no bloqueen el formulario.
- HU-4. Como desarrollador, quiero mantener foco visible y contraste suficiente sobre el fondo oscuro.

## Requisitos funcionales

- **RF-1:** CUANDO se carga `/`, EL SISTEMA muestra una escena nocturna con estrellas decorativas, halo lila, título jerárquico y panel glass con el sobre cerrado.
- **RF-2:** CUANDO se introduce el código correcto, EL SISTEMA muestra la misma escena con el sobre abierto, la carta desplegada y el CTA al calendario.
- **RF-3:** CUANDO aparece una vista, EL SISTEMA reproduce una entrada escalonada y ligera de texto, panel y motivo; con movimiento reducido muestra el estado final sin animación.
- **RF-4:** MIENTRAS el usuario interactúa, EL SISTEMA usa transiciones suaves en botones, enlaces, foco y estado de error.
- **RF-5:** EL SISTEMA mantiene toda la decoración con `aria-hidden="true"`, sin foco ni anuncios.
- **RF-6:** MIENTRAS `forced-colors` está activo, EL SISTEMA preserva bordes, contraste e indicadores de foco.
- **RF-7:** EN viewport móvil, EL SISTEMA apila la escena sin desbordamiento; en escritorio usa dos columnas equilibradas.
- **RF-8:** EL SISTEMA no añade dependencias de animación ni peticiones externas.

## Requisitos no funcionales

- Las animaciones duran como máximo 900 ms y no retrasan el uso del campo de código.
- Los colores nocturnos y dorados se documentan como extensiones de la paleta.
- Se mantiene CSS Modules y TypeScript estricto.
- No se usa audio ni video automático.

## Casos límite

- Usuario con movimiento reducido: ve el estado final de cada elemento sin esperar animaciones.
- Usuario con lector de pantalla: solo escucha título, descripción, formulario, error y CTA.
- Fondo oscuro con `forced-colors`: el sistema usa colores del sistema para texto, bordes y foco.
- Pantalla estrecha: estrellas y halo se recortan sin provocar scroll horizontal.

## Fuera de alcance

- Cambiar el código `2026` o la persistencia del acceso.
- Rediseñar calendario, sorpresas, memories o finale.
- Añadir Framer Motion, Lucide React o librerías de partículas.
- Escribir contenido real de los 31 días.

## Criterios de aceptación

- `/` muestra la escena nocturna y el sobre cerrado; `2026` abre la bienvenida con el sobre abierto y la carta visible.
- Las animaciones de entrada se ejecutan al cargar cada vista y desaparecen con `prefers-reduced-motion`.
- Foco visible, `forced-colors` sin pérdida de contraste y sin desbordamiento a 390×844.
- Sin dependencias nuevas de animación ni peticiones a dominios externos.
- `pnpm lint` y `pnpm build` terminan correctamente.
