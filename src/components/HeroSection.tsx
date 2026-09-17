import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Zap, 
  Cpu, 
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Building2,
  MapPin,
  Activity,
  Layers,
  Pause,
  Play
} from 'lucide-react';
import { Product, NavPage } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/companyData';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { PARKING_SOLUTIONS_PRODUCTS } from '../data/parkingSolutionsProducts';
import { ACCESSORIES_PRODUCTS } from '../data/accessoriesProducts';
import { NeptuneLogo, NeptuneEmblem } from './NeptuneLogo';

interface HeroSectionProps {
  onExploreSolutions: () => void;
  onOpenQuoteModal: (product?: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToPage?: (page: NavPage) => void;
  onNavigateToProductPage?: (productId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSolutions,
  onOpenQuoteModal,
  onSelectProduct,
  onNavigateToPage,
  onNavigateToProductPage,
}) => {
  const [activeHeroTab, setActiveHeroTab] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 4 Flagship Product Parent Pages
  const heroShowcaseItems: Array<{
    title: string;
    shortTitle: string;
    parentPage: NavPage;
    product: any;
    customImage?: string;
    isFullBleed?: boolean;
    stat: string;
    sub: string;
    badge: string;
    categoryCode: string;
  }> = [
    {
      title: 'Access Automation',
      shortTitle: 'Access Automation',
      parentPage: 'access-automation' as NavPage,
      product: ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'power-fusion-xd-automatic-boom-barrier') || 
               ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'faac-b680h') || 
               PRODUCTS[0],
      customImage: '/assets/access-automation-hero.jpg',
      isFullBleed: true,
      stat: '34 Models',
      sub: 'Boom Barriers, Bollards & Gates',
      badge: 'Parent Category 01',
      categoryCode: 'ACCESS AUTOMATION'
    },
    {
      title: 'Access Control',
      shortTitle: 'Access Control',
      parentPage: 'access-control' as NavPage,
      product: ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'pgate2048') || 
               ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'three-arm-turnstiles') || 
               ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'neptune-speed-gate-optical-barrier') || 
               PRODUCTS[3],
      stat: '18 Models',
      sub: 'Speed Gates, Turnstiles & Long-Range UHF',
      badge: 'Parent Category 02',
      categoryCode: 'ACCESS CONTROL'
    },
    {
      title: 'Smart Parking Solutions',
      shortTitle: 'Smart Parking Solution',
      parentPage: 'parking-solutions' as NavPage,
      product: ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'fully-automatic-parking-management-system') || 
               PARKING_SOLUTIONS_PRODUCTS[0] || 
               PRODUCTS[8],
      stat: '16 Models',
      sub: 'FASTag PMS, PGS Guidance & Counting',
      badge: 'Parent Category 03',
      categoryCode: 'SMART PARKING'
    },
    {
      title: 'Certified Accessories',
      shortTitle: 'Certified Accessories',
      parentPage: 'accessories' as NavPage,
      product: ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'loop-detector-safety') || 
               ACCESSORIES_PRODUCTS.find(p => p.id === 'loop-detector-safety') || 
               PRODUCTS[6],
      customImage: '/assets/loop-detector-safety.webp',
      isFullBleed: false,
      stat: '13 Models',
      sub: 'Inductive Loop Detectors & Safety Devices',
      badge: 'Parent Category 04',
      categoryCode: 'ACCESSORIES'
    }
  ];

  const currentItem = heroShowcaseItems[activeHeroTab];

  // Auto-advance sliding timer (advances every 3.8s, pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveHeroTab((prev) => (prev + 1) % heroShowcaseItems.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, heroShowcaseItems.length]);

  const handleNext = () => {
    setActiveHeroTab((prev) => (prev + 1) % heroShowcaseItems.length);
  };

  const handlePrev = () => {
    setActiveHeroTab((prev) => (prev - 1 + heroShowcaseItems.length) % heroShowcaseItems.length);
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[85vh] flex items-center pt-24 pb-8 sm:pb-10 overflow-hidden bg-gradient-to-br from-white via-slate-50/60 to-white bg-tech-grid"
    >
      {/* Ambient background glow orbs (Nxerai theme inspiration) */}
      <div className="absolute top-12 right-10 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D7282F]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Clean Subtle Grid Texture */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0a1d37" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Brand Headline, Positioning & Actions */}
          <div className="lg:col-span-5 space-y-5 text-left">
            
            {/* Nxerai-inspired Eyebrow Badge with Pulsing Halo */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-xs backdrop-blur-md">
              <span className="pulsing-halo" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#1D438A] uppercase">
                ESTD 2005 • SMART PERIMETER & PARKING AUTOMATION
              </span>
            </div>

            {/* Primary Headline with Logo Color Harmony */}
            <div className="space-y-2.5">
              <h1 
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0a1d37] leading-[1.15]"
              >
                Intelligent Parking, Access Control &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D438A] via-[#00A8E8] to-[#D7282F]">
                  Perimeter Security Solutions
                </span>
              </h1>
              
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-8 bg-[#00A8E8]" />
                <h2 className="font-display text-sm sm:text-base font-bold text-slate-700 tracking-wide">
                  Neptune Automatic Products
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
              High-throughput barrier automation, crash-rated vehicle mitigation, and ticketless FASTag parking ecosystems engineered for India's high-traffic infrastructure since 2005.
            </p>

            {/* Nxerai-inspired Buttons & Direct CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              
              <button
                id="btn-hero-request-quote"
                onClick={() => onOpenQuoteModal()}
                className="px-5 py-3 rounded-xl bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 flex items-center gap-2 transition-all cursor-pointer group"
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold transition-transform group-hover:rotate-90">+</span>
                <span>Request Enterprise Quote</span>
              </button>

              <button
                id="btn-hero-explore-solutions"
                onClick={onExploreSolutions}
                className="px-5 py-3 rounded-xl bg-[#1D438A] hover:bg-[#15346D] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md flex items-center gap-2 transition-all cursor-pointer group"
              >
                <span>Explore Solutions Hub</span>
                <ArrowRight className="w-4 h-4 text-[#00A8E8] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Nxerai-inspired Credibility Bento Stat Cards */}
            <div className="pt-3 grid grid-cols-3 gap-2.5 border-t border-slate-200/80">
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/70 shadow-2xs">
                <div className="text-lg sm:text-xl font-black text-[#1D438A] font-mono">20+ Yrs</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-0.5">Engineering Excellence</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/70 shadow-2xs">
                <div className="text-lg sm:text-xl font-black text-[#D7282F] font-mono">15K+</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-0.5">Deployments PAN-India</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/70 shadow-2xs">
                <div className="text-lg sm:text-xl font-black text-[#00A8E8] font-mono">10M</div>
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-0.5">Cycle Life Tested</div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Hardware Showcase (Compact, Engaging, High-Tech) */}
          <div className="lg:col-span-7">
            <div 
              className="relative rounded-2xl bg-white/95 border border-slate-200/90 p-4 sm:p-5 shadow-xl backdrop-blur-md"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* Technical coordinate accents */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100 text-[10px] sm:text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="pulsing-halo-red" />
                  <span className="text-[#1D438A] font-bold tracking-wider uppercase">NEPTUNE AUTOMATIC PRODUCTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-[10px]">
                    {isPaused ? (
                      <span className="text-amber-600 font-bold flex items-center gap-1"><Pause className="w-2.5 h-2.5" /> Paused</span>
                    ) : (
                      <span className="text-emerald-600 font-bold flex items-center gap-1"><Play className="w-2.5 h-2.5" /> Live Auto-Slide</span>
                    )}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-bold font-mono">ISO 9001:2015</span>
                </div>
              </div>

              {/* Perfectly Proportioned Showcase Image Frame with AnimatePresence */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 h-[300px] sm:h-[340px] lg:h-[370px] mb-3 group shadow-inner">
                
                {/* Auto-Slide Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-slate-900 z-30 overflow-hidden">
                  <motion.div
                    key={activeHeroTab}
                    initial={{ width: '0%' }}
                    animate={{ width: isPaused ? '100%' : '100%' }}
                    transition={{ duration: 3.8, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-[#1D438A] via-[#00A8E8] to-[#D7282F]"
                  />
                </div>

                {/* Corner Tech Reticles / HUD Brackets */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00A8E8]/70 z-20 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00A8E8]/70 z-20 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00A8E8]/70 z-20 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00A8E8]/70 z-20 pointer-events-none" />

                {/* Top Telemetry Watermark */}
                <div className="absolute top-2.5 left-8 z-20 pointer-events-none text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400/80 uppercase">
                  <span>PARENT ECOSYSTEM: {currentItem.title}</span>
                  <span className="mx-1.5 text-slate-600">/</span>
                  <span className="text-[#00A8E8]">QA VERIFIED</span>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={currentItem.title}
                    initial={{ x: '100%', opacity: 0.2 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0.1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => {
                      if (currentItem.product && onNavigateToProductPage) {
                        onNavigateToProductPage(currentItem.product.id);
                      } else if (onNavigateToPage) {
                        onNavigateToPage(currentItem.parentPage);
                      } else if (currentItem.product && onSelectProduct) {
                        onSelectProduct(currentItem.product);
                      }
                    }}
                    className={`w-full h-full relative flex items-center justify-center cursor-pointer ${
                      currentItem.isFullBleed
                        ? 'p-0 bg-slate-950 overflow-hidden'
                        : 'p-4 sm:p-6 pb-16 sm:pb-20 bg-gradient-to-b from-slate-900 via-[#071526] to-slate-950'
                    }`}
                  >
                    {/* Atmospheric Ambient Glow behind Hardware */}
                    {!currentItem.isFullBleed && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,232,0.18)_0%,rgba(29,67,138,0.12)_45%,transparent_75%)] pointer-events-none" />
                    )}

                    {/* Gradient Overlay for custom full-bleed images to enhance telemetry & HUD legibility */}
                    {currentItem.isFullBleed && (
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-slate-950/60 pointer-events-none z-10" />
                    )}

                    <img
                      src={currentItem.customImage || currentItem.product?.image}
                      alt={currentItem.product?.name || currentItem.title}
                      className={currentItem.isFullBleed
                        ? "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        : "max-h-full max-w-full w-auto h-auto object-contain object-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500 relative z-10"
                      }
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right manual slide buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 hover:bg-[#1D438A] text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 shadow-lg cursor-pointer border border-white/10"
                  title="Previous Category"
                  aria-label="Previous Category"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 hover:bg-[#1D438A] text-white flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-30 shadow-lg cursor-pointer border border-white/10"
                  title="Next Category"
                  aria-label="Next Category"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Floating Nxerai-inspired Compact Glass Metric HUD Badge */}
                <div 
                  onClick={() => {
                    if (currentItem.product && onNavigateToProductPage) {
                      onNavigateToProductPage(currentItem.product.id);
                    } else if (onNavigateToPage) {
                      onNavigateToPage(currentItem.parentPage);
                    }
                  }}
                  className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg bg-slate-950/85 border border-white/15 text-white shadow-xl backdrop-blur-xl z-20 cursor-pointer hover:border-[#00A8E8]/50 transition-colors"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-[9px] font-mono font-bold tracking-wider text-[#ED1C24] uppercase">
                        <span className="w-1 h-1 rounded-full bg-[#ED1C24] animate-ping" />
                        {currentItem.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {currentItem.product?.name || currentItem.title}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">
                      {currentItem.title}
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-black text-[#00A8E8] font-mono tracking-tight leading-none">
                      {currentItem.stat}
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                      {currentItem.sub}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selector Tabs for 4 Product Parent Pages (Nxerai Card Design) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {heroShowcaseItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveHeroTab(index)}
                    className={`p-2 sm:p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between min-h-[58px] sm:min-h-[64px] ${
                      activeHeroTab === index
                        ? 'bg-[#1D438A] text-white border-b-2 border-[#D7282F] shadow-md'
                        : 'bg-slate-50/90 border border-slate-200 text-slate-700 hover:text-[#1D438A] hover:bg-white hover:border-[#1D438A]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold ${activeHeroTab === index ? 'text-[#00A8E8]' : 'text-slate-400'}`}>
                        0{index + 1}
                      </span>
                      {activeHeroTab === index && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D7282F] animate-pulse" />
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs font-bold leading-tight mt-1">
                      {item.shortTitle}
                    </div>
                  </button>
                ))}
              </div>

              {/* Direct View Specs CTA Bar */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  Parent Ecosystem: <strong className="text-slate-800 font-bold">{currentItem.title}</strong>
                </span>
                <button
                  onClick={() => onNavigateToPage ? onNavigateToPage(currentItem.parentPage) : onExploreSolutions()}
                  className="inline-flex items-center gap-1 font-bold text-xs text-[#1D438A] hover:text-[#D7282F] group/btn transition-colors cursor-pointer"
                >
                  <span>Explore {currentItem.title} Page</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#D7282F]" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
