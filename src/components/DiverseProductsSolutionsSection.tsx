import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Sliders, 
  Radio,
  Car,
  Users,
  Compass,
  CreditCard,
  Lock,
  TrafficCone,
  Eye,
  Shield,
  Zap,
  MousePointer,
  Download,
  FileText
} from 'lucide-react';
import { NavPage } from '../types';
import { RouteExtra } from '../utils/urlRouter';

interface DiverseProductsSolutionsSectionProps {
  onNavigate: (page: NavPage, extra?: RouteExtra) => void;
  onOpenQuoteModal?: (subject?: string) => void;
}

interface ProductItem {
  title: string;
  badge: string;
  desc: string;
  action: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

interface CategoryCardConfig {
  id: string;
  indexNum: string;
  indexLabel: string;
  title: string;
  badge: string;
  headerLeft: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentGradient: string;
  badgeStyle: string;
  targetPage: NavPage;
  exploreLabel: string;
  specPills: string[];
  products: ProductItem[];
}

export const DiverseProductsSolutionsSection: React.FC<DiverseProductsSolutionsSectionProps> = ({
  onNavigate,
  onOpenQuoteModal,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const CATEGORIES: CategoryCardConfig[] = [
    {
      id: 'access-automation',
      indexNum: '01',
      indexLabel: '01 / 04',
      title: 'ACCESS AUTOMATION',
      badge: '34 MODELS • INTENSIVE DUTY',
      headerLeft: 'PERIMETER BARRIER & GATE SYSTEMS',
      description: 'Electro-mechanical & hydraulic perimeter barriers engineered for continuous intensive duty.',
      icon: Layers,
      accentGradient: 'from-[#1D438A] via-[#258BD7] to-[#00A8E8]',
      badgeStyle: 'bg-blue-50 text-[#1D438A] border-blue-200',
      targetPage: 'access-automation',
      exploreLabel: 'Explore Access Automation Portfolio',
      specPills: ['10M Cycle MTBF', '0.9s–3.0s Speed', 'BLDC 24V Drive', 'ASTM F2656 Crash-Rated', '100% Duty Cycle'],
      products: [
        {
          title: 'Automatic Boom Barriers',
          badge: '7 Models',
          desc: '3m–8m boom arm • 0.9s BLDC drive • 24V battery backup',
          action: () => onNavigate('category-detail', { accessCategory: 'automatic-boom-barriers' }),
          icon: Zap
        },
        {
          title: 'High-Security Automatic Bollards',
          badge: '4 Models',
          desc: 'Crash-rated K4/K8/K12 HVM • 1000mm rise • Hydraulic drive',
          action: () => onNavigate('category-detail', { accessCategory: 'high-security-automatic-bollards' }),
          icon: Shield
        },
        {
          title: 'Crash-Rated Drop Arm Barriers',
          badge: 'M50 Certified',
          desc: 'ASTM M50 certified • Halts 7.5T hostile truck @ 80 km/h',
          action: () => onNavigate('category-detail', { accessCategory: 'crash-rated-drop-arm-barriers' }),
          icon: ShieldCheck
        },
        {
          title: 'Swing Gate Automation',
          badge: '11 Models',
          desc: 'Up to 5m & 800kg/leaf • 110°–180° opening • Obstacle reverse',
          action: () => onNavigate('category-detail', { accessCategory: 'swing-gate-automation' }),
          icon: Compass
        },
        {
          title: 'Sliding Gate Automation',
          badge: '7 Models',
          desc: 'Up to 4000kg • Trackless cantilever • Soft-start/stop control',
          action: () => onNavigate('category-detail', { accessCategory: 'sliding-gate-automation' }),
          icon: Sliders
        },
        {
          title: 'Automatic Rolling Shutters',
          badge: '4 Models',
          desc: '1.5 m/s speed • Self-repairing zipper guides • Thermal seal',
          action: () => onNavigate('category-detail', { accessCategory: 'automatic-rolling-shutters' }),
          icon: Layers
        }
      ]
    },
    {
      id: 'access-control',
      indexNum: '02',
      indexLabel: '02 / 04',
      title: 'ACCESS CONTROL',
      badge: '18 MODELS • RFID & TURNSTILES',
      headerLeft: 'BIOMETRIC & VEHICULAR TURNSTILES',
      description: 'Biometric speed gates, optical flap turnstiles, full-height cages, and UHF RFID readers.',
      icon: ShieldCheck,
      accentGradient: 'from-[#00A8E8] via-[#0083B0] to-[#1D438A]',
      badgeStyle: 'bg-cyan-50 text-[#0083B0] border-cyan-200',
      targetPage: 'access-control',
      exploreLabel: 'Explore Access Control Solutions',
      specPills: ['0.2s Biometric Match', '865–868 MHz UHF RFID', 'Anti-Tailgating IR Grid', 'SUS 304/316 Steel', 'Fire Fail-Safe'],
      products: [
        {
          title: 'Optical Speed Gates',
          badge: 'Speed Gates',
          desc: 'Brushed SUS 304/316 • 10mm glass wings • 35–45 persons/min',
          action: () => onNavigate('access-control', { accessControlSubcategory: 'pedestrian-gates' }),
          icon: Users
        },
        {
          title: 'Flap Barrier Turnstiles',
          badge: 'Flap Barriers',
          desc: 'Polyurethane wings • Anti-pinch IR grid • Concourse transit',
          action: () => onNavigate('access-control', { accessControlSubcategory: 'pedestrian-gates' }),
          icon: Users
        },
        {
          title: 'Full-Height Security Turnstiles',
          badge: 'Full-Height',
          desc: 'Galvanized anti-climb cage • Fail-lock/fail-safe mechanism',
          action: () => onNavigate('access-control', { accessControlSubcategory: 'pedestrian-gates' }),
          icon: ShieldCheck
        },
        {
          title: 'Tripod Turnstiles',
          badge: 'Tripods',
          desc: 'Drop-arm emergency fire egress • Hydraulic shock damper',
          action: () => onNavigate('access-control', { accessControlSubcategory: 'pedestrian-gates' }),
          icon: Users
        },
        {
          title: 'Long-Range UHF RFID Readers',
          badge: '865–868 MHz',
          desc: '865–868 MHz • 6m–15m read range • Anti-collision algorithm',
          action: () => onNavigate('access-control', { accessControlSubcategory: 'uhf-rfid' }),
          icon: Radio
        },
        {
          title: 'Vehicular Road Blockers & Spikes',
          badge: 'Road Blockers',
          desc: '500–800mm lift • 100kN axle load • Punctures run-flat tyres',
          action: () => onNavigate('access-control', { accessControlSubcategory: 'vehicle-access' }),
          icon: Car
        }
      ]
    },
    {
      id: 'parking-solutions',
      indexNum: '03',
      indexLabel: '03 / 04',
      title: 'SMART PARKING SOLUTIONS',
      badge: '16 MODELS • FASTAG INTEGRATED',
      headerLeft: 'TICKETLESS FASTAG & ULTRASONIC PGS',
      description: 'Turnkey ticketless FASTag tolling, ultrasonic bay guidance, and automated pay stations.',
      icon: Cpu,
      accentGradient: 'from-[#0083B0] via-[#00B4D8] to-[#00BC7D]',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      targetPage: 'parking-solutions',
      exploreLabel: 'Explore Smart Parking Hub',
      specPills: ['NPCI FASTag Ready', '99.2% ANPR Accuracy', 'Sub-Second Latency', 'Cloud Audit Portal', 'Cashless UPI / QR'],
      products: [
        {
          title: 'Ticketless FASTag PMS',
          badge: 'FASTag PMS',
          desc: 'Automatic bank wallet deduction • 0.8s boom synchronization',
          action: () => onNavigate('parking-solutions', { parkingSolutionsSubcategory: 'management' }),
          icon: CreditCard
        },
        {
          title: 'Parking Guidance System (PGS)',
          badge: 'Ultrasonic PGS',
          desc: 'Ultrasonic vehicle detection • Multi-color RGB bay lamps',
          action: () => onNavigate('parking-solutions', { parkingSolutionsSubcategory: 'guidance' }),
          icon: Eye
        },
        {
          title: 'Vehicle Counting & LED Totems',
          badge: 'Loop Counting',
          desc: 'Differential in/out loop counting • Outdoor LED displays',
          action: () => onNavigate('parking-solutions', { parkingSolutionsSubcategory: 'counting' }),
          icon: Cpu
        },
        {
          title: '4K High-Speed ANPR Cameras',
          badge: '4K ANPR OCR',
          desc: '99.2% plate OCR accuracy • Starlight night-vision engine',
          action: () => onNavigate('parking-solutions', { parkingSolutionsSubcategory: 'vehicular-access' }),
          icon: Car
        },
        {
          title: 'Automated Cashless Pay Kiosks',
          badge: 'Pay Kiosks',
          desc: '21.5" touchscreen • UPI QR & card payment terminal',
          action: () => onNavigate('parking-solutions', { parkingSolutionsSubcategory: 'management' }),
          icon: CreditCard
        },
        {
          title: 'Automated Parking Bay Space Locks',
          badge: 'Bay Locks',
          desc: 'IP68 waterproof • 5-tonne pressure load • Remote controlled',
          action: () => onNavigate('parking-solutions', { parkingSolutionsSubcategory: 'management' }),
          icon: Lock
        }
      ]
    },
    {
      id: 'accessories',
      indexNum: '04',
      indexLabel: '04 / 04',
      title: 'CERTIFIED ACCESSORIES',
      badge: '13 MODELS • 100% FACTORY OEM',
      headerLeft: 'FACTORY SAFETY BEAMS & RF CONTROLS',
      description: 'Factory-tested optical beams, ground loops, RF transmitters, locks, and LED signals.',
      icon: Sliders,
      accentGradient: 'from-[#D7282F] via-[#ED1C24] to-[#F59E0B]',
      badgeStyle: 'bg-rose-50 text-[#D7282F] border-rose-200',
      targetPage: 'accessories',
      exploreLabel: 'Explore Certified Accessories',
      specPills: ['100% Factory OEM', 'IP67 Weatherproof', 'Fail-Safe Interlock', '433.92MHz Rolling Code', 'Die-Cast Aluminum'],
      products: [
        {
          title: 'Active Inductive Loop Detectors',
          badge: 'Loop Detectors',
          desc: '1-CH & 2-CH • 4-frequency anti-crosstalk • Direction logic',
          action: () => onNavigate('accessories', { accessoriesSubcategory: 'safety-devices' }),
          icon: Eye
        },
        {
          title: 'Active Infrared Safety Photocells',
          badge: 'Safety Photocells',
          desc: 'Dual modulated beams (20m/50m) • Sunlight filter protection',
          action: () => onNavigate('accessories', { accessoriesSubcategory: 'safety-devices' }),
          icon: Shield
        },
        {
          title: 'Industrial LED Traffic Signals',
          badge: 'Traffic Signals',
          desc: '100mm/200mm Red/Green LEDs • Daylight visible lenses',
          action: () => onNavigate('accessories', { accessoriesSubcategory: 'traffic-signals' }),
          icon: TrafficCone
        },
        {
          title: 'Push Buttons & Key Switches',
          badge: 'Push Buttons',
          desc: 'IP67 die-cast aluminum enclosure • Tamper-proof cylinder',
          action: () => onNavigate('accessories', { accessoriesSubcategory: 'pulse-generators' }),
          icon: Sliders
        },
        {
          title: 'Radio Transmitters & Receivers',
          badge: 'RF Remotes',
          desc: '433.92 MHz rolling code encryption • 50m–100m open range',
          action: () => onNavigate('accessories', { accessoriesSubcategory: 'radio-transmitters' }),
          icon: Radio
        },
        {
          title: 'Heavy-Duty Electric Gate Locks',
          badge: 'Electric Locks',
          desc: '1000kg shear force resistance • Mechanical key release',
          action: () => onNavigate('accessories', { accessoriesSubcategory: 'gate-locks' }),
          icon: Lock
        }
      ]
    }
  ];

  // Smooth scroll tracking synchronized with requestAnimationFrame for buttery 60/120fps
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight;

        if (totalScrollable <= 0) return;

        const headerEl = sectionRef.current.querySelector('#diverse-header-block');
        const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;

        // Effective scrollable distance starts once sticky deck engages at top-[102px]
        const scrollStart = -rect.top - headerHeight + 102;
        const scrollRange = totalScrollable - headerHeight;

        const fraction = Math.max(0, Math.min(1, scrollStart / Math.max(1, scrollRange)));
        const rawIndex = fraction * (CATEGORIES.length - 1);
        setScrollProgress(rawIndex);
        setActiveCardIndex(Math.min(CATEGORIES.length - 1, Math.round(rawIndex)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [CATEGORIES.length]);

  // Click-to-Scroll smoothly to a specific category
  const scrollToCategory = useCallback((index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const headerEl = sectionRef.current.querySelector('#diverse-header-block');
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const totalScrollable = rect.height - windowHeight;
    const scrollRange = totalScrollable - headerHeight;
    const targetFraction = index / (CATEGORIES.length - 1);
    const targetTop = window.scrollY + rect.top + headerHeight - 102 + (targetFraction * scrollRange);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  }, [CATEGORIES.length]);

  return (
    <section 
      id="diverse-products-solutions-section" 
      ref={sectionRef}
      className="wp-block-group alignfull came-box-vertical-slider1 relative bg-slate-50 border-y border-slate-200"
      style={{ minHeight: '340vh' }}
    >
      {/* 4-Color Accent Micro Ribbon at Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] flex z-20">
        <div className="w-[45%] bg-[#1D438A]" />
        <div className="w-[25%] bg-[#00A8E8]" />
        <div className="w-[15%] bg-[#D7282F]" />
        <div className="w-[15%] bg-[#ED1C24]" />
      </div>

      {/* Grand Center-Aligned Section Header (Bigger & Centered matching WhyNeptune & MissionVisionSection) */}
      <div 
        id="diverse-header-block" 
        className="pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-3.5 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 text-sky-700 text-xs font-mono uppercase tracking-widest shadow-2xs">
          <span className="pulsing-halo" />
          <span>COMPLETE ACCESS & AUTOMATION PORTFOLIO</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d37] tracking-tight leading-tight">
          Diverse Range of <span className="text-gradient-logo">Products & Solutions</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Four specialized engineering verticals delivering certified perimeter automation, biometric access control, intelligent multi-tenant parking, and rugged field accessories.
        </p>
        <div className="flex justify-center pt-1">
          <div className="flex h-[2.5px] w-16 rounded-full overflow-hidden">
            <div className="w-[60%] bg-[#1D438A]" />
            <div className="w-[40%] bg-[#D7282F]" />
          </div>
        </div>
      </div>

      {/* Sticky Presentation Viewport */}
      <div className="sticky top-[86px] flex flex-col justify-start pt-3 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 bg-slate-50 before:content-[''] before:absolute before:-top-8 before:left-0 before:right-0 before:h-8 before:bg-slate-50">
        
        {/* Sticky Control Bar with Category Tabs & Mouse Scroll Indicator */}
        <div className="space-y-2 pb-2 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            
            {/* Active Vertical Badge & Category Title */}
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1D438A] text-white tracking-wider">
                CATEGORY {CATEGORIES[activeCardIndex].indexNum} OF 04
              </span>
              <h3 className="font-display text-base sm:text-lg font-extrabold text-[#0a1d37] tracking-tight">
                {CATEGORIES[activeCardIndex].title}
              </h3>
            </div>

            {/* Mouse Scroll Control Hint */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#1D438A] text-xs font-semibold">
              <MousePointer className="w-3.5 h-3.5 text-[#00A8E8] animate-bounce" />
              <span>Scroll mouse to overlap categories</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono font-bold text-[#00A8E8]">
                {String(activeCardIndex + 1).padStart(2, '0')} / 04
              </span>
            </div>
          </div>

          {/* Quick-Jump Category Indicator Tabs (Full Width on Desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCardIndex === idx;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(idx)}
                  className={`text-left px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group ${
                    isActive 
                      ? 'bg-[#071526] text-white border-[#1D438A]' 
                      : 'bg-white hover:bg-slate-100/80 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                  title={`Jump to ${cat.title}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#00A8E8] text-white' : 'bg-slate-100 text-slate-500 group-hover:text-[#1D438A]'
                    }`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono font-bold leading-none text-[#00A8E8]">
                        {cat.indexNum}
                      </div>
                      <div className="text-[11px] font-bold truncate">
                        {cat.title}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isActive ? 'text-[#00A8E8] translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* The Overlapping Animated Cards Stack (Clean, No Shadow, Completely Fits Viewport Without Scroll) */}
        <div className="relative w-full h-[470px] sm:h-[450px] overflow-hidden rounded-2xl border border-slate-200 bg-white mt-1">
          {CATEGORIES.map((cat, idx) => {
            const delta = idx - scrollProgress;
            let translateY = 0;
            let scale = 1;
            let opacity = 1;

            if (delta > 0) {
              translateY = Math.min(100, delta * 100);
              scale = 1;
              opacity = 1;
            } else {
              const underProgress = Math.abs(delta);
              translateY = 0;
              scale = Math.max(0.96, 1 - (underProgress * 0.02));
              opacity = Math.max(0.7, 1 - (underProgress * 0.15));
            }

            const zIndex = 10 + (idx * 10);

            return (
              <div
                key={cat.id}
                className="wp-block-group alignwide card-vertical-slider is-layout-flow wp-block-group-is-layout-flow absolute inset-0 w-full h-full transition-all duration-300 ease-out will-change-transform"
                style={{
                  transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                  transformOrigin: 'top center',
                  zIndex: zIndex,
                  opacity: opacity,
                }}
              >
                {/* Inner Card Vertical Container - List ONLY Products (No Shadow, No Internal Scroll) */}
                <div className="wp-block-group alignwide inner-card-vertical w-full h-full bg-white rounded-2xl border-t-2 border-slate-200 flex flex-col justify-between p-4 sm:p-5 lg:p-6 overflow-hidden relative">
                  
                  {/* Top Accent Gradient Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.accentGradient}`} />

                  {/* Header Area */}
                  <div className="wp-block-group vcard-header pb-2.5 border-b border-slate-100 pt-0.5 shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1D438A] text-white">
                          {cat.indexLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-[#1D438A] border border-blue-200">
                          {cat.badge}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden md:inline">
                          {cat.headerLeft}
                        </span>
                      </div>

                      {/* Engineering Specs Strip */}
                      <div className="flex flex-wrap items-center gap-1">
                        {cat.specPills.map((spec, sIdx) => (
                          <span 
                            key={sIdx}
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-1 flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0a1d37] tracking-tight">
                          <span className="text-gradient-logo">{cat.title}</span>
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5 leading-tight">
                          {cat.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#00A8E8] flex items-center gap-1">
                        <span>Click any system for full specs</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Middle Area: LIST ONLY PRODUCTS (6 Compact Cards, 2 Rows × 3 Cols, Zero Internal Scroll) */}
                  <div className="wp-block-group vcard-content py-2 flex-1 flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 w-full">
                      {cat.products.map((prod, pIdx) => {
                        const ProdIcon = prod.icon;
                        return (
                          <button
                            key={pIdx}
                            onClick={prod.action}
                            className="w-full text-left p-2.5 rounded-xl bg-slate-50/70 hover:bg-blue-50/60 border border-slate-200 hover:border-[#1D438A] transition-colors duration-150 group/item flex items-center gap-3 cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1D438A] group-hover/item:bg-[#1D438A] group-hover/item:text-white transition-colors shrink-0">
                              <ProdIcon className="w-4 h-4" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <div className="font-display text-xs sm:text-[13px] font-bold text-slate-900 group-hover/item:text-[#1D438A] transition-colors truncate">
                                  {prod.title}
                                </div>
                                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200 shrink-0">
                                  {prod.badge}
                                </span>
                              </div>

                              <div className="text-[11px] text-slate-500 truncate leading-tight group-hover/item:text-slate-700">
                                {prod.desc}
                              </div>
                            </div>

                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-[#1D438A] group-hover/item:translate-x-0.5 transition-transform shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Area: Action Buttons (vcard-buttons, Clean, No Shadow) */}
                  <div className="wp-block-buttons pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onNavigate(cat.targetPage)}
                        className="py-1.5 px-4 rounded-lg bg-gradient-to-r from-[#1D438A] to-[#00A8E8] hover:from-[#153266] hover:to-[#0092ca] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>{cat.exploreLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`${cat.title} Specs`) : onNavigate('contact')}
                        className="py-1.5 px-3 rounded-lg bg-white hover:bg-slate-50 text-[#1D438A] border border-slate-200 hover:border-[#1D438A] font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Request Quote</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => onNavigate('resources')}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-[#1D438A] transition-colors cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-[#00A8E8]" />
                        <span>CAD Drawings & Tender Specs</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Micro Footer Strip */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Neptune Automatic Official Manufacturing Portfolio • ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-slate-400 text-[10px]">
            <span>Section: card-vertical-slider</span>
            <span>•</span>
            <span>Layer: {activeCardIndex + 1}/4</span>
          </div>
        </div>

      </div>
    </section>
  );
};
