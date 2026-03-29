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

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { path, slug, date, title, tags, summary } = content

  return (
    <main className="pt-32 pb-24">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 group text-stone-500 hover:text-primary dark:hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
            Back to Archive
          </span>
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-32 space-y-12">
            {/* Author */}
            <div className="space-y-4">
              <h4 className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase text-stone-400">
                Curator
              </h4>
              {authorDetails.map((author) => (
                <div key={author.name} className="flex items-center gap-3">
                  {author.avatar && (
                    <div className="w-10 h-10 rounded-full bg-surface-container-high dark:bg-stone-800 overflow-hidden">
                      <Image src={author.avatar} width={40} height={40} alt={author.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm dark:text-white">{author.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase text-stone-400">
                  Published
                </h4>
                <p className="text-sm font-medium dark:text-stone-300">
                  {formatDate(date, siteMetadata.locale)}
                </p>
              </div>
              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="pt-4 border-t border-outline-variant/20">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="bg-surface-container-lowest dark:bg-stone-900 text-[10px] font-[family-name:var(--font-manrope)] px-2 py-1 tracking-wider uppercase border border-outline-variant/30 dark:text-stone-500 hover:bg-primary hover:text-on-primary transition-all"
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
              <div className="pt-4 border-t border-outline-variant/20 space-y-4">
                {prev && prev.path && (
                  <div>
                    <h4 className="font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase text-stone-400 mb-1">
                      Previous
                    </h4>
                    <Link
                      href={`/${prev.path}`}
                      className="text-sm font-medium hover:text-primary dark:hover:text-white transition-colors dark:text-stone-300"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div>
                    <h4 className="font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase text-stone-400 mb-1">
                      Next
                    </h4>
                    <Link
                      href={`/${next.path}`}
                      className="text-sm font-medium hover:text-primary dark:hover:text-white transition-colors dark:text-stone-300"
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
        <div className="lg:col-span-8 lg:col-start-5 order-1 lg:order-2">
          <header className="mb-20">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-8 text-primary dark:text-white">
              {title}
            </h1>
            {summary && (
              <p className="text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl">
                {summary}
              </p>
            )}
          </header>
          <div className="prose max-w-none text-on-surface dark:text-stone-300">
            {children}
          </div>

          {/* Comments */}
          {siteMetadata.comments && (
            <div className="mt-24 pt-12 border-t border-outline-variant/20" id="comment">
              <Comments slug={slug} />
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
