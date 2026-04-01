import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-outline-variant/10 bg-surface-container-low mt-24 w-full border-t py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <div className="text-on-surface text-sm font-bold tracking-widest uppercase">
          {siteMetadata.title}
        </div>
        <div className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase opacity-60">
          &copy; {new Date().getFullYear()} {siteMetadata.author}. Built with precision.
        </div>
        <div className="text-on-surface-variant font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase opacity-60">
          <span id="busuanzi_container_site_uv" className="hidden">
            <span className="material-symbols-outlined mr-1 align-middle text-xs">group</span>
            <span id="busuanzi_value_site_uv" />
            {' visitors \u00B7 '}
          </span>
          <span id="busuanzi_container_site_pv" className="hidden">
            <span className="material-symbols-outlined mr-1 align-middle text-xs">visibility</span>
            <span id="busuanzi_value_site_pv" />
            {' views'}
          </span>
        </div>
        <div className="flex gap-8">
          <a
            className="text-on-surface-variant hover:text-on-surface font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase transition-colors"
            href="/feed.xml"
          >
            RSS Feed
          </a>
          <a
            className="text-on-surface-variant hover:text-on-surface font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase transition-colors"
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
