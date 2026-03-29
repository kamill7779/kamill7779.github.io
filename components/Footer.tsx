import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-24 bg-stone-100 dark:bg-stone-900 border-t border-outline-variant/5">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 gap-4">
        <div className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
          {siteMetadata.title}
        </div>
        <div className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase text-stone-900 dark:text-stone-100 opacity-60">
          &copy; {new Date().getFullYear()} {siteMetadata.author}. Built with
          precision.
        </div>
        <div className="flex gap-8">
          <a
            className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors"
            href="/feed.xml"
          >
            RSS Feed
          </a>
          <a
            className="font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors"
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
