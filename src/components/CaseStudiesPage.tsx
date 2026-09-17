import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  MapPin, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  X,
  Phone
} from 'lucide-react';
import { CASE_STUDIES } from '../data/companyData';
import { CaseStudy } from '../types';

interface CaseStudiesPageProps {
  onNavigateToCaseStudy?: (slugOrId: string) => void;
  onOpenQuoteModal?: (title?: string) => void;
  onNavigateHome?: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onNavigateToCaseStudy,
  onOpenQuoteModal,
  onNavigateHome
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);

  const sectors = ['All', 'Rapid Transit & Metro', 'Aviation & Airports', 'IT & Corporate Tech Parks', 'Maritime & Seaports', 'Industrial Logistics'];

  const filteredCaseStudies = CASE_STUDIES.filter(cs => {
    const matchesSector = selectedSector === 'All' || cs.sector.toLowerCase().includes(selectedSector.toLowerCase()) || cs.client.toLowerCase().includes(selectedSector.toLowerCase());
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      cs.title.toLowerCase().includes(q) || 
      cs.client.toLowerCase().includes(q) || 
      cs.location.toLowerCase().includes(q) || 
      cs.challenge.toLowerCase().includes(q) || 
      cs.solution.toLowerCase().includes(q);
    return matchesSector && matchesSearch;
  });

  const handleDownloadCaseStudy = (cs: CaseStudy) => {
    setDownloadSuccessItem(cs.id);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);

    const content = `NEPTUNE AUTOMATIC PVT. LTD. - ENTERPRISE CASE STUDY BRIEF\n\n` +
      `Project Title: ${cs.title}\n` +
      `Client / Project: ${cs.client}\n` +
      `Sector: ${cs.sector}\n` +
      `Location: ${cs.location}\n\n` +
      `OPERATIONAL CHALLENGE:\n${cs.challenge}\n\n` +
      `ENGINEERED SOLUTION:\n${cs.solution}\n\n` +
      `KEY OUTCOMES & OPERATIONAL METRICS:\n` +
      cs.results.map(r => `• ${r}`).join('\n') + '\n\n' +
      `VERIFIED METRICS:\n` +
      cs.metrics.map(m => `${m.label}: ${m.value}`).join(' | ') + '\n\n' +
      `COMMISSIONED BY:\nNeptune Automatic Pvt. Ltd. & Neptune System Pvt. Ltd.\n` +
      `Neptune House, A-11, Sector-59, Noida - 201301, U.P., India.\n` +
      `Helpline: +91 8010 807 000 | connect@neptuneautomatic.com`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Neptune_Case_Study_${cs.client.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Hero Header */}
      <section className="relative pt-28 pb-14 sm:pb-18 bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button 
              onClick={onNavigateHome}
              className="hover:text-[#1D438A] transition-colors font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Resources</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#1D438A] font-bold">Case Studies</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
              <span className="w-2 h-2 rounded-full bg-[#D7282F]" />
              <span className="tracking-wider uppercase font-mono">FIELD TESTED • MISSION CRITICAL ARCHITECTURES</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-logo leading-tight">
              Enterprise Case Studies & Deployments
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Real-world performance evaluations of Neptune Automatic systems in high-throughput rapid transit, international airport perimeters, IT hubs, and naval seaports. Verified uptime, lifecycle metrics, and ROI outcomes.
            </p>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Documented Deployments</div>
              <div className="text-base sm:text-lg font-extrabold text-[#1D438A] font-display">15,000+ Sites</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Uptime Guarantee</div>
              <div className="text-base sm:text-lg font-extrabold text-emerald-700 font-display">99.8% Average</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Peak Lane Throughput</div>
              <div className="text-base sm:text-lg font-extrabold text-slate-800 font-display">1,200+ VPH</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Crash Validation</div>
              <div className="text-base sm:text-lg font-extrabold text-[#D7282F] font-display">ASTM F2656 M50</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content: Left Vertical Sector Filter + Right Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Vertical Sector Filter Sidebar (Col 1-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

            {/* 1. Search Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider block">
                Search Case Studies
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Client, city, or challenge..."
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1D438A] focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Vertical Sector Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                  Industry Sectors
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {filteredCaseStudies.length} matched
                </span>
              </div>
              <div className="space-y-1 pt-1">
                {[
                  { id: 'All', label: 'All Deployments', count: CASE_STUDIES.length },
                  { id: 'Rapid Transit & Metro', label: 'Rapid Transit & Metro', count: CASE_STUDIES.filter(cs => cs.sector.toLowerCase().includes('transit') || cs.sector.toLowerCase().includes('metro')).length },
                  { id: 'Aviation & Airports', label: 'Aviation & Airports', count: CASE_STUDIES.filter(cs => cs.sector.toLowerCase().includes('aviation') || cs.sector.toLowerCase().includes('airport')).length },
                  { id: 'IT & Corporate Tech Parks', label: 'IT & Corporate Parks', count: CASE_STUDIES.filter(cs => cs.sector.toLowerCase().includes('it') || cs.sector.toLowerCase().includes('corporate')).length },
                  { id: 'Maritime & Seaports', label: 'Maritime & Seaports', count: CASE_STUDIES.filter(cs => cs.sector.toLowerCase().includes('port') || cs.sector.toLowerCase().includes('maritime')).length },
                  { id: 'Industrial Logistics', label: 'Industrial Logistics', count: CASE_STUDIES.filter(cs => cs.sector.toLowerCase().includes('logistics') || cs.sector.toLowerCase().includes('industrial')).length },
                ].map((sec) => {
                  const isActive = selectedSector === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSector(sec.id)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1D438A] text-white font-bold shadow-xs'
                          : 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00a8e8]' : 'bg-slate-300'}`} />
                        <span className="truncate">{sec.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {sec.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Operational Reliability Badge Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Field-Proven Metrics</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span>Pan-India Deployments</span>
                  <span className="font-bold text-[#1D438A]">15,000+</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span>Average MTBF Uptime</span>
                  <span className="font-bold text-emerald-600">99.8%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span>Peak Throughput</span>
                  <span className="font-bold text-slate-800">1,200+ VPH</span>
                </div>
              </div>
            </div>

            {/* 4. Consultation CTA */}
            <div className="bg-gradient-to-br from-[#0a1d37] to-[#1D438A] rounded-xl p-5 text-white space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00a8e8] uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Turnkey EPC Support</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Need tailored civil foundation drawings or traffic simulation for your project tender?
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Turnkey Case Study Consultation') : null}
                  className="w-full py-2 px-3 rounded-lg bg-[#D7282F] hover:bg-[#b81d23] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Request Site Survey
                </button>
                <a
                  href="tel:08010807000"
                  className="w-full py-2 px-3 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Call 080108 07000</span>
                </a>
              </div>
            </div>

          </aside>

          {/* Right Column: Case Studies List (Col 5-12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1d37]">
                  {selectedSector === 'All' ? 'All Infrastructure Case Studies' : selectedSector}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {filteredCaseStudies.length} verified site deployments & engineering evaluations
                </p>
              </div>
              {selectedSector !== 'All' && (
                <button
                  onClick={() => setSelectedSector('All')}
                  className="text-xs font-bold text-[#00a8e8] hover:text-[#1D438A] transition-colors cursor-pointer"
                >
                  Show All Deployments
                </button>
              )}
            </div>

            {filteredCaseStudies.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">No case studies found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query or reset the sector filter.
                </p>
                <button
                  onClick={() => { setSelectedSector('All'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCaseStudies.map((cs) => (
                  <div
                    key={cs.id}
                    className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-[#1D438A] hover:shadow-md transition-all"
                  >
                    <div className="p-6 sm:p-7 space-y-5">
                      
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-md bg-[#1D438A] text-white font-bold font-mono text-xs">
                            {cs.badge}
                          </span>
                          <span className="text-xs font-semibold text-[#00A8E8] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                            {cs.sector}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#D7282F]" />
                          <span className="font-medium">{cs.location}</span>
                        </div>
                      </div>

                      {/* Title & Client */}
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-gradient-logo leading-tight">
                          {cs.title}
                        </h3>
                        <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-[#1D438A]" />
                          <span>Deployment: {cs.client}</span>
                        </div>
                      </div>

                      {/* Challenge & Solution Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed">
                        <div className="p-4 bg-red-50/40 rounded-lg border border-red-100 space-y-1.5">
                          <div className="font-bold text-[#D7282F] uppercase tracking-wider text-xs flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D7282F]" />
                            <span>Operational Challenge</span>
                          </div>
                          <p className="text-slate-700">{cs.challenge}</p>
                        </div>

                        <div className="p-4 bg-blue-50/40 rounded-lg border border-blue-100 space-y-1.5">
                          <div className="font-bold text-[#1D438A] uppercase tracking-wider text-xs flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1D438A]" />
                            <span>Engineered Neptune Solution</span>
                          </div>
                          <p className="text-slate-700">{cs.solution}</p>
                        </div>
                      </div>

                      {/* Quantifiable Results */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Quantified Operational Outcomes</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cs.results.map((r, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600 p-2.5 rounded-md bg-slate-50 border border-slate-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
                        {cs.metrics.map((m) => (
                          <div key={m.label} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{m.label}</div>
                            <div className="text-sm font-extrabold text-[#0a1d37] mt-0.5 font-display">{m.value}</div>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Action Footer */}
                    <div className="p-4 sm:p-5 bg-slate-100/80 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadCaseStudy(cs)}
                          className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-200 text-[#0a1d37] text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#1D438A]" />
                          <span>{downloadSuccessItem === cs.id ? 'Brief Downloaded!' : 'Download Brief'}</span>
                        </button>

                        {onNavigateToCaseStudy && (
                          <button
                            onClick={() => onNavigateToCaseStudy(cs.id)}
                            className="px-3.5 py-2 rounded-lg bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Full Analysis</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`Case Study Inquiry: ${cs.title}`) : null}
                        className="px-4 py-2 rounded-lg bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Deploy Similar Architecture
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Custom Architecture CTA Box */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-[#071526] via-[#0a1d37] to-[#1D438A] text-white p-6 sm:p-8 shadow-md border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
                <span>Turnkey Engineering Consultation</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Need a Custom Site Survey & Turnkey Specification for Your Project?
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Our Noida structural and electrical engineering desk partners with top architectural practices and EPC contractors to produce tailored CAD layouts, civil foundation drawings, and throughput simulations.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Custom Project Engineering Consultation & Site Survey') : null}
                  className="px-5 py-2.5 rounded-lg bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Request Engineering Site Survey
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
