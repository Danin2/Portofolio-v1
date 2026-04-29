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
    year: '2024',
    title: 'Backend Engineer',
    company: 'Fintech Solutions',
    description: 'Architecting mission-critical microservices and robust API layers. Implemented advanced caching mechanisms and database optimizations that scaled system capacity by 300%.',
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Kubernetes'],
  },
  {
    year: '2023',
    title: 'Systems Developer',
    company: 'CloudScale Inc',
    description: 'Engineered high-throughput data processing pipelines and event-driven architectures. Led the migration of legacy monoliths to modern distributed systems.',
    technologies: ['Go', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    year: '2022',
    title: 'Backend Specialist',
    company: 'Alpha Digital',
    description: 'Developed scalable REST and GraphQL APIs for enterprise-grade applications. Focused on implementing secure authentication flows and complex business logic.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'AWS'],
  },
  {
    year: '2021',
    title: 'Associate Developer',
    company: 'StartUp Hub',
    description: 'Initiated technical foundations for early-stage ventures. Built foundational CRUD services and integrated third-party payment gateways.',
    technologies: ['JavaScript', 'MySQL', 'Git', 'Linux'],
  },
];

const ExperienceTimeline = () => {
  return (
    <section className="relative bg-[var(--bg-primary)] py-32 overflow-hidden border-t border-[var(--border-primary)]">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[var(--accent-purple)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-purple)]">
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
              className="group relative grid md:grid-cols-12 gap-8 py-12 border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)]/30 transition-all duration-500 px-4 -mx-4 rounded-3xl"
            >
              {/* Year & Index */}
              <div className="md:col-span-2 flex md:flex-col justify-between items-start">
                <span className="text-2xl font-black text-[var(--text-primary)] font-mono">
                  {item.year}
                </span>
                <span className="text-[0.6rem] font-bold text-[var(--text-muted)] opacity-50 uppercase tracking-widest mt-auto">
                  Exp_{String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title & Company */}
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors duration-300 uppercase tracking-tight">
                  {item.title}
                </h3>
                {item.company && (
                  <p className="text-[var(--accent-purple)] text-xs font-black uppercase tracking-widest">
                    @ {item.company}
                  </p>
                )}
              </div>

              {/* Description & Tech */}
              <div className="md:col-span-6 space-y-6">
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-[0.6rem] font-bold tracking-widest uppercase rounded-lg border border-[var(--border-primary)] group-hover:border-[var(--accent-purple)]/30 transition-all"
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