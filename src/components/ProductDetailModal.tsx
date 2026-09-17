import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  Download, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Settings, 
  Activity,
  Cpu,
  Share2,
  Check,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/companyData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenQuoteModal: (productName: string) => void;
  onSelectRelatedProduct: (product: Product) => void;
  onNavigateToProductPage?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuoteModal,
  onSelectRelatedProduct,
  onNavigateToProductPage
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleDownloadDatasheet = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);

    // Create a virtual download trigger
    const element = document.createElement('a');
    const file = new Blob([
      `NEPTUNE AUTOMATIC PVT. LTD. - TECHNICAL DATASHEET\n\n` +
      `Product: ${product.name}\n` +
      `Model Code: ${product.modelCode}\n` +
      `Category: ${product.category}\n` +
      `Tagline: ${product.tagline}\n\n` +
      `SPECIFICATIONS:\n` +
      product.specs.map(s => `- ${s.label}: ${s.value}`).join('\n') +
      `\n\nFEATURES:\n` +
      product.features.map(f => `* ${f}`).join('\n') +
      `\n\nAPPLICATIONS:\n` +
      product.applications.join(', ') +
      `\n\nMANUFACTURING & SUPPORT:\n` +
      `Neptune Automatic Pvt. Ltd., A11, Sector-59, Noida - 201301, India.\n` +
      `Phone: +91 8010 807 000 | Web: Neptune Automatic Official Industrial Systems Portal`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = product.datasheetName.replace('.pdf', '.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-sm shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-sm bg-[#00a8e8]/10 text-[#00a8e8] text-xs font-bold uppercase tracking-wider border border-[#00a8e8]/30">
              {product.category}
            </span>
            <span className="font-mono text-xs text-slate-500">
              Model: <strong className="text-[#0a1d37]">{product.modelCode}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-[#0a1d37] hover:bg-slate-100 rounded-sm transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Copy link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#0a1d37] hover:bg-slate-100 rounded-sm transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Section of Product */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Product Imagery with technical frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden bg-slate-50 border border-slate-200 shadow-sm group min-h-[300px] sm:min-h-[380px] flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-72 sm:max-h-96 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://neptuneautomatic.com/wp-content/uploads/Boom-barrier-1.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-sm border border-slate-200 text-[11px] font-bold text-[#0a1d37] flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Made in India • Neptune Engineering
                </div>
              </div>
            </div>

            {/* Right: Primary Info & CTAs */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0a1d37] tracking-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-bold text-[#00a8e8] mt-1">
                  {product.tagline}
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Badges / Certifications */}
              <div className="flex flex-wrap gap-2 pt-1">
                {product.certifications.map((cert) => (
                  <span 
                    key={cert} 
                    className="px-2.5 py-1 rounded-sm bg-slate-100 text-slate-700 text-xs border border-slate-200 font-semibold"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-3">
                {product.accessCategory && onNavigateToProductPage && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToProductPage(product.id);
                    }}
                    className="px-5 py-3 rounded-sm bg-[#1D438A] hover:bg-[#15346D] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#3DA4ED]" />
                    <span>View Full 16-Section Product Page</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuoteModal(product.name);
                  }}
                  className="px-6 py-3 rounded-sm bg-[#0a1d37] hover:bg-[#1a3c6d] text-white font-bold text-sm shadow-md border border-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#00a8e8]" />
                  <span>Request Product Quote</span>
                </button>

                <button
                  onClick={handleDownloadDatasheet}
                  className="px-5 py-3 rounded-sm bg-white hover:bg-slate-50 text-[#0a1d37] hover:text-[#00a8e8] font-bold text-sm border border-slate-300 flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#00a8e8]" />
                  <span>Quick Spec Sheet</span>
                </button>
              </div>

              {downloadSuccess && (
                <div className="p-3 rounded-sm bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.datasheetName} has been generated and downloaded.</span>
                </div>
              )}
            </div>

          </div>

          {/* Key Features & Engineering Highlights */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#00a8e8]" />
              <span>Engineering Highlights & Key Features</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0a1d37] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00a8e8]" />
                <span>Technical Specifications</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Model: {product.modelCode}
              </span>
            </div>

            <div className="rounded-sm border border-slate-200 overflow-hidden bg-white shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="py-3 px-4 font-bold w-1/3">Parameter</th>
                    <th className="py-3 px-4 font-bold">Specification Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {product.specs.map((spec, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-500 font-medium">{spec.label}</td>
                      <td className="py-3 px-4 text-[#0a1d37] font-bold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Applications & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            {/* Applications */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#0a1d37] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00a8e8]" />
                <span>Typical Applications</span>
              </h4>
              <div className="space-y-2">
                {product.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a8e8]" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#0a1d37] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00a8e8]" />
                <span>Operational Benefits</span>
              </h4>
              <div className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="font-display text-base font-bold text-[#0a1d37]">
                Related {product.category} Solutions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="p-3 rounded-sm bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00a8e8] cursor-pointer transition-all group shadow-2xs"
                  >
                    <div className="h-28 rounded-sm overflow-hidden bg-white mb-2.5 border border-slate-200">
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="text-xs font-bold text-[#0a1d37] group-hover:text-[#00a8e8] transition-colors line-clamp-1">
                      {rel.name}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {rel.modelCode} • {rel.specs[1]?.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Conversion Prompt inside Product Page */}
          <div className="p-6 rounded-sm bg-slate-100 border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-base font-bold text-[#0a1d37]">
                Need Help Choosing the Right Model?
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Speak directly with Neptune Automatic’s solutions architects for custom boom lengths, crash ratings, and CAD layouts.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(product.name);
              }}
              className="px-5 py-2.5 rounded-sm bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-sm"
            >
              Talk to an Expert
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
