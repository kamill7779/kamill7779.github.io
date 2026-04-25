'use client'

import { slug } from 'github-slugger'
// formatDate no longer used — dates rendered as year + month-day
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
    <div className="border-outline-variant flex items-center justify-between border-t pt-8">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? '/blog/' : `/blog/page/${currentPage - 1}`}
          className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight transition-colors"
        >
          <svg
            className="text-on-surface-variant group-hover:text-tertiary h-4 w-4 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-on-surface group-hover:text-tertiary transition-colors">Newer</span>
        </Link>
      ) : (
        <div />
      )}
      <span className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-wider">
        {currentPage} / {totalPages}
      </span>
      {nextPage ? (
        <Link
          href={`/blog/page/${currentPage + 1}`}
          className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight transition-colors"
        >
          <span className="text-on-surface group-hover:text-tertiary transition-colors">Older</span>
          <svg
            className="text-on-surface-variant group-hover:text-tertiary h-4 w-4 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
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

  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24 md:px-12">
      {/* Header */}
      <header className="mb-20">
        <p className="text-on-surface-variant mb-4 font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.2em] uppercase">
          All Writings
        </p>
        <h1 className="text-on-surface mb-6 font-[family-name:var(--font-source-serif)] text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="bg-tertiary mb-6 h-px w-12"></div>
        <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
          探索 AI 工程化与系统架构的实战经验，记录技术演进中的思考与沉淀。
        </p>
      </header>

      {/* Divider */}
      <div className="bg-outline-variant mb-16 h-px w-full" />

      {/* Posts list — unified with homepage Recent Posts style */}
      <section className="mb-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.2em] uppercase">
            All Posts
          </h2>
        </div>
        <div className="space-y-0">
          {displayPosts.map((post, index) => {
            const { path, date, title, summary, tags } = post
            const isLast = index === displayPosts.length - 1
            const dateObj = new Date(date)
            const year = dateObj.getFullYear()
            const monthDay = dateObj.toLocaleDateString(siteMetadata.locale, {
              month: 'short',
              day: 'numeric',
            })
            const num = String(index + 1).padStart(2, '0')
            return (
              <Link key={path} href={`/${path}`} className="group block cursor-pointer">
                <article className={`py-8 ${!isLast ? 'border-outline-variant border-b' : ''}`}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[80px_60px_1fr] md:gap-6">
                    {/* Index */}
                    <div className="hidden md:block">
                      <span className="text-on-surface-variant/40 font-[family-name:var(--font-jetbrains-mono)] text-2xl font-light tracking-tighter">
                        {num}
                      </span>
                    </div>
                    {/* Date */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium tracking-wider">
                        {year}
                      </span>
                      <span className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-wider">
                        {monthDay}
                      </span>
                    </div>
                    {/* Content */}
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface-container-low text-on-surface-variant rounded-full px-2.5 py-0.5 font-[family-name:var(--font-inter)] text-[0.6rem] tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="group-hover:text-tertiary mb-3 font-[family-name:var(--font-source-serif)] text-xl font-semibold tracking-tight transition-colors md:text-[1.35rem]">
                        <span className="from-tertiary to-tertiary bg-gradient-to-r bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_1px]">
                          {title}
                        </span>
                      </h3>
                      <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
                        {summary}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Browse by Topic */}
      {sortedTags.length > 0 && (
        <section className="border-outline-variant border-t pt-16">
          <div className="mb-8">
            <h4 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.2em] uppercase">
              Browse by Topic
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortedTags.map((t) => (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="bg-surface-container-low text-on-surface-variant hover:bg-tertiary hover:text-on-tertiary rounded-full px-4 py-1.5 font-[family-name:var(--font-inter)] text-sm tracking-wider transition-all"
              >
                {t}
              </Link>
            ))}
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
