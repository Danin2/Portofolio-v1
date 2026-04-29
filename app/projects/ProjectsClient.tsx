'use client';

import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { projects, TECH_META } from '@/lib/data/projects';
import { Project } from '@/types/project';
import RevealText from '@/components/ui/RevealText';
import { certificates } from '@/lib/data/certificates';
import FallingLetters from '@/components/ui/FallingLetters';
import ScrollReveal from '@/components/ui/ScrollReveal';
import KeyboardTechStack from '@/components/sections/KeyboardTechStack';

// ─── Constants & Utils ───────────────────────────────────────────────────────
const TABS = [
  { id: 'projects', label: 'Projects', count: projects.length },
  { id: 'certificates', label: 'Certifications', count: certificates.length },
  { id: 'tech', label: 'Tech Stack', count: Array.from(new Set(projects.flatMap(p => p.techStack))).length },
] as const;

type TabId = typeof TABS[number]['id'];

// ─── Sub-components ─────────────────────────────────────────────────────────

const TechBadge = memo(({ tech }: { tech: string }) => {
  const meta = TECH_META[tech];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[0.65rem] font-medium border transition-colors bg-[var(--bg-tertiary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--accent-purple)]/50 hover:text-[var(--text-primary)]"
    >
      {meta && <span style={{ color: meta.color }}>{meta.icon}</span>}
      {tech}
    </span>
  );
});
TechBadge.displayName = 'TechBadge';

const ProjectCard = memo(({ project, isFeatured }: { project: Project; isFeatured?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative flex flex-col rounded-3xl overflow-hidden border border-[var(--border-primary)] bg-[var(--card-bg)] transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-purple)]/10 hover:border-[var(--accent-purple)]/20 ${isFeatured ? 'md:col-span-2 md:flex-row' : ''
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual background effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">

      </div>

      {/* Image / Icon Section */}
      <div className={`relative overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center border-[var(--border-primary)] ${isFeatured ? 'md:w-2/5 border-r' : 'aspect-video border-b'
        }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/5 to-transparent" />

        {/* Mock representation or Icon if no thumbnail */}
        <div className="relative z-10 flex flex-col items-center gap-4">
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 p-8 lg:p-10 flex flex-col ${isFeatured ? 'md:justify-center' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {project.category}
          </span>
          <span className="text-[0.6rem] font-mono text-[var(--text-muted)]">
            {project.completedAt?.split('-')[0] || '2024'}
          </span>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-purple)] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed mb-8 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
          {project.shortDescription}
        </p>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, isFeatured ? 6 : 4).map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {project.techStack.length > (isFeatured ? 6 : 4) && (
              <span className="text-[0.65rem] text-[var(--text-muted)] flex items-center px-1">
                +{project.techStack.length - (isFeatured ? 6 : 4)}
              </span>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--text-primary)] group/link"
          >
            Explore System
            <span className="w-5 h-5 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center group-hover/link:bg-[var(--accent-purple)] group-hover/link:text-white transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.div >
  );
});
ProjectCard.displayName = 'ProjectCard';

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProjectsClientProps {
  projects: Project[];
  categories: string[];
  totalTechs: number;
}

export default function ProjectsClient({ projects, categories, totalTechs }: ProjectsClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>('projects');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  const filteredProjects = useMemo(() => {
    let base = selectedCategory === 'All' ? projects : projects.filter(p => p.category === selectedCategory);
    // Sort to have featured first
    return [...base].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [selectedCategory, projects]);

  const techStackData = useMemo(() => {
    const all = projects.flatMap(p => p.techStack);
    const counts = all.reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [projects]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--accent-purple)] selection:text-white pb-32">

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-purple)]/5 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-[var(--accent-violet)]/5 blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-8 bg-[var(--accent-purple)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-purple)]">
                Portfolio & Works
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] mb-8">
              Selected <span className="text-[var(--text-muted)] font-light italic">Projects</span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed opacity-80">
                A showcase of architecting scalable backend solutions, distributed systems, and modern API infrastructures with clinical precision.
              </p>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-[var(--border-primary)] pt-12">
            {[
              { label: 'Total Systems', value: projects.length },
              { label: 'Technologies', value: totalTechs },
              { label: 'Certifications', value: certificates.length },
              { label: 'Uptime (Demo)', value: '99.9%' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <span className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{stat.value}</span>
                <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION & FILTERS ────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-y border-[var(--border-primary)]">
        <div className="container-custom py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Main Tabs */}
          <div className="flex items-center p-1 bg-[var(--bg-tertiary)] rounded-xl w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 text-[0.7rem] font-bold uppercase tracking-wider transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  <span className={`text-[0.6rem] opacity-50 ${activeTab === tab.id ? 'text-white/80' : ''}`}>
                    {tab.count}
                  </span>
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--accent-purple)] rounded-lg shadow-lg shadow-[var(--accent-purple)]/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Contextual Filters */}
          {activeTab === 'projects' && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[0.65rem] font-bold transition-all duration-300 border ${selectedCategory === cat
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                    : 'border-[var(--border-primary)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENT GRID ───────────────────────────────────── */}
      <section className="mt-16 container-custom">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFeatured={project.featured && selectedCategory === 'All'}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-[var(--card-bg)] rounded-2xl p-8 border border-[var(--border-primary)] hover:border-[var(--accent-purple)]/30 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest">{cert.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-purple)] transition-colors">{cert.title}</h4>
                  <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--accent-purple)] mb-6 opacity-80">{cert.issuer}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {cert.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-[0.55rem] font-bold uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.65rem] font-black uppercase tracking-widest text-[var(--text-primary)] inline-flex items-center gap-2 group/link"
                    >
                      Verify Link
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <KeyboardTechStack />
            </motion.div>
          )}
          {/* ── FOOTER CTA ─────────────────────────────────────── */}
          <section className="mt-40 container-custom">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[3.5rem] bg-[var(--bg-secondary)]/40 backdrop-blur-3xl border border-[var(--border-primary)] p-12 lg:p-24 overflow-hidden text-center shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/5 via-transparent to-[var(--accent-violet)]/5 pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl lg:text-7xl font-black text-[var(--text-primary)] mb-10 tracking-tight leading-tight px-4"
                >
                  Ready to architect <br />
                  <span className="gradient-text italic font-medium inline-block pr-4">something great?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-[var(--text-secondary)] text-lg mb-12 opacity-80 max-w-xl mx-auto font-medium"
                >
                  I&apos;m currently accepting new projects and consulting inquiries. Let&apos;s talk about your next backend challenge.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-6"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact"
                      className="px-12 py-5 bg-[var(--accent-purple)] text-white font-bold uppercase tracking-widest text-[0.7rem] rounded-full transition-all shadow-xl shadow-[var(--accent-purple)]/20 hover:shadow-[var(--accent-purple)]/40 block"
                    >
                      Hire Me →
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/about"
                      className="px-12 py-5 bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:border-[var(--text-primary)] transition-all block"
                    >
                      My Journey
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </AnimatePresence>
      </section>
    </div>
  );
};
