'use client';

import Marquee from '@/components/ui/Marquee';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  SiNodedotjs, SiTypescript, SiPostgresql, SiDocker, SiRedis,
  SiGraphql, SiMongodb, SiNginx, SiGithubactions, SiPrisma,
  SiVite
} from 'react-icons/si';

const techStack = [
  { icon: SiNodedotjs, label: 'Node.js', color: '#68A063' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: SiVite, label: 'Vite', color: '#646CFF' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#336791' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { icon: SiRedis, label: 'Redis', color: '#DC382D' },
  { icon: SiGraphql, label: 'GraphQL', color: '#E10098' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
  { icon: SiNginx, label: 'Nginx', color: '#009639' },
  { icon: SiGithubactions, label: 'CI/CD', color: '#2088FF' },
  { icon: SiPrisma, label: 'Prisma', color: '#B19EEF' },
];

const Separator = () => (
  <span className="mx-6 text-[var(--accent-purple)] opacity-40 text-lg select-none">✦</span>
);

export default function TechMarquee() {
  const items = techStack.map((tech, i) => {
    const Icon = tech.icon;
    return (
      <span key={i} className="inline-flex items-center gap-3 mx-8 group cursor-default">
        <div className="relative">
          <Icon 
            style={{ color: tech.color }} 
            className="text-2xl shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" 
          />
          <div className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: tech.color }} />
        </div>
        <span
          className="font-mono font-black uppercase tracking-[0.2em] text-[var(--text-muted)] text-[0.65rem] group-hover:text-[var(--text-primary)] transition-colors duration-300"
        >
          {tech.label}
        </span>
        <Separator />
      </span>
    );
  });

  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`relative py-6 border-y border-[var(--border-primary)] bg-[var(--section-bg-alt)] overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Edge Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-8 z-10 pointer-events-none bg-[var(--section-bg-alt)]/80" />
      <div className="absolute top-0 bottom-0 right-0 w-8 z-10 pointer-events-none bg-[var(--section-bg-alt)]/80" />

      <Marquee speed={40} className="py-2 relative z-0">
        {items}
      </Marquee>
    </section>
  );
}
