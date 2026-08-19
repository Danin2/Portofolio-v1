'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import FallingLetters from '@/components/ui/FallingLetters';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

// ─── Magnetic Effect Wrapper ──────────────────────────────────────────────────
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 250, damping: 20, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.home'), href: '/', ariaLabel: 'Go to home page' },
    { label: t('nav.about'), href: '/about', ariaLabel: 'Go to about page' },
    { label: t('nav.projects'), href: '/projects', ariaLabel: 'View my projects' },
    { label: t('nav.contact'), href: '/contact', ariaLabel: 'Get in touch' },
  ];
  // Manual scroll-driven values — framer-motion's useScroll/useTransform
  // don't work under Lenis because Lenis doesn't fire native scroll events.
  useEffect(() => {
    let ticking = false;

    const handleScroll = (pos: number) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const nextScrolled = pos > 20;
        setIsScrolled(prev => (prev !== nextScrolled ? nextScrolled : prev));
        ticking = false;
      });
    };

    const onNativeScroll = () => handleScroll(window.scrollY);
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    let lenisUnsub: (() => void) | null = null;
    const attachLenis = (lenis: any) => {
      if (!lenis) return;
      const onLenisScroll = (e: any) => {
        handleScroll(e.scroll ?? window.scrollY);
      };
      lenis.on('scroll', onLenisScroll);
      lenisUnsub = () => lenis.off('scroll', onLenisScroll);
    };

    if ((window as any).lenis) {
      attachLenis((window as any).lenis);
    }

    const onLenisReady = (e: Event) => {
      const customEvent = e as CustomEvent;
      attachLenis(customEvent.detail || (window as any).lenis);
    };
    window.addEventListener('lenis-ready', onLenisReady);

    return () => {
      window.removeEventListener('scroll', onNativeScroll);
      window.removeEventListener('lenis-ready', onLenisReady);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        style={{
          height: isScrolled ? 70 : 90,
          paddingTop: isScrolled ? '1.25rem' : '2rem',
          paddingBottom: isScrolled ? '1.25rem' : '2rem',
          transition: 'height 0.3s ease, padding 0.3s ease',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className={`
          relative transition-all duration-700 ease-[0.23,1,0.32,1] pointer-events-auto
          ${isScrolled
            ? 'w-[92%] md:w-[85%] max-w-[1200px] h-14 bg-[var(--bg-primary)]/95 md:bg-[var(--bg-primary)]/85 md:backdrop-blur-xl border border-[var(--border-primary)] rounded-full px-8 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.15)]'
            : 'container-custom flex items-center justify-between h-full pt-4 bg-transparent'
          }
        `}>
          {/* Subtle Inner Glow */}
          {isScrolled && (
            <div className="absolute inset-0 rounded-full bg-transparent pointer-events-none" />
          )}

          {/* ── Logo Area ───────────────────────────────── */}
          <div className="w-[180px] flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center shadow-md shrink-0"
              >
                <span className="text-[var(--bg-primary)] font-black text-[10px] font-mono">MD</span>
              </motion.div>
              <span className="font-bold text-base font-mono tracking-tighter text-[var(--text-primary)] hidden sm:block">
                Mas<span className="text-[var(--accent-primary)]">Dani</span>
              </span>
            </Link>
          </div>

          {/* ── Desktop Nav ─────────────────────────────── */}
          <div className="hidden md:flex flex-1 items-center justify-center" onMouseLeave={() => setHoveredIdx(null)}>
            <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--bg-tertiary)]/30 backdrop-blur-sm border border-[var(--border-primary)]">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Magnetic key={item.href}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      className={`relative px-5 py-2 text-[0.6rem] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <AnimatePresence>
                        {hoveredIdx === idx && (
                          <motion.span
                            layoutId="nav-pill"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            className="absolute inset-0 bg-[var(--text-primary)]/10 rounded-full border border-[var(--border-primary)] -z-10 shadow-sm"
                          />
                        )}
                      </AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="active-dot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
                        />
                      )}
                    </Link>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* ── Actions Area ────────────────────────────── */}
          <div className="w-[120px] flex items-center justify-end gap-2">
            <LanguageSwitcher />
            <div className="flex items-center justify-center w-10 h-10">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}>
                <AnimatedThemeToggler className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer" />
              </motion.div>
            </div>
          </div>

          <Link
            href="/contact"
            className={`hidden sm:flex items-center group bg-[var(--text-primary)] text-[var(--bg-primary)] px-5 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-md ${isScrolled ? 'px-4 py-1.5' : ''}`}
          >
            {t('nav.build')}
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-[var(--bg-primary)] flex flex-col px-8 py-6 pt-24 justify-start overflow-y-auto"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[var(--border-primary)]" />

            <div className="relative z-10 space-y-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-6"
                  >
                    <span className="font-mono text-[var(--accent-primary)] text-sm">{String(idx + 1).padStart(2, '0')}</span>
                    <FallingLetters
                      text={item.label}
                      className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors"
                      trigger={mobileOpen}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-6 border-t border-[var(--border-primary)] flex justify-between items-center"
            >
              <div className="flex gap-4">
                {['GH', 'LI', 'TW'].map(s => (
                  <span key={s} className="text-[0.6rem] font-mono text-[var(--text-muted)] hover:text-[var(--accent-primary)] cursor-pointer">{s}</span>
                ))}
              </div>
              <span className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest">System Status: Active</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;