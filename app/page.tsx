import Hero from '@/components/sections/Hero';
import FeaturedSkills from '@/components/sections/FeaturedSkills';
import Stats from '@/components/sections/Stats';
import ProjectPreview from '@/components/sections/ToolsWorkflow';
import TechMarquee from '@/components/sections/TechMarquee';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
      <ScrollReveal>
        <section className="bg-[var(--section-bg-alt)] py-24 sm:py-32 border-t border-[var(--border-primary)]">
          <div className="container-custom text-center">
            <h2
              className="text-[var(--text-primary)] font-bold mb-6 leading-none tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Ready to build{' '}
              <span className="gradient-text">the future?</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10 text-lg leading-relaxed">
              Currently accepting new projects and consulting opportunities.
              Let's create something exceptional together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--accent-purple)] text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[var(--accent-violet)] transition-all duration-300 shadow-xl"
            >
              Start a Conversation →
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}