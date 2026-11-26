# Spec 003 — Calendario, fechas y progreso local

Estado: **borrador**, pendiente de aprobación del texto. Las decisiones de fondo (Dexie, ausencia de «completado» e interpretación de la fecha local) fueron aprobadas el 26/11/2026.

## Contexto y objetivo

Las Specs 001 y 002 dejaron una base con acceso local por código, rutas reales y estilos con scope. Todavía no existe calendario ni progreso: la bienvenida es provisional y no hay forma de abrir los días.

Esta spec define el calendario de 31 días, la regla de desbloqueo por fecha local y el registro local de visitas. Se agrupan en una sola spec porque el calendario debe mostrar el estado «visitado»; separar la persistencia obligaría a rehacer la cuadrícula.

El objetivo es que Isabela pueda entrar, ver qué días ya puede abrir y volver a ellos, con un progreso que sobrevive a la recarga en el mismo navegador sin fingir sincronización entre dispositivos.

## Usuarios

- Isabela, que quiere ver su calendario y saber qué días tiene disponibles hoy.
- El desarrollador, que necesita una regla de fechas comprobable y una capa de progreso aislada de las vistas.

## Historias de usuario

- HU-1. Como Isabela, quiero ver los 31 días con su estado para saber cuáles puedo abrir hoy.
- HU-2. Como Isabela, quiero que los días que ya abrí sigan marcados al recargar para poder revivirlos.
- HU-3. Como Isabela, quiero que no se me permita abrir un día futuro aunque escriba la URL directamente.
- HU-4. Como desarrollador, quiero una regla pura de desbloqueo que pueda comprobarse sin navegador.
- HU-5. Como desarrollador, quiero encapsular IndexedDB para que las vistas no conozcan Dexie.
- HU-6. Como desarrollador, quiero una experiencia degradada explícita si el almacenamiento del navegador falla.

## Definiciones

- **Día:** un número entero del 1 al 31, correspondiente a diciembre de 2026.
- **Fecha local:** los componentes de la fecha del dispositivo leídos con `getFullYear()`, `getMonth()` y `getDate()`, sin conversiones a UTC.
- **Bloqueado:** la fecha local es anterior al día correspondiente; no se puede abrir.
- **Disponible:** la fecha local permite abrir el día y todavía no existe registro de visita.
- **Visitado:** existe un registro de visita para ese día; sigue abierto para volver a entrar.
- **Completado:** estado descartado. No se implementa.
- **Visita:** acción de abrir una sorpresa desbloqueada. La primera visita fija `firstVisit`; cada apertura actualiza `lastVisit`.
- **Progreso:** número de días visitados, de 0 a 31.
- **Almacenamiento no disponible:** IndexedDB no existe en el navegador o una operación de lectura/escritura terminó en error.
- **Contenido provisional:** texto temporal del día 1 al 31, sin cartas, fotos ni multimedia definitivos.

## Requisitos funcionales

- **RF-1:** EL SISTEMA calcula el estado de cada día a partir de la fecha local del dispositivo y de la existencia de un registro de visita.
- **RF-2:** CUANDO la fecha local es anterior al 1 de diciembre de 2026, EL SISTEMA muestra los 31 días bloqueados.
- **RF-3:** CUANDO la fecha local está dentro de diciembre de 2026, EL SISTEMA desbloquea los días del 1 al día actual inclusive y bloquea los restantes.
- **RF-4:** CUANDO la fecha local es posterior al 31 de diciembre de 2026, EL SISTEMA desbloquea los 31 días.
- **RF-5:** CUANDO se abre una sorpresa desbloqueada, EL SISTEMA muestra un contenido provisional que identifica el día y registra la visita.
- **RF-6:** CUANDO se abre de nuevo un día ya visitado, EL SISTEMA conserva `firstVisit` y actualiza `lastVisit`.
- **RF-7:** SI se navega directamente a una sorpresa bloqueada, EL SISTEMA redirige a `/calendar` sin registrar la visita.
- **RF-8:** SI el identificador de la ruta no es un entero del 1 al 31, EL SISTEMA muestra la vista de página no encontrada.
- **RF-9:** SI el acceso no es válido, EL SISTEMA redirige `/calendar` y `/surprise/:dayId` a `/`.
- **RF-10:** CUANDO el acceso se valida, EL SISTEMA ofrece en la bienvenida un enlace «Abrir mi calendario» hacia `/calendar`, sin navegar automáticamente.
- **RF-11:** EL SISTEMA muestra 31 tarjetas con el número del día, el estado indicado con texto y forma además del color, y el progreso «N de 31 días visitados».
- **RF-12:** EL SISTEMA persiste cada visita en IndexedDB mediante Dexie, con un registro por `dayId`.
- **RF-13:** AL RECARGAR la aplicación, EL SISTEMA conserva como visitados los días que se guardaron en ese navegador.
- **RF-14:** SI IndexedDB no está disponible o una operación falla, EL SISTEMA muestra el calendario con los estados calculados, avisa una sola vez de que el progreso no se guardará en ese navegador, mantiene las visitas de la sesión en memoria y no afirma que se guardó.
- **RF-15:** EL SISTEMA no persiste el estado calculado, el contenido de las sorpresas ni el estado de acceso.
- **RF-16:** EL SISTEMA no realiza peticiones de red para calcular la fecha, el desbloqueo ni el progreso.
- **RF-17:** EL SISTEMA permite recorrer el calendario con teclado, mantiene el foco visible, no comunica estados solo con color y respeta `prefers-reduced-motion`.
- **RF-18:** CUANDO se borra el almacenamiento del navegador, EL SISTEMA muestra los días según la fecha local sin visitas previas y sin bloquear la interfaz.

## Requisitos no funcionales

- La única dependencia nueva es `dexie`. No se instalan Vitest, fuentes, Framer Motion, Lucide ni `vite-plugin-pwa`.
- La lógica de fechas es pura, sin React ni DOM, y se comprueba con un script temporal de Node 26 que importa TypeScript directamente; no se añade dependencia de pruebas.
- Se mantienen la paleta de `PALETA.md`, CSS Modules, mobile-first, el foco diseñado y el fallback de `forced-colors`.
- No se carga multimedia: el contenido de esta spec es solo texto.
- Los datos se guardan solo en el navegador; no hay sincronización ni respaldo automático.

## Reglas de negocio

- No existe «completado». Abrir un día equivale a visitarlo.
- `firstVisit` se escribe una sola vez; `lastVisit` se actualiza en cada apertura.
- El estado se deriva: fecha local + existencia del registro. Nunca se guarda un campo de estado que pueda quedar obsoleto.
- Un día desbloqueado puede volver a visitarse. Si el reloj del dispositivo se mueve hacia atrás, el desbloqueo se recalcula con la nueva fecha local y el día puede aparecer bloqueado otra vez; se acepta explícitamente.
- La fecha local no es una fuente confiable de seguridad. No se intenta verificarla contra un servidor.
- El acceso sigue vivo solo en memoria, según la Spec 001.

## Casos límite

| Situación | Resultado esperado |
| --- | --- |
| 30/11/2026 a las 23:59 | Los 31 días bloqueados. |
| 01/12/2026 a las 00:00 (hora local) | Día 1 disponible; del 2 al 31 bloqueados. |
| 05/12/2026 | Días 1–5 disponibles o visitados; del 6 al 31 bloqueados. |
| 31/12/2026 | Los 31 días desbloqueados. |
| 01/01/2027 o posterior | Los 31 días desbloqueados. |
| Cambio de zona horaria durante diciembre | Se recalcula con la nueva fecha local del dispositivo. |
| URL `/surprise/32`, `/surprise/0` o `/surprise/abc` | Vista de no encontrada. |
| URL `/surprise/9` antes del 9 de diciembre | Redirección a `/calendar`, sin visita registrada. |
| Sin acceso válido en `/calendar` o `/surprise/1` | Redirección a `/`. |
| IndexedDB bloqueado o en modo privado | Calendario visible, aviso único, visitas solo en memoria. |
| Almacenamiento borrado entre recargas | Progreso a cero, sin error bloqueante. |
| Día visitado, recarga | Sigue visitado; `lastVisit` no cambia hasta volver a abrirlo. |

## Fuera de alcance

- Contenido, títulos definitivos y formato de las 31 sorpresas; se usan placeholders.
- Rutas y vistas de `/memories` y `/finale`.
- Estado «completado» y cualquier acción para marcarlo.
- Persistencia del acceso y sustitución del código temporal `2026`.
- Preferencias de interfaz, exportación/importación de progreso en JSON y PWA.
- Fuentes tipográficas, animaciones e iconografía nuevas.
- Cualquier servidor, verificación remota de fecha o sincronización entre dispositivos.

## Criterios de aceptación

- `dexie` está instalado y el lockfile refleja la versión instalada.
- Las reglas puras devuelven el estado correcto en los casos límite de la tabla, comprobados con script de Node.
- `/calendar` muestra 31 tarjetas, el estado por texto/forma/color y el progreso «N de 31 días visitados».
- Con código correcto, la bienvenida ofrece «Abrir mi calendario» y lleva a `/calendar`.
- Sin acceso, `/calendar` y `/surprise/:dayId` redirigen a `/`.
- Los días futuros no se pueden abrir por URL directa; los identificadores inválidos muestran la no encontrada.
- Abrir un día guarda `firstVisit` y `lastVisit`; reabrirlo no cambia `firstVisit`.
- La recarga conserva las visitas cuando IndexedDB funciona; no las conserva cuando se borra el almacenamiento.
- Con almacenamiento no disponible, el calendario sigue usable, se muestra un único aviso y no se afirma que se guardó.
- Navegación por teclado, foco visible, estados no dependientes solo del color y movimiento reducido comprobados en navegador.
- No hay peticiones XHR/fetch relacionadas con fecha o progreso.
- `pnpm lint` y `pnpm build` terminan correctamente.

## Dudas abiertas

- Ninguna que bloquee esta spec. Para una spec editorial posterior quedan el contenido, título y formato de los 31 días.
- Tampoco está decidido el código de acceso definitivo; el temporal `2026` permanece hasta el despliegue.
