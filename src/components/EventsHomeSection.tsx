import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Building2, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Ticket, 
  Users, 
  Factory, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';
import { NavPage } from '../types';
import { RouteExtra } from '../utils/urlRouter';
import { INDUSTRY_EVENTS } from '../data/companyData';

interface EventsHomeSectionProps {
  onNavigate: (page: NavPage, extra?: RouteExtra) => void;
  onOpenQuoteModal: (subject?: string) => void;
}

export const EventsHomeSection: React.FC<EventsHomeSectionProps> = ({
  onNavigate,
  onOpenQuoteModal
}) => {
  const elecramaEvent = INDUSTRY_EVENTS.find(e => e.id === 'ev-elecrama-2025') || INDUSTRY_EVENTS[0];
  const otherEvents = INDUSTRY_EVENTS.filter(e => e.id !== 'ev-elecrama-2025').slice(0, 3);

  return (
    <section 
      id="events-home-section" 
      className="py-20 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e4ecf5] border-t-2 border-slate-300/90 relative overflow-hidden"
    >
      {/* Ambient background light glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sky-400/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Heading: Nxerai inspired eyebrow badge & bold typography */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 text-sky-700 text-xs font-mono uppercase tracking-widest shadow-2xs">
            <span className="pulsing-halo" />
            <span>EXPOS & INDUSTRY TRADE SHOWS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1d37] tracking-tight leading-tight">
            Experience Neptune Live at <span className="text-gradient-logo">Leading Industry Expos</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Connect directly with our chief structural and embedded hardware engineers. Witness live kinetic crash demonstrations, inspect 0.8s rapid toll barriers, and explore turnkey automated parking systems.
          </p>
          <div className="flex justify-center pt-1">
            <div className="flex h-[2.5px] w-16 rounded-full overflow-hidden">
              <div className="w-[60%] bg-[#1D438A]" />
              <div className="w-[40%] bg-[#D7282F]" />
            </div>
          </div>
        </div>

        {/* Featured Spotlight: ELECRAMA 2025 Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#071526] via-[#0c2340] to-[#123156] text-white border border-blue-900/60 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xl">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Area: 7 Cols */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Top Badge Strip */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  FLAGSHIP WORLD EXPO
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-mono">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {elecramaEvent.date}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  {elecramaEvent.status}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  ELECRAMA 2025 • World’s Largest Electrical T&D & Automation Exposition
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                  Join Neptune Automatic at India Expo Mart, Greater Noida. Experience our latest Make in India BLDC barrier drives, crash-rated K12 anti-ram bollards, and turnkey FASTag NETC parking automation.
                </p>
              </div>

              {/* Live Demonstrations Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {elecramaEvent.whatWeDo.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenQuoteModal('ELECRAMA 2025 VIP Consultation')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8E8] to-[#1D438A] hover:from-[#0096d1] hover:to-[#17366f] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer group"
                >
                  <Ticket className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                  <span>Book VIP Booth Consultation</span>
                </button>

                {elecramaEvent.eventUrl && (
                  <a
                    href={elecramaEvent.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Visit Official Elecrama</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                  </a>
                )}

                <button
                  onClick={() => onNavigate('events')}
                  className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>All Events</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Right Card: Venue, Booth & Fast Pass (5 Cols) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 space-y-4">
              <div className="border-b border-white/10 pb-4">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                  OFFICIAL BOOTH COORDINATES
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  India Expo Mart, Greater Noida
                </div>
                <div className="text-xs text-slate-300">
                  Delhi NCR, Uttar Pradesh, India
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                  <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Pavilion & Stall</div>
                    <div className="text-slate-300 text-[11px] mt-0.5">
                      {elecramaEvent.boothOrVenue || 'Hall 4, Stall H4-B12'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Exhibition Hours</div>
                    <div className="text-slate-300 text-[11px] mt-0.5">
                      {elecramaEvent.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Chief Engineers on Stand</div>
                    <div className="text-slate-300 text-[11px] mt-0.5">
                      Mechanical R&D, Civil Impact Specialists & Smart PMS Architects
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-600/20 to-blue-600/20 border border-white/10 text-center text-xs text-slate-200">
                  ⚡ Pre-register your team to bypass on-site queues for technical demo slots.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3-Column Grid of Upcoming Expos & Meets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Event Type Badge & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#1D438A] border border-blue-100">
                    {ev.badge || ev.eventType}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                    {ev.status}
                  </span>
                </div>

                {/* Event Title */}
                <h4 className="text-lg font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors leading-snug">
                  {ev.title}
                </h4>

                {/* Date & Location */}
                <div className="space-y-2 text-xs text-slate-600 border-y border-slate-100 py-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#00A8E8] shrink-0" />
                    <span className="font-semibold text-slate-800">{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D7282F] shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                  {ev.boothOrVenue && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate text-[11px] text-slate-500">{ev.boothOrVenue}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {ev.description}
                </p>
              </div>

              {/* Action Links */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenQuoteModal(`Meeting at ${ev.title}`)}
                  className="text-xs font-bold text-[#1D438A] hover:text-[#00A8E8] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Schedule Meeting</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {ev.eventUrl && (
                  <a
                    href={ev.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
                    title="External Expo Website"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Explore All Events & VIP Request */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#1D438A]" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#0a1d37]">
                Looking for upcoming dates, booth timelines, and delegate briefings?
              </div>
              <div className="text-xs text-slate-500">
                Browse our comprehensive calendar of international security expos and factory consultant open days.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('events')}
              className="px-5 py-2.5 rounded-xl bg-[#1D438A] hover:bg-[#163469] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore All Events & Expos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenQuoteModal('General Expo / Event Inquiry')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Request VIP Pass
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
