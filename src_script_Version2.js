// Source JavaScript for MediaCraft.
// This file is bundled/minified to dist/script.min.js via the build script.

'use strict';

(function () {
  // Populate current year
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // Throttled page progress with requestAnimationFrame
  const progress = document.getElementById('progress');
  let rafProgress = null;
  function updateProgress() {
    if (!progress) return;
    const scrolled = window.scrollY || window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height ? Math.min(Math.max(scrolled / height, 0), 1) : 0;
    progress.style.transform = 'scaleX(' + pct + ')';
    rafProgress = null;
  }
  function requestProgressUpdate() {
    if (rafProgress == null) rafProgress = requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate);
  requestProgressUpdate();

  // Custom cursor
  (function () {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    let rafId = null;
    let enabled = true;

    function loop() {
      tx += (x - tx) * 0.18;
      ty += (y - ty) * 0.18;
      cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    }
    function onMouseMove(e) {
      x = e.clientX; y = e.clientY;
      if (cursor.style.opacity === '0') cursor.style.opacity = '1';
    }
    const mq = window.matchMedia('(pointer:fine)');
    if (mq.matches) {
      loop();
      document.addEventListener('mousemove', onMouseMove);
    } else {
      cursor.style.opacity = '0';
      document.body.classList.remove('no-cursor');
      enabled = false;
    }

    function disableCursorForTouch() {
      if (!enabled) return;
      cursor.style.opacity = '0';
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchstart', disableCursorForTouch);
      document.body.classList.remove('no-cursor');
      enabled = false;
    }
    document.addEventListener('touchstart', disableCursorForTouch, { passive: true });
  })();

  // Typewriter microcopy
  (function () {
    const words = ['branding.', 'storytelling.', 'sound engineering.', 'graphic designing.', 'product thinking.', 'programming.'];
    const el = document.querySelector('.typewriter');
    if (!el) return;
    let i = 0, j = 0, forward = true, timeout = null;
    function tick() {
      const w = words[i];
      el.textContent = w.slice(0, j) + (j % 2 === 0 ? ' ' : '\u258F');
      if (forward) {
        j++;
        if (j > w.length) { forward = false; timeout = setTimeout(tick, 900); return; }
      } else {
        j--;
        if (j === 0) { forward = true; i = (i + 1) % words.length; }
      }
      timeout = setTimeout(tick, forward ? 90 : 30);
    }
    tick();
    window.addEventListener('pagehide', function () { if (timeout) clearTimeout(timeout); });
  })();

  // Dialog controls, focus management, portfolio scroll
  (function () {
    const modal = document.getElementById('hireModal');
    const openBtn = document.getElementById('hireBtn');
    const close = document.getElementById('closeHire');
    const portfolioBtn = document.getElementById('portfolioBtn');
    let lastFocusedEl = null;

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        if (typeof modal?.showModal === 'function') {
          lastFocusedEl = document.activeElement;
          modal.showModal();
          const first = modal.querySelector('input,textarea,button');
          if (first) first.focus();
        } else {
          window.location.href = 'mailto:hello@mediacraft.example';
        }
      });
    }
    if (close) {
      close.addEventListener('click', function () {
        if (typeof modal?.close === 'function') modal.close();
      });
    }
    if (modal) {
      modal.addEventListener('close', function () {
        if (lastFocusedEl?.focus) lastFocusedEl.focus();
      });
      modal.addEventListener('cancel', function () {
        if (typeof modal.close === 'function') modal.close();
      });
    }

    if (portfolioBtn) {
      portfolioBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById('works');
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(function () { target.focus(); target.removeAttribute('tabindex'); }, 600);
        }
      });
    }
  })();

  // Mosaic parallax (pointer events)
  (function () {
    const items = document.querySelectorAll('.mosaic-card');
    if (!items.length) return;
    items.forEach(el => {
      let pointerMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        const img = el.querySelector('img');
        if (img) img.style.transform = `scale(1.03) translate(${(dx * 6).toFixed(2)}px, ${(dy * 6).toFixed(2)}px)`;
      };
      el.addEventListener('pointermove', pointerMove, { passive: true });
      el.addEventListener('pointerleave', function () {
        const img = el.querySelector('img');
        if (img) img.style.transform = '';
      });
    });
  })();

  // Visual stage parallax (rAF throttled)
  (function () {
    const layers = Array.from(document.querySelectorAll('.visual-stage .layer'));
    if (!layers.length) return;
    let rafId = null;
    function onFrame() {
      const y = window.scrollY || window.pageYOffset;
      layers.forEach((el, idx) => {
        const factor = (idx + 1) * 0.02;
        const base = el.dataset.baseTransform || '';
        const tx = (((y * factor) % 40) - 20).toFixed(2);
        const ty = (((y * factor) % 28) - 14).toFixed(2);
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) ${base.replace('translate3d(', '').replace(')', '')}`.trim();
      });
      rafId = null;
    }
    function onScroll() { if (rafId == null) rafId = requestAnimationFrame(onFrame); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  })();

  // Reveal animations for timeline & mosaic (IntersectionObserver)
  (function () {
    const revealEls = document.querySelectorAll('.mosaic-card, .tl-item');
    if (!revealEls.length) return;
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('reveal-hidden');
          e.target.style.transform = 'translateY(0)';
          e.target.style.opacity = '1';
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => {
      el.style.willChange = 'transform,opacity';
      io.observe(el);
    });
  })();

  // Services carousel keyboard nav & accessible announce
  (function () {
    const track = document.querySelector('.services');
    if (!track) return;

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') track.scrollBy({ left: 260, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') track.scrollBy({ left: -260, behavior: 'smooth' });
    });

    const live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.className = 'sr-only';
    document.body.appendChild(live);

    const items = Array.from(track.querySelectorAll('.svc'));
    function announceCurrent() {
      let best = items[0], bestDist = Infinity;
      const center = window.innerWidth / 2;
      items.forEach(it => {
        const rect = it.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const dist = Math.abs(cx - center);
        if (dist < bestDist) { bestDist = dist; best = it; }
      });
      const title = best.querySelector('h4') ? best.querySelector('h4').textContent : 'Service';
      live.textContent = 'Current service: ' + title;
    }

    let t = null;
    track.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(announceCurrent, 250);
    }, { passive: true });

    setTimeout(announceCurrent, 300);
  })();

  // Micro form submit handler (UX only)
  (function () {
    const form = document.getElementById('microContact');
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = 'Sent';
        form.reset();
        setTimeout(function () { btn.textContent = orig; btn.disabled = false; }, 1200);
      }, 800);
    });
  })();
}());