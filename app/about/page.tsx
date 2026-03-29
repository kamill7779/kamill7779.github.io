import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <main className="mx-auto max-w-7xl px-8 pt-40 pb-20">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <span className="text-secondary mb-6 block font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
            Biography
          </span>
          <h1 className="text-primary mb-12 text-[3.5rem] leading-[1.1] font-black tracking-tighter dark:text-white">
            Architecting digital systems <br />
            with editorial precision.
          </h1>
          <div className="max-w-2xl">
            <AuthorLayout content={mainContent}>
              <MDXLayoutRenderer code={author.body.code} />
            </AuthorLayout>
          </div>
        </div>
        <div className="sticky top-40 lg:col-span-4">
          <div className="bg-surface-container-high aspect-square overflow-hidden rounded-xl dark:bg-stone-800">
            <div className="flex h-full w-full items-center justify-center">
              <span className="material-symbols-outlined text-[6rem] text-stone-300 dark:text-stone-600">
                person
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Systems Design', 'React', 'Editorial UI'].map((tag) => (
              <span
                key={tag}
                className="bg-surface-container-lowest border-outline-variant/10 rounded-md border px-3 py-1 font-[family-name:var(--font-manrope)] text-[0.7rem] font-bold tracking-wider uppercase dark:bg-stone-900 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Connect section */}
      <div className="bg-surface-container-low border-outline-variant/10 mx-auto mt-48 max-w-4xl rounded-xl border p-12 text-center dark:bg-stone-900">
        <span className="text-secondary mb-6 block font-[family-name:var(--font-manrope)] text-[0.7rem] font-black tracking-[0.2em] uppercase">
          Connectivity
        </span>
        <h2 className="text-primary mb-12 text-3xl font-black tracking-tighter dark:text-white">
          Start a Conversation
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            className="bg-primary text-on-primary flex items-center gap-3 rounded-md px-8 py-4 font-bold transition-all active:scale-95"
            href={`mailto:${siteMetadata.email || '#'}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              mail
            </span>{' '}
            Email Me
          </a>
          <a
            className="bg-surface-container-lowest text-primary hover:bg-surface-container-high flex items-center gap-3 rounded-md px-8 py-4 font-bold transition-all active:scale-95 dark:bg-stone-800 dark:text-white dark:hover:bg-stone-700"
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              terminal
            </span>{' '}
            GitHub
          </a>
        </div>
      </div>
    </main>
  )
}
