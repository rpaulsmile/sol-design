/* Sol Design, propuesta 2 "Vitrina". Movimiento lento y preciso: GSAP 3.12.5 + ScrollTrigger.
   Solo transform, opacity y clip-path. Con reduced-motion o sin GSAP no se crea nada y la página queda
   en su estado final (la clase .motion de <html> desaparece). */
(function () {
  'use strict';

  var raiz = document.documentElement;
  if (!window.gsap || !window.ScrollTrigger) { raiz.classList.remove('motion'); return; }
  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  var Sol = window.Sol || {};
  var NAV = 64;
  var EASE = 'expo.out';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function limitar(v, a, b) { return Math.max(a, Math.min(b, v)); }

  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    raiz.classList.add('motion');
    var limpiezas = [];
    function alLimpiar(fn) { limpiezas.push(fn); }
    function escuchar(el, tipo, fn, opts) { el.addEventListener(tipo, fn, opts); alLimpiar(function () { el.removeEventListener(tipo, fn, opts); }); }

    /* ---------- Titulares por líneas: el texto real queda accesible, los trozos visuales van aria-hidden ---------- */
    var divididos = [];
    function dividir(el) {
      if (el._orig === undefined) { el._orig = el.innerHTML; } else { el.innerHTML = el._orig; }
      var etiqueta = el.textContent.replace(/\s+/g, ' ').trim();
      var palabras = [];
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType !== 1 && n.nodeType !== 3) { return; }
        n.textContent.split(/\s+/).filter(Boolean).forEach(function (w) { palabras.push({ t: w, wrap: n.nodeType === 1 ? n : null }); });
      });
      // 1) palabras sueltas para medir las líneas reales
      el.textContent = '';
      var spans = [], envoltorio = null, destino = el, ultimo = null;
      palabras.forEach(function (w, i) {
        if (w.wrap !== ultimo) { ultimo = w.wrap; destino = w.wrap ? el.appendChild(w.wrap.cloneNode(false)) : el; }
        if (i > 0) { destino.appendChild(document.createTextNode(' ')); }
        var s = document.createElement('span'); s.textContent = w.t; destino.appendChild(s); spans.push(s);
      });
      var lineas = [], topAnt = null, actual = null;
      spans.forEach(function (s, i) {
        var t = Math.round(s.getBoundingClientRect().top + window.scrollY);
        if (topAnt === null || Math.abs(t - topAnt) > 4) { actual = []; lineas.push(actual); topAnt = t; }
        actual.push(palabras[i]);
      });
      // 2) una caja por línea (cada <em> se clona en la línea donde cae)
      el.textContent = '';
      var s0 = document.createElement('span'); s0.className = 'solo-lectores'; s0.textContent = etiqueta; el.appendChild(s0);
      lineas.forEach(function (ws) {
        var lin = document.createElement('span'); lin.className = 'lin'; lin.setAttribute('aria-hidden', 'true');
        var dst = lin, ult = null;
        ws.forEach(function (w, i) {
          if (w.wrap !== ult) {
            if (i > 0) { lin.appendChild(document.createTextNode(' ')); }
            ult = w.wrap; dst = w.wrap ? lin.appendChild(w.wrap.cloneNode(false)) : lin;
          } else if (i > 0) { dst.appendChild(document.createTextNode(' ')); }
          dst.appendChild(document.createTextNode(w.t));
        });
        el.appendChild(lin);
      });
      return $$('.lin', el);
    }
    function ocultarLineas(l) { gsap.set(l, { clipPath: 'inset(0 0 100% 0)', y: 20 }); }
    function revelarLineas(l) {
      return gsap.to(l, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.2, ease: EASE, stagger: 0.1, clearProps: 'clipPath,transform' });
    }
    function registrar(el, entrada) {
      var s = { el: el, hecho: false, entrada: entrada };
      divididos.push(s);
      ocultarLineas(dividir(el));
      return s;
    }
    function redividir() {
      divididos.forEach(function (s) {
        var l = dividir(s.el);
        if (!s.hecho) { ocultarLineas(l); if (s.entrada) { s.entrada(l); } }
      });
    }
    alLimpiar(function () {
      divididos.forEach(function (s) { if (s.el._orig !== undefined) { s.el.innerHTML = s.el._orig; delete s.el._orig; } });
    });

    /* ---------- Hero "Floración": secuencia de 75 cuadros en canvas, ligada al scroll ---------- */
    var hero = $('[data-hero]');
    var lienzo = hero && $('[data-hero-canvas]', hero);
    if (hero && lienzo) {
      var texto = $('[data-hero-texto]', hero);
      var h1 = $('h1', hero);
      var etq = $('.label', texto);
      var fin = $('[data-hero-fin]', hero);
      var centro = $('[data-hero-centro]', hero);
      var fotos3 = $$('img', centro);
      var desliza = $('[data-hero-desliza]', hero);
      var escena = $('[data-hero-escena]', hero);
      var aro = $('[data-hero-aro]', hero);
      var sh = registrar(h1, function (l) { sh.hecho = true; revelarLineas(l).delay(0.2); });

      /* Precarga progresiva: primero el poster (cuadro 0), luego el resto en orden. Movil: juego de 600px. */
      var TOTAL = 75;
      var carpeta = 'img/floracion/' + (window.innerWidth < 768 ? 'm/' : '');
      var cuadros = new Array(TOTAL);
      var siguiente = 1, cancelado = false;
      var estado = { f: 0 };
      var dibujado = -1, sucio = true, raf = 0;
      var ctx = lienzo.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);

      function nombre(i) { return carpeta + 'f-' + (i < 10 ? '00' : i < 100 ? '0' : '') + i + '.webp'; }
      function pedirFrame() { if (!raf) { raf = requestAnimationFrame(dibujar); } }
      function pedir(i, alTerminar) {
        var im = new Image();
        im.decoding = 'async';
        im.onload = function () { cuadros[i] = im; sucio = true; pedirFrame(); if (alTerminar) { alTerminar(); } };
        im.onerror = function () { if (alTerminar) { alTerminar(); } };
        im.src = nombre(i);
      }
      function lote() {
        if (cancelado || siguiente >= TOTAL) { return; }
        pedir(siguiente++, lote);
      }
      pedir(0, function () { for (var k = 0; k < 4; k++) { lote(); } });

      function medir() {
        var w = Math.max(1, Math.round(escena.clientWidth * dpr));
        var h = Math.max(1, Math.round(escena.clientHeight * dpr));
        if (lienzo.width !== w || lienzo.height !== h) { lienzo.width = w; lienzo.height = h; }
        sucio = true;
      }
      function dibujar() {
        raf = 0;
        var idx = limitar(Math.round(estado.f), 0, TOTAL - 1);
        while (idx > 0 && !cuadros[idx]) { idx--; }   /* el cuadro cargado mas cercano hacia atras */
        var im = cuadros[idx];
        if (!im) { return; }
        if (!sucio && idx === dibujado) { return; }
        sucio = false; dibujado = idx;
        var cw = lienzo.width, ch = lienzo.height;
        var k = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
        var dw = im.naturalWidth * k, dh = im.naturalHeight * k;
        ctx.fillStyle = '#F7F4EE';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(im, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }
      medir();
      escuchar(window, 'resize', function () { medir(); pedirFrame(); });
      alLimpiar(function () { cancelado = true; if (raf) { cancelAnimationFrame(raf); raf = 0; } });

      gsap.set(fotos3.slice(1), { opacity: 0 });
      gsap.set(fin, { y: 24, opacity: 0 });
      gsap.set(etq, { y: 12, opacity: 0 });
      raiz.classList.add('motion-listo');
      alLimpiar(function () { raiz.classList.remove('motion-listo'); });
      gsap.to(etq, { y: 0, opacity: 1, duration: 1, ease: EASE, delay: 0.1 });
      sh.entrada($$('.lin', h1));
      gsap.set(texto, { opacity: 1 });

      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: hero, start: 'top ' + NAV + 'px', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true }
      });
      /* progreso 0 a 0.75: cuadros 0 a 74 */
      tl.to(estado, { f: TOTAL - 1, duration: 0.75, onUpdate: pedirFrame }, 0);
      /* titular: se desvanece hacia arriba entre 0 y 25 % */
      tl.to(texto, { y: function () { return -escena.clientHeight * 0.12; }, opacity: 0, duration: 0.25 }, 0);
      /* indicador: se oculta tras el 10 % */
      tl.to(desliza, { opacity: 0, duration: 0.03 }, 0.1);
      /* 75 a 100 %: ventana redonda con fotos que se cruzan, luego bajada y boton */
      tl.fromTo(centro, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(50% at 50% 50%)', duration: 0.12 }, 0.75);
      tl.fromTo(aro, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.12 }, 0.75);
      tl.fromTo(fotos3[1], { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.85);
      tl.fromTo(fotos3[2], { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.93);
      tl.to(fin, { y: 0, opacity: 1, duration: 0.12 }, 0.86);
      tl.set({}, {}, 1);
      Sol.floracion = tl;
    }

    /* ---------- Patrones genéricos ---------- */
    $$('[data-anim="lines"]').forEach(function (el) {
      if (el.closest('[data-hero]')) { return; }
      var s = registrar(el);
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: function () { s.hecho = true; revelarLineas($$('.lin', el)); }
      });
    });
    var bloques = $$('[data-anim="block"]').filter(function (e) { return !e.closest('[data-hero]'); });
    gsap.set(bloques, { y: 12, opacity: 0 });
    ScrollTrigger.batch(bloques, {
      start: 'top 90%', once: true, interval: 0.1,
      onEnter: function (b) { gsap.to(b, { y: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.06, overwrite: true, clearProps: 'transform,opacity' }); }
    });

    var arcoVid = $('[data-arco-video]');
    if (arcoVid) {
      var vv = $('.vid__v', arcoVid);
      gsap.set(arcoVid, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(vv, { scale: 1.12 });
      ScrollTrigger.create({
        trigger: arcoVid, start: 'top 85%', once: true,
        onEnter: function () {
          gsap.to(arcoVid, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: EASE, clearProps: 'clipPath' });
          gsap.to(vv, { scale: 1, duration: 1.6, ease: EASE });
        }
      });
    }

    /* ---------- Vitrina: galería horizontal fijada ---------- */
    var secV = $('[data-vit]');
    var riel = $('[data-vit-riel]');
    var fila = $('[data-vit-fila]');
    if (secV && riel && fila && fila.children.length > 1) {
      var tabindex = riel.getAttribute('tabindex');
      secV.classList.add('vit--fijada');
      riel.removeAttribute('tabindex');
      riel.scrollLeft = 0;
      var dist = function () { return Math.max(0, fila.scrollWidth - riel.clientWidth); };
      var fotos = $$('.tj__foto', fila);
      gsap.set(fotos, { clipPath: 'inset(100% 0% 0% 0%)' });
      var imgs = fotos.map(function (f) { return $('.tj__img', f); }).filter(Boolean);
      gsap.set(imgs, { scale: 1.12 });
      ScrollTrigger.create({
        trigger: secV, start: 'top 80%', once: true,
        onEnter: function () {
          gsap.to(fotos, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: EASE, stagger: 0.1, clearProps: 'clipPath' });
          gsap.to(imgs, { scale: 1, duration: 1.6, ease: EASE, stagger: 0.1 });
        }
      });
      var stV = ScrollTrigger.create({
        trigger: secV, start: 'top ' + NAV + 'px', end: function () { return '+=' + dist(); },
        pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
        animation: gsap.fromTo(fila, { x: 0 }, { x: function () { return -dist(); }, ease: 'none' }),
        onUpdate: function (self) { if (Sol.vitrina) { Sol.vitrina.pintar(self.progress); } }
      });
      // Foco por teclado: lleva el scroll de la página hasta la pieza enfocada
      escuchar(fila, 'focusin', function (e) {
        var item = e.target.closest('.vit__item');
        if (!item) { return; }
        riel.scrollLeft = 0;
        var d = dist();
        var p = d > 0 ? limitar(item.offsetLeft / d, 0, 1) : 0;
        window.scrollTo({ top: stV.start + p * (stV.end - stV.start), behavior: 'auto' });
      });
      alLimpiar(function () {
        secV.classList.remove('vit--fijada');
        if (tabindex !== null) { riel.setAttribute('tabindex', tabindex); }
        if (Sol.vitrina) { Sol.vitrina.pintar(0); }
      });
    }

    /* ---------- Colección ---------- */
    var grid = $('[data-col-grid]');
    if (grid) {
      var tarjetas = $$('.tj', grid);
      gsap.set(tarjetas, { y: 12, opacity: 0 });
      ScrollTrigger.batch(tarjetas, {
        start: 'top 92%', once: true, interval: 0.1,
        onEnter: function (b) { gsap.to(b, { y: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.06, overwrite: true, clearProps: 'transform,opacity' }); }
      });
      Sol.filtroGancho = function (id, aplicar) {
        var visibles = tarjetas.filter(function (c) { return !c.hidden; });
        if (!visibles.length) { aplicar(); return; }
        gsap.to(visibles, {
          opacity: 0, duration: 0.2, ease: 'power1.out', overwrite: true,
          onComplete: function () {
            aplicar();
            var nuevas = tarjetas.filter(function (c) { return !c.hidden; });
            gsap.fromTo(nuevas, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.04, overwrite: true, clearProps: 'transform,opacity' });
            gsap.delayedCall(0.05, function () { ScrollTrigger.refresh(); });
          }
        });
      };
      alLimpiar(function () { Sol.filtroGancho = null; gsap.set(tarjetas, { clearProps: 'all' }); });
    }

    /* ---------- Re-medir ---------- */
    var anchoAnt = window.innerWidth, tResize = 0;
    escuchar(window, 'resize', function () {
      clearTimeout(tResize);
      tResize = setTimeout(function () {
        if (window.innerWidth !== anchoAnt) { anchoAnt = window.innerWidth; redividir(); ScrollTrigger.refresh(); }
      }, 250);
    });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { redividir(); ScrollTrigger.refresh(); }); }
    var refrescoFaq = 0;
    $$('.faq__btn').forEach(function (b) {
      escuchar(b, 'click', function () { clearTimeout(refrescoFaq); refrescoFaq = setTimeout(function () { ScrollTrigger.refresh(); }, 700); });
    });
    if (document.readyState === 'complete') { ScrollTrigger.refresh(); } else { escuchar(window, 'load', function () { ScrollTrigger.refresh(); }); }

    return function () {
      limpiezas.reverse().forEach(function (fn) { try { fn(); } catch (e) { /* nada */ } });
      raiz.classList.remove('motion');
    };
  });

  /* ---------- Ocasiones: foto en arco que sigue al cursor (solo puntero fino, escritorio) ---------- */
  mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1024px)', function () {
    var lista = $('[data-oc-lista]');
    var filas = $$('[data-oc]');
    if (!lista || !filas.length) { return; }
    var flota = document.createElement('div');
    flota.className = 'oc__flota'; flota.setAttribute('aria-hidden', 'true');
    var imgs = filas.map(function (f) {
      var im = new Image(); im.alt = ''; im.decoding = 'async'; im.src = f.getAttribute('data-img');
      flota.appendChild(im); return im;
    });
    document.body.appendChild(flota);
    gsap.set(flota, { opacity: 0, scale: 0.8, x: 0, y: 0 });
    var tx = 0, ty = 0, x = 0, y = 0, visible = false, corriendo = false;
    function tick() {
      x += (tx - x) * 0.15; y += (ty - y) * 0.15;
      gsap.set(flota, { x: x, y: y });
    }
    function arrancar() { if (!corriendo) { corriendo = true; gsap.ticker.add(tick); } }
    function parar() { if (corriendo) { corriendo = false; gsap.ticker.remove(tick); } }
    function objetivo(e) { tx = e.clientX + 32; ty = e.clientY - 146; }
    function mostrar(i) {
      imgs.forEach(function (im, k) { im.classList.toggle('activa', k === i); });
      if (!visible) { visible = true; x = tx; y = ty; gsap.set(flota, { x: x, y: y }); arrancar(); }
      gsap.to(flota, { opacity: 1, scale: 1, duration: 0.6, ease: EASE, overwrite: 'auto' });
    }
    function ocultar() {
      visible = false;
      gsap.to(flota, { opacity: 0, scale: 0.8, duration: 0.45, ease: EASE, overwrite: 'auto', onComplete: function () { if (!visible) { parar(); } } });
    }
    var ons = [];
    filas.forEach(function (f, i) {
      var enter = function (e) { objetivo(e); mostrar(i); };
      var move = function (e) { objetivo(e); };
      f.addEventListener('pointerenter', enter); f.addEventListener('pointermove', move);
      ons.push([f, 'pointerenter', enter], [f, 'pointermove', move]);
    });
    lista.addEventListener('pointerleave', ocultar); ons.push([lista, 'pointerleave', ocultar]);
    return function () {
      parar();
      ons.forEach(function (o) { o[0].removeEventListener(o[1], o[2]); });
      flota.remove();
    };
  });
})();
