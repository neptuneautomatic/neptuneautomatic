import React from 'react';
import Image from 'next/image';

export default function PowernPark() {
  return (
    <section className="section-padding powernpark-app-section" id="powernpark-app" aria-label="POWERnPARK Mobile Application Showcase">
      <div className="layout-container">
        {/* Section Header */}
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">Neptune Digital Mobility Ecosystem</span>
            <h2 className="section-title">
              POWERnPARK Application:<br />Frictionless Parking in Your Pocket
            </h2>
          </div>
          <p className="section-subtitle">
            Instant FASTag automated boom barrier clearance under 2.5 seconds, live bay guidance, and ticketless digital payments integrated directly with Neptune controllers.
          </p>
        </div>

        {/* Main Showcase Grid (2 Columns: Features & Downloads on Left | Interactive Phone Device on Right) */}
        <div className="powernpark-main-grid">
          {/* Left Column: 4 Feature Cards & App Store Downloads */}
          <div className="powernpark-info-col">
            {/* 4 Core Feature Cards (2x2 Grid) */}
            <div className="powernpark-features-grid reveal-stagger">
              {/* Feature 1: Instant FASTag In & Out */}
              <div className="powernpark-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon icon-blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Instant FASTag In &amp; Out</h4>
                </div>
                <p className="feature-card-desc">Under 2.5 second automatic boom barrier clearance with zero queue stoppage.</p>
              </div>

              {/* Feature 2: Live Slot Guidance */}
              <div className="powernpark-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon icon-cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Live Slot Guidance</h4>
                </div>
                <p className="feature-card-desc">Real-time ultrasonic bay status mapping directly to available open slots.</p>
              </div>

              {/* Feature 3: Digital Pass & Valet */}
              <div className="powernpark-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon icon-red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Digital Pass &amp; Valet</h4>
                </div>
                <p className="feature-card-desc">Paperless passes, digital monthly subscriptions, and encrypted receipts.</p>
              </div>

              {/* Feature 4: Contactless Payments */}
              <div className="powernpark-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon icon-blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Contactless Payments</h4>
                </div>
                <p className="feature-card-desc">Supports UPI, Net Banking, FASTag auto-debit, and corporate credit cards.</p>
              </div>
            </div>

            {/* Download The Mobile App Card with Store Buttons & QR Code */}
            <div className="powernpark-download-card" id="powernpark-qr-box">
              <span className="download-label">DOWNLOAD THE MOBILE APP</span>
              <div className="download-card-body">
                {/* Store Buttons Column */}
                <div className="download-buttons-col">
                  {/* Google Play Button (Active) */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.neptuneindia.powernpark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-badge-btn google-play-btn"
                    aria-label="Get POWERnPARK on Google Play"
                  >
                    <svg className="store-svg play-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186c-.33-.2-.533-.568-.533-.976V2.79c0-.408.203-.776.532-.976zm11.246 11.248l2.083-2.083-11.83-6.685 9.747 8.768zm0 1.876l-9.747 8.768 11.83-6.685-2.083-2.083zm1.06-1.061l3.057 1.728c.84.475.84 1.25 0 1.725l-3.057 1.728-2.062-2.062 2.062-2.119z" />
                    </svg>
                    <div className="store-btn-text">
                      <span className="store-subtext">GET IT ON</span>
                      <strong className="store-maintext">Google Play</strong>
                    </div>
                    <svg className="external-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {/* Apple App Store Button (Coming Soon) */}
                  <div className="store-badge-btn app-store-btn coming-soon-btn" title="iOS version coming soon">
                    <svg className="store-svg apple-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.34-.56.65-1.05 1.71-.92 2.74 1.01.08 2.02-.48 2.64-1.23z" />
                    </svg>
                    <div className="store-btn-text">
                      <span className="store-subtext">Download on</span>
                      <strong className="store-maintext">App Store</strong>
                    </div>
                    <span className="coming-soon-badge">Coming Soon</span>
                  </div>
                </div>

                {/* QR Code Column */}
                <div className="download-qr-col">
                  <div className="qr-code-frame">
                    <Image
                      src="/assets/images/powernpark-qr.png"
                      alt="Scan QR code to download POWERnPARK Android App directly from Google Play"
                      className="qr-image"
                      width={82}
                      height={82}
                    />
                  </div>
                  <div className="qr-caption">
                    <span className="qr-title">Scan QR</span>
                    <span className="qr-instruction">To download directly to phone</span>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.neptuneindia.powernpark"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qr-store-target"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.33-.2-.533-.568-.533-.976V2.79c0-.408.203-.776.532-.976zm11.246 11.248l2.083-2.083-11.83-6.685 9.747 8.768zm0 1.876l-9.747 8.768 11.83-6.685-2.083-2.083zm1.06-1.061l3.057 1.728c.84.475.84 1.25 0 1.725l-3.057 1.728-2.062-2.062 2.062-2.119z" />
                      </svg>
                      <strong>Google Play</strong>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Smartphone Mockup Graphic */}
          <div className="powernpark-device-col scroll-reveal">
            <div className="device-graphic-wrapper">
              <Image
                src="/assets/images/powernpark-app-mockup.png"
                alt="POWERnPARK Mobile Application user interface showing login and sign up on smartphones"
                className="device-mockup-img"
                width={550}
                height={550}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
