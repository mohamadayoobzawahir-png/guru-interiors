(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelectorAll('.site-nav a');

  function setOpen(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!document.body.classList.contains('nav-open'));
  });
  links.forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // Header shadow once the page scrolls
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Vision / Mission / Goals: reveal the matching text on hover, focus or tap
  var triggers = document.querySelectorAll('.vision__trigger');
  var labels = document.querySelector('.vision__labels');
  var canHover = window.matchMedia('(hover: hover)').matches;

  function show(trigger) {
    triggers.forEach(function (t) {
      var on = t === trigger;
      t.setAttribute('aria-expanded', String(on));
      document.getElementById(t.getAttribute('aria-controls')).classList.toggle('is-active', on);
    });
  }

  triggers.forEach(function (t) {
    t.addEventListener('mouseenter', function () { show(t); });
    if (canHover) t.addEventListener('focus', function () { show(t); });
    t.addEventListener('click', function () {
      // on touch screens a second tap on the same label closes it
      show(!canHover && t.getAttribute('aria-expanded') === 'true' ? null : t);
    });
  });
  if (canHover && labels) {
    labels.addEventListener('mouseleave', function () {
      if (!labels.contains(document.activeElement)) show(null);
    });
  }
  if (!canHover) {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.vision__trigger')) show(null);
    });
  }

  // Sections animate in as they scroll into view
  var reveals = [
    ['.display', 'up'],
    ['.eyebrow', 'up'],
    ['.letter__col p', 'up'],
    ['.signature', 'wipe'],
    ['.pen', 'right'],
    ['.about__text', 'up'],
    ['.vision__stage', 'zoom'],
    ['.vision__labels li', 'left'],
    ['.service-list li', 'left'],
    ['.project-card', 'up'],
    ['.project-grid li', 'pop'],
    ['.contact__photo', 'wipe'],
    ['.contact__info > *', 'up'],
    ['.pp__hero > *, .pp__body > section, .pp__cta, .pp__pager', 'up']
  ];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(function (entries) {
      // items that appear together come in one after another
      var shown = entries.filter(function (e) { return e.isIntersecting; });
      shown.forEach(function (e, i) {
        e.target.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.6) + 's');
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    reveals.forEach(function (r) {
      document.querySelectorAll(r[0]).forEach(function (el) {
        if (el.closest('.intro-screen')) return;
        el.classList.add('reveal', 'reveal--' + r[1]);
        observer.observe(el);
      });
    });
  }
})();
