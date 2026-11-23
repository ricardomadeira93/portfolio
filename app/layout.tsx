import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = 'https://www.ricardomadeira.dev'
const siteDescription =
  'Full stack developer in Portugal, working remotely. Four years building web applications in production with React, Next.js, TypeScript, Python, FastAPI and .NET: RAG pipelines and LLM features, a geospatial portal for the public administration, payment and back-office systems.'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ricardo Madeira',
  url: siteUrl,
  jobTitle: 'Full Stack Developer',
  description: siteDescription,
  knowsLanguage: ['pt', 'en', 'es'],
  worksFor: { '@type': 'Organization', name: 'Winning' },
  address: { '@type': 'PostalAddress', addressCountry: 'PT' },
  sameAs: [
    'https://github.com/ricardomadeira93',
    'https://www.linkedin.com/in/ricardo-madeira-8ab393280/',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ricardo Madeira | Full Stack Developer',
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: siteUrl,
    title: 'Ricardo Madeira | Full Stack Developer',
    description: siteDescription,
    siteName: 'Ricardo Madeira',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
