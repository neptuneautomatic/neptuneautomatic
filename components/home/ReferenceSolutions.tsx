'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

interface PillarCardProps {
  bgClass: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  desc: string;
  btnText: string;
  productName: string;
  icon: React.ReactNode;
}

function TiltCard({ bgClass, imgSrc, imgAlt, title, desc, btnText, productName, icon }: PillarCardProps) {
  const { openQuote } = useModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    if (cardRef.current) {
      boundsRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.transition = 'transform 100ms ease-out, box-shadow 250ms ease';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (!boundsRef.current) boundsRef.current = cardRef.current.getBoundingClientRect();

    const bounds = boundsRef.current;
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width) * 100;
    const yPct = (mouseY / bounds.height) * 100;

    const rotateX = ((bounds.height / 2 - mouseY) / (bounds.height / 2)) * 8;
    const rotateY = ((mouseX - bounds.width / 2) / (bounds.width / 2)) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${xPct.toFixed(1)}% ${yPct.toFixed(1)}%, rgba(255, 255, 255, 0.45), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 500ms ease';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    boundsRef.current = null;
  };

  return (
    <div className="reference-3d-card-wrap">
      <div
        ref={cardRef}
        className={`reference-3d-card ${bgClass}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-3d-bg">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="card-3d-overlay" />
        </div>
        <div className="card-3d-inner">
          <div className="card-3d-top">
            <div className="card-3d-icon-badge">
              {icon}
            </div>
          </div>
          <div className="card-3d-body">
            <h3 className="card-3d-title">{title}</h3>
            <p className="card-3d-desc">{desc}</p>
          </div>
          <div className="card-3d-footer">
            <button
              type="button"
              className="card-3d-action"
              onClick={() => openQuote(productName)}
              style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer' }}
            >
              <span>{btnText}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
        <div ref={glareRef} className="card-3d-glare" />
      </div>
    </div>
  );
}

export default function ReferenceSolutions() {
  return (
    <section className="section-padding reference-3d-section" id="reference-solutions" aria-label="Core Automation Pillars">
      <div className="layout-container">
        <div className="section-header section-header-60-40 scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">Enterprise Access Architecture</span>
            <h2 className="section-title">
              Smart Parking,<br />Entrance Control &amp;<br />Security Automation Solutions in India
            </h2>
          </div>
          <p className="section-subtitle">
            End-to-end vehicular transit control, crash-tested perimeter protection, and seamless ticketless parking systems engineered for high-demand environments.
          </p>
        </div>

        <div className="reference-3d-grid reveal-stagger">
          {/* Pillar 1: Automatic Boom Barriers */}
          <TiltCard
            bgClass="card-bg-barrier"
            imgSrc="/assets/images/slide2-boom-barrier.webp"
            imgAlt="Automatic Boom Barrier"
            title="AUTOMATIC BOOM BARRIERS"
            desc="Sensor-controlled vehicular access systems for transit management."
            btnText="Explore Barriers"
            productName="Automatic Boom Barriers"
            icon={
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="24" width="14" height="32" rx="3" fill="currentColor" />
                <circle cx="17" cy="31" r="3.5" fill="#FFFFFF" />
                <path d="M17 28 L56 12 L58 17 L19 33 Z" fill="currentColor" />
                <polygon points="26,24 32,22 34,27 28,29" fill="#D32628" />
                <polygon points="38,19 44,17 46,22 40,24" fill="#D32628" />
                <polygon points="50,14 55,12 56,17 51,19" fill="#D32628" />
                <rect x="6" y="54" width="22" height="4" rx="2" fill="currentColor" />
              </svg>
            }
          />

          {/* Pillar 2: High Security Bollards */}
          <TiltCard
            bgClass="card-bg-bollards"
            imgSrc="/assets/images/slide3-bollards.webp"
            imgAlt="High Security Automatic Bollards"
            title="HIGH SECURITY BOLLARDS"
            desc="Advanced movement control systems for perimeter security and access management."
            btnText="Explore Bollards"
            productName="High Security Automatic Bollards"
            icon={
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="12" height="40" rx="3" fill="currentColor" />
                <rect x="10" y="23" width="8" height="3" rx="1" fill="#FFFFFF" />
                <rect x="10" y="31" width="8" height="3" rx="1" fill="#FFFFFF" />
                <rect x="10" y="39" width="8" height="3" rx="1" fill="#FFFFFF" />
                <circle cx="14" cy="18.5" r="2" fill="#D32628" />

                <rect x="26" y="10" width="12" height="46" rx="3" fill="currentColor" />
                <rect x="28" y="17" width="8" height="3" rx="1" fill="#FFFFFF" />
                <rect x="28" y="25" width="8" height="3" rx="1" fill="#FFFFFF" />
                <rect x="28" y="33" width="8" height="3" rx="1" fill="#FFFFFF" />
                <circle cx="32" cy="12.5" r="2" fill="#D32628" />

                <rect x="44" y="16" width="12" height="40" rx="3" fill="currentColor" />
                <rect x="46" y="23" width="8" height="3" rx="1" fill="#FFFFFF" />
                <rect x="46" y="31" width="8" height="3" rx="1" fill="#FFFFFF" />
                <rect x="46" y="39" width="8" height="3" rx="1" fill="#FFFFFF" />
                <circle cx="50" cy="18.5" r="2" fill="#D32628" />

                <rect x="4" y="54" width="56" height="4" rx="2" fill="currentColor" />
              </svg>
            }
          />

          {/* Pillar 3: Parking Management Systems */}
          <TiltCard
            bgClass="card-bg-parking"
            imgSrc="/assets/images/slide4-parking-management.webp"
            imgAlt="Parking Management Systems"
            title="PARKING MANAGEMENT SYSTEMS"
            desc="Centralised and integrated parking solutions for home, factory and office."
            btnText="Explore Parking"
            productName="Intelligent Parking Management (PMS)"
            icon={
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="26" height="28" rx="4" fill="currentColor" />
                <path d="M16 14 H23 C26 14 27.5 15.5 27.5 18 C27.5 20.5 26 22 23 22 H19.5 V30 H16 Z" fill="#FFFFFF" />
                <path d="M19.5 17.5 H22.5 C24 17.5 24.5 18 24.5 19 C24.5 20 24 20.5 22.5 20.5 H19.5 Z" fill="currentColor" />

                <path d="M28 38 L32 29 C33 27 35 26 38 26 H46 C49 26 51 27 52 29 L56 38 C58 38.5 59 40 59 42 V50 C59 51.5 58 52 56 52 H55 V55 C55 56.5 53.5 57 52 57 C50.5 57 49 56.5 49 55 V52 H35 V55 C35 56.5 33.5 57 32 57 C30.5 57 29 56.5 29 55 V52 H28 C26 52 25 51.5 25 50 V42 C25 40 26 38.5 28 38 Z" fill="currentColor" />
                <circle cx="33" cy="46" r="2.8" fill="#FFFFFF" />
                <circle cx="51" cy="46" r="2.8" fill="#FFFFFF" />
                <path d="M34 32 H50 L48 37 H36 Z" fill="#FFFFFF" />
              </svg>
            }
          />

          {/* Pillar 4: Door & Gate Automation */}
          <TiltCard
            bgClass="card-bg-gates"
            imgSrc="/assets/images/slide7-gate-automation.jpg"
            imgAlt="Door & Gate Automation"
            title="DOOR & GATE AUTOMATION"
            desc="Automated systems for swinging and sliding gates, doors and rolling shutters."
            btnText="Explore Gates"
            productName="Automatic Sliding & Swing Gates"
            icon={
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="14" width="52" height="38" rx="2" stroke="currentColor" strokeWidth="3" />
                <rect x="3" y="10" width="4" height="46" rx="1" fill="currentColor" />
                <rect x="57" y="10" width="4" height="46" rx="1" fill="currentColor" />
                <line x1="16" y1="16" x2="16" y2="50" stroke="currentColor" strokeWidth="2.5" />
                <line x1="24" y1="16" x2="24" y2="50" stroke="currentColor" strokeWidth="2.5" />
                <line x1="32" y1="16" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5" />
                <line x1="40" y1="16" x2="40" y2="50" stroke="currentColor" strokeWidth="2.5" />
                <line x1="48" y1="16" x2="48" y2="50" stroke="currentColor" strokeWidth="2.5" />
                <line x1="6" y1="50" x2="32" y2="16" stroke="currentColor" strokeWidth="2" />
                <line x1="32" y1="16" x2="58" y2="50" stroke="currentColor" strokeWidth="2" />
                <rect x="2" y="54" width="60" height="4" rx="2" fill="currentColor" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
