import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  ChevronRight,
  X
} from 'lucide-react';
import { INDUSTRY_EVENTS } from '../data/companyData';
import { IndustryEvent } from '../types';

interface EventsPageProps {
  onOpenQuoteModal?: (title?: string) => void;
  onNavigateToEvent?: (slugOrId: string) => void;
  onNavigateHome?: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onOpenQuoteModal,
  onNavigateToEvent,
  onNavigateHome
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Upcoming' | 'Annual Event'>('all');

  const filteredEvents = INDUSTRY_EVENTS.filter(ev => {
    const matchesFilter = selectedFilter === 'all' || ev.status === selectedFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      ev.title.toLowerCase().includes(q) || 
      ev.location.toLowerCase().includes(q) ||
      (ev.boothOrVenue && ev.boothOrVenue.toLowerCase().includes(q)) ||
      ev.description.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

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
            <span className="text-[#1D438A] font-bold">Expos & Industry Events</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
              <span className="w-2 h-2 rounded-full bg-[#D7282F] animate-pulse" />
              <span className="tracking-wider uppercase font-mono">GLOBAL AUTOMATION EXPOS & FACTORY MEETS</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-logo leading-tight">
              Industry Expos, Trade Fairs & Engineering Summits
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Connect face-to-face with the founders, chief mechanical engineers, and software architects of Neptune Automatic. Explore live kinetic crash tests, 0.8s brushless boom barriers, and NPCI FASTag integration at major national and international infrastructure expos.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Upcoming Showcase</div>
              <div className="text-base sm:text-lg font-extrabold text-[#1D438A] font-display">ELECRAMA 2025</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Manufacturing Plant</div>
              <div className="text-base sm:text-lg font-extrabold text-[#D7282F] font-display">Sector-59 Noida</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">Live Demos</div>
              <div className="text-base sm:text-lg font-extrabold text-slate-800 font-display">Crash & BLDC</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="text-xs text-slate-500 font-medium">VIP Delegations</div>
              <div className="text-base sm:text-lg font-extrabold text-emerald-700 font-display">EPC & Architects</div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content: Left Vertical Filter Sidebar + Right Events Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Vertical Filter Rail (Col 1-4) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

            {/* 1. Search Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider block">
                Search Expos & Events
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Expo name, venue, or demo..."
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

            {/* 2. Vertical Event Status Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                  Event Programs
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {filteredEvents.length} matched
                </span>
              </div>
              <div className="space-y-1 pt-1">
                {[
                  { id: 'all', label: 'All Industry Events', count: INDUSTRY_EVENTS.length },
                  { id: 'Upcoming', label: 'Upcoming Trade Fairs', count: INDUSTRY_EVENTS.filter(e => e.status === 'Upcoming').length },
                  { id: 'Annual Event', label: 'Annual Engineering Meets', count: INDUSTRY_EVENTS.filter(e => e.status === 'Annual Event').length },
                ].map((item) => {
                  const isActive = selectedFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedFilter(item.id as any)}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1D438A] text-white font-bold shadow-xs'
                          : 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00a8e8]' : 'bg-slate-300'}`} />
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Featured Spotlight: ELECRAMA 2025 */}
            <div className="bg-gradient-to-br from-[#0a1d37] via-[#1D438A] to-[#0a1d37] rounded-xl p-5 text-white space-y-3 shadow-xs border border-blue-900">
              <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Showcase</span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  ELECRAMA 2025
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Feb 22-26, 2025 • India Expo Mart, Greater Noida. Experience our latest ASTM M50 crash bollard impact test data & 0.8s brushless boom barriers.
                </p>
              </div>
              <div className="pt-1">
                <a
                  href="https://elecrama.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300 hover:text-white underline transition-colors"
                >
                  <span>Visit Official ELECRAMA Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 4. Schedule Plant Visit */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#00a8e8]" />
                <span>Sector-59 Noida Plant</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Can't attend an expo? Schedule an executive visit to our 50,000+ sq. ft. Noida manufacturing facility.
              </p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Factory Visit Request') : null}
                  className="w-full py-2 px-3 rounded-lg bg-[#D7282F] hover:bg-[#b81d23] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Book Plant Inspection
                </button>
                <a
                  href="tel:08010807000"
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1D438A]" />
                  <span>Call 080108 07000</span>
                </a>
              </div>
            </div>

          </aside>

          {/* Right Column: Events Timeline Nodes (Col 5-12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1d37]">
                  {selectedFilter === 'all' ? 'All Expos & Showcases' : selectedFilter === 'Upcoming' ? 'Upcoming Exhibitions' : 'Annual Programs'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {filteredEvents.length} events on the engineering roadmap
                </p>
              </div>
              {selectedFilter !== 'all' && (
                <button
                  onClick={() => setSelectedFilter('all')}
                  className="text-xs font-bold text-[#00a8e8] hover:text-[#1D438A] transition-colors cursor-pointer"
                >
                  Show All Events
                </button>
              )}
            </div>

            {/* Vertical Timeline Wrapper */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 space-y-8 ml-2 sm:ml-4">
              {filteredEvents.map((ev) => {
                const isElecrama = ev.id.includes('elecrama');
                return (
                  <div key={ev.id} className="relative group">
                    {/* Timeline Milestone Node */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-white flex items-center justify-center shadow-xs ${
                      isElecrama 
                        ? 'bg-[#D7282F] ring-4 ring-red-100' 
                        : ev.status === 'Upcoming' 
                        ? 'bg-[#1D438A] ring-4 ring-blue-100' 
                        : 'bg-emerald-600 ring-4 ring-emerald-100'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Event Card */}
                    <div className={`rounded-xl bg-white border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
                      isElecrama 
                        ? 'border-[#D7282F]/50 ring-1 ring-[#D7282F]/20' 
                        : 'border-slate-200 hover:border-[#1D438A]'
                    }`}>
                      {/* Highlight Ribbon for ELECRAMA */}
                      {isElecrama && (
                        <div className="bg-gradient-to-r from-[#1D438A] via-[#00A8E8] to-[#D7282F] text-white px-5 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 tracking-wider uppercase font-mono text-[11px]">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                            Featured World Exposition • ELECRAMA 2025
                          </span>
                          <a 
                            href={ev.eventUrl || 'https://elecrama.com/'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline hover:text-yellow-200 text-[11px] font-semibold flex items-center gap-1 shrink-0"
                          >
                            <span>elecrama.com</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      <div className="p-6 sm:p-7 space-y-5">
                        
                        {/* Status Badge + Edition */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono uppercase tracking-wider ${
                              ev.status === 'Upcoming' 
                                ? 'bg-red-50 text-[#D7282F] border border-red-200' 
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}>
                              {ev.status === 'Upcoming' ? 'Upcoming Showcase' : 'Annual Technical Program'}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              Edition: {ev.edition}
                            </span>
                          </div>

                          {ev.boothOrVenue && (
                            <span className="text-xs font-mono font-bold text-[#1D438A] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                              {ev.boothOrVenue}
                            </span>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-gradient-logo leading-tight">
                            {ev.title}
                          </h3>
                          {ev.tagline && (
                            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                              {ev.tagline}
                            </p>
                          )}
                        </div>

                        {/* Metadata Row: Date, Time, Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Calendar className="w-4 h-4 text-[#1D438A] shrink-0" />
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Event Dates</div>
                              <div className="font-bold text-slate-900">{ev.dates}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-[#00A8E8] shrink-0" />
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Visiting Hours</div>
                              <div className="font-bold text-slate-900">{ev.timings || '09:30 AM - 06:00 PM'}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-slate-700">
                            <MapPin className="w-4 h-4 text-[#D7282F] shrink-0" />
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Venue / City</div>
                              <div className="font-bold text-slate-900">{ev.location}</div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {ev.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenQuoteModal ? onOpenQuoteModal(`VIP Meeting Request: ${ev.title}`) : null}
                              className="px-3.5 py-2 rounded-lg bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              Book VIP Pass
                            </button>

                            {onNavigateToEvent && (
                              <button
                                onClick={() => onNavigateToEvent(ev.id)}
                                className="px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-[#0a1d37] border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
                              >
                                Event Agenda
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {ev.eventUrl && (
                              <a
                                href={ev.eventUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1D438A] border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                              >
                                <span>Official Site</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Factory Invite Banner */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-[#071526] via-[#0a1d37] to-[#1D438A] text-white p-6 sm:p-8 shadow-md border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00A8E8] uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-[#D7282F]" />
                <span>Noida Sector-59 R&D Facility</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Cannot Attend an Expo? Schedule a Private Factory Demonstration
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                We host structural architects, MEP consultants, security auditors, and system integrators at our 50,000+ sq. ft. Noida facility every week for hands-on impact tests, barrier motor endurance tests, and FASTag lane demonstrations.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Private Factory Tour & Engineering Consultation') : null}
                  className="px-5 py-2.5 rounded-lg bg-[#D7282F] hover:bg-[#B81D23] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Schedule Noida Factory Inspection
                </button>
                <a
                  href="tel:+918010807000"
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00A8E8]" />
                  <span>Call +91 8010 807 000</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
