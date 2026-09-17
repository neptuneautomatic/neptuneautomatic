import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote } from 'lucide-react';
import { COMPANY_INFO, CLIENT_REVIEWS, TRUST_SECTORS } from '../data/companyData';

interface ClientsAndReviewsProps {
  onOpenQuoteModal: () => void;
}

export const ClientsAndReviews: React.FC<ClientsAndReviewsProps> = ({ onOpenQuoteModal }) => {
  const verifiedLogos = [
    'DLF CyberCity',
    'GMR International Airports',
    'Delhi Metro Rail Corp',
    'Tata Steel Plants',
    'Larsen & Toubro',
    'Reliance Industries',
    'Infosys Technologies',
    'Adani Group Ports',
    'Godrej Properties',
    'Oberoi Luxury Hotels',
    'AIIMS Healthcare Campuses',
    'Fortis Healthcare'
  ];

  return (
    <section id="clients-reviews-section" className="py-20 bg-[#f1f5f9] border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Client Logos Strip */}
        <div className="space-y-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
            TRUSTED BY INDIA’S FOREMOST INFRASTRUCTURE LEADERS & ENTERPRISES
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {verifiedLogos.map((client) => (
              <div
                key={client}
                className="px-4 py-2.5 rounded-sm bg-white border border-slate-200 text-slate-800 hover:text-[#00a8e8] hover:border-[#00a8e8] text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-2xs"
              >
                {client}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {TRUST_SECTORS.map((sector) => (
              <span key={sector} className="text-[11px] font-mono text-[#0a1d37] px-2.5 py-1 rounded-sm bg-white border border-slate-200 font-semibold">
                • {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Google Reviews Badge & Testimonials */}
        <div className="space-y-10">
          
          {/* Header with Google Rating Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-sm bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-sm bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-600 font-bold">
                <span className="font-display text-xl leading-none">{COMPANY_INFO.googleRating}</span>
                <span className="text-[10px] text-amber-500">/ 5.0</span>
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
                  Real feedback from facility directors, project heads, and security architects across India.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-sm bg-[#0a1d37] hover:bg-[#1a3c6d] text-white text-xs font-bold transition-colors shrink-0"
            >
              Join 500+ Satisfied Clients
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_REVIEWS.map((t) => (
              <div
                key={t.id}
                className="rounded-sm bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-4 relative shadow-sm group hover:border-[#00a8e8] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(Math.round(t.rating))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-[#00a8e8] font-bold uppercase">
                      Verified Review
                    </span>
                  </div>

                  <Quote className="w-6 h-6 text-slate-300 group-hover:text-[#00a8e8] transition-colors" />

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="font-display text-sm font-bold text-[#0a1d37]">
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
