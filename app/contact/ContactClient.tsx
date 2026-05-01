'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import RevealText from '@/components/ui/RevealText';
import LightRays from '@/components/ui/LightRays';
import ScrollReveal from '@/components/ui/ScrollReveal';

// ─── Icon Components ──────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── Contact Info Items ───────────────────────────────────────────────────────
const contactInfo = [
  {
    label: 'Primary Email',
    value: 'danindra@danindra.dev',
    icon: <MailIcon />,
    href: 'mailto:danindra@danindra.dev',
  },
  {
    label: 'Connect',
    value: 'linkedin.com/in/danindra',
    icon: <LinkedInIcon />,
    href: 'https://linkedin.com/in/danindra',
  },
  {
    label: 'Location',
    value: 'Jakarta, Indonesia 🇮🇩',
    icon: <MapPinIcon />,
    href: undefined,
  },
];

// ─── Availability Status Card ─────────────────────────────────────────────────
function AvailabilityCard() {
  return (
    <div className="rounded-2xl p-6 border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 backdrop-blur-sm shadow-sm">
      {/* Status Row */}
      <div className="flex items-center gap-3 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-primary)]" />
        </span>
        <span className="text-sm font-bold text-[var(--text-primary)]">Available for projects</span>
      </div>

      {/* Type tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['Backend · API', 'System Architecture', 'Consulting'].map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] bg-[var(--accent-primary)]/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Response time */}
      <p className="text-[0.7rem] text-[var(--text-muted)] flex items-center gap-2">
        <span className="text-[var(--accent-primary)]">⚡</span>
        Usually responds within <span className="font-bold text-[var(--text-secondary)]">24 hours</span>
      </p>

      {/* Availability Badges */}
      <div className="flex gap-2 mt-4">
        {['Open to Freelance', 'Open to Full-time'].map(badge => (
          <span
            key={badge}
            className="px-2.5 py-1 rounded-full text-[0.55rem] font-black uppercase tracking-widest bg-[var(--bg-tertiary)]/50 text-[var(--text-muted)] border border-[var(--border-primary)]"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── What I Offer ─────────────────────────────────────────────────────────────
const offerings = [
  '🏗️  Scalable API & microservice architecture',
  '🔒  Security-first backend engineering',
  '⚡  Performance tuning & query optimization',
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactClient() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden flex flex-col items-center justify-center pt-32 pb-20">
      
      {/* ── Cursor Spotlight ── */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 z-[2] opacity-[0.12] blur-[140px]"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        }}
      />

      {/* ── Orb decorations ── */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.05] blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05] blur-[100px]"
        style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)' }} />

      {/* ── Background Effects ── */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="bottom-right"
          raysColor="rgba(108, 142, 191, 0.4)"
          raysSpeed={0.5}
          lightSpread={1.5}
        />
      </div>

      <div className="container-custom relative z-10 w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">
          
          {/* ──────────────────── LEFT COLUMN (40%) ──────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-px bg-[var(--accent-primary)]" />
                  <p className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)]">Direct Channel</p>
                </div>
              </ScrollReveal>
              <RevealText
                as="h1"
                delay={0.1}
                className="font-black tracking-[-0.05em] leading-[0.9] text-[var(--text-primary)] mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' } as React.CSSProperties}
              >
                Let's architect <br />
                <span className="gradient-text italic font-medium">the future.</span>
              </RevealText>
              <ScrollReveal delay={0.4}>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed opacity-80 font-medium">
                  Have a complex backend challenge or a high-scale system in mind? 
                  I'm ready to help you build resilient foundations.
                </p>
              </ScrollReveal>
            </div>

            {/* Availability Status Card */}
            <ScrollReveal delay={0.45}>
              <AvailabilityCard />
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, idx) => {
                const content = (
                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl border border-[var(--border-primary)] flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)]/50 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-500 shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.25em] text-[var(--text-muted)] font-black mb-1">{item.label}</p>
                      <p className="text-[var(--text-primary)] font-bold text-base group-hover:text-[var(--accent-primary)] transition-colors duration-300">{item.value}</p>
                    </div>
                  </div>
                );

                return (
                  <ScrollReveal key={idx} delay={0.5 + idx * 0.1} xOffset={-20}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : content}
                  </ScrollReveal>
                );
              })}
            </div>

            {/* What I Offer */}
            <ScrollReveal delay={0.7}>
              <div className="space-y-4 pt-4">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Core Expertise</p>
                <div className="space-y-3">
                  {offerings.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-[var(--text-secondary)] font-medium">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ──────────────────── RIGHT COLUMN (60%) — Form ──────────────────── */}
          <ScrollReveal delay={0.6} xOffset={30} className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/10 rounded-3xl blur-2xl opacity-40 pointer-events-none" />
              
              {/* Terminal window wrapper */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] shadow-2xl bg-[var(--bg-secondary)]/60 backdrop-blur-3xl">
                
                {/* Terminal window title bar */}
                <div className="flex items-center gap-2 px-6 py-4 bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)]">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                  </div>
                  <span className="mx-auto text-[0.65rem] font-mono text-[var(--text-muted)] font-bold tracking-widest uppercase">
                    danindra@system ~ secure-channel
                  </span>
                </div>

                {/* Form content */}
                <div className="p-10 lg:p-14">
                  <AnimatePresence mode="wait">
                    {formStatus === 'success' ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-16"
                      >
                        <div className="w-20 h-20 bg-[var(--accent-primary)]/10 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 border border-[var(--accent-primary)]/30 shadow-inner">
                          ✓
                        </div>
                        <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 tracking-tight">Packet Delivered</h3>
                        <p className="text-[var(--text-secondary)] mb-10 font-medium">System received your transmission. I will respond via secure channel shortly.</p>
                        <button 
                          onClick={() => setFormStatus('idle')}
                          className="px-8 py-3 rounded-full border border-[var(--border-primary)] text-[var(--accent-primary)] font-black uppercase tracking-[0.2em] text-[0.6rem] hover:bg-[var(--accent-primary)]/10 transition-all"
                        >
                          Send another packet
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit} 
                        className="space-y-8"
                      >
                        {[
                          { label: 'Identification', type: 'text', placeholder: 'Your Name', field: 'name' },
                          { label: 'Return Path', type: 'email', placeholder: 'Email Address', field: 'email' },
                        ].map(({ label, type, placeholder, field }) => (
                          <div key={field} className="space-y-3">
                            <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--text-muted)] font-black pl-1">
                              <span className="text-[var(--accent-primary)] font-mono">&gt;</span>
                              {label}
                            </label>
                            <input 
                              required
                              type={type} 
                              placeholder={placeholder}
                              className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border-primary)] rounded-2xl px-6 py-5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--accent-primary)]/60 focus:shadow-[0_0_0_4px_var(--accent-primary)]/5 transition-all placeholder:text-[var(--text-muted)]/50 text-sm"
                            />
                          </div>
                        ))}

                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--text-muted)] font-black pl-1">
                            <span className="text-[var(--accent-primary)] font-mono">&gt;</span>
                            System Requirements
                          </label>
                          <textarea 
                            required
                            rows={5}
                            placeholder="Describe your architectural needs..."
                            className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border-primary)] rounded-2xl px-6 py-5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--accent-primary)]/60 focus:shadow-[0_0_0_4px_var(--accent-primary)]/5 transition-all placeholder:text-[var(--text-muted)]/50 resize-none text-sm"
                          />
                        </div>

                        <button 
                          disabled={formStatus === 'sending'}
                          type="submit"
                          className="w-full py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black uppercase tracking-[0.3em] text-[0.7rem] rounded-2xl hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 shadow-2xl disabled:opacity-50 group overflow-hidden relative"
                        >
                          <span className="relative z-10">
                            {formStatus === 'sending' ? 'Transmitting Data...' : 'Execute Transmission'}
                          </span>
                          {formStatus === 'sending' && (
                            <span className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-1.5">
                              {[0, 0.15, 0.3].map((d, i) => (
                                <span key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                              ))}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

