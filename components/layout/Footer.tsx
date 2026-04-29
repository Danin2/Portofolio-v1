import React from 'react';
import Link from 'next/link';

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yourusername' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', href: 'https://twitter.com/yourusername' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="container-custom py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent-purple)] to-[var(--accent-violet)] flex items-center justify-center">
                <span className="text-white font-bold text-base font-mono leading-none">{'<>'}</span>
              </div>
              <span className="font-bold text-lg font-mono text-[var(--text-primary)]">
                Junior<span className="text-[var(--accent-violet)]">WebDev</span>
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-[220px]">
              Building scalable backend systems with clean architecture and best practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--accent-purple)] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={link.name} className="flex items-baseline gap-2">
                  <span className="text-[0.6rem] font-mono text-[var(--accent-purple)] select-none">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-violet)] uppercase tracking-wide font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[var(--accent-purple)] mb-5">
              Socials
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors duration-200 inline-block"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border-primary)] flex flex-col md:flex-row justify-between items-center gap-2 text-[var(--text-muted)] text-xs">
          <p className="font-mono">© {year} Junior Web Development. All rights reserved.</p>
          <p>
            Built with{' '}
            <span className="text-[var(--accent-violet)]">Next.js</span>
            {' & '}
            <span className="text-[var(--accent-violet)]">TypeScript</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;