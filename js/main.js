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
// ヒーロー用画像一覧（ディレクトリ内の実在ファイルに合わせる）
const HERO_IMAGES = [
  'IMG_7600.JPG','IMG_7602.JPG','IMG_7603.JPG','IMG_7604.JPG','IMG_7605.JPG','IMG_7606.JPG','IMG_7607.JPG','IMG_7608.JPG','IMG_7609.JPG','IMG_7610.JPG','IMG_7611.JPG','IMG_7612.JPG','IMG_7613.JPG','IMG_7615.JPG','IMG_7616.JPG','IMG_7617 2.JPG','IMG_7618.JPG','IMG_7619.JPG','IMG_7620.JPG','IMG_7621.JPG','IMG_7622.JPG','IMG_7623.JPG','IMG_7624.JPG','IMG_7625.JPG','IMG_7626.JPG','IMG_7627.JPG','IMG_7628.JPG',
  'LINE_ALBUM_20250207_251205_1.jpg','LINE_ALBUM_20250314_251205_1.jpg','LINE_ALBUM_20250430_251205_1.jpg','LINE_ALBUM_20250507_251205_1.jpg','LINE_ALBUM_20250528_251205_1.jpg','LINE_ALBUM_20250604_251205_1.jpg','LINE_ALBUM_20250613_251205_1.jpg','LINE_ALBUM_20250618_251205_1.jpg','LINE_ALBUM_20250725_251205_1.jpg','LINE_ALBUM_20250725_251205_2.jpg','LINE_ALBUM_20250725_251205_3.jpg','LINE_ALBUM_20250725_251205_4.jpg','LINE_ALBUM_20250725_251205_5.jpg','LINE_ALBUM_20250725_251205_6.jpg','LINE_ALBUM_20250903_251205_1.jpg','LINE_ALBUM_20251024_251205_1.jpg','LINE_ALBUM_20251128_251205_1.jpg','LINE_ALBUM_20251203_251205_1.jpg','LINE_ALBUM_20251203_251205_2.jpg','LINE_ALBUM_20251203_251205_3.jpg','LINE_ALBUM_20251203_251205_4.jpg','LINE_ALBUM_20251203_251205_5.jpg','LINE_ALBUM_20251203_251205_6.jpg','LINE_ALBUM_20251203_251205_7.jpg','LINE_ALBUM_20251204_251205_1.jpg','LINE_ALBUM_20251204_251205_2.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_1.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_10.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_11.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_12.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_2.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_3.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_4.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_5.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_6.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_7.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_8.jpg','LINE_ALBUM_パネルにしたい写真🤳_251205_9.jpg','LINE_ALBUM_専修大学ホップ収穫祭_251205_1.jpg',
];
// アニメーション
function createHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  // 既存の GSAP tween を停止
  try {
    if (window._heroTweens && window._heroTweens.length) {
      window._heroTweens.forEach(t => { try { t.kill && t.kill(); } catch(e){} });
      window._heroTweens = [];
    }
    // clear existing watchdog interval if any
    try { if (window._heroWatchdogInterval) { clearInterval(window._heroWatchdogInterval); window._heroWatchdogInterval = null; } } catch(e) {}
    // do not forcibly kill GSAP tweens here — letting tweens run avoids freezing/stalling
  } catch (e) { console.warn('tween cleanup failed', e); }
  container.innerHTML = '';
  const w = window.innerWidth;
  const h = window.innerHeight * 0.7;
  // 泡の数とサイズ（デフォルト）
  const count = Math.max(6, Math.floor(w / 140));
  const minSize = 48;
  const maxSize = 108;
  // 画像ファイル名リスト（top_images にある画像を参照）
  // HERO_IMAGES に混入しがちな動画ファイルなどを除外して安全に使う
  let images = (HERO_IMAGES || []).filter(name => /\.(jpe?g|png|gif|webp|svg)$/i.test(String(name || '')));
  if (images.length === 0) {
    // もしフィルタ後に画像が無ければフォールバックとして元配列を使う（警告を出す）
    images = HERO_IMAGES || [];
    console.warn('HERO_IMAGES contains no image files after filtering; falling back to original list.');
  }

    // 均等分布させるために格子（cols x rows）に分割し、各セル内でランダムに1つ生成します
    // これによりクラスタリングを減らし、泡が画面全体に広く散らばります。
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    let created = 0;
    const createdParticles = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (created >= count) break;
        const p = document.createElement('div');
        p.className = 'hero-particle';
        // サイズ（UI で指定した範囲）
        const size = Math.random() * (maxSize - minSize) + minSize;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;

        // セル内でランダムに位置（%）を割り当て（表示位置は targetTop に保存し、
        // 初期は下端(top:100%) から出現させる）
        const cellLeft = (c + Math.random()) / cols * 100;
        const cellTop = (r + Math.random()) / rows * 100;
        p.style.left = `${cellLeft}%`;
        p.dataset.targetTop = String(cellTop);
        p.style.top = `110%`; // 初期は下端よりさらに下に位置させる
        // 追加まえは見えないようにする（入場アニメ開始で visible にする）
        p.style.visibility = 'hidden';

        // アニメーション時間・遅延（CSS fallback 用）
        const duration = 18 + Math.random() * 14; // 18-32s
        p.style.animationDelay = `${Math.random() * 8}s`;
        p.style.animationDuration = `${duration}s`;

        // 少しの横ずれ・回転・スケール
        const tx = (Math.random() * 20 - 10).toFixed(2) + 'vw';
        const rot = (Math.random() * 16 - 8).toFixed(2) + 'deg';
        const s = (0.95 + Math.random() * 0.3).toFixed(2);
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--rot', rot);
        p.style.setProperty('--s', s);
        p.style.animationTimingFunction = 'ease-in-out';

        // 画像を背景に設定
        const img = images[Math.floor(Math.random() * images.length)];
        const url = `images/top_images/${encodeURIComponent(img)}`;
        p.style.backgroundImage = `url("${url}")`;
        p.style.backgroundSize = 'cover';
        p.style.backgroundPosition = 'center';
        p.style.backgroundRepeat = 'no-repeat';

        // 初期状態は下から出てくるように不透明度0にしておく
        p.style.opacity = '0';
        p.style.transform = 'none';
        p.style.boxShadow = '0 6px 18px rgba(0,0,0,0.10)';

        // mark creation time for pruning oldest
        p.dataset.createdAt = String(Date.now());
        container.appendChild(p);
        createdParticles.push(p);
        created++;
      }
    }
    // createdParticles をアクティブ配列へ登録して上限管理
    window._activeSpawned = window._activeSpawned || [];
    createdParticles.forEach(p => window._activeSpawned.push(p));
    const MAX_ACTIVE = 18;
    while (window._activeSpawned.length > MAX_ACTIVE) {
      const old = window._activeSpawned.shift();
      try { if (old && old.remove) old.remove(); } catch (e) {}
    }

    // GSAP があれば入口アニメーション（下から順に）→ 継続アニメ に移行
    try {
      if (window.gsap) {
        window._heroTweens = window._heroTweens || [];
        const particles = createdParticles;
        // CSS keyframes を無効化
        particles.forEach(p => { p.style.animation = 'none'; });

        // 下側の泡から順に現れるよう、targetTop の降順でソート
        const sorted = particles.slice().sort((a, b) => parseFloat(b.dataset.targetTop) - parseFloat(a.dataset.targetTop));

        sorted.forEach((p, i) => {
          const entranceDelay = i * 0.06; // 下から順に少しずつ遅らせる
          const entranceDur = 0.8 + Math.random() * 0.5;
          const targetOpacity = 0.68 + Math.random() * 0.14;
          // 入口アニメ（下から上に移動しつつフェードイン）
          const targetTop = p.dataset.targetTop || '80';
          window.gsap.to(p, { top: `${targetTop}%`, opacity: targetOpacity, duration: entranceDur, delay: entranceDelay, ease: 'power2.out', onStart: () => { try { p.style.visibility = 'visible'; } catch(e){} } });

          // 継続アニメは入口の後に始める（小さな遅延を付与）
          const upPx = Math.round((h * (0.6 + Math.random() * 0.8)));
          const mainDur = 14 + Math.random() * 14; // shorter main duration 14-28s
          // メインは1回だけ上昇して完了時に要素を削除（滞留防止）
          const mainTween = window.gsap.to(p, {
            y: `-=${upPx}`,
            x: (Math.random() * 120 - 60),
            rotation: (Math.random() * 40 - 20),
            opacity: 0.05 + Math.random() * 0.55,
            duration: mainDur,
            ease: 'none',
            delay: entranceDelay + entranceDur + 0.08,
            onComplete: () => {
              try {
                if (p && p.remove) p.remove();
                window._activeSpawned = (window._activeSpawned || []).filter(el => el !== p);
              } catch (e) {}
            }
          });
          window._heroTweens.push(mainTween);

          const sway = window.gsap.to(p, {
            x: `+=${Math.random() * 28 - 14}`,
            rotation: `+=${Math.random() * 8 - 4}`,
            scale: 0.97 + Math.random() * 0.08,
            duration: 3 + Math.random() * 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: entranceDelay + entranceDur + 0.08
          });
          window._heroTweens.push(sway);
        });
      } else {
        // GSAP が無ければ CSS フェード＋translate で代替（シンプルな stagger）
        const particles = createdParticles.slice().sort((a, b) => parseFloat(b.dataset.targetTop) - parseFloat(a.dataset.targetTop));
        particles.forEach((p, i) => {
          const tgt = p.dataset.targetTop || '80';
          const entranceDelay = i * 70;
          const entranceDur = 800 + Math.random() * 500; // ms
          const mainDur = 14000 + Math.random() * 14000; // ms
          setTimeout(() => {
            // make visible then transition
            try { p.style.visibility = 'visible'; } catch(e){}
            p.style.transition = `top ${entranceDur}ms cubic-bezier(.22,.9,.3,1), opacity ${entranceDur}ms ease`;
            p.style.top = `${tgt}%`;
            p.style.opacity = '0.78';
            // schedule removal after mainDur
            setTimeout(() => {
              try { p.remove(); } catch(e) {}
            }, mainDur + 400);
          }, entranceDelay);
        });
      }
    } catch (e) { console.warn('GSAP animation failed', e); }
    // 追加の spawn / watchdog は無効 — 初期バブルのみ表示する
}
window.addEventListener('DOMContentLoaded', createHeroParticles);
window.addEventListener('resize', createHeroParticles);

// createHeroParticles の呼び出し後に spawn ループを開始するため、create 内で呼ぶのではなく
// DOMContentLoaded 後に一度 create を走らせたのち、spawn ループが作られるようにしている。
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
