'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

type TabKey = 'automation' | 'control' | 'accessories' | 'parking';

interface ProductItem {
  id: string;
  title: string;
  desc: string;
  imgSrc: string;
  tabKey: TabKey;
}

const matrixData: Record<TabKey, { label: string; icon: React.ReactNode; items: ProductItem[] }> = {
  automation: {
    label: 'Access Automation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="matrix-tab-icon">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
    items: [
      {
        id: 'boom-barrier',
        title: 'Automatic Boom Barrier',
        desc: 'High-speed, 100% continuous duty electromechanical barriers designed for toll plazas, tech parks, and commercial entrances.',
        imgSrc: '/assets/images/product-boom-barrier.png',
        tabKey: 'automation',
      },
      {
        id: 'automatic-bollards',
        title: 'High Security Automatic Bollards',
        desc: 'Retractable crash-resistant hydraulic bollards tested to halt hostile vehicle attacks for embassies and military zones.',
        imgSrc: '/assets/images/product-automatic-bollard.png',
        tabKey: 'automation',
      },
      {
        id: 'crash-drop-arm',
        title: 'Crash Rated Drop Arm Barrier',
        desc: 'Certified heavy impact drop arm barrier systems designed to neutralize hostile trucks at government checkpoints.',
        imgSrc: '/assets/images/product-crash-drop-arm-barrier.png',
        tabKey: 'automation',
      },
      {
        id: 'strong-arm-barrier',
        title: 'Strong Arm Automatic Barrier',
        desc: 'Rugged, reinforced arm barrier systems built for multi-lane industrial corridors and logistics freight gates.',
        imgSrc: '/assets/images/product-strong-arm-barrier.png',
        tabKey: 'automation',
      },
      {
        id: 'swing-gate',
        title: 'Swing Gate Automation',
        desc: 'Whisper-quiet electro-mechanical operators designed for architectural, residential, and industrial swing gates.',
        imgSrc: '/assets/images/product-swing-gate-operator.jpg',
        tabKey: 'automation',
      },
      {
        id: 'sliding-gate',
        title: 'Sliding Gate Automation',
        desc: 'High-load motorized oil-bath gearboxes for industrial cantilever and tracked sliding gates with continuous 24/7 duty.',
        imgSrc: '/assets/images/product-sliding-gate-operator.jpg',
        tabKey: 'automation',
      },
      {
        id: 'rolling-shutters',
        title: 'Automatic Rolling Shutters',
        desc: 'Industrial motorized rolling shutters and insulated sectional overhead doors engineered for warehouses and hangars.',
        imgSrc: '/assets/images/product-rolling-shutter-motor.jpg',
        tabKey: 'automation',
      },
    ],
  },
  control: {
    label: 'Access Control',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="matrix-tab-icon">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <line x1="14" y1="10" x2="18" y2="10" />
        <line x1="14" y1="14" x2="18" y2="14" />
      </svg>
    ),
    items: [
      {
        id: 'uhf-reader',
        title: 'UHF Reader - RFID Long Range',
        desc: 'High-frequency RFID vehicle detection antennas enabling non-stop barrier clearance for commercial parking and gated societies.',
        imgSrc: '/assets/images/product-uhf-reader.jpg',
        tabKey: 'control',
      },
      {
        id: 'smart-card-reader',
        title: 'Smart Card Readers',
        desc: 'High-security Mifare DesFire EV1/2/3, NFC, and Bluetooth contactless readers with encrypted OSDP v2 protocol support.',
        imgSrc: '/assets/images/product-smart-card-reader.jpg',
        tabKey: 'control',
      },
      {
        id: 'speed-gates',
        title: 'Pedestrian Access Gates',
        desc: 'Architectural optical speed gates, flap barriers, and full-height turnstiles with seamless biometric and credential integration.',
        imgSrc: '/assets/images/product-speed-gates.png',
        tabKey: 'control',
      },
      {
        id: 'vehicular-access',
        title: 'Vehicular Access Control',
        desc: 'End-to-end vehicular access control combining AI number plate recognition, inductive loop logic, and master lane controllers.',
        imgSrc: '/assets/images/product-road-blocker.png',
        tabKey: 'control',
      },
    ],
  },
  accessories: {
    label: 'Accessories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="matrix-tab-icon">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    items: [
      {
        id: 'safety-devices',
        title: 'Safety Devices',
        desc: 'Synchronized infrared photocell beams, inductive ground loops, and pneumatic safety rubber edges.',
        imgSrc: '/assets/images/product-photocell-safety.jpg',
        tabKey: 'accessories',
      },
      {
        id: 'simple-pulse-gen',
        title: 'Simple Pulse Generator',
        desc: 'Industrial-grade momentary push switches and key-operated manual override selectors for gate and barrier control.',
        imgSrc: '/assets/images/product-simple-pulse-gen.png',
        tabKey: 'accessories',
      },
      {
        id: 'electronic-pulse-gen',
        title: 'Electronic Pulse Generator',
        desc: 'Programmable electronic timer relays and synchronization logic units for automated gate sequence trigger.',
        imgSrc: '/assets/images/product-radio-transmitter.png',
        tabKey: 'accessories',
      },
      {
        id: 'gate-locks',
        title: 'Gate Locks',
        desc: 'Weatherproof electromagnetic shear locks and fail-safe electric strikes engineered for exterior perimeter gates.',
        imgSrc: '/assets/images/product-electric-locks.png',
        tabKey: 'accessories',
      },
      {
        id: 'traffic-lights',
        title: 'Traffic Lights',
        desc: 'High-visibility 100mm and 200mm dual red/green LED signaling lamps with solar sun hoods for lane flow control.',
        imgSrc: '/assets/images/product-traffic-signal.png',
        tabKey: 'accessories',
      },
      {
        id: 'misc-accessories',
        title: 'Miscellaneous Accessories',
        desc: 'DIN-rail power supplies, anchor cage templates, 90° articulated basement joints, and flashing beacons.',
        imgSrc: '/assets/images/product-loop-detector.png',
        tabKey: 'accessories',
      },
    ],
  },
  parking: {
    label: 'Parking Solutions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="matrix-tab-icon">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    items: [
      {
        id: 'pms-solutions',
        title: 'Parking Management Solutions',
        desc: 'End-to-end contactless parking automation with ticket dispensing, automated pay stations, FASTag processing, and real-time revenue cloud.',
        imgSrc: '/assets/images/product-parking-management.png',
        tabKey: 'parking',
      },
      {
        id: 'pgs-solutions',
        title: 'Parking Guidance Solutions',
        desc: 'Real-time ultrasonic & camera-based spot detection with dynamic RGB bay indicators and floor-level digital wayfinding signs.',
        imgSrc: '/assets/images/product-camera-parking-guidance.png',
        tabKey: 'parking',
      },
      {
        id: 'parking-counting',
        title: 'Parking Counting Solutions',
        desc: 'Lane-by-lane bidirectional vehicle counting systems using inductive loops and laser counting radar for multi-deck structures.',
        imgSrc: '/assets/images/product-parking-counting-display.png',
        tabKey: 'parking',
      },
      {
        id: 'fastag-anpr',
        title: 'Vehicular Access Control Solutions',
        desc: 'Cloud-managed vehicular access control tailored for residential gated communities and corporate tech parks with whitelist ANPR.',
        imgSrc: '/assets/images/product-fastag-pms.png',
        tabKey: 'parking',
      },
    ],
  },
};

