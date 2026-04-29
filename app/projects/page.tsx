import React from 'react';
import { Metadata } from 'next';
import { projects, getAllCategories } from '@/lib/data/projects';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects | Muhammad Danindra I',
  description: 'A collection of backend systems and APIs built with Node.js, TypeScript, and modern backend architecture.',
};

export default function ProjectsPage() {
  const categories = getAllCategories();
  const totalTechs = Array.from(new Set(projects.flatMap(p => p.techStack))).length;

  return (
    <ProjectsClient 
      projects={projects} 
      categories={categories} 
      totalTechs={totalTechs} 
    />
  );
}