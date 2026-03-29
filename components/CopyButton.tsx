'use client'

import { useState } from 'react'

export default function CopyButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const codeBlock = document.activeElement?.closest('pre')?.querySelector('code')
    if (!codeBlock) return
    navigator.clipboard.writeText(codeBlock.textContent || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 rounded-md p-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
      aria-label="Copy code"
      type="button"
    >
      {copied ? (
        <span className="text-green-500">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 00 1.014.094l-8 8a1 1 001.014.094l-4-4a1 1 10 1.414-1.414L7 12.586 15.293 4.293z" clipRule="evenodd" />
          </svg>
        </span>
      ) : (
        <span className="text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 2 0 1 2 0v3a1 1 00 1-2 0V3zM14 3a1 2 0 1 2 0v3a1 1 00 1-2 0V3zM3 8a1 2 0 1 2 0v3a1 1 00 1-2 0V3zM3 14a1 2 0 1 2 0v3a1 1 00 1-2 0V3zM5 17a2 2 0 0 0-2V5a2 2 0 0 1 2-2h6l4 4v10a2 2 0 0 1-2 2H5z" />
          </svg>
        </span>
      )}
    </button>
  )
}
