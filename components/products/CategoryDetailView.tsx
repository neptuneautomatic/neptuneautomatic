'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCategory, PRODUCT_CATEGORIES } from '@/data/productsData';
import { useModal } from '@/context/ModalContext';

interface Props {
  category: ProductCategory;
}

export default function CategoryDetailView({ category }: Props) {
  const { openQuote } = useModal();

  // Sibling categories in the same division
  const siblingCategories = PRODUCT_CATEGORIES.filter(
    (c) => c.divisionSlug === category.divisionSlug && c.categorySlug !== category.categorySlug
  );

  return (
    <div className="product-category-page" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="layout-container">
        {/* 1. Breadcrumbs */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/products">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span style={{ color: 'var(--theme-text-muted)' }}>{category.division}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{category.categoryName}</span>
        </nav>

        {/* 2. Page Hero Banner */}
        <section className="category-hero-banner" style={{
          background: 'linear-gradient(135deg, #0A1128 0%, #101F42 60%, #1A2E5A 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(10, 17, 40, 0.15)'
        }}>
          {/* Subtle cyan glow in background */}
          <div style={{
            position: 'absolute',
            top: '-40%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(86, 172, 221, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px' }}>
            <div className="page-badge-eyebrow" style={{
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
              marginBottom: '1rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
              <span>{category.division} &bull; Enterprise Class</span>
            </div>

            <h1 style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#FFFFFF'
            }}>
              {category.h1 || category.categoryName}
            </h1>

            <p style={{
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              color: '#CBD5E1',
              marginBottom: '2rem'
            }}>
              {category.description || category.tagline}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openQuote(category.categoryName)}
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.9375rem', fontWeight: 700 }}
              >
                <span>Request Model Quote</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <a
                href="#hardware-models"
                className="btn btn-outline"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600
                }}
              >
                <span>Browse {category.products.length} Models &darr;</span>
              </a>

              <a
                href="tel:+918010807000"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#56ACDD',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  marginLeft: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 8010 807 000</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. Specs Overview & Core Highlights Grid */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div className="product-overview-grid">
            {/* Left: Engineering Parameters Table */}
            <div className="product-specs-box">
              <div className="specs-box-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="specs-box-title" style={{ fontSize: '1.25rem', margin: 0 }}>
                  Engineering Specifications &amp; Parameters
                </h2>
                <span className="badge" style={{ background: '#EFF6FF', color: 'var(--color-logo-blue)', fontWeight: 700 }}>
                  ISO 9001:2015
                </span>
              </div>

              <table className="specs-table">
                <tbody>
                  {category.overviewSpecs.map((spec, idx) => (
                    <tr key={idx}>
                      <td className="spec-name">{spec.key}</td>
                      <td className="spec-val">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Core Highlights & Direct SLA */}
            <aside className="product-sidebar">
              <div className="product-sidebar-card">
                <h3 className="product-sidebar-title" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
                  Core Engineering Highlights
                </h3>
                <ul className="product-highlights-list">
                  {category.highlights.map((hl, idx) => (
                    <li key={idx} className="product-highlight-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#10B981', flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="product-sidebar-actions" style={{ marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => openQuote(category.categoryName)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Get Fast Enterprise Quote</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <a
                    href="tel:+918010807000"
                    className="btn btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Speak with Project Engineer</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 4. Hardware Models & Available Configurations Grid */}
        <section id="hardware-models" style={{ scrollMarginTop: '120px', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="prod-eyebrow" style={{ display: 'block', marginBottom: '0.25rem' }}>
                Hardware Selection Matrix
              </span>
              <h2 style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--color-logo-blue)',
                margin: 0
              }}>
                Available Models &amp; Hardware Configurations
              </h2>
            </div>
            <span style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontWeight: 700,
              fontSize: '0.8125rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px'
            }}>
              {category.products.length} {category.products.length === 1 ? 'Model' : 'Models'} Configured
            </span>
          </div>

          <div className="hardware-models-grid">
            {category.products.map((prod) => {
              const displayImg = prod.images[0] || category.heroImage;
              return (
                <div key={prod.slug} className="hardware-model-card">
                  <div className="hardware-card-content">
                    {/* Image wrap with code badge */}
                    <div className="hardware-card-img-wrap">
                      <Image
                        src={displayImg}
                        alt={prod.name}
                        width={300}
                        height={220}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        loading="lazy"
                      />
                      <span className="hardware-badge-code">{prod.modelCode}</span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="hardware-card-title">
                        <Link
                          href={`/products/${category.categorySlug}/${prod.slug}`}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {prod.name}
                        </Link>
                      </h3>
                      <p className="hardware-card-desc" style={{ marginTop: '0.5rem' }}>
                        {prod.shortDesc || prod.tagline}
                      </p>
                    </div>

                    {/* Quick Specs Strip */}
                    <div className="hardware-specs-strip">
                      {prod.fastFacts.slice(0, 2).map((fact, idx) => (
                        <div key={idx} className="hardware-spec-box">
                          <div className="hardware-spec-lbl">{fact.label}</div>
                          <div className="hardware-spec-val">{fact.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="hardware-card-actions" style={{
                    padding: '1rem 1.5rem',
                    background: '#F8FAFC',
                    borderTop: '1px solid var(--theme-border-subtle)',
                    display: 'flex',
                    gap: '0.75rem'
                  }}>
                    <Link
                      href={`/products/${category.categorySlug}/${prod.slug}`}
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.8125rem', padding: '0.6rem 1rem' }}
                    >
                      <span>Full Specifications</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => openQuote(prod.name)}
                      title="Request Quote"
                      style={{ fontSize: '0.8125rem', padding: '0.6rem 0.85rem' }}
                    >
                      <span>Quote</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Sibling Categories Navigator */}
        {siblingCategories.length > 0 && (
          <section style={{
            background: 'var(--theme-bg-surface, #F8FAFC)',
            border: '1px solid var(--theme-border, #E2E8F0)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 2.5rem',
            marginTop: '3rem'
          }}>
            <h3 style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-logo-blue)',
              marginBottom: '1.25rem'
            }}>
              Explore Other Solutions in {category.division}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {siblingCategories.map((sib) => (
                <Link
                  key={sib.categorySlug}
                  href={`/products/${sib.categorySlug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-logo-blue)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease'
                  }}
                  className="sibling-cat-link"
                >
                  <span>{sib.categoryName}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
