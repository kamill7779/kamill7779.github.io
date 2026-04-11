import { readFileSync, existsSync, statSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

export const BLOG_PROJECT_NOTE = 'E:/Document/Documents/10 Projects/my-blog.md'
export const BLOG_INVENTORY_NOTE = 'E:/Document/Documents/10 Projects/my-blog - Blog Inventory.md'
const BLOG_REPO_ROOT = 'E:/Project/my-blog'

function normalizeToPosix(value) {
  return value
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
    .replace(/^[a-z]:/, (m) => m.toUpperCase())
}

export function normalizePath(value) {
  if (!value) return value
  return normalizeToPosix(path.isAbsolute(value) ? path.resolve(value) : value)
}

function readUtf8(filePath) {
  return readFileSync(filePath, 'utf8')
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text))
}

export function validateAgentDocsContract({ fileContents }) {
  const errors = []
  const agentsPath = normalizePath(path.join(BLOG_REPO_ROOT, 'AGENTS.md'))
  const claudePath = normalizePath(path.join(BLOG_REPO_ROOT, 'CLAUDE.md'))
  const agents = fileContents?.[agentsPath] ?? ''
  const claude = fileContents?.[claudePath] ?? ''

  if (!agents.trim()) {
    errors.push('AGENTS.md must exist and contain the canonical workflow instructions.')
  }

  if (!claude.trim()) {
    errors.push('CLAUDE.md must exist as a compatibility entrypoint that delegates to AGENTS.md.')
  } else {
    if (!/AGENTS\.md/i.test(claude)) {
      errors.push('CLAUDE.md must explicitly point agents to AGENTS.md.')
    }

    if (
      !includesAny(claude, [
        /canonical source of truth/i,
        /single source of truth/i,
        /source of truth/i,
      ])
    ) {
      errors.push('CLAUDE.md must state that AGENTS.md is the canonical source of truth.')
    }

    if (!includesAny(claude, [/compatibility/i, /read `?AGENTS\.md`? first/i])) {
      errors.push(
        'CLAUDE.md must stay a thin compatibility wrapper instead of a second workflow document.'
      )
    }
  }

  if (agents.trim() && !includesAny(agents, [/source of truth/i, /canonical/i])) {
    errors.push('AGENTS.md should declare itself as the canonical workflow source of truth.')
  }

  return { ok: errors.length === 0, errors }
}

function needsInventoryNote(stagedPath) {
  return /^data\/blog\/.*\.mdx$/i.test(stagedPath)
}

function needsProjectNote(stagedPath) {
  if (/^data\/blog\/.*\.mdx$/i.test(stagedPath)) return false
  return (
    /^(AGENTS\.md|CLAUDE\.md|README\.md|package\.json|contentlayer\.config\.ts)$/i.test(
      stagedPath
    ) ||
    /^(app|components|layouts|css|data)\//i.test(stagedPath) ||
    /^\.husky\//i.test(stagedPath) ||
    /^scripts\//i.test(stagedPath)
  )
}

export function evaluateKnowledgeSync({
  stagedFiles,
  existingFiles,
  updatedExternalFiles,
  fileContents,
}) {
  const errors = []
  const normalizedStaged = [...new Set((stagedFiles || []).map((file) => normalizeToPosix(file)))]
  const normalizedExisting = new Set([...(existingFiles || [])].map((file) => normalizePath(file)))
  const normalizedUpdated = new Set(
    [...(updatedExternalFiles || [])].map((file) => normalizePath(file))
  )

  const contract = validateAgentDocsContract({ fileContents })
  errors.push(...contract.errors)

  const requiresInventory = normalizedStaged.some(needsInventoryNote)
  const requiresProject = normalizedStaged.some(needsProjectNote)

  if (requiresInventory && !normalizedExisting.has(BLOG_INVENTORY_NOTE)) {
    errors.push(`Missing required knowledge-base note: ${BLOG_INVENTORY_NOTE}`)
  }

  if (requiresProject && !normalizedExisting.has(BLOG_PROJECT_NOTE)) {
    errors.push(`Missing required knowledge-base note: ${BLOG_PROJECT_NOTE}`)
  }

  if (requiresInventory && !normalizedUpdated.has(BLOG_INVENTORY_NOTE)) {
    errors.push(
      `Blog content changed. Update the Blog Inventory note before committing: ${BLOG_INVENTORY_NOTE}`
    )
  }

  if (requiresProject && !normalizedUpdated.has(BLOG_PROJECT_NOTE)) {
    errors.push(
      `Project or workflow files changed. Update the project note before committing: ${BLOG_PROJECT_NOTE}`
    )
  }

  return { ok: errors.length === 0, errors }
}

function parseFrontmatterBlock(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}

  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':')
    if (separator === -1) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    meta[key] = value
  }
  return meta
}

