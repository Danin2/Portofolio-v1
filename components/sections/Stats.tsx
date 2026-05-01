'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 5); // easeOutQuint for smoother finish
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
}

const stats = [
  { value: 5, label: 'Projects Completed', suffix: '+' },
  { value: 3, label: 'Years of Learning', suffix: '+' },
  { value: 15, label: 'Technologies Mastered', suffix: '+' },
  { value: 80, label: 'Open Source Enthusiast', suffix: '%' },
];

export default function Stats() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 }); // Lower threshold to trigger earlier

  return (
    <section
      ref={ref}
      className={`py-24 border-y border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} start={isVisible} delay={idx * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, start, delay }: { stat: typeof stats[0], start: boolean, delay: number }) {
  const [shouldStart, setShouldStart] = useState(false);
  
  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => setShouldStart(true), delay);
      return () => clearTimeout(timer);
    }
  }, [start, delay]);

  const count = useCountUp(stat.value, 2000, shouldStart);

  return (
    <div className="flex flex-col items-center justify-center text-center group">
      <div className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-4 tracking-tighter group-hover:scale-110 transition-transform duration-500">
        {count}
        <span className="text-[var(--accent-primary)]">{stat.suffix}</span>
      </div>
      <div className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-[0.3em] font-black group-hover:text-[var(--accent-primary)] transition-colors duration-300">
        {stat.label}
      </div>
      {/* Visual Flash effect when count reaches end */}
      <div className={`mt-4 h-1 w-12 rounded-full bg-[var(--accent-primary)] transition-all duration-1000 ${count === stat.value ? 'opacity-40 w-16' : 'opacity-0 w-0'}`} />
    </div>
  );
}
