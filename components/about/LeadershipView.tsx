'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

interface LeaderProfile {
  name: string;
  role: string;
  tenure: string;
  bio: string[];
  focus: string[];
  quote: string;
  image: string;
}

const LEADERS: LeaderProfile[] = [
  {
    name: 'Mr. Deepak Kapoor',
    role: 'Founder, Chairman & Managing Director — Neptune Group',
    tenure: '30+ Years Industry Leadership',
    image: '/assets/images/video-thumb-leadership-interview.jpg',
    bio: [
      'Mr. Deepak Kapoor is the visionary Founder, Chairman & Managing Director of the NEPTUNE GROUP, the driving force behind Neptune’s distinction in Smart Energy Management, Power Quality, and Industrial Automation across India.',
      'With over three decades of experience, he established the Group of Companies as a trusted name in intelligent electrical switchboards, power-factor correction devices, and energy-saving systems, guided by the enduring ethos of "I Love Energy."',
      'In 2005, under his leadership as Managing Director, FAAC India was established through a strategic direct partnership with FAAC S.p.A. (Italy), bringing world-class European automation technology to the Indian subcontinent.',
      'Recognizing the rapid expansion of India’s smart city and infrastructure roadmap, the company was rebranded in 2017 as NEPTUNE AUTOMATIC — cementing its role as India’s foremost indigenous manufacturer and turnkey integrator of hostile vehicle mitigation and access control infrastructure.',
    ],
    focus: [
      'Strategic Corporate Vision & International Technology Partnerships',
      'Indigenous Manufacturing & "Make in India" Self-Reliance',
      'ESG, Sustainable Kinetic Engineering & High-Efficiency BLDC Systems',
    ],
    quote:
      'True security is not just about stopping a threat; it is about building enduring engineering reliability that works flawlessly thousands of times every single day.',
  },
  {
    name: 'Mr. Rahul Kumar',
    role: 'Director of Marketing & Sales — Neptune Automatic',
    tenure: '20+ Years Fire & Security Expertise',
    image: '/assets/images/video-thumb-security-access.jpg',
    bio: [
      'Mr. Rahul Kumar is the Director of Marketing & Sales at NEPTUNE AUTOMATIC, bringing over two decades of deep commercial and technical expertise across the Fire, Life Safety, and Electronic Security landscape.',
      'A strategic visionary, Mr. Kumar has spearheaded key product launches under Neptune’s "Make in India" charter, including ASTM M50 crash-rated bollards, high-speed BLDC boom barriers, and cloud-connected telemetry road blockers.',
      'He also directs Neptune’s longstanding role as the Premium and Longest-Serving Authorized Distributor of FAAC Technologies in India, seamlessly coupling Italian hydraulic precision with nationwide project execution capabilities.',
      'Under his commercial stewardship, Neptune has successfully expanded its Turnkey Parking Management division nationwide, deploying FASTag electronic parking hubs across major commercial IT parks and airports.',
    ],
    focus: [
      'Turnkey EPC & Large-Scale Infrastructure Commercial Strategy',
      'Defense & Homeland Security Consultant Engagement (CPWD, NHAI, CISF)',
      'Nationwide Channel Network & 24/7 SLA Service Operations',
    ],
    quote:
      'Our commitment is simple: provide architects and EPC consultants with world-class engineering solutions backed by an uncompromising PAN-India service presence.',
  },
];

export default function LeadershipView() {
  const { openQuote } = useModal();

  return (
    <div className="leadership-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/why-neptune">About Us</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Executive Leadership</span>
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
              <span>Vision &bull; Engineering Integrity &bull; Decades of Excellence</span>
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
              Executive Leadership
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
              Guiding India’s premier access automation and hostile vehicle mitigation company. Meet the executive visionaries driving technological innovation, indigenous manufacturing, and institutional trust at Neptune Automatic.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openQuote('Executive Engineering Consultation')}
                style={{ padding: '0.85rem 1.75rem', fontWeight: 700 }}
              >
                <span>Connect with Leadership Team</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <Link
                href="/careers"
                className="btn btn-outline"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 600,
                }}
              >
                <span>Explore Careers at Neptune &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Leaders Profiles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '4rem' }}>
          {LEADERS.map((leader, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: '0 8px 24px rgba(10, 17, 40, 0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start',
              }}
            >
              {/* Leader Photo & Accolade */}
              <div>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '380px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: '#0A1128',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 17, 40, 0.8) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      color: '#FFFFFF',
                      background: 'rgba(1, 53, 139, 0.85)',
                      backdropFilter: 'blur(4px)',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    {leader.tenure}
                  </div>
                </div>

                {/* Quote Card */}
                <div
                  style={{
                    background: '#F8FAFC',
                    borderLeft: '4px solid var(--color-logo-blue)',
                    padding: '1.25rem',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'var(--theme-text-primary)',
                  }}
                >
                  &ldquo;{leader.quote}&rdquo;
                </div>
              </div>

              {/* Leader Biography & Focus */}
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-logo-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.25rem',
                  }}
                >
                  Executive Profile
                </span>

                <h2
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--theme-text-primary)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {leader.name}
                </h2>

                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-logo-blue)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {leader.role}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem', marginBottom: '1.75rem' }}>
                  {leader.bio.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.7,
                        color: 'var(--theme-text-secondary)',
                        margin: 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Strategic Focus */}
                <div
                  style={{
                    background: '#F1F5F9',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    border: '1px solid var(--theme-border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--color-logo-blue)',
                      marginBottom: '8px',
                    }}
                  >
                    Strategic Focus Areas:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {leader.focus.map((fItem, fIdx) => (
                      <li
                        key={fIdx}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--theme-text-primary)',
                          padding: '3px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ color: '#10B981', fontWeight: 800 }}>&bull;</span>
                        <span>{fItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Governance & Quality Pledge */}
        <section
          style={{
            background: '#F8FAFC',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.85rem', fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
            Corporate Governance &amp; ISO 9001:2015 Quality Commitment
          </h2>
          <p style={{ color: 'var(--theme-text-secondary)', maxWidth: '750px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
            Our leadership team enforces rigid quality audits across all design, manufacturing, civil installation, and after-sales support tiers, ensuring compliance with international defense and life-safety codes.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              <span>Contact Headquarters &rarr;</span>
            </Link>
            <Link href="/why-neptune" className="btn btn-outline">
              <span>Explore Why Neptune</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
