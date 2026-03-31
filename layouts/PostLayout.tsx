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
          <span className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
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
              <h4 className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
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
                <h4 className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
                  Published
                </h4>
                <p className="text-on-surface text-sm font-medium">
                  {formatDate(date, siteMetadata.locale)}
                </p>
              </div>
              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="border-outline-variant/20 border-t pt-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:bg-primary hover:text-on-primary border px-2 py-1 font-[family-name:var(--font-manrope)] text-[10px] tracking-wider uppercase transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Prev/Next navigation */}
            {(prev || next) && (
              <div className="border-outline-variant/20 space-y-4 border-t pt-4">
                {prev && prev.path && (
                  <div>
                    <h4 className="text-on-surface-variant mb-1 font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase">
                      Previous
                    </h4>
                    <Link
                      href={`/${prev.path}`}
                      className="text-on-surface hover:text-primary text-sm font-medium transition-colors"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div>
                    <h4 className="text-on-surface-variant mb-1 font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase">
                      Next
                    </h4>
                    <Link
                      href={`/${next.path}`}
                      className="text-on-surface hover:text-primary text-sm font-medium transition-colors"
                    >
                      {next.title}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="order-1 lg:order-2 lg:col-span-8 lg:col-start-5">
          <header className="mb-20">
            <h1 className="text-primary mb-8 text-5xl leading-[1.1] font-black tracking-tighter md:text-6xl">
              {title}
            </h1>
            {summary && (
              <p className="text-on-surface-variant max-w-2xl text-xl leading-relaxed font-light">
                {summary}
              </p>
            )}
          </header>
          <div className="prose text-on-surface max-w-none">{children}</div>

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
