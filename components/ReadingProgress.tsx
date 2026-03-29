'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ReadingProgress() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100)
      }
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [pathname])

  if (progress < 1) return null

  return (
    <div
      className="fixed top-20 left-0 z-50 h-[2px] transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    >
      <div className="bg-primary h-full" />
    </div>
  )
}
