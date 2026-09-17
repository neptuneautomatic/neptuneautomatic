import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  FileText, 
  Phone, 
  ChevronRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Cpu, 
  Zap, 
  SlidersHorizontal,
  Building2,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Product, ParkingSolutionsSubcategory } from '../types';
import { PARKING_SOLUTIONS_PRODUCTS } from '../data/parkingSolutionsProducts';

interface ParkingSubcategoryPageProps {
  subcategory: ParkingSolutionsSubcategory;
  onNavigateHome: () => void;
  onNavigateToSolutionsHub: () => void;
  onSelectSubcategory: (subcat: ParkingSolutionsSubcategory) => void;
  onSelectProduct: (product: Product) => void;
  onOpenQuoteModal: (subject?: string) => void;
  onOpenDownloadModal?: (resourceTitle: string, product: Product) => void;
}

interface SubcategoryDetail {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  heroImage: string;
  roiStats: { label: string; value: string; desc: string }[];
  architectureSteps: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const SUBCATEGORY_DETAILS: Record<Exclude<ParkingSolutionsSubcategory, 'all'>, SubcategoryDetail> = {
  management: {
    title: 'Parking Management Solutions (PMS)',
    badge: 'Turnkey Revenue & Ingress Automation',
    tagline: 'Ticketless FASTag auto-debit, unattended pay kiosks (APS), and cloud audit analytics.',
    description: 'Neptune Parking Management Systems provide end-to-end automation for commercial parking facilities. Combining high-speed BLDC barrier gates, multi-modal payment kiosks (UPI QR, cards, cash), and centralized audit software, our PMS eliminates 100% of cash leakage and accelerates entry/exit throughput to under 2 seconds per vehicle.',
    heroImage: 'https://www.neptuneautomatic.com/wp-content/uploads/Untitled-design-44.png',
    roiStats: [
      { label: 'Revenue Leakage', value: '0%', desc: 'Completely eliminates manual cash skimming and fraudulent ticket re-use' },
      { label: 'Gate Clearance', value: '< 1.5s', desc: 'FASTag and high-speed BLDC barriers eliminate roadway tailbacks' },
      { label: 'Labor Optimization', value: '75%', desc: 'Replaces human cashier booths with 24/7 unattended pay kiosks' }
    ],
    architectureSteps: [
      { step: 1, title: 'Approach & Recognition', desc: 'Overhead 12dBi FASTag reader and 4MP ANPR camera verify approaching vehicle credentials in milliseconds.' },
      { step: 2, title: 'Instant Gate Clearance', desc: 'Neptune high-speed barrier lifts in 0.9s to 1.5s; inductive ground safety loops protect vehicle chassis.' },
      { step: 3, title: 'Central Cloud Logging', desc: 'Lane status, high-resolution snapshot, and vehicle timestamp stream to Janus Cloud Server in real time.' },
      { step: 4, title: 'Frictionless Settlement', desc: 'Direct automated FASTag bank auto-debit or multi-currency touchless payment at Unattended Pay Stations.' }
    ],
    faqs: [
      {
        q: 'How does Neptune FASTag parking integrate with national banking gateways?',
        a: 'Neptune is NPCI NETC certified. Our controller connects via secure VPN directly with acquirer bank host switches (including ICICI, Axis, HDFC, and SBI) to execute sub-second auto-debits.'
      },
      {
        q: 'Can the PMS operate during Internet disconnections or offline periods?',
        a: 'Yes. Neptune lane controllers store an offline local whitelist of up to 100,000 tags and buffered transactions. When connection restores, audit records synchronize automatically.'
      },
      {
        q: 'What happens if a driver does not have a FASTag or has insufficient wallet balance?',
        a: 'The lane controller automatically triggers the secondary workflow: the barcode ticket dispenser prints a QR credential, or the driver scans a dynamic UPI QR on the lane display.'
      }
    ]
  },
  guidance: {
    title: 'Parking Guidance Solutions (PGS)',
    badge: 'Ultrasonic & AI Optical Bay Wayfinding',
    tagline: 'Ultrasonic ceiling sensors, multi-space AI video monitors, and interactive Find-My-Car kiosks.',
    description: 'Eliminate customer circling and exhaust emissions inside multi-level parking garages. Neptune Parking Guidance Systems utilize high-precision acoustic sensors and multi-bay cameras to broadcast real-time bay vacancy to overhead dynamic LED directional displays.',
    heroImage: 'https://www.neptuneautomatic.com/wp-content/uploads/FASTag-Based-Parking-Management-System.png',
    roiStats: [
      { label: 'Search Time Reduction', value: '55%', desc: 'Drivers locate available spaces within minutes of entering the basement' },
      { label: 'Carbon Emissions', value: '-35%', desc: 'Dramatically reduced basement idling improves air quality & ventilation load' },
      { label: 'Occupancy Efficiency', value: '98%', desc: 'Eliminates hidden or neglected bays across complex multi-floor parking layouts' }
    ],
    architectureSteps: [
      { step: 1, title: 'Bay-Level Detection', desc: 'Ultrasonic sensors or 4-space AI video cameras detect vehicle presence above every single parking stall.' },
      { step: 2, title: 'Visual LED Notification', desc: 'Ultra-bright RGB LED indicators switch between Green (Vacant), Red (Occupied), and Blue (Disability ADA).' },
      { step: 3, title: 'Dynamic Wayfinding Totems', desc: 'Floor controllers calculate available slots and update overhead directional arrow totems dynamically.' },
      { step: 4, title: 'Find-My-Car Kiosks', desc: 'Drivers enter their license plate at lobby touchscreen kiosks to receive a map route to their parked car.' }
    ],
    faqs: [
      {
        q: 'What is the key advantage of Camera PGS over traditional Ultrasonic PGS?',
        a: 'A single Camera PGS sensor monitors 3 to 6 parking spaces simultaneously, capturing license plates for Find-My-Car search and providing security video surveillance.'
      },
      {
        q: 'How are the sensors powered and networked?',
        a: 'Neptune PGS sensors utilize daisy-chain RS485 communication or Power-over-Ethernet (PoE), drastically reducing cable tray footprint and installation labor.'
      }
    ]
  },
  counting: {
    title: 'Parking Counting Solutions',
    badge: 'Zone & Ramp Occupancy Telemetry',
    tagline: 'Directional inductive vehicle loops, ramp aggregating nodes, and high-visibility outdoor totems.',
    description: 'Neptune Parking Counting Systems provide continuous, non-stop directional traffic telemetry across parking ramps, floor portals, and perimeter gates. Dual-channel inductive loop logic prevents false counts caused by reversing vehicles, ensuring 99.8% count accuracy.',
    heroImage: 'https://www.neptuneautomatic.com/wp-content/uploads/Untitled-design-44.png',
    roiStats: [
      { label: 'Count Accuracy', value: '99.8%', desc: 'Sequential A-B directional loop logic prevents false counts from turning vehicles' },
      { label: 'Telemetry Latency', value: '< 200ms', desc: 'Master count nodes broadcast real-time data to municipal city dashboards' },
      { label: 'All-Weather Durability', value: 'IP65', desc: 'High-brightness outdoor LED totems remain readable in direct blinding sunlight' }
    ],
    architectureSteps: [
      { step: 1, title: 'Sequential Loop Traversal', desc: 'Vehicles traverse dual embedded inductive road loops on entry/exit ramps to determine exact travel direction.' },
      { step: 2, title: 'Zone Count Aggregation', desc: 'Local floor counting controllers tally net occupancy and transmit data over RS-485 / TCP/IP.' },
      { step: 3, title: 'Outdoor LED Totems', desc: 'High-visibility LED displays at parking entries inform arriving motorists of live floor-by-floor space availability.' },
      { step: 4, title: 'Smart City API Stream', desc: 'Data streams into municipal traffic management portals and mobile navigation apps.' }
    ],
    faqs: [
      {
        q: 'How does the counting controller distinguish entering versus exiting cars on a single-lane ramp?',
        a: 'The controller uses phase-shifted A-B dual loops. Only a sequential traversal pattern (A then B, or B then A) commits a count increment or decrement.'
      },
      {
        q: 'Can the counting display be customized for multi-level facilities?',
        a: 'Yes. Neptune manufactures custom powder-coated LED totems displaying Basement 1, Basement 2, and Ground floor numbers with dynamic Full / Green slot figures.'
      }
    ]
  },
  'vehicular-access': {
    title: 'Vehicular Access Control Solutions',
    badge: 'High-Security Perimeter & Resident Access',
    tagline: 'Long-range UHF RFID readers, neural ANPR cameras, and anti-crash vehicular barrier interlocks.',
    description: 'Purpose-built for residential gated communities, corporate IT headquarters, defense compounds, and industrial logistics parks. Neptune Vehicular Access Control delivers non-stop passage for authorized vehicles while locking out unauthorized intrusions.',
    heroImage: 'https://www.neptuneautomatic.com/wp-content/uploads/FASTag-Based-Parking-Management-System.png',
    roiStats: [
      { label: 'Stop-and-Go Elimination', value: '100%', desc: 'Authorized windshield tags open barriers from 6m to 12m away on approach' },
      { label: 'Anti-Tailgating Safety', value: 'Certified', desc: 'Safety loops and active infrared curtains prevent unauthorized follower vehicles' },
      { label: 'Integration Protocols', value: 'Wiegand / OSDP', desc: 'Natively integrates with Honeywell, Schneider, Lenel, and Siemens access panels' }
    ],
    architectureSteps: [
      { step: 1, title: 'Long-Range RFID Query', desc: 'Windshield-mounted UHF tags are interrogated by 12dBi circular polarized antennas up to 12 meters away.' },
      { step: 2, title: 'Access Decision & Verification', desc: 'Neptune multi-door controller verifies time-zone schedules, anti-passback, and driver authorization.' },
      { step: 3, title: 'High-Speed Boom Release', desc: 'FAAC BLDC barrier arm rises in 0.9s to 1.8s for smooth, continuous drive-through entry.' },
      { step: 4, title: 'Audit Trail Telemetry', desc: 'Photo evidence and credential data are archived with automated security desk pop-up alarms for unauthorized attempts.' }
    ],
    faqs: [
      {
        q: 'What is the read distance of Neptune UHF RFID vehicular readers?',
        a: 'Our high-gain circular readers offer user-adjustable read distances between 3 meters and 12 meters, ensuring optimal triggering before vehicle arrival.'
      },
      {
        q: 'Can this system operate with existing employee RFID badges?',
        a: 'Yes. Neptune controllers support multi-technology credentials including dual-frequency UHF + Mifare cards for employee physical access.'
      }
    ]
  }
};

export const ParkingSubcategoryPage: React.FC<ParkingSubcategoryPageProps> = ({
  subcategory,
  onNavigateHome,
  onNavigateToSolutionsHub,
  onSelectSubcategory,
  onSelectProduct,
  onOpenQuoteModal,
  onOpenDownloadModal
}) => {
  const currentSubcatKey = (subcategory === 'all' ? 'management' : subcategory) as Exclude<ParkingSolutionsSubcategory, 'all'>;
  const details = SUBCATEGORY_DETAILS[currentSubcatKey] || SUBCATEGORY_DETAILS.management;

  // Filter products for this subcategory
  const products = PARKING_SOLUTIONS_PRODUCTS.filter(p => p.subCategory === currentSubcatKey);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 1. Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={onNavigateToSolutionsHub}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Smart Parking Solutions
          </button>
          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate">
            {details.title}
          </span>
        </nav>

        {/* 2. Subcategory Hero Card (White Theme) */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
              {details.badge}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Made in India • Sector-59 Noida
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d37] tracking-tight leading-tight">
            {details.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-4xl">
            {details.tagline}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            {details.description}
          </p>

          {/* Quick ROI Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {details.roiStats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1D438A]">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-normal">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onOpenQuoteModal(`Smart Parking Solution: ${details.title}`)}
              className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Request System Sizing & BOM Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:08010807000"
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#0a1d37] text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00a8e8]" />
              <span>Plant Engineering Desk: 080108 07000</span>
            </a>
          </div>
        </div>

        {/* 3. Subcategory Switcher Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: 'management', label: '1. Parking Management (PMS)' },
            { id: 'guidance', label: '2. Parking Guidance (PGS)' },
            { id: 'counting', label: '3. Parking Counting' },
            { id: 'vehicular-access', label: '4. Vehicular Access' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelectSubcategory(tab.id as ParkingSolutionsSubcategory)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                currentSubcatKey === tab.id
                  ? 'bg-[#1D438A] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. System Architecture & Operating Workflow */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
              Engineering Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              End-to-End System Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              How Neptune hardware and cloud audit firmware coordinate to ensure zero bottlenecks and complete transaction accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {details.architectureSteps.map((step) => (
              <div key={step.step} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative">
                <div className="w-8 h-8 rounded-full bg-[#1D438A] text-white font-mono font-bold text-xs flex items-center justify-center">
                  0{step.step}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Subcategory Hardware Deployment Grid */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
              Engineered Hardware Lineup
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Hardware Modules & System Packages ({products.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Manufactured with industrial-grade electronic components and heavy-gauge galvanized steel chassis at Sector 59 Noida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 bg-slate-900 relative overflow-hidden group">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono font-bold">
                        {product.modelCode}
                      </span>
                      {product.isFlagship && (
                        <span className="px-2 py-0.5 rounded-md bg-[#D7282F] text-white text-[10px] font-bold">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {product.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Top Specs */}
                    {product.specs && product.specs.length > 0 && (
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                        {product.specs.slice(0, 3).map((spec, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center text-slate-700">
                            <span className="text-slate-500">{spec.label}:</span>
                            <span className="font-bold text-slate-800 text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2 border-t border-slate-100">
                  <div className="pt-3 flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 py-2.5 px-3 bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {onOpenDownloadModal && product.downloads && product.downloads.length > 0 && (
                      <button
                        onClick={() => onOpenDownloadModal(product.downloads![0].title, product)}
                        className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="Download Technical Datasheet"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal(`Quote Request: ${product.name} (${product.modelCode})`)}
                    className="w-full py-2 px-3 text-xs font-bold text-[#D7282F] hover:bg-red-50 rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Request Project Pricing
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 6. Technical FAQs */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
              Engineering FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Frequently Asked Technical Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {details.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0a1d37]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#1D438A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. Corporate Dual-Office Facility Assurance */}
        <div className="bg-gradient-to-r from-blue-50 to-slate-100 rounded-2xl p-6 sm:p-8 border border-blue-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                Direct Noida Factory Support
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0a1d37]">
                Manufactured & Programmed at Neptune House, Sector 59 Noida
              </h3>
              <p className="text-xs text-slate-600">
                Clients, EPC contractors, and system integrators are welcome to visit our test lanes and firmware staging labs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal(`Factory Visit: ${details.title}`)}
                className="py-2.5 px-4 bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Schedule Factory Audit
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
