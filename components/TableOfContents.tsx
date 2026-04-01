'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  value: string
  url: string
  depth: number
}

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

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
      const el = document.getElementById(url)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  return (
    <nav>
      <h4 className="text-on-surface-variant mb-3 font-[family-name:var(--font-manrope)] text-xs tracking-widest uppercase">
        Contents
      </h4>
      <ul className="space-y-1.5">
        {toc.map(({ value, url, depth }) => (
          <li key={url}>
            <a
              href={`#${url}`}
              className={`block text-xs transition-colors ${
                depth === 3 ? 'pl-3' : depth === 4 ? 'pl-6' : ''
              } ${
                activeId === url
                  ? 'text-primary font-medium'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(url)?.scrollIntoView({ behavior: 'smooth' })
                setActiveId(url)
              }}
            >
              {value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
