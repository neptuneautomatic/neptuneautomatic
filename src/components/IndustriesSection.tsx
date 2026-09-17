import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Factory, 
  Plane, 
  Truck, 
  Hospital, 
  ShoppingBag, 
  Hotel, 
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { Industry, ProductCategory } from '../types';
import { INDUSTRIES } from '../data/companyData';

interface IndustriesSectionProps {
  onOpenQuoteModal: (industryName: string) => void;
  onNavigateToProducts: (category?: ProductCategory) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onOpenQuoteModal,
  onNavigateToProducts
}) => {
  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Plane': return <Plane className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'Hospital': return <Hospital className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Hotel': return <Hotel className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="industries-section" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-6 bg-[#00a8e8]"></div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
              Tailored Industry Architectures
            </span>
            <div className="h-[2px] w-6 bg-[#00a8e8]"></div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Engineered for India’s Most Demanding Sectors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From high-speed vehicle throughput in corporate IT parks to anti-ram crash protection for defense headquarters.
          </p>
        </div>

        {/* 9 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              className="rounded-sm bg-slate-50 border border-slate-200 hover:border-[#00a8e8] p-6 flex flex-col justify-between space-y-4 group transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 text-[#00a8e8] flex items-center justify-center group-hover:bg-[#0a1d37] group-hover:text-white transition-colors">
                    {getIndustryIcon(ind.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Sector Profile</span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors">
                  {ind.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ind.shortDesc}
                </p>

                {/* Recommended Solutions */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Recommended Deployments
                  </div>
                  <div className="space-y-1.5">
                    {ind.recommendedSolutions.map((sol, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00a8e8] shrink-0" />
                        <span className="font-medium">{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => onOpenQuoteModal(ind.title)}
                  className="w-full py-2.5 px-3 rounded-sm bg-white hover:bg-[#0a1d37] text-[#0a1d37] hover:text-white text-xs font-bold border border-slate-300 hover:border-[#0a1d37] flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Request Sector Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00a8e8] group-hover:text-white" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
