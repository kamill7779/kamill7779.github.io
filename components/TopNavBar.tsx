'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import headerNavLinks from '@/data/headerNavLinks'

export default function TopNavBar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const darkMode = theme === 'dark'

  return (
    <nav className="border-outline-variant/10 bg-surface/80 fixed top-0 z-50 h-20 w-full border-b backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <Link href="/" className="text-on-surface text-xl font-black tracking-tighter">
          Kamil&apos;s Blog
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
                  isActive ? 'nav-link-active text-on-surface font-bold' : 'text-on-surface-variant hover:text-on-surface'
                } nav-link pb-1 font-body text-sm tracking-tight antialiased transition-colors`}
              >
                {link.title}
              </Link>
            )
          })}
          <div className="ml-4 flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(darkMode ? 'light' : 'dark')}
                className="text-on-surface rounded-full p-2 transition-opacity duration-150 hover:opacity-80 active:scale-95"
                aria-label="Toggle dark mode"
              >
                <span className="material-symbols-outlined">
                  {darkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(darkMode ? 'light' : 'dark')}
              className="text-on-surface rounded-full p-2 transition-opacity duration-150 hover:opacity-80"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-on-surface rounded-full p-2 transition-opacity duration-150 hover:opacity-80 active:scale-95"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-outline-variant/10 bg-surface/95 border-b backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-8 py-4">
            {headerNavLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`${
                    isActive
                      ? 'border-primary text-on-surface border-l-2 pl-4 font-bold'
                      : 'text-on-surface-variant hover:text-on-surface pl-4'
                  } py-3 font-body text-sm tracking-tight antialiased transition-colors`}
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
