import React from 'react';
import { NeptuneLogo } from './NeptuneLogo';

interface NeptuneCompanyBuildingProps {
  className?: string;
  variant?: 'hero-bg' | 'subpage-header' | 'card' | 'standalone';
  showOverlay?: boolean;
  overlayOpacity?: 'light' | 'medium' | 'dark' | 'subtle';
  height?: string;
}

/**
 * NeptuneCompanyBuilding renders an authentic high-resolution architectural representation
 * of Neptune India Corporate Headquarters & Production Facility (Neptune House, A-11, Sector-59, Noida),
 * directly inspired by the official company facility photograph provided by the user.
 */
export const NeptuneCompanyBuilding: React.FC<NeptuneCompanyBuildingProps> = ({
  className = '',
  variant = 'hero-bg',
  showOverlay = true,
  overlayOpacity = 'medium',
  height = 'h-full'
}) => {
  const getOverlayClass = () => {
    switch (overlayOpacity) {
      case 'light':
        return 'bg-gradient-to-r from-white/80 via-white/60 to-white/40';
      case 'medium':
        return 'bg-gradient-to-r from-[#0a1d37]/90 via-[#0a1d37]/75 to-[#0a1d37]/40';
      case 'dark':
        return 'bg-gradient-to-r from-[#0a1d37]/95 via-[#0a1d37]/85 to-[#0a1d37]/70';
      case 'subtle':
        return 'bg-gradient-to-t from-[#0a1d37]/80 via-transparent to-black/20';
      default:
        return 'bg-gradient-to-r from-[#0a1d37]/85 via-[#0a1d37]/70 to-[#0a1d37]/35';
    }
  };

  return (
    <div className={`relative w-full overflow-hidden select-none ${height} ${className}`}>
      {/* Precision Vector & Architectural Canvas representing Neptune Noida HQ */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Azure Sky Gradient */}
          <linearGradient id="neptuneSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0088cc" />
            <stop offset="35%" stopColor="#38b6ff" />
            <stop offset="70%" stopColor="#87d3ff" />
            <stop offset="100%" stopColor="#cceeff" />
          </linearGradient>

          {/* Warm Sun flare in upper right */}
          <radialGradient id="sunFlare" cx="85%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#ffd89b" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ffb347" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Facade Left Light Shadow Gradient */}
          <linearGradient id="facadeLeft" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#edf2f7" />
            <stop offset="60%" stopColor="#f7fafc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Facade Right Angled Sunlight Gradient */}
          <linearGradient id="facadeRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fffcf5" />
            <stop offset="80%" stopColor="#fbeed9" />
            <stop offset="100%" stopColor="#f5dfc2" />
          </linearGradient>

          {/* Window Ribbon Shadow */}
          <linearGradient id="windowDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1f38" />
            <stop offset="50%" stopColor="#152945" />
            <stop offset="100%" stopColor="#091424" />
          </linearGradient>

          {/* Tinted Reflective Glass Gradient for Ground Floor */}
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071220" />
            <stop offset="30%" stopColor="#142b45" />
            <stop offset="55%" stopColor="#1f3f61" />
            <stop offset="80%" stopColor="#10253d" />
            <stop offset="100%" stopColor="#071220" />
          </linearGradient>

          {/* Pavement Ground */}
          <linearGradient id="pavement" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ccd5de" />
            <stop offset="50%" stopColor="#b4c0cc" />
            <stop offset="100%" stopColor="#8d9ba8" />
          </linearGradient>
        </defs>

        {/* 1. Clear Azure Blue Sky */}
        <rect width="1600" height="900" fill="url(#neptuneSky)" />

        {/* 2. Natural Sun Halo Flare */}
        <rect width="1600" height="900" fill="url(#sunFlare)" />

        {/* 3. Forecourt Ground / Entrance Apron */}
        <polygon points="0,750 1600,750 1600,900 0,900" fill="url(#pavement)" />
        <line x1="0" y1="750" x2="1600" y2="750" stroke="#9bb0c1" strokeWidth="2" />
        <line x1="400" y1="750" x2="200" y2="900" stroke="#a0b3c2" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="850" y1="750" x2="800" y2="900" stroke="#a0b3c2" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="1300" y1="750" x2="1400" y2="900" stroke="#a0b3c2" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* 4. Left Facade Wing (Perspective going toward vanishing point left) */}
        {/* Main white facade corner block */}
        <polygon
          points="880,75 880,885 50,735 50,650 880,75"
          fill="url(#facadeLeft)"
        />

        {/* Left Side Window Ribbon Cutouts (Level 2 & 3) */}
        {/* Level 3 window band */}
        <polygon
          points="500,250 765,280 765,370 500,340"
          fill="url(#windowDark)"
        />
        {/* Window reflection highlight */}
        <polygon
          points="520,260 550,264 540,345 510,341"
          fill="#38b6ff"
          fillOpacity="0.3"
        />

        {/* Level 2 window band */}
        <polygon
          points="60,490 765,490 765,585 60,585"
          fill="url(#windowDark)"
        />
        <line x1="60" y1="490" x2="765" y2="490" stroke="#000000" strokeWidth="3" strokeOpacity="0.2" />

        {/* 5. Right Facade Wing (Angled down toward right bathed in sunlight) */}
        <polygon
          points="880,75 1600,650 1600,885 880,885"
          fill="url(#facadeRight)"
        />

        {/* Right Side Window Ribbon Cutouts (Level 3 & 2) */}
        {/* Upper Level 3 Ribbon */}
        <polygon
          points="985,285 1420,530 1420,620 985,385"
          fill="url(#windowDark)"
        />
        {/* Level 2 Ribbon */}
        <polygon
          points="1015,510 1560,705 1560,780 1015,595"
          fill="url(#windowDark)"
        />

        {/* Sunlight edge glow on the central building corner ridge */}
        <line x1="880" y1="75" x2="880" y2="885" stroke="#ffffff" strokeWidth="4" />
        <line x1="882" y1="75" x2="882" y2="885" stroke="#ffe7bf" strokeWidth="3" strokeOpacity="0.7" />

        {/* 6. Ground Floor Curtain Glass Entrance (Reflective dark glass with internal illumination) */}
        <polygon
          points="90,755 870,755 870,885 90,885"
          fill="url(#glassReflect)"
        />
        <polygon
          points="870,755 1480,755 1480,885 870,885"
          fill="url(#glassReflect)"
        />

        {/* Glass Mullions & Structure */}
        <line x1="200" y1="755" x2="200" y2="885" stroke="#00a8e8" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="380" y1="755" x2="380" y2="885" stroke="#00a8e8" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="560" y1="755" x2="560" y2="885" stroke="#00a8e8" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="740" y1="755" x2="740" y2="885" stroke="#00a8e8" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="1020" y1="755" x2="1020" y2="885" stroke="#00a8e8" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="1240" y1="755" x2="1240" y2="885" stroke="#00a8e8" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Pedestrian Entrance Steps & Planters */}
        <polygon points="120,865 240,865 260,885 100,885" fill="#a4b3c2" />
        <polygon points="900,850 1350,850 1370,885 880,885" fill="#f0f4f8" />

        {/* 7. OFFICIAL NEPTUNE 3D FACADE SIGNAGE MOUNTED ON BUILDING */}
        {/* Perspective group positioned on upper left white facade panel */}
        <g transform="matrix(0.96 0.12 -0.15 0.98 520 180)">
          {/* Subtle drop shadow for 3D letters */}
          <g transform="translate(4, 6)" opacity="0.2">
            <path
              d="M0,50 L40,0 L80,0 L40,50 Z"
              fill="#000000"
            />
            <path
              d="M35,50 L75,100 L115,100 L75,50 Z"
              fill="#000000"
            />
            <text
              x="130"
              y="75"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="85"
              fontWeight="900"
              letterSpacing="2"
              fill="#000000"
            >
              NEPTUNE
            </text>
          </g>

          {/* Left Ribbon Chevron (Bright Cyan) */}
          <path
            d="M0,50 L42,-2 L82,-2 L40,50 Z"
            fill="#009fe3"
          />
          {/* Right Ribbon Chevron (Red / Coral Accent) */}
          <path
            d="M32,50 L74,102 L114,102 L72,50 Z"
            fill="#e52421"
          />

          {/* NEPTUNE Brand Facade Letters */}
          <text
            x="130"
            y="75"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="85"
            fontWeight="900"
            letterSpacing="2"
            fill="#00438c"
          >
            NEPTUNE
          </text>
          {/* Registered Trademark symbol */}
          <text
            x="590"
            y="30"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="28"
            fontWeight="700"
            fill="#00438c"
          >
            ®
          </text>
        </g>

        {/* Subtle Ambient Light Reflections */}
        <circle cx="1350" cy="180" r="140" fill="#fff5e6" fillOpacity="0.3" filter="blur(20px)" />
      </svg>

      {/* Optional Theme Overlay for Legibility */}
      {showOverlay && (
        <div className={`absolute inset-0 ${getOverlayClass()} pointer-events-none transition-opacity duration-300`} />
      )}
    </div>
  );
};
