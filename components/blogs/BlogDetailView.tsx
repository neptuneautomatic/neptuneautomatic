'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getRelatedBlogPosts } from '@/data/blogsData';

interface Props {
  post: BlogPost;
}

export default function BlogDetailView({ post }: Props) {
  const [copied, setCopied] = useState(false);
  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="blog-detail-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/blogs">Blogs</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.title}
          </span>
        </nav>

        {/* Article Header Container */}
        <header style={{ maxWidth: '880px', margin: '0 auto 2.5rem auto', textAlign: 'left' }}>
          {/* Metadata badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(1, 53, 139, 0.08)',
                color: 'var(--color-logo-blue, #01358b)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                border: '1px solid rgba(1, 53, 139, 0.2)',
              }}
            >
              {post.category}
            </span>

            <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{post.date}</span>
            </span>

            <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--color-logo-blue, #01358b)',
              marginBottom: '1.25rem',
              letterSpacing: '-0.015em',
            }}
          >
            {post.title}
          </h1>

          {/* Byline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-logo-blue, #01358b) 0%, #1a2f6c 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                }}
              >
                NA
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.92rem' }}>
                  {post.author}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Verified Industrial &amp; Engineering Research
                </div>
              </div>
            </div>

            {/* Share / Copy Link Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: copied ? '#10B981' : '#F1F5F9',
                  color: copied ? '#FFFFFF' : '#334155',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9999px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                title="Copy Article Link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto 3rem auto',
            position: 'relative',
            height: 'clamp(280px, 45vw, 480px)',
            borderRadius: 'var(--radius-lg, 16px)',
            overflow: 'hidden',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.12)',
            background: '#0A1128',
          }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Main Article Body */}
        <div style={{ maxWidth: '840px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.85, color: '#334155' }}>
          {/* Excerpt Lead Paragraph */}
          {post.excerpt && (
            <div
              style={{
                fontSize: '1.18rem',
                lineHeight: 1.7,
                color: '#1E293B',
                fontWeight: 500,
                borderLeft: '4px solid var(--color-logo-blue, #01358b)',
                paddingLeft: '1.25rem',
                marginBottom: '2.5rem',
                background: 'rgba(1, 53, 139, 0.03)',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 8px 8px 0',
              }}
            >
              {post.excerpt}
            </div>
          )}

          {/* Rendered HTML content from Neptune */}
          <div
            className="blog-article-html-content"
            style={{
              marginBottom: '3rem',
            }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Engineering Callout Box */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderTop: '4px solid var(--color-logo-blue, #01358b)',
              borderRadius: '8px',
              padding: '1.75rem',
              marginBottom: '3.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-logo-blue, #01358b)" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <h4 style={{ margin: 0, fontFamily: "'Lexend', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-logo-blue, #01358b)' }}>
                About Neptune Automatic Research &amp; Engineering
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.65 }}>
              Neptune Automatic Pvt. Ltd. is India&apos;s leading manufacturer of high-security hostile vehicle mitigation bollards, crash-rated drop arms, smart parking management systems, and automated entrance hardware. Founded in 2005, Neptune operates ISO 9001:2015 certified production lines and deploys turnkey systems across airports, metro rail, defense establishments, and corporate headquarters nationwide.
            </p>
          </div>

          {/* Author Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.75rem',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              marginBottom: '4rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-logo-blue, #01358b) 0%, #1a2f6c 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.5rem',
                flexShrink: 0,
              }}
            >
              NA
            </div>
            <div>
              <div style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#1E293B', marginBottom: '0.25rem' }}>
                {post.author}
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                Authored by the Technical &amp; Field Engineering team at Neptune Automatic. Contributing verified field insights, crash test evaluations, firmware protocols, and turnkey installation standards.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section style={{ maxWidth: '1100px', margin: '0 auto 4rem auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-logo-red, #D32628)', letterSpacing: '0.08em' }}>
                  Keep Reading
                </span>
                <h3
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: 'clamp(1.5rem, 2.8vw, 1.95rem)',
                    fontWeight: 800,
                    color: 'var(--color-logo-blue, #01358b)',
                    margin: 0,
                  }}
                >
                  Related Engineering Articles
                </h3>
              </div>

              <Link
                href="/blogs"
                className="btn btn-outline"
                style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
              >
                <span>View All 36 Articles &rarr;</span>
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <article
                    className="blog-article-card"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '170px', background: '#0A1128' }}>
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(1, 53, 139, 0.9)',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {rel.category}
                      </span>
                    </div>

                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.5rem' }}>
                          {rel.date} &bull; {rel.readTime}
                        </div>
                        <h4
                          style={{
                            fontFamily: "'Lexend', sans-serif",
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: 'var(--color-logo-blue, #01358b)',
                            lineHeight: 1.35,
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {rel.title}
                        </h4>
                      </div>

                      <div style={{ marginTop: '1rem', color: 'var(--color-logo-blue, #01358b)', fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>Read Article</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Consultation CTA */}
        <section
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #01358B 0%, #1A2F6C 60%, #0A1128 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 16px)',
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
              Enterprise Technical Inquiry
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
              Discuss Your Facility Architecture with Neptune Engineers
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              Speak with certified systems specialists regarding lane geometry, hostile vehicle mitigation bollards, automated boom barrier cycles, or custom FASTag parking integrations.
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
              <span>Request Project Proposal</span>
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
    </article>
  );
}
