'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

export default function WhyNeptuneView() {
  const { openQuote } = useModal();

  const PILLARS = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: '30+ Years Group Engineering Heritage',
      desc: 'Founded by visionary leader Mr. Deepak Kapoor, the Neptune Group is India’s foremost pioneer in power distribution, smart energy management, and industrial access automation.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      title: 'Global FAAC Technology Partnership',
      desc: 'Established FAAC India in 2005 through a direct joint venture with FAAC S.p.A. (Italy), seamlessly combining European hydraulic engineering with local Indian manufacturing and application depth.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      title: 'Make in India Certified Manufacturing',
      desc: 'Advanced ISO 9001:2015 manufacturing & testing facility in Greater Noida (Ecotech III), producing indigenous crash-rated barriers, hydraulic road blockers, and BLDC boom barriers.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: '50,000+ High-Security Installations',
      desc: 'Securing mission-critical infrastructure nationwide: G20 Leaders’ Summit at Bharat Mandapam, International Airports, ISRO facilities, Defense cantonments, and DLF CyberCity.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: 'ASTM F2656 & PAS 68 Crash Certified',
      desc: 'Internationally impact-tested defense road blockers and retractable bollards engineered to halt a 7.5-ton hostile truck traveling at 80 km/h with zero perimeter penetration.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'PAN-India 24/7 SLA Support Network',
      desc: 'Direct corporate branch offices and factory-trained technical response teams across Delhi NCR, Mumbai, Bengaluru, Chennai, Ahmedabad, Hyderabad, Kolkata, and Pune.',
    },
  ];

  return (
    <div className="why-neptune-page" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">About Us &amp; Why Neptune</span>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #101F42 60%, #1A2E5A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2.5rem',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(10, 17, 40, 0.15)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(86, 172, 221, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px' }}>
            <div
              className="page-badge-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(86, 172, 221, 0.15)',
                border: '1px solid rgba(86, 172, 221, 0.4)',
                borderRadius: '9999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#56ACDD',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
              <span>India’s Most Trusted Automation Partner Since 2005</span>
            </div>

            <h1
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1rem',
                color: '#FFFFFF',
              }}
            >
              Why Neptune Automatic?
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#FFFFFF',
                marginBottom: '2rem',
                maxWidth: '780px',
              }}
            >
              For three decades, Neptune has engineered mission-critical security hardware, smart parking systems, and perimeter access automation. We protect India’s highest-profile national institutions, diplomatic venues, and commercial landmarks with uncompromising reliability.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openQuote('Turnkey Corporate Procurement')}
                style={{ padding: '0.85rem 1.75rem', fontWeight: 700 }}
              >
                <span>Request Turnkey Project Proposal</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <Link
                href="/leadership"
                className="btn btn-outline"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 600,
                }}
              >
                <span>Meet Executive Leadership &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6 Core Pillars Grid */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
              Core Engineering Pillars
            </span>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2.25rem', fontWeight: 800, color: 'var(--theme-text-primary)' }}>
              The Neptune Engineering Advantage
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {PILLARS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  boxShadow: '0 4px 14px rgba(10, 17, 40, 0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    background: '#EFF6FF',
                    color: 'var(--color-logo-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--theme-text-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--theme-text-secondary)', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Manufacturing & Plant Spotlight */}
        <section
          style={{
            background: '#F8FAFC',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem',
            marginBottom: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
              Indigenous Manufacturing
            </span>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: '1rem' }}>
              Greater Noida Manufacturing &amp; R&amp;D Facility
            </h2>
            <p style={{ color: 'var(--theme-text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Located in Ecotech III, Greater Noida, our state-of-the-art 50,000 sq. ft. production plant houses CNC machining centers, automated powder-coating lines, endurance stress test rigs, and electrical assembly labs adhering to strict ISO 9001:2015 quality control benchmarks.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem 0' }}>
              {[
                '100% In-House Mechanical & Electrical Verification',
                'Simulated 5,000,000 Cycle Thermal Stress Chambers',
                'Laser Cutting & Automated Robotic Welding Bays',
                'Rapid Spare Parts Availability across All Indian States',
              ].map((feat, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', fontSize: '0.9rem', color: 'var(--theme-text-primary)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openQuote('Factory Audit & Site Visit Request')}
            >
              <span>Schedule a Plant Audit &amp; Technical Visit</span>
            </button>
          </div>

          <div style={{ position: 'relative', height: '360px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#0A1128' }}>
            <Image
              src="/assets/images/slide5-factory.webp"
              alt="Neptune Greater Noida Factory & R&D Plant"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 17, 40, 0.75) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(6px)',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--theme-text-primary)',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Ecotech III Plant &bull; Greater Noida</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--theme-text-secondary)' }}>ISO 9001:2015 Certified Indigenous Assembly Facility</div>
            </div>
          </div>
        </section>

        {/* Client Trust Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #162447 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: '#FFFFFF' }}>
            Trusted by India’s Premier Infrastructure Developers
          </h2>
          <p style={{ color: '#CBD5E1', maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Explore how DLF, L&amp;T, Oberoi Realty, Adani Airports, Delhi Metro, and ITPO rely on Neptune access automation hardware for daily zero-failure operation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/clientele" className="btn btn-primary">
              <span>View All 50+ Client Logos &amp; Projects &rarr;</span>
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
              <span>Contact Branch Office</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
