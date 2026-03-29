import Link from 'next/link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const featured = posts.slice(0, 2)
  const recent = posts.slice(0, MAX_DISPLAY)

  return (
    <main className="pt-40 pb-24 max-w-7xl mx-auto px-8">
      {/* Hero */}
      <header className="mb-32">
        <div className="editorial-grid">
          <div>
            <p className="font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase text-secondary mb-4">
              The Curator&apos;s Desk
            </p>
          </div>
          <div>
            <h1 className="text-[3.5rem] font-black leading-[1.1] tracking-tighter mb-8 max-w-2xl text-primary dark:text-white">
              Technical explorations into the architecture of the web.
            </h1>
            <div className="max-w-xl text-lg text-on-surface-variant dark:text-stone-400 leading-relaxed">
              {siteMetadata.description}
            </div>
          </div>
        </div>
      </header>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-32">
          <div className="editorial-grid items-end mb-12">
            <div>
              <h2 className="font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase text-secondary">
                Featured Discourse
              </h2>
            </div>
            <div className="h-px bg-outline-variant/20 dark:bg-white/10 w-full mb-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((post, i) => {
              const { slug, title, summary, tags } = post
              const isFirst = i === 0
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className={`group relative rounded-xl overflow-hidden p-8 transition-all cursor-pointer ${
                    isFirst
                      ? 'bg-surface-container-low dark:bg-stone-900 hover:bg-surface-container dark:hover:bg-stone-800'
                      : 'bg-primary-container text-white'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <p
                        className={`font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase mb-6 ${
                          isFirst ? 'text-secondary' : 'text-on-primary-fixed-variant'
                        }`}
                      >
                        {tags?.[0]?.toUpperCase() || 'BLOG'}
                      </p>
                      <h3
                        className={`text-2xl font-bold tracking-tight mb-4 transition-colors ${
                          isFirst
                            ? 'group-hover:text-primary dark:group-hover:text-white text-primary dark:text-white'
                            : 'text-white'
                        }`}
                      >
                        {title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-8 max-w-sm ${
                          isFirst
                            ? 'text-on-surface-variant dark:text-stone-400'
                            : 'text-on-primary-fixed-variant'
                        }`}
                      >
                        {summary}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 font-[family-name:var(--font-manrope)] text-[0.7rem] font-bold ${
                        isFirst ? 'dark:text-white' : ''
                      }`}
                    >
                      <span>READ FULL ARTICLE</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Recent Logs */}
      <section className="max-w-5xl">
        <div className="editorial-grid items-end mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase text-secondary">
              Recent Logs
            </h2>
          </div>
        </div>
        <div className="space-y-16">
          {recent.map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="editorial-grid group cursor-pointer block"
              >
                <div className="pt-1">
                  <time className="font-[family-name:var(--font-manrope)] text-[0.75rem] text-secondary tracking-widest uppercase">
                    {formatDate(date, siteMetadata.locale).toUpperCase()}
                  </time>
                </div>
                <div className="border-b border-outline-variant/10 dark:border-white/5 pb-12">
                  <div className="flex gap-2 mb-3">
                    {tags?.map((tag) => (
                      <span
                        key={tag}
                        className="font-[family-name:var(--font-manrope)] text-[0.6rem] px-2 py-0.5 bg-surface-container-high dark:bg-stone-800 rounded-full dark:text-stone-300"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight mb-4 group-hover:text-primary dark:group-hover:text-white transition-colors dark:text-stone-100">
                    {title}
                  </h4>
                  <p className="text-on-surface-variant dark:text-stone-400 leading-relaxed max-w-2xl">
                    {summary}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="editorial-grid mt-12">
          <div></div>
          <div>
            <Link
              href="/blog"
              className="flex items-center gap-4 text-sm font-bold tracking-tight hover:opacity-70 transition-opacity dark:text-white"
            >
              VIEW FULL ARCHIVE
              <span className="w-12 h-px bg-primary dark:bg-white"></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
