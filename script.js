/* ===================================================
   주간 리그 - script.js
   =================================================== */

/* ---- MOCK DATA ---- */
const CURRENT_USER_ID = 2;

// 리그 종료 시각: 현재로부터 3일 10시간 33분 뒤
const endTime = new Date(Date.now() + ((3 * 24 * 60 + 10 * 60 + 33) * 60 * 1000));

const PROMOTION_THRESHOLD = 3;   // 1~3위: 승급
const DEMOTION_THRESHOLD  = 17;  // 17~20위: 강등

// 배지 색상 팔레트
const BADGE_COLORS = [
  '#FF6B6B', '#FF9F43', '#FECA57', '#1DD1A1',
  '#48DBFB', '#A29BFE', '#FD79A8', '#6C5CE7',
  '#00B894', '#E17055',
];

const participants = [
  {
    id: 1, rank: 1,
    name: '쥬르먹는 고양이',
    tier: '1레벨 완주자',
    emoji: '🐱',
    badges: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    bestRecord: '🏆',
    exp: 3100,
  },
  {
    id: 2, rank: 2,
    name: '행복한 다람쥐',
    tier: '골드 리그 입성',
    emoji: '🐿️',
    badges: [2, 5, 8, 3, 1, 9, 4],
    bestRecord: '🏆',
    exp: 3000,
  },
  {
    id: 3, rank: 3,
    name: '건물주 강아지',
    tier: '',
    emoji: '🐶',
    badges: [1, 4, 7, 2],
    bestRecord: null,
    exp: 2800,
  },
  {
    id: 4, rank: 4,
    name: '도전하는 지성 배고픈 다람쥐',
    tier: '',
    emoji: '🦫',
    badges: [],
    bestRecord: '🏆',
    exp: 2700,
  },
  {
    id: 5, rank: 5,
    name: '잠오는 다람쥐',
    tier: '',
    emoji: '😴',
    badges: [3, 6],
    bestRecord: null,
    exp: 2600,
  },
  {
    id: 6, rank: 6,
    name: '독서왕 문어',
    tier: '',
    emoji: '🐙',
    badges: [5, 8],
    bestRecord: null,
    exp: 2500,
  },
  {
    id: 7, rank: 7,
    name: '새벽감성 고슴도치',
    tier: '',
    emoji: '🦔',
    badges: [1],
    bestRecord: null,
    exp: 2450,
  },
  {
    id: 8, rank: 8,
    name: '달리는 토끼',
    tier: '',
    emoji: '🐰',
    badges: [2, 4, 6],
    bestRecord: null,
    exp: 2390,
  },
  {
    id: 9, rank: 9,
    name: '지각쟁이 판다',
    tier: '',
    emoji: '🐼',
    badges: [],
    bestRecord: null,
    exp: 2300,
  },
  {
    id: 10, rank: 10,
    name: '야근왕 부엉이',
    tier: '',
    emoji: '🦉',
    badges: [7, 9],
    bestRecord: null,
    exp: 2210,
  },
  {
    id: 11, rank: 11,
    name: '산책중인 거북이',
    tier: '',
    emoji: '🐢',
    badges: [0],
    bestRecord: null,
    exp: 2150,
  },
  {
    id: 12, rank: 12,
    name: '커피중독 비버',
    tier: '',
    emoji: '🦫',
    badges: [],
    bestRecord: null,
    exp: 2080,
  },
  {
    id: 13, rank: 13,
    name: '주말전사 여우',
    tier: '',
    emoji: '🦊',
    badges: [3, 5],
    bestRecord: null,
    exp: 2000,
  },
  {
    id: 14, rank: 14,
    name: '공부하는 펭귄',
    tier: '',
    emoji: '🐧',
    badges: [],
    bestRecord: null,
    exp: 1900,
  },
  {
    id: 15, rank: 15,
    name: '느긋한 나무늘보',
    tier: '',
    emoji: '🦥',
    badges: [],
    bestRecord: null,
    exp: 1750,
  },
  {
    id: 16, rank: 16,
    name: '긴장한 고슴도치',
    tier: '',
    emoji: '🦔',
    badges: [],
    bestRecord: null,
    exp: 1600,
  },
  {
    id: 17, rank: 17,
    name: '열일하는 기획자',
    tier: '',
    emoji: '💼',
    badges: [0, 2, 5, 1, 8, 3],
    bestRecord: '🏆',
    exp: 2400,
  },
  {
    id: 18, rank: 18,
    name: '열정의 디자이너',
    tier: '',
    emoji: '🎨',
    badges: [],
    bestRecord: null,
    exp: 0,
  },
  {
    id: 19, rank: 19,
    name: '불멸의 개발자',
    tier: '',
    emoji: '💻',
    badges: [],
    bestRecord: null,
    exp: 0,
  },
  {
    id: 20, rank: 20,
    name: '포효하는 수달',
    tier: '',
    emoji: '🦦',
    badges: [],
    bestRecord: null,
    exp: 0,
  },
];

