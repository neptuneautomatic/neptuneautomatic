'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

interface TimelineEvent {
  id: string;
  year: string;
  date: string;
  title: string;
  edition: string;
  type: 'upcoming' | 'past';
  statusLabel: string;
  category: string;
  location: string;
  booth?: string;
  image: string;
  description: string;
  achievements: string[];
  ctaText?: string;
}

const EVENTS_TIMELINE: TimelineEvent[] = [
  // Upcoming Events
  {
    id: 'trafficinfratech-2026',
    year: '2026',
    date: 'November 18–20, 2026',
    title: 'TrafficInfraTech Expo 2026 — Smart Mobility & FASTag Parking',
    edition: '13th Edition &bull; South Asia’s Largest Traffic Tech Summit',
    type: 'upcoming',
    statusLabel: 'Upcoming Flagship Expo',
    category: 'Smart Mobility & Toll Automation',
    location: 'Bombay Exhibition Centre (NESCO), Mumbai, Maharashtra',
    booth: 'Hall 2 &bull; Stall B-14',
    image: '/assets/images/slide4-parking-management.webp',
    description:
      'Showcasing turnkey FASTag multi-lane tolling, optical license plate recognition (ANPR), and ultrasonic parking guidance systems (PGS) designed for India’s high-density urban transit nodes and corporate tech corridors.',
    achievements: [
      'Live demonstration of Multi-Lane Free Flow (MLFF) FASTag barrier integration',
      'Overhead ultrasonic space occupancy detector with dynamic 3-color LEDs',
      'Unified QR ticketing & cloud payment reconciliation portal',
      'Consultation with Metro Rail, Smart City, and NHAI project coordinators',
    ],
    ctaText: 'Register for VIP Booth Pass',
  },
  {
    id: 'ifsec-india-2026',
    year: '2026',
    date: 'December 10–12, 2026',
    title: 'IFSEC India — Homeland Security & Perimeter Protection Expo',
    edition: '17th Annual Security & Counter-Terror Gathering',
    type: 'upcoming',
    statusLabel: 'Upcoming Defense Exhibition',
    category: 'Homeland Security & Defense',
    location: 'Bharat Mandapam (ITPO), Pragati Maidan, New Delhi',
    booth: 'Hall 5 &bull; Pavilion H-22',
    image: '/assets/images/slide3-bollards.webp',
    description:
      'Presenting India’s premier crash-tested hostile vehicle mitigation (HVM) defense line: deep-mount hydraulic road blockers, mobile anti-terror drop arms, and optical pedestrian speed gates certified to ASTM F2656 M50 and PAS 68 standards.',
    achievements: [
      'Live dynamic drop-arm hydraulic interceptor deployment (1.0s EFO)',
      'High-throughput optical flap barriers with 24-zone infrared anti-tailgating',
      'Architectural 316L stainless steel retractable bollards',
      'Direct technical briefing for CPWD, CISF, and paramilitary consultants',
    ],
    ctaText: 'Book Private Engineering Session',
  },
  {
    id: 'smart-mobility-2027',
    year: '2027',
    date: 'January 22–24, 2027',
    title: 'Smart Mobility India Summit 2027 — Transit Hub Infrastructure',
    edition: 'Annual Urban Infrastructure Conference',
    type: 'upcoming',
    statusLabel: 'Upcoming Trade Summit',
    category: 'Transit Infrastructure',
    location: 'India International Convention Centre (IICC Yashobhoomi), Dwarka, Delhi',
    booth: 'Hall 1 &bull; Stall D-08',
    image: '/assets/images/slide1-boom-barriers.webp',
    description:
      'Dedicated conference on high-frequency transit access, airport vehicular security gates, and multi-tenant commercial parking hubs powered by brushless motor kinematics and IoT telemetry.',
    achievements: [
      'Demonstrating 0.9s ultra-fast brushless DC boom barriers',
      'Under-Vehicle Surveillance System (UVIS) automated plate cross-check',
      'Green corridor emergency dispatch automation protocols',
    ],
    ctaText: 'Reserve Summit Consultation',
  },

  // Past Landmark Events
  {
    id: 'g20-summit-2023',
    year: '2023',
    date: 'September 2023',
    title: 'G20 Leaders’ Summit — National Perimeter Hardening Milestone',
    edition: 'Historic Diplomatic Security Deployment',
    type: 'past',
    statusLabel: 'Landmark National Deployment',
    category: 'Diplomatic & National Security',
    location: 'Bharat Mandapam, New Delhi, India',
    image: '/assets/images/clients/itpo.png',
    description:
      'Neptune Automatic was entrusted with engineering, supplying, and commissioning mission-critical PAS68 crash bollards, automated hydraulic drop arms, and vehicular access control infrastructure securing all diplomatic entrances for the G20 Leaders’ Summit.',
    achievements: [
      'Zero-penetration perimeter security for 40+ Heads of State',
      'Deployment of ASTM M50 / PAS68 Anti-Ram crash bollards across perimeter gates',
      'Dual-loop fail-safe fast barrier interceptors with instant UPS backup',
      'Appreciation by National Security Council and Ministry of External Affairs',
    ],
  },
  {
    id: 'elecrama-2025',
    year: '2025',
    date: 'February 22–26, 2025',
    title: 'Elecrama 2025 — World’s Largest Electrical & Automation T&D Expo',
    edition: '16th Edition &bull; 300,000+ Global Visitors',
    type: 'past',
    statusLabel: 'Successfully Concluded',
    category: 'International Trade Expo',
    location: 'India Expo Mart, Greater Noida, Delhi NCR',
    booth: 'Hall 3 &bull; Stall C-10',
    image: '/assets/images/video-thumb-elecrama.jpg',
    description:
      'Live kinetic demonstration of Brushless DC (BLDC) barrier gates and high-cycle hydraulic bollards. Neptune unveiled its expanded "Make in India" defense perimeter portfolio in partnership with FAAC Italy.',
    achievements: [
      'Live 10,000-cycle continuous endurance run of Power Fusion XD barrier',
      'Direct technical meetings with 1,200+ EPC contractors and architects',
      'Executive keynote on Smart Energy & Automation by Founder Mr. Deepak Kapoor',
      'Launch of PowernPark AI parking cloud software ecosystem',
    ],
  },
  {
    id: 'fsie-mumbai-2024',
    year: '2024',
    date: 'September 19–21, 2024',
    title: 'Fire & Security India Expo (FSIE) — Critical Infrastructure Forum',
    edition: 'India’s Premier Fire, Safety & Security Trade Gathering',
    type: 'past',
    statusLabel: 'Successfully Concluded',
    category: 'Homeland Security',
    location: 'Jio World Convention Centre, BKC, Mumbai',
    image: '/assets/images/video-thumb-fsie-mumbai.jpg',
    description:
      'Presented the comprehensive hostile vehicle mitigation (HVM) series, focusing on shallow-mount bollards and fast road blockers for high-water-table urban zones like Mumbai and coastal ports.',
    achievements: [
      'Demonstrated 400mm ultra-shallow mount crash foundation bollard design',
      'Over 800+ security directors from BFSI and airport sectors attended workshops',
      'Awarded "Excellence in Access Automation Innovation" by industry jury',
    ],
  },
  {
    id: 'secutech-india-2023',
    year: '2023',
    date: 'May 18–20, 2023',
    title: 'Secutech India — Enterprise Perimeter Security Conference',
    edition: '10th International Security Exhibition',
    type: 'past',
    statusLabel: 'Successfully Concluded',
    category: 'Commercial Security',
    location: 'Bombay Exhibition Centre, Mumbai',
    image: '/assets/images/video-thumb-security-access.jpg',
    description:
      'Highlighted integration of contactless RFID cards, biometric turnstiles, and license plate recognition barriers for IT parks and Fortune 500 corporate campuses across India.',
    achievements: [
      'Demonstrated high-speed optical flap barriers handling 45 pedestrians per minute',
      'Live API telemetry sync with Honeywell, Johnson Controls, and Siemens BMS platforms',
      'Secured major procurement partnerships for 14 commercial IT parks',
    ],
  },
];

