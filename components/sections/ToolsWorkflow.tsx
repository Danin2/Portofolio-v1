'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import AccordionGallery from '@/components/ui/AccordionGallery';

// High quality visual representations for each project
const projectImages: Record<string, string> = {
  'ecommerce-rest-api': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'realtime-chat-app': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'task-management-api': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'microservices-blog': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'database-migration-tool': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
};

const ProjectPreview = () => {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  const galleryItems = projects.slice(0, 5).map(project => ({
    image: projectImages[project.slug] || 'https://picsum.photos/id/1015/900/1200',
    label: project.title,
    link: `/projects/${project.slug}`,
    alt: project.title,
  }));

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-8 md:mb-14">
          <div className="max-w-2xl">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t('projects.section_title')}{' '}
              <span className="text-[var(--text-muted)] font-light italic">
                {t('projects.section_title_italic')}
              </span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-sm opacity-80 border-l border-[var(--border-primary)] pl-4 md:pl-8">
            {t('projects.section_desc')}
          </p>
        </div>

        {/* Accordion Gallery Component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mb-10 md:mb-16"
        >
          <AccordionGallery
            items={galleryItems}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            height={480}
            gap={12}
            radius={20}
            accentColor="var(--accent-primary)"
            overlayColor="#0a0a0f"
            textColor="#ffffff"
          />
        </motion.div>

        {/* Archive CTA */}
        <div className="flex justify-center items-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-primary)] hover:border-[var(--accent-primary)] rounded-full text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300 bg-[var(--bg-secondary)]/50 backdrop-blur-sm"
          >
            {t('projects.all_projects')}
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectPreview;
