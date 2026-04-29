'use client';

import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  children: ReactNode;
  /** Speed in pixels per second */
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Marquee — an infinitely scrolling horizontal strip.
 * Duplicates children so the loop is seamless.
 * Used between sections on sites like ribbit.dk as premium separators.
 */
export default function Marquee({
  children,
  speed = 60,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: MarqueeProps) {
  const duration = 100 / speed * 20; // rough approx for animation duration

  return (
    <div
      className={`overflow-hidden select-none ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
        style={{ width: 'max-content' }}
      >
        {/* Render twice for seamless loop */}
        <div className="flex items-center gap-0 shrink-0">{children}</div>
        <div className="flex items-center gap-0 shrink-0" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}
