'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check if session storage already has the loaded flag
    const hasLoaded = sessionStorage.getItem('portfolio-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Faster loading animation
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use a more mechanical ease for the pixel vibe
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCounter(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('portfolio-loaded', 'true');
        }, 500);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg-primary)] overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-20 flex flex-col items-center gap-12 max-w-xl w-full px-10">
            
            {/* Main Text */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl tracking-[0.1em] text-center"
                style={{ 
                  fontFamily: 'Determination, sans-serif',
                  color: 'var(--text-primary)',
                  textShadow: '0 0 20px rgba(var(--accent-purple-rgb), 0.2)'
                }}
              >
                PORTOFOLIO
              </motion.h1>
              
              {/* Scanline Effect over text */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <motion.div 
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-1/2 bg-gradient-to-b from-transparent via-[var(--accent-purple)] to-transparent"
                />
              </div>
            </div>

            {/* Loading Container */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[var(--accent-purple)] flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--accent-purple)] animate-pulse" />
                  System Loading
                </span>
                <span className="font-mono text-xl font-black text-[var(--text-primary)]">
                  {counter.toString().padStart(3, '0')}%
                </span>
              </div>

              {/* Progress Bar (Pixel Style) */}
              <div className="h-4 w-full bg-[var(--bg-tertiary)] border-2 border-[var(--border-primary)] relative p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0ca8e2] via-[#07a9a6] to-[#08a06e]"
                  style={{ width: `${counter}%` }}
                />
                
                {/* Segmented effect for pixel feel */}
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-[var(--bg-primary)]/20" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="flex items-center gap-6"
            >
              <span className="text-[0.55rem] font-mono tracking-widest uppercase">Initializing Core</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-[var(--accent-purple)]"
                  />
                ))}
              </div>
              <span className="text-[0.55rem] font-mono tracking-widest uppercase">Build 2.0.4</span>
            </motion.div>

          </div>

          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-purple)]/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
