import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Phone, 
  Calendar, 
  Download,
  Share2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/companyData';

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudy;
  onNavigateHome: () => void;
  onNavigateToCaseStudiesList: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenQuoteModal: (subject?: string) => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({
  caseStudy,
  onNavigateHome,
  onNavigateToCaseStudiesList,
  onSelectCaseStudy,
  onOpenQuoteModal
}) => {
  const otherStudies = CASE_STUDIES.filter(cs => cs.id !== caseStudy.id).slice(0, 3);

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
            onClick={onNavigateToCaseStudiesList}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Case Studies
          </button>
          <span>/</span>
          <span className="text-slate-400 shrink-0">{caseStudy.sector}</span>
          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate max-w-xs sm:max-w-md">
            {caseStudy.client}
          </span>
        </nav>

        {/* 2. Hero Header Card (White Theme) */}
        <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D438A] text-xs font-bold uppercase tracking-wider">
              {caseStudy.badge}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#D7282F]" />
              {caseStudy.location}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Enterprise Deployment
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-logo tracking-tight leading-tight">
            {caseStudy.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Building2 className="w-4 h-4 text-[#00a8e8]" />
            <span>Client: <strong className="text-slate-800">{caseStudy.client}</strong></span>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            {caseStudy.metrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1D438A]">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onOpenQuoteModal(`Case Study Inquiry: ${caseStudy.title}`)}
              className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Request Similar Project Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:08010807000"
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#0a1d37] text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00a8e8]" />
              <span>Plant Engineering Desk: 080108 07000</span>
            </a>
          </div>
        </header>

        {/* 3. Featured Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md max-h-[480px] bg-slate-950 border border-slate-200">
          <img 
            src={caseStudy.image} 
            alt={caseStudy.title}
            className="w-full h-full object-cover object-center max-h-[480px]"
          />
          <div className="absolute bottom-3 left-4 bg-black/75 backdrop-blur-sm text-white text-[11px] font-mono px-3 py-1.5 rounded-md border border-white/20">
            Engineered & Deployed by Neptune Automatic Noida
          </div>
        </div>

        {/* 4. Challenge vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenge */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D7282F] text-xs font-bold uppercase tracking-wider border border-red-200">
              Operational Challenge
            </div>
            <h3 className="text-xl font-bold text-[#0a1d37]">
              The Problem Statement
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              Hardware & Software Deployment
            </div>
            <h3 className="text-xl font-bold text-[#0a1d37]">
              The Neptune Solution
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* 5. Measured Engineering Results */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#00a8e8]" />
              <span>Quantifiable Project Outcomes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gradient-logo">
              Key Impact & Deliverables
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.results.map((result, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-800 font-medium leading-relaxed">
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Other Case Studies Slider / Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-gradient-logo">
              Explore Other Enterprise Deployments
            </h2>
            <button
              onClick={onNavigateToCaseStudiesList}
              className="text-xs font-bold text-[#1D438A] hover:text-[#00a8e8] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Case Studies</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectCaseStudy(other)}
                className="group rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#1D438A] hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-900 relative overflow-hidden">
                    <img 
                      src={other.image} 
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 text-white text-[11px] font-bold">
                      {other.badge}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#1D438A] transition-colors line-clamp-2 text-sm leading-snug">
                      {other.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      Client: {other.client}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 text-xs font-bold text-[#1D438A] flex items-center gap-1">
                  <span>View Case Study</span>
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
