'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  value: string
  url: string
  depth: number
}

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

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
      <h4 className="text-on-surface-variant mb-4 font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-widest uppercase">
        On this page
      </h4>
      <ul className="border-outline-variant/30 space-y-1 border-l">
        {toc.map(({ value, url, depth }) => {
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
                    ? 'border-primary text-primary -ml-px border-l-2 font-medium'
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
    </nav>
  )
}
