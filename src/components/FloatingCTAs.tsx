import React from 'react';
import { MessageSquare, Phone, FileText, ArrowUp, SlidersHorizontal } from 'lucide-react';

interface FloatingCTAsProps {
  onOpenQuoteModal: () => void;
  onOpenCompareModal?: () => void;
}

export const FloatingCTAs: React.FC<FloatingCTAsProps> = ({ 
  onOpenQuoteModal,
  onOpenCompareModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="floating-actions-container" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      
      {/* Scroll to Top */}
      <button
        id="btn-scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-[#0a1d37] hover:text-[#00a8e8] border border-slate-300 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Compare Hardware Matrix Button */}
      {onOpenCompareModal && (
        <button
          id="btn-floating-compare"
          onClick={onOpenCompareModal}
          className="group flex items-center gap-2 px-3 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0a1d37] font-medium text-xs shadow-md border border-slate-300 transition-all duration-200 transform hover:scale-105 cursor-pointer"
          title="Compare Hardware Specifications"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#00a8e8]" />
          <span className="hidden sm:inline font-bold">Compare Specs</span>
        </button>
      )}

      {/* WhatsApp Quick Chat */}
      <a
        id="btn-whatsapp-floating"
        href="https://wa.me/919555500300?text=Hello%20Neptune%20Automatic%20team,%20I%20would%20like%20to%20enquire%20about%20your%20security%20and%20access%20automation%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Neptune Automatic expert"
        className="group flex items-center gap-2 px-3 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-md border border-emerald-500 transition-all duration-200 transform hover:scale-105"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline font-semibold">WhatsApp Us</span>
      </a>

      {/* Direct Call Button */}
      <a
        id="btn-call-floating"
        href="tel:+918010807000"
        aria-label="Call Neptune Automatic helpline"
        className="flex sm:hidden items-center justify-center w-11 h-11 rounded-full bg-[#0a1d37] text-white border border-slate-700 shadow-md"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Get a Quote Action Pill */}
      <button
        id="btn-floating-quote"
        onClick={onOpenQuoteModal}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0a1d37] hover:bg-[#1a3c6d] text-white font-bold text-xs sm:text-sm shadow-xl border border-[#00a8e8] transition-all duration-200 transform hover:scale-105 cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a8e8] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00a8e8]"></span>
        </span>
        <FileText className="w-4 h-4 text-[#00a8e8]" />
        <span>Get a Quote</span>
      </button>

    </div>
  );
};
