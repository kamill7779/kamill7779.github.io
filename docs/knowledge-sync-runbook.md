# Knowledge Sync Runbook

## Purpose

This runbook explains how to resolve commit failures raised by `scripts/knowledge-sync-guard.mjs`.
The guard is intentionally blocking. It does not auto-rewrite the vault.

## Commands

```bash
npm run --silent check:knowledge-sync
node --test tests/knowledge-sync-guard.test.mjs
```

## Failure: Blog Inventory note is stale

Typical error:

```text
Blog content changed. Update the Blog Inventory note before committing: E:/Document/Documents/10 Projects/my-blog - Blog Inventory.md
```

Fix:

1. Open `E:\Document\Documents\10 Projects\my-blog - Blog Inventory.md`
2. Update the post table so it matches the current files in `data/blog/*.mdx`
3. Re-run `npm run --silent check:knowledge-sync`

Required fields to keep aligned:

- title
- slug
- date
- layout
- tags
- summary
- source path

## Failure: Project note is stale

Typical error:

```text
Project or workflow files changed. Update the project note before committing: E:/Document/Documents/10 Projects/my-blog.md
```

Fix:

1. Open `E:\Document\Documents\10 Projects\my-blog.md`
2. Update the workflow, design, or project context that changed
3. Save the note after the repo-side edits are in place
4. Re-run `npm run --silent check:knowledge-sync`

This usually applies after changes to:

- `AGENTS.md`
- `CLAUDE.md`
- `.husky/`
- `scripts/`
- `package.json`
- app, component, layout, css, or metadata files

## Failure: CLAUDE.md drifted away from AGENTS.md

Typical failure mode:

- `CLAUDE.md` became a second workflow document
- `CLAUDE.md` stopped saying that `AGENTS.md` is the canonical source of truth

Fix:

1. Keep `AGENTS.md` as the full workflow contract
2. Reduce `CLAUDE.md` back to a thin compatibility entrypoint
3. Make sure `CLAUDE.md` explicitly points back to `AGENTS.md`

## Verification Sequence

After any fix, run in this order:

```bash
node --test tests/knowledge-sync-guard.test.mjs
npm run --silent check:knowledge-sync
```

If both pass, retry the commit.
