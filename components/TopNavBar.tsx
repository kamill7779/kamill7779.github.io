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

  useEffect(() => setMounted(true), [])

  const darkMode = theme === 'dark'

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-stone-950/70 backdrop-blur-xl transition-all h-20 border-b border-outline-variant/5">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-full">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-black dark:text-white"
        >
          Kamil's Blog
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {headerNavLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActive
                    ? 'text-black dark:text-white font-bold border-b-2 border-black dark:border-white pb-1'
                    : 'text-stone-500 dark:text-stone-400 hover:text-black dark:hover:text-white'
                } transition-colors font-[family-name:var(--font-inter)] antialiased tracking-tight`}
              >
                {link.title}
              </Link>
            )
          })}
          <div className="flex items-center gap-4 ml-4">
            {mounted && (
              <button
                onClick={() => setTheme(darkMode ? 'light' : 'dark')}
                className="hover:opacity-80 transition-opacity active:scale-95 duration-150 p-2 rounded-full"
                aria-label="Toggle dark mode"
              >
                <span className="material-symbols-outlined text-black dark:text-white">
                  {darkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
