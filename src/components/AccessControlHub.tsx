import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Radio, 
  CreditCard, 
  UserCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  FileText, 
  Cpu, 
  AlertTriangle, 
  Layers, 
  SlidersHorizontal,
  ChevronDown,
  Building2,
  Lock,
  Eye
} from 'lucide-react';
import { Product, AccessControlSubcategory } from '../types';
import { ACCESS_CONTROL_PRODUCTS } from '../data/accessControlProducts';

interface AccessControlHubProps {
  initialSubcategory?: AccessControlSubcategory;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (productName?: string) => void;
  onOpenDownloadModal?: (resourceTitle: string, product: Product) => void;
}

export const AccessControlHub: React.FC<AccessControlHubProps> = ({
  initialSubcategory = 'all',
  onSelectProduct,
  onRequestQuote,
  onOpenDownloadModal
}) => {
  const [activeTab, setActiveTab] = useState<AccessControlSubcategory>(initialSubcategory);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (initialSubcategory) {
      setActiveTab(initialSubcategory);
    }
  }, [initialSubcategory]);

  // Filter products by active tab
  const filteredProducts = activeTab === 'all' 
    ? ACCESS_CONTROL_PRODUCTS 
    : ACCESS_CONTROL_PRODUCTS.filter(p => p.subCategory === activeTab);

  const subcategoryMeta = {
    all: {
      title: 'Access Control & Physical Security Systems',
      badge: 'Comprehensive Access Infrastructure',
      tagline: 'Controlled pedestrian movement, high-security vehicle barriers, and touchless RF identification systems.',
      desc: 'Neptune India delivers integrated physical security and automated credentialing systems designed for high-density corporate towers, mass transit concourses, defense installations, and residential communities.'
    },
    'uhf-rfid': {
      title: 'Long Range UHF RFID Readers',
      badge: '865 – 868 MHz Indian RFID Standard',
      tagline: 'Hands-free vehicular detection up to 12 meters with WPC-approved circularly polarized antennas.',
      desc: 'Our long-range UHF RFID family provides hands-free vehicular identification for automatic gate and barrier entry. Vehicles are detected smoothly on approach without lowering windows in heavy rain or peak traffic.'
    },
    'smart-card': {
      title: 'Smart Card & Proximity Readers',
      badge: '13.56 MHz Encrypted Authentication',
      tagline: 'Contactless smart card readers with sub-300ms verification and IP66 solid resin casting.',
      desc: 'High-frequency 13.56 MHz contactless readers compatible with Mifare, DESFire EV2/EV3, and NFC smartphone credentials for turnstiles, parking pedestals, and high-security access portals.'
    },
    'pedestrian-gates': {
      title: 'Pedestrian Access Gates & Turnstiles',
      badge: 'High-Throughput Controlled Entry',
      tagline: 'Architectural optical speed gates, rugged tripod turnstiles, and anti-climb full-height security gates.',
      desc: 'Neptune designs and manufactures an expansive portfolio of pedestrian physical access systems engineered from heavy AISI 304 stainless steel with brushless DC servo motors and 45-60 ppm throughput.'
    },
    'vehicle-access': {
      title: 'High-Security Vehicle Access Control',
      badge: 'Perimeter Anti-Ram Defense',
      tagline: 'Hydraulic road blockers, tyre killers, and axle breakers designed for hostile vehicle deterrence.',
      desc: 'Heavy physical barriers engineered to neutralize unauthorized vehicular entry at military gates, toll plazas, government secretariats, and industrial perimeters.'
    }
  };

  const currentMeta = subcategoryMeta[activeTab] || subcategoryMeta.all;

  const faqs = [
    {
      q: 'How does long-range UHF RFID differ from standard proximity cards?',
      a: 'UHF RFID operates in the 865-868 MHz frequency band and utilizes high-gain directional antennas to detect passive vehicle tags from up to 12 meters away. Standard proximity smart cards operate at 13.56 MHz and require presentation within 5 cm of the reader.'
    },
    {
      q: 'What fail-safe features operate during fire alarms or power loss in pedestrian gates?',
      a: 'Neptune tripod turnstiles feature automatic drop-arm mechanisms that drop the horizontal bar instantly when power fails or an emergency alarm triggers. Speed gates and flap barriers immediately retract wings into the cabinet to maintain an unobstructed evacuation route.'
    },
    {
      q: 'Can Neptune pedestrian gates integrate with third-party biometric and facial recognition hardware?',
      a: 'Yes. All Neptune turnstiles, speed gates, and flap barriers feature standardized modular mounting plates and universal Wiegand 26/34 and dry relay interfaces compatible with facial terminals, QR barcode scanners, and palm scanners.'
    },
    {
      q: 'Are road blockers and tyre killers synchronized with automatic boom barriers?',
      a: 'Absolutely. In standard multi-barrier interlock configurations, the road blocker or tyre killer only lowers once the access control credentials are authorized, followed by the boom barrier opening and traffic light switching to green.'
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a8e8]" />
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
                { id: 'all', label: 'All Access Control' },
                { id: 'uhf-rfid', label: 'Long Range UHF RFID' },
                { id: 'smart-card', label: 'Smart Card Readers' },
                { id: 'pedestrian-gates', label: 'Pedestrian Gates & Turnstiles' },
                { id: 'vehicle-access', label: 'Vehicle Access Barriers' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AccessControlSubcategory)}
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
                      ? ACCESS_CONTROL_PRODUCTS.length 
                      : ACCESS_CONTROL_PRODUCTS.filter(p => p.subCategory === tab.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Explainer Block for UHF RFID */}
      {activeTab === 'uhf-rfid' && (
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37] mb-6 flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#1D438A]" />
              <span>How Neptune UHF RFID Vehicle Access Operates</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#1D438A] font-bold flex items-center justify-center mb-3">1</div>
                <h3 className="font-bold text-[#0a1d37] mb-1">Passive Windshield Tag</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Vehicle is equipped with an encrypted EPC Gen 2 tamper-proof tag affixed to the upper windshield or headlamp, requiring no internal batteries.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#1D438A] font-bold flex items-center justify-center mb-3">2</div>
                <h3 className="font-bold text-[#0a1d37] mb-1">Long-Range Microwave Beam</h3>
                <p className="text-xs text-slate-600 leading-relaxed">The reader continuously scans the 865-868 MHz zone with circular polarization, energizing and authenticating the vehicle tag from up to 12 meters.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#1D438A] font-bold flex items-center justify-center mb-3">3</div>
                <h3 className="font-bold text-[#0a1d37] mb-1">Instant Barrier Relay Release</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Upon verification via Wiegand or TCP/IP, the controller outputs a clean dry contact pulse, raising the barrier arm in &lt; 1.5 seconds.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0a1d37] tracking-tight">
              Verified Hardware Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Showing {filteredProducts.length} verified physical access systems.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#1D438A] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Sector-59 Noida Plant Tested
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
                      {product.subCategory === 'uhf-rfid' ? 'UHF RFID' :
                       product.subCategory === 'smart-card' ? 'Smart Card' :
                       product.subCategory === 'pedestrian-gates' ? 'Pedestrian Gate' : 'Hostile Vehicle Mitigation'}
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

      {/* Comparison Section */}
      {activeTab === 'uhf-rfid' && (
        <section className="py-10 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37] mb-6 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#1D438A]" />
              <span>UHF RFID Reader Comparison: LR_RF-01 vs LR_RF-02</span>
            </h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-50 text-[#0a1d37] border-b border-slate-200 font-bold">
                    <th className="p-3.5">Feature / Attribute</th>
                    <th className="p-3.5">Neptune LR_RF-01</th>
                    <th className="p-3.5">Neptune LR_RF-02</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-[#1D438A]">Target Application</td>
                    <td className="p-3.5">Residential Societies & Corporate Single/Dual Lanes</td>
                    <td className="p-3.5 font-bold text-[#00a8e8]">Enterprise Campuses & High-Speed Tolls</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                    <td className="p-3.5 font-bold text-[#1D438A]">Ethernet Network Interface</td>
                    <td className="p-3.5 text-slate-500">None (Wiegand & RS-485 Serial)</td>
                    <td className="p-3.5 font-bold text-emerald-700">Native RJ45 TCP/IP (10 Mbps)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-[#1D438A]">Hardware Trigger Input</td>
                    <td className="p-3.5 text-slate-500">Optional External Loop Module</td>
                    <td className="p-3.5 font-bold text-emerald-700">Built-in Loop Trigger Input</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/30">
                    <td className="p-3.5 font-bold text-[#1D438A]">Audible Feedback</td>
                    <td className="p-3.5">External Buzzer Port</td>
                    <td className="p-3.5 font-bold text-emerald-700">Integrated Internal Buzzer</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-[#1D438A]">Reading Distance</td>
                    <td className="p-3.5">Up to 6-8 Meters (8 dBi)</td>
                    <td className="p-3.5">Up to 12 Meters (12 dBi)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37] mb-2">
              Built for High-Security Indian Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tested under intense monsoons, high ambient dust, and continuous 24/7 commercial duty cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Corporate Headquarters',
                desc: 'Touchless speed gates and facial biometric lanes processing 3,000+ employees per hour without lobby queues.',
                icon: Building2
              },
              {
                title: 'Mass Transit & Metro',
                desc: 'Sub-second retracting flap barriers and high-strength tripod turnstiles handling relentless passenger volumes.',
                icon: UserCheck
              },
              {
                title: 'Defense & Critical Infra',
                desc: 'ASTM crash-certified hydraulic road blockers, full-height anti-climb turnstiles, and axle breakers.',
                icon: Lock
              },
              {
                title: 'Industrial SEZs & Logistics',
                desc: 'Long-range UHF RFID antennas and automated boom barriers tracking freight fleets with zero driver delay.',
                icon: Radio
              }
            ].map((app, idx) => {
              const IconComp = app.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1D438A] mb-3">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0a1d37] text-sm">{app.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{app.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - Light Theme */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Access Control Technical FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Engineering guidelines on Wiegand interfacing, emergency egress failsafes, and crash ratings.
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
              Consult on Facility Physical Access Control
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Meet our Noida security engineers to plan lobby turnstile lane calculations, fire egress compliance, and RFID vehicle loop positions.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onRequestQuote('Access Control & Gate Automation Proposal')}
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
