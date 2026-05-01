'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useOutsideClick } from "@/hooks/use-outside-click";
import RevealText from '@/components/ui/RevealText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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

const skills = [
  {
    title: "Project Architecture",
    description: "Scalable Systems & Infrastructure",
    techs: ["Microservices", "Docker", "K8s"],
    icon: <Layers className="w-10 h-10" />,
    color: "from-[#8BA9D6] to-[#475569]", 
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    ctaText: "Full Specs",
    ctaLink: "#",
    content: () => (
      <div className="space-y-6">
        <p className="text-lg">
          I architect distributed systems that stand the test of time.
          Leveraging microservices, event-driven patterns, and containerization,
          I build environments that are resilient and easy to scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
            <h4 className="font-bold mb-2 text-[var(--accent-primary)]">Infrastructure</h4>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• Docker & K8s Orchestration</li>
              <li>• Message Brokers (RabbitMQ/Kafka)</li>
              <li>• gRPC & Protocol Buffers</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
            <h4 className="font-bold mb-2 text-[var(--text-muted)]">Patterns</h4>
            <ul className="text-sm space-y-1 opacity-80">
              <li>• Domain-Driven Design (DDD)</li>
              <li>• Event Sourcing / CQRS</li>
              <li>• Layered Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Database Engineering",
    description: "High-Performance Data Storage",
    techs: ["PostgreSQL", "Redis", "MongoDB"],
    icon: <Database className="w-8 h-8" />,
    color: "from-[#475569] to-[#2D3748]",
    src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop",
    content: () => (
      <div className="space-y-4">
        <p>
          From ER modeling to complex query optimization, I ensure data integrity
          and speed across both SQL and NoSQL environments.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li>PostgreSQL schema design & optimization</li>
          <li>NoSQL modeling with MongoDB & Redis</li>
          <li>Distributed caching strategies</li>
          <li>Query profiling & indexing tuning</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Modern Tooling",
    description: "Lightning Fast Workflow",
    techs: ["Vite", "ESBuild", "Vitest"],
    icon: <Terminal className="w-8 h-8 text-[#8BA9D6]" />,
    color: "from-[#8BA9D6] to-[#2D3748]",
    src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000&auto=format&fit=crop",
    content: () => (
      <div className="space-y-4">
        <p>
          I leverage the latest ecosystem improvements to ensure "Lightning Fast"
          development cycles and optimized production bundles.
        </p>
        <div className="p-4 rounded-xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
          <h4 className="flex items-center gap-2 font-bold text-[var(--accent-primary)] mb-3">
            <Zap className="w-4 h-4" /> The Modern Ecosystem
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-sm opacity-90">
            <li>• Vite-powered dev server</li>
            <li>• Vitest for unit testing</li>
            <li>• Rapid HMR workflows</li>
            <li>• Rollup/ESBuild optimization</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Backend API",
    description: "Type-Safe Robust Foundation",
    techs: ["Node.js", "Express", "NestJS"],
    icon: <Server className="w-8 h-8" />,
    color: "from-[#2D3748] to-[#8BA9D6]",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2000&auto=format&fit=crop",
    content: () => (
      <div className="space-y-4">
        <p>
          Building secure, well-documented, and high-performance APIs
          using modern Node.js and TypeScript frameworks.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li>Node.js / Express / NestJS</li>
          <li>Strict TypeScript implementation</li>
          <li>Zod validation & OpenAPI documentation</li>
          <li>Advanced Middleware & Security layers</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Security & Auth",
    description: "Identity & Data Hardening",
    techs: ["JWT", "OAuth2", "RBAC"],
    icon: <Shield className="w-8 h-8" />,
    color: "from-[#8BA9D6] to-[#1A202C]",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    content: () => (
      <div className="space-y-4">
        <p>
          Bulletproof identity management and data protection following
          OWASP standards and modern security protocols.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li>JWT with refresh token rotation</li>
          <li>OAuth2 & OIDC integrations</li>
          <li>RBAC & ACL implementation</li>
          <li>End-to-end encryption / Hashing</li>
        </ul>
      </div>
    ),
  },
  {
    title: "QA & Testing",
    description: "Stability & Zero-Regression",
    techs: ["Vitest", "Playwright", "CI/CD"],
    icon: <Cpu className="w-8 h-8" />,
    color: "from-[#1A202C] to-[#8BA9D6]",
    src: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2000&auto=format&fit=crop",
    content: () => (
      <div className="space-y-4">
        <p>
          Maintaining code health through automated test suites and
          continuous integration pipelines.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li>Unit & Integration testing (Vitest)</li>
          <li>E2E scenarios (Playwright)</li>
          <li>CI/CD pipeline automation</li>
          <li>Coverage monitoring & Reporting</li>
        </ul>
      </div>
    ),
  },
];

const FeaturedSkills = () => {
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
      className={`relative bg-[var(--section-bg)] py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[var(--border-primary)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent-purple)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent-blue)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[var(--accent-purple)]" />
              <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-[var(--accent-purple)]">
                Technical Ecosystem
              </p>
            </div>
          </ScrollReveal>
          <RevealText
            as="h2"
            delay={0.1}
            className="font-bold tracking-[-0.03em] leading-tight text-[var(--text-primary)] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' } as React.CSSProperties}
          >
            Engineering <span className="gradient-text">Proficiency</span>
          </RevealText>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--text-secondary)] max-w-2xl text-lg md:text-xl leading-relaxed opacity-80">
              Building the future with modern tools and robust architectures.
              My stack is focused on speed, safety, and scalability.
            </p>
          </ScrollReveal>
        </div>

        {/* Backdrop Overlay */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-black/60 h-full w-full z-50 backdrop-blur-md cursor-pointer"
            />
          )}
        </AnimatePresence>

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
                  layoutId={`card-${active.title}-${id}`}
                  ref={modalRef}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full max-w-[700px] h-full max-h-[85vh] md:max-h-[90vh] flex flex-col bg-[var(--card-bg)] border border-[var(--border-primary)] rounded-[2.5rem] overflow-hidden shadow-2xl relative pointer-events-auto"
                >
                  <div className="absolute top-6 right-6 z-20">
                    <motion.button
                      className="flex items-center justify-center bg-[var(--bg-tertiary)]/80 backdrop-blur-md rounded-full h-10 w-10 border border-[var(--border-primary)] hover:scale-110 transition-transform"
                      onClick={() => setActive(null)}
                    >
                      <CloseIcon />
                    </motion.button>
                  </div>

                  <div
                    className="flex-1 min-h-0 h-full overflow-y-auto custom-scrollbar p-10 md:p-14 overscroll-contain touch-pan-y"
                    data-lenis-prevent
                  >
                    <header className="mb-10">
                      <motion.div
                        layoutId={`icon-${active.title}-${id}`}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${active.color} text-white mb-6 shadow-lg`}
                      >
                        {active.icon}
                      </motion.div>
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-[var(--text-primary)] text-3xl md:text-4xl mb-3"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.title}-${id}`}
                        className="text-[var(--text-secondary)] text-lg opacity-70"
                      >
                        {active.description}
                      </motion.p>
                    </header>

                    <motion.div
                      layout
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
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {skills.map((card, idx) => {
            // Define responsive column spans for a "bento" feel
            const colSpan = idx === 0 ? "lg:col-span-8 md:col-span-6" :
              idx === 1 ? "lg:col-span-4 md:col-span-3" :
                idx === 2 ? "lg:col-span-4 md:col-span-3" :
                  idx === 3 ? "lg:col-span-4 md:col-span-3" :
                    idx === 4 ? "lg:col-span-4 md:col-span-3" :
                      "lg:col-span-12 md:col-span-6";
            return (
              <Tilt
                key={card.title}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                scale={1}
                transitionSpeed={1000}
                className={`${colSpan}`}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="white"
                glarePosition="all"
                glareBorderRadius="2rem"
                tiltEnable={typeof window !== 'undefined' && window.innerWidth > 768} // Disable on mobile
              >
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  onClick={() => setActive(card)}
                  className={`group h-full relative p-8 md:p-10 flex flex-col border border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.03)] backdrop-blur-[10px] rounded-[2rem] cursor-pointer transition-all duration-500 hover:border-[var(--accent-purple)]/50 shadow-sm hover:shadow-2xl hover:-translate-y-1`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Visual Accent */}
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                    {React.cloneElement(card.icon as React.ReactElement<WithClassName>, { className: 'w-12 h-12' })}
                  </div>

                  <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transform: 'translateZ(30px)' }}>
                    <header className="mb-auto">
                      <motion.div
                        layoutId={`icon-${card.title}-${id}`}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.color} text-white mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl`}
                      >
                        {React.cloneElement(card.icon as React.ReactElement<WithClassName>, { className: 'w-8 h-8' })}
                      </motion.div>
                      <motion.h3
                        layoutId={`title-${card.title}-${id}`}
                        className="font-bold text-[var(--text-primary)] text-2xl group-hover:text-[var(--accent-purple)] transition-colors mb-2"
                      >
                        {card.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${card.title}-${id}`}
                        className="text-[var(--text-secondary)] text-sm opacity-60 leading-relaxed max-w-xs"
                      >
                        {card.description}
                      </motion.p>
                      
                      {/* Concrete Technologies (Task 4) */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {card.techs?.map(tech => (
                          <span key={tech} className="text-[0.55rem] font-black uppercase tracking-widest text-[var(--accent-purple)] bg-[var(--accent-purple)]/5 px-2 py-1 rounded-md border border-[var(--accent-purple)]/10 group-hover:border-[var(--accent-purple)]/30 transition-all">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </header>

                    <footer className="mt-10 flex items-center justify-between">
                      <div className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] group-hover:text-[var(--accent-violet)] transition-colors">
                        Learn More
                      </div>
                      <div className="w-8 h-8 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-muted)] group-hover:bg-[var(--accent-purple)] group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </footer>
                  </div>
                </motion.div>
              </Tilt>
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
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export default FeaturedSkills;