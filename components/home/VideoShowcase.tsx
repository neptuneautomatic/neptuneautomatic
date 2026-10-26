'use client';

import React from 'react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';

interface VideoItem {
  id: string;
  title: string;
  thumbSrc: string;
  category: string;
  duration: string;
  tag: string;
  badge: string;
  desc: string;
}

const videos: VideoItem[] = [
  {
    id: 'bqcUCidqqw4',
    title: 'Security & Access Management',
    thumbSrc: '/assets/images/video-thumb-security-access.jpg',
    category: 'Access Control',
    duration: 'Full Portfolio',
    tag: 'Neptune India Ltd.',
    badge: 'HD',
    desc: 'High-speed boom barriers, architectural turnstiles, and perimeter crash barriers.',
  },
  {
    id: 'bQusBwBmjKU',
    title: 'Neptune India at Elecrama',
    thumbSrc: '/assets/images/video-thumb-elecrama.jpg',
    category: 'Global Exhibition',
    duration: 'Elecrama',
    tag: 'Neptune India Ltd.',
    badge: 'Expo',
    desc: 'Engineering heritage, smart power management, and synchronized enterprise automation.',
  },
];

export default function VideoShowcase() {
  const { openVideo } = useModal();

  return (
    <section className="section-padding video-showcase-section" id="videos" aria-label="Featured Videos and Demonstrations">
      <div className="layout-container">
        {/* Section Header */}
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Field Demonstrations &amp; Industry Expos
            </span>
            <h2 className="section-title">Neptune in Action: Video Showcase</h2>
          </div>
          <p className="section-subtitle">
            Watch our intelligent parking management systems, crash-certified bollards, and international exhibition showcases operating in live deployments.
          </p>
        </div>

        {/* Compact Slidable Video Showcase */}
        <div className="video-slider-container scroll-reveal">
          <div className="video-showcase-track" id="videoShowcaseTrack" style={{ justifyContent: 'center' }}>
            {videos.map((v) => (
              <article key={v.id} className="video-card" data-video-id={v.id} data-video-title={v.title}>
                <div className="video-card-thumb-wrap" onClick={() => openVideo(v.id, v.title)} style={{ cursor: 'pointer' }}>
                  <Image
                    src={v.thumbSrc}
                    alt={v.title}
                    width={480}
                    height={270}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    loading="lazy"
                  />
                  <div className="video-play-overlay">
                    <button
                      type="button"
                      className="video-play-btn"
                      aria-label={`Play video: ${v.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openVideo(v.id, v.title);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  </div>
                  <span className="video-badge-category">{v.category}</span>
                  <span className="video-badge-duration">{v.duration}</span>
                </div>
                <div className="video-card-body">
                  <div>
                    <div className="video-meta-row">
                      <span className="video-channel-tag">{v.tag}</span>
                      <span className="video-hd-pill">{v.badge}</span>
                    </div>
                    <h3 className="video-card-title">{v.title}</h3>
                    <p className="video-card-desc">{v.desc}</p>
                  </div>
                  <div className="video-card-footer">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm video-trigger-btn"
                      onClick={() => openVideo(v.id, v.title)}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>Watch Demo</span>
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-yt-link"
                    >
                      <span>YouTube</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
