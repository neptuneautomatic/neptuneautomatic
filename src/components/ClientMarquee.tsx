import React from 'react';
import { ShieldCheck, Award, Building2, CheckCircle2 } from 'lucide-react';

const CLIENTS = [
  { name: 'Delhi Metro Rail Corp (DMRC)', type: 'Transit Infrastructure', icon: '🚇' },
  { name: 'Airports Authority of India', type: 'Civil Aviation', icon: '✈️' },
  { name: 'Larsen & Toubro (L&T)', type: 'EPC Conglomerate', icon: '🏗️' },
  { name: 'Tata Projects Limited', type: 'Defense & Infrastructure', icon: '🛡️' },
  { name: 'DLF CyberCity', type: 'Grade-A Commercial', icon: '🏢' },
  { name: 'Infosys Tech Park', type: 'IT Campuses', icon: '💻' },
  { name: 'Reliance Industries Limited', type: 'Petrochemical & Energy', icon: '⚡' },
  { name: 'Adani Ports & Logistics', type: 'Maritime & Freight', icon: '🚢' },
  { name: 'Maruti Suzuki India', type: 'Automotive Manufacturing', icon: '🚗' },
  { name: 'NTPC Power Stations', type: 'National Energy', icon: '🔋' },
  { name: 'GMR AeroCity', type: 'Aerospace & Hospitality', icon: '🌐' },
  { name: 'AIIMS New Delhi', type: 'Healthcare & Research', icon: '🏥' }
];

export const ClientMarquee: React.FC = () => {
  return (
    <div className="relative py-7 bg-gradient-to-r from-[#eef2f8] via-[#f1f5f9] to-[#eef2f8] border-y border-slate-300/90 overflow-hidden text-slate-800">
      {/* Subtle Specular Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A8E8] animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#1D438A] font-bold">
            Pan-India Deployment Footprint
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            15,000+ Operational Lanes
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            Make In India Certified
          </span>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div className="animate-marquee flex items-center gap-4 py-1.5">
          {[...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-[#00A8E8] transition-all duration-300 hover:scale-105 group cursor-default whitespace-nowrap shadow-2xs hover:shadow-md"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {client.icon}
              </span>
              <div className="text-left">
                <div className="text-sm font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors">
                  {client.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 tracking-wider">
                  {client.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
