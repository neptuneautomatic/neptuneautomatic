import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Cpu, 
  Award, 
  CheckCircle2, 
  Phone, 
  Download,
  Layers,
  Zap,
  Lock,
  ExternalLink
} from 'lucide-react';
import { AccessAutomationCategory, Product } from '../types';
import { ACCESS_AUTOMATION_CATEGORIES } from '../data/accessAutomationCategories';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { COMPANY_INFO } from '../data/companyData';

interface AccessAutomationHubProps {
  onNavigateHome: () => void;
  onSelectCategory: (category: AccessAutomationCategory) => void;
  onSelectProduct: (productId: string) => void;
  onOpenQuoteModal: (subject?: string) => void;
}

export const AccessAutomationHub: React.FC<AccessAutomationHubProps> = ({
  onNavigateHome,
  onSelectCategory,
  onSelectProduct,
  onOpenQuoteModal,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate">
            Access Automation Ecosystem
          </span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-2xl bg-white text-slate-900 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm border border-slate-200">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a8e8]" />
              <span>34 Engineered Models • 6 Industrial Categories</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0a1d37] leading-tight">
              Access Automation & Physical Perimeter Architecture
            </h1>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              India’s comprehensive hardware ecosystem for vehicular access control, crash-rated hostile vehicle mitigation (HVM), and entrance automation engineered at Neptune House, Sector-59 Noida.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              Combining world-renowned Italian FAAC drive kinematics with heavy-duty indigenous steel fabrication. Backed by 20+ years of manufacturing legacy, certified testing to ASTM F2656 / PAS 68 / EN 12453, and 24/7 pan-India factory service support.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => onOpenQuoteModal('Turnkey Access Automation Consultation')}
                className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Comprehensive Sizing / Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918010807000"
                className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#0a1d37] text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00a8e8]" />
                <span>Noida Plant Desk: +91 8010 807 000</span>
              </a>
            </div>
          </div>
        </div>

        {/* 6 Core Categories Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
              Product Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              The 6 Access Automation Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select a category to explore model variations, comparative specification matrices, and architectural documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACCESS_AUTOMATION_CATEGORIES.map((cat, idx) => {
              const catProducts = ALL_NEPTUNE_PRODUCTS.filter(p => cat.productIds.includes(p.id));

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#1D438A] transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div 
                    onClick={() => onSelectCategory(cat.id)}
                    className="p-6 cursor-pointer space-y-4"
                  >
                    {/* Category Image Header */}
                    <div className="relative aspect-16/9 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                      <img 
                        src={cat.heroImage} 
                        alt={cat.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0a1d37]/90 text-white text-[11px] font-bold backdrop-blur-xs">
                        0{idx + 1}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#1D438A] text-white text-[10px] font-bold uppercase shadow-xs">
                        {cat.productIds.length} Models
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#1D438A] font-semibold mt-0.5">
                        {cat.tagline}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                        {cat.shortDescription}
                      </p>
                    </div>

                    {/* Models Preview List */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Featured Models in this Class:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {catProducts.slice(0, 4).map((p) => (
                          <span 
                            key={p.id}
                            className="px-2 py-0.5 rounded-xs bg-slate-100 text-slate-700 text-[10px] font-semibold font-mono"
                          >
                            {p.modelCode}
                          </span>
                        ))}
                        {catProducts.length > 4 && (
                          <span className="px-2 py-0.5 rounded-xs bg-blue-50 text-[#1D438A] text-[10px] font-bold">
                            +{catProducts.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className="text-xs font-bold text-[#1D438A] hover:text-[#0a1d37] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Series 0{idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Manufacturing & Testing Governance Banner */}
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold border border-blue-100">
                <Award className="w-3.5 h-3.5" />
                <span>Sector-59 Noida Campus • 50,000+ sq. ft. Facility</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37] tracking-tight">
                Indigenous Heavy Engineering & European Drive Kinematics
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Neptune Automatic operates one of Northern India’s largest specialized access automation campuses in Sector-59 Noida. Our production bays house CNC laser profiling, robotic welding cells, multi-stage cataphoresis surface preparation, and hydraulic test benches.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs font-bold text-[#0a1d37]">ISO 9001:2015</div>
                  <div className="text-[11px] text-slate-500">Quality Certified Production</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs font-bold text-[#0a1d37]">ASTM F2656 / PAS 68</div>
                  <div className="text-[11px] text-slate-500">Hostile Vehicle Mitigation</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs font-bold text-[#0a1d37]">24/7 Pan-India</div>
                  <div className="text-[11px] text-slate-500">Field Service Engineers</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 text-center">
              <Building2 className="w-10 h-10 text-[#1D438A] mx-auto" />
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#0a1d37]">
                  Consult With Factory Engineers
                </div>
                <div className="text-xs text-slate-500">
                  Plot A-11, Sector-59 Noida Industrial Corridor
                </div>
              </div>
              <button
                onClick={() => onOpenQuoteModal('Factory Feasibility Survey')}
                className="w-full py-2.5 bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Book Factory Survey / Demo
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
