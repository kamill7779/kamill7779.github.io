import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

import {
  BLOG_INVENTORY_NOTE,
  BLOG_PROJECT_NOTE,
  evaluateKnowledgeSync,
  normalizePath,
  validateAgentDocsContract,
} from '../scripts/knowledge-sync-guard.mjs'

const goodAgentContents = {
  'E:/Project/my-blog/AGENTS.md': '# AGENTS\n\nAGENTS.md is the single source of truth.\n',
  'E:/Project/my-blog/CLAUDE.md':
    '# CLAUDE\n\nCompatibility entrypoint. Read `AGENTS.md` first. `AGENTS.md` is the canonical source of truth.\n',
}

test('normalizePath converts Windows paths into slash-separated absolute paths', () => {
  assert.equal(normalizePath('E:\\Project\\my-blog\\AGENTS.md'), 'E:/Project/my-blog/AGENTS.md')
})

test('validateAgentDocsContract accepts a thin CLAUDE compatibility wrapper', () => {
  const result = validateAgentDocsContract({ fileContents: goodAgentContents })

  assert.equal(result.ok, true)
  assert.deepEqual(result.errors, [])
})

test('validateAgentDocsContract rejects CLAUDE when it does not delegate to AGENTS', () => {
  const result = validateAgentDocsContract({
    fileContents: {
      ...goodAgentContents,
      'E:/Project/my-blog/CLAUDE.md': '# CLAUDE\n\nIndependent workflow rules live here.\n',
    },
  })

  assert.equal(result.ok, false)
  assert.match(result.errors.join('\n'), /AGENTS\.md/i)
})

test('evaluateKnowledgeSync requires the inventory note after blog post changes', () => {
  const result = evaluateKnowledgeSync({
    stagedFiles: ['data/blog/example.mdx'],
    existingFiles: new Set([BLOG_PROJECT_NOTE, BLOG_INVENTORY_NOTE]),
    updatedExternalFiles: new Set(),
    fileContents: goodAgentContents,
  })

  assert.equal(result.ok, false)
  assert.match(result.errors.join('\n'), /Blog Inventory/i)
})

test('evaluateKnowledgeSync requires the project note after design workflow changes', () => {
  const result = evaluateKnowledgeSync({
    stagedFiles: ['AGENTS.md', 'components/Header.tsx'],
    existingFiles: new Set([BLOG_PROJECT_NOTE, BLOG_INVENTORY_NOTE]),
    updatedExternalFiles: new Set([BLOG_INVENTORY_NOTE]),
    fileContents: goodAgentContents,
  })

  assert.equal(result.ok, false)
  assert.match(result.errors.join('\n'), /my-blog\.md/i)
})

test('evaluateKnowledgeSync passes when required external notes are updated', () => {
  const result = evaluateKnowledgeSync({
    stagedFiles: ['data/blog/example.mdx', 'components/Header.tsx', 'AGENTS.md'],
    existingFiles: new Set([BLOG_PROJECT_NOTE, BLOG_INVENTORY_NOTE]),
    updatedExternalFiles: new Set([BLOG_PROJECT_NOTE, BLOG_INVENTORY_NOTE]),
    fileContents: goodAgentContents,
  })

  assert.equal(result.ok, true)
})

test('pre-commit hook runs lint-staged and the knowledge sync check', async () => {
  const hook = await readFile(new URL('../.husky/pre-commit', import.meta.url), 'utf8')

  assert.match(hook, /lint-staged/)
  assert.match(hook, /check:knowledge-sync/)
})

test('package tooling used by the hook does not require a global yarn binary', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  const hook = await readFile(new URL('../.husky/pre-commit', import.meta.url), 'utf8')

  for (const commands of Object.values(pkg['lint-staged'])) {
    for (const command of commands) {
      assert.doesNotMatch(command, /^yarn\b/i)
    }
  }

  assert.doesNotMatch(hook, /^yarn\b/im)
})

test('CLI execution prints a pass message when no files are staged', async () => {
  const { execFile } = await import('node:child_process')
  const { promisify } = await import('node:util')
  const execFileAsync = promisify(execFile)

  const result = await execFileAsync(process.execPath, ['./scripts/knowledge-sync-guard.mjs'], {
    cwd: new URL('..', import.meta.url),
  })

  assert.match(result.stdout, /Knowledge sync check passed/)
})

test('current CLAUDE.md is a thin compatibility entrypoint', async () => {
  const claude = await readFile(new URL('../CLAUDE.md', import.meta.url), 'utf8')

  assert.match(claude, /AGENTS\.md/)
  assert.match(claude, /canonical source of truth/i)
})



