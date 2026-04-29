'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Add Trash2 icon to imports
import {
  Plus,
  Share2,
  Terminal,
  Layout,
  Database,
  Server,
  Settings,
  Wrench,
  X,
  Cpu,
  Keyboard as KeyboardIcon,
  Zap,
  Download,
  Trash2
} from 'lucide-react';

// ─── Types & Constants ───────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all', label: 'All Units', icon: <Terminal className="w-3.5 h-3.5" />, color: '#94a3b8', accent: 'slate' },
  { id: 'languages', label: 'Languages', icon: <Cpu className="w-3.5 h-3.5" />, color: '#A855F7', accent: 'purple' },
  { id: 'frontend', label: 'Frontend', icon: <Layout className="w-3.5 h-3.5" />, color: '#3B82F6', accent: 'blue' },
  { id: 'backend', label: 'Backend', icon: <Server className="w-3.5 h-3.5" />, color: '#FF7F50', accent: 'coral' },
  { id: 'database', label: 'Database', icon: <Database className="w-3.5 h-3.5" />, color: '#EAB308', accent: 'yellow' },
  { id: 'devops', label: 'DevOps', icon: <Settings className="w-3.5 h-3.5" />, color: '#14B8A6', accent: 'teal' },
  { id: 'tools', label: 'Tools', icon: <Wrench className="w-3.5 h-3.5" />, color: '#22C55E', accent: 'green' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

interface TechKey {
  id: string;
  name: string;
  category: Exclude<CategoryId, 'all'>;
  icon: string;
  isCustom?: boolean;
}

const INITIAL_KEYS: TechKey[] = [
  { id: 'ts', name: 'TypeScript', category: 'languages', icon: 'TS' },
  { id: 'node', name: 'Node.js', category: 'languages', icon: 'JS' },
  { id: 'py', name: 'Python', category: 'languages', icon: 'PY' },
  { id: 'go', name: 'Go', category: 'languages', icon: 'GO' },
  { id: 'rust', name: 'Rust', category: 'languages', icon: 'RS' },

  { id: 'react', name: 'React', category: 'frontend', icon: '⚛' },
  { id: 'next', name: 'Next.js', category: 'frontend', icon: 'NX' },
  { id: 'tw', name: 'Tailwind', category: 'frontend', icon: 'TW' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', icon: 'VU' },

  { id: 'nest', name: 'NestJS', category: 'backend', icon: 'NS' },
  { id: 'ex', name: 'Express', category: 'backend', icon: 'EX' },
  { id: 'gql', name: 'GraphQL', category: 'backend', icon: 'GQ' },
  { id: 'io', name: 'Socket.io', category: 'backend', icon: 'SI' },

  { id: 'pg', name: 'PostgreSQL', category: 'database', icon: 'PG' },
  { id: 'mg', name: 'MongoDB', category: 'database', icon: 'MG' },
  { id: 'rd', name: 'Redis', category: 'database', icon: 'RD' },
  { id: 'prm', name: 'Prisma', category: 'database', icon: 'PR' },

  { id: 'dk', name: 'Docker', category: 'devops', icon: 'DK' },
  { id: 'k8s', name: 'Kubernetes', category: 'devops', icon: 'K8' },
  { id: 'aws', name: 'AWS', category: 'devops', icon: 'AW' },
  { id: 'tf', name: 'Terraform', category: 'devops', icon: 'TF' },

  { id: 'jest', name: 'Jest', category: 'tools', icon: 'JT' },
  { id: 'swg', name: 'Swagger', category: 'tools', icon: 'SW' },
  { id: 'git', name: 'Git', category: 'tools', icon: 'GT' },
  { id: 'pm', name: 'Postman', category: 'tools', icon: 'PM' },
];

// ─── Key Component ──────────────────────────────────────────────────────────

const Key3D = ({
  tech,
  isActive,
  onClick,
  accentColor
}: {
  tech: TechKey;
  isActive: boolean;
  onClick: () => void;
  accentColor: string;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className="relative group w-full pt-[100%] select-none"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      {/* 3D Depth Wrapper */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{
          transform: isPressed || isActive ? 'translateY(3px)' : 'translateY(0)'
        }}
      >
        {/* Shadow */}
        <div
          className={`absolute inset-[2px] bg-black/40 blur-md rounded-lg transition-opacity duration-300 ${isPressed || isActive ? 'opacity-20' : 'opacity-60'
            }`}
        />

        {/* Side Surfaces (Simulating Depth) */}
        {/* Front Wall */}
        <div
          className="absolute left-0 right-0 bottom-[-5px] h-[8px] rounded-b-lg brightness-75 z-0 transition-all duration-100"
          style={{
            backgroundColor: isActive ? accentColor : 'var(--bg-tertiary)',
            opacity: isPressed || isActive ? 0.6 : 1,
            transform: isPressed || isActive ? 'translateY(-2px)' : 'translateY(0)',
            borderBottom: '1px solid rgba(0,0,0,0.2)'
          }}
        />

        {/* Top Surface */}
        <div
          className={`absolute inset-0 rounded-lg border-t border-x border-[var(--border-primary)] z-10 flex flex-col items-center justify-center p-2 transition-all duration-300 ${isActive
            ? 'bg-[var(--card-bg)] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]'
            : 'bg-[var(--bg-tertiary)] group-hover:bg-[var(--bg-secondary)]'
            }`}
          style={{
            boxShadow: isActive
              ? `0 0 15px ${accentColor}33, inset 0 0 10px ${accentColor}11`
              : 'inset 0 1px 1px rgba(255,255,255,0.1)'
          }}
        >
          {/* Legend / Label */}
          <div className="relative z-20 flex flex-col items-center gap-1">
            <span
              className={`text-[0.7rem] md:text-xs font-black font-mono transition-all duration-300 ${isActive ? 'scale-125' : 'group-hover:scale-110 text-[var(--text-muted)]'
                }`}
              style={{ color: isActive ? accentColor : undefined }}
            >
              {tech.icon}
            </span>
            <span className={`text-[0.45rem] md:text-[0.5rem] font-mono font-bold uppercase tracking-tighter text-center transition-colors duration-300 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
              }`}>
              {tech.name}
            </span>
          </div>

          {/* Illumination LED Indicator */}
          <div
            className={`absolute top-1.5 right-1.5 w-1 h-1 rounded-full transition-all duration-500 ${isActive ? 'shadow-[0_0_8px]' : 'bg-[var(--border-primary)]'
              }`}
            style={{
              backgroundColor: isActive ? accentColor : undefined,
              boxShadow: isActive ? `0 0 8px ${accentColor}` : undefined
            }}
          />

          {/* Subtle Surface Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-lg bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function KeyboardTechStack() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [keys, setKeys] = useState<TechKey[]>(INITIAL_KEYS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyCategory, setNewKeyCategory] = useState<Exclude<CategoryId, 'all'>>('languages');
  const [newKeyIcon, setNewKeyIcon] = useState('');
  const [shareStatus, setShareStatus] = useState<'idle' | 'compiling' | 'ready'>('idle');

  const filteredKeys = useMemo(() => {
    if (activeCategory === 'all') return keys;
    return keys.filter(k => k.category === activeCategory);
  }, [activeCategory, keys]);

  const toggleKey = (id: string) => {
    setSelectedKeys(prev =>
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  const handleAddKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: TechKey = {
      id: `custom-${Date.now()}`,
      name: newKeyName,
      category: newKeyCategory,
      icon: newKeyIcon.slice(0, 2).toUpperCase() || newKeyName.slice(0, 2).toUpperCase(),
      isCustom: true
    };

    setKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setNewKeyIcon('');
    setShowAddForm(false);
  };

  const handleShare = () => {
    if (selectedKeys.length === 0) return;

    setShareStatus('compiling');
    setTimeout(() => {
      setShareStatus('ready');
      setTimeout(() => setShareStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      {/* Header Section */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--accent-purple)] shadow-sm">
              <KeyboardIcon className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              Tech <span className="text-[var(--text-muted)] italic font-light">Stack Console</span>
            </h2>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-[var(--bg-tertiary)]/50 backdrop-blur-xl rounded-2xl border border-[var(--border-primary)] shadow-sm">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[0.6rem] font-bold uppercase tracking-widest transition-all duration-300 ${activeCategory === cat.id
                ? 'bg-[var(--card-bg)] text-[var(--text-primary)] shadow-md ring-1 ring-[var(--border-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
            >
              <span className="transition-transform duration-300" style={{ color: activeCategory === cat.id ? cat.color : undefined }}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* MacBook Pro Frame */}
      <div className="relative mx-auto w-full group">
        {/* The "Lid" / Screen Frame */}
        <div className="relative p-1 bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">

          {/* Inner Black Bezel */}
          <div className="relative p-2 md:p-4 bg-[#0a0a0a] rounded-[1.8rem] overflow-hidden">

            {/* Top Bar / Camera Notch Area */}
            <div className="absolute top-0 left-0 right-0 h-8 md:h-10 flex items-center justify-between px-6 z-20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              {/* Camera Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-white/5 shadow-inner" />
              <div className="flex items-center gap-4 text-[0.5rem] font-mono text-white/20 uppercase tracking-widest">
              </div>
            </div>

            {/* Main Content Area (The "Screen") */}
            <div className="relative mt-8 md:mt-10 p-6 md:p-12 bg-[var(--bg-secondary)] rounded-[1.2rem] border border-white/5 shadow-inner min-h-[400px]">

              {/* Grid Layout */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 md:gap-6 relative z-10">
                <AnimatePresence mode="popLayout">
                  {filteredKeys.map((tech) => {
                    const category = CATEGORIES.find(c => c.id === tech.category);
                    return (
                      <motion.div
                        key={tech.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Key3D
                          tech={tech}
                          isActive={selectedKeys.includes(tech.id)}
                          onClick={() => toggleKey(tech.id)}
                          accentColor={category?.color || '#A855F7'}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Add Key "Socket" */}
                <motion.div layout>
                </motion.div>
              </div>

              {/* Status Bar / Interaction Zone */}
              <div className="mt-16 pt-10 border-t border-[var(--border-primary)] flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 w-full lg:w-auto">
                  <div className="flex items-center gap-3 mb-4">
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <AnimatePresence>
                      {selectedKeys.length > 0 ? (
                        selectedKeys.map(id => {
                          const key = keys.find(k => k.id === id);
                          const category = CATEGORIES.find(c => c.id === key?.category);
                          return (
                            <motion.span
                              key={id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="pl-3 pr-2 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--border-primary)] text-[0.65rem] font-mono font-bold text-[var(--text-primary)] flex items-center gap-2.5 group/tag hover:border-[var(--text-muted)] shadow-sm transition-all"
                            >
                              <span style={{ color: category?.color }}>{key?.icon}</span>
                              {key?.name}
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleKey(id); }}
                                className="p-0.5 rounded-md hover:bg-[var(--bg-tertiary)] hover:text-red-500 text-[var(--text-muted)] transition-all"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </motion.span>
                          );
                        })
                      ) : (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[var(--text-muted)] font-mono text-[0.6rem] italic uppercase tracking-widest opacity-50"
                        >
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {selectedKeys.length > 0 && (
                    <button
                      onClick={() => setSelectedKeys([])}
                      className="text-[0.6rem] font-mono font-bold text-[var(--text-muted)] hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Wipe_Cache
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Bottom Base Shadow */}
        <div className="mx-auto w-[90%] h-4 bg-black/40 blur-2xl rounded-full mt-4 -z-10" />
      </div>

      {/* Add Custom Key Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[var(--card-bg)] border border-[var(--border-primary)] rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent opacity-50" />

              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-[var(--text-primary)] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[var(--accent-purple)]" />
                  </div>
                  New_Unit_Entry
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddKey} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[0.6rem] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">Unit_Label</label>
                      <input
                        autoFocus
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="e.g. Bun"
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl px-5 py-4 text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-purple)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.6rem] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">Short_ID</label>
                      <input
                        type="text"
                        maxLength={2}
                        value={newKeyIcon}
                        onChange={(e) => setNewKeyIcon(e.target.value)}
                        placeholder="BU"
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl px-5 py-4 text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-purple)] transition-all uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.6rem] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">Sector_Class</label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setNewKeyCategory(cat.id as Exclude<CategoryId, 'all'>)}
                          className={`group flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all duration-300 ${newKeyCategory === cat.id
                            ? 'border-[var(--accent-purple)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] shadow-sm'
                            : 'border-[var(--border-primary)] bg-transparent text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                            }`}
                        >
                          <span className="text-[0.6rem] font-mono font-bold uppercase tracking-wider flex items-center gap-3">
                            <span style={{ color: newKeyCategory === cat.id ? cat.color : undefined }}>{cat.icon}</span>
                            {cat.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={!newKeyName.trim()}
                    className="flex-1 px-8 py-5 rounded-2xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-black uppercase tracking-widest text-[0.7rem] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Commit_To_Memory
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

