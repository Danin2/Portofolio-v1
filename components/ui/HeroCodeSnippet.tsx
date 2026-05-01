'use client';

import { useEffect, useState } from 'react';

const codeLines = [
  { text: "const app = express()", color: "text-[#79b8ff]" },
  { text: "app.listen(8080, () => {", color: "text-[#E8C547]" },
  { text: "  console.log('✓ Ready')", color: "text-[#79b8ff]" },
  { text: "})", color: "text-[#E8C547]" },
];

/**
 * HeroCodeSnippet — Floating terminal-style code block for hero section.
 * Desktop only (hidden on mobile). Uses a separate z-index layer.
 */
export default function HeroCodeSnippet({ 
  className = "", 
  style = {} 
}: { 
  className?: string; 
  style?: React.CSSProperties;
}) {
  const [highlightedLine, setHighlightedLine] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setHighlightedLine(prev => (prev + 1) % codeLines.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`${className} pointer-events-none`.trim()}
      style={{
        zIndex: 20,
        animation: 'float 6s ease-in-out infinite',
        ...style
      }}
    >
      {/* Subtle glow behind card */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '0.75rem',
          filter: 'blur(40px)',
          opacity: 0.25,
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          background: '#0D1117',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          minWidth: '240px',
          maxWidth: '300px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
          position: 'relative',
        }}
      >
        {/* Terminal Header */}
        <div style={{
          background: '#1C1C1E',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F', display: 'inline-block' }} />
          <span style={{ marginLeft: '0.75rem', fontSize: '0.6rem', color: '#6b7280', fontFamily: 'monospace', letterSpacing: '0.1em' }}>server.ts</span>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '0.875rem 1rem', fontFamily: "'JetBrains Mono', monospace" }}>
          {codeLines.map((line, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '2px 8px',
                borderRadius: '4px',
                borderLeft: highlightedLine === idx ? '2px solid #00D4AA' : '2px solid transparent',
                background: highlightedLine === idx ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'all 0.4s ease',
              }}
            >
              <span style={{ color: '#444d56', fontSize: '0.6rem', minWidth: '16px', textAlign: 'right', userSelect: 'none' }}>
                {idx + 1}
              </span>
              <span
                className={line.color}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', whiteSpace: 'pre' }}
              >
                {line.text}
              </span>
            </div>
          ))}

          {/* Blinking cursor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '4px 8px', marginTop: '2px' }}>
            <span style={{ color: '#444d56', fontSize: '0.6rem', minWidth: '16px', textAlign: 'right' }}>
              {codeLines.length + 1}
            </span>
            <span
              className="animate-cursor-blink"
              style={{ display: 'inline-block', width: '7px', height: '14px', background: 'var(--accent-primary)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
