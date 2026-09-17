import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ChevronRight, 
  Phone, 
  Sparkles, 
  ShieldCheck,
  X
} from 'lucide-react';
import { FAQS_LIST } from '../data/companyData';

interface FaqsPageProps {
  onOpenQuoteModal?: (title?: string) => void;
  onNavigateHome?: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({
  onOpenQuoteModal,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set(['faq-1', 'faq-2']));

  const FAQ_FILTER_PILLS = [
    { id: 'All', label: 'All Topics', count: FAQS_LIST.length },
    { id: 'Boom Barriers', label: 'Boom Barriers', count: FAQS_LIST.filter(f => f.category === 'Boom Barriers').length },
    { id: 'Bollards & Blockers', label: 'Bollards & Blockers', count: FAQS_LIST.filter(f => f.category === 'Bollards & Blockers').length },
    { id: 'Parking Systems', label: 'Parking & FASTag', count: FAQS_LIST.filter(f => f.category === 'Parking Systems').length },
    { id: 'Turnstiles & Gates', label: 'Turnstiles & Speed Gates', count: FAQS_LIST.filter(f => f.category === 'Turnstiles & Gates').length },
    { id: 'Safety & Compliance', label: 'Safety & Tyre Killers', count: FAQS_LIST.filter(f => f.category === 'Safety & Compliance').length },
    { id: 'Technical & General', label: 'Manufacturing & General', count: FAQS_LIST.filter(f => f.category === 'Technical' || f.category === 'General').length },
  ];

  const filteredFaqs = FAQS_LIST.filter(faq => {
    const matchesCategory = 
      selectedCategory === 'All' || 
      (selectedCategory === 'Technical & General' 
        ? (faq.category === 'Technical' || faq.category === 'General')
        : faq.category === selectedCategory);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqs(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenFaqs(new Set(filteredFaqs.map(f => f.id)));
  };

  const handleCollapseAll = () => {
    setOpenFaqs(new Set());
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
            <span className="text-[#1D438A] font-bold">Technical FAQs</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
              <HelpCircle className="w-3.5 h-3.5 text-[#00A8E8]" />
              <span className="tracking-wider uppercase font-mono">40 VERIFIED ENGINEERING ANSWERS</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-logo leading-tight">
              Technical & Operational Engineering FAQs
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              In-depth engineering answers on brushless DC motor duty cycles, ASTM F2656 M30/M50 crash ratings, subterranean shallow mount depths, NPCI FASTag integration, and Make in India specifications.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Curated Technical Answers</div>
              <div className="text-base sm:text-lg font-extrabold text-[#1D438A] font-display">{FAQS_LIST.length} Questions</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Core Engineering Disciplines</div>
              <div className="text-base sm:text-lg font-extrabold text-[#D7282F] font-display">6 Sectors</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Compliance Standards</div>
              <div className="text-base sm:text-lg font-extrabold text-slate-800 font-display">ASTM • ISO • CE</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Engineering Helpline</div>
              <div className="text-base sm:text-lg font-extrabold text-emerald-700 font-display">24/7 Desk</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content: Left Vertical Filter Sidebar + Right FAQs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Vertical Filter Rail (Col 1-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

            {/* 1. Search Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider block">
                Search Technical FAQs
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="BLDC, ASTM, FASTag, loop..."
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

            {/* 2. Vertical Category Discipline Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                  Technical Topics
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {filteredFaqs.length} matched
                </span>
              </div>
              <div className="space-y-1 pt-1">
                {FAQ_FILTER_PILLS.map((pill) => {
                  const isActive = selectedCategory === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setSelectedCategory(pill.id)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1D438A] text-white font-bold shadow-xs'
                          : 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00a8e8]' : 'bg-slate-300'}`} />
                        <span className="truncate">{pill.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {pill.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Bulk Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider block">
                Accordion Controls
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleExpandAll}
                  className="w-full py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1D438A] text-xs font-bold transition-colors cursor-pointer border border-blue-200"
                >
                  Expand All
                </button>
                <button
                  onClick={handleCollapseAll}
                  className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer border border-slate-200"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* 4. Engineering Helpline Callout */}
            <div className="bg-gradient-to-br from-[#0a1d37] to-[#1D438A] rounded-xl p-5 text-white space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00a8e8] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Need Expert Consultation?</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Our Noida engineering desk provides direct tender specification clarifications and foundation sizing.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Technical FAQ Inquiry') : null}
                  className="w-full py-2 px-3 rounded-lg bg-[#D7282F] hover:bg-[#b81d23] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Ask Chief Engineer
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

          {/* Right Column: FAQs List (Col 5-12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1d37]">
                  {selectedCategory === 'All' ? 'All Technical Answers' : selectedCategory}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {filteredFaqs.length} verified answers from Neptune technical specialists
                </p>
              </div>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-bold text-[#00a8e8] hover:text-[#1D438A] transition-colors cursor-pointer"
                >
                  Show All Topics
                </button>
              )}
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">No FAQs matched your search</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try a different search term or select another category from the sidebar.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqs.has(faq.id);
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isOpen 
                          ? 'border-[#1D438A]/40 bg-white shadow-xs' 
                          : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full py-4 px-5 text-left flex items-start justify-between gap-4 font-bold text-sm text-[#0a1d37] hover:text-[#1D438A] transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="space-y-1 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#1D438A] text-[10px] font-mono font-bold uppercase tracking-wider border border-blue-100">
                              {faq.category}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              #{faq.id}
                            </span>
                          </div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {faq.question}
                          </div>
                        </div>

                        <div className={`p-1.5 rounded-full shrink-0 mt-1 transition-transform duration-200 ${
                          isOpen ? 'bg-[#1D438A] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 space-y-3 bg-slate-50/30">
                          <p>{faq.answer}</p>
                          <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px] font-mono border-t border-slate-100">
                            <span>Ref ID: {faq.id} • Certified Engineering Response</span>
                            <span className="text-[#1D438A] font-semibold">Make in India Compliant</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Help Desk CTA */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-[#071526] via-[#0a1d37] to-[#1D438A] text-white p-6 sm:p-8 shadow-md border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-[#D7282F]" />
                <span>Dedicated Consultation Support</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Have a Specific Project Requirement Not Covered Here?
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Our Senior Chief Structural and Embedded Hardware Engineers in Sector-59 Noida provide bespoke technical guidance, tender specification drafts, and civil foundation calculations directly to consultants and government agencies.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Custom Technical Query / Project Specification') : null}
                  className="px-5 py-2.5 rounded-lg bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Submit Technical RFP / Query
                </button>
                <a
                  href="tel:+918010807000"
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#00A8E8]" />
                  <span>Call Helpline: +91 8010 807 000</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
