'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, getRelatedBlogPosts } from '@/data/blogsData';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';

interface Props {
  post: BlogPost;
}

export default function BlogDetailView({ post }: Props) {
  const { openCart } = useCart();
  const { openQuote } = useModal();

  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [readProgress, setReadProgress] = useState(0);

  const blogContentRef = useRef<HTMLDivElement>(null);
  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  // Copy URL to clipboard
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Scroll Spy & Reading Progress (Capped at end of blog content)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading progress calculation (limited to the end of the blog article, not end of page)
      if (blogContentRef.current) {
        const el = blogContentRef.current;
        const rect = el.getBoundingClientRect();
        const contentTop = window.scrollY + rect.top;
        const contentHeight = el.offsetHeight;

        // Reading begins when top of blog content reaches reading zone below header (~130px)
        const startScroll = contentTop - 130;
        // Reading reaches 100% when the reader reaches the bottom of the blog article
        const endScroll = contentTop + contentHeight - (window.innerHeight * 0.75);

        const currentScroll = window.scrollY;

        if (currentScroll <= startScroll) {
          setReadProgress(0);
        } else if (currentScroll >= endScroll) {
          setReadProgress(100);
        } else if (endScroll > startScroll) {
          const progress = Math.round(((currentScroll - startScroll) / (endScroll - startScroll)) * 100);
          setReadProgress(Math.min(100, Math.max(0, progress)));
        }
      }

      // 2. Active TOC Heading Calculation
      if (!post.tableOfContents || post.tableOfContents.length === 0) return;

      const headingElements = post.tableOfContents
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 140;

      let currentId = headingElements[0].id;
      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          currentId = el.id;
        } else {
          break;
        }
      }

      // If finished reading through to the end of the blog, keep last section highlighted
      if (blogContentRef.current) {
        const rect = blogContentRef.current.getBoundingClientRect();
        const contentTop = window.scrollY + rect.top;
        const endScroll = contentTop + blogContentRef.current.offsetHeight - (window.innerHeight * 0.75);
        if (window.scrollY >= endScroll && headingElements.length > 0) {
          currentId = headingElements[headingElements.length - 1].id;
        }
      }

      setActiveHeadingId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.tableOfContents]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveHeadingId(id);
    }
  };

  return (
    <article className="blog-detail-page" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation (Left Aligned) */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.75rem', textAlign: 'left' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/blogs">Blogs</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current" style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.title}
          </span>
        </nav>

        {/* =========================================================================
            TWO-COLUMN EDITORIAL LAYOUT:
            LEFT: Main Article Content (Left-Aligned)
            RIGHT: Sticky Widget Area (Sticky Table of Contents & Brand Widgets)
           ========================================================================= */}
        <div className="blog-two-col-layout">
          {/* =====================================================================
              LEFT COLUMN: MAIN ARTICLE CONTENT (LEFT ALIGNED)
             ===================================================================== */}
          <main className="blog-main-content-col">
            <div ref={blogContentRef} className="blog-article-content-wrapper">
              {/* Category, Date & Read Time */}
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

            {/* Article Main Title (Left Aligned) */}
            <h1
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                color: 'var(--color-logo-blue, #01358b)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.015em',
                textAlign: 'left',
              }}
            >
              {post.title}
            </h1>

            {/* Author Byline & Social Share */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #E2E8F0',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #01358B 0%, #1A2F6C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                  }}
                >
                  NA
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1E293B' }}>
                    {post.author}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Neptune Security &amp; Access Engineering Team
                  </div>
                </div>
              </div>

              {/* Share / Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: copied ? '#ECFDF5' : '#F8FAFC',
                  color: copied ? '#059669' : 'var(--color-logo-blue, #01358b)',
                  border: `1px solid ${copied ? '#A7F3D0' : '#CBD5E1'}`,
                  borderRadius: '6px',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                title="Copy Article Link"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>

            {/* Featured Image (Full width of left column) */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                borderRadius: 'var(--radius-lg, 16px)',
                overflow: 'hidden',
                background: '#0A1128',
                marginBottom: '2.25rem',
                boxShadow: '0 12px 32px rgba(10, 17, 40, 0.1)',
              }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 750px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Lead Excerpt Card */}
            <div
              style={{
                background: 'rgba(1, 53, 139, 0.04)',
                borderLeft: '4px solid var(--color-logo-blue, #01358b)',
                borderRadius: '0 12px 12px 0',
                padding: '1.25rem 1.5rem',
                marginBottom: '2.5rem',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: '#1E293B',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              {post.excerpt}
            </div>

            {/* Left-Aligned Formatted Article Body */}
            <div className="blog-content-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {/* Technical Key Takeaways Callout Box */}
            <section
              style={{
                marginTop: '3.5rem',
                marginBottom: '3rem',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-lg, 14px)',
                padding: '1.75rem 2rem',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    background: 'var(--color-logo-red, #D32628)',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  ✓
                </span>
                <h3
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--color-logo-blue, #01358b)',
                    margin: 0,
                  }}
                >
                  Engineering Key Takeaways
                </h3>
              </div>

              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#475569', fontSize: '0.92rem', lineHeight: 1.75 }}>
                <li>Hostile vehicle mitigation and perimeter automation require certified crash-rated standards (PAS 68, IWA 14-1, ASTM F2656).</li>
                <li>Seamless throughput in high-volume traffic plazas demands 100% continuous duty cycle motors with sub-second opening times.</li>
                <li>Neptune provides end-to-end turnkey engineering: site surveys, civil foundation design, sensor integration, and pan-India 24/7 SLA maintenance.</li>
              </ul>
            </section>

            {/* Author Bio Card */}
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                padding: '1.75rem',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-md, 12px)',
                marginBottom: '3.5rem',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #01358B 0%, #D32628 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                NA
              </div>
              <div>
                <h4 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1rem', fontWeight: 800, color: '#1E293B', margin: '0 0 0.35rem 0' }}>
                  Written by Neptune Technical Editorial
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                  Authored by Neptune Automatic&apos;s senior access control engineers and systems architects. NAPL has designed and deployed automated security perimeters and FASTag smart parking lanes for international airports, military installations, and top enterprise campuses across India.
                </p>
              </div>
            </div>
          </div>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
              <section style={{ marginBottom: '3.5rem', textAlign: 'left' }}>
                <h3
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--color-logo-blue, #01358b)',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    paddingBottom: '0.5rem',
                    borderBottom: '2px solid #E2E8F0',
                  }}
                >
                  Related Engineering Articles
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blogs/${rel.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <article
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                        className="blog-article-card"
                      >
                        <div style={{ position: 'relative', width: '100%', height: '140px', background: '#0A1128' }}>
                          <Image
                            src={rel.image}
                            alt={rel.title}
                            fill
                            sizes="280px"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </div>

                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '0.35rem' }}>
                              {rel.date} &bull; {rel.readTime}
                            </div>
                            <h4
                              style={{
                                fontFamily: "'Lexend', sans-serif",
                                fontSize: '0.92rem',
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

                          <div style={{ marginTop: '0.75rem', color: 'var(--color-logo-blue, #01358b)', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>Read Article</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY WIDGET AREA
              - Sticky Table of Contents (Theme of Brand Logo)
              - Enterprise RFQ & Direct Quote Widget
              - Core Hardware Quick Directory Widget
              - Corporate Contact & Engineering Hotline Widget
             ===================================================================== */}
          <aside className="blog-sticky-sidebar blog-toc-sticky" aria-label="Article Sidebar & Table of Contents" style={{ paddingTop: '20px' }}>
            {/* WIDGET 1: STICKY TABLE OF CONTENTS (BRAND LOGO THEME) */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="blog-toc-card blog-toc-sticky" style={{ paddingTop: '20px' }}>
                <div className="blog-toc-header" style={{ paddingTop: '20px' }}>
                  <h3 className="blog-toc-title">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    <span>Table of Contents</span>
                  </h3>
                  <span className="blog-toc-progress-text">{readProgress}% Read</span>
                </div>

                {/* Progress Bar in Logo Colors (Blue to Red Gradient) */}
                <div className="blog-toc-progress-bar">
                  <div className="blog-toc-progress-fill" style={{ width: `${readProgress}%` }} />
                </div>

                {/* TOC List with Scroll Spy & Logo Theme Highlights */}
                <ul className="blog-toc-list">
                  {post.tableOfContents.map((item, idx) => {
                    const isActive = activeHeadingId === item.id;
                    const indexFormatted = String(idx + 1).padStart(2, '0');

                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={`blog-toc-item-btn ${isActive ? 'is-active' : ''}`}
                          onClick={() => scrollToHeading(item.id)}
                          style={{
                            paddingLeft: item.level === 3 ? '2rem' : '1.25rem',
                          }}
                        >
                          <span className="blog-toc-item-index">{indexFormatted}.</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.text}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* WIDGET 2: ENTERPRISE QUOTATION & RFQ PROPOSAL */}
            <div className="blog-rfq-widget">
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--color-logo-cyan, #56ACDD)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                DIRECT OEM PROPOSALS
              </span>
              <h3
                style={{
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 0.5rem 0',
                  lineHeight: 1.3,
                }}
              >
                Need an Official Hardware Quote?
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                Neptune engineers deliver comprehensive GST-compliant proposals with CAD lane layouts in 2–4 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={openCart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'var(--color-logo-red, #D32628)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(211, 38, 40, 0.35)',
                  }}
                >
                  <span>Open Quote Cart</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <a
                  href="tel:+918010807000"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call: +91 8010 807 000</span>
                </a>
              </div>
            </div>

            {/* WIDGET 3: CORE ACCESS AUTOMATION DIRECTORY */}
            <div className="blog-sidebar-widget">
              <h4
                style={{
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: 'var(--color-logo-blue, #01358b)',
                  margin: '0 0 0.85rem 0',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #F1F5F9',
                }}
              >
                Access Automation Catalog
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'Automatic Boom Barriers', href: '/products/automatic-boom-barrier/' },
                  { label: 'Crash-Rated Bollards (K4/K12)', href: '/products/automatic-bollards/' },
                  { label: 'FASTag Parking Systems (PMS)', href: '/products/parking-management-system/' },
                  { label: 'Pedestrian Flap Barriers', href: '/products/pedestrian-gates/' },
                  { label: 'Hydraulic Road Blockers', href: '/products/road-blockers/' },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem',
                      color: '#334155',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                    className="hover-bg-blue"
                  >
                    <span>{item.label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 4: CORPORATE HEADQUARTERS & SUPPORT */}
            <div className="blog-sidebar-widget" style={{ background: '#F8FAFC' }}>
              <h4
                style={{
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  color: '#1E293B',
                  margin: '0 0 0.5rem 0',
                }}
              >
                Neptune Automatic Pvt. Ltd.
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                Sector 63, Noida, NCR, India
                <br />
                Pan-India Supply, Installation &amp; AMC
              </p>

              <div style={{ fontSize: '0.78rem', color: 'var(--color-logo-blue, #01358b)', fontWeight: 700 }}>
                <a href="mailto:info@neptuneautomatic.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  ✉ info@neptuneautomatic.com
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* =========================================================================
            BOTTOM FULL-WIDTH ENTERPRISE CONSULTATION BANNER
           ========================================================================= */}
        <section
          style={{
            maxWidth: '100%',
            background: 'linear-gradient(135deg, #01358B 0%, #1A2F6C 60%, #0A1128 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            textAlign: 'left',
          }}
        >
          <div style={{ maxWidth: '840px' }}>
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
                textAlign: 'left',
              }}
            >
              Discuss Your Facility Architecture with Neptune Engineers
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0, textAlign: 'left' }}>
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
