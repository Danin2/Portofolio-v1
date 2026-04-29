'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import FallingLetters from '@/components/ui/FallingLetters';

const navItems = [
  { label: 'Home', href: '/', ariaLabel: 'Go to home page' },
  { label: 'About', href: '/about', ariaLabel: 'Go to about page' },
  { label: 'Projects', href: '/projects', ariaLabel: 'View my projects' },
  { label: 'Contact', href: '/contact', ariaLabel: 'Get in touch' },
];

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

  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], [90, 70]);
  const navPadding = useTransform(scrollY, [0, 100], ['2.5rem', '1.25rem']);
  const navScale = useTransform(scrollY, [0, 200], [1, 0.99]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        style={{
          height: navHeight,
          paddingTop: navPadding,
          paddingBottom: navPadding,
          scale: navScale
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <div className={`
          relative transition-all duration-700 ease-[0.22,1,0.36,1] pointer-events-auto
          ${isScrolled
            ? 'w-[95%] md:w-[85%] max-w-[1200px] h-14 bg-[var(--bg-primary)]/40 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-full px-8 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
            : 'container-custom flex items-center justify-between h-full pt-4 bg-transparent'
          }
        `}>
          {/* Fluid Glass Inner Glow */}
          {isScrolled && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          )}

          {/* ── Logo Area ───────────────────────────────── */}
          <div className="w-[200px] flex items-center">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-violet)] flex items-center justify-center shadow-lg shrink-0"
              >
                <span className="text-white font-black text-[10px] font-mono">MD</span>
              </motion.div>
              <span className="font-bold text-base font-mono tracking-tighter text-[var(--text-primary)] hidden sm:block">
                Mas<span className="text-[var(--accent-violet)]">Dani</span>
              </span>
            </Link>
          </div>

          {/* ── Desktop Nav ─────────────────────────────── */}
          <div className="hidden md:flex flex-1 items-center justify-center" onMouseLeave={() => setHoveredIdx(null)}>
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-white/5">
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
                            className="absolute inset-0 bg-white/10 dark:bg-white/10 rounded-full border border-white/10 -z-10 shadow-sm"
                          />
                        )}
                      </AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="active-dot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-purple)] shadow-[0_0_10px_var(--accent-purple)]"
                        />
                      )}
                    </Link>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* ── Actions Area ────────────────────────────── */}
          <div className="w-[200px] flex items-center justify-end gap-3">
            <div className="flex items-center justify-center w-10 h-10">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}>
                <AnimatedThemeToggler className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors cursor-pointer" />
              </motion.div>
            </div>

            <Link
              href="/contact"
              className={`hidden sm:flex items-center group bg-[var(--text-primary)] text-[var(--bg-primary)] px-5 py-2 rounded-full text-[0.6rem] font-black uppercase tracking-widest hover:bg-[var(--accent-purple)] hover:text-white transition-all shadow-lg ${isScrolled ? 'px-4 py-1.5' : ''}`}
            >
              Build ↗
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }} className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }} className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-[var(--bg-primary)]/95 backdrop-blur-2xl flex flex-col p-10 justify-center"
          >
            {/* Background Grid for techy look */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="relative z-10 space-y-8">
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
                    <span className="font-mono text-[var(--accent-purple)] text-sm">{String(idx + 1).padStart(2, '0')}</span>
                    <FallingLetters
                      text={item.label}
                      className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors"
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
              className="mt-20 pt-10 border-t border-[var(--border-primary)] flex justify-between items-center"
            >
              <div className="flex gap-4">
                {['GH', 'LI', 'TW'].map(s => (
                  <span key={s} className="text-[0.6rem] font-mono text-[var(--text-muted)] hover:text-[var(--accent-purple)] cursor-pointer">{s}</span>
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