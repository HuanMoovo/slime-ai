// ============================================================
// AISlime — Main JavaScript
// ============================================================

// --- Particle Canvas Animation ---
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 60;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 2.5 + 0.5;
      this.alpha = Math.random() * 0.3 + 0.05;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.pulse += 0.02;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      const pulseAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,92,246,${pulseAlpha})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${(1 - dist / 180) * 0.06})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
}

// --- State ---
let activeFilter = 'all';
let currentView = 'featured';
let selectedDate = 'all'; // 'all' or 'YYYY-MM-DD'

// --- Date Navigation ---
function initDateNav() {
  const picker = document.getElementById('datePicker');
  const prev = document.getElementById('datePrev');
  const next = document.getElementById('dateNext');
  const todayBtn = document.getElementById('dateToday');
  if (!picker) return;

  function renderDates() {
    const dates = new Set();
    NEWS_DATA.forEach(dd => dates.add(dd.day));
    const sorted = [...dates].sort((a,b) => b.localeCompare(a));
    picker.innerHTML = '<button class="date-item ' + (selectedDate === 'all' ? 'active' : '') + '" data-date="all">' + (currentLang === 'en' ? 'All' : currentLang === 'ja' ? 'すべて' : '全部') + '</button>' +
      sorted.map(d => {
        const label = DATE_FORMAT[currentLang](d);
        return `<button class="date-item${selectedDate === d ? ' active' : ''} hasnews" data-date="${d}">${label}</button>`;
      }).join('');

    picker.querySelectorAll('.date-item').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDate = btn.dataset.date;
        renderDates();
        renderNews();
      });
    });
  }

  if (prev) prev.addEventListener('click', () => navigateDate(-1));
  if (next) next.addEventListener('click', () => navigateDate(1));
  if (todayBtn) todayBtn.addEventListener('click', () => {
    selectedDate = 'all';
    renderDates();
    renderNews();
  });

  renderDates();
}

function navigateDate(dir) {
  const dates = [...new Set(NEWS_DATA.map(dd => dd.day))].sort();
  if (selectedDate === 'all') {
    selectedDate = dates[0];
  } else {
    const idx = dates.indexOf(selectedDate);
    const newIdx = Math.max(0, Math.min(dates.length - 1, idx + dir));
    selectedDate = dates[newIdx];
  }
  renderDates();
  renderNews();
}

// Re-render dates on language change
function renderDates() {
  const picker = document.getElementById('datePicker');
  if (!picker) return;
  const dates = [...new Set(NEWS_DATA.map(dd => dd.day))].sort((a,b) => b.localeCompare(a));
  picker.innerHTML = '<button class="date-item ' + (selectedDate === 'all' ? 'active' : '') + '" data-date="all">' + (currentLang === 'en' ? 'All' : currentLang === 'ja' ? 'すべて' : '全部') + '</button>' +
    dates.map(d => {
      const label = DATE_FORMAT[currentLang](d);
      return `<button class="date-item${selectedDate === d ? ' active' : ''} hasnews" data-date="${d}">${label}</button>`;
    }).join('');
  picker.querySelectorAll('.date-item').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDate = btn.dataset.date;
      renderDates();
      renderNews();
    });
  });
}

// --- View Switching ---
function switchView(view) {
  currentView = view;
  // Update nav active state
  document.querySelectorAll('.main-nav a[data-view]').forEach(a => {
    a.classList.toggle('active', a.dataset.view === view);
  });
  // Update URL hash
  window.location.hash = view;
  renderNews();
}

// --- Tag translation helper ---
function tagI18n(tag) {
  const map = {
    zh: { model: '模型', product: '产品', industry: '行业', paper: '论文', tutorial: '教程', agent: '智能体' },
    ja: { model: 'モデル', product: 'プロダクト', industry: '業界', paper: '論文', tutorial: 'チュートリアル', agent: 'エージェント' },
    en: { model: 'Model', product: 'Product', industry: 'Industry', paper: 'Paper', tutorial: 'Tutorial', agent: 'Agent' }
  };
  return map[currentLang]?.[tag] || tag;
}

// --- Render Timeline ---
function renderNews() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  let html = '';
  let totalItems = 0;
  let todayCount = 0;
  const today = new Date().toISOString().split('T')[0];
  const hotItems = [];

  if (currentView === 'trending') {
    // Trending view: collect all items, filter by heat >= 60, sort by heat desc
    const allItems = [];
    NEWS_DATA.forEach(dd => {
      dd.items.forEach(item => {
        if (activeFilter === 'all' || item.tags.includes(activeFilter)) {
          allItems.push({ ...item, day: dd.day });
        }
      });
    });
    allItems.sort((a, b) => b.heat - a.heat);

    if (allItems.length > 0) {
      totalItems = allItems.length;
      html += `<div class="timeline-day">
        <div class="day-header">
          <h2>🔥 ${currentLang === 'zh' ? '热门排行' : currentLang === 'ja' ? '人気ランキング' : 'Trending'}</h2>
          <span class="day-count">${allItems.length} ${currentLang === 'en' ? 'items' : '件'}</span>
        </div>
        <div class="day-body">`;

      allItems.forEach((item, idx) => {
        const content = item[currentLang] || item.zh;
        const heatColor = item.heat >= 90 ? '#ef4444' : item.heat >= 80 ? '#f59e0b' : '#22c55e';
        const rank = idx + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

        html += `<div class="news-card" onclick="window.open('${item.url}','_blank')">
          <div class="card-main">
            <div class="card-header">
              <span class="card-source">${item.source}</span>
              <span class="card-time">${item.day.slice(5)} ${item.time}</span>
            </div>
            <div class="card-title">${medal} ${content.title}</div>
            <div class="card-tags">
              ${item.tags.map(t => `<span class="card-tag ${t}">${tagI18n(t)}</span>`).join('')}
            </div>
          </div>
          <div class="card-side">
            <span class="card-heat" style="color:${heatColor}">${item.heat}</span>
            <span class="card-heat-label">${currentLang === 'en' ? 'heat' : '热度'}</span>
          </div>
        </div>`;
      });
      html += `</div></div>`;
    }
    timeline.innerHTML = html;
    document.getElementById('todayCount').textContent = todayCount;
    document.getElementById('totalArticles').textContent = totalItems;
    renderHotItems(hotItems);
    return;
  }

  // featured / daily view
  NEWS_DATA.forEach((dayData) => {
    const dayStr = dayData.day;
    let items = dayData.items.filter(item => {
      if (activeFilter === 'all') return true;
      return item.tags.includes(activeFilter);
    });

    // View filtering
    if (currentView === 'daily' && dayStr !== today) return;
    if (selectedDate !== 'all' && dayStr !== selectedDate) return;
    if (items.length === 0) return;
    totalItems += items.length;
    if (dayStr === today) todayCount += items.length;

    const dateLabel = DATE_FORMAT[currentLang](dayStr);
    const isToday = dayStr === today;
    const dayLabel = isToday
      ? (currentLang === 'en' ? 'Today' : currentLang === 'ja' ? '今日' : '今天')
      : dateLabel;

    html += `<div class="timeline-day">
      <div class="day-header" onclick="toggleDay(this)">
        <h2>${isToday ? '📌 ' : '📅 '} ${dayLabel}</h2>
        <span class="day-count">${items.length} ${currentLang === 'en' ? 'items' : '件'}</span>
        <span class="collapse-icon">▼</span>
      </div>
      <div class="day-body">`;

    items.forEach(item => {
      const content = item[currentLang] || item.zh;
      const heatColor = item.heat >= 90 ? '#ef4444' : item.heat >= 80 ? '#f59e0b' : '#22c55e';

      html += `<div class="news-card" onclick="window.open('${item.url}','_blank')">
        <div class="card-main">
          <div class="card-header">
            <span class="card-source">${item.source}</span>
            <span class="card-time">${item.time}</span>
          </div>
          <div class="card-title">${content.title}</div>
          <div class="card-tags">
            ${item.tags.map(t => `<span class="card-tag ${t}">${tagI18n(t)}</span>`).join('')}
          </div>
        </div>
        <div class="card-side">
          <span class="card-heat" style="color:${heatColor}">${item.heat}</span>
          <span class="card-heat-label">${currentLang === 'en' ? 'heat' : '热度'}</span>
        </div>
      </div>`;

      if (hotItems.length < 5) {
        hotItems.push({ title: content.title, source: item.source });
      }
    });
    html += `</div></div>`;
  });

  timeline.innerHTML = html;
  document.getElementById('todayCount').textContent = todayCount;
  document.getElementById('totalArticles').textContent = totalItems;
  renderHotItems(hotItems);
}

function renderHotItems(items) {
  const container = document.getElementById('hotItems');
  if (!container) return;
  if (items.length === 0) {
    container.innerHTML = `<span class="hot-item">暂无热点</span>`;
    return;
  }
  container.innerHTML = items.map(item =>
    `<span class="hot-item">🔥 ${item.title} <span class="hot-source">· ${item.source}</span></span>`
  ).join('');
}

function toggleDay(header) {
  header.classList.toggle('collapsed');
  const body = header.nextElementSibling;
  if (body) body.classList.toggle('collapsed');
}

// --- Language ---
function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

// --- Theme ---
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const saved = localStorage.getItem('aislime-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  updateLogo();
  
  toggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aislime-theme', next);
    updateLogo();
  });
}

function updateLogo() {
  const theme = document.documentElement.getAttribute('data-theme');
  const logoImg = document.querySelector('.logo-img');
  const heroImg = document.querySelector('.hero-slime-img');
  const src = theme === 'light' ? 'images/logo-light.svg' : 'images/logo.svg';
  if (logoImg) logoImg.src = src;
  if (heroImg) heroImg.src = src;
}

// --- Filter ---
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderNews();
    });
  });
}

// --- Search ---
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.news-card').forEach(card => {
      card.style.display = q === '' || card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.day-body').forEach(body => {
      const visible = [...body.querySelectorAll('.news-card')].some(c => c.style.display !== 'none');
      const header = body.previousElementSibling;
      if (header) header.style.display = visible ? '' : 'none';
    });
  });
}

// --- Mobile Nav ---
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// --- Scroll Top ---
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initLanguage();
  initTheme();
  initFilters();
  initDateNav();
  initMobileNav();
  initScrollTop();

  // Check URL hash for initial view
  const hash = window.location.hash.replace('#', '');
  if (['featured', 'trending', 'daily'].includes(hash)) {
    switchView(hash);
  } else {
    renderNews();
  }

  setTimeout(initSearch, 100);
});
