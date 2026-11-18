/* 莊柏軒作品集網站：頂端列霧化、類別導覽、複製信箱、圖片放大、淡入淡出 */
(function () {
  var bar = document.querySelector('.topbar');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (bar) bar.classList.toggle('frost', y > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 左側類別導覽：標出目前看到的類別
  var links = Array.prototype.slice.call(document.querySelectorAll('.catnav a'));
  if (links.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('.cat[id]').forEach(function (s) { spy.observe(s); });
  }

  // 複製信箱：無法寫入剪貼簿時改為選取文字
  document.querySelectorAll('.copy[data-copy]').forEach(function (b) {
    var hint = b.querySelector('.copy-hint'), label = hint ? hint.textContent : '';
    b.addEventListener('click', function () {
      function done(t) { if (hint) { hint.textContent = t; setTimeout(function () { hint.textContent = label; }, 1800); } }
      function pick() {
        var r = document.createRange(); r.selectNodeContents(b.querySelector('.copy-txt'));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); done('已選取');
      }
      try { navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done('已複製'); }, pick); }
      catch (err) { pick(); }
    });
  });

  // 作品畫面放大檢視
  var lb = document.querySelector('.lb');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.zoom[data-full]').forEach(function (z) {
      z.addEventListener('click', function () {
        lbImg.src = z.getAttribute('data-full');
        lbImg.alt = (z.querySelector('img') || {}).alt || '';
        lb.showModal();
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  } else {
    document.querySelectorAll('.zoom').forEach(function (z) { z.style.cursor = 'default'; });
  }

  // 捲動淡入淡出：區塊只要進入畫面就顯示
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { en.target.classList.toggle('out', !en.isIntersecting); });
  }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.fd').forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('out');
    io.observe(el);
  });
})();

/* 第四版：選單標出目前區塊、聯絡表單以 Email 寄出 */
(function () {
  var nav = Array.prototype.slice.call(document.querySelectorAll('.topnav a[href^="#"]'));
  if (nav.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id === 'all' ? 'portfolio' : en.target.id;
        nav.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'services', 'portfolio', 'all', 'about', 'contact'].forEach(function (id) {
      var s = document.getElementById(id); if (s) io.observe(s);
    });
  }
  // 聯絡表單：預設開啟 LINE 官方帳號並帶入訊息；也可改用 Email
  var f = document.querySelector('.form4');
  if (f) f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var g = function (n) { return (f.elements[n].value || '').trim(); };
    var via = (ev.submitter && ev.submitter.value) || 'line';
    var body = '您好，我想洽詢合作\n姓名：' + g('name') + '\n信箱：' + g('email') + '\n合作類型：' + (g('type') || '未選擇') + '\n\n' + g('msg');
    if (via === 'mail') {
      var subject = '合作洽詢' + (g('type') ? '：' + g('type') : '') + '（' + g('name') + '）';
      location.href = 'mailto:' + f.getAttribute('data-mail') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    } else {
      location.href = 'https://line.me/R/oaMessage/' + encodeURIComponent(f.getAttribute('data-line')) + '/?' + encodeURIComponent(body);
    }
  });
  // 複製信箱（第四版按鈕）
  document.querySelectorAll('.copy4[data-copy]').forEach(function (b) {
    var hint = b.querySelector('.copy-hint'), label = hint.textContent;
    b.addEventListener('click', function () {
      function done(t) { hint.textContent = t; setTimeout(function () { hint.textContent = label; }, 1800); }
      try { navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done('已複製'); }, function () { done('請手動複製'); }); }
      catch (err) { done('請手動複製'); }
    });
  });
})();
