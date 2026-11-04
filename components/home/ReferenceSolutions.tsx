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
  linkHref?: string;
  icon: React.ReactNode;
}

function TiltCard({ bgClass, imgSrc, imgAlt, title, desc, btnText, productName, linkHref, icon }: PillarCardProps) {
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
            {linkHref ? (
              <Link
                href={linkHref}
                className="card-3d-action"
                style={{ textDecoration: 'none' }}
              >
                <span>{btnText}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ) : (
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
            )}
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
          {/* Pillar 1: Access Automation */}
          <TiltCard
            bgClass="card-bg-barrier"
            imgSrc="/assets/images/slide2-boom-barrier.webp"
            imgAlt="Access Automation Systems"
            title="ACCESS AUTOMATION"
            desc="High-speed boom barriers, crash-rated drop arms, bollards, and heavy industrial automation."
            btnText="Explore Automation"
            productName="Access Automation"
            linkHref="/products/automatic-boom-barrier"
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

          {/* Pillar 2: Access Control */}
          <TiltCard
            bgClass="card-bg-bollards"
            imgSrc="/assets/images/slide3-bollards.webp"
            imgAlt="Access Control Systems"
            title="ACCESS CONTROL"
            desc="Long-range RFID UHF readers, smart card credentials, pedestrian speed gates, and turnstiles."
            btnText="Explore Control"
            productName="Access Control"
            linkHref="/products/pedestrian-gates"
            icon={
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="10" width="36" height="44" rx="4" stroke="currentColor" strokeWidth="3" />
                <rect x="24" y="6" width="16" height="6" rx="2" fill="currentColor" />
                <circle cx="32" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
                <path d="M22 40 C22 34 26 33 32 33 C38 33 42 34 42 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="22" y1="46" x2="42" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
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
            linkHref="/products/parking-management-system"
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

          {/* Pillar 4: Accessories */}
          <TiltCard
            bgClass="card-bg-gates"
            imgSrc="/assets/images/slide7-gate-automation.jpg"
            imgAlt="Accessories"
            title="ACCESSORIES"
            desc="Infrared safety photocells, inductive loop detectors, pulse transmitters, gate locks, and LED traffic lights."
            btnText="Explore Accessories"
            productName="Accessories"
            linkHref="/products/safety-devices"
            icon={
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="16" width="22" height="32" rx="4" stroke="currentColor" strokeWidth="3" />
                <circle cx="23" cy="27" r="4" fill="#D32628" />
                <rect x="18" y="36" width="10" height="4" rx="1" fill="currentColor" />
                <path d="M40 22 C44 26 44 34 40 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M47 16 C53 22 53 40 47 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
