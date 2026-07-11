/* Agent1o1 — shared interactions */
(function () {
  'use strict';

  /* ---- Nav: shadow on scroll + mobile toggle ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () { links.classList.toggle('open'); });
  }

  /* ---- Nav label morphs to the section name on scroll (journey.now signature) ---- */
  var navLabel = document.querySelector('.nav-label');
  var labelled = Array.prototype.slice.call(document.querySelectorAll('[data-nav-label]'));
  if (navLabel && labelled.length) {
    var defaultLabel = navLabel.textContent;
    function updateLabel() {
      var current = defaultLabel, best = -Infinity;
      var line = window.scrollY + 120;
      labelled.forEach(function (el) {
        var top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line && top > best) { best = top; current = el.getAttribute('data-nav-label'); }
      });
      if (navLabel.textContent !== current) {
        navLabel.style.opacity = '0';
        setTimeout(function () { navLabel.textContent = current; navLabel.style.opacity = '1'; }, 160);
      }
    }
    window.addEventListener('scroll', updateLabel, { passive: true });
    updateLabel();
  }

  /* ---- Scroll reveal ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---- Animated workflow run ---- */
  function animateRun(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.run li'));
    if (!items.length) return;
    var timers = [];
    function reset() {
      timers.forEach(clearTimeout); timers = [];
      items.forEach(function (li) { li.classList.remove('done', 'active'); });
    }
    function play() {
      reset();
      items.forEach(function (li, i) {
        var delay = parseFloat(li.getAttribute('data-delay')) || (i * 900);
        timers.push(setTimeout(function () {
          li.classList.add('active');
          items.forEach(function (o, j) { if (j < i) { o.classList.remove('active'); o.classList.add('done'); } });
        }, delay));
      });
      // mark last as done
      var total = items.reduce(function (m, li) { return Math.max(m, parseFloat(li.getAttribute('data-delay')) || 0); }, 0);
      timers.push(setTimeout(function () {
        items.forEach(function (o) { o.classList.remove('active'); o.classList.add('done'); });
      }, total + 700));
    }
    var started = false;
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting && !started) { started = true; play(); } });
    }, { threshold: 0.4 });
    rio.observe(root);
    var replay = root.querySelector('.demo-replay');
    if (replay) replay.addEventListener('click', play);
  }
  document.querySelectorAll('.demo').forEach(animateRun);

  /* ---- Waitlist form (demo only, no backend) ---- */
  document.querySelectorAll('.wl-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var band = form.closest('.cta-band') || document;
      var success = band.querySelector('.wl-success');
      var intro = band.querySelector('.wl-intro');
      if (success && intro) { intro.style.display = 'none'; success.style.display = 'block'; }
    });
  });
  document.querySelectorAll('.wl-success form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.innerHTML = '<p style="color:#c7c6bc;font-size:16px">Got it — thank you. I read every one of these myself. Talk soon. — Jaydeep</p>';
    });
  });
  document.querySelectorAll('[data-skip]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var form = a.closest('form');
      if (form) form.innerHTML = '<p style="color:#c7c6bc;font-size:16px">No problem. You\'re on the list — I\'ll email you the moment it opens.</p>';
    });
  });
})();
