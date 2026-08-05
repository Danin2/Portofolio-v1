'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggeredText from '@/components/ui/StaggeredText';
import TypewriterText from '@/components/ui/TypewriterText';
import HeroCodeSnippet from '@/components/ui/HeroCodeSnippet';
import ProfileCard from '@/components/ui/ProfileCard';
import { useLanguage } from '@/context/LanguageContext';

// Lazy-load WebGL/heavy components — removed from critical render path
const LightRays = dynamic(() => import('@/components/ui/LightRays'), {
  ssr: false,
  loading: () => null,
});
const OrbBackground = dynamic(() => import('@/components/ui/OrbBackground'), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Determine screen size to avoid running heavy WebGL/GSAP logic on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let cleanups: (() => void)[] = [];
    let idleId: any = null;

    const initMagneticButtons = () => {
      const buttons = ctaRef.current?.querySelectorAll('a, button');
      if (!buttons) return;

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
        el.addEventListener('mousemove', onMove, { passive: true });
        el.addEventListener('mouseleave', onLeave, { passive: true });
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        idleId = (window as any).requestIdleCallback(initMagneticButtons);
      } else {
        idleId = setTimeout(initMagneticButtons, 50);
      }
    }

    return () => {
      if (idleId !== null && typeof window !== 'undefined') {
        if ('cancelIdleCallback' in window) {
          (window as any).cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
      cleanups.forEach(c => c());
    };
  }, []);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] overflow-hidden">

      {/* ── Ambient Background Layer ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-primary)] opacity-40" />

        {/* CSS-animated orbs — no JS, GPU-composited */}
        <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-[var(--accent-primary)]/8 blur-[140px] rounded-full animate-orb-float-1" />
        <div className="absolute bottom-[5%] right-[5%] w-[700px] h-[700px] bg-[var(--accent-secondary)]/8 blur-[160px] rounded-full animate-orb-float-2" />

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
      {!isMobile && (
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
      )}

      <OrbBackground />


      {/* ── Content Container ───────────────────────────────────── */}
      <div className="container-custom relative z-10 pt-20 md:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-center">

          {/* ────────────────── LEFT CONTENT (Typography) ────────────────── */}
          <div className="lg:col-span-8 flex flex-col items-start text-left order-2 lg:order-1">

            {/* Availability Badge (Task 6) */}

            <div className="mb-6 md:mb-10 space-y-1">
              <div className="overflow-hidden">
                <StaggeredText
                  text="Muhammad"
                  delay={0.2}
                  className="font-display font-black leading-[0.85] tracking-tighter text-[var(--text-primary)] select-none"
                  style={{ fontSize: 'clamp(2.4rem, 8vw, 8rem)' } as React.CSSProperties}
                />
              </div>
              <div
                className="font-display font-black leading-[0.85] tracking-tighter select-none gradient-text overflow-hidden"
                style={{ fontSize: 'clamp(2.4rem, 8vw, 8rem)' } as React.CSSProperties}
              >
                <StaggeredText text="Danindra I" delay={0.6} />
              </div>
            </div>

            <div className="flex flex-col items-start max-w-2xl">
              <div className="flex items-center gap-4 mb-5 md:mb-8">
                <div className="h-px w-12 bg-[var(--accent-primary)] opacity-50" />
                <TypewriterText
                  text=" Junior Web Development"
                  delay={1.2}
                  className="font-mono font-black tracking-[0.2em] md:tracking-[0.4em] text-[var(--accent-primary)] uppercase text-[0.65rem] md:text-[0.85rem]"
                />
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-xl opacity-90 font-medium mb-8 md:mb-12 max-w-xl">
                {t('hero.desc')}
              </p>
            </div>

            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-6 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-[0.2em] text-[0.65rem] md:text-[0.7rem] rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-500 shadow-2xl group overflow-hidden"
              >
                {t('footerCTA.primary_btn')}
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 backdrop-blur-md text-[var(--text-primary)] font-bold uppercase tracking-[0.2em] text-[0.65rem] md:text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 group transition-all duration-500"
              >
                {t('hero.cta_projects')}
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex items-start justify-center order-1 lg:order-2 pt-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px]"
            >
              <div className="absolute -inset-10 bg-[var(--accent-primary)]/5 blur-[100px] rounded-full animate-pulse" />

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