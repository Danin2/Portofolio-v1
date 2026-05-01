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
    <div className="rounded-2xl p-6 border border-[rgba(0,212,170,0.2)] bg-[rgba(0,212,170,0.04)] shadow-sm">
      {/* Status Row */}
      <div className="flex items-center gap-3 mb-4">
        <span className="availability-dot" />
        <span className="text-sm font-bold text-[var(--text-primary)]">Available for projects</span>
      </div>

      {/* Type tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['Backend · API', 'System Architecture', 'Consulting'].map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest border border-[rgba(0,212,170,0.3)] text-[var(--accent-teal,#00D4AA)] bg-[rgba(0,212,170,0.06)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Response time */}
      <p className="text-[0.7rem] text-[var(--text-muted)] flex items-center gap-2">
        <span className="text-[var(--accent-amber,#E8C547)]">⚡</span>
        Usually responds within <span className="font-bold text-[var(--text-secondary)]">24 hours</span>
      </p>

      {/* Availability Badges */}
      <div className="flex gap-2 mt-4">
        {['Open to Freelance', 'Open to Full-time'].map(badge => (
          <span
            key={badge}
            className="px-2.5 py-1 rounded-full text-[0.55rem] font-black uppercase tracking-widest bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-primary)]"
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
          duration: 0.8,
          ease: 'power3.out',
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
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 z-[2] opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--accent-teal,#00D4AA) 0%, transparent 70%)',
        }}
      />

      {/* ── Orb decorations ── */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.08] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #00D4AA 0%, transparent 70%)' }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.06] blur-[80px]"
        style={{ background: 'radial-gradient(circle, #E8C547 0%, transparent 70%)' }} />

      {/* ── Background Effects ── */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="bottom-right"
          raysColor="#00D4AA"
          raysSpeed={0.4}
          lightSpread={1.3}
        />
      </div>

      <div className="container-custom relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-start">
          
          {/* ──────────────────── LEFT COLUMN (40%) ──────────────────── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Page heading */}
            <div>
              <ScrollReveal>
                <p className="label-uppercase mb-6">Contact</p>
              </ScrollReveal>
              <RevealText
                as="h1"
                delay={0.1}
                className="font-bold tracking-[-0.04em] leading-none text-[var(--text-primary)] mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' } as React.CSSProperties}
              >
                Let's build <br />
                <span className="gradient-text">the future.</span>
              </RevealText>
              <ScrollReveal delay={0.4}>
                <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed opacity-70">
                  Have a complex backend challenge or a high-scale system in mind? 
                  I'm ready to help you architect it.
                </p>
              </ScrollReveal>
            </div>

            {/* Availability Status Card */}
            <ScrollReveal delay={0.45}>
              <AvailabilityCard />
            </ScrollReveal>

            {/* Contact Info — Redesigned with SVG icons */}
            <div className="space-y-4">
              {contactInfo.map((item, idx) => {
                const content = (
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-11 h-11 rounded-xl border border-[var(--border-primary)] flex items-center justify-center bg-[rgba(0,212,170,0.06)] text-[var(--accent-teal,#00D4AA)] group-hover:border-[rgba(0,212,170,0.4)] group-hover:bg-[rgba(0,212,170,0.12)] transition-all duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold mb-0.5">{item.label}</p>
                      <p className="text-[var(--text-primary)] font-medium text-sm group-hover:text-[var(--accent-teal,#00D4AA)] transition-colors">{item.value}</p>
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
              <div className="space-y-3">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">What I Offer</p>
                {offerings.map((item, idx) => (
                  <p key={idx} className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ──────────────────── RIGHT COLUMN (60%) — Form ──────────────────── */}
          <ScrollReveal delay={0.6} xOffset={30} className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgba(0,212,170,0.15)] to-[rgba(232,197,71,0.10)] rounded-3xl blur opacity-60 pointer-events-none" />
              
              {/* Terminal window wrapper */}
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border-primary)] shadow-2xl bg-[var(--bg-secondary)]/80 backdrop-blur-2xl">
                
                {/* Terminal window title bar */}
                <div className="flex items-center gap-2 px-5 py-3 bg-[#1C1C1E]/80 backdrop-blur-sm border-b border-[rgba(255,255,255,0.08)]">
                  <span className="terminal-dot" style={{ background: '#FF5F56' }} />
                  <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
                  <span className="terminal-dot" style={{ background: '#27C93F' }} />
                  <span className="mx-auto text-[0.6rem] font-mono text-[#6b7280] tracking-wider">
                    contact@danindra.dev ~ -zsh
                  </span>
                </div>

                {/* Form content */}
                <div className="p-8 lg:p-12">
                  <AnimatePresence mode="wait">
                    {formStatus === 'success' ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-20"
                      >
                        <div className="w-20 h-20 bg-[rgba(0,212,170,0.15)] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border border-[rgba(0,212,170,0.3)]">
                          ✅
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Transmission Successful ✓</h3>
                        <p className="text-[var(--text-secondary)] mb-8">System received your request. I will respond via secure channel shortly.</p>
                        <button 
                          onClick={() => setFormStatus('idle')}
                          className="text-[var(--accent-teal,#00D4AA)] font-bold uppercase tracking-widest text-xs hover:text-[var(--accent-violet)] transition-colors"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                      >
                        {[
                          { label: 'Identification', type: 'text', placeholder: 'Your Name', field: 'name' },
                          { label: 'Return Path', type: 'email', placeholder: 'Email Address', field: 'email' },
                        ].map(({ label, type, placeholder, field }) => (
                          <div key={field} className="space-y-2">
                            <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-black pl-1">
                              <span className="text-[var(--accent-teal,#00D4AA)] font-mono">&gt;</span>
                              {label}
                            </label>
                            <input 
                              required
                              type={type} 
                              placeholder={placeholder}
                              className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[rgba(0,212,170,0.6)] focus:shadow-[0_0_0_3px_rgba(0,212,170,0.08)] transition-all placeholder:text-[var(--text-muted)] text-sm"
                            />
                          </div>
                        ))}

                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-black pl-1">
                            <span className="text-[var(--accent-teal,#00D4AA)] font-mono">&gt;</span>
                            System Requirements
                          </label>
                          <textarea 
                            required
                            rows={5}
                            placeholder="Tell me about your project..."
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[rgba(0,212,170,0.6)] focus:shadow-[0_0_0_3px_rgba(0,212,170,0.08)] transition-all placeholder:text-[var(--text-muted)] resize-none text-sm"
                          />
                        </div>

                        <button 
                          disabled={formStatus === 'sending'}
                          type="submit"
                          className="w-full py-5 bg-gradient-to-r from-[#00D4AA] to-[#07a9a6] text-white font-black uppercase tracking-[0.2em] text-[0.7rem] rounded-xl hover:from-[#00C4A0] hover:to-[#06999F] transition-all shadow-xl shadow-[rgba(0,212,170,0.2)] hover:shadow-[rgba(0,212,170,0.35)] disabled:opacity-50 group overflow-hidden relative"
                        >
                          <span className="relative z-10">
                            {formStatus === 'sending' ? 'Transmitting...' : 'Execute Transmission →'}
                          </span>
                          {formStatus === 'sending' && (
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1">
                              {[0, 0.15, 0.3].map((d, i) => (
                                <span key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                              ))}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
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
