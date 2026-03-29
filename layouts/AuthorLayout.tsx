import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  return (
    <div className="prose dark:prose-invert text-on-surface-variant max-w-none text-lg leading-[1.6] dark:text-stone-400">
      {children}
    </div>
  )
}
