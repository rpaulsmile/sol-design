---
version: alpha
name: "Sol Design, propuesta 1: Tarde de sol"
description: "Catálogo de flores y objetos de chenille hechos a mano, en crema, arena, terracota y cacao, con titulares Fraunces suaves y esquinas redondeadas. Las fotos ponen el color saturado; la interfaz es luz cálida de la tarde."
colors:
  crema: "#F6EDE0"
  arena: "#ECDCC6"
  linea: "#DCC8AF"
  cacao: "#2B1D16"
  grafito: "#6B584A"
  terracota: "#B8532A"
  terracota-profundo: "#A04825"
  sol: "#EDB040"
  salvia: "#6F7F55"
  ladrillo: "#6E2A18"
  crema-suave: "#CDBFAE"
  fondo: "{colors.crema}"
  superficie: "{colors.arena}"
  texto: "{colors.cacao}"
  texto-suave: "{colors.grafito}"
  acento-texto: "{colors.terracota-profundo}"
  acento-grande: "{colors.terracota}"
typography:
  display-xl:
    fontFamily: Fraunces
    fontSize: "clamp(3.25rem, 1.6rem + 8.4vw, 8.5rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: -0.02em
    fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144"
  display-lg:
    fontFamily: Fraunces
    fontSize: "clamp(2.5rem, 1.5rem + 4.6vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: -0.015em
    fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 120"
  headline:
    fontFamily: Fraunces
    fontSize: "clamp(1.875rem, 1.35rem + 2.3vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.01em
    fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 72"
  statement:
    fontFamily: Fraunces
    fontSize: "clamp(2rem, 1.3rem + 3.2vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.015em
    fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 96"
  card-title:
    fontFamily: Fraunces
    fontSize: "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    fontVariationSettings: "'SOFT' 100, 'WONK' 0, 'opsz' 30"
  lead:
    fontFamily: Instrument Sans
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Instrument Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Instrument Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Instrument Sans
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.08em
    textTransform: uppercase
  button:
    fontFamily: Instrument Sans
    fontSize: 0.9375rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.01em
  counter:
    fontFamily: Fraunces
    fontSize: "clamp(1.25rem, 1rem + 1vw, 2rem)"
    fontWeight: 400
    fontVariationSettings: "'SOFT' 100, 'WONK' 0, 'opsz' 48"
    fontFeature: "'lnum', 'tnum'"
rounded:
  sm: 10px
  md: 14px
  lg: 20px
  xl: 28px
  pill: 999px
spacing:
  gutter: 16px
  gutter-lg: 32px
  max-width: 1440px
  section-y: "clamp(5rem, 3rem + 8vw, 10rem)"
  section-y-sm: "clamp(3rem, 2rem + 4vw, 6rem)"
  grid-gap: 12px
  grid-gap-lg: 24px
  nav-height: 64px
  nav-height-lg: 76px
  tap-target: 44px
  stack-top: "5.5rem"
  stack-step: "1.25rem"
components:
  button-whatsapp:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.crema}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 52px
    padding: 0 26px
  button-whatsapp-hover:
    backgroundColor: "{colors.terracota-profundo}"
    textColor: "{colors.crema}"
  button-whatsapp-on-dark:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.cacao}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 52px
  button-whatsapp-on-dark-hover:
    backgroundColor: "{colors.sol}"
    textColor: "{colors.cacao}"
  button-whatsapp-compact:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.crema}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 44px
    padding: 0 18px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.cacao}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 44px
    padding: 0 20px
  chip:
    backgroundColor: transparent
    textColor: "{colors.cacao}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 44px
    padding: 0 18px
  chip-active:
    backgroundColor: "{colors.cacao}"
    textColor: "{colors.crema}"
  nav-bar:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.cacao}"
    height: 64px
  product-card:
    backgroundColor: "{colors.arena}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.lg}"
    padding: 8px
  product-placeholder:
    backgroundColor: "{colors.arena}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.md}"
  step-card:
    backgroundColor: "{colors.arena}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.lg}"
  occasion-card:
    backgroundColor: "{colors.arena}"
    textColor: "{colors.cacao}"
    rounded: "{rounded.xl}"
    padding: 28px
  faq-item:
    backgroundColor: transparent
    textColor: "{colors.cacao}"
    typography: "{typography.card-title}"
  footer:
    backgroundColor: "{colors.ladrillo}"
    textColor: "{colors.crema}"
  input-field:
    backgroundColor: transparent
    textColor: "{colors.cacao}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 52px
---

## Overview

Concepto: **"Tarde de sol"**. La luz cálida de las cuatro de la tarde sobre una mesa de madera: fondo crema, bandas de arena, acentos de terracota y un cacao profundo para las zonas oscuras. La interfaz es discreta y cálida; las fotos de los productos (rojo, morado, rosa, turquesa, amarillo, siempre saturados y felpudos) son el único color fuerte de la página. El carácter artesanal viene de la forma, no de adornos: titulares en Fraunces con el eje SOFT al máximo, que se ven blandos como el chenille, y esquinas redondeadas en todo.

Es una página de catálogo para móvil primero (el público llega desde Instagram). Una sola acción importa: **abrir WhatsApp con el mensaje del producto ya escrito**. No hay carrito ni pagos. Todo el texto está en español de Ecuador, tuteo, tono cercano ("Pídela por WhatsApp").

Referencias de estructura (ideas, no código): Solenne (hero con video, sticky de 3 pasos, statement revelado por líneas, tarjetas apiladas, footer revelado), florist de 8B (titulares que suben desde un clip, hairlines que se dibujan, fotos que se abren como ventana, columnas desfasadas) y dish-orbit-carousel (selector orbital). Todo se reescribe a mano en HTML, CSS y JavaScript sin framework.

