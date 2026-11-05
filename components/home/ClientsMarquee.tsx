import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CLIENTS_LIST } from '@/data/clientsData';

export default function ClientsMarquee() {
  return (
    <section className="clients-marquee-section" id="clients">
      <div className="layout-container">
        <div className="clients-marquee-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="mono-tag" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
            Trusted by India&apos;s Foremost Establishments
          </span>
          <Link
            href="/clientele"
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-logo-blue)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>Explore All 100+ Clients &amp; Landmark Deployments</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
        <div className="marquee-track">
          {/* First set of logos */}
          {CLIENTS_LIST.map((c, i) => (
            <div key={`logo-1-${i}`} className="client-logo-item" title={c.name}>
              <Image
                src={c.src}
                alt={c.name}
                width={120}
                height={50}
                style={{ objectFit: 'contain', width: 'auto', height: '36px' }}
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate set for infinite seamless CSS marquee animation */}
          {CLIENTS_LIST.map((c, i) => (
            <div key={`logo-2-${i}`} className="client-logo-item" aria-hidden="true" title={c.name}>
              <Image
                src={c.src}
                alt=""
                width={120}
                height={50}
                style={{ objectFit: 'contain', width: 'auto', height: '36px' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
