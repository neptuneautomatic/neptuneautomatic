'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

interface Review {
  id: number;
  initials: string;
  avatarClass: string;
  name: string;
  role: string;
  text: string;
  tag: string;
}

const reviews: Review[] = [
  {
    id: 1,
    initials: 'RS',
    avatarClass: 'avatar-blue',
    name: 'Rajesh Sharma',
    role: 'Head of Facility Management · DLF CyberCity',
    text: '"Deployed Neptune\'s FASTag parking system and high-frequency barriers across 8 lanes. Peak clearance improved by 45% and revenue leakage dropped to zero. Exceptionally responsive technical team."',
    tag: 'FASTag Parking Automation',
  },
  {
    id: 2,
    initials: 'VR',
    avatarClass: 'avatar-dark',
    name: 'Vikramaditya Rao',
    role: 'Chief Security Officer · GMR Aerocity Infrastructure',
    text: '"High-security ASTM crash bollards and road blockers installed for perimeter defense. The hydraulic engineering has performed flawlessly through heavy traffic and monsoons. Ideal for high-threat sites."',
    tag: 'Crash-Rated Bollards & Road Blockers',
  },
  {
    id: 3,
    initials: 'AS',
    avatarClass: 'avatar-teal',
    name: 'Ananya Sengupta',
    role: 'Workplace Lead · Reliance Corporate Hub',
    text: '"Architectural optical speed gates with RFID and biometric access. The hairline SUS304 finish complements our lobby while easily handling 4,000+ employees during peak hours."',
    tag: 'Optical Speed Gates & Turnstiles',
  },
  {
    id: 4,
    initials: 'SN',
    avatarClass: 'avatar-blue',
    name: 'Suresh Nair',
    role: 'General Manager Plant Engineering · Schneider Hub',
    text: '"Continuous 24/7 industrial sliding gate operators for heavy trailer ingress. Obstacle detection and safety edges ensure full adherence to plant audits. Outstanding build quality."',
    tag: 'Industrial Gate Operators',
  },
  {
    id: 5,
    initials: 'PV',
    avatarClass: 'avatar-dark',
    name: 'Col. Pradeep Verma (Retd.)',
    role: 'Director Estate & Security · Apollo Hospitals',
    text: '"Ultrasonic parking guidance with dynamic LED floor signs transformed our hospital parking. Basement congestion dropped by 60% and emergency corridors remain clear at all times."',
    tag: 'Ultrasonic Parking Guidance (PGS)',
  },
  {
    id: 6,
    initials: 'MA',
    avatarClass: 'avatar-teal',
    name: 'Manish Agarwal',
    role: 'Operations VP · Mahindra World City',
    text: '"From civil layout schematics to final commissioning, Neptune delivered on schedule. Their nationwide AMC network provides excellent uptime reliability across our smart township."',
    tag: 'Integrated Township Access & AMC',
  },
];

export default function Testimonials() {
  const { openQuote } = useModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const slide = (direction: number) => {
    if (trackRef.current) {
      const step = 360;
      trackRef.current.scrollBy({
        left: direction * step,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="section-padding google-reviews-section" id="testimonials" aria-label="Google Reviews and Client Testimonials">
      <div className="layout-container">
        {/* Section Header */}
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">
              <svg className="google-badge-mini-icon" viewBox="0 0 24 24" width="16" height="16">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              Verified Google Reviews &amp; Client Feedback
            </span>
            <h2 className="section-title">What Clients Say About Neptune Automatic</h2>
          </div>
          <p className="section-subtitle">
            Real feedback from infrastructure managers, security chiefs, and facility directors across India, verified on our Google My Business profile.
          </p>
        </div>

        {/* Google Business Profile Scorecard Bar */}
        <div className="google-scorecard-card scroll-reveal">
          <div className="google-scorecard-main">
            <div className="google-logo-box">
              <svg viewBox="0 0 48 48" width="40" height="40">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.79l7.98-6.2z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            </div>
            <div className="google-scorecard-info">
              <div className="google-rating-number-row">
                <span className="google-big-rating">4.8</span>
                <div className="google-stars-group" aria-label="Rated 4.8 out of 5 stars">
                  <svg viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <svg viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="google-star-half">
                        <stop offset="80%" stopColor="#FBBC04" />
                        <stop offset="80%" stopColor="#E2E8F0" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#google-star-half)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <span className="google-reviews-count">307 Google Reviews</span>
              </div>
              <div className="google-business-meta">
                <strong>Neptune Automatic Pvt. Ltd.</strong> · A-11, Sector-59, Noida, Uttar Pradesh
              </div>
            </div>
          </div>

          <div className="google-scorecard-actions">
            <a
              href="https://www.google.com/maps/place/Neptune+Automatic+Pvt.+Ltd./@28.6063549,77.3674174,15z/data=!4m2!3m1!1s0x0:0x3e78c4ea522169d2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm google-profile-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>View on Google Maps</span>
            </a>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => openQuote('Site Survey Request')}>
              <span>Request Site Survey</span>
            </button>
          </div>
        </div>

        {/* Slidable Testimonials Container */}
        <div className="google-reviews-slider-container scroll-reveal">
          <button
            type="button"
            className="google-reviews-nav-arrow reviews-nav-prev"
            id="reviewsPrevBtn"
            aria-label="Previous Google Reviews"
            onClick={() => slide(-1)}
            style={{ opacity: canScrollLeft ? 1 : 0.4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className="google-reviews-track"
            id="reviewsTrack"
            ref={trackRef}
            onScroll={checkScroll}
          >
            {reviews.map((r) => (
              <article key={r.id} className="google-review-card">
                <div className="review-card-header">
                  <div className={`reviewer-avatar ${r.avatarClass}`}>{r.initials}</div>
                  <div className="reviewer-meta">
                    <h4 className="reviewer-name">{r.name}</h4>
                    <span className="reviewer-role">{r.role}</span>
                  </div>
                  <div className="google-g-mini">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                  </div>
                </div>
                <div className="review-rating-row">
                  <div className="review-stars">★★★★★</div>
                  <span className="review-badge-verified">Verified Google Review</span>
                </div>
                <p className="review-body">{r.text}</p>
                <div className="review-footer">
                  <span className="review-solution-tag">{r.tag}</span>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="google-reviews-nav-arrow reviews-nav-next"
            id="reviewsNextBtn"
            aria-label="Next Google Reviews"
            onClick={() => slide(1)}
            style={{ opacity: canScrollRight ? 1 : 0.4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
