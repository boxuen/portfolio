/* 莊柏軒個人網站：手機選單、導覽列霧化、作品集分頁、區塊淡入淡出 */
(function () {
  var head = document.querySelector('.glass');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (head) head.classList.toggle('frost', y > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', '開啟選單');
      }
    });
  }


  // 作品集分頁（桌面與平板）；手機版由 CSS 直接展開全部分類
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab[data-tab]'));
  function selectTab(id, focus) {
    tabs.forEach(function (b) {
      var on = b.getAttribute('data-tab') === id;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.setAttribute('tabindex', on ? '0' : '-1');
      if (on && focus) b.focus();
    });
    document.querySelectorAll('.tabpanel[data-panel]').forEach(function (p) {
      p.classList.toggle('on', p.getAttribute('data-panel') === id);
    });
  }
  tabs.forEach(function (b, i) {
    b.setAttribute('tabindex', b.classList.contains('on') ? '0' : '-1');
    b.addEventListener('click', function () { selectTab(b.getAttribute('data-tab')); });
    b.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(n.getAttribute('data-tab'), true);
    });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { en.target.classList.toggle('out', !en.isIntersecting); });
  }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.fd').forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('out');
    io.observe(el);
  });
})();
