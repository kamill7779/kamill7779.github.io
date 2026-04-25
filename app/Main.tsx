import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

// Voronoi-style decorative SVG pattern — adapts to light/dark via currentColor
function VoronoiPattern() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="text-outline-variant h-full w-full opacity-80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="voronoiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {/* Cell-like polygons simulating Voronoi diagram */}
      <polygon
        points="50,30 120,50 100,120 30,100"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <polygon
        points="120,50 200,40 220,110 140,130 100,120"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="200,40 280,60 300,130 220,110"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="280,60 350,50 370,120 320,140 300,130"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="350,50 390,80 380,150 340,160 320,140 370,120"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="30,100 100,120 90,200 20,180"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="100,120 140,130 160,210 90,200"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="140,130 220,110 240,190 160,210"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <polygon
        points="220,110 300,130 310,200 240,190"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="300,130 320,140 340,160 350,220 310,200"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="320,140 370,120 380,150 390,200 350,220 340,160"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="20,180 90,200 80,280 10,260"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="90,200 160,210 150,290 80,280"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="160,210 240,190 260,270 150,290"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="240,190 310,200 320,260 260,270"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <polygon
        points="310,200 350,220 360,280 320,260"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="350,220 390,200 395,270 360,280"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="10,260 80,280 70,360 5,340"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="80,280 150,290 140,370 70,360"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="150,290 260,270 280,350 140,370"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="260,270 320,260 330,340 280,350"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="320,260 360,280 370,330 330,340"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <polygon
        points="360,280 395,270 398,320 370,330"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="5,340 70,360 60,395 0,395"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="70,360 140,370 130,395 60,395"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="140,370 280,350 300,395 130,395"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <polygon
        points="280,350 330,340 340,395 300,395"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <polygon
        points="330,340 370,330 380,395 340,395"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <polygon
        points="370,330 398,320 400,395 380,395"
        fill="url(#voronoiGrad)"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  )
}

