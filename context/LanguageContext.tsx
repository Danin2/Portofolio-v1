'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'EN' | 'ID' | 'ZH';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary structure: { [lang]: { [key]: value } }
const translations: Record<Language, Record<string, any>> = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      build: 'Build ↗'
    },
    hero: {
      tag: 'Systems Architect',
      title_part1: 'Architecting',
      title_part2: 'Digital Foundations.',
      desc: 'Focused on building resilient systems that empower modern experiences through performance and precision.'
    },
    about: {
      title: 'The Architect / Identity',
      narrative: 'Hello! I\'m Muhammad Danindra I. My approach to software engineering is grounded in the belief that the strongest architectures are those that remain invisible.',
      role: 'Backend Engineer',
      location: 'Jakarta, ID'
    }
  },
  ID: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      contact: 'Kontak',
      build: 'Bangun ↗'
    },
    hero: {
      tag: 'Arsitek Sistem',
      title_part1: 'Merancang',
      title_part2: 'Fondasi Digital.',
      desc: 'Berfokus pada pembangunan sistem tangguh yang memberdayakan pengalaman modern melalui performa dan presisi.'
    },
    about: {
      title: 'Sang Arsitek / Identitas',
      narrative: 'Halo! Saya Muhammad Danindra I. Pendekatan saya dalam rekayasa perangkat lunak didasarkan pada keyakinan bahwa arsitektur terkuat adalah yang tetap tidak terlihat.',
      role: 'Backend Engineer',
      location: 'Jakarta, ID'
    }
  },
  ZH: {
    nav: {
      home: '首页',
      about: '关于',
      projects: '项目',
      contact: '联系',
      build: '构建 ↗'
    },
    hero: {
      tag: '系统架构师',
      title_part1: '构建',
      title_part2: '数字基础。',
      desc: '专注于构建弹性系统，通过性能和精确度赋能现代体验。'
    },
    about: {
      title: '架构师 / 身份',
      narrative: '你好！我是 Muhammad Danindra I。我的软件工程方法基于这样一个信念：最强大的架构是那些保持隐形的架构。',
      role: '后端工程师',
      location: '雅加达, 印尼'
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('app-language') as Language;
    if (saved && (saved === 'EN' || saved === 'ID' || saved === 'ZH')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (keyPath: string) => {
    const keys = keyPath.split('.');
    let result: any = translations[language];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return keyPath; // Fallback to key name
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
