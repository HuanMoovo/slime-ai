// ============================================================
// AISlime — Internationalization (i18n)
// ============================================================

const I18N = {
  'zh': {
    'nav.featured': '精选',
    'nav.trending': '热门',
    'nav.daily': 'AI 日报',
    'nav.about': '关于',
    'hero.subtitle': 'AI 前沿动态 · 每日精选',
    'hero.desc': '多信源聚合 · 热度追踪 · 每日 AI 日报',
    'hero.sources': '信源',
    'hero.today': '今日更新',
    'hero.total': '总条目',
    'hot.label': '🔥 当前热点',
    'filter.all': '全部',
    'filter.model': '模型',
    'filter.product': '产品',
    'filter.industry': '行业',
    'filter.paper': '论文',
    'filter.tutorial': '教程',
    'search.placeholder': '搜索标题/摘要…',
    'search.btn': '🔍',
    'nav.title': '导航',
    'categories.title': '分类',
    'footer.desc': 'AI 前沿动态聚合平台 · 每日精选 · 多信源追踪',
    'hot.empty': '暂无热点',
    'card.read': '阅读',
  },
  'ja': {
    'nav.featured': '厳選',
    'nav.trending': '人気',
    'nav.daily': 'AI 日報',
    'nav.about': '概要',
    'hero.subtitle': 'AI 最新動向 · 日々の厳選',
    'hero.desc': '複数ソース集約 · トレンド追跡 · AI日報',
    'hero.sources': 'ソース',
    'hero.today': '本日の更新',
    'hero.total': '総記事数',
    'hot.label': '🔥 ホットトピック',
    'filter.all': 'すべて',
    'filter.model': 'モデル',
    'filter.product': 'プロダクト',
    'filter.industry': '業界',
    'filter.paper': '論文',
    'filter.tutorial': 'チュートリアル',
    'search.placeholder': 'タイトル/要約を検索…',
    'search.btn': '🔍',
    'nav.title': 'ナビゲーション',
    'categories.title': 'カテゴリー',
    'footer.desc': 'AI 最新動向アグリゲーター · 複数ソース追跡',
    'hot.empty': 'ホットトピックはありません',
    'card.read': '読む',
  },
  'en': {
    'nav.featured': 'Featured',
    'nav.trending': 'Trending',
    'nav.daily': 'AI Daily',
    'nav.about': 'About',
    'hero.subtitle': 'AI Frontier · Daily Curation',
    'hero.desc': 'Multi-source Aggregation · Heat Tracking · Daily AI Brief',
    'hero.sources': 'Sources',
    'hero.today': 'Today',
    'hero.total': 'Total Entries',
    'hot.label': '🔥 Hot Topics',
    'filter.all': 'All',
    'filter.model': 'Models',
    'filter.product': 'Products',
    'filter.industry': 'Industry',
    'filter.paper': 'Papers',
    'filter.tutorial': 'Tutorials',
    'search.placeholder': 'Search title/summary…',
    'search.btn': '🔍',
    'nav.title': 'Navigation',
    'categories.title': 'Categories',
    'footer.desc': 'AI Frontier News Aggregator · Multi-source Tracking',
    'hot.empty': 'No hot topics',
    'card.read': 'Read',
  }
};

// Date format per locale
const DATE_FORMAT = {
  'zh': (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getMonth()+1}月${d.getDate()}日`;
  },
  'ja': (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getMonth()+1}月${d.getDate()}日`;
  },
  'en': (dateStr) => {
    const d = new Date(dateStr);
    const enM = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${enM[d.getMonth()]} ${d.getDate()}`;
  }
};

let currentLang = 'zh';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Update all i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = I18N[lang]?.[key];
    if (text) el.textContent = text;
  });
  
  // Update placeholder elements
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const text = I18N[lang]?.[key];
    if (text) el.placeholder = text;
  });
  
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Re-render news
  if (window.renderNews) window.renderNews();
  // Re-render dates
  if (window.renderDates) window.renderDates();
}

function t(key) {
  return I18N[currentLang]?.[key] || key;
}
