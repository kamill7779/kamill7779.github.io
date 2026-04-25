'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeColor() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', resolvedTheme === 'dark' ? '#121212' : '#FDFBF6')
    }
  }, [resolvedTheme])

  return null
}
