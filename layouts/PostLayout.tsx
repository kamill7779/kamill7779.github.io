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
  prev?: { path: string; title }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { slug, date, title, tags, summary, toc } = content

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-6 px-6 md:px-12 lg:grid-cols-[minmax(120px,160px)_1fr_minmax(120px,160px)]">
        {/* Left sidebar — meta */}
        <aside className="order-2 lg:order-1">
          <div className="space-y-10 lg:sticky lg:top-28">
            {/* Back link */}
            <Link
              href="/blog"
              className="group text-on-surface-variant hover:text-tertiary inline-flex items-center gap-2 text-sm transition-colors"
            >
              <span className="h-px w-4 bg-current transition-all group-hover:w-6" />
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[0.7rem] tracking-wider uppercase">
                Back
              </span>
            </Link>
            {/* Author */}
            <div className="space-y-3">
              <h4 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-widest uppercase">
                Author
              </h4>
              {authorDetails.map((author) => (
                <div key={author.name} className="flex items-center gap-3">
                  {author.avatar && (
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={author.avatar}
                        width={40}
                        height={40}
                        alt={author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-on-surface text-sm font-medium">{author.name}</p>
                </div>
              ))}
            </div>
            {/* Date */}
            <div className="space-y-1">
              <h4 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-widest uppercase">
                Published
              </h4>
              <p className="text-on-surface text-sm font-medium">
                {formatDate(date, siteMetadata.locale)}
              </p>
            </div>
            {/* Views */}
            <div className="space-y-1">
              <h4 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-widest uppercase">
                Views
              </h4>
              <p className="text-on-surface text-sm font-medium">
                <span id="busuanzi_container_page_pv" className="hidden">
                  <span id="busuanzi_value_page_pv" />
                </span>
              </p>
            </div>
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="border-outline-variant border-t pt-6">
                <h4 className="text-on-surface-variant mb-3 font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-widest uppercase">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-on-surface-variant hover:text-tertiary font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-wider uppercase transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* Prev/Next */}
            {(prev || next) && (
              <div className="border-outline-variant space-y-4 border-t pt-6">
                {prev && prev.path && (
                  <div>
                    <h4 className="text-on-surface-variant mb-1 font-[family-name:var(--font-jetbrains-mono)] text-[0.6rem] tracking-widest uppercase">
                      Previous
                    </h4>
                    <Link
                      href={`/${prev.path}`}
                      className="text-on-surface hover:text-tertiary text-sm font-medium transition-colors"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div>
                    <h4 className="text-on-surface-variant mb-1 font-[family-name:var(--font-jetbrains-mono)] text-[0.6rem] tracking-widest uppercase">
                      Next
                    </h4>
                    <Link
                      href={`/${next.path}`}
                      className="text-on-surface hover:text-tertiary text-sm font-medium transition-colors"
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
          <header className="mb-16">
            <h1 className="text-on-surface mb-6 font-[family-name:var(--font-source-serif)] text-4xl leading-[1.15] font-semibold tracking-tight md:text-5xl">
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
            <div className="border-outline-variant mt-24 border-t pt-12" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </article>

        {/* Right — TOC (desktop only) */}
        {toc && toc.length > 0 && (
          <aside className="order-3 hidden lg:block">
            <nav className="no-scrollbar lg:sticky lg:top-28 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
              <TableOfContents toc={toc} />
            </nav>
          </aside>
        )}
      </div>
    </main>
  )
}
