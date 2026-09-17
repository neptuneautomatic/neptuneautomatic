import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Star, 
  ShieldCheck, 
  Building2, 
  Train, 
  Car,
  Compass,
  Layers
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { NeptuneLogo } from './NeptuneLogo';

interface GoogleMapLocationProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
}

export const GoogleMapLocation: React.FC<GoogleMapLocationProps> = ({
  title = "Visit Our Corporate Headquarters & Manufacturing Plant",
  subtitle = "Directly verified on Google My Business — Neptune House, Sector 59 Noida",
  compact = false,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  const [mapType, setMapType] = useState<'m' | 'k'>('m'); // 'm' for standard roadmap, 'k' for satellite
  const [activeTab, setActiveTab] = useState<'map' | 'transit' | 'guidelines'>('map');

  const fullAddress = "Neptune House, A-11, Sector-59, Noida - 201301, Uttar Pradesh, India";
  const coordinates = "28.5997° N, 77.3688° E";
  
  const gmbUrl = "https://www.google.com/maps/search/?api=1&query=Neptune+House+A-11+Sector+59+Noida";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Neptune+House,+A-11,+Sector+59,+Noida,+Uttar+Pradesh+201301";
  const embedUrl = `https://maps.google.com/maps?q=Neptune+Automatic+Pvt+Ltd,+A-11,+Sector+59,+Noida,+Uttar+Pradesh+201301&t=${mapType}&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="google-map-location" className={`rounded-sm bg-white border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      
      {/* Header Bar */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Google My Business Verified
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-700 font-semibold text-[11px]">4.8 (240+ Verified Reviews)</span>
              </div>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-[#0a1d37]">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {subtitle}
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#00a8e8] hover:border-[#00a8e8] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Address Copied' : 'Copy Address'}</span>
            </button>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#00a8e8] text-white text-xs font-bold hover:bg-[#0090c7] transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Driving Directions</span>
            </a>

            <a
              href={gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0a1d37] text-white text-xs font-bold hover:bg-[#153460] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#00a8e8]" />
              <span>Google Maps Listing</span>
            </a>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/80">
          <button
            onClick={() => { setActiveTab('map'); setMapType('m'); }}
            className={`px-3 py-1 rounded-sm text-xs font-bold transition-all ${
              activeTab === 'map' && mapType === 'm'
                ? 'bg-[#0a1d37] text-white'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Street Map View
          </button>
          <button
            onClick={() => { setActiveTab('map'); setMapType('k'); }}
            className={`px-3 py-1 rounded-sm text-xs font-bold transition-all ${
              activeTab === 'map' && mapType === 'k'
                ? 'bg-[#0a1d37] text-white'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Satellite View
          </button>
          <button
            onClick={() => setActiveTab('transit')}
            className={`px-3 py-1 rounded-sm text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'transit'
                ? 'bg-[#0a1d37] text-white'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Train className="w-3 h-3 text-[#00a8e8]" />
            Transit & Metro Access
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3 py-1 rounded-sm text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'guidelines'
                ? 'bg-[#0a1d37] text-white'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Building2 className="w-3 h-3 text-[#00a8e8]" />
            Campus Visitor Info
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Details Area */}
      {activeTab === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Real Embedded Google Map */}
          <div className={`${compact ? 'lg:col-span-12' : 'lg:col-span-8'} relative min-h-[380px] sm:min-h-[440px] bg-slate-100`}>
            <iframe
              title="Neptune Automatic Noida Google My Business Location"
              src={embedUrl}
              width="100%"
              height="100%"
              className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Overlay Pin Card */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-3 rounded-sm border border-slate-300 shadow-md max-w-xs pointer-events-none hidden sm:block">
              <div className="flex items-center gap-2">
                <NeptuneLogo size="sm" />
              </div>
              <p className="text-[11px] text-slate-600 mt-1 font-medium">
                A-11, Sector-59, Noida • Uttar Pradesh
              </p>
              <div className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Google Maps Location
              </div>
            </div>
          </div>

          {/* Location Sidebar Info */}
          {!compact && (
            <div className="lg:col-span-4 p-6 bg-white flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00a8e8] font-bold">
                    Official Registered Address
                  </span>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#00a8e8] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#0a1d37]">
                        Neptune House
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        A-11, Sector-59, Noida - 201301, Uttar Pradesh, India
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                        GPS: {coordinates}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00a8e8] font-bold">
                    Direct Plant Reception & Sales
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#00a8e8] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <a href="tel:+918010807000" className="block text-xs font-bold text-[#0a1d37] hover:text-[#00a8e8]">
                        +91 8010 807 000 (Toll-free / Enquiries)
                      </a>
                      <a href="tel:+919555500300" className="block text-xs font-semibold text-[#0a1d37] hover:text-[#00a8e8]">
                        +91 9555 500 300 (WhatsApp / Site Dispatch)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00a8e8] font-bold">
                    Operating Schedule
                  </span>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-600">
                      <p><strong className="text-[#0a1d37]">Monday – Saturday:</strong> 9:30 AM – 6:30 PM IST</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Sunday: Factory closed (Emergency service teams on duty)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0a1d37]">
                  <Car className="w-4 h-4 text-[#00a8e8]" />
                  <span>On-Site Visitor Parking</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Dedicated visitor parking equipped with live Neptune ANPR and barrier access demos on arrival.
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-2 bg-[#0a1d37] text-white text-xs font-bold rounded-sm hover:bg-[#153460] transition-colors"
                >
                  Start GPS Route in Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'transit' ? (
        /* Public Transit & Regional Connectivity */
        <div className="p-6 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-sm bg-sky-100 text-[#00a8e8] flex items-center justify-center font-bold">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="font-display text-sm font-bold text-[#0a1d37]">By Delhi Metro (Blue Line)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Noida Sector 59 Metro Station</strong> is located just 1.2 km away. E-rickshaws and auto-rickshaws are available directly from the station gate to Neptune House.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-sm bg-blue-100 text-[#0a1d37] flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="font-display text-sm font-bold text-[#0a1d37]">By Road / Expressway</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access via <strong>NH-24 / Delhi-Meerut Expressway</strong> and Noida-Greater Noida Link Road. Centrally positioned in Sector 59 industrial sector.
            </p>
          </div>

          <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-sm bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-display text-sm font-bold text-[#0a1d37]">Airport & Rail Access</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Indira Gandhi International Airport (IGI, T3) is ~38 km via Barapullah / Ring Road. New Delhi Railway Station is ~22 km.
            </p>
          </div>
        </div>
      ) : (
        /* Campus Guidelines */
        <div className="p-6 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0a1d37] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Visitor Check-in & Security Protocols
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                <span>All visitors must register at the reception gate with a valid Government ID (Aadhaar/Driver's License/Passport).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                <span>PPE (safety helmets and safety goggles) is provided for access into testing bays and heavy production lines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                <span>Prior appointment is recommended for dedicated engineer walkthroughs and live testing demonstrations.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#0a1d37] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00a8e8]" />
              Facilities Available On Campus
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                <span><strong>Live Experience Center:</strong> Interactive touchpoints with operating speed barriers, FASTag readers, and bollard impact simulations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                <span><strong>Engineering Conference Rooms:</strong> Video conferencing and CAD review suites for architecture and contractor teams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8] mt-1.5 shrink-0" />
                <span><strong>Spares & Dispatch Depot:</strong> Counter for urgent replacement motors, logic boards, and boom arms.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Footer Strip */}
      <div className="px-6 py-3 bg-slate-100/80 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#00a8e8]" />
          <span>Google Place: <strong>Neptune Automatic Pvt. Ltd.</strong> (Neptune House)</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={gmbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#00a8e8] hover:text-[#0a1d37] flex items-center gap-1"
          >
            <span>Check Google Reviews & Photos</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};
