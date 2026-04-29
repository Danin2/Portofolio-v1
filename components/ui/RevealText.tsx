'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** 'up' = slides from bottom (default, ribbit style), 'down' = from top, 'fade' = just fades in */
  direction?: 'up' | 'down' | 'fade';
  once?: boolean;
}
export default function RevealText({
  children,
  delay = 0,
  duration = 0.85,
  className = '',
  style,
  as: Tag = 'div',
  direction = 'up',
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px' });

  const yFrom = direction === 'up' ? '110%' : direction === 'down' ? '-110%' : '0%';

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <div ref={ref} className="overflow-hidden" style={{ display: 'block' }}>
      <MotionTag
        style={style}
        initial={{ y: direction === 'fade' ? 0 : yFrom, opacity: direction === 'fade' ? 0 : 1 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: yFrom, opacity: direction === 'fade' ? 0 : 1 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </MotionTag>
    </div>
  );
}
