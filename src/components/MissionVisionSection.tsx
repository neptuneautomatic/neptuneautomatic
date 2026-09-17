import React, { useState } from 'react';
import { Target, Eye, Scale, Trophy, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface MissionVisionSectionProps {
  onFindMore: () => void;
  onOpenQuoteModal?: () => void;
}

interface StrategicPillar {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  gradient: string;
  borderHover: string;
  glowColor: string;
  badgeBg: string;
}

const PILLARS: StrategicPillar[] = [
  {
    id: 'mission',
    step: '01',
    title: 'Mission',
    description: 'To provide innovative security and access solutions that ensure safety and convenience for every client.',
    icon: Target,
    accentColor: '#00a8e8',
    gradient: 'from-cyan-500 to-blue-600',
    borderHover: 'hover:border-cyan-400',
    glowColor: 'rgba(0, 168, 232, 0.15)',
    badgeBg: 'bg-gradient-to-r from-cyan-500 to-blue-600'
  },
  {
    id: 'vision',
    step: '02',
    title: 'Vision',
    description: 'To be the global leader in advanced security and access control systems, Parking management Solutions.',
    icon: Eye,
    accentColor: '#D7282F',
    gradient: 'from-rose-500 to-red-600',
    borderHover: 'hover:border-rose-400',
    glowColor: 'rgba(215, 40, 47, 0.15)',
    badgeBg: 'bg-gradient-to-r from-rose-500 to-red-600'
  },
  {
    id: 'value',
    step: '03',
    title: 'Value',
    description: 'Commitment to excellence, customer satisfaction, innovation, and integrity in every product and service.',
    icon: Scale,
    accentColor: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    borderHover: 'hover:border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    badgeBg: 'bg-gradient-to-r from-amber-500 to-orange-600'
  },
  {
    id: 'goals',
    step: '04',
    title: 'Goals',
    description: 'To continually innovate, expand our product range, and maintain the highest standards of quality and customer service.',
    icon: Trophy,
    accentColor: '#1D438A',
    gradient: 'from-blue-700 to-indigo-900',
    borderHover: 'hover:border-blue-500',
    glowColor: 'rgba(29, 67, 138, 0.15)',
    badgeBg: 'bg-gradient-to-r from-blue-700 to-indigo-900'
  }
];

export const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
  onFindMore,
  onOpenQuoteModal
}) => {
  const [activePillar, setActivePillar] = useState<string>('mission');

  const FUNDAMENTALS = [
    'Quality & Reliability',
    'Technical Excellence',
    'Sustainable Innovation',
    'Exceptional Service'
  ];

  return (
    <section id="mission-vision-section" className="scroll-mt-24 py-20 bg-white border-t border-slate-200/90 relative overflow-hidden">
      {/* Signature 3-Color Brand Accent Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] flex z-20">
        <div className="w-[50%] bg-[#1D438A]" />
        <div className="w-[30%] bg-[#00A8E8]" />
        <div className="w-[20%] bg-[#D7282F]" />
      </div>

      {/* Ambient background glow rings (Nxerai theme) */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D7282F]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-bold text-[#1D438A]">
            <span className="pulsing-halo" />
            <span className="tracking-widest uppercase text-[11px]">STRATEGIC PURPOSE & VALUES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Defining Our Future, Guided by Purpose
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered at Neptune House Noida, our physical access automation and smart mobility solutions are anchored in continuous engineering precision and unyielding customer commitment.
          </p>
        </div>

        {/* 2-Column Split: Diagram on Left, Content & Actions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Visual Infographic ("DEFINING OUR FUTURE") */}
          <div className="lg:col-span-7 relative">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Central Hub Disc */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center py-4">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center p-3 shadow-lg group">
                    
                    {/* Outer Rotating/Gradient Accent Rings */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-rose-500 via-amber-500 to-[#1D438A] p-[3px] shadow-md animate-spin-slow">
                      <div className="w-full h-full bg-white rounded-full" />
                    </div>

                    {/* Secondary specular inner circle */}
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-slate-200" />
                    
                    {/* Inner Hub Body */}
                    <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-slate-50 to-white shadow-inner flex flex-col items-center justify-center p-2 text-center border border-slate-200">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[#1D438A]">
                        NEPTUNE
                      </span>
                      <h3 className="font-display text-xs sm:text-sm font-black text-[#0a1d37] tracking-wider uppercase leading-tight mt-1">
                        DEFINING<br />OUR<br />FUTURE
                      </h3>
                      <div className="w-6 h-0.5 bg-[#D7282F] rounded-full mt-1.5" />
                    </div>
                  </div>

                  <span className="mt-3 text-[11px] font-medium text-slate-500">
                    4 Core Strategic Foundations
                  </span>
                </div>

                {/* 4 Connected Strategic Pillar Cards */}
                <div className="md:col-span-8 space-y-3.5">
                  {PILLARS.map((pillar) => {
                    const Icon = pillar.icon;
                    const isActive = activePillar === pillar.id;

                    return (
                      <div
                        key={pillar.id}
                        onMouseEnter={() => setActivePillar(pillar.id)}
                        className={`group relative rounded-xl border transition-all duration-300 p-3.5 sm:p-4 cursor-pointer ${
                          isActive
                            ? 'bg-white border-slate-300 shadow-md ring-1 ring-slate-200 translate-x-1'
                            : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Circular Icon Pill with colored ring */}
                          <div 
                            className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                            style={{ borderColor: isActive ? pillar.accentColor : undefined }}
                          >
                            <Icon 
                              className="w-5 h-5 transition-colors"
                              style={{ color: pillar.accentColor }} 
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              {/* Pill Badge */}
                              <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-2xs ${pillar.badgeBg} flex items-center gap-1.5`}>
                                <span className="opacity-90">{pillar.step}</span>
                                <span>{pillar.title}</span>
                              </div>
                            </div>

                            <p className="text-xs sm:text-[13px] text-slate-700 leading-snug font-normal">
                              {pillar.description}
                            </p>
                          </div>
                        </div>

                        {/* Subtle accent bar on active */}
                        {isActive && (
                          <div 
                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                            style={{ backgroundColor: pillar.accentColor }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Authentic Content & Action */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-6 bg-[#1D438A]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#1D438A] uppercase">
                  OUR PURPOSE & COMMITMENT
                </span>
              </div>

              {/* Exact Title from User Reference Image */}
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#0a1d37] tracking-tight uppercase">
                OUR MISSION
              </h3>
            </div>

            {/* Exact Paragraph from User Reference Image */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              We endeavour to function and deliver world-class solutions, abiding by the four fundamentals of quality, technical excellence, sustainable innovation and exceptional service. Our strong work ethic, market experience and quality-focus are tools that help us build products that are intuitive, reliable and economical.
            </p>

            {/* 4 Fundamentals Highlights */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {FUNDAMENTALS.map((fund) => (
                <div 
                  key={fund} 
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{fund}</span>
                </div>
              ))}
            </div>

            {/* Green Action Button matching reference image ("FIND MORE") */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onFindMore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>FIND MORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenQuoteModal && (
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Request Engineering Brief</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
