'use client';

import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';
import dynamic from 'next/dynamic';
import * as LucideIcons from 'lucide-react';
import FooterCTA from '@/components/sections/FooterCTA';
import { useLanguage } from '@/context/LanguageContext';

const ExperienceTimeline = dynamic(() => import('@/components/sections/ExperienceTimeline'), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-[var(--bg-secondary)] rounded-3xl" />
});
const SkillsBreakdown = dynamic(() => import('@/components/sections/SkillsBreakdown'), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-[var(--bg-secondary)] rounded-3xl" />
});
const Lanyard = dynamic(() => import('@/components/ui/Lanyard'), {
  ssr: false,
  loading: () => <div className="h-[500px] animate-pulse bg-[var(--bg-secondary)] rounded-[3rem]" />
});

interface Value {
  icon?: string;
  title: string;
  description: string;
}

interface AboutClientProps {
  values: Value[];
}

function getLucideIcon(name?: string) {
  if (!name) return null;
  const IconComponent = (LucideIcons as any)[name];
  return (IconComponent as React.ElementType) || null;
}

export default function AboutClient({ values }: AboutClientProps) {
  const { t } = useLanguage();
  const stats = useMemo(() => [
    { value: '3+', label: t('about.stats.0') },
    { value: '20+', label: t('about.stats.1') },
    { value: '40%', label: t('about.stats.2') },
    { value: '100%', label: t('about.stats.3') },
  ], [t]);

  const glanceDetails = useMemo(() => [
    { label: 'Role', value: t('about.role') },
    { label: 'Focus', value: 'Architecture · APIs' },
    { label: 'Stack', value: 'Node.js · TS · SQL' },
    { label: 'Location', value: t('about.location') },
  ], [t]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-20 md:pb-32">
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full" />
        </div>
        <div className="container-custom relative z-10">

          <div className="max-w-5xl mb-20 space-y-9">
            <h1
              className="font-black tracking-tight text-[var(--text-primary)] leading-[0.95] overflow-wrap-break-word"
              style={{ fontSize: 'clamp(1.75rem, 8vw, 5rem)', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' } as React.CSSProperties}
            >
              <span className="block">{t('hero.title_part1')}</span>
              <span className="text-[var(--text-muted)] font-light italic block mt-1 md:mt-2">{t('hero.title_part2')}</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[var(--text-secondary)] text-base sm:text-lg md:text-xl leading-relaxed opacity-90 border-l-2 border-[var(--accent-primary)] pl-6 max-w-2xl"
            >
              {t('hero.desc')}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-[var(--border-primary)]">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <motion.span
                  className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)] block mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * idx + 0.2 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)] font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MY PROFILE & DETAILS ────────────────────────────── */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-b from-[var(--accent-primary)]/20 to-transparent blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="relative h-[450px] md:h-[600px] w-full rounded-[3rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 backdrop-blur-sm group-hover:border-[var(--accent-primary)]/50 transition-colors duration-500">
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-12 order-1 lg:order-2">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic text-[var(--text-primary)]">{t('about.profile_title')}</h2>
                <div className="h-px flex-1 bg-[var(--border-primary)]" />
              </div>

              <div className="space-y-8 text-[var(--text-secondary)] text-xl leading-relaxed opacity-90 font-light">
                <p>
                  {t('about.narrative')}
                </p>
                <div className="pt-12 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Language_Pref', value: 'TypeScript / Go' },
                    { label: 'Architecture', value: 'Microservices / Event-Driven' },
                    { label: 'Database_Focus', value: 'PostgreSQL / Redis' },
                    { label: 'DevOps_Stack', value: 'Docker / K8s / CI-CD' },
                  ].map((spec) => (
                    <div key={spec.label} className="p-5 rounded-2xl bg-[var(--bg-tertiary)]/40 border border-[var(--border-primary)] group hover:border-[var(--accent-primary)]/40 transition-colors">
                      <span className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)] block mb-2">{spec.label}</span>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRENTLY LEARNING ─────────────────────────────── */}
      <section className="py-24 border-b border-[var(--border-primary)]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-12 tracking-tight">{t('about.learning_title')} <span className="text-[var(--text-muted)] font-light italic">{t('about.learning_italic')}</span></h2>
            <div className="grid md:grid-cols-2 gap-10">
              {(() => {
                const items = t('about.learning_items') as { title: string; desc: string }[];
                if (!Array.isArray(items)) return null;
                const progressValues = [45, 70];
                return items.map((item, i) => (
                  <div key={i} className="p-10 rounded-[2.5rem] bg-[var(--bg-secondary)]/30 border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/40 transition-all group">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--accent-primary)] transition-colors">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] opacity-80 mb-8 leading-relaxed">{item.desc}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
                        <span>{t('about.progress_label')}</span>
                        <span>{progressValues[i]}%</span>
                      </div>
                      <div className="h-1 w-full bg-[var(--border-primary)] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${progressValues[i]}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-[var(--accent-primary)]" />
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS & TIMELINE ───────────────────────────────── */}
      <SkillsBreakdown />
      <ExperienceTimeline />

      <FooterCTA />
    </div>
  );
}
