import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-8 pt-40 pb-24 text-center">
      <span className="text-secondary mb-8 font-[family-name:var(--font-manrope)] text-[0.7rem] font-black tracking-[0.3em] uppercase">
        Error 404
      </span>
      <h1 className="text-primary mb-6 text-[6rem] leading-none font-black tracking-tighter">
        Lost?
      </h1>
      <p className="text-on-surface-variant mb-16 max-w-md text-lg leading-relaxed">
        This page doesn&apos;t exist, or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-primary text-on-primary rounded-md px-8 py-4 font-bold transition-all active:scale-95"
        >
          Back to Home
        </Link>
        <Link
          href="/blog"
          className="bg-surface-container text-on-surface hover:bg-surface-container-high rounded-md px-8 py-4 font-bold transition-all active:scale-95"
        >
          Browse Archive
        </Link>
      </div>
    </main>
  )
}
