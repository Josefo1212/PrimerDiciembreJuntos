# Paleta — Primer Diciembre juntos

Estado: **confirmada** el 26/11/2026.

Base visual: elegante, romántica y personal. Lavanda/lila protagonista, con December como contexto sutil y Liquid Glass moderado reservado para superficies flotantes o elementos destacados.

## Paleta principal

| Nombre | Hex | Uso principal |
| --- | --- | --- |
| Lavender Mist | `#F8F5FC` | Fondo principal |
| Soft Lilac | `#EAE0F5` | Fondo secundario |
| Pastel Lilac | `#CDB5E8` | Superficies suaves y separadores |
| Lavender | `#A98BCB` | Elementos interactivos |

## Colores de contraste

| Nombre | Hex | Uso principal |
| --- | --- | --- |
| Dusty Violet | `#80639E` | Botones principales |
| Deep Plum | `#514064` | Títulos destacados y texto principal |
| Blush Pink | `#E9CADB` | Detalles románticos |
| Warm Ivory | `#F6EEDF` | Detalles cálidos |

## Distribución acordada

| Uso | Color | Hex |
| --- | --- | --- |
| Fondo principal | Lavender Mist | `#F8F5FC` |
| Superficies | Blanco | `#FFFFFF` |
| Fondo secundario | Soft Lilac | `#EAE0F5` |
| Elementos interactivos | Lavender | `#A98BCB` |
| Botones principales | Dusty Violet | `#80639E` |
| Títulos destacados | Deep Plum | `#514064` |
| Detalles románticos | Blush Pink | `#E9CADB` |
| Detalles cálidos | Warm Ivory | `#F6EEDF` |

## Tokens CSS previstos

```css
--lavender-mist: #F8F5FC;
--soft-lilac: #EAE0F5;
--pastel-lilac: #CDB5E8;
--lavender: #A98BCB;
--dusty-violet: #80639E;
--deep-plum: #514064;
--blush-pink: #E9CADB;
--warm-ivory: #F6EEDF;
--surface: #FFFFFF;
```

## Reglas de uso

- El blanco se reserva para superficies; el fondo de la aplicación permanece en Lavender Mist.
- Dusty Violet se usa para acciones principales; Lavender para controles y estados interactivos secundarios.
- Deep Plum concentra jerarquía textual; no se usa como fondo extenso salvo que se valide contraste.
- Blush Pink y Warm Ivory son acentos, no bases de lectura.
- El estado de los días no puede comunicarse solo con color: debe acompañarse de texto, icono o forma.
- Validar contraste de texto y controles sobre cada fondo real antes de cerrar cada componente.
- `prefers-reduced-motion` reduce o elimina animaciones no esenciales.
