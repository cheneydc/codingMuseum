# 代码考古博物馆 / Code Archaeology Museum

> 一个 AI 考古学家视角的编程语言历史展示网页，纵向滚动，复古暗色风格。

---

## 目录

1. [项目架构](#项目架构)
2. [目录结构](#目录结构)
3. [设计系统](#设计系统)
4. [页面结构](#页面结构)
5. [组件规范](#组件规范)
6. [内容规范](#内容规范)
7. [添加新卡片](#添加新卡片)
8. [添加新年代](#添加新年代)
9. [多语言系统](#多语言系统)
10. [动画与交互](#动画与交互)
11. [图片规范](#图片规范)
12. [响应式断点](#响应式断点)

---

## 项目架构

纯静态 HTML/CSS/JS 单页应用，无框架、无构建工具、无后端。

- **HTML** — 全部内容硬编码在 `index.html`，语义化标签
- **CSS** — 自定义变量设计系统，全部样式在 `style.css`
- **JS** — 语言切换 + 导航高亮 + 滚动渐入动画，在 `script.js`

---

## 目录结构

```
codingMuseum/
├── index.html              # 页面主体（所有内容包括文案均在此文件）
├── style.css               # 全部样式
├── script.js               # 全部交互逻辑
├── DOCUMENTATION.md        # 本文档
└── assets/
    └── images/             # 所有图片资源
        ├── eniac.jpg              # 1940s - ENIAC
        ├── mainframe.jpg          # 1950s - FORTRAN
        ├── lisp_machine.jpg       # 1950s - Lisp Machine（左图）
        ├── lisp_machine2.jpg      # 1950s - Lisp Machine（右图）
        ├── cobol_code.jpg         # 1950s - COBOL 代码
        ├── algol_punchcard.png    # 1960s - ALGOL 打孔卡片
        ├── dennis_ritchie.jpg     # 1970s - Dennis Ritchie（C语言）
        ├── bjarne_stroustrup.jpg  # 1980s - Bjarne Stroustrup（C++）
        ├── python_logo.png        # 1990s - Python Logo
        ├── java_logo.png          # 1990s - Java Logo
        ├── js_shield.svg          # 1990s - JavaScript Logo（盾牌）
        ├── datacenter.jpg         # 2000s / 2010s - 横幅/数据中心
        ├── assembly_code.png      # 1940s - Machine Code（左图）
        ├── ibm_card_punch.jpg     # 1940s - Machine Code（右图）
        └── matrix_rain.jpg        # 2020s - 背景代码雨
```

---

## 设计系统

### 颜色变量

定义在 `:root` 中，所有颜色通过 CSS 变量引用：

```css
--bg-dark: #1a1a1a;             /* 主背景，深黑色 */
--bg-card: #222222;              /* 卡片背景，深灰 */
--bg-elevated: #2a2a2a;          /* 抬高面，更深灰 */
--text-primary: #f0ece4;         /* 主文字，米白 */
--text-muted: #999080;           /* 次要文字，灰褐 */
--accent-gold: #c9a84c;          /* 主金色 */
--accent-gold-dim: #8a7535;      /* 暗金色 */
--accent-maroon: #6b1d2a;        /* 深酒红（备用） */
--accent-maroon-bright: #8b2332; /* 亮酒红（备用） */
--border-subtle: rgba(201, 168, 76, 0.2); /* 金色半透明边框 */
```

### 字体

```css
--font-display: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  /* 标题字体：英文 Playfair Display 衬线，中文 Noto Serif SC 宋体 */

--font-serif: 'Source Serif Pro', 'Noto Serif SC', Georgia, serif;
  /* 正文字体：英文 Source Serif Pro，中文 Noto Serif SC */

--font-mono: 'Courier New', Courier, monospace;
  /* 等宽字体：年代数字、代码片段 */
```

Google Fonts 通过 `<link>` 在 HTML 头部加载，非 `@import`。

### 间距

```css
--column-gap: 2rem;
--row-gap: 2rem;
```

卡片间距统一，年代板块内卡片网格的间隙。

---

## 页面结构

```html
<body>
  <header>            <!-- 固定顶部导航 -->
    <h1>              <!-- 博物馆标题 -->
    <nav.decade-nav>  <!-- 年代时间轴导航 -->
      <a href="#hero">起源 / Origins</a>
      <a href="#1940s">1940s</a>
      ...
      <a href="#ai-contrast">∞ 无尽 / No End</a>
    </nav>
    <button#lang-toggle>  <!-- 语言切换按钮 -->
  </header>

  <main>
    <section#hero.museum-stop>    <!-- 首页 -->
    <section#1940s.museum-stop>   <!-- 1940s 年代板块 -->
    <section#1950s.museum-stop>   <!-- 1950s 年代板块 -->
    ...
    <section#ai-contrast.museum-stop>  <!-- 尾声板块 -->
  </main>

  <div.page-footer>     <!-- 底部版权 -->
</body>
```

---

## 组件规范

### 1. 年代板块（`.museum-stop`）

每个年代是一个 `section`，由以下几部分组成：

```html
<section id="1940s" class="museum-stop">
  <h2>1940s - 计算机的黎明</h2>           <!-- 年代标题 -->
  <span class="stop-label">展品A · 原始时代</span>  <!-- 展品标签 -->
  <div class="stop-content">              <!-- 卡片网格容器 -->
    <article class="language-card reveal">...</article>
    <article class="language-card reveal">...</article>
  </div>
</section>
```

- **`min-height: 100vh`** — 每个年代占满一屏
- 内容通过 `display: flex; flex-direction: column; justify-content: center` 垂直居中
- 卡片网格用 CSS Grid，每个年代可独立设置列数

### 2. 语言卡片（`.language-card`）

```html
<article class="language-card reveal" data-lang="ENIAC" data-year="1946" data-category="hardware">
  <header>
    <h3>ENIAC - 插线编程的原始时代</h3>    <!-- 语言名称 -->
    <time datetime="1946">1946</time>        <!-- 年份 -->
    <img class="card-logo" src="...">        <!-- 可选：右上角 Logo -->
  </header>

  <!-- 图片在文字上方（可选） -->
  <div class="card-image-stacked">
    <img src="assets/images/bjarne_stroustrup.jpg">
  </div>

  <!-- 或者：图片在左、文字在右 -->
  <div class="card-body">
    <div class="card-image">...</div>
    <div class="card-content">...</div>
  </div>

  <!-- 或者：两张图片并排 + 文字 -->
  <div class="card-body">
    <div class="card-content">...</div>
    <div class="card-image">...</div>
  </div>

  <!-- 或者：纯文字卡片 -->
  <div class="card-content">
    <p data-zh="..." data-en="...">描述文字</p>
  </div>

  <footer>
    <span class="creator">创造者: ...</span>
    <span class="influence">影响: ...</span>
  </footer>
</article>
```

**卡片布局分类：**

| 布局 | 类名 | 说明 |
|------|------|------|
| 纯文字 | 无额外类 | 默认，文字占满卡片 |
| 图左文右 | 无额外类 + `.card-body` | 图片 40%，文字 60% |
| 图右文左 | 无额外类 + `.card-body`（交换 HTML 顺序） | 文字先，图片后 |
| 图片在上 | `.card-image-stacked` | 图片在 header 和 content 之间，不裁剪 |
| 双图并排 | `.images-row` | 两张图在 `.card-image` 内并排 |

**图片放在文字下方的布局（`.card-image` 在 `.card-content` 之后）：**
```html
<div class="card-body">
  <div class="card-content">...</div>
  <div class="card-image">
    <img src="...">
    <img src="...">  <!-- 可多张 -->
  </div>
</div>
```

### 3. 终端卡片（`.terminal-card`）

2020s 板块中的特殊卡片：

```html
<article class="language-card terminal-card reveal">
  <header>
    <h3 class="terminal-title">▌ 矩阵觉醒</h3>
  </header>
  <div class="terminal-body">
    <div class="terminal-line terminal-prompt">
      <span class="prompt-sign">$</span>
      <span class="prompt-text">AI 提示文字</span>
    </div>
    <div class="terminal-line terminal-response">回复文字</div>
    <div class="terminal-line terminal-prompt">
      <span class="prompt-sign">$</span>
      <span class="terminal-cursor"></span>  <!-- 闪烁光标 -->
    </div>
  </div>
</article>
```

终端卡片特征：
- 黑底绿字，`Courier New` 等宽字体
- 底部渐隐（`background: linear-gradient(180deg, #0a0e0a 60%, transparent)`）
- 右下角角标隐藏，底部边框去除，营造「无限」感

### 4. 年代导航（`.decade-nav`）

固定头部的时间轴导航：

- 每个 `<a>` 对应一个年代板块的 `id`
- 底部黄金渐变线（`::after` 伪元素）
- 每个链接下有小圆点，当前活跃的圆点放大并发光
- 活跃链接自动更新（IntersectionObserver）

### 5. 标语横幅（`.section-banner`）

可选横幅图片，位于板块标题和卡片之间：

```html
<div class="section-banner">
  <img src="assets/images/datacenter.jpg" alt="..." loading="lazy">
</div>
```

- 高度 200px，圆角，`object-fit: cover`
- 半透明，怀旧滤镜，不干扰内容

### 6. 主页

```html
<section id="hero" class="museum-stop">
  <article>
    <div class="hero-emblem"></div>   <!-- 金色菱形徽章，有分解重组动画 -->
    <h2>代码考古博物馆</h2>
    <div class="hero-divider"></div>  <!-- 金色渐变分割线 -->
    <p>...</p>                        <!-- 开场故事 -->
  </article>
</section>
```

---

## 内容规范

### 卡片数据属性

每张卡片必须包含：

| 属性 | 示例 | 说明 |
|------|------|------|
| `data-lang` | `"FORTRAN"` | 语言名称标识 |
| `data-year` | `"1957"` | 发布年份（显示用） |
| `data-category` | `"scientific"` | 分类：scientific/business/ai/systems/etc |

### 卡片文案

- **`<p>` 标签**：必须有 `data-zh`（中文）和 `data-en`（英文）属性
- 默认内容为英文版
- 中文使用中文双引号 `""`，英文用单引号 `''`
- 幽默调侃风格，AI 考古学家的视角
- 包含历史准确信息和趣味吐槽

### 创造者与影响

卡片底部的 `footer` 包含：

```html
<footer>
  <span class="creator" data-zh="创造者: ..." data-en="Creator: ...">Creator Name</span>
  <span class="influence" data-zh="影响: ..." data-en="Influence: ...">Influence text</span>
</footer>
```

---

## 添加新卡片

要添加一张新的编程语言卡片，按以下步骤：

### 步骤 1：确定所属年代

找到对应年代的 `<section>`，如 1990s：

```html
<section id="1990s" class="museum-stop">
  <h2>1990s - 互联网时代</h2>
  <span class="stop-label">EXHIBIT F · THE INTERNET AGE</span>
  <div class="stop-content">
    <!-- 在此添加新卡片 -->
  </div>
</section>
```

### 步骤 2：添加卡片 HTML

在 `.stop-content` 中添加新的 `<article>`：

```html
<article class="language-card reveal" data-lang="语言名" data-year="年份" data-category="分类">
  <header>
    <h3 data-zh="中文名" data-en="English Name">English Name</h3>
    <time datetime="年份">年份</time>
  </header>
  <div class="card-content">
    <p data-zh="中文描述（幽默调侃风格）" data-en="English description (humorous)">
      English description
    </p>
  </div>
  <footer>
    <span class="creator" data-zh="创造者: ..." data-en="Creator: ...">Creator</span>
    <span class="influence" data-zh="影响: ..." data-en="Influence: ...">Influence</span>
  </footer>
</article>
```

### 步骤 3：添加图片（可选）

四种图片布局选择：

**A. 纯文字卡片** — 不需要额外结构

**B. 图片在文字上方**：
```html
<div class="card-image-stacked">
  <img src="assets/images/xxx.jpg" alt="..." loading="lazy">
</div>
<div class="card-content">...</div>
```

**C. 图片在左、文字在右**：
```html
<div class="card-body">
  <div class="card-image">
    <img src="assets/images/xxx.jpg" alt="..." loading="lazy">
  </div>
  <div class="card-content">...</div>
</div>
```

**D. 两张图并排 + 文字**：添加 class `images-row`：
```html
<article class="language-card reveal images-row">
  <div class="card-body">
    <div class="card-content">...</div>
    <div class="card-image">
      <img src="assets/images/img1.jpg" alt="..." loading="lazy">
      <img src="assets/images/img2.jpg" alt="..." loading="lazy">
    </div>
  </div>
</article>
```

图片放入 `assets/images/` 目录，建议 JPEG 格式，宽度不超过 1200px。

### 步骤 4：添加右上角 Logo（可选）

```html
<img class="card-logo" src="assets/images/xxx.png" alt="Logo" loading="lazy">
```

放在 `<header>` 内 `</header>` 之前。Logo 会自动定位到卡片右上角（44px，半透明）。

---

## 添加新年代

### 步骤 1：在 HTML 中添加年代板块

在 `<main>` 中添加新的 `<section>`：

```html
<section id="2030s" class="museum-stop">
  <h2 id="heading-2030s" data-zh="2030s - ..." data-en="2030s - ...">2030s - ...</h2>
  <span class="stop-label" data-zh="展品J · ..." data-en="EXHIBIT J · ...">EXHIBIT J · ...</span>
  <div class="stop-content">
    <!-- 卡片在此 -->
  </div>
</section>
```

### 步骤 2：在导航栏中添加链接

在 `index.html` 的 `<nav class="decade-nav">` 中添加：

```html
<a href="#2030s">2030s</a>
```

### 步骤 3：配置布局（可选）

在 `style.css` 的 `.stop-content` 布局部分添加：

```css
[id="2030s"] .stop-content {
    grid-template-columns: 1fr; /* 或 1fr 1fr, 1fr 1fr 1fr 等 */
}
```

网格列数配置：

| 值 | 适用场景 |
|------|---------|
| `1fr` | 卡片含大图（如 ENIAC、FORTRAN）、单行显示 |
| `1fr 1fr` | 双卡片并排 |
| `1fr 1fr 1fr` | 三卡片并排 |
| `1.5fr 1fr` | 主卡片 + 次要卡片 |

### 步骤 4：可选背景色

```css
[id="2030s"] {
    background-color: #你的颜色;
    background-image:
        radial-gradient(ellipse at 50% 50%, rgba(色值, 0.04) 0%, transparent 50%),
        radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%);
}
```

---

## 多语言系统

通过 `data-zh` 和 `data-en` 属性实现中英文切换：

```html
<h3 data-zh="Python - 可读性至上" data-en="Python - Readability First">Python</h3>
```

- `data-zh` — 中文文本
- `data-en` — 英文文本
- 标签内的默认内容为英文（JS 禁用时的 fallback）
- 点击 `#lang-toggle` 按钮切换，状态保存在 `localStorage`

**所有需要翻译的元素**都必须有 `data-zh` 和 `data-en` 属性：
- 卡片标题 `<h3>`
- 卡片描述 `<p>`
- 片底信息 `footer span`
- 导航链接 `nav a`
- 展品标签 `.stop-label`
- 板块标题 `<h2>`
- 首页标题、故事文案
- 底部版权文案

---

## 动画与交互

### 1. 滚动渐入（`.reveal`）

所有卡片使用 `reveal` 类实现滚动进入视口时的渐入动画：

```css
.reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
```

**每张卡片都必须包含 `reveal` 类**（包括 `.images-row` 卡片）。

### 2. 徽章动画

首页菱形徽章有旋转分解重组动画：

| 层 | 动画名 | 行为 |
|------|--------|------|
| 外框 | `emblemOuter` | 5s 循环旋转 + 缩放脉冲 |
| 中间框 | `emblemInner` | 反向缩放 + 透明度变化 |
| 中心菱形 | `emblemCenter` | 旋转 + 分离到角落再回归 |

### 3. 光标闪烁

终端卡片的绿色光标使用 `blink` 动画，1s step-end 无限循环。

### 4. 导航高亮

IntersectionObserver 监控每个 `.museum-stop`，当前在视口中的年代的导航链接自动激活（金色 + 发光圆点）。

### 5. 悬停效果

所有卡片悬停时：
- 上移 4px（`translateY(-4px)`）
- 边框变为金色
- 阴影加深带金色光晕
- 图片透明度从 0.55 升至 0.85

---

## 图片规范

### 格式要求

- **JPEG** — 照片类图片（首选，文件小）
- **PNG** — 需要透明的 Logo 或截图
- **SVG** — 图标（如 JS 盾牌 Logo）
- 不使用 GIF、WebP

### 尺寸要求

- 卡片内图片：宽度不超过 800px，建议 600-800px
- 横幅图片：宽度 1200-1400px
- Logo 图片：44px（右上角小图标）
- 所有上传图片先用 `sips -Z 1200` 压缩到合理大小

### 存放位置

全部放在 `assets/images/`，引用路径为 `assets/images/xxx.jpg`

### 图片样式（系统自动处理）

所有卡片内图片自动应用：
- `filter: sepia(0.15) contrast(1.05) brightness(0.95)` — 怀旧统一色调
- `opacity: 0.55` — 半透明融入深色主题
- hover 时 opacity 升至 0.85

---

## 响应式断点

| 设备 | 断点 | 卡片列数 | 说明 |
|------|------|---------|------|
| 桌面 | `> 1200px` | 按各年代配置 | 全尺寸体验 |
| 平板 | `768px — 1199px` | 2 列 | .images-row 转列向堆叠 |
| 手机 | `< 767px` | 1 列 | 导航压缩，图片堆叠，横幅隐藏 |

### 手机端特殊处理

- 头部标题缩小（1.6rem）
- `main` 上边距增大（8.5rem 为导航腾空间）
- 所有 `.images-row .card-image` 转为列向
- 所有 `.section-banner` 缩小高度
- 卡片 padding 缩小，touch 目标不小于 44px

---

## 底部版权

```html
<div class="page-footer">
  <small>
    <span class="footer-zh">© 2026 代码考古博物馆 · 归档人 <a href="...">cheneydc</a> · 零人工手搓</span>
    <span class="footer-en">© 2026 Code Archaeology Museum · Archived by <a href="...">cheneydc</a> · Zero human code</span>
  </small>
</div>
```

- 中英文通过 `.footer-zh` / `.footer-en` 切换显示
- JS 语言切换时同步控制
- 字号 0.85rem，半透明

---

## 年代版块配置速查

| 板块 | 时间轴 ID | 列数 | 特色 |
|------|----------|------|------|
| 起源（首页） | `#hero` | flex column | 徽章动画 + 故事文案 |
| 1940s | `#1940s` | 1fr | ENIAC（图左文右）+ Machine Code（文左图右） |
| 1950s | `#1950s` | 1fr | FORTRAN（图左文右）+ COBOL（文左图右）+ LISP（双图） |
| 1960s | `#1960s` | 1fr | ALGOL 60（图左文右）+ BASIC |
| 1970s | `#1970s` | 1.5fr 1fr | C（图左文右）+ SQL |
| 1980s | `#1980s` | 1fr 居中 | C++（图片在上方） |
| 1990s | `#1990s` | 1fr 1fr 1fr | Python/Java/JavaScript（各含右上角 Logo） |
| 2000s | `#2000s` | 1fr 1fr | C# + Go（横幅在顶部） |
| 2010s | `#2010s` | 1.3fr 1fr | Rust + TypeScript |
| 2020s | `#2020s` | 1fr 居中 | AI Tools + 终端卡片，背景为 matrix_rain.jpg |
| 无尽 | `#ai-contrast` | flex column | 纯文案，博物馆收尾 |

---

以上文档覆盖了页面的全部结构和样式规范。如需修改，按对应章节操作即可保持风格统一。
