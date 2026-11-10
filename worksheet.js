(function () {
  var key = 'ws-' + (document.body.getAttribute('data-ws') || 'sheet');
  var fields = Array.prototype.slice.call(document.querySelectorAll('.sheet input, .sheet textarea'));
  var saved = document.getElementById('saved');
  function load() {
    var d = null;
    try { d = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { d = null; }
    if (!d) return;
    fields.forEach(function (f, i) {
      if (!(i in d)) return;
      if (f.type === 'checkbox') f.checked = !!d[i]; else f.value = d[i];
    });
    if (saved) saved.textContent = '已載入上次填寫的內容';
  }
  var t;
  function save() {
    clearTimeout(t);
    t = setTimeout(function () {
      var d = {};
      fields.forEach(function (f, i) { d[i] = f.type === 'checkbox' ? f.checked : f.value; });
      try { localStorage.setItem(key, JSON.stringify(d)); if (saved) saved.textContent = '已暫存在本機'; }
      catch (e) { if (saved) saved.textContent = '此瀏覽器無法暫存，請記得列印'; }
    }, 400);
  }
  function grow(el) { if (el.tagName === 'TEXTAREA') { el.style.height = 'auto'; el.style.height = (el.scrollHeight + 2) + 'px'; } }
  fields.forEach(function (f) {
    f.addEventListener('input', function () { grow(f); save(); });
    f.addEventListener('change', save);
  });
  load();
  fields.forEach(grow);
  var c = document.getElementById('clearBtn');
  if (c) c.addEventListener('click', function () {
    if (c.getAttribute('data-armed') !== '1') {
      c.setAttribute('data-armed', '1'); c.textContent = '再按一次確認清除';
      setTimeout(function () { c.removeAttribute('data-armed'); c.textContent = '清除填寫'; }, 3000);
      return;
    }
    fields.forEach(function (f) { if (f.type === 'checkbox') f.checked = false; else f.value = ''; grow(f); });
    try { localStorage.removeItem(key); } catch (e) {}
    c.removeAttribute('data-armed'); c.textContent = '清除填寫';
    if (saved) saved.textContent = '已清除';
  });
})();
