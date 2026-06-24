// ============================================================
// AISlime — AI News Data
// ============================================================

const NEWS_DATA = [
  // --- June 23 ---
  {
    day: '2026-06-23',
    items: [
      {
        id: 1,
        zh: { title: 'OpenAI 发布 GPT-5.5：推理能力提升 3 倍，价格降低 40%', desc: 'OpenAI 正式发布 GPT-5.5 系列模型，在数学推理、代码生成和多步推理任务上性能提升显著，同时 API 价格大幅下调。' },
        ja: { title: 'OpenAIがGPT-5.5を発表：推論能力3倍、価格40%低減', desc: 'OpenAIがGPT-5.5シリーズを正式リリース。数学的推論、コード生成、マルチステップ推論タスクで大幅な性能向上とAPI価格の引き下げを実現。' },
        en: { title: 'OpenAI Releases GPT-5.5: 3x Reasoning Improvement, 40% Price Cut', desc: 'OpenAI officially launched GPT-5.5 series models with significant improvements in mathematical reasoning, code generation, and multi-step reasoning tasks.' },
        source: 'OpenAI',
        time: '05:42',
        heat: 92,
        tags: ['model', 'product'],
        url: 'https://openai.com/blog'
      },
      {
        id: 2,
        zh: { title: 'Google DeepMind 发布 Gemini 3：原生多模态，支持 10M Token 上下文', desc: 'Gemini 3 支持原生音频、视频、图像和文本理解，上下文窗口扩展至 1000 万 token，在多项基准测试中刷新 SOTA。' },
        ja: { title: 'Google DeepMindがGemini 3を公開：ネイティブマルチモーダル、10Mトークン対応', desc: 'Gemini 3は音声・動画・画像・テキストをネイティブに理解し、コンテキストウィンドウを1000万トークンに拡大。' },
        en: { title: 'Google DeepMind Unveils Gemini 3: Native Multimodal, 10M Token Context', desc: 'Gemini 3 natively understands audio, video, images and text with a 10M token context window.' },
        source: 'Google DeepMind',
        time: '04:15',
        heat: 88,
        tags: ['model'],
        url: 'https://deepmind.google'
      },
      {
        id: 3,
        zh: { title: 'Anthropic 推出 Claude Code 3.0：支持多文件编辑与自主调试', desc: 'Claude Code 3.0 新增多文件并行编辑、自动错误修复和 Git 工作流集成，AI 编程助手进入新纪元。' },
        ja: { title: 'AnthropicがClaude Code 3.0をリリース：複数ファイル編集と自律デバッグに対応', desc: 'Claude Code 3.0は複数ファイルの並行編集、自動エラー修正、Gitワークフロー統合を実現。' },
        en: { title: 'Anthropic Launches Claude Code 3.0: Multi-file Editing & Autonomous Debugging', desc: 'Claude Code 3.0 introduces parallel multi-file editing, auto bug fixing, and Git workflow integration.' },
        source: 'Anthropic',
        time: '03:30',
        heat: 85,
        tags: ['product', 'tutorial'],
        url: 'https://anthropic.com/news'
      },
      {
        id: 4,
        zh: { title: 'Meta 开源 LLaMA 4：405B 参数，性能接近 GPT-5', desc: 'Meta 发布 LLaMA 4 系列，最大 405B 参数模型在多项基准上与 GPT-5 持平，完全开源并支持商用。' },
        ja: { title: 'MetaがLLaMA 4をオープンソース化：405Bパラメータ、GPT-5に迫る性能', desc: 'MetaがLLaMA 4シリーズをリリース。最大405Bパラメータモデルが複数ベンチマークでGPT-5に迫る性能を達成。' },
        en: { title: 'Meta Open-Sources LLaMA 4: 405B Parameters, Nears GPT-5 Performance', desc: 'Meta released LLaMA 4 series with up to 405B parameters matching GPT-5 on multiple benchmarks.' },
        source: 'Meta AI',
        time: '02:50',
        heat: 90,
        tags: ['model', 'industry'],
        url: 'https://ai.meta.com/blog'
      },
      {
        id: 5,
        zh: { title: 'Cursor 推出 AI 代码审计功能：自动发现安全漏洞', desc: 'Cursor 新增 AI 驱动代码审计，可自动识别 SQL 注入、XSS 等安全漏洞，并提供修复建议。' },
        ja: { title: 'CursorがAIコード監査機能を追加：セキュリティ脆弱性を自動発見', desc: 'CursorにAI駆動のコード監査機能が追加。' },
        en: { title: 'Cursor Launches AI Code Audit: Auto-Detect Security Vulnerabilities', desc: 'Cursor introduces AI-powered code audit that automatically finds security vulnerabilities.' },
        source: 'Cursor Blog',
        time: '01:40',
        heat: 78,
        tags: ['product', 'tutorial'],
        url: 'https://cursor.sh/blog'
      },
      {
        id: 6,
        zh: { title: '华为发布盘古 5.0：国产大模型首次突破 1M 上下文窗口', desc: '华为盘古 5.0 实现 128K 原生上下文，通过稀疏注意力扩展至 1M token，在中文理解任务上超越 GPT-5。' },
        ja: { title: 'HuaweiがPangu 5.0を発表：中国製大規模言語モデル初の100万トークン超コンテキスト対応', desc: 'Huawei Pangu 5.0は128Kネイティブコンテキストを実現。' },
        en: { title: 'Huawei Unveils Pangu 5.0: First Chinese LLM with 1M+ Token Context', desc: 'Huawei Pangu 5.0 achieves 128K native context, scalable to 1M tokens.' },
        source: '华为',
        time: '00:55',
        heat: 82,
        tags: ['model', 'industry'],
        url: 'https://huawei.com/news'
      },
      {
        id: 7,
        zh: { title: 'DeepSeek R2 发布：训练成本降低 60%，推理速度翻倍', desc: 'DeepSeek R2 采用新型 MoE 架构，训练成本仅为同级别模型的 40%，推理速度达到 GPT-5 的 2 倍。' },
        ja: { title: 'DeepSeek R2リリース：トレーニングコスト60%削減、推論速度2倍', desc: 'DeepSeek R2は新しいMoEアーキテクチャを採用。' },
        en: { title: 'DeepSeek R2 Released: 60% Lower Training Cost, 2x Inference Speed', desc: 'DeepSeek R2 uses a novel MoE architecture, reducing training cost to 40%.' },
        source: 'DeepSeek',
        time: '00:12',
        heat: 87,
        tags: ['model', 'paper'],
        url: 'https://deepseek.com'
      },
    ]
  },

  // --- June 22 ---
  {
    day: '2026-06-22',
    items: [
      {
        id: 8,
        zh: { title: 'Stability AI 发布 Stable Diffusion 4：视频生成能力首次达到电影级', desc: 'SD4 支持 1080p 视频生成，时长可达 60 秒，在一致性、运动流畅度上远超 Sora 和 Runway Gen-3。' },
        ja: { title: 'Stability AIがStable Diffusion 4を発表：動画生成が映画レベルに', desc: 'SD4は1080p・60秒の動画生成に対応。一貫性と動きの滑らかさでSoraやRunway Gen-3を凌駕。' },
        en: { title: 'Stability AI Releases Stable Diffusion 4: Cinema-Quality Video Generation', desc: 'SD4 supports 1080p 60-second video generation, surpassing Sora and Runway Gen-3 in consistency.' },
        source: 'Stability AI',
        time: '22:30',
        heat: 86,
        tags: ['model', 'product'],
        url: '#'
      },
      {
        id: 9,
        zh: { title: '微软 Copilot 接入 GPT-5.5：Office 全家桶全面 AI 化', desc: 'Microsoft 365 Copilot 升级至 GPT-5.5，Excel 数据分析、PPT 设计、Word 写作全部实现 AI 原生体验。' },
        ja: { title: 'Microsoft CopilotがGPT-5.5に対応：Office全体を完全AI化', desc: 'Microsoft 365 CopilotがGPT-5.5にアップグレード。Excelのデータ分析、PPTデザイン、Word文章作成がすべてAIネイティブに。' },
        en: { title: 'Microsoft Copilot Integrates GPT-5.5: Full Office AI Transformation', desc: 'Microsoft 365 Copilot upgraded to GPT-5.5, bringing native AI to Excel, PowerPoint, and Word.' },
        source: 'Microsoft',
        time: '21:15',
        heat: 80,
        tags: ['product', 'industry'],
        url: '#'
      },
      {
        id: 10,
        zh: { title: 'AI 编程助手竞争白热化：GitHub Copilot 宣布免费层', desc: 'GitHub Copilot 推出免费套餐，每月 2000 次补全 + 50 次对话，直接对标 Cursor 和 Codex。' },
        ja: { title: 'AIプログラミングアシスタント競争が激化：GitHub Copilotが無料層を発表', desc: 'GitHub Copilotが月2000回の補完＋50回の対話を含む無料プランをリリース。' },
        en: { title: 'AI Coding Assistants Heat Up: GitHub Copilot Goes Free', desc: 'GitHub Copilot launches free tier with 2K completions + 50 chats per month, taking on Cursor and Codex.' },
        source: 'GitHub',
        time: '19:50',
        heat: 84,
        tags: ['product', 'industry'],
        url: '#'
      },
      {
        id: 11,
        zh: { title: 'Mistral AI 发布 Mistral Large 3：欧洲最强开源模型', desc: 'Mistral Large 3 在 MMLU、HumanEval 上超越 LLaMA 3 405B，成为欧洲最大的开源语言模型。' },
        ja: { title: 'Mistral AIがMistral Large 3を公開：欧州最強のオープンソースモデル', desc: 'Mistral Large 3はMMLUとHumanEvalでLLaMA 3 405Bを上回る性能を達成。' },
        en: { title: 'Mistral AI Releases Mistral Large 3: Europe\'s Strongest Open Model', desc: 'Mistral Large 3 surpasses LLaMA 3 405B on MMLU and HumanEval benchmarks.' },
        source: 'Mistral AI',
        time: '17:20',
        heat: 76,
        tags: ['model'],
        url: '#'
      },
      {
        id: 12,
        zh: { title: 'Figure AI 发布 Figure 03：人形机器人首次实现全自主工厂作业', desc: 'Figure 03 在宝马工厂实测中实现 8 小时连续自主作业，无需人工干预，成功率 99.7%。' },
        ja: { title: 'Figure AIがFigure 03を発表：人型ロボットが初めて完全自律で工場作業を実現', desc: 'Figure 03がBMW工場で8時間の連続自律作業を達成。人間の介入不要で成功率99.7%。' },
        en: { title: 'Figure AI Unveils Figure 03: First Humanoid Robot with Fully Autonomous Factory Work', desc: 'Figure 03 achieves 8-hour continuous autonomous work at BMW factory with 99.7% success rate.' },
        source: 'Figure AI',
        time: '15:05',
        heat: 91,
        tags: ['product', 'industry'],
        url: '#'
      },
      {
        id: 13,
        zh: { title: 'NeurIPS 2026 最佳论文：新型注意力机制实现线性复杂度', desc: '获奖论文提出 FlashAttention-3 架构，将 Transformer 的计算复杂度从 O(n²) 降至 O(n)，推理速度提升 10 倍。' },
        ja: { title: 'NeurIPS 2026 最優秀論文：線形計算量を実現する新しい注意機構', desc: '受賞論文はFlashAttention-3アーキテクチャを提案。Transformerの計算量をO(n²)からO(n)に削減。' },
        en: { title: 'NeurIPS 2026 Best Paper: Novel Attention Mechanism Achieves Linear Complexity', desc: 'FlashAttention-3 reduces Transformer computation from O(n²) to O(n), achieving 10x faster inference.' },
        source: 'NeurIPS',
        time: '12:30',
        heat: 95,
        tags: ['paper'],
        url: '#'
      },
    ]
  },

  // --- June 21 ---
  {
    day: '2026-06-21',
    items: [
      {
        id: 14,
        zh: { title: 'OpenAI 开放 GPTs 应用商店：开发者可发布 AI Agent 赚钱', desc: 'OpenAI GPT Store 正式向开发者开放，支持发布自定义 GPTs 和 Agent，通过使用量和订阅获得收入分成。' },
        ja: { title: 'OpenAIがGPTsアプリストアを開放：開発者はAI Agentを公開して収益化可能', desc: 'OpenAI GPT Storeが開発者向けに正式オープン。カスタムGPTsやAgentを公開し収益を得られる。' },
        en: { title: 'OpenAI Opens GPT App Store: Developers Can Monetize AI Agents', desc: 'OpenAI GPT Store opens to developers, allowing publishing custom GPTs and Agents with revenue sharing.' },
        source: 'OpenAI',
        time: '20:00',
        heat: 89,
        tags: ['product', 'industry'],
        url: '#'
      },
      {
        id: 15,
        zh: { title: 'Apple Intelligence 正式上线：端侧 7B 模型，隐私优先', desc: 'Apple Intelligence 搭载端侧 7B 参数模型，所有推理在设备本地完成，支持 Siri 升级、照片编辑等。' },
        ja: { title: 'Apple Intelligenceが正式稼働：オンデバイス7Bモデル、プライバシー最優先', desc: 'Apple Intelligenceは7Bパラメータのオンデバイスモデルを搭載。すべての推論が端末内で完結。' },
        en: { title: 'Apple Intelligence Goes Live: On-Device 7B Model, Privacy-First', desc: 'Apple Intelligence features a 7B on-device model with all inference running locally.' },
        source: 'Apple',
        time: '18:00',
        heat: 87,
        tags: ['product', 'industry'],
        url: '#'
      },
      {
        id: 16,
        zh: { title: 'LLM 推理成本一年下降 20 倍：从 GPT-4 到开源模型的变革', desc: '深度分析：2025-2026 年 LLM 推理成本从每百万 token 3 美元降至 0.15 美元，开源模型推动民主化。' },
        ja: { title: 'LLM推論コストが1年で20分の1に：GPT-4からオープンソースモデルへの変革', desc: '2025-2026年にLLM推論コストは100万トークンあたり3ドルから0.15ドルへと低下。' },
        en: { title: 'LLM Inference Cost Drops 20x in One Year: From GPT-4 to Open Source', desc: 'In-depth analysis: LLM inference costs fell from $3 to $0.15 per million tokens in 2025-2026.' },
        source: '深度分析',
        time: '14:30',
        heat: 83,
        tags: ['industry'],
        url: '#'
      },
    ]
  }
];
