import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Settings, 
  Zap, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Phone, 
  Building2, 
  Factory, 
  Truck, 
  Home, 
  Lock,
  Cpu,
  Table,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { AccessAutomationCategory, Product, ProductDownloadResource } from '../types';
import { ACCESS_AUTOMATION_CATEGORIES } from '../data/accessAutomationCategories';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { DownloadModal } from './DownloadModal';

interface CategoryListingPageProps {
  categoryId: AccessAutomationCategory;
  onNavigateHome: () => void;
  onSelectCategory: (category: AccessAutomationCategory) => void;
  onSelectProduct: (productId: string) => void;
  onOpenQuoteModal: (subject?: string) => void;
}

export const CategoryListingPage: React.FC<CategoryListingPageProps> = ({
  categoryId,
  onNavigateHome,
  onSelectCategory,
  onSelectProduct,
  onOpenQuoteModal,
}) => {
  const category = ACCESS_AUTOMATION_CATEGORIES.find(c => c.id === categoryId) || ACCESS_AUTOMATION_CATEGORIES[0];

  // Fetch all products for this category
  const products = ALL_NEPTUNE_PRODUCTS.filter(p => category.productIds.includes(p.id));

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Download modal state
  const [selectedProductForDownload, setSelectedProductForDownload] = useState<Product | null>(null);
  const [selectedResourceForDownload, setSelectedResourceForDownload] = useState<ProductDownloadResource | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleOpenDownload = (product: Product, resource?: ProductDownloadResource) => {
    setSelectedProductForDownload(product);
    setSelectedResourceForDownload(
      resource || (product.downloads && product.downloads[0]) || {
        title: `${product.name} Technical Datasheet`,
        type: 'Datasheet',
        filename: product.datasheetName || `${product.modelCode}_Datasheet.pdf`,
        fileSize: '1.4 MB'
      }
    );
    setIsDownloadModalOpen(true);
  };

  // JSON-LD structured data for Category
  const jsonLdCategory = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.shortDescription,
    url: window.location.href,
    publisher: {
      '@type': 'Organization',
      name: 'Neptune Automatic Pvt. Ltd.',
      url: window.location.origin
    },
    hasPart: products.map(p => ({
      '@type': 'Product',
      name: p.name,
      model: p.modelCode,
      description: p.tagline,
      image: p.image
    }))
  };

  const jsonLdFaq = category.faqs && category.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 sm:pt-32 pb-20">
      
      {/* Category JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCategory) }} 
      />
      {jsonLdFaq && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 1. Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto py-1">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#1D438A] transition-colors shrink-0"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-500 shrink-0">Access Automation</span>
          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate">
            {category.name}
          </span>
        </nav>

        {/* 2. Category Hero Section */}
        <div className="relative rounded-2xl bg-white text-slate-900 p-8 sm:p-12 overflow-hidden shadow-sm border border-slate-200">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Cpu className="w-3.5 h-3.5 text-[#00a8e8]" />
              <span>{category.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0a1d37] leading-tight">
              {category.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {category.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {category.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => onOpenQuoteModal(`Category Consultation: ${category.name}`)}
                className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Category Quote / Sizing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918010807000"
                className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#0a1d37] text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00a8e8]" />
                <span>Noida Plant Desk: +91 8010 807 000</span>
              </a>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 hidden lg:block pointer-events-none">
            <img src={category.heroImage} alt={category.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {ACCESS_AUTOMATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                category.id === cat.id
                  ? 'bg-[#1D438A] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name} ({cat.productIds.length})
            </button>
          ))}
        </div>

        {/* 3. Engineering Philosophy & Overview */}
        <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                Engineering Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Technical Overview & System Capabilities
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold border border-blue-100">
              Sector-59 Noida Campus
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            {category.fullDescription.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Engineering Features Bullets */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Standard Category Architectural Features:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Complete Product Models Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                Hardware Catalog
              </span>
              <h2 className="text-2xl font-extrabold text-[#0a1d37]">
                Available Models ({products.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Click any model for comprehensive 16-section engineering datasheet
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1D438A] transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Image & Header */}
                <div 
                  onClick={() => onSelectProduct(prod.id)}
                  className="p-5 cursor-pointer space-y-4"
                >
                  <div className="relative aspect-4/3 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-3">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#1D438A] text-white text-[10px] font-bold font-mono shadow-xs">
                      {prod.modelCode}
                    </span>
                    {prod.isFlagship && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#D7282F] text-white text-[10px] font-bold uppercase shadow-xs">
                        Flagship
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {prod.tagline}
                    </p>
                  </div>

                  {/* Quick Specs Strip */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-left">
                    {prod.specs.slice(0, 2).map((sp, idx) => (
                      <div key={idx} className="bg-slate-50 p-2 rounded-xs border border-slate-100">
                        <div className="text-[10px] uppercase font-bold text-slate-400 truncate">{sp.label}</div>
                        <div className="text-xs font-bold text-[#0a1d37] truncate">{sp.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(prod.id)}
                    className="flex-1 py-2 px-3 bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>Full Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenDownload(prod)}
                    className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                    title={`Download Gated Datasheet for ${prod.name}`}
                  >
                    <Download className="w-3.5 h-3.5 text-[#D7282F]" />
                    <span className="hidden sm:inline">Datasheet</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Comprehensive Comparison Matrix */}
        <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                Engineering Comparison Matrix
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Compare Specifications Across Models
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Verified Factory Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-800">Model</th>
                  <th className="py-3 px-4 font-bold text-slate-800">Model Code</th>
                  {category.comparisonColumns.slice(1).map((col, idx) => (
                    <th key={idx} className="py-3 px-4 font-bold text-slate-800">{col}</th>
                  ))}
                  <th className="py-3 px-4 font-bold text-right text-slate-800">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod, i) => (
                  <tr key={prod.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3 px-4 font-bold text-[#0a1d37]">
                      {prod.name}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#1D438A]">
                      {prod.modelCode}
                    </td>
                    {category.comparisonColumns.slice(1).map((col, colIdx) => {
                      // Try to match col label to specs
                      const matchingSpec = prod.specs.find(s => 
                        s.label.toLowerCase().includes(col.toLowerCase().slice(0, 4))
                      );
                      return (
                        <td key={colIdx} className="py-3 px-4 text-slate-600">
                          {matchingSpec ? matchingSpec.value : (prod.specs[colIdx]?.value || '—')}
                        </td>
                      );
                    })}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectProduct(prod.id)}
                        className="text-xs font-bold text-[#1D438A] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Sector Applications */}
        <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                Industry Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Key Sector Applications
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.applications.map((app, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div className="w-10 h-10 rounded-md bg-[#1D438A]/10 text-[#1D438A] flex items-center justify-center">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0a1d37]">
                  {app.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Category FAQs */}
        {category.faqs && category.faqs.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                  Category Knowledge Base
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                  Frequently Asked Questions
                </h2>
              </div>
              <HelpCircle className="w-5 h-5 text-[#1D438A]" />
            </div>

            <div className="space-y-3">
              {category.faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#0a1d37]">
                      {faq.question}
                    </span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#1D438A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-[#0a1d37] to-[#1D438A] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#00a8e8] text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Sector 59 Noida Factory Desk</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Ready to Size or Quote {category.name} for Your Site?
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
              Our applications engineering team at Sector 59 Noida provides site surveys, AutoCAD foundation layouts, and direct factory procurement pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenQuoteModal(`Tender & Project Sizing: ${category.name}`)}
                className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918010807000"
                className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-lg border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00a8e8]" />
                <span>Call Factory: +91 8010 807 000</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Gated Technical Download Modal */}
      {selectedProductForDownload && (
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          product={selectedProductForDownload}
          resource={selectedResourceForDownload}
          onOpenConsultation={(subject) => onOpenQuoteModal(subject)}
        />
      )}

    </div>
  );
};
