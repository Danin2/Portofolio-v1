'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
    INITIAL_DURATION: 1200,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
    DEVICE_BETA_OFFSET: 20,
    ENTER_TRANSITION_MS: 180
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
    round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

interface ProfileCardProps {
    avatarUrl?: string;
    innerGradient?: string;
    behindGlowEnabled?: boolean;
    behindGlowColor?: string;
    behindGlowSize?: string;
    className?: string;
    enableTilt?: boolean;
    miniAvatarUrl?: string;
    name?: string;
    title?: string;
    handle?: string;
    status?: string;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
    avatarUrl = '/assets/foto/profile.png',
    innerGradient,
    behindGlowEnabled = true,
    behindGlowColor,
    behindGlowSize,
    className = '',
    enableTilt = true,
    miniAvatarUrl,
    name = 'MasDani',
    title,
    handle = 'danindra',
    status
}) => {
    const { t } = useLanguage();
    const wrapRef = useRef<HTMLDivElement>(null);
    const shellRef = useRef<HTMLDivElement>(null);

    const displayTitle = title || t('about.role');
    const displayStatus = status || 'Active_Operational';

    const tiltEngine = useMemo(() => {
        if (!enableTilt) return null;
        let running = false;
        let lastTs = 0;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        const setVarsFromXY = (x: number, y: number) => {
            const wrap = wrapRef.current;
            const shell = shellRef.current;
            if (!wrap || !shell) return;
            const px = clamp((100 / shell.clientWidth) * x);
            const py = clamp((100 / shell.clientHeight) * y);
            wrap.style.setProperty('--pointer-x', `${px}%`);
            wrap.style.setProperty('--pointer-y', `${py}%`);
            wrap.style.setProperty('--rotate-x', `${round(-(px - 50) / 3.33)}deg`);
            wrap.style.setProperty('--rotate-y', `${round((py - 50) / 3.33)}deg`);
        };
        const step = (ts: number) => {
            if (!running) return;
            const dt = (ts - (lastTs || ts)) / 1000;
            lastTs = ts;
            currentX += (targetX - currentX) * (1 - Math.exp(-dt / 0.14));
            currentY += (targetY - currentY) * (1 - Math.exp(-dt / 0.14));
            setVarsFromXY(currentX, currentY);
            requestAnimationFrame(step);
        };
        return {
            setTarget(x: number, y: number) { targetX = x; targetY = y; if (!running) { running = true; requestAnimationFrame(step); } },
            toCenter() { if (shellRef.current) this.setTarget(shellRef.current.clientWidth / 2, shellRef.current.clientHeight / 2); }
        };
    }, [enableTilt]);

    useEffect(() => {
        const shell = shellRef.current;
        if (!shell || !tiltEngine) return;
        const onMove = (e: PointerEvent) => {
            const rect = shell.getBoundingClientRect();
            tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top);
        };
        shell.addEventListener('pointermove', onMove);
        shell.addEventListener('pointerleave', () => tiltEngine.toCenter());
        tiltEngine.toCenter();
        return () => shell.removeEventListener('pointermove', onMove);
    }, [tiltEngine]);

    return (
        <div ref={wrapRef} className={`relative ${className}`} style={{ perspective: '1000px', ...{ '--inner-gradient': innerGradient || DEFAULT_INNER_GRADIENT, '--behind-glow-color': behindGlowColor || 'rgba(125,190,255,0.3)', '--behind-glow-size': behindGlowSize || '50%' } as any }}>
            <section className="relative overflow-hidden bg-black/90 rounded-[30px] border border-white/10 shadow-2xl" style={{ transform: 'rotateX(var(--rotate-y)) rotateY(var(--rotate-x))', transition: 'transform 0.1s ease-out' }}>
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5 w-fit">
                        <img src={miniAvatarUrl || avatarUrl} className="w-8 h-6 rounded-full border border-white/10" alt="avatar" />
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-xs">@{handle}</span>
                            <span className="text-white/40 text-[8px] uppercase tracking-widest">{displayStatus}</span>
                        </div>
                    </div>
                    <div className="text-center py-2">
                        <h3 className="text-3xl font-black text-white m-0">{name}</h3>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] m-0">{displayTitle}</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10">
                        <img src={avatarUrl} className="w-full aspect-square object-cover" alt={name} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default React.memo(ProfileCardComponent);
