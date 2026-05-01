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

      {/* ── Ambient Background Layer (Task 1) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 20, -30, 0],
            scale: [1, 1.1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[var(--accent-primary)]/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 40, -60, 0],
            y: [0, 40, -20, 40, 0],
            scale: [1, 0.9, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[var(--accent-secondary)]/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, 30, -30, 30, 0],
            y: [0, 60, -60, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[var(--accent-primary)]/5 blur-[100px] rounded-full"
        />
      </div>

      {/* ── Background Elements ────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-right"
          raysColor="rgba(108, 142, 191, 0.4)"
          raysSpeed={0.5}
          lightSpread={2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.03}
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)] opacity-40 pointer-events-none" />
      
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(var(--accent-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <OrbBackground />

      {/* ── Content Container ───────────────────────────────────── */}
      <div className="container-custom relative z-10 pt-32 pb-12">
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
                  className="font-black leading-[0.85] tracking-tighter text-[var(--text-primary)] select-none"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' } as React.CSSProperties}
                />
              </div>
              <div
                className="font-black leading-[0.85] tracking-tighter select-none gradient-text overflow-hidden"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' } as React.CSSProperties}
              >
                <StaggeredText text="Danindra I" delay={0.6} />
              </div>
            </div>

            <div className="flex flex-col items-start max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[var(--accent-primary)] opacity-50" />
                <TypewriterText
                  text="Backend Systems Architect"
                  delay={1.2}
                  className="font-mono font-black tracking-[0.4em] text-[var(--accent-primary)] uppercase text-[0.7rem] md:text-[0.85rem]"
                />
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-xl md:text-2xl opacity-90 font-medium mb-12 max-w-xl">
                I engineer resilient, high-performance backends for the next generation of scalable digital systems.
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
                Launch Dossier &gt;
              </Link>
              <button
                onClick={() => scrollToSection('skills')}
                className="inline-flex items-center gap-4 px-10 py-5 border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 backdrop-blur-md text-[var(--text-primary)] font-bold uppercase tracking-[0.2em] text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 group transition-all duration-500"
              >
                <span className="text-[var(--accent-primary)] group-hover:translate-y-1 transition-transform duration-300">v</span>
                Core Stack
              </button>
            </motion.div>
          </div>

          {/* ────────────────── RIGHT CONTENT (3D Card) ────────────────── */}
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
                avatarUrl="/assets/foto/Kucing.jpg"
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