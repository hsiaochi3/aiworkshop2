(function () {
  var toast = document.getElementById('toast');
  function say(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(say.t); say.t = setTimeout(function () { toast.classList.remove('show'); }, 1600);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, bad) {
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? ok() : bad(); } catch (e) { bad(e); }
      document.body.removeChild(ta);
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.copy');
    if (b) {
      copyText(b.getAttribute('data-copy')).then(function () {
        b.classList.add('done'); var o = b.textContent; b.textContent = '已複製';
        setTimeout(function () { b.classList.remove('done'); b.textContent = o; }, 1400);
        say('提示詞已複製，可以貼到 AI 對話框');
      }, function () { say('無法自動複製，請手動選取文字'); });
      return;
    }
    var lb = document.getElementById('lightbox');
    var z = e.target.closest('[data-zoom]');
    var o = e.target.closest('.orig');
    if ((z || o) && lb && lb.showModal) {
      e.preventDefault();
      lb.querySelector('img').src = z ? z.getAttribute('href') : o.getAttribute('data-slide');
      lb.querySelector('img').alt = z ? (z.querySelector('img').alt || '') : '原投影片';
      lb.showModal();
      return;
    }
    if (lb && (e.target === lb || e.target.closest('#lightbox .close'))) lb.close();
  });

  // highlight current section in the table of contents
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (links.length && 'IntersectionObserver' in window) {
    var map = {}; links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          var a = map[en.target.id]; if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('section.slide').forEach(function (s) { io.observe(s); });
  }
  if (window.matchMedia('(max-width:900px)').matches) {
    var d = document.querySelector('.toc details'); if (d) d.removeAttribute('open');
  }
})();
