# AGENTS.md — Blog Agent Operating Contract

`AGENTS.md` is the canonical source of truth for agent workflow in this repository.
`CLAUDE.md` is only a compatibility entrypoint and must delegate back here.

## 1. Start Here

Before changing code, content, or docs:

1. Read this file first.
2. Read `docs/plans/2026-04-11-blog-knowledge-sync-design.md` when working on workflow enforcement.
3. Read `docs/knowledge-sync-runbook.md` when the hook blocks a commit.
4. Check the knowledge-base sync contract in Section 6 before committing.

## 2. Project Snapshot

- Project: `Kamil's Blog`
- Repo path: `E:\Project\my-blog`
- Site: `https://kamill7779.github.io`
- Stack: `Next.js 15`, `React 19`, `Tailwind CSS v4`, `Contentlayer`, `MDX`
- Deploy: GitHub Pages static export

## 3. Authoritative File Map

Use these files as the primary sources:

- Workflow contract: `AGENTS.md`
- Compatibility entrypoint: `CLAUDE.md`
- Knowledge sync runbook: `docs/knowledge-sync-runbook.md`
- Theme and design tokens: `css/tailwind.css`
- Site metadata: `data/siteMetadata.js`
- Navigation: `data/headerNavLinks.ts`
- Content schema and tag generation: `contentlayer.config.ts`
- Blog content: `data/blog/*.mdx`

## 4. Content Rules

When editing `data/blog/*.mdx`:

- Keep frontmatter complete: `title`, `date`, `tags`, `summary`
- Use English lowercase tags
- Keep summaries in Chinese and under 80 characters
- Prefer existing tags before introducing new ones
- Put post images under `public/static/images/`

Current posts tracked by the knowledge base:

- `docker-devcontainer-vscode`
- `liso-socket-programming`
- `tcp-reliable-transmission`

## 5. Design And Code Rules

When editing app or UI files:

- Use the existing editorial MD3 direction
- Prefer theme tokens over hard-coded colors
- Preserve responsive behavior for nav, layouts, and article pages
- Run `npm run build` after meaningful code changes when the repo is on an NTFS volume; on Windows exFAT volumes, Next.js metadata route builds currently fail during webpack snapshotting

## 6. Knowledge Sync Contract

This repo enforces manual knowledge sync against the Obsidian vault at `E:\Document\Documents`.
The hook does not auto-update vault notes. It blocks the commit until the docs are manually updated.

Authoritative external notes:

- Project note: `E:\Document\Documents\10 Projects\my-blog.md`
- Blog inventory note: `E:\Document\Documents\10 Projects\my-blog - Blog Inventory.md`

Required sync behavior:

- If `data/blog/*.mdx` changes, update the Blog Inventory note.
- If workflow, design, app, layout, script, or metadata files change, update the project note.
- If `AGENTS.md` changes, keep `CLAUDE.md` as a thin compatibility wrapper.

Local enforcement:

- Hook entrypoint: `.husky/pre-commit`
- Grader: `scripts/knowledge-sync-guard.mjs`
- Manual run: `npm run --silent check:knowledge-sync`
- Failure handling: `docs/knowledge-sync-runbook.md`

## 7. Commit Checklist

Before commit:

1. Run `npm run build` for code or layout changes.
2. Make sure the relevant knowledge-base note was updated.
3. Run `npm run --silent check:knowledge-sync` if you changed workflow, content, or design files.
4. Do not split workflow rules between `AGENTS.md` and `CLAUDE.md`.

## 8. Handoff Rule

When ending a session, leave the repo in a state where the hook can explain any remaining inconsistency directly from file contents and note updates.
