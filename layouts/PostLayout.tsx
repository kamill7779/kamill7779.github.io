import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import TableOfContents from '@/components/TableOfContents'
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
  const { path, slug, date, title, tags, summary, toc } = content

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

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-8 lg:grid-cols-[220px_1fr_200px]">
        {/* Left sidebar — meta */}
        <aside className="order-2 lg:order-1">
          <div className="space-y-10 lg:sticky lg:top-32">
            {/* Author */}
            <div className="space-y-3">
              <h4 className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
                Author
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
                  <p className="text-on-surface text-sm font-bold">{author.name}</p>
                </div>
              ))}
            </div>
            {/* Date */}
            <div className="space-y-1">
              <h4 className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
                Published
              </h4>
              <p className="text-on-surface text-sm font-medium">
                {formatDate(date, siteMetadata.locale)}
              </p>
            </div>
            {/* Views */}
            <div className="space-y-1">
              <h4 className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
                Views
              </h4>
              <p className="text-on-surface text-sm font-medium">
                <span id="busuanzi_container_page_pv" className="hidden">
                  <span className="material-symbols-outlined mr-1 align-middle text-xs">
                    visibility
                  </span>
                  <span id="busuanzi_value_page_pv" />
                </span>
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
            {/* Prev/Next */}
            {(prev || next) && (
              <div className="border-outline-variant/20 space-y-3 border-t pt-4">
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

        {/* Center — article */}
        <article className="order-1 min-w-0 lg:order-2">
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
          {siteMetadata.comments && (
            <div className="border-outline-variant/20 mt-24 border-t pt-12" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </article>

        {/* Right — TOC */}
        {toc && toc.length > 0 && (
          <aside className="order-3 lg:self-start">
            <nav className="no-scrollbar lg:sticky lg:top-32 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
              <TableOfContents toc={toc} />
            </nav>
          </aside>
        )}
      </div>
    </main>
  )
}
