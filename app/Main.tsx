import Link from 'next/link'
import Tag from '@/components/Tag'
import FadeIn from '@/components/FadeIn'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const featured = posts.slice(0, 2)
  const recent = posts.slice(0, MAX_DISPLAY)

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-24">
      {/* Hero */}
      <FadeIn>
        <header className="mb-32">
          <div className="editorial-grid">
            <div>
              <p className="text-secondary mb-4 font-label text-[0.75rem] tracking-widest uppercase">
                The Curator&apos;s Desk
              </p>
              <div className="bg-primary/20 mt-12 hidden h-24 w-px lg:block" />
            </div>
            <div>
              <h1 className="mb-8 max-w-2xl text-[3.5rem] leading-[1.1] font-black tracking-tighter">
                <span className="bg-gradient-to-br from-primary via-primary to-on-surface-variant bg-clip-text text-transparent">
                  Technical explorations
                </span>
                <br />
                <span className="text-primary">into the architecture of the web.</span>
              </h1>
              <div className="bg-primary/40 mb-8 h-[2px] w-16" />
              <div className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
                {siteMetadata.description}
              </div>
            </div>
          </div>
        </header>
      </FadeIn>

      {/* Featured */}
      {featured.length > 0 && (
        <FadeIn delay={100}>
          <section className="mb-32">
            <div className="editorial-grid mb-12 items-end">
              <div>
                <h2 className="text-secondary font-label text-[0.75rem] tracking-widest uppercase">
                  Featured Discourse
                </h2>
              </div>
              <div className="bg-outline-variant/30 mb-1 h-px w-full"></div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {featured.map((post, i) => {
                const { slug, title, summary, tags } = post
                const isFirst = i === 0
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className={`group relative cursor-pointer overflow-hidden rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isFirst
                        ? 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        : 'bg-primary-container text-on-primary-container'
                    }`}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <p
                          className={`mb-6 font-label text-[0.65rem] tracking-widest uppercase ${
                            isFirst ? 'text-secondary' : 'text-on-primary-fixed-variant'
                          }`}
                        >
                          {tags?.[0]?.toUpperCase() || 'BLOG'}
                        </p>
                        <h3
                          className={`mb-4 text-2xl font-bold tracking-tight transition-colors ${
                            isFirst
                              ? 'text-primary group-hover:text-on-surface'
                              : 'text-on-primary-container'
                          }`}
                        >
                          {title}
                        </h3>
                        <p
                          className={`mb-8 max-w-sm text-sm leading-relaxed ${
                            isFirst ? 'text-on-surface-variant' : 'text-on-primary-fixed-variant'
                          }`}
                        >
                          {summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 font-label text-[0.7rem] font-bold">
                        <span>READ FULL ARTICLE</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Recent Logs */}
      <FadeIn delay={200}>
        <section className="max-w-5xl">
          <div className="editorial-grid mb-16 items-end">
            <div>
              <h2 className="text-secondary font-label text-[0.75rem] tracking-widest uppercase">
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
                    <time className="text-secondary font-label text-[0.75rem] tracking-widest uppercase">
                      {formatDate(date, siteMetadata.locale).toUpperCase()}
                    </time>
                  </div>
                  <div className="border-outline-variant/10 border-b pb-12 transition-all duration-300 group-hover:translate-x-2">
                    <div className="mb-3 flex gap-2">
                      {tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-container-high text-on-surface rounded-full px-2.5 py-0.5 font-label text-[0.6rem] transition-colors group-hover:bg-surface-container"
                        >
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <h4 className="group-hover:text-primary text-on-surface mb-4 text-xl font-bold tracking-tight transition-colors">
                      {title}
                    </h4>
                    <p className="text-on-surface-variant max-w-2xl leading-relaxed">{summary}</p>
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
                className="group/link flex items-center gap-4 text-sm font-bold tracking-tight text-on-surface transition-opacity hover:opacity-70"
              >
                VIEW FULL ARCHIVE
                <span className="bg-primary inline-block h-px w-12 transition-all duration-300 group-hover/link:w-20" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  )
}
