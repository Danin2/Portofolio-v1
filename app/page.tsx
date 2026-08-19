import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';

const TechMarquee = dynamic(() => import('@/components/sections/TechMarquee'), {
  loading: () => <div className="h-20 bg-[var(--section-bg-alt)] animate-pulse" />
});


const FeaturedSkills = dynamic(() => import('@/components/sections/FeaturedSkills'), {
  loading: () => <div className="h-96 bg-[var(--section-bg)] animate-pulse" />
});

const ProjectPreview = dynamic(() => import('@/components/sections/ToolsWorkflow'), {
  loading: () => <div className="h-96 bg-[var(--bg-primary)] animate-pulse" />
});

const FooterCTA = dynamic(() => import('@/components/sections/FooterCTA'), {
  loading: () => <div className="h-48 bg-[var(--bg-primary)] animate-pulse" />
});

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Danindra I',
    jobTitle: 'Frontend Systems Engineer',
    description: 'Professional Frontend developer specializing in Node.js, TypeScript, and scalable system architecture',
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

      {/* 3. Skills — core expertise grid */}
      <FeaturedSkills />

      {/* 4. Projects — selected work preview */}
      <ProjectPreview />

      {/* 5. CTA — bottom call-to-action */}
      <FooterCTA />
    </main>
  );
}