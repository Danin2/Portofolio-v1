'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * GLOBAL-01: CUSTOM CURSOR
 * High-end interactive cursor with lerp delay and magnetic feel.
 */
export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Primary position (follows mouse instantly)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth position for the outer ring (lerp delay effect)
  // Stiffness 100, damping 20 provides a smooth, premium "lag" feel
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.1 });

  useEffect(() => {
    // Only enable custom cursor on desktop devices with fine pointer
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    // Hide default cursor only on desktop (min-width: 768px)
    const style = document.createElement('style');
    style.id = 'cursor-none-style';
    style.innerHTML = `
      @media (min-width: 768px) {
        * { cursor: none !important; }
        a, button, [role="button"], input, textarea, .cursor-pointer { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, .cursor-pointer, [data-cursor="pointer"]')) {
        setIsHovered(true);
      }
    };

    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
      const styleEl = document.getElementById('cursor-none-style');
      if (styleEl) styleEl.remove();
    };
  }, [mouseX, mouseY, isVisible]);

  // Accessibility: respect reduced motion preferences
  if (shouldReduceMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
      {/* 32px Ring (follows with delay) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--accent-purple)] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? 'rgba(12, 168, 226, 0.15)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(12, 168, 226, 0.3)' : 'none',
        }}
        animate={{
          scale: isClicked ? 0.7 : isHovered ? 1.1 : 1,
        }}
        transition={{
          scale: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
          width: { duration: 0.3 },
          height: { duration: 0.3 },
          backgroundColor: { duration: 0.3 },
        }}
      />

      {/* 8px Filled Circle (follows instantly) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--accent-purple)] rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}

