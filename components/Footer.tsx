import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-outline-variant/10 bg-surface-container-low mt-24 w-full border-t py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <div className="text-on-surface text-sm font-bold tracking-widest uppercase">
          {siteMetadata.title}
        </div>
        <div className="text-on-surface-variant font-label text-xs tracking-widest uppercase opacity-60">
          &copy; {new Date().getFullYear()} {siteMetadata.author}. Built with precision.
        </div>
        <div className="flex gap-8">
          <a
            className="text-on-surface-variant hover:text-on-surface font-label text-xs tracking-widest uppercase transition-colors"
            href="/feed.xml"
          >
            RSS Feed
          </a>
          <a
            className="text-on-surface-variant hover:text-on-surface font-label text-xs tracking-widest uppercase transition-colors"
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
