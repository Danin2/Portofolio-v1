'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShieldCheck,
  Rotate3d,
  Terminal,
  Cpu,
  Sparkles,
  Globe,
  CheckCircle2
} from 'lucide-react';

interface Profile3DCardProps {
  className?: string;
  avatarUrl?: string;
  name?: string;
  handle?: string;
}

export default function Profile3DCard({
  className = '',
  avatarUrl = '/assets/foto/profile.webp',
  name = 'Danindra',
  handle = 'danindra'
}: Profile3DCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(avatarUrl);

  // Smooth 3D tilt tracking on mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-15 to 15 degrees)
    const rotY = ((mouseX / width) - 0.5) * 30;
    const rotX = ((mouseY / height) - 0.5) * -30;

    // Calculate glare position
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({ x: glareX, y: glareY, opacity: 0.45 });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => !prev);
  };

  const techStack = [
    { name: 'TypeScript', color: '#3178C6', bg: 'rgba(49, 120, 198, 0.15)' },
    { name: 'Go', color: '#00ADD8', bg: 'rgba(0, 173, 216, 0.15)' },
    { name: 'Node.js', color: '#5FA04E', bg: 'rgba(95, 160, 78, 0.15)' },
    { name: 'PostgreSQL', color: '#4169E1', bg: 'rgba(65, 105, 225, 0.15)' },
    { name: 'Docker', color: '#2496ED', bg: 'rgba(36, 150, 237, 0.15)' },
  ];

  return (
    <div className={`w-full flex items-center justify-center p-2 sm:p-4 select-none ${className}`}>
      {/* Container with 3D Perspective */}
      <div
        className="relative w-full max-w-[380px] sm:max-w-[420px] h-[580px] sm:h-[620px] cursor-pointer group"
        style={{ perspective: '1200px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glowing Background Backdrop Ambient Aura */}
        <div
          className="absolute -inset-4 rounded-[3.5rem] bg-[var(--accent-primary)]/20 blur-2xl transition-opacity duration-700 pointer-events-none"
          style={{ opacity: isHovered ? 0.85 : 0.4 }}
        />

        {/* 3D Card Shell */}
        <div
          ref={cardRef}
          className="relative w-full h-full rounded-[2.8rem] transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          {/* ── CARD FRONT ────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 w-full h-full rounded-[2.8rem] border border-white/15 bg-[var(--card-bg)] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: isHovered
                ? '0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 40px 2px rgba(99, 102, 241, 0.25)'
                : '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Holographic Dynamic Sheen Layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[2.8rem]"
              style={{
                background: 'transparent',
                opacity: 0,
              }}
            />

            {/* Subtle Grid Pattern Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10 rounded-[2.8rem]"
            />

            {/* Top Bar / Badge Header */}
            <div
              className="relative z-10 flex items-center justify-between transition-transform duration-300"
              style={{ transform: 'translateZ(30px)' }}>
            </div>

            {/* Avatar & 3D Centerpiece */}
            <div
              className="relative z-10 my-auto flex flex-col items-center text-center transition-transform duration-300"
              style={{ transform: 'translateZ(45px)' }}
            >
              {/* Profile Image Frame with Multi-ring Glow */}
              <div className="relative mb-5 group/avatar">
                {/* Outer Ring Animation */}
                <div className="absolute -inset-3 rounded-full bg-[var(--accent-primary)] opacity-70 blur-md group-hover/avatar:opacity-100 transition-opacity duration-500" />

                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-slate-900 border border-white/20 shadow-2xl overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={name}
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                    priority
                    onError={() => setImgSrc('/assets/foto/profile.png')}
                  />
                </div>

                {/* Verified Icon Pill */}
                <div className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full text-white border-2 border-slate-900 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 fill-indigo-400 text-slate-950" />
                </div>
              </div>

              {/* Developer Title & Handle */}
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
                {name}
              </h3>
              <p className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                @{handle} · Senior Fullstack Architect
              </p>

              {/* Floating Tech Stack Badges */}
              <div
                className="flex flex-wrap justify-center gap-1.5 max-w-[290px]"
                style={{ transform: 'translateZ(20px)' }}
              >
                {techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: tech.bg,
                      borderColor: `${tech.color}40`,
                      color: tech.color
                    }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Flip Button */}
            <div
              className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Indonesia</span>
              </div>

              <button
                onClick={handleFlip}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors duration-200 active:scale-95"
              >
                <Rotate3d className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
                <span>Flip Card 3D</span>
              </button>
            </div>
          </div>

          {/* ── CARD BACK ─────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 w-full h-full rounded-[2.8rem] border border-white/15 bg-[var(--card-bg)] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}
          >
            {/* Hologram Sheen Layer on Back */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 rounded-[2.8rem]"
              style={{
                background: 'transparent'
              }}
            />

            {/* Back Header */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                  System Architecture
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                STATUS: OPTIMAL
              </span>
            </div>

            {/* Back Content / Tech Specs */}
            <div className="relative z-10 my-auto space-y-4 font-mono text-xs text-slate-300">
              {/* Terminal Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-white/5">
                  <span>danindra.config.json</span>
                  <span className="text-emerald-400">v2.6.0</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <p><span className="text-purple-400">&quot;core_stack&quot;</span>: [<span className="text-amber-300">&quot;Go&quot;</span>, <span className="text-amber-300">&quot;TypeScript&quot;</span>, <span className="text-amber-300">&quot;Next.js&quot;</span>],</p>
                  <p><span className="text-purple-400">&quot;architecture&quot;</span>: <span className="text-emerald-300">&quot;Event-Driven Microservices&quot;</span>,</p>
                  <p><span className="text-purple-400">&quot;database&quot;</span>: <span className="text-cyan-300">&quot;PostgreSQL + Redis&quot;</span>,</p>
                  <p><span className="text-purple-400">&quot;devops&quot;</span>: <span className="text-indigo-300">&quot;Docker / Kubernetes / CI-CD&quot;</span>,</p>
                  <p><span className="text-purple-400">&quot;code_quality&quot;</span>: <span className="text-emerald-400">&quot;100% Clean Architecture&quot;</span></p>
                </div>
              </div>

              {/* Holographic Security Verification Badge */}
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white uppercase">Verified Developer</p>
                    <p className="text-[9px] text-indigo-300/80">ID: 8849-DANIN-2026</p>
                  </div>
                </div>
                <Cpu className="w-5 h-5 text-indigo-400 opacity-60" />
              </div>
            </div>

            {/* Back Footer */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono text-slate-400">
                CLICK TO RETURN
              </span>

              <button
                onClick={handleFlip}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors duration-200"
              >
                <Rotate3d className="w-3.5 h-3.5 text-emerald-400" />
                <span>Flip Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