export default function Home({ posts }) {
  const featured = posts.slice(0, 2)
  const recent = posts.slice(0, MAX_DISPLAY)

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-12">
      {/* Hero */}
      <FadeIn>
        <header className="mb-24 md:mb-32">
          <div className="max-w-3xl">
            <p className="text-on-surface-variant mb-6 font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.2em] uppercase">
              {siteMetadata.author}&apos;s Blog
            </p>
            <h1 className="text-on-surface mb-8 font-[family-name:var(--font-source-serif)] text-4xl leading-[1.15] font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Think in agents.
              <br />
              Build with systems.
              <br />
              Live with AI.
            </h1>
            <div className="bg-tertiary mb-6 h-px w-12"></div>
            <div className="text-on-surface-variant max-w-xl text-lg leading-relaxed md:text-xl">
              {siteMetadata.description}
            </div>
          </div>
        </header>
      </FadeIn>

      {/* Divider */}
      <div className="bg-outline-variant mb-16 h-px w-full md:mb-24" />

      {/* Promo Card - Anthropic-style */}
      <FadeIn delay={50}>
        <section className="mb-20 md:mb-28">
          <Link
            href="/blog/tcp-reliable-transmission/"
            className="group -mx-6 block cursor-pointer md:-mx-12"
          >
            <div className="bg-inverse-surface dark:bg-surface-container-high relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:mx-12 md:rounded-2xl group-hover:md:mx-0 group-hover:md:rounded-none">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left - Text */}
                <div className="flex flex-col justify-center px-8 py-16 md:px-16 md:py-20">
                  <h2 className="text-inverse-on-surface dark:text-on-surface font-[family-name:var(--font-source-serif)] text-4xl leading-[1.1] font-semibold tracking-tight md:text-5xl lg:text-[3.5rem]">
                    TCP Reliable
                    <br />
                    Transmission
                  </h2>
                  <p className="text-inverse-primary dark:text-on-surface-variant mt-6 max-w-sm text-lg leading-relaxed">
                    Deep dive into how TCP builds reliable data transfer over the unreliable IP
                    layer.
                  </p>
                  <div className="mt-8">
                    <span className="bg-inverse-on-surface text-inverse-surface group-hover:bg-tertiary group-hover:text-on-tertiary dark:bg-on-surface dark:text-surface dark:group-hover:bg-tertiary dark:group-hover:text-on-tertiary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300">
                      Continue reading
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* Right - Pattern */}
                <div className="relative hidden md:block">
                  <div className="text-outline-variant dark:text-surface-variant absolute inset-0 p-8">
                    <VoronoiPattern />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </FadeIn>

      {/* Featured */}
      {featured.length > 0 && (
        <FadeIn delay={100}>
          <section className="mb-20 md:mb-28">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.2em] uppercase">
                Featured
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              {featured.map((post, i) => {
                const { slug, title, summary, tags } = post
                return (
                  <Link key={slug} href={`/blog/${slug}`} className="group block cursor-pointer">
                    <article className="flex h-full flex-col justify-between">
                      <div>
                        <p className="text-on-surface-variant mb-4 font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-[0.15em] uppercase">
                          {tags?.[0]?.toUpperCase() || 'BLOG'}
                        </p>
                        <h3 className="text-on-surface group-hover:text-tertiary mb-4 font-[family-name:var(--font-source-serif)] text-2xl font-semibold tracking-tight transition-colors md:text-[1.75rem]">
                          {title}
                        </h3>
                        <p className="text-on-surface-variant mb-6 max-w-sm text-sm leading-relaxed">
                          {summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-tertiary h-px w-0 transition-all duration-300 group-hover:w-8" />
                        <span className="text-on-surface group-hover:text-tertiary font-[family-name:var(--font-jetbrains-mono)] text-[0.7rem] tracking-wider uppercase transition-colors">
                          Read article
                        </span>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Divider */}
      <div className="bg-outline-variant mb-16 h-px w-full md:mb-24" />

      {/* Recent Posts */}
      <FadeIn delay={200}>
        <section>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-xs tracking-[0.2em] uppercase">
              Recent Posts
            </h2>
          </div>
          <div className="space-y-0">
            {recent.map((post, index) => {
              const { slug, date, title, summary, tags } = post
              const isLast = index === recent.length - 1
              const dateObj = new Date(date)
              const year = dateObj.getFullYear()
              const monthDay = dateObj.toLocaleDateString(siteMetadata.locale, {
                month: 'short',
                day: 'numeric',
              })
              const num = String(index + 1).padStart(2, '0')
              return (
                <Link key={slug} href={`/blog/${slug}`} className="group block cursor-pointer">
                  <article className={`py-8 ${!isLast ? 'border-outline-variant border-b' : ''}`}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[80px_60px_1fr] md:gap-6">
                      {/* Index */}
                      <div className="hidden md:block">
                        <span className="text-on-surface-variant/40 font-[family-name:var(--font-jetbrains-mono)] text-2xl font-light tracking-tighter">
                          {num}
                        </span>
                      </div>
                      {/* Date */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-on-surface font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium tracking-wider">
                          {year}
                        </span>
                        <span className="text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)] text-[0.65rem] tracking-wider">
                          {monthDay}
                        </span>
                      </div>
                      {/* Content */}
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          {tags?.map((tag) => (
                            <span
                              key={tag}
                              className="bg-surface-container-low text-on-surface-variant rounded-full px-2.5 py-0.5 font-[family-name:var(--font-inter)] text-[0.6rem] tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h4 className="group-hover:text-tertiary mb-3 font-[family-name:var(--font-source-serif)] text-xl font-semibold tracking-tight transition-colors md:text-[1.35rem]">
                          <span className="from-tertiary to-tertiary bg-gradient-to-r bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-500 group-hover:bg-[length:100%_1px]">
                            {title}
                          </span>
                        </h4>
                        <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
                          {summary}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
          <div className="mt-12">
            <Link
              href="/blog"
              className="group hover:text-tertiary inline-flex items-center gap-3 text-sm font-medium tracking-tight transition-colors"
            >
              <span className="text-on-surface group-hover:text-tertiary transition-colors">
                View all posts
              </span>
              <span className="bg-on-surface group-hover:bg-tertiary h-px w-6 transition-all group-hover:w-10" />
            </Link>
          </div>
        </section>
      </FadeIn>
    </main>
  )
}
