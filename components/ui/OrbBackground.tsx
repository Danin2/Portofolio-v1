'use client';

/**
 * OrbBackground — Animated floating gradient orbs
 * "Dark Tech Artisan" aesthetic: teal + amber + indigo blobs
 * CSS animation only (no JS), GPU-accelerated via will-change: transform
 */
const OrbBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Orb 1: Teal — large, bottom-left */}
    <div
      className="absolute rounded-full animate-orb-1"
      style={{
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)',
        left: '-120px',
        bottom: '-80px',
        opacity: 0.13,
        filter: 'blur(100px)',
      }}
    />
    {/* Orb 2: Amber — medium, top-right */}
    <div
      className="absolute rounded-full animate-orb-2"
      style={{
        width: '420px',
        height: '420px',
        background: 'radial-gradient(circle, #E8C547 0%, transparent 70%)',
        right: '-60px',
        top: '8%',
        opacity: 0.10,
        filter: 'blur(90px)',
      }}
    />
    {/* Orb 3: Indigo — small, center */}
    <div
      className="absolute rounded-full animate-orb-3"
      style={{
        width: '320px',
        height: '320px',
        background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
        left: '42%',
        top: '28%',
        opacity: 0.08,
        filter: 'blur(80px)',
      }}
    />
    {/* Orb 4: Teal subtle — top-left corner */}
    <div
      className="absolute rounded-full animate-orb-2"
      style={{
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)',
        left: '10%',
        top: '-40px',
        opacity: 0.07,
        filter: 'blur(70px)',
        animationDelay: '9s',
      }}
    />
  </div>
);

export default OrbBackground;
