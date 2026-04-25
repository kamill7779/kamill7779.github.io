'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  value: string
  url: string
  depth: number
}

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(true)

  const getId = (url: string) => url.replace(/^#/, '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )

    toc.forEach(({ url }) => {
      const el = document.getElementById(getId(url))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  return (
    <nav>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="group flex w-full cursor-pointer items-center justify-between"
        aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
      >
        <h4 className="text-on-surface-variant mb-4 font-[family-name:var(--font-inter)] text-[0.65rem] tracking-widest uppercase">
          On this page
        </h4>
        <svg
          className={`text-on-surface-variant h-3.5 w-3.5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'}`}
      >
        <ul className="border-outline-variant/30 space-y-1 border-l">
          {toc
            .filter((item) => item.depth >= 2 && item.depth <= 4 && !item.url.startsWith('#title-'))
            .map(({ value, url, depth }) => {
              const id = getId(url)
              const isActive = activeId === id
              return (
                <li key={url}>
                  <a
                    href={`#${id}`}
                    className={`block py-0.5 text-xs transition-colors ${
                      depth === 3 ? 'pl-4' : depth === 4 ? 'pl-7' : 'pl-2'
                    } ${
                      isActive
                        ? 'border-tertiary text-tertiary -ml-px border-l-2 font-medium'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                      setActiveId(id)
                    }}
                  >
                    {value}
                  </a>
                </li>
              )
            })}
        </ul>
      </div>
    </nav>
  )
}
