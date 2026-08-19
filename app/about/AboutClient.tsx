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
const Profile3DCard = dynamic(() => import('@/components/ui/Profile3DCard'), {
  ssr: false,
  loading: () => <div className="h-[580px] animate-pulse bg-[var(--bg-secondary)] rounded-[2.8rem]" />
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
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-20 md:pb-32">
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden md:block absolute top-0 left-0 w-[40%] h-[40%] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full" />
        </div>
        <div className="container-custom relative z-10">

          <div className="max-w-5xl space-y-4">
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
        </div>
      </section>

      {/* ── MY PROFILE & DETAILS ────────────────────────────── */}
      <section className="pt-8 pb-20 md:pt-12 md:pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <Profile3DCard />
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
                    { label: 'Experience', value: '3+ Years' },
                    { label: 'System Built', value: '20+ Systems' },
                    { label: 'Specialization', value: 'Frontend Development & AI Enthusiast' },
                    { label: 'Deployed', value: '8+ Projects' },
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
      <section className="pt-10 pb-16 border-b border-[var(--border-primary)]">
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

      <FooterCTA className="!mt-6 md:!mt-10" />
    </div>
  );
}
