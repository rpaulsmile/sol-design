/* Sol Design, propuesta 2 "Vitrina". Datos, render, menú, filtros con indicador, vitrina (modo scroll-snap),
   acordeón, ficha de pedido, WhatsApp y video. El movimiento de scroll vive en motion.js. */
(function () {
  'use strict';

  var D = window.SOL_DATA;
  if (!D) { return; }
  var marca = D.marca;
  // Solo productos con foto real: fuera los que no tienen foto y los de imagen generada con IA (decisión del usuario, 2026-11-06)
  var productos = D.productos.filter(function (p) { return p.imagen && !p._imagenIA; });
  var categorias = D.categorias.filter(function (c) { return productos.some(function (p) { return p.categoria === c.id; }); });
  var ASSETS = '../';
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function urlWhatsApp(mensaje) { return 'https://wa.me/' + marca.whatsapp + '?text=' + encodeURIComponent(mensaje); }
  function mensajeProducto(p) { return marca.mensajeBase.replace('{producto}', p.nombre); }
  function precio(p) {
    if (p.precio === null || p.precio === undefined) { return 'Consultar precio'; }
    var n = Number(p.precio);
    return '$' + (n % 1 === 0 ? String(n) : n.toFixed(2));
  }

  var DIMS = { 'assets/img/cuadro-girasoles-luminoso': [860, 1000], 'assets/img/corona-infantil-seli': [1074, 1044] };
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
  function dims(base) { return DIMS[base] || [1024, 1024]; }

  /* ---------- WhatsApp estático ---------- */
  $$('[data-wa="general"]').forEach(function (a) { a.href = urlWhatsApp(marca.mensajeGeneral); });
  $$('[data-wa="ocasion"]').forEach(function (a) {
    a.href = urlWhatsApp(a.getAttribute('data-mensaje'));
    a.setAttribute('aria-label', 'Pedir para esta ocasión: ' + a.getAttribute('data-nombre') + ', por WhatsApp, se abre en una pestaña nueva');
  });
  $$('[data-anio]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- Tarjeta de producto ---------- */
  function placeholder(p) {
    var pts = (p.colores || []).slice(0, 3).map(function (c) { return '<span class="ph__pt" style="background:' + esc(c) + '"></span>'; }).join('');
    return '<div class="ph" role="img" aria-label="' + esc(p.nombre) + ', foto pronto"><p class="ph__n">' + esc(p.nombre) + '</p><span class="ph__pts">' + pts + '</span><span class="ph__etq label">Foto pronto</span></div>';
  }
  function fotos(p, sizes, lazy) {
    var d = dims(p.imagen);
    var alt = ALTS[p.id] || p.nombre;
    var h = '<img class="tj__img" src="' + ASSETS + p.imagen + '.webp" srcset="' + ASSETS + p.imagen + '-800.webp 800w, ' + ASSETS + p.imagen + '.webp ' + d[0] + 'w" sizes="' + sizes + '" width="' + d[0] + '" height="' + d[1] + '" loading="' + (lazy ? 'lazy' : 'eager') + '" decoding="async" alt="' + esc(alt) + '">';
    if (p.imagenOriginal) { h += '<img class="tj__alt" src="' + ASSETS + p.imagenOriginal + '-800.webp" width="800" height="800" loading="lazy" decoding="async" alt="" aria-hidden="true">'; }
    return h;
  }
  function tarjeta(p, idx, modo) {
    var num = 'N.º ' + pad2(idx + 1);
    var tieneFoto = !!p.imagen;
    var zoom = tieneFoto && !p.imagenOriginal ? ' tj__foto--zoom' : '';
    var sizes = modo === 'vit' ? '(min-width: 768px) 26vw, 72vw' : '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw';
    var cuerpo = '<div class="tj__foto' + zoom + '" data-arco-foto>' + (tieneFoto ? fotos(p, sizes, true) : placeholder(p)) + '</div>' +
      '<div class="tj__cuerpo">' +
      '<div class="tj__fila"><span class="numero">' + num + '</span><span class="numero">' + esc(precio(p)) + '</span></div>' +
      '<h3 class="card-title">' + esc(p.nombre) + '</h3>' +
      (p.personalizable ? '<span class="label tj__etq">Personalizable</span>' : '') +
      '<a class="consulta" href="' + esc(urlWhatsApp(mensajeProducto(p))) + '" target="_blank" rel="noopener" data-wa="producto" aria-label="Consultar: ' + esc(p.nombre) + ' por WhatsApp, se abre en una pestaña nueva">Consultar <span aria-hidden="true">→</span></a>' +
      '</div>';
    return '<li class="tj ' + (modo === 'vit' ? 'vit__item' : '') + '" data-id="' + esc(p.id) + '" data-categoria="' + esc(p.categoria) + '">' + cuerpo + '</li>';
  }

  /* ---------- Vitrina ---------- */
  var destacados = productos.map(function (p, i) { return { p: p, i: i }; }).filter(function (x) { return x.p.destacado && x.p.imagen; });
  function renderVitrina() {
    var fila = $('[data-vit-fila]');
    var riel = $('[data-vit-riel]');
    var cont = $('[data-vit-cont]');
    var fill = $('[data-vit-fill]');
    var sec = $('[data-vit]');
    if (!fila) { return; }
    fila.innerHTML = destacados.map(function (x) { return tarjeta(x.p, x.i, 'vit'); }).join('');
    var n = destacados.length;
    function pintar(prog) {
      prog = Math.max(0, Math.min(1, prog));
      var k = n > 1 ? Math.round(prog * (n - 1)) + 1 : 1;
      cont.textContent = pad2(k) + ' / ' + pad2(n);
      fill.style.transform = 'scaleX(' + Math.max(1 / n, prog).toFixed(4) + ')';
    }
    pintar(0);
    // Modo scroll-snap (sin JS de movimiento): el contador sigue el scroll horizontal
    riel.addEventListener('scroll', function () {
      if (sec.classList.contains('vit--fijada')) { return; }
      var max = riel.scrollWidth - riel.clientWidth;
      pintar(max > 0 ? riel.scrollLeft / max : 0);
    }, { passive: true });
    return { pintar: pintar, total: n };
  }

  /* ---------- Colección + pestañas con indicador ---------- */
  function renderColeccion() {
    var grid = $('[data-col-grid]');
    var cont = $('[data-tabs-in]');
    var contenedorTabs = $('[data-tabs]');
    var conteo = $('[data-col-conteo]');
    var vacio = $('[data-col-vacio]');
    if (!grid) { return; }
    grid.innerHTML = productos.map(function (p, i) { return tarjeta(p, i, 'cat'); }).join('');
    var lista = [{ id: 'todo', nombre: 'Todo' }].concat(categorias);
    cont.innerHTML = lista.map(function (c) {
      return '<button type="button" class="tab" data-tab="' + esc(c.id) + '" aria-pressed="' + (c.id === 'todo') + '">' + esc(c.nombre) + '</button>';
    }).join('') + '<span class="tabs__ind sin-anim" data-tab-ind aria-hidden="true"></span>';
    var ind = $('[data-tab-ind]', cont);
    var tarjetas = $$('.tj', grid);
    var actual = 'todo';

    function moverInd(animar) {
      var b = $('[aria-pressed="true"]', cont);
      if (!b) { return; }
      if (!animar) { ind.classList.add('sin-anim'); }
      ind.style.transform = 'translateX(' + b.offsetLeft + 'px) scaleX(' + b.offsetWidth + ')';
      if (!animar) { void ind.offsetWidth; ind.classList.remove('sin-anim'); }
      var izq = b.offsetLeft - (contenedorTabs.clientWidth - b.offsetWidth) / 2;
      contenedorTabs.scrollTo({ left: Math.max(0, izq), behavior: reducido ? 'auto' : 'smooth' });
    }
    function marcarArcos() {
      var cols = Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(' ').length);
      var vis = tarjetas.filter(function (t) { return !t.hidden; });
      // Catálogo siempre rectangular; el arco queda para Vitrina, video y Ocasiones (decisión del usuario)
      void cols; void vis;
    }
    function aplicar(id) {
      var n = 0;
      tarjetas.forEach(function (t) {
        var ok = id === 'todo' || t.getAttribute('data-categoria') === id;
        t.hidden = !ok;
        if (ok) { n++; }
      });
      conteo.textContent = n + (n === 1 ? ' pieza' : ' piezas');
      vacio.hidden = n !== 0;
      marcarArcos();
    }
    function filtrar(id) {
      if (id === actual) { return; }
      actual = id;
      $$('.tab', cont).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-tab') === id)); });
      moverInd(true);
      var g = window.Sol && window.Sol.filtroGancho;
      if (g) { g(id, function () { aplicar(id); }); } else { aplicar(id); }
    }
    cont.addEventListener('click', function (e) {
      var b = e.target.closest('.tab');
      if (b) { filtrar(b.getAttribute('data-tab')); }
    });
    aplicar('todo');
    moverInd(false);
    window.addEventListener('resize', function () { moverInd(false); marcarArcos(); });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { moverInd(false); }); }
  }

  /* ---------- Menú móvil ---------- */
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
      abierto = true; menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('menu-abierto');
      aislados.forEach(function (el) { if (el) { el.setAttribute('inert', ''); } });
      var primero = $('a', menu); if (primero) { primero.focus(); }
    }
    function cerrar(foco) {
      abierto = false; menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('menu-abierto');
      aislados.forEach(function (el) { if (el) { el.removeAttribute('inert'); } });
      if (foco) { btn.focus(); }
    }
    btn.addEventListener('click', function () { if (abierto) { cerrar(true); } else { abrir(); } });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { cerrar(false); }); });
    document.addEventListener('keydown', function (e) {
      if (!abierto) { return; }
      if (e.key === 'Escape') { e.preventDefault(); cerrar(true); return; }
      if (e.key !== 'Tab') { return; }
      var f = enfocables(); if (!f.length) { return; }
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches && abierto) { cerrar(false); } });
  }

  /* ---------- Acordeón ---------- */
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

  /* ---------- Ficha de pedido ---------- */
  function iniciarFicha() {
    var form = $('[data-pers]');
    if (!form) { return; }
    var sel = $('[data-pers-pieza]');
    var nombre = $('#pers-nombre');
    var vista = $('[data-pers-vista]');
    var btn = $('[data-pers-btn]');
    var pers = productos.filter(function (p) { return p.personalizable; });
    sel.innerHTML = '<option value="">Elige una pieza</option>' +
      pers.map(function (p) { return '<option value="' + esc(p.nombre) + '">' + esc(p.nombre) + '</option>'; }).join('') +
      '<option value="otra">Otra</option>';
    function compuesto() {
      var pieza = sel.value;
      var n = nombre.value.trim();
      var r = form.querySelector('input[name="color"]:checked');
      var color = r ? r.value : '';
      if (!pieza && !n && !color) { return '¡Hola Sol Design! Quiero hacer un pedido personalizado.'; }
      var que = pieza === 'otra' ? 'una pieza a medida' : (pieza || 'una pieza');
      var m = '¡Hola Sol Design! Quiero personalizar ' + que + '.';
      if (n) { m += ' Nombre: ' + n + '.'; }
      if (color) { m += ' Color: ' + color + '.'; }
      return m;
    }
    function actualizar() { var m = compuesto(); vista.textContent = m; btn.href = urlWhatsApp(m); }
    form.addEventListener('input', actualizar);
    form.addEventListener('change', actualizar);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    actualizar();
  }

  /* ---------- Video del hero ---------- */
  function iniciarVideo() {
    var video = $('[data-video]');
    var boton = $('[data-video-play]');
    if (!video || !boton) { return; }
    var cn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var ahorro = !!(cn && (cn.saveData || /(^|-)2g$/.test(cn.effectiveType || '')));
    var cargado = false;
    var pausadoPorUsuario = reducido || ahorro;
    function etiqueta(rep) {
      boton.setAttribute('data-estado', rep ? 'reproduciendo' : 'pausado');
      boton.setAttribute('aria-label', rep ? 'Pausar video' : 'Reproducir video');
    }
    function cargar() {
      if (cargado) { return; }
      cargado = true;
      [['../assets/video/hero.webm', 'video/webm'], ['../assets/video/hero.mp4', 'video/mp4']].forEach(function (s) {
        var el = document.createElement('source'); el.src = s[0]; el.type = s[1]; video.appendChild(el);
      });
      video.load();
    }
    function reproducir() {
      cargar();
      var p = video.play();
      if (p && p.catch) { p.catch(function () { etiqueta(false); }); }
    }
    video.addEventListener('playing', function () { etiqueta(true); });
    video.addEventListener('pause', function () { etiqueta(false); });
    boton.addEventListener('click', function () {
      if (video.paused) { pausadoPorUsuario = false; reproducir(); } else { pausadoPorUsuario = true; video.pause(); }
    });
    var visto = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        var dentro = es[0].isIntersecting;
        if (dentro) { if (!pausadoPorUsuario) { visto = true; reproducir(); } }
        else if (cargado) { video.pause(); }
      }, { threshold: 0.25 }).observe(video);
    }
    etiqueta(false);
  }

  var vit = renderVitrina();
  renderColeccion();
  iniciarMenu();
  iniciarFaq();
  iniciarFicha();
  iniciarVideo();
  window.Sol = { datos: D, vitrina: vit, reducido: reducido, urlWhatsApp: urlWhatsApp };
})();
