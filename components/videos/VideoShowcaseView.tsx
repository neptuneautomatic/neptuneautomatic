'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';

interface VideoItem {
  id: string;
  title: string;
  category: 'crash-tests' | 'boom-barriers' | 'parking' | 'expos' | 'factory';
  categoryLabel: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  summary: string;
  kinematics: string[];
  productLink?: string;
  productName?: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'crash-bollard-m50',
    title: 'ASTM M50 Crash Rated Automatic Hydraulic Bollard — Full Kinetic Test',
    category: 'crash-tests',
    categoryLabel: 'Crash Tests & Defense',
    duration: '03:42',
    thumbnail: '/assets/images/slide3-bollards.webp',
    youtubeId: 'ScMzIvxBSi4', // High energy impact demonstration
    summary:
      'Watch Neptune high-security hydraulic retractable bollards undergo full ASTM F2656 / PAS 68 impact testing, halting a 7.5-ton vehicle traveling at 80 km/h with zero perimeter penetration.',
    kinematics: [
      'Impact Energy: 1,852 kJ (K12 / M50 Equivalent)',
      'Ascent Time: 2.2 Seconds (Fast Emergency EFO 1.0s)',
      'Cylinder Material: Hardened 316L Stainless Steel',
      'Duty Cycle: 100% Continuous Severe-Duty',
    ],
    productLink: '/products/automatic-bollards',
    productName: 'Automatic Bollards',
  },
  {
    id: 'fusion-xd-bldc',
    title: 'Power Fusion XD — 0.9s Ultra High-Speed BLDC Boom Barrier Kinematics',
    category: 'boom-barriers',
    categoryLabel: 'Boom Barriers',
    duration: '02:18',
    thumbnail: '/assets/images/video-thumb-security-access.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    summary:
      'Demonstrating brushless DC motor acceleration profiles, dynamic sinusoidal decelerations, and multi-sensor safety loop integration handling 10,000+ continuous vehicle transit cycles daily.',
    kinematics: [
      'Opening Kinematics: 0.9s to 3.0s Programmable',
      'Arm Length: 3m to 6m Carbon Fiber / Aluminum',
      'Motor: Brushless DC 24V with Vector Inverter',
      'MCBF: 5,000,000 Duty Cycles without Thermal Cutoff',
    ],
    productLink: '/products/automatic-boom-barrier/power-fusion-xd-automatic-boom-barrier',
    productName: 'Power Fusion XD',
  },
  {
    id: 'smart-parking-fastag',
    title: 'Turnkey FASTag Electronic Parking Management & ANPR Guidance Architecture',
    category: 'parking',
    categoryLabel: 'Smart Parking',
    duration: '04:15',
    thumbnail: '/assets/images/video-thumb-smart-parking.jpg',
    youtubeId: '3JZ_D3ELwOQ',
    summary:
      'End-to-end walkthrough of Neptune PowernPark cloud IoT architecture, showing overhead ultrasonic parking space detection, automated NPCI FASTag wallet deductions, and digital signage.',
    kinematics: [
      'Throughput: 800+ Vehicles per Lane / Hour',
      'FASTag Processing Latency: < 120ms',
      'ANPR OCR Accuracy: 99.4% Dual-Illumination Camera',
      'Integration: ERP, SAP, NPCI NETC, UPI Dynamic QR',
    ],
    productLink: '/products/parking-management-systems',
    productName: 'Parking Management Systems',
  },
  {
    id: 'elecrama-showcase',
    title: 'Elecrama World Trade Expo — Live Automation & Security Display',
    category: 'expos',
    categoryLabel: 'Summits & Leadership',
    duration: '05:30',
    thumbnail: '/assets/images/video-thumb-elecrama.jpg',
    youtubeId: 'L_LUpnjgPso',
    summary:
      'Highlights from Neptune Automatic exhibition pavilion at Elecrama, featuring interviews with MD Mr. Deepak Kapoor, Director Mr. Rahul Kumar, and live demonstrations to Ministry & EPC delegates.',
    kinematics: [
      'Exhibition Footprint: 250+ sq. meters Pavilion',
      'Delegates Consulted: 1,500+ EPC & Security Architects',
      'Technologies Unveiled: Make in India HVM Defense Line',
      'FAAC Strategic Alignment: 20+ Years Global Synergy',
    ],
  },
  {
    id: 'fsie-mumbai-summit',
    title: 'Fire & Security India Expo (FSIE) — Hostile Vehicle Mitigation Keynote',
    category: 'expos',
    categoryLabel: 'Summits & Leadership',
    duration: '03:50',
    thumbnail: '/assets/images/video-thumb-fsie-mumbai.jpg',
    youtubeId: 'kXYiU_JCYtU',
    summary:
      'Deep dive into perimeter hardening standards for critical national infrastructure, data centers, and corporate headquarters presented by Neptune senior structural and access engineers.',
    kinematics: [
      'Standard: ASTM F2656-20 / IWA 14-1',
      'Focus: Deep Mount vs. Ultra Shallow Foundation',
      'Safety Integration: Fire Alarm Override & UPS Fail-Open',
    ],
  },
  {
    id: 'turnstile-speed-gate',
    title: 'Pedestrian Flap Barriers & High-Speed Optical Turnstiles in Corporate BFSI',
    category: 'boom-barriers',
    categoryLabel: 'Access Control',
    duration: '02:45',
    thumbnail: '/assets/images/slide2-turnstiles.webp',
    youtubeId: 'ZXsQAXx_ao0',
    summary:
      'Aesthetic 304/316 grade stainless steel turnstiles with brushless servo drives and multi-zone infrared anti-tailgating sensors controlling lobby traffic in Fortune 500 offices.',
    kinematics: [
      'Throughput: 45 Persons / Minute Passage Rate',
      'Sensors: 24 Pairs Active Infrared Array',
      'Emergency Breakaway: Immediate Fire Drop-Arm Protocol',
      'Access Integration: RFID, Facial Biometrics, QR Code',
    ],
    productLink: '/products/pedestrian-gates',
    productName: 'Pedestrian Gates',
  },
];

export default function VideoShowcaseView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const { openQuote } = useModal();
  const { addToCart } = useCart();

  const filteredVideos =
    selectedCategory === 'all'
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <div className="video-showcase-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
      <div className="layout-container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Resources &amp; Video Showcase</span>
        </nav>

        {/* Hero Banner */}
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
              <span>Engineering Telemetry &bull; Kinetic Demonstrations</span>
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
              Video Showcase &amp; Live Hardware Kinematics
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
              Experience Neptune Automatic engineering in real-world environments. Explore crash test impact simulations, ultra-rapid boom barrier cycles, cloud-based FASTag parking deployments, and international trade summits.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openQuote('Video Sizing Request')}
                style={{ padding: '0.85rem 1.75rem', fontWeight: 700 }}
              >
                <span>Request Custom Video Demonstration</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <a
                href="https://www.youtube.com/@NeptuneAutomatic"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.5rem',
                  fontWeight: 600,
                }}
              >
                <span>Visit YouTube Channel &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '2.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--theme-border)',
          }}
        >
          {[
            { id: 'all', label: 'All Demonstration Videos' },
            { id: 'crash-tests', label: 'ASTM Crash Tests & Bollards' },
            { id: 'boom-barriers', label: 'Boom Barriers & Speed Gates' },
            { id: 'parking', label: 'FASTag Smart Parking' },
            { id: 'expos', label: 'Summits & Exhibitions' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: selectedCategory === tab.id ? 700 : 500,
                background: selectedCategory === tab.id ? 'var(--color-logo-blue)' : 'var(--theme-bg-alt, #F1F5F9)',
                color: selectedCategory === tab.id ? '#FFFFFF' : 'var(--theme-text-primary)',
                border: selectedCategory === tab.id ? '1px solid var(--color-logo-blue)' : '1px solid var(--theme-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="video-card-item"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(10, 17, 40, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
            >
              {/* Thumbnail Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '220px',
                  background: '#0A1128',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onClick={() => setActiveVideo(video)}
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 17, 40, 0.75) 0%, rgba(10, 17, 40, 0.2) 60%, transparent 100%)',
                  }}
                />

                {/* Play Button Icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(211, 38, 40, 0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(211, 38, 40, 0.5)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>

                {/* Category & Duration Badges */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(1, 53, 139, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {video.categoryLabel}
                  </span>
                  <span
                    style={{
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                    }}
                  >
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Video Content */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      marginBottom: '0.75rem',
                      color: 'var(--theme-text-primary)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setActiveVideo(video)}
                  >
                    {video.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      color: 'var(--theme-text-secondary)',
                      marginBottom: '1rem',
                    }}
                  >
                    {video.summary}
                  </p>

                  {/* Kinematic Bullet Points */}
                  <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '1.25rem', border: '1px solid var(--theme-border)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-logo-blue)', marginBottom: '6px' }}>
                      Key Kinematic Parameters:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {video.kinematics.map((km, i) => (
                        <li key={i} style={{ fontSize: '0.8rem', color: 'var(--theme-text-primary)', padding: '2px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#10B981', fontWeight: 800 }}>&bull;</span>
                          <span>{km}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveVideo(video)}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>Play Demonstration</span>
                  </button>

                  {video.productLink && (
                    <Link
                      href={video.productLink}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.45rem 0.85rem' }}
                    >
                      <span>Explore System &rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(10, 17, 40, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '850px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--theme-border)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--theme-text-primary)', maxWidth: '90%' }}>
                  {activeVideo.title}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '4px',
                    lineHeight: 1,
                  }}
                  aria-label="Close video modal"
                >
                  &times;
                </button>
              </div>

              {/* Video Embed */}
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000000' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: '#F8FAFC',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>
                  Need CAD drawings or turnkey installation pricing for this equipment?
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setActiveVideo(null);
                      openQuote(`Inquiry regarding video: ${activeVideo.title}`);
                    }}
                  >
                    <span>Request Quotation</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setActiveVideo(null)}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
