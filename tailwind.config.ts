import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary:  'var(--bg-tertiary)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
        accent: {
          purple: 'var(--accent-purple)',
          violet: 'var(--accent-violet)',
          blue:   '#3b82f6',
          green:  '#22c55e',
          red:    '#ef4444',
          yellow: '#eab308',
        },
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        syne:    ['var(--font-syne)', 'system-ui', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'h1':      ['3rem',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2':      ['2.25rem',{ lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'h3':      ['1.875rem',{ lineHeight: '1.3' }],
        'h4':      ['1.5rem',  { lineHeight: '1.4' }],
        'body-lg': ['1.125rem',{ lineHeight: '1.7' }],
        'body':    ['1rem',    { lineHeight: '1.7' }],
        'body-sm': ['0.875rem',{ lineHeight: '1.6' }],
        'label':   ['0.68rem', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #5227FF 0%, #B19EEF 100%)',
        'gradient-dark':   'linear-gradient(180deg, #0c0c0f 0%, #111116 100%)',
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-in-out',
        'slide-up':      'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'reveal':        'reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float':         'float 6s ease-in-out infinite',
        'orb-1':         'orbFloat 14s ease-in-out infinite',
        'orb-2':         'orbFloat2 10s ease-in-out infinite 3s',
        'orb-3':         'orbFloat 18s ease-in-out infinite 6s',
        'pulse-ring':    'pulseRing 2s ease-out infinite',
        'cursor-blink':  'typewriterBlink 1s step-end infinite',
        'line-highlight': 'lineHighlight 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:          { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:         { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        reveal:          { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float:           { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -25px) scale(1.04)' },
          '50%': { transform: 'translate(-15px, 20px) scale(0.96)' },
          '75%': { transform: 'translate(20px, 10px) scale(1.02)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-25px, 30px) scale(1.05)' },
          '66%': { transform: 'translate(20px, -20px) scale(0.95)' },
        },
        pulseRing:       { '0%': { transform: 'scale(1)', opacity: '0.6' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        shimmer:         { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        typewriterBlink: { '0%, 50%': { opacity: '1' }, '51%, 100%': { opacity: '0' } },
        lineHighlight:   { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(82, 39, 255, 0.25)',
        'glow-violet': '0 0 20px rgba(177, 158, 239, 0.18)',
        'glow-teal':   '0 0 30px rgba(0, 212, 170, 0.25)',
        'glow-amber':  '0 0 20px rgba(232, 197, 71, 0.20)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;