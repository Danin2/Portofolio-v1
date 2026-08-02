import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about my journey as a backend developer, my technical skills, and my approach to building scalable systems.',
};

const values = [
  {
    icon: 'Code2',
    title: 'Clean Code',
    description: 'Code should be readable by humans first, machines second. SOLID principles and self-documenting patterns are non-negotiable.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Security First',
    description: "Security is built into every layer from day one — not bolted on afterward. Input validation, auth, and encryption by default.",
  },
  {
    icon: 'Gauge',
    title: 'Performance',
    description: 'Every millisecond counts. Optimized queries, efficient algorithms, and proper caching strategies for blazing-fast responses.',
  },
  {
    icon: 'FlaskConical',
    title: 'Testing',
    description: 'Comprehensive tests catch bugs before users do. Unit, integration, and end-to-end coverage give confidence to ship.',
  },
  {
    icon: 'BookOpen',
    title: 'Documentation',
    description: 'Good docs save hours of confusion. Clear API docs, code comments, and architectural diagrams are part of the deliverable.',
  },
  {
    icon: 'RefreshCw',
    title: 'Continuous Learning',
    description: 'Technology evolves rapidly. I stay current with best practices, new tools, and emerging patterns in backend development.',
  },
];


export default function AboutPage() {
  return <AboutClient values={values} />;
}