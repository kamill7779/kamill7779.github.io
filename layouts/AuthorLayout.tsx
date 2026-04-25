import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  return (
    <div className="prose text-on-surface-variant max-w-none text-lg leading-[1.6]">{children}</div>
  )
}