const rewardData = [
  { range: '1', display: '1',     stars: 30 },
  { range: '2', display: '2',     stars: 20 },
  { range: '3', display: '3',     stars: 15 },
  { range: '4~10', display: '4~10', stars: 5 },
  { range: '11~20', display: '11~20', stars: 1 },
  { range: '0 EXP', display: '0 EXP', stars: 0 },
];


/* ---- HELPERS ---- */

function buildBadgesHtml(badges) {
  if (!badges || badges.length === 0) {
    return '<span class="no-badge">없음</span>';
  }
  const show = badges.slice(0, 3);
  const rest = badges.length - 3;
  let html = '<div class="badges-cell">';
  show.forEach(colorIdx => {
    const color = BADGE_COLORS[colorIdx % BADGE_COLORS.length];
    html += `<span class="badge-dot" style="background:${color}" title="배지"></span>`;
  });
  if (rest > 0) {
    html += `<span class="badge-more">+${rest}</span>`;
  }
  html += '</div>';
  return html;
}

function rankBadgeClass(rank) {
  if (rank === 1)  return 'rank-1';
  if (rank === 2)  return 'rank-2';
  if (rank === 3)  return 'rank-3';
  if (rank === 0)  return 'rank-zero';
  return 'rank-other';
}

function getRewardForRank(rank, exp) {
  if (exp === 0) return 0;
  if (rank === 1) return 30;
  if (rank === 2) return 20;
  if (rank === 3) return 15;
  if (rank <= 10) return 5;
  if (rank <= 20) return 1;
  return 0;
}

function rangeContains(range, rank) {
  if (range === '1')      return rank === 1;
  if (range === '2')      return rank === 2;
  if (range === '3')      return rank === 3;
  if (range === '4~10')   return rank >= 4 && rank <= 10;
  if (range === '11~20')  return rank >= 11 && rank <= 20;
  if (range === '0 EXP')  return false;
  return false;
}


/* ---- LEADERBOARD RENDER ---- */

function renderLeaderboard() {
  const tbody = document.getElementById('leagueTableBody');
  if (!tbody) return;

  const current = participants.find(p => p.id === CURRENT_USER_ID);
  const currentRank = current ? current.rank : -1;
  let html = '';

  // Determine which rows are "hidden" (ranks 6~16)
  const collapsedIds = new Set(
    participants.filter(p => p.rank >= 6 && p.rank <= 16).map(p => p.id)
  );

  participants.forEach((p, idx) => {
    const isMe = p.id === CURRENT_USER_ID;
    const isHidden = collapsedIds.has(p.id);

    // --- Promotion divider (after rank 3) ---
    if (p.rank === 4) {
      html += `
        <tr class="divider-row">
          <td colspan="5">
            <div class="promotion-divider">
              ▲ 다음 주간 리그 승급 대상 ▲
            </div>
          </td>
        </tr>`;
    }

    // --- Omit section start (before rank 6) ---
    if (p.rank === 6) {
      html += `
        <tr class="omit-row" id="omitRow">
          <td colspan="5">
            <span>중략</span>
            <button class="toggle-btn" id="toggleBtn" onclick="toggleHidden()">펼치기</button>
          </td>
        </tr>`;
    }

    // --- Regular row ---
    const rankBadge = p.rank > 0
      ? `<span class="rank-badge ${rankBadgeClass(p.rank)}">${p.rank}</span>`
      : `<span class="rank-badge rank-zero">-</span>`;

    const meBadge = isMe ? `<span class="me-badge">ME!</span>` : '';

    const bestCell = p.bestRecord
      ? `<span class="record-cell">${p.bestRecord}</span>`
      : `<span class="record-none">없음</span>`;

    const expCell = p.exp > 0
      ? `<span class="exp-cell">EXP ${p.exp.toLocaleString()}</span>`
      : `<span class="exp-cell exp-zero">EXP 0</span>`;

    html += `
      <tr class="${isMe ? 'row-me' : ''} ${isHidden ? 'row-hidden' : ''}" data-hidden="${isHidden ? 'true' : 'false'}">
        <td class="rank-cell">${rankBadge}${meBadge}</td>
        <td>
          <div class="profile-cell">
            <div class="profile-avatar">${p.emoji}</div>
            <div class="profile-info">
              <div class="profile-name">${p.name}</div>
              ${p.tier ? `<div class="profile-tier">${p.tier}</div>` : ''}
            </div>
          </div>
        </td>
        <td>${buildBadgesHtml(p.badges)}</td>
        <td>${bestCell}</td>
        <td>${expCell}</td>
      </tr>`;

    // --- Demotion divider (before rank 17) ---
    if (p.rank === 16) {
      html += `
        <tr class="divider-row">
          <td colspan="5">
            <div class="demotion-divider">
              ▼ 다음 주간 리그 강등 대상 ▼
            </div>
          </td>
        </tr>`;
    }
  });

  tbody.innerHTML = html;
}


