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
- **Tags**: MUST use English. Prefer existing tags from the tag library below before creating new ones.

## Tag Library

When adding tags to new blog posts, prefer existing tags. Only add new tags when no existing tag fits.

Existing tags:
- `docker`, `vscode`, `devcontainer`
- `networking`, `socket`, `liso`, `http`
- `tcp`, `computer-networks`, `protocol`
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

## Useful Files to Check
- `data/siteMetadata.js` — all site configuration
- `css/tailwind.css` — all design tokens and theme
- `.github/workflows/pages.yml` — CI/CD pipeline
- `.env.example` — required env vars
