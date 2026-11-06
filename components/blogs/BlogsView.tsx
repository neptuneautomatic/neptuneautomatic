'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BLOG_CATEGORIES, BlogCategory, ALL_BLOG_POSTS } from '@/data/blogsData';

interface Props {
  initialPosts?: BlogPost[];
}

export default function BlogsView({ initialPosts = ALL_BLOG_POSTS }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialPosts.length };
    initialPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [initialPosts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialPosts.filter((post) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      if (!matchesCategory) return false;

      // Search query filter (title, excerpt, category, author, date)
      if (!query) return true;
      const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author} ${post.date}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="blogs-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Resources &amp; Technical Blogs</span>
        </nav>

        {/* Hero Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #162447 60%, #1E3A8A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2.5rem, 5vw, 3.75rem) clamp(1.5rem, 4vw, 3rem)',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(10, 17, 40, 0.2)',
          }}
        >
          <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(86, 172, 221, 0.18)',
                border: '1px solid rgba(86, 172, 221, 0.4)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#56ACDD',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Engineering Knowledge &amp; Research
            </span>
            <h1
              className="force-white-heading"
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1.25rem',
                color: '#FFFFFF',
                WebkitTextFillColor: '#FFFFFF',
              }}
            >
              Neptune Automatic Knowledge Center &amp;<br />
              <span style={{ color: '#56ACDD' }}>Technical Articles &amp; Research</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                color: '#FFFFFF',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Comprehensive articles, case studies, technology guides, and architectural overviews across India&apos;s leading access automation, smart parking solutions, hostile vehicle mitigation bollards, and entrance security hardware.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SEARCH FILTER BAR (Search within Blogs Only)
           ========================================================================= */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 2rem auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '9999px',
              border: '2px solid #E2E8F0',
              boxShadow: '0 4px 16px rgba(1, 53, 139, 0.08)',
              padding: '0.35rem 0.6rem 0.35rem 1.25rem',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
          >
            {/* Search Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-logo-blue, #01358b)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginRight: '0.75rem' }}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs by topic, boom barrier, bollard, sensor, parking..."
              aria-label="Search blogs"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: "'Lexend', sans-serif",
                fontSize: '0.95rem',
                color: '#1E293B',
                padding: '0.55rem 0',
              }}
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear blog search"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  padding: '0.4rem 0.6rem',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Clear Search"
              >
                &times;
              </button>
            )}

            {/* Search Badge Counter */}
            <span
              style={{
                background: 'rgba(1, 53, 139, 0.08)',
                color: 'var(--color-logo-blue, #01358b)',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                marginLeft: '0.25rem',
              }}
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* =========================================================================
            CATEGORY FILTER (Center Aligned on Top of Blog Listing)
           ========================================================================= */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '3rem',
            textAlign: 'center',
          }}
          role="tablist"
          aria-label="Blog Categories"
        >
          {BLOG_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  border: isActive ? '1.5px solid var(--color-logo-blue, #01358b)' : '1.5px solid #CBD5E1',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--color-logo-blue, #01358b) 0%, #1a2f6c 100%)'
                    : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#334155',
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(1, 53, 139, 0.25)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{category}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.1rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#64748B',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter State Notice */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#475569' }}>
              Filtering by:{' '}
              {selectedCategory !== 'All' && (
                <strong style={{ color: 'var(--color-logo-blue)' }}>
                  Category: &ldquo;{selectedCategory}&rdquo;{' '}
                </strong>
              )}
              {searchQuery && (
                <strong style={{ color: 'var(--color-logo-blue)' }}>
                  Keyword: &ldquo;{searchQuery}&rdquo;{' '}
                </strong>
              )}
              ({filteredPosts.length} matching {filteredPosts.length === 1 ? 'result' : 'results'})
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-logo-red, #D32628)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* =========================================================================
            BLOGS GRID (36 Authentic Posts)
           ========================================================================= */}
        {filteredPosts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem',
              marginBottom: '4.5rem',
            }}
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-article-card"
                style={{
                  background: 'var(--theme-bg-surface, #FFFFFF)',
                  border: '1px solid var(--theme-border, #E2E8F0)',
                  borderRadius: 'var(--radius-md, 12px)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                }}
              >
                {/* Thumbnail Image */}
                <div style={{ position: 'relative', width: '100%', height: '220px', background: '#0A1128' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Category Pill on Image */}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(post.category as BlogCategory)}
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(1, 53, 139, 0.92)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.28rem 0.75rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                    }}
                    title={`Filter by ${post.category}`}
                  >
                    {post.category}
                  </button>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Meta info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.8rem',
                        color: '#64748B',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: "'Lexend', sans-serif",
                        fontSize: '1.18rem',
                        fontWeight: 800,
                        color: 'var(--color-logo-blue, #01358b)',
                        lineHeight: 1.35,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#475569',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid #F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ color: '#64748B', fontWeight: 600 }}>
                      {post.author}
                    </span>

                    <span
                      style={{
                        color: 'var(--color-logo-blue, #01358b)',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Read More</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: '#F8FAFC',
              border: '2px dashed #CBD5E1',
              borderRadius: 'var(--radius-lg, 16px)',
              marginBottom: '4.5rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1.25rem auto',
                borderRadius: '50%',
                background: 'rgba(1, 53, 139, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-logo-blue)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#1E293B',
                marginBottom: '0.5rem',
              }}
            >
              No blog articles match your search
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
              Try checking for spelling or searching for another keyword.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              style={{ padding: '0.65rem 1.5rem' }}
            >
              Clear Filters &amp; View All 36 Articles
            </button>
          </div>
        )}

        {/* Technical Consultation CTA Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, #01358B 0%, #1A2F6C 60%, #0A1128 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#56ACDD',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Have a Specific Engineering Question?
            </span>
            <h2
              className="force-white-heading"
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '0.75rem',
                color: '#FFFFFF',
                WebkitTextFillColor: '#FFFFFF',
              }}
            >
              Consult with Neptune&apos;s Perimeter Security &amp; Smart Parking Specialists
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              Our senior automation architects review facility plans, vehicle turn radiuses, duty cycle calculations, and custom FASTag/ANPR software integrations for airports, metro transit, defense, and commercial projects across India.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <Link
              href="/contact"
              className="btn btn-outline"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                color: '#FFFFFF',
                padding: '0.85rem 1.75rem',
                fontSize: '0.9375rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>Speak with an Engineer</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              href="tel:+918010807000"
              className="btn btn-outline"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                padding: '0.85rem 1.5rem',
                fontSize: '0.9375rem',
                textDecoration: 'none',
              }}
            >
              <span>+91 8010 807 000</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
