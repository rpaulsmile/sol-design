"""Quita el fondo blanco de una imagen y la guarda como PNG/WebP con transparencia.

Uso: python -I recortar_blanco.py entrada.jpg salida(.png|.webp) [tamaño_max]

Solo se vuelve transparente el blanco CONECTADO al borde (flood fill desde las esquinas),
así no se pierden los blancos internos de la flor. El borde se suaviza según la distancia
al blanco para conservar la pelusa del chenille.
"""
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
max_side = int(sys.argv[3]) if len(sys.argv) > 3 else 600

img = Image.open(src).convert("RGB")
a = np.asarray(img).astype(np.int16)
h, w, _ = a.shape

# "Distancia al blanco": 0 = blanco puro, crece con el color.
dist = (255 - a).max(axis=2)
BG = 28        # por debajo: fondo seguro
EDGE = 70      # entre BG y EDGE: borde semitransparente

# Flood fill desde el borde sobre píxeles "casi blancos".
bg = np.zeros((h, w), bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if dist[y, x] < EDGE and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if dist[y, x] < EDGE and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not bg[ny, nx] and dist[ny, nx] < EDGE:
            bg[ny, nx] = True; q.append((ny, nx))

alpha = np.full((h, w), 255, np.float32)
ramp = np.clip((dist - BG) / (EDGE - BG), 0, 1) * 255
alpha[bg] = ramp[bg]
alpha_img = Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))

out = img.convert("RGBA")
out.putalpha(alpha_img)
bbox = out.getbbox()
if bbox:
    pad = 8
    out = out.crop((max(bbox[0] - pad, 0), max(bbox[1] - pad, 0),
                    min(bbox[2] + pad, w), min(bbox[3] + pad, h)))
out.thumbnail((max_side, max_side), Image.LANCZOS)
kw = {"quality": 85, "method": 6} if dst.endswith(".webp") else {"optimize": True}
out.save(dst, **kw)
print(dst, out.size)
