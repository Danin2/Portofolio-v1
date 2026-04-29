'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedProjects, TECH_META } from '@/lib/data/projects';
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/ui/ScrollReveal';

const FeaturedProjects = () => {
  const featured = getFeaturedProjects().slice(0, 3); // Top 3 featured projects

  return (
    <section id="work" className="relative bg-[#0c0c0f] py-24 sm:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-[#5227FF] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-[#B19EEF] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="label-uppercase mb-4">Selected Work</p>
            </ScrollReveal>
            <RevealText
              as="h2"
              delay={0.1}
              className="font-bold tracking-[-0.03em] leading-none text-[#f5f5f7] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' } as React.CSSProperties}
            >
              Featured <span className="gradient-text">Projects</span>
            </RevealText>
            <ScrollReveal delay={0.2}>
              <p className="text-[#9898a8] text-base md:text-lg leading-relaxed max-w-lg">
                A showcase of high-performance backend systems, 
                distributed architectures, and robust API solutions.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.3}>
            <Link 
              href="/projects" 
              className="group inline-flex items-center gap-2 px-6 py-3 border border-[rgba(177,158,239,0.2)] hover:border-[rgba(177,158,239,0.5)] rounded-full text-xs font-bold uppercase tracking-widest text-[#B19EEF] hover:text-white transition-all duration-300"
            >
              All Projects
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
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
                <Link href={`/projects/${project.slug}`} className="group relative block h-full overflow-hidden rounded-3xl bg-[#111116] border border-[rgba(82,39,255,0.1)] hover:border-[rgba(82,39,255,0.3)] transition-all duration-500">
                  {/* Content Container */}
                  <div className="flex flex-col h-full">
                    {/* Project Info Overlay / Top Section */}
                    <div className="p-8 md:p-10 relative z-20 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                           <span className="px-3 py-1 rounded-full bg-[rgba(82,39,255,0.1)] border border-[rgba(82,39,255,0.2)] text-[#B19EEF] text-[0.6rem] font-bold tracking-wider uppercase">
                             {project.category}
                           </span>
                           <span className="font-mono text-[0.65rem] font-bold text-[#55556a]">
                             {String(idx + 1).padStart(2, '0')}
                           </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#B19EEF] transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-[#9898a8] text-sm md:text-base leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
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
                              className="px-2.5 py-1 border text-[0.6rem] font-bold rounded uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                              style={{ 
                                color: meta?.color ?? '#55556a',
                                borderColor: meta ? `${meta.color}44` : 'rgba(255,255,255,0.05)',
                                background: meta ? meta.bg : '#1c1c24'
                              }}
                            >
                              {meta && <span className="opacity-80">{meta.icon}</span>}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image / Visual Background */}
                    <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                      {/* Placeholder for project thumbnail with a mesh-gradient fallback */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/20 via-transparent to-transparent" />
                      {project.thumbnail && (
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        />
                      )}
                      
                      {/* High-end glow effect on hover */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c0c0f] via-[#0c0c0f]/80 to-transparent" />
                    </div>
                  </div>

                  {/* Top line decoration */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(82,39,255,0.3)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Final CTA link */}
        <div className="mt-20 flex justify-center">
           <ScrollReveal delay={0.5}>
             <p className="text-[#55556a] text-sm font-medium">
               Interested in more? <Link href="/projects" className="text-[#B19EEF] hover:text-white border-b border-[#B19EEF]/20 hover:border-white transition-all ml-1">Explore the full archive</Link>
             </p>
           </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
