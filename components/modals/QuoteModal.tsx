'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function QuoteModal() {
  const { isQuoteOpen, quoteProduct, closeQuote } = useModal();
  const [product, setProduct] = useState(quoteProduct || 'Automatic Boom Barriers');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [facility, setFacility] = useState('Corporate / IT Park');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (quoteProduct) {
      setProduct(quoteProduct);
    }
  }, [quoteProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isQuoteOpen) {
        closeQuote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuoteOpen, closeQuote]);

  if (!isQuoteOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formCode: 'rfq',
          data: {
            name,
            company,
            email,
            phone,
            product,
            facility,
            message,
          },
        }),
      });
    } catch (err) {
      console.error('Failed to submit quote request', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        closeQuote();
      }, 2500);
    }
  };

  return (
    <div
      className="modal-backdrop is-open"
      id="quoteModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeQuote();
      }}
    >
      <div className="modal-dialog">
        <button
          className="modal-close-btn"
          aria-label="Close modal"
          type="button"
          onClick={closeQuote}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <span className="mono-tag" style={{ color: 'var(--color-accent)' }}>
            Neptune Solution Configurator
          </span>
          <h3 id="modalTitle">Request a Technical Proposal &amp; Quote</h3>
          <p>
            Tell us about your premise access or parking requirements, and our engineers will provide an itemized system specification and quote.
          </p>
        </div>

        {submitted ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
            <div style={{ color: '#10B981', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              ✓ Request Submitted Successfully
            </div>
            <p style={{ color: '#64748B' }}>
              Our senior engineering consultant will review your site requirements and contact you within 2 business hours.
            </p>
          </div>
        ) : (
          <form className="modal-form" id="quoteForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="quoteName">Full Name *</label>
              <input
                type="text"
                id="quoteName"
                className="form-input"
                placeholder="e.g. Vikram Malhotra"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quoteCompany">Organization / Facility *</label>
              <input
                type="text"
                id="quoteCompany"
                className="form-input"
                placeholder="e.g. DLF CyberCity, L&amp;T Realty"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quoteEmail">Work Email *</label>
              <input
                type="email"
                id="quoteEmail"
                className="form-input"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quotePhone">Phone / Mobile *</label>
              <input
                type="tel"
                id="quotePhone"
                className="form-input"
                placeholder="+91 98765 43210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quoteProduct">Primary Solution Required *</label>
              <select
                id="quoteProduct"
                className="form-select"
                required
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="Automatic Boom Barriers">Automatic Boom Barriers</option>
                <option value="High Security Automatic Bollards">High-Security Automatic Bollards</option>
                <option value="Intelligent Parking Management (PMS)">Intelligent Parking Management (PMS)</option>
                <option value="Smart Parking Guidance (PGS)">Smart Parking Guidance (PGS)</option>
                <option value="ANPR & FASTag Solutions">AI ANPR &amp; FASTag Access Control</option>
                <option value="Sliding & Swing Gate Automation">Gate Automation (Sliding &amp; Swing)</option>
                <option value="Road Blockers & Tyre Killers">Road Blockers &amp; Hostile Vehicle Mitigation</option>
                <option value="Pedestrian Turnstiles & Speed Gates">Pedestrian Speed Gates &amp; Flap Barriers</option>
                <option value="Complete Enterprise Automation Portfolio">Complete Integrated Portfolio</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quoteFacility">Facility Type *</label>
              <select
                id="quoteFacility"
                className="form-select"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
              >
                <option value="Corporate / IT Park">Corporate / IT Tech Park</option>
                <option value="Airport / Transit Hub">Airport / Metro / Transit Hub</option>
                <option value="Manufacturing / Logistics">Manufacturing / Logistics Warehouse</option>
                <option value="Government / Defense">Government / Defense / Embassy</option>
                <option value="Shopping Mall / Mixed Use">Commercial Mall / Mixed-Use Complex</option>
                <option value="Residential Society">Premium Residential Gated Community</option>
              </select>
            </div>

            <div className="form-group-full">
              <label className="form-label" htmlFor="quoteMessage">Site Details / Special Requirements</label>
              <textarea
                id="quoteMessage"
                className="form-textarea"
                placeholder="Describe number of entry/exit lanes, daily traffic volume, custom integrations, or site location..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group-full" style={{ marginTop: '0.5rem' }}>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
                <span>{submitting ? 'Submitting...' : 'Submit Proposal Request'}</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
