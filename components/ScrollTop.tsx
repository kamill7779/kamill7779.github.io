'use client'

import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="bg-primary text-on-primary fixed right-8 bottom-8 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <span className="material-symbols-outlined text-[20px]">keyboard_arrow_up</span>
    </button>
  )
}
