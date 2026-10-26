'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

interface IndustryItem {
  id: string;
  title: string;
  desc: string;
  imgSrc: string;
  tags: string[];
  productName: string;
  btnText: string;
  icon: React.ReactNode;
}

const industries: IndustryItem[] = [
  {
    id: 'corporate',
    title: 'Corporate',
    desc: 'Multi-lane contactless FASTag entry with 0.9s brushless barriers, optical turnstiles, and employee HRMS integration.',
    imgSrc: '/assets/images/industries/corporate.jpg',
    tags: ['Boom Barriers', 'Flap Turnstiles', 'Parking Guidance (PGS)'],
    productName: 'Corporate Automation',
    btnText: 'Configure Corporate Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="9" y1="6" x2="9" y2="6.01" />
        <line x1="15" y1="6" x2="15" y2="6.01" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    ),
  },
  {
    id: 'airports',
    title: 'Airports',
    desc: 'Multi-terminal ticketless parking, automated ANPR revenue reconciliation, airside perimeter gates, and crash bollards.',
    imgSrc: '/assets/images/industries/airports.jpg',
    tags: ['PMS Parking', 'Crash Bollards M50', 'ANPR Systems'],
    productName: 'Airports Automation',
    btnText: 'Configure Airport Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2L11 13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Heavy Industry',
    desc: 'Continuous operation under dust and heat, heavy industrial cantilever gates up to 4,000kg, and automated rolling shutters.',
    imgSrc: '/assets/images/industries/manufacturing.jpg',
    tags: ['Industrial Barriers', 'Cantilever Gates', 'Rapid Shutters'],
    productName: 'Manufacturing & Heavy Industry Automation',
    btnText: 'Configure Plant Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20h20M5 20V8l5 4V8l5 4V4h5v16" />
      </svg>
    ),
  },
  {
    id: 'logistics',
    title: 'Warehousing & Logistics Parks',
    desc: 'Multi-axle commercial vehicle access control, automated loading bay doors, container yard tracking, and signaling.',
    imgSrc: '/assets/images/industries/logistics.jpg',
    tags: ['8m Strong Arm', 'Sliding Gates', 'Traffic Signals'],
    productName: 'Warehousing & Logistics Parks Automation',
    btnText: 'Configure Logistics Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'defense',
    title: 'Government & Defense Facilities',
    desc: 'Hostile vehicle mitigation (HVM), certified hydraulic road blockers, 1.0s Emergency Fast Operation bollards, and tyre killers.',
    imgSrc: '/assets/images/industries/defense.jpg',
    tags: ['Road Blockers', 'Crash Bollards', 'Tyre Killers'],
    productName: 'Government & Defense Facilities Automation',
    btnText: 'Configure Defense Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'shopping-malls',
    title: 'Shopping Malls',
    desc: 'High-capacity multi-level parking, POWERnPARK mobile app payments, ultrasonic bay occupancy lights, and QR clearance.',
    imgSrc: '/assets/images/industries/shopping-malls.jpg',
    tags: ['POWERnPARK App', 'Pay Stations', 'Ultrasonic PGS'],
    productName: 'Shopping Malls Automation',
    btnText: 'Configure Mall Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: 'hospitals',
    title: 'Hospitals',
    desc: 'Dedicated RFID priority clearance for emergency ambulances, reserved doctor bay tracking, and silent BLDC barriers.',
    imgSrc: '/assets/images/industries/hospitals.jpg',
    tags: ['Brushless Barriers', 'Ambulance RFID', 'Bay Indicators'],
    productName: 'Hospitals Automation',
    btnText: 'Configure Hospital Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'hotels',
    title: 'Hotels',
    desc: 'Aesthetic stainless steel illuminated bollards, discreet automatic driveway gates, and valet parking management dispatch.',
    imgSrc: '/assets/images/industries/hotels.jpg',
    tags: ['Telescopic Bollards', 'Swing Gates', 'Valet PMS'],
    productName: 'Hotels Automation',
    btnText: 'Configure Hotel Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1m-5 6v-6h4v6" />
      </svg>
    ),
  },
  {
    id: 'metro-stations',
    title: 'Metro Stations',
    desc: 'High-throughput AFC turnstiles, anti-passback concourse gates, intermodal Park-and-Ride facilities, and maintenance yard gates.',
    imgSrc: '/assets/images/industries/metro-stations.jpg',
    tags: ['Full-Height Gates', 'Speed Flaps', 'Park & Ride PMS'],
    productName: 'Metro Stations Automation',
    btnText: 'Configure Transit Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16M12 3v8m-4 8l-2 2m10-2l2 2" />
      </svg>
    ),
  },
  {
    id: 'banks',
    title: 'Banks',
    desc: 'Armored cash van interlocking airlocks, biometric employee access gates, and heavy-duty vault perimeter road blockers.',
    imgSrc: '/assets/images/industries/banks.jpg',
    tags: ['High-Security Blockers', 'Optical Turnstiles', 'CIT Airlocks'],
    productName: 'Banks Automation',
    btnText: 'Configure Bank Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'toll-plazas',
    title: 'Toll Plazas',
    desc: 'High-speed 0.6s automatic toll boom barriers with breakaway arms, inductive loop classification, and 24/7 non-stop duty cycle.',
    imgSrc: '/assets/images/industries/toll-plazas.jpg',
    tags: ['0.6s Toll Barriers', 'Loop Detectors', 'Safety Curtains'],
    productName: 'Toll Plazas Automation',
    btnText: 'Configure Toll Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 14 14" />
      </svg>
    ),
  },
  {
    id: 'universities',
    title: 'Universities & Institutions',
    desc: 'Campus perimeter barriers, student dorm RFID turnstiles, bus depot gate automation, and visitor logging kiosks.',
    imgSrc: '/assets/images/industries/universities.jpg',
    tags: ['Boom Barriers', 'Tripod Turnstiles', 'Smart Card Readers'],
    productName: 'Universities & Institutions Automation',
    btnText: 'Configure Campus Solution',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

export default function SectorsShowcase() {
  const { openQuote } = useModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const slide = (direction: number) => {
    if (trackRef.current) {
      const step = 340; // card width + gap
      trackRef.current.scrollBy({
        left: direction * step,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="section-padding sector-showcase-section" id="sectors">
      <div className="layout-container">
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">Targeted Applications</span>
            <h2 className="section-title">Engineered Across Core Indian Sectors</h2>
          </div>
          <p className="section-subtitle">
            Discover tailored security automation blueprints deployed at scale for premier real estate, transport hubs, and critical infrastructure.
          </p>
        </div>

        {/* Comprehensive Industries Showcase Slider */}
        <div className="industries-slider-container scroll-reveal">
          {/* Nav Arrow Left */}
          <button
            type="button"
            className="industries-nav-arrow industries-nav-prev"
            id="industriesPrevBtn"
            aria-label="Previous Industries"
            onClick={() => slide(-1)}
            style={{ opacity: canScrollLeft ? 1 : 0.4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Slider Track */}
          <div
            className="industries-showcase-grid"
            id="industriesShowcaseTrack"
            ref={trackRef}
            onScroll={checkScroll}
          >
            {industries.map((item) => (
              <div key={item.id} className="industry-card">
                <div className="industry-card-media">
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    className="industry-card-img"
                    width={320}
                    height={190}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    loading="lazy"
                  />
                </div>
                <div className="industry-card-body">
                  <div className="industry-card-header">
                    <div className="industry-icon-box">{item.icon}</div>
                    <h3 className="industry-title">{item.title}</h3>
                  </div>
                  <p className="industry-desc">{item.desc}</p>
                </div>
                <div className="industry-card-bottom">
                  <div className="industry-products-tags">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="industry-product-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="industry-card-btn"
                    onClick={() => openQuote(item.productName)}
                  >
                    <span>{item.btnText}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Arrow Right */}
          <button
            type="button"
            className="industries-nav-arrow industries-nav-next"
            id="industriesNextBtn"
            aria-label="Next Industries"
            onClick={() => slide(1)}
            style={{ opacity: canScrollRight ? 1 : 0.4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