## Colors

| Token | Valor | Uso |
|---|---|---|
| `--crema` | #F6EDE0 | Fondo de página y texto sobre oscuro |
| `--arena` | #ECDCC6 | Tarjetas, bandas, placeholders, marco del video |
| `--linea` | #DCC8AF | Hairlines y bordes de 1px sobre crema |
| `--cacao` | #2B1D16 | Texto, hero oscuro, botón WhatsApp, statement oscuro |
| `--grafito` | #6B584A | Texto secundario |
| `--terracota` | #B8532A | Acento decorativo y texto grande (24px o más): palabras resaltadas en titulares, rellenos, subrayados |
| `--terracota-profundo` | #A04825 | Acento para texto pequeño: enlaces, etiquetas, contadores; también el relleno del hover del botón |
| `--sol` | #EDB040 | Solo decorativo: rayos del logo, puntos, relleno de hover sobre oscuro. Nunca texto sobre crema |
| `--salvia` | #6F7F55 | Detalles pequeños no textuales: puntos, hojitas, iconos, la barra de progreso |
| `--ladrillo` | #6E2A18 | Footer |
| `--crema-suave` | #CDBFAE | Texto secundario sobre cacao y ladrillo (en lugar de opacidad) |

### Contrastes WCAG (calculados con la fórmula de luminancia relativa)

| Par (texto sobre fondo) | Ratio | Resultado |
|---|---|---|
| cacao sobre crema | 14.04:1 | Pasa AAA |
| cacao sobre arena | 12.11:1 | Pasa AAA |
| grafito sobre crema | 5.80:1 | Pasa AA |
| grafito sobre arena | 5.01:1 | Pasa AA |
| terracota (#B8532A) sobre crema | 4.20:1 | **No pasa 4.5**; solo texto grande (24px o más, o 19px en negrita), mínimo 3:1 |
| terracota (#B8532A) sobre arena | 3.62:1 | Solo texto grande |
| terracota-profundo (#A04825) sobre crema | 5.25:1 | Pasa AA |
| terracota-profundo (#A04825) sobre arena | 4.53:1 | Pasa AA (justo) |
| crema sobre terracota-profundo | 5.25:1 | Pasa AA (hover del botón) |
| crema sobre terracota (#B8532A) | 4.20:1 | No pasa para texto de 15px; por eso el hover usa terracota-profundo |
| crema sobre cacao | 14.04:1 | Pasa AAA |
| crema sobre ladrillo | 9.02:1 | Pasa AAA |
| arena sobre ladrillo | 7.78:1 | Pasa AAA |
| crema-suave (#CDBFAE) sobre cacao | 9.04:1 | Pasa AAA |
| crema-suave sobre ladrillo | 5.81:1 | Pasa AA |
| sol sobre cacao | 8.44:1 | Pasa AAA (se permite texto sol sobre oscuro) |
| sol sobre ladrillo | 5.42:1 | Pasa AA |
| sol sobre crema | 1.66:1 | No pasa: prohibido como texto |
| salvia sobre crema | 3.74:1 | Pasa 3:1 para gráficos; prohibido como texto pequeño |
| linea sobre crema | 1.40:1 | Solo decorativa (hairline), nunca el único indicador de un control |
| terracota sobre cacao | 3.34:1 | Solo texto grande sobre oscuro |

**Ajuste hecho:** el terracota #B8532A del brief no llega a 4.5:1 sobre crema (4.20) ni sobre arena (3.62). Se mantiene tal cual para relleno y texto grande, y se añade `--terracota-profundo` #A04825, el oscurecimiento mínimo (13 por ciento) que cumple 4.5:1 también sobre arena, el fondo más exigente. El mínimo para crema sola sería #AF4F28 (4.56), pero no pasaría sobre arena. Se añadió `--crema-suave` #CDBFAE porque la opacidad sobre fondo oscuro hace impredecible el contraste.

Reglas de uso: el texto de párrafo siempre es cacao o grafito. Los enlaces y etiquetas pequeñas en acento usan terracota-profundo; solo los titulares de 40px o más pueden resaltar una palabra con terracota. El recorte de flor del cursor (halo blanco) solo se usa sobre crema o arena.

## Typography

Dos familias de Google Fonts, sin una tercera: **Fraunces** (variable, ejes `opsz`, `SOFT`, `WONK`) para los titulares y **Instrument Sans** para texto, etiquetas y botones. Cargar con `display=swap` y precargar solo Fraunces. URL sugerida: `family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1&family=Instrument+Sans:wght@400;500;600`.

- **Fraunces**: siempre `font-variation-settings: 'SOFT' 100, 'WONK' 1` en titulares grandes (display, headline, statement); en tamaños pequeños (card-title, contador) `WONK 0` para que no se vea raro. `opsz` sube con el tamaño (30 a 144). Peso 500 en titulares, 400 en el statement. Interlineado 0.95 en display, hasta 1.05 en statement. Tracking ligeramente negativo.
- **Cursiva de Fraunces**: se usa solo para una palabra resaltada por titular (por ejemplo "no se marchitan"), en terracota si el tamaño es 40px o más.
- **Instrument Sans**: cuerpo 16px (17px desde 768px), `line-height` 1.6; etiquetas 12px, mayúsculas, peso 600, tracking 0.08em; botones 15px peso 600.
- La escala usa `clamp()` (ver tokens). Valores resultantes aproximados, móvil 375px / escritorio 1440px: display-xl 52px / 136px; display-lg 40px / 84px; headline 30px / 52px; statement 32px / 68px; lead 17px / 21px.
- Un titular nunca baja de 2 líneas de ancho cómodo: en móvil, máximo 12 caracteres por palabra larga sin cortar; usar `text-wrap: balance` en titulares y `text-wrap: pretty` en párrafos.
- Los números del contador y los precios usan cifras alineadas (`lnum`, `tnum`).

## Layout

- Móvil primero. Gutter 16px en móvil, 32px desde 768px. Contenedor máximo 1440px centrado. Breakpoints: 640px, 768px, 1024px, 1280px.
- Ritmo vertical: cada sección usa `padding-block: var(--section-y)` (80px a 160px). Los bloques de contenido internos se separan con 24 a 48px.
- Rejilla de 12 columnas desde 1024px; en móvil una columna con bloques a ancho completo.
- Catálogo: 2 columnas en móvil (gap 12px), 3 desde 768px, 4 desde 1280px (gap 24px).
- Hero: móvil, video a pantalla completa (100svh) con degradado; escritorio, dos columnas 7/5 con texto a la izquierda y el video en marco redondeado a la derecha.
- Áreas táctiles de al menos 44x44px. Texto de párrafo con máximo 62 caracteres de ancho.
- Las secciones alternan fondo crema, arena y cacao: crema (nav, statement, orbit sobre arena, catálogo), cacao (hero, statement oscuro), arena (cómo se hace, personalizar), ladrillo (footer).
- `scroll-padding-top: 5.5rem` para que los anclas del nav no queden tapadas.

## Elevation & Depth

Casi sin sombras. La profundidad se logra apilando campos de color y fotos redondeadas, como en la referencia de Solenne:

- **Tarjetas apiladas y footer revelado:** una sombra suave solo en estos dos casos: `0 -12px 40px -16px rgba(43, 29, 22, 0.28)` (ocasiones) y `0 24px 60px -24px rgba(43, 29, 22, 0.35)` (capa de contenido sobre el footer).
- **Marco del video del hero:** sombra `0 30px 80px -30px rgba(0, 0, 0, 0.6)` sobre fondo cacao.
- **Tarjetas de producto y de pasos:** sin sombra; relleno arena sobre crema, ya se separan solas.
- **Sticky:** el nav, el orbit, el "cómo se hace" y las tarjetas de ocasiones usan `position: sticky`; el footer es `position: sticky; bottom: 0` bajo una capa de contenido con esquinas inferiores de 28px.
- **Hairlines:** 1px en `--linea` sobre crema, en `rgba(246,237,224,0.18)` sobre oscuro. Se dibujan de izquierda a derecha al entrar.
- Grano: ninguno. No usar blur ni glassmorphism (coste y estilo equivocado).

## Shapes

Todo es blando, lo contrario de una plantilla cuadrada:

- Fotos y tarjetas de producto: radio **14px** (dentro de la tarjeta) y **20px** (la tarjeta). Tarjetas grandes (ocasiones, pasos, capa del footer): **28px**.
- Botones, chips, píldoras de categoría y píldora de estado: `999px`.
- Marco del video del hero en escritorio: **28px**; en móvil el video va sin radio (pantalla completa).
- Foto de producto: relación **4:5**, `object-fit: cover`, `object-position: center 55%` (la flor queda arriba del centro).
- Selector orbit: el ítem activo es un círculo de foto (`border-radius: 50%`) con aro de 1px en `--linea`; los demás ítems, círculos más pequeños. Los recortes de flor van sin máscara.
- Iconos: trazo de 1.75px, terminaciones redondeadas, 22px. Sin iconos rellenos salvo el logo de WhatsApp (SVG propio inline, 20px).
- Las líneas decorativas pueden ser onduladas suaves (SVG `path` con curva), nunca rectas rígidas, para evocar el alambre de chenille.

## Logo

Logo de esta propuesta: **variante C** (sol con carita dormida y rayos curvos de chenille + wordmark Fraunces),
archivos `propuesta-1/logo/mark-c*.svg`, `logo-c*.svg` y `logo-c-stacked*.svg`. Favicon: `mark-b.svg` (la C no se lee a 16px).
Aquí solo su uso:

- **Nav compacto:** isotipo + wordmark en línea, alto **28 a 32px** (30px en móvil, 32px en escritorio). Color cacao con el sol en terracota sobre crema.
- **Sobre oscuro** (hero antes de que el nav aparezca sobre crema, footer): todo en crema; el sol puede ir en `--sol`.
- **Footer:** versión grande, ancho 180px en móvil y 320px en escritorio, en crema sobre ladrillo.
- **Área de respeto:** un margen libre alrededor igual a la altura de un rayo del sol (aprox. 0.5 veces el alto del isotipo). Nada de texto ni bordes dentro de esa zona.
- **Tamaño mínimo:** 24px de alto para el isotipo solo (favicon, menú); 28px para el conjunto.
- No rotar, no estirar, no poner sobre fotos sin degradado, no usar otros colores que cacao, terracota o crema. SVG inline con `fill="currentColor"` donde se pueda, para heredar el color.
- Favicon: solo el isotipo en terracota sobre fondo transparente.

## Components

**Botón WhatsApp (CTA principal).** Píldora de 52px, fondo cacao, texto crema, icono de WhatsApp a la izquierda (20px) y flecha a la derecha que se desplaza 3px en hover. Al pasar el cursor, un relleno terracota-profundo sube desde abajo (un `::before` con `transform: scaleY(0)` a `scaleY(1)` y `transform-origin: bottom`, 0.5s `--ease-out`), con el texto en crema. Sobre fondo oscuro, la versión invertida: crema con texto cacao, relleno sol en hover. Versión compacta de 44px en el nav y en las tarjetas. En táctil el hover no existe; el estado `:active` oscurece con `scale(0.98)` en 120ms. Etiqueta: "Pedir por WhatsApp" (genérico), "Quiero esta" en tarjetas compactas. Enlace: `https://wa.me/<numero>?text=<mensaje codificado>`, con `target="_blank" rel="noopener"`. Mensaje: `marca.mensajeBase` con `{producto}` sustituido; fuera de producto, `marca.mensajeGeneral`.

**Nav.** 64px (76px en escritorio), fondo crema con `backdrop` sin blur, hairline inferior en `--linea`. Escritorio: logo a la izquierda; enlaces Catálogo, Cómo se hace, Ocasiones (15px peso 500, con subrayado que se redibuja); botón WhatsApp compacto a la derecha. Móvil: logo, botón WhatsApp compacto y botón de menú (44px, dos líneas que forman una X). El menú móvil es una hoja a pantalla completa en cacao con los enlaces en Fraunces 40px, que entra con `clip-path` desde arriba en 0.5s. Se esconde al bajar (`translateY(-100%)`, 0.4s) y vuelve al subir; siempre visible con el menú abierto. Sobre el hero oscuro, el nav arranca transparente con texto crema y pasa a crema tras 80px de scroll.

**Chip de categoría.** Píldora de 44px, borde 1px `--linea`, texto cacao. Activo: relleno cacao, texto crema. Fila con scroll horizontal en móvil (`scroll-snap-type: x proximity`, sin barra visible), con "Todo" primero y las 6 categorías del JSON: Macetitas, Flores sueltas, Lapiceros, Cuadros, Arreglos y canastas, Coronas personalizadas. Cada chip lleva `aria-pressed`.

**Tarjeta de producto.** Fondo arena, radio 20px, padding 8px. Foto 4:5 con radio 14px. Debajo, 12px de aire: nombre en `card-title` (Fraunces), línea de precio o "Consultar precio" en `body-sm` grafito (si el producto es `personalizable`, una píldora pequeña "Personalizable" en salvia oscura #5A6745 sobre arena, 4.51:1), y un botón WhatsApp compacto a ancho completo. La tarjeta entera no es un enlace; solo el botón lo es. En hover (puntero fino) la foto hace zoom 1.04 en 1.2s `--ease-out`. Entrada: la foto se abre con `clip-path: inset(8% round 14px)` a `inset(0 round 14px)`.

**Placeholder de producto sin foto** (`imagen: null`, 6 productos). No es una caja gris: es una escena cálida dibujada en SVG inline, sin depender de imágenes. Fondo arena con un degradado radial suave a `--crema` centrado arriba (círculo de sol de 60 por ciento, opacidad 0.7); en el centro, una flor de chenille esquemática (un círculo de pétalos hecho con 5 a 8 trazos gruesos de 10px y puntas redondeadas, tallo ondulado y dos hojas) dibujada con los colores del campo `colores` del producto (el primero para los pétalos, el segundo para el centro, el último para la hoja o maceta). Debajo, una etiqueta en píldora: "Foto pronto" en label, grafito. Radio 14px y relación 4:5, como las fotos. El botón WhatsApp funciona igual. Sin animación, salvo un balanceo de 2° del tallo en 6s si no hay reduced-motion.

**Tarjeta de paso (Cómo se hace).** Foto redondeada de 20px con un número grande en Fraunces sobre la esquina (01, 02, 03) en crema con sombra de texto nula (el degradado inferior de la foto asegura el contraste). Entra girada (`scale .92`, `rotate -7deg`) y se aplana.

**Tarjeta de ocasión.** Radio 28px, fondo arena, con título Fraunces (headline), una frase de 1 a 2 líneas, una foto o el recorte de flor en un lado y un botón WhatsApp compacto con mensaje de la ocasión ("Quiero algo para un cumpleaños"). Cada tarjeta alterna un tinte de fondo: arena, `#E6D2B8`, `#E0C8AA`, `#D9BF9E` (el texto cacao mantiene más de 9:1 sobre todos).

**Acordeón FAQ.** Botón que ocupa toda la fila (mínimo 64px), pregunta en `card-title`, icono "+" a la derecha cuyo trazo vertical hace `scaleY(0)` al abrir. La respuesta anima `grid-template-rows: 0fr` a `1fr` en 0.45s `--ease-out` con opacidad. Hairline entre filas. Usar `<button aria-expanded aria-controls>`; la respuesta es `role="region"`.

**Campo de personalización.** Underline o caja de 52px con radio 14px, borde 1px `--linea`, foco con borde terracota-profundo de 2px. Etiqueta arriba, 12px en mayúsculas. Campos: "Nombre" y "Color favorito" (selector de 6 muestras redondas de 32px, con un anillo cacao de 2px en la activa y `aria-label` con el nombre del color). El mensaje de WhatsApp se compone en vivo con esos valores; el botón es el CTA.

**Subrayado de enlace.** `background-size` de 100% a 0 y de nuevo a 100% cambiando el origen, 0.5s `--ease-out`.

**Footer.** Fondo ladrillo, texto crema; título Fraunces display-lg "Escríbenos y la hacemos para ti", botón WhatsApp grande (versión sobre oscuro, 60px), enlace a Instagram `@solrovi.93`, logo grande, línea "Hecho a mano en Guayaquil" y el año.

## Motion

Librería: GSAP 3 y ScrollTrigger por CDN (cdnjs, versión fija, `defer`). Sin Lenis (el scroll nativo es mejor en móvil). Todo el movimiento usa solo `transform`, `opacity` y `clip-path`; nada anima `width`, `height`, `top` ni `left`.

Curvas y tiempos base:
- `--ease-out: cubic-bezier(.16, 1, .3, 1)` (entradas, la mayoría).
- `--ease-in-out: cubic-bezier(.65, 0, .35, 1)` (cortes largos, orbit, menú).
- Duraciones: micro 0.2s (pulsar), hover 0.5s, entrada de bloque 0.9s, titular 1.0s, hairline 1.1s, video 1.0s.
- GSAP: `ease: "expo.out"` ≈ `--ease-out`; `ease: "power3.inOut"` ≈ `--ease-in-out`.
- Disparo: `start: "top 85%"` para bloques, `"top 80%"` para titulares, `once: true` salvo en los pinned.

Patrones:

| Patrón | Qué hace | Valores |
|---|---|---|
| Titular que sube desde un clip | Cada línea va en un contenedor `overflow: hidden`; el hijo pasa de `yPercent: 110` a 0 | 1.0s `--ease-out`; stagger 0.12s entre líneas; las palabras de un titular corto con stagger 0.06s. El texto real queda en el DOM (no dividir con aria; usar `aria-label` en el contenedor y `aria-hidden` en los trozos) |
| Hairline que se dibuja | `scaleX` de 0 a 1, `transform-origin: left` | 1.1s `--ease-out`; stagger 0.15s si hay varias |
| Foto que se abre como ventana | `clip-path: inset(12% 12% 12% 12% round 20px)` a `inset(0 round 20px)` y la imagen interior de `scale 1.15` a 1 | clip 1.2s `--ease-out`; imagen 1.6s `--ease-out` |
| Columnas desfasadas que se alinean | Tarjetas del catálogo y fotos del statement: columnas pares empiezan en `y: 48px` (columnas impares `y: 0`), `opacity 0` a 1 | 0.9s `--ease-out`; stagger 0.08s por posición; en móvil, solo desfase de 24px |
| Bloque que entra | `y: 28px`, `opacity: 0` a 0 y 1 | 0.9s `--ease-out`; stagger 0.08s entre hijos |
| Parallax leve | Fotos sueltas del statement con `y` de -40 a +40px según scroll (`scrub: 0.6`) | Cada foto una velocidad distinta (0.6, 1, 1.4); solo `transform` |

Por sección:

1. **Nav:** al cargar, `clip-path: inset(0 0 100% 0)` a `inset(0)` en 0.8s. Esconder/mostrar con ScrollTrigger (`onUpdate`, dirección), 0.4s `--ease-in-out`.
2. **Hero:** el poster está desde el primer cuadro; cuando `canplaythrough` (o `loadeddata` en móvil), el video pasa de `opacity 0` a 1 en 1.0s. El poster hace `scale 1.12` a 1 en 2.2s. H1 por líneas, 1.0s, stagger 0.12s, arranca a los 0.2s; bajada y botón con "bloque que entra" a 0.6s. Al hacer scroll, el hero se desplaza `yPercent` hasta 20 (parallax) y se oscurece 20 por ciento.
3. **Statement:** párrafo con titular que sube por líneas; 2 a 3 fotos desfasadas con "foto que se abre" y parallax.
4. **Orbit:** ver sección propia abajo.
5. **Catálogo:** "columnas desfasadas"; al cambiar de filtro, las tarjetas salen con `opacity 0` y `scale .96` en 0.25s y las nuevas entran con "bloque que entra" y stagger 0.05s (uso de `gsap.matchMedia` y reflow controlado; Flip opcional si se carga el plugin, de lo contrario sin Flip).
6. **Cómo se hace:** ver sección propia abajo.
7. **Statement oscuro:** cada línea revelada con "titular que sube", 1.0s, stagger 0.14s; las líneas se disparan con `scrub` ligado al scroll en una zona de 120svh si el motor lo permite, si no `once`.
8. **Ocasiones:** tarjetas con `position: sticky; top: calc(5.5rem + 1.25rem * i)`; la tarjeta anterior hace `scale` de 1 a 0.94 y `opacity` a 0.85 mientras la siguiente la cubre (`scrub: true`). Sin pin de GSAP: solo sticky de CSS.
9. **Personalízalo:** foto que se abre; las muestras de color entran con stagger 0.06s y rebote suave (`back.out(1.4)`, 0.6s).
10. **FAQ:** hairlines que se dibujan, filas con "bloque que entra" y stagger 0.08s.
11. **Footer revelado:** la capa de contenido tiene `border-radius: 0 0 28px 28px` y se desplaza con el scroll normal; el footer queda `sticky; bottom: 0; z-index: 0` debajo y se descubre. El logo grande sube con `yPercent 20` a 0 (scrub) y el titular entra por líneas.

### Selector orbit "Flores disponibles"

Comportamiento tomado de dish-orbit-carousel (descrito, no copiado): una sección fija (sticky) donde un solo ítem está en primer plano; cambiar de ítem hace girar todos alrededor de un pivote lejano (arriba del lienzo, radio muy grande): el ítem saliente sale por la parte superior y el siguiente entra desde el lado contrario. El scroll de la página dirige el cambio: la sección se fija y cada tramo de scroll equivale a un ítem (en el original, 0.7 alturas de pantalla por plato, un `ScrollTrigger` con `onUpdate` que calcula el índice por progreso). También se cambia con flechas, teclado (izquierda y derecha) y deslizando. El original saca el título con un barrido y cruza el texto de la ficha.

Traducción a Sol Design (vanilla JS, GSAP + ScrollTrigger):
- **Datos:** los productos con `imagenRecorte` (3: rosa roja, margarita, gerbera) más los que tengan `imagen` y `destacado` (se usa la foto en círculo). Total esperado: 8 ítems en un arco.
- **Geometría:** contenedor sticky de 100svh con fondo arena. Los ítems están en un anillo de radio `R = 140vw` en móvil y `R = 60vw` en escritorio, con el centro del círculo por encima del lienzo; separación angular `step = 18°`. La rotación del anillo es `rotate(-index * step)` con `transform-origin` en el centro del círculo, y cada ítem contra-rota para quedar vertical.
- **Ítem activo:** al frente (centro, abajo del arco), escala 1, diámetro `min(72vw, 420px)`; los dos vecinos a cada lado a escala 0.62 y 0.4, `opacity` 0.7 y 0.4; los demás `opacity 0`. Solo el activo muestra la ficha (nombre en `headline`, descripción de una línea y botón WhatsApp con el mensaje de ese producto). El nombre sale con "titular que sube"; el cambio de ficha cruza en 0.4s.
- **Giro:** al cambiar de índice, el anillo rota 0.9s con `--ease-in-out` (`power3.inOut`); la ficha antigua sale en 0.3s y la nueva entra a los 0.35s.
- **Scroll:** `ScrollTrigger` con `pin: true`, `end: "+=" + (n - 1) * 70 + "%"` (70 por ciento de la altura de pantalla por ítem) y `onUpdate` que calcula `Math.round(progress * (n - 1))`; solo cambia el índice cuando éste cambia (sin scrub continuo, para evitar saltos). Se limita a los extremos (sin bucle).
- **Móvil:** el scroll puede ser pinned igual, pero se añade arrastre horizontal (`pointerdown`/`pointermove`, umbral de 40px, `touch-action: pan-y`) y botones anterior/siguiente de 48px (`aria-label` "Flor anterior" y "Flor siguiente"), y pager de puntos. Con flechas del teclado en escritorio. Al usar arrastre o botones, el scroll de la página no se bloquea.
- **Reduced motion y sin JS:** no hay pin ni giro: la sección se convierte en un carrusel horizontal con `scroll-snap-type: x mandatory`, cada ítem a 80vw (max 360px) con su ficha visible debajo y su botón; flechas visibles para desplazarse con `scrollBy`.

### Cómo se hace una flor (sticky de 3 pasos)

Sección de 200svh (móvil 240svh) con un contenedor `position: sticky; top: 0; height: 100svh`. Tres pasos: **01 Elegimos el chenille** (colores y texturas), **02 Le damos forma** (pétalo por pétalo, doblado a mano), **03 Va a su maceta** (musgo, cinta y sello). Cada uno: una tarjeta de foto (de `assets/img/*-fondo-800.webp` o una foto de proceso que dé la clienta), un titular Fraunces `headline` y 1 a 2 líneas de texto. Contador "01 / 03" en `counter` (el número cambia con un giro vertical de 0.5s `--ease-out`). Barra de progreso: 3 segmentos de 3px de alto, `scaleX` de 0 a 1 por cada paso (`transform-origin: left`, `scrub`), salvia sobre `--linea`. Las tarjetas de foto entran con `scale .92` y `rotate -7deg` a `scale 1` y `rotate 0` en 0.9s (o ligadas a `scrub` con `scrub: 0.5`). La tarjeta del paso anterior sale con `rotate 5deg`, `y -8%` y `opacity 0`. Texto grande y tenue de fondo ("chenille") en Fraunces 18vw, color `--linea`, que se mueve en X de 10 por ciento a -10 por ciento (solo escritorio). En móvil, si el pin se siente pesado, se muestra apilado: 3 tarjetas, cada una con "bloque que entra", sin sticky.

### Flores con el cursor

Solo con `@media (pointer: fine)` y sin reduced-motion. Los recortes `assets/recortes/flor-{gerbera,margarita,rosa-roja}.webp` aparecen detrás del cursor y se van flotando. Por cada ~48px de recorrido del cursor (con throttle de 16ms vía `requestAnimationFrame`) se añade una flor, de un conjunto fijo de 8 elementos `<img>` reutilizados (pool), máximo 6 a 8 vivas a la vez. Cada flor: tamaño aleatorio 56 a 96px, rotación inicial aleatoria de -25° a 25°; sube 40 a 70px, gira hasta 40° más, y se desvanece en 1.4s (`opacity` 0.9 a 0, `--ease-out`). `pointer-events: none`, `position: fixed`, `will-change: transform, opacity`, `z-index` bajo el nav. Se activan solo sobre fondos claros: el hero oscuro y el statement oscuro las pausan (`IntersectionObserver` sobre esas secciones), igual que el footer. Tienen un halo blanco que se nota sobre oscuro: nunca usarlas ahí. Móvil (opcional): un toque suelta una flor que cae 120px con una oscilación suave en 1.6s; máximo 3 vivas; solo en el hero claro o en secciones claras, nunca sobre un botón.

### Reduced motion

Con `prefers-reduced-motion: reduce` no se carga el movimiento de scroll; todo queda en su estado final.

| Sección | Comportamiento con reduced-motion |
|---|---|
| Nav | Siempre visible (sin esconder), sin clip de entrada; el menú móvil aparece con fundido de 150ms |
| Hero | Muestra solo el poster, el video pausado y un botón de play de 44px (aria-label "Reproducir video") que lo inicia por decisión del visitante; H1 y botón visibles de entrada, sin zoom del poster |
| Statement | Texto y fotos visibles, sin parallax ni clip |
| Orbit | Carrusel horizontal con scroll-snap, sin pin, sin giro; ficha visible en cada ítem |
| Catálogo | Tarjetas visibles sin desfase; el filtro muestra y oculta con `hidden`, sin transición |
| Cómo se hace | Los 3 pasos apilados verticalmente, sin sticky; contador y progreso estáticos (los tres segmentos llenos) |
| Statement oscuro | Todas las líneas visibles |
| Ocasiones | Tarjetas apiladas en flujo normal (sin sticky) y sin escalado |
| Personalízalo | Estático |
| FAQ | Abre y cierra sin animación de altura (cambio instantáneo) |
| Footer | Sin efecto de revelado: footer normal debajo del contenido |
| Cursor | Sin flores |
| Hairlines y fotos | Dibujadas y abiertas |
| Hovers | Se conservan los cambios de color; se quita el zoom y el movimiento de flecha |

## Secciones de la página

Orden, con el contenido y las clases de fondo. Todos los textos son propuestas; los marcadores `[...]` se confirman con la clienta.

1. **Nav.** Ver Components. Enlaces: Catálogo (`#catalogo`), Cómo se hace (`#como-se-hace`), Ocasiones (`#ocasiones`). Botón: "Pedir por WhatsApp" (en móvil, solo el icono más "Pedir").
2. **Hero** (cacao, 100svh, `min-height: 560px`). Fondo: `<video>` (`assets/video/hero.webm` y `.mp4`, `muted playsinline loop`, `preload="metadata"`, `poster="assets/video/hero-poster.webp"`). El poster va primero; el video aparece con fade de 1s. No se carga si `navigator.connection.saveData` o `effectiveType` es `2g`/`slow-2g` (queda el poster). Móvil: video a pantalla completa con `object-fit: cover` y degradado inferior `linear-gradient(to top, rgba(43,29,22,.92) 0%, rgba(43,29,22,.55) 45%, rgba(43,29,22,0) 75%)`; texto abajo, a la izquierda. Escritorio: texto a la izquierda (7 columnas), video vertical (576x1024) en marco de 28px de radio, alto 80svh máximo, a la derecha (5 columnas), con una flor decorativa. **Opciones de titular** (el orquestador elige una):
   - A: "Flores que *no se marchitan*" con bajada "Ramos, macetitas y cuadros de chenille, hechos a mano en Guayaquil."
   - B: "Un detalle que *dura* todo el año" con bajada "Flores de chenille hechas una por una. Tú eliges el color, nosotras las hacemos."
   Etiqueta pequeña sobre el titular: "Hecho a mano en Guayaquil". Botón: "Pedir por WhatsApp" (versión sobre oscuro) y un enlace "Ver catálogo". Indicador de scroll: un punto sol de 8px que sube y baja (oculto con reduced-motion).
3. **Statement** (crema). Texto en `statement`, centrado, máximo 20ch por línea: "Cada pieza nace en las manos de [nombre de la dueña], con chenille, paciencia y mucho cariño." Con una palabra resaltada en terracota. Debajo, 2 o 3 fotos sueltas desfasadas (de `assets/img/*-fondo-800.webp`, radio 20px, anchos 38vw / 44vw / 32vw en móvil, con rotaciones de -3°, 2°, -1.5° y alturas distintas) con parallax leve. Etiqueta "Quiénes somos".
4. **Flores disponibles (orbit)** (arena). Etiqueta "Flores disponibles", titular `headline`: "Elige la tuya". Ver detalle en Motion. Botón WhatsApp en la ficha activa.
5. **Catálogo** (crema, `#catalogo`). Titular "Todo el catálogo", conteo "12 piezas" en label, fila de chips. Grilla de tarjetas. Los productos sin foto usan el placeholder. Si el filtro deja 0 productos, mostrar "Aún no tenemos piezas en esta categoría, pero podemos hacerla: escríbenos" con un botón WhatsApp (mensaje general). Imágenes con `srcset="…-800.webp 800w, …webp 1200w"` (el archivo sin sufijo es la de 1024 o 1200 px según el JSON), `sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"`, `loading="lazy"`, `decoding="async"` y ancho/alto explícitos. La foto del hero y la primera del orbit no son lazy.
6. **Cómo se hace una flor** (arena, `#como-se-hace`). Etiqueta "El proceso", titular "Cómo se hace una flor". Ver Motion.
7. **Statement oscuro** (cacao, `min-height: 100svh`). Texto: "Cada pétalo,<br>doblado a mano." (2 líneas; la segunda con la palabra "a mano" en cursiva y color `--sol` sobre oscuro, 8.44:1). Sin botones. Las flores del cursor están apagadas aquí.
8. **Ocasiones** (crema, `#ocasiones`). Título fijo a la izquierda en escritorio ("Para cada ocasión", con una frase "Dinos la fecha y te ayudamos a elegir"). Cinco tarjetas apiladas sticky: **Cumpleaños**, **Graduación**, **San Valentín**, **Día de la Madre**, **Maternidad y baby shower**. Cada una con foto o recorte, una frase corta (propuestas: "Un detalle que se queda en su escritorio para siempre", "Para celebrar el esfuerzo con algo que no se marchita", "Rosas rojas que no se secan", "Para la mamá que todo lo da, un ramo que dura", "Coronas con su nombre y mucha ternura") y botón WhatsApp compacto con mensaje propio.
9. **Personalízalo** (arena). Etiqueta "A tu gusto", titular "Personalízalo: tu color, tu nombre". Dos campos (Nombre, Color favorito con muestras) y un botón WhatsApp "Contarle a Sol lo que quiero" que compone el mensaje abierto: "¡Hola Sol Design! Quiero personalizar [producto]. Nombre: [x]. Color: [y]." Si los campos están vacíos, el mensaje es abierto ("Quiero hacer un pedido personalizado"). Enlaza a la corona infantil, el mini macetero y el ramo para él como ejemplos.
10. **Preguntas frecuentes** (crema). Cuatro preguntas con **respuestas marcadoras** (se confirman con la clienta, mostrar el texto entre corchetes solo en desarrollo): "¿Hacen envíos en Guayaquil?" ("[Respuesta por confirmar: zonas, costo y retiro]"), "¿Cuánto demora un pedido?" ("[Por confirmar: de X a Y días]"), "¿Puedo personalizar el color y el nombre?" ("Sí. Cuéntanos el color y el nombre y la hacemos para ti. [Confirmar tiempos y costo extra]"), "¿Cómo cuido mi flor de chenille?" ("[Por confirmar: evitar agua y sol directo, sacudir el polvo con un cepillo suave]"). Hairline arriba y entre filas.
11. **Footer revelado** (ladrillo). Ver Components. Enlaces: Instagram, WhatsApp, volver arriba. "Hecho a mano en Guayaquil" y el año.

## Accesibilidad

- **Contraste:** ver tabla de Colors. El texto sobre foto del hero siempre lleva el degradado; sol nunca es texto sobre crema; salvia no es texto pequeño; terracota (#B8532A) solo en texto grande.
- **Teclado y foco:** todos los controles alcanzables con Tab en orden visual. Anillo de foco visible: `outline: 3px solid var(--terracota-profundo)` con `outline-offset: 3px` (sobre oscuro, `outline-color: var(--sol)`). El orbit responde a flechas izquierda y derecha. El menú móvil atrapa el foco y se cierra con Escape.
- **Objetivos táctiles:** mínimo 44x44px; botones del CTA a 52px.
- **Semántica:** un `<h1>` (el del hero); `<h2>` por sección; `<nav>`, `<main>`, `<footer>`; los chips son `<button aria-pressed>`; el acordeón usa `aria-expanded` y `aria-controls`; las fotos con `alt` descriptivo ("Macetita con una rosa roja de chenille en maceta azul"); las decorativas (recortes del cursor, placeholder, flores del fondo) con `alt=""` o `aria-hidden="true"`.
- **Titulares animados:** el texto real queda accesible (`aria-label` en el contenedor, trozos con `aria-hidden`); nada se oculta de los lectores por el efecto de revelado.
- **Enlaces de WhatsApp:** nombre accesible "Pedir [producto] por WhatsApp (se abre en una pestaña nueva)"; `target="_blank" rel="noopener"`.
- **Video:** decorativo, `muted`, sin audio, con botón de pausa y reproducción visible de 44px (siempre, no solo con reduced-motion) y `aria-label` claro. Si no carga, el poster ocupa su lugar.
- **Movimiento:** respetar `prefers-reduced-motion` (tabla en Motion) y, además, `ScrollTrigger.matchMedia` para evitar crear los pines. Sin parpadeos mayores a 3 por segundo.
- **Idioma y zoom:** `<html lang="es-EC">`; sin bloquear el zoom (`viewport` sin `user-scalable=no`); texto en `rem`; la página funciona con zoom a 200 por ciento sin scroll horizontal.
- **Sin JS:** el contenido y los enlaces de WhatsApp (con `href` ya compuesto en el HTML de cada tarjeta, o a partir del JSON con un `<noscript>` general) siguen utilizables; los estados iniciales ocultos de las animaciones se aplican solo con una clase `js` en `<html>`, para que sin JS todo sea visible.

## Rendimiento

- Objetivo Lighthouse móvil 90 o más. Presupuesto: HTML + CSS + JS propio menor a 120 KB sin comprimir; GSAP y ScrollTrigger por CDN (cdnjs) con versión fija y `defer`; Fraunces e Instrument Sans con `font-display: swap` y `preconnect` a Google Fonts (solo los ejes necesarios).
- Imágenes: WebP con `srcset` (`-800.webp` y la de 1200/1024 px); `loading="lazy"` y `decoding="async"` salvo las primeras de pantalla; ancho y alto explícitos para evitar saltos de diseño (CLS).
- Video: `preload="metadata"`, `poster`, formatos `webm` y `mp4`; no se carga en `saveData` ni en conexiones `2g`; se pausa fuera de pantalla con `IntersectionObserver`.
- Flores del cursor: pool fijo de 8 elementos, `transform`/`opacity`, throttle por `requestAnimationFrame`, sin escuchar `mousemove` si no hay `pointer: fine`.
- ScrollTrigger: crear los triggers una sola vez; `refresh` tras cargar imágenes y fuentes; sin `scrub` en listas largas; el catálogo no se anima fuera de pantalla.

## Do's and Don'ts

- Do usar crema como fondo, arena como tarjeta y cacao como texto; dejar que las fotos pongan el color.
- Do mantener todas las esquinas redondeadas (14 a 28px) y los botones en píldora; nada con esquina recta salvo el borde de pantalla.
- Do usar Fraunces con SOFT 100 y WONK 1 en titulares grandes; Instrument Sans para el resto. No agregar una tercera fuente.
- Do usar el botón WhatsApp como único CTA; cada producto lleva su mensaje ya escrito.
- Do usar terracota-profundo (#A04825) para texto pequeño en acento y terracota (#B8532A) solo para texto grande y rellenos.
- Do animar solo `transform`, `opacity` y `clip-path`; dejar todo en su estado final con reduced-motion.
- Do usar los recortes de flor únicamente sobre fondos claros.
- Don't poner sol (#EDB040) como texto sobre crema o arena, ni salvia como texto pequeño.
- Don't agregar carrito, precios inventados ni pagos: mientras `precio` sea `null`, mostrar "Consultar precio".
- Don't usar sombras salvo las 3 definidas (tarjetas apiladas, capa del footer, marco del video), ni blur ni glassmorphism.
- Don't copiar código de 21st.dev ni de Solenne: reescribir a mano.
- Don't usar emojis en la interfaz (el mensaje de WhatsApp sí puede llevar 🌸 del JSON).
- Don't usar Lenis ni WebGL/3D; no más de un video (el de la portada).
- Don't inventar contenido de la clienta: los marcadores (dueña, número, precios, respuestas de FAQ, productos con imagen IA) quedan visibles en el HANDOFF hasta que se confirmen.
