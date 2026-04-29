'use client';

import Marquee from '@/components/ui/Marquee';
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
      <span key={i} className="inline-flex items-center gap-2 mx-4">
        <Icon style={{ color: tech.color, opacity: 0.7 }} className="text-xl shrink-0" />
        <span
          className="font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)] text-xs"
        >
          {tech.label}
        </span>
        <Separator />
      </span>
    );
  });

  return (
    <div className="relative py-6 border-y border-[var(--border-primary)] bg-[var(--section-bg-alt)] overflow-hidden">
      <Marquee speed={40} className="py-2">
        {items}
      </Marquee>
    </div>
  );
}
