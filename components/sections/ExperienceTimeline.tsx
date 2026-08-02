'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const years = ['2026', '2025', '2024', '2023', '2023', '2022'];
const technologies = [
  ['Architecture', 'Scaling', 'Consulting'],
  ['Go', 'Redis', 'Performance'],
  ['Docker', 'Kubernetes', 'Microservices'],
  ['Next.js', 'React', 'TypeScript'],
  ['Node.js', 'PostgreSQL', 'Express'],
  ['JavaScript', 'Node.js', 'Express'],
];

const ExperienceTimeline = () => {
  const { t } = useLanguage();
  const items = t('experience.items') as { title: string; description: string }[];

  const timeline = Array.isArray(items)
    ? items.map((item, i) => ({
        year: years[i],
        title: item.title,
        description: item.description,
        technologies: technologies[i],
      }))
    : [];

  return (
    <section className="relative bg-[var(--bg-primary)] py-32 overflow-hidden border-t border-[var(--border-primary)]">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
              {t('experience.section_title')} <span className="text-[var(--text-muted)] font-light italic">{t('experience.section_title_italic')}</span>
            </h2>
          </div>
          <p className="text-lg text-[var(--text-secondary)] max-w-sm opacity-80 border-l border-[var(--border-primary)] pl-8">
            {t('experience.section_desc')}
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
              </div>

              {/* Title & Company */}
              <div className="md:col-span-4 space-y-3">
                <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300 uppercase tracking-tight leading-tight">
                  {item.title}
                </h3>
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