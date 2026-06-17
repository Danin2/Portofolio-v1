'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)] pointer-events-none">
      <div className="flex flex-col items-center gap-6">
        {/* Minimalist Loader */}
        <div className="relative w-16 h-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-2 border-[var(--border-primary)] border-t-[var(--accent-primary)] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[0.6rem] font-mono font-bold uppercase tracking-[0.3em] text-[var(--accent-primary)]">
            Syncing Node
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 bg-[var(--accent-primary)] rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
