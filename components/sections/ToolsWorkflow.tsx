'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealText from '@/components/ui/RevealText';
import { getFeaturedProjects } from '@/lib/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
      {/* Sophisticated background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[var(--accent-purple)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[var(--accent-violet)]/5 blur-[100px] rounded-full" />
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
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full bg-[var(--card-bg)] rounded-[2.5rem] border border-[var(--border-primary)] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-purple)]/20 relative"
              >
                {/* Animated Border using conic-gradient on hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem] p-[1px] bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-violet)]" style={{ backgroundClip: 'padding-box, border-box', backgroundOrigin: 'border-box' }} />

                <div className="p-10 flex flex-col h-full relative z-10 bg-[var(--card-bg)] rounded-[2.5rem] overflow-hidden">
                  <div className="flex items-center justify-between mb-12">
                    <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] group-hover:text-[var(--accent-purple)] transition-colors">
                      {project.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-all duration-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 group-hover:text-[var(--accent-purple)] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-10 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.shortDescription}
                  </p>

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

                  {/* Hover Reveal Layer */}
                  <div className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-sm z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-center p-10 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <h4 className="text-xl font-bold text-[var(--accent-purple)] mb-4">{project.title}</h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">{project.shortDescription}</p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--accent-purple)] text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[var(--accent-violet)] transition-all duration-300 w-max">
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
