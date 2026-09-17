import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  BookOpen,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  Building2,
  Sparkles,
  Shield,
  Search,
  Tag
} from 'lucide-react';
import { FAQS_LIST, RESOURCES_LIST, BLOG_POSTS, CASE_STUDIES, INDUSTRY_EVENTS } from '../data/companyData';
import { ResourceDocument, BlogPost, CaseStudy, IndustryEvent } from '../types';

interface ResourcesSectionProps {
  initialTab?: string;
  hideDownloadsTab?: boolean;
  onOpenQuoteModal?: (title?: string) => void;
  onNavigateToBlogPost?: (slug: string) => void;
  onNavigateToCaseStudy?: (slugOrId: string) => void;
  onNavigateToEvent?: (slugOrId: string) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  initialTab = 'all',
  hideDownloadsTab = false,
  onOpenQuoteModal,
  onNavigateToBlogPost,
  onNavigateToCaseStudy,
  onNavigateToEvent
}) => {
  const [activeTab, setActiveTab] = useState<string>(hideDownloadsTab && initialTab === 'downloads' ? 'all' : initialTab);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set(['faq-1']));
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

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

  const handleExpandAllFaqs = (faqIds: string[]) => {
    setOpenFaqs(new Set(faqIds));
  };

  const handleCollapseAllFaqs = () => {
    setOpenFaqs(new Set());
  };

  const handleDownloadResource = (item: ResourceDocument) => {
    setDownloadSuccessItem(item.id);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);

    const content = `NEPTUNE AUTOMATIC PVT. LTD. - OFFICIAL RESOURCE DOCUMENT\n\n` +
      `Title: ${item.title}\n` +
      `Category: ${item.category}\n` +
      `Format: ${item.fileType} (${item.fileSize})\n` +
      `Description: ${item.description}\n\n` +
      `TECHNICAL OVERVIEW:\n` +
      `This technical specification and planning guide is issued by Neptune Automatic Pvt. Ltd. & Neptune System Pvt. Ltd. for project consultants, structural architects, and security integrators.\n\n` +
      `ENGINEERING DESK & FACTORY SUPPORT:\n` +
      `Neptune House, A-11, Sector-59, Noida - 201301, U.P., India.\n` +
      `Helpline: +91 8010 807 000 | Email: connect@neptuneautomatic.com\n` +
      `Website: https://www.neptuneautomatic.com/`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Neptune_Automatic_${item.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadCaseStudy = (cs: CaseStudy) => {
    setDownloadSuccessItem(cs.id);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);

    const content = `NEPTUNE AUTOMATIC PVT. LTD. - ENTERPRISE CASE STUDY BRIEF\n\n` +
      `Project Title: ${cs.title}\n` +
      `Industry: ${cs.client}\n` +
      `Sector: ${cs.sector}\n` +
      `Location: ${cs.location}\n\n` +
      `OPERATIONAL CHALLENGE:\n${cs.challenge}\n\n` +
      `ENGINEERED SOLUTION:\n${cs.solution}\n\n` +
      `KEY OUTCOMES & METRICS:\n` +
      cs.results.map(r => `• ${r}`).join('\n') + '\n\n' +
      `VERIFIED METRICS:\n` +
      cs.metrics.map(m => `${m.label}: ${m.value}`).join(' | ') + '\n\n' +
      `ISSUED BY:\nNeptune Automatic Pvt. Ltd. & Neptune System Pvt. Ltd.\n` +
      `Neptune House, A-11, Sector-59, Noida - 201301, U.P., India.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Neptune_Case_Study_${cs.client.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const allTabs = [
    { id: 'all', label: 'All Resources', icon: Layers },
    { id: 'downloads', label: 'Datasheets & CAD', icon: Download, count: RESOURCES_LIST.length },
    { id: 'casestudies', label: 'Case Studies', icon: FileText, count: CASE_STUDIES.length },
    { id: 'blog', label: 'Blog & Articles', icon: BookOpen, count: BLOG_POSTS.length },
    { id: 'events', label: 'Expos & Events', icon: Calendar, count: INDUSTRY_EVENTS.length },
    { id: 'faqs', label: 'Technical FAQs', icon: HelpCircle, count: FAQS_LIST.length },
  ];

  const tabs = hideDownloadsTab ? allTabs.filter(t => t.id !== 'downloads') : allTabs;

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
      selectedFaqCategory === 'All' || 
      (selectedFaqCategory === 'Technical & General' 
        ? (faq.category === 'Technical' || faq.category === 'General')
        : faq.category === selectedFaqCategory);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="resources-section" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
            <span className="w-2 h-2 rounded-full bg-[#D7282F]" />
            <span className="tracking-wider uppercase">ENGINEERING KNOWLEDGE HUB</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Technical Resources, Case Studies & Events
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Verified architectural CAD drawings, ASTM crash test whitepapers, enterprise case studies, industry blog insights, and 40 technical engineering FAQs.
          </p>
          <div className="flex justify-center pt-0.5">
            <div className="flex h-[2.5px] w-14 rounded-full overflow-hidden">
              <div className="w-[64%] bg-[#1D438A]" />
              <div className="w-[36%] bg-[#D7282F]" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Hub - Responsive & Never Clipped */}
        <div className="space-y-4 border-b border-slate-200 pb-5">
          
          {/* Tier 1: Responsive Tabs Bar (Wraps Gracefully, Full Text Displayed) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1D438A] text-white shadow-sm border border-[#1D438A]'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 hover:text-[#0a1d37] border border-slate-200/80'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#3DA4ED]' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-xs font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tier 2: Search Input & Context Information Strip */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'faqs' 
                    ? "Search 40 FAQs by keyword (e.g. BLDC, ASTM, FASTag, EFO, loop, drainage, AMC)..."
                    : activeTab === 'downloads'
                    ? "Filter datasheets and CAD drawings by model or category..."
                    : activeTab === 'casestudies'
                    ? "Search case studies by client, sector, or city..."
                    : activeTab === 'blog'
                    ? "Search engineering blog articles and guides..."
                    : activeTab === 'events'
                    ? "Filter industry expos and factory open days..."
                    : "Search all engineering resources, datasheets, case studies, topics..."
                }
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1D438A] focus:bg-white shadow-2xs transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 justify-between sm:justify-end">
              <span className="font-medium">
                {activeTab === 'faqs' && `${filteredFaqs.length} of ${FAQS_LIST.length} FAQs matching`}
                {activeTab === 'downloads' && `${RESOURCES_LIST.length} Technical Documents`}
                {activeTab === 'casestudies' && `${CASE_STUDIES.length} Enterprise Deployments`}
                {activeTab === 'blog' && `${BLOG_POSTS.length} Technical Articles`}
                {activeTab === 'events' && `${INDUSTRY_EVENTS.length} Expos & Conferences`}
                {activeTab === 'all' && `All 6 Engineering Pillars`}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1D438A] bg-blue-50 px-2 py-0.5 rounded-xs border border-blue-100">
                <Sparkles className="w-3 h-3 text-[#D7282F]" />
                <span>Sector-59 Noida Campus</span>
              </span>
            </div>
          </div>

        </div>

        {/* TAB 1: ALL RESOURCES (CURATED OVERVIEW) */}
        {activeTab === 'all' && (
          <div className="space-y-14">
            
            {/* 1. Featured Case Studies Snapshot */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0a1d37] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D7282F]" />
                    <span>Featured Enterprise Case Studies</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Real-world results across transit, airport, IT park, and port perimeters.</p>
                </div>
                <button
                  onClick={() => setActiveTab('casestudies')}
                  className="text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CASE_STUDIES.slice(0, 2).map((cs) => (
                  <div 
                    key={cs.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-[#1D438A] shadow-xs transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-xs bg-[#1D438A] text-white font-bold font-mono text-[10px]">
                          {cs.badge}
                        </span>
                        <span className="text-slate-500 font-medium text-[11px]">{cs.location}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#0a1d37]">
                        {cs.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {cs.challenge}
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                        {cs.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="p-2 rounded-xs bg-white border border-slate-200">
                            <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                            <div className="text-xs font-bold text-[#0a1d37]">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => handleDownloadCaseStudy(cs)}
                        className="flex-1 py-2 px-3 rounded-xs bg-white hover:bg-slate-100 text-[#0a1d37] border border-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#1D438A]" />
                        <span>Brief Notes</span>
                      </button>
                      <button
                        onClick={() => onNavigateToCaseStudy ? onNavigateToCaseStudy(cs.id) : setActiveTab('casestudies')}
                        className="py-2 px-3 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Full Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Top Downloads Snapshot (Hidden on homepage if hideDownloadsTab is true) */}
            {!hideDownloadsTab && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0a1d37] flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#258BD7]" />
                      <span>Technical Datasheets & Engineering Guides</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Tender compliance specs and CAD layouts for civil architects.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('downloads')}
                    className="text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Datasheets</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {RESOURCES_LIST.slice(0, 3).map((resource) => (
                    <div
                      key={resource.id}
                      className="rounded-sm bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-[#258BD7] shadow-2xs transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="px-2 py-0.5 rounded-xs bg-white text-[#0a1d37] font-bold border border-slate-200 text-[10px]">
                            {resource.category}
                          </span>
                          <span className="font-mono text-slate-500 text-[11px]">
                            {resource.fileSize}
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-[#0a1d37]">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDownloadResource(resource)}
                        className="w-full py-2 px-3 rounded-xs bg-white hover:bg-[#0a1d37] text-[#0a1d37] hover:text-white text-xs font-bold border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#258BD7]" />
                        <span>Download {resource.fileType}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Engineering Blog Snapshot */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0a1d37] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#1D438A]" />
                    <span>Engineering Blog & Industry Articles</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Deep-dive technical comparisons, FASTag guides, and crash test physics.</p>
                </div>
                <button
                  onClick={() => setActiveTab('blog')}
                  className="text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore All Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#1D438A] shadow-2xs group transition-colors"
                  >
                    <div 
                      onClick={() => onNavigateToBlogPost?.(post.slug)}
                      className="relative h-44 bg-slate-200 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-xs bg-[#0a1d37]/90 text-white text-[10px] font-bold font-mono">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-1.5">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 
                          onClick={() => onNavigateToBlogPost?.(post.slug)}
                          className="font-display text-sm font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug cursor-pointer"
                        >
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <button
                        onClick={() => onNavigateToBlogPost?.(post.slug)}
                        className="pt-2 text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Upcoming Industry Events & Expos */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0a1d37] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#D7282F]" />
                    <span>Trade Shows, Expos & Factory Open Days</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Meet Neptune engineers in person at premier physical security summits.</p>
                </div>
                <button
                  onClick={() => setActiveTab('events')}
                  className="text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {INDUSTRY_EVENTS.slice(0, 2).map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-[#1D438A] shadow-2xs transition-colors"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                        <span className="px-2 py-0.5 rounded-xs bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-[10px] uppercase font-mono">
                          {ev.status} • {ev.eventType}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#1D438A]">{ev.date}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#0a1d37]">
                        {ev.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#D7282F] shrink-0" />
                        <span>{ev.location} • {ev.boothOrVenue}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {ev.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`Expo Meeting: ${ev.title}`) : setActiveTab('events')}
                        className="py-2 px-4 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Book Booth Meeting
                      </button>
                      <button
                        onClick={() => onNavigateToEvent ? onNavigateToEvent(ev.id) : setActiveTab('events')}
                        className="py-2 px-3 rounded-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Details & Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Engineering FAQs Snapshot (40 Technical FAQs) */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0a1d37] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#258BD7]" />
                    <span>Frequently Asked Technical Questions (40 Verified Answers)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Engineering clarity on brushless DC motors, ASTM crash ratings, shallow mount depths, and FASTag integration.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('faqs');
                    window.scrollTo({ top: document.getElementById('resources-section')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <span>Explore All 40 Technical FAQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS_LIST.slice(0, 4).map((faq, i) => (
                  <div
                    key={faq.id}
                    onClick={() => {
                      setActiveTab('faqs');
                      setOpenFaqs(new Set([faq.id]));
                      window.scrollTo({ top: document.getElementById('resources-section')?.offsetTop || 0, behavior: 'smooth' });
                    }}
                    className="p-5 rounded-sm bg-slate-50 border border-slate-200 hover:border-[#1D438A] cursor-pointer transition-all shadow-2xs flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-white text-[#1D438A] border border-slate-200">
                          {faq.category}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 font-bold">
                          #{String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                    <div className="text-[11px] font-bold text-[#1D438A] group-hover:text-[#D7282F] flex items-center gap-1 pt-1">
                      <span>Read full technical answer</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TECHNICAL DATASHEETS & CAD */}
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0a1d37]">
                  Product Catalogues, Datasheets & CAD Drawings
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Official engineering documentation approved by Neptune Automatic Pvt. Ltd. & Neptune System Pvt. Ltd.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESOURCES_LIST
                .filter(r => !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((resource) => (
                  <div
                    key={resource.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 p-5 flex flex-col justify-between space-y-4 group hover:border-[#1D438A] transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2.5 py-0.5 rounded-xs bg-white text-[#0a1d37] font-bold border border-slate-200">
                          {resource.category}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px]">
                          {resource.fileType} • {resource.fileSize}
                        </span>
                      </div>

                      <h4 className="font-display text-base font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors">
                        {resource.title}
                      </h4>

                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>

                    <div>
                      {downloadSuccessItem === resource.id ? (
                        <div className="py-2 text-center text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5 bg-emerald-50 rounded-xs border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>File Downloaded!</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownloadResource(resource)}
                          className="w-full py-2.5 px-4 rounded-xs bg-white hover:bg-[#1D438A] text-[#1D438A] hover:text-white text-xs font-bold border border-slate-300 hover:border-[#1D438A] flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#258BD7]" />
                          <span>Download {resource.fileType}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENTERPRISE CASE STUDIES */}
        {activeTab === 'casestudies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0a1d37]">
                  Mission-Critical Deployment Case Studies
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How Indian transit authorities, airport operators, and corporations protect perimeters with Neptune automation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CASE_STUDIES
                .filter(cs => !searchQuery || cs.title.toLowerCase().includes(searchQuery.toLowerCase()) || cs.client.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((cs) => (
                  <div
                    key={cs.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 overflow-hidden shadow-xs hover:border-[#1D438A] transition-colors flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-7 space-y-5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-xs bg-[#1D438A] text-white font-mono text-xs font-bold">
                          {cs.badge}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{cs.location}</span>
                      </div>

                      <div>
                        <h4 className="font-display text-lg sm:text-xl font-bold text-[#0a1d37] leading-tight">
                          {cs.title}
                        </h4>
                        <div className="mt-1 text-xs font-bold text-[#258BD7]">
                          Industry: {cs.client} • {cs.sector}
                        </div>
                      </div>

                      <div className="space-y-3 text-xs leading-relaxed">
                        <div className="p-3 bg-white rounded-xs border border-slate-200">
                          <strong className="text-[#D7282F] block mb-1">Operational Challenge:</strong>
                          <span className="text-slate-600">{cs.challenge}</span>
                        </div>

                        <div className="p-3 bg-white rounded-xs border border-slate-200">
                          <strong className="text-[#1D438A] block mb-1">Engineered Neptune Solution:</strong>
                          <span className="text-slate-600">{cs.solution}</span>
                        </div>
                      </div>

                      {/* Quantifiable Results */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Key Operational Results:
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {cs.results.map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
                        {cs.metrics.map((m) => (
                          <div key={m.label} className="p-2 rounded-xs bg-white border border-slate-200 text-center">
                            <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                            <div className="text-xs sm:text-sm font-bold text-[#0a1d37] mt-0.5">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => handleDownloadCaseStudy(cs)}
                        className="px-4 py-2 rounded-xs bg-white hover:bg-slate-200 text-[#0a1d37] text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#1D438A]" />
                        <span>{downloadSuccessItem === cs.id ? 'Brief Downloaded!' : 'Download Case Study'}</span>
                      </button>

                      <button
                        onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`Case Study Inquiry: ${cs.title}`) : null}
                        className="px-4 py-2 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Deploy Similar Architecture
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: BLOG & ENGINEERING ARTICLES */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0a1d37]">
                  Engineering Articles, Security Whitepapers & Insights
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thought leadership and technical guides penned by Neptune automation specialists.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS
                .filter(post => !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((post) => (
                  <div
                    key={post.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#1D438A] shadow-xs group transition-colors"
                  >
                    <div 
                      onClick={() => onNavigateToBlogPost?.(post.slug)}
                      className="relative h-48 bg-slate-200 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-xs bg-[#0a1d37]/90 text-white text-[10px] font-bold font-mono">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>

                        <h4 
                          onClick={() => onNavigateToBlogPost?.(post.slug)}
                          className="font-display text-base font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug cursor-pointer"
                        >
                          {post.title}
                        </h4>

                        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <button
                          onClick={() => onNavigateToBlogPost?.(post.slug)}
                          className="text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Read Complete Analysis</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">By Neptune Engineering</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 5: INDUSTRY EXPOS & EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0a1d37]">
                  Upcoming Expos, Trade Fairs & Factory Workshops
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect face-to-face with the founders, mechanical engineers, and software architects of Neptune Automatic.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INDUSTRY_EVENTS
                .filter(ev => !searchQuery || ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || ev.location.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-sm bg-slate-50 border border-slate-200 p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-[#1D438A] shadow-xs transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-xs bg-blue-50 border border-blue-200 text-[#1D438A] font-bold text-xs font-mono">
                          {ev.badge}
                        </span>
                        <span className="px-2 py-0.5 rounded-xs bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-[10px] uppercase font-mono">
                          {ev.status}
                        </span>
                      </div>

                      <h4 className="font-display text-lg font-bold text-[#0a1d37] leading-snug">
                        {ev.title}
                      </h4>

                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2 font-mono font-semibold text-[#1D438A]">
                          <Calendar className="w-3.5 h-3.5 text-[#258BD7]" />
                          <span>{ev.date}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D7282F] shrink-0 mt-0.5" />
                          <span>{ev.location}</span>
                        </div>
                        {ev.boothOrVenue && (
                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{ev.boothOrVenue}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {ev.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`Booth Meeting / VIP Invitation: ${ev.title}`) : null}
                        className="px-5 py-2.5 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Reserve Booth Meeting / VIP Pass
                      </button>

                      <a
                        href="tel:+918010807000"
                        className="px-4 py-2.5 rounded-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>Call Event Coordinator</span>
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 6: TECHNICAL FAQS (40 DETAILED ENGINEERING FAQS) */}
        {activeTab === 'faqs' && (
          <div className="space-y-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A] mb-2">
                  <HelpCircle className="w-3.5 h-3.5 text-[#258BD7]" />
                  <span>40 VERIFIED TECHNICAL ANSWERS</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a1d37] tracking-tight">
                  Technical & Operational Engineering FAQs
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Clear engineering answers on motor duty cycles, ASTM crash ratings, shallow mount depths, FASTag NPCI protocols, and Make in India specifications.
                </p>
              </div>

              {/* Action Controls: Expand / Collapse All */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleExpandAllFaqs(filteredFaqs.map(f => f.id))}
                  className="px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
                >
                  Expand All ({filteredFaqs.length})
                </button>
                <button
                  onClick={handleCollapseAllFaqs}
                  className="px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Sub-Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {FAQ_FILTER_PILLS.map((pill) => {
                const isSelected = selectedFaqCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setSelectedFaqCategory(pill.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0a1d37] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0a1d37] border border-slate-200'
                    }`}
                  >
                    <span>{pill.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-500 border border-slate-200'
                    }`}>
                      {pill.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* FAQs Accordion List */}
            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-sm border border-slate-200 space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="text-base font-bold text-[#0a1d37]">No Matching Engineering FAQs Found</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We couldn't find any FAQs matching "{searchQuery}". Try searching for terms like "motor", "ASTM", "FASTag", "drainage", "arm", or "EFO".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedFaqCategory('All'); }}
                  className="px-4 py-2 rounded-xs bg-[#1D438A] text-white text-xs font-bold cursor-pointer hover:bg-[#15346D]"
                >
                  Clear Filters & Show All 40 FAQs
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaqs.has(faq.id);
                  const faqNum = (index + 1).toString().padStart(2, '0');
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-sm border transition-all duration-200 overflow-hidden shadow-2xs ${
                        isOpen 
                          ? 'bg-white border-[#1D438A]/50 shadow-xs' 
                          : 'bg-slate-50 hover:bg-white border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-xs shrink-0 ${
                            isOpen 
                              ? 'bg-[#1D438A] text-white' 
                              : 'bg-white text-slate-500 border border-slate-200'
                          }`}>
                            #{faqNum}
                          </span>
                          
                          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-xs bg-slate-100 text-[#1D438A] border border-slate-200 hidden md:inline-block shrink-0">
                            {faq.category}
                          </span>

                          <span className={`font-display text-sm sm:text-base font-bold leading-snug ${
                            isOpen ? 'text-[#1D438A]' : 'text-[#0a1d37]'
                          }`}>
                            {faq.question}
                          </span>
                        </div>

                        <div className="shrink-0 pt-0.5 sm:pt-0">
                          {isOpen ? (
                            <div className="w-6 h-6 rounded-full bg-blue-50 text-[#1D438A] flex items-center justify-center border border-blue-200">
                              <ChevronUp className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200">
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-white">
                          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
                            {faq.answer}
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <span className="text-[11px] text-slate-500 font-mono">
                              Category: <strong className="text-slate-700">{faq.category}</strong> • Verified by Neptune Technical Desk
                            </span>
                            <button
                              onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`Technical Consultation: ${faq.question}`) : null}
                              className="text-[11px] font-bold text-[#1D438A] hover:text-[#D7282F] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Discuss Technical Specs for Your Site</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Support Banner */}
            <div className="rounded-sm bg-gradient-to-r from-slate-900 to-[#0a1d37] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs text-[#3DA4ED] font-mono font-bold uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-[#D7282F]" />
                  <span>Direct Noida Engineering Consultation</span>
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Have a specific tender or architectural query not listed here?
                </h4>
                <p className="text-xs text-sm text-slate-300 max-w-xl">
                  Connect directly with our physical access engineers for site surveys, civil trenching drawings, and custom control board wiring diagrams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Custom Technical Tender Inquiry') : null}
                  className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  Consult an Engineer
                </button>
                <a
                  href="tel:+918010807000"
                  className="w-full sm:w-auto px-5 py-3 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold text-center transition-colors"
                >
                  +91 8010 807 000
                </a>
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
};

