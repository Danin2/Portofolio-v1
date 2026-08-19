import React from 'react';
import { notFound } from 'next/navigation';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getPostBySlug, blogPosts, getRelatedPosts } from '@/lib/data/blog-posts';
import Link from 'next/link';

// Generate static params
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          {/* Category & Reading Time */}
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="success">{post.category}</Badge>
            <span className="text-sm text-text-muted">{post.readingTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-h1 font-bold mb-4">{post.title}</h1>

          {/* Excerpt */}
          <p className="text-body-lg text-text-secondary leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <span>By {post.author}</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-bg-tertiary text-text-secondary text-sm rounded-lg font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Content Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Render Markdown-like content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: formatContent(post.content)
              }}
            />
          </div>
        </div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section className="bg-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-bold mb-8">Related Articles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} hover>
                  <Badge variant="success" className="mb-3">
                    {relatedPost.category}
                  </Badge>

                  <Link href={`/blog/${relatedPost.slug}`}>
                    <h3 className="text-h4 font-semibold mb-2 hover:text-accent-blue transition-custom">
                      {relatedPost.title}
                    </h3>
                  </Link>

                  <p className="text-body-sm text-text-secondary mb-4 leading-relaxed line-clamp-3">
                    {relatedPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{relatedPost.readingTime} min read</span>
                    <span>
                      {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-h2 font-bold">Want to Learn More?</h2>
          <p className="text-body-lg text-text-secondary">
            Check out more articles or get in touch to discuss Frontend development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/blog">
              Read More Articles
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Get In Touch
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

// Helper function to format markdown-like content to HTML
function formatContent(content: string): string {
  let html = content;

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-h3 font-bold mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-h2 font-bold mt-10 mb-6">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-h1 font-bold mt-12 mb-6">$1</h1>');

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
    return `<pre class="bg-bg-tertiary p-4 rounded-lg overflow-x-auto my-6 border border-bg-tertiary"><code class="text-accent-green font-mono text-sm">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Convert inline code
  html = html.replace(/`([^`]+)`/gim, '<code class="bg-bg-tertiary px-2 py-1 rounded text-accent-green font-mono text-sm">$1</code>');

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-text-primary">$1</strong>');

  // Convert bullet points
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-4 space-y-2">$1</ul>');

  // Convert paragraphs
  html = html.replace(/^(?!<[h|u|p|l])(.*$)/gim, '<p class="mb-4 leading-relaxed text-text-secondary">$1</p>');

  // Convert checkmarks
  html = html.replace(/✅/g, '<span class="text-accent-green">✅</span>');
  html = html.replace(/❌/g, '<span class="text-accent-red">❌</span>');

  return html;
}

// Helper to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}