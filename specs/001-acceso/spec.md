# Spec 001 — Acceso local inicial

Estado: **aprobada**

## Contexto y objetivo

La primera vista de la experiencia debe pedir un código secreto a Isabela antes de mostrar el calendario. Es una barrera de experiencia local, no autenticación ni seguridad real: no hay backend, no hay servidor contra el que validar y la fecha del dispositivo tampoco es una fuente confiable.

El objetivo es que la entrada se sienta personal y cuidada, coherente con la paleta confirmada en `PALETA.md`, sin convertirse en un panel de login genérico.

## Usuarios

- Isabela, en su dispositivo, que conoce el código y quiere entrar a su calendario.
- El desarrollador, durante el desarrollo, que necesita comprobar los estados de acceso sin exponer el código definitivo.

## Historias de usuario

- HU-1. Como Isabela, quiero introducir mi código para acceder a mi calendario.
- HU-2. Como Isabela, quiero recibir una respuesta clara si me equivoco, sin sentir que perdí el contenido.
- HU-3. Como desarrollador, quiero que la validación ocurra solo en el cliente, sin enviar el código a ningún servicio.

## Definiciones

- **Código temporal:** `2026`. Valor provisional de desarrollo, numérico, sustituible por el código real antes del despliegue.
- **Código correcto:** cadena compuesta solo por dígitos que, tras recortar espacios, es exactamente `2026`.
- **Acceso válido:** estado local que permite continuar hacia la pantalla provisional de bienvenida.
- **Barrera local:** comprobación hecha en el dispositivo, sin valor de seguridad.

## Requisitos funcionales

- **RF-1:** EL SISTEMA muestra la vista de acceso como primera pantalla de la aplicación.
- **RF-2:** CUANDO el usuario introduce el código correcto, EL SISTEMA le concede acceso.
- **RF-3:** CUANDO el usuario introduce un código incorrecto, EL SISTEMA no concede acceso y muestra un mensaje comprensible.
- **RF-4:** EL SISTEMA realiza la comparación del código únicamente en el cliente.
- **RF-5:** EL SISTEMA no envía el código introducido a ninguna red ni servicio externo.
- **RF-6:** MIENTRAS el acceso no es válido, EL SISTEMA no muestra el contenido del calendario.
- **RF-7:** EL SISTEMA permite completar la acción mediante teclado, con foco visible y etiqueta accesible en el campo.
- **RF-8:** CUANDO el campo contiene caracteres no numéricos, EL SISTEMA no concede acceso y muestra el mensaje «Solo números».
- **RF-9:** EL SISTEMA recorta espacios antes y después del código antes de compararlo.
- **RF-10:** EL SISTEMA no persiste el acceso; al recargar la página vuelve a mostrarse la vista de acceso.
- **RF-11:** CUANDO el código es correcto, EL SISTEMA muestra una pantalla provisional de bienvenida.
- **RF-12:** CUANDO el código es incorrecto, EL SISTEMA permite reintentar sin límite ni espera.

## Requisitos no funcionales

- La interfaz sigue la paleta confirmada en `PALETA.md`.
- Diseño mobile-first, adaptable a escritorio.
- Respeta `prefers-reduced-motion`.
- El mensaje de error es anunciable por tecnología de asistencia.
- No se almacena el código real en repositorios ni en servicios remotos; el valor temporal queda aislado en un único módulo para facilitar su sustitución.
- No se introducen dependencias nuevas en esta fase.

## Reglas de negocio

- El código es una barrera de experiencia, no autenticación.
- No existe bloqueo por intentos fallidos.
- No se afirma que el acceso esté respaldado, sincronizado o protegido.

## Casos límite

- Campo vacío al enviar: se trata como código incorrecto y muestra el mensaje correspondiente.
- Espacios accidentales antes o después del código: se recortan antes de comparar (RF-9).
- Caracteres no numéricos: mensaje «Solo números» (RF-8).
- Código correcto con el almacenamiento local no disponible: no aplica, porque no se usa almacenamiento (RF-10).
- Recarga de la página después de haber accedido: vuelve a la vista de acceso (RF-10).

## Fuera de alcance

- Calendario, sorpresas, memories y finale.
- Persistencia del progreso de los 31 días.
- Verificación de fecha del dispositivo.
- Cualquier servicio remoto o login real.
- Rutas con React Router; se decide en una fase posterior.

## Criterios de aceptación

- La vista de acceso es lo primero que se ve al abrir la aplicación.
- `2026` permite continuar; cualquier otro valor no.
- `  2026  ` permite continuar; `abc`, `20a6` y el campo vacío no.
- El error se entiende, es anunciable y no depende solo del color.
- La acción se puede completar con teclado, con foco visible.
- Al recargar, vuelve a aparecer la vista de acceso.
- Al acertar, aparece la pantalla provisional de bienvenida y no el calendario.
- No se realiza ninguna petición de red para validar el código.
- La vista respeta la paleta y `prefers-reduced-motion`.
- `pnpm lint` y `pnpm build` terminan correctamente.

## Decisiones cerradas (26/11/2026)

- Código temporal de desarrollo: `2026`, numérico y sustituible.
- Comparación: solo dígitos, con recorte de espacios; sin distinción de mayúsculas por no aplicar.
- Persistencia: ninguna; el código se pide en cada visita.
- Error: mensaje suave, reintentos ilimitados, sin espera.
- Tras acertar: pantalla provisional de bienvenida, sin rutas todavía.
- Estilos: CSS global con variables; CSS Modules queda pendiente de aprobación para fases posteriores.
