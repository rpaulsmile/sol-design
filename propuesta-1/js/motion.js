/* Sol Design, propuesta 1. Capa de movimiento (tanda 2): GSAP 3.12.5 + ScrollTrigger.
   Todo vive dentro de gsap.matchMedia(): con prefers-reduced-motion: reduce no se crea nada y la página
   queda en su estado final (el de la tanda 1). Solo se animan transform, opacity y clip-path. */
(function () {
  'use strict';

  var raiz = document.documentElement;
  if (!window.gsap || !window.ScrollTrigger) { raiz.classList.remove('motion'); return; }
  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  var Sol = window.Sol || {};

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function limitar(v, a, b) { return Math.max(a, Math.min(b, v)); }

  var mm = gsap.matchMedia();

  /* =====================================================================
     Movimiento general (sin reduced-motion)
     ===================================================================== */
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    raiz.classList.add('motion');
    var limpiezas = []; // funciones que deshacen cambios de DOM al volver a reduced-motion
    function alLimpiar(fn) { limpiezas.push(fn); }
    function escuchar(el, tipo, fn, opts) { el.addEventListener(tipo, fn, opts); alLimpiar(function () { el.removeEventListener(tipo, fn, opts); }); }

    var nav = $('[data-nav]');
    var hero = $('[data-hero]');
    var capa = $('[data-capa]');
    var footer = $('[data-footer]');

    /* ---------- Titulares por líneas (accesible: aria-label o texto oculto, trozos aria-hidden) ---------- */
    var divididos = []; // {el, hecho}
    function dividir(el) {
      if (el._orig === undefined) { el._orig = el.innerHTML; } else { el.innerHTML = el._orig; }
      var etiqueta = el.textContent.replace(/\s+/g, ' ').trim();
      var palabras = [];
      (function recorrer(nodo, abre, cierra) {
        Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (p) {
              if (!p) { return; }
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
              var s = document.createElement('span');
              s.textContent = p;
              frag.appendChild(s);
              palabras.push({ el: s, texto: p, abre: abre, cierra: cierra });
            });
            nodo.replaceChild(frag, n);
          } else if (n.nodeType === 1) {
            var copia = n.cloneNode(false);
            var abreN = abre || copia.outerHTML.replace(/<\/[^>]+>$/, '');
            recorrer(n, abreN, cierra || '</' + n.tagName.toLowerCase() + '>');
          }
        });
      })(el, '', '');
      var lineas = [], topAnt = null, actual = null;
      palabras.forEach(function (w) {
        var t = Math.round(w.el.offsetTop);
        if (topAnt === null || Math.abs(t - topAnt) > 4) { actual = []; lineas.push(actual); topAnt = t; }
        actual.push(w);
      });
      var html = lineas.map(function (ws) {
        var h = '', abierto = '';
        ws.forEach(function (w, i) {
          if (w.abre !== abierto) { if (abierto) { h += ws[i - 1].cierra; } if (i > 0) { h += ' '; } if (w.abre) { h += w.abre; } abierto = w.abre; }
          else if (i > 0) { h += ' '; }
          h += esc(w.texto);
        });
        if (abierto) { h += ws[ws.length - 1].cierra; }
        return '<span class="l-clip" aria-hidden="true"><span class="l-in">' + h + '</span></span>';
      }).join('');
      var esTitular = /^H[1-6]$/.test(el.tagName);
      el.innerHTML = (esTitular ? '' : '<span class="solo-lectores">' + esc(etiqueta) + '</span>') + html;
      if (esTitular) { el.setAttribute('aria-label', etiqueta); }
      return $$('.l-in', el);
    }
    function redividir() {
      divididos.forEach(function (s) {
        var inn = dividir(s.el);
        if (!s.hecho) { gsap.set(inn, { yPercent: 110 }); if (s.entrada) { s.entrada(inn); } }
      });
    }
    alLimpiar(function () {
      divididos.forEach(function (s) {
        s.el.innerHTML = s.el._orig; s.el.removeAttribute('aria-label'); delete s.el._orig;
      });
    });
    function registrarDividido(el) { var s = { el: el, hecho: false }; divididos.push(s); gsap.set(dividir(el), { yPercent: 110 }); return s; }

    /* =====================================================================
       1. NAV
       ===================================================================== */
    gsap.fromTo(nav, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out', clearProps: 'clipPath' });
    var navOculto = false, yAnt = window.scrollY;
    function menuAbierto() { return document.body.classList.contains('menu-abierto'); }
    function estadoNav(y) { nav.classList.toggle('nav--solido', !menuAbierto() && y > 80); }
    function mostrarNav() { if (!navOculto) { return; } navOculto = false; gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power3.inOut', overwrite: 'auto' }); }
    function ocultarNav() { if (navOculto) { return; } navOculto = true; gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power3.inOut', overwrite: 'auto' }); }
    estadoNav(window.scrollY);
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        var y = self.scroll(), d = y - yAnt;
        estadoNav(y);
        if (menuAbierto() || y <= 120) { mostrarNav(); }
        else if (d > 4) { ocultarNav(); }
        else if (d < -4) { mostrarNav(); }
        if (Math.abs(d) > 4) { yAnt = y; }
      }
    });
    var obsMenu = new MutationObserver(function () { estadoNav(window.scrollY); if (menuAbierto()) { mostrarNav(); } });
    obsMenu.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    alLimpiar(function () { obsMenu.disconnect(); nav.classList.remove('nav--solido'); });
    escuchar(nav, 'focusin', mostrarNav);

    // Anclas del nav con scroll suave (el CSS global de scroll suave se apaga con .motion)
    escuchar(document, 'click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented) { return; }
      var id = a.getAttribute('href').slice(1);
      var destino = id ? document.getElementById(id) : null;
      if (!destino && id) { return; }
      e.preventDefault();
      var y = id ? destino.getBoundingClientRect().top + window.scrollY : 0;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    });

    /* =====================================================================
       2. HERO
       ===================================================================== */
    if (hero) {
      var media = $('[data-hero-media]', hero);
      var video = $('[data-hero-video]', hero);
      var textoHero = $('.hero__texto', hero);
      var h1 = $('h1', hero);
      var etiquetaHero = $('.etiqueta--hero', hero);
      var bloquesHero = $$('.hero__baja, .hero__acciones', hero);

      // Poster propio debajo del video, para poder animar su escala y hacer fundido del video encima
      var poster = document.createElement('img');
      poster.className = 'hero__poster'; poster.alt = ''; poster.setAttribute('aria-hidden', 'true');
      poster.src = video.getAttribute('poster'); poster.decoding = 'async';
      media.insertBefore(poster, video);
      var velo = document.createElement('div');
      velo.className = 'hero__velo'; velo.setAttribute('aria-hidden', 'true');
      hero.insertBefore(velo, hero.firstChild);
      alLimpiar(function () { poster.remove(); velo.remove(); });

      var sh = registrarDividido(h1);
      gsap.set([etiquetaHero].concat(bloquesHero), { y: 28, opacity: 0 });
      gsap.set(video, { opacity: 0 });
      raiz.classList.add('motion-listo'); // a partir de aquí el CSS ya no oculta el texto: lo oculta GSAP
      alLimpiar(function () { raiz.classList.remove('motion-listo'); });

      gsap.fromTo(poster, { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'expo.out' });
      gsap.to(etiquetaHero, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.1 });
      var tH1 = null;
      sh.entrada = function (inn) {
        if (tH1) { tH1.kill(); }
        tH1 = gsap.to(inn, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 0.2, onStart: function () { sh.hecho = true; } });
      };
      sh.entrada($$('.l-in', h1));
      gsap.to(bloquesHero, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.6 });

      // El video aparece con fundido cuando puede reproducir (main.js marca html[data-video="listo"])
      var fundido = false;
      function mostrarVideo() { if (fundido) { return; } fundido = true; gsap.to(video, { opacity: 1, duration: 1, ease: 'power1.inOut' }); }
      var obsVideo = null;
      if (raiz.getAttribute('data-video') === 'listo') { mostrarVideo(); }
      else {
        obsVideo = new MutationObserver(function () { if (raiz.getAttribute('data-video') === 'listo') { mostrarVideo(); obsVideo.disconnect(); } });
        obsVideo.observe(raiz, { attributes: true, attributeFilter: ['data-video'] });
        alLimpiar(function () { obsVideo.disconnect(); });
      }

      // Parallax al salir: el medio baja hasta 20% y el hero se oscurece 20%
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
        .to(media, { yPercent: 20 }, 0)
        .to(velo, { opacity: 0.2 }, 0);
      var punto = $('.hero__scroll', hero);
      if (punto) { gsap.to(punto, { opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '+=160', scrub: true } }); }
    }

    /* =====================================================================
       3. PATRONES GENÉRICOS
       ===================================================================== */
    // lines (menos hero y statement oscuro, que tienen su propio manejo)
    $$('[data-anim="lines"]').forEach(function (el) {
      if (el.closest('[data-hero]') || el.closest('[data-statement-oscuro]')) { return; }
      var s = registrarDividido(el);
      var enFooter = !!el.closest('[data-footer]'); // el footer es sticky: se dispara con el borde inferior de la capa
      ScrollTrigger.create({
        trigger: enFooter ? capa : el, start: enFooter ? 'bottom 80%' : 'top 80%', once: true,
        onEnter: function () {
          s.hecho = true;
          gsap.to($$('.l-in', el), { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.12 });
        }
      });
    });

    // block
    var bloques = $$('[data-anim="block"]').filter(function (e) { return !e.closest('[data-hero]') && !e.closest('[data-paso]'); });
    gsap.set(bloques, { y: 28, opacity: 0 });
    ScrollTrigger.batch(bloques, {
      start: 'top 85%', once: true, interval: 0.1,
      onEnter: function (b) { gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true }); }
    });

    // hairline (la del footer se dispara con la capa)
    var hairlines = $$('[data-anim="hairline"]');
    var hlNormales = hairlines.filter(function (h) { return !h.closest('[data-footer]'); });
    gsap.set(hairlines, { scaleX: 0 });
    ScrollTrigger.batch(hlNormales, {
      start: 'top 88%', once: true, interval: 0.1,
      onEnter: function (b) { gsap.to(b, { scaleX: 1, duration: 1.1, ease: 'expo.out', stagger: 0.15, overwrite: true }); }
    });
    hairlines.filter(function (h) { return h.closest('[data-footer]'); }).forEach(function (h) {
      ScrollTrigger.create({ trigger: capa, start: 'bottom 55%', once: true, onEnter: function () { gsap.to(h, { scaleX: 1, duration: 1.1, ease: 'expo.out' }); } });
    });

    // window
    $$('[data-anim="window"]').forEach(function (el) {
      var r = getComputedStyle(el).borderTopLeftRadius || '20px';
      var img = $('img', el);
      gsap.set(el, { clipPath: 'inset(12% 12% 12% 12% round ' + r + ')' });
      gsap.set(img, { scale: 1.15 });
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: function () {
          gsap.to(el, { clipPath: 'inset(0% 0% 0% 0% round ' + r + ')', duration: 1.2, ease: 'expo.out', clearProps: 'clipPath' });
          gsap.to(img, { scale: 1, duration: 1.6, ease: 'expo.out' });
        }
      });
    });

    // parallax (el disparador es el contenedor de fotos, para no depender de la propia transformación)
    $$('[data-parallax]').forEach(function (f) {
      var v = parseFloat(f.getAttribute('data-parallax')) || 1;
      gsap.fromTo(f, { y: -40 * v }, { y: 40 * v, ease: 'none', scrollTrigger: { trigger: f.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });

    /* =====================================================================
       4. ORBIT (anillo pinned)
       ===================================================================== */
    var orb = Sol.orbit;
    var secOrbit = $('#flores');
    var stOrbit = null;
    if (orb && secOrbit && orb.items && orb.items.length > 1) {
      (function () {
        var escena = $('[data-orbit-escena]', secOrbit);
        var items = orb.items;
        var n = items.length;
        var PASO = 18;
        var ESC = [1, 0.62, 0.4, 0.4];
        var OPA = [1, 0.7, 0.4, 0];
        var estado = { pos: 0 };
        var idx = 0, R = 0, bloqueo = null, tBloqueo = 0, arrastrado = false;

        // Las fichas salen de cada ítem y se apilan en una zona fija bajo el anillo
        var fichas = items.map(function (it) { return $('[data-orbit-ficha]', it); });
        var zonaFichas = document.createElement('div');
        zonaFichas.className = 'orbit__fichas';
        escena.parentNode.insertBefore(zonaFichas, escena.nextSibling);
        fichas.forEach(function (f, k) { f._origen = items[k]; zonaFichas.appendChild(f); });
        var nombres = fichas.map(function (f) {
          var h = $('.orbit__nombre', f);
          h._orig = h.innerHTML;
          h.classList.add('l-clip');
          h.innerHTML = '<span class="l-in l-in--libre">' + h.innerHTML + '</span>';
          return $('.l-in', h);
        });
        $$('img', escena).forEach(function (im) { im.loading = 'eager'; im.draggable = false; });
        gsap.set(fichas, { autoAlpha: 0 });
        gsap.set(fichas[0], { autoAlpha: 1 });

        function interp(tab, a) {
          a = Math.min(Math.abs(a), 3);
          var i = Math.floor(a);
          if (i >= 3) { return tab[3]; }
          return tab[i] + (tab[i + 1] - tab[i]) * (a - i);
        }
        function medir() { R = (window.innerWidth >= 1024 ? 0.6 : 1.4) * window.innerWidth; }
        function render() {
          items.forEach(function (it, k) {
            var d = k - estado.pos, a = Math.abs(d), th = d * PASO * Math.PI / 180;
            gsap.set(it, { x: R * Math.sin(th), y: -R * (1 - Math.cos(th)), scale: interp(ESC, a), autoAlpha: interp(OPA, a), zIndex: 10 - Math.round(a) });
          });
        }
        function girar(i) { gsap.to(estado, { pos: i, duration: 0.9, ease: 'power3.inOut', overwrite: true, onUpdate: render }); }
        function mostrarFicha(i) {
          fichas.forEach(function (f, k) {
            if (k === i) {
              gsap.fromTo(f, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.35, ease: 'expo.out', overwrite: true });
              gsap.fromTo(nombres[k], { yPercent: 110 }, { yPercent: 0, duration: 0.7, delay: 0.35, ease: 'expo.out', overwrite: true });
            } else if (gsap.getProperty(f, 'visibility') !== 'hidden' || gsap.isTweening(f)) {
              gsap.to(f, { autoAlpha: 0, duration: 0.3, ease: 'power1.out', overwrite: true });
            }
          });
        }
        function sincronizarScroll(i) {
          var y = stOrbit.start + (i / (n - 1)) * (stOrbit.end - stOrbit.start);
          if (Math.abs(window.scrollY - y) < 2) { return; }
          bloqueo = i;
          clearTimeout(tBloqueo);
          tBloqueo = setTimeout(function () { bloqueo = null; }, 1400);
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        function enVista() { var r = secOrbit.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; }
        function ir(i, desdeScroll) {
          i = limitar(i, 0, n - 1);
          if (i === idx) { return; }
          idx = i;
          orb.marcar(i);
          girar(i);
          mostrarFicha(i);
          if (!desdeScroll && stOrbit && enVista()) { sincronizarScroll(i); }
        }

        medir();
        render();
        orb.marcar(0);
        orb.gancho = function (i) { ir(i, false); };
        escuchar(window, 'resize', function () { medir(); render(); });
        escuchar(window, 'wheel', function () { bloqueo = null; }, { passive: true });
        escuchar(window, 'touchstart', function () { bloqueo = null; }, { passive: true });

        stOrbit = ScrollTrigger.create({
          trigger: secOrbit, start: 'top top', end: '+=' + (n - 1) * 70 + '%', pin: true, anticipatePin: 1,
          onUpdate: function (self) {
            var i = limitar(Math.round(self.progress * (n - 1)), 0, n - 1);
            if (bloqueo !== null) { if (i === bloqueo) { bloqueo = null; } return; }
            if (i !== idx) { ir(i, true); }
          }
        });

        // Clic en un vecino lo trae al frente
        items.forEach(function (it, k) {
          escuchar(it, 'click', function () { if (arrastrado) { arrastrado = false; return; } if (k !== idx) { ir(k, false); } });
        });
        // Arrastre horizontal (umbral 40px)
        var x0 = null;
        escuchar(escena, 'pointerdown', function (e) { if (e.pointerType === 'mouse' && e.button !== 0) { return; } x0 = e.clientX; arrastrado = false; });
        escuchar(escena, 'pointermove', function (e) {
          if (x0 === null) { return; }
          var dx = e.clientX - x0;
          if (Math.abs(dx) >= 40) { arrastrado = true; ir(idx + (dx < 0 ? 1 : -1), false); x0 = e.clientX; }
        });
        ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { escuchar(escena, t, function () { x0 = null; }); });
        escuchar(escena, 'dragstart', function (e) { e.preventDefault(); });
        // Teclado: ← → mientras el anillo está pinned (la pista enfocada ya lo maneja main.js)
        escuchar(document, 'keydown', function (e) {
          if (e.defaultPrevented || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) { return; }
          var t = e.target;
          if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable || menuAbierto()) { return; }
          if (!stOrbit || !stOrbit.isActive) { return; }
          e.preventDefault();
          ir(idx + (e.key === 'ArrowRight' ? 1 : -1), false);
        });

        alLimpiar(function () {
          orb.gancho = null;
          clearTimeout(tBloqueo);
          gsap.killTweensOf(estado); gsap.killTweensOf(fichas); gsap.killTweensOf(nombres);
          gsap.set(items, { clearProps: 'all' });
          fichas.forEach(function (f, k) { gsap.set(f, { clearProps: 'all' }); items[k].appendChild(f); });
          $$('.orbit__nombre', secOrbit).forEach(function (h) { h.classList.remove('l-clip'); if (h._orig !== undefined) { h.innerHTML = h._orig; } });
          zonaFichas.remove();
          $$('img', escena).forEach(function (im, k) { if (k > 0) { im.loading = 'lazy'; } im.draggable = true; });
          orb.marcar(orb.actual());
        });
      })();
    }

    /* =====================================================================
       5. CATÁLOGO
       ===================================================================== */
    var grid = $('[data-catalogo-grid]');
    if (grid) {
      var tarjetas = $$('[data-tarjeta]', grid);
      var cols = Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(' ').length);
      var desfase = window.innerWidth >= 768 ? 48 : 24;
      tarjetas.forEach(function (t, i) { gsap.set(t, { y: (i % cols) % 2 === 1 ? desfase : 0, opacity: 0 }); });
      ScrollTrigger.batch(tarjetas, {
        start: 'top 92%', once: true, interval: 0.1,
        onEnter: function (b) { gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true }); }
      });
      Sol.filtroGancho = function (id, aplicar) {
        var visibles = tarjetas.filter(function (c) { return !c.hidden; });
        if (!visibles.length) { aplicar(); return; }
        gsap.to(visibles, {
          opacity: 0, scale: 0.96, duration: 0.25, ease: 'power2.in', overwrite: true,
          onComplete: function () {
            aplicar();
            var nuevas = tarjetas.filter(function (c) { return !c.hidden; });
            gsap.fromTo(nuevas, { opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05, overwrite: true, clearProps: 'transform,opacity' });
            gsap.delayedCall(0.05, function () { ScrollTrigger.refresh(); });
          }
        });
      };
      alLimpiar(function () { Sol.filtroGancho = null; tarjetas.forEach(function (t) { gsap.set(t, { clearProps: 'all' }); }); });
    }

    /* =====================================================================
       6. CÓMO SE HACE
       ===================================================================== */
    var secP = $('[data-pasos]');
    if (secP) {
      var cartas = $$('[data-paso]', secP);
      var fills = $$('[data-pasos-fill]', secP);
      var numEl = $('[data-pasos-num]', secP);
      var contP = $('.contenedor', secP);
      var fondo = $('.pasos__fondo', secP);

      // Contador con giro vertical: el número va dentro de un clip
      var clip = document.createElement('span');
      clip.className = 'contador__clip';
      numEl.parentNode.insertBefore(clip, numEl);
      clip.appendChild(numEl);
      alLimpiar(function () { clip.parentNode.insertBefore(numEl, clip); clip.remove(); numEl.textContent = '01'; });
      var pasoActual = 1;
      function cambiarNum(p) {
        if (p === pasoActual) { return; }
        var dir = p > pasoActual ? 1 : -1;
        pasoActual = p;
        gsap.killTweensOf(numEl);
        gsap.to(numEl, {
          yPercent: -100 * dir, opacity: 0, duration: 0.2, ease: 'power2.in',
          onComplete: function () {
            numEl.textContent = '0' + p;
            gsap.fromTo(numEl, { yPercent: 100 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'expo.out' });
          }
        });
      }

      var tlP = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: secP, start: 'top top', end: 'bottom bottom', scrub: 0.5 } });
      fills.forEach(function (f, k) { tlP.fromTo(f, { scaleX: 0 }, { scaleX: 1, duration: 1 }, k); });
      for (var k = 1; k < cartas.length; k++) {
        tlP.fromTo(cartas[k], { opacity: 0, scale: 0.92, rotation: -7 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'power2.out' }, k);
        tlP.to(cartas[k - 1], { opacity: 0, rotation: 5, yPercent: -8, duration: 0.5, ease: 'power2.in' }, k);
      }
      ScrollTrigger.create({
        trigger: secP, start: 'top top', end: 'bottom bottom',
        onUpdate: function (self) { var t = self.progress * 3; cambiarNum(t < 1.25 ? 1 : t < 2.25 ? 2 : 3); }
      });

      // Texto "chenille" de fondo: solo escritorio; vive dentro del contenedor sticky para quedar centrado en pantalla
      if (fondo && window.matchMedia('(min-width: 1024px)').matches) {
        contP.insertBefore(fondo, contP.firstChild);
        alLimpiar(function () { secP.insertBefore(fondo, secP.firstChild); });
        gsap.set(fondo, { yPercent: -50 });
        gsap.fromTo(fondo, { xPercent: 10 }, { xPercent: -10, ease: 'none', scrollTrigger: { trigger: secP, start: 'top bottom', end: 'bottom top', scrub: true } });
      }
      alLimpiar(function () { cartas.forEach(function (c) { gsap.set(c, { clearProps: 'all' }); }); fills.forEach(function (f) { gsap.set(f, { clearProps: 'all' }); }); gsap.set(fondo, { clearProps: 'all' }); });
    }

    /* =====================================================================
       7. STATEMENT OSCURO (scrub en ~120svh)
       ===================================================================== */
    var oscuro = $('[data-statement-oscuro]');
    if (oscuro) {
      var lineasO = $$('.linea', oscuro);
      var origO = lineasO.map(function (l) { return l.innerHTML; });
      lineasO.forEach(function (l) { l.classList.add('l-clip'); l.innerHTML = '<span class="l-in l-in--libre">' + l.innerHTML + '</span>'; });
      var innerO = $$('.l-in', oscuro);
      gsap.set(innerO, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: oscuro, start: 'top 70%', end: 'bottom 50%',
        onUpdate: function (self) {
          innerO.forEach(function (el, i) {
            var l = limitar((self.progress - i * 0.3) / 0.5, 0, 1);
            gsap.set(el, { yPercent: 110 * Math.pow(1 - l, 3) });
          });
        }
      });
      alLimpiar(function () { lineasO.forEach(function (l, i) { l.classList.remove('l-clip'); l.innerHTML = origO[i]; }); });
    }

    /* =====================================================================
       8. OCASIONES (tarjetas apiladas con sticky; la anterior se encoge al ser cubierta)
       ===================================================================== */
    var ocs = $$('[data-ocasion]');
    if (ocs.length > 1) {
      var rem = parseFloat(getComputedStyle(raiz).fontSize) || 16;
      ocs.forEach(function (c, i) {
        if (i === ocs.length - 1) { return; }
        var topSig = 5.5 * rem + 1.25 * rem * (i + 1);
        gsap.to(c, { scale: 0.94, opacity: 0.85, ease: 'none', scrollTrigger: { trigger: ocs[i + 1], start: 'top 85%', end: 'top ' + Math.round(topSig) + 'px', scrub: true } });
      });
    }

    /* =====================================================================
       9. PERSONALÍZALO (la foto usa el patrón window)
       ===================================================================== */
    var muestras = $$('.muestra__color');
    if (muestras.length) {
      gsap.set(muestras, { scale: 0, opacity: 0 });
      ScrollTrigger.create({
        trigger: $('[data-muestras]'), start: 'top 88%', once: true,
        onEnter: function () { gsap.to(muestras, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.06, clearProps: 'transform,opacity' }); }
      });
    }

    /* =====================================================================
       10. FAQ: la altura de la respuesta es CSS (grid-template-rows 0fr a 1fr). Aquí solo se re-mide el scroll.
       ===================================================================== */
    var refrescoFaq = 0;
    $$('.faq__btn').forEach(function (b) {
      escuchar(b, 'click', function () { clearTimeout(refrescoFaq); refrescoFaq = setTimeout(function () { ScrollTrigger.refresh(); }, 520); });
    });

    /* =====================================================================
       11. FOOTER REVELADO
       ===================================================================== */
    if (footer && capa) {
      var logoF = $('[data-footer-logo]', footer);
      function ajustarFooter() { footer.classList.toggle('footer--revelado', footer.offsetHeight <= window.innerHeight); }
      ajustarFooter();
      ScrollTrigger.addEventListener('refreshInit', ajustarFooter);
      alLimpiar(function () { ScrollTrigger.removeEventListener('refreshInit', ajustarFooter); footer.classList.remove('footer--revelado'); });
      if (logoF) {
        gsap.fromTo(logoF, { yPercent: 20 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: capa, start: 'bottom bottom', end: 'max', scrub: true } });
      }
      // Si el foco entra al footer mientras está tapado, lleva la página al final para descubrirlo
      escuchar(footer, 'focusin', function () {
        if (footer.classList.contains('footer--revelado')) { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }); }
      });
    }

    /* =====================================================================
       Re-medir: resize (re-divide titulares), fuentes, carga y cambios de altura
       ===================================================================== */
    var anchoAnt = window.innerWidth, tResize = 0;
    escuchar(window, 'resize', function () {
      clearTimeout(tResize);
      tResize = setTimeout(function () {
        if (window.innerWidth !== anchoAnt) { anchoAnt = window.innerWidth; redividir(); ScrollTrigger.refresh(); }
      }, 250);
    });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { redividir(); ScrollTrigger.refresh(); }); }
    if (document.readyState === 'complete') { ScrollTrigger.refresh(); }
    else { escuchar(window, 'load', function () { ScrollTrigger.refresh(); }); }
    ScrollTrigger.sort();

    /* =====================================================================
       Limpieza al volver a reduced-motion
       ===================================================================== */
    return function () {
      limpiezas.reverse().forEach(function (fn) { try { fn(); } catch (e) { /* nada */ } });
      raiz.classList.remove('motion');
      gsap.set([nav, hero, capa], { clearProps: 'all' });
    };
  });

  /* =====================================================================
     12. FLORES DEL CURSOR: solo puntero fino y sin reduced-motion
     ===================================================================== */
  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', function () {
    var tipos = ['gerbera', 'margarita', 'rosa-roja'];
    var pool = [];
    for (var i = 0; i < 8; i++) {
      var im = new Image();
      im.className = 'flor-cursor'; im.alt = ''; im.decoding = 'async';
      im.setAttribute('aria-hidden', 'true');
      im.src = '../assets/recortes/flor-' + tipos[i % tipos.length] + '.webp';
      document.body.appendChild(im);
      pool.push(im);
    }
    var sig = 0, ult = null, pend = null, raf = 0;
    var nav = $('[data-nav]');
    var PAUSA = '[data-hero],[data-statement-oscuro],[data-footer],[data-menu]';

    function soltar(x, y) {
      var el = pool[sig++ % pool.length];
      var tam = 56 + Math.random() * 40, rot = Math.random() * 50 - 25, sube = 40 + Math.random() * 30;
      gsap.killTweensOf(el);
      gsap.set(el, { width: tam, xPercent: -50, yPercent: -50, x: x, y: y, rotation: rot, scale: 1, opacity: 0.9 });
      gsap.to(el, { y: y - sube, rotation: rot + 40, opacity: 0, duration: 1.4, ease: 'power2.out' });
    }
    function paso() {
      raf = 0;
      var p = pend;
      if (!p) { return; }
      if (!ult) { ult = p; return; }
      if (Math.hypot(p.x - ult.x, p.y - ult.y) < 48) { return; }
      ult = p;
      var bajo = document.elementFromPoint(p.x, p.y);
      if (bajo && (bajo.closest(PAUSA) || (bajo.closest('[data-nav]') && !nav.classList.contains('nav--solido')))) { return; }
      soltar(p.x, p.y);
    }
    function mover(e) { pend = { x: e.clientX, y: e.clientY }; if (!raf) { raf = requestAnimationFrame(paso); } }
    document.addEventListener('pointermove', mover, { passive: true });
    return function () {
      document.removeEventListener('pointermove', mover);
      if (raf) { cancelAnimationFrame(raf); }
      pool.forEach(function (el) { gsap.killTweensOf(el); el.remove(); });
    };
  });
})();
