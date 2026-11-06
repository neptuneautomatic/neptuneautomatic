import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Neptune Automatic Pvt. Ltd.',
  description:
    'Read Neptune Automatic’s Privacy Policy. Understand how we collect, safeguard, and process customer and organizational inquiry data in compliance with the Digital Personal Data Protection Act (DPDPA).',
  keywords: [
    'Neptune Automatic Privacy Policy',
    'Customer Data Security',
    'B2B Privacy Statement',
    'DPDPA Compliance India',
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-page" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="layout-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--theme-border)', paddingBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
            Corporate Governance &amp; Data Security
          </span>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
            <strong>Effective Date:</strong> 18th October 2024 &bull; <strong>Entity:</strong> Neptune Automatic Pvt. Ltd. (A Neptune Group Company)
          </p>
        </div>

        {/* Policy Body */}
        <div className="legal-content" style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--theme-text-secondary)' }}>
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              1. Introduction &amp; Commitment
            </h2>
            <p>
              At <strong>Neptune Automatic Pvt. Ltd.</strong> (&ldquo;Neptune&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we are committed to upholding the highest standards of data privacy, confidentiality, and institutional trust for our industrial, government, and commercial partners. This Privacy Policy details our practices regarding the collection, storage, processing, and disclosure of information gathered through our website (<a href="https://www.neptuneautomatic.com" style={{ color: 'var(--color-logo-blue)' }}>https://www.neptuneautomatic.com</a>), quotation cart, digital catalogs, and service portals.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              2. Information We Collect
            </h2>
            <p>
              When you browse our portal, raise an official Request for Quotation (RFQ), request CAD specifications, or apply for employment, we may collect the following categories of information:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Contact &amp; Identification Data:</strong> Full name, professional designation, work email address, phone/WhatsApp number.</li>
              <li><strong>Organizational Details:</strong> Company/facility name, business sector (e.g., Commercial Tech Park, Airport, Logistics Hub, Government Facility), project city and state.</li>
              <li><strong>Equipment &amp; Project Specifications:</strong> Selected products in your quotation cart, boom arm length requirements, crash rating preferences (ASTM M50, PAS68), vehicle throughput estimates, and site drawings.</li>
              <li><strong>Technical &amp; Telemetry Data:</strong> IP address, browser type, device information, referring URLs, and engagement analytics gathered through cookies to optimize user experience.</li>
              <li><strong>Recruitment Data:</strong> Resumes, employment history, qualifications, and cover notes submitted via our Careers portal.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              3. Purpose and Legal Basis of Data Processing
            </h2>
            <p>We process your organizational and personal information strictly for legitimate commercial and engineering purposes:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Generating itemized B2B proforma price quotations, technical datasheets, and civil foundation layouts.</li>
              <li>Coordinating pre-installation site surveys, civil trenching evaluations, and factory dispatch logistics.</li>
              <li>Executing Annual Maintenance Contracts (AMC), warranty tracking, and emergency SLA field service dispatches.</li>
              <li>Communicating critical hardware firmware updates, life-safety bulletins, and quarterly engineering whitepapers.</li>
              <li>Complying with statutory requirements under the Information Technology Act, 2000, and the Digital Personal Data Protection Act (DPDPA), 2023.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              4. Non-Disclosure &amp; Information Sharing
            </h2>
            <p>
              <strong>Neptune Automatic does not sell, rent, or lease your corporate or personal information to any third-party marketing entities.</strong> We only share information with authorized operational affiliates under strict confidentiality agreements:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Authorized Service Engineers &amp; Installers:</strong> Factory-certified technicians assigned to your project location for commissioning.</li>
              <li><strong>Technology &amp; Manufacturing Partners:</strong> FAAC S.p.A. (Italy) where custom hydraulic sizing or imported component calibration is specified.</li>
              <li><strong>Statutory &amp; Law Enforcement Bodies:</strong> Only when strictly required by a court order, subpoena, or applicable Indian law for national security premises.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              5. Data Security &amp; Encryption Architecture
            </h2>
            <p>
              We enforce multi-tiered defense-grade physical and electronic security protocols. All digital transmission across our web applications is protected using 256-bit SSL/TLS encryption. Internal database repositories reside in ISO 27001-certified tier-3 data centers with automated vulnerability scanning, multi-factor authentication, and strict role-based access control (RBAC).
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              6. Cookie Policy &amp; Tracking Preferences
            </h2>
            <p>
              Our website uses operational and analytical cookies to remember items saved in your Quotation Cart and Wishlist across browser sessions. You may modify your browser settings to decline non-essential analytical cookies at any time without restricting access to product specifications and datasheets.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              7. Data Retention &amp; Rights of Data Principals
            </h2>
            <p>
              Quotation inquiries and project telemetry are retained for the active lifecycle of the warranty or service contract (typically 5–10 years for industrial equipment). As a data principal, you hold the right to review, update, or request the erasure of your personal contact data by contacting our Data Protection Officer.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem', background: '#F8FAFC', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--theme-border)' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.5rem' }}>
              8. Contact Our Data Governance Team
            </h2>
            <p style={{ margin: 0 }}>
              For any questions, grievances, or requests regarding this Privacy Policy, please contact our legal and digital compliance division:
            </p>
            <div style={{ marginTop: '0.75rem', fontWeight: 600, color: 'var(--theme-text-primary)' }}>
              Neptune Automatic Pvt. Ltd. &bull; Attention: Legal &amp; Digital Governance<br />
              Plot No. 8, Okhla Industrial Area, Phase-III, New Delhi - 110020, India<br />
              Email: <a href="mailto:digital@neptuneindia.com" style={{ color: 'var(--color-logo-blue)' }}>digital@neptuneindia.com</a> / <a href="mailto:info@neptuneautomatic.com" style={{ color: 'var(--color-logo-blue)' }}>info@neptuneautomatic.com</a><br />
              Direct Phone: +91 8010 807 000
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
