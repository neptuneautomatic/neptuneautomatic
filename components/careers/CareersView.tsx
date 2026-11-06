'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  locations: string[];
  openings: number;
  experience: string;
  description: string;
  requirements: string[];
}

const OPENINGS: JobOpening[] = [
  {
    id: 'mgr-sales-marketing',
    title: 'Manager — Sales & Marketing (Access & Parking Automation)',
    department: 'Sales & Business Development',
    locations: ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Chennai', 'Ahmedabad'],
    openings: 7,
    experience: '5–10 Years',
    description:
      'Drive institutional and channel acquisition across MEP consultants, EPC contractors, developers, and government PMCs for boom barriers, crash bollards, road blockers, and FASTag parking systems.',
    requirements: [
      'Proven track record in physical security, automation, or electrical building management products.',
      'Strong network with MEP consultants, architects, system integrators, and corporate developers.',
      'Experience managing multi-million B2B quotations, tenders, and client relationship pipelines.',
    ],
  },
  {
    id: 'pre-sales-support-engineer',
    title: 'Technical Support & Pre-Sales Automation Engineer',
    department: 'Pre-Sales & Engineering',
    locations: ['Delhi NCR', 'Mumbai', 'Bengaluru'],
    openings: 4,
    experience: '2–6 Years',
    description:
      'Assist regional sales teams with equipment technical sizing, boom arm wind-load calculations, bollard hydraulic layout schematics, and single-line integration diagrams.',
    requirements: [
      'B.Tech / Diploma in Electrical, Electronics, or Mechanical Engineering.',
      'Proficiency in AutoCAD for civil foundation drawings and wiring schematics.',
      'Sound knowledge of vehicle detection loops, access controllers, and relay logic.',
    ],
  },
  {
    id: 'iot-firmware-engineer',
    title: 'Embedded Firmware & IoT Systems Engineer',
    department: 'Research & Development (R&D)',
    locations: ['Greater Noida (Plant)'],
    openings: 3,
    experience: '3–7 Years',
    description:
      'Design next-generation embedded firmware for BLDC motor barrier inverters, CAN bus communication, RFID long-range readers, and cloud parking telemetry modules.',
    requirements: [
      'Expertise in C/C++ embedded systems, ARM Cortex-M microcontrollers, and RTOS.',
      'Experience with RS-485, Modbus RTU, MQTT, and secure cloud API telemetry.',
      'Familiarity with motor control FOC (Field-Oriented Control) algorithms is a plus.',
    ],
  },
  {
    id: 'project-installation-supervisor',
    title: 'Senior Project Installation & Commissioning Supervisor',
    department: 'Project Operations',
    locations: ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad'],
    openings: 6,
    experience: '3–8 Years',
    description:
      'Supervise on-site turnkey civil excavation, drainage for hydraulic bollards, conduit routing, hardware testing, and final client commissioning handovers.',
    requirements: [
      'Hands-on experience installing boom barriers, turnstiles, sliding gates, and road blockers.',
      'Ability to coordinate with main contractors, civil teams, and safety supervisors.',
      'Strict adherence to site safety protocols and timely execution timelines.',
    ],
  },
];

export default function CareersView() {
  const [selectedJob, setSelectedJob] = useState<string>(OPENINGS[0].title);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '3-5 Years',
    location: 'Delhi NCR',
    coverNote: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="careers-page" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href="/why-neptune">About Us</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Careers &amp; Opportunities</span>
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
              <span>Empowering Talents &bull; Inspiring Success</span>
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
              Careers at Neptune Automatic
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
              Join a legacy engineering company with 30+ years of excellence and a strong PAN-India presence. We are hiring talented professionals across Sales, Pre-Sales Engineering, Embedded R&amp;D, and Turnkey Operations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#openings" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontWeight: 700 }}>
                <span>View {OPENINGS.reduce((sum, o) => sum + o.openings, 0)} Current Openings &darr;</span>
              </a>
              <a href="#apply" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', padding: '0.85rem 1.5rem', fontWeight: 600 }}>
                <span>Submit Direct Resume</span>
              </a>
            </div>
          </div>
        </section>

        {/* Culture & Benefits */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.35rem' }}>
              Why Work With Us
            </span>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2.25rem', fontWeight: 800, color: 'var(--theme-text-primary)' }}>
              Growth, Autonomy &amp; Impact
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {[
              {
                title: 'High-Impact National Projects',
                desc: 'Work on landmark installations securing G20 Summits, international airports, smart cities, and Fortune 500 corporate campuses.',
              },
              {
                title: 'Global Automation Exposure',
                desc: 'Collaborate with world-class engineering standards through our longstanding Italian partnership with FAAC S.p.A.',
              },
              {
                title: 'Fast-Track Professional Growth',
                desc: 'Transparent promotion tracks, skill development workshops, and direct access to senior executive management.',
              },
              {
                title: 'Competitive Compensation & Perks',
                desc: 'Industry-leading salary structures, performance incentives, comprehensive health insurance, and annual bonuses.',
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: '0 4px 12px rgba(10, 17, 40, 0.04)',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF6FF', color: 'var(--color-logo-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.5rem' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--theme-text-secondary)', margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Openings */}
        <section id="openings" style={{ scrollMarginTop: '120px', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.25rem' }}>
                Job Opportunities
              </span>
              <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--theme-text-primary)' }}>
                Current Openings Across India
              </h2>
            </div>
            <span style={{ background: '#EFF6FF', color: 'var(--color-logo-blue)', padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.85rem' }}>
              Active Hiring for Q1/Q2 2026
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {OPENINGS.map((job) => (
              <div
                key={job.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  boxShadow: '0 4px 14px rgba(10, 17, 40, 0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-logo-blue)', background: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      {job.department}
                    </span>
                    <h3 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.35rem', fontWeight: 800, color: 'var(--theme-text-primary)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                      {job.title}
                    </h3>
                  </div>

                  <a
                    href="#apply"
                    onClick={() => setSelectedJob(job.title)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Apply for Role &rarr;</span>
                  </a>
                </div>

                {/* Job Metadata Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: 'var(--theme-text-secondary)', marginBottom: '1rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <strong>Locations:</strong> {job.locations.join(', ')}
                  </span>
                  <span>&bull;</span>
                  <span>
                    <strong>Experience:</strong> {job.experience}
                  </span>
                  <span>&bull;</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>
                    {job.openings} Open Position(s)
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--theme-text-secondary)', marginBottom: '1rem' }}>
                  {job.description}
                </p>

                <div style={{ background: '#F8FAFC', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--theme-border)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--theme-text-primary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Key Qualifications:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx} style={{ fontSize: '0.85rem', color: 'var(--theme-text-primary)', padding: '2px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#10B981', fontWeight: 800 }}>&bull;</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section
          id="apply"
          style={{
            scrollMarginTop: '120px',
            background: '#FFFFFF',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2.5rem',
            boxShadow: '0 8px 24px rgba(10, 17, 40, 0.08)',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.25rem' }}>
              Direct Application
            </span>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--theme-text-primary)' }}>
              Submit Your Resume
            </h2>
            <p style={{ color: 'var(--theme-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Interested in joining our team? Fill up the application form below or email your resume directly to{' '}
              <a href="mailto:careers@neptuneautomatic.com" style={{ color: 'var(--color-logo-blue)', fontWeight: 700 }}>
                careers@neptuneautomatic.com
              </a>
              .
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem', background: '#ECFDF5', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#D1FAE5', color: '#10B981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#065F46', marginBottom: '0.5rem' }}>
                Application Submitted Successfully!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#047857', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
                Thank you <strong>{formData.name}</strong>. Our Human Resources and Technical Hiring committee will review your profile for <strong>{selectedJob}</strong> and contact you within 48 business hours.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Phone / WhatsApp *
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

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Position Applied For *
                  </label>
                  <select
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none', background: '#FFFFFF' }}
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                  >
                    {OPENINGS.map((o) => (
                      <option key={o.id} value={o.title}>
                        {o.title}
                      </option>
                    ))}
                    <option value="General Open Application">Other / General Technical Application</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Total Relevant Experience
                  </label>
                  <select
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none', background: '#FFFFFF' }}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value="1-3 Years">1–3 Years</option>
                    <option value="3-5 Years">3–5 Years</option>
                    <option value="5-8 Years">5–8 Years</option>
                    <option value="8-12 Years">8–12 Years</option>
                    <option value="12+ Years">12+ Years (Executive)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                    Preferred Base Location
                  </label>
                  <select
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none', background: '#FFFFFF' }}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="Delhi NCR">Delhi NCR (HQ / Plant)</option>
                    <option value="Mumbai">Mumbai (Western Region)</option>
                    <option value="Bengaluru">Bengaluru (Southern Hub)</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--theme-text-primary)', marginBottom: '4px' }}>
                  Brief Cover Note &amp; Core Skill Highlights
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention your background in automation, boom barriers, bollards, RFID, MEP projects, or embedded hardware..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--theme-border)', outline: 'none' }}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }}
              >
                <span>Submit Job Application &rarr;</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
