# Blog Knowledge Sync Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a commit-time grader in `my-blog` that blocks workflow-doc drift and missing knowledge-base updates, while making `AGENTS.md` the single source of truth and `CLAUDE.md` a thin compatibility shim.

**Architecture:** A small Node-based grader reads staged files from git, evaluates rule-based mappings, validates the `AGENTS.md`/`CLAUDE.md` contract, and exits non-zero when required knowledge-base pages are stale or missing. Husky runs the grader after `lint-staged`.

**Tech Stack:** Node.js, Husky, git CLI, built-in `node:test`, Markdown docs

---

### Task 1: Add failing tests for the grader contract

**Files:**

- Create: `E:\Project\my-blog\tests\knowledge-sync-guard.test.mjs`
- Test: `E:\Project\my-blog\tests\knowledge-sync-guard.test.mjs`

**Step 1: Write the failing test**

```javascript
test('fails when blog content changes without inventory note update', async () => {
  const result = evaluateKnowledgeSync({
    stagedFiles: ['data/blog/example.mdx'],
    existingFiles: new Set([
      'E:/Document/Documents/10 Projects/my-blog - Blog Inventory.md',
      'E:/Document/Documents/10 Projects/my-blog.md',
    ]),
    fileContents: compatibilityContents,
  })

  assert.equal(result.ok, false)
})
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: FAIL because `evaluateKnowledgeSync` does not exist yet.

**Step 3: Write minimal implementation**

Create the grader module export with the minimum rule engine required by the tests.

**Step 4: Run test to verify it passes**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/knowledge-sync-guard.test.mjs scripts/knowledge-sync-guard.mjs
git commit -m "test: add knowledge sync guard coverage"
```

### Task 2: Implement the grader CLI

**Files:**

- Create: `E:\Project\my-blog\scripts\knowledge-sync-guard.mjs`
- Modify: `E:\Project\my-blog\package.json`
- Test: `E:\Project\my-blog\tests\knowledge-sync-guard.test.mjs`

**Step 1: Write the failing test**

Add CLI-oriented coverage for:

- missing knowledge-base files
- `CLAUDE.md` not delegating to `AGENTS.md`
- design file changes requiring the project note

**Step 2: Run test to verify it fails**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: FAIL on the new assertions.

**Step 3: Write minimal implementation**

Implement:

- staged-file classification
- required-document mapping
- canonical path checks
- contract validation for `CLAUDE.md`
- readable failure output

Add package script:

```json
"check:knowledge-sync": "node ./scripts/knowledge-sync-guard.mjs"
```

**Step 4: Run test to verify it passes**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json scripts/knowledge-sync-guard.mjs tests/knowledge-sync-guard.test.mjs
git commit -m "feat: add knowledge sync guard"
```

### Task 3: Wire Husky pre-commit

**Files:**

- Modify: `E:\Project\my-blog\.husky\pre-commit`
- Test: `E:\Project\my-blog\.husky\pre-commit`

**Step 1: Write the failing test**

Add a test that expects the hook file to invoke both `lint-staged` and the new package script.

**Step 2: Run test to verify it fails**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: FAIL because the hook still runs only `lint-staged`.

**Step 3: Write minimal implementation**

Update `.husky/pre-commit` to run:

```bash
npx --no-install lint-staged
yarn check:knowledge-sync
```

**Step 4: Run test to verify it passes**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add .husky/pre-commit tests/knowledge-sync-guard.test.mjs
git commit -m "chore: enforce knowledge sync in pre-commit"
```

### Task 4: Collapse workflow docs to one source of truth

**Files:**

- Modify: `E:\Project\my-blog\AGENTS.md`
- Modify: `E:\Project\my-blog\CLAUDE.md`
- Test: `E:\Project\my-blog\tests\knowledge-sync-guard.test.mjs`

**Step 1: Write the failing test**

Add a test that expects:

- `CLAUDE.md` to explicitly say `AGENTS.md` is the canonical source
- `AGENTS.md` to contain the workflow contract that the grader checks

**Step 2: Run test to verify it fails**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: FAIL until the docs are restructured.

**Step 3: Write minimal implementation**

Rewrite:

- `AGENTS.md` as the single operational workflow source
- `CLAUDE.md` as a concise compatibility entrypoint

**Step 4: Run test to verify it passes**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add AGENTS.md CLAUDE.md tests/knowledge-sync-guard.test.mjs
git commit -m "docs: make AGENTS canonical for agent workflow"
```

### Task 5: Add knowledge-base project notes

**Files:**

- Create: `E:\Document\Documents\10 Projects\my-blog.md`
- Create: `E:\Document\Documents\10 Projects\my-blog - Blog Inventory.md`

**Step 1: Write the failing test**

Add coverage that the grader requires these exact files when content or design files change.

**Step 2: Run test to verify it fails**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: FAIL if the files are absent from the fixture set.

**Step 3: Write minimal implementation**

Create the notes with:

- project metadata
- workflow sync contract
- current blog inventory table

**Step 4: Run test to verify it passes**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: PASS

**Step 5: Commit**

```bash
git add ../Documents/10\ Projects/my-blog.md ../Documents/10\ Projects/my-blog\ -\ Blog\ Inventory.md
git commit -m "docs: add blog knowledge base notes"
```

### Task 6: Verify the workflow end to end

**Files:**

- Test: `E:\Project\my-blog\tests\knowledge-sync-guard.test.mjs`
- Test: `E:\Project\my-blog\scripts\knowledge-sync-guard.mjs`
- Test: `E:\Project\my-blog\.husky\pre-commit`

**Step 1: Run unit tests**

Run: `node --test tests/knowledge-sync-guard.test.mjs`
Expected: PASS

**Step 2: Run the grader directly**

Run: `yarn check:knowledge-sync`
Expected: exit `0` for the final synchronized working tree

**Step 3: Re-read requirements**

Checklist:

- `AGENTS.md` is canonical
- `CLAUDE.md` is thin
- project note exists
- inventory note exists
- hook blocks stale knowledge sync

**Step 4: Commit**

```bash
git add AGENTS.md CLAUDE.md .husky/pre-commit package.json scripts/knowledge-sync-guard.mjs tests/knowledge-sync-guard.test.mjs ../Documents/10\ Projects/my-blog.md ../Documents/10\ Projects/my-blog\ -\ Blog\ Inventory.md
git commit -m "feat: enforce blog knowledge sync workflow"
```
