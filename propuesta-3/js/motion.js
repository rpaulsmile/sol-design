/* Sol Design, propuesta 3. Movimiento juguetón y corto: GSAP 3.12.5 + ScrollTrigger.
   Solo transform, opacity y stroke-dash del hilo. Sin GSAP o con reduced-motion la clase .motion desaparece y todo queda visible. */
(function () {
  'use strict';
  var raiz = document.documentElement;
  if (!window.gsap || !window.ScrollTrigger) { raiz.classList.remove('motion'); return; }
  if (!raiz.classList.contains('motion')) { return; }
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  var Sol = window.Sol || {}, H = Sol.hilo;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  try { iniciar(); } catch (e) { if (window.console) { console.error(e); } raiz.classList.remove('motion'); }

  function iniciar() {
    /* ---------- Titulares saltarines: el texto real sigue siendo texto ---------- */
    function dividir(el) {
      var nodos = Array.prototype.slice.call(el.childNodes), spans = [];
      el.textContent = '';
      nodos.forEach(function (n) {
        if (n.nodeType === 1) { n.classList.add('sp'); el.appendChild(n); spans.push(n); return; }
        n.textContent.split(/(\s+)/).forEach(function (t) {
          if (!t) { return; }
          if (/^\s+$/.test(t) || /^[,.;:!?¿¡)]+$/.test(t)) { el.appendChild(document.createTextNode(t)); return; }
          var sp = document.createElement('span'); sp.className = 'sp'; sp.textContent = t; el.appendChild(sp); spans.push(sp);
        });
      });
      return spans;
    }
    $$('[data-saltar]').forEach(function (el) {
      var sp = dividir(el);
      gsap.set(sp, { yPercent: 70, opacity: 0 });
      el.classList.add('listo');
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
        gsap.to(sp, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.05, delay: el.closest('.hero') ? 0.35 : 0 });
      } });
    });

    /* ---------- Pop-in de tarjetas y stickers ---------- */
    var rot = 0;
    ScrollTrigger.batch('[data-pop]:not(.hero__logo-in)', { start: 'top 92%', once: true, onEnter: function (lote) {
      gsap.fromTo(lote, { scale: 0.6, rotation: function () { return (rot++ % 2 ? 8 : -8); }, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.07, clearProps: 'transform' });
    } });
    ScrollTrigger.batch('.stk img', { start: 'top 92%', once: true, onEnter: function (lote) {
      gsap.fromTo(lote, { scale: 0, rotation: -30, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'back.out(2.2)', stagger: 0.12, delay: 0.3, clearProps: 'transform' });
    } });
    Sol.filtroGancho = function (vis) {
      var t = vis.map(function (c) { return c.firstElementChild; });
      gsap.fromTo(t, { scale: 0.7, opacity: 0, rotation: function (i) { return i % 2 ? 6 : -6; } }, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.06, overwrite: true, clearProps: 'transform' });
    };
    Sol.caida = function (el, r) {
      gsap.fromTo(el, { y: -230, rotation: r - 20 }, { y: 0, rotation: r, duration: 0.8, ease: 'bounce.out' });
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.15 });
    };

    /* ---------- Hero ---------- */
    var tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });
    tl.fromTo('.hero__logo-in', { scale: 0.6, rotation: -10, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.8, clearProps: 'transform' }, 0.15)
      .fromTo('.hero__et', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3)
      .fromTo('.hero__baj', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.8)
      .fromTo('.hero__cta .btn', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, clearProps: 'transform' }, 0.95)
      .fromTo('.fl img', { scale: 0.3, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.12 }, 0.9)
      .to('.conf', { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power1.out' }, 1);

    /* ---------- Flotar (en pausa fuera de pantalla) ---------- */
    var hero = $('.hero');
    var flota = $$('.fl img').map(function (el) {
      return gsap.to(el, { y: 'random(-8, 8)', rotation: 'random(-4, 4)', duration: 'random(3, 5)', ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2, paused: true });
    }).concat($$('.conf').map(function (el) {
      return gsap.to(el, { y: 'random(-10, 10)', x: 'random(-6, 6)', duration: 'random(3, 5)', ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5, paused: true });
    }));
    if (hero) { ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: function (st) { flota.forEach(function (t) { st.isActive ? t.play() : t.pause(); }); } }); }

    /* ---------- Nav: se esconde al bajar y vuelve al subir ---------- */
    var nav = $('[data-nav]'), ult = window.scrollY;
    window.addEventListener('scroll', function () {
      var y = window.scrollY, menu = document.body.classList.contains('menu-abierto');
      if (!menu) { nav.classList.toggle('nav--oculto', y > ult && y > 160); }
      ult = y;
    }, { passive: true });
    nav.addEventListener('focusin', function () { nav.classList.remove('nav--oculto'); });

    /* ---------- El hilo: "Sol" se escribe al cargar y el resto se dibuja con el scroll ---------- */
    var intro = { f: 0 }, cur = 0, ultimo = -1, florecida = false;
    gsap.to(intro, { f: 1, duration: 1.6, ease: 'power1.inOut', delay: 0.5 });
    function objetivo() {
      var sy = window.scrollY, vh = window.innerHeight, max = Math.max(1, raiz.scrollHeight - vh), f = Math.min(1, sy / max);
      var porScroll = sy < 2 ? 0 : H.lenParaY(sy + vh * (0.5 + 0.5 * f));
      if (f > 0.985) { porScroll = H.L; }
      return Math.max(intro.f * H.Ls, porScroll);
    }
    function florecer(si) {
      if (si === florecida || !H.tieneFlor) { return; }
      florecida = si;
      var c = $('[data-hilo-c]');
      gsap.to(c, { attr: { r: si ? H.cr : 0 }, duration: si ? 0.7 : 0.25, ease: si ? 'back.out(2.4)' : 'power2.in', overwrite: true });
    }
    gsap.ticker.add(function () {
      if (!H || !H.L) { return; }
      var t = objetivo(), d = t - cur;
      if (Math.abs(d) > 0.4) { cur += d * 0.18; } else { cur = t; }
      if (Math.abs(cur - ultimo) > 0.3) { ultimo = cur; H.pintar(cur); }
      florecer(cur >= H.L - 1);
    });
    document.addEventListener('solhilo', function () { cur = H.len; ultimo = -1; florecida = false; if (H.len >= H.L - 1) { florecer(true); } });

    /* ---------- Prado: crece al entrar y se balancea ---------- */
    var prados = [];
    function iniciarPrado() {
      prados.forEach(function (t) { t.kill(); }); prados = [];
      var gs = $$('.pf'), footer = $('[data-footer]'); if (!gs.length) { return; }
      gs.forEach(function (g, i) {
        var x = g.getAttribute('data-x'), org = x + ' 170';
        gsap.set(g, { svgOrigin: org, scaleY: 0 });
        prados.push(gsap.to(g, { rotation: 'random(-3, 3)', svgOrigin: org, duration: 'random(2.5, 4)', ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 + (i % 5) * 0.2, paused: true }));
      });
      ScrollTrigger.create({ trigger: footer, start: 'top 90%', end: 'bottom top', onToggle: function (st) { prados.forEach(function (t) { st.isActive ? t.play() : t.pause(); }); } });
      ScrollTrigger.create({ trigger: footer, start: 'top 88%', once: true, onEnter: function () {
        gsap.to(gs, { scaleY: 1, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.05 });
      } });
    }
    iniciarPrado();
    document.addEventListener('solprado', function () { iniciarPrado(); gsap.set($$('.pf'), { scaleY: 1 }); });

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }
})();
