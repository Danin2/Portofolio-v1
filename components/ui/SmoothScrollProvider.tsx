'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider — wraps the app with Lenis smooth scrolling.
 * Lenis is initialized after the browser's first idle moment to avoid
 * adding to Total Blocking Time during the critical page load phase.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Defer init to browser idle time — reduces TBT on initial load
    const initLenis = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
        orientation: 'vertical',
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: isTouch ? 1 : 1.5,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
      (window as any).lenis = lenis;
      // Signal listeners (e.g. Navigation) that Lenis is ready — deterministic,
      // no setTimeout race condition.
      window.dispatchEvent(new CustomEvent('lenis-ready', { detail: lenis }));
    };

    // Use requestIdleCallback when available, else defer via setTimeout
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(initLenis, { timeout: 1000 });
      return () => {
        (window as any).cancelIdleCallback(id);
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        lenisRef.current?.destroy();
        (window as any).lenis = null;
      };
    } else {
      const t = setTimeout(initLenis, 50);
      return () => {
        clearTimeout(t);
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        lenisRef.current?.destroy();
        (window as any).lenis = null;
      };
    }
  }, []);

  // Reset scroll on route change — deferred by one rAF frame so Next.js
  // InnerScrollAndFocusHandler (layout-router.js) can finish its own
  // clientHeight read + scrollTop write before Lenis kicks in, preventing
  // a forced reflow double-hit on every navigation.
  useEffect(() => {
    if (!lenisRef.current) return;
    const id = requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
