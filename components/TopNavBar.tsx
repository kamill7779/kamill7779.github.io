'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

export default function TopNavBar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-background/90 fixed top-0 z-50 h-16 w-full border-b-0 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="text-on-surface font-[family-name:var(--font-source-serif)] text-lg font-semibold tracking-tight"
        >
          {siteMetadata.title}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {headerNavLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActive
                    ? 'text-on-surface font-medium'
                    : 'text-on-surface-variant hover:text-on-surface'
                } font-[family-name:var(--font-inter)] text-sm tracking-tight transition-colors`}
              >
                {link.title}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-on-surface-variant hover:text-on-surface rounded-full p-2 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="bg-background border-outline-variant border-b md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-0 px-6 py-4">
            {headerNavLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`${
                    isActive
                      ? 'text-on-surface font-medium'
                      : 'text-on-surface-variant hover:text-on-surface'
                  } py-3 text-sm tracking-tight transition-colors`}
                >
                  {link.title}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