export default function EventsTimelineView() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const { openQuote } = useModal();

  const filteredEvents =
    filter === 'all'
      ? EVENTS_TIMELINE
      : EVENTS_TIMELINE.filter((evt) => evt.type === filter);

  return (
    <div className="events-timeline-page" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Resources &amp; Trade Events</span>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #101F42 60%, #1A2E5A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            marginBottom: '2.5rem',
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
              width: '420px',
              height: '420px',
              background: 'radial-gradient(circle, rgba(86, 172, 221, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
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
              <span>Trade Summits &bull; National Security Deployments</span>
            </div>

            <h1
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1rem',
                color: '#FFFFFF',
              }}
            >
              Industry Events &amp; Engineering Timeline
            </h1>

            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.6,
                color: '#FFFFFF',
                marginBottom: '2rem',
                maxWidth: '740px',
              }}
            >
              Follow Neptune Automatic on the global and national stage. From securing high-threat diplomatic entrances at the G20 Leaders’ Summit to live kinetic crash demonstrations at Elecrama and TrafficInfraTech, explore our journey.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openQuote('Expo Booth Meeting Request')}
                style={{ padding: '0.85rem 1.75rem', fontWeight: 700 }}
              >
                <span>Schedule a Meeting at Our Next Expo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <Link
                href="/clientele"
                className="btn btn-outline"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 600,
                }}
              >
                <span>View Clientele &amp; Reference Projects &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Timeline Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '2px solid var(--theme-border)',
            marginBottom: '3rem',
            paddingBottom: '0.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: filter === 'all' ? 700 : 500,
              color: filter === 'all' ? 'var(--color-logo-blue)' : 'var(--theme-text-muted)',
              background: filter === 'all' ? 'rgba(1, 53, 139, 0.08)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>All Milestones ({EVENTS_TIMELINE.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('upcoming')}
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: filter === 'upcoming' ? 700 : 500,
              color: filter === 'upcoming' ? 'var(--color-logo-blue)' : 'var(--theme-text-muted)',
              background: filter === 'upcoming' ? 'rgba(1, 53, 139, 0.08)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }}></span>
            <span>Upcoming Events ({EVENTS_TIMELINE.filter((e) => e.type === 'upcoming').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('past')}
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: filter === 'past' ? 700 : 500,
              color: filter === 'past' ? 'var(--color-logo-blue)' : 'var(--theme-text-muted)',
              background: filter === 'past' ? 'rgba(1, 53, 139, 0.08)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
            <span>Past Landmark Events ({EVENTS_TIMELINE.filter((e) => e.type === 'past').length})</span>
          </button>
        </div>

        {/* Timeline Flow */}
        <div className="timeline-container" style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Vertical central rail */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '32px',
              width: '3px',
              background: 'linear-gradient(to bottom, var(--color-logo-blue) 0%, #56ACDD 60%, #CBD5E1 100%)',
              borderRadius: '2px',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {filteredEvents.map((evt, idx) => (
              <div
                key={evt.id}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '2rem',
                }}
              >
                {/* Timeline Node Badge */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '66px',
                    height: '66px',
                    borderRadius: '50%',
                    background: evt.type === 'upcoming' ? 'var(--color-logo-blue)' : '#0A1128',
                    border: '4px solid #FFFFFF',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', opacity: 0.85 }}>
                    {evt.type === 'upcoming' ? 'SOON' : 'DONE'}
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800 }}>{evt.year}</span>
                </div>

                {/* Event Card */}
                <div
                  className="event-timeline-card"
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(10, 17, 40, 0.06)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.75rem',
                    padding: '1.75rem',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                  }}
                >
                  {/* Card Content Left */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Status & Category Eyebrow */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '4px',
                            background:
                              evt.statusLabel.includes('Landmark')
                                ? 'rgba(211, 38, 40, 0.12)'
                                : evt.type === 'upcoming'
                                ? 'rgba(1, 53, 139, 0.12)'
                                : 'rgba(16, 185, 129, 0.12)',
                            color:
                              evt.statusLabel.includes('Landmark')
                                ? '#D32628'
                                : evt.type === 'upcoming'
                                ? 'var(--color-logo-blue)'
                                : '#059669',
                          }}
                        >
                          {evt.statusLabel}
                        </span>

                        <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
                          &bull; {evt.category}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: "'Lexend', sans-serif",
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--theme-text-primary)',
                          lineHeight: 1.3,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {evt.title}
                      </h2>

                      {/* Date & Location Pill */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '0.85rem',
                          color: 'var(--theme-text-secondary)',
                          marginBottom: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {evt.date}
                        </span>

                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {evt.location}
                        </span>

                        {evt.booth && (
                          <span style={{ background: '#EFF6FF', color: 'var(--color-logo-blue)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.78rem' }}>
                            {evt.booth}
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--theme-text-secondary)', marginBottom: '1.25rem' }}>
                        {evt.description}
                      </p>

                      {/* Highlights */}
                      <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '0.9rem', marginBottom: '1.25rem', border: '1px solid var(--theme-border)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-logo-blue)', marginBottom: '6px' }}>
                          Key Technical Highlights:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {evt.achievements.map((item, i) => (
                            <li key={i} style={{ fontSize: '0.82rem', color: 'var(--theme-text-primary)', padding: '2px 0', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                              <span style={{ color: '#10B981', fontWeight: 800 }}>&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action */}
                    <div>
                      {evt.type === 'upcoming' ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => openQuote(`Registration for Expo: ${evt.title} (${evt.date})`)}
                        >
                          <span>{evt.ctaText || 'Connect at Expo'} &rarr;</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => openQuote(`Inquiry regarding past deployment: ${evt.title}`)}
                        >
                          <span>Request Case Study &amp; Technical Specs</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Card Visual Right */}
                  <div
                    style={{
                      position: 'relative',
                      minHeight: '260px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      background: '#0A1128',
                    }}
                  >
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(10, 17, 40, 0.7) 0%, transparent 60%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        right: '12px',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: 'rgba(0, 0, 0, 0.65)',
                        backdropFilter: 'blur(4px)',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '4px',
                      }}
                    >
                      {evt.edition}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <section
          style={{
            marginTop: '4rem',
            background: '#F8FAFC',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.75rem', fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
            Planning an Infrastructure Summit or High-Security Project?
          </h2>
          <p style={{ color: 'var(--theme-text-secondary)', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            Our Senior Engineering Team provides keynote presentations, live crash barrier demonstrations, and turnkey CAD specifications for EPC consultants, government agencies, and architects.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openQuote('Conference & Keynote Speaker Invitation')}
            >
              <span>Invite Neptune Technical Keynote</span>
            </button>
            <a href="tel:+918010807000" className="btn btn-outline">
              <span>Call Direct: +91 8010 807 000</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
