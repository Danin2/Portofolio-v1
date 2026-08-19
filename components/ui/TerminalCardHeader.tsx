'use client';

import { useEffect, useState } from 'react';

interface TerminalCardHeaderProps {
  projectId: string;
  /** 3–4 lines of terminal output relevant to the project */
  lines: { text: string; type: 'command' | 'success' | 'info' | 'warning' }[];
  title?: string;
}

const lineColors = {
  command: 'text-[#79b8ff]',
  success: 'text-[#85e89d]',
  info: 'text-[#E8C547]',
  warning: 'text-[#f97583]',
};

/**
 * TerminalCardHeader — Terminal-style mockup header for project cards.
 * Shows relevant Frontend output lines with a blinking cursor.
 */
export default function TerminalCardHeader({ lines, title = 'bash' }: TerminalCardHeaderProps) {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="terminal-window rounded-t-2xl rounded-b-none border-b-0">
      {/* Window controls */}
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: '#FF5F56' }} />
        <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
        <span className="terminal-dot" style={{ background: '#27C93F' }} />
        <span className="ml-2 text-[0.6rem] text-[#6b7280] font-mono tracking-wider">{title}</span>
      </div>

      {/* Code lines */}
      <div className="terminal-body py-3">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-start gap-2 leading-relaxed">
            <span className="text-[var(--accent-primary)] text-[0.65rem] shrink-0 mt-px">$</span>
            <span className={`font-mono text-[0.65rem] ${lineColors[line.type]}`}>
              {line.text}
            </span>
          </div>
        ))}
        {/* Blinking cursor on last line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[var(--accent-primary)] text-[0.65rem] shrink-0">$</span>
          <span
            className="inline-block w-1.5 h-3 bg-[var(--accent-primary)]"
            style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
          />
        </div>
      </div>
    </div>
  );
}
