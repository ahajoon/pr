/* 든든한웹전문가 형준 포트폴리오 — 공통 스크립트 (바닐라 JS) */
(function () {
  'use strict';
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* 미리보기 화면 스크롤을 맨 위로 */
  function resetPreviews(root) {
    $$('[aria-label$="스크롤 가능"]', root).forEach(function (el) { el.scrollTop = 0; });
  }
  function resetSoon(root) { [0, 60, 250].forEach(function (ms) { setTimeout(function () { resetPreviews(root); }, ms); }); }

  /* ---------- 모바일 메뉴 ---------- */
  var header = document.querySelector('[data-header]');
  function setMenu(open) {
    if (!header) return;
    header.classList.toggle('menu-open', open);
    $$('[data-action="menu"]').forEach(function (b) {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : e.target.parentElement;
    if (!t) return;

    var menuBtn = t.closest('[data-action="menu"]');
    if (menuBtn) { setMenu(!header.classList.contains('menu-open')); return; }
    if (t.closest('.mob-menu a')) setMenu(false);

    /* 대표 작업 슬라이드 */
    var nav = t.closest('[data-action="prev"],[data-action="next"]');
    if (nav) { moveSlide(nav.getAttribute('data-action') === 'next' ? 1 : -1); return; }

    /* 프로젝트 선택 */
    var pick = t.closest('[data-pick]');
    if (pick) { pickProject(pick.getAttribute('data-pick')); return; }

    /* PC·태블릿·모바일 전환 */
    var dev = t.closest('[data-device-set]');
    if (dev) {
      var box = dev.closest('[data-device]');
      if (box) { box.setAttribute('data-device', dev.getAttribute('data-device-set')); resetSoon(box); }
      return;
    }
  });
  window.addEventListener('resize', function () { if (window.innerWidth >= 768) setMenu(false); });

  /* ---------- 슬라이드 ---------- */
  var slides = $$('[data-slide]');
  var cur = 0;
  function moveSlide(step) {
    if (!slides.length) return;
    slides[cur].classList.remove('is-cur');
    cur = (cur + step + slides.length) % slides.length;
    slides[cur].classList.add('is-cur');
  }

  /* ---------- 프로젝트 목록 / 미리보기 ---------- */
  function pickProject(id) {
    $$('[data-k]').forEach(function (li) {
      if (li.closest('nav[aria-label="프로젝트 선택"]')) li.classList.toggle('is-on', li.getAttribute('data-k') === id);
    });
    $$('[data-panel]').forEach(function (p) {
      var on = p.getAttribute('data-panel') === id;
      p.classList.toggle('is-cur', on);
      if (on) { p.setAttribute('data-device', 'desktop'); resetSoon(p); }
    });
  }

  /* ---------- 상단 메뉴 활성 표시 (스크롤 위치) ---------- */
  var menuKeys = ['about', 'projects', 'all-projects', 'work', 'skills', 'career'];
  function setActive(id) {
    $$('header [data-k]').forEach(function (li) { li.classList.toggle('is-on', li.getAttribute('data-k') === id); });
  }
  var sections = menuKeys.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }
  $$('header [data-k] a').forEach(function (a) {
    a.addEventListener('click', function () { setActive(a.closest('[data-k]').getAttribute('data-k')); });
  });

  /* 새로고침·뒤로가기 때도 미리보기는 맨 위에서 시작 */
  window.addEventListener('pageshow', function () { [0, 60, 250, 600, 1200].forEach(function (ms) { setTimeout(resetPreviews, ms); }); });
})();
