---
version: alpha
name: "Sol Design, propuesta 2: Vitrina"
description: "Boutique limpia y editorial. Papel claro, tinta casi negra y un solo acento vino. Serif fina y alta (Instrument Serif) con sans geométrica (DM Sans). Mucho aire, líneas finas, esquinas casi rectas. Las fotos de producto se tratan como piezas de galería."
colors:
  papel: "#F7F4EE"
  hueso: "#EFEAE1"
  linea: "#DDD6CA"
  tinta: "#1C1A17"
  piedra: "#6E665D"
  vino: "#8E2A3F"
  vino-claro: "#C9A0A8"
  noche: "#16130F"
typography:
  display: { fontFamily: "Instrument Serif", fontSize: "clamp(3rem, 1.4rem + 8vw, 9rem)", fontWeight: 400, lineHeight: 0.92, letterSpacing: -0.02em }
  headline: { fontFamily: "Instrument Serif", fontSize: "clamp(2.25rem, 1.5rem + 3.4vw, 4.5rem)", fontWeight: 400, lineHeight: 1.0, letterSpacing: -0.01em }
  card-title: { fontFamily: "Instrument Serif", fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", fontWeight: 400, lineHeight: 1.1 }
  body: { fontFamily: "DM Sans", fontSize: 1rem, fontWeight: 400, lineHeight: 1.6 }
  label: { fontFamily: "DM Sans", fontSize: 0.75rem, fontWeight: 500, letterSpacing: 0.14em, textTransform: uppercase }
  numero: { fontFamily: "DM Sans", fontSize: 0.8125rem, fontWeight: 500, fontFeature: "'tnum'" }
  button: { fontFamily: "DM Sans", fontSize: 0.875rem, fontWeight: 500, letterSpacing: 0.06em, textTransform: uppercase }
rounded:
  none: 0
  sm: 2px
  arco: "999px 999px 0 0"
  pill: 999px
spacing:
  gutter: 20px
  gutter-lg: 48px
  max-width: 1400px
  section-y: "clamp(5rem, 3rem + 9vw, 11rem)"
---

## Concepto

**"Vitrina"**: la página es el escaparate de una tienda pequeña y cuidada. Si la propuesta 1 es una tarde cálida y
blanda, ésta es una galería: fondo papel, tinta, líneas de 1px, tipografía alta y fina, y cada producto expuesto como una
pieza con su número de inventario ("N.º 03"). Calma, orden, lujo accesible. El color fuerte lo ponen solo las fotos; la
interfaz tiene un único acento, **vino** (#8E2A3F), para el CTA y los detalles activos.

Debe sentirse claramente distinta a la 1: nada de terracota ni crema cálida, nada de Fraunces blanda, nada de orbit ni
flores en el cursor, nada de tarjetas redondeadas de 20px. Aquí: esquinas rectas (2px como máximo), un **arco** como forma
firma (fotos y video con la parte superior en medio punto, como una ventana de vitrina), y movimiento lento y preciso.

Público y reglas iguales: móvil primero, español de Ecuador con tuteo, un solo CTA (WhatsApp con mensaje ya escrito), sin
carrito ni pagos, GSAP por CDN, sin WebGL, `prefers-reduced-motion` respetado.

## Colores y contraste

| Token | Valor | Uso |
|---|---|---|
| papel | #F7F4EE | Fondo principal |
| hueso | #EFEAE1 | Bandas alternas, fondo de fotos y placeholders |
| linea | #DDD6CA | Hairlines de 1px (decorativas) |
| tinta | #1C1A17 | Texto, botones, bordes activos |
| piedra | #6E665D | Texto secundario (5.4:1 sobre papel, 4.9:1 sobre hueso) |
| vino | #8E2A3F | Acento: relleno del botón WhatsApp en hover, chip activo, cursiva resaltada en titulares, enlaces (7.6:1 sobre papel) |
| vino-claro | #C9A0A8 | Solo decorativo sobre noche (texto secundario sobre noche: 7:1) |
| noche | #16130F | Footer y la banda del statement |

Texto papel sobre tinta y sobre noche: más de 15:1. Vino sobre papel: pasa AA en cualquier tamaño. El acento nunca se
usa en más de un elemento grande por pantalla.

## Tipografía

Google Fonts: `family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap`.

- **Instrument Serif** para titulares, nombres de producto y el statement. Solo peso 400. La cursiva (`<em>`) se usa para
  una palabra por titular, en vino.
- **DM Sans** para todo lo demás. Etiquetas y botones en mayúsculas con tracking amplio (0.14em y 0.06em).
- Números de inventario ("N.º 01") y precios con `tnum`.
- `text-wrap: balance` en titulares, `pretty` en párrafos; párrafos de 58 caracteres como máximo.

## Logo

**Variante B** (línea continua con espiral) de la fase 2. Copiar `propuesta-1/logo/{logo-b,logo-b-stacked,mark-b}*.svg` a
`propuesta-2/logo/`. Recolorear para esta propuesta: en las versiones de color, el relleno sol (#EDB040) pasa a **vino**
#8E2A3F y el terracota (#B8532A) pasa a **tinta** #1C1A17 (wordmark en tinta, isotipo en vino). Las `-invert` quedan en
papel #F7F4EE con el isotipo en vino-claro. Favicon: `mark-b` con trazos en vino.

- Nav: logo horizontal a 26px de alto (móvil) y 30px (escritorio).
- Footer: logo apilado grande en papel sobre noche.
- No rotar, no estirar, no poner sobre fotos.

## Layout

- Gutter 20px en móvil, 48px desde 1024px. Máximo 1400px. Breakpoints: 640, 768, 1024, 1280.
- Rejilla visible: las secciones se separan con hairlines de 1px a ancho completo en lugar de cambios de fondo fuertes.
  Solo dos bandas de color: hueso (Vitrina y Personaliza) y noche (statement y footer).
- Catálogo: 2 columnas en móvil (gap 16px en columnas, 40px en filas), 3 desde 768px, 4 desde 1280px.
- Áreas táctiles de 44px mínimo.

## Componentes

**Botón WhatsApp.** Rectángulo de 52px, esquinas de 2px, fondo tinta, texto papel en `button` (mayúsculas), flecha "→" a la
derecha. Hover: el fondo cambia a vino en 0.35s y la flecha se desplaza 4px. Sobre noche: fondo papel con texto tinta, hover
vino con texto papel. Versión compacta de 44px. Etiquetas: "Pedir por WhatsApp", "Consultar" en tarjetas. Enlaces wa.me con
`target="_blank" rel="noopener"` y nombre accesible que incluye el texto visible ("Consultar: Macetita Rosa Roja por WhatsApp,
se abre en una pestaña nueva").

**Nav.** 64px, fondo papel, hairline inferior. Escritorio: logo a la izquierda, enlaces centrados (Colección, Vitrina,
Ocasiones, Preguntas) en `label`, botón compacto a la derecha. Móvil: logo, botón "Pedir" compacto y botón de menú; el menú
es una hoja papel a pantalla completa con enlaces en Instrument Serif 44px, numerados (01–04). Siempre visible (no se
esconde): esta propuesta es tranquila.

**Filtro de categorías.** Pestañas de texto en `label`, sin cajas: la activa en tinta con una línea de 1px debajo que se
desliza a su posición (indicador único que se mueve con `transform`); las otras en piedra. Scroll horizontal en móvil.
`aria-pressed` en cada botón. "Todo" primero.

**Tarjeta de producto.** Sin fondo ni borde. Foto 3:4 sobre hueso, esquinas rectas; la primera tarjeta de cada fila del
catálogo en escritorio puede usar la forma de arco. Debajo: fila con "N.º 01" (numero, piedra) a la izquierda y precio
("$8") a la derecha, nombre en `card-title`, y un enlace-botón "Consultar →" subrayado (no un botón lleno: el catálogo debe
verse sereno). Hover con puntero fino: la foto cambia a `imagenOriginal` (la foto real sin fondo editado) con un fundido de
0.5s si existe; si no, zoom 1.03. Productos `personalizable`: etiqueta "Personalizable" en `label` vino.

**Placeholder sin foto.** Fondo hueso, el nombre del producto en Instrument Serif cursiva grande centrado y tres puntos de
los `colores` del producto (12px) debajo; etiqueta "Foto pronto" en `label` piedra. Mismo 3:4.

**Acordeón.** Filas con hairline, pregunta en `card-title`, número a la izquierda (01…), "+" que gira 45° al abrir.
`aria-expanded`/`aria-controls`. Altura animada con `grid-template-rows`.

## Secciones (misma estructura de contenido que la propuesta 1, distinta forma)

1. **Nav.**
2. **Hero "Floración"** (papel). **Cambio del usuario (2026-11-06): las 3 propuestas deben ser distintas entre sí; esta
   NO lleva el video al lado del titular.** Una **flor gigante** de chenille ilustrada en SVG ocupa el fondo y se abre con
   el scroll:
   - Sección de 300svh con un escenario `position: sticky; top: 0; height: 100svh` (pin de GSAP con `scrub: 0.6`).
   - La flor: 8 a 10 pétalos alargados dibujados como lazos de chenille (path con trazo grueso de 14 a 22px, puntas
     redondas, relleno vino-claro muy suave y trazo vino; un segundo trazo fino punteado en papel encima simula la felpa),
     tallo y dos hojas en tinta. Tamaño: 150vmax, centrada, recortada por los bordes de la pantalla.
   - Estado inicial (scroll 0): **capullo**: pétalos cerrados (`rotate` cerca de 0, `scaleY 0.35` desde su base en el
     centro), flor girada -20°. Titular display "Flores que *no se marchitan*" centrado encima, en tinta.
   - Progreso 0 → 0.6: los pétalos se abren en abanico (cada uno a su ángulo final con un pequeño desfase por pétalo, como
     una flor de verdad), la flor gira a 0° y escala de 0.7 a 1.1; el titular sube y se desvanece.
   - Progreso 0.6 → 1: el **centro de la flor** (un círculo) se agranda y se vuelve una ventana redonda donde aparece una
     foto de producto (`maceta-rosa-roja-fondo`) que se cruza con 2 más; junto a ella entra la bajada "Ramos, macetitas y
     cuadros de chenille, hechos a mano y por encargo." y el botón WhatsApp. Al final del tramo el pin se suelta.
   - Indicador "Desliza para que florezca" en `label` con una línea que baja, oculto tras el 10 % de progreso.
   - Solo `transform`/`opacity`/`clip-path` (cada pétalo es un `<g>` con `transform-box: fill-box` y origen en su base).
   - Reduced-motion y sin JS: la flor se muestra ya abierta, estática, como fondo de un hero normal de 100svh con el
     titular, la bajada, la foto redonda y el botón visibles.
   - El video de WhatsApp no va en el hero; se usa más abajo dentro de El oficio (ver sección 6) como un pequeño arco que
     se reproduce al entrar en pantalla, con poster y botón de pausa.
3. **Statement** (papel). Una frase en `headline`, centrada, máx. 22ch: "Piezas pequeñas, hechas una por una, para regalar
   algo que *dura*." Debajo una fila de 3 datos con hairlines entre ellos: "100 % a mano", "Colores a pedido", "Entregas en
   Guayaquil".
4. **Vitrina** (hueso, `#vitrina`). Etiqueta "La vitrina", titular "Piezas destacadas". **Galería horizontal fijada**: en
   escritorio (y en móvil si funciona bien), la sección se fija y el scroll vertical desplaza una fila de los productos
   `destacado` en horizontal. Cada pieza: foto en arco (alto 60svh en escritorio, 52svh en móvil), "N.º 0x", nombre, precio
   y "Consultar →". Un contador "03 / 07" y una barra de progreso de 1px en tinta. Sin JS o con reduced-motion: fila con
   `overflow-x: auto` y `scroll-snap-type: x mandatory`.
5. **Colección** (papel, `#coleccion`). Titular "La colección", conteo "12 piezas", pestañas de filtro, grilla. Estado
   vacío: "Aún no hay piezas en esta categoría. Pídela a medida." con botón.
6. **El oficio** (papel). Tres columnas (apiladas en móvil) separadas por hairlines verticales: 01 Elegimos el chenille,
   02 Le damos forma, 03 La presentamos. Cada una con una foto cuadrada pequeña (de las `-fondo-800.webp`), titular
   `card-title` y dos líneas de texto. Sin sticky. Encima de las columnas, el video (`../assets/video/hero.webm/.mp4`,
   poster `hero-poster.webp`) en un arco de 280px de ancho (360px en escritorio), con el texto "Así se ve en sus manos" al
   lado; `preload="none"`, se reproduce solo al entrar en pantalla y no carga con `saveData`.
7. **Statement oscuro** (noche). Cita en Instrument Serif cursiva, papel: "Cada pétalo, doblado a mano." y firma en
   `label` vino-claro: "— Sol, Sol Design".
8. **Ocasiones** (papel, `#ocasiones`). Lista editorial: 5 filas grandes (Cumpleaños, Graduación, San Valentín, Día de la
   Madre, Maternidad y baby shower), cada una con número, nombre en `headline` y "Pedir para esta ocasión →" a la derecha.
   En escritorio, al pasar el cursor por una fila aparece una foto pequeña (220px, arco) que sigue al cursor dentro de la
   fila (`transform`, con suavizado lerp 0.15; oculta en táctil y en reduced-motion). En móvil, una frase corta bajo cada
   nombre. Mismas frases y mensajes de WhatsApp que la propuesta 1.
9. **Personaliza** (hueso, `#personaliza`). Dos columnas: a la izquierda titular "Hecha a tu medida" y texto; a la derecha
   una **ficha de pedido** con aspecto de etiqueta de tienda (borde 1px tinta, hairlines internas): Pieza (select con los
   productos `personalizable` y "Otra"), Nombre, Color (6 muestras cuadradas de 28px con anillo tinta en la activa). Una
   línea de vista previa del mensaje en cursiva y el botón WhatsApp que lo envía.
10. **Preguntas** (papel, `#preguntas`). Acordeón numerado, mismas 4 preguntas y respuestas inventadas de la propuesta 1.
11. **Footer** (noche). Logo apilado en papel, frase en `headline` "Escríbenos y la hacemos para ti", botón sobre oscuro,
    Instagram @solrovi.93, "Guayaquil, Ecuador" y el año. Normal, sin revelado.

## Motion

Lento, preciso y escaso. GSAP 3.12.5 + ScrollTrigger por cdnjs con `defer` (igual que la 1). Solo `transform`, `opacity`
y `clip-path`. Curva base `cubic-bezier(.22, 1, .36, 1)` (`expo.out` en GSAP); duraciones 0.9 a 1.4s; nada rebota.

| Patrón | Detalle |
|---|---|
| Titular por líneas | Cada línea con `clip-path: inset(0 0 100% 0)` a `inset(0)` y `y: 20px` a 0, 1.2s, stagger 0.1s. Texto real accesible |
| Arco que se abre | Fotos y video en arco entran con `clip-path: inset(100% 0 0 0)` a `inset(0)` (se llenan de abajo hacia arriba) y la imagen de `scale 1.12` a 1, 1.4s |
| Hairline | `scaleX` 0 a 1 desde la izquierda, 1.2s |
| Fundido | Bloques de texto: solo `opacity` 0 a 1 y `y: 12px`, 1s; stagger 0.06s en grillas |
| Vitrina | `pin: true`, `scrub: 0.8`, `x` de 0 a `-(anchoFila - anchoVentana)`; contador y barra ligados al progreso |
| Filtro | Indicador de pestaña se desliza 0.45s; tarjetas salientes `opacity 0` en 0.2s, entrantes con fundido y stagger 0.04s |
| Foto que sigue al cursor (ocasiones) | Solo `pointer: fine`; `requestAnimationFrame` con lerp; escala de 0.8 a 1 al entrar en la fila |

Reduced-motion o sin GSAP: todo visible en su estado final, la vitrina es una fila con scroll-snap, sin foto que sigue al
cursor, el acordeón abre sin animar. Los estados ocultos de entrada solo existen bajo la clase `motion` en `<html>` (mismo
patrón que la propuesta 1).

## Accesibilidad y rendimiento

Lo mismo que la propuesta 1: un `h1`, `h2` por sección, `lang="es-EC"`, foco visible (`outline: 2px solid vino`,
`offset 3px`; sobre noche, papel), alt descriptivos, decorativos con `aria-hidden`, video muted con botón de pausa, se pausa
fuera de pantalla y no carga con `saveData`. Imágenes con `srcset` (-800.webp / .webp), `loading="lazy"` salvo el poster.
Sin scroll horizontal a 390px ni a 200 % de zoom. Presupuesto de código propio: menos de 100 KB.

## Do / Don't

- Do esquinas rectas, hairlines, aire, un solo acento vino; arco como única forma curva.
- Do mostrar precios del JSON (mismo formato que `propuesta-1/js/main.js`) y "Consultar precio" si es `null`.
- Don't terracota, crema cálida, Fraunces, orbit, flores en el cursor, sombras o tarjetas redondeadas: eso es la propuesta 1.
- Don't emojis en la interfaz; don't copiar código de 21st.dev.
