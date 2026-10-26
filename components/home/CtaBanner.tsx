'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';

export default function CtaBanner() {
  const { openQuote } = useModal();

  return (
    <section className="section-padding cta-banner-section">
      <div className="layout-container">
        <div className="cta-banner-box scroll-reveal">
          <div className="cta-banner-content">
            <h2>Ready to Upgrade Your Premise Security &amp; Access?</h2>
            <p>
              Consult with our engineering team for custom site evaluation, traffic simulation, and turnkey deployment proposals.
            </p>
          </div>
          <div className="cta-banner-actions">
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => openQuote('Complete Automation Solution')}
            >
              <span>Schedule Site Assessment</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a href="tel:+918010807000" className="btn btn-secondary">
              <span>Call +91 8010 807 000</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
