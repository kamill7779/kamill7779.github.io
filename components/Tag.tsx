import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-surface-container-low text-primary-contrast hover:bg-primary hover:text-on-primary rounded-md px-5 py-2.5 font-[family-name:var(--font-manrope)] text-[0.75rem] tracking-widest uppercase transition-all dark:bg-stone-800 dark:text-stone-100"
    >
      {text}
    </Link>
  )
}

export default Tag
