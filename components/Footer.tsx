import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-outline-variant w-full border-t">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="text-on-surface font-[family-name:var(--font-source-serif)] text-lg font-semibold tracking-tight"
            >
              {siteMetadata.title}
            </Link>
            <p className="text-on-surface-variant mt-3 max-w-xs text-sm leading-relaxed">
              {siteMetadata.description}
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <h4 className="text-on-surface-variant mb-4 font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-[0.15em] uppercase">
                Content
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tags"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    Tags
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-on-surface-variant mb-4 font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-[0.15em] uppercase">
                About
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <a
                    href={siteMetadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteMetadata.email}`}
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-on-surface-variant mb-4 font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-[0.15em] uppercase">
                Subscribe
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/feed.xml"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    RSS Feed
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-outline-variant/50 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 md:flex-row md:px-12">
          <div className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-wider">
            &copy; {currentYear} {siteMetadata.author}
          </div>
          <div className="text-on-surface-variant text-[0.65rem] tracking-wider">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-on-surface transition-colors"
            >
              Next.js
            </a>
            {' & '}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-on-surface transition-colors"
            >
              Tailwind
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
