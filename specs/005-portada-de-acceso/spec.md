# Spec 005 — Portada de acceso y bienvenida

Estado: **implementada y validada** el 26/11/2026.

## Contexto y objetivo

La pantalla de acceso cumple su función, pero visualmente es una tarjeta centrada con poca identidad. La bienvenida tampoco continúa una narrativa visual. El inicio debe sentirse como una portada preparada para Isabela: elegante, romántica y personal, sin convertirse en una pantalla infantil ni en un panel genérico.

El objetivo es rediseñar `/` y la bienvenida posterior con un motivo de sobre cerrado que se abre al entrar, usando la paleta confirmada y fuentes locales.

## Usuarios

- Isabela: ve una portada cuidada antes y después de introducir el código.
- Desarrollador: mantiene un flujo de acceso simple, accesible y sin cambios funcionales.

## Historias de usuario

- HU-1. Como Isabela, quiero sentir que el inicio es una invitación personal, no un formulario genérico.
- HU-2. Como Isabela, quiero encontrar el campo del código sin dificultad aunque la portada tenga detalles decorativos.
- HU-3. Como desarrollador, quiero conservar el acceso local, el error accesible y el estado en memoria sin añadir lógica nueva.
- HU-4. Como desarrollador, quiero que las fuentes y la decoración funcionen sin peticiones externas ni dependencias de animación.

## Definiciones

- **Portada:** composición visual de la pantalla de acceso, con sobre cerrado, fecha y título.
- **Motivo:** ilustración decorativa reutilizable, implementada con CSS/SVG y oculta a lectores de pantalla.
- **Sobre abierto:** continuación del motivo en la bienvenida, después de introducir el código correcto.
- **Nota manuscrita:** texto breve con Caveat; nunca información crítica.

## Requisitos funcionales

- **RF-1:** CUANDO se carga `/`, EL SISTEMA muestra una portada con sobre cerrado, fecha, título, descripción y formulario de acceso, conservando el comportamiento actual del código.
- **RF-2:** CUANDO el código es correcto, EL SISTEMA muestra una bienvenida con el sobre abierto, una nota manuscrita breve y el enlace «Abrir mi calendario».
- **RF-3:** CUANDO la interfaz carga, EL SISTEMA usa fuentes alojadas en el propio proyecto, sin peticiones a servicios externos.
- **RF-4:** EL SISTEMA marca toda la decoración del sobre como oculta para lectores de pantalla y no la hace interactiva.
- **RF-5:** MIENTRAS se usa un viewport móvil, EL SISTEMA apila portada, texto y formulario sin desbordamiento horizontal; en escritorio muestra una composición más amplia y equilibrada.
- **RF-6:** SI `prefers-reduced-motion` está activo, ENTONCES EL SISTEMA elimina el movimiento decorativo no esencial.
- **RF-7:** MIENTRAS se navega con teclado o `forced-colors` está activo, EL SISTEMA mantiene foco visible y contraste suficiente en campo, botón y enlace.
- **RF-8:** SI el código es incorrecto, ENTONCES EL SISTEMA muestra el error actual con `role="alert"` sin que la decoración interfiera.

## Requisitos no funcionales

- No cambiar el código de acceso temporal ni su persistencia en memoria.
- No añadir rutas, backend, IndexedDB ni contenido de los días.
- No usar Lucide React ni Framer Motion para esta fase.
- No añadir audio, video ni imágenes externas.
- Mantener CSS Modules y la paleta confirmada.
- Evitar que la decoración retrase la interacción con el formulario.

## Reglas de negocio

- El sobre cerrado representa la pantalla previa al acceso; el abierto representa la bienvenida.
- La decoración es accesoria: no comunica por sí sola errores, estado de acceso ni instrucciones.
- Las fuentes se importan solo en los pesos que se usan.

## Casos límite

- Pantalla estrecha: el motivo se reduce o se sitúa detrás del contenido sin tapar el formulario.
- Usuario conmovimiento reducido: el motivo permanece estático.
- Usuario con lector de pantalla: solo se anuncian fecha, título, descripción, formulario y enlace; nunca el sobre ni estrellas.
- Fuentes no cargadas: la interfaz conserva una pila de respaldo legible.
- Error de acceso: el mensaje mantiene su jerarquía y color sobre el fondo decorativo.

## Fuera de alcance

- Rediseñar calendario, sorpresas, memories o finale.
- Escribir contenido real de los 31 días.
- Cambiar el código `2026` o la política de acceso.
- Añadir animaciones con librerías externas.
- Usar fotos personales en esta fase.

## Criterios de aceptación

- `/` muestra la portada con sobre cerrado y el formulario sigue funcionando con `2026`; un código incorrecto muestra el error accesible.
- La bienvenida muestra el sobre abierto, la nota manuscrita y el enlace al calendario.
- Las tres fuentes se sirven desde el proyecto; no hay peticiones a Google Fonts ni a otros dominios.
- La decoración tiene `aria-hidden="true"` y no recibe foco.
- En 390×844 no hay desbordamiento horizontal; en 1280×800 la composición se ve equilibrada.
- Foco visible en campo, botón y enlace; `forced-colors` no elimina los indicadores de foco.
- Con `prefers-reduced-motion`, no hay animaciones decorativas.
- `pnpm lint` y `pnpm build` terminan correctamente.

## Dudas abiertas

Ninguna. El 26/11/2026 se confirmaron alcance, dirección visual e instalación de fuentes.
