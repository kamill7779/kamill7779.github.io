'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const Sun = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const Moon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

const Monitor = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-surface-container-high flex h-8 w-[88px] items-center rounded-full">
        <div className="bg-surface-bright mx-0.5 h-7 w-7 rounded-full" />
      </div>
    )
  }

  const current = theme || 'light'

  return (
    <div
      className="bg-surface-container-high border-outline-variant relative flex h-8 w-[88px] items-center rounded-full border"
      role="group"
      aria-label="Theme switch"
    >
      {/* Active indicator */}
      <div
        className="bg-surface-bright absolute h-7 w-7 rounded-full shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: current === 'light' ? '2px' : current === 'system' ? '30px' : '58px',
        }}
      />

      {/* Light */}
      <button
        onClick={() => setTheme('light')}
        aria-label="Light mode"
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          current === 'light' ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </button>

      {/* System */}
      <button
        onClick={() => setTheme('system')}
        aria-label="System preference"
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          current === 'system' ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>

      {/* Dark */}
      <button
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
          current === 'dark' ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default ThemeSwitch
