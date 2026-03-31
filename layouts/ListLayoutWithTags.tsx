'use client'

import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex justify-between pt-6 pb-8">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? '/blog/' : `/blog/page/${currentPage - 1}`}
          className="text-sm font-bold tracking-tight transition-opacity hover:opacity-70 dark:text-white"
        >
          &larr; NEWER
        </Link>
      ) : (
        <div />
      )}
      <span className="text-secondary font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={`/blog/page/${currentPage + 1}`}
          className="text-sm font-bold tracking-tight transition-opacity hover:opacity-70 dark:text-white"
        >
          OLDER &rarr;
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  // Group posts by year
  const postsByYear = displayPosts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    },
    {} as Record<number, CoreContent<Blog>[]>
  )
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-24">
      {/* Header */}
      <header className="mb-24">
        <h1 className="mb-6 font-[family-name:var(--font-inter)] text-[3.5rem] leading-none font-black tracking-tighter dark:text-white">
          {title}
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed dark:text-stone-400">
          A chronological collection of technical explorations, architectural notes, and digital
          curations.
        </p>
      </header>

      {/* Posts grouped by year */}
      <div className="space-y-32">
        {years.map((year) => (
          <section key={year} className="editorial-grid">
            <aside className="pt-2">
              <h2 className="sticky top-28 font-[family-name:var(--font-inter)] text-4xl font-black tracking-tighter dark:text-white">
                {year}
              </h2>
            </aside>
            <div className="space-y-16">
              {postsByYear[year].map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <article key={path} className="group cursor-pointer">
                    <Link href={`/${path}`}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4 font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest text-stone-400 uppercase">
                          <span>{formatDate(date, siteMetadata.locale).toUpperCase()}</span>
                          {tags?.[0] && (
                            <>
                              <span className="bg-outline-variant h-1 w-1 rounded-full"></span>
                              <span className="font-bold text-stone-600 dark:text-stone-300">
                                {tags[0].charAt(0).toUpperCase() + tags[0].slice(1)}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="text-primary font-[family-name:var(--font-inter)] text-2xl font-bold tracking-tight transition-colors group-hover:text-stone-600 dark:text-stone-100 dark:group-hover:text-stone-400">
                          {title}
                        </h3>
                        <p className="text-on-surface-variant max-w-2xl text-base leading-relaxed dark:text-stone-400">
                          {summary}
                        </p>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Browse by Topic */}
      {sortedTags.length > 0 && (
        <section className="border-outline-variant/20 mt-24 border-t pt-24">
          <div className="editorial-grid">
            <aside>
              <h4 className="mb-8 font-[family-name:var(--font-manrope)] text-xs tracking-[0.2em] text-stone-400 uppercase">
                Browse by Topic
              </h4>
            </aside>
            <div className="flex flex-wrap gap-3">
              {sortedTags.map((t) => (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className="bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-md px-5 py-2.5 font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase transition-all dark:bg-stone-800 dark:text-stone-100"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </main>
  )
}
