// Drawer menu
const menuBtn = document.querySelector('.menu-btn');
const navDrawer = document.querySelector('.nav-drawer');
const drawerBg = document.querySelector('.drawer-bg');
if(menuBtn && navDrawer && drawerBg) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.toggle('open');
    drawerBg.classList.toggle('open', isOpen);
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  drawerBg.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    drawerBg.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
}
// ハンバーガー　閉じる
navDrawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    drawerBg.classList.remove('open');
  });
});
// スクロール
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.section-card').forEach(sec => {
  observer.observe(sec);
});
// youtube
function makeYouTubeResponsive() {
  document.querySelectorAll('iframe[src*="youtube.com"]').forEach(iframe => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.paddingBottom = '56.25%';
    wrapper.style.height = '0';
    wrapper.style.overflow = 'hidden';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.parentNode.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);
  });
}
window.addEventListener('DOMContentLoaded', makeYouTubeResponsive);
const closeBtn = document.querySelector('.nav-drawer .close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    drawerBg.classList.remove('open');
  });
}
// スクロール時のフェードイン
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.creative-section').forEach(section => {
  sectionObserver.observe(section);
});
// メンバーカードのホバー拡大
document.querySelectorAll('.member-card.creative').forEach(card => {
  card.addEventListener('touchstart', function() {
    this.classList.add('hovered');
  });
  card.addEventListener('touchend', function() {
    this.classList.remove('hovered');
  });
});
// アニメーション
function createHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  container.innerHTML = '';
  const w = window.innerWidth;
  const h = window.innerHeight * 0.7;
  const count = Math.max(10, Math.floor(w / 80));
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = Math.random() * 32 + 16;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `-${size + Math.random()*40}px`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.background = `linear-gradient(120deg, #4db6ac${Math.random()<0.5?', #ffb74d':' ,#fffde7'})`;
    container.appendChild(p);
  }
}
window.addEventListener('DOMContentLoaded', createHeroParticles);
window.addEventListener('resize', createHeroParticles);
// メンバーカードの幅を画面幅に応じて調整
function adjustMemberCardWidth() {
  document.querySelectorAll('.member-row').forEach(row => {
    const cards = row.querySelectorAll('.member-card.creative');
    if (!cards.length) return;
    if (window.innerWidth <= 700) {
      // スマホ時幅を固定
      cards.forEach(card => { card.style.width = '32.33vw'; });
      row.style.gap = '1.1vw';
    } else {
      // PC時のみ自動幅調整
      row.style.gap = '';
      const w = row.clientWidth || window.innerWidth;
      let gap = parseFloat(getComputedStyle(row).gap) || 16;
      let n = cards.length;
      let width = Math.floor((w - gap * (n - 1)) / n);
      width = Math.max(160, Math.min(width, 180));
      cards.forEach(card => { card.style.width = width + 'px'; });
    }
  });
}
window.addEventListener('DOMContentLoaded', adjustMemberCardWidth);
window.addEventListener('resize', adjustMemberCardWidth);
function addPolaroidTapes() {
  document.querySelectorAll('.polaroid-wrap').forEach(wrap => {
    // 既存テープ削除
    wrap.querySelectorAll('.tape').forEach(t => t.remove());

    // テープ生成
    const tapeLeft = document.createElement('span');
    tapeLeft.className = 'tape tape-left';
    const tapeRight = document.createElement('span');
    tapeRight.className = 'tape tape-right';

    wrap.appendChild(tapeLeft);
    wrap.appendChild(tapeRight);

    // 画像サイズ取得
    const img = wrap.querySelector('img');
    if (img) {
      const updateTapePos = () => {
        const w = img.offsetWidth;
        const tapeHeight = 20;
        // // 画像の上端にほぼ貼り付くように
        // const tapeTop = (img.offsetTop || 0) - (tapeHeight / 2) + 4;
        // const edgeOffset = w * 0.02;
        // // 左テープ
        // tapeLeft.style.left = (edgeOffset - 10) + 'px';
        // tapeLeft.style.right = 'auto';
        // tapeLeft.style.top = (tapeTop + 18) + 'px';
        // tapeLeft.style.transform = 'rotate(-18deg)';
        // // 右テープ
        // tapeRight.style.right = edgeOffset + 'px';
        // tapeRight.style.left = 'auto';
        // tapeRight.style.top = tapeTop + 'px';
        // tapeRight.style.transform = 'rotate(8deg) scaleX(-1)';
        // 画像の上端にほぼ貼り付くように
        const tapeTop = (img.offsetTop || 0) - (tapeHeight / 2) + 4;
        const edgeOffset = w * 0.02;
        // 左テープ
        tapeLeft.style.left = (edgeOffset - 10) + 'px';
        tapeLeft.style.right = 'auto';
        tapeLeft.style.top = (tapeTop + 12) + 'px';
        tapeLeft.style.transform = 'rotate(-18deg)';
        // 右テープ
        tapeRight.style.right = (edgeOffset - 10) + 'px';
        tapeRight.style.left = 'auto';
        tapeRight.style.top = (tapeTop + 12) + 'px';
        tapeRight.style.transform = 'rotate(18deg) scaleX(-1)';
      };
      updateTapePos();
      window.addEventListener('resize', updateTapePos);
    }
  });
}
window.addEventListener('DOMContentLoaded', addPolaroidTapes);
window.addEventListener('resize', addPolaroidTapes);

