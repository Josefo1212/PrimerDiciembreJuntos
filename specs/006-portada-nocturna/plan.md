# Plan — Spec 006: Portada nocturna y animaciones

## Decisiones técnicas

- Se añaden tokens `--night`, `--night-soft`, `--gold` y `--gold-light` en `tokens.css` y se documentan en `PALETA.md` como extensión para la escena nocturna.
- Se crea `CoverScene.tsx` y `CoverScene.module.css` como composición compartida de acceso y bienvenida. Contiene fondo, estrellas, halo, columna editorial y panel glass; recibe el contenido por props.
- `AccessView` y `WelcomeView` pasan a ser vistas delgadas que solo entregan texto y el formulario o CTA. Se eliminan sus CSS Modules duplicados.
- `CoverMotif` se enriquece: textura de papel, pliegues con degradados, sombra proyectada, lacre dorado con brillo y animaciones de solapa/carta. Mantiene `aria-hidden` y las variantes `closed`/`open`.
- `AccessForm.module.css` y el CTA de bienvenida se adaptan al fondo oscuro: campo con superficie nocturna, texto claro, botón dorado y halo de foco dorado.
- Las animaciones se definen con `@keyframes` y `transition` en CSS Modules. Todas las vistas comparten un patrón de entrada escalonada; el movimiento reducido se hereda de `index.css` y se refuerza en los módulos.
- No se introduce `import.meta.env` ni lógica de fecha nueva.

## Contratos

### `CoverScene`

```ts
type CoverSceneProps = {
  titleId: string
  eyebrow: string
  title: string
  titleAccent: string
  lead: string
  handwritten: string
  dayMark: string
  variant: 'closed' | 'open'
  panelEyebrow: string
  panelTitle: string
  note?: string
  children: ReactNode
}
```

El `h1` conserva un espacio real entre `title` y `titleAccent` para el nombre accesible.

### Animaciones

- `sceneIn`: entrada general de la vista.
- `rise`: entrada escalonada de los bloques editoriales.
- `panelIn`: entrada del panel con ligero escalado.
- `twinkle`: parpadeo de estrellas con retardos por `nth-child`.
- `breathe`: pulso del halo.
- `sealShine`: barrido de brillo sobre el lacre.
- `letterOut`: salida de la carta en la variante abierta.

## Secuencia de tareas

1. T1 — tokens nocturnos y documentación de paleta.
2. T2 — `CoverScene` compartido con estrellas, halo y entradas escalonadas.
3. T3 — enriquecer `CoverMotif` y sus animaciones.
4. T4 — adaptar formulario y CTA al fondo oscuro y conectar vistas.
5. T5 — validar lint, build, estructura, accesibilidad estática y cerrar spec.