export default function ProductMatrix() {
  const { openQuote } = useModal();
  const [activeTab, setActiveTab] = useState<TabKey>('automation');
  const [slideOffsets, setSlideOffsets] = useState<Record<TabKey, number>>({
    automation: 0,
    control: 0,
    accessories: 0,
    parking: 0,
  });

  const tabKeys: TabKey[] = ['automation', 'control', 'accessories', 'parking'];
  const currentItems = matrixData[activeTab].items;
  const currentOffset = slideOffsets[activeTab] || 0;

  const getVisibleCount = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 680) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }, []);

  const slidePrev = () => {
    setSlideOffsets((prev) => {
      const cur = prev[activeTab] || 0;
      if (cur > 0) {
        return { ...prev, [activeTab]: cur - 1 };
      } else {
        // Wrap to previous tab
        const currentIdx = tabKeys.indexOf(activeTab);
        const prevTabIdx = currentIdx === 0 ? tabKeys.length - 1 : currentIdx - 1;
        setActiveTab(tabKeys[prevTabIdx]);
        return prev;
      }
    });
  };

  const slideNext = () => {
    setSlideOffsets((prev) => {
      const cur = prev[activeTab] || 0;
      const visible = getVisibleCount();
      const maxIdx = Math.max(0, currentItems.length - visible);
      if (cur < maxIdx) {
        return { ...prev, [activeTab]: cur + 1 };
      } else {
        // Wrap to next tab
        const currentIdx = tabKeys.indexOf(activeTab);
        const nextTabIdx = (currentIdx + 1) % tabKeys.length;
        setActiveTab(tabKeys[nextTabIdx]);
        return prev;
      }
    });
  };

  return (
    <section className="section-padding layout-full product-matrix-showcase" id="solutions">
      <div className="layout-container">
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">Comprehensive Product Matrix</span>
            <h2 className="section-title">
              Engineered for Demanding Traffic &amp;<br />Security Environments
            </h2>
          </div>
          <p className="section-subtitle">
            Explore Neptune Automatic&apos;s integrated product lineup organized by core engineering divisions. Inspect subcategory models in interactive 3D perspective or sliding carousel view.
          </p>
        </div>

        {/* 4 Category Navigation Tabs */}
        <div className="matrix-tabs-wrapper scroll-reveal">
          <div className="matrix-tabs" role="tablist" aria-label="Product Divisions">
            {tabKeys.map((key) => {
              const tab = matrixData[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`matrix-tab-btn ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${key}`}
                  onClick={() => setActiveTab(key)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        {tabKeys.map((key) => {
          const tab = matrixData[key];
          const isActive = activeTab === key;
          const offsetIdx = slideOffsets[key] || 0;

          return (
            <div
              key={key}
              className={`matrix-category-panel ${isActive ? 'active' : ''}`}
              id={`panel-${key}`}
              role="tabpanel"
              aria-labelledby={`tab-${key}`}
              style={{ display: isActive ? 'block' : 'none' }}
            >
              <div className="matrix-carousel-container" style={{ padding: '3rem 3rem 3rem' }}>
                <button
                  type="button"
                  className="matrix-carousel-arrow prev"
                  aria-label="Previous products or category"
                  onClick={slidePrev}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div
                  className="matrix-carousel-track"
                  style={{
                    transform: `translateX(calc(-${offsetIdx} * (min(360px, 85vw) + 2rem)))`,
                    transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  {tab.items.map((item) => (
                    <div key={item.id} className="matrix-slide-item">
                      <article className="matrix-card-3d card-3d">
                        <div className="matrix-card-glare card-3d-glare" />
                        <div className="matrix-card-img-wrap">
                          <Image
                            src={item.imgSrc}
                            alt={item.title}
                            width={320}
                            height={220}
                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                            loading="lazy"
                          />
                        </div>
                        <div className="matrix-card-body">
                          <h4 className="matrix-card-title">{item.title}</h4>
                          <p className="matrix-card-desc">{item.desc}</p>
                          <div className="matrix-card-footer">
                            <button
                              type="button"
                              className="matrix-card-link"
                              onClick={() => openQuote(item.title)}
                              style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', padding: 0 }}
                            >
                              <span>Explore</span>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="matrix-carousel-arrow next"
                  aria-label="Next products or category"
                  onClick={slideNext}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
