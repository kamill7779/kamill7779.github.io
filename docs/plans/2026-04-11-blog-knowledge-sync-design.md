# Blog Knowledge Sync Design

## Goal

Make `E:\Project\my-blog` the only commit-time enforcement point for:

- agent workflow documentation consistency inside the blog repo
- manual synchronization of key blog knowledge into the Obsidian vault at `E:\Document\Documents`
- blocking commits when content or design changed but the corresponding knowledge-base pages were not updated

This workflow intentionally does not auto-rebuild knowledge-base pages. It only reports actionable failures so the agent must update the docs until the repo is consistent.

## Constraints

- `E:\Document\Documents` is not a git repository, so hooks must live in `E:\Project\my-blog`
- the knowledge base must remain hand-authored; generated sync would hide ownership and create noisy drift
- the blog repo already uses `husky` and `lint-staged`
- the blog repo currently duplicates agent guidance across `AGENTS.md` and `CLAUDE.md`

## Chosen Design

### 1. Single source of truth for agent workflow

- `AGENTS.md` becomes the canonical workflow and maintenance document
- `CLAUDE.md` becomes a thin compatibility wrapper that points agents to `AGENTS.md`
- the grader enforces this relationship so both files cannot drift into separate knowledge silos again

This follows the public guidance from Anthropic and OpenAI to keep harness artifacts explicit, reviewable, and mechanically enforced rather than relying on implicit memory:

- OpenAI, "Harness engineering"
  - https://openai.com/index/harness-engineering/
- Anthropic, "Effective harnesses for long-running agents"
  - https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic, "How Anthropic teams use Claude Code"
  - https://www.anthropic.com/news/how-anthropic-teams-use-claude-code

### 2. Manual knowledge-base sync with commit-time enforcement

The hook does not write into `E:\Document\Documents`. Instead it verifies that specific authoritative pages have been updated when relevant parts of the blog repo changed.

Two knowledge-base pages will be introduced:

- a project note for `my-blog`
- a blog inventory note with a table of current posts

### 3. Rule-based grader

The grader will inspect staged files and apply rules:

- if `AGENTS.md` changes, `CLAUDE.md` may remain thin, but it must still declare `AGENTS.md` as the source of truth
- if blog content changes under `data/blog/`, the knowledge-base inventory note must be staged or already updated in the working tree
- if blog design, system, or workflow files change, the project note in the knowledge base must be updated
- if the canonical knowledge-base files are missing, fail immediately with exact paths to create or edit

### 4. Hook integration

- keep the existing `lint-staged` step
- add the grader in `.husky/pre-commit` after `lint-staged`
- expose the grader as a package script so it is runnable directly by agents and local checks

## Knowledge-Base Structure

Create these notes in the vault:

- `E:\Document\Documents\10 Projects\my-blog.md`
- `E:\Document\Documents\10 Projects\my-blog - Blog Inventory.md`

The project note records:

- repo path
- stack and deployment model
- workflow contract
- authoritative documentation map
- sync rules enforced by the grader

The inventory note records one row per post:

- title
- slug
- publish date
- tags
- summary
- source file

## Grader Behavior

The grader should print:

- why the commit is blocked
- which staged paths triggered the requirement
- which exact knowledge-base page must be updated
- any structural violation such as `CLAUDE.md` not delegating to `AGENTS.md`

The grader should exit non-zero on failure.

## Risks

- false positives if the file-to-doc mapping is too broad
- path fragility across Windows shells if paths are not normalized
- existing dirty files in the repo mean we must check staged intent carefully and avoid mutating unrelated changes

## Scope Boundaries

In scope:

- blog repo hook and grader
- repo workflow doc restructuring
- knowledge-base notes for project and post inventory

Out of scope:

- auto-generating vault notes on commit
- converting the Obsidian vault into a git repo
- remote CI enforcement
