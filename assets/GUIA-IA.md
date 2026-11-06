# Guía de edición con IA (Google Flow): Sol Design

**Regla de oro:** la IA solo cambia el FONDO y la LUZ, nunca el producto. Nada de agregar o quitar flores, cambiar
colores, alisar la textura felpuda o "mejorar" la forma. La clienta vende lo que se ve en la foto. Si el resultado
altera el producto, se descarta.

Entradas: `assets/img/*.jpg` (copias optimizadas) o los originales de la raíz.
Salidas: guardar en `assets/ai/` con el mismo nombre más un sufijo: `-recorte.png`, `-fondo.jpg`, `-portada.jpg`.

## 1. Recorte sin fondo (PNG transparente)
Uso: flores que siguen al cursor y selector tipo orbit.
Candidatas: `gerbera-rosada-tarjeta` (solo la flor, sin tarjeta ni mano), `maceta-rosa-roja`, `maceta-margarita-lila`,
y una flor de `lapiceros-flor-perlas` (la lila).

Prompt:
> Remove the background completely, keep only the [pink gerbera flower with its stem and leaf]. Keep the exact
> colors, fuzzy chenille texture, shape and proportions. Do not add or remove any element. Transparent background.

Si Flow no exporta transparencia: pedir fondo blanco puro `#FFFFFF` y lo recortamos después con un script.

## 2. Fondo cálido uniforme (tarjetas del catálogo)
Uso: grilla de productos. Todas las fotos con el mismo fondo y la misma luz.
Candidatas: las 5 fotos.

Prompt:
> Place this exact handmade chenille product on a plain warm cream background (#F6EFE4), soft natural window light
> from the left, gentle soft shadow underneath, square 1:1 composition centered. Keep the product exactly as it
> is: same colors, same fuzzy texture, same shape, same label sticker. Do not add props.

## 3. Portada (opcional)
Uso: imagen de respaldo del video o una escena alternativa.
> Product still life of handmade pipe cleaner flowers in small pots on a warm linen tablecloth, morning sunlight,
> shallow depth of field, vertical 9:16, cozy artisan market feeling. [Adjuntar las fotos reales como referencia
> ("ingredients") para que use los productos reales.]

## 4. Video (opcional, Veo/Omni)
Clip corto de 5 a 8 s con movimiento suave de cámara sobre un producto real (imagen a video), sin audio.
> Slow gentle camera push-in on this exact product, soft sunlight flicker, no changes to the product.

## Checklist por imagen
- [ ] ¿Mismos colores que el original? (compararlas lado a lado)
- [ ] ¿Misma cantidad de flores, hojas y perlas?
- [ ] ¿Se conserva la textura felpuda?
- [ ] ¿El sello "Sol Design" sigue igual o no aparece (no inventado)?
