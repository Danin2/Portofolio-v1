'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  technologies: string[];
}

const timeline: TimelineItem[] = [
  {
    year: '2026',
    title: 'Available Now',
    description: 'Menerima project dan kolaborasi baru. Fokus pada high-scale system design dan optimasi backend.',
    technologies: ['System Design', 'Consulting', 'Architecture'],
  },
  {
    year: '2025',
    title: 'Open Source Contribution',
    description: 'Kontribusi ke project open source dan membangun library internal untuk optimasi performa backend.',
    technologies: ['Open Source', 'Node.js', 'Go'],
  },
  {
    year: '2024',
    title: 'Systems Architecture',
    description: 'Eksplorasi dan implementasi Docker, Redis, dan microservices untuk sistem yang lebih resilient.',
    technologies: ['Docker', 'Redis', 'Microservices', 'K8s'],
  },
  {
    year: '2023',
    title: 'Full-Stack Expansion',
    description: 'Eksplorasi React dan TypeScript untuk membangun interface yang sebanding dengan kualitas backend.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    year: '2023',
    title: 'First API Project',
    description: 'Membangun REST API pertama dengan PostgreSQL. Fokus pada skema database dan keamanan data.',
    technologies: ['Node.js', 'PostgreSQL', 'Express'],
  },
  {
    year: '2022',
    title: 'Started Backend Journey',
    description: 'Mulai belajar Node.js dan Express.js. Memahami dasar-dasar server-side programming.',
    technologies: ['JavaScript', 'Node.js', 'Express'],
  },
];

const ExperienceTimeline = () => {
  return (
    <section className="relative bg-[var(--bg-primary)] py-32 overflow-hidden border-t border-[var(--border-primary)]">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[var(--accent-primary)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                Career Path
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
              Professional <span className="text-[var(--text-muted)] font-light italic">Evolution</span>
            </h2>
          </div>
          <p className="text-lg text-[var(--text-secondary)] max-w-sm opacity-80 border-l border-[var(--border-primary)] pl-8">
            A history of building resilient systems across various industries and scales.
          </p>
        </div>

        <div className="space-y-0">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative grid md:grid-cols-12 gap-8 py-14 border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)]/50 transition-all duration-500 px-6 -mx-6 rounded-[2rem]"
            >
              {/* Year & Index */}
              <div className="md:col-span-2 flex md:flex-col justify-between items-start">
                <span className="text-2xl font-black text-[var(--text-primary)] font-mono tracking-tighter">
                  {item.year}
                </span>
                <span className="text-[0.6rem] font-black text-[var(--accent-primary)] uppercase tracking-[0.3em] mt-auto">
                  EXP_{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title & Company */}
              <div className="md:col-span-4 space-y-3">
                <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300 uppercase tracking-tight leading-tight">
                  {item.title}
                </h3>
                {item.company && (
                  <p className="inline-flex px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-[0.6rem] font-black uppercase tracking-widest rounded-md">
                    @ {item.company}
                  </p>
                )}
              </div>

              {/* Description & Tech */}
              <div className="md:col-span-6 space-y-6">
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-[0.55rem] font-black tracking-widest uppercase rounded-lg border border-[var(--border-primary)] group-hover:border-[var(--accent-primary)]/40 group-hover:text-[var(--accent-primary)] transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;