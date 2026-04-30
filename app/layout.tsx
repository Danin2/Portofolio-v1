import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import ClientProviders from '@/components/ui/ClientProviders'
import ScrollProgress from '@/components/ui/ScrollProgress'


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
    default: 'Backend Developer Portfolio | Node.js & TypeScript Expert',
    template: '%s | Backend Developer Portfolio',
  },
  description: 'Professional backend developer specializing in Node.js, TypeScript, PostgreSQL, REST APIs, and scalable system architecture. Building robust, maintainable backend solutions.',
  keywords: [
    'Backend Developer',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'REST API',
    'System Architecture',
    'Express.js',
    'Database Design',
    'Microservices',
    'API Development',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourwebsite.com'), // ← Ganti dengan domain Anda
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Backend Developer Portfolio | Node.js & TypeScript Expert',
    description: 'Professional backend developer specializing in Node.js, TypeScript, and scalable system architecture.',
    siteName: 'Backend Developer Portfolio',
    images: [
      {
        url: '/og-image.jpg', // Buat image ini nanti (1200x630px)
        width: 1200,
        height: 630,
        alt: 'Backend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backend Developer Portfolio',
    description: 'Professional backend developer specializing in Node.js and TypeScript',
    creator: '@yourusername', // ← Ganti dengan Twitter handle Anda
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code', // Akan dikasih Google Search Console
    // yandex: 'your-yandex-verification-code',
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
        <ScrollProgress />
        <ClientProviders>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}