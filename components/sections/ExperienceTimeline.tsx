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
    title: 'Future Systems Engineer',
    description: 'Fokus pada pembangunan infrastruktur skala besar yang tangguh. Terus mengeksplorasi batas-batas optimasi backend dan desain sistem terdistribusi.',
    technologies: ['Architecture', 'Scaling', 'Consulting'],
  },
  {
    year: '2025',
    title: 'Open Source & Optimization',
    description: 'Mulai berkontribusi pada ekosistem open source. Membangun library internal untuk manajemen state database yang lebih efisien dan performa tinggi.',
    technologies: ['Go', 'Redis', 'Performance'],
  },
  {
    year: '2024',
    title: 'The Shift to Systems Architect',
    description: 'Mulai memahami pentingnya orkestrasi. Mengimplementasikan Docker dan Kubernetes untuk memastikan reliabilitas sistem di berbagai environment.',
    technologies: ['Docker', 'Kubernetes', 'Microservices'],
  },
  {
    year: '2023',
    title: 'Mastering the Full Stack',
    description: 'Memperluas keahlian ke frontend dengan Next.js untuk memahami bagaimana API dikonsumsi secara real-time. Membangun dashboard analitik pertama.',
    technologies: ['Next.js', 'React', 'TypeScript'],
  },
  {
    year: '2023',
    title: 'Deep Dive into Databases',
    description: 'Membangun project database PostgreSQL pertama yang kompleks. Belajar tentang indexing, query optimization, dan normalisasi data yang benar.',
    technologies: ['Node.js', 'PostgreSQL', 'Express'],
  },
  {
    year: '2022',
    title: 'The Beginning of the Terminal',
    description: 'Menulis baris kode pertama di Node.js. Terpesona oleh bagaimana server dapat menangani ribuan permintaan secara asinkron.',
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