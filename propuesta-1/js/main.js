/* Sol Design, propuesta 1. Datos, render, nav/menú, filtros, FAQ, personalización, WhatsApp y video.
   Sin movimiento de scroll: eso lo agrega la tanda 2 (motion.js). */
(function () {
  'use strict';

  var D = window.SOL_DATA;
  if (!D) { return; }
  var marca = D.marca;
  // Solo productos con foto real: fuera los que no tienen foto y los de imagen generada con IA (decisión del usuario, 2026-11-06)
  var productos = D.productos.filter(function (p) { return p.imagen && !p._imagenIA; });
  var categorias = D.categorias.filter(function (c) { return productos.some(function (p) { return p.categoria === c.id; }); });
  var ASSETS = '../'; // las rutas del JSON son relativas a la raíz del proyecto

  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function urlWhatsApp(mensaje) {
    return 'https://wa.me/' + marca.whatsapp + '?text=' + encodeURIComponent(mensaje);
  }
  function mensajeProducto(p) { return marca.mensajeBase.replace('{producto}', p.nombre); }
  function precio(p) {
    if (p.precio === null || p.precio === undefined) { return 'Consultar precio'; }
    var n = Number(p.precio);
    return '$' + (n % 1 === 0 ? String(n) : n.toFixed(2));
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // Dimensiones reales de las imágenes (ancho x alto de la versión grande; la de 800 mantiene la proporción)
  var DIMS = {
    'assets/img/cuadro-girasoles-luminoso': [860, 1000],
    'assets/img/corona-infantil-seli': [1074, 1044]
  };
  var ALTS = {
    'maceta-rosa-roja': 'Macetita con una rosa roja de chenille en maceta azul con musgo',
    'maceta-margarita-lila': 'Macetita con una margarita lila de chenille y capullos celestes, en maceta oliva',
    'lapiceros-flor-perlas': 'Lapiceros forrados en chenille con flor y perlitas, en tarjeta de regalo',
    'gerbera-rosada-tarjeta': 'Gerbera rosada de chenille con hoja, sobre una tarjeta amarilla',
    'cuadro-lirio-rojo': 'Cuadro con un lirio rojo de chenille en canasta tejida y lucecitas',
    'cuadro-girasoles-luminoso': 'Cuadro de girasoles y margaritas de felpa con luces LED sutiles',
    'mini-macetero-rosa-roja': 'Mini macetero con una rosa roja de chenille',
    'corona-infantil-personalizada': 'Corona floral infantil personalizada con el nombre'
  };
  var DIMS_RECORTE = {
    'assets/recortes/flor-gerbera': [600, 579],
    'assets/recortes/flor-margarita': [582, 600],
    'assets/recortes/flor-rosa-roja': [600, 433]
  };
  function dims(base) { return DIMS[base] || [1024, 1024]; }
  function altDe(p) { return ALTS[p.id] || p.nombre; }

  function imagenProducto(p, opts) {
    var d = dims(p.imagen);
    return '<img src="' + ASSETS + p.imagen + '.webp" srcset="' + ASSETS + p.imagen + '-800.webp 800w, ' + ASSETS + p.imagen + '.webp ' + d[0] + 'w"' +
      ' sizes="' + opts.sizes + '" width="' + d[0] + '" height="' + d[1] + '"' +
      (opts.lazy ? ' loading="lazy"' : ' fetchpriority="high"') + ' decoding="async" alt="' + esc(altDe(p)) + '">';
  }

  function botonWa(o) {
    var cls = 'btn' + (o.compacto ? ' btn--compacto' : '') + (o.bloque ? ' btn--bloque' : '');
    return '<a class="' + cls + '" href="' + esc(urlWhatsApp(o.mensaje)) + '" target="_blank" rel="noopener" data-wa="producto"' +
      ' aria-label="Pedir ' + esc(o.nombre) + ' por WhatsApp (se abre en una pestaña nueva)">' +
      '<svg class="icono icono--wa" aria-hidden="true"><use href="#i-wa"/></svg>' +
      '<span class="btn__texto">' + esc(o.texto) + '</span></a>';
  }

  /* ---------- Enlaces de WhatsApp estáticos (nav, hero, footer, ocasiones) ---------- */
  $$('[data-wa="general"]').forEach(function (a) { a.href = urlWhatsApp(marca.mensajeGeneral); });
  $$('[data-wa="ocasion"]').forEach(function (a) {
    a.href = urlWhatsApp(a.getAttribute('data-mensaje'));
    a.setAttribute('aria-label', 'Pedir ' + a.getAttribute('data-nombre') + ' por WhatsApp (se abre en una pestaña nueva)');
  });
  $$('[data-anio]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- Placeholder SVG de flor (productos sin foto) ---------- */
  function placeholder(p, i) {
    var c = p.colores || [];
    var petalo = c[0] || '#E8261C';
    var centro = c.length > 2 ? c[1] : '#EDB040';
    var hoja = c[c.length - 1] || '#5E7A2E';
    var id = 'ph' + i;
    var cx = 200, cy = 190, r = 64, petalos = '';
    for (var k = 0; k < 7; k++) {
      var a = (k / 7) * Math.PI * 2 - Math.PI / 2;
      petalos += '<path d="M' + cx + ' ' + cy + 'L' + (cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1) +
        '" stroke="' + petalo + '" stroke-width="40" stroke-linecap="round" fill="none"/>';
    }
    return '<svg class="placeholder" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración de una flor de chenille, foto pronto">' +
      '<defs><radialGradient id="' + id + '" cx="50%" cy="0%" r="75%"><stop offset="0" stop-color="#F6EDE0" stop-opacity=".95"/><stop offset=".7" stop-color="#F6EDE0" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="500" fill="#ECDCC6"/><rect width="400" height="500" fill="url(#' + id + ')"/>' +
      '<g class="placeholder__tallo">' +
      '<path d="M200 252C186 300 216 340 200 420" stroke="' + hoja + '" stroke-width="10" stroke-linecap="round" fill="none"/>' +
      '<path d="M203 345C240 318 270 330 280 306C246 296 218 312 203 345Z" fill="' + hoja + '"/>' +
      '<path d="M198 378C160 352 130 366 118 340C154 330 184 346 198 378Z" fill="' + hoja + '"/>' +
      '</g>' + petalos + '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="' + centro + '"/></svg>' +
      '<span class="placeholder__pildora">Foto pronto</span>';
  }

  /* ---------- Orbit "Flores disponibles" (carrusel con scroll-snap) ---------- */
  var itemsOrbit = productos.filter(function (p) { return p.imagenRecorte || (p.imagen && p.destacado); });

  function renderOrbit() {
    var pista = $('[data-orbit-pista]');
    var puntos = $('[data-orbit-puntos]');
    if (!pista) { return; }
    pista.innerHTML = itemsOrbit.map(function (p, i) {
      var recorte = !!p.imagenRecorte;
      var img = recorte
        ? '<img src="' + ASSETS + p.imagenRecorte + '.webp" width="' + (DIMS_RECORTE[p.imagenRecorte] || [600, 600])[0] + '" height="' + (DIMS_RECORTE[p.imagenRecorte] || [600, 600])[1] + '" decoding="async"' + (i === 0 ? '' : ' loading="lazy"') + ' alt="' + esc(altDe(p)) + '">'
        : imagenProducto(p, { sizes: '(min-width: 1024px) 360px, 80vw', lazy: i !== 0 });
      return '<article class="orbit__item" data-orbit-item data-index="' + i + '" data-id="' + esc(p.id) + '" role="group" aria-roledescription="diapositiva" aria-label="' + (i + 1) + ' de ' + itemsOrbit.length + '">' +
        '<div class="orbit__disco ' + (recorte ? 'orbit__disco--recorte' : 'orbit__disco--foto') + '" data-orbit-disco>' + img + '</div>' +
        '<div class="orbit__ficha" data-orbit-ficha>' +
        '<h3 class="orbit__nombre">' + esc(p.nombre) + '</h3>' +
        '<p class="orbit__desc">' + esc(p.descripcion) + '</p>' +
        '<p class="orbit__precio">' + esc(precio(p)) + '</p>' +
        botonWa({ mensaje: mensajeProducto(p), nombre: p.nombre, texto: 'Pedir por WhatsApp' }) +
        '</div></article>';
    }).join('');
    puntos.innerHTML = itemsOrbit.map(function (p, i) {
      return '<button type="button" class="orbit__punto" data-orbit-punto="' + i + '" aria-label="Ir a ' + esc(p.nombre) + '"></button>';
    }).join('');

    var items = $$('[data-orbit-item]', pista);
    var dots = $$('[data-orbit-punto]', puntos);
    var prev = $('[data-orbit-prev]');
    var next = $('[data-orbit-next]');
    var actual = 0;
    var raf = 0;
    var api = { gancho: null }; // motion.js (tanda 2) asigna api.gancho para dirigir el anillo

    function indiceCentral() {
      var centro = pista.scrollLeft + pista.clientWidth / 2, mejor = 0, dist = Infinity;
      items.forEach(function (it, i) {
        var d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - centro);
        if (d < dist) { dist = d; mejor = i; }
      });
      return mejor;
    }
    function marcar(i) {
      actual = i;
      dots.forEach(function (d, k) { if (k === i) { d.setAttribute('aria-current', 'true'); } else { d.removeAttribute('aria-current'); } });
      items.forEach(function (it, k) { it.toggleAttribute('data-activo', k === i); });
      prev.disabled = i === 0;
      next.disabled = i === items.length - 1;
    }
    function ir(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      if (api.gancho) { api.gancho(i); return; }
      var it = items[i];
      pista.scrollTo({ left: it.offsetLeft - (pista.clientWidth - it.offsetWidth) / 2, behavior: reducido ? 'auto' : 'smooth' });
      marcar(i);
    }
    pista.addEventListener('scroll', function () {
      if (raf) { return; }
      raf = requestAnimationFrame(function () { raf = 0; var i = indiceCentral(); if (i !== actual) { marcar(i); } });
    }, { passive: true });
    prev.addEventListener('click', function () { ir(actual - 1); });
    next.addEventListener('click', function () { ir(actual + 1); });
    dots.forEach(function (d) { d.addEventListener('click', function () { ir(Number(d.getAttribute('data-orbit-punto'))); }); });
    pista.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(actual + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); ir(actual - 1); }
    });
    marcar(0);
    window.addEventListener('resize', function () { if (!api.gancho) { marcar(indiceCentral()); } });
    api.ir = ir; api.actual = function () { return actual; }; api.items = items; api.marcar = marcar;
    return api;
  }

  /* ---------- Catálogo ---------- */
  function renderCatalogo() {
    var grid = $('[data-catalogo-grid]');
    var chips = $('[data-chips]');
    var conteo = $('[data-catalogo-conteo]');
    var vacio = $('[data-catalogo-vacio]');
    if (!grid) { return; }
    var catNombre = {};
    D.categorias.forEach(function (c) { catNombre[c.id] = c.nombre; });

    grid.innerHTML = productos.map(function (p, i) {
      var foto = p.imagen
        ? imagenProducto(p, { sizes: '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw', lazy: true })
        : placeholder(p, i);
      return '<article class="tarjeta" data-tarjeta data-categoria="' + esc(p.categoria) + '" data-id="' + esc(p.id) + '">' +
        '<div class="tarjeta__foto">' + foto + '</div>' +
        '<div class="tarjeta__cuerpo">' +
        '<h3 class="card-title">' + esc(p.nombre) + '</h3>' +
        '<p class="tarjeta__precio">' + esc(precio(p)) + '</p>' +
        (p.personalizable ? '<span class="pildora">Personalizable</span>' : '') +
        botonWa({ mensaje: mensajeProducto(p), nombre: p.nombre, texto: 'Quiero esta', compacto: true, bloque: true }) +
        '</div></article>';
    }).join('');

    var lista = [{ id: 'todo', nombre: 'Todo' }].concat(categorias);
    chips.innerHTML = lista.map(function (c) {
      return '<button type="button" class="chip" data-chip="' + esc(c.id) + '" aria-pressed="' + (c.id === 'todo') + '">' + esc(c.nombre) + '</button>';
    }).join('');

    var tarjetas = $$('[data-tarjeta]', grid);
    function aplicar(id) {
      var n = 0;
      tarjetas.forEach(function (t) {
        var ok = id === 'todo' || t.getAttribute('data-categoria') === id;
        t.hidden = !ok;
        if (ok) { n++; }
      });
      conteo.textContent = n + (n === 1 ? ' pieza' : ' piezas');
      vacio.hidden = n !== 0;
    }
    function filtrar(id) {
      $$('[data-chip]', chips).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-chip') === id)); });
      var g = window.Sol && window.Sol.filtroGancho; // motion.js: sale/entra animado y luego llama a aplicar
      if (g) { g(id, function () { aplicar(id); }); } else { aplicar(id); }
    }
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('[data-chip]');
      if (b) { filtrar(b.getAttribute('data-chip')); }
    });
    filtrar('todo');
  }

  /* ---------- Nav y menú móvil ---------- */
  function iniciarMenu() {
    var btn = $('[data-menu-btn]');
    var menu = $('[data-menu]');
    var nav = $('[data-nav]');
    if (!btn || !menu) { return; }
    var aislados = [$('#contenido'), $('[data-footer]')];
    var abierto = false;

    function enfocables() {
      var sel = 'a[href], button:not([disabled])';
      return $$(sel, nav).concat($$(sel, menu)).filter(function (el) { return el.offsetParent !== null || el === btn; });
    }
    function abrir() {
      abierto = true;
      menu.hidden = false;
      void menu.offsetWidth; // reflow para que arranque la transición
      menu.classList.add('abierto');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('menu-abierto');
      aislados.forEach(function (el) { if (el) { el.setAttribute('inert', ''); } });
      var primero = $('a', menu);
      if (primero) { primero.focus(); }
    }
    function cerrar(devolverFoco) {
      abierto = false;
      menu.classList.remove('abierto');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('menu-abierto');
      aislados.forEach(function (el) { if (el) { el.removeAttribute('inert'); } });
      if (devolverFoco) { btn.focus(); }
      setTimeout(function () { if (!abierto) { menu.hidden = true; } }, reducido ? 160 : 520);
    }
    btn.addEventListener('click', function () { if (abierto) { cerrar(true); } else { abrir(); } });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { cerrar(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (!abierto) { return; }
      if (e.key === 'Escape') { e.preventDefault(); cerrar(true); return; }
      if (e.key !== 'Tab') { return; }
      var f = enfocables();
      if (!f.length) { return; }
      var primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches && abierto) { cerrar(false); } });
  }

  /* ---------- FAQ ---------- */
  function iniciarFaq() {
    $$('.faq__btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.closest('.faq__item');
        var abierto = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!abierto));
        item.classList.toggle('abierto', !abierto);
      });
    });
  }

  /* ---------- Personalízalo ---------- */
  function iniciarPersonaliza() {
    var form = $('[data-personaliza]');
    if (!form) { return; }
    var nombre = $('#pers-nombre');
    var vista = $('[data-personaliza-vista]');
    var btn = $('[data-personaliza-btn]');
    var opciones = $('[data-personaliza-productos]');
    var producto = '';

    function compuesto() {
      var n = nombre.value.trim();
      var radio = form.querySelector('input[name="color"]:checked');
      var color = radio ? radio.value : '';
      if (!producto && !n && !color) { return '¡Hola Sol Design! 🌸 Quiero hacer un pedido personalizado.'; }
      var m = '¡Hola Sol Design! 🌸 Quiero personalizar ' + (producto || 'una flor') + '.';
      if (n) { m += ' Nombre: ' + n + '.'; }
      if (color) { m += ' Color: ' + color + '.'; }
      return m;
    }
    function actualizar() {
      var m = compuesto();
      vista.textContent = m;
      btn.href = urlWhatsApp(m);
    }
    opciones.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) { return; }
      var ya = b.getAttribute('aria-pressed') === 'true';
      $$('.chip', opciones).forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      producto = ya ? '' : b.getAttribute('data-valor');
      if (!ya) { b.setAttribute('aria-pressed', 'true'); }
      actualizar();
    });
    form.addEventListener('input', actualizar);
    form.addEventListener('change', actualizar);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    actualizar();
  }

  /* ---------- Video del hero ---------- */
  function iniciarVideo() {
    var video = $('[data-hero-video]');
    var boton = $('[data-hero-play]');
    if (!video || !boton) { return; }
    var cn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var ahorro = !!(cn && (cn.saveData || /(^|-)2g$/.test(cn.effectiveType || '')));
    var cargado = false;
    var pausadoPorUsuario = reducido || ahorro; // por defecto sin reproducir en reduced-motion / ahorro de datos
    var visible = true;

    function etiqueta(reproduciendo) {
      boton.setAttribute('data-estado', reproduciendo ? 'reproduciendo' : 'pausado');
      boton.setAttribute('aria-label', reproduciendo ? 'Pausar video' : 'Reproducir video');
    }
    function cargar() {
      if (cargado) { return; }
      cargado = true;
      [['../assets/video/hero.webm', 'video/webm'], ['../assets/video/hero.mp4', 'video/mp4']].forEach(function (s) {
        var el = document.createElement('source');
        el.src = s[0]; el.type = s[1];
        video.appendChild(el);
      });
      video.load();
    }
    function reproducir() {
      cargar();
      var p = video.play();
      if (p && p.catch) { p.catch(function () { etiqueta(false); }); }
    }
    video.addEventListener('playing', function () { etiqueta(true); document.documentElement.setAttribute('data-video', 'listo'); });
    video.addEventListener('pause', function () { etiqueta(false); });
    video.addEventListener('canplaythrough', function () { document.documentElement.setAttribute('data-video', 'listo'); });

    boton.addEventListener('click', function () {
      if (video.paused) { pausadoPorUsuario = false; reproducir(); }
      else { pausadoPorUsuario = true; video.pause(); }
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (!cargado) { return; }
        if (!visible) { video.pause(); }
        else if (!pausadoPorUsuario) { reproducir(); }
      }, { threshold: 0.15 }).observe(video);
    }

    etiqueta(false);
    if (!pausadoPorUsuario) { reproducir(); }
  }

  /* ---------- Arranque ---------- */
  var orbit = renderOrbit();
  renderCatalogo();
  iniciarMenu();
  iniciarFaq();
  iniciarPersonaliza();
  iniciarVideo();

  // Para la tanda 2
  window.Sol = { datos: D, urlWhatsApp: urlWhatsApp, orbit: orbit, reducido: reducido };
})();
