/* Sol Design, propuesta 3 "Jardín de chenille". Datos, render, menú, filtros, Arma tu ramo, personaliza, WhatsApp,
   video, prado y geometría del hilo. El movimiento vive en motion.js; aquí el hilo siempre queda dibujado completo. */
(function () {
  'use strict';

  var D = window.SOL_DATA;
  if (!D) { return; }
  var marca = D.marca;
  var productos = D.productos.filter(function (p) { return p.imagen && !p._imagenIA; });
  var categorias = D.categorias.filter(function (c) { return productos.some(function (p) { return p.categoria === c.id; }); });
  var ASSETS = '../';
  var raiz = document.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function urlWA(m) { return 'https://wa.me/' + marca.whatsapp + '?text=' + encodeURIComponent(m); }
  function precio(p) {
    if (p.precio === null || p.precio === undefined) { return 'Consultar'; }
    var n = Number(p.precio);
    return '$' + (n % 1 === 0 ? String(n) : n.toFixed(2));
  }
  var NUEVA = ', se abre en una pestaña nueva';
  var ALTS = {
    'maceta-rosa-roja': 'Macetita con una rosa roja de chenille en maceta azul con musgo',
    'maceta-margarita-lila': 'Macetita con una margarita lila de chenille y capullos celestes, en maceta oliva',
    'lapiceros-flor-perlas': 'Lapiceros forrados en chenille con flor y perlitas, en tarjeta de regalo',
    'gerbera-rosada-tarjeta': 'Gerbera rosada de chenille con hoja, sobre una tarjeta amarilla',
    'cuadro-lirio-rojo': 'Cuadro con un lirio rojo de chenille en canasta tejida y lucecitas',
    'mini-macetero-rosa-roja': 'Mini macetero con una rosa roja de chenille'
  };
  var COLORES = [
    { id: 'rojo', c: '#E8261C' }, { id: 'rosado', c: '#F2A7B5' }, { id: 'lila', c: '#B79BE8' },
    { id: 'turquesa', c: '#6ED3E0' }, { id: 'amarillo', c: '#F5D547' }, { id: 'azul', c: '#1F6FD1' }
  ];
  function muestras(cont, nombre) {
    cont.innerHTML = COLORES.map(function (c) {
      return '<label class="mu"><input type="radio" name="' + nombre + '" value="' + c.id + '"><i style="--m:' + c.c + '"></i><span class="solo-lectores">' + c.id.charAt(0).toUpperCase() + c.id.slice(1) + '</span></label>';
    }).join('');
    // Permite quitar el color volviendo a tocarlo
    cont.addEventListener('click', function (e) {
      var inp = e.target.closest('input'); if (!inp) { return; }
      if (inp.dataset.on === '1') { inp.checked = false; inp.dataset.on = ''; inp.dispatchEvent(new Event('change', { bubbles: true })); return; }
      $$('input', cont).forEach(function (i) { i.dataset.on = ''; });
      inp.dataset.on = '1';
    });
  }
  function colorElegido(cont) { var r = $('input:checked', cont); return r ? r.value : ''; }

  /* ---------- WhatsApp estático ---------- */
  $$('[data-wa="general"]').forEach(function (a) { a.href = urlWA(marca.mensajeGeneral); });
  $$('[data-wa="ocasion"]').forEach(function (a) {
    a.href = urlWA(a.getAttribute('data-mensaje'));
    a.setAttribute('aria-label', 'Lo quiero: ' + a.getAttribute('data-nombre') + ', por WhatsApp' + NUEVA);
  });
  $$('[data-anio]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- Colección ---------- */
  function tarjeta(p) {
    var alt = ALTS[p.id] || p.nombre;
    return '<li class="cell" data-categoria="' + esc(p.categoria) + '"><article class="tj" data-pop>' +
      '<div class="tj__foto"><img src="' + ASSETS + p.imagen + '.webp" srcset="' + ASSETS + p.imagen + '-800.webp 800w, ' + ASSETS + p.imagen + '.webp 1024w" sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw" width="1024" height="1024" loading="lazy" decoding="async" alt="' + esc(alt) + '">' +
      '<span class="precio"><span class="solo-lectores">Precio </span>' + esc(precio(p)) + '</span></div>' +
      '<div class="tj__cuerpo"><h3 class="card-title">' + esc(p.nombre) + '</h3>' +
      (p.personalizable ? '<span class="gusto"><svg aria-hidden="true" width="14" height="14"><use href="#i-estrella"/></svg>a tu gusto</span>' : '') +
      '<a class="btn btn--wa btn--chico" href="' + esc(urlWA(marca.mensajeBase.replace('{producto}', p.nombre))) + '" target="_blank" rel="noopener" data-wa="producto" aria-label="¡Lo quiero! ' + esc(p.nombre) + ', por WhatsApp' + NUEVA + '"><span>¡Lo quiero!</span></a>' +
      '</div></article></li>';
  }
  function iniciarColeccion() {
    var grid = $('[data-grid]'), chips = $('[data-chips]'), cuenta = $('[data-col-cuenta]'), vacio = $('[data-vacio]');
    if (!grid) { return; }
    grid.innerHTML = productos.map(tarjeta).join('');
    var lista = [{ id: 'todo', nombre: 'Todo' }].concat(categorias);
    chips.innerHTML = lista.map(function (c) { return '<button type="button" class="chip" data-chip="' + esc(c.id) + '" aria-pressed="' + (c.id === 'todo') + '">' + esc(c.nombre) + '</button>'; }).join('');
    var celdas = $$('.cell', grid);
    function aplicar(id) {
      var n = 0, vis = [];
      celdas.forEach(function (c) { var ok = id === 'todo' || c.getAttribute('data-categoria') === id; c.hidden = !ok; if (ok) { n++; vis.push(c); } });
      cuenta.textContent = n + (n === 1 ? ' pieza' : ' piezas');
      vacio.hidden = n !== 0;
      if (window.Sol && window.Sol.filtroGancho) { window.Sol.filtroGancho(vis); }
    }
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) { return; }
      $$('.chip', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      aplicar(b.getAttribute('data-chip'));
    });
    aplicar('todo');
  }

  /* ---------- Menú móvil ---------- */
  function iniciarMenu() {
    var btn = $('[data-menu-btn]'), menu = $('[data-menu]'), nav = $('[data-nav]');
    if (!btn || !menu) { return; }
    var aislados = [$('#contenido'), $('[data-footer]')];
    var abierto = false;
    function abrir() {
      abierto = true; menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('menu-abierto');
      aislados.forEach(function (el) { if (el) { el.setAttribute('inert', ''); } });
      var a = $('a', menu); if (a) { a.focus(); }
    }
    function cerrar(foco) {
      abierto = false; menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Abrir menú');
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
      var f = $$('a[href], button', nav).concat($$('a[href]', menu)).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) { return; }
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
    window.matchMedia('(min-width: 1180px)').addEventListener('change', function (m) { if (m.matches && abierto) { cerrar(false); } });
    var scroll = function () { nav.classList.toggle('nav--scroll', window.scrollY > 20); };
    window.addEventListener('scroll', scroll, { passive: true }); scroll();
  }

  /* ---------- Acordeón ---------- */
  function iniciarFaq() {
    $$('.faq__btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var abierto = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!abierto));
        b.closest('.faq__item').classList.toggle('abierto', !abierto);
      });
    });
  }

  /* ---------- Ocasiones: flechas ---------- */
  function iniciarOcasiones() {
    var riel = $('[data-oc-riel]'), ant = $('[data-oc-prev]'), sig = $('[data-oc-next]');
    if (!riel) { return; }
    function mover(d) { riel.scrollBy({ left: d * Math.min(riel.clientWidth * 0.8, 320), behavior: reducido ? 'auto' : 'smooth' }); }
    ant.addEventListener('click', function () { mover(-1); });
    sig.addEventListener('click', function () { mover(1); });
  }

  /* ---------- Arma tu ramo ---------- */
  var FLORES = [
    { id: 'rosa', n: 'rosa roja', pl: 'rosas rojas', img: 'assets/recortes/flor-rosa-roja', w: 600, h: 433 },
    { id: 'margarita', n: 'margarita', pl: 'margaritas', img: 'assets/recortes/flor-margarita', w: 582, h: 600 },
    { id: 'gerbera', n: 'gerbera', pl: 'gerberas', img: 'assets/recortes/flor-gerbera', w: 600, h: 579 }
  ];
  var SLOTS = [[100, 62], [60, 82], [140, 82], [78, 34], [122, 34], [32, 106], [168, 106]];
  function iniciarArma() {
    var cont = $('[data-arma-flores]'); if (!cont) { return; }
    var colCont = $('[data-arma-colores]'), tallos = $('[data-tallos]'), capa = $('[data-maceta-flores]'), maceta = $('[data-maceta]');
    var estado = $('[data-arma-estado]'), msg = $('[data-arma-msg]'), btn = $('[data-arma-btn]');
    var ramo = [];
    cont.innerHTML = FLORES.map(function (f) {
      return '<button type="button" class="fbtn" data-f="' + f.id + '" aria-label="Añadir ' + f.n + '"><img src="' + ASSETS + f.img + '.webp" alt="" width="' + f.w + '" height="' + f.h + '" loading="lazy"><small>Añadir</small><b>' + f.n + '</b></button>';
    }).join('');
    muestras(colCont, 'arma-color');
    function lista() {
      var partes = [];
      FLORES.forEach(function (f) {
        var n = ramo.filter(function (r) { return r.f === f; }).length;
        if (n) { partes.push(n + ' ' + (n === 1 ? f.n : f.pl)); }
      });
      return partes.length > 1 ? partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1] : partes[0] || '';
    }
    function mensaje() {
      var c = colorElegido(colCont), l = lista();
      if (!l) { return '¡Hola Sol Design! Quiero armar un ramo' + (c ? ' en tonos ' + c : '') + '. ¿Me ayudas a elegir las flores?'; }
      return '¡Hola Sol Design! Quiero un ramo con ' + l + (c ? ', en tonos ' + c : '') + '.';
    }
    function pintarTallos() {
      tallos.innerHTML = ramo.map(function (r) {
        var x = SLOTS[r.slot][0], y = SLOTS[r.slot][1];
        return '<path d="M' + x + ' ' + y + ' Q' + ((x + 100) / 2 + (x < 100 ? -8 : 8)) + ' ' + ((y + 130) / 2 + 8) + ' 100 134"/>';
      }).join('');
      tallos.setAttribute('class', 'tallos');
    }
    function actualizar() {
      var n = ramo.length, m = mensaje();
      msg.textContent = m; btn.href = urlWA(m);
      estado.textContent = n === 0 ? 'Tu ramo está vacío' : 'Tu ramo tiene ' + n + (n === 1 ? ' flor' : ' flores') + (n === SLOTS.length ? ', ya está lleno' : '');
      maceta.classList.toggle('maceta--llena', n > 0);
      $$('.fbtn', cont).forEach(function (b) { b.disabled = n >= SLOTS.length; });
      pintarTallos();
    }
    function anadir(f) {
      if (ramo.length >= SLOTS.length) { return; }
      var usados = ramo.map(function (r) { return r.slot; });
      var slot = 0; while (usados.indexOf(slot) !== -1) { slot++; }
      var rot = Math.round((Math.random() * 30 - 15) * 10) / 10;
      var el = document.createElement('div');
      el.className = 'mf'; el.style.left = (SLOTS[slot][0] / 2) + '%'; el.style.top = (SLOTS[slot][1] / 2) + '%';
      el.innerHTML = '<img src="' + ASSETS + f.img + '.webp" alt="" width="' + f.w + '" height="' + f.h + '">';
      el.style.transform = 'rotate(' + rot + 'deg)';
      capa.appendChild(el);
      ramo.push({ f: f, slot: slot, el: el, rot: rot });
      if (window.Sol && window.Sol.caida) { window.Sol.caida(el, rot); }
      actualizar();
    }
    function quitar() { var r = ramo.pop(); if (r) { r.el.remove(); } actualizar(); }
    cont.addEventListener('click', function (e) {
      var b = e.target.closest('.fbtn'); if (!b) { return; }
      anadir(FLORES.filter(function (f) { return f.id === b.getAttribute('data-f'); })[0]);
    });
    $('[data-arma-quitar]').addEventListener('click', quitar);
    $('[data-arma-reset]').addEventListener('click', function () { ramo.forEach(function (r) { r.el.remove(); }); ramo = []; $$('input', colCont).forEach(function (i) { i.checked = false; i.dataset.on = ''; }); actualizar(); });
    colCont.addEventListener('change', actualizar);
    actualizar();
  }

  /* ---------- Personaliza ---------- */
  function iniciarPers() {
    var form = $('[data-pers]'); if (!form) { return; }
    var sel = $('[data-pers-pieza]'), nombre = $('[data-pers-nombre]'), colCont = $('[data-pers-colores]');
    var msg = $('[data-pers-msg]'), btn = $('[data-pers-btn]'), tn = $('[data-corona-nombre] textPath'), cf = $$('[data-corona-flores] circle');
    muestras(colCont, 'pers-color');
    var pers = productos.filter(function (p) { return p.personalizable; });
    sel.innerHTML = '<option value="">Elige una pieza</option>' + pers.map(function (p) { return '<option value="' + esc(p.nombre) + '">' + esc(p.nombre) + '</option>'; }).join('') +
      '<option value="un ramo">Un ramo</option><option value="una corona">Una corona</option><option value="otra">Otra pieza</option>';
    function actualizar() {
      var pieza = sel.value, n = nombre.value.trim(), c = colorElegido(colCont), m;
      if (!pieza && !n && !c) { m = '¡Hola Sol Design! Quiero hacer un pedido personalizado.'; }
      else {
        m = '¡Hola Sol Design! Quiero personalizar ' + (pieza === 'otra' ? 'una pieza a medida' : (pieza || 'una pieza')) + '.';
        if (n) { m += ' Nombre: ' + n + '.'; }
        if (c) { m += ' Color: ' + c + '.'; }
      }
      msg.textContent = m; btn.href = urlWA(m);
      tn.textContent = n || 'Tu nombre'; tn.parentNode.style.fontSize = Math.max(15, Math.min(30, 330 / Math.max(8, (n || 'Tu nombre').length))) + 'px';
      var col = COLORES.filter(function (x) { return x.id === c; })[0];
      cf.forEach(function (x) { x.setAttribute('fill', col ? col.c : '#F2A7B5'); });
    }
    form.addEventListener('input', actualizar); form.addEventListener('change', actualizar);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    actualizar();
  }

  /* ---------- Video polaroid ---------- */
  function iniciarVideo() {
    var video = $('[data-video]'), boton = $('[data-video-play]');
    if (!video || !boton) { return; }
    var cn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var ahorro = !!(cn && (cn.saveData || /(^|-)2g$/.test(cn.effectiveType || '')));
    var cargado = false, pausadoUsuario = reducido || ahorro;
    function etiqueta(rep) { boton.setAttribute('data-estado', rep ? 'reproduciendo' : 'pausado'); boton.setAttribute('aria-label', rep ? 'Pausar video' : 'Reproducir video'); }
    function cargar() {
      if (cargado) { return; } cargado = true;
      [['../assets/video/hero.webm', 'video/webm'], ['../assets/video/hero.mp4', 'video/mp4']].forEach(function (s) {
        var el = document.createElement('source'); el.src = s[0]; el.type = s[1]; video.appendChild(el);
      });
      video.load();
    }
    function reproducir() { cargar(); var p = video.play(); if (p && p.catch) { p.catch(function () { etiqueta(false); }); } }
    video.addEventListener('playing', function () { etiqueta(true); });
    video.addEventListener('pause', function () { etiqueta(false); });
    boton.addEventListener('click', function () { if (video.paused) { pausadoUsuario = false; reproducir(); } else { pausadoUsuario = true; video.pause(); } });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { if (!pausadoUsuario) { reproducir(); } } else if (cargado) { video.pause(); }
      }, { threshold: 0.3 }).observe(video);
    }
    etiqueta(false);
  }

  /* ---------- Prado del footer ---------- */
  var PAL = ['#F2A7B5', '#F5D547', '#6ED3E0', '#B79BE8', '#E5733A', '#FFFFFF', '#E8318A'];
  function azar(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function construirPrado() {
    var svg = $('[data-prado]'); if (!svg) { return; }
    var W = raiz.clientWidth, paso = W < 768 ? 62 : 96, n = Math.ceil(W / paso) + 1, base = 150, h = '';
    svg.setAttribute('viewBox', '0 0 ' + W + ' 150'); svg.removeAttribute('preserveAspectRatio');
    for (var i = 0; i < n; i++) {
      var x = Math.round(i * paso + (azar(i) - 0.3) * 30), alto = 52 + azar(i + 9) * 62, r = 10 + azar(i + 4) * 7, col = PAL[i % PAL.length];
      var hy = base - alto, cur = (azar(i + 2) - 0.5) * 24;
      h += '<g class="pf" data-x="' + x + '"><path d="M' + x + ' ' + (base + 20) + ' Q' + (x + cur) + ' ' + (base - alto / 2) + ' ' + x + ' ' + hy + '" fill="none" stroke="#1E5A38" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M' + x + ' ' + (base - alto * 0.35) + ' q' + (i % 2 ? 22 : -22) + ' -4 ' + (i % 2 ? 26 : -26) + ' -20 q' + (i % 2 ? -22 : 22) + ' 2 ' + (i % 2 ? -26 : 26) + ' 20Z" fill="#8FD3A4" stroke="#1E5A38" stroke-width="2"/>' +
        '<g fill="' + col + '" stroke="#3A2318" stroke-width="2.5">';
      for (var k = 0; k < 5; k++) { var a = -Math.PI / 2 + k * 2 * Math.PI / 5; h += '<circle cx="' + (x + Math.cos(a) * r * 1.05).toFixed(1) + '" cy="' + (hy + Math.sin(a) * r * 1.05).toFixed(1) + '" r="' + (r * 0.72).toFixed(1) + '"/>'; }
      h += '</g><circle cx="' + x + '" cy="' + hy + '" r="' + (r * 0.5).toFixed(1) + '" fill="' + (col === '#F5D547' ? '#E5733A' : '#F5D547') + '" stroke="#3A2318" stroke-width="2"/></g>';
    }
    svg.innerHTML = h;
    document.dispatchEvent(new CustomEvent('solprado'));
  }

  /* ---------- El hilo: geometría ---------- */
  var SOL = [96, 44, [86, 20, 36, 22, 36, 54], [36, 82, 96, 80, 94, 114], [92, 148, 40, 152, 26, 128], [20, 146, 40, 172, 74, 166],
    [104, 162, 116, 140, 120, 122], [124, 104, 160, 102, 164, 126], [168, 152, 134, 168, 118, 150], [106, 138, 116, 118, 140, 116],
    [158, 114, 174, 100, 180, 78], [184, 64, 188, 52, 196, 40], [206, 10, 240, 12, 234, 48], [228, 84, 214, 124, 216, 150],
    [218, 170, 246, 168, 262, 146], [280, 128, 284, 178, 246, 186], [170, 196, 80, 194, 10, 188]];
  var H = { svg: $('[data-hilo]'), L: 0, Ls: 0, ys: [], paso: 8, len: 0, motion: false };
  function f1(n) { return Math.round(n * 10) / 10; }
  function pageBox(el) { var r = el.getBoundingClientRect(); return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height }; }
  function suave(pts, segs) {
    var d = '';
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      segs.push([p1, c1, c2, p2]);
      d += ' C' + f1(c1[0]) + ' ' + f1(c1[1]) + ' ' + f1(c2[0]) + ' ' + f1(c2[1]) + ' ' + f1(p2[0]) + ' ' + f1(p2[1]);
    }
    return d;
  }
  // Muestras (longitud, y) calculadas sobre las curvas en JS: getPointAtLength costaba ~1,7 ms por llamada
  // en un path de 18 000 px y bloqueaba la página varios segundos.
  function muestrear(segs) {
    var out = [[0, segs.length ? segs[0][0][1] : 0]], acc = 0, N = 16;
    segs.forEach(function (s) {
      var px = s[0][0], py = s[0][1];
      for (var k = 1; k <= N; k++) {
        var t = k / N, u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
        var x = a * s[0][0] + b * s[1][0] + c * s[2][0] + e * s[3][0], y = a * s[0][1] + b * s[1][1] + c * s[2][1] + e * s[3][1];
        acc += Math.sqrt((x - px) * (x - px) + (y - py) * (y - py)); px = x; py = y; out.push([acc, y]);
      }
    });
    return out;
  }
  function patron(periodo) { var g = (periodo - 0.1).toFixed(1); return { u: '0.1 ' + g + ' ', n: ('0.1 ' + g + ' ').length, g: g }; }

  function construirHilo() {
    var svg = H.svg, sol = $('[data-sol]'); if (!svg || !sol) { return; }
    var W = raiz.clientWidth, alto = Math.max(document.body.scrollHeight, raiz.scrollHeight);
    var ancho = W >= 768, pad = ancho ? 40 : 16;
    var contentLeft = (W - Math.min(W, 1320 + pad * 2)) / 2 + pad;
    var carrilI = Math.max(7, contentLeft / 2), carrilD = W - carrilI;
    var hw = ancho ? 12 : 7, amp = ancho ? 7 : 2.5, paso = ancho ? 150 : 120;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + alto); svg.setAttribute('width', W); svg.setAttribute('height', alto); svg.style.height = alto + 'px';

    // Tramo 1: "Sol" escrito en la caja del hero
    var b = pageBox(sol), s = b.w / 320;
    function T(x, y) { return f1(b.x + x * s) + ' ' + f1(b.y + y * s); }
    function P(x, y) { return [b.x + x * s, b.y + y * s]; }
    var segs = [], prev = P(SOL[0], SOL[1]);
    var dSol = 'M' + T(SOL[0], SOL[1]);
    for (var i = 2; i < SOL.length; i++) {
      var c = SOL[i]; dSol += ' C' + T(c[0], c[1]) + ' ' + T(c[2], c[3]) + ' ' + T(c[4], c[5]);
      var fin3 = P(c[4], c[5]); segs.push([prev, P(c[0], c[1]), P(c[2], c[3]), fin3]); prev = fin3;
    }
    var nSol = segs.length;
    var fin = SOL[SOL.length - 1], fx = b.x + fin[4] * s, fy = b.y + fin[5] * s;

    // Tramo 2: baja por el carril izquierdo y serpentea entre secciones
    var pts = [[fx, fy]], x = carrilI, y = fy;
    var dx = fx - carrilI;
    [0.35, 0.7].forEach(function (t) { pts.push([fx - dx * t * 0.9, fy + 30 + 110 * t]); });
    pts.push([carrilI + 6, fy + 150]);
    function bajar(y1, a, st) {
      var k = 0; y = Math.max(y, pts[pts.length - 1][1]);
      while (y + st < y1 - 20) { y += st; k++; pts.push([x + (k % 2 ? a : -a), y]); }
    }
    function cruzar(haciaX, y0, h) {
      var m = (x + haciaX) / 2;
      pts.push([x, y0], [m, y0 + h / 2], [haciaX, y0 + h]); x = haciaX; y = y0 + h;
    }
    function sec(sel) { var e = $(sel); return e ? { e: e, b: pageBox(e), pt: parseFloat(getComputedStyle(e).paddingTop) || 80 } : null; }
    var q = sec('#quienes'), col = sec('#coleccion'), ar = sec('#arma'), co = sec('#como-se-hace'), oc = sec('#ocasiones'), pe = sec('#personaliza'), fq = sec('#preguntas'), ft = sec('[data-footer]');

    if (q) { x = carrilI; bajar(q.b.y + q.b.h, amp, paso); }
    if (col) {
      var tit = $('[data-ancla="titulo"]', col.e), loopeado = false;
      if (ancho && tit) {
        var rg = document.createRange(); rg.selectNodeContents(tit);
        var rr = rg.getBoundingClientRect(), tb = pageBox(tit);
        var tx = rr.right + window.scrollX, ty = tb.y + tb.h / 2, r = 34, cx = tx + 70 + r;
        bajar(col.b.y - 10, amp, paso);
        pts.push([x, col.b.y + 6], [cx * 0.5, col.b.y + col.pt * 0.35], [cx - 90, ty - 60], [cx - 30, ty - r - 12]);
        for (var k = 0; k <= 10; k++) { var an = -Math.PI / 2 - 0.35 + k * 2 * Math.PI / 10 + 0.35; pts.push([cx + Math.cos(an) * r, ty + Math.sin(an) * r]); }
        pts.push([cx + r + 70, ty - 6], [carrilD - 60, ty + 70], [carrilD, ty + 150]);
        x = carrilD; y = ty + 150; loopeado = true;
      }
      if (!loopeado) { bajar(col.b.y - 10, amp, paso); cruzar(carrilD, col.b.y + 8, Math.min(col.pt - 16, 110)); }
      bajar(col.b.y + col.b.h, amp, paso);
    }
    if (ar) { bajar(ar.b.y - 10, amp, paso); cruzar(carrilI, ar.b.y + 8, Math.min(ar.pt - 16, 110)); bajar(ar.b.y + ar.b.h, amp * (ancho ? 1.8 : 1.4), ancho ? 90 : 70); }
    if (co) {
      bajar(co.b.y - 10, amp, paso); cruzar(carrilI, co.b.y + 8, Math.min(co.pt - 16, 110));
      var ps = $$('.paso', co.e).map(pageBox);
      if (ancho && ps.length === 3) {
        bajar(ps[0].y - 20, amp, paso); pts.push([carrilI, ps[0].y - 10]);
        pts.push([ps[0].x + ps[0].w * 0.5, ps[0].y + 70], [ps[1].x + ps[1].w * 0.5, ps[1].y + ps[1].h * 0.5], [ps[2].x + ps[2].w * 0.5, ps[2].y + ps[2].h - 50], [ps[2].x + ps[2].w * 0.5 + 30, ps[2].y + ps[2].h + 30]);
        x = ps[2].x + ps[2].w * 0.5 + 30; y = ps[2].y + ps[2].h + 30;
      } else { bajar(co.b.y + co.b.h, amp, paso); }
    }
    if (oc) { var yo = oc.b.y + 8; if (y > yo) { yo = y + 4; } cruzar(carrilD, yo, Math.min(oc.pt - 16, 110)); bajar(oc.b.y + oc.b.h, amp, paso); }
    if (pe) { bajar(pe.b.y - 10, amp, paso); cruzar(carrilI, pe.b.y + 8, Math.min(pe.pt - 16, 110)); bajar(pe.b.y + pe.b.h, amp, paso); }
    if (fq) { bajar(fq.b.y - 10, amp, paso); cruzar(carrilD, fq.b.y + 8, Math.min(fq.pt - 16, 110)); bajar(fq.b.y + fq.b.h - 40, amp, paso); }

    // Tramo 3: llega al footer y se dobla en una flor
    var fl = $('[data-flor]'), radioC = 0, cxF = 0, cyF = 0;
    if (ft && fl) {
      var fb = pageBox(fl); cxF = fb.x + fb.w / 2; cyF = fb.y + fb.h / 2;
      var R = fb.w * 0.47, N = 7;
      cruzar(carrilI, ft.b.y - 30, 110);
      bajar(cyF - 90, amp, paso);
      pts.push([carrilI + (cxF - carrilI) * 0.35, cyF - 36], [cxF - R * 0.5, cyF - 4], [cxF, cyF]);
      for (var n = 0; n < N; n++) {
        var a = -Math.PI / 2 + n * 2 * Math.PI / N, ex = 0.4;
        pts.push([cxF + Math.cos(a - ex) * R * 0.62, cyF + Math.sin(a - ex) * R * 0.62], [cxF + Math.cos(a) * R, cyF + Math.sin(a) * R], [cxF + Math.cos(a + ex) * R * 0.62, cyF + Math.sin(a + ex) * R * 0.62], [cxF, cyF]);
      }
      radioC = R * 0.2;
    }
    var d = dSol + suave(pts, segs);
    var mu = muestrear(segs);

    // Capas: borde de felpa (puntos grandes), núcleo sólido y brillos
    [H.b = $('[data-hilo-b]'), H.a = $('[data-hilo-a]'), H.l = $('[data-hilo-l]')].forEach(function (p) { p.setAttribute('d', d); });
    H.L = H.a.getTotalLength();
    var escL = H.L / Math.max(1, mu[mu.length - 1][0]); // ajusta la longitud aproximada a la real del navegador
    H.Ls = mu[nSol * 16][0] * escL;
    H.b.style.strokeWidth = (hw + 5) + 'px'; H.a.style.strokeWidth = hw + 'px'; H.l.style.strokeWidth = Math.max(2.5, hw * 0.33) + 'px';
    H.pb = patron(hw * 0.62); H.pl = patron(hw * 1.9);
    var nb = Math.ceil(H.L / (hw * 0.62)) + 3, nl = Math.ceil(H.L / (hw * 1.9)) + 3;
    H.sb = new Array(nb + 1).join(H.pb.u); H.sl = new Array(nl + 1).join(H.pl.u);
    H.perB = hw * 0.62; H.perL = hw * 1.9;
    var c = $('[data-hilo-c]'); c.setAttribute('cx', f1(cxF)); c.setAttribute('cy', f1(cyF)); H.cr = radioC; H.tieneFlor = !!radioC;
    // Muestras de la coordenada Y (máximo acumulado) para ligar el dibujo al scroll
    H.ys = []; var mx = 0, m = Math.ceil(H.L / H.paso), q2 = 0;
    for (var j = 0; j <= m; j++) {
      var objetivo = Math.min(H.L, j * H.paso) / escL;
      while (q2 < mu.length - 2 && mu[q2 + 1][0] < objetivo) { q2++; }
      var m0 = mu[q2], m1 = mu[Math.min(q2 + 1, mu.length - 1)], tt = (objetivo - m0[0]) / Math.max(0.001, m1[0] - m0[0]);
      var py = m0[1] + (m1[1] - m0[1]) * Math.max(0, Math.min(1, tt));
      mx = Math.max(mx, py); H.ys.push(mx);
    }
    var motion = raiz.classList.contains('motion');
    var prog = H.progOld && motion ? H.progOld : 0;
    c.setAttribute('r', motion ? 0 : H.cr);
    pintar(motion ? prog * H.L : H.L);
    document.dispatchEvent(new CustomEvent('solhilo'));
  }
  function lenParaY(y) {
    var ys = H.ys, lo = 0, hi = ys.length - 1;
    if (y <= ys[0]) { return 0; } if (y >= ys[hi]) { return H.L; }
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (ys[mid] < y) { lo = mid; } else { hi = mid; } }
    var t = (y - ys[lo]) / Math.max(0.001, ys[hi] - ys[lo]);
    return Math.min(H.L, (lo + t) * H.paso);
  }
  function pintar(len) {
    if (!H.a) { return; }
    var L = H.L; H.len = Math.max(0, Math.min(L, len)); H.progOld = H.len / L;
    var vis = H.len > 0.5 ? 1 : 0;
    H.a.style.opacity = H.b.style.opacity = H.l.style.opacity = vis;
    if (!vis) { return; }
    if (H.len >= L - 0.5) {
      H.a.style.strokeDasharray = 'none'; H.a.style.strokeDashoffset = 0;
      H.b.style.strokeDasharray = '0.1 ' + H.pb.g; H.l.style.strokeDasharray = '0.1 ' + H.pl.g;
    } else {
      H.a.style.strokeDasharray = L + ' ' + L; H.a.style.strokeDashoffset = L - H.len;
      var kb = Math.floor(H.len / H.perB) + 1, kl = Math.floor(H.len / H.perL) + 1;
      H.b.style.strokeDasharray = H.sb.slice(0, kb * H.pb.n) + '0 ' + (L * 2);
      H.l.style.strokeDasharray = H.sl.slice(0, kl * H.pl.n) + '0 ' + (L * 2);
    }
  }
  H.pintar = pintar; H.lenParaY = lenParaY;

  var pendiente = 0;
  function programarHilo() { if (pendiente) { return; } pendiente = requestAnimationFrame(function () { pendiente = 0; construirHilo(); }); }
  function iniciarHilo() {
    if (!H.svg) { return; }
    construirHilo();
    var ultimoW = raiz.clientWidth, ultimoH = document.body.scrollHeight;
    if ('ResizeObserver' in window) {
      new ResizeObserver(function () { var w = raiz.clientWidth, h = document.body.scrollHeight; if (w !== ultimoW || Math.abs(h - ultimoH) > 2) { ultimoW = w; ultimoH = h; programarHilo(); } }).observe(document.body);
    }
    window.addEventListener('load', programarHilo);
    window.addEventListener('resize', function () { programarHilo(); construirPrado(); });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(programarHilo); }
    // Si la clase motion desaparece (CDN caído), el hilo queda completo
    new MutationObserver(function () {
      if (!raiz.classList.contains('motion')) { $('[data-hilo-c]').setAttribute('r', H.cr || 0); pintar(H.L); }
    }).observe(raiz, { attributes: true, attributeFilter: ['class'] });
  }

  window.Sol = { datos: D, reducido: reducido, urlWhatsApp: urlWA, hilo: H, caida: null, filtroGancho: null };
  iniciarColeccion(); iniciarMenu(); iniciarFaq(); iniciarOcasiones(); iniciarArma(); iniciarPers(); iniciarVideo(); construirPrado();
  iniciarHilo();
})();
