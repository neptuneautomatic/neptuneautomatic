'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

interface SlideData {
  id: number;
  label: string;
  dotLabel: string;
  title: string | React.ReactNode;
  bgImage: string;
  alt: string;
  exploreHref?: string;
  exploreText?: string;
  quoteProduct?: string;
  isPowernPark?: boolean;
}

const slides: SlideData[] = [
  {
    id: 1,
    label: '1 of 5: Automatic Boom Barriers for Smarter Vehicle Access',
    dotLabel: '01 Boom Barriers',
    title: 'Automatic Boom Barriers for Smarter Vehicle Access',
    bgImage: '/assets/images/slide2-boom-barrier-installed.jpg?v=3',
    alt: 'Authentic Neptune Automatic boom barrier installation across facility entrance',
    exploreHref: '#solutions',
    exploreText: 'Explore Boom Barriers',
    quoteProduct: 'Automatic Boom Barriers',
  },
  {
    id: 2,
    label: '2 of 5: High-Security Automatic Bollards for Vehicle Protection',
    dotLabel: '02 Bollards',
    title: 'High-Security Automatic Bollards for Vehicle Protection',
    bgImage: '/assets/images/slide3-bollards-installed.jpg?v=2',
    alt: 'Neptune High Security Crash Rated Automatic Bollards Testing Installation',
    exploreHref: '#solutions',
    exploreText: 'Explore Bollards',
    quoteProduct: 'Automatic Bollards',
  },
  {
    id: 3,
    label: '3 of 5: Intelligent Parking Management, From Entry to Exit',
    dotLabel: '03 Parking Mgmt',
    title: 'Intelligent Parking Management, From Entry to Exit',
    bgImage: '/assets/images/slide4-parking-management.webp',
    alt: 'Modern multi-level parking facility with digital occupancy guidance and space counters',
    exploreHref: '#solutions',
    exploreText: 'Explore Parking Solutions',
    quoteProduct: 'Intelligent Parking Management (PMS)',
  },
  {
    id: 4,
    label: '4 of 5: One Partner. Complete Access & Parking Automation.',
    dotLabel: '04 Full Portfolio',
    title: 'One Partner. Complete Access & Parking Automation.',
    bgImage: '/assets/images/slide-one-partner-parking.jpg?v=2',
    alt: 'One Partner Complete Access and Parking Automation Facility Overview',
    exploreHref: '#solutions',
    exploreText: 'View All Solutions',
    quoteProduct: 'Complete Enterprise Automation Portfolio',
  },
  {
    id: 5,
    label: '5 of 5: POWERnPARK Smart Parking & Digital Mobility Application',
    dotLabel: '05 POWERnPARK App',
    title: (
      <>
        POWERnPARK Application:<br />Frictionless Parking in Your Pocket
      </>
    ),
    bgImage: '/assets/images/slide5-powernpark-parking.png?v=3',
    alt: 'POWERnPARK Digital Mobility and Smart Parking Ecosystem Background',
    isPowernPark: true,
  },
];

const SLIDE_DURATION = 5000;

export default function HeroSlider() {
  const { openQuote } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const startTimeRef = useRef<number>(performance.now());
  const reqIdRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    let nextIdx = index;
    if (nextIdx >= totalSlides) nextIdx = 0;
    if (nextIdx < 0) nextIdx = totalSlides - 1;
    setCurrentIndex(nextIdx);
    startTimeRef.current = performance.now();
    setProgress(0);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [goToSlide, currentIndex]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [goToSlide, currentIndex]);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      if (next) {
        startTimeRef.current = performance.now();
      }
      return next;
    });
  };

  useEffect(() => {
    const loop = (timestamp: number) => {
      if (isPlaying) {
        const elapsed = timestamp - startTimeRef.current;
        const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(pct);

        if (elapsed >= SLIDE_DURATION) {
          nextSlide();
        }
      }
      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [isPlaying, nextSlide]);

  return (
    <section className="hero-slider-section" id="hero-slider" aria-label="Neptune Automatic Solutions Showcase">
      {/* Dynamic Ambient Video Background */}
      <div className="hero-video-bg-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-bg-video"
          id="heroBgVideo"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/slide1-integrated.jpg"
        >
          <source src="/assets/videos/hero-automation.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-tint-overlay" />
      </div>

      {/* Top Progress Bar */}
      <div className="slider-progress-bar-container">
        <div className="slider-progress-line" style={{ width: `${progress}%` }} />
      </div>

      {/* Slider Viewport */}
      <div className="slider-container">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' }}
        >
          {slides.map((s, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={s.id}
                className={`slide ${isActive ? 'active' : ''} ${s.isPowernPark ? 'slide-powernpark' : ''}`}
                data-slide={s.id}
                role="group"
                aria-roledescription="slide"
                aria-label={s.label}
                aria-hidden={!isActive}
              >
                <div className="slide-bg">
                  <Image
                    src={s.bgImage}
                    alt={s.alt}
                    fill
                    priority={idx === 0}
                    style={{ objectFit: 'cover', objectPosition: 'center center' }}
                    sizes="100vw"
                  />
                </div>
                <div className="slide-overlay" />

                <div className="slide-content-wrapper">
                  <div className={`layout-container ${s.isPowernPark ? 'slide-split-container' : ''}`}>
                    <div className="slide-text-box">
                      <h1 className="slide-title">{s.title}</h1>

                      {!s.isPowernPark && (
                        <div className="slide-cta-group">
                          {s.exploreHref && (
                            <Link href={s.exploreHref} className="btn btn-primary">
                              <span>{s.exploreText}</span>
                              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </Link>
                          )}
                          {s.quoteProduct && (
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => openQuote(s.quoteProduct)}
                            >
                              <span>{s.id === 4 ? 'Talk to an Expert' : 'Get a Quote'}</span>
                            </button>
                          )}
                        </div>
                      )}

                      {s.isPowernPark && (
                        <div className="hero-slide-qr-card">
                          <a
                            href="https://play.google.com/store/apps/details?id=com.neptuneindia.powernpark"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slide-qr-thumb-wrap"
                            aria-label="Download POWERnPARK on Google Play"
                          >
                            <Image
                              src="/assets/images/powernpark-qr.png"
                              alt="Scan QR code to download POWERnPARK Android App"
                              width={84}
                              height={84}
                              className="slide-qr-img"
                            />
                          </a>
                          <div className="slide-qr-details">
                            <span className="slide-qr-tag">SCAN QR TO DOWNLOAD</span>
                            <strong className="slide-qr-title">Get POWERnPARK App</strong>
                            <a
                              href="https://play.google.com/store/apps/details?id=com.neptuneindia.powernpark"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="slide-qr-store-btn"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                                <path d="M3.609 1.814L13.792 12 3.61 22.186c-.33-.2-.533-.568-.533-.976V2.79c0-.408.203-.776.532-.976zm11.246 11.248l2.083-2.083-11.83-6.685 9.747 8.768zm0 1.876l-9.747 8.768 11.83-6.685-2.083-2.083zm1.06-1.061l3.057 1.728c.84.475.84 1.25 0 1.725l-3.057 1.728-2.062-2.062 2.062-2.119z" />
                              </svg>
                              <span>Google Play Store</span>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HERO SLIDER CONTROLS */}
      <div className="slider-controls-bar">
        <div className="layout-container">
          {/* Dedicated Edge Sliding Key (Left) */}
          <button
            className="slider-edge-key prev-key"
            title="Previous Slide"
            aria-label="Previous Slide"
            onClick={prevSlide}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Center Group: 5 Interactive Dots + Play/Pause Toggle */}
          <div className="slider-center-controls">
            <div className="slider-dots-nav" role="tablist" aria-label="Hero slider pagination">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Slide ${idx + 1}: ${s.dotLabel}`}
                  onClick={() => goToSlide(idx)}
                >
                  <span className="dot-circle" />
                  <span className="dot-label">{s.dotLabel}</span>
                </button>
              ))}
            </div>

            {/* Play/Pause Animation Toggle */}
            <button
              className={`slider-media-toggle-btn ${!isPlaying ? 'paused' : ''}`}
              id="heroMediaToggle"
              title="Toggle Background Animation & Autoplay"
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg className="icon-pause" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="icon-play" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>

          {/* Dedicated Edge Sliding Key (Right) */}
          <button
            className="slider-edge-key next-key"
            title="Next Slide"
            aria-label="Next Slide"
            onClick={nextSlide}
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
