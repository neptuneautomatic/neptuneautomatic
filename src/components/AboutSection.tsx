import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  Sun, 
  Shield, 
  Factory, 
  Users, 
  Sparkles, 
  Target, 
  Cpu, 
  Compass, 
  Linkedin, 
  Briefcase,
  Trophy,
  FileCheck,
  Download,
  ArrowRight,
  Radio
} from 'lucide-react';
import { COMPANY_INFO, TIMELINE_MILESTONES, WHY_NEPTUNE_PILLARS } from '../data/companyData';
import { NeptuneLogo } from './NeptuneLogo';
import { AboutTab } from '../types';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
  initialTab?: AboutTab;
}

interface TeamMember {
  name: string;
  role: string;
  entity: string;
  experience: string;
  focus: string;
  bio: string;
}

const LEADERSHIP_TEAM: TeamMember[] = [
  {
    name: 'Executive Managing Director',
    role: 'Managing Director & Group Chairman',
    entity: 'Neptune Automatic & Neptune System',
    experience: '25+ Years Experience',
    focus: 'Corporate Strategy & Indigenous Manufacturing',
    bio: 'Pioneered indigenous barrier and automated perimeter defense in 2005. Champion of the Make in India initiative, leading Neptune from a specialized fabrication bay into a 50,000+ sq. ft. precision manufacturing campus serving over 15,000 installations.'
  },
  {
    name: 'Vice President – Systems & Engineering',
    role: 'VP – Engineering & Technology',
    entity: 'Neptune System Pvt. Ltd.',
    experience: '20+ Years Experience',
    focus: 'Firmware, Software Architecture & Cloud Telemetry',
    bio: 'Heads systems engineering and software innovations. Directs the turnkey integration of NPCI FASTag toll protocols, automated ANPR computer vision systems, and remote IoT diagnostics across highway tolls and corporate smart parks.'
  },
  {
    name: 'Chief Mechanical & Crash Dynamics Architect',
    role: 'Head of Mechanical R&D',
    entity: 'Neptune Automatic Pvt. Ltd.',
    experience: '18+ Years Experience',
    focus: 'ASTM Crash-Rated Bollards & Hydraulic Power Packs',
    bio: 'Leads Finite Element Analysis (FEA) and physical impact testing for M30 and M50 K12 certified security barriers. Specializes in heavy-gauge structural metallurgy and hydraulic actuator mechanics for mission-critical defense perimeters.'
  },
  {
    name: 'Director of Plant Operations & Quality Assurance',
    role: 'Director – Manufacturing & QA',
    entity: 'Neptune Automatic Pvt. Ltd.',
    experience: '22+ Years Experience',
    focus: 'Production bays, ISO 9001:2015 & MTBF Testing',
    bio: 'Oversees the 50,000+ sq. ft. Sector 59 Noida facility. Enforces zero-defect quality control protocols, robotic welding accuracy, and rigorous 10,000,000-cycle life tests for all boom barrier mechanisms before dispatch.'
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal, initialTab = 'story' }) => {
  const [activeTab, setActiveTab] = useState<AboutTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <section id="about-section" className="py-20 bg-white border-t-2 border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-6 bg-[#1D438A]"></div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#1D438A] uppercase">
              Neptune Heritage, Advantage & Leadership
            </span>
            <div className="h-[2px] w-6 bg-[#D7282F]"></div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Two Decades of Indigenous Engineering Mastery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Established in 2005 under the visionary umbrella of the Neptune Group, building mission-critical access automation for India’s modern infrastructure.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-sm bg-white border border-slate-200 shadow-xs gap-1">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-5 py-2.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'story'
                  ? 'bg-[#1D438A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1D438A] hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Our Story & Heritage</span>
            </button>

            <button
              onClick={() => setActiveTab('why')}
              className={`px-5 py-2.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'why'
                  ? 'bg-[#1D438A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1D438A] hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Why Neptune</span>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className={`px-5 py-2.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'leadership'
                  ? 'bg-[#1D438A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1D438A] hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Leadership / Our Team</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-5 py-2.5 rounded-xs text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'achievements'
                  ? 'bg-[#1D438A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1D438A] hover:bg-slate-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Achievements & Certifications</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OUR STORY */}
        {activeTab === 'story' && (
          <div className="space-y-16 animate-in fade-in-50 duration-200">
            {/* Story Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Block: Company Story & Group Heritage */}
              <div className="lg:col-span-7 rounded-sm bg-white border border-slate-200 p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <NeptuneLogo size="md" />
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 border border-slate-200 text-[#0a1d37] text-xs font-mono font-bold">
                      EST. 2005 • NOIDA, INDIA
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0a1d37]">
                    Engineering that Safeguards Millions Every Single Day
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Neptune Automatic Pvt. Ltd. was founded with a singular objective: to eliminate India’s dependence on vulnerable or overpriced imported access gates by engineering domestic, heavy-duty automation systems calibrated for high-stress traffic conditions.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    As a proud member of the <strong className="text-[#0a1d37]">Neptune Group</strong>, we blend world-class mechanical fabrication with cutting-edge embedded firmware, FASTag micro-controllers, and intelligent vision algorithms.
                  </p>

                  {/* Core Values */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-[#0a1d37] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1D438A]" />
                        <span>Quality Without Compromise</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Every barrier undergoes continuous test cycles prior to dispatch.
                      </div>
                    </div>

                    <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200">
                      <div className="text-xs font-bold text-[#0a1d37] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D7282F]" />
                        <span>PAN-India Lifecycle Support</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Local field technicians and guaranteed 48-hour spare parts dispatch.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Headquarters & Production:</span>
                    <span className="text-xs sm:text-sm text-slate-800 font-bold">{COMPANY_INFO.address}</span>
                  </div>
                  <button
                    onClick={onOpenQuoteModal}
                    className="px-5 py-2.5 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Schedule Factory Visit
                  </button>
                </div>
              </div>

              {/* Right Block: Made in India Focus Card */}
              <div className="lg:col-span-5 rounded-sm bg-[#0a1d37] text-white border border-[#1a3c6d] p-8 flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2 text-[#3DA4ED] font-mono text-xs font-bold">
                    <Factory className="w-4 h-4" />
                    <span>MAKE IN INDIA INITIATIVE</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    Built for Indian Weather & Operational Extremes
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Imported gates often fail in Indian conditions due to high ambient heat, dust storms, voltage fluctuations, and intense traffic surges. Neptune systems are purpose-built for India:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-sm bg-white/10 border border-white/10">
                      <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Heat & Dust Tolerance</div>
                        <div className="text-[11px] text-slate-300">Operates continuously in ambient temperatures from -15°C to +60°C.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-sm bg-white/10 border border-white/10">
                      <Wrench className="w-5 h-5 text-[#3DA4ED] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Indigenous Spares & Fast Replacement</div>
                        <div className="text-[11px] text-slate-300">Zero waiting for imported components; complete inventory stocked in Noida.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-sm bg-white/10 border border-white/10">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">Full Voltage Surge Suppression</div>
                        <div className="text-[11px] text-slate-300">Built-in isolation boards protecting logic controllers from grid fluctuations.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center text-[11px] text-[#3DA4ED] font-bold">
                  Proudly Engineered & Manufactured in India • ISO 9001:2015 Certified
                </div>
              </div>

            </div>

            {/* 20-Year Evolution Timeline */}
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-1">
                <h3 className="font-display text-xl font-bold text-[#0a1d37]">
                  Two Decades of Milestones (2005 – Present)
                </h3>
                <p className="text-xs text-slate-500">
                  The continuous technological evolution of Neptune Automatic Pvt. Ltd.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {TIMELINE_MILESTONES.map((event) => (
                  <div 
                    key={event.year} 
                    className="p-5 rounded-sm bg-white border border-slate-200 space-y-2 relative group hover:border-[#1D438A] shadow-xs transition-colors"
                  >
                    <div className="font-display text-xl font-black text-[#1D438A] font-mono">
                      {event.year}
                    </div>
                    <div className="text-xs font-bold text-[#0a1d37]">
                      {event.title}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WHY NEPTUNE */}
        {activeTab === 'why' && (
          <div className="space-y-10 animate-in fade-in-50 duration-200">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-2xl font-bold text-[#0a1d37]">
                The Neptune Engineering Advantage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Five architectural pillars that distinguish our indigenously manufactured systems across high-traffic airports, transit networks, and IT cyber parks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_NEPTUNE_PILLARS.map((item) => (
                <div
                  key={item.title}
                  className="p-6 sm:p-7 rounded-sm bg-white border border-slate-200 hover:border-[#1D438A] shadow-xs hover:shadow-sm transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#1D438A]">
                      Pillar {item.number}
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-blue-50 text-[#1D438A] text-[10px] font-bold border border-blue-200">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-bold text-[#0a1d37]">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Production Standard</span>
                  </div>
                </div>
              ))}

              {/* Consultation Card */}
              <div className="p-6 sm:p-7 rounded-sm bg-[#0a1d37] text-white border border-slate-800 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center text-[#3DA4ED]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-white">
                    Need Custom Tender Specifications?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our Noida factory engineering team reviews site dimensions, crash barrier calculations, and tender requirements at zero obligation.
                  </p>
                </div>

                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-2.5 px-4 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Request Technical Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEADERSHIP / OUR TEAM */}
        {activeTab === 'leadership' && (
          <div className="space-y-10 animate-in fade-in-50 duration-200">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-display text-2xl font-bold text-[#0a1d37]">
                Leadership & Engineering Directorate
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Backed by seasoned engineering pioneers, software architects, and quality directors with decades of domain experience across Indian infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEADERSHIP_TEAM.map((leader, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-8 rounded-sm bg-white border border-slate-200 hover:border-[#1D438A] shadow-xs space-y-4 flex flex-col justify-between transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1D438A] block">
                          {leader.entity}
                        </span>
                        <h4 className="font-display text-lg sm:text-xl font-bold text-[#0a1d37] mt-0.5">
                          {leader.role}
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-xs bg-slate-100 text-slate-700 text-[11px] font-mono font-bold shrink-0">
                        {leader.experience}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-blue-50 text-[#1D438A] text-xs font-semibold border border-blue-200">
                      <Target className="w-3 h-3 text-[#258BD7]" />
                      <span>{leader.focus}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px]">Campus: Sector 59 / 156 Noida</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Executive Leadership
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Careers banner */}
            <div className="p-8 rounded-sm bg-[#0a1d37] text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-lg font-bold">
                  Interested in Joining Our Engineering Team?
                </h4>
                <p className="text-xs text-slate-300">
                  Explore active openings in mechanical CAD design, embedded firmware, project management, and field operations.
                </p>
              </div>
              <a
                href="#careers"
                onClick={(e) => { e.preventDefault(); onOpenQuoteModal(); }}
                className="px-6 py-2.5 rounded-xs bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold shrink-0 transition-colors shadow-xs cursor-pointer"
              >
                Contact HR & Recruitment
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS & CERTIFICATIONS */}
        {activeTab === 'achievements' && (
          <div className="space-y-14 animate-in fade-in-50 duration-200">
            
            {/* Impact Highlights Strip */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
                <div className="font-display text-2xl font-extrabold text-[#1D438A]">20+ Years</div>
                <div className="text-[11px] text-slate-500 font-medium">Indigenous R&D Since 2005</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
                <div className="font-display text-2xl font-extrabold text-[#00a8e8]">15,000+</div>
                <div className="text-[11px] text-slate-500 font-medium">Perimeter Installations</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
                <div className="font-display text-2xl font-extrabold text-[#D7282F]">ASTM / PAS 68</div>
                <div className="text-[11px] text-slate-500 font-medium">M30 & M50 K12 Crash Rated</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
                <div className="font-display text-2xl font-extrabold text-[#0a1d37]">ISO 9001:2015</div>
                <div className="text-[11px] text-slate-500 font-medium">Certified Plant QA</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
                <div className="font-display text-2xl font-extrabold text-emerald-600">10M Cycles</div>
                <div className="text-[11px] text-slate-500 font-medium">BLDC Endurance MTBF</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-center space-y-1">
                <div className="font-display text-2xl font-extrabold text-[#1D438A]">Make in India</div>
                <div className="text-[11px] text-slate-500 font-medium">Class-1 Defense Supplier</div>
              </div>
            </div>

            {/* Official Certifications & Accreditations Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0a1d37]">
                    Official Testing Accreditations & Safety Standards
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Stringently tested by authorized civil and defense ballistic impact laboratories.
                  </p>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-50 text-[#1D438A] border border-blue-200 text-xs font-bold hover:bg-[#1D438A] hover:text-white transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Request Certification Dossier</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* 1. ASTM Crash Rating */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-red-50 text-[#D7282F] border border-red-100">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-50 text-[#D7282F] font-bold border border-red-200">
                      Crash Tested
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0a1d37]">
                      ASTM F2656-07 M30 / M50 K12
                    </h4>
                    <p className="text-[11px] text-[#1D438A] font-semibold mt-0.5">
                      High-Security Anti-Ram Defense Bollards & Road Blockers
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified to halt an errant or hostile 7,500 kg truck travelling at speeds up to 80 km/h with zero perimeter penetration (&lt; 1m bed displacement), protecting sensitive perimeters.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                    Standard: ASTM International • K12 / M50 Certified
                  </div>
                </div>

                {/* 2. PAS 68 / IWA 14-1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-blue-50 text-[#1D438A] border border-blue-100">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#1D438A] font-bold border border-blue-200">
                      HVM Standard
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0a1d37]">
                      BSI PAS 68 & IWA 14-1
                    </h4>
                    <p className="text-[11px] text-[#1D438A] font-semibold mt-0.5">
                      Hostile Vehicle Mitigation (HVM) Drop Arms & Barriers
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    British Standards Institution and International Workshop Agreement impact verified for critical public venues, diplomatic missions, and oil refineries.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                    Standard: BSI PAS 68:2013 / IWA 14-1:2013
                  </div>
                </div>

                {/* 3. ISO 9001:2015 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      Quality System
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0a1d37]">
                      ISO 9001:2015 Certified
                    </h4>
                    <p className="text-[11px] text-[#1D438A] font-semibold mt-0.5">
                      Integrated Precision Manufacturing & Quality Assurance
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive QA protocol governing CNC laser machining, robotic welding bays, shot blasting, hot-dip galvanizing, and multi-tier electronic testing in Sector 59 Noida.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                    Facility: Sector 59 & 156 Noida Campus
                  </div>
                </div>

                {/* 4. CE Conformity */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-sky-50 text-[#00a8e8] border border-sky-100">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-[#00a8e8] font-bold border border-sky-200">
                      European Safety
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0a1d37]">
                      CE European Conformity
                    </h4>
                    <p className="text-[11px] text-[#1D438A] font-semibold mt-0.5">
                      Machinery Directive & Low Voltage Safety
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full compliance with EN 12453, EN 12445, and EN 60335-2-103 directives ensuring zero electrical hazard, electromagnetic interference safety, and automated obstacle detection.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                    Compliance: EN 12453 / EN 60335-2-103
                  </div>
                </div>

                {/* 5. NPCI NETC FASTag */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
                      <Radio className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                      FinTech Certified
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0a1d37]">
                      NPCI NETC FASTag Certified
                    </h4>
                    <p className="text-[11px] text-[#1D438A] font-semibold mt-0.5">
                      National Electronic Toll & Parking Interoperability
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified host switch integration with major Indian acquiring banks (ICICI, SBI, Axis, HDFC) enabling instant automated micro-debit and friction-free barrier lifting in &lt; 200 ms.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                    Protocol: NPCI NETC FASTag Specification v2.4
                  </div>
                </div>

                {/* 6. IP67 / IP68 Ingress Protection */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                      Monsoon Protected
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0a1d37]">
                      IP67 / IP68 Ingress Protection
                    </h4>
                    <p className="text-[11px] text-[#1D438A] font-semibold mt-0.5">
                      Hermetic Submersion Protection for Sub-Surface Cylinders
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Underground bollard assemblies and road blocker hydraulic power units are engineered for water submersion up to 1 meter during extreme monsoon flooding with active drainage pumps.
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                    Ingress Rating: IEC 60529 IP67 / IP68
                  </div>
                </div>

              </div>
            </div>

            {/* Technological Milestones Timeline */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0a1d37]">
                  Two Decades of Engineering Milestones (2005 – 2026)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  How Neptune evolved from an indigenous fabrication unit into India’s foremost perimeter automation manufacturer.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    year: '2005',
                    title: 'Inception of Neptune Automatic',
                    desc: 'Founded under the Neptune Group umbrella in Noida to replace expensive, vulnerable imported barrier gates with domestic, heavy-duty Indian engineering.'
                  },
                  {
                    year: '2008',
                    title: 'Delhi Metro (DMRC) Infrastructure Contract',
                    desc: 'Selected to automate access barriers and pedestrian security entry across initial Phase 2 corridors of the Delhi Metro Rail Corporation.'
                  },
                  {
                    year: '2012',
                    title: 'Hydraulic Crash Bollard Line Launch',
                    desc: 'Commissioned indigenous impact-rated rising bollard testing to M30 and M50 standards, delivering anti-ram solutions to high-security defense compounds.'
                  },
                  {
                    year: '2016',
                    title: 'FASTag Pioneer in Parking & Tolls',
                    desc: 'First Indian automation OEM to engineer native NPCI FASTag protocol integration directly into barrier logic boards for ticketless mobility.'
                  },
                  {
                    year: '2019',
                    title: '50,000+ sq. ft. Campus Expansion',
                    desc: 'Inaugurated dedicated embedded firmware and robotic CNC production facility at Sector 156 Noida, tripling dispatch capacity.'
                  },
                  {
                    year: '2022',
                    title: 'Next-Gen Brushless DC (BLDC) Motor Launch',
                    desc: 'Rolled out proprietary high-torque BLDC boom barrier mechanisms achieving 0.9s ultra-fast opening with 10,000,000-cycle MTBF durability.'
                  },
                  {
                    year: '2024',
                    title: 'AI Neural ANPR & Janus Cloud Suite',
                    desc: 'Integrated machine-learning license plate recognition and multi-site parking telemetry across 50+ airport and mall deployments.'
                  },
                  {
                    year: '2025–2026',
                    title: '15,000th Critical Deployment & Defense Supplier Honor',
                    desc: 'Surpassed 15,000 physical security deployments nationwide; accredited as Class-1 Local Supplier under Make in India defense procurement.'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#1D438A] transition-colors flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1D438A] font-mono font-extrabold text-sm border border-blue-200 shrink-0 w-28 text-center">
                      {item.year}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-sm text-[#0a1d37]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Landmark Infrastructure Projects Spotlight */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0a1d37] via-[#1D438A] to-[#0a1d37] text-white space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00a8e8]">
                  Critical National Assets
                </span>
                <h3 className="font-display text-2xl font-bold">
                  Guarding India’s Most Sensitive Infrastructure
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                  Neptune barriers and crash bollards protect airports, metro railways, oil refineries, and defense borders where system failure is not an option.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <div className="text-xs text-[#00a8e8] font-bold">Aviation & Transit</div>
                  <div className="font-display font-bold text-sm text-white">IGI Aerocity & Terminals</div>
                  <div className="text-[11px] text-slate-300">Crash drop arms & ANPR lanes</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <div className="text-xs text-[#00a8e8] font-bold">Mass Urban Transit</div>
                  <div className="font-display font-bold text-sm text-white">Delhi Metro Rail (DMRC)</div>
                  <div className="text-[11px] text-slate-300">45+ automated stations</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <div className="text-xs text-[#00a8e8] font-bold">Maritime Ports</div>
                  <div className="font-display font-bold text-sm text-white">Adani Ports & SEZ</div>
                  <div className="text-[11px] text-slate-300">Heavy sliding gates & bollards</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1">
                  <div className="text-xs text-[#00a8e8] font-bold">Enterprise Tech Parks</div>
                  <div className="font-display font-bold text-sm text-white">DLF CyberCity & Infosys</div>
                  <div className="text-[11px] text-slate-300">Speed gates & UHF RFID</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
                <div className="text-xs text-slate-300">
                  Are you a consultant, architect or procurement officer needing formal test certificates?
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="px-5 py-2.5 rounded-lg bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Request Engineering Compliance Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
