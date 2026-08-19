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
import FooterCTA from '@/components/sections/FooterCTA';

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
    gradient: 'var(--card-bg)',
    accent: 'var(--accent-primary)',
    label: 'REST API',
  },
  'realtime-chat-app': {
    gradient: 'var(--card-bg)',
    accent: 'var(--accent-primary)',
    label: 'WebSocket',
  },
  'task-management-api': {
    gradient: 'var(--card-bg)',
    accent: 'var(--accent-primary)',
    label: 'REST API',
  },
  'microservices-blog': {
    gradient: 'var(--card-bg)',
    accent: 'var(--accent-primary)',
    label: 'Microservices',
  },
  'database-migration-tool': {
    gradient: 'var(--card-bg)',
    accent: 'var(--accent-primary)',
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
      whileHover={{ y: -4, boxShadow: '0 20px 60px -12px rgba(0,0,0,0.35)' }}
      className={`group relative flex flex-col h-full rounded-3xl overflow-hidden border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 bg-[var(--bg-secondary)] dark:bg-[var(--card-bg)] shadow-sm transition-all duration-500 ${isFeatured ? 'md:col-span-2 md:flex-row' : ''
        }`}
      style={{ transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)' }}
    >
      {/* Shimmer top-line on hover */}
      <div className="absolute top-0 left-0 w-full h-px bg-[var(--accent-primary)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      {/* Subtle inner glow */}
      <div className="absolute top-0 left-0 w-full h-24 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 rounded-3xl" />

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
          background: header.accent,
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

        {/* Bottom overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
          background: 'transparent',
        }} />
      </div>

      {/* ── Content Section ─────────────────────────────── */}
      <div className={`flex-1 p-5 md:p-8 lg:p-10 flex flex-col ${isFeatured ? 'md:justify-center' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {project.category}
          </span>
          <span className="text-[0.6rem] font-mono text-[var(--text-muted)]">
            {project.completedAt?.split('-')[0] || '2024'}
          </span>
        </div>

        <h2 className="text-xl lg:text-2xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
          {project.title}
        </h2>

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
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-primary)]/5 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-[var(--accent-secondary)]/5 blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] mb-4 md:mb-6 leading-[0.9]">
              Selected <span className="text-[var(--text-muted)] font-light italic">Projects</span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed opacity-80">
                A showcase of architecting scalable Frontend solutions, distributed systems, and modern API infrastructures with clinical precision.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NAVIGATION & FILTERS ────────────────────────────── */}
      <div className="bg-[var(--bg-primary)] border-b border-[var(--border-primary)]">
        <div className="container-custom">
          {/* Main Tabs — full-width underline style */}
          <div className="flex border-b border-[var(--border-primary)] -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-3 md:py-4 text-[0.65rem] md:text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-[var(--text-primary)] border-b-2 border-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
                <span className="ml-1.5 text-[0.6rem] opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Contextual Filters */}
          {activeTab === 'projects' && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-3">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-[0.65rem] font-bold transition-all duration-200 border ${
                    selectedCategory === cat
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
      <section className="mt-8 md:mt-16 container-custom">
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
              {filteredProjects.length === 0 ? (
                <div className="col-span-full py-16 text-center border border-dashed border-[var(--border-primary)] rounded-3xl p-8 bg-[var(--bg-secondary)]/30">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <p className="text-[var(--text-primary)] font-bold text-base mb-1">No matching projects found</p>
                  <p className="text-[var(--text-muted)] text-xs mb-6">No systems match your category "{selectedCategory}"</p>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="px-6 py-2.5 rounded-full bg-[var(--accent-primary)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isFeatured={project.featured && selectedCategory === 'All'}
                  />
                ))
              )}
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
                  whileHover={{ y: -4, boxShadow: '0 20px 60px -12px rgba(0,0,0,0.35)' }}
                  className="h-full rounded-3xl"
                >
                  <div
                    className="group h-full bg-[var(--bg-secondary)] dark:bg-[var(--card-bg)] backdrop-blur-[10px] rounded-3xl p-8 border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-all duration-500 shadow-sm relative overflow-hidden flex flex-col"
                    style={{ transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)' }}
                  >
                    {/* Shimmer top-line on hover */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                    {/* Subtle inner glow */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[var(--accent-primary)]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 rounded-3xl" />

                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <span className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest">{cert.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors relative z-10">{cert.title}</h4>
                    <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-6 opacity-80 relative z-10">{cert.issuer}</p>

                    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                      {cert.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-[0.55rem] font-bold uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {cert.credentialUrl && (
                      <div className="mt-auto relative z-10">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.65rem] font-black uppercase tracking-widest text-[var(--text-primary)] inline-flex items-center gap-2 group/link"
                        >
                          Verify Link
                          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
                    )}
                  </div>
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
        <FooterCTA />
      </section>
    </div>
  );
}
;
