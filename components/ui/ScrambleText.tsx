'use client';

import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\|[]{}';

function scramble(
    el: HTMLElement,
    finalText: string,
    duration = 900,
    onDone?: () => void
) {
    let frame = 0;
    const totalFrames = Math.round(duration / 16); // ~60fps
    let rafId: number;

    const run = () => {
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * finalText.length);

        el.textContent = finalText
            .split('')
            .map((char, i) => {
                if (char === ' ') return ' ';
                if (i < revealedCount) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');

        if (frame < totalFrames) {
            frame++;
            rafId = requestAnimationFrame(run);
        } else {
            el.textContent = finalText;
            onDone?.();
        }
    };

    rafId = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafId);
}

interface ScrambleTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    duration?: number;
    tag?: React.ElementType;
}

export default function ScrambleText({
    text,
    className,
    style,
    delay = 0,
    duration = 900,
    tag: Tag = 'span',
}: ScrambleTextProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.textContent = text
            .split('')
            .map(c => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
            .join('');

        const timeout = setTimeout(() => {
            scramble(el, text, duration);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay, duration]);

    // Cast to span to satisfy TypeScript — Tag is always a valid HTML element
    const El = Tag as 'span';
    return <El ref={ref as React.RefObject<HTMLSpanElement>} className={className} style={style} aria-label={text} />;
}
