'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FooterCTAProps {
  title?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
  className?: string;
}

const FooterCTA = ({
  title = "Ready to architect something great?",
  description = "I'm currently accepting new projects and consulting inquiries. Let's talk about your next backend challenge.",
  primaryBtnText = "Hire Me →",
  primaryBtnHref = "/contact",
  secondaryBtnText = "View Projects",
  secondaryBtnHref = "/projects",
  className = ""
}: FooterCTAProps) => {
  return (
    <section className={`mt-40 container-custom ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[3.5rem] bg-[var(--bg-secondary)]/40 backdrop-blur-3xl border border-[var(--border-primary)] p-12 lg:p-24 overflow-hidden text-center shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl lg:text-7xl font-black text-[var(--text-primary)] mb-10 tracking-tight leading-tight px-4"
          >
            {title.split('something')[0]} <br />
            <span className="gradient-text italic font-medium inline-block pr-4">something {title.split('something')[1]}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[var(--text-secondary)] text-lg mb-12 opacity-80 max-w-xl mx-auto font-medium"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={primaryBtnHref}
                className="px-12 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full transition-all shadow-xl hover:bg-[var(--accent-primary)] hover:text-white block"
              >
                {primaryBtnText}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={secondaryBtnHref}
                className="px-12 py-5 bg-transparent text-[var(--text-primary)] border border-[var(--border-primary)] font-bold uppercase tracking-widest text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] transition-all block"
              >
                {secondaryBtnText}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FooterCTA;
