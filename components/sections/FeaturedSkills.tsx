'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import {
  Server,
  Database,
  Cpu,
  Shield,
  Zap,
  CheckCircle,
  Terminal,
  Box,
  Layers
} from 'lucide-react';

type WithClassName = { className?: string };

const SKILL_ICONS = [
  <Layers className="w-10 h-10" />,
  <Database className="w-8 h-8" />,
  <Terminal className="w-8 h-8 text-[var(--accent-primary)]" />,
  <Server className="w-8 h-8" />,
  <Shield className="w-8 h-8" />,
  <Cpu className="w-8 h-8" />,
];

const SKILL_COLORS = [
  "bg-[var(--accent-primary)]",
  "bg-[var(--accent-primary)]",
  "bg-[var(--accent-primary)]",
  "bg-[var(--accent-primary)]",
  "bg-[var(--accent-primary)]",
  "bg-[var(--accent-primary)]",
];

const SKILL_SRCS = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2000&auto=format&fit=crop",
];

const SKILL_TECHS = [
  ["Microservices", "Docker", "K8s"],
  ["PostgreSQL", "Redis", "MongoDB"],
  ["Vite", "ESBuild", "Vitest"],
  ["Node.js", "Express", "NestJS"],
  ["JWT", "OAuth2", "RBAC"],
  ["Vitest", "Playwright", "CI/CD"],
];

function useSkills(t: (key: string) => any) {
  const cards = t('skills.cards') as any[];
  if (!Array.isArray(cards)) return [];

  return cards.map((card, i) => ({
    title: card.title,
    description: card.description,
    techs: SKILL_TECHS[i],
    icon: SKILL_ICONS[i],
    color: SKILL_COLORS[i],
    src: SKILL_SRCS[i],
    content: () => {
      if (i === 0) {
        // Architecture – 2 column layout
        return (
          <div className="space-y-6">
            <p className="text-lg">{card.content_intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                <h4 className="font-bold mb-2 text-[var(--accent-primary)]">{card.infra_title}</h4>
                <ul className="text-sm space-y-1 opacity-80">
                  {card.infra_items?.map((item: string) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                <h4 className="font-bold mb-2 text-[var(--text-muted)]">{card.patterns_title}</h4>
                <ul className="text-sm space-y-1 opacity-80">
                  {card.patterns_items?.map((item: string) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );
      }
      if (i === 2) {
        // Modern Tooling – ecosystem box
        return (
          <div className="space-y-4">
            <p>{card.content_intro}</p>
            <div className="p-4 rounded-xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
              <h4 className="flex items-center gap-2 font-bold text-[var(--accent-primary)] mb-3">
                <Zap className="w-4 h-4" /> {card.ecosystem_title}
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-sm opacity-90">
                {card.ecosystem_items?.map((item: string) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
        );
      }
      // Default list layout
      return (
        <div className="space-y-4">
          <p>{card.content_intro}</p>
          <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
            {card.items?.map((item: string) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      );
    },
  }));
}

const FeaturedSkills = () => {
  const { t } = useLanguage();
  const skills = useSkills(t);
  const [active, setActive] = useState<(typeof skills)[number] | boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      // Prevent Lenis from scrolling the background
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = "auto";
      // Resume Lenis scrolling
      if ((window as any).lenis) (window as any).lenis.start();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Ensure Lenis is restarted if component unmounts
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [active]);

  useOutsideClick(modalRef, () => setActive(null));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative bg-[var(--section-bg)] py-12 md:py-20 lg:py-32 px-4 md:px-12 lg:px-20 overflow-hidden border-t border-[var(--border-primary)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-purple)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4 md:mb-6"></div>
          </ScrollReveal>
          <RevealText
            as="h2"
            delay={0.1}
            className="font-bold tracking-[-0.03em] leading-tight text-[var(--text-primary)] mb-4 md:mb-6"
            style={{ fontSize: 'clamp(1.9rem, 5vw, 4.5rem)' } as React.CSSProperties}
          >
            {t('skills.section_title')} <span className="gradient-text">{t('skills.section_title_gradient')}</span>
          </RevealText>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--text-secondary)] max-w-2xl text-base md:text-xl leading-relaxed opacity-80">
              {t('skills.section_desc')}
            </p>
          </ScrollReveal>
        </div>

        {/* Modal Content - Rendered via Portal to escape parent transforms */}
        {mounted && createPortal(
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 md:p-10 pointer-events-none">
                {/* Backdrop overlay inside portal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActive(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer pointer-events-auto"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  ref={modalRef}
                  className="w-full max-w-[700px] max-h-[85vh] flex flex-col bg-[var(--card-bg)] border border-[var(--border-primary)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative pointer-events-auto z-10"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`modal-title-${id}`}
                  aria-describedby={`modal-desc-${id}`}
                >
                  <div className="absolute top-6 right-6 z-20">
                    <button
                      className="flex items-center justify-center bg-[var(--bg-tertiary)]/80 backdrop-blur-md rounded-full h-10 w-10 border border-[var(--border-primary)] hover:scale-110 transition-transform"
                      onClick={() => setActive(null)}
                      aria-label="Close modal"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div
                    className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-10 lg:p-14 overscroll-contain touch-pan-y"
                    data-lenis-prevent
                  >
                    <header className="mb-6 md:mb-10">
                      <div
                        className={`inline-flex p-3 md:p-4 rounded-2xl bg-[var(--accent-primary)] text-[var(--bg-primary)] mb-4 md:mb-6 shadow-lg`}
                      >
                        {active.icon}
                      </div>
                      <h3
                        id={`modal-title-${id}`}
                        className="font-bold text-[var(--text-primary)] text-2xl md:text-3xl lg:text-4xl mb-3"
                      >
                        {active.title}
                      </h3>
                      <p
                        id={`modal-desc-${id}`}
                        className="text-[var(--text-secondary)] text-base md:text-lg opacity-70"
                      >
                        {active.description}
                      </p>
                    </header>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[var(--text-secondary)]"
                    >
                      {typeof active.content === "function" ? active.content() : active.content}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}

        {/* Bento-Inspired Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
          {skills.map((card, idx) => {
            // Define responsive column spans for a "bento" feel
            const colSpan = idx === 0 ? "lg:col-span-8 md:col-span-6" :
              idx === 1 ? "lg:col-span-4 md:col-span-3" :
                idx === 2 ? "lg:col-span-4 md:col-span-3" :
                  idx === 3 ? "lg:col-span-4 md:col-span-3" :
                    idx === 4 ? "lg:col-span-4 md:col-span-3" :
                      "lg:col-span-12 md:col-span-6";
            const cardInner = (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className={`group h-full relative p-5 md:p-8 lg:p-10 flex flex-col border border-[var(--border-primary)] bg-[var(--bg-secondary)] dark:bg-[var(--card-bg)] rounded-[1.5rem] md:rounded-[2rem] cursor-pointer shadow-sm overflow-hidden`}
                style={{ transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)' }}
                whileHover={{ y: -4, boxShadow: '0 20px 60px -12px rgba(0,0,0,0.35)' }}
              >
                {/* Shimmer top-line on hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-[var(--accent-primary)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Subtle inner glow */}
                <div className="absolute top-0 left-0 w-full h-24 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem] md:rounded-[2rem]" />

                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  {React.cloneElement(card.icon as React.ReactElement<WithClassName>, { className: 'w-12 h-12' })}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <header className="mb-auto">
                    <motion.div
                      layoutId={`icon-${card.title}-${id}`}
                      className={`inline-flex p-3 md:p-4 rounded-2xl bg-[var(--accent-primary)] text-white mb-5 md:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl`}
                    >
                      {React.cloneElement(card.icon as React.ReactElement<WithClassName>, { className: 'w-8 h-8' })}
                    </motion.div>
                    <h3
                      className="font-bold text-[var(--text-primary)] text-2xl group-hover:text-[var(--accent-purple)] transition-colors mb-2"
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-[var(--text-secondary)] text-sm opacity-80 leading-relaxed max-w-xs"
                    >
                      {card.description}
                    </p>

                    {/* Concrete Technologies */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {card.techs?.map(tech => (
                        <span key={tech} className="text-[0.55rem] font-black uppercase tracking-widest text-[var(--accent-purple)] bg-[var(--accent-purple)]/5 px-2 py-1 rounded-md border border-[var(--accent-purple)]/10 group-hover:border-[var(--accent-purple)]/30 transition-all">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </header>

                  <footer className="mt-6 md:mt-10 flex items-center justify-between">
                    <div className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] group-hover:text-[var(--accent-violet)] transition-colors">
                      {t('skills.learn_more')}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-all duration-300">
                      →
                    </div>
                  </footer>
                </div>
              </motion.div>
            );

            return (
              <div key={card.title} className={`${colSpan}`}>
                {cardInner}
              </div>
            );
          })}

        </div>
      </div>
    </section >
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-[var(--text-primary)]"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export default FeaturedSkills;