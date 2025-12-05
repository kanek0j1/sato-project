(function initEventPager() {
  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const container = document.querySelector('.event-cards');
  const titleEl = document.querySelector('.event-month-title');
  const prevBtn = document.querySelector('.events-prev');
  const nextBtn = document.querySelector('.events-next');
  if (!container || !titleEl || !prevBtn || !nextBtn) return;

  const cards = Array.from(container.querySelectorAll('.event-card'));
  const monthMap = new Map();
  cards.forEach(card => {
    const m = parseInt(card.getAttribute('data-month'), 10);
    if (!monthMap.has(m)) monthMap.set(m, []);
    monthMap.get(m).push(card);
    card.style.display = 'none';
  });

  let currentMonth = new Date().getMonth() + 1;

  function showMonth(m) {
    cards.forEach(c => c.style.display = 'none');
    const list = monthMap.get(m) || [];
    list.forEach(c => c.style.display = '');
    titleEl.textContent = monthNames[(m - 1 + 12) % 12] + (list.length ? '' : '（予定なし）');
    container.setAttribute('data-current-month', String(m));
  }

  function step(delta) {
    currentMonth = ((currentMonth - 1 + delta + 12) % 12) + 1;
    showMonth(currentMonth);
  }

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  prevBtn.addEventListener('keydown', e => { if (e.key === 'Enter') step(-1); });
  nextBtn.addEventListener('keydown', e => { if (e.key === 'Enter') step(1); });

  // 初回表示（DOMContentLoadedを待つ）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => showMonth(currentMonth));
  } else {
    showMonth(currentMonth);
  }
})();