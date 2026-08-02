'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProjects, TECH_META } from '@/lib/data/projects';
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

const FeaturedProjects = () => {
  const featured = getFeaturedProjects().slice(0, 3); // Top 3 featured projects
  const { t } = useLanguage();

  return (
    <section id="work" className="relative bg-[var(--bg-primary)] py-24 sm:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-[var(--accent-primary)] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-[var(--accent-secondary)] opacity-[0.03] blur-[120px]" />
      </div>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="label-uppercase mb-4">{t('projects.selected_work')}</p>
            </ScrollReveal>
            <RevealText
              as="h2"
              delay={0.1}
              className="font-bold tracking-[-0.03em] leading-none text-[var(--text-primary)] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' } as React.CSSProperties}
            >
              {t('projects.featured_title')} <span className="gradient-text">{t('projects.featured_title_gradient')}</span>
            </RevealText>
            <ScrollReveal delay={0.2}>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-lg opacity-80">
                {t('projects.featured_desc')}
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.3}>
            <Link 
              href="/projects" 
              className="group inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-primary)] hover:border-[var(--accent-primary)] rounded-full text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300"
            >
              {t('projects.all_projects')}
              <span className="group-hover:translate-x-1 transition-transform inline-block">&gt;</span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Projects Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 min-h-[600px]">
          {featured.map((project, idx) => {
            // Layout logic: 1st project wide, 2nd & 3rd split row
            const isWide = idx === 0;
            
            return (
              <ScrollReveal 
                key={project.id}
                delay={0.1 * (idx + 1)}
                className={isWide ? "md:col-span-12 lg:col-span-7" : "md:col-span-12 lg:col-span-5"}
              >
                <Link href={`/projects/${project.slug}`} className="group relative block h-full overflow-hidden rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/30 transition-all duration-500 shadow-sm">
                  {/* Content Container */}
                  <div className="flex flex-col h-full">
                    {/* Project Info Overlay / Top Section */}
                    <div className="p-8 md:p-10 relative z-20 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                           <span className="px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-[0.6rem] font-bold tracking-wider uppercase">
                             {project.category}
                           </span>
                           <span className="font-mono text-[0.65rem] font-bold text-[var(--text-muted)] opacity-50">
                             {String(idx + 1).padStart(2, '0')}
                           </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                          {project.title}
                        </h2>
                        
                        <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Tech Stack Footer */}
                      <div className="mt-12 flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map(tech => {
                          const meta = TECH_META[tech];
                          return (
                            <span 
                              key={tech} 
                              className="px-2.5 py-1 border text-[0.6rem] font-bold rounded uppercase tracking-wider flex items-center gap-1.5 transition-colors bg-[var(--bg-primary)]/50"
                              style={{ 
                                color: meta?.color ?? 'var(--text-muted)',
                                borderColor: meta ? `${meta.color}33` : 'var(--border-primary)',
                              }}
                            >
                              {meta && <span style={{ backgroundColor: meta.color }} className="w-1 h-1 rounded-full" />}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image / Visual Background */}
                    <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                      {/* Placeholder for project thumbnail with a mesh-gradient fallback */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 via-transparent to-transparent" />
                      {project.thumbnail && (
                        <Image 
                          src={project.thumbnail} 
                          alt={project.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        />
                      )}
                      
                      {/* High-end glow effect on hover */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c0c0f] via-[#0c0c0f]/80 to-transparent" />
                    </div>
                  </div>

                  {/* Top line decoration */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Final CTA link */}
         <div className="mt-20 flex justify-center">
            <ScrollReveal delay={0.5}>
              <p className="text-[var(--text-muted)] text-sm font-medium">
                {t('projects.interested')} <Link href="/projects" className="text-[var(--accent-primary)] hover:text-[var(--text-primary)] border-b border-[var(--accent-primary)]/20 hover:border-[var(--text-primary)] transition-all ml-1">{t('projects.explore_link')}</Link>
              </p>
            </ScrollReveal>
         </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
