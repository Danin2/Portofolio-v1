export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Tutorial' | 'Best Practices' | 'Case Study' | 'Architecture' | 'Tips';
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
  featured: boolean;
  coverImage?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}