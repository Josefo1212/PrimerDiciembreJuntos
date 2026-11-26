# Constitución — Primer Diciembre juntos

Principios técnicos y de producto innegociables. Toda spec, plan, tarea e implementación debe cumplirlos. Si un requisito contradice esta constitución, se revisa primero la constitución mediante una decisión explícita; no se ignora silenciosamente.

1. **Frontend estático, sin backend:** el producto se construye como una aplicación React desplegable en Vercel. No agregar API propia, servidor, base de datos remota ni infraestructura de backend.
2. **Persistencia local con límites claros:** IndexedDB almacena únicamente progreso y preferencias locales aprobadas. El contenido estático de las sorpresas pertenece al proyecto y sus assets, no a IndexedDB.
3. **Sin promesas falsas de sincronización o seguridad:** los datos locales no se sincronizan entre dispositivos. Un código de acceso implementado en el cliente es una barrera de experiencia, no autenticación. No almacenar secretos reales.
4. **La fecha del dispositivo gobierna el desbloqueo:** el calendario usa la fecha local del dispositivo. Se acepta que el reloj pueda modificarse; no se simula una validación confiable de servidor.
5. **Un día desbloqueado sigue accesible:** el desbloqueo es progresivo, pero no efímero. Una vez que un día está disponible, puede volver a visitarse. No confundir disponibilidad con visita o finalización.
6. **No perder contenido por fallos de almacenamiento:** si IndexedDB no está disponible o falla, la aplicación debe informar el problema y ofrecer el comportamiento degradado que defina la spec. Nunca afirmar que el progreso quedó guardado si no se confirmó.
7. **Accesibilidad como requisito:** controles operables por teclado, foco visible, contraste suficiente, estados que no dependan solo del color y respeto por `prefers-reduced-motion`.
8. **Multimedia bajo demanda:** no reproducir audio automáticamente. Audio y video deben tener controles utilizables y cargarse cuando corresponda.
9. **Mobile-first y responsive:** cada experiencia debe ser utilizable en móvil y adaptarse correctamente a pantallas mayores. No sacrificar legibilidad por efectos visuales.
10. **Diseño personal, no sobrecargado:** lavanda/lila como identidad principal; Liquid Glass moderado. Evitar saturación decorativa, estética infantil y complejidad visual que compita con el contenido.
11. **Complejidad proporcional:** no añadir estado global, librerías, capas, patrones o carpetas sin una necesidad demostrable. Preferir la solución más simple que preserve claridad, testabilidad y mantenimiento.
12. **TypeScript estricto y contratos explícitos:** modelar los días, estados y contenidos con tipos claros. Evitar `any` y conversiones inseguras sin justificación.
13. **Lógica crítica separada de la UI:** reglas de fecha, desbloqueo, transición de estados y persistencia deben poder probarse sin depender de componentes visuales.
14. **No implementar requisitos implícitos:** si una decisión afecta el contenido, la experiencia, la persistencia o el comportamiento de fechas y no está definida en una spec, detenerse y preguntar.
15. **Validar antes de cerrar:** una fase no está terminada solo porque la interfaz se vea correcta. Debe cumplir sus criterios, pasar build/lint y las pruebas pertinentes, además de una revisión responsive y de accesibilidad.
16. **Convenciones de código obligatorias:** se aplican las reglas de `CONVENTIONS.md`: funciones flecha, sintaxis moderna, componentes/hooks/reglas separados y un commit por tarea validada. No se aceptan parches rápidos que sacrifiquen claridad o mantenimiento.

La constitución no obliga a usar una tecnología concreta cuando no es necesaria. Las elecciones de stack y arquitectura se documentan en `AGENTS.md` y en los planes de cada spec.
