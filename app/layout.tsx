import type { Metadata } from 'next'
import { Lora, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import ClientProviders from '@/components/ui/ClientProviders'
import BackToTop from '@/components/ui/BackToTop'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Danindra I | Frontend Systems Architect',
    template: '%s | Muhammad Danindra I',
  },
  description: 'Professional Frontend developer specializing in Node.js, TypeScript, PostgreSQL, and scalable system architecture.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Theme init script — runs synchronously to prevent flash of wrong theme */}
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
        {/* Preconnect for Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased">
        <ClientProviders>
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