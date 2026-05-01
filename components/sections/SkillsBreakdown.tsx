'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skillsData: Skill[] = [
  { name: 'Node.js',      level: 90, category: 'Backend' },
  { name: 'TypeScript',   level: 85, category: 'Backend' },
  { name: 'PostgreSQL',   level: 80, category: 'Database' },
  { name: 'Redis',        level: 70, category: 'Database' },
  { name: 'NestJS',       level: 75, category: 'Frameworks' },
  { name: 'GraphQL',      level: 65, category: 'API' },
  { name: 'Docker',       level: 75, category: 'DevOps' },
  { name: 'System Design', level: 80, category: 'Architecture' },
];

const categories = Array.from(new Set(skillsData.map(s => s.category)));

const SkillsBreakdown = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Backend');

  const filtered = skillsData.filter(s => s.category === activeCategory);

  return (
    <section className="relative bg-[var(--bg-primary)] py-32 overflow-hidden border-t border-[var(--border-primary)]">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[var(--accent-primary)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                Proficiency
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]">
              Technical <span className="text-[var(--text-muted)] font-light italic">Core</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[0.65rem] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                    : 'bg-transparent text-[var(--text-muted)] border-[var(--border-primary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
            >
              {filtered.map((skill, idx) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <div className="space-y-1">
                      <span className="text-[0.6rem] font-black text-[var(--accent-primary)] uppercase tracking-widest block opacity-60">
                        {String(idx + 1).padStart(2, '0')} · {skill.category}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-[0.65rem] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="h-[2px] w-full bg-[var(--border-primary)] relative overflow-hidden rounded-full">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: idx * 0.05 }}
                      style={{ 
                        width: `${skill.level}%`,
                        transformOrigin: 'left'
                      }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsBreakdown;