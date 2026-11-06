---
version: alpha
name: "Sol Design, propuesta 3: Jardín de chenille"
description: "Juguetona e ilustrada. Fondo durazno claro como el logo original, colores vivos sacados de los productos, tipografía redonda (Fredoka + Nunito), garabatos de chenille dibujados en SVG, tarjetas tipo sticker y movimiento con rebote. Conserva el logo original de la clienta."
colors:
  durazno: "#FFF3E6"
  durazno-2: "#FCE3CC"
  tinta: "#3A2318"
  tinta-suave: "#6E4E3E"
  rosa: "#F2A7B5"
  fucsia: "#C2185B"
  amarillo: "#F5D547"
  turquesa: "#6ED3E0"
  lila: "#B79BE8"
  verde: "#2E7D4F"
  naranja: "#E5733A"
typography:
  display: { fontFamily: Fredoka, fontSize: "clamp(3rem, 1.6rem + 7vw, 7.5rem)", fontWeight: 600, lineHeight: 0.95, letterSpacing: -0.01em }
  headline: { fontFamily: Fredoka, fontSize: "clamp(2rem, 1.4rem + 3vw, 4rem)", fontWeight: 600, lineHeight: 1.0 }
  card-title: { fontFamily: Fredoka, fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)", fontWeight: 500, lineHeight: 1.15 }
  body: { fontFamily: Nunito, fontSize: 1.0625rem, fontWeight: 500, lineHeight: 1.6 }
  label: { fontFamily: Nunito, fontSize: 0.8125rem, fontWeight: 800, letterSpacing: 0.04em }
  button: { fontFamily: Fredoka, fontSize: 1rem, fontWeight: 600 }
rounded:
  md: 18px
  lg: 28px
  blob: "42% 58% 55% 45% / 48% 42% 58% 52%"
  pill: 999px
spacing:
  gutter: 16px
  gutter-lg: 40px
  max-width: 1320px
  section-y: "clamp(4.5rem, 3rem + 6vw, 8rem)"
---

## Concepto

**"Jardín de chenille"**: la página se siente como abrir una caja de regalo llena de flores de felpa. Es la propuesta más
alegre y la más cercana a la marca que la clienta ya usa: conserva **su logo original** (`logo sol.png`: sol dormido,
guirnalda en acuarela y serif terracota) y toma su fondo durazno claro. Encima, los colores vivos de los productos (rosa,
amarillo, turquesa, lila, verde) aparecen en garabatos, stickers y fondos de tarjeta.

Elemento firma: **el garabato de chenille**, una línea gruesa (8 a 12px), ondulada y con puntas redondas, dibujada en SVG,
que subraya titulares, enmarca fotos y separa secciones; se "dibuja" al entrar (`stroke-dashoffset`). Segunda firma:
**"Arma tu ramo"**, un pequeño constructor donde eliges flores y se arma el mensaje de WhatsApp.

Debe sentirse distinta a la 1 (cálida y sobria) y a la 2 (galería): aquí hay color, rebote, rotaciones leves y formas
blandas tipo blob. Pero sigue siendo fácil de leer: el texto es siempre tinta sobre fondos claros.

Reglas iguales: móvil primero, español de Ecuador con tuteo, CTA único por WhatsApp, sin carrito, GSAP por CDN, sin WebGL,
`prefers-reduced-motion` respetado.

## Colores y contraste

| Token | Valor | Uso |
|---|---|---|
| durazno | #FFF3E6 | Fondo principal (ajustar al tono exacto del fondo de `logo sol.png` si difiere poco) |
| durazno-2 | #FCE3CC | Bandas alternas |
| tinta | #3A2318 | Todo el texto (12:1 sobre durazno; más de 7:1 sobre rosa, amarillo, turquesa y lila) |
| tinta-suave | #6E4E3E | Texto secundario (6.6:1 sobre durazno) |
| fucsia | #C2185B | Botón WhatsApp (texto blanco 5.6:1), acentos de texto grande |
| rosa, amarillo, turquesa, lila | ver tokens | Solo fondos de tarjeta/sticker, garabatos y formas; nunca texto |
| verde | #2E7D4F | Tallos, hojas, detalles; texto blanco sobre verde 5.2:1 |
| naranja | #E5733A | Solo decorativo (rayos de sol, puntos) |

Regla: el texto nunca es de color pastel; los colores vivos son superficies. El texto encima siempre tinta.

## Tipografía

Google Fonts: `family=Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800&display=swap`.

- **Fredoka** (redonda, blanda como el chenille) para titulares, nombres y botones. Una palabra por titular puede ir
  resaltada con un **garabato** debajo (SVG) o sobre un "blob" de color, no con cursiva.
- **Nunito** para cuerpo y etiquetas. Etiquetas en minúsculas o tipo oración (no mayúsculas con tracking: eso es la 2).
- `text-wrap: balance` en titulares.

## Logo

**El logo original de la clienta, sin cambios** (`logo sol.png`, 524x483, con fondo crema incorporado).
- Copiarlo a `propuesta-3/img/logo-sol.png` y generar `logo-sol.webp`. Intentar una versión con fondo transparente con
  `shared/tools/recortar_blanco.py` (o un umbral sobre el color de fondo) **solo si queda limpia**; si la guirnalda pierde
  calidad, usar el original sobre un fondo del mismo durazno (muestrear el color del borde y usarlo como `--durazno`).
- Nav: el logo completo es muy detallado para 32px. En el nav usar el logo recortado a la zona del sol + "Sol Design"
  (recorte rectangular de la imagen, alto 44px) o, si no se lee, el texto "Sol Design" en Fredoka 600 tinta junto a un
  recorte circular del sol. Documentar la decisión.
- Hero y footer: el logo completo grande (220 a 320px), sin deformar ni recolorear.
- Favicon: recorte del sol a 64px en PNG.

## Formas y superficies

- Tarjetas de 28px de radio con fondo de color pastel (rotan entre rosa, amarillo, turquesa, lila, durazno-2) y un borde de
  2px tinta, con una "sombra sticker" sólida: `4px 4px 0 var(--tinta)`. Inclinación leve alterna (-1.5°, 1°, -0.5°).
- Fotos dentro de las tarjetas: radio 18px. Blobs (`border-radius` irregular del token) para resaltar palabras y fondos.
- Separadores entre secciones: onda SVG (path suave) a ancho completo, del color de la sección siguiente.
- Iconos y garabatos con trazo grueso redondeado. Puntitos (confeti) de 6 a 10px en los colores vivos como decoración
  dispersa, con `aria-hidden`.

## Componentes

**Botón WhatsApp.** Píldora de 54px, fondo fucsia, texto blanco Fredoka 600, borde 2px tinta, sombra sticker
`3px 3px 0 tinta`. Hover: se levanta (`translate(-2px,-2px)`, sombra a `5px 5px 0`) en 0.2s; `:active` se hunde
(`translate(2px,2px)`, sombra 0). Icono WhatsApp a la izquierda. Compacto 44px. Etiquetas: "¡Lo quiero!" en tarjetas,
"Pedir por WhatsApp" en general. Nombre accesible que incluya el texto visible.

**Nav.** 64px, fondo durazno, sin hairline (una onda pequeña debajo al hacer scroll). Enlaces en Fredoka 500 con un
garabato que se dibuja debajo en hover. Móvil: menú en hoja amarilla con enlaces grandes en Fredoka que entran con rebote
escalonado. Se esconde al bajar y vuelve al subir.

**Chips de categoría.** Píldoras con borde 2px tinta, fondo blanco; la activa con fondo amarillo y sombra sticker.
`aria-pressed`.

**Tarjeta sticker de producto.** Ver Formas. Foto 1:1 con radio 18px, nombre en `card-title`, precio en una "etiqueta de
precio" redonda (círculo de 56px, fondo blanco, borde 2px tinta, rotado 8°) pegada en la esquina superior derecha de la
foto, y botón "¡Lo quiero!". Si es `personalizable`, una estrellita "a tu gusto". Hover (puntero fino): la tarjeta se
endereza (rotación a 0) y sube 4px con rebote.

**Placeholder sin foto.** Ilustración SVG de una flor de chenille (pétalos como lazos gruesos con los `colores` del
producto, tallo verde ondulado) sobre el color de la tarjeta, con la etiqueta "¡foto pronto!". El tallo se balancea 3° en
5s (no con reduced-motion).

**Arma tu ramo.** Ver Secciones.

## Secciones (misma estructura de contenido que la propuesta 1)

1. **Nav.**
2. **Hero "El hilo"** (durazno). **Cambio del usuario (2026-11-06): las 3 propuestas deben ser distintas; ésta NO lleva
   video al lado del titular ni flor que se abre (eso es la 2).** Un único **hilo de chenille** (SVG, trazo de 14px, color
   fucsia con un trazo punteado blanco encima que simula la felpa) recorre TODA la página de arriba abajo, como si alguien
   lo fuera doblando a mano mientras bajas:
   - En el hero, el hilo escribe "Sol" en letra cursiva continua (un solo path, dibujado con `stroke-dashoffset` al cargar,
     1.6s) junto al logo original; debajo el titular "Flores que no se marchitan" con palabras saltarinas, bajada y botón.
   - Al hacer scroll, el mismo hilo sigue dibujándose (`scrub`) por el costado de la página, serpenteando entre secciones:
     hace un rulo alrededor del titular de la colección, se enrolla como tallo en "Arma tu ramo", pasa por los 3 pasos de
     "Cómo se hace" y termina en el footer doblado en forma de **flor** completa que "florece" (los pétalos del path se
     cierran al llegar al 100 %).
   - Implementación: un SVG absoluto de alto de página detrás del contenido (z-index bajo, `pointer-events: none`), con el
     path recalculado en `resize` según las posiciones de las secciones (o varios paths por sección encadenados, uno por
     tramo, más fácil de mantener). En móvil el hilo va por el borde izquierdo (gutter de 16px) para no tapar texto.
   - Reduced-motion y sin JS: el hilo se ve ya dibujado completo, estático.
   - El video de WhatsApp va como **polaroid** inclinada (borde blanco de 10px, sombra sticker) en Quiénes somos, con
     `preload="none"`; se reproduce al entrar en pantalla y no carga con `saveData`. Los 3 recortes de flor quedan como
     stickers pegados alrededor de la polaroid.
3. **Cinta** (fucsia). Marquee horizontal infinito con texto blanco Fredoka: "hecho a mano ✿ a tu gusto ✿ para regalar ✿
   no se marchitan ✿" (el ✿ es un SVG, no emoji). Se detiene con reduced-motion (texto estático) y en hover.
4. **Quiénes somos** (durazno). Texto en `headline` con palabras sobre blobs de color: "Cada flor la hace **Sol**, a mano,
   con chenille y mucho **cariño**." Al lado, 2 fotos en tarjeta sticker inclinadas.
5. **Colección** (durazno-2, `#coleccion`). Titular "Nuestras flores", chips, grilla de stickers (2 columnas en móvil, 3
   desde 768, 4 desde 1280). Estado vacío ilustrado: "¡Esta todavía no la tenemos, pero te la hacemos!" con botón.
