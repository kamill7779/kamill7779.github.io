import Link from 'next/link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const featured = posts.slice(0, 2)
  const recent = posts.slice(0, MAX_DISPLAY)

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-24">
      {/* Hero */}
      <header className="mb-32">
        <div className="editorial-grid">
          <div>
            <p className="text-secondary mb-4 font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase">
              The Curator&apos;s Desk
            </p>
          </div>
          <div>
            <h1 className="text-primary mb-8 max-w-2xl text-[3.5rem] leading-[1.1] font-black tracking-tighter dark:text-white">
              Technical explorations into the architecture of the web.
            </h1>
            <div className="text-on-surface-variant max-w-xl text-lg leading-relaxed dark:text-stone-400">
              {siteMetadata.description}
            </div>
          </div>
        </div>
      </header>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-32">
          <div className="editorial-grid mb-12 items-end">
            <div>
              <h2 className="text-secondary font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase">
                Featured Discourse
              </h2>
            </div>
            <div className="bg-outline-variant/20 mb-1 h-px w-full dark:bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featured.map((post, i) => {
              const { slug, title, summary, tags } = post
              const isFirst = i === 0
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl p-8 transition-all ${
                    isFirst
                      ? 'bg-surface-container-low hover:bg-surface-container dark:bg-stone-900 dark:hover:bg-stone-800'
                      : 'bg-primary-container text-white'
                  }`}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p
                        className={`mb-6 font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase ${
                          isFirst ? 'text-secondary' : 'text-on-primary-fixed-variant'
                        }`}
                      >
                        {tags?.[0]?.toUpperCase() || 'BLOG'}
                      </p>
                      <h3
                        className={`mb-4 text-2xl font-bold tracking-tight transition-colors ${
                          isFirst
                            ? 'group-hover:text-primary text-primary dark:text-white dark:group-hover:text-white'
                            : 'text-white'
                        }`}
                      >
                        {title}
                      </h3>
                      <p
                        className={`mb-8 max-w-sm text-sm leading-relaxed ${
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
        <div className="editorial-grid mb-16 items-end">
          <div>
            <h2 className="text-secondary font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase">
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
                className="editorial-grid group block cursor-pointer"
              >
                <div className="pt-1">
                  <time className="text-secondary font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase">
                    {formatDate(date, siteMetadata.locale).toUpperCase()}
                  </time>
                </div>
                <div className="border-outline-variant/10 border-b pb-12 dark:border-white/5">
                  <div className="mb-3 flex gap-2">
                    {tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container-high rounded-full px-2 py-0.5 font-[family-name:var(--font-manrope)] text-[0.6rem] dark:bg-stone-800 dark:text-stone-300"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <h4 className="group-hover:text-primary mb-4 text-xl font-bold tracking-tight transition-colors dark:text-stone-100 dark:group-hover:text-white">
                    {title}
                  </h4>
                  <p className="text-on-surface-variant max-w-2xl leading-relaxed dark:text-stone-400">
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
              className="flex items-center gap-4 text-sm font-bold tracking-tight transition-opacity hover:opacity-70 dark:text-white"
            >
              VIEW FULL ARCHIVE
              <span className="bg-primary h-px w-12 dark:bg-white"></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
