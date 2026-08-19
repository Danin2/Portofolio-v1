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
    if (typeof window === 'undefined' || window.innerWidth < 1280) return;
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
          backgroundColor: 'var(--accent-primary)',
          opacity: 0.1,
        }}
      />
    </div>
  );
}
