'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCategory, PRODUCT_CATEGORIES } from '@/data/productsData';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';

interface Props {
  category: ProductCategory;
}

export default function CategoryDetailView({ category }: Props) {
  const { openQuote } = useModal();
  const { addToCart, isInWishlist, toggleWishlist, openCart } = useCart();

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
              color: '#FFFFFF',
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
                    {/* Image wrap with code badge & Wishlist Heart */}
                    <div className="hardware-card-img-wrap" style={{ position: 'relative' }}>
                      <Image
                        src={displayImg}
                        alt={prod.name}
                        width={300}
                        height={220}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        loading="lazy"
                      />
                      <span className="hardware-badge-code">{prod.modelCode}</span>

                      {/* Quick Wishlist Toggle */}
                      <button
                        type="button"
                        className={`card-wishlist-quick-btn ${isInWishlist(prod.slug) ? 'active' : ''}`}
                        title={isInWishlist(prod.slug) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist({
                            slug: prod.slug,
                            categorySlug: category.categorySlug,
                            name: prod.name,
                            modelCode: prod.modelCode,
                            categoryName: category.categoryName,
                            division: category.division,
                            image: displayImg,
                            tagline: prod.tagline,
                          });
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isInWishlist(prod.slug) ? '#D32628' : 'none'} stroke={isInWishlist(prod.slug) ? '#D32628' : '#64748B'} strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
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
                    padding: '0.85rem 1.25rem',
                    background: '#F8FAFC',
                    borderTop: '1px solid var(--theme-border-subtle)',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <Link
                      href={`/products/${category.categorySlug}/${prod.slug}`}
                      className="btn btn-outline"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.8125rem', padding: '0.55rem 0.75rem' }}
                    >
                      <span>Specs</span>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        addToCart({
                          slug: prod.slug,
                          categorySlug: category.categorySlug,
                          name: prod.name,
                          modelCode: prod.modelCode,
                          categoryName: category.categoryName,
                          division: category.division,
                          image: displayImg,
                          tagline: prod.tagline,
                        }, 1);
                        openCart();
                      }}
                      title="Add to Quotation Cart"
                      style={{ flex: 1.2, justifyContent: 'center', fontSize: '0.8125rem', padding: '0.55rem 0.75rem', gap: '5px' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>+ Quote Cart</span>
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
