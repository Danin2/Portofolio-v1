'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealText from '@/components/ui/RevealText';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* ── Ambient Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)]/10 blur-[140px] rounded-full animate-pulse" />
      </div>

      {/* ── Error Code ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <span className="text-[0.7rem] font-mono font-black uppercase tracking-[0.4em] text-[var(--accent-primary)] mb-6 block">
          Error_Code: 404
        </span>
        
        <h1 className="text-7xl md:text-9xl font-black text-[var(--text-primary)] mb-8 tracking-tighter leading-none">
          Lost in the <br />
          <span className="gradient-text italic font-medium">Infrastruktur.</span>
        </h1>

        <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-lg mx-auto mb-12 opacity-80 font-medium">
          The node you are looking for does not exist or has been decommissioned. Please verify the URL or return to the main node.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-all shadow-xl"
          >
            Return to Root
          </Link>
          <Link
            href="/projects"
            className="px-10 py-4 border border-[var(--border-primary)] text-[var(--text-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] transition-all"
          >
            Explore Systems
          </Link>
        </div>
      </motion.div>

      {/* ── Decorative Elements ── */}
      <div className="absolute bottom-12 left-12 opacity-20 hidden md:block">
        <div className="font-mono text-[0.6rem] text-[var(--text-muted)] space-y-1 text-left">
          <p>HTTP_RESPONSE_HEADER: 404_NOT_FOUND</p>
          <p>SERVER_ID: ARCHITECT_PRIMARY_01</p>
          <p>TIMESTAMP: {new Date().toISOString()}</p>
        </div>
      </div>
    </div>
  );
}