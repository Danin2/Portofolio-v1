'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const languages = [
  { code: 'ID', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'ZH', label: 'Chinese', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const currentLang = languages.find(l => l.code === language) || languages[1];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)]/50 border border-[var(--border-primary)] hover:border-[var(--accent-primary)]/50 transition-all group"
      >
        <Languages size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" />
        <span className="text-[0.6rem] font-bold tracking-widest text-[var(--text-primary)]">
          {currentLang.code}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-[60]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-36 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-2xl overflow-hidden z-[70] backdrop-blur-xl"
            >
              <div className="p-2 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[0.65rem] font-bold tracking-wider transition-all ${
                      language === lang.code 
                        ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' 
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-xs">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
