'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function useCountUp(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
}

const stats = [
  { value: 3, label: 'Projects Completed', suffix: '+' },
  { value: 2, label: 'Years of Learning', suffix: '+' },
  { value: 5, label: 'Technologies Mastered', suffix: '+' },
  { value: 100, label: 'Open Source Enthusiast', suffix: '%' },
];

export default function Stats() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      className={`py-12 border-y border-[var(--border-primary)] bg-[var(--bg-primary)] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--border-primary)]">
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} start={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, start }: { stat: typeof stats[0], start: boolean }) {
  const count = useCountUp(stat.value, 1500, start);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-2">
        {count}
        <span className="text-[var(--accent-primary)]">{stat.suffix}</span>
      </div>
      <div className="text-sm text-[var(--text-secondary)] opacity-80 uppercase tracking-widest font-medium">
        {stat.label}
      </div>
    </div>
  );
}
