'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface FooterCTAProps {
  className?: string;
}

const FooterCTA = ({ className = "" }: FooterCTAProps) => {
  const { t } = useLanguage();

  const title: string = t('footerCTA.title');
  const description: string = t('footerCTA.desc');
  const primaryBtnText: string = t('footerCTA.primary_btn');
  const primaryBtnHref = "/contact";
  const secondaryBtnText: string = t('footerCTA.secondary_btn');
  const secondaryBtnHref = "/projects";

  // Split title on "something" for the gradient span effect (EN only)
  // For other languages, render title as-is with a gradient span on the last word
  const hasSomething = title.includes('something');
  const titleParts = hasSomething ? title.split('something') : null;

  return (
    <section className={`mt-20 md:mt-40 container-custom ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2rem] md:rounded-[3.5rem] bg-[var(--bg-secondary)]/40 backdrop-blur-3xl border border-[var(--border-primary)] p-8 sm:p-12 lg:p-24 overflow-hidden text-center shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-7xl font-black text-[var(--text-primary)] mb-6 md:mb-10 tracking-tight leading-tight px-4" style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {titleParts ? (
              <>
                {titleParts[0]} <br />
                <span className="gradient-text italic font-medium inline-block pr-4">something {titleParts[1]}</span>
              </>
            ) : (
              title
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[var(--text-secondary)] text-base md:text-lg mb-8 md:mb-12 opacity-80 max-w-xl mx-auto font-medium"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href={primaryBtnHref}
                className="px-8 py-4 md:px-12 md:py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest text-[0.65rem] md:text-[0.7rem] rounded-full transition-all shadow-xl hover:bg-[var(--accent-primary)] hover:text-white block text-center"
              >
                {primaryBtnText}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href={secondaryBtnHref}
                className="px-8 py-4 md:px-12 md:py-5 bg-transparent text-[var(--text-primary)] border border-[var(--text-primary)]/40 font-bold uppercase tracking-widest text-[0.65rem] md:text-[0.7rem] rounded-full hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/8 hover:text-[var(--accent-primary)] transition-all block text-center"
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
