import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Radio, 
  Key, 
  Lock, 
  TrafficCone, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  FileText, 
  SlidersHorizontal, 
  ChevronDown, 
  Layers, 
  Zap, 
  Cpu,
  Eye,
  Check
} from 'lucide-react';
import { Product, AccessoriesSubcategory } from '../types';
import { ACCESSORIES_PRODUCTS } from '../data/accessoriesProducts';

interface AccessoriesHubProps {
  initialSubcategory?: AccessoriesSubcategory;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (accessoryName?: string) => void;
  onOpenDownloadModal?: (resourceTitle: string, product: Product) => void;
}

export const AccessoriesHub: React.FC<AccessoriesHubProps> = ({
  initialSubcategory = 'all',
  onSelectProduct,
  onRequestQuote,
  onOpenDownloadModal
}) => {
  const [activeTab, setActiveTab] = useState<AccessoriesSubcategory>(initialSubcategory);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (initialSubcategory) {
      setActiveTab(initialSubcategory);
    }
  }, [initialSubcategory]);

  const filteredProducts = activeTab === 'all'
    ? ACCESSORIES_PRODUCTS
    : ACCESSORIES_PRODUCTS.filter(p => p.subCategory === activeTab);

  const subcategoryMeta = {
    all: {
      title: 'Access Automation Accessories & Safety Hardware',
      badge: 'Certified Factory Accessories',
      tagline: 'Infrared photocells, inductive loop detectors, radio transmitters, 12V electric gate locks, and LED traffic heads.',
      desc: 'Genuine accessories engineered and verified for seamless interlock with Neptune and FAAC automatic boom barriers, swing/sliding gate motors, bollards, and road blockers.'
    },
    'safety-devices': {
      title: 'Active Safety Devices & Sensors',
      badge: 'EN 12453 Safety Compliance',
      tagline: 'Modulated infrared safety beams and high-sensitivity inductive vehicle loop detectors.',
      desc: 'Ensure total protection of vehicles and pedestrians. Active safety devices instantly reverse or halt moving gate leaves and barrier arms upon obstacle detection.'
    },
    'pulse-generators': {
      title: 'Simple Pulse Generators & Switches',
      badge: 'Rugged Mechanical Controls',
      tagline: 'Weatherproof key-operated switches and vandal-resistant two-way push-button stations.',
      desc: 'High-endurance contact closure switches designed for guard booths, manual gate release, emergency override, and heavy commercial operation.'
    },
    'radio-transmitters': {
      title: 'Radio Transmitters & Multi-Channel Receivers',
      badge: '433.92 MHz Encrypted RF',
      tagline: 'Handheld keyfobs and modular plug-in/external receivers with rolling-code anti-cloning security.',
      desc: 'Wireless control solutions for residential and commercial entryways, allowing authorized drivers and dispatchers to trigger barriers up to 50 meters away.'
    },
    'gate-locks': {
      title: 'Electric Gate Locks & Deadbolts',
      badge: 'Heavy Mechanical Positive Locking',
      tagline: '12V mortise and rim locks providing up to 1,500 kg holding force on motorized gate leaves.',
      desc: 'Eliminate wind vibration and physical leverage on long automated swing gate leaves. Electric locks automatically unlock when the controller receives an open command.'
    },
    'traffic-signals': {
      title: 'Traffic Signals & Flashing Lights',
      badge: 'Visual Safety & Lane Signaling',
      tagline: '200mm dual-aspect red/green LED signal heads and multi-voltage flashing beacons.',
      desc: 'High-visibility visual status indicators coordinating vehicle entry and exit lanes, reducing accident risks at blind corners, ramps, and single-lane bottlenecks.'
    }
  };

  const currentMeta = subcategoryMeta[activeTab] || subcategoryMeta.all;

  const faqs = [
    {
      q: 'Why are photocells mandatory for automated gates and boom barriers?',
      a: 'Photocells provide non-contact optical safety. If a vehicle or pedestrian enters the closing zone, the infrared beam is interrupted, instantly halting and reversing the motor to prevent collisions and injuries.'
    },
    {
      q: 'Which FAAC control units are compatible with the XF 433 MHz receiver?',
      a: 'The XF 433 MHz receiver features a 3-pin / 5-pin rapid plug connector compatible with FAAC 24V DC electronic control units, including the E045, E145, and 624BLD barrier controllers.'
    },
    {
      q: 'What leaf length requires a 12V electric gate lock?',
      a: 'According to manufacturer engineering guidelines, an electric lock is strongly recommended for swing gate leaves longer than 1.8 meters, and mandatory for leaves exceeding 2.5 meters to resist wind shear and forced leverage.'
    },
    {
      q: 'Can the 200mm LED traffic light operate on 24V DC from the barrier controller?',
      a: 'Yes. Neptune offers both 24V DC models (powered directly from the barrier control board accessory supply) and 230V AC models for long-distance tollway infrastructure.'
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
                "name": "Products",
                "item": `${window.location.origin}/products`
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

      {/* Hero Section - Light Theme */}
      <section className="relative pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-[#1D438A] font-bold">{currentMeta.title}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>{currentMeta.badge}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d37] tracking-tight leading-tight">
              {currentMeta.title}
            </h1>
            
            <p className="text-lg sm:text-xl text-[#1D438A] font-semibold">
              {currentMeta.tagline}
            </p>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {currentMeta.desc}
            </p>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              {[
                { id: 'all', label: 'All Accessories' },
                { id: 'safety-devices', label: 'Safety Devices' },
                { id: 'pulse-generators', label: 'Simple Pulse Generators' },
                { id: 'radio-transmitters', label: 'Radio RF Modules' },
                { id: 'gate-locks', label: 'Electric Gate Locks' },
                { id: 'traffic-signals', label: 'Traffic Signals & Lights' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AccessoriesSubcategory)}
                  className={`px-3.5 py-2 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-[#1D438A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.id === 'all' 
                      ? ACCESSORIES_PRODUCTS.length 
                      : ACCESSORIES_PRODUCTS.filter(p => p.subCategory === tab.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a1d37] tracking-tight">
              Verified Hardware Accessories Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Showing {filteredProducts.length} certified industrial components and sensors.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            EN 12453 Interoperable
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
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                      {product.subCategory === 'safety-devices' ? 'Active Safety' :
                       product.subCategory === 'pulse-generators' ? 'Pulse Control' :
                       product.subCategory === 'radio-transmitters' ? 'Radio RF 433 MHz' :
                       product.subCategory === 'gate-locks' ? 'Gate Security Lock' : 'Visual Traffic Control'}
                    </div>
                    <h3 className="text-base font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Specs Matrix */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1.5">
                    {product.specs.slice(0, 3).map((spec, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">{spec.label}</span>
                        <span className="text-slate-900 font-bold font-mono text-[11px]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Applications Pills */}
                  <div className="flex flex-wrap gap-1">
                    {product.applications.slice(0, 2).map((app, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200/60">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card CTAs */}
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
                    onClick={() => onOpenDownloadModal(`${product.modelCode} Datasheet`, product)}
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

      {/* Interlock Compatibility Matrix */}
      <section className="py-10 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37] mb-2 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#1D438A]" />
            <span>Automation Interlock Compatibility Matrix</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Verified integration matrix between Neptune accessories and barrier/gate motor controllers.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 text-[#0a1d37] border-b border-slate-200 font-bold">
                  <th className="p-3.5">Accessory Type</th>
                  <th className="p-3.5">Operating Voltage</th>
                  <th className="p-3.5">Interfacing Signal</th>
                  <th className="p-3.5">Recommended Gate / Barrier Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-[#1D438A]">Photocells (Optical Safety)</td>
                  <td className="p-3.5">24V AC/DC</td>
                  <td className="p-3.5">NC (Normally Closed) Dry Contact</td>
                  <td className="p-3.5 text-slate-600">All Boom Barriers & Automatic Sliding/Swing Gates</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                  <td className="p-3.5 font-bold text-[#1D438A]">Inductive Loop Detector</td>
                  <td className="p-3.5">230V AC / 24V DC</td>
                  <td className="p-3.5">NO/NC Pulse or Presence Relay</td>
                  <td className="p-3.5 text-slate-600">Boom Barriers, Road Blockers & Tyre Killers</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-[#1D438A]">Two-Way Push Button</td>
                  <td className="p-3.5">Passive / Dry Contact</td>
                  <td className="p-3.5">NO (Normally Open) Pulse</td>
                  <td className="p-3.5 text-slate-600">Security Guard Booths & Manual Release Points</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                  <td className="p-3.5 font-bold text-[#1D438A]">433.92 MHz RF Receivers</td>
                  <td className="p-3.5">24V DC Bus / External Supply</td>
                  <td className="p-3.5">Relay Contact / Direct Plug</td>
                  <td className="p-3.5 text-slate-600">Residential Condominium & VIP Driveway Gates</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-[#1D438A]">12V Electric Gate Lock</td>
                  <td className="p-3.5">12V AC/DC Impulse</td>
                  <td className="p-3.5">Motor Lock Output</td>
                  <td className="p-3.5 text-slate-600">Automated Swing Gates &gt; 1.8m Leaf Length</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                  <td className="p-3.5 font-bold text-[#1D438A]">LED Traffic Signal (200mm)</td>
                  <td className="p-3.5">24V DC / 230V AC</td>
                  <td className="p-3.5">Limit Switch / Relay Feed</td>
                  <td className="p-3.5 text-slate-600">Tollways, Single-Lane Basements & Heavy Factory Gates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section - Light Theme */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Hardware Accessories FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Technical guidance on wiring schematics, voltage ratings, and relay contacts.
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
              Procure Certified Factory Accessories
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              All accessories are stocked and dispatched directly from Neptune Automatic Sector-59 Noida plant with 100% QA bench testing.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onRequestQuote('Certified Accessories Direct Procurement')}
              className="px-5 py-2.5 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Request Price List & Quotation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
