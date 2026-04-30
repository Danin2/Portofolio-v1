'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Main cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Follower dot uses spring for the lerp/lag effect
  const followerX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const followerY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverOn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-cursor="pointer"], .hover-target')) {
        setIsHovering(true);
      }
    };
    const handleHoverOff = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-cursor="pointer"], .hover-target')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleHoverOn as any);
    document.addEventListener('mouseout', handleHoverOff as any);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleHoverOn as any);
      document.removeEventListener('mouseout', handleHoverOff as any);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Follower Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--text-primary)]"
        style={{ 
          x: followerX, 
          y: followerY, 
          translateX: '-50%', 
          translateY: '-50%',
          backgroundColor: isHovering ? 'var(--text-primary)' : 'transparent',
          mixBlendMode: 'difference'
        }}
        animate={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          opacity: isHovering ? 0.3 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </div>
  );
}

