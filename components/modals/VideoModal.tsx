'use client';

import React, { useEffect } from 'react';
import { useModal } from '@/context/ModalContext';

export default function VideoModal() {
  const { isVideoOpen, videoData, closeVideo } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) {
        closeVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen, closeVideo]);

  if (!isVideoOpen || !videoData) return null;

  return (
    <div
      className="video-modal-backdrop active"
      id="videoModal"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-labelledby="videoModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeVideo();
      }}
    >
      <div className="video-modal-dialog">
        <div className="video-modal-header">
          <h3 className="video-modal-title" id="videoModalTitle">
            {videoData.title || 'Video Demonstration'}
          </h3>
          <button
            type="button"
            className="video-modal-close-btn"
            id="videoModalCloseBtn"
            aria-label="Close video player"
            onClick={closeVideo}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="video-modal-player-wrap">
          <iframe
            id="videoModalIframe"
            src={`https://www.youtube.com/embed/${videoData.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={videoData.title || 'Neptune Automatic Video Player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-modal-footer">
          <span className="video-modal-badge">Neptune Official Channel</span>
          <a
            id="videoModalYtLink"
            href={`https://www.youtube.com/watch?v=${videoData.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-modal-ext-link"
          >
            <span>Watch on YouTube</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
