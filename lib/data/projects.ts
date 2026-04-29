import { Project } from '@/types/project';

// Tech stack icon/color map for rich badge display
export const TECH_META: Record<string, { icon: string; color: string; bg: string }> = {
  'Node.js':       { icon: '⬢',  color: '#6DA55F', bg: 'rgba(109,165,95,0.10)' },
  'Express.js':    { icon: '⚡',  color: '#999999', bg: 'rgba(153,153,153,0.10)' },
  'NestJS':        { icon: '🐺',  color: '#E0234E', bg: 'rgba(224,35,78,0.10)'  },
  'PostgreSQL':    { icon: '🐘',  color: '#336791', bg: 'rgba(51,103,145,0.10)' },
  'MySQL':         { icon: '🐬',  color: '#4479A1', bg: 'rgba(68,121,161,0.10)' },
  'MongoDB':       { icon: '🍃',  color: '#47A248', bg: 'rgba(71,162,72,0.10)'  },
  'Redis':         { icon: '🔴',  color: '#DC382D', bg: 'rgba(220,56,45,0.10)'  },
  'Docker':        { icon: '🐳',  color: '#2496ED', bg: 'rgba(36,150,237,0.10)' },
  'Kubernetes':    { icon: '☸️',  color: '#326CE5', bg: 'rgba(50,108,229,0.10)' },
  'RabbitMQ':      { icon: '🐇',  color: '#FF6600', bg: 'rgba(255,102,0,0.10)'  },
  'Nginx':         { icon: '🌐',  color: '#009900', bg: 'rgba(0,153,0,0.10)'    },
  'JWT':           { icon: '🔑',  color: '#D63AFF', bg: 'rgba(214,58,255,0.10)' },
  'Stripe API':    { icon: '💳',  color: '#6772E5', bg: 'rgba(103,114,229,0.10)'},
  'Socket.io':     { icon: '🔌',  color: '#010101', bg: 'rgba(200,200,200,0.10)'},
  'React':         { icon: '⚛️',  color: '#61DAFB', bg: 'rgba(97,218,251,0.10)' },
  'TypeScript':    { icon: '📘',  color: '#3178C6', bg: 'rgba(49,120,198,0.10)' },
  'TypeORM':       { icon: '🗂️',  color: '#E83524', bg: 'rgba(232,53,36,0.10)'  },
  'Swagger':       { icon: '📖',  color: '#85EA2D', bg: 'rgba(133,234,45,0.10)' },
  'Jest':          { icon: '🃏',  color: '#C21325', bg: 'rgba(194,19,37,0.10)'  },
  'Prisma':        { icon: '🔷',  color: '#2D3748', bg: 'rgba(45,55,72,0.10)'   },
  'GraphQL':       { icon: '◈',   color: '#E10098', bg: 'rgba(225,0,152,0.10)'  },
  'Commander.js':  { icon: '⌨️',  color: '#8A2BE2', bg: 'rgba(138,43,226,0.10)' },
  'Kafka':         { icon: '📨',  color: '#231F20', bg: 'rgba(100,100,100,0.10)'},
  'Terraform':     { icon: '🏗️',  color: '#7B42BC', bg: 'rgba(123,66,188,0.10)' },
  'AWS':           { icon: '☁️',  color: '#FF9900', bg: 'rgba(255,153,0,0.10)'  },
  'CI/CD':         { icon: '🔄',  color: '#0ACF83', bg: 'rgba(10,207,131,0.10)' },
  'GitHub Actions':{ icon: '⚙️',  color: '#2088FF', bg: 'rgba(32,136,255,0.10)' },
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce REST API',
    slug: 'ecommerce-rest-api',
    shortDescription:
      'High-performance REST API powering a full e-commerce platform with JWT auth, Stripe payments, real-time inventory, and Redis caching.',
    fullDescription:
      'A production-ready e-commerce backend engineered with Node.js and Express.js. The system handles thousands of concurrent users via connection pooling and Redis caching layers. Core modules include a complete authentication/authorization flow using JWT refresh token rotation, a product catalog with full CRUD + image upload to cloud storage, a cart engine with session persistence, and a checkout pipeline wired to Stripe—handling webhooks for payment confirmations, refunds, and disputes. The admin API layer surfaces reporting endpoints for order analytics, inventory alerts, and revenue dashboards.',
    category: 'API',
    featured: true,
    thumbnail: '/projects/ecommerce-api.jpg',
    images: ['/projects/ecommerce-1.jpg', '/projects/ecommerce-2.jpg'],
    techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Stripe API', 'Redis', 'Docker'],
    features: [
      'JWT authentication with refresh-token rotation & blacklisting',
      'Product catalog: CRUD, image upload, multi-variant support',
      'Shopping cart engine with Redis-backed session persistence',
      'Order lifecycle management with real-time status tracking',
      'Stripe payment integration with full webhook handling',
      'Automated inventory deduction & restock alerts',
      'Role-based admin API: analytics, revenue, user management',
      'Rate limiting, helmet security headers & request validation',
    ],
    challenges: [
      'Preventing overselling under high-concurrency flash sales',
      'Reliable payment state synchronisation via Stripe webhooks',
      'Keeping query latency low as product catalogue grew to 50k+ SKUs',
      'Maintaining cart consistency across distributed sessions',
    ],
    solutions: [
      'Wrapped inventory deductions in PostgreSQL advisory locks & transactions',
      'Idempotency keys + webhook signature verification for payment events',
      'Composite indexes on product filters + full-text search with pg_trgm',
      'Redis TTL-scoped cart keys with atomic Lua scripts for updates',
    ],
    architecture:
      'MVC + Service-Repository layers on Express.js. PostgreSQL (primary store) with read replicas for analytics. Redis for caching, session storage, and rate-limit counters. Docker-composed for local dev; production deploys via containerised CI/CD.',
    githubUrl: 'https://github.com/yourusername/ecommerce-api',
    liveUrl: 'https://api.ecommerce-demo.com',
    createdAt: '2024-01-15',
    completedAt: '2024-03-20',
  },
  {
    id: '2',
    title: 'Real-Time Chat Application',
    slug: 'realtime-chat-app',
    shortDescription:
      'WebSocket-powered messaging platform supporting private & group chats, typing indicators, file sharing, and horizontal multi-server scaling.',
    fullDescription:
      'A full-stack real-time communication system built on Socket.io and Node.js with a React frontend. The architecture supports stateless horizontal scaling by routing all socket events through a Redis pub/sub adapter, making it trivial to add server replicas behind a load balancer. Messages are persisted in MongoDB with paginated history retrieval and compound indexes on room + timestamp. The notification pipeline uses a separate worker process to deliver push alerts when recipients are offline. End-to-end message delivery guarantees are handled via ACK-based transport with automatic client reconnection.',
    category: 'Full-Stack',
    featured: true,
    thumbnail: '/projects/chat-app.jpg',
    images: ['/projects/chat-1.jpg', '/projects/chat-2.jpg'],
    techStack: ['Node.js', 'Socket.io', 'MongoDB', 'Express.js', 'React', 'Redis', 'JWT'],
    features: [
      'Real-time bidirectional messaging via Socket.io',
      'Private DMs and multi-user group rooms',
      'Typing indicators, presence (online/away/offline)',
      'Read receipts with per-message delivery status',
      'File & image sharing with presigned upload URLs',
      'Paginated message history with infinite scroll',
      'Push notifications via service worker for offline users',
      'End-to-end JWT authentication for socket handshake',
    ],
    challenges: [
      'Scaling WebSocket connections across multiple Node processes',
      'Guaranteeing message delivery when clients disconnect mid-send',
      'Efficient bulk history retrieval without N+1 queries',
      'Keeping presence state consistent across instances',
    ],
    solutions: [
      'Redis Socket.io adapter for cross-instance event broadcast',
      'Client-side ACK queue with exponential back-off retry',
      'Compound (roomId, createdAt) index + cursor-based pagination in MongoDB',
      'Centralised presence table in Redis with heartbeat TTL expiry',
    ],
    architecture:
      'Event-driven architecture: Socket.io server clusters communicate via Redis pub/sub. MongoDB stores messages with TTL archival. React SPA connects via persistent WebSocket with auto-reconnect. Worker process handles async push notifications.',
    githubUrl: 'https://github.com/yourusername/chat-app',
    liveUrl: 'https://chat-demo.com',
    createdAt: '2023-09-10',
    completedAt: '2023-11-15',
  },
  {
    id: '3',
    title: 'Task Management API',
    slug: 'task-management-api',
    shortDescription:
      'Robust NestJS API for project & task tracking with RBAC, Swagger docs, file attachments, activity logs, and comprehensive test coverage.',
    fullDescription:
      'An enterprise-grade task management backend built with NestJS and the service-repository pattern. The system supports hierarchical workspaces: organisations → projects → tasks → subtasks, each with configurable role-based permissions (Owner, Admin, Member, Viewer). All mutations emit structured audit log events consumed by an asynchronous logger module. File attachments are stored in S3-compatible object storage with presigned URL generation. The API surface is fully documented with OpenAPI/Swagger and covered by both unit tests (Jest) and integration tests (Supertest against a test PostgreSQL instance run inside Docker).',
    category: 'API',
    featured: true,
    thumbnail: '/projects/task-api.jpg',
    images: ['/projects/task-1.jpg', '/projects/task-2.jpg'],
    techStack: ['Node.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'JWT', 'Swagger', 'Jest'],
    features: [
      'Hierarchical workspace: Organisation → Project → Task → Subtask',
      'Fine-grained RBAC with NestJS Guards & custom decorators',
      'Task assignment, priority levels, due dates & status workflows',
      'File attachments via S3 + presigned URL generation',
      'Real-time activity log & full audit trail per workspace',
      'Full-text search & multi-field filtering on task lists',
      'OpenAPI / Swagger docs auto-generated from decorators',
      'Unit + integration test suite with 85%+ code coverage',
    ],
    challenges: [
      'Designing a flexible permission model without performance degradation',
      'Preventing circular dependencies in a deeply modular NestJS app',
      'Handling file upload atomicity (DB record + S3 object)',
      'Keeping test suites fast and deterministic in CI',
    ],
    solutions: [
      'Bit-flag permission matrix stored on membership rows; indexed lookups',
      'Barrel exports + forwardRef() where cyclic injection was unavoidable',
      'Two-phase commit: DB record first, S3 upload on success, rollback on failure',
      'Dockerised PostgreSQL test container spun up per test suite via Jest globalSetup',
    ],
    architecture:
      'Modular NestJS monolith with Clean Architecture layers. TypeORM + PostgreSQL. S3-compatible storage for files. JWT with asymmetric RS256 keys. Docker Compose for dev + test environments.',
    githubUrl: 'https://github.com/yourusername/task-api',
    createdAt: '2023-06-01',
    completedAt: '2023-08-15',
  },
  {
    id: '4',
    title: 'Microservices Blog Platform',
    slug: 'microservices-blog',
    shortDescription:
      'Distributed content platform built with independent microservices for auth, posts, comments & media—wired via RabbitMQ and an Nginx API Gateway.',
    fullDescription:
      'A blog platform decomposed into four autonomous microservices: Auth Service (JWT issuance & refresh), Posts Service (CRUD, drafts, scheduling), Comments Service (threading, moderation), and Media Service (image processing & CDN delivery). All services communicate asynchronously through RabbitMQ topic exchanges, implementing the Saga pattern for distributed consistency. An Nginx-based API Gateway handles TLS termination, routing, and rate limiting. Each service owns its own MongoDB database, eliminating shared-schema coupling. The entire stack is containerised with Docker and orchestrated locally via Docker Compose.',
    category: 'Microservices',
    featured: false,
    thumbnail: '/projects/blog-micro.jpg',
    images: ['/projects/blog-1.jpg'],
    techStack: ['Node.js', 'Express.js', 'Docker', 'RabbitMQ', 'MongoDB', 'Redis', 'Nginx'],
    features: [
      'Four independent microservices with database-per-service isolation',
      'Asynchronous inter-service events via RabbitMQ topic exchanges',
      'Nginx API Gateway: TLS, routing, rate limiting, load balancing',
      'Saga pattern for cross-service transactions (publish → notify → index)',
      'Outbox pattern to prevent dual-write inconsistencies',
      'Redis distributed cache for hot post data',
      'Circuit-breaker & health-check endpoints on every service',
      'Fully containerised with Docker Compose for local development',
    ],
    challenges: [
      'Maintaining data consistency when services process events out-of-order',
      'Tracing a single request across four independent services',
      'Handling partial failures mid-saga without leaving stale state',
      'Avoiding tight coupling as feature requirements evolved',
    ],
    solutions: [
      'Optimistic locking + idempotency keys on all event consumers',
      'Correlation IDs propagated via message headers + structured logging',
      'Compensating transactions defined for each Saga step',
      'Domain-event-first API design isolating shared contracts from internals',
    ],
    architecture:
      'Microservices with Nginx API Gateway. Each service: Node.js + Express + MongoDB. Async messaging via RabbitMQ. Redis shared cache. Docker Compose orchestration. Structured JSON logs aggregated centrally.',
    githubUrl: 'https://github.com/yourusername/blog-microservices',
    createdAt: '2023-03-01',
    completedAt: '2023-05-30',
  },
  {
    id: '5',
    title: 'Database Migration CLI Tool',
    slug: 'database-migration-tool',
    shortDescription:
      'TypeScript CLI for managing schema migrations across PostgreSQL & MySQL with version control, dependency graphs, and transactional rollbacks.',
    fullDescription:
      'A developer-friendly command-line tool for schema version management, inspired by Flyway but built to support runtime-configurable multi-database targets from a single migration directory. Migrations are TypeScript files exporting `up()` and `down()` functions, giving full programmatic control. The tool builds a DAG (Directed Acyclic Graph) from migration metadata to resolve execution order and detect circular dependencies before running. All migrations execute inside a database transaction—failures trigger automatic rollback. A migration history table tracks applied versions, timestamps, and checksums to detect tampering.',
    category: 'Database',
    featured: false,
    thumbnail: '/projects/migration-tool.jpg',
    images: [],
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'MySQL', 'Commander.js'],
    features: [
      'TypeScript-based migration files with up() / down() functions',
      'DAG resolution for migration dependency ordering',
      'Circular dependency detection before execution',
      'Transactional migrations with automatic rollback on error',
      'Checksum verification to detect post-apply file tampering',
      'Migration history table with applied timestamps & author metadata',
      'Multi-database support: PostgreSQL & MySQL via adapter pattern',
      'Interactive CLI built with Commander.js (migrate, rollback, status, diff)',
    ],
    challenges: [
      'Supporting divergent SQL syntax between PostgreSQL and MySQL',
      'Ensuring rollback safety when migrations contain DDL statements',
      'Detecting dependency cycles in user-defined migration graphs',
      'Preventing concurrent migration runs in CI environments',
    ],
    solutions: [
      'Database adapter pattern abstracts dialect-specific syntax',
      'Savepoint-based rollback strategy for DDL in PostgreSQL; dry-run mode for MySQL',
      "Kahn's algorithm for topological sort with cycle error reporting",
      'Advisory lock acquired at migration start; released on completion/error',
    ],
    architecture:
      'CLI tool with adapter pattern for database driver abstraction. DAG engine for migration ordering. Transaction manager wraps every migration run. SQLite tracks migration state in local dev; the target DB history table governs production.',
    githubUrl: 'https://github.com/yourusername/db-migration-tool',
    createdAt: '2023-01-10',
    completedAt: '2023-02-20',
  },
];

// Helper functions
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(p => p.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(projects.map(p => p.category)));
};

export const getTotalTechs = (): number => {
  return Array.from(new Set(projects.flatMap(p => p.techStack))).length;
};