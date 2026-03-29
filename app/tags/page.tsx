import Link from 'next/link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-24">
      <header className="mb-24">
        <h1 className="mb-6 text-[3.5rem] leading-none font-black tracking-tighter dark:text-white">
          Tags
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed dark:text-stone-400">
          Browse articles by topic. Each tag represents a theme or technology I write about.
        </p>
      </header>

      <section className="editorial-grid">
        <aside>
          <h2 className="mb-8 font-[family-name:var(--font-manrope)] text-xs tracking-[0.2em] text-stone-400 uppercase">
            All Topics
          </h2>
        </aside>
        <div className="flex flex-wrap gap-3">
          {tagKeys.length === 0 && (
            <p className="text-on-surface-variant dark:text-stone-400">No tags found.</p>
          )}
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="bg-surface-container-low text-primary-contrast hover:bg-primary hover:text-on-primary rounded-md px-5 py-2.5 font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase transition-all dark:bg-stone-800 dark:text-stone-100"
            >
              {t}
              <span className="ml-2 opacity-50">({tagCounts[t]})</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
