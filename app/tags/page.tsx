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
        <h1 className="text-primary mb-6 text-[3.5rem] leading-none font-black tracking-tighter">
          Tags
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
          Browse articles by topic. Each tag represents a theme or technology I write about.
        </p>
      </header>

      <section className="editorial-grid">
        <aside>
          <h2 className="text-on-surface-variant mb-8 font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] uppercase">
            All Topics
          </h2>
        </aside>
        <div className="flex flex-wrap gap-3">
          {tagKeys.length === 0 && <p className="text-on-surface-variant">No tags found.</p>}
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className="bg-surface-container-low text-on-surface hover:bg-primary hover:text-on-primary rounded-md px-5 py-2.5 font-[family-name:var(--font-inter)] text-[0.75rem] tracking-widest uppercase transition-all"
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