6. **Arma tu ramo** (amarillo claro #FFF0B8 o durazno, `#arma`). Etiqueta "Juguemos", titular "Arma tu ramo". Izquierda:
   botones grandes con los 3 recortes de flor (rosa roja, margarita, gerbera) y un selector de 6 colores de chenille
   (círculos). Cada clic en una flor la añade a una **maceta** ilustrada en SVG a la derecha: el recorte cae desde arriba
   con rebote y se coloca en un hueco libre (máximo 7 flores, con un ligero giro aleatorio). Botones "Quitar la última" y
   "Empezar de nuevo". El mensaje se arma en vivo y se muestra: "¡Hola Sol Design! Quiero un ramo con 2 rosas rojas y 1
   margarita, en tonos lila." Botón WhatsApp "¡Quiero este ramo!". Accesible: los botones dicen "Añadir rosa roja", un
   `aria-live="polite"` anuncia "Tu ramo tiene 3 flores". Con reduced-motion las flores aparecen sin caída.
7. **Cómo se hace** (durazno, `#como-se-hace`). Tres pasos en tarjetas sticker numeradas con números grandes en círculo
   (1, 2, 3), unidas por un garabato de chenille que se dibuja al hacer scroll (`scrub`) de una a otra. Textos de la 1.
8. **Ocasiones** (durazno-2, `#ocasiones`). Carrusel horizontal de 5 tarjetas sticker de colores distintos (scroll-snap,
   flechas), cada una con un ícono dibujado simple (torta, birrete, corazón, flor, bebé/corona), título, frase y botón con su
   mensaje. Mismos textos que la propuesta 1.
9. **Personaliza** (durazno). Corto: titular "¿Con su nombre? ¡Claro!", campos Nombre y Color (muestras redondas de 36px con
   anillo tinta), vista previa del mensaje y botón. Al escribir el nombre, aparece en una corona ilustrada (texto SVG sobre
   un arco) como vista previa divertida.
10. **Preguntas** (durazno-2, `#preguntas`). Acordeón en tarjetas blancas de radio 18px y borde 2px; el "+" es una flor
    que gira 90° al abrir. Mismas preguntas y respuestas que la propuesta 1.
11. **Footer: el prado** (verde #2E7D4F, texto blanco). Arriba, un prado de flores SVG ilustradas (10 a 14 flores simples
    de colores vivos con tallos) que se balancean suave en distinto ritmo y "crecen" (`scaleY` desde abajo) al entrar.
    Logo original sobre una tarjeta durazno redonda, frase "¡Escríbenos y la hacemos para ti!", botón WhatsApp (versión
    blanca con texto tinta), Instagram @solrovi.93, "Hecho a mano en Guayaquil" y el año.

## Motion

Juguetón pero corto. GSAP 3.12.5 + ScrollTrigger por cdnjs con `defer`. Solo `transform`, `opacity`, `clip-path` y
`stroke-dashoffset` (en SVG pequeños).

| Patrón | Detalle |
|---|---|
| Pop-in | Tarjetas y stickers: de `scale 0.6`, `rotate ±8°`, `opacity 0` a su estado, `back.out(1.7)`, 0.7s, stagger 0.07s |
| Titular saltarín | Palabras que suben desde `y: 60%` con `back.out(2)`, 0.6s, stagger 0.05s; texto real accesible |
| Garabato que se dibuja | `stroke-dashoffset` de la longitud a 0, 1.0s `power2.out`; en "Cómo se hace", ligado a `scrub` |
| Flotar | Recortes del hero y confeti: `y` ±8px y `rotate` ±4° en bucle `sine.inOut` 3–5s (pausado fuera de pantalla) |
| Caída al ramo | `y` desde -200px con `bounce.out` 0.8s y rotación final aleatoria ±15° |
| Marquee | CSS `@keyframes translateX(-50%)` 30s lineal; `animation-play-state: paused` en hover |
| Prado | Tallos con `rotate` ±3° desde la base, `sine.inOut`, duraciones 2.5–4s desfasadas |

Duraciones cortas (0.2 a 0.8s), nada dura más de 1s salvo los bucles suaves. Con reduced-motion: sin rebotes, sin bucles,
sin marquee (texto estático y centrado), sin flotación ni balanceo, todo visible. Estados ocultos solo bajo la clase
`motion` en `<html>`.

## Accesibilidad y rendimiento

Igual que la propuesta 1: un `h1`, `lang="es-EC"`, foco visible (`outline: 3px solid tinta`, `offset 3px`), alt
descriptivos, decorativos con `aria-hidden`, áreas táctiles de 44px, video muted con botón de pausa y sin carga con
`saveData`, imágenes con `srcset` y lazy. Sin scroll horizontal a 390px (cuidado con las rotaciones, el confeti y el
marquee: `overflow-x: clip` en las secciones que los usen). Presupuesto de código propio menor a 120 KB.

## Do / Don't

- Do colores vivos como superficies y texto siempre tinta; garabatos de chenille; rebote corto.
- Do usar el logo original sin cambios.
- Don't serif, terracota sobria, arcos ni hairlines de galería (son de la 1 y la 2); don't orbit ni flores en el cursor.
- Don't emojis en la interfaz (el ✿ es SVG); don't texto en colores pastel.
