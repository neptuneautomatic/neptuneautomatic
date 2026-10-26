import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="section-padding layout-full" id="why-us" style={{ backgroundColor: '#ffffff' }}>
      <div className="layout-container">
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">Why Neptune Automatic?</span>
            <h2 className="section-title">
              Why Enterprise Leaders Choose<br />Neptune Automatic
            </h2>
          </div>
          <p className="section-subtitle">
            For over 20 years, Neptune Automatic has been a trusted name in Boom Barriers, entrance automation, and parking management systems across India.
          </p>
        </div>

        <div className="why-neptune-grid reveal-stagger">
          {/* 1. Exceptional Market Expertise */}
          <div className="why-feature-card">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h4 className="feature-title">Exceptional Market Expertise</h4>
            <span className="feature-subtitle-tag">Market Experts in Security &amp; Access Automation</span>
            <p className="feature-text">
              For over 20 years, Neptune Automatic has been a trusted name in Boom Barriers, entrance automation, and parking management systems across India.
            </p>
          </div>

          {/* 2. Unified Work Approach */}
          <div className="why-feature-card">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h4 className="feature-title">Unified Work Approach</h4>
            <span className="feature-subtitle-tag">We Understand That Every Need is Unique</span>
            <p className="feature-text">
              Staying connected and communicative is a large part of our work culture. Our representatives will be in touch with you at every stage of the project, keeping account holders informed and up to date of latest developments.
            </p>
          </div>

          {/* 3. Quality Assurance Guaranteed */}
          <div className="why-feature-card">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h4 className="feature-title">Quality Assurance Guaranteed</h4>
            <span className="feature-subtitle-tag">Experience Premium Quality with Precision &amp; Perfection</span>
            <p className="feature-text">
              We guarantee that our products meet your expectations for quality, reliability, and affordability. Our extensive range of Security, Access Automation, and Parking management solutions are custom-built to adhere to the highest standards.
            </p>
          </div>

          {/* 4. 20 Years of Expertise */}
          <div className="why-feature-card">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h4 className="feature-title">20 Years of Expertise</h4>
            <span className="feature-subtitle-tag">Our Partnerships are Made to Endure</span>
            <p className="feature-text">
              We are committed to nurturing lasting relationships with our clients. Our products are engineered for safety and reliability, backed by exceptional after-sales service and technical support with dedicated service agents always just a call away.
            </p>
          </div>
        </div>

        {/* DEFINING OUR FUTURE (Vision, Mission, Values & Goals) */}
        <div className="defining-future-container" id="defining-future">
          <div className="defining-future-header">
            <span className="section-eyebrow">Strategic Purpose &amp; Growth Blueprint</span>
            <h3 className="defining-future-title">Defining Our Future</h3>
            <p className="defining-future-subtitle">
              Pioneering the next era of access intelligence, uncompromising safety standards, and sustainable transit automation across India and global markets.
            </p>
          </div>

          <div className="defining-future-diagram">
            {/* Left Center Hub / Dial */}
            <div className="future-hub-col">
              <div className="future-dial">
                <div className="future-dial-glow" />
                <div className="future-dial-ring">
                  <svg className="future-arc-svg" viewBox="0 0 200 200">
                    {/* Arc 1: Cyan (Mission) */}
                    <circle cx="100" cy="100" r="88" fill="none" stroke="#56ACDD" strokeWidth="12" strokeDasharray="138 415" strokeDashoffset="0" strokeLinecap="round" />
                    {/* Arc 2: Red (Vision) */}
                    <circle cx="100" cy="100" r="88" fill="none" stroke="#D32628" strokeWidth="12" strokeDasharray="138 415" strokeDashoffset="-138" strokeLinecap="round" />
                    {/* Arc 3: Orange/Gold (Value) */}
                    <circle cx="100" cy="100" r="88" fill="none" stroke="#F59E0B" strokeWidth="12" strokeDasharray="138 415" strokeDashoffset="-276" strokeLinecap="round" />
                    {/* Arc 4: Royal Blue (Goals) */}
                    <circle cx="100" cy="100" r="88" fill="none" stroke="#2D4897" strokeWidth="12" strokeDasharray="138 415" strokeDashoffset="-414" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="future-dial-core">
                  <span className="future-dial-heading">DEFINING<br />OUR<br />FUTURE</span>
                </div>
              </div>
            </div>

            {/* Connecting Arrows / SVG Paths (Desktop) */}
            <div className="future-connectors-col" aria-hidden="true">
              <svg className="connectors-svg" viewBox="0 0 80 400" preserveAspectRatio="none">
                <path d="M 0 200 C 40 200, 40 50, 80 50" fill="none" stroke="#56ACDD" strokeWidth="2.5" strokeDasharray="4 4" className="branch-line" />
                <path d="M 0 200 C 40 200, 40 150, 80 150" fill="none" stroke="#D32628" strokeWidth="2.5" strokeDasharray="4 4" className="branch-line" />
                <path d="M 0 200 C 40 200, 40 250, 80 250" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" className="branch-line" />
                <path d="M 0 200 C 40 200, 40 350, 80 350" fill="none" stroke="#2D4897" strokeWidth="2.5" strokeDasharray="4 4" className="branch-line" />
              </svg>
            </div>

            {/* Right Milestones List */}
            <div className="future-milestones-col">
              {/* 01 Mission */}
              <div className="future-card future-card-cyan">
                <div className="future-card-badge-wrap">
                  <div className="future-icon-circle bg-cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                      <line x1="12" y1="2" x2="12" y2="4" />
                      <line x1="12" y1="20" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="4" y2="12" />
                      <line x1="20" y1="12" x2="22" y2="12" />
                    </svg>
                  </div>
                  <div className="future-meta-pill bg-gradient-cyan">
                    <span className="future-num">01</span>
                    <span className="future-label">Mission</span>
                  </div>
                </div>
                <div className="future-card-content">
                  <p>To provide innovative security and access solutions that ensure safety and convenience for every client.</p>
                </div>
              </div>

              {/* 02 Vision */}
              <div className="future-card future-card-red">
                <div className="future-card-badge-wrap">
                  <div className="future-icon-circle bg-red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div className="future-meta-pill bg-gradient-red">
                    <span className="future-num">02</span>
                    <span className="future-label">Vision</span>
                  </div>
                </div>
                <div className="future-card-content">
                  <p>To be the global leader in advanced security and access control systems, Parking management Solutions.</p>
                </div>
              </div>

              {/* 03 Value */}
              <div className="future-card future-card-gold">
                <div className="future-card-badge-wrap">
                  <div className="future-icon-circle bg-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 3v18M5 8l7-5 7 5M5 8v6a4 4 0 0 0 8 0V8M19 8v6a4 4 0 0 1-8 0V8M2 19h20" />
                    </svg>
                  </div>
                  <div className="future-meta-pill bg-gradient-gold">
                    <span className="future-num">03</span>
                    <span className="future-label">Value</span>
                  </div>
                </div>
                <div className="future-card-content">
                  <p>Commitment to excellence, customer satisfaction, innovation, and integrity in every product and service.</p>
                </div>
              </div>

              {/* 04 Goals */}
              <div className="future-card future-card-blue">
                <div className="future-card-badge-wrap">
                  <div className="future-icon-circle bg-blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
                      <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
                    </svg>
                  </div>
                  <div className="future-meta-pill bg-gradient-blue">
                    <span className="future-num">04</span>
                    <span className="future-label">Goals</span>
                  </div>
                </div>
                <div className="future-card-content">
                  <p>To continually innovate, expand our product range, and maintain the highest standards of quality and customer service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
