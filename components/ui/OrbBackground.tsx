'use client';

/**
 * OrbBackground — Animated floating gradient orbs
 * "Dark Tech Artisan" aesthetic: teal + amber + indigo blobs
 * CSS animation only (no JS), GPU-accelerated via will-change: transform
 * Performance: blur values reduced on mobile via CSS media queries.
 */
const OrbBackground = () => (
  <div
    className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    aria-hidden="true"
    // content-visibility skips rendering when the element is off-screen
    style={{ contentVisibility: 'auto' } as React.CSSProperties}
  >
    {/* Orb 1: Slate Blue — large, bottom-left */}
    <div
      className="absolute rounded-full animate-orb-1 will-change-transform orb-1"
      style={{
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        left: '-120px',
        bottom: '-80px',
        opacity: 0.08,
        // Mobile: reduced blur for GPU savings
        filter: 'blur(80px)',
      }}
    />
    {/* Orb 2: Secondary Slate — medium, top-right */}
    <div
      className="absolute rounded-full animate-orb-2 will-change-transform"
      style={{
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
        right: '-60px',
        top: '8%',
        opacity: 0.06,
        filter: 'blur(70px)',
      }}
    />
    {/* Orb 3: Primary subtle — center (hidden on mobile for perf) */}
    <div
      className="absolute rounded-full animate-orb-3 will-change-transform hidden md:block"
      style={{
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        left: '42%',
        top: '28%',
        opacity: 0.05,
        filter: 'blur(60px)',
      }}
    />
  </div>
);

export default OrbBackground;
