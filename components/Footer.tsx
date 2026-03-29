import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-outline-variant/5 mt-24 w-full border-t bg-stone-100 py-12 dark:bg-stone-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <div className="text-sm font-bold tracking-widest text-black uppercase dark:text-white">
          {siteMetadata.title}
        </div>
        <div className="font-[family-name:var(--font-manrope)] text-xs tracking-widest text-stone-900 uppercase opacity-60 dark:text-stone-100">
          &copy; {new Date().getFullYear()} {siteMetadata.author}. Built with precision.
        </div>
        <div className="flex gap-8">
          <a
            className="font-[family-name:var(--font-manrope)] text-xs tracking-widest text-stone-400 uppercase transition-colors hover:text-black dark:text-stone-500 dark:hover:text-white"
            href="/feed.xml"
          >
            RSS Feed
          </a>
          <a
            className="font-[family-name:var(--font-manrope)] text-xs tracking-widest text-stone-400 uppercase transition-colors hover:text-black dark:text-stone-500 dark:hover:text-white"
            href={siteMetadata.siteRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  )
}
