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
    <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8">
          <span className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase text-secondary mb-6 block">
            Biography
          </span>
          <h1 className="text-[3.5rem] font-black leading-[1.1] tracking-tighter text-primary dark:text-white mb-12">
            Architecting digital systems <br />
            with editorial precision.
          </h1>
          <div className="max-w-2xl">
            <AuthorLayout content={mainContent}>
              <MDXLayoutRenderer code={author.body.code} />
            </AuthorLayout>
          </div>
        </div>
        <div className="lg:col-span-4 sticky top-40">
          <div className="rounded-xl overflow-hidden aspect-square bg-surface-container-high dark:bg-stone-800">
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[6rem] text-stone-300 dark:text-stone-600">
                person
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Systems Design', 'React', 'Editorial UI'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface-container-lowest dark:bg-stone-900 text-[0.7rem] font-[family-name:var(--font-manrope)] font-bold uppercase tracking-wider rounded-md border border-outline-variant/10 dark:text-stone-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Connect section */}
      <div className="mt-48 p-12 rounded-xl bg-surface-container-low dark:bg-stone-900 border border-outline-variant/10 text-center max-w-4xl mx-auto">
        <span className="font-[family-name:var(--font-manrope)] text-[0.7rem] font-black uppercase tracking-[0.2em] text-secondary mb-6 block">
          Connectivity
        </span>
        <h2 className="text-3xl font-black text-primary dark:text-white mb-12 tracking-tighter">
          Start a Conversation
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            className="px-8 py-4 bg-primary text-on-primary rounded-md font-bold transition-all active:scale-95 flex items-center gap-3"
            href={`mailto:${siteMetadata.email || '#'}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              mail
            </span>{' '}
            Email Me
          </a>
          <a
            className="px-8 py-4 bg-surface-container-lowest dark:bg-stone-800 text-primary dark:text-white rounded-md font-bold transition-all hover:bg-surface-container-high dark:hover:bg-stone-700 active:scale-95 flex items-center gap-3"
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
