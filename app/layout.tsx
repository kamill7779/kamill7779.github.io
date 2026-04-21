import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Inter, Source_Serif_4, JetBrains_Mono, Fira_Code } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import TopNavBar from '@/components/TopNavBar'
import Footer from '@/components/Footer'
import ReadingProgress from '@/components/ReadingProgress'
import ScrollTop from '@/components/ScrollTop'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import Script from 'next/script'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} ${firaCode.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
        precedence="default"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
        precedence="default"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
        precedence="default"
      />
      <link
        rel="manifest"
        href={`${basePath}/static/favicons/site.webmanifest`}
        precedence="default"
      />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#1A1A1A"
        precedence="default"
      />
      <meta name="msapplication-TileColor" content="#FDFBF6" />
      <meta name="theme-color" content="#FDFBF6" />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${basePath}/feed.xml`}
        precedence="default"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        rel="stylesheet"
        precedence="default"
      />
      <body className="bg-background font-body text-on-background selection:bg-tertiary selection:text-on-tertiary antialiased">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <Script
            async
            src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
            strategy="afterInteractive"
          />
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <TopNavBar />
            <ReadingProgress />
            <main className="min-h-screen">{children}</main>
            <ScrollTop />
            <Footer />
          </SearchProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