function loadBlogInventoryRows(repoRoot) {
  const blogDir = path.join(repoRoot, 'data', 'blog')
  return readdirSync(blogDir)
    .filter((entry) => entry.endsWith('.mdx'))
    .sort()
    .map((entry) => {
      const raw = readUtf8(path.join(blogDir, entry))
      const meta = parseFrontmatterBlock(raw)
      const slug = entry.replace(/\.mdx$/i, '')
      return {
        title: (meta.title || '').replace(/^['"]|['"]$/g, ''),
        slug,
        date: (meta.date || '').replace(/^['"]|['"]$/g, ''),
        layout: (meta.layout || 'PostLayout').replace(/^['"]|['"]$/g, ''),
        tags: (meta.tags || '').trim(),
        summary: (meta.summary || '').replace(/^['"]|['"]$/g, ''),
        source: `data/blog/${entry}`,
      }
    })
}

export function renderInventoryTable(rows) {
  const header = [
    '| Title | Slug | Date | Layout | Tags | Summary | Source |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  ]
  const body = rows.map((row) => {
    const values = [
      row.title,
      row.slug,
      row.date,
      row.layout,
      row.tags,
      row.summary,
      row.source,
    ].map((value) => String(value || '').replace(/\|/g, '\\|'))
    return `| ${values.join(' | ')} |`
  })
  return [...header, ...body].join('\n')
}

function inventoryNoteMatches(repoRoot) {
  if (!existsSync(BLOG_INVENTORY_NOTE)) return false
  const note = readUtf8(BLOG_INVENTORY_NOTE)
  const expectedTable = renderInventoryTable(loadBlogInventoryRows(repoRoot))
  return note.includes(expectedTable)
}

function projectNoteLooksValid() {
  if (!existsSync(BLOG_PROJECT_NOTE)) return false
  const note = readUtf8(BLOG_PROJECT_NOTE)
  return [
    /E:\\Project\\my-blog/i,
    /AGENTS\.md/i,
    /CLAUDE\.md/i,
    /knowledge sync/i,
    /Blog Inventory/i,
  ].every((pattern) => pattern.test(note))
}

function getNewestMtimeMs(paths) {
  const stats = paths
    .map((relativePath) => path.join(BLOG_REPO_ROOT, relativePath))
    .filter((absolutePath) => existsSync(absolutePath))
    .map((absolutePath) => statSync(absolutePath).mtimeMs)
  return stats.length ? Math.max(...stats) : 0
}

function collectUpdatedExternalFiles(stagedFiles) {
  const updated = new Set()
  const newestRepoMtime = getNewestMtimeMs(stagedFiles)

  if (stagedFiles.some(needsInventoryNote) && inventoryNoteMatches(BLOG_REPO_ROOT)) {
    updated.add(BLOG_INVENTORY_NOTE)
  }

  if (
    stagedFiles.some(needsProjectNote) &&
    projectNoteLooksValid() &&
    existsSync(BLOG_PROJECT_NOTE)
  ) {
    const projectMtime = statSync(BLOG_PROJECT_NOTE).mtimeMs
    if (projectMtime >= newestRepoMtime) {
      updated.add(BLOG_PROJECT_NOTE)
    }
  }

  return updated
}

function getStagedFiles(repoRoot) {
  const output = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
    cwd: repoRoot,
    encoding: 'utf8',
  })

  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function loadRepoFileContents(repoRoot) {
  const files = ['AGENTS.md', 'CLAUDE.md']
  const result = {}
  for (const relativePath of files) {
    const absolutePath = path.join(repoRoot, relativePath)
    result[normalizePath(absolutePath)] = existsSync(absolutePath) ? readUtf8(absolutePath) : ''
  }
  return result
}

function main() {
  const stagedFiles = getStagedFiles(BLOG_REPO_ROOT)
  if (stagedFiles.length === 0) {
    process.stdout.write('Knowledge sync check passed.\n')
    process.exit(0)
  }

  const existingFiles = new Set(
    [BLOG_PROJECT_NOTE, BLOG_INVENTORY_NOTE].filter((file) => existsSync(file))
  )
  const updatedExternalFiles = collectUpdatedExternalFiles(stagedFiles)
  const fileContents = loadRepoFileContents(BLOG_REPO_ROOT)
  const result = evaluateKnowledgeSync({
    stagedFiles,
    existingFiles,
    updatedExternalFiles,
    fileContents,
  })

  if (result.ok) {
    process.stdout.write('Knowledge sync check passed.\n')
    process.exit(0)
  }

  process.stderr.write('Knowledge sync check failed:\n')
  for (const error of result.errors) {
    process.stderr.write(`- ${error}\n`)
  }
  process.exit(1)
}

if (
  process.argv[1] &&
  normalizePath(fileURLToPath(import.meta.url)) === normalizePath(process.argv[1])
) {
  main()
}
