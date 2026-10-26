'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

export default function Footer() {
  const { openQuote } = useModal();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      alert('Thank you for subscribing to Neptune Automatic Technical Briefs.');
      setEmail('');
    }
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="layout-container">
        {/* Main Columns */}
        <div className="footer-top-grid">
          {/* Col 1: About */}
          <div className="footer-col-about">
            <Image
              src="/assets/images/neptune-logo.png"
              alt="Neptune Automatic"
              width={200}
              height={50}
              style={{ height: 'auto', width: '200px' }}
            />
            <p>
              Neptune Automatic Pvt. Ltd. is India&apos;s premier manufacturer and turnkey integrator of high-performance access automation, parking management systems, and high-security hostile vehicle mitigation solutions since 2005.
            </p>
            <div className="footer-social-links">
              <a
                href="https://www.linkedin.com/company/neptune-automatic-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@NeptuneAutomatic"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/neptuneautomatic/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="footer-col">
            <h5 className="footer-col-title">Solutions</h5>
            <ul className="footer-menu">
              <li><Link href="#solutions">Boom Barriers</Link></li>
              <li><Link href="#solutions">Automatic Bollards</Link></li>
              <li><Link href="#solutions">Parking Management (PMS)</Link></li>
              <li><Link href="#solutions">Parking Guidance (PGS)</Link></li>
              <li><Link href="#solutions">Gate Automation</Link></li>
              <li><Link href="#solutions">Road Blockers &amp; HVM</Link></li>
              <li><Link href="#solutions">ANPR &amp; FASTag</Link></li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="footer-col">
            <h5 className="footer-col-title">Sectors</h5>
            <ul className="footer-menu">
              <li><Link href="#sectors">Corporate Tech Parks</Link></li>
              <li><Link href="#sectors">Airports &amp; Transit</Link></li>
              <li><Link href="#sectors">Manufacturing &amp; Logistics</Link></li>
              <li><Link href="#sectors">Government &amp; Defense</Link></li>
              <li><Link href="#sectors">Gated Communities</Link></li>
              <li><Link href="#sectors">Shopping Malls &amp; Retail</Link></li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="footer-col">
            <h5 className="footer-col-title">Company</h5>
            <ul className="footer-menu">
              <li><Link href="#why-us">About Neptune</Link></li>
              <li><Link href="#testimonials">Google Reviews &amp; Ratings</Link></li>
              <li><Link href="#videos">Video Showcase</Link></li>
              <li><Link href="#clients">Client References</Link></li>
              <li><a href="https://www.neptuneautomatic.com/careers/" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><button type="button" onClick={() => openQuote('Support Request')} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Customer Portal</button></li>
              <li><Link href="#contact">Contact Support</Link></li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Contact */}
          <div className="footer-col footer-newsletter">
            <h5 className="footer-col-title">Technical Briefs</h5>
            <p>Subscribe for our quarterly technical whitepapers on smart parking, ANPR algorithms, and perimeter engineering.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your work email..."
                required
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">Join</button>
            </form>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>
              <strong>Headquarters:</strong><br />
              Neptune House, Plot No. 8, Okhla Industrial Area, Phase-III, New Delhi - 110020, India
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="layout-container">
          <div>
            &copy; 2026 Neptune Automatic Pvt. Ltd. All rights reserved. ISO 9001:2015 Certified.
          </div>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Engineering Service</a>
            <a href="#">Security Statement</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
