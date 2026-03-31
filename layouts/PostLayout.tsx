import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from 'next/link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags, summary } = content

  return (
    <main className="pt-32 pb-24">
      {/* Back link */}
      <div className="mx-auto mb-16 max-w-7xl px-8">
        <Link
          href="/blog"
          className="group text-on-surface-variant hover:text-primary inline-flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span className="font-label text-xs tracking-widest uppercase">
            Back to Archive
          </span>
        </Link>
      </div>

      <article className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="order-2 lg:order-1 lg:col-span-3">
          <div className="sticky top-32 space-y-12">
            {/* Author */}
            <div className="space-y-4">
              <h4 className="text-on-surface-variant font-label text-xs tracking-widest uppercase">
                Curator
              </h4>
              {authorDetails.map((author) => (
                <div key={author.name} className="flex items-center gap-3">
                  {author.avatar && (
                    <div className="bg-surface-container-high h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={author.avatar}
                        width={40}
                        height={40}
                        alt={author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-on-surface text-sm font-bold">{author.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-on-surface-variant font-label text-xs tracking-widest uppercase">
                  Published
                </h4>
                <p className="text-on-surface text-sm font-medium">
                  {formatDate(date, siteMetadata.locale)}
                </p>
              </div>
              {/* Reading time indicator */}
              <div className="space-y-1">
                <h4 className="text-on-surface-variant font-label text-xs tracking-widest uppercase">
                  Reading
                </h4>
                <p className="text-on-surface text-sm font-medium">~5 min</p>
              </div>
            </div>

            {/* Prev/Next navigation */}
            {(prev || next) && (
              <div className="border-outline-variant/20 space-y-4 border-t pt-6">
                {prev && prev.path && (
                  <Link
                    href={`/${prev.path}`}
                    className="group/prev block space-y-1 transition-opacity hover:opacity-70"
                  >
                    <h4 className="text-on-surface-variant font-label text-[0.65rem] tracking-widest uppercase">
                      <span className="material-symbols-outlined mr-1 align-middle text-xs transition-transform group-hover/prev:-translate-x-0.5">
                        arrow_back
                      </span>
                      Previous
                    </h4>
                    <p className="text-on-surface text-sm font-medium">{prev.title}</p>
                  </Link>
                )}
                {next && next.path && (
                  <Link
                    href={`/${next.path}`}
                    className="group/next block space-y-1 transition-opacity hover:opacity-70"
                  >
                    <h4 className="text-on-surface-variant font-label text-[0.65rem] tracking-widest uppercase">
                      Next
                      <span className="material-symbols-outlined ml-1 align-middle text-xs transition-transform group-hover/next:translate-x-0.5">
                        arrow_forward
                      </span>
                    </h4>
                    <p className="text-on-surface text-sm font-medium">{next.title}</p>
                  </Link>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="order-1 lg:order-2 lg:col-span-8 lg:col-start-5">
          <header className="mb-20">
            <div className="text-on-surface-variant mb-6 flex items-center gap-4 font-label text-xs tracking-widest uppercase">
              <time>{formatDate(date, siteMetadata.locale)}</time>
              {tags?.[0] && (
                <>
                  <span className="bg-outline-variant h-1 w-1 rounded-full"></span>
                  <span>{tags[0]}</span>
                </>
              )}
            </div>
            <h1 className="text-primary mb-8 text-5xl leading-[1.1] font-black tracking-tighter md:text-6xl">
              {title}
            </h1>
            {summary && (
              <p className="text-on-surface-variant bg-surface-container-low mb-0 max-w-2xl border-l-2 border-primary px-6 py-4 text-xl leading-relaxed font-light">
                {summary}
              </p>
            )}
          </header>
          <div className="prose text-on-surface max-w-none">{children}</div>

          {/* Post footer */}
          {tags && tags.length > 1 && (
            <div className="mt-16 flex flex-wrap items-center gap-2">
              <span className="text-on-surface-variant mr-2 font-label text-xs tracking-widest uppercase">
                Tags
              </span>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="bg-surface-container-low text-on-surface-variant hover:bg-primary hover:text-on-primary rounded-full px-3 py-1 font-label text-[0.65rem] tracking-wider uppercase transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Comments */}
          {siteMetadata.comments && (
            <div className="border-outline-variant/20 mt-24 border-t pt-12" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
