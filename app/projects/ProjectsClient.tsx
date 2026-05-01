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
  const [IconComp, setIconComp] = React.useState<any>(null);

  React.useEffect(() => {
    if (!meta?.iconName) return;
    import('react-icons/si').then((mod) => {
      const icon = (mod as any)[meta.iconName];
      if (icon) setIconComp(() => icon);
    });
  }, [meta?.iconName]);

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[0.65rem] font-medium border transition-colors bg-[var(--bg-tertiary)]/50 border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)]"
    >
      {meta && IconComp && (
        <IconComp style={{ color: meta.color, opacity: 0.8, width: 12, height: 12, flexShrink: 0 }} />
      )}
      {tech}
    </span>
  );
});
TechBadge.displayName = 'TechBadge';

// Card header configs per project slug
const CARD_HEADERS: Record<string, { gradient: string; accent: string; label: string }> = {
  'ecommerce-rest-api': {
    gradient: 'linear-gradient(135deg, rgba(108,142,191,0.3) 0%, rgba(15,23,42,0.6) 100%)',
    accent: '#6C8EBF',
    label: 'REST API',
  },
  'realtime-chat-app': {
    gradient: 'linear-gradient(135deg, rgba(74,109,156,0.3) 0%, rgba(10,20,55,0.6) 100%)',
    accent: '#4A6D9C',
    label: 'WebSocket',
  },
  'task-management-api': {
    gradient: 'linear-gradient(135deg, rgba(51,65,85,0.3) 0%, rgba(5,35,25,0.6) 100%)',
    accent: '#334155',
    label: 'REST API',
  },
  'microservices-blog': {
    gradient: 'linear-gradient(135deg, rgba(148,163,184,0.3) 0%, rgba(25,10,45,0.6) 100%)',
    accent: '#94A3B8',
    label: 'Microservices',
  },
  'database-migration-tool': {
    gradient: 'linear-gradient(135deg, rgba(108,142,191,0.4) 0%, rgba(10,18,30,0.6) 100%)',
    accent: '#6C8EBF',
    label: 'CLI Tool',
  },
};

// Project icon for the card header visual
const ProjectHeaderIcon = ({ category }: { category: string }) => {
  const icons: Record<string, React.ReactNode> = {
    'API': (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    'Full-Stack': (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="m8 21 4-4 4 4M12 17v4" />
      </svg>
    ),
    'Microservices': (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v4M8.5 16.5 12 11M15.5 16.5 12 11" />
      </svg>
    ),
    'Database': (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  };
  return icons[category] || icons['API'];
};

const ProjectCard = memo(({ project, isFeatured }: { project: Project; isFeatured?: boolean }) => {
  const header = CARD_HEADERS[project.slug] || CARD_HEADERS['ecommerce-rest-api'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col rounded-3xl overflow-hidden border border-[var(--border-primary)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/25 ${isFeatured ? 'md:col-span-2 md:flex-row' : ''
        }`}
    >
      {/* ── Visual Card Header ──────────────────────────── */}
      <div
        className={`relative overflow-hidden flex items-center justify-center ${isFeatured ? 'md:w-2/5' : ''}`}
        style={{
          height: isFeatured ? '100%' : '160px',
          minHeight: isFeatured ? '220px' : '160px',
          background: header.gradient,
        }}
      >
        {/* Accent top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${header.accent}, transparent)`,
        }} />

        {/* Category label badge */}
        <span style={{
          position: 'absolute', top: '12px', right: '12px',
          padding: '4px 10px', borderRadius: '9999px',
          background: `rgba(255,255,255,0.08)`,
          border: `1px solid ${header.accent}55`,
          color: header.accent,
          fontSize: '10px',
          fontWeight: '700',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          {header.label}
        </span>

        {/* Large category icon, decorative */}
        <div style={{ opacity: 0.1, color: 'white' }} className="group-hover:opacity-[0.15] transition-opacity duration-500">
          <ProjectHeaderIcon category={project.category} />
        </div>

        {/* Bottom glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
          background: `linear-gradient(to top, ${header.accent}12, transparent)`,
        }} />
      </div>

      {/* ── Content Section ─────────────────────────────── */}
      <div className={`flex-1 p-8 lg:p-10 flex flex-col ${isFeatured ? 'md:justify-center' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {project.category}
          </span>
          <span className="text-[0.6rem] font-mono text-[var(--text-muted)]">
            {project.completedAt?.split('-')[0] || '2024'}
          </span>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
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
            <span className="w-5 h-5 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center group-hover/link:bg-[var(--accent-primary)] group-hover/link:text-white transition-all duration-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
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

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg-primary)] selection:bg-[var(--accent-primary)] selection:text-white pb-32">

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-primary)]/5 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-[var(--accent-secondary)]/5 blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-8 bg-[var(--accent-primary)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-primary)]">
                Portfolio & Works
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] mb-8 leading-[0.9]">
              Selected <span className="text-[var(--text-muted)] font-light italic">Projects</span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed opacity-80">
                A showcase of architecting scalable backend solutions, distributed systems, and modern API infrastructures with clinical precision.
              </p>
            </div>
          </motion.div>

          {/* System Dashboard Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-24 mb-12">
            <div className="lg:col-span-8">
              <div className="relative group p-8 rounded-[2rem] bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)] overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-primary)] opacity-50" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                  </div>
                  <span className="text-[0.6rem] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-[0.2em]">System_Logs :: Technical_Dossier</span>
                </div>
                <div className="space-y-4 font-mono text-[0.65rem] md:text-[0.75rem] leading-relaxed text-[var(--text-secondary)]">
                  <div className="flex gap-4 group/line">
                    <span className="text-[var(--text-muted)] opacity-50">01</span>
                    <p><span className="text-[var(--accent-primary)] font-bold">INIT:</span> System architect profile successfully loaded for <span className="text-[var(--text-primary)]">Muhammad Danindra</span>.</p>
                  </div>
                  <div className="flex gap-4 group/line">
                    <span className="text-[var(--text-muted)] opacity-50">02</span>
                    <p><span className="text-[var(--accent-primary)] font-bold">INFO:</span> Displaying <span className="text-[var(--text-primary)] font-bold">{projects.length} mission-critical</span> backend systems and microservices.</p>
                  </div>
                  <div className="flex gap-4 group/line">
                    <span className="text-[var(--text-muted)] opacity-50">03</span>
                    <p><span className="text-[var(--accent-primary)] font-bold">SCAN:</span> Core stack verified: <span className="text-[var(--text-primary)]">Node.js, TypeScript, PostgreSQL, Distributed Systems</span>.</p>
                  </div>
                  <div className="flex gap-4 group/line">
                    <span className="text-[var(--text-muted)] opacity-50">04</span>
                    <p><span className="text-green-500 font-bold">READY:</span> Navigation protocols active. Use filters to sort by system architecture.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              {[
                { label: 'Latency', value: '14ms', icon: '⚡' },
                { label: 'Uptime', value: '99.9%', icon: '🟢' },
                { label: 'Builds', value: '842', icon: '📦' },
                { label: 'Nodes', value: '12', icon: '🌐' },
              ].map((stat, i) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-[var(--bg-tertiary)]/30 border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30 transition-all group">
                  <span className="text-xl mb-2 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                  <div className="text-lg font-black text-[var(--text-primary)]">{stat.value}</div>
                  <div className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION & FILTERS ────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-y border-[var(--border-primary)]">
        <div className="container-custom py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Main Tabs */}
          <div className="flex items-center p-1 bg-[var(--bg-tertiary)]/50 rounded-xl w-fit border border-[var(--border-primary)]">
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
                    className="absolute inset-0 bg-[var(--accent-primary)] rounded-lg shadow-lg shadow-[var(--accent-primary)]/20"
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
              {filteredProjects.map((project) => (
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
                  className="group bg-[var(--card-bg)] rounded-2xl p-8 border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest">{cert.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">{cert.title}</h4>
                  <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-6 opacity-80">{cert.issuer}</p>

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
        </AnimatePresence>

        {/* ── FOOTER CTA ─────────────────────────────────────── */}
        <section className="mt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[3.5rem] bg-[var(--bg-secondary)]/40 backdrop-blur-3xl border border-[var(--border-primary)] p-12 lg:p-24 overflow-hidden text-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />

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
                    className="px-12 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full transition-all shadow-xl hover:bg-[var(--accent-primary)] hover:text-white block"
                  >
                    Hire Me →
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/about"
                    className="px-12 py-5 bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] transition-all block"
                  >
                    My Journey
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </section>
    </div>
  );
}
;
