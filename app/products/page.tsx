import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCT_CATEGORIES } from '@/data/productsData';

export const metadata: Metadata = {
  title: 'Products Portfolio — Complete Access Automation & Parking Solutions | Neptune Automatic',
  description:
    "Explore Neptune Automatic's complete range of automatic boom barriers, high-security bollards, crash barriers, pedestrian turnstiles, and smart parking management systems.",
};

export default function ProductsIndexPage() {
  const divisions = [
    { name: 'Access Automation', slug: 'access-automation' },
    { name: 'Access Control', slug: 'access-control' },
    { name: 'Parking Management Systems', slug: 'parking-management-systems' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  return (
    <div className="products-directory-page" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Products Portfolio</span>
        </nav>

        {/* Directory Header Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #0A1128 0%, #121F45 60%, #1E3A8A 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(10, 17, 40, 0.15)'
        }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(86, 172, 221, 0.18)',
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
              Certified Engineering Hardware
            </span>
            <h1 style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              Product Portfolio &amp; Turnkey Systems
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              Browse Neptune Automatic&apos;s 20 specialized product categories spanning access automation, hostile vehicle mitigation, RFID access control, and smart parking infrastructure.
            </p>
          </div>
        </section>

        {/* 4 Divisions Sections */}
        {divisions.map((div) => {
          const categoriesInDiv = PRODUCT_CATEGORIES.filter(
            (c) =>
              c.divisionSlug === div.slug ||
              c.division.toLowerCase() === div.name.toLowerCase() ||
              (div.slug === 'parking-management-systems' && c.divisionSlug === 'parking')
          );
          return (
            <section key={div.slug} style={{ marginBottom: '3.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '2px solid var(--theme-border-subtle, #E2E8F0)',
                paddingBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h2 style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-logo-blue)',
                    margin: 0
                  }}>
                    <Link href={`/products/${div.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {div.name}
                    </Link>
                  </h2>
                  <span style={{
                    background: 'var(--color-logo-blue-light, #EFF6FF)',
                    color: 'var(--color-logo-blue)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px'
                  }}>
                    {categoriesInDiv.length} Categories
                  </span>
                </div>
                <Link
                  href={`/products/${div.slug}`}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--color-logo-blue)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>Explore Division Page</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {categoriesInDiv.map((cat) => (
                  <Link
                    key={cat.categorySlug}
                    href={`/products/${cat.categorySlug}`}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--theme-border, #E2E8F0)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                    className="hardware-model-card"
                  >
                    <div style={{
                      position: 'relative',
                      height: '180px',
                      background: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      borderBottom: '1px solid #E2E8F0'
                    }}>
                      <Image
                        src={cat.heroImage}
                        alt={cat.categoryName}
                        width={260}
                        height={160}
                        style={{ objectFit: 'contain', maxHeight: '100%' }}
                        loading="lazy"
                      />
                      <span style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: '#121F45',
                        color: '#FFFFFF',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {cat.products.length} {cat.products.length === 1 ? 'Model' : 'Models'}
                      </span>
                    </div>

                    <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Lexend', sans-serif",
                          fontSize: '1.0625rem',
                          fontWeight: 700,
                          color: 'var(--color-logo-blue)',
                          lineHeight: 1.3,
                          margin: '0 0 0.5rem 0'
                        }}>
                          {cat.categoryName}
                        </h3>
                        <p style={{
                          fontSize: '0.8125rem',
                          color: '#64748B',
                          lineHeight: 1.5,
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {cat.tagline || cat.description}
                        </p>
                      </div>

                      <div style={{
                        marginTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #F1F5F9',
                        fontSize: '0.8125rem',
                        color: 'var(--color-logo-blue)',
                        fontWeight: 700
                      }}>
                        <span>Explore Subcategory</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
