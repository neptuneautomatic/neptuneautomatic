'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface OfficeBranch {
  city: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  badge?: string;
}

const BRANCHES: OfficeBranch[] = [
  {
    city: 'New Delhi (Corporate HQ)',
    region: 'North India',
    badge: 'National Headquarters',
    address: 'Neptune House, Plot No. 8, Okhla Industrial Area, Phase-III, New Delhi - 110020, India',
    phone: '+91 8010 807 000',
    email: 'info@neptuneautomatic.com',
  },
  {
    city: 'Greater Noida (Plant & R&D)',
    region: 'North India',
    badge: 'Manufacturing & Testing',
    address: 'Plot No. 12, Ecotech III, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh - 201306',
    phone: '+91 8010 807 000',
    email: 'plant@neptuneautomatic.com',
  },
  {
    city: 'Mumbai',
    region: 'Western Hub',
    address: 'Unit 402, Trade Link, Kamala Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai - 400013',
    phone: '+91 8010 807 000',
    email: 'mumbai@neptuneautomatic.com',
  },
  {
    city: 'Bengaluru',
    region: 'Southern Hub',
    address: 'Brigade Towers, 135 Brigade Road, Ashok Nagar, Bengaluru, Karnataka - 560025',
    phone: '+91 8010 807 000',
    email: 'bangalore@neptuneautomatic.com',
  },
  {
    city: 'Chennai',
    region: 'South India',
    address: 'Olympia Technology Park, Guindy, Chennai, Tamil Nadu - 600032',
    phone: '+91 8010 807 000',
    email: 'chennai@neptuneautomatic.com',
  },
  {
    city: 'Ahmedabad',
    region: 'West India',
    address: 'Titanium City Centre, 100 Feet Anand Nagar Rd, Satellite, Ahmedabad, Gujarat - 380015',
    phone: '+91 8010 807 000',
    email: 'gujarat@neptuneautomatic.com',
  },
  {
    city: 'Hyderabad',
    region: 'Telangana & AP',
    address: 'Cyber Towers, HITEC City, Madhapur, Hyderabad, Telangana - 500081',
    phone: '+91 8010 807 000',
    email: 'hyderabad@neptuneautomatic.com',
  },
  {
    city: 'Kolkata',
    region: 'East India',
    address: 'Infinity Benchmark, Salt Lake Sector V, Kolkata, West Bengal - 700091',
    phone: '+91 8010 807 000',
    email: 'kolkata@neptuneautomatic.com',
  },
];

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    interest: 'Automatic Boom Barriers',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Contact &amp; Regional Offices</span>
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
              <span>PAN-India Presence &bull; 24/7 Technical SLA Hotline</span>
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
              Contact Neptune Automatic
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
              Speak directly with our access automation engineers, request on-site feasibility surveys, or connect with our regional branch offices across 8 major Indian metros.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="tel:+918010807000" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontWeight: 700 }}>
                <span>Toll-Free Hotline: +91 8010 807 000</span>
              </a>
              <a href="mailto:sales@neptuneautomatic.com" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', padding: '0.85rem 1.5rem', fontWeight: 600 }}>
                <span>Email: sales@neptuneautomatic.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2-Column: Inquiry Form + Fast Contact Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {/* Inquiry Form */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 8px 24px rgba(10, 17, 40, 0.06)',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.25rem' }}>
              Direct Inquiry
            </span>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.75rem', fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              Send an Engineering Message
            </h2>
            <p style={{ color: 'var(--theme-text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Our Senior Sizing Engineers reply within 2 business hours with formal CAD specs, datasheets, and project pricing.
            </p>

            {submitted ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#D1FAE5', color: '#10B981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#065F46', marginBottom: '0.5rem' }}>
                  Inquiry Dispatched!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#047857', marginBottom: '1.25rem' }}>
                  Thank you <strong>{formData.name}</strong> ({formData.company}). Your request regarding <strong>{formData.interest}</strong> has been assigned to our Regional Project Lead.
                </p>
                <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Larsen &amp; Toubro"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                      Project City &amp; State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Maharashtra"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                      Product Category Interest
                    </label>
                    <select
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none', background: '#FFFFFF' }}
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="Automatic Boom Barriers">Automatic Boom Barriers</option>
                      <option value="Crash Rated Bollards &amp; Road Blockers">Crash Rated Bollards &amp; Blockers</option>
                      <option value="FASTag Parking Management Systems">FASTag Parking Management Systems</option>
                      <option value="Pedestrian Turnstiles &amp; Flap Barriers">Pedestrian Turnstiles &amp; Flap Barriers</option>
                      <option value="Gate Automation Operators">Gate Automation Operators</option>
                      <option value="Turnkey AMC &amp; Maintenance">Turnkey AMC &amp; Maintenance</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Project Specifications / Sizing Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify number of lanes, clear opening width, daily cycle frequency, or FASTag integration..."
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }}
                >
                  <span>Dispatch Technical Inquiry &rarr;</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact & Working Hours Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* National Helpline Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0A1128 0%, #162447 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                boxShadow: '0 8px 24px rgba(10, 17, 40, 0.12)',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#56ACDD', display: 'block', marginBottom: '0.5rem' }}>
                Central Inquiries &amp; Support
              </span>
              <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#FFFFFF' }}>
                National Engineering Desk
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Immediate assistance for architects, EPC contractors, tenders, and site engineers across India.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="tel:+918010807000"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#56ACDD" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 8010 807 000</span>
                </a>

                <a
                  href="mailto:sales@neptuneautomatic.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.85rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#56ACDD" strokeWidth="2.2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>sales@neptuneautomatic.com</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Factory Location */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                boxShadow: '0 4px 14px rgba(10, 17, 40, 0.04)',
              }}
            >
              <h4 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
                Operational Hours
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', fontSize: '0.88rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
                <li><strong>Monday &ndash; Saturday:</strong> 9:00 AM &ndash; 6:30 PM IST</li>
                <li><strong>Sunday:</strong> Closed (Emergency Critical Site Hotline Active)</li>
                <li><strong>Turnkey Dispatch:</strong> 24&ndash;48 Hours from Greater Noida Plant</li>
              </ul>

              <h4 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
                Corporate Headquarters
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Neptune House, Plot No. 8, Okhla Industrial Area, Phase-III, New Delhi - 110020, India
              </p>
            </div>
          </div>
        </div>

        {/* Pan-India Branch Offices Grid */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
              Regional Network
            </span>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2.25rem', fontWeight: 800, color: 'var(--theme-text-primary)' }}>
              PAN-India Regional Offices
            </h2>
            <p style={{ color: 'var(--theme-text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Direct engineering presence and stocked spare parts warehouses in all primary economic hubs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {BRANCHES.map((b, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(10, 17, 40, 0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-logo-blue)', background: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {b.region}
                  </span>
                  {b.badge && (
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#D32628', background: '#FEE2E2', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {b.badge}
                    </span>
                  )}
                </div>

                <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.65rem' }}>
                  {b.city}
                </h3>

                <p style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--theme-text-secondary)', marginBottom: '1rem', minHeight: '50px' }}>
                  {b.address}
                </p>

                <div style={{ borderTop: '1px solid var(--theme-border-subtle)', paddingTop: '0.75rem', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ color: 'var(--theme-text-primary)' }}>
                    <strong>Phone:</strong> {b.phone}
                  </div>
                  <div style={{ color: 'var(--color-logo-blue)' }}>
                    <strong>Email:</strong> {b.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
