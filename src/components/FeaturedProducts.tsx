import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Zap, 
  Layers,
  ChevronRight, 
  Shield, 
  Car, 
  AlertOctagon, 
  Users,
  FolderOpen
} from 'lucide-react';
import { Product, ProductCategory, AccessAutomationCategory, AccessControlSubcategory, ParkingSolutionsSubcategory } from '../types';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { PARKING_SOLUTIONS_PRODUCTS } from '../data/parkingSolutionsProducts';
import { getProductUrl } from '../utils/urlRouter';

interface FeaturedProductsProps {
  onSelectProduct: (product: Product) => void;
  onOpenQuoteModal: (productName: string) => void;
  onNavigateToProducts: (category?: ProductCategory) => void;
  onNavigateToProductPage?: (productId: string) => void;
  onNavigateToAccessCategory?: (category: AccessAutomationCategory) => void;
  onNavigateToAccessControl?: (subcat: AccessControlSubcategory) => void;
  onNavigateToParkingSolutions?: (subcat: ParkingSolutionsSubcategory) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onSelectProduct,
  onOpenQuoteModal,
  onNavigateToProducts,
  onNavigateToProductPage,
  onNavigateToAccessCategory,
  onNavigateToAccessControl,
  onNavigateToParkingSolutions
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Canonical flagship hardware models from ALL_NEPTUNE_PRODUCTS
  const boomBarrier = ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'faac-b680h') || 
                      ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'power-fusion-xd-automatic-boom-barrier') || 
                      ALL_NEPTUNE_PRODUCTS[0];

  const crashBollard = ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'faac-j355-m50-bollard') || 
                       ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'neptune-hydraulic-automatic-bollard') || 
                       ALL_NEPTUNE_PRODUCTS[4];

  const roadBlocker = ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'heavy-duty-hydraulic-road-blocker') || 
                      ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'shallow-mount-road-blocker') || 
                      ALL_NEPTUNE_PRODUCTS[6];

  const turnstile = ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'neptune-speed-gate-optical-barrier') || 
                    ALL_NEPTUNE_PRODUCTS.find(p => p.id === 'neptune-tripod-turnstile-classic') || 
                    ALL_NEPTUNE_PRODUCTS[8];

  const parkingSystem = PARKING_SOLUTIONS_PRODUCTS.find(p => p.id === 'fully-automatic-parking-management-system') || 
                        PARKING_SOLUTIONS_PRODUCTS[0];

  const flagshipItems = [
    {
      id: 'boom-barrier',
      category: 'Boom Barriers' as ProductCategory,
      tabTitle: 'Boom Barriers',
      categoryName: 'Access Automation',
      subcategoryName: 'Automatic Boom Barriers',
      categorySlug: 'automatic-boom-barriers' as AccessAutomationCategory,
      type: 'access-automation',
      icon: Car,
      product: boomBarrier,
      badge: 'Vehicle Access Automation',
      headline: boomBarrier.name,
      tagline: boomBarrier.tagline,
      desc: boomBarrier.description,
      specs: [
        { label: 'Motor Drive', value: '24V / Brushless BLDC' },
        { label: 'Duty Cycle', value: '100% Continuous' },
        { label: 'Opening Time', value: '1.5s – 4.0s' },
        { label: 'Boom Span', value: 'Up to 8.0m Beam' },
        { label: 'Ingress Rating', value: 'IP56 / Weatherproof' },
        { label: 'Tested MCBF', value: '5,000,000 Cycles' },
      ],
      integrations: ['FASTag RFID', 'ANPR Cameras', 'Loop Detectors', 'Biometrics', 'Safety Photocells', 'Remote Control'],
      tagBadge: 'Continuous Duty Series'
    },
    {
      id: 'crash-bollard',
      category: 'Automatic Bollards' as ProductCategory,
      tabTitle: 'Crash Bollards',
      categoryName: 'Access Automation',
      subcategoryName: 'High-Security Automatic Bollards',
      categorySlug: 'high-security-automatic-bollards' as AccessAutomationCategory,
      type: 'access-automation',
      icon: Shield,
      product: crashBollard,
      badge: 'Hostile Vehicle Mitigation',
      headline: crashBollard.name,
      tagline: crashBollard.tagline,
      desc: crashBollard.description,
      specs: [
        { label: 'Crash Ratings', value: 'ASTM M50 / K12 / PAS 68' },
        { label: 'Drive Mechanism', value: 'Electro-Hydraulic Built-In' },
        { label: 'Rise Speed', value: '2.5s (EFO: 1.2s)' },
        { label: 'Impact Resistance', value: '1,852 kJ Dissipation' },
        { label: 'Cylinder Height', value: '800mm – 1200mm' },
        { label: 'Visibility', value: '360° High-Intensity LED Ring' },
      ],
      integrations: ['Perimeter Access Control', 'Traffic Signal Lights', 'Fire Alarm Override', 'Emergency Push Button'],
      tagBadge: 'ASTM M50 Certified'
    },
    {
      id: 'road-blocker',
      category: 'Road Blockers' as ProductCategory,
      tabTitle: 'Road Blockers',
      categoryName: 'Access Control',
      subcategoryName: 'Vehicle Access Barriers',
      categorySlug: 'vehicle-access' as AccessControlSubcategory,
      type: 'access-control',
      icon: AlertOctagon,
      product: roadBlocker,
      badge: 'Perimeter Wedge Defense',
      headline: roadBlocker.name,
      tagline: roadBlocker.tagline,
      desc: roadBlocker.description,
      specs: [
        { label: 'Blocker Width', value: '2.0m – 5.0m Spans' },
        { label: 'Blocking Height', value: '600mm – 1000mm' },
        { label: 'Axle Load', value: 'Up to 60 Tonnes' },
        { label: 'Operating Speed', value: '2.0s – 3.5s' },
        { label: 'Drive Unit', value: 'External Hydraulic Power Pack' },
        { label: 'Chassis Finish', value: 'Hot-Dip Galvanized & Epoxy' },
      ],
      integrations: ['Spike Interlocks', 'Toll Booth Command', 'Dual Safety Loops', 'Customs ICEGATE'],
      tagBadge: 'Heavy Duty 60T Series'
    },
    {
      id: 'turnstiles',
      category: 'Pedestrian Access' as ProductCategory,
      tabTitle: 'Speed Lanes & Turnstiles',
      categoryName: 'Access Control',
      subcategoryName: 'Pedestrian Gates & Turnstiles',
      categorySlug: 'pedestrian-gates' as AccessControlSubcategory,
      type: 'access-control',
      icon: Users,
      product: turnstile,
      badge: 'Pedestrian Flow & Access',
      headline: turnstile.name,
      tagline: turnstile.tagline,
      desc: turnstile.description,
      specs: [
        { label: 'Throughput', value: '45–60 Persons/Min' },
        { label: 'Lane Width', value: '600mm – 900mm (ADA)' },
        { label: 'Drive System', value: 'Silent BLDC Servo Wing' },
        { label: 'Chassis Material', value: 'SUS304 Stainless Steel' },
        { label: 'Sensor Grid', value: '24–36 IR Safety Beams' },
        { label: 'Cycle MTBF', value: '5,000,000+ Cycles' },
      ],
      integrations: ['Face Recognition', 'RFID Cards', 'QR / Barcode Readers', 'Fire Alarm Auto-Open'],
      tagBadge: 'Optical Lobby Series'
    },
    {
      id: 'parking-system',
      category: 'Parking Systems' as ProductCategory,
      tabTitle: 'Smart Parking Systems',
      categoryName: 'Smart Parking Solutions',
      subcategoryName: 'Parking Management (PMS)',
      categorySlug: 'management' as ParkingSolutionsSubcategory,
      type: 'parking-solutions',
      icon: Car,
      product: parkingSystem,
      badge: 'Unattended Parking Automation',
      headline: parkingSystem.name,
      tagline: parkingSystem.tagline,
      desc: parkingSystem.description,
      specs: [
        { label: 'Payment Modes', value: 'UPI Dynamic QR, FASTag, Card, Cash' },
        { label: 'Kiosk Display', value: '15" Industrial Sunlight Touch' },
        { label: 'Transaction Speed', value: '<1.8 Seconds Per Car' },
        { label: 'Gate Interlock', value: 'FAAC Rapid Barrier 1.2s' },
        { label: 'Auditing', value: 'Janus Cloud 100% Zero-Leakage' },
        { label: 'UPS Backup', value: '2-Hour Integrated Battery' },
      ],
      integrations: ['NPCI FASTag', 'ANPR Cameras', 'Janus Cloud Telemetry', 'Thermal Ticket Dispensers'],
      tagBadge: 'Turnkey PMS Series'
    }
  ];

  const currentItem = flagshipItems[activeTab] || flagshipItems[0];
  const IconComponent = currentItem.icon;

  const handleNavigateToItemCategory = () => {
    if (currentItem.type === 'access-automation' && onNavigateToAccessCategory) {
      onNavigateToAccessCategory(currentItem.categorySlug as AccessAutomationCategory);
    } else if (currentItem.type === 'access-control' && onNavigateToAccessControl) {
      onNavigateToAccessControl(currentItem.categorySlug as AccessControlSubcategory);
    } else if (currentItem.type === 'parking-solutions' && onNavigateToParkingSolutions) {
      onNavigateToParkingSolutions(currentItem.categorySlug as ParkingSolutionsSubcategory);
    } else {
      onNavigateToProducts(currentItem.category);
    }
  };

  return (
    <section id="featured-products-section" className="py-16 sm:py-20 bg-white border-t-2 border-slate-200/90 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-400/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header: Nxerai inspired eyebrow & typography */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 text-sky-700 text-xs font-mono uppercase tracking-widest shadow-2xs">
            <span className="pulsing-halo"></span>
            <span>FLAGSHIP HARDWARE SHOWCASE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d37] tracking-tight leading-tight">
            Flagship Hardware Deployments
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Continuous-duty physical security mechanisms engineered and manufactured at our Noida Sector-59 facility. Select a category below for instant specifications.
          </p>
          <div className="flex justify-center pt-1">
            <div className="flex h-[2.5px] w-16 rounded-full overflow-hidden">
              <div className="w-[60%] bg-[#1D438A]" />
              <div className="w-[40%] bg-[#D7282F]" />
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs: Elevated Glass Pill Container */}
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap p-1.5 bg-slate-100/90 backdrop-blur-md rounded-2xl border border-slate-200/80 gap-1.5 max-w-full justify-center shadow-inner">
            {flagshipItems.map((item, idx) => {
              const TabIcon = item.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1D438A] text-white shadow-md shadow-blue-900/20'
                      : 'text-slate-600 hover:text-[#1D438A] hover:bg-white/80'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#00A8E8]' : 'text-slate-400'}`} />
                  <span>{item.tabTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Elevated Interactive Flagship Showcase Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xl shadow-slate-200/50 transition-all duration-300 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left: Product Media Preview in High-Tech Obsidian Studio */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-slate-900 via-[#071526] to-slate-950 text-white relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
              {/* Ambient radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00A8E8]/15 rounded-full blur-3xl pointer-events-none" />
              
              {/* Corner HUD brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00A8E8]/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00A8E8]/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00A8E8]/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00A8E8]/40 pointer-events-none" />

              <div 
                onClick={() => {
                  if (currentItem.product.accessCategory && onNavigateToProductPage) {
                    onNavigateToProductPage(currentItem.product.id);
                  } else {
                    onSelectProduct(currentItem.product);
                  }
                }}
                className="relative rounded-2xl overflow-hidden bg-slate-900/60 border border-white/10 h-72 sm:h-84 flex items-center justify-center p-5 group cursor-pointer"
              >
                <img
                  src={currentItem.product.image}
                  alt={currentItem.product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                />
                
                {/* Live tag badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[#00A8E8] border border-[#00A8E8]/30 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] animate-pulse" />
                  {currentItem.tagBadge}
                </div>
                
                {/* Model Code */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-slate-300 border border-white/10 text-[10px] font-mono font-bold">
                  MODEL: {currentItem.product.modelCode}
                </div>
              </div>

              {/* Supported Integrations Under Image */}
              <div className="pt-5 space-y-2 relative z-10">
                <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>Native Interfaces & Integrations:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {currentItem.integrations.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px] font-medium hover:border-[#00A8E8]/40 transition-colors">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Details & Specifications */}
            <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden bg-white">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A8E8]">
                  <IconComponent className="w-4 h-4 text-[#D7282F]" />
                  <span>{currentItem.badge}</span>
                </div>

                {/* Category Breadcrumb Link for clarity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNavigateToItemCategory}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 text-xs font-semibold text-[#1D438A] hover:text-[#00A8E8] transition-colors cursor-pointer border border-slate-200/60"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-[#00A8E8]" />
                    <span>Category: <strong>{currentItem.categoryName}</strong> &gt; {currentItem.subcategoryName}</span>
                  </button>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a1d37] leading-snug">
                    {currentItem.headline}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#1D438A] mt-1.5">
                    {currentItem.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                    {currentItem.desc}
                  </p>
                </div>

                {/* 6 High-Density Technical Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {currentItem.specs.map((spec) => (
                    <div key={spec.label} className="p-3 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-sky-400/40 transition-all shadow-2xs hover:shadow-xs group/spec">
                      <div className="text-[11px] text-slate-500 font-medium group-hover/spec:text-sky-600 transition-colors">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-[#0a1d37] mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Action Buttons Linking to Product & Category */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-3 relative z-10">
                <button
                  onClick={() => {
                    if (onNavigateToProductPage) {
                      onNavigateToProductPage(currentItem.product.id);
                    } else {
                      onSelectProduct(currentItem.product);
                    }
                  }}
                  className="px-5 py-3 rounded-xl border-2 border-[#1D438A] text-[#1D438A] hover:bg-[#1D438A] hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span>View Dedicated Product Specs</span>
                  <ChevronRight className="w-4 h-4 text-[#D7282F]" />
                </button>

                <button
                  onClick={handleNavigateToItemCategory}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200/80 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore {currentItem.subcategoryName}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => onOpenQuoteModal(currentItem.headline)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D7282F] to-[#b81d23] hover:from-[#b81d23] hover:to-[#96171c] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-red-500/20 hover:shadow-red-500/35 cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
