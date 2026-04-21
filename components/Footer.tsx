import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="bg-background border-outline-variant w-full border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row md:px-12">
        <div className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-wider">
          &copy; {new Date().getFullYear()} {siteMetadata.author}
        </div>
        <div className="flex items-center gap-6">
          <a
            className="text-on-surface-variant hover:text-on-surface text-xs tracking-tight transition-colors"
            href="/feed.xml"
          >
            RSS
          </a>
          <a
            className="text-on-surface-variant hover:text-on-surface text-xs tracking-tight transition-colors"
            href={siteMetadata.siteRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
