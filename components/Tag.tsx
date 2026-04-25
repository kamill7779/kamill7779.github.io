import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary rounded-md px-5 py-2.5 font-[family-name:var(--font-inter)] text-[0.75rem] tracking-widest uppercase transition-all"
    >
      {text}
    </Link>
  )
}

export default Tag
