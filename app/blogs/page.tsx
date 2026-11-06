import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Engineering Blogs & Technical Whitepapers | Neptune Automatic',
  description:
    'Explore expert insights on automatic boom barriers, crash-rated bollards, FASTag smart parking, and hostile vehicle mitigation engineering in India.',
  keywords: [
    'Access Automation Blog',
    'Boom Barrier Technical Guide',
    'Crash Rated Bollard Standards',
    'FASTag Parking Solutions India',
    'Perimeter Security Whitepapers',
  ],
};

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'bldc-vs-electromechanical-boom-barriers',
    title: 'BLDC vs Electromechanical Boom Barriers: Why 100% Duty Cycle Matters for High-Transit Indian Tolls',
    category: 'Access Automation',
    date: 'November 2, 2026',
    readTime: '6 min read',
    image: '/assets/images/slide2-boom-barrier.webp',
    excerpt:
      'Understanding the thermal dynamics and energy efficiency of Brushless DC (BLDC) motors compared to traditional mechanical gearboxes in handling continuous 24/7 vehicular transit without overheating.',
    author: 'Er. R. K. Saxena, Chief Technical Architect',
  },
  {
    slug: 'astm-m50-pas68-crash-bollards-guide',
    title: 'Hostile Vehicle Mitigation (HVM): Deciphering ASTM F2656, PAS68 & IWA 14-1 Crash Ratings',
    category: 'High Security & Defense',
    date: 'October 18, 2026',
    readTime: '8 min read',
    image: '/assets/images/slide3-bollards.webp',
    excerpt:
      'A technical breakdown of vehicular kinetic impact energy, penetration limits, and foundation civil engineering required to certify perimeter bollards against 7.5-ton truck impacts at 80 km/h.',
    author: 'Col. Amitav Sen (Retd.), Head of HVM Engineering',
  },
  {
    slug: 'fastag-anpr-frictionless-parking-systems',
    title: 'FASTag & AI-Powered ANPR: The Blueprint for Frictionless Multilevel Commercial Parking in India',
    category: 'Smart Parking',
    date: 'October 05, 2026',
    readTime: '7 min read',
    image: '/assets/images/slide4-parking-management.webp',
    excerpt:
      'How integrating NPCI-certified FASTag readers with high-definition automatic number plate recognition eliminates entry queues, reduces ticket dispenser maintenance, and boosts toll reconciliation accuracy to 99.8%.',
    author: 'Priya Nambiar, Lead Software Architect, PowernPark',
  },
  {
    slug: 'safety-photocells-loop-detectors-zero-incident',
    title: 'Dual Safety Loops & Active Infrared Photocells: Engineering Zero-Impact Boom Barrier Gates',
    category: 'Accessories & Safety',
    date: 'September 22, 2026',
    readTime: '5 min read',
    image: '/assets/images/slide7-gate-automation.jpg',
    excerpt:
      'Best practices in inductive ground loop geometry, resonance tuning, and optical beam positioning to prevent vehicular scratches and ensure fail-safe emergency arm reversal under all weather conditions.',
    author: 'Sunil Verma, Senior Commissioning Manager',
  },
  {
    slug: 'architectural-bollards-luxury-hospitality',
    title: 'Balancing Luxury Aesthetics with Anti-Ram Security at Five-Star Hotel Portes-Cochère',
    category: 'High Security & Defense',
    date: 'September 10, 2026',
    readTime: '6 min read',
    image: '/assets/images/slide6-turnstiles.webp',
    excerpt:
      'Case study on implementing silent hydraulic power units and 316-grade mirror stainless steel retractable bollards that seamlessly blend with luxury palace architecture while guaranteeing robust physical defense.',
    author: 'Neha Kapoor, Principal Project Consultant',
  },
  {
    slug: 'smart-parking-guidance-ultrasonic-sensors',
    title: 'Ultrasonic vs Camera-Based Parking Guidance: ROI & Operational Comparison for Retail Malls',
    category: 'Smart Parking',
    date: 'August 28, 2026',
    readTime: '7 min read',
    image: '/assets/images/slide4-parking-management.webp',
    excerpt:
      'Comparing overhead ultrasonic sensor arrays with space-by-space camera systems for occupancy detection, multi-tier LED directional signage, and driver transit reduction in high-density basement garages.',
    author: 'Vikram Mehta, Solution Design Lead',
  },
];

export default function BlogsPage() {
  return (
    <div className="blogs-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Resources &amp; Technical Blogs</span>
        </nav>

        {/* Hero Banner */}
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
              Engineering Knowledge &amp; Research
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
              Perimeter Automation &amp;<br />
              <span style={{ color: '#56ACDD' }}>Smart Parking Engineering Insights</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                color: '#E2E8F0',
                lineHeight: 1.65,
              }}
            >
              Explore technical whitepapers, architectural design guidelines, crash-test analysis, and practical case studies penned by Neptune Automatic&apos;s senior hardware, firmware, and civil engineering specialists.
            </p>
          </div>
        </section>

        {/* Featured Blog Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '4.5rem',
          }}
        >
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="blog-article-card"
              style={{
                background: 'var(--theme-bg-surface, #FFFFFF)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '210px', background: '#0A1128' }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(10, 17, 40, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#56ACDD',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.65rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(86, 172, 221, 0.4)',
                  }}
                >
                  {post.category}
                </span>
              </div>

              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', marginBottom: '0.65rem', display: 'flex', gap: '8px' }}>
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: 'var(--theme-text-primary)',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'var(--theme-text-secondary)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-logo-blue)',
                      fontWeight: 600,
                      borderTop: '1px solid var(--theme-border)',
                      paddingTop: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>By {post.author}</span>
                    <span style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Read Whitepaper &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Callout */}
        <section
          style={{
            background: 'var(--theme-bg-alt, #F8FAFC)',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto',
          }}
        >
          <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Subscribe to Neptune Technical Whitepapers
          </h3>
          <p style={{ color: 'var(--theme-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Receive our quarterly peer-reviewed engineering papers on hostile vehicle mitigation, AI transit vision, and high-security access engineering.
          </p>
          <div style={{ display: 'flex', gap: '8px', maxWidth: '440px', margin: '0 auto', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Your work email..."
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--theme-border)',
                outline: 'none',
              }}
            />
            <button type="button" className="btn btn-primary">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
