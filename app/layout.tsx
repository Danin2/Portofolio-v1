import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import ClientProviders from '@/components/ui/ClientProviders'
import ScrollProgress from '@/components/ui/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'
import CustomCursor from '@/components/ui/CustomCursor'
import PageTransition from '@/components/ui/PageTransition'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Danindra I | Backend Systems Architect',
    template: '%s | Muhammad Danindra I',
  },
  description: 'Professional backend developer specializing in Node.js, TypeScript, PostgreSQL, and scalable system architecture.',
  keywords: [
    'Backend Developer',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'System Architecture',
    'MasDani',
  ],
  authors: [{ name: 'Muhammad Danindra I' }],
  creator: 'Muhammad Danindra I',
  publisher: 'Muhammad Danindra I',
  metadataBase: new URL('https://danindra.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danindra.dev',
    title: 'Muhammad Danindra I | Backend Systems Architect',
    description: 'Professional backend developer specializing in Node.js, TypeScript, and scalable system architecture.',
    siteName: 'Muhammad Danindra I Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Danindra I | Backend Systems Architect',
    description: 'Professional backend developer specializing in Node.js and TypeScript',
    creator: '@danindra',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!savedTheme && supportDarkMode) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                  } else if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased">
        <CustomCursor />
        <ScrollProgress />
        <ClientProviders>
          <Navigation />
          <main className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </ClientProviders>
      </body>
    </html>
  )
}