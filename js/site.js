/* 莊柏軒個人網站：手機選單、導覽列霧化、區塊淡入淡出 */
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

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { en.target.classList.toggle('out', !en.isIntersecting); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fd').forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('out');
    io.observe(el);
  });
})();
