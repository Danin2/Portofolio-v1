'use client';

import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { blogPosts, getAllCategories } from '@/lib/data/blog-posts';
import Link from 'next/link';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...getAllCategories()];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-h1 font-bold">
            Technical <span className="text-accent-blue">Blog</span>
          </h1>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            Insights, tutorials, and case studies about Frontend development,
            system design, and software engineering best practices.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
            <div className="bg-bg-secondary p-4 rounded-lg border border-bg-tertiary">
              <div className="text-h2 font-bold text-accent-blue">{blogPosts.length}</div>
              <div className="text-sm text-text-secondary">Articles</div>
            </div>
            <div className="bg-bg-secondary p-4 rounded-lg border border-bg-tertiary">
              <div className="text-h2 font-bold text-accent-green">
                {Array.from(new Set(blogPosts.flatMap(p => p.tags))).length}
              </div>
              <div className="text-sm text-text-secondary">Topics</div>
            </div>
            <div className="bg-bg-secondary p-4 rounded-lg border border-bg-tertiary col-span-2 md:col-span-1">
              <div className="text-h2 font-bold text-accent-yellow">{categories.length - 1}</div>
              <div className="text-sm text-text-secondary">Categories</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Filter Section */}
      <Section className="bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-custom ${selectedCategory === category
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/80'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section>
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} hover className="flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="success">{post.category}</Badge>
                    <span className="text-xs text-text-muted">{post.readingTime} min read</span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-h4 font-semibold mb-2 hover:text-accent-blue transition-custom cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-body-sm text-text-secondary mb-4 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-bg-tertiary text-xs rounded font-mono text-text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-bg-tertiary text-xs text-text-muted">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>

                  {/* CTA */}
                  <Link href={`/blog/${post.slug}`} className="mt-4">
                    <Button variant="outline" className="w-full">
                      Read Article
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}