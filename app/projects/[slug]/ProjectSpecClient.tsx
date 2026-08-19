'use client';

import React, { useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/types/project';
import { TECH_META } from '@/lib/data/projects';
import RevealText from '@/components/ui/RevealText';

interface ProjectSpecClientProps {
  project: Project;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const TechBadge = memo(({ tech }: { tech: string }) => {
  const meta = TECH_META[tech];
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[0.7rem] font-bold border transition-all bg-[var(--bg-secondary)] border-[var(--border-primary)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)] hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--accent-primary)]/5"
    >
      {meta && <span style={{ backgroundColor: meta.color }} className="w-1.5 h-1.5 rounded-full" />}
      <span className="uppercase tracking-widest">{tech}</span>
    </span>
  );
});
TechBadge.displayName = 'TechBadge';

const DetailSection = memo(({ title, children, colorClass = 'text-[var(--accent-primary)]' }: { title: string; children: React.ReactNode; colorClass?: string }) => (
  <div className="space-y-6">
    <h3 className={`text-[0.65rem] font-black uppercase tracking-[0.3em] ${colorClass}`}>
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
));
DetailSection.displayName = 'DetailSection';

const ItemCard = memo(({ children, icon, color }: { children: React.ReactNode; icon?: string; color?: string }) => (
  <div
    className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex gap-4 items-start group hover:border-[var(--accent-primary)]/20 transition-all duration-300"
  >
    {icon && <span className="shrink-0 mt-1" style={{ color }}>{icon}</span>}
    <div className="text-sm leading-relaxed text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
      {children}
    </div>
  </div>
));
ItemCard.displayName = 'ItemCard';

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProjectSpecClient({ project }: ProjectSpecClientProps) {
  const dateOpts: Intl.DateTimeFormatOptions = useMemo(() => ({ month: 'long', year: 'numeric' }), []);

  const metrics = useMemo(() => [
    { label: 'Category', value: project.category },
    { label: 'Role', value: 'Lead Frontend Engineer' },
    { label: 'Status', value: 'Production Ready' },
    { label: 'Completed', value: new Date(project.completedAt).toLocaleDateString('en-US', dateOpts) },
  ], [project, dateOpts]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-32">

      {/* ── HEADER / HERO ─────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-purple)] transition-colors mb-16 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
          </Link>

          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-[0.6rem] font-bold uppercase tracking-widest">
                  Case Study
                </span>
                <span className="text-[var(--text-muted)] text-[0.6rem] font-mono">ID_{project.id.padStart(3, '0')}</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] mb-8 leading-[0.9]">
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-3xl opacity-80">
                {project.shortDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-12"
            >
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener" className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest text-[0.65rem] rounded-full hover:bg-[var(--accent-primary)] transition-all shadow-xl">
                  Source Code &gt;
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener" className="px-8 py-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-bold uppercase tracking-widest text-[0.65rem] rounded-full hover:border-[var(--text-primary)] transition-all">
                  Live System &gt;
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── METRICS BAR ────────────────────────────────────── */}
      <section className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-[var(--border-primary)]">
          {metrics.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="space-y-1"
            >
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-muted)] block">{stat.label}</span>
              <span className="text-base md:text-lg font-bold text-[var(--text-primary)]">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CORE DETAILS ───────────────────────────────────── */}
      <section className="container-custom py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Overview */}
        <div className="lg:col-span-2 space-y-16">
          <div className="space-y-8">
            <DetailSection title="Executive Summary">
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                {project.fullDescription}
              </p>
            </DetailSection>

            <DetailSection title="Technical Architecture">
              <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                <p className="text-[var(--text-secondary)] leading-relaxed italic">
                  &ldquo;{project.architecture}&rdquo;
                </p>
              </div>
            </DetailSection>
          </div>

          <DetailSection title="Key Features & Capabilities" colorClass="text-[var(--accent-primary)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <ItemCard key={idx} icon="✦" color="var(--accent-primary)">
                  {feat}
                </ItemCard>
              ))}
            </div>
          </DetailSection>
        </div>

        {/* Right: Stack & Logs */}
        <div className="space-y-16">
          <DetailSection title="Technology Stack">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Challenges & Constraints" colorClass="text-[var(--accent-orange)]">
            <div className="space-y-3">
              {project.challenges.map((c, idx) => (
                <ItemCard key={idx} icon="!" color="var(--accent-orange)">
                  {c}
                </ItemCard>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Engineering Solutions" colorClass="text-[var(--accent-green)]">
            <div className="space-y-3">
              {project.solutions.map((s, idx) => (
                <ItemCard key={idx} icon="✓" color="var(--accent-green)">
                  {s}
                </ItemCard>
              ))}
            </div>
          </DetailSection>
        </div>
      </section>

      {/* ── FOOTER CTA ─────────────────────────────────────── */}
      <section className="container-custom mt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3.5rem] bg-[var(--bg-secondary)]/40 backdrop-blur-3xl border border-[var(--border-primary)] p-12 lg:p-24 overflow-hidden text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl lg:text-7xl font-black text-[var(--text-primary)] mb-10 tracking-tight leading-tight"
            >
              Ready to discuss <br />
              <span className="gradient-text italic font-medium">your next project?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[var(--text-secondary)] text-lg mb-12 opacity-80 max-w-xl mx-auto font-medium"
            >
              I am always open to discussing new opportunities and technical challenges. Let&apos;s build the future together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link href="/contact" className="px-12 py-5 bg-[var(--accent-primary)] text-white font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:bg-[var(--accent-primary)]/80 transition-all shadow-xl shadow-[var(--accent-primary)]/20 hover:scale-105">
                Get in touch &gt;
              </Link>
              <Link href="/projects" className="px-12 py-5 bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:border-[var(--text-primary)] transition-all">
                More Projects
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
