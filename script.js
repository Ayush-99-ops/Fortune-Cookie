(function () {
  'use strict';

  const FORTUNES = [
    'The river does not hurry, yet it reaches the sea. Neither should you.',
    'A door closes so you stop knocking and find the window.',
    'What you seek is also seeking you — probably in the junk drawer.',
    'Patience is not waiting; it is tending the garden while the seed decides.',
    'The moon waxes and wanes, but your worth is constant.',
    'Your aura is giving "I remembered the oven mid-shower."',
    'Someone is thinking about you. It is your dentist. It is always your dentist.',
    'You will find love. Or a really good sandwich. Both are valid.',
    'Avoid anyone who claps when the plane lands. Trust nothing else today.',
    'Your future holds great success and also losing one sock forever.',
    'The universe says: touch grass. Just a little. For legal reasons.',
    'You are the main character. Unfortunately it is a slow-burn indie film.',
    'A stranger will compliment your shoes. They will be wrong about the brand.',
    'Your villain era is cancelled. New era: confused but well-rested.',
    'If you can read this, you are not a cat. Congratulations.',
    'Your cache will be cleared. Emotionally and digitally.',
    '404: Future not found. Try refreshing in six months.',
    'You will go viral for something embarrassing. Frame it.',
    'Your Wi-Fi password contains the answer. It is "password123."',
    'An update is available for your life. Estimated time: unknown.',
    'The alignment of circumstances favors your next bold move.',
    'Energy flows where intention goes — yours is going somewhere interesting.',
    'A convergence of paths awaits at the intersection of courage and Tuesday.',
    'The cosmos whispers: the thing you almost did was the right thing.',
    'Transformation is not a destination. It is a vibe you are already carrying.',
    'Fortune favors the bold. Lucky numbers: 7, 14, 23.',
    'A windfall approaches on wings of possibility. Lucky numbers: 3, 18, 42.',
    'Serendipity is your co-pilot today. Lucky numbers: 9, 27, 51.',
    'The stars align in your favor this evening. Lucky numbers: 2, 11, 33.',
    'Abundance knocks softly. Answer the door. Lucky numbers: 5, 16, 88.',
    'You cracked a digital cookie. The real treasure was the localStorage all along.',
    'This fortune was randomly generated. So was your sense of purpose. Embrace it.',
    'You are reading text on a screen pretending to be paper. We are all pretending.',
    'Refresh the page and I will forget we ever met. I am okay with that.',
    'Share this fortune. The cookie gets commission. Just kidding. Cookies cannot sign contracts.',
  ];

  const STORAGE_KEY = 'fortuneCookieHistory';
  const MAX_HISTORY = 5;
  const CONFETTI_COLORS = ['#FF6B6B', '#FFD54F', '#FF4D8D', '#FF9F43', '#FFF8E7', '#E8A040'];
  const SPARKLE_CHARS = ['✦', '✧', '★', '☆', '🌟', '✨'];

  const stage = document.getElementById('cookie-stage');
  const fortuneReveal = document.getElementById('fortune-reveal');
  const fortuneText = document.getElementById('fortune-text');
  const hint = document.getElementById('cookie-hint');
  const resetBtn = document.getElementById('btn-reset');
  const shareBtn = document.getElementById('btn-share');
  const historyList = document.getElementById('history-list');
  const toast = document.getElementById('toast');
  const soundToggle = document.getElementById('sound-toggle');
  const sparklesEl = document.getElementById('sparkles');
  const confettiEl = document.getElementById('confetti');

  let isAnimating = false;
  let soundEnabled = false;
  let audioCtx = null;
  let lastFortune = '';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Ambient sparkles ── */
  function initSparkles() {
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.className = 'sparkle';
      el.textContent = SPARKLE_CHARS[i % SPARKLE_CHARS.length];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * 6) + 's';
      el.style.animationDuration = (4 + Math.random() * 4) + 's';
      el.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
      sparklesEl.appendChild(el);
    }
  }

  /* ── Confetti burst ── */
  function burstConfetti() {
    if (prefersReducedMotion) return;
    const count = 50;
    const cx = window.innerWidth / 2;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (cx + (Math.random() - 0.5) * 200) + 'px';
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = (6 + Math.random() * 8) + 'px';
      piece.style.animationDuration = (1.2 + Math.random() * 1) + 's';
      piece.style.animationDelay = (Math.random() * 0.3) + 's';
      confettiEl.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveHistory(fortune) {
    const history = getHistory();
    history.unshift({ text: fortune, time: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
    renderHistory();
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    });
  }

  function renderHistory() {
    const history = getHistory();
    if (history.length === 0) {
      historyList.innerHTML = '<p class="history-empty">No fortunes yet — go crack that cookie! 🍪</p>';
      return;
    }
    historyList.innerHTML = history.map((item, i) => {
      const rot = ((i % 3) - 1) * 0.8;
      return `<div class="history-slip" style="--rot:${rot}deg">${escapeHtml(item.text)}<time>${formatTime(item.time)}</time></div>`;
    }).join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function pickFortune() {
    let fortune;
    do {
      fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    } while (fortune === lastFortune && FORTUNES.length > 1);
    return fortune;
  }

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playRustleSound() {
    if (!soundEnabled || !audioCtx) return;
    const duration = 0.35;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * (1 - t * 0.5) * 0.15;
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2800;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.4;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    source.start();
  }

  function playChime() {
    if (!soundEnabled || !audioCtx) return;
    [523, 659, 784].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.08 + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.08);
      osc.stop(audioCtx.currentTime + i * 0.08 + 0.5);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function showFortune(fortune) {
    fortuneText.textContent = fortune;
    fortuneReveal.classList.remove('visible');
    fortuneReveal.offsetHeight; // reflow to restart animation
    fortuneReveal.classList.add('visible');
    fortuneReveal.setAttribute('aria-hidden', 'false');
  }

  function hideFortune() {
    fortuneReveal.classList.remove('visible');
    fortuneReveal.setAttribute('aria-hidden', 'true');
  }

  function crackCookie() {
    if (isAnimating || stage.classList.contains('cracking')) return;
    isAnimating = true;
    stage.classList.add('disabled');
    hideFortune();

    const fortune = pickFortune();
    lastFortune = fortune;
    fortuneText.textContent = fortune;

    hint.style.opacity = '0';
    hint.style.pointerEvents = 'none';

    if (prefersReducedMotion) {
      stage.classList.add('cracking');
      showFortune(fortune);
      burstConfetti();
      finishCrack(fortune);
      return;
    }

    stage.classList.add('shaking');
    playRustleSound();

    setTimeout(() => {
      stage.classList.remove('shaking');
      stage.classList.add('cracking');
    }, 300);

    setTimeout(() => {
      showFortune(fortune);
      burstConfetti();
      playChime();
    }, 550);

    setTimeout(() => finishCrack(fortune), 1100);
  }

  function finishCrack(fortune) {
    document.title = '🥠 ' + (fortune.length > 45 ? fortune.slice(0, 42) + '…' : fortune);
    saveHistory(fortune);
    resetBtn.classList.add('visible');
    isAnimating = false;
  }

  function resetCookie() {
    if (isAnimating) return;
    isAnimating = true;

    resetBtn.classList.remove('visible');
    hideFortune();

    if (prefersReducedMotion) {
      stage.classList.remove('cracking', 'resetting', 'disabled');
      hint.style.opacity = '';
      hint.style.pointerEvents = '';
      document.title = 'Fortune Cookie! 🥠';
      isAnimating = false;
      return;
    }

    stage.classList.add('resetting');
    stage.classList.remove('cracking');

    setTimeout(() => {
      stage.classList.remove('resetting', 'disabled');
      hint.style.opacity = '';
      hint.style.pointerEvents = '';
      document.title = 'Fortune Cookie! 🥠';
      isAnimating = false;
    }, 480);
  }

  async function shareFortune() {
    const text = fortuneText.textContent;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Fortune Cookie 🥠', text: text + '\n\n— fortunecookie' });
        return;
      } catch { /* clipboard fallback */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied! ✨');
    } catch {
      showToast('Could not copy — try selecting the text');
    }
  }

  stage.addEventListener('click', crackCookie);
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); crackCookie(); }
  });
  resetBtn.addEventListener('click', resetCookie);
  shareBtn.addEventListener('click', shareFortune);

  const ICON_MUTED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  const ICON_ON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';

  soundToggle.addEventListener('click', () => {
    initAudio();
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled ? ICON_ON : ICON_MUTED;
    soundToggle.classList.toggle('active', soundEnabled);
    soundToggle.setAttribute('aria-label', soundEnabled ? 'Mute sounds' : 'Enable sounds');
    soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  });

  initSparkles();
  renderHistory();
})();
