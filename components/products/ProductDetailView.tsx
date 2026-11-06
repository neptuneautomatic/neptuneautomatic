'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCategory, ProductItem } from '@/data/productsData';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';

interface Props {
  category: ProductCategory;
  product: ProductItem;
}

export default function ProductDetailView({ category, product }: Props) {
  const { openQuote } = useModal();
  const { addToCart, isInWishlist, toggleWishlist, openCart } = useCart();
  const [selectedImg, setSelectedImg] = useState<string>(product.images[0] || category.heroImage);
  const [quantity, setQuantity] = useState<number>(1);

  // Other products in the same category
  const relatedProducts = category.products.filter((p) => p.slug !== product.slug);

  return (
    <div className="product-detail-page" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="layout-container">
        {/* 1. Breadcrumb Navigation */}
        <nav className="prod-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="prod-breadcrumb-sep">/</span>
          <Link href="/products">Products</Link>
          <span className="prod-breadcrumb-sep">/</span>
          <Link href={`/products/${category.categorySlug}`}>{category.categoryName}</Link>
          <span className="prod-breadcrumb-sep">/</span>
          <span className="prod-breadcrumb-current">{product.name}</span>
        </nav>

        {/* 2. Product Hero Showcase Card */}
        <div className="prod-detail-hero-card">
          {/* Left: Gallery & Fast Facts */}
          <div className="prod-gallery-col">
            <div className="prod-main-display">
              <Image
                src={selectedImg}
                alt={product.name}
                width={500}
                height={380}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                priority
              />
              <span className="hardware-badge-code">{product.modelCode}</span>
              <span className="hardware-badge-flagship">Enterprise Grade</span>
            </div>

            {/* Thumbnails strip (if multiple images) */}
            {product.images.length > 1 && (
              <div className="prod-thumb-strip">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`prod-thumb-btn ${selectedImg === img ? 'active' : ''}`}
                    onClick={() => setSelectedImg(img)}
                    title={`View angle ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      width={70}
                      height={50}
                      style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Fast Facts Grid */}
            <div className="prod-fast-facts-grid">
              {product.fastFacts.map((fact, idx) => (
                <div key={idx} className="prod-fact-box">
                  <div className="prod-fact-label">{fact.label}</div>
                  <div className="prod-fact-val">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Meta Information & Procurement Actions */}
          <div className="prod-info-col">
            <div>
              <div className="prod-eyebrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <rect x="9" y="9" width="6" height="6" />
                </svg>
                <span>{category.categoryName} &bull; {category.division}</span>
              </div>

              <h1 className="prod-title">{product.name}</h1>
              <p className="prod-tagline">{product.tagline}</p>
              
              <div className="prod-desc-lead" style={{ whiteSpace: 'pre-line' }}>
                {product.description}
              </div>

              {product.features.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="prod-core-highlights-title">Core Engineering Highlights:</div>
                  <ul className="prod-core-highlights-list">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="prod-highlight-bullet">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* E-Commerce Action & Procurement Section */}
            <div className="prod-procurement-section">
              {/* Stock Status & Assurances */}
              <div className="prod-stock-badge-row">
                <span className="stock-status-pill in-stock">
                  <span className="stock-status-dot"></span>
                  In Stock &bull; Direct Factory Dispatch Across India
                </span>
                <span className="stock-warranty-pill">
                  2-Year OEM Warranty
                </span>
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="prod-ecommerce-action-bar">
                <div className="prod-qty-selector">
                  <label htmlFor="prodQtyInput" className="prod-qty-label">Quantity</label>
                  <div className="qty-stepper">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span id="prodQtyInput">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      &#43;
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-add-cart"
                  onClick={() => {
                    addToCart({
                      slug: product.slug,
                      categorySlug: category.categorySlug,
                      name: product.name,
                      modelCode: product.modelCode,
                      categoryName: category.categoryName,
                      division: category.division,
                      image: selectedImg || product.images[0] || category.heroImage,
                      tagline: product.tagline,
                    }, quantity);
                    openCart();
                  }}
                  style={{ flex: 1, minWidth: '220px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>Add to Quotation Cart</span>
                </button>

                <button
                  type="button"
                  className={`btn btn-outline btn-wishlist-action ${isInWishlist(product.slug) ? 'active' : ''}`}
                  onClick={() => {
                    toggleWishlist({
                      slug: product.slug,
                      categorySlug: category.categorySlug,
                      name: product.name,
                      modelCode: product.modelCode,
                      categoryName: category.categoryName,
                      division: category.division,
                      image: selectedImg || product.images[0] || category.heroImage,
                      tagline: product.tagline,
                    });
                  }}
                  title={isInWishlist(product.slug) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist(product.slug) ? '#D32628' : 'none'} stroke={isInWishlist(product.slug) ? '#D32628' : 'currentColor'} strokeWidth="2.2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>{isInWishlist(product.slug) ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Secondary Instant Sizing & Technical Datasheet */}
              <div className="prod-secondary-actions-row">
                <button
                  type="button"
                  className="btn btn-secondary-quote"
                  onClick={() => openQuote(`${product.name} (${product.modelCode})`)}
                >
                  <span>Instant Technical Proposal</span>
                </button>

                <button
                  type="button"
                  className="btn btn-datasheet-download"
                  onClick={() => openQuote(`Datasheet Download: ${product.name}`)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Datasheet (PDF)</span>
                </button>
              </div>

              {/* Hotline strip */}
              <div className="prod-support-strip">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#10B981', fontWeight: 600 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Factory Sizing &amp; Feasibility Support
                </span>
                <a
                  href="tel:+918010807000"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-logo-blue)', fontWeight: 700, textDecoration: 'none' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 8010 807 000</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Engineering Architecture & Kinematic Overview */}
        <div className="prod-overview-card">
          <div className="prod-section-header flex-row-header">
            <div>
              <span className="prod-eyebrow">Engineering R&amp;D Architecture</span>
              <h2 className="prod-section-title">Kinematics &amp; Design Rationale</h2>
            </div>
            <span className="badge" style={{ background: '#EFF6FF', color: 'var(--color-logo-blue)' }}>
              Neptune R&amp;D Facility
            </span>
          </div>

          <div className="prod-overview-body">
            <p>
              The {product.name} represents Neptune Automatic&apos;s commitment to continuous industrial-grade performance. Engineered and fabricated at our state-of-the-art facility, every mechanical assembly undergoes rigorous cyclic fatigue analysis to ensure uncompromised uptime in mission-critical perimeter deployments.
            </p>
            <p>
              Equipped with heavy-gauge weather-sealed housings, precision counterbalancing, and microcomputer-regulated torque deceleration, this system delivers seamless operation with zero mechanical bounce or backlash across all climatic zones in India.
            </p>
            <p>
              Native telemetry support for Wiegand, RS-485, and dry contact relays ensures drop-in compatibility with FASTag RFID readers, automatic number plate recognition (ANPR) cameras, safety ground loops, and building management controllers.
            </p>
          </div>
        </div>

        {/* 4. Key Engineering Subsystems & Technology */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="prod-section-header">
            <span className="prod-eyebrow">Industrial Engineering</span>
            <h2 className="prod-section-title">Key Engineering Subsystems &amp; Technology</h2>
          </div>

          <div className="subsystems-grid">
            <div className="subsystem-card">
              <div className="subsystem-num">01</div>
              <h3 className="subsystem-title">Precision Actuation Kinematics</h3>
              <p className="subsystem-desc">
                High-torque motor and hardened gearbox linkage convert mechanical power smoothly, automatically decelerating at limits to eliminate mechanical shock.
              </p>
            </div>

            <div className="subsystem-card">
              <div className="subsystem-num">02</div>
              <h3 className="subsystem-title">Counterbalance Spring Balancing</h3>
              <p className="subsystem-desc">
                Calibrated compression springs ensure exact mechanical equilibrium, enabling effortless manual lifting during power outages and reducing operating thermal loads by over 60%.
              </p>
            </div>

            <div className="subsystem-card">
              <div className="subsystem-num">03</div>
              <h3 className="subsystem-title">Heavy Corrosion-Resistant Enclosure</h3>
              <p className="subsystem-desc">
                Heavy-gauge cold-rolled steel treated with zinc phosphating and electrostatic polyester powder coating to withstand aggressive industrial grit, salt, and heavy monsoons.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Technical Parameters Table & Civil Guidelines Sidebar */}
        <div className="specs-sidebar-layout">
          {/* Specs Table Column */}
          <div className="prod-overview-card" style={{ marginBottom: 0 }}>
            <div className="prod-section-header flex-row-header">
              <div>
                <span className="prod-eyebrow">Technical Parameters</span>
                <h2 className="prod-section-title">Verified Hardware Specifications</h2>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', fontWeight: 700, color: '#64748B' }}>
                {product.modelCode}
              </span>
            </div>

            <table className="specs-table">
              <tbody>
                {product.specs.map((spec, idx) => (
                  <tr key={idx}>
                    <td className="spec-name">{spec.key}</td>
                    <td className="spec-val">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sidebar: Civil, Interop & Quality */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Civil Foundation */}
            <div className="prod-overview-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                color: 'var(--color-logo-blue)',
                marginBottom: '0.75rem',
                borderBottom: '1px solid var(--theme-border-subtle)',
                paddingBottom: '0.5rem'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span>Civil &amp; Foundation Guidelines</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#475569' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--color-logo-blue)', fontWeight: 800 }}>&bull;</span>
                  <span>Reinforced concrete foundation pad min. 450 x 450 x 500 mm depth</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--color-logo-blue)', fontWeight: 800 }}>&bull;</span>
                  <span>Single-phase 230V AC, 50Hz electrical feed with 6A dedicated circuit breaker</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--color-logo-blue)', fontWeight: 800 }}>&bull;</span>
                  <span>Sub-surface PVC conduit routing for dual safety inductive ground loops</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--color-logo-blue)', fontWeight: 800 }}>&bull;</span>
                  <span>Clear unobstructed operating envelope with overhead buffer margin</span>
                </li>
              </ul>
            </div>

            {/* System Interoperability */}
            <div className="prod-overview-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                color: '#D97706',
                marginBottom: '0.75rem',
                borderBottom: '1px solid var(--theme-border-subtle)',
                paddingBottom: '0.5rem'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>System Interoperability</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['FASTag RFID Tolling', 'ANPR Cameras', 'Safety Ground Loops', 'Infrared Photocells', 'BMS / ERP Relays', 'Wiegand & OSDP'].map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      color: '#334155',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.55rem',
                      borderRadius: '4px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Governance Card */}
            <div style={{
              background: '#121F45',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#56ACDD', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                <span>Quality Governance</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Fabricated and endurance-tested at Neptune Automatic under certified ISO 9001:2015 quality management procedures.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => openQuote(`Tender Specs: ${product.name}`)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  padding: '0.5rem',
                  justifyContent: 'center'
                }}
              >
                <span>Request Custom CAD / Tender Specs</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6. Mission-Critical Sector Applications */}
        <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
          <div className="prod-section-header">
            <span className="prod-eyebrow">Operational Deployment</span>
            <h2 className="prod-section-title">Mission-Critical Sector Applications</h2>
          </div>

          <div className="sector-apps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="sector-app-card">
              <div className="sector-app-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                </svg>
              </div>
              <h3 className="sector-app-title">Cement &amp; Heavy Manufacturing</h3>
              <p className="sector-app-desc">
                Withstands high particulate dust, abrasive grit, and continuous vibrations from passing heavy freight trailers, ensuring uninterrupted industrial dispatch.
              </p>
            </div>

            <div className="sector-app-card">
              <div className="sector-app-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="sector-app-title">E-Commerce &amp; Logistics Hubs</h3>
              <p className="sector-app-desc">
                Processes thousands of delivery vans and container trucks daily with continuous 100% duty cycle rating and zero thermal stoppage during peak fulfillment seasons.
              </p>
            </div>

            <div className="sector-app-card">
              <div className="sector-app-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="sector-app-title">Government &amp; Defense Facilities</h3>
              <p className="sector-app-desc">
                Integrates with hostile vehicle mitigation protocols, ANPR cameras, and access control networks to guarantee absolute perimeter denial.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Other Models in this Subcategory */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="prod-eyebrow">Category Models</span>
                <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-logo-blue)', margin: 0 }}>
                  Other Models in {category.categoryName}
                </h2>
              </div>
              <Link
                href={`/products/${category.categorySlug}`}
                className="btn btn-outline"
                style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
              >
                <span>View All {category.products.length} Models &rarr;</span>
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.slice(0, 3).map((rel) => (
                <div key={rel.slug} className="hardware-model-card">
                  <div className="hardware-card-content">
                    <div className="hardware-card-img-wrap" style={{ aspectRatio: '16/10', position: 'relative' }}>
                      <Image
                        src={rel.images[0] || category.heroImage}
                        alt={rel.name}
                        width={280}
                        height={180}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        loading="lazy"
                      />
                      <span className="hardware-badge-code">{rel.modelCode}</span>

                      {/* Wishlist Heart Icon */}
                      <button
                        type="button"
                        className={`card-wishlist-quick-btn ${isInWishlist(rel.slug) ? 'active' : ''}`}
                        title={isInWishlist(rel.slug) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist({
                            slug: rel.slug,
                            categorySlug: category.categorySlug,
                            name: rel.name,
                            modelCode: rel.modelCode,
                            categoryName: category.categoryName,
                            division: category.division,
                            image: rel.images[0] || category.heroImage,
                            tagline: rel.tagline,
                          });
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isInWishlist(rel.slug) ? '#D32628' : 'none'} stroke={isInWishlist(rel.slug) ? '#D32628' : '#64748B'} strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="hardware-card-title" style={{ fontSize: '0.9375rem' }}>
                      <Link href={`/products/${category.categorySlug}/${rel.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {rel.name}
                      </Link>
                    </h4>
                    <p className="hardware-card-desc" style={{ fontSize: '0.75rem' }}>
                      {rel.shortDesc}
                    </p>
                  </div>
                  <div className="hardware-card-actions" style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderTop: '1px solid var(--theme-border-subtle)', display: 'flex', gap: '8px' }}>
                    <Link
                      href={`/products/${category.categorySlug}/${rel.slug}`}
                      className="btn btn-outline"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem', padding: '0.45rem' }}
                    >
                      <span>Specs</span>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1.2, justifyContent: 'center', fontSize: '0.75rem', padding: '0.45rem', gap: '4px' }}
                      onClick={() => {
                        addToCart({
                          slug: rel.slug,
                          categorySlug: category.categorySlug,
                          name: rel.name,
                          modelCode: rel.modelCode,
                          categoryName: category.categoryName,
                          division: category.division,
                          image: rel.images[0] || category.heroImage,
                          tagline: rel.tagline,
                        }, 1);
                        openCart();
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>+ Quote</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Return Link */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href={`/products/${category.categorySlug}`} className="btn btn-outline">
            <span>&larr; Return to {category.categoryName} Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