/* ---- TOGGLE HIDDEN ROWS ---- */

let isExpanded = false;

function toggleHidden() {
  isExpanded = !isExpanded;
  const rows = document.querySelectorAll('[data-hidden="true"]');
  rows.forEach(row => {
    row.style.display = isExpanded ? '' : 'none';
  });

  // Also hide/show the omit indicator row
  const omitRow = document.getElementById('omitRow');
  const btn = document.getElementById('toggleBtn');
  if (omitRow) omitRow.style.display = isExpanded ? 'none' : '';
  if (btn) btn.textContent = isExpanded ? '접기' : '펼치기';
}


/* ---- REWARD TABLE RENDER ---- */

function renderRewardTable() {
  const tbody = document.getElementById('rewardTableBody');
  if (!tbody) return;

  const current = participants.find(p => p.id === CURRENT_USER_ID);
  const currentRank = current ? current.rank : -1;
  const currentExp  = current ? current.exp  : 0;

  let html = '';
  rewardData.forEach(item => {
    const isMe = rangeContains(item.range, currentRank) ||
                 (item.range === '0 EXP' && currentExp === 0);

    let rankBadgeHtml;
    if (item.range === '1')      rankBadgeHtml = `<span class="reward-rank-badge reward-rank-1">1</span>`;
    else if (item.range === '2') rankBadgeHtml = `<span class="reward-rank-badge reward-rank-2">2</span>`;
    else if (item.range === '3') rankBadgeHtml = `<span class="reward-rank-badge reward-rank-3">3</span>`;
    else if (item.range === '0 EXP') rankBadgeHtml = `<span class="reward-rank-badge reward-rank-zero">0 EXP</span>`;
    else rankBadgeHtml = `<span class="reward-rank-badge reward-rank-range">${item.display}</span>`;

    const starsClass = item.stars === 0 ? 'reward-stars dim' : 'reward-stars';

    html += `
      <tr class="${isMe ? 'reward-row-me' : ''}">
        <td>${rankBadgeHtml}</td>
        <td>
          <div class="${starsClass}">
            <span class="star">★</span>
            <span>${item.stars}</span>
          </div>
        </td>
      </tr>`;
  });

  tbody.innerHTML = html;
}


/* ---- COUNTDOWN TIMER ---- */

function formatCountdown(ms) {
  if (ms <= 0) return '종료됨';
  const totalSec = Math.floor(ms / 1000);
  const days     = Math.floor(totalSec / 86400);
  const hours    = Math.floor((totalSec % 86400) / 3600);
  const minutes  = Math.floor((totalSec % 3600) / 60);
  const seconds  = totalSec % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  if (days > 0) return `${days}일 ${hh}:${mm}:${ss}`;
  return `${hh}:${mm}:${ss}`;
}

function updateCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  el.textContent = formatCountdown(endTime - Date.now());
}


/* ---- INFO TOOLTIP (touch fallback) ---- */

function initInfoTooltip() {
  const btn     = document.getElementById('infoBtn');
  const tooltip = document.getElementById('infoTooltip');
  if (!btn || !tooltip) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const visible = tooltip.style.display === 'block';
    tooltip.style.display = visible ? 'none' : 'block';
  });

  document.addEventListener('click', () => {
    tooltip.style.display = 'none';
  });
}


/* ---- MODAL ---- */

let currentSlide = 0;

function initModal() {
  const overlay   = document.getElementById('guideModal');
  const openBtn   = document.getElementById('guideBtn');
  const closeBtn  = document.getElementById('modalClose');
  const prevBtn   = document.getElementById('prevSlide');
  const nextBtn   = document.getElementById('nextSlide');
  const dotsWrap  = document.getElementById('slideDots');
  const slides    = document.querySelectorAll('.slide');

  if (!overlay || !openBtn) return;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slide-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `슬라이드 ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dotsWrap.children[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dotsWrap.children[currentSlide].classList.add('active');
  }

  openBtn.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (overlay.classList.contains('open')) {
      if (e.key === 'ArrowLeft')  goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    }
  });

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}


/* ---- MY STATS ---- */

function renderMyStats() {
  const current = participants.find(p => p.id === CURRENT_USER_ID);
  if (!current) return;

  const expEl  = document.getElementById('myExp');
  const rankEl = document.getElementById('myRank');
  if (expEl)  expEl.textContent  = current.exp.toLocaleString();
  if (rankEl) rankEl.textContent = `${current.rank}위`;
}


/* ---- INIT ---- */

document.addEventListener('DOMContentLoaded', () => {
  renderMyStats();
  renderLeaderboard();
  renderRewardTable();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initInfoTooltip();
  initModal();
});
