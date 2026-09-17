import React, { useState, useEffect } from 'react';
import { 
  Car, 
  CreditCard, 
  Camera, 
  Activity, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  FileText, 
  SlidersHorizontal, 
  ChevronDown, 
  Building2, 
  Cpu, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
  Check,
  Eye
} from 'lucide-react';
import { Product, ParkingSolutionsSubcategory } from '../types';
import { PARKING_SOLUTIONS_PRODUCTS } from '../data/parkingSolutionsProducts';

interface ParkingSolutionsHubProps {
  initialSubcategory?: ParkingSolutionsSubcategory;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (solutionName?: string) => void;
  onOpenDownloadModal?: (resourceTitle: string, product: Product) => void;
}

export const ParkingSolutionsHub: React.FC<ParkingSolutionsHubProps> = ({
  initialSubcategory = 'all',
  onSelectProduct,
  onRequestQuote,
  onOpenDownloadModal
}) => {
  const [activeTab, setActiveTab] = useState<ParkingSolutionsSubcategory>(initialSubcategory);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (initialSubcategory) {
      setActiveTab(initialSubcategory);
    }
  }, [initialSubcategory]);

  const filteredProducts = activeTab === 'all'
    ? PARKING_SOLUTIONS_PRODUCTS
    : PARKING_SOLUTIONS_PRODUCTS.filter(p => p.subCategory === activeTab);

  const subcategoryMeta = {
    all: {
      title: 'Smart Parking Solutions & Mobility Automation',
      badge: 'Integrated Parking Ecosystem',
      tagline: 'Ticketless FASTag auto-debit, AI ANPR neural engines, ultrasonic guidance, and space counting.',
      desc: 'Neptune India engineers turnkey smart parking management systems for mega shopping malls, international airport terminals, Grade-A IT commercial hubs, and multi-level parking structures (MLCP).'
    },
    management: {
      title: 'Parking Management Solutions (PMS)',
      badge: 'Revenue Protection & Unattended Kiosks',
      tagline: 'End-to-end hardware and cloud audit software automating entry ticketing, payments, and boom barrier release.',
      desc: 'Eliminate revenue leakage, speed up vehicle processing to < 1.5 seconds, and deliver frictionless parking with fully automatic pay stations, FASTag auto-debit, and Janus enterprise auditing.'
    },
    guidance: {
      title: 'Parking Guidance Solutions (PGS)',
      badge: 'Real-Time Bay Wayfinding',
      tagline: 'Ceiling-mounted ultrasonic indicators and multi-space AI video sensors cutting search times by 50%.',
      desc: 'Eliminate basement search frustration. Direct drivers directly to vacant bays using dynamic Variable Message Signs, multi-color LED bay lamps, and interactive Find-My-Car kiosks.'
    },
    counting: {
      title: 'Parking Counting Solutions',
      badge: 'Zone & Floor Occupancy Telemetry',
      tagline: 'High-accuracy inductive loop sensing, ramp vehicle counting controllers, and master aggregating nodes.',
      desc: 'Monitor incoming and outgoing vehicles across parking ramps and floors in real time, broadcasting live space availability to outdoor LED totems and city smart parking dashboards.'
    },
    'vehicular-access': {
      title: 'Vehicular Access Control Solutions',
      badge: 'Seamless Drive-Through Access',
      tagline: 'License plate recognition, FASTag physical access, and long-range RFID gate automation.',
      desc: 'Touchless vehicular access solutions that identify registered staff, residents, and VIP visitors on approach, automatically triggering high-speed barriers for continuous traffic flow.'
    }
  };

  const currentMeta = subcategoryMeta[activeTab] || subcategoryMeta.all;

  const faqs = [
    {
      q: 'How does Neptune FASTag parking integrate with banks?',
      a: 'Neptune is certified by NPCI for the NETC FASTag program. Our lane controllers integrate directly with acquiring bank host switches (including ICICI, Axis, HDFC, SBI), deducting parking fees automatically from the customer FASTag wallet.'
    },
    {
      q: 'What is the operational difference between Ultrasonic PGS and Camera PGS?',
      a: 'Ultrasonic PGS uses an individual acoustic transceiver above every parking bay to detect height changes and toggle a red/green LED. Camera Sensor PGS monitors 2 to 6 parking spaces simultaneously with a single camera, reading license plates for interactive Find-My-Car search.'
    },
    {
      q: 'How does the Parking Counting System prevent false counts from reversing cars on ramps?',
      a: 'The Neptune Vehicle Counting Controller utilizes sequential A-B directional logic across two embedded ground loops. A count is committed only when a vehicle fully traverses Loop A then Loop B. If a car enters Loop A and backs out, no count is registered.'
    },
    {
      q: 'Can the parking management system operate during internet outages?',
      a: 'Yes. All Neptune lane controllers run local database engines with pre-loaded whitelist tables and offline transaction storage. Lanes operate normally; once network connectivity is restored, all data automatically syncs to the Janus cloud server.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pb-16">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Solutions",
                "item": `${window.location.origin}/solutions`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": currentMeta.title,
                "item": window.location.href
              }
            ]
          })
        }}
      />

      {/* 1. Sticky Navigation & Subcategory Selector Bar (Same Theme as /products) */}
      <div className="sticky top-[58px] md:top-[86px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Subcategory Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Parking Solutions', count: PARKING_SOLUTIONS_PRODUCTS.length },
                { id: 'management', label: '1. Parking Management (PMS)', count: PARKING_SOLUTIONS_PRODUCTS.filter(p => p.subCategory === 'management').length },
                { id: 'guidance', label: '2. Parking Guidance (PGS)', count: PARKING_SOLUTIONS_PRODUCTS.filter(p => p.subCategory === 'guidance').length },
                { id: 'counting', label: '3. Parking Counting', count: PARKING_SOLUTIONS_PRODUCTS.filter(p => p.subCategory === 'counting').length },
                { id: 'vehicular-access', label: '4. Vehicular Access', count: PARKING_SOLUTIONS_PRODUCTS.filter(p => p.subCategory === 'vehicular-access').length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ParkingSolutionsSubcategory)}
                  className={`px-3.5 py-2 rounded-xs text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[#1D438A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Consultation Trigger */}
            <div className="shrink-0 hidden sm:block">
              <button
                onClick={() => onRequestQuote(`Smart Parking: ${currentMeta.title}`)}
                className="px-4 py-2 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Parking Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Subcategory Overview Banner */}
      <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
                <Car className="w-3.5 h-3.5 text-[#00a8e8]" />
                <span>{currentMeta.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37] tracking-tight">
                {currentMeta.title}
              </h2>
              <p className="text-sm sm:text-base text-[#1D438A] font-semibold">
                {currentMeta.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentMeta.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onRequestQuote(`Smart Parking: ${currentMeta.title}`)}
                className="px-5 py-2.5 rounded-xs bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>Request System Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table for Parking Management Solutions */}
      {(activeTab === 'all' || activeTab === 'management') && (
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D438A] uppercase tracking-wider mb-1">
                <SlidersHorizontal className="w-4 h-4 text-[#00a8e8]" />
                <span>Architecture Comparison</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Parking Management Technology Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Compare entry credentials, payment workflows, and automation levels across Neptune PMS systems.
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-50 text-[#0a1d37] border-b border-slate-200 font-bold">
                    <th className="p-3.5">Solution</th>
                    <th className="p-3.5">Primary Credential</th>
                    <th className="p-3.5">Entry Speed</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Automation Level</th>
                    <th className="p-3.5">Best Suited For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-[#1D438A]">FASTag-Based PMS</td>
                    <td className="p-3.5">Windshield FASTag RFID Tag</td>
                    <td className="p-3.5 font-bold text-emerald-700">&lt; 1.5s (Non-Stop)</td>
                    <td className="p-3.5">Instant Bank NETC Auto-Debit</td>
                    <td className="p-3.5 font-semibold text-slate-900">100% Unattended</td>
                    <td className="p-3.5 text-slate-600">Malls, Airports, High-Volume Garages</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                    <td className="p-3.5 font-bold text-[#1D438A]">ANPR-Based PMS</td>
                    <td className="p-3.5">Optical Vehicle License Plate</td>
                    <td className="p-3.5 font-bold text-emerald-700">&lt; 1.0s (Drive-Through)</td>
                    <td className="p-3.5">App Auto-Debit / Kiosk UPI QR</td>
                    <td className="p-3.5 font-semibold text-slate-900">Ticketless Automated</td>
                    <td className="p-3.5 text-slate-600">Corporate Parks, Luxury Hotels, VIP Basements</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-[#1D438A]">Fully Automatic PMS</td>
                    <td className="p-3.5">Barcode / QR Paper Ticket</td>
                    <td className="p-3.5 text-slate-600">&lt; 1.8s (Dispense)</td>
                    <td className="p-3.5">Auto Pay Stations (Cash/Card/UPI)</td>
                    <td className="p-3.5 font-semibold text-slate-900">Unattended Pay Kiosks</td>
                    <td className="p-3.5 text-slate-600">Commercial Towers, Hospitals, Train Stations</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                    <td className="p-3.5 font-bold text-[#1D438A]">Janus Central Software</td>
                    <td className="p-3.5">Multi-Site Central Platform</td>
                    <td className="p-3.5 text-slate-600">Cloud Real-Time</td>
                    <td className="p-3.5">Central Financial Reconciliation</td>
                    <td className="p-3.5 font-semibold text-slate-900">Cloud Audit & Analytics</td>
                    <td className="p-3.5 text-slate-600">REIT Portfolios, Multi-City Operators</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Comparison for Parking Guidance Solutions */}
      {activeTab === 'guidance' && (
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37] mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#1D438A]" />
              Technology Comparison: Ultrasonic PGS vs AI Camera PGS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-xs">
                <div className="text-xs font-bold text-[#1D438A] uppercase tracking-wider mb-1">Acoustic Technology</div>
                <h3 className="text-lg font-bold text-[#0a1d37] mb-2">Ultrasonic Sensor-Based PGS</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Uses dual ultrasonic acoustic transceivers mounted directly over each individual bay. Measures floor distance changes to toggle high-brightness RGB status indicators.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-200 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 1 sensor per parking bay</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Ultra-low energy consumption (&lt; 0.5W)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Most cost-effective capital investment</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Simple daisy-chain RS-485 bus wiring</li>
                </ul>
              </div>

              <div className="bg-blue-50/40 border border-blue-200 p-6 rounded-xl shadow-xs relative overflow-hidden">
                <div className="text-xs font-bold text-[#1D438A] uppercase tracking-wider mb-1">Neural Vision Technology</div>
                <h3 className="text-lg font-bold text-[#0a1d37] mb-2">Camera Sensor-Based PGS (Video AI)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  High-definition multi-lens cameras monitor up to 6 parking spaces across the aisle, reading each vehicle's license plate and enabling touch-kiosk Find-My-Car search.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 border-t border-blue-200 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1D438A] shrink-0" /> 1 camera covers up to 6 parking bays</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1D438A] shrink-0" /> Interactive Find-My-Car touchscreen search</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1D438A] shrink-0" /> 24/7 video security surveillance of parked cars</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1D438A] shrink-0" /> Single Cat6 PoE cable deployment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Parking Counting Section with Exact Verified Images */}
      {activeTab === 'counting' && (
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D438A] uppercase tracking-wider mb-1">
                <BarChart3 className="w-4 h-4 text-[#00a8e8]" />
                <span>Ramp & Floor Telemetry</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Advanced Parking Counting System Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                Neptune Automatic introduces an advanced Parking Counting System designed to transform parking operations with real-time data, seamless vehicle tracking, and efficient space utilization. Powered by three verified hardware components:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="h-44 bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center p-3 border border-slate-200">
                  <img
                    src="https://www.neptuneautomatic.com/wp-content/uploads/Untitled-design-4.png"
                    alt="Loop Detector in Parking Counting System"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider mb-1">Component 1: Detection</div>
                <h3 className="font-bold text-[#0a1d37] text-base mb-1">Loop Detector in Parking Counting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The loop detector detects a vehicle when it passes over the embedded pavement loop and transmits a clean, microsecond trigger pulse.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="h-44 bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center p-3 border border-slate-200">
                  <img
                    src="https://neptuneautomatic.com/wp-content/uploads/Untitled-design-3.jpg"
                    alt="Master Controller in Parking Counting Systems"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider mb-1">Component 2: Central Aggregation</div>
                <h3 className="font-bold text-[#0a1d37] text-base mb-1">Master Controller in Parking Counting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Centralized control for data collection, system integration & real-time decision-making across all garage floors and outdoor LED signs.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="h-44 bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center p-3 border border-slate-200">
                  <img
                    src="https://www.neptuneautomatic.com/wp-content/uploads/Untitled-design-13.png"
                    alt="Vehicle Counting Controller in Parking Counting Systems"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider mb-1">Component 3: Ramp Processing</div>
                <h3 className="font-bold text-[#0a1d37] text-base mb-1">Vehicle Counting Controller</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Counts vehicles on specific ramps to monitor space availability in real time with directional anti-reversal logic and onboard LED display.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solutions / Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a1d37] tracking-tight">
              Certified Hardware & Solutions Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Showing {filteredProducts.length} certified systems and components.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#1D438A] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Sector-59 Noida Certified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 hover:border-[#1D438A]/60 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container */}
              <div>
                <div className="relative h-56 bg-slate-100 flex items-center justify-center p-4 overflow-hidden border-b border-slate-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-sm bg-[#1D438A] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                      {product.modelCode}
                    </span>
                    {product.isFlagship && (
                      <span className="px-2 py-0.5 rounded-sm bg-[#D7282F] text-white text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                        Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8] mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-base font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Specs / ROI Matrix */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1.5">
                    {product.specs.slice(0, 3).map((spec, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{spec.label}</span>
                        <span className="text-slate-900 font-bold font-mono text-[11px]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Applications */}
                  <div className="flex flex-wrap gap-1">
                    {product.applications.slice(0, 2).map((app, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/60">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="p-4 pt-0 border-t border-slate-100 flex items-center gap-2 mt-2">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="flex-1 py-2 px-3 bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => onRequestQuote(product.name)}
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xs transition-colors border border-slate-200 cursor-pointer"
                >
                  Quote
                </button>
                {onOpenDownloadModal && (
                  <button
                    onClick={() => onOpenDownloadModal(`${product.name} Specification`, product)}
                    title="Download Technical Datasheet"
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#1D438A] border border-slate-200 rounded-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section - Light Theme */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Parking Solutions Engineering FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Technical answers regarding NETC FASTag protocols, ultrasonic sensor topologies, and revenue audit software.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base font-bold text-[#0a1d37] hover:text-[#1D438A] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#1D438A] transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="py-12 bg-gradient-to-br from-[#0a1d37] via-[#143156] to-[#0a1d37] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Optimize Your Facility Parking Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Schedule an on-site audit with our Noida engineering team for lane geometry layout, FASTag integration, and revenue projection modeling.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onRequestQuote('Turnkey Parking Management System')}
              className="px-5 py-2.5 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Request Engineering Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
