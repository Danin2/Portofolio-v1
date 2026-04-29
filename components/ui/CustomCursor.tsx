'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor component that replaces the default browser cursor with a 
 * premium "dot and tail" animation. It uses multiple spring-dampened 
 * points to create a fluid, organic trailing effect.
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Main cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing points for the "tail" effect
  // Each point has slightly more lag (lower stiffness/higher mass) than the previous
  const springTrail1 = {
    x: useSpring(mouseX, { stiffness: 800, damping: 45, mass: 0.1 }),
    y: useSpring(mouseY, { stiffness: 800, damping: 45, mass: 0.1 })
  };
  const springTrail2 = {
    x: useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.2 }),
    y: useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.2 })
  };
  const springTrail3 = {
    x: useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.3 }),
    y: useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.3 })
  };
  const springTrail4 = {
    x: useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.4 }),
    y: useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.4 })
  };

  useEffect(() => {
    // Only show custom cursor on desktop devices with a mouse
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect if hoverable elements are under the cursor
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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverOn as any);
    document.addEventListener('mouseout', handleHoverOff as any);

    // Hide the native cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverOn as any);
      document.removeEventListener('mouseout', handleHoverOff as any);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Use theme colors for consistent "premium" look without harsh contrast
  const cursorColor = 'var(--accent-purple)';
  const glowColor = 'rgba(var(--accent-purple-rgb), 0.25)';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Trail Segments - smaller and more transparent as they get further from the head */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{ 
          x: springTrail4.x, y: springTrail4.y, width: 4, height: 4, 
          translateX: '-50%', translateY: '-50%', 
          backgroundColor: cursorColor, opacity: 0.15 
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{ 
          x: springTrail3.x, y: springTrail3.y, width: 6, height: 6, 
          translateX: '-50%', translateY: '-50%', 
          backgroundColor: cursorColor, opacity: 0.3 
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{ 
          x: springTrail2.x, y: springTrail2.y, width: 8, height: 8, 
          translateX: '-50%', translateY: '-50%', 
          backgroundColor: cursorColor, opacity: 0.5 
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{ 
          x: springTrail1.x, y: springTrail1.y, width: 10, height: 10, 
          translateX: '-50%', translateY: '-50%', 
          backgroundColor: cursorColor, opacity: 0.7 
        }}
      />
      
      {/* Main Cursor Head */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-10"
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: '-50%', 
          translateY: '-50%',
          width: 12,
          height: 12,
          backgroundColor: cursorColor,
          boxShadow: `0 0 15px ${glowColor}`,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </div>
  );
}

