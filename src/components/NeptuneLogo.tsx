import React from 'react';

interface NeptuneLogoProps {
  variant?: 'light' | 'dark' | 'color';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  forceImage?: boolean;
}

/**
 * Official Neptune Logo Emblem (Dual-Folded Chevron "N")
 * Exact colors matching the official trademark logo:
 * - Top-left folded chevron: Royal Navy Blue (#1D438A) & Dynamic Sky Blue (#258BD7)
 * - Bottom-right folded chevron: Crimson Red (#D7282F) & Vibrant Scarlet Red (#E12E35)
 */
export const NeptuneEmblem: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size = 48 
}) => {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size * (140 / 160)}
      aria-label="Neptune Logo Emblem"
    >
      <defs>
        {/* Top-Left Ribbon: Royal Navy & Bright Sky Blue */}
        <linearGradient id="neptune-navy-facet" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#183366" />
          <stop offset="100%" stopColor="#1D438A" />
        </linearGradient>
        <linearGradient id="neptune-sky-facet" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A8E8" />
          <stop offset="100%" stopColor="#29A9E0" />
        </linearGradient>

        {/* Bottom-Right Ribbon: Deep Crimson & Vibrant Red */}
        <linearGradient id="neptune-crimson-facet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A61B21" />
          <stop offset="100%" stopColor="#D7282F" />
        </linearGradient>
        <linearGradient id="neptune-scarlet-facet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D7282F" />
          <stop offset="100%" stopColor="#ED1C24" />
        </linearGradient>
      </defs>

      {/* TOP-LEFT RIBBON */}
      {/* Facet 1: Lower Royal Navy Base */}
      <path
        d="M 5 70 L 46 70 L 68 36 L 42 10 L 28 32 L 5 70 Z"
        fill="url(#neptune-navy-facet)"
      />
      {/* Facet 2: Upper Sky Blue Peak */}
      <path
        d="M 42 10 L 68 36 L 94 76 L 80 98 L 46 70 L 68 36 Z"
        fill="url(#neptune-sky-facet)"
      />

      {/* BOTTOM-RIGHT RIBBON (180° Complement) */}
      {/* Facet 3: Upper Crimson Segment */}
      <path
        d="M 66 104 L 92 64 L 118 104 L 92 130 L 66 104 Z"
        fill="url(#neptune-crimson-facet)"
      />
      {/* Facet 4: Lower Vibrant Scarlet Base */}
      <path
        d="M 92 130 L 118 104 L 155 70 L 114 70 L 92 104 L 92 130 Z"
        fill="url(#neptune-scarlet-facet)"
      />
    </svg>
  );
};

/**
 * Official Full Neptune Automatic Brand Lockup
 * Renders the official user-provided brand mark asset with responsive sizing,
 * crisp rendering, and dark-context compatibility.
 */
export const NeptuneLogo: React.FC<NeptuneLogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = false,
  size = 'md',
}) => {
  const isDark = variant === 'dark';

  // Height definitions for the official logo image
  const sizeStyles = {
    sm: {
      imgHeight: 'h-8 sm:h-9',
      tagline: 'text-[9px]',
      padding: isDark ? 'px-2.5 py-1' : '',
    },
    md: {
      imgHeight: 'h-10 sm:h-11',
      tagline: 'text-[10px]',
      padding: isDark ? 'px-3 py-1.5' : '',
    },
    lg: {
      imgHeight: 'h-12 sm:h-14',
      tagline: 'text-xs',
      padding: isDark ? 'px-3.5 py-2' : '',
    },
    xl: {
      imgHeight: 'h-16 sm:h-18',
      tagline: 'text-sm',
      padding: isDark ? 'px-4 py-2.5' : '',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div 
        className={`inline-flex items-center rounded-sm transition-all ${
          isDark 
            ? `bg-white/95 backdrop-blur-xs border border-white/20 shadow-xs ${sizeStyles.padding}` 
            : ''
        }`}
      >
        <img
          src="/neptune-logo.png"
          alt="Neptune Automatic"
          className={`${sizeStyles.imgHeight} w-auto object-contain select-none`}
          loading="eager"
          decoding="async"
        />
      </div>

      {showTagline && (
        <span 
          className={`font-semibold tracking-wide uppercase mt-1 ${sizeStyles.tagline} ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Powering Innovation. Transforming Energies.
        </span>
      )}
    </div>
  );
};

