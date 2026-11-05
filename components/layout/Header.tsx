'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

export default function Header() {
  const { openQuote, openSearch } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuKey: string, e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      if (activeSubmenu !== menuKey) {
        e.preventDefault();
        setActiveSubmenu(menuKey);
      } else {
        closeMenu();
      }
    } else {
      closeMenu();
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      {/* Top Utility Bar */}
      <div className="header-topbar">
        <div className="layout-container">
          <div className="topbar-left">
            <span className="topbar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>ISO 9001:2015 Certified Access Automation</span>
            </span>
            <span className="topbar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Pan-India 24/7 Support Hotline</span>
            </span>
          </div>
          <div className="topbar-right">
            <a href="tel:+918010807000" className="topbar-link topbar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <strong>+91 8010 807 000</strong>
            </a>
            <Link href="/#faqs" className="topbar-link">FAQs &amp; Support</Link>
            <a href="https://www.neptuneindia.com" target="_blank" rel="noopener noreferrer" className="topbar-link">Neptune Group</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-main">
        <div className="layout-container">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo" aria-label="Neptune Automatic Home" onClick={closeMenu}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/neptune-logo.png" alt="Neptune Automatic Logo" width="220" height="55" />
            <div className="brand-text-fallback">NEPTUNE<span>AUTOMATIC</span></div>
          </Link>

          {/* Navigation Menu */}
          <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-open is-active' : ''}`} aria-label="Main Navigation">
            {/* 1. Home */}
            <div className="nav-item">
              <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
            </div>

            {/* 2. Products Mega Menu */}
            <div className={`nav-item has-dropdown has-mega ${activeSubmenu === 'products' ? 'open-mobile-sub' : ''}`}>
              <Link
                href="/products"
                className="nav-link"
                onClick={(e) => toggleSubmenu('products', e)}
              >
                <span>Products</span>
                <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>

              <div className="mega-menu mega-menu-products">
                <div className="mega-grid products-three-grid">
                  {/* Col 1: ACCESS AUTOMATION */}
                  <div className="mega-col">
                    <div className="mega-col-heading-group">
                      <Link href="/products/access-automation" className="mega-col-heading" onClick={closeMenu}>ACCESS AUTOMATION</Link>
                      <span className="cyan-accent-line"></span>
                    </div>
                    <ul className="mega-menu-list">
                      <li>
                        <Link href="/products/automatic-boom-barrier" onClick={closeMenu}>
                          <span>Automatic Boom Barrier</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/automatic-bollards" onClick={closeMenu}>
                          <span>High Security Automatic Bollards</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/crash-rated-barrier" onClick={closeMenu}>
                          <span>Crash Rated Drop Arm Barrier</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/strong-arm-barrier" onClick={closeMenu}>
                          <span>Strong Arm Automatic Barrier</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/swing-gate-operators" onClick={closeMenu}>
                          <span>Swing Gate Automation</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/sliding-gate-operators" onClick={closeMenu}>
                          <span>Sliding Gate Automation</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/automatic-rolling-shutters" onClick={closeMenu}>
                          <span>Automatic Rolling Shutters</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: ACCESS CONTROL */}
                  <div className="mega-col">
                    <div className="mega-col-heading-group">
                      <Link href="/products/access-control" className="mega-col-heading" onClick={closeMenu}>ACCESS CONTROL</Link>
                      <span className="cyan-accent-line"></span>
                    </div>
                    <ul className="mega-menu-list">
                      <li>
                        <Link href="/products/uhf-reader-rfid-long-range" onClick={closeMenu}>
                          <span>UHF Reader - RFID Long Range</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/proximity-readers" onClick={closeMenu}>
                          <span>Smart Card Readers</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/pedestrian-gates" onClick={closeMenu}>
                          <span>Pedestrian Access Gates</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/vehicular-access-control" onClick={closeMenu}>
                          <span>Vehicular Access Control</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: ACCESSORIES */}
                  <div className="mega-col">
                    <div className="mega-col-heading-group">
                      <Link href="/products/accessories" className="mega-col-heading" onClick={closeMenu}>ACCESSORIES</Link>
                      <span className="cyan-accent-line"></span>
                    </div>
                    <ul className="mega-menu-list">
                      <li>
                        <Link href="/products/safety-devices" onClick={closeMenu}>
                          <span>Safety Devices</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/simple-pulse-generators" onClick={closeMenu}>
                          <span>Simple Pulse Generator</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/electronic-pulse-generators" onClick={closeMenu}>
                          <span>Electronic Pulse Generator</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/electric-gate-locks" onClick={closeMenu}>
                          <span>Gate Locks</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/traffic-signal-lights-flashing-lights" onClick={closeMenu}>
                          <span>Traffic Lights</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Solutions Dropdown */}
            <div className={`nav-item has-dropdown ${activeSubmenu === 'solutions' ? 'open-mobile-sub' : ''}`}>
              <Link
                href="/products/parking-management-systems"
                className="nav-link"
                onClick={(e) => toggleSubmenu('solutions', e)}
              >
                <span>Solutions</span>
                <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>

              <div className="mega-menu mega-menu-solutions">
                <div className="mega-grid solutions-single-grid">
                  <div className="mega-col">
                    <div className="mega-col-heading-group">
                      <Link href="/products/parking-management-systems" className="mega-col-heading" onClick={closeMenu}>PARKING MANAGEMENT SYSTEMS</Link>
                      <span className="cyan-accent-line"></span>
                    </div>
                    <ul className="mega-menu-list">
                      <li>
                        <Link href="/products/parking-management-system" onClick={closeMenu}>
                          <span>Parking Management Solutions</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/parking-guidance-solutions" onClick={closeMenu}>
                          <span>Parking Guidance Solutions</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/parking-counting-solutions" onClick={closeMenu}>
                          <span>Parking Counting Solutions</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/vehicular-access-control-solution" onClick={closeMenu}>
                          <span>Vehicular Access Control Solutions</span>
                          <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Resources */}
            <div className={`nav-item has-dropdown ${activeSubmenu === 'resources' ? 'open-mobile-sub' : ''}`}>
              <Link
                href="/#faqs"
                className="nav-link"
                onClick={(e) => toggleSubmenu('resources', e)}
              >
                <span>Resources</span>
                <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </Link>
              <div className="simple-dropdown-menu">
                <ul className="simple-dropdown-list">
                  <li>
                    <Link href="/#testimonials" className="simple-dropdown-link" onClick={closeMenu}>
                      <span>Google Reviews</span>
                      <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#videos" className="simple-dropdown-link" onClick={closeMenu}>
                      <span>Video Showcase</span>
                      <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#why-us" className="simple-dropdown-link" onClick={closeMenu}>
                      <span>Why Neptune</span>
                      <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. Clientele */}
            <div className="nav-item">
              <Link href="/clientele" className="nav-link" onClick={closeMenu}>Clientele</Link>
            </div>

            {/* 6. About Us */}
            <div className={`nav-item has-dropdown ${activeSubmenu === 'about' ? 'open-mobile-sub' : ''}`}>
              <Link
                href="/#why-us"
                className="nav-link"
                onClick={(e) => toggleSubmenu('about', e)}
              >
                <span>About US</span>
                <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </Link>
              <div className="simple-dropdown-menu">
                <ul className="simple-dropdown-list">
                  <li>
                    <a href="https://www.neptuneautomatic.com/careers/" target="_blank" rel="noopener noreferrer" className="simple-dropdown-link" onClick={closeMenu}>
                      <span>Careers</span>
                      <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </a>
                  </li>
                  <li>
                    <Link href="/#contact" className="simple-dropdown-link" onClick={closeMenu}>
                      <span>Contact Us</span>
                      <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#why-us" className="simple-dropdown-link" onClick={closeMenu}>
                      <span>Leadership</span>
                      <svg className="nav-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 7. Call Button */}
            <div className="nav-item nav-item-call">
              <a href="tel:+918010807000" className="nav-call-btn" title="Call Neptune Support: +91 8010 807 000" aria-label="Call +91 8010 807 000" onClick={closeMenu}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="nav-call-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>Call Us</span>
              </a>
            </div>
          </nav>

          {/* Right Header Action */}
          <div className="header-actions">
            {/* Search Button */}
            <button
              type="button"
              className="header-search-btn"
              id="headerSearchBtn"
              aria-label="Search Neptune site and catalog"
              title="Search products, solutions &amp; specs (Press / or Ctrl+K)"
              onClick={openSearch}
            >
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="search-btn-label">Search</span>
              <kbd className="search-btn-kbd">⌘K</kbd>
            </button>

            <button type="button" className="btn btn-primary" onClick={() => openQuote('General Enquiry')}>
              <span>Get a Quote</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
              aria-label="Toggle navigation menu"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
