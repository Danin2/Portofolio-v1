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

    // Use setInterval (60ms) instead of rAF to avoid hammering main thread
    // during the critical load phase. Visual difference is imperceptible.
    const duration = 400;
    const startTime = Date.now();

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use a more mechanical ease for the pixel vibe
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCounter(Math.floor(eased * 100));

      if (progress >= 1) {
        clearInterval(intervalId);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('portfolio-loaded', 'true');
        }, 200);
      }
    }, 60);

    return () => clearInterval(intervalId);
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
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none border-b border-[var(--border-primary)]" />

          <div className="relative z-20 flex flex-col items-center gap-12 max-w-xl w-full px-10">

            {/* Main Text */}
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl tracking-[0.1em] text-center"
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
                  className="w-full h-1/2 bg-transparent"
                />
              </div>
            </div>

            {/* Loading Container */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[var(--accent-purple)] flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--accent-purple)] animate-pulse" />
                  Loading...
                </span>
                <span className="font-mono text-xl font-black text-[var(--text-primary)]">
                  {counter.toString().padStart(3, '0')}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-4 w-full bg-[var(--bg-tertiary)] border-2 border-[var(--border-primary)] relative p-0.5">
                <motion.div
                  className="h-full bg-[var(--accent-primary)]"
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
          </div>

          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-purple)]/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
