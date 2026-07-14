'use client';

import { ReactNode, CSSProperties } from 'react';

interface MarqueeProps {
  children: ReactNode;
  /** Speed in pixels per second */
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Marquee — infinitely scrolling horizontal strip.
 * Uses pure CSS animation (no framer-motion) for maximum performance.
 * GPU-composited via `will-change: transform` declared in globals.css.
 */
export default function Marquee({
  children,
  speed = 60,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: MarqueeProps) {
  // Convert speed (px/s) to a CSS duration. Higher speed → shorter duration.
  const duration = Math.round((10000 / speed) * 3);

  const trackStyle: CSSProperties = {
    '--marquee-duration': `${duration}s`,
  } as CSSProperties;

  const trackClass = [
    'marquee-track',
    direction === 'left' ? 'marquee-track--left' : 'marquee-track--right',
  ].join(' ');

  return (
    <div
      className={`overflow-hidden select-none ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      {/* pauseOnHover is handled via .marquee-track:hover CSS rule in globals.css */}
      <div className={trackClass} style={trackStyle} data-pause-on-hover={pauseOnHover}>
        {/* Render twice for seamless loop */}
        <div className="flex items-center gap-0 shrink-0">{children}</div>
        <div className="flex items-center gap-0 shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
