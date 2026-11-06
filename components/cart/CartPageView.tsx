'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, CartItem } from '@/context/CartContext';

export default function CartPageView() {
  const {
    cart,
    wishlist,
    updateQuantity,
    removeFromCart,
    clearCart,
    moveToCart,
    removeFromWishlist,
    totalCartCount,
  } = useCart();

  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist'>('cart');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqRef, setRfqRef] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    company: string;
    city: string;
    application: string;
    installation: string;
    notes: string;
    items: CartItem[];
  } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    application: 'Commercial Tech Park',
    installation: 'Turnkey Supply & Installation',
    notes: '',
  });

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `RFQ-NAPL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqRef(ref);
    setSubmittedData({
      ...formData,
      items: [...cart],
    });
    setRfqSubmitted(true);
    clearCart();
  };

  return (
    <div className="cart-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/products">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Quotation Basket &amp; RFQ Builder</span>
        </nav>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--color-logo-blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            B2B Commercial Procurement
          </span>
          <h1
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--theme-text-primary)',
              letterSpacing: '-0.025em',
            }}
          >
            Quotation Cart &amp; System Bundling
          </h1>
          <p style={{ color: 'var(--theme-text-secondary)', maxWidth: '750px', marginTop: '0.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Review your selected access automation hardware, specify delivery locations, and raise an official technical and pricing proposal directly with Neptune Automatic senior engineers.
          </p>
        </div>

        {/* Tabs: Cart vs Wishlist */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '2px solid var(--theme-border)',
            marginBottom: '2.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('cart')}
            style={{
              padding: '0.85rem 1.5rem',
              fontSize: '1rem',
              fontWeight: activeTab === 'cart' ? 700 : 500,
              color: activeTab === 'cart' ? 'var(--color-logo-blue)' : 'var(--theme-text-muted)',
              borderBottom: activeTab === 'cart' ? '3px solid var(--color-logo-blue)' : '3px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-2px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Quotation Cart ({totalCartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            style={{
              padding: '0.85rem 1.5rem',
              fontSize: '1rem',
              fontWeight: activeTab === 'wishlist' ? 700 : 500,
              color: activeTab === 'wishlist' ? 'var(--color-logo-red)' : 'var(--theme-text-muted)',
              borderBottom: activeTab === 'wishlist' ? '3px solid var(--color-logo-red)' : '3px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-2px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={activeTab === 'wishlist' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: CART VIEW
            ========================================================================= */}
        {activeTab === 'cart' && (
          <>
            {rfqSubmitted && submittedData ? (
              <div
                style={{
                  background: 'var(--theme-bg-surface, #FFFFFF)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(2rem, 5vw, 4rem)',
                  textAlign: 'center',
                  maxWidth: '780px',
                  margin: '0 auto',
                  boxShadow: '0 20px 40px rgba(10, 17, 40, 0.08)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  Quotation Request Raised Successfully!
                </h2>

                <div
                  style={{
                    display: 'inline-block',
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '0.45rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                    color: 'var(--color-logo-blue)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Official Reference ID: <strong>{rfqRef}</strong>
                </div>

                <p style={{ color: 'var(--theme-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thank you <strong>{submittedData.name}</strong> from <strong>{submittedData.company}</strong>. Our Senior Technical Estimator is reviewing your product bundle and will dispatch a formal GST Proforma Quotation and installation specifications to <strong>{submittedData.email}</strong> within 2 business hours.
                </p>

                <div
                  style={{
                    background: 'var(--theme-bg-alt, #F8FAFC)',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textAlign: 'left',
                    marginBottom: '2rem',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted)', marginBottom: '0.75rem' }}>
                    Bundled Products Included:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {submittedData.items.map((it) => (
                      <li key={it.slug} style={{ fontSize: '0.95rem', color: 'var(--theme-text-primary)' }}>
                        <strong>{it.name}</strong> ({it.modelCode}) &times; {it.quantity} Unit(s)
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--theme-border)', fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>
                    <strong>Delivery Location:</strong> {submittedData.city} &bull; <strong>Scope:</strong> {submittedData.installation}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setRfqSubmitted(false);
                      setSubmittedData(null);
                    }}
                  >
                    Raise Another Quotation
                  </button>
                  <Link href="/products" className="btn btn-primary">
                    <span>Explore Products Portfolio &rarr;</span>
                  </Link>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div
                style={{
                  background: 'var(--theme-bg-surface, #FFFFFF)',
                  border: '1px dashed var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '5rem 2rem',
                  textAlign: 'center',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}
              >
                <div style={{ color: 'var(--theme-text-muted)', marginBottom: '1.5rem' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  Your Quotation Basket is Empty
                </h2>
                <p style={{ color: 'var(--theme-text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                  You haven&apos;t added any access automation or smart parking hardware to your quote cart yet. Browse our verified product lines and add items for consolidated pricing.
                </p>
                <Link href="/products" className="btn btn-primary">
                  <span>Browse Products Directory</span>
                  <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'start',
                }}
              >
                {/* Left Col: Cart Items */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                      Selected Hardware Systems ({totalCartCount})
                    </h2>
                    <button
                      type="button"
                      onClick={clearCart}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '0.85rem',
                        color: 'var(--color-logo-red)',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Clear All Items
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cart.map((item) => (
                      <div
                        key={item.slug}
                        style={{
                          background: 'var(--theme-bg-surface, #FFFFFF)',
                          border: '1px solid var(--theme-border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          display: 'flex',
                          gap: '1.25rem',
                          alignItems: 'center',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div
                          style={{
                            width: '90px',
                            height: '75px',
                            background: '#F8FAFC',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--theme-border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            padding: '6px',
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={65}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-logo-blue)', fontWeight: 700 }}>
                            {item.division}
                          </span>
                          <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 4px' }}>
                            <Link href={`/products/${item.categorySlug}/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                              {item.name}
                            </Link>
                          </h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
                            Model: {item.modelCode}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', flexWrap: 'wrap', gap: '8px' }}>
                            <div className="qty-stepper">
                              <button type="button" onClick={() => updateQuantity(item.slug, -1)} aria-label="Decrease">&minus;</button>
                              <span>{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.slug, 1)} aria-label="Increase">&#43;</button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.slug)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--theme-text-muted)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Commercial note */}
                  <div
                    style={{
                      background: 'rgba(86, 172, 221, 0.08)',
                      border: '1px solid rgba(86, 172, 221, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                      marginTop: '1.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--theme-text-secondary)',
                      lineHeight: 1.55,
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-logo-blue)" strokeWidth="2" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>
                      <strong>Turnkey Engineering Tiers:</strong> Official quotation includes volume pricing tiers, freight to project site, optional foundation civil work, and 2-year OEM warranty.
                    </span>
                  </div>
                </div>

                {/* Right Col: Price Quotation Form */}
                <div
                  style={{
                    background: 'var(--theme-bg-surface, #FFFFFF)',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: '0 8px 24px rgba(10, 17, 40, 0.06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-logo-red)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Step 2 of 2
                  </span>
                  <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
                    Request Official Price Quotation
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)', marginBottom: '1.5rem' }}>
                    Enter your organization details to receive a customized quotation with detailed line items and technical drawings.
                  </p>

                  <form onSubmit={handleSubmitRfq} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label className="form-label" htmlFor="pageRfqName">Full Name *</label>
                      <input
                        type="text"
                        id="pageRfqName"
                        className="form-input"
                        placeholder="e.g. Vikram Malhotra"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="form-label" htmlFor="pageRfqCompany">Organization / Facility Name *</label>
                      <input
                        type="text"
                        id="pageRfqCompany"
                        className="form-input"
                        placeholder="e.g. DLF CyberCity, L&amp;T Realty"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label className="form-label" htmlFor="pageRfqEmail">Work Email *</label>
                        <input
                          type="email"
                          id="pageRfqEmail"
                          className="form-input"
                          placeholder="name@company.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="form-label" htmlFor="pageRfqPhone">Phone / Mobile *</label>
                        <input
                          type="tel"
                          id="pageRfqPhone"
                          className="form-input"
                          placeholder="+91 98765 43210"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label className="form-label" htmlFor="pageRfqCity">Project City &amp; State *</label>
                        <input
                          type="text"
                          id="pageRfqCity"
                          className="form-input"
                          placeholder="e.g. Bengaluru, Karnataka"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="form-label" htmlFor="pageRfqApp">Sector / Application</label>
                        <select
                          id="pageRfqApp"
                          className="form-select"
                          value={formData.application}
                          onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                        >
                          <option value="Commercial Tech Park">Commercial Tech Park</option>
                          <option value="Residential Gated Community">Residential Gated Community</option>
                          <option value="Manufacturing & Logistics">Manufacturing &amp; Logistics</option>
                          <option value="Government & Defense">Government &amp; Defense</option>
                          <option value="Airport / Transit Hub">Airport / Transit Hub</option>
                          <option value="Hospitality & Hotel">Hospitality &amp; Luxury Hotel</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="pageRfqInstall">Installation Requirement</label>
                      <select
                        id="pageRfqInstall"
                        className="form-select"
                        value={formData.installation}
                        onChange={(e) => setFormData({ ...formData, installation: e.target.value })}
                      >
                        <option value="Turnkey Supply & Installation">Turnkey Supply, Civil &amp; Commissioning</option>
                        <option value="Equipment Supply Only">Hardware Supply Only (Self Installation)</option>
                        <option value="Comprehensive AMC">Annual Maintenance Contract (AMC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="pageRfqNotes">Project Notes / Sizing Details (Optional)</label>
                      <textarea
                        id="pageRfqNotes"
                        className="form-textarea"
                        rows={3}
                        placeholder="Specific boom lengths, loop positions, RFID range requirements, or custom integration details..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      style={{ padding: '0.9rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
                    >
                      <span>Submit Price Quotation Request ({totalCartCount} Items) &rarr;</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {/* =========================================================================
            TAB 2: WISHLIST VIEW
            ========================================================================= */}
        {activeTab === 'wishlist' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {wishlist.length === 0 ? (
              <div
                style={{
                  background: 'var(--theme-bg-surface, #FFFFFF)',
                  border: '1px dashed var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: 'var(--color-logo-red)', marginBottom: '1rem' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Your Wishlist is Empty
                </h2>
                <p style={{ color: 'var(--theme-text-secondary)', marginBottom: '1.5rem' }}>
                  Click the heart icon on any product page or category listing to save items for comparison.
                </p>
                <Link href="/products" className="btn btn-primary btn-sm">
                  Explore Products
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {wishlist.map((item) => (
                  <div
                    key={item.slug}
                    style={{
                      background: 'var(--theme-bg-surface, #FFFFFF)',
                      border: '1px solid var(--theme-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '100%',
                          height: '140px',
                          background: '#F8FAFC',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem',
                          padding: '10px',
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={160}
                          height={120}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-logo-blue)', fontWeight: 700 }}>
                        {item.division}
                      </span>
                      <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 4px' }}>
                        <Link href={`/products/${item.categorySlug}/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {item.name}
                        </Link>
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
                        Model: {item.modelCode}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '1.25rem' }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                        onClick={() => {
                          moveToCart(item.slug);
                          setActiveTab('cart');
                        }}
                      >
                        Move to Quote Cart
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => removeFromWishlist(item.slug)}
                        title="Remove from wishlist"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
