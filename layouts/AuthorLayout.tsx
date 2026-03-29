import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  return (
    <div className="prose dark:prose-invert max-w-none text-lg leading-[1.6] text-on-surface-variant dark:text-stone-400">
      {children}
    </div>
  )
}
