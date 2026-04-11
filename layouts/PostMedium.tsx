import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import TableOfContents from '@/components/TableOfContents'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostMedium({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags, summary, toc } = content
  const readingTime = content.readingTime as { text: string } | undefined

  return (
    <main className="pt-32 pb-24">
      <article className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <header className="mb-16">
          <div className="text-on-surface-variant mb-6 flex items-center gap-3 font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            {readingTime && (
              <>
                <span className="opacity-40">·</span>
                <span>{readingTime.text}</span>
              </>
            )}
            <span id="busuanzi_container_page_pv" className="hidden">
              <span className="opacity-40">·</span>
              <span className="material-symbols-outlined mr-0.5 align-middle text-[10px]">
                visibility
              </span>
              <span id="busuanzi_value_page_pv" />
            </span>
          </div>
          <h1 className="text-primary text-4xl leading-[1.15] font-extrabold tracking-tight md:text-5xl">
            {title}
          </h1>
          {summary && (
            <p className="text-on-surface-variant mt-6 text-lg leading-relaxed">{summary}</p>
          )}
          {/* Author row */}
          <div className="mt-8 flex items-center gap-3">
            {authorDetails.map((author) => (
              <div key={author.name} className="flex items-center gap-2">
                {author.avatar && (
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span className="text-on-surface text-sm font-medium">{author.name}</span>
              </div>
            ))}
          </div>
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-on-surface-variant hover:text-primary border-outline-variant/30 border px-2.5 py-0.5 font-[family-name:var(--font-manrope)] text-[10px] tracking-wider uppercase transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* TOC — inline, collapsible on mobile */}
        {toc && toc.length > 0 && (
          <details className="border-outline-variant/20 mb-12 border-b pb-6">
            <summary className="text-on-surface-variant cursor-pointer font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase select-none">
              Table of Contents
            </summary>
            <div className="mt-4">
              <TableOfContents toc={toc} />
            </div>
          </details>
        )}

        {/* Content */}
        <div className="prose-medium text-on-surface max-w-none">{children}</div>

        {/* Footer nav */}
        {(prev || next) && (
          <div className="border-outline-variant/20 mt-20 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:justify-between">
            {prev && prev.path && (
              <Link href={`/${prev.path}`} className="group max-w-xs">
                <span className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase">
                  &larr; Previous
                </span>
                <p className="text-on-surface group-hover:text-primary mt-1 text-sm font-medium transition-colors">
                  {prev.title}
                </p>
              </Link>
            )}
            {next && next.path && (
              <Link href={`/${next.path}`} className="group max-w-xs text-right sm:ml-auto">
                <span className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase">
                  Next &rarr;
                </span>
                <p className="text-on-surface group-hover:text-primary mt-1 text-sm font-medium transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        )}

        {/* Comments */}
        {siteMetadata.comments && (
          <div className="border-outline-variant/20 mt-16 border-t pt-12" id="comment">
            <Comments slug={slug} />
          </div>
        )}
      </article>
    </main>
  )
}
