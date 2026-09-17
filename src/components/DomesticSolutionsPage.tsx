import React, { useState } from 'react';
import { 
  Home, 
  ShieldCheck, 
  Car, 
  Key, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Download, 
  Lock, 
  Cpu, 
  Layers, 
  Sparkles, 
  Radio, 
  Camera, 
  SlidersHorizontal, 
  FileText, 
  Building2, 
  Zap,
  Clock,
  Shield,
  Award,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Product } from '../types';

interface DomesticSolutionsPageProps {
  onOpenQuoteModal: (subject?: string) => void;
  onNavigateToProduct?: (productId: string) => void;
  onNavigateToCategory?: (category: string) => void;
}

interface DomesticSolutionCard {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  productsUsed: string[];
  keySpecs: { label: string; value: string }[];
  benefits: string[];
}

const DOMESTIC_SOLUTIONS: DomesticSolutionCard[] = [
  {
    id: 'villa-swing-gates',
    title: 'Luxury Villa & Bungalow Swing Gate Automation',
    badge: 'Whisper-Quiet 24V DC',
    tagline: 'Silent electro-mechanical linear actuators and hydraulic rams engineered for private residential estates.',
    description: 'Designed specifically for private homes and luxury villas where aesthetic elegance and near-silent operation are paramount. Operates seamlessly via compact RF key fobs, interior touch panels, and smartphone automation apps without altering architectural gate aesthetics.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    productsUsed: ['FAAC S418 24V Linear Drive', 'FAAC 390 Articulated Arm', 'Neptune SafeBeam IR Photocells', 'Neptune XT4 433 MHz RF Key Fob'],
    keySpecs: [
      { label: 'Acoustic Sound Level', value: '< 45 dB (Whisper Silent)' },
      { label: 'Leaf Width Capacity', value: 'Up to 3.5m Per Leaf' },
      { label: 'Operating Voltage', value: '24V DC Safe Low-Voltage' },
      { label: 'Emergency Override', value: 'Keyed Manual Release + Battery Backup' }
    ],
    benefits: [
      'Zero disturbance to residents or neighbors during late-night arrivals',
      'Child-safe obstacle detection: instantly reverses upon detecting cars or pets',
      'Discreet hidden or post-mounted brackets preserving gate aesthetics'
    ]
  },
  {
    id: 'society-sliding-gates',
    title: 'Township & Gated Community Heavy Sliding Gates',
    badge: 'Heavy-Duty 2,000 kg Capacity',
    tagline: 'High-torque rack-and-pinion sliding operators built for wide main entrances and heavy ornamental steel gates.',
    description: 'Commercial-grade durability engineered into residential perimeter entrances. Engineered to effortlessly glide heavy iron, wooden, or composite architectural gates weighing up to 2,000 kg with soft start and gradual deceleration to eliminate structural vibration.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    productsUsed: ['FAAC C720 / C740 High-Speed Sliding Motors', 'FAAC 746 Heavy-Duty Industrial Sliding Operator', 'Heavy Galvanized Steel Gear Rack M4', 'Neptune Dual Safety Edge Sensor'],
    keySpecs: [
      { label: 'Gate Weight Rating', value: '400 kg to 2,000 kg' },
      { label: 'Speed Adjustment', value: 'Up to 18 m/min High-Speed' },
      { label: 'Duty Cycle Rating', value: '100% Continuous Township Traffic' },
      { label: 'Anti-Crush Tech', value: 'Virtual Optical Encoder Obstacle Sensing' }
    ],
    benefits: [
      'Smooth, vibration-free travel eliminates gate chatter and rail wear',
      'Electronic brake locks gate securely in closed position against forced intrusion',
      'Magnetic end-limit switches immune to dirt, dust, and rain'
    ]
  },
  {
    id: 'residential-boom-barriers',
    title: 'Housing Society Automatic Boom Barriers',
    badge: 'Rush-Hour Rush-Proof',
    tagline: 'High-speed brushless DC barriers engineered for relentless peak-hour morning and evening society commutes.',
    description: 'The frontline security asset for gated housing societies and condominium high-rises. Equipped with high-torque brushless DC motors capable of 1.8-second rapid opening to eliminate entry bottlenecks, coupled with impact-dampening soft rubber edges and dual safety loops to protect children and vehicles.',
    image: 'https://www.neptuneautomatic.com/wp-content/uploads/faac-b614-barrier-768x576.png',
    productsUsed: ['Neptune Power Fusion XD Barrier', 'FAAC B614 Rapid Automatic Barrier', 'Neptune Safety Photocell Set', 'Dual-Channel Inductive Loop Detector'],
    keySpecs: [
      { label: 'Cycle Open Time', value: '1.8s to 3.0s Adjustable' },
      { label: 'Mechanism Life (MTBF)', value: '10,000,000 Continuous Cycles' },
      { label: 'Impact Protection', value: 'Soft Neoprene Rubber Lower Buffer' },
      { label: 'Arm Length Flexibility', value: '3m to 6m Telescopic Aluminum Boom' }
    ],
    benefits: [
      'Eliminates long tailback queues onto municipal roads during 8–10 AM rush hour',
      'Dual safety interlocks prevent arm lowering if child, pedestrian, or pet is in lane',
      'Integrated bright dual-color LED arm strips switch Green/Red with barrier status'
    ]
  },
  {
    id: 'touchless-rfid-fastag',
    title: 'Touchless Resident UHF RFID & FASTag Ingress',
    badge: '100% Hands-Free Drive-Through',
    tagline: 'Long-range windshield identification opening gates automatically as authorized residents approach.',
    description: 'Transform daily society entry into a premium contactless experience. Encrypted UHF windshield tags or registered vehicle FASTags are read by Neptune overhead antenna readers from 6 to 10 meters away, raising the boom barrier automatically before the vehicle even comes to a stop.',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80',
    productsUsed: ['Neptune LR_RF-01 Long Range UHF Reader', 'Neptune Windshield RFID Tamper-Proof Tags', 'Neptune FASTag Multi-Lane Controller', 'Neptune Dual TCP/IP Access Board'],
    keySpecs: [
      { label: 'Detection Distance', value: '6m to 12m Configurable Range' },
      { label: 'Operating Frequency', value: '865 – 868 MHz (India Standard)' },
      { label: 'Authentication Speed', value: '< 200 Milliseconds' },
      { label: 'Tag Security', value: 'Anti-Tear Destructive Adhesive Backing' }
    ],
    benefits: [
      'Residents drive straight through without rolling down windows in rain or extreme heat',
      'Completely eliminates unauthorized vehicle piggybacking and visitor confusion',
      'Instant cloud logging of vehicle entry/exit timestamps for RWA audit records'
    ]
  },
  {
    id: 'video-door-guardhouse',
    title: 'Smart Guardhouse Kiosks & Video Door Entry',
    badge: 'Mobile App Intercom',
    tagline: 'Two-way video communication and digital QR pass validation between security guards and apartment owners.',
    description: 'Bridges resident security with modern guardhouse efficiency. Visitors verify their destination at the society gate, sending a high-definition two-way video prompt directly to the resident’s mobile smartphone or indoor screen. Residents grant gate access with a single tap.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=80',
    productsUsed: ['Neptune Smart Guard Tablet Console', 'Neptune 1080p SIP Video Door Entry Unit', 'Neptune QR Code Scanner Module', 'Neptune Cloud Visitor Platform'],
    keySpecs: [
      { label: 'Camera Quality', value: '1080p Full HD Wide-Angle Night Vision' },
      { label: 'Audio Intercom', value: 'Full-Duplex Noise-Cancelling SIP Audio' },
      { label: 'Integration', value: 'MyGate, NoBrokerHood, Adda Compatible' },
      { label: 'Visitor Pass', value: 'Encrypted One-Time Dynamic QR Code' }
    ],
    benefits: [
      'Eliminates intercom wiring failures across multi-tower residential societies',
      'Residents can pre-approve guests, delivery drivers, and home help via temporary QR',
      'Complete digital photographic audit trail of all external visitors entering campus'
    ]
  },
  {
    id: 'clubhouse-turnstiles',
    title: 'Clubhouse, Gym & Swimming Pool Speed Gates',
    badge: 'Resident Amenity Access',
    tagline: 'Aesthetic optical flap barriers restricting residential amenities strictly to verified society members.',
    description: 'Keep luxury clubhouses, gyms, and swimming pools private and safe. Neptune AeroPass optical speed gates and slim stainless turnstiles authenticate verified residents via RFID resident cards, mobile NFC, or rapid face recognition, preventing non-resident trespassing and overcrowding.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
    productsUsed: ['Neptune AeroPass-01 Optical Speed Gate', 'Neptune TT-01 Stainless Steel Tripod Turnstile', 'Neptune SR_RF-1 Smart Card Reader', 'Neptune Biometric Face Terminal'],
    keySpecs: [
      { label: 'Throughput Speed', value: '35 to 45 Persons Per Minute' },
      { label: 'Chassis Material', value: 'SUS304 Stainless Steel (SUS316 Poolside)' },
      { label: 'Emergency Override', value: 'Automatic Free Passage on Fire Alarm' },
      { label: 'Safety Sensors', value: '6 Pairs Active Infrared Anti-Pinch Sensors' }
    ],
    benefits: [
      'Guarantees society amenities remain exclusive to fee-paying residents and guests',
      'Protects unattended swimming pools by ensuring unaccompanied toddlers cannot enter',
      'Sleek tempered glass and brushed steel elevates residential architecture aesthetics'
    ]
  }
];

