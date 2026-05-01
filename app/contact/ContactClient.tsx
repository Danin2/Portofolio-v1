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
    helper: 'Direct transmission line'
  },
  {
    label: 'Connect',
    value: 'linkedin.com/in/danindra',
    icon: <LinkedInIcon />,
    href: 'https://linkedin.com/in/danindra',
    helper: 'Professional network'
  },
  {
    label: 'Location',
    value: 'Jakarta, Indonesia',
    icon: <MapPinIcon />,
    href: undefined,
    helper: 'WIB (UTC+7)'
  },
];

// ─── Availability Status Card ─────────────────────────────────────────────────
function AvailabilityCard() {
  return (
    <div className="rounded-[2rem] p-8 border border-[var(--border-primary)] bg-[var(--bg-secondary)]/40 backdrop-blur-xl shadow-xl group hover:border-[var(--accent-primary)]/30 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]">System Status</span>
        </div>
        <span className="text-[0.55rem] font-mono text-[var(--text-muted)] font-bold">ACT_01</span>
      </div>
      
      <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">Available for Projects</h3>
      <p className="text-sm text-[var(--text-secondary)] opacity-80 leading-relaxed mb-6">
        Open to new projects and technical collaborations. Ready to architect resilient systems.
      </p>

      <div className="space-y-3 border-t border-[var(--border-primary)] pt-6">
        <div className="flex items-center justify-between text-[0.65rem]">
          <span className="text-[var(--text-muted)] font-bold uppercase tracking-widest">Timezone</span>
          <span className="text-[var(--text-primary)] font-mono">WIB (UTC+7)</span>
        </div>
        <div className="flex items-center justify-between text-[0.65rem]">
          <span className="text-[var(--text-muted)] font-bold uppercase tracking-widest">Response</span>
          <span className="text-[var(--accent-primary)] font-mono font-bold">&lt; 24H</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactClient() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    setTimeout(() => {
      setFormStatus('success');
      // Toast notification would be triggered here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden flex flex-col pt-24 md:pt-32 pb-20">
      
      {/* ── Ambient Background Blobs ── */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06] blur-[120px] bg-[var(--accent-primary)] animate-pulse" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04] blur-[100px] bg-[var(--accent-secondary)]" />

      {/* ── Cursor Spotlight ── */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 z-[2] opacity-[0.1] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10 w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-24 items-start">
          
          {/* ──────────────────── LEFT COLUMN (40%) ──────────────────── */}
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-8">
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-px bg-[var(--accent-primary)]" />
                  <p className="text-[0.7rem] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)]">Secure Communication</p>
                </div>
              </ScrollReveal>
              <RevealText
                as="h1"
                delay={0.1}
                className="font-black tracking-[-0.05em] leading-[0.9] text-[var(--text-primary)] mb-8"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' } as React.CSSProperties}
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
            <div className="space-y-8">
              {contactInfo.map((item, idx) => {
                const contentInner = (
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="w-14 h-14 rounded-2xl border border-[var(--border-primary)] flex items-center justify-center bg-[var(--bg-secondary)] text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)]/50 group-hover:bg-[var(--accent-primary)]/10 group-hover:scale-110 transition-all duration-500 shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.25em] text-[var(--text-muted)] font-black mb-1 flex items-center gap-2">
                        {item.label}
                        <span className="h-px w-4 bg-[var(--border-primary)] group-hover:w-8 group-hover:bg-[var(--accent-primary)]/50 transition-all duration-500" />
                      </p>
                      <p className="text-[var(--text-primary)] font-bold text-lg group-hover:text-[var(--accent-primary)] transition-colors duration-300">{item.value}</p>
                      <p className="text-[0.55rem] font-mono text-[var(--text-muted)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.helper}</p>
                    </div>
                  </div>
                );

                return (
                  <ScrollReveal key={idx} delay={0.5 + idx * 0.1} xOffset={-20}>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        target={item.href.startsWith('http') ? '_blank' : undefined} 
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        {contentInner}
                      </a>
                    ) : (
                      <div className="group">{contentInner}</div>
                    )}
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Social Links Row */}
            <ScrollReveal delay={0.8}>
              <div className="space-y-4 pt-4">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">Terminal Nodes</p>
                <div className="flex gap-4">
                  {[
                    { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/danindra', label: 'LinkedIn' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>, href: 'https://github.com/danindra', label: 'GitHub' },
                    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, href: 'https://twitter.com/danindra', label: 'Twitter' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-[var(--border-primary)] flex items-center justify-center bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--accent-primary)]/10 transition-colors text-[var(--text-secondary)] hover:text-[var(--accent-primary)] shadow-sm"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ──────────────────── RIGHT COLUMN (60%) — Form ──────────────────── */}
          <ScrollReveal delay={0.6} xOffset={30} className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/10 rounded-[3rem] blur-2xl opacity-40 pointer-events-none" />
              
              {/* Terminal window wrapper */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] shadow-2xl bg-[var(--bg-secondary)]/60 backdrop-blur-3xl group hover:border-[var(--accent-primary)]/20 transition-colors duration-500">
                
                {/* Terminal window title bar */}
                <div className="flex items-center gap-2 px-6 py-4 bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-primary)]">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                  </div>
                  <span className="mx-auto text-[0.6rem] font-mono text-[var(--text-muted)] font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    secure-transmission-channel
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
                        <div className="w-20 h-20 bg-[var(--accent-primary)]/10 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 border border-[var(--accent-primary)]/30 shadow-inner text-[var(--accent-primary)]">
                          ✓
                        </div>
                        <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 tracking-tight">Packet Delivered</h3>
                        <p className="text-[var(--text-secondary)] mb-10 font-medium max-w-sm mx-auto">System received your transmission. I will respond via secure channel shortly.</p>
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
                        className="space-y-10"
                      >
                        {[
                          { label: 'Identification', type: 'text', placeholder: 'Your Name', field: 'name', helper: '(Your full name)' },
                          { label: 'Return Path', type: 'email', placeholder: 'Email Address', field: 'email', helper: '(Your email address)' },
                        ].map(({ label, type, placeholder, field, helper }) => (
                          <div key={field} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--text-muted)] font-black pl-1">
                                <span className={`font-mono transition-colors duration-300 ${focusedField === field ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}>&gt;</span>
                                {label}
                              </label>
                              <span className="text-[10px] text-[var(--text-muted)] italic opacity-60 font-medium">{helper}</span>
                            </div>
                            <input 
                              required
                              type={type} 
                              placeholder={placeholder}
                              onFocus={() => setFocusedField(field)}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-[var(--bg-primary)]/40 border border-[var(--border-primary)] rounded-2xl px-6 py-5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--accent-primary)]/60 focus:shadow-[0_0_0_4px_var(--accent-primary)]/5 transition-all placeholder:text-[var(--text-muted)]/40 text-sm"
                            />
                          </div>
                        ))}

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--text-muted)] font-black pl-1">
                              <span className={`font-mono transition-colors duration-300 ${focusedField === 'requirements' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}>&gt;</span>
                              System Requirements
                            </label>
                            <span className="text-[10px] text-[var(--text-muted)] italic opacity-60 font-medium">(Describe your project or inquiry)</span>
                          </div>
                          <textarea 
                            required
                            rows={5}
                            placeholder="Describe your architectural needs..."
                            onFocus={() => setFocusedField('requirements')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-[var(--bg-primary)]/40 border border-[var(--border-primary)] rounded-2xl px-6 py-5 text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--accent-primary)]/60 focus:shadow-[0_0_0_4px_var(--accent-primary)]/5 transition-all placeholder:text-[var(--text-muted)]/40 resize-none text-sm"
                          />
                        </div>

                        <button 
                          disabled={formStatus === 'sending'}
                          type="submit"
                          className="w-full py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black uppercase tracking-[0.3em] text-[0.7rem] rounded-2xl hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-500 shadow-2xl disabled:opacity-50 group overflow-hidden relative"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {formStatus === 'sending' ? 'Transmitting Data...' : (
                              <>
                                Execute Transmission
                                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                              </>
                            )}
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

