import React, { useState } from 'react';
import { Star, Quote, ArrowRight, ShieldCheck, CheckCircle2, Building2, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, CLIENT_REVIEWS } from '../data/companyData';

interface OurClientsSectionProps {
  onOpenQuoteModal: (subject?: string) => void;
  onNavigateToCaseStudies?: () => void;
}

interface ClientLogoItem {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  fallbackText: string;
}

const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'reliance',
    name: 'Reliance Industries Limited',
    category: 'Conglomerate & Refining',
    imageSrc: '/assets/clients/reliance.png',
    fallbackText: 'Reliance Industries'
  },
  {
    id: 'nestle',
    name: 'Nestlé',
    category: 'Food & Beverage Manufacturing',
    imageSrc: '/assets/clients/nestle.png',
    fallbackText: 'Nestlé'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Technology & Cloud Campus',
    imageSrc: '/assets/clients/microsoft.png',
    fallbackText: 'Microsoft'
  },
  {
    id: 'fortune',
    name: 'FORTUNE - Member ITC’s Hotel Group',
    category: 'Hospitality & Luxury Hotels',
    imageSrc: '/assets/clients/fortune.png',
    fallbackText: 'Fortune Hotels'
  },
  {
    id: 'gmr',
    name: 'GMR Group',
    category: 'Aviation & Infrastructure',
    imageSrc: '/assets/clients/gmr.png',
    fallbackText: 'GMR Group'
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    category: 'Automotive & Heavy Manufacturing',
    imageSrc: '/assets/clients/mahindra.png',
    fallbackText: 'Mahindra'
  },
  {
    id: 'airtel',
    name: 'Airtel',
    category: 'Telecommunications & Data Centers',
    imageSrc: '/assets/clients/airtel.png',
    fallbackText: 'Airtel'
  },
  {
    id: 'apollo',
    name: 'Apollo Hospitals - Touching Lives',
    category: 'Healthcare & Multi-Specialty Campuses',
    imageSrc: '/assets/clients/apollo.png',
    fallbackText: 'Apollo Hospitals'
  },
  {
    id: 'schneider',
    name: 'Schneider Electric',
    category: 'Energy Management & Industrial Automation',
    imageSrc: '/assets/clients/schneider.png',
    fallbackText: 'Schneider Electric'
  },
  {
    id: 'dlf',
    name: 'DLF',
    category: 'Commercial Real Estate & CyberCity',
    imageSrc: '/assets/clients/dlf.png',
    fallbackText: 'DLF CyberCity'
  },
  {
    id: 'pg',
    name: 'P&G (Procter & Gamble)',
    category: 'Consumer Goods Manufacturing',
    imageSrc: '/assets/clients/pg.png',
    fallbackText: 'P&G'
  },
  {
    id: 'cadbury',
    name: 'Cadbury (Mondelez International)',
    category: 'Confectionery Plants',
    imageSrc: '/assets/clients/cadbury.png',
    fallbackText: 'Cadbury'
  }
];

export const OurClientsSection: React.FC<OurClientsSectionProps> = ({
  onOpenQuoteModal,
  onNavigateToCaseStudies
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const TRUST_STATS = [
    '500+ Enterprise Deployments',
    '15+ Core Industry Sectors',
    '99.4% Client Retention'
  ];

  return (
    <section id="our-clients-section" className="scroll-mt-24 py-20 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#eaf0f7] border-t-2 border-slate-300/80 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* MAIN 2-COLUMN SECTION MATCHING USER REFERENCE IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Title, Authentic Copy & "And Many More..." Action Button */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-6 bg-[#1D438A]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#1D438A] uppercase">
                  ENTERPRISE COLLABORATION
                </span>
              </div>

              {/* Exact Title from Reference Image */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a1d37] tracking-tight uppercase">
                OUR CLIENTS
              </h2>
            </div>

            {/* Exact Paragraph from Reference Image */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              With an extensive range of high-quality solutions, innovative technologies and production techniques, we continue to engineer reliable, versatile and cutting-edge automation and access control systems for gates, barriers, bollards, shutters, doors and parking spaces. Our products cater to organizations of all shapes and sizes, and across all industry sectors. The majority of our clients are large global establishments and long-time associates, who are highly satisfied with our expertise and service.
            </p>

            {/* Quick Trust Indicators */}
            <div className="flex flex-wrap gap-2 pt-1">
              {TRUST_STATS.map((stat) => (
                <div
                  key={stat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{stat}</span>
                </div>
              ))}
            </div>

            {/* Green Action Button matching reference image ("And Many More...") */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (onNavigateToCaseStudies) {
                    onNavigateToCaseStudies();
                  } else {
                    onOpenQuoteModal('Enterprise Reference Case & Client Portfolio');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>And Many More...</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenQuoteModal('Client Reference Inquiry')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Client Case References</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: 4x3 Grid of 12 Client Logos */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              {CLIENT_LOGOS.map((client) => {
                const hasError = imageErrors[client.id];

                return (
                  <div
                    key={client.id}
                    title={client.name}
                    className="group relative bg-white rounded-xl border border-slate-200/90 p-4 h-24 sm:h-28 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:border-[#00a8e8] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {!hasError ? (
                      <img
                        src={client.imageSrc}
                        alt={client.name}
                        onError={() => handleImageError(client.id)}
                        className="max-h-12 sm:max-h-14 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-1">
                        <Building2 className="w-5 h-5 text-[#1D438A] mb-1 opacity-70" />
                        <span className="font-display font-bold text-xs text-slate-900 line-clamp-2 leading-tight">
                          {client.fallbackText}
                        </span>
                      </div>
                    )}

                    {/* Subtle category tag visible on hover */}
                    <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-slate-900/90 to-transparent text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 truncate">
                      {client.category}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[11px] text-slate-500 mt-4">
              *Trademarks, trade names, and company logos shown remain the property of their respective corporate holders.
            </p>
          </div>

        </div>

        {/* INTEGRATED GOOGLE REVIEWS & TESTIMONIALS STRIP */}
        <div className="space-y-8 pt-6 border-t border-slate-200">
          
          {/* Header with Google Rating Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-600 font-bold shadow-2xs">
                <span className="font-display text-xl leading-none">{COMPANY_INFO.googleRating}</span>
                <span className="text-[10px] text-amber-500 mt-0.5">/ 5.0</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="font-display text-base font-bold text-[#0a1d37] mt-1">
                  Google Verified Rating • {COMPANY_INFO.googleReviewCount} Reviews
                </h3>
                <p className="text-xs text-slate-600">
                  Direct feedback from facility directors, toll concessionaires, and security architects across India.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteModal('Join Satisfied Clients')}
              className="px-5 py-2.5 rounded-lg bg-[#1D438A] hover:bg-[#0a1d37] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              Join 500+ Satisfied Clients
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLIENT_REVIEWS.map((t) => (
              <div
                key={t.id}
                className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-4 relative shadow-2xs hover:shadow-md hover:border-[#00a8e8] transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(Math.round(t.rating))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-100">
                      Verified
                    </span>
                  </div>

                  <Quote className="w-5 h-5 text-slate-300" />

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="font-display text-xs font-bold text-[#0a1d37]">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
