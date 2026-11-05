'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import {
  CLIENTS_LIST,
  CLIENT_CATEGORIES,
  LANDMARK_PROJECTS,
  ClientCategory,
  ClientItem,
} from '@/data/clientsData';

export default function ClienteleView() {
  const { openQuote } = useModal();
  const [selectedCategory, setSelectedCategory] = useState<ClientCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter clients based on selected tab and search keyword
  const filteredClients = useMemo(() => {
    return CLIENTS_LIST.filter((client) => {
      const matchesCategory =
        selectedCategory === 'all' || client.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.sectorLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.highlight && client.highlight.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="clientele-page" style={{ paddingTop: '95px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Clientele &amp; Landmark Deployments</span>
        </nav>

        {/* Hero Section Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #121F45 55%, #1E3A8A 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(10, 17, 40, 0.22)',
          }}
        >
          {/* Subtle background tech accents */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-80px',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(86, 172, 221, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '20%',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(211, 38, 40, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '920px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(86, 172, 221, 0.18)',
                border: '1px solid rgba(86, 172, 221, 0.4)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#56ACDD',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1.25rem',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Trusted by India&apos;s Foremost Establishments
            </span>

            <h1
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(2.2rem, 4.2vw, 3.25rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem',
              }}
            >
              Our Esteemed Clientele &amp;<br />
              <span style={{ color: '#56ACDD' }}>Landmark Perimeter Deployments</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                lineHeight: 1.65,
                color: '#E2E8F0',
                maxWidth: '820px',
                marginBottom: '2.5rem',
              }}
            >
              For over two decades, Neptune Automatic has been the turnkey perimeter engineering partner of choice for India’s central government institutions, defense headquarters, central bank vaults, diplomatic embassies, Fortune 500 tech parks, high-throughput airports, and five-star luxury hotel chains.
            </p>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  100<span style={{ color: '#56ACDD' }}>+</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.35rem', fontWeight: 500 }}>
                  Blue-Chip &amp; Public Entities
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  1,500<span style={{ color: '#56ACDD' }}>+</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.35rem', fontWeight: 500 }}>
                  Turnkey High-Security Sites
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  20<span style={{ color: '#56ACDD' }}>+</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.35rem', fontWeight: 500 }}>
                  Years of Engineering Heritage
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  99.8<span style={{ color: '#56ACDD' }}>%</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.35rem', fontWeight: 500 }}>
                  Pan-India Operational Reliability
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            LIVE INFINITE MARQUEE STRIP (class="marquee-track")
            Exact class requested by user, displaying all 102 logos continuously
            ========================================================================= */}
        <section
          className="clients-marquee-section"
          aria-label="Continuous Client Marquee"
          style={{
            marginBottom: '3.5rem',
            padding: '2rem 0',
            background: 'var(--theme-bg-body)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--theme-border)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '0 1.5rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-logo-blue)' }}>
              LIVE TICKER &bull; 100+ CERTIFIED INSTALLATIONS ACROSS INDIA
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
              (Hover to pause animation)
            </span>
          </div>

          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className="marquee-track">
              {/* Set 1 of all 102 logos */}
              {CLIENTS_LIST.map((c, i) => (
                <div key={`track-1-${c.id}-${i}`} className="client-logo-item" title={c.name}>
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={130}
                    height={50}
                    style={{ objectFit: 'contain', width: 'auto', height: '38px' }}
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Set 2 duplicate of all 102 logos for continuous seamless loop */}
              {CLIENTS_LIST.map((c, i) => (
                <div key={`track-2-${c.id}-${i}`} className="client-logo-item" aria-hidden="true" title={c.name}>
                  <Image
                    src={c.src}
                    alt=""
                    width={130}
                    height={50}
                    style={{ objectFit: 'contain', width: 'auto', height: '38px' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Landmark Case Studies Section */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-logo-red)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              National Footprint
            </span>
            <h2
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)',
                fontWeight: 800,
                color: 'var(--theme-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Featured National Deployments &amp; Case Highlights
            </h2>
            <p style={{ color: 'var(--theme-text-secondary)', maxWidth: '750px', marginTop: '0.5rem', fontSize: '1rem' }}>
              From high-threat diplomatic summits to multi-lane automated toll corridors, explore how our certified hardware protects critical assets.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {LANDMARK_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--theme-bg-surface, #FFFFFF)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.04))',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(10, 17, 40, 0.1)';
                  e.currentTarget.style.borderColor = 'var(--color-logo-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.04))';
                  e.currentTarget.style.borderColor = 'var(--theme-border)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--color-logo-blue)',
                        background: 'rgba(45, 72, 151, 0.08)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '4px',
                      }}
                    >
                      {proj.badge}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--theme-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {proj.location}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--theme-text-primary)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {proj.clientName}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-primary, #0A1128)',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {proj.projectTitle}
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: 'var(--theme-text-secondary)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {proj.description}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--theme-text-muted)', marginBottom: '0.5rem' }}>
                    Engineered Systems Deployed:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {proj.systemsDeployed.map((sys, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: '0.75rem',
                          background: 'var(--theme-bg-alt, #F1F5F9)',
                          color: 'var(--theme-text-primary)',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '4px',
                          border: '1px solid var(--theme-border)',
                        }}
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            INTERACTIVE LOGO DIRECTORY & SECTOR FILTER
            ========================================================================= */}
        <section id="directory" style={{ marginBottom: '5rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--color-logo-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.4rem',
                  }}
                >
                  Verified Installations
                </span>
                <h2
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)',
                    fontWeight: 800,
                    color: 'var(--theme-text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  All 100+ Client Logos &amp; Industry Partners
                </h2>
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                <svg
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: 'var(--theme-text-muted)',
                    pointerEvents: 'none',
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Filter by organization or industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.6rem',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--theme-border)',
                    background: 'var(--theme-bg-surface, #FFFFFF)',
                    color: 'var(--theme-text-primary)',
                    outline: 'none',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      fontSize: '0.85rem',
                      color: 'var(--theme-text-muted)',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    aria-label="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                borderBottom: '1px solid var(--theme-border)',
                paddingBottom: '1rem',
              }}
            >
              {CLIENT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '0.55rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      border: isActive
                        ? '1px solid var(--color-logo-blue)'
                        : '1px solid var(--theme-border)',
                      background: isActive
                        ? 'var(--color-logo-blue)'
                        : 'var(--theme-bg-surface, #FFFFFF)',
                      color: isActive ? '#FFFFFF' : 'var(--theme-text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '9999px',
                        background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--theme-bg-alt, #F1F5F9)',
                        color: isActive ? '#FFFFFF' : 'var(--theme-text-muted)',
                        fontWeight: 700,
                      }}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active counter */}
            <div style={{ fontSize: '0.875rem', color: 'var(--theme-text-muted)' }}>
              Showing <strong>{filteredClients.length}</strong> of <strong>{CLIENTS_LIST.length}</strong> verified corporate &amp; institutional clients
              {searchQuery && (
                <span> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
              )}
            </div>
          </div>

          {/* Logo Cards Grid */}
          {filteredClients.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                background: 'var(--theme-bg-surface, #FFFFFF)',
                border: '1px dashed var(--theme-border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p style={{ fontSize: '1.1rem', color: 'var(--theme-text-secondary)', marginBottom: '1rem' }}>
                No clients match your filter &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  style={{
                    background: 'var(--theme-bg-surface, #FFFFFF)',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '170px',
                    textAlign: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(45, 72, 151, 0.12)';
                    e.currentTarget.style.borderColor = 'var(--color-logo-blue)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderColor = 'var(--theme-border)';
                  }}
                  title={client.highlight || client.name}
                >
                  {/* Logo Container */}
                  <div
                    style={{
                      width: '100%',
                      height: '75px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                      padding: '0.5rem',
                    }}
                  >
                    <Image
                      src={client.src}
                      alt={client.name}
                      width={130}
                      height={55}
                      style={{
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '52px',
                        width: 'auto',
                        height: 'auto',
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Client Name & Sector Badge */}
                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        fontFamily: "'Lexend', sans-serif",
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--theme-text-primary)',
                        lineHeight: 1.3,
                        marginBottom: '0.35rem',
                      }}
                    >
                      {client.name}
                    </div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: 'var(--theme-text-muted)',
                        background: 'var(--theme-bg-alt, #F8FAFC)',
                        border: '1px solid var(--theme-border)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {client.sectorLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Why India's Leaders Partner with Neptune Automatic */}
        <section
          style={{
            background: 'var(--theme-bg-alt, #F8FAFC)',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-logo-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              Enterprise Engineering Assurance
            </span>
            <h2
              style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                fontWeight: 800,
                color: 'var(--theme-text-primary)',
              }}
            >
              Why Enterprise Leaders Rely on Neptune Automatic
            </h2>
            <p style={{ color: 'var(--theme-text-secondary)', marginTop: '0.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
              Our commitment to zero-compromise engineering, international crash certifications, and pan-India life-cycle support makes us the partner of choice for mission-critical infrastructure.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.75rem',
            }}
          >
            <div
              style={{
                background: 'var(--theme-bg-surface, #FFFFFF)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(45, 72, 151, 0.1)',
                  color: 'var(--color-logo-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Crash-Rated Certifications
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                Anti-ram bollards and road blockers tested to ASTM F2656, PAS68, and IWA 14-1 international crash standards for hostile vehicle mitigation (HVM).
              </p>
            </div>

            <div
              style={{
                background: 'var(--theme-bg-surface, #FFFFFF)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(211, 38, 40, 0.1)',
                  color: 'var(--color-logo-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                100% Continuous Duty Motors
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                Powered by proprietary brushless DC (BLDC) motors and hydraulic power packs engineered for nonstop 24/7 continuous duty without thermal tripping.
              </p>
            </div>

            <div
              style={{
                background: 'var(--theme-bg-surface, #FFFFFF)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(86, 172, 221, 0.15)',
                  color: '#0c6999',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Pan-India SLA Support
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                Direct factory-trained engineering support teams deployed across 18+ metropolitan hubs delivering swift response, preventative maintenance, and spares availability.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #162447 100%)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(10, 17, 40, 0.2)',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#56ACDD',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
            }}
          >
            Turnkey Engineering Solutions
          </span>
          <h2
            style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 800,
              maxWidth: '700px',
              marginBottom: '1rem',
              lineHeight: 1.25,
            }}
          >
            Ready to Secure Your Perimeter with India’s Most Trusted Partner?
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#CBD5E1',
              maxWidth: '650px',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Speak directly with our senior perimeter security engineers to design a custom access automation or intelligent parking solution for your facility.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openQuote('Clientele Page Inquiry')}
              style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
            >
              <span>Schedule a Site Consultation</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <Link
              href="/products"
              className="btn btn-outline"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '0.95rem',
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#FFFFFF',
              }}
            >
              <span>Explore Products Portfolio</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
