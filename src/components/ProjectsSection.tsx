import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Layers,
  Award
} from 'lucide-react';
import { ProjectInstallation } from '../types';
import { REAL_PROJECTS } from '../data/companyData';

interface ProjectsSectionProps {
  onOpenQuoteModal: (projectName?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="projects-section" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[2px] w-6 bg-[#00a8e8]"></div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
                Proven Enterprise Deployments
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
              Case Studies: Solutions in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Real-world perimeter defense and parking automation protecting India’s landmark IT campuses, metro stations, and airports.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal('Custom Project Consultation')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-slate-100 hover:bg-[#0a1d37] text-[#0a1d37] hover:text-white border border-slate-300 hover:border-[#0a1d37] text-xs font-bold transition-colors"
          >
            <span>Discuss Your Site Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00a8e8]" />
          </button>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REAL_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="rounded-sm bg-slate-50 border border-slate-200 hover:border-[#00a8e8] p-6 flex flex-col justify-between space-y-4 group transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Sector & Location */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-sm bg-white text-[#0a1d37] font-bold border border-slate-200">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#00a8e8]" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                {/* Title & Client */}
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Sector: <strong className="text-[#0a1d37]">{proj.clientSector}</strong>
                  </p>
                </div>

                {/* Challenge & Scope */}
                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <div>
                    <span className="font-bold text-slate-500 block text-[11px] uppercase tracking-wider">Deployment Scope</span>
                    <p className="mt-0.5 leading-relaxed">{proj.scope}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#00a8e8] block text-[11px] uppercase tracking-wider">Hardware Integration</span>
                    <p className="mt-0.5 text-slate-800 font-medium">{proj.solutionDeployed}</p>
                  </div>
                </div>
              </div>

              {/* Quantified Result Metric Callout */}
              <div className="pt-3 border-t border-slate-200">
                <div className="p-3 rounded-sm bg-white border border-[#00a8e8]/30 flex items-center gap-2.5 text-xs font-bold text-[#0a1d37]">
                  <Award className="w-4 h-4 text-[#00a8e8] shrink-0" />
                  <span>{proj.keyOutcome}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
