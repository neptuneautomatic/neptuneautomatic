import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  Search, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase
} from 'lucide-react';
import { RESOURCES_LIST } from '../data/companyData';
import { ResourceDocument } from '../types';

interface ResourcesPageProps {
  onOpenQuoteModal?: (title?: string) => void;
  onNavigateHome?: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onOpenQuoteModal,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Gated Access State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isGateModalOpen, setIsGateModalOpen] = useState<boolean>(false);
  const [pendingResource, setPendingResource] = useState<ResourceDocument | null>(null);
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: 'Architect / Consultant'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const unlocked = localStorage.getItem('neptune_library_unlocked');
      if (unlocked === 'true') {
        setIsUnlocked(true);
      }
    } catch (e) {
      console.warn('localStorage access error:', e);
    }
  }, []);

  const categories = ['All', 'Boom Barriers', 'Bollards', 'Road Blockers', 'Parking Systems', 'Access Control', 'Accessories'];

  const filteredResources = RESOURCES_LIST.filter(res => {
    const matchesCategory = selectedCategory === 'All' || res.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      res.title.toLowerCase().includes(q) || 
      res.category.toLowerCase().includes(q) || 
      res.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const triggerDirectDownload = (item: ResourceDocument) => {
    setDownloadSuccessItem(item.id);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);

    const content = `================================================================================\n` +
      `NEPTUNE AUTOMATIC PVT. LTD. - OFFICIAL TECHNICAL DOCUMENTATION\n` +
      `Neptune House, A-11, Sector-59, Noida - 201301, Uttar Pradesh, India\n` +
      `Helpline: +91 8010 807 000 | Email: connect@neptuneautomatic.com\n` +
      `Website: https://www.neptuneautomatic.com/\n` +
      `================================================================================\n\n` +
      `DOCUMENT TITLE: ${item.title}\n` +
      `ENGINEERING CATEGORY: ${item.category}\n` +
      `FORMAT: ${item.fileType} (${item.fileSize})\n` +
      `DESCRIPTION: ${item.description}\n\n` +
      `SPECIFICATION SUMMARY & ARCHITECTURAL GUIDELINES:\n` +
      `• Engineered to Indian IRC / NHAI and International ASTM F2656 / CE standards.\n` +
      `• Continuous 100% duty cycle rating with heavy-duty IP54/IP67 weatherproofing.\n` +
      `• Designed for direct integration with FASTag, RFID, ANPR, and Building Management Systems (BMS).\n\n` +
      `CONSULTANT TECHNICAL DESK:\n` +
      `For 3D BIM/Revit models, AutoCAD DWG layouts, or tender-ready CSI 3-part specifications,\n` +
      `contact our Senior Engineering Team directly at connect@neptuneautomatic.com or call +91 8010 807 000.\n\n` +
      `(c) Neptune Automatic Pvt. Ltd. All rights reserved.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Neptune_${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.${item.fileType.toLowerCase() === 'cad' ? 'dwg.txt' : 'pdf.txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadClick = (item: ResourceDocument) => {
    if (isUnlocked) {
      triggerDirectDownload(item);
    } else {
      setPendingResource(item);
      setIsGateModalOpen(true);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid work/official email address.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = 'Please provide a valid mobile or WhatsApp number.';
    }
    if (!formData.organization.trim()) {
      errs.organization = 'Please specify your company or organization.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUnlocked(true);
      try {
        localStorage.setItem('neptune_library_unlocked', 'true');
        localStorage.setItem('neptune_lead_info', JSON.stringify(formData));
      } catch (err) {
        console.warn('localStorage save failed:', err);
      }
      setIsGateModalOpen(false);

      if (pendingResource) {
        triggerDirectDownload(pendingResource);
        setPendingResource(null);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Hero / Header Section */}
      <section className="relative pt-28 pb-14 sm:pb-18 bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb */}
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
            <span className="text-[#1D438A] font-bold">Technical Resources</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
              <Layers className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span className="tracking-wider uppercase font-mono">CERTIFIED ARCHITECTURAL & TENDER ASSETS</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-logo leading-tight">
              Technical Resources & Downloadable Assets
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Official engineering datasheets, AutoCAD DWG foundation drawings, ASTM crash rating certificates, wiring schematics, and tender compliance documents prepared by Neptune Automatic.
            </p>
          </div>

          {/* Access Status Banner */}
          <div className="pt-2">
            {isUnlocked ? (
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 border border-emerald-300 rounded-sm text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Consultant Access Active • Direct 1-Click Downloads Enabled</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50 border border-blue-200 rounded-sm text-xs font-medium text-slate-700">
                <Lock className="w-4 h-4 text-[#1D438A]" />
                <span>Gated Library: Fill quick consultant verification form once to unlock all technical assets.</span>
                <button
                  onClick={() => setIsGateModalOpen(true)}
                  className="font-bold text-[#1D438A] underline hover:text-[#D7282F] ml-1 cursor-pointer"
                >
                  Unlock All Now
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Main Content: Left Vertical Category Filter + Right Documents Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Vertical Category Filter Sidebar (Col 1-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

            {/* 1. Search Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider block">
                Search Technical Assets
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by title, model, or type..."
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

            {/* 2. Vertical Category Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                  Product Disciplines
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {filteredResources.length} matched
                </span>
              </div>
              <div className="space-y-1 pt-1">
                {[
                  { id: 'All', label: 'All Documents', count: RESOURCES_LIST.length },
                  { id: 'Boom Barriers', label: 'Automatic Boom Barriers', count: RESOURCES_LIST.filter(r => r.category.toLowerCase().includes('boom barrier')).length },
                  { id: 'Bollards', label: 'Automatic & Fixed Bollards', count: RESOURCES_LIST.filter(r => r.category.toLowerCase().includes('bollard')).length },
                  { id: 'Road Blockers', label: 'Heavy Road Blockers', count: RESOURCES_LIST.filter(r => r.category.toLowerCase().includes('blocker')).length },
                  { id: 'Parking Systems', label: 'Smart Parking & FASTag', count: RESOURCES_LIST.filter(r => r.category.toLowerCase().includes('parking')).length },
                  { id: 'Access Control', label: 'Pedestrian Turnstiles', count: RESOURCES_LIST.filter(r => r.category.toLowerCase().includes('access') || r.category.toLowerCase().includes('turnstile')).length },
                  { id: 'Accessories', label: 'Safety Accessories & Loops', count: RESOURCES_LIST.filter(r => r.category.toLowerCase().includes('accessories') || r.category.toLowerCase().includes('safety')).length },
                ].map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1D438A] text-white font-bold shadow-xs'
                          : 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00a8e8]' : 'bg-slate-300'}`} />
                        <span className="truncate">{cat.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Gated Status Widget */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                {isUnlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Lock className="w-4 h-4 text-[#D7282F]" />
                )}
                <span>{isUnlocked ? 'Consultant Pass Active' : 'Gated Engineering Library'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUnlocked 
                  ? 'Your consultant verification is active for this session. Direct 1-click downloads enabled for all CAD & PDF files.'
                  : 'Complete a 30-second consultant verification once to unlock all technical drawings and tender specifications.'}
              </p>
              {!isUnlocked && (
                <button
                  onClick={() => setIsGateModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Technical Library</span>
                </button>
              )}
            </div>

            {/* 4. Consultant CAD Service Callout */}
            <div className="bg-gradient-to-br from-[#0a1d37] to-[#1D438A] rounded-xl p-5 text-white space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00a8e8] uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Need Custom CAD / DWG?</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Our drafting team in Sector-59 Noida creates bespoke DWG foundation drawings and lane wiring schematics for civil contractors.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Custom CAD Specification & BIM Request') : null}
                  className="w-full py-2 px-3 rounded-lg bg-[#D7282F] hover:bg-[#b81d23] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Request Custom CAD / Spec
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

          {/* Right Column: Documents Grid (Col 5-12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1d37]">
                  {selectedCategory === 'All' ? 'All Technical Documents' : selectedCategory}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {filteredResources.length} verified technical datasheets & CAD specifications
                </p>
              </div>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-bold text-[#00a8e8] hover:text-[#1D438A] transition-colors cursor-pointer"
                >
                  Show All Documents
                </button>
              )}
            </div>

            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">No documents matched your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query or reset the product category filter.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredResources.map((res) => (
                  <div
                    key={res.id}
                    className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-[#1D438A] shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1D438A] font-bold border border-blue-200 text-[10px] font-mono">
                          {res.category}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px] font-medium">
                          {res.fileType} • {res.fileSize}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 leading-snug text-sm">
                        {res.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {res.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleDownloadClick(res)}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isUnlocked
                            ? 'bg-[#1D438A] hover:bg-[#15346D] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                        }`}
                      >
                        {isUnlocked ? (
                          <>
                            <Download className="w-3.5 h-3.5 text-[#00A8E8]" />
                            <span>{downloadSuccessItem === res.id ? 'Downloaded Successfully!' : `Download ${res.fileType}`}</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-[#D7282F]" />
                            <span>Unlock & Download (Gated)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Custom CAD CTA */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-[#071526] via-[#0a1d37] to-[#1D438A] text-white p-6 sm:p-8 shadow-md border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4 text-[#00A8E8]" />
                <span>Consultant Design Desk</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Need Custom 3D BIM Models or Tender-Ready CSI Specifications?
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Our engineering drafting team provides bespoke AutoCAD DWG layouts, foundation reinforcement details, and single-line electrical schematics customized to your project's lane dimensions.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Custom CAD Specification & BIM Request') : null}
                  className="px-5 py-2.5 rounded-lg bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Request Custom CAD / Tender Specs
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Gated Lead Verification Modal */}
      {isGateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#0a1d37] text-white p-6 relative">
              <button
                onClick={() => {
                  setIsGateModalOpen(false);
                  setPendingResource(null);
                }}
                className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider font-mono mb-2">
                <Lock className="w-3.5 h-3.5 text-[#D7282F]" />
                <span>Consultant Gated Verification</span>
              </div>

              <h2 className="font-display text-xl font-bold text-white">
                Unlock Neptune Technical Library
              </h2>

              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                Provide your official verification details once to unlock instant downloads for all datasheets, CAD schematics, and crash test certificates across our entire library.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleGateSubmit} className="p-6 space-y-4">
              {pendingResource && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-sm text-xs text-[#1D438A] flex items-center gap-2">
                  <FileText className="w-4 h-4 shrink-0 text-[#1D438A]" />
                  <span>
                    Pending Download: <strong>{pendingResource.title}</strong>
                  </span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Er. Rajesh Kumar"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-[#1D438A]"
                  />
                </div>
                {errors.name && <p className="text-red-600 text-[11px] mt-1">{errors.name}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajesh@company.com"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-[#1D438A]"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-[#1D438A]"
                    />
                  </div>
                  {errors.phone && <p className="text-red-600 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Organization & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Company *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. L&T Infrastructure / DMRC"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-[#1D438A]"
                    />
                  </div>
                  {errors.organization && <p className="text-red-600 text-[11px] mt-1">{errors.organization}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Professional Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-[#1D438A] bg-white"
                    >
                      <option value="Architect / Consultant">Architect / Consultant</option>
                      <option value="EPC Contractor / Builder">EPC Contractor / Builder</option>
                      <option value="Security System Integrator">Security System Integrator</option>
                      <option value="Facility / Estate Manager">Facility / Estate Manager</option>
                      <option value="Government / PSU Officer">Government / PSU Officer</option>
                      <option value="Other">Other Enterprise User</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-sm bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Verifying & Unlocking...</span>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 text-[#00A8E8]" />
                      <span>Verify & Unlock Complete Library</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  🔒 Information is kept strictly confidential for direct engineering support from Neptune.
                </p>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
