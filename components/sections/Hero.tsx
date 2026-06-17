'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import LightRays from '@/components/ui/LightRays';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import TypewriterText from '@/components/ui/TypewriterText';
import OrbBackground from '@/components/ui/OrbBackground';
import HeroCodeSnippet from '@/components/ui/HeroCodeSnippet';
import ProfileCard from '@/components/ui/ProfileCard';

const Hero = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] overflow-hidden">

      {/* ── Ambient Background Layer (Enhanced) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-primary)] opacity-40" />

        {/* Animated Orbs with more complex motion */}
        <motion.div
          animate={{
            x: [0, 80, -40, 80, 0],
            y: [0, -50, 60, -50, 0],
            scale: [1, 1.2, 0.8, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-[var(--accent-primary)]/8 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -100, 50, -100, 0],
            y: [0, 60, -80, 60, 0],
            scale: [1, 0.7, 1.1, 0.7, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] bg-[var(--accent-secondary)]/8 blur-[160px] rounded-full"
        />

        {/* Grid / Scanline Effect */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
      </div>

      {/* ── Background Elements (Rays) ────────────────────────── */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <LightRays
          raysOrigin="top-left"
          raysColor="rgba(139, 169, 214, 0.3)"
          raysSpeed={0.8}
          lightSpread={1.5}
          rayLength={4}
          followMouse={false}
        />
      </div>

      <OrbBackground />


      {/* ── Content Container ───────────────────────────────────── */}
      <div className="container-custom relative z-10 pt-24 md:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* ────────────────── LEFT CONTENT (Typography) ────────────────── */}
          <div className="lg:col-span-8 flex flex-col items-start text-left order-2 lg:order-1">

            {/* Availability Badge (Task 6) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 backdrop-blur-xl text-[var(--accent-primary)] text-[0.7rem] font-black tracking-[0.2em] uppercase shadow-lg group hover:scale-105 transition-all duration-300"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
              </span>
              Available for Projects
            </motion.div>

            <div className="mb-10 space-y-2">
              <div className="overflow-hidden">
                <StaggeredText
                  text="Muhammad"
                  delay={0.2}
                  className="font-display font-black leading-[0.85] tracking-tighter text-[var(--text-primary)] select-none"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' } as React.CSSProperties}
                />
              </div>
              <div
                className="font-display font-black leading-[0.85] tracking-tighter select-none gradient-text overflow-hidden"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' } as React.CSSProperties}
              >
                <StaggeredText text="Danindra I" delay={0.6} />
              </div>
            </div>

            <div className="flex flex-col items-start max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[var(--accent-primary)] opacity-50" />
                <TypewriterText
                  text=" Junior Web Development"
                  delay={1.2}
                  className="font-mono font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase text-[0.7rem] md:text-[0.85rem]"
                />
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-xl md:text-2xl opacity-90 font-medium mb-12 max-w-xl">
                Architecting high-performance backends with precision. Beyond the terminal, I&apos;m a systems enthusiast focused on building the invisible infrastructure that powers modern experiences.
              </p>
            </div>

            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/projects"
                className="relative inline-flex items-center gap-4 px-10 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-[0.2em] text-[0.7rem] rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-500 shadow-2xl group overflow-hidden"
              >
                My Projects
              </Link>
              <button
                onClick={() => scrollToSection('skills')}
                className="inline-flex items-center gap-4 px-10 py-5 border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 backdrop-blur-md text-[var(--text-primary)] font-bold uppercase tracking-[0.2em] text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 group transition-all duration-500"
              >
                View Skills
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex items-start justify-center order-1 lg:order-2 pt-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-[360px]"
            >
              <div className="absolute -inset-10 bg-[var(--accent-primary)]/5 blur-[100px] rounded-full animate-pulse" />

              <ProfileCard
                name="M. Danindra"
                handle="masdani"
                title="Systems Engineer"
                status="Active_Operational"
                avatarUrl="/assets/foto/profile.png"
                innerGradient="linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)"
                behindGlowColor="rgba(139, 169, 214, 0.15)"
                className="shadow-2xl"
              />

              {/* Repositioned slightly more to the left for better alignment */}
              <HeroCodeSnippet
                className="absolute -bottom-32 -right-12 xl:block hidden z-20 scale-100 origin-top-left"
                style={{ transform: 'perspective(1000px) rotateX(10deg) rotateY(-15deg) rotateZ(5deg)' }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;