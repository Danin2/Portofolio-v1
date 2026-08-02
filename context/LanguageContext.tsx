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
      build: 'Build ↗',
    },
    hero: {
      tag: 'Systems Architect',
      title_part1: 'Architecting',
      title_part2: 'Digital Foundations.',
      desc: "Focused on building resilient systems that empower modern experiences through performance and precision.",
      cta_projects: 'My Projects',
      cta_skills: 'View Skills',
    },
    stats: {
      years: 'Years Experience',
      systems: 'Systems Architected',
      apis: 'APIs Optimized',
      uptime: 'Uptime Reliability',
    },
    skills: {
      section_title: 'Engineering',
      section_title_gradient: 'Proficiency',
      section_desc: 'Building the future with modern tools and robust architectures. My stack is focused on speed, safety, and scalability.',
      learn_more: 'Learn More',
      cards: [
        {
          title: 'Project Architecture',
          description: 'Scalable Systems & Infrastructure',
          content_intro: 'I architect distributed systems that stand the test of time. Leveraging microservices, event-driven patterns, and containerization, I build environments that are resilient and easy to scale.',
          infra_title: 'Infrastructure',
          infra_items: ['Docker & K8s Orchestration', 'Message Brokers (RabbitMQ/Kafka)', 'gRPC & Protocol Buffers'],
          patterns_title: 'Patterns',
          patterns_items: ['Domain-Driven Design (DDD)', 'Event Sourcing / CQRS', 'Layered Architecture'],
        },
        {
          title: 'Database Engineering',
          description: 'High-Performance Data Storage',
          content_intro: 'From ER modeling to complex query optimization, I ensure data integrity and speed across both SQL and NoSQL environments.',
          items: [
            'PostgreSQL schema design & optimization',
            'NoSQL modeling with MongoDB & Redis',
            'Distributed caching strategies',
            'Query profiling & indexing tuning',
          ],
        },
        {
          title: 'Modern Tooling',
          description: 'Lightning Fast Workflow',
          content_intro: 'I leverage the latest ecosystem improvements to ensure "Lightning Fast" development cycles and optimized production bundles.',
          ecosystem_title: 'The Modern Ecosystem',
          ecosystem_items: ['Vite-powered dev server', 'Vitest for unit testing', 'Rapid HMR workflows', 'Rollup/ESBuild optimization'],
        },
        {
          title: 'Backend API',
          description: 'Type-Safe Robust Foundation',
          content_intro: 'Building secure, well-documented, and high-performance APIs using modern Node.js and TypeScript frameworks.',
          items: [
            'Node.js / Express / NestJS',
            'Strict TypeScript implementation',
            'Zod validation & OpenAPI documentation',
            'Advanced Middleware & Security layers',
          ],
        },
        {
          title: 'Security & Auth',
          description: 'Identity & Data Hardening',
          content_intro: 'Bulletproof identity management and data protection following OWASP standards and modern security protocols.',
          items: [
            'JWT with refresh token rotation',
            'OAuth2 & OIDC integrations',
            'RBAC & ACL implementation',
            'End-to-end encryption / Hashing',
          ],
        },
        {
          title: 'QA & Testing',
          description: 'Stability & Zero-Regression',
          content_intro: 'Maintaining code health through automated test suites and continuous integration pipelines.',
          items: [
            'Unit & Integration testing (Vitest)',
            'E2E scenarios (Playwright)',
            'CI/CD pipeline automation',
            'Coverage monitoring & Reporting',
          ],
        },
      ],
    },
    experience: {
      section_title: 'Professional',
      section_title_italic: 'Evolution',
      section_desc: 'A history of building resilient systems across various industries and scales.',
      items: [
        {
          title: 'Future Systems Engineer',
          description: 'Focused on building large-scale resilient infrastructure. Continuously exploring the limits of backend optimization and distributed system design.',
        },
        {
          title: 'Open Source & Optimization',
          description: 'Started contributing to the open source ecosystem. Building internal libraries for more efficient database state management and high performance.',
        },
        {
          title: 'The Shift to Systems Architect',
          description: 'Began understanding the importance of orchestration. Implemented Docker and Kubernetes to ensure system reliability across various environments.',
        },
        {
          title: 'Mastering the Full Stack',
          description: 'Extended expertise to frontend with Next.js to understand how APIs are consumed in real-time. Built the first analytics dashboard.',
        },
        {
          title: 'Deep Dive into Databases',
          description: 'Built the first complex PostgreSQL database project. Learned about indexing, query optimization, and proper data normalization.',
        },
        {
          title: 'The Beginning of the Terminal',
          description: 'Wrote the first lines of code in Node.js. Fascinated by how a server can handle thousands of requests asynchronously.',
        },
      ],
    },
    projects: {
      section_title: 'Selected',
      section_title_italic: 'Creations',
      section_desc: 'A glimpse into robust backend systems and modern API architectures.',
      featured_title: 'Featured',
      featured_title_gradient: 'Projects',
      featured_desc: 'A showcase of high-performance backend systems, distributed architectures, and robust API solutions.',
      selected_work: 'Selected Work',
      all_projects: 'All Projects',
      explore_archive: 'Explore Full Archive',
      interested: 'Interested in more?',
      explore_link: 'Explore the full archive',
    },
    footer: {
      desc: 'Architecting high-performance backend systems with precision, scalability, and clean system design.',
      nav_title: 'Navigation',
      channels_title: 'Channels',
      rights: 'All rights reserved.',
      system_status: 'System Status: Active',
      links: ['Home', 'About', 'Projects', 'Contact'],
    },
    footerCTA: {
      title: "Ready to architect something great?",
      desc: "I'm currently accepting new projects and consulting inquiries. Let's talk about your next backend challenge.",
      primary_btn: 'Hire Me →',
      secondary_btn: 'View Projects',
    },
    about: {
      title: 'The Architect / Identity',
      narrative: "Hello! I'm Muhammad Danindra I. My approach to software engineering is grounded in the belief that the strongest architectures are those that remain invisible.",
      role: 'Backend Engineer',
      location: 'Jakarta, ID',
      profile_title: 'My Profile',
      stats: ['Years Exp.', 'Systems Built', 'Perf. Boost', 'Reliability'],
      learning_title: 'Currently',
      learning_italic: 'Learning.',
      learning_items: [
        {
          title: 'Rust for Systems',
          desc: 'Exploring high-performance systems programming and safety memory management.',
        },
        {
          title: 'Distributed Systems',
          desc: 'Deep diving into Consensus Algorithms (Raft/Paxos) and Data Consistency models.',
        },
      ],
      progress_label: 'Progress',
    },
    contact: {
      title_line1: "Let's architect",
      title_line2: 'the future.',
      desc: "Have a complex backend challenge or a high-scale system in mind? I'm ready to help you build resilient foundations.",
      availability_status: 'System Status',
      availability_title: 'Available for Projects',
      availability_desc: 'Open to new projects and technical collaborations. Ready to architect resilient systems.',
      timezone_label: 'Timezone',
      response_label: 'Response',
      terminal_nodes: 'Terminal Nodes',
      form_name_label: 'Identification',
      form_name_placeholder: 'Your Name',
      form_name_helper: '(Your full name)',
      form_email_label: 'Return Path',
      form_email_placeholder: 'Email Address',
      form_email_helper: '(Your email address)',
      form_message_label: 'System Requirements',
      form_message_placeholder: 'Describe your architectural needs...',
      form_message_helper: '(Describe your project or inquiry)',
      submit_btn: 'Execute Transmission',
      submitting_btn: 'Transmitting Data...',
      success_title: 'Packet Delivered',
      success_desc: 'System received your transmission. I will respond via secure channel shortly.',
      success_btn: 'Send another packet',
      error_msg: 'Transmission failed. Please check your network or try again.',
      contact_items: [
        { label: 'Primary Email', helper: 'Direct transmission line' },
        { label: 'Connect', helper: 'Professional network' },
        { label: 'Location', helper: 'WIB (UTC+7)' },
      ],
    },
  },

  // ─────────────────────────── INDONESIAN ───────────────────────────
  ID: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      projects: 'Proyek',
      contact: 'Kontak',
      build: 'Bangun ↗',
    },
    hero: {
      tag: 'Arsitek Sistem',
      title_part1: 'Merancang',
      title_part2: 'Fondasi Digital.',
      desc: 'Berfokus pada pembangunan sistem tangguh yang memberdayakan pengalaman modern melalui performa dan presisi.',
      cta_projects: 'Proyek Saya',
      cta_skills: 'Lihat Keahlian',
    },
    stats: {
      years: 'Tahun Pengalaman',
      systems: 'Sistem Dibangun',
      apis: 'API Dioptimalkan',
      uptime: 'Keandalan Uptime',
    },
    skills: {
      section_title: 'Kemampuan',
      section_title_gradient: 'Teknik',
      section_desc: 'Membangun masa depan dengan tools modern dan arsitektur yang kuat. Stack saya berfokus pada kecepatan, keamanan, dan skalabilitas.',
      learn_more: 'Pelajari Lebih',
      cards: [
        {
          title: 'Arsitektur Proyek',
          description: 'Sistem & Infrastruktur Skalabel',
          content_intro: 'Saya merancang sistem terdistribusi yang tahan lama. Memanfaatkan microservices, pola event-driven, dan containerization, saya membangun lingkungan yang tangguh dan mudah di-scale.',
          infra_title: 'Infrastruktur',
          infra_items: ['Orkestrasi Docker & K8s', 'Message Broker (RabbitMQ/Kafka)', 'gRPC & Protocol Buffer'],
          patterns_title: 'Pola Desain',
          patterns_items: ['Domain-Driven Design (DDD)', 'Event Sourcing / CQRS', 'Arsitektur Berlapis'],
        },
        {
          title: 'Rekayasa Database',
          description: 'Penyimpanan Data Berperforma Tinggi',
          content_intro: 'Dari pemodelan ER hingga optimasi query kompleks, saya memastikan integritas data dan kecepatan di lingkungan SQL maupun NoSQL.',
          items: [
            'Desain & optimasi schema PostgreSQL',
            'Pemodelan NoSQL dengan MongoDB & Redis',
            'Strategi distributed caching',
            'Profiling query & tuning indexing',
          ],
        },
        {
          title: 'Tooling Modern',
          description: 'Alur Kerja Super Cepat',
          content_intro: 'Saya memanfaatkan peningkatan ekosistem terbaru untuk memastikan siklus pengembangan "Lightning Fast" dan bundle produksi yang dioptimalkan.',
          ecosystem_title: 'Ekosistem Modern',
          ecosystem_items: ['Dev server berbasis Vite', 'Vitest untuk unit testing', 'Alur kerja Rapid HMR', 'Optimasi Rollup/ESBuild'],
        },
        {
          title: 'Backend API',
          description: 'Fondasi Kokoh & Type-Safe',
          content_intro: 'Membangun API yang aman, terdokumentasi dengan baik, dan berperforma tinggi menggunakan framework Node.js dan TypeScript modern.',
          items: [
            'Node.js / Express / NestJS',
            'Implementasi TypeScript ketat',
            'Validasi Zod & dokumentasi OpenAPI',
            'Middleware lanjutan & lapisan keamanan',
          ],
        },
        {
          title: 'Keamanan & Auth',
          description: 'Identitas & Penguatan Data',
          content_intro: 'Manajemen identitas yang kokoh dan perlindungan data mengikuti standar OWASP dan protokol keamanan modern.',
          items: [
            'JWT dengan rotasi refresh token',
            'Integrasi OAuth2 & OIDC',
            'Implementasi RBAC & ACL',
            'Enkripsi end-to-end / Hashing',
          ],
        },
        {
          title: 'QA & Pengujian',
          description: 'Stabilitas & Zero-Regression',
          content_intro: 'Menjaga kesehatan kode melalui suite tes otomatis dan pipeline integrasi berkelanjutan.',
          items: [
            'Unit & Integration testing (Vitest)',
            'Skenario E2E (Playwright)',
            'Otomasi pipeline CI/CD',
            'Monitoring coverage & Pelaporan',
          ],
        },
      ],
    },
    experience: {
      section_title: 'Evolusi',
      section_title_italic: 'Profesional',
      section_desc: 'Sejarah membangun sistem tangguh di berbagai industri dan skala.',
      items: [
        {
          title: 'Future Systems Engineer',
          description: 'Fokus pada pembangunan infrastruktur skala besar yang tangguh. Terus mengeksplorasi batas-batas optimasi backend dan desain sistem terdistribusi.',
        },
        {
          title: 'Open Source & Optimasi',
          description: 'Mulai berkontribusi pada ekosistem open source. Membangun library internal untuk manajemen state database yang lebih efisien dan performa tinggi.',
        },
        {
          title: 'Transisi ke Arsitek Sistem',
          description: 'Mulai memahami pentingnya orkestrasi. Mengimplementasikan Docker dan Kubernetes untuk memastikan reliabilitas sistem di berbagai environment.',
        },
        {
          title: 'Menguasai Full Stack',
          description: 'Memperluas keahlian ke frontend dengan Next.js untuk memahami bagaimana API dikonsumsi secara real-time. Membangun dashboard analitik pertama.',
        },
        {
          title: 'Mendalami Database',
          description: 'Membangun project database PostgreSQL pertama yang kompleks. Belajar tentang indexing, query optimization, dan normalisasi data yang benar.',
        },
        {
          title: 'Awal Mula di Terminal',
          description: 'Menulis baris kode pertama di Node.js. Terpesona oleh bagaimana server dapat menangani ribuan permintaan secara asinkron.',
        },
      ],
    },
    projects: {
      section_title: 'Kreasi',
      section_title_italic: 'Terpilih',
      section_desc: 'Sekilas tentang sistem backend yang tangguh dan arsitektur API modern.',
      featured_title: 'Proyek',
      featured_title_gradient: 'Unggulan',
      featured_desc: 'Pameran sistem backend berperforma tinggi, arsitektur terdistribusi, dan solusi API yang kuat.',
      selected_work: 'Karya Pilihan',
      all_projects: 'Semua Proyek',
      explore_archive: 'Jelajahi Semua Arsip',
      interested: 'Tertarik melihat lebih?',
      explore_link: 'Jelajahi arsip lengkap',
    },
    footer: {
      desc: 'Merancang sistem backend berperforma tinggi dengan presisi, skalabilitas, dan desain sistem yang bersih.',
      nav_title: 'Navigasi',
      channels_title: 'Saluran',
      rights: 'Hak cipta dilindungi.',
      system_status: 'Status Sistem: Aktif',
      links: ['Beranda', 'Tentang', 'Proyek', 'Kontak'],
    },
    footerCTA: {
      title: "Siap membangun sesuatu yang luar biasa?",
      desc: "Saya sedang menerima proyek baru dan konsultasi. Mari bicara tentang tantangan backend Anda berikutnya.",
      primary_btn: 'Hire Me →',
      secondary_btn: 'Lihat Proyek',
    },
    about: {
      title: 'Sang Arsitek / Identitas',
      narrative: 'Halo! Saya Muhammad Danindra I. Pendekatan saya dalam rekayasa perangkat lunak didasarkan pada keyakinan bahwa arsitektur terkuat adalah yang tetap tidak terlihat.',
      role: 'Backend Engineer',
      location: 'Jakarta, ID',
      profile_title: 'Profil Saya',
      stats: ['Tahun Pengalaman', 'Sistem Dibangun', 'Peningkatan Performa', 'Keandalan'],
      life_title: 'Hidup di Luar',
      life_italic: 'Terminal.',
      life_desc: 'Ketika tidak mengoptimalkan query database atau merancang microservices, saya biasanya mengeksplorasi teknologi hardware terbaru atau menikmati fotografi urban.',
      learning_title: 'Sedang',
      learning_italic: 'Dipelajari.',
      learning_items: [
        {
          title: 'Rust untuk Sistem',
          desc: 'Mengeksplorasi pemrograman sistem berperforma tinggi dan manajemen memori yang aman.',
        },
        {
          title: 'Sistem Terdistribusi',
          desc: 'Mendalami Algoritma Konsensus (Raft/Paxos) dan model Konsistensi Data.',
        },
      ],
      progress_label: 'Progres',
      hobbies: ['Fotografi', 'Hardware', 'Seduh Kopi', 'Lo-Fi Beats'],
    },
    contact: {
      title_line1: 'Ayo rancang',
      title_line2: 'masa depan.',
      desc: 'Punya tantangan backend yang kompleks atau sistem skala besar dalam pikiran? Saya siap membantu Anda membangun fondasi yang tangguh.',
      availability_status: 'Status Sistem',
      availability_title: 'Tersedia untuk Proyek',
      availability_desc: 'Terbuka untuk proyek baru dan kolaborasi teknis. Siap merancang sistem yang tangguh.',
      timezone_label: 'Zona Waktu',
      response_label: 'Respons',
      terminal_nodes: 'Node Terminal',
      form_name_label: 'Identifikasi',
      form_name_placeholder: 'Nama Anda',
      form_name_helper: '(Nama lengkap Anda)',
      form_email_label: 'Jalur Balik',
      form_email_placeholder: 'Alamat Email',
      form_email_helper: '(Alamat email Anda)',
      form_message_label: 'Kebutuhan Sistem',
      form_message_placeholder: 'Jelaskan kebutuhan arsitektur Anda...',
      form_message_helper: '(Jelaskan proyek atau pertanyaan Anda)',
      submit_btn: 'Kirim Transmisi',
      submitting_btn: 'Mengirim Data...',
      success_title: 'Pesan Terkirim',
      success_desc: 'Sistem menerima transmisi Anda. Saya akan merespons melalui saluran aman sebentar lagi.',
      success_btn: 'Kirim pesan lain',
      error_msg: 'Transmisi gagal. Periksa jaringan Anda atau coba lagi.',
      contact_items: [
        { label: 'Email Utama', helper: 'Jalur transmisi langsung' },
        { label: 'Terhubung', helper: 'Jaringan profesional' },
        { label: 'Lokasi', helper: 'WIB (UTC+7)' },
      ],
    },
  },

  // ─────────────────────────── CHINESE ───────────────────────────
  ZH: {
    nav: {
      home: '首页',
      about: '关于',
      projects: '项目',
      contact: '联系',
      build: '构建 ↗',
    },
    hero: {
      tag: '系统架构师',
      title_part1: '构建',
      title_part2: '数字基础。',
      desc: '专注于构建弹性系统，通过性能和精确度赋能现代体验。',
      cta_projects: '我的项目',
      cta_skills: '查看技能',
    },
    stats: {
      years: '年经验',
      systems: '系统构建',
      apis: 'API优化',
      uptime: '运行可靠性',
    },
    skills: {
      section_title: '工程',
      section_title_gradient: '专业能力',
      section_desc: '用现代工具和强大架构构建未来。我的技术栈专注于速度、安全性和可扩展性。',
      learn_more: '了解更多',
      cards: [
        {
          title: '项目架构',
          description: '可扩展系统与基础设施',
          content_intro: '我设计经得起时间考验的分布式系统。利用微服务、事件驱动模式和容器化技术，构建弹性且易于扩展的环境。',
          infra_title: '基础设施',
          infra_items: ['Docker & K8s 编排', '消息中间件 (RabbitMQ/Kafka)', 'gRPC & Protocol Buffers'],
          patterns_title: '设计模式',
          patterns_items: ['领域驱动设计 (DDD)', '事件溯源 / CQRS', '分层架构'],
        },
        {
          title: '数据库工程',
          description: '高性能数据存储',
          content_intro: '从ER建模到复杂查询优化，我确保SQL和NoSQL环境下的数据完整性和速度。',
          items: [
            'PostgreSQL 架构设计与优化',
            'MongoDB & Redis NoSQL 建模',
            '分布式缓存策略',
            '查询分析与索引调优',
          ],
        },
        {
          title: '现代工具链',
          description: '闪电般的工作流',
          content_intro: '我利用最新的生态系统改进，确保"极速"开发周期和优化的生产包。',
          ecosystem_title: '现代生态系统',
          ecosystem_items: ['Vite 驱动的开发服务器', 'Vitest 单元测试', '快速 HMR 工作流', 'Rollup/ESBuild 优化'],
        },
        {
          title: '后端 API',
          description: '类型安全的稳固基础',
          content_intro: '使用现代 Node.js 和 TypeScript 框架构建安全、文档完善、高性能的 API。',
          items: [
            'Node.js / Express / NestJS',
            '严格的 TypeScript 实现',
            'Zod 验证 & OpenAPI 文档',
            '高级中间件 & 安全层',
          ],
        },
        {
          title: '安全与认证',
          description: '身份与数据加固',
          content_intro: '遵循 OWASP 标准和现代安全协议的防弹级身份管理和数据保护。',
          items: [
            'JWT 刷新令牌轮换',
            'OAuth2 & OIDC 集成',
            'RBAC & ACL 实现',
            '端到端加密 / 哈希',
          ],
        },
        {
          title: 'QA & 测试',
          description: '稳定性与零回归',
          content_intro: '通过自动化测试套件和持续集成流水线维护代码健康。',
          items: [
            '单元 & 集成测试 (Vitest)',
            'E2E 场景 (Playwright)',
            'CI/CD 流水线自动化',
            '覆盖率监控 & 报告',
          ],
        },
      ],
    },
    experience: {
      section_title: '职业',
      section_title_italic: '成长历程',
      section_desc: '跨各行业和规模构建弹性系统的历史。',
      items: [
        {
          title: '未来系统工程师',
          description: '专注于构建大规模弹性基础设施。持续探索后端优化和分布式系统设计的边界。',
        },
        {
          title: '开源与优化',
          description: '开始为开源生态系统做贡献。构建内部库用于更高效的数据库状态管理和高性能。',
        },
        {
          title: '转型为系统架构师',
          description: '开始理解编排的重要性。实施 Docker 和 Kubernetes 以确保各种环境下系统的可靠性。',
        },
        {
          title: '掌握全栈开发',
          description: '将专业知识扩展到 Next.js 前端，了解 API 如何实时消费。构建了第一个分析仪表板。',
        },
        {
          title: '深入数据库',
          description: '构建了第一个复杂的 PostgreSQL 数据库项目。学习了索引、查询优化和正确的数据规范化。',
        },
        {
          title: '终端的起点',
          description: '在 Node.js 中编写了第一行代码。被服务器如何异步处理数千个请求所深深吸引。',
        },
      ],
    },
    projects: {
      section_title: '精选',
      section_title_italic: '作品',
      section_desc: '一瞥强大的后端系统和现代 API 架构。',
      featured_title: '精选',
      featured_title_gradient: '项目',
      featured_desc: '高性能后端系统、分布式架构和强大 API 解决方案的展示。',
      selected_work: '精选作品',
      all_projects: '全部项目',
      explore_archive: '探索完整存档',
      interested: '想了解更多？',
      explore_link: '探索完整存档',
    },
    footer: {
      desc: '以精确、可扩展性和简洁系统设计构建高性能后端系统。',
      nav_title: '导航',
      channels_title: '渠道',
      rights: '版权所有。',
      system_status: '系统状态：运行中',
      links: ['首页', '关于', '项目', '联系'],
    },
    footerCTA: {
      title: "准备好构建伟大的东西了吗？",
      desc: "我目前接受新项目和咨询询问。让我们谈谈您的下一个后端挑战。",
      primary_btn: '雇用我 →',
      secondary_btn: '查看项目',
    },
    about: {
      title: '架构师 / 身份',
      narrative: '你好！我是 Muhammad Danindra I。我的软件工程方法基于这样一个信念：最强大的架构是那些保持隐形的架构。',
      role: '后端工程师',
      location: '雅加达, 印尼',
      profile_title: '我的档案',
      stats: ['年经验', '系统构建', '性能提升', '可靠性'],
      life_title: '终端之外的',
      life_italic: '生活。',
      life_desc: '当我不在优化数据库查询或设计微服务时，你可能会发现我在探索最新的硬件技术或享受城市摄影。',
      learning_title: '正在',
      learning_italic: '学习。',
      learning_items: [
        {
          title: 'Rust 系统编程',
          desc: '探索高性能系统编程和安全内存管理。',
        },
        {
          title: '分布式系统',
          desc: '深入研究共识算法 (Raft/Paxos) 和数据一致性模型。',
        },
      ],
      progress_label: '进度',
      hobbies: ['摄影', '硬件', '咖啡冲泡', '低保真音乐'],
    },
    contact: {
      title_line1: '让我们共同设计',
      title_line2: '未来。',
      desc: '有复杂的后端挑战或大规模系统想法？我随时准备帮助您构建弹性基础。',
      availability_status: '系统状态',
      availability_title: '可接受项目',
      availability_desc: '开放接受新项目和技术合作。准备好设计弹性系统。',
      timezone_label: '时区',
      response_label: '响应时间',
      terminal_nodes: '终端节点',
      form_name_label: '身份识别',
      form_name_placeholder: '您的姓名',
      form_name_helper: '（您的全名）',
      form_email_label: '返回路径',
      form_email_placeholder: '电子邮件地址',
      form_email_helper: '（您的电子邮件地址）',
      form_message_label: '系统需求',
      form_message_placeholder: '描述您的架构需求...',
      form_message_helper: '（描述您的项目或询问）',
      submit_btn: '执行传输',
      submitting_btn: '正在传输数据...',
      success_title: '数据包已送达',
      success_desc: '系统已收到您的传输。我将很快通过安全频道回复。',
      success_btn: '发送另一个数据包',
      error_msg: '传输失败。请检查您的网络或重试。',
      contact_items: [
        { label: '主要邮箱', helper: '直接传输线路' },
        { label: '连接', helper: '专业网络' },
        { label: '位置', helper: 'WIB (UTC+7)' },
      ],
    },
  },
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
      if (result !== undefined && result !== null && result[key] !== undefined) {
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
