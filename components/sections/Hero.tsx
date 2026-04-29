'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import LightRays from '@/components/ui/LightRays';
import ScrollReveal from '@/components/ui/ScrollReveal';

const Hero = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP magnetic effect on CTA buttons
  useEffect(() => {
    const buttons = ctaRef.current?.querySelectorAll('a, button');
    if (!buttons) return;

    const cleanups: (() => void)[] = [];

    buttons.forEach(btn => {
      const el = btn as HTMLElement;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.22, y: y * 0.22, duration: 0.4, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach(c => c());
  }, []);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)]">

      {/* ── Light Rays background ──────────────────────────────── */}
      <div className="absolute inset-0 z-0 text-center">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4f46e5"
          raysSpeed={0.8}
          lightSpread={1.1}
          rayLength={1.6}
          followMouse={true}
          mouseInfluence={0.04}
          noiseAmount={0.02}
        />
      </div>

      {/* ── Overlays for text contrast ─────────────────────────── */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[var(--bg-primary)] opacity-40 pointer-events-none" />

      {/* ── Subtle grid ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] dark:opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-violet) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-violet) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* ── Purple blob blurs ───────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[var(--accent-purple)] opacity-[0.06] blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--accent-violet)] opacity-[0.05] blur-[100px]" />
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10 pt-20 pb-20">
        <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center justify-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--accent-violet)] text-[0.65rem] font-bold tracking-[0.2em] uppercase shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-purple)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-purple)]" />
            </span>
            Available for projects
          </motion.div>

          {/* Name Section — Centered and Bold */}
          <div className="mb-14 lg:mb-20">
            <div className="mb-4">
              <RevealText
                as="h1"
                delay={0.2}
                className="font-black leading-[0.9] tracking-[-0.04em] text-[var(--text-primary)] select-none whitespace-nowrap"
                style={{ fontSize: 'clamp(3.5rem, 11vw, 8.5rem)' } as React.CSSProperties}
              >
                Muhammad
              </RevealText>
            </div>
            <div>
              <RevealText
                as="h1"
                delay={0.35}
                className="font-black leading-[0.9] tracking-[-0.04em] select-none whitespace-nowrap"
                style={{ fontSize: 'clamp(3.5rem, 11vw, 8.5rem)' } as React.CSSProperties}
              >
                <span className="gradient-text">Danindra I</span>
              </RevealText>
            </div>
          </div>

          {/* Details & CTA */}
          <div className="flex flex-col items-center gap-10">
            <ScrollReveal delay={0.5} yOffset={16}>
              <div className="flex flex-col items-center max-w-2xl">
                <p
                  className="font-mono font-bold tracking-[0.3em] text-[var(--accent-violet)] mb-8 uppercase"
                  style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)' }}
                >
                  Backend Systems Engineer
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg md:text-2xl opacity-90 text-center font-medium">
                  I architect high-performance server-side foundations,
                  focusing on scalability, security, and elegant system design.
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link
                href="/projects"
                className="relative inline-flex items-center gap-3 px-10 py-5 bg-[var(--accent-purple)] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[var(--accent-violet)] transition-all duration-300 shadow-xl overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                View Projects ↗
              </Link>
              <button
                onClick={() => scrollToSection('skills')}
                className="inline-flex items-center gap-3 px-10 py-5 border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-bold uppercase tracking-widest text-xs rounded-xl hover:border-[var(--accent-violet)] group transition-all duration-300 shadow-sm"
              >
                <span className="text-[var(--accent-violet)] group-hover:translate-y-1 transition-transform">↓</span>
                My Skills
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;