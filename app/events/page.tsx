import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Industry Events, Exhibitions & Trade Summits | Neptune Automatic',
  description:
    'Discover Neptune Automatic’s presence at India’s premier homeland security, smart mobility, and industrial automation expos including G20 Summit, Elecrama, TrafficInfraTech, and IFSEC.',
  keywords: [
    'Neptune Automatic Events',
    'Elecrama Expo',
    'TrafficInfraTech India',
    'IFSEC India Security',
    'G20 Summit Security Hardening',
    'Smart Mobility Summits',
  ],
};

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Completed' | 'Landmark Deployment';
  image: string;
  excerpt?: string;
  description: string;
  highlights: string[];
}

const EVENTS_LIST: EventItem[] = [
  {
    id: 'g20-summit',
    title: 'G20 Leaders’ Summit — National Perimeter Hardening',
    category: 'Diplomatic & National Security',
    date: 'New Delhi, India',
    location: 'Bharat Mandapam (ITPO Pragati Maidan)',
    status: 'Landmark Deployment',
    image: '/assets/images/clients/itpo.png',
    description:
      'Neptune Automatic was entrusted with engineering, supplying, and commissioning mission-critical PAS68 crash bollards, automated hydraulic drop arms, and ANPR vehicular security infrastructure securing all diplomatic entrances for the G20 Leaders’ Summit.',
    highlights: [
      'ASTM M50 / PAS68 Anti-Ram Crash Bollards',
      'Dual-Loop Fail-Safe Fast Barrier Interceptors',
      'Under-Vehicle Surveillance Systems (UVIS)',
      'Zero-Tolerance VIP Head-of-State Transit Protocols',
    ],
  },
  {
    id: 'elecrama-2025',
    title: 'Elecrama 2025 — World’s Largest Electrical & Automation T&D Expo',
    category: 'International Trade Expo',
    date: 'February 2025',
    location: 'India Expo Mart, Greater Noida, NCR',
    status: 'Completed',
    image: '/assets/images/video-thumb-elecrama.jpg',
    excerpt: 'Live kinetic demonstration of Brushless DC (BLDC) barrier gates and high-cycle hydraulic bollards.',
    description:
      'Demonstrated next-generation high-speed boom barriers with 0.9s opening kinematics, heavy-duty industrial gate operators, and IoT-connected telemetry dashboards to over 300,000+ trade delegates and infrastructure planners.',
    highlights: [
      'Live Crash Bollard Kinetic Demonstration',
      '100% Continuous-Duty BLDC Motor Benchmarks',
      'PowernPark Cloud-Based Parking IoT Architecture',
      'Direct Technical Alignment with CPWD & Defense Delegates',
    ],
  },
  {
    id: 'trafficinfratech-2026',
    title: 'TrafficInfraTech Expo 2026 — Smart Mobility & FASTag Parking',
    category: 'Smart Mobility & Toll Automation',
    date: 'November 2026',
    location: 'Bombay Exhibition Centre, Mumbai',
    status: 'Upcoming',
    image: '/assets/images/slide4-parking-management.webp',
    description:
      'Showcasing turnkey FASTag electronic parking collection, AI camera-based ANPR license plate recognition, and ultrasonic parking guidance systems (PGS) designed for India’s high-density urban transit nodes.',
    highlights: [
      'Live FASTag Multi-Lane Electronic Tolling Gateway',
      'Overhead Ultrasonic Space Detection Demonstration',
      'Contactless Ticketing & Unified QR Payment Hubs',
      'B2B EPC Infrastructure Contractor Consultation',
    ],
  },
  {
    id: 'ifsec-india',
    title: 'IFSEC India — Homeland Security & Perimeter Protection Expo',
    category: 'Homeland Security & Defense',
    date: 'December 2026',
    location: 'Pragati Maidan, New Delhi',
    status: 'Upcoming',
    image: '/assets/images/slide3-bollards.webp',
    description:
      'Presenting India’s most robust crash-rated hostile vehicle mitigation (HVM) defense line: deep-mount hydraulic road blockers, mobile anti-terror drop arms, and optical pedestrian speed gates.',
    highlights: [
      'Crash Tested K12 & M50 Certified Defense Lineup',
      'Anti-Tailgating Optical Flap Barriers for BFSI Head Offices',
      'Severe-Duty Heavy Logistics Automatic Sliding Gates',
      'Architectural Stainless Steel Retractable Bollards',
    ],
  },
];

export default function EventsPage() {
  return (
    <div className="events-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Resources &amp; Trade Events</span>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #162447 60%, #1E3A8A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2.5rem, 5vw, 3.75rem) clamp(1.5rem, 4vw, 3rem)',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(10, 17, 40, 0.2)',
          }}
        >
          <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(86, 172, 221, 0.18)',
                border: '1px solid rgba(86, 172, 221, 0.4)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#56ACDD',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
              }}
            >
              Industry Exhibitions &amp; Summits
            </span>
            <h1
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1.25rem',
              }}
            >
              Trade Summits &amp;<br />
              <span style={{ color: '#56ACDD' }}>Perimeter Security Demonstrations</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                color: '#E2E8F0',
                lineHeight: 1.65,
              }}
            >
              Connect with Neptune Automatic&apos;s senior leadership and perimeter engineering specialists at leading homeland security expos, smart city forums, and electrical automation trade fairs across India.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          {EVENTS_LIST.map((evt) => (
            <article
              key={evt.id}
              className="event-card-item"
              style={{
                background: 'var(--theme-bg-surface, #FFFFFF)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '2rem',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '4px',
                        background:
                          evt.status === 'Landmark Deployment'
                            ? 'rgba(211, 38, 40, 0.12)'
                            : evt.status === 'Upcoming'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : 'rgba(45, 72, 151, 0.1)',
                        color:
                          evt.status === 'Landmark Deployment'
                            ? 'var(--color-logo-red)'
                            : evt.status === 'Upcoming'
                            ? '#059669'
                            : 'var(--color-logo-blue)',
                      }}
                    >
                      {evt.status}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
                      {evt.category}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: 'var(--theme-text-primary)',
                      marginBottom: '0.65rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {evt.title}
                  </h2>

                  <div style={{ fontSize: '0.9rem', color: 'var(--color-logo-blue)', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{evt.location} &bull; {evt.date}</span>
                  </div>

                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--theme-text-secondary)', marginBottom: '1.5rem' }}>
                    {evt.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/clientele" className="btn btn-outline btn-sm">
                    <span>View Client Deployment</span>
                  </Link>
                  <Link href="/products" className="btn btn-primary btn-sm">
                    <span>Explore Systems Shown</span>
                  </Link>
                </div>
              </div>

              {/* Highlights & Systems Box */}
              <div
                style={{
                  background: 'var(--theme-bg-alt, #F8FAFC)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  border: '1px solid var(--theme-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--theme-text-primary)',
                      marginBottom: '1rem',
                    }}
                  >
                    Key Systems &amp; Technical Showcases
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {evt.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--theme-text-secondary)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--theme-border)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
                    Engineering Consultations Available Across All Venues
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
