import Hero from '@/components/sections/Hero';
import FeaturedSkills from '@/components/sections/FeaturedSkills';
import Stats from '@/components/sections/Stats';
import ProjectPreview from '@/components/sections/ToolsWorkflow';
import TechMarquee from '@/components/sections/TechMarquee';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FooterCTA from '@/components/sections/FooterCTA';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Danindra I',
    jobTitle: 'Backend Systems Engineer',
    description: 'Professional backend developer specializing in Node.js, TypeScript, and scalable system architecture',
    url: 'https://danindra.dev',
    sameAs: [
      'https://github.com/danindra',
      'https://linkedin.com/in/danindra',
      'https://twitter.com/danindra',
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero — full screen intro with profile card */}
      <Hero />

      {/* 2. Marquee — scrolling tech logos strip */}
      <TechMarquee />

      {/* Stats Section */}
      <Stats />

      {/* 3. Skills — core expertise grid */}
      <FeaturedSkills />

      {/* 4. Projects — selected work preview */}
      <ProjectPreview />

      {/* 5. CTA — bottom call-to-action */}
      <FooterCTA />
    </main>
  );
}