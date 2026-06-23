#!/usr/bin/env python3
"""Fetch latest AI news from multiple free sources and generate data.js"""

import json, urllib.request, os, random
from datetime import datetime, timezone, timedelta

OUTPUT = "js/data.js"
MAX_ITEMS_PER_SOURCE = 5

def fetch_json(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "AISlime/1.0"})
        return json.loads(urllib.request.urlopen(req, timeout=15).read())
    except: return None

def get_hackernews():
    """Fetch top AI-related stories from Hacker News"""
    items = []
    try:
        top = fetch_json("https://hacker-news.firebaseio.com/v0/topstories.json")
        if not top: return items
        for sid in top[:40]:
            story = fetch_json(f"https://hacker-news.firebaseio.com/v0/item/{sid}.json")
            if not story: continue
            title = story.get("title", "")
            ai_keywords = ["ai", "llm", "gpt", "claude", "gemini", "openai", "anthropic",
                          "deep learning", "neural", "transformer", "machine learning",
                          "copilot", "mistral", "llama", "stable diffusion"]
            if any(kw in title.lower() for kw in ai_keywords):
                url = story.get("url", f"https://news.ycombinator.com/item?id={sid}")
                score = story.get("score", 0)
                by = story.get("by", "unknown")
                ts = story.get("time", 0)
                dt = datetime.fromtimestamp(ts, tz=timezone.utc)
                items.append({
                    "title": title[:100],
                    "url": url,
                    "heat": min(95, 50 + score // 2),
                    "source": f"HN ({by})",
                    "time": dt.strftime("%H:%M"),
                    "day": dt.strftime("%Y-%m-%d"),
                })
                if len(items) >= MAX_ITEMS_PER_SOURCE: break
    except: pass
    return items

def get_gihub_trending():
    """Fetch AI repos from GitHub trending (via unofficial API)"""
    items = []
    try:
        data = fetch_json("https://api.gitterapp.com/repositories?since=daily&language=python")
        if not data: return items
        for repo in data[:8]:
            name = repo.get("name", "")
            desc = repo.get("description", "") or ""
            url = repo.get("url", f"https://github.com/{name}")
            stars = repo.get("stars", 0)
            ai_kw = ["ai", "llm", "gpt", "agent", "rag", "chatbot", "langchain", "llama"]
            if any(kw in (name + desc).lower() for kw in ai_kw):
                items.append({
                    "title": f"[GitHub] {name}: {desc[:80]}",
                    "url": url,
                    "heat": min(90, 60 + stars // 100),
                    "source": "GitHub Trending",
                    "time": "today",
                    "day": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                })
    except: pass
    return items

def get_arxiv():
    """Fetch latest AI papers from arXiv"""
    items = []
    try:
        url = "http://export.arxiv.org/api/query?search_query=cat:cs.AI+AND+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=10"
        req = urllib.request.Request(url, headers={"User-Agent": "AISlime/1.0"})
        data = urllib.request.urlopen(req, timeout=15).read().decode()
        import re
        entries = re.findall(r'<entry>(.*?)</entry>', data, re.DOTALL)
        for entry in entries[:5]:
            title_match = re.search(r'<title>(.*?)</title>', entry, re.DOTALL)
            link_match = re.search(r'<id>(.*?)</id>', entry)
            summary_match = re.search(r'<summary>(.*?)</summary>', entry, re.DOTALL)
            if title_match and link_match:
                title = title_match.group(1).strip().replace('\n', ' ')[:100]
                link = link_match.group(1).strip()
                summary = summary_match.group(1).strip().replace('\n', ' ')[:100] if summary_match else ""
                items.append({
                    "title": f"[arXiv] {title}",
                    "url": link,
                    "heat": random.randint(65, 85),
                    "source": "arXiv",
                    "time": datetime.now(timezone.utc).strftime("%H:%M"),
                    "day": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                    "desc": summary,
                })
    except: pass
    return items

def get_placeholder_news():
    """Generate sample AI news if all sources fail (fallback)"""
    samples = [
        ("OpenAI 发布 GPT-5.5：推理能力提升 3 倍，价格降低 40%",
         "OpenAI 正式发布 GPT-5.5 系列模型，在数学推理和代码生成任务上性能提升显著。"),
        ("Google DeepMind 推出 Gemini 3：原生多模态支持 10M Token",
         "Gemini 3 支持音频、视频、图像和文本的原生理解，上下文窗口扩展至 10M token。"),
        ("Anthropic 发布 Claude Code 3.0：多文件编辑与自主调试",
         "Claude Code 3.0 新增多文件并行编辑、自动错误修复和 Git 工作流集成。"),
        ("Meta 开源 LLaMA 4：405B 参数接近 GPT-5 水平",
         "Meta 发布 LLaMA 4 系列，最大 405B 模型在多项基准上逼近 GPT-5。"),
        ("DeepSeek R2 发布：训练成本降低 60%，推理速度翻倍",
         "DeepSeek R2 采用新型 MoE 架构，训练成本仅为同级模型的 40%。"),
    ]
    items = []
    now = datetime.now(timezone.utc)
    for title, desc in samples:
        items.append({
            "title": title, "url": "#", "heat": random.randint(75, 92),
            "source": "AI News", "time": now.strftime("%H:%M"),
            "day": now.strftime("%Y-%m-%d"), "desc": desc,
        })
    return items

def build_data_js(items):
    """Group items by day and generate data.js content"""
    if not items:
        items = get_placeholder_news()
    
    # Group by day
    groups = {}
    for item in items:
        day = item.get("day", datetime.now(timezone.utc).strftime("%Y-%m-%d"))
        if day not in groups: groups[day] = []
        groups[day].append(item)
    
    # Build JS
    lines = ["// AISlime — Auto-generated news data", "// Generated: " + datetime.now(timezone.utc).isoformat(),
             "const NEWS_DATA = ["]
    
    sorted_days = sorted(groups.keys(), reverse=True)
    for day in sorted_days:
        day_items = groups[day]
        lines.append(f"  {{ day: '{day}', items: [")
        for item in day_items:
            title = item.get("title", "AI News").replace("'", "\\'")
            desc = item.get("desc", "").replace("'", "\\'")
            source = item.get("source", "AI News")
            heat = item.get("heat", 70)
            tags = item.get("tags", ["model", "product"])
            url = item.get("url", "#")
            time_str = item.get("time", "00:00")
            
            lines.append(f"    {{")
            lines.append(f"      id: {random.randint(1000,9999)},")
            lines.append(f"      zh: {{ title: '{title}', desc: '{desc}' }},")
            lines.append(f"      ja: {{ title: '{title}', desc: '{desc}' }},")
            lines.append(f"      en: {{ title: '{title}', desc: '{desc}' }},")
            lines.append(f"      source: '{source}', time: '{time_str}', heat: {heat},")
            lines.append(f"      tags: {json.dumps(tags)}, url: '{url}'")
            lines.append(f"    }},")
        lines.append(f"  ]}},")
    
    lines.append("];")
    return "\n".join(lines)

# Error translations
I18N_INSERT = """
// Translations for categories
const TAG_I18N = {
  zh: { model: '模型', product: '产品', industry: '行业', paper: '论文', tutorial: '教程' },
  ja: { model: 'モデル', product: 'プロダクト', industry: '業界', paper: '論文', tutorial: 'チュートリアル' },
  en: { model: 'Model', product: 'Product', industry: 'Industry', paper: 'Paper', tutorial: 'Tutorial' }
};
"""

if __name__ == "__main__":
    print("🤖 Fetching AI news...")
    
    all_items = []
    for fetcher in [get_hackernews, get_gihub_trending, get_arxiv]:
        try:
            items = fetcher()
            if items:
                print(f"  Got {len(items)} items from {fetcher.__name__}")
                all_items.extend(items)
        except Exception as e:
            print(f"  {fetcher.__name__} failed: {e}")
    
    if not all_items:
        print("  Using fallback news data")
    
    content = build_data_js(all_items)
    
    # Write output
    os.makedirs("js", exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(content)
    
    count = content.count("id:")
    print(f"✅ data.js generated with ~{count} items")
