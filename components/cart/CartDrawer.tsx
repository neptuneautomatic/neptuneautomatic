'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, CartItem } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    wishlist,
    isCartOpen,
    closeCart,
    activeDrawerTab,
    setActiveDrawerTab,
    updateQuantity,
    setExactQuantity,
    removeFromCart,
    clearCart,
    moveToCart,
    removeFromWishlist,
    totalCartCount,
    totalWishlistCount,
    toasts,
    removeToast,
  } = useCart();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
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

  // Form State
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Reset step when cart opens
  useEffect(() => {
    if (isCartOpen && step === 'success') {
      setStep('cart');
    }
  }, [isCartOpen]);

  if (!isCartOpen && toasts.length === 0) return null;

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `RFQ-NAPL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqRef(generatedRef);
    setSubmittedData({
      ...formData,
      items: [...cart],
    });
    setStep('success');
    clearCart();
  };

  return (
    <>
      {/* Toast Notification Container */}
      <div className="cart-toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`cart-toast-item cart-toast-${toast.type}`}>
            <div className="cart-toast-icon">
              {toast.type === 'cart' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              )}
              {toast.type === 'wishlist' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              )}
            </div>
            <div className="cart-toast-text">{toast.text}</div>
            <button
              type="button"
              className="cart-toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Drawer Overlay & Content */}
      {isCartOpen && (
        <div
          className="cart-drawer-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCart();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Quotation Cart & Wishlist"
        >
          <div className="cart-drawer-panel">
            {/* Drawer Header */}
            <div className="cart-drawer-header">
              <div className="cart-drawer-tabs">
                <button
                  type="button"
                  className={`cart-drawer-tab ${activeDrawerTab === 'cart' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDrawerTab('cart');
                    if (step === 'success') setStep('cart');
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>Quote Cart ({totalCartCount})</span>
                </button>
                <button
                  type="button"
                  className={`cart-drawer-tab ${activeDrawerTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveDrawerTab('wishlist')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={activeDrawerTab === 'wishlist' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>Wishlist ({totalWishlistCount})</span>
                </button>
              </div>

              <button
                type="button"
                className="cart-drawer-close"
                onClick={closeCart}
                aria-label="Close drawer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="cart-drawer-body">
              {/* =============================================================
                  TAB 1: CART / QUOTATION BASKET
                  ============================================================= */}
              {activeDrawerTab === 'cart' && (
                <>
                  {/* Step 1: Review Items */}
                  {step === 'cart' && (
                    <>
                      {cart.length === 0 ? (
                        <div className="cart-empty-state">
                          <div className="cart-empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                          </div>
                          <h3>Your Quotation Cart is Empty</h3>
                          <p>
                            Browse our product portfolio of automatic boom barriers, security bollards, gate automation, and parking systems. Add items to your cart to raise an official price quotation.
                          </p>
                          <Link
                            href="/products"
                            className="btn btn-primary btn-sm"
                            onClick={closeCart}
                          >
                            <span>Explore Products Portfolio</span>
                            <svg className="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <div className="cart-content-wrap">
                          <div className="cart-header-status">
                            <span>{totalCartCount} item(s) selected for Price Quotation</span>
                            <button
                              type="button"
                              className="cart-clear-btn"
                              onClick={clearCart}
                            >
                              Clear All
                            </button>
                          </div>

                          {/* Items List */}
                          <div className="cart-items-list">
                            {cart.map((item) => (
                              <div key={item.slug} className="cart-item-card">
                                <div className="cart-item-thumb">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={75}
                                    height={60}
                                    style={{ objectFit: 'contain' }}
                                  />
                                </div>
                                <div className="cart-item-info">
                                  <div className="cart-item-division">{item.division}</div>
                                  <Link
                                    href={`/products/${item.categorySlug}/${item.slug}`}
                                    className="cart-item-name"
                                    onClick={closeCart}
                                  >
                                    {item.name}
                                  </Link>
                                  <div className="cart-item-code">Model: {item.modelCode}</div>

                                  <div className="cart-item-controls">
                                    <div className="qty-stepper">
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.slug, -1)}
                                        aria-label="Decrease quantity"
                                      >
                                        &minus;
                                      </button>
                                      <input
                                        type="number"
                                        className="qty-stepper-input"
                                        min={1}
                                        max={999}
                                        value={item.quantity}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value, 10);
                                          if (!isNaN(val) && val >= 1) {
                                            setExactQuantity(item.slug, Math.min(999, val));
                                          }
                                        }}
                                        aria-label={`Quantity for ${item.name}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => updateQuantity(item.slug, 1)}
                                        aria-label="Increase quantity"
                                      >
                                        &#43;
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      className="cart-item-remove-btn"
                                      onClick={() => removeFromCart(item.slug)}
                                      title="Remove from quote"
                                      aria-label={`Remove ${item.name}`}
                                    >
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

                          {/* Commercial Notice */}
                          <div className="cart-commercial-note">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <span>
                              <strong>B2B Turnkey Pricing:</strong> Custom engineering discount tiers, GST invoice, freight estimates, and installation options are calculated on the next step.
                            </span>
                          </div>

                          {/* Next Step Action */}
                          <div className="cart-footer-action">
                            <button
                              type="button"
                              className="btn btn-primary btn-block"
                              onClick={() => setStep('checkout')}
                            >
                              <span>Proceed to Request Quotation ({totalCartCount} Items)</span>
                              <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Step 2: Quotation Request Form */}
                  {step === 'checkout' && (
                    <div className="cart-checkout-wrap">
                      <div className="cart-checkout-header">
                        <button
                          type="button"
                          className="cart-back-btn"
                          onClick={() => setStep('cart')}
                        >
                          &larr; Back to Items ({totalCartCount})
                        </button>
                        <h3>Raise Price Quotation Request</h3>
                        <p>
                          Fill up your organization details below to receive an official itemized price quotation, CAD layouts, and technical data sheets.
                        </p>
                      </div>

                      {/* Items Summary Pill */}
                      <div className="cart-summary-chips">
                        <span className="summary-chips-label">Selected Products:</span>
                        <div className="summary-chips-list">
                          {cart.map((it) => (
                            <span key={it.slug} className="summary-chip">
                              {it.name} &times; <strong>{it.quantity}</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quotation Form */}
                      <form className="cart-rfq-form" onSubmit={handleSubmitRfq}>
                        <div className="form-group">
                          <label className="form-label" htmlFor="rfqName">Your Full Name *</label>
                          <input
                            type="text"
                            id="rfqName"
                            className="form-input"
                            placeholder="e.g. Rajesh Sharma"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="rfqCompany">Organization / Facility Name *</label>
                          <input
                            type="text"
                            id="rfqCompany"
                            className="form-input"
                            placeholder="e.g. DLF CyberCity, L&amp;T, Oberoi Realty"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>

                        <div className="form-grid-2">
                          <div className="form-group">
                            <label className="form-label" htmlFor="rfqEmail">Work Email *</label>
                            <input
                              type="email"
                              id="rfqEmail"
                              className="form-input"
                              placeholder="name@company.com"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="rfqPhone">Phone / WhatsApp *</label>
                            <input
                              type="tel"
                              id="rfqPhone"
                              className="form-input"
                              placeholder="+91 98765 43210"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="form-grid-2">
                          <div className="form-group">
                            <label className="form-label" htmlFor="rfqCity">Project City &amp; State *</label>
                            <input
                              type="text"
                              id="rfqCity"
                              className="form-input"
                              placeholder="e.g. Mumbai, Maharashtra"
                              required
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="rfqApp">Sector / Application</label>
                            <select
                              id="rfqApp"
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
                              <option value="Healthcare & Hospital">Healthcare &amp; Hospital</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="rfqInstall">Scope Requirement</label>
                          <select
                            id="rfqInstall"
                            className="form-select"
                            value={formData.installation}
                            onChange={(e) => setFormData({ ...formData, installation: e.target.value })}
                          >
                            <option value="Turnkey Supply & Installation">Turnkey Supply, Civil &amp; Commissioning</option>
                            <option value="Equipment Supply Only">Hardware Supply Only (Self Installation)</option>
                            <option value="Annual Maintenance Contract (AMC)">Comprehensive Annual Maintenance (AMC)</option>
                            <option value="Consulting & Site Survey">Technical Feasibility &amp; Site Survey</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="rfqNotes">Additional Project Sizing / Notes (Optional)</label>
                          <textarea
                            id="rfqNotes"
                            className="form-textarea"
                            rows={3}
                            placeholder="Specify boom arm length, FASTag reader quantity, bollard crash rating, or custom integration needs..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          style={{ marginTop: '1rem', padding: '0.85rem' }}
                        >
                          <span>Submit Quotation Request &rarr;</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Step 3: Success Confirmation */}
                  {step === 'success' && submittedData && (
                    <div className="cart-success-wrap">
                      <div className="cart-success-badge">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>

                      <h2>Quotation Request Raised!</h2>
                      <div className="rfq-ref-pill">
                        Reference Number: <strong>{rfqRef}</strong>
                      </div>

                      <p className="cart-success-desc">
                        Thank you <strong>{submittedData.name}</strong> ({submittedData.company}). An official price quotation with comprehensive technical specifications has been scheduled for your selected items.
                      </p>

                      <div className="cart-success-summary-card">
                        <div className="success-card-title">Requested Products:</div>
                        <ul>
                          {submittedData.items.map((it) => (
                            <li key={it.slug}>
                              <strong>{it.name}</strong> ({it.modelCode}) &times; {it.quantity} unit(s)
                            </li>
                          ))}
                        </ul>
                        <div className="success-delivery-loc">
                          <strong>Delivery Location:</strong> {submittedData.city} &bull; {submittedData.installation}
                        </div>
                      </div>

                      <div className="success-sla-notice">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Our Senior Technical Sizing Engineer will email the Proforma Quotation within <strong>2 business hours</strong> to <strong>{submittedData.email}</strong>.</span>
                      </div>

                      <div className="cart-success-actions">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setStep('cart');
                            closeCart();
                          }}
                        >
                          Continue Browsing Portfolio
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* =============================================================
                  TAB 2: WISHLIST
                  ============================================================= */}
              {activeDrawerTab === 'wishlist' && (
                <div className="wishlist-content-wrap">
                  {wishlist.length === 0 ? (
                    <div className="cart-empty-state">
                      <div className="cart-empty-icon" style={{ color: '#D32628' }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </div>
                      <h3>Your Wishlist is Empty</h3>
                      <p>
                        Tap the heart icon on any product or category to save systems for later comparison and quotation bundling.
                      </p>
                      <Link
                        href="/products"
                        className="btn btn-primary btn-sm"
                        onClick={closeCart}
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="cart-header-status">
                        <span>{wishlist.length} item(s) saved in your wishlist</span>
                      </div>

                      <div className="cart-items-list">
                        {wishlist.map((item) => (
                          <div key={item.slug} className="cart-item-card">
                            <div className="cart-item-thumb">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={75}
                                height={60}
                                style={{ objectFit: 'contain' }}
                              />
                            </div>
                            <div className="cart-item-info">
                              <div className="cart-item-division">{item.division}</div>
                              <Link
                                href={`/products/${item.categorySlug}/${item.slug}`}
                                className="cart-item-name"
                                onClick={closeCart}
                              >
                                {item.name}
                              </Link>
                              <div className="cart-item-code">Model: {item.modelCode}</div>

                              <div style={{ display: 'flex', gap: '8px', marginTop: '0.6rem' }}>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                                  onClick={() => moveToCart(item.slug)}
                                >
                                  Add to Cart
                                </button>
                                <button
                                  type="button"
                                  className="cart-item-remove-btn"
                                  onClick={() => removeFromWishlist(item.slug)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
