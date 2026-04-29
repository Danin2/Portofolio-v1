'use client';

import { useEffect, useRef } from 'react';

interface CursorGlowProps {
    color?: string;
    size?: number;
}

export default function CursorGlow({ color = 'rgba(82,39,255,0.12)', size = 600 }: CursorGlowProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;
        let tx = cx, ty = cy;
        let rafId: number;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };
        window.addEventListener('mousemove', onMove);

        const animate = () => {
            // Smooth lag follow
            cx += (tx - cx) * 0.07;
            cy += (ty - cy) * 0.07;
            el.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`;
            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
        };
    }, [size]);

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed top-0 left-0 z-0 rounded-full blur-3xl transition-opacity duration-300"
            aria-hidden="true"
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            }}
        />
    );
}
