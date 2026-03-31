# Kamil's Blog — CLAUDE.md

## Project Overview
Personal blog hosted at https://kamill7779.github.io
- **Stack**: Next.js 15 + Tailwind CSS v4 + Contentlayer (MDX)
- **Design**: Editorial MD3 (Material Design 3 tokens), Inter/Manrope/Fira Code fonts
- **Deploy**: GitHub Pages via GitHub Actions (static export)
- **Repo**: https://github.com/kamill7779/kamill7779.github.io

## Architecture

```
app/
  layout.tsx          → Root layout (fonts, ThemeProviders, TopNavBar, Footer)
  page.tsx            → Homepage (delegates to Main.tsx)
  Main.tsx            → Homepage: hero + featured + recent logs
  not-found.tsx       → 404 page
  about/page.tsx      → About page
  blog/
    page.tsx          → Archive listing (uses ListLayoutWithTags)
    [...slug]/page.tsx→ Article detail (uses PostLayout)
  tags/
    page.tsx          → All tags cloud
    [tag]/page.tsx    → Posts filtered by tag

components/
  TopNavBar.tsx       → Fixed nav with mobile hamburger + dark mode toggle
  Footer.tsx          → Minimal editorial footer
  Tag.tsx             → Tag link pill
  Comments.tsx        → Giscus comment widget wrapper

layouts/
  PostLayout.tsx      → Article detail with sidebar (author, date, tags, prev/next)
  ListLayoutWithTags.tsx → Archive list grouped by year + browse-by-topic
  AuthorLayout.tsx    → Author bio wrapper for about page

css/
  tailwind.css        → Tailwind v4 theme: MD3 color tokens, fonts, editorial-grid
  prism.css           → Code syntax highlighting styles

data/
  siteMetadata.js     → Site config (title, author, URLs, comments, search)
  headerNavLinks.ts   → Nav items: 首页, 博客, 标签, 关于
  authors/default.mdx → Default author profile
  blog/*.mdx          → Blog posts in MDX
```

## Key Conventions

- **Content**: MDX files in `data/blog/`, frontmatter: title, date, tags, summary
- **Styling**: Tailwind v4 with `@theme` in CSS (no tailwind.config.js)
- **Dark mode**: `next-themes`, toggle in TopNavBar
- **Fonts**: Inter (body/headline), Manrope (labels), Fira Code (mono) via next/font/google
- **Icons**: Material Symbols Outlined
- **Grid**: `.editorial-grid` = `1fr 2fr` responsive grid

## Current Status

### Completed
- [x] Editorial MD3 prototype design applied to all pages
- [x] Homepage (hero + featured articles + recent logs)
- [x] Archive page (year-grouped posts + browse by topic)
- [x] Article detail page (sidebar with meta + prev/next)
- [x] About page (bio grid + connect section)
- [x] Tags page (topic cloud)
- [x] 404 page
- [x] Mobile hamburger navigation
- [x] Dark mode toggle (desktop + mobile)
- [x] GitHub Pages auto-deploy via Actions
- [x] Giscus comments configured (GitHub Discussions enabled)
- [x] RSS / Sitemap / SEO (from template)

### Needs Manual Setup
- [ ] Giscus: Add repo to giscus.app and verify it works
- [ ] Replace placeholder about page content with real bio
- [ ] Add actual blog posts

## Build & Dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Static export to ./out
```

## Deployment
Push to `main` → GitHub Actions builds and deploys to GitHub Pages.
Build uses `EXPORT=1 UNOPTIMIZED=1` env vars.

## Design Context

### Brand Personality
**简约 · 高级感 · 现代感** — Minimal, Premium, Modern

- Understated competence — nothing flashy but clearly well-crafted
- Editorial sophistication with a technical edge
- Bilingual (Chinese + English) with seamless integration

### Users
Both portfolio (recruiters scanning for competence) and knowledge-sharing (engineers seeking technical depth).

### Emotional Goals
- 设计感 (design-conscious): intentional design that doesn't distract
- 新颖但简约 (novel but simple): fresh ideas, no clutter
- 内容和谐 (content harmony): design serves content — words are the star

### Design Principles
1. **Content is king** — every decision serves reading. Remove decorations that don't aid comprehension.
2. **Restrained sophistication** — premium from precision (exact spacing, deliberate typography), not from adding more. Less, but better.
3. **Quiet confidence** — design feels inevitable. Competence speaks through craft, not flash.
4. **Harmonious bilingualism** — Chinese and English coexist naturally with equal typographic care.
5. **Modern craft** — contemporary patterns (MD3 tokens, CSS grid, subtle motion) that feel current without chasing trends.

### Anti-patterns
No bright accents, no gradients, no decorative illustrations, no playful/cartoon elements, no cluttered layouts.

### Aesthetic Tokens
- Colors: Monochromatic MD3 system — warm dark (#0c0a09), cool light (#f9f9fb)
- Fonts: Inter (body), LXGW WenKai (Chinese), JetBrains Mono (labels), Fira Code (code)
- Grid: Asymmetric editorial 1:2 ratio, 12-column detail layout
- Motion: 600ms ease-out, 20px translateY, subtle hovers
- Radius: Minimal (0.125rem) — sharp, editorial feel

## Useful Files to Check
- `data/siteMetadata.js` — all site configuration
- `css/tailwind.css` — all design tokens and theme
- `.github/workflows/pages.yml` — CI/CD pipeline
- `.env.example` — required env vars
