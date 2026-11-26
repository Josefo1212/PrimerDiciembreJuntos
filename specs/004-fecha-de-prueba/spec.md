# Spec 004 — Fecha de prueba para desarrollo

Estado: **borrador**, pendiente de aprobación.

## Contexto y objetivo

La fecha real del dispositivo es 26/11/2026, por lo que el calendario de diciembre aparece completamente bloqueado. Durante el desarrollo y las pruebas hace falta poder ver los días desbloqueados sin esperar a que llegue diciembre ni cambiar el reloj del sistema.

El objetivo es añadir una herramienta temporal de desarrollo que simule la fecha local usada para calcular el desbloqueo. No debe alterar la experiencia pública ni los datos persistidos.

## Usuarios

- Desarrollador del proyecto, durante la validación local con `pnpm dev`.
- Isabela, en la versión desplegada: no debe ver ni poder usar esta herramienta.

## Historias de usuario

- HU-1. Como desarrollador, quiero elegir una fecha de prueba para ver qué días están disponibles y visitados sin cambiar el reloj del dispositivo.
- HU-2. Como desarrollador, quiero volver a la fecha real con una acción explícita para comprobar el estado auténtico del calendario.
- HU-3. Como desarrollador, quiero que la fecha de prueba sobreviva a la navegación entre rutas y a una recarga de la pestaña.
- HU-4. Como desarrollador, quiero que las visitas de prueba no escriban fechas falsas en el progreso persistido.

## Definiciones

- **Fecha real:** la que devuelve `new Date()` usando la configuración local del dispositivo.
- **Fecha de prueba:** una fecha elegida manualmente en la interfaz de desarrollo, guardada solo en la sesión de la pestaña.
- **Fecha de desbloqueo:** la fecha que usan las reglas de calendario y sorpresa; en desarrollo es la fecha de prueba si está activa, y en cualquier otro caso la fecha real.
- **Herramienta de desarrollo:** interfaz y lógica condicionadas a `import.meta.env.DEV`; no forman parte del bundle de producción.

## Requisitos funcionales

- **RF-1:** CUANDO la aplicación se ejecuta con `pnpm dev`, EL SISTEMA muestra en `/calendar` un panel de fecha de prueba con un selector de fecha, un botón «Aplicar fecha» y un botón «Usar fecha real».
- **RF-2:** CUANDO hay una fecha de prueba activa, EL SISTEMA calcula los estados de los 31 días y el desbloqueo de `/surprise/:dayId` con esa fecha.
- **RF-3:** CUANDO se registra una visita, EL SISTEMA usa siempre la fecha real para `firstVisit` y `lastVisit`, aunque haya una fecha de prueba activa.
- **RF-4:** CUANDO se aplica una fecha de prueba, EL SISTEMA la conserva durante la navegación por rutas y las recargas de la misma pestaña.
- **RF-5:** CUANDO se pulsa «Usar fecha real», EL SISTEMA elimina la fecha de prueba y recalcula el calendario con la fecha real.
- **RF-6:** SI la fecha introducida no es válida, ENTONCES EL SISTEMA no la aplica y mantiene la fecha anterior.
- **RF-7:** CUANDO la aplicación se compila para producción, EL SISTEMA no incluye el panel ni permite aplicar una fecha de prueba; todas las decisiones usan la fecha real.
- **RF-8:** MIENTRAS el panel está visible, EL SISTEMA mantiene etiquetas legibles, focovisible y un estado anunciado que indica si hay una fecha de prueba activa.

## Requisitos no funcionales

- No añadir dependencias.
- No persistir la fecha de prueba en IndexedDB ni entre sesiones del navegador.
- No usar la fecha de prueba como mecanismo de seguridad ni como sustituto del código de acceso.
- No introducir animaciones nuevas; si aparece algún efecto, debe respetar `prefers-reduced-motion`.
- El build de producción no debe contener los textos ni la lógica de la herramienta de desarrollo.

## Reglas de negocio

- La fecha de prueba se introduce en formato local `AAAA-MM-DD`, sin conversiones UTC.
- La fecha válida se interpreta a mediodía local para evitar cambios de día por zona horaria.
- La fecha de prueba solo sustituye a la fecha real en las reglas de desbloqueo y estado del calendario.
- El registro de visitas sigue siendo responsabilidad del proveedor de progreso y conserva la fecha real.

## Casos límite

- `sessionStorage` no disponible: la fecha de prueba se mantiene solo en memoria durante la sesión de la página; la aplicación sigue funcionando.
- Fecha mal formada, mes o día imposibles: se rechaza sin cambiar el estado.
- Recarga directa de `/surprise/:dayId` con fecha de prueba activa: la fecha sigue vigente en esa pestaña.
- Cierre de pestaña: se descarta la fecha de prueba.
- Build de producción con restos de una fecha de prueba en almacenamiento de sesión: se ignora por completo.

## Fuera de alcance

- Cambiar la regla de desbloqueo definitiva del producto.
- Añadir contenido real de los días.
- Modificar `firstVisit` o `lastVisit` con fechas simuladas.
- Publicar la herramienta en Vercel.
- Añadir autenticación o una barrera de seguridad basada en la fecha.

## Criterios de aceptación

- Con `pnpm dev` y sin fecha de prueba, `/calendar` muestra 31 días bloqueados porque la fecha real es anterior a diciembre de 2026.
- Al aplicar, por ejemplo, el 5/12/2026, los días 1–5 pasan a estar disponibles y los días 6–31 siguen bloqueados.
- Al abrir el día 1 con esa fecha de prueba, `/surprise/1` se muestra y el registro guardado en IndexedDB conserva la fecha real del dispositivo en `firstVisit` y `lastVisit`.
- Al volver al calendario y pulsar «Usar fecha real», vuelven a aparecer los 31 días bloqueados.
- La fecha de prueba sigue activa tras navegar a una sorpresa, recargar esa ruta y volver al calendario.
- El panel se puede usar con teclado, con foco visible y con un estado anunciado para lectores de pantalla.
- `pnpm lint` y `pnpm build` terminan correctamente.
- El directorio `dist` no contiene «Fecha de prueba», «Aplicar fecha», «Usar fecha real» ni la clave de almacenamiento de la fecha de prueba.

## Dudas abiertas

Ninguna. El 26/11/2026 se confirmó: panel solo en desarrollo, la fecha simulada afecta únicamente al desbloqueo y no a las visitas persistidas.
