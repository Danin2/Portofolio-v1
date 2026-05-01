'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Tilt from "react-parallax-tilt";
import RevealText from '@/components/ui/RevealText';
import { getFeaturedProjects } from '@/lib/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import TerminalCardHeader from '@/components/ui/TerminalCardHeader';

// Terminal output lines per project
const terminalData: Record<string, { lines: { text: string; type: 'command' | 'success' | 'info' | 'warning' }[]; title: string }> = {
  default: {
    title: 'api.ts',
    lines: [
      { text: 'GET /api/v1/health → 200 OK (4ms)', type: 'success' },
      { text: 'POST /api/v1/auth → JWT issued', type: 'info' },
      { text: 'Server running on :3000 ✓', type: 'success' },
    ],
  },
};

// Map project slug/title keywords to terminal lines
function getTerminalData(project: { slug: string; title: string }) {
  const slug = project.slug.toLowerCase();
  const title = project.title.toLowerCase();

  if (slug.includes('ecommerce') || title.includes('commerce') || title.includes('shop')) {
    return {
      title: 'ecommerce.ts',
      lines: [
        { text: 'GET /api/products → 200 OK (8ms)', type: 'success' as const },
        { text: 'POST /api/orders → 201 Created', type: 'success' as const },
        { text: 'Redis cache: 94% hit rate ✓', type: 'info' as const },
      ],
    };
  }
  if (slug.includes('chat') || title.includes('chat') || title.includes('message')) {
    return {
      title: 'websocket.ts',
      lines: [
        { text: 'WS connected · 1,247 active sessions', type: 'success' as const },
        { text: 'MSG delivered in <5ms avg', type: 'info' as const },
        { text: '[BROKER] Kafka lag: 0ms ✓', type: 'success' as const },
      ],
    };
  }
  if (slug.includes('task') || title.includes('task') || title.includes('todo')) {
    return {
      title: 'tasks.ts',
      lines: [
        { text: 'POST /tasks · RBAC verified · logged', type: 'success' as const },
        { text: '[AUTH] role: admin · access granted', type: 'info' as const },
        { text: 'Queue processed: 120 jobs/s ✓', type: 'success' as const },
      ],
    };
  }
  if (slug.includes('micro') || title.includes('micro')) {
    return {
      title: 'services.ts',
      lines: [
        { text: '[BROKER] 3 services healthy · lag: 0ms', type: 'success' as const },
        { text: 'gRPC: auth → order · 2ms', type: 'info' as const },
        { text: 'K8s: all pods running ✓', type: 'success' as const },
      ],
    };
  }
  if (slug.includes('db') || title.includes('database') || title.includes('migration')) {
    return {
      title: 'migrate.ts',
      lines: [
        { text: 'migrating... v1.0 → v2.0 [████████] 100%', type: 'success' as const },
        { text: 'schema verified · indexes OK', type: 'info' as const },
        { text: 'Rollback point saved ✓', type: 'success' as const },
      ],
    };
  }

  return {
    title: `${project.slug.split('-')[0]}.ts`,
    lines: [
      { text: `GET /api/health → 200 OK (4ms)`, type: 'success' as const },
      { text: `POST /api/v1/auth → JWT issued`, type: 'info' as const },
      { text: `Server running · uptime 99.9% ✓`, type: 'success' as const },
    ],
  };
}

const ProjectPreview = () => {
  const featuredProjects = getFeaturedProjects().slice(0, 3);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`relative bg-[var(--bg-primary)] section-padding overflow-hidden border-t border-[var(--border-primary)] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[var(--accent-primary)]/5 blur-[100px] rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[var(--accent-purple)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-purple)]">
                Featured Work
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
              Selected <span className="text-[var(--text-muted)] font-light italic">Creations</span>
            </h2>
          </div>

          <p className="text-lg text-[var(--text-secondary)] max-w-sm opacity-80 border-l border-[var(--border-primary)] pl-8">
            A glimpse into robust backend systems and modern API architectures.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {featuredProjects.map((project, idx) => {
            const termData = getTerminalData(project);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  scale={1}
                  transitionSpeed={1000}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="white"
                  glarePosition="all"
                  glareBorderRadius="2rem"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex flex-col h-full rounded-[2rem] border border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.03)] backdrop-blur-[10px] overflow-hidden transition-all duration-500 hover:border-[var(--accent-primary)]/50 hover:shadow-2xl relative"
                  >
                    {/* Terminal header */}
                    <TerminalCardHeader
                      projectId={project.id}
                      lines={termData.lines}
                      title={termData.title}
                    />

                    {/* Card content */}
                    <div className="p-8 flex flex-col flex-1 relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {project.category}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--accent-primary)]/15 group-hover:text-[var(--accent-primary)] transition-all duration-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        {project.shortDescription}
                      </p>

                      {/* Metric chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['⚡ <10ms', '🔒 JWT', '📦 Docker'].map((chip) => (
                          <span
                            key={chip}
                            className="text-[0.55rem] font-bold px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                            className="text-[0.6rem] font-bold px-3 py-1 bg-[var(--bg-tertiary)] rounded-md uppercase tracking-tight text-[var(--text-muted)]"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[0.6rem] text-[var(--text-muted)] self-center px-1">+{project.techStack.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center text-center gap-8 pt-10">
          <div className="h-px w-20 bg-[var(--border-primary)]" />
          <Link
            href="/projects"
            className="group flex flex-col items-center gap-4"
          >
            <span className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
              Explore Full Archive
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center group-hover:border-[var(--text-primary)] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14m-7-7 7 7 7-7" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectPreview;
