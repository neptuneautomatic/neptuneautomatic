import React, { useState, useEffect } from 'react';
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
  Check, 
  Lock,
  Cpu,
  Share2,
  Maximize2,
  ShieldAlert
} from 'lucide-react';
import { Product, ProductDownloadResource, NavPage, AccessAutomationCategory } from '../types';
import { ACCESS_AUTOMATION_CATEGORIES } from '../data/accessAutomationCategories';
import { ALL_NEPTUNE_PRODUCTS } from '../data/products/allProducts';
import { COMPANY_INFO } from '../data/companyData';
import { DownloadModal } from './DownloadModal';
import { getProductHierarchy } from '../utils/urlRouter';

interface ProductPageProps {
  productId: string;
  onNavigateHome: () => void;
  onNavigateProducts?: () => void;
  onNavigateAccessAutomation?: () => void;
  onNavigateCategory: (category: AccessAutomationCategory) => void;
  onSelectProduct: (productId: string) => void;
  onOpenQuoteModal: (subject?: string) => void;
  onNavigateAccessControl?: (subCategory?: string) => void;
  onNavigateParkingSolutions?: (subCategory?: string) => void;
  onNavigateAccessories?: (subCategory?: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  productId,
  onNavigateHome,
  onNavigateProducts,
  onNavigateAccessAutomation,
  onNavigateCategory,
  onSelectProduct,
  onOpenQuoteModal,
  onNavigateAccessControl,
  onNavigateParkingSolutions,
  onNavigateAccessories,
}) => {
  const product = ALL_NEPTUNE_PRODUCTS.find(p => p.id === productId) || ALL_NEPTUNE_PRODUCTS[0];
  const hierarchy = getProductHierarchy(product);
  const categoryData = ACCESS_AUTOMATION_CATEGORIES.find(c => c.id === hierarchy.subcategory) || ACCESS_AUTOMATION_CATEGORIES[0];

  // Gallery state
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Gated download modal state
  const [selectedDownloadResource, setSelectedDownloadResource] = useState<ProductDownloadResource | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Related products from the same category
  const relatedProducts = ALL_NEPTUNE_PRODUCTS
    .filter(p => p.accessCategory === product.accessCategory && p.id !== product.id)
    .slice(0, 3);

  // If not enough related in same category, grab from all products
  const fallbackRelated = relatedProducts.length < 3
    ? [...relatedProducts, ...ALL_NEPTUNE_PRODUCTS.filter(p => p.id !== product.id && !relatedProducts.some(rp => rp.id === p.id))].slice(0, 3)
    : relatedProducts;

  // Sync image index on product change
  useEffect(() => {
    setSelectedImageIndex(0);
    setOpenFaqIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const handleDownloadClick = (resource: ProductDownloadResource) => {
    setSelectedDownloadResource(resource);
    setIsDownloadModalOpen(true);
  };

  // Build JSON-LD structured data
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.modelCode,
    mpn: product.modelCode,
    brand: {
      '@type': 'Brand',
      name: 'Neptune Automatic'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Neptune Automatic Pvt. Ltd.',
      url: window.location.origin
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: 'Contact for Enterprise Quotation',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Neptune Automatic Pvt. Ltd.'
      }
    }
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: window.location.origin
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${window.location.origin}/products`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryData.name,
        item: `${window.location.origin}/products/${hierarchy.category}/${hierarchy.subcategory}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: window.location.href
      }
    ]
  };

  const jsonLdFaq = product.faqs && product.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map(faq => ({
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
      
      {/* 16. SEO JSON-LD Structured Data Injection */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} 
      />
      {jsonLdFaq && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* 1. Dynamic Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto py-1" aria-label="Breadcrumb">
          <button 
            onClick={onNavigateHome}
            className="hover:text-[#1D438A] transition-colors shrink-0 cursor-pointer"
          >
            Home
          </button>
          <span>/</span>

          {onNavigateProducts && (
            <>
              <button 
                onClick={onNavigateProducts}
                className="hover:text-[#1D438A] transition-colors shrink-0 cursor-pointer"
              >
                Products
              </button>
              <span>/</span>
            </>
          )}

          {/* Access Control products */}
          {hierarchy.category === 'access-control' ? (
            <>
              <button
                onClick={() => onNavigateAccessControl?.()}
                className="hover:text-[#1D438A] transition-colors shrink-0 font-semibold text-slate-700 cursor-pointer"
              >
                Access Control
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigateAccessControl?.(hierarchy.subcategory)}
                className="hover:text-[#1D438A] transition-colors shrink-0 text-slate-600 cursor-pointer"
              >
                {hierarchy.subcategory === 'uhf-rfid' ? 'UHF RFID Readers' :
                 hierarchy.subcategory === 'smart-card' ? 'Smart Card Readers' :
                 hierarchy.subcategory === 'pedestrian-gates' ? 'Pedestrian Gates' : 'Vehicle Access'}
              </button>
            </>
          ) : hierarchy.category === 'parking-solutions' ? (
            /* Parking Solutions products */
            <>
              <button
                onClick={() => onNavigateParkingSolutions?.()}
                className="hover:text-[#1D438A] transition-colors shrink-0 font-semibold text-slate-700 cursor-pointer"
              >
                Parking Solutions
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigateParkingSolutions?.(hierarchy.subcategory)}
                className="hover:text-[#1D438A] transition-colors shrink-0 text-slate-600 cursor-pointer"
              >
                {hierarchy.subcategory === 'management' ? 'Parking Management' :
                 hierarchy.subcategory === 'guidance' ? 'Parking Guidance' :
                 hierarchy.subcategory === 'counting' ? 'Parking Counting' : 'Vehicular Access'}
              </button>
            </>
          ) : hierarchy.category === 'accessories' ? (
            /* Accessories products */
            <>
              <button
                onClick={() => onNavigateAccessories?.()}
                className="hover:text-[#1D438A] transition-colors shrink-0 font-semibold text-slate-700 cursor-pointer"
              >
                Accessories
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigateAccessories?.(hierarchy.subcategory)}
                className="hover:text-[#1D438A] transition-colors shrink-0 text-slate-600 cursor-pointer"
              >
                {hierarchy.subcategory === 'safety-devices' ? 'Safety Devices' :
                 hierarchy.subcategory === 'pulse-generators' ? 'Pulse Generators' :
                 hierarchy.subcategory === 'radio-transmitters' ? 'Radio RF' :
                 hierarchy.subcategory === 'gate-locks' ? 'Gate Locks' : 'Traffic Signals'}
              </button>
            </>
          ) : (
            /* Access Automation products */
            <>
              <button
                onClick={() => onNavigateAccessAutomation ? onNavigateAccessAutomation() : onNavigateCategory(hierarchy.subcategory as AccessAutomationCategory)}
                className="hover:text-[#1D438A] transition-colors shrink-0 font-semibold text-slate-700 cursor-pointer"
              >
                Access Automation
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigateCategory(hierarchy.subcategory as AccessAutomationCategory)}
                className="hover:text-[#1D438A] transition-colors shrink-0 text-slate-600 cursor-pointer"
              >
                {categoryData.name}
              </button>
            </>
          )}

          <span>/</span>
          <span className="text-[#1D438A] font-bold truncate">
            {product.name}
          </span>
        </nav>

        {/* 2. Product Hero Section */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
            
            {/* Gallery Column (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden group">
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#1D438A] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {product.modelCode}
                  </span>
                  {product.isFlagship && (
                    <span className="px-2.5 py-1 rounded-full bg-[#D7282F] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      Flagship Model
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-16 rounded-md border-2 overflow-hidden bg-slate-50 transition-all shrink-0 ${
                        selectedImageIndex === idx 
                          ? 'border-[#1D438A] ring-2 ring-[#1D438A]/20 scale-105' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Fast Fact Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-center">
                {product.specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-md bg-slate-50 border border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {spec.label}
                    </div>
                    <div className="text-xs font-extrabold text-[#0a1d37] mt-0.5 truncate">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Meta & Action Column (lg:col-span-6) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>
                    {hierarchy.category === 'access-control'
                      ? (hierarchy.subcategory === 'uhf-rfid' ? 'UHF RFID Readers' :
                         hierarchy.subcategory === 'smart-card' ? 'Smart Card Readers' :
                         hierarchy.subcategory === 'pedestrian-gates' ? 'Pedestrian Gates' : 'Vehicle Access')
                      : hierarchy.category === 'parking-solutions'
                      ? (hierarchy.subcategory === 'management' ? 'Parking Management' :
                         hierarchy.subcategory === 'guidance' ? 'Parking Guidance' :
                         hierarchy.subcategory === 'counting' ? 'Parking Counting' : 'Vehicular Access')
                      : hierarchy.category === 'accessories'
                      ? (hierarchy.subcategory === 'safety-devices' ? 'Safety Devices' :
                         hierarchy.subcategory === 'pulse-generators' ? 'Pulse Generators' :
                         hierarchy.subcategory === 'radio-transmitters' ? 'Radio RF' :
                         hierarchy.subcategory === 'gate-locks' ? 'Gate Locks' : 'Traffic Signals')
                      : categoryData.name}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1d37] tracking-tight leading-tight">
                  {product.name}
                </h1>

                <p className="text-sm sm:text-base text-[#1D438A] font-semibold">
                  {product.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {product.description}
                </p>

                {/* Key Quick Highlights */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Core Engineering Highlights:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs & Procurement Actions */}
              <div className="space-y-3.5 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenQuoteModal(`Project Sizing & Quote: ${product.name} (${product.modelCode})`)}
                    className="flex-1 py-3 px-5 bg-[#1D438A] hover:bg-[#153266] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Request Technical Quote / Sizing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {product.downloads && product.downloads.length > 0 && (
                    <button
                      onClick={() => handleDownloadClick(product.downloads![0])}
                      className="py-3 px-5 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Datasheet (PDF)</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Direct Factory Consultation • Sector 59 Noida
                  </span>
                  <a 
                    href="tel:+918010807000" 
                    className="flex items-center gap-1 font-bold text-[#1D438A] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 8010 807 000</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Specialized Solution Architecture & Workflow Section */}
        {product.problemStatement && (
          <div className="bg-red-50/50 border border-red-200 rounded-xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-[#D7282F] font-bold text-sm uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Operational Problem & Industry Challenge</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {product.problemStatement}
            </p>
          </div>
        )}

        {product.solutionArchitecture && product.solutionArchitecture.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                Engineered Turnkey Solution
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Integrated System Architecture & Hardware Components
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.solutionArchitecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{arch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.systemWorkflow && product.systemWorkflow.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                Step-by-Step Operation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Operational Lane Workflow
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {product.systemWorkflow.map(step => (
                <div key={step.step} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#1D438A] text-white text-xs font-bold flex items-center justify-center mb-2">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-[#0a1d37] text-xs mb-1.5">{step.title}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.roiMetrics && product.roiMetrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.roiMetrics.map((metric, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-900 to-[#1D438A] text-white p-6 rounded-xl shadow-sm">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mb-1">{metric.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/90 mb-1">{metric.label}</div>
                <div className="text-[11px] text-blue-100 leading-relaxed">{metric.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Detailed Product Overview Section */}
        {product.overview && (
          <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                  Engineering Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                  Architecture & Design Rationale
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                Sector-59 Noida R&D
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
              {product.overview}
            </div>
          </div>
        )}

        {/* 4. Detailed Features Section */}
        {product.detailedFeatures && product.detailedFeatures.length > 0 && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                Industrial Engineering
              </span>
              <h2 className="text-2xl font-extrabold text-[#0a1d37]">
                Key Engineering Subsystems & Technology
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.detailedFeatures.map((df, i) => (
                <div 
                  key={i} 
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-[#1D438A]/50 transition-all space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D438A] flex items-center justify-center font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0a1d37]">
                    {df.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {df.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Comprehensive Specifications Table & 6. Civil / Electrical Data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Specs Table (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                  Technical Parameters
                </span>
                <h2 className="text-xl font-bold text-[#0a1d37]">
                  Verified Hardware Specifications
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {product.modelCode}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200">
                    <th className="py-2.5 px-4 font-bold text-slate-700 w-1/2">Parameter / Specification</th>
                    <th className="py-2.5 px-4 font-bold text-[#0a1d37] w-1/2">Verified Value / Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {product.specs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-medium text-slate-600">{spec.label}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{spec.value}</td>
                    </tr>
                  ))}
                  {product.certifications && (
                    <tr className="bg-blue-50/30">
                      <td className="py-2.5 px-4 font-medium text-slate-600">Certifications & Standards</td>
                      <td className="py-2.5 px-4 font-bold text-[#1D438A]">{product.certifications.join(' • ')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Civil & Compatibility Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Civil & Foundation */}
            {product.installationRequirements && product.installationRequirements.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-2">
                  <Settings className="w-4 h-4 text-[#1D438A]" />
                  <span>Civil & Foundation Guidelines</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {product.installationRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D438A] mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Interoperability */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-100 pb-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>System Interoperability</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.compatibility.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quality & Origin */}
            <div className="bg-gradient-to-br from-[#0a1d37] to-[#143156] rounded-xl p-6 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00a8e8]">
                <Award className="w-4 h-4" />
                <span>Quality Governance</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Fabricated and tested at Neptune Automatic Pvt. Ltd., Sector-59 Noida facility under certified ISO 9001:2015 quality management procedures.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onOpenQuoteModal(`Tender Specification: ${product.name}`)}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Custom CAD / Tender Specs</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 7. Industry Applications & Use Cases */}
        {product.useCases && product.useCases.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                  Operational Deployment
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                  Mission-Critical Sector Applications
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.useCases.map((uc, i) => (
                <div key={i} className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0a1d37]">
                    <Factory className="w-4 h-4 text-[#1D438A]" />
                    <span>{uc.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {uc.description || uc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. Technical Downloads & Documentation (GATED BEHIND DownloadModal) */}
        <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold mb-1">
                <Lock className="w-3 h-3 text-[#1D438A]" />
                <span>Gated Technical Repository</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                Technical Downloads & Specifications
              </h2>
              <p className="text-xs text-slate-500">
                Official engineering documents verified for architects, MEP consultants, and tender procurement.
              </p>
            </div>
            <div className="text-[11px] text-slate-400 font-medium shrink-0">
              Form verification required before file release
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(product.downloads || [
              { title: 'Technical Datasheet', type: 'Datasheet', filename: product.datasheetName, fileSize: '1.4 MB' },
              { title: 'Civil Foundation CAD Schematic', type: 'CAD Drawing', filename: `${product.modelCode}_Foundation_CAD.pdf`, fileSize: '2.2 MB' },
              { title: 'Architectural Tender Specification', type: 'Specification Guide', filename: `${product.modelCode}_Tender_Spec.pdf`, fileSize: '850 KB' }
            ]).map((doc, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#1D438A] transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#1D438A]/10 text-[#1D438A] flex items-center justify-center shrink-0 group-hover:bg-[#1D438A] group-hover:text-white transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0a1d37] truncate group-hover:text-[#1D438A] transition-colors">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono truncate">
                      {doc.filename}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200/80 rounded-xs text-[10px] text-slate-700 font-semibold">
                      {doc.type} {doc.fileSize ? `• ${doc.fileSize}` : ''}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadClick(doc as ProductDownloadResource)}
                  className="w-full py-2 px-3 bg-white hover:bg-[#1D438A] text-[#1D438A] hover:text-white border border-[#1D438A] text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unlock & Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 13. Frequently Asked Questions (FAQ) */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#1D438A] uppercase tracking-wider">
                  Technical Knowledge Base
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                  Frequently Asked Questions
                </h2>
              </div>
              <HelpCircle className="w-5 h-5 text-[#1D438A]" />
            </div>

            <div className="space-y-3">
              {product.faqs.map((faq, idx) => (
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

        {/* 14. Related Products / Alternative Models */}
        {fallbackRelated.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-[#1D438A] uppercase tracking-wider">
                  Alternative Models
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a1d37]">
                  Related {categoryData.name}
                </h2>
              </div>
              <button
                onClick={() => product.accessCategory && onNavigateCategory(product.accessCategory)}
                className="text-xs font-bold text-[#1D438A] hover:underline flex items-center gap-1"
              >
                <span>View Full Category ({categoryData.productIds.length} Models)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {fallbackRelated.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectProduct(rel.id)}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1D438A] transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="aspect-4/3 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-2">
                      <img 
                        src={rel.image} 
                        alt={rel.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                        {rel.modelCode}
                      </span>
                      <h3 className="text-sm font-bold text-[#0a1d37] group-hover:text-[#1D438A] transition-colors line-clamp-2">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {rel.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1D438A]">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 15. Final Call-to-Action Banner */}
        <div className="bg-gradient-to-r from-[#0a1d37] to-[#1D438A] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#00a8e8] text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Direct Factory Engineering Support</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Need Sizing, CAD Schematics or a Customized Tender Quote?
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
              Connect directly with our application engineers at Neptune House, Sector-59 Noida. We provide site feasibility surveys, foundation drawings, and turnkey integration specifications with zero obligation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenQuoteModal(`Direct Factory Consultation: ${product.name}`)}
                className="py-3 px-6 bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Project Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918010807000"
                className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-lg border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00a8e8]" />
                <span>Call Factory Desk: +91 8010 807 000</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Gated Technical Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        product={product}
        resource={selectedDownloadResource}
        onOpenConsultation={(subject) => onOpenQuoteModal(subject)}
      />

    </div>
  );
};
