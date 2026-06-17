import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import ClientProviders from '@/components/ui/ClientProviders'
import ScrollProgress from '@/components/ui/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'

const syne = localFont({
  src: '../public/assets/Font/Syne-VariableFont_wght.ttf',
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = localFont({
  src: [
    {
      path: '../public/assets/Font/DMSans-VariableFont_opsz,wght.ttf',
      style: 'normal',
    },
    {
      path: '../public/assets/Font/DMSans-Italic-VariableFont_opsz,wght.ttf',
      style: 'italic',
    }
  ],
  variable: '--font-dm-sans',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
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
        <ClientProviders>
          <ScrollProgress />
          <Navigation />
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ClientProviders>
      </body>
    </html>
  )
}