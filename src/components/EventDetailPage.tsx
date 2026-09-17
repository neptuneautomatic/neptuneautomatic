import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Building2, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  ExternalLink,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import { IndustryEvent } from '../types';
import { INDUSTRY_EVENTS } from '../data/companyData';

interface EventDetailPageProps {
  event: IndustryEvent;
  onNavigateHome: () => void;
  onNavigateToEventsList: () => void;
  onSelectEvent: (ev: IndustryEvent) => void;
  onOpenQuoteModal: (subject?: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onNavigateHome,
  onNavigateToEventsList,
  onSelectEvent,
  onOpenQuoteModal
}) => {
  const otherEvents = INDUSTRY_EVENTS.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 1. Breadcrumb Bar */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={onNavigateToEventsList}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Expos & Events
          </button>
          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate max-w-xs sm:max-w-md">
            {event.title}
          </span>
        </nav>

        {/* 2. Hero Header Card (White Theme) */}
        <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
              {event.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider font-mono">
              {event.status} • {event.eventType}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-logo tracking-tight leading-tight">
            {event.title}
          </h1>

          {/* Event Metadata Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-[#00a8e8]" />
                <span>Date & Timing</span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#0a1d37]">
                {event.date}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#D7282F]" />
                <span>Venue & Location</span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#0a1d37]">
                {event.location}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Booth / Staging</span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#0a1d37]">
                {event.boothOrVenue || 'Official Neptune Pavilion'}
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onOpenQuoteModal(`Expo Booth Appointment: ${event.title}`)}
              className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Book VIP Booth Consultation</span>
            </button>

            <a
              href="tel:08010807000"
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#0a1d37] text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00a8e8]" />
              <span>Call Expo Coordinator: 080108 07000</span>
            </a>
          </div>
        </header>

        {/* 3. Event Details & Executive Agenda */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
              Exposition Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              What Neptune is Demonstrating
            </h2>
          </div>

          <p className="text-base text-slate-700 leading-relaxed max-w-4xl">
            {event.description}
          </p>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-[#0a1d37] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Live Hardware Demonstrations</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experience high-speed 0.9s toll boom barriers, 1.5s crash-rated hydraulic bollards, and optical pedestrian speed lanes in real-time operation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-[#0a1d37] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Meet Lead R&D & Firmware Engineers</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct Q&A with our Noida engineering leadership on FASTag integration, ASTM F2656 civil foundations, and tender compliance.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Other Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-gradient-logo">
              Other Industry Events & Summits
            </h2>
            <button
              onClick={onNavigateToEventsList}
              className="text-xs font-bold text-[#1D438A] hover:text-[#00a8e8] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Events</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherEvents.map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectEvent(other)}
                className="group rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#1D438A] hover:shadow-md transition-all duration-300 p-5 cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#1D438A]">{other.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {other.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#1D438A] transition-colors text-sm leading-snug">
                    {other.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#D7282F] shrink-0" />
                    <span className="truncate">{other.location}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-[#1D438A] flex items-center gap-1 pt-2 border-t border-slate-100">
                  <span>View Event Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