const RESIDENTIAL_PROJECTS = [
  {
    name: 'DLF Privana & The Camellias',
    location: 'Golf Course Road, Gurugram',
    system: 'UHF RFID Vehicle Access, High-Speed Barriers & Swing Gate Automation',
    stats: '12 Lanes Automated • 2,400+ Residents'
  },
  {
    name: 'Godrej Palm Retreat',
    location: 'Sector 150, Noida',
    system: 'FASTag Society Ingress, B614 Barriers & Clubhouse Optical Speed Gates',
    stats: '8 Lanes Automated • 1,200+ Homes'
  },
  {
    name: 'ATS Greens & Pristine',
    location: 'Noida Expressway',
    system: 'Long-Range UHF Tags, Heavy Sliding Gate Automation & Guardhouse Kiosks',
    stats: '14 Lanes Automated • 3,100+ Residents'
  },
  {
    name: 'Jaypee Greens Golf Estate',
    location: 'Greater Noida',
    system: 'Perimeter Heavy Sliding Operators & S418 Luxury Villa Swing Drives',
    stats: '180+ Private Villa Gates Automated'
  }
];

export const DomesticSolutionsPage: React.FC<DomesticSolutionsPageProps> = ({
  onOpenQuoteModal,
  onNavigateToProduct,
  onNavigateToCategory
}) => {
  return (
    <div className="bg-white min-h-screen text-slate-900 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
              <span className="w-2 h-2 rounded-full bg-[#D7282F] animate-pulse" />
              <span className="tracking-wider uppercase">RESIDENTIAL & DOMESTIC ACCESS AUTOMATION</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d37] tracking-tight leading-[1.15]">
              Intelligent Security Automation for Gated Societies, Townships & Luxury Homes
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Neptune Automatic engineers whisper-quiet residential gate operators, rush-hour boom barriers, and hands-free UHF RFID ingress. Crafted to deliver effortless luxury for homeowners and absolute security for residential management committees.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal('Residential Society / Domestic Gate Survey')}
                className="px-6 py-3 rounded-lg bg-[#1D438A] hover:bg-[#153266] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Residential Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:08010807000"
                className="px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-[#1D438A] border border-blue-200 text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00a8e8]" />
                <span>Call Resident Desk: 080108 07000</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Trust Metrics Strip */}
      <section className="py-8 bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#1D438A]">5,000+</div>
              <div className="text-xs text-slate-500 font-medium">Residential Societies Secured Across India</div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#00a8e8]">100%</div>
              <div className="text-xs text-slate-500 font-medium">Touchless Resident RFID & FASTag Ingress</div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#D7282F]">&lt; 45 dB</div>
              <div className="text-xs text-slate-500 font-medium">Whisper-Silent DC Actuators for Zero Disturbance</div>
            </div>
            <div className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">10M Cycles</div>
              <div className="text-xs text-slate-500 font-medium">MTBF Certified Continuous Township Duty</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Domestic Solutions Pillars Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1D438A]">
            <Home className="w-4 h-4 text-[#00a8e8]" />
            <span>Turnkey Residential Systems</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            6 Specialized Domestic Access Pillars
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered to address the unique challenges of residential communities: child safety, zero acoustic disturbance, rapid rush-hour throughput, and visitor control.
          </p>
        </div>

        {/* 6 Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOMESTIC_SOLUTIONS.map((sol) => (
            <div 
              key={sol.id}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                  <img 
                    src={sol.image} 
                    alt={sol.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1D438A] text-[11px] font-bold shadow-xs">
                    {sol.badge}
                  </span>
                </div>

                {/* Content Block */}
                <div className="p-5 space-y-3.5">
                  <h3 className="font-display text-lg font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug">
                    {sol.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Key Specs Highlights */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    {sol.keySpecs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">{spec.label}:</span>
                        <span className="font-bold text-slate-800">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Core Benefits */}
                  <div className="space-y-1.5 pt-1">
                    {sol.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <button
                  onClick={() => onOpenQuoteModal(`Domestic Solution: ${sol.title}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50/70 hover:bg-[#1D438A] text-[#1D438A] hover:text-white text-xs font-bold border border-blue-200/60 hover:border-[#1D438A] transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                >
                  <span>Configure for Society / Villa</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. Child-Safe & Acoustic Engineering Standard */}
      <section className="py-14 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>RESIDENTIAL SAFETY CERTIFIED</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a1d37] tracking-tight">
                Why Neptune Residential Automation is Safer for Families & Children
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Unlike uncertified commercial gates retrofitted into housing societies, Neptune domestic systems incorporate dedicated residential safeguards mandated by European EN 12453 safety norms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#00a8e8]" />
                    <span>Active Obstacle Auto-Reverse</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Gates and barrier arms reverse direction immediately upon making gentle contact with any obstacle.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#1D438A]" />
                    <span>Personal Key Emergency Override</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    A personalized physical key clutch disengages the motor instantly during extended power outages.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#D7282F]" />
                    <span>Dual Infrared Safety Curtains</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Low-level and high-level infrared beams prevent gates from closing on pets, strollers, or toddlers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Integrated 24V Battery Backup</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Maintains uninterrupted automated opening for over 100 continuous cycles during power grid cuts.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="font-display font-bold text-base text-[#0a1d37]">
                    Residential vs Standard Commercial Gate Motors
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#1D438A] font-bold">
                    Neptune Engineering
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Motor Acoustic Noise</span>
                    <span className="font-bold text-emerald-700">&lt; 45 dB (Near Silent) vs 70+ dB</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Motor Voltage Standard</span>
                    <span className="font-bold text-emerald-700">24V DC Safe vs 230V AC High Voltage</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Deceleration Dampening</span>
                    <span className="font-bold text-emerald-700">Electronic Soft-Stop Included</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Mobile Resident Integration</span>
                    <span className="font-bold text-emerald-700">Native App / FASTag / RFID</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuoteModal('Residential Society Consultation & Compliance Guide')}
                    className="w-full py-2.5 rounded-xl bg-[#1D438A] hover:bg-[#153266] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Download RWA & Society Procurement Guide</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Gated Community Project Landmarks */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1D438A]">
            <Building2 className="w-4 h-4 text-[#00a8e8]" />
            <span>Proven Deployments</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
            Trusted by India’s Premier Housing Societies & Developers
          </h2>
          <p className="text-slate-600 text-sm">
            Over 5,000 residential installations operating smoothly across Delhi NCR, Mumbai, Bengaluru, and tier-1 metro cities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESIDENTIAL_PROJECTS.map((proj, i) => (
            <div 
              key={i}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{proj.location}</span>
                <Award className="w-3.5 h-3.5 text-[#00a8e8]" />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-sm">
                {proj.name}
              </h3>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                {proj.system}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[10px] font-mono font-bold text-[#1D438A]">
                {proj.stats}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Direct Factory Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0a1d37] via-[#1D438A] to-[#0a1d37] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00a8e8]">
              Free Society Site Survey & CAD Proposal
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Ready to Upgrade Your Society’s Entrance Gates?
            </h3>
            <p className="text-slate-300 text-sm">
              Our residential automation engineers provide complimentary site inspections, lane throughput sizing, and custom wiring blueprints for your Management Committee (RWA).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenQuoteModal('Complimentary Society Site Survey')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Book Site Survey
            </button>
            <a
              href="tel:08010807000"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-colors text-center"
            >
              Call 080108 07000
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
