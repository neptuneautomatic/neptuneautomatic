import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  Calendar,
  ExternalLink,
  ChevronRight,
  Factory,
  Maximize2,
  X,
  Compass,
  Layers
} from 'lucide-react';
import { NeptuneLogo } from './NeptuneLogo';
import { COMPANY_INFO } from '../data/companyData';

interface CompanyFacilityShowcaseProps {
  onOpenQuoteModal?: () => void;
}

export const CompanyFacilityShowcase: React.FC<CompanyFacilityShowcaseProps> = ({
  onOpenQuoteModal
}) => {
  const [activeZone, setActiveZone] = useState<'campus' | 'assembly' | 'rnd' | 'testing'>('campus');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('/neptune-headquarters.png');

  const facilityZones = [
    {
      id: 'campus',
      name: 'Corporate HQ & Plant',
      tagline: 'Neptune House, Sector-59, Noida',
      desc: 'Our flagship 50,000+ sq. ft. corporate headquarters housing advanced engineering labs, executive briefing rooms, and heavy-duty manufacturing lines.',
      specs: [
        { label: 'Campus Footprint', value: '50,000+ Sq. Ft.' },
        { label: 'Location', value: 'A-11, Sector-59, Noida (NCR)' },
        { label: 'Certifications', value: 'ISO 9001:2015, CE, RoHS' },
        { label: 'Daily Output', value: '100+ Automated Barrier Units' },
      ],
      highlights: [
        'Dedicated R&D, structural engineering & testing wings under one roof',
        'Direct road logistics connectivity across Delhi NCR & national expressways',
        'State-of-the-art client demonstration zone and FASTag staging bays',
      ]
    },
    {
      id: 'assembly',
      name: 'Precision Assembly Bays',
      tagline: 'Automated fabrication & integration',
      desc: 'Equipped with CNC laser cutting, electrostatic powder coating chambers, and automated precision jig welding for high-durability barrier chassis.',
      specs: [
        { label: 'Chassis Finish', value: 'IP54 / IP65 Powder Coated' },
        { label: 'Steel Grade', value: 'Cold-Rolled High-Tensile Steel' },
        { label: 'Coating Life', value: '10+ Years Anti-Corrosion' },
        { label: 'Welding', value: 'Robotic & TIG High Precision' },
      ],
      highlights: [
        'Multi-stage phosphate pretreatment for salt-spray resistance',
        'Automated arm balancing and torque-calibrated gear assembly',
        'Zero-defect assembly lines monitored by barcode serialization',
      ]
    },
    {
      id: 'rnd',
      name: 'Embedded R&D Electronics Lab',
      tagline: 'Proprietary firmware & FASTag controllers',
      desc: 'Where Neptune firmware engineers develop proprietary BLDC motor controllers, EPC Gen2 RFID FASTag decoders, and cloud telemetry protocols.',
      specs: [
        { label: 'Motor Tech', value: 'Brushless DC (BLDC) Variable Speed' },
        { label: 'RFID Standard', value: 'NPCI FASTag / ISO 18000-6C' },
        { label: 'Telemetry', value: 'RS485, TCP/IP, 4G IoT Gateway' },
        { label: 'Firmware', value: 'In-House Neptune OS Embedded' },
      ],
      highlights: [
        'Continuous environmental burn-in testing of controller circuit boards',
        'Direct API integration with national FASTag banking gateways',
        'Over-The-Air (OTA) firmware upgrade test harnesses',
      ]
    },
    {
      id: 'testing',
      name: 'High-Cycle Endurance Bay',
      tagline: '5,000,000 continuous test cycles',
      desc: 'Every model family undergoes grueling real-world endurance tests including simulated continuous traffic, rapid temperature shifts (-15°C to +60°C), and storm exposure.',
      specs: [
        { label: 'Tested MCBF', value: '5,000,000 to 10,000,000 Cycles' },
        { label: 'Thermal Range', value: '-15°C to +60°C' },
        { label: 'Impact Rating', value: 'Crash-rated K4 / K12 equivalents' },
        { label: 'Inspection', value: '100% Pre-Dispatch Quality Gate' },
      ],
      highlights: [
        'Automated 24-hour non-stop cycle test before boxing and dispatch',
        'Optical bounce & obstruction sensor calibration verify protocols',
        'Full factory acceptance testing (FAT) documentation provided',
      ]
    },
  ];

  const currentZone = facilityZones.find(z => z.id === activeZone) || facilityZones[0];

  return (
    <div id="company-facility-showcase" className="rounded-sm bg-white border border-slate-200 overflow-hidden shadow-sm">
      
      {/* Top Banner: Exact Corporate Building Photo Display (As requested: used as it is without modifications) */}
      <div className="relative bg-slate-900 overflow-hidden border-b border-slate-200">
        
        {/* Real Exact Corporate Building Image Container */}
        <div className="relative w-full max-h-[520px] overflow-hidden group bg-slate-950 flex items-center justify-center">
          <img 
            src={imageSrc}
            alt="Neptune India Corporate Headquarters - Neptune House, A-11, Sector-59, Noida"
            className="w-full h-full object-cover object-center max-h-[520px] transition-transform duration-700 group-hover:scale-102"
            onError={() => {
              if (imageSrc !== '/Neptune-India-Company-Pic.svg') {
                setImageSrc('/Neptune-India-Company-Pic.svg');
              }
            }}
          />

          {/* Floating Subtle Top Left Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-sm bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold font-mono text-white">
                OFFICIAL CORPORATE HEADQUARTERS
              </span>
            </div>
          </div>

          {/* Floating Top Right Expand / Full Screen Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-2.5 rounded-sm bg-slate-900/90 hover:bg-[#00a8e8] text-white border border-slate-700 transition-colors shadow-md flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="View Full High-Resolution Corporate Picture"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Full High-Res</span>
            </button>
          </div>

          {/* Bottom Information Overlay Bar with Verified Coordinates */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 sm:p-6 z-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <div className="flex items-center gap-2 text-[#00a8e8] text-xs font-mono font-bold tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>GOOGLE MY BUSINESS VERIFIED CAMPUS</span>
                </div>
                <h4 className="text-lg sm:text-2xl font-bold font-display text-white">
                  Neptune House • Corporate HQ & Manufacturing Plant
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  A-11, Sector-59, Noida - 201301, Uttar Pradesh, India (Delhi NCR)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Neptune+House+A-11+Sector+59+Noida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-sm bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Open Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Verified Badges Bar */}
        <div className="bg-slate-900/95 border-t border-slate-800 py-2.5 px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white">
                <Building2 className="w-3.5 h-3.5 text-[#00a8e8]" />
                50,000+ Sq. Ft. Integrated Facility
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Award className="w-3.5 h-3.5 text-[#00a8e8]" />
                ISO 9001:2015 & CE Certified
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Make in India Indigenous Production
            </span>
          </div>
        </div>

      </div>

      {/* Facility Interactive Navigator */}
      <div className="p-6 sm:p-8 bg-white">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-slate-200 pb-6">
          {facilityZones.map((zone) => {
            const isSelected = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id as any)}
                className={`p-3.5 rounded-sm text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a1d37] text-white border-[#0a1d37] shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#0a1d37]'}`}>
                  {zone.name}
                </div>
                <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-[#00a8e8]' : 'text-slate-500'}`}>
                  {zone.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Zone Details */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Zone Description & Key Highlights (Col 1-7) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-slate-100 text-[#0a1d37] text-xs font-mono font-bold uppercase mb-2">
                Zone Overview
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0a1d37]">
                {currentZone.name}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {currentZone.desc}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Engineering Highlights:
              </h4>
              {currentZone.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#00a8e8] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Factory Visit CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {onOpenQuoteModal && (
                <button
                  onClick={onOpenQuoteModal}
                  className="px-5 py-2.5 rounded-sm bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Factory / Demo Visit</span>
                </button>
              )}
              <a
                href="tel:08010807000"
                className="px-4 py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-[#0a1d37] font-semibold text-xs border border-slate-200 transition-colors"
              >
                Call Plant: 080108 07000
              </a>
            </div>
          </div>

          {/* Technical Specifications Table (Col 8-12) */}
          <div className="lg:col-span-5 rounded-sm bg-slate-50 border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a1d37] flex items-center justify-between">
              <span>Facility Specifications</span>
              <span className="font-mono text-[#00a8e8]">NEPTUNE-NOIDA</span>
            </h4>

            <div className="divide-y divide-slate-200">
              {currentZone.specs.map((spec, i) => (
                <div key={i} className="py-2.5 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="text-[#0a1d37] font-bold">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-sm bg-white border border-slate-200 text-[11px] text-slate-600 leading-normal">
              <strong className="text-[#0a1d37] block mb-0.5">Audited & Certified Infrastructure:</strong>
              Clients, EPC contractors, and government tender authorities are welcome to inspect our facility for QA audits and Factory Acceptance Testing (FAT).
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full Resolution Exact Corporate Image */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 rounded-sm border border-slate-700 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#00a8e8]" />
                <span className="text-sm font-bold">
                  Neptune House • Sector-59 Noida Corporate Headquarters & Manufacturing Plant
                </span>
              </div>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Picture View */}
            <div className="p-2 bg-black flex items-center justify-center">
              <img 
                src={imageSrc}
                alt="Neptune India Corporate Headquarters - Exact Original Image"
                className="max-h-[75vh] w-auto object-contain rounded-xs"
              />
            </div>

            {/* Modal Footer with Verified Details */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
              <span>Neptune Automatic Pvt. Ltd. • A-11, Sector-59, Noida - 201301</span>
              <span className="font-mono text-[#00a8e8]">Google My Business Verified</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

