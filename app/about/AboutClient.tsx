'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import dynamic from 'next/dynamic';

const ExperienceTimeline = dynamic(() => import('@/components/sections/ExperienceTimeline'), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-[var(--bg-secondary)]" />
});
const SkillsBreakdown = dynamic(() => import('@/components/sections/SkillsBreakdown'), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-[var(--bg-secondary)]" />
});
const Lanyard = dynamic(() => import('@/components/ui/Lanyard'), {
  ssr: false,
  loading: () => <div className="h-[500px] animate-pulse bg-[var(--bg-secondary)] rounded-3xl" />
});

interface Value {
  icon?: string;
  title: string;
  description: string;
}

interface AboutClientProps {
  values: Value[];
}

export default function AboutClient({ values }: AboutClientProps) {
  const stats = useMemo(() => [
    { value: '3+', label: 'Years Exp.' },
    { value: '20+', label: 'Systems Built' },
    { value: '40%', label: 'Perf. Boost' },
    { value: '100%', label: 'Reliability' },
  ], []);

  const glanceDetails = useMemo(() => [
    { label: 'Role', value: 'Backend Engineer' },
    { label: 'Focus', value: 'Architecture · APIs' },
    { label: 'Stack', value: 'Node.js · TS · SQL' },
    { label: 'Location', value: 'Jakarta, ID 🇮🇩' },
  ], []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-32">

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[var(--accent-purple)]/5 blur-[120px] rounded-full" />

        </div>

        <div className="container-custom relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-[var(--accent-purple)]" />
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--accent-purple)]">
              The Architect / Identity
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end mb-24">
            <div className="lg:col-span-9">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight text-[var(--text-primary)] leading-[0.9]">
                Architecting <span className="text-[var(--text-muted)] font-light italic">Digital Foundations.</span>
              </h1>
            </div>
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[var(--text-secondary)] text-lg leading-relaxed opacity-80 border-l border-[var(--border-primary)] pl-6"
              >
                Focused on building resilient systems that empower modern experiences through performance and precision.
              </motion.p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-[var(--border-primary)]">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="group"
              >
                <span className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)] block mb-1">
                  {stat.value}
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-muted)] font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MY PROFILE & DETAILS ────────────────────────────── */}
      <section className="py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Lanyard Section */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group">
                {/* Decorative Background Elements */}
                <div className="absolute -inset-4 bg-gradient-to-b from-[var(--accent-purple)]/20 to-transparent blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                
                <div className="relative h-[600px] w-full rounded-[3rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm group-hover:border-[var(--accent-purple)]/50 transition-colors duration-500">
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                  
                  {/* Floating Info Badge */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-primary)] shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent-purple)] font-bold">Identity_Verified</p>
                    </div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">Interactive 3D Profile Card</p>
                  </div>
                </div>

                {/* Decorative Frame */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[var(--accent-purple)]/30 rounded-bl-[3rem] -z-10 group-hover:-bottom-8 group-hover:-left-8 transition-all duration-500" />
                <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[var(--accent-purple)]/30 rounded-tr-[3rem] -z-10 group-hover:-top-8 group-hover:-right-8 transition-all duration-500" />
              </div>
            </div>

            {/* Narrative Section */}
            <div className="lg:col-span-7 space-y-12 order-1 lg:order-2">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black tracking-tight uppercase italic text-[var(--text-primary)]">My Profile</h2>
                <div className="h-px flex-1 bg-[var(--border-primary)]" />
              </div>

              <div className="space-y-8 text-[var(--text-secondary)] text-xl leading-relaxed opacity-90 font-light">
                <p>
                  Hello! I&apos;m <span className="text-[var(--text-primary)] font-bold italic underline decoration-[var(--accent-purple)] underline-offset-8 decoration-2">Muhammad Danindra I</span>. 
                  My approach to software engineering is grounded in the belief that the strongest architectures are those that remain <span className="text-[var(--text-primary)] font-medium">invisible</span>.
                  I specialize in crafting the complex logic and data structures that drive high-performance applications.
                </p>
                <p>
                  With a deep focus on <span className="text-[var(--text-primary)] font-medium italic">scalability and resilience</span>, I bridge the gap between business requirements and technical implementation, ensuring every system is built for longevity.
                </p>
                
                {/* Quick Glance */}
                <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  {glanceDetails.map((item) => (
                    <div key={item.label} className="group border-b border-[var(--border-primary)] pb-4 hover:border-[var(--accent-purple)]/50 transition-colors">
                      <span className="text-[0.6rem] uppercase tracking-widest text-[var(--text-muted)] font-bold block mb-1 group-hover:text-[var(--accent-purple)] transition-colors">{item.label}</span>
                      <p className="text-lg font-bold text-[var(--text-primary)]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────────── */}
      <section className="py-40 bg-[var(--bg-secondary)]/30 border-y border-[var(--border-primary)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-[var(--accent-purple)] font-bold uppercase tracking-[0.4em] text-[0.65rem] block mb-6">Philosophy</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Engineering <br />Principles</h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed opacity-80">
                  My work is guided by a set of core values that prioritize code quality and system integrity.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-12">
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-primary)] hover:border-[var(--accent-purple)]/30 transition-all group"
                >
                  {val.icon && (
                    <div className="w-12 h-12 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                      {val.icon}
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-4 text-[var(--text-primary)] uppercase tracking-widest">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed opacity-80">
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS & TIMELINE ───────────────────────────────── */}
      <SkillsBreakdown />
      <ExperienceTimeline />

      {/* ── FOOTER CTA ─────────────────────────────────────── */}
      <section className="mt-40 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3.5rem] bg-[var(--bg-secondary)]/40 backdrop-blur-3xl border border-[var(--border-primary)] p-12 lg:p-24 overflow-hidden text-center shadow-2xl"
        >
          {/* Fluid Glass Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/5 via-transparent to-[var(--accent-violet)]/5 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl lg:text-7xl font-black text-[var(--text-primary)] mb-10 tracking-tight leading-tight px-4"
            >
              Ready to architect <br/>
              <span className="gradient-text italic font-medium inline-block pr-4">something great?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[var(--text-secondary)] text-lg mb-12 opacity-80 max-w-xl mx-auto font-medium"
            >
              Currently accepting new projects and consulting inquiries. Let&apos;s build the next generation of systems together.
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
                  className="px-12 py-5 bg-[var(--accent-purple)] text-white font-bold uppercase tracking-widest text-[0.7rem] rounded-full transition-all shadow-xl shadow-[var(--accent-purple)]/20 hover:shadow-[var(--accent-purple)]/40 block"
                >
                  Hire Me →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/projects"
                  className="px-12 py-5 bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:border-[var(--text-primary)] transition-all block"
                >
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

