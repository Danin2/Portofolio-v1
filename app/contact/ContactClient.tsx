'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import RevealText from '@/components/ui/RevealText';
import LightRays from '@/components/ui/LightRays';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 z-[2] opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)',
        }}
      />

      {/* ── Background Effects ── */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="bottom-right"
          raysColor="#4f46e5"
          raysSpeed={0.4}
          lightSpread={1.3}
        />
      </div>

      <div className="container-custom relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Information Section */}
          <div className="space-y-12">
            <div>
              <ScrollReveal>
                <p className="label-uppercase mb-6">Contact</p>
              </ScrollReveal>
              <RevealText
                as="h1"
                delay={0.1}
                className="font-bold tracking-[-0.04em] leading-none text-[var(--text-primary)] mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' } as React.CSSProperties}
              >
                Let's build <br />
                <span className="gradient-text">the future.</span>
              </RevealText>
              <ScrollReveal delay={0.4}>
                <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed opacity-70">
                  Have a complex backend challenge or a high-scale system in mind? 
                  I'm ready to help you architect it.
                </p>
              </ScrollReveal>
            </div>

            <div className="space-y-8">
              {[
                { label: 'Primary Email', value: 'danindra@danindra.dev', icon: '📧' },
                { label: 'LinkedIn', value: 'linkedin.com/in/danindra', icon: '🔗' },
                { label: 'Location', value: 'Jakarta, Indonesia 🇮🇩', icon: '📍' },
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={0.5 + idx * 0.1} xOffset={-20}>
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 bg-[var(--bg-tertiary)] rounded-2xl flex items-center justify-center text-xl border border-[var(--border-primary)] group-hover:border-[var(--accent-purple)]/40 transition-all duration-300 group-hover:bg-[var(--accent-purple)]/10">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold mb-1">{item.label}</p>
                      <p className="text-[var(--text-primary)] font-medium group-hover:text-[var(--accent-violet)] transition-colors">{item.value}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <ScrollReveal delay={0.6} xOffset={30}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5227FF] to-[var(--accent-violet)] rounded-3xl blur opacity-10"></div>
              <div className="relative glass-panel p-8 lg:p-12 border border-[var(--border-primary)] bg-[var(--bg-secondary)]/80 backdrop-blur-2xl rounded-3xl shadow-xl">
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-[var(--accent-purple)]/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border border-[var(--accent-purple)]/30">
                        ✅
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Transmission Sent</h3>
                      <p className="text-[var(--text-secondary)] mb-8">System received your request. I will respond via secure channel shortly.</p>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="text-[var(--accent-purple)] font-bold uppercase tracking-widest text-xs hover:text-[var(--accent-violet)] transition-colors"
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
                      <div className="space-y-2">
                        <label className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-black pl-1">Identification</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Your Name"
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-purple)]/50 transition-all placeholder:text-[var(--text-muted)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-black pl-1">Return Path</label>
                        <input 
                          required
                          type="email" 
                          placeholder="Email Address"
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-purple)]/50 transition-all placeholder:text-[var(--text-muted)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--text-muted)] font-black pl-1">System Requirements</label>
                        <textarea 
                          required
                          rows={5}
                          placeholder="Tell me about your project..."
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-purple)]/50 transition-all placeholder:text-[var(--text-muted)] resize-none"
                        />
                      </div>
                      <button 
                        disabled={formStatus === 'sending'}
                        type="submit"
                        className="w-full py-5 bg-[var(--accent-purple)] text-white font-black uppercase tracking-[0.2em] text-[0.7rem] rounded-xl hover:bg-[var(--accent-violet)] transition-all shadow-xl disabled:opacity-50 group overflow-hidden relative"
                      >
                        <span className="relative z-10">
                          {formStatus === 'sending' ? 'Integrating...' : 'Execute Transmission →'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
