export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: 'API' | 'Full-Stack' | 'Microservices' | 'Database' | 'DevOps';
  featured: boolean;
  thumbnail: string;
  images: string[];
  techStack: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  architecture: string;
  githubUrl?: string;
  liveUrl?: string;
  demoVideo?: string;
  createdAt: string;
  completedAt: string;
}

export interface ProjectStats {
  totalProjects: number;
  totalTechnologies: number;
  projectsByCategory: {
    category: string;
    count: number;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  tags: string[];
}