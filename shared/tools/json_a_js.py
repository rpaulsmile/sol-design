"""Convierte shared/products.json en shared/products.js (window.SOL_DATA = {...};).

Así la página se abre con doble clic (file://), sin fetch.
Uso: python shared/tools/json_a_js.py
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
datos = json.loads((RAIZ / "products.json").read_text(encoding="utf-8"))
js = "window.SOL_DATA = " + json.dumps(datos, ensure_ascii=False, indent=2) + ";\n"
(RAIZ / "products.js").write_text(js, encoding="utf-8")
print("Escrito", RAIZ / "products.js", f"({len(datos['productos'])} productos)")
