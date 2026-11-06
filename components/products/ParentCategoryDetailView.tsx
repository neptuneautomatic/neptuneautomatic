'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ParentCategory, getCategoryBySlug, getAllParentCategories } from '@/data/productsData';

interface Props {
  parentCategory: ParentCategory;
}

export default function ParentCategoryDetailView({ parentCategory }: Props) {

  // Retrieve full category objects for all listed slugs
  const childCategories = parentCategory.categorySlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((cat): cat is NonNullable<typeof cat> => Boolean(cat));

  // Other parent categories for cross-navigation
  const siblingDivisions = getAllParentCategories().filter(
    (p) => p.slug !== parentCategory.slug
  );

  return (
    <div className="parent-category-page" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="layout-container">
        {/* 1. Breadcrumbs */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/products">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{parentCategory.name}</span>
        </nav>

        {/* 2. Hero Section */}
        <section
          className="category-hero-banner"
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #101F42 60%, #1A2E5A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2.5rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(10, 17, 40, 0.15)',
          }}
        >
          {/* Subtle ambient glow in background */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(86, 172, 221, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px' }}>
            <div
              className="page-badge-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(86, 172, 221, 0.15)',
                border: '1px solid rgba(86, 172, 221, 0.4)',
                borderRadius: '9999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#56ACDD',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
              <span>Neptune Core Division &bull; Enterprise Solutions</span>
            </div>

            <h1
              className="force-white-heading"
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                color: '#FFFFFF',
                WebkitTextFillColor: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              {parentCategory.h1}
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#FFFFFF',
                marginBottom: '1rem',
                fontWeight: 500,
              }}
            >
              {parentCategory.tagline}
            </p>

            <p
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: '#FFFFFF',
                marginBottom: '2rem',
                maxWidth: '800px',
              }}
            >
              {parentCategory.description}
            </p>
          </div>

          {/* Quick Metrics Bar inside Hero */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {parentCategory.stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#56ACDD',
                    lineHeight: 1.2,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', fontWeight: 600 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Product Categories Showcase Grid */}
        <section id="product-categories" style={{ scrollMarginTop: '120px', marginBottom: '4.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '2px solid #E2E8F0',
              paddingBottom: '1rem',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  color: 'var(--color-logo-red)',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.25rem',
                }}
              >
                Complete Division Portfolio
              </span>
              <h2
                style={{
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                  fontWeight: 800,
                  color: 'var(--color-logo-blue)',
                  margin: 0,
                }}
              >
                All Product Categories under {parentCategory.name}
              </h2>
            </div>
            <span
              style={{
                background: '#EFF6FF',
                color: 'var(--color-logo-blue)',
                border: '1px solid #BFDBFE',
                fontWeight: 700,
                fontSize: '0.875rem',
                padding: '0.4rem 0.9rem',
                borderRadius: '9999px',
              }}
            >
              {childCategories.length} Categories Configured
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '2rem',
            }}
          >
            {childCategories.map((cat) => (
              <div
                key={cat.categorySlug}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--theme-border, #E2E8F0)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                className="hardware-model-card"
              >
                {/* Card Image Area */}
                <Link
                  href={`/products/${cat.categorySlug}`}
                  style={{
                    position: 'relative',
                    height: '220px',
                    background: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    borderBottom: '1px solid #E2E8F0',
                  }}
                >
                  <Image
                    src={cat.heroImage}
                    alt={cat.categoryName}
                    width={320}
                    height={190}
                    style={{ objectFit: 'contain', maxHeight: '100%', width: 'auto' }}
                    loading="lazy"
                  />
                </Link>

                {/* Card Content Area */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Lexend', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        lineHeight: 1.3,
                        marginBottom: '0.75rem',
                      }}
                    >
                      <Link
                        href={`/products/${cat.categorySlug}`}
                        style={{ color: 'var(--color-logo-blue)', textDecoration: 'none' }}
                      >
                        {cat.categoryName}
                      </Link>
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#64748B',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {cat.tagline || cat.description}
                    </p>

                    {/* Top Highlights List */}
                    {cat.highlights && cat.highlights.length > 0 && (
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        {cat.highlights.slice(0, 2).map((hl, hIdx) => (
                          <li
                            key={hIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              fontSize: '0.8125rem',
                              color: '#334155',
                              lineHeight: 1.4,
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              style={{ color: '#10B981', flexShrink: 0, width: '16px', height: '16px', marginTop: '1px' }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Division Highlights & Engineering Capabilities */}
        <section
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
            <span
              style={{
                color: 'var(--color-logo-red)',
                fontWeight: 800,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              Engineering Principles
            </span>
            <h2
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 800,
                color: 'var(--color-logo-blue)',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Why Enterprise Facilities Choose Neptune {parentCategory.name}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {parentCategory.highlights.map((hl, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#EFF6FF',
                    color: 'var(--color-logo-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 800,
                    fontSize: '0.875rem',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <p style={{ margin: 0, fontSize: '0.9375rem', color: '#334155', lineHeight: 1.55, fontWeight: 500 }}>
                  {hl}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Key Industry Applications */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
            <span
              style={{
                color: 'var(--color-logo-red)',
                fontWeight: 800,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              Field Deployments
            </span>
            <h2
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 800,
                color: 'var(--color-logo-blue)',
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              Key Sectors &amp; Mission-Critical Applications
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {parentCategory.applications.map((app, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  borderTop: '4px solid var(--color-logo-blue)',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--color-logo-blue)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {app.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Explore Other Core Divisions */}
        <section
          style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%)',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                color: 'var(--color-logo-blue)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              Integrated Systems Portfolio
            </span>
            <h2
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--color-logo-blue)',
                margin: 0,
              }}
            >
              Explore Neptune&apos;s Other Product Divisions
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {siblingDivisions.map((sib) => (
              <Link
                key={sib.slug}
                href={`/products/${sib.slug}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  border: '1px solid #CBD5E1',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                className="hardware-model-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        background: '#EFF6FF',
                        color: 'var(--color-logo-blue)',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {sib.categorySlugs.length} Categories
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Division</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--color-logo-blue)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {sib.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: '#64748B',
                      lineHeight: 1.5,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {sib.tagline}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #F1F5F9',
                    fontSize: '0.8125rem',
                    color: 'var(--color-logo-blue)',
                    fontWeight: 700,
                  }}
                >
                  <span>Explore {sib.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. Bottom Lead Capture Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #1A2E5A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            boxShadow: '0 10px 25px rgba(10, 17, 40, 0.2)',
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <span
              style={{
                color: '#56ACDD',
                fontWeight: 700,
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Pan-India Engineering &amp; Turnkey Execution
            </span>
            <h2
              className="force-white-heading"
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '0.75rem',
                color: '#FFFFFF',
                WebkitTextFillColor: '#FFFFFF',
              }}
            >
              Consult Neptune Engineers for Your {parentCategory.name} Deployment
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              Speak with certified systems specialists to review facility layouts, lane geometry, duty requirements, and custom software integration.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
