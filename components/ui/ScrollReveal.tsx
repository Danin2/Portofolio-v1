'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** y offset to start from (px) */
  yOffset?: number;
  /** x offset to start from (px) */
  xOffset?: number;
  once?: boolean;
}

/**
 * ScrollReveal — a general-purpose fade+translate wrapper
 * for scroll-triggered entrance animations.
 * Wrap any block-level element to give it a scroll-reveal on entry.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  yOffset = 40,
  xOffset = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
