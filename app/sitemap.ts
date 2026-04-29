import { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourwebsite.com';

  const staticPages = [
    { url: baseUrl,                  lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`,       lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/projects`,    lastModified: new Date(), changeFrequency: 'weekly'  as const, priority: 0.9 },
    { url: `${baseUrl}/contact`,     lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.completedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}