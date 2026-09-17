import React, { useState, useEffect } from 'react';
import { 
  NavPage, 
  ProductCategory, 
  Product, 
  Solution, 
  AboutTab, 
  AccessAutomationCategory,
  AccessControlSubcategory,
  ParkingSolutionsSubcategory,
  AccessoriesSubcategory,
  ProductDownloadResource
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { TrustMetrics } from './components/TrustMetrics';
import { DiverseProductsSolutionsSection } from './components/DiverseProductsSolutionsSection';
import { EventsHomeSection } from './components/EventsHomeSection';
import { WhyNeptune } from './components/WhyNeptune';
import { IndustriesSection } from './components/IndustriesSection';
import { AboutSection } from './components/AboutSection';
import { MissionVisionSection } from './components/MissionVisionSection';
import { OurClientsSection } from './components/OurClientsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { ContactSection } from './components/ContactSection';
import { FloatingCTAs } from './components/FloatingCTAs';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { SubpageHeader } from './components/SubpageHeader';
import { GoogleMapLocation } from './components/GoogleMapLocation';
import { ClientMarquee } from './components/ClientMarquee';
import { InteractiveAccessSimulator } from './components/InteractiveAccessSimulator';
import { CareersPage } from './components/CareersPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { ProductCompareModal } from './components/ProductCompareModal';
import { CompanyFacilityShowcase } from './components/CompanyFacilityShowcase';
import { AccessAutomationHub } from './components/AccessAutomationHub';
import { CategoryListingPage } from './components/CategoryListingPage';
import { ProductPage } from './components/ProductPage';
import { AccessControlHub } from './components/AccessControlHub';
import { ParkingSolutionsHub } from './components/ParkingSolutionsHub';
import { AccessoriesHub } from './components/AccessoriesHub';
import { UnifiedProductsCatalog } from './components/UnifiedProductsCatalog';
import { SiteStructurePage } from './components/SiteStructurePage';
import { DownloadModal } from './components/DownloadModal';
import { BlogPostPage } from './components/BlogPostPage';
import { ParkingSubcategoryPage } from './components/ParkingSubcategoryPage';
import { CaseStudyDetailPage } from './components/CaseStudyDetailPage';
import { EventDetailPage } from './components/EventDetailPage';
import { PRODUCTS, BLOG_POSTS, CASE_STUDIES, INDUSTRY_EVENTS, COMPANY_INFO } from './data/companyData';
import { BlogPost, CaseStudy, IndustryEvent } from './types';
import { ALL_NEPTUNE_PRODUCTS } from './data/products/allProducts';
import { pageToPath, pathToPage, RouteExtra } from './utils/urlRouter';
import { DomesticSolutionsPage } from './components/DomesticSolutionsPage';
import { EventsPage } from './components/EventsPage';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { FaqsPage } from './components/FaqsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { BlogPage } from './components/BlogPage';
import { ChevronRight, Home, Shield, ArrowLeft, Building2, MapPin, Phone, ExternalLink } from 'lucide-react';

const SUBPAGE_CONFIG: Partial<Record<NavPage, { title: string; subtitle: string; badge: string }>> = {
  solutions: {
    title: 'Smart Parking Solutions & Mobility Automation',
    subtitle: 'Turnkey automated parking management (PMS), sensor guidance (PGS), loop counting, and AI license plate vehicular access engineered and manufactured at Neptune House Noida.',
    badge: 'Integrated Parking Ecosystem • 15+ Turnkey Systems'
  },
  'parking-solutions': {
    title: 'Smart Parking Solutions & Mobility Automation',
    subtitle: 'Turnkey automated parking management (PMS), sensor guidance (PGS), loop counting, and AI license plate vehicular access engineered and manufactured at Neptune House Noida.',
    badge: 'Integrated Parking Ecosystem • 15+ Turnkey Systems'
  },
  products: {
    title: 'Access Control, Access Automation & Certified Accessories',
    subtitle: 'Comprehensive industrial hardware catalog manufactured and certified at Neptune Automatic Noida: touchless & pedestrian access control, heavy vehicular automation barriers, and certified safety accessories.',
    badge: 'Unified Hardware Catalog • 65+ Models'
  },
  industries: {
    title: 'Mission-Critical Sector Architectures',
    subtitle: 'Turnkey automation systems configured for airports, defense perimeters, IT corporate parks, manufacturing plants, and residential societies.',
    badge: 'Sector Solutions'
  },
  'domestic-solutions': {
    title: 'Domestic & Residential Security Automation',
    subtitle: 'Smart, silent, and seamless perimeter entry automation engineered for residential societies, gated townships, and private luxury bungalows.',
    badge: 'Residential Ecosystem • 5,000+ Societies'
  },
  about: {
    title: 'Engineering Legacy & Corporate Heritage',
    subtitle: 'Over 20 years of continuous innovation in security automation and energy management from our campus in Sector 59 Noida, Uttar Pradesh.',
    badge: 'Since 2005 • Made in India'
  },
  achievements: {
    title: 'Two Decades of Engineering Milestones & Certifications',
    subtitle: 'ASTM M30/M50 crash ratings, BSI PAS 68 certifications, ISO 9001:2015 accredited QA, and 15,000+ national infrastructure deployments since 2005.',
    badge: 'Accreditations & Honors • Since 2005'
  },
  careers: {
    title: 'Build the Future of Access Automation & Security',
    subtitle: 'Join India\'s leading physical security and intelligent traffic automation manufacturer at our Sector-59 Noida campus.',
    badge: 'Careers at Neptune'
  },
  contact: {
    title: 'Contact Corporate HQ & Manufacturing Plant',
    subtitle: 'Connect directly with our Noida engineering team for site surveys, custom CAD specifications, distributor inquiries, and quotes.',
    badge: 'Sector-59 Noida Campus'
  },
  'quote-finder': {
    title: 'Instant Enterprise Quote & System Sizing',
    subtitle: 'Configure your lane parameters, duty cycles, vehicle throughput, and integration needs for an engineering estimate.',
    badge: 'Direct Factory Quotation'
  },
  privacy: {
    title: 'Privacy & Data Protection Policy',
    subtitle: 'Our enterprise commitment to safeguarding corporate, procurement, and technical project information.',
    badge: 'Legal & Privacy Governance'
  },
  terms: {
    title: 'Terms & Conditions of Service & Supply',
    subtitle: 'Commercial terms governing hardware procurement, engineering site surveys, and commissioning services.',
    badge: 'Commercial Governance'
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedAccessCategory, setSelectedAccessCategory] = useState<AccessAutomationCategory>('automatic-boom-barriers');
  const [selectedAccessControlSubcategory, setSelectedAccessControlSubcategory] = useState<AccessControlSubcategory>('all');
  const [selectedParkingSolutionsSubcategory, setSelectedParkingSolutionsSubcategory] = useState<ParkingSolutionsSubcategory>('all');
  const [selectedAccessoriesSubcategory, setSelectedAccessoriesSubcategory] = useState<AccessoriesSubcategory>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('power-fusion-xd-automatic-boom-barrier');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(BLOG_POSTS[0]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(CASE_STUDIES[0]);
  const [selectedEvent, setSelectedEvent] = useState<IndustryEvent | null>(INDUSTRY_EVENTS[0]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialSubject, setQuoteInitialSubject] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedResourceTab, setSelectedResourceTab] = useState<string>('all');
  const [selectedAboutTab, setSelectedAboutTab] = useState<AboutTab>('story');

  // Gated download modal state
  const [isGlobalDownloadModalOpen, setIsGlobalDownloadModalOpen] = useState(false);
  const [downloadModalProduct, setDownloadModalProduct] = useState<Product | null>(null);
  const [downloadModalResource, setDownloadModalResource] = useState<ProductDownloadResource | null>(null);

  const handleOpenDownloadModal = (product: Product, resource?: ProductDownloadResource) => {
    setDownloadModalProduct(product);
    setDownloadModalResource(resource || {
      title: `${product.name} Technical Datasheet`,
      type: 'Datasheet',
      filename: product.datasheetName || `${product.modelCode}_Technical_Sheet.pdf`,
      fileSize: '1.8 MB'
    });
    setIsGlobalDownloadModalOpen(true);
  };

  // Navigation router with History API URL synchronization
  const handleNavigate = (
    page: NavPage, 
    extra?: RouteExtra
  ) => {
    setCurrentPage(page);
    if (extra?.category) {
      setSelectedProductCategory(extra.category);
    }
    if (extra?.accessCategory) {
      setSelectedAccessCategory(extra.accessCategory);
    }
    if (extra?.accessControlSubcategory) {
      setSelectedAccessControlSubcategory(extra.accessControlSubcategory);
    }
    if (extra?.parkingSolutionsSubcategory) {
      setSelectedParkingSolutionsSubcategory(extra.parkingSolutionsSubcategory);
    }
    if (extra?.accessoriesSubcategory) {
      setSelectedAccessoriesSubcategory(extra.accessoriesSubcategory);
    }
    if (extra?.productId) {
      setSelectedProductId(extra.productId);
      const found = ALL_NEPTUNE_PRODUCTS.find(p => p.id === extra.productId) || PRODUCTS.find(p => p.id === extra.productId);
      if (found && page !== 'product-page') {
        setSelectedProductForModal(found);
      }
    }
    if (extra?.resourceTab) {
      setSelectedResourceTab(extra.resourceTab);
    }
    if (extra?.aboutTab) {
      setSelectedAboutTab(extra.aboutTab);
    } else if (page === 'achievements') {
      setSelectedAboutTab('achievements');
    }
    if (extra?.blogSlug) {
      const found = BLOG_POSTS.find(b => b.slug === extra.blogSlug || b.id === extra.blogSlug) || BLOG_POSTS[0];
      if (found) setSelectedBlogPost(found);
    }
    if (extra?.caseStudySlug) {
      const found = CASE_STUDIES.find(c => c.id === extra.caseStudySlug);
      if (found) setSelectedCaseStudy(found);
    }
    if (extra?.eventSlug) {
      const found = INDUSTRY_EVENTS.find(e => e.id === extra.eventSlug);
      if (found) setSelectedEvent(found);
    }

    // Push new canonical URL to browser history
    const newPath = pageToPath(page, extra);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to Browser Back / Forward buttons and initialize on direct URL load
  useEffect(() => {
    const syncFromLocation = (pathname: string) => {
      const match = pathToPage(pathname);
      setCurrentPage(match.page);
      if (match.extra?.category) setSelectedProductCategory(match.extra.category);
      if (match.extra?.accessCategory) setSelectedAccessCategory(match.extra.accessCategory);
      if (match.extra?.accessControlSubcategory) setSelectedAccessControlSubcategory(match.extra.accessControlSubcategory);
      if (match.extra?.parkingSolutionsSubcategory) setSelectedParkingSolutionsSubcategory(match.extra.parkingSolutionsSubcategory);
      if (match.extra?.accessoriesSubcategory) setSelectedAccessoriesSubcategory(match.extra.accessoriesSubcategory);
      if (match.extra?.productId) {
        setSelectedProductId(match.extra.productId);
        const found = ALL_NEPTUNE_PRODUCTS.find(p => p.id === match.extra.productId) || PRODUCTS.find(p => p.id === match.extra.productId);
        if (found && match.page !== 'product-page') {
          setSelectedProductForModal(found);
        }
      }
      if (match.extra?.resourceTab) setSelectedResourceTab(match.extra.resourceTab);
      if (match.extra?.aboutTab) {
        setSelectedAboutTab(match.extra.aboutTab);
      } else if (match.page === 'achievements') {
        setSelectedAboutTab('achievements');
      }
      if (match.extra?.blogSlug) {
        const found = BLOG_POSTS.find(b => b.slug === match.extra?.blogSlug || b.id === match.extra?.blogSlug) || BLOG_POSTS[0];
        if (found) setSelectedBlogPost(found);
      }
      if (match.extra?.caseStudySlug) {
        const found = CASE_STUDIES.find(c => c.id === match.extra?.caseStudySlug);
        if (found) setSelectedCaseStudy(found);
      }
      if (match.extra?.eventSlug) {
        const found = INDUSTRY_EVENTS.find(e => e.id === match.extra?.eventSlug);
        if (found) setSelectedEvent(found);
      }
    };

    // On initial page load: if URL is not '/', parse and activate matched page
    if (window.location.pathname && window.location.pathname !== '/') {
      syncFromLocation(window.location.pathname);
    }

    // On browser back/forward buttons
    const handlePopState = () => {
      syncFromLocation(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenQuoteModal = (subject?: string) => {
    setQuoteInitialSubject(subject || '');
    setIsQuoteModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductForModal(product);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#1D438A] selection:text-white">
      
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Page Rendering */}
      <main className="relative">
        
        {/* Dedicated Subpage Header with Authentic Neptune Company Building Background */}
        {currentPage !== 'home' && SUBPAGE_CONFIG[currentPage] && (
          <SubpageHeader
            page={currentPage}
            title={SUBPAGE_CONFIG[currentPage].title}
            subtitle={SUBPAGE_CONFIG[currentPage].subtitle}
            badge={SUBPAGE_CONFIG[currentPage].badge}
            onNavigateHome={() => handleNavigate('home')}
            onOpenQuoteModal={() => handleOpenQuoteModal(`${currentPage.toUpperCase()} Consultation`)}
          />
        )}

        {/* View Switching */}
        {currentPage === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExploreSolutions={() => handleNavigate('solutions')}
              onOpenQuoteModal={handleOpenQuoteModal}
              onSelectProduct={handleSelectProduct}
              onNavigateToPage={(page) => handleNavigate(page)}
              onNavigateToProductPage={(productId) => handleNavigate('product-page', { productId })}
            />

            {/* 2. Defining Our Future, Guided by Purpose (Mission & Vision) */}
            <MissionVisionSection
              onFindMore={() => handleNavigate('about', { aboutTab: 'story' })}
              onOpenQuoteModal={() => handleOpenQuoteModal('Mission & Strategy Brief')}
            />

            {/* 3. Infinite Continuous Client & Certification Marquee */}
            <ClientMarquee />

            {/* 4. Trust Metrics Strip */}
            <TrustMetrics />

            {/* 5. Diverse Range of Products & Solutions (4 Parent Categories from Mega-Menu) */}
            <DiverseProductsSolutionsSection
              onNavigate={handleNavigate}
              onOpenQuoteModal={handleOpenQuoteModal}
            />

            {/* 6. Interactive Real-Time Hardware & Access Simulator */}
            <InteractiveAccessSimulator onOpenQuoteModal={handleOpenQuoteModal} />

            {/* 7. Upcoming Expos & Industry Trade Shows Listing */}
            <EventsHomeSection
              onNavigate={handleNavigate}
              onOpenQuoteModal={handleOpenQuoteModal}
            />

            {/* 8. Why Neptune Value Proposition */}
            <WhyNeptune
              onOpenQuoteModal={() => handleOpenQuoteModal('Neptune Engineering Consultation')}
            />

            {/* 9. Heritage & Made in India Section */}
            <AboutSection
              initialTab={selectedAboutTab}
              onOpenQuoteModal={() => handleOpenQuoteModal('Factory Audit & Consultation')}
            />

            {/* 10. Our Clients (12 Enterprise Logos & Google Reviews) */}
            <OurClientsSection
              onOpenQuoteModal={(subject) => handleOpenQuoteModal(subject || 'Enterprise Reference Case')}
              onNavigateToCaseStudies={() => handleNavigate('case-studies')}
            />

            {/* 11. Direct Contact & Noida HQ */}
            <ContactSection />
          </>
        )}

        {(currentPage === 'solutions' || currentPage === 'parking-solutions') && (
          <div className="pb-12">
            <ParkingSolutionsHub
              initialSubcategory={selectedParkingSolutionsSubcategory}
              onSelectProduct={(prod) => {
                setSelectedProductId(prod.id);
                handleNavigate('product-page', { productId: prod.id });
              }}
              onRequestQuote={(solName) => handleOpenQuoteModal(solName ? `Parking Solution: ${solName}` : 'Smart Parking Consultation')}
              onOpenDownloadModal={(title, prod) => handleOpenDownloadModal(prod, {
                title,
                type: 'Datasheet',
                filename: prod.datasheetName || `${prod.modelCode}_Datasheet.pdf`,
                fileSize: '1.8 MB'
              })}
            />
          </div>
        )}

        {currentPage === 'products' && (
          <div className="pb-12 space-y-12">
            <UnifiedProductsCatalog
              onNavigateHome={() => handleNavigate('home')}
              onSelectProduct={(pId) => handleNavigate('product-page', { productId: pId })}
              onOpenQuoteModal={handleOpenQuoteModal}
              onOpenDownloadModal={(prod, resTitle) => handleOpenDownloadModal(prod, {
                title: resTitle || `${prod.name} Technical Datasheet`,
                type: 'Datasheet',
                filename: prod.datasheetName || `${prod.modelCode}_Datasheet.pdf`,
                fileSize: '1.6 MB'
              })}
              onNavigateAccessControl={(subCat) => handleNavigate('access-control', { accessControlSubcategory: subCat })}
              onNavigateAccessAutomation={() => handleNavigate('access-automation')}
              onNavigateParkingSolutions={(subCat) => handleNavigate('solutions', { parkingSolutionsSubcategory: subCat })}
              onNavigateAccessories={(subCat) => handleNavigate('accessories', { accessoriesSubcategory: subCat })}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <GoogleMapLocation
                title="Inspect Products & Factory QA at Sector 59 Noida"
                subtitle="Clients and consultants are welcome to visit our indigenous manufacturing facility for quality audits."
              />
            </div>
          </div>
        )}

        {currentPage === 'industries' && (
          <div className="pb-12 space-y-12">
            <IndustriesSection
              onOpenQuoteModal={(ind) => handleOpenQuoteModal(`Industry Architecture: ${ind}`)}
              onNavigateToProducts={(cat) => handleNavigate('products', { category: cat })}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <GoogleMapLocation
                title="Sector Engineering Consultations at Noida HQ"
                subtitle="Meet our senior access automation architects at Plot A-11, Sector-59 Industrial Corridor, Noida."
              />
            </div>
          </div>
        )}

        {currentPage === 'domestic-solutions' && (
          <div className="pb-12">
            <DomesticSolutionsPage
              onOpenQuoteModal={handleOpenQuoteModal}
              onNavigateToProduct={(pId) => handleNavigate('product-page', { productId: pId })}
              onNavigateToCategory={(cat) => handleNavigate('category-detail', { accessCategory: cat as any })}
            />
          </div>
        )}

        {(currentPage === 'about' || currentPage === 'achievements') && (
          <div className="pb-12 space-y-8">
            <AboutSection
              initialTab={currentPage === 'achievements' ? 'achievements' : selectedAboutTab}
              onOpenQuoteModal={() => handleOpenQuoteModal(currentPage === 'achievements' ? 'Accreditation & Audit Inquiry' : 'Factory Audit & Consultation')}
            />
            <WhyNeptune
              onOpenQuoteModal={() => handleOpenQuoteModal('Neptune Engineering Consultation')}
            />

            {/* Neptune Corporate Headquarters & Production Facility */}
            <section id="corporate-facility-section" className="py-16 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
                    <span className="w-2 h-2 rounded-full bg-[#D7282F]" />
                    <span className="tracking-wider uppercase">CORPORATE CAMPUS & PRODUCTION PLANT</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
                    Neptune Corporate Headquarters & Production Facility
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    50,000+ sq. ft. Integrated Manufacturing & Advanced Embedded Systems Facility
                  </p>
                </div>

                {/* Two NCR Offices Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-[#1D438A] text-xs font-bold uppercase tracking-wider border border-blue-200">
                      <Building2 className="w-3.5 h-3.5 text-[#00a8e8]" />
                      <span>Office</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0a1d37]">
                      Neptune India Limited
                    </h3>
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-[#D7282F] shrink-0 mt-0.5" />
                      <span>A-11, A Block, Sector 59, Noida, Uttar Pradesh 201309</span>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <a href="tel:08010807000" className="font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#00a8e8]" />
                        <span>Phone: 080108 07000</span>
                      </a>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Neptune+House+A-11+Sector+59+Noida"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-[#1D438A] flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-50 text-[#D7282F] text-xs font-bold uppercase tracking-wider border border-red-200">
                      <Building2 className="w-3.5 h-3.5 text-[#D7282F]" />
                      <span>Corporate Headquarters & Production Facility</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0a1d37]">
                      Neptune System Pvt Ltd
                    </h3>
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-[#D7282F] shrink-0 mt-0.5" />
                      <span>Sector 156, Noida, Uttar Pradesh 201304</span>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <a href="tel:08010807000" className="font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#00a8e8]" />
                        <span>Phone: 080108 07000</span>
                      </a>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 text-[11px]">
                        Manufacturing & Heavy R&D
                      </span>
                    </div>
                  </div>
                </div>

                <CompanyFacilityShowcase onOpenQuoteModal={handleOpenQuoteModal} />
              </div>
            </section>

            <OurClientsSection
              onOpenQuoteModal={(subject) => handleOpenQuoteModal(subject || 'Enterprise Reference Case')}
              onNavigateToCaseStudies={() => handleNavigate('case-studies')}
            />
          </div>
        )}

        {currentPage === 'careers' && (
          <div className="pb-12">
            <CareersPage />
          </div>
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'contact' && (
          <div className="pb-12">
            <ContactSection />
          </div>
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy onNavigateHome={() => handleNavigate('home')} />
        )}

        {currentPage === 'terms' && (
          <TermsAndConditions onNavigateHome={() => handleNavigate('home')} />
        )}

        {currentPage === 'access-automation' && (
          <AccessAutomationHub
            onNavigateHome={() => handleNavigate('home')}
            onSelectCategory={(cat) => handleNavigate('category-detail', { accessCategory: cat })}
            onSelectProduct={(pId) => handleNavigate('product-page', { productId: pId })}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'access-control' && (
          <AccessControlHub
            initialSubcategory={selectedAccessControlSubcategory}
            onSelectProduct={(prod) => {
              setSelectedProductId(prod.id);
              handleNavigate('product-page', { productId: prod.id });
            }}
            onRequestQuote={(prodName) => handleOpenQuoteModal(prodName ? `Access Control: ${prodName}` : 'Access Control Consultation')}
            onOpenDownloadModal={(title, prod) => handleOpenDownloadModal(prod, {
              title,
              type: 'Datasheet',
              filename: prod.datasheetName || `${prod.modelCode}_Datasheet.pdf`,
              fileSize: '1.6 MB'
            })}
          />
        )}

        {currentPage === 'accessories' && (
          <AccessoriesHub
            initialSubcategory={selectedAccessoriesSubcategory}
            onSelectProduct={(prod) => {
              setSelectedProductId(prod.id);
              handleNavigate('product-page', { productId: prod.id });
            }}
            onRequestQuote={(accName) => handleOpenQuoteModal(accName ? `Accessory: ${accName}` : 'Accessories Consultation')}
            onOpenDownloadModal={(title, prod) => handleOpenDownloadModal(prod, {
              title,
              type: 'Datasheet',
              filename: prod.datasheetName || `${prod.modelCode}_Datasheet.pdf`,
              fileSize: '1.2 MB'
            })}
          />
        )}

        {currentPage === 'category-detail' && (
          <CategoryListingPage
            categoryId={selectedAccessCategory}
            onNavigateHome={() => handleNavigate('home')}
            onSelectCategory={(cat) => setSelectedAccessCategory(cat)}
            onSelectProduct={(pId) => handleNavigate('product-page', { productId: pId })}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'product-page' && (
          <ProductPage
            productId={selectedProductId}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateProducts={() => handleNavigate('products')}
            onNavigateAccessAutomation={() => handleNavigate('access-automation')}
            onNavigateCategory={(cat) => handleNavigate('category-detail', { accessCategory: cat })}
            onSelectProduct={(pId) => handleNavigate('product-page', { productId: pId })}
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigateAccessControl={(subCat) => handleNavigate('access-control', { accessControlSubcategory: subCat as AccessControlSubcategory })}
            onNavigateParkingSolutions={(subCat) => handleNavigate('solutions', { parkingSolutionsSubcategory: subCat as ParkingSolutionsSubcategory })}
            onNavigateAccessories={(subCat) => handleNavigate('accessories', { accessoriesSubcategory: subCat as AccessoriesSubcategory })}
          />
        )}

        {currentPage === 'blog-post' && selectedBlogPost && (
          <BlogPostPage
            post={selectedBlogPost}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToBlogList={() => handleNavigate('blog')}
            onSelectPost={(p) => {
              setSelectedBlogPost(p);
              handleNavigate('blog-post', { blogSlug: p.slug });
            }}
            onSelectProduct={(pId) => handleNavigate('product-page', { productId: pId })}
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigateToCategory={(catSlug) => {
              if (catSlug === 'solutions') handleNavigate('solutions');
              else if (catSlug === 'access-automation') handleNavigate('access-automation');
              else if (catSlug === 'access-control') handleNavigate('access-control');
              else if (catSlug === 'accessories') handleNavigate('accessories');
              else handleNavigate('products');
            }}
          />
        )}

        {currentPage === 'parking-subcategory' && (
          <ParkingSubcategoryPage
            subcategory={selectedParkingSolutionsSubcategory}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToSolutionsHub={() => handleNavigate('solutions')}
            onSelectSubcategory={(subcat) => {
              setSelectedParkingSolutionsSubcategory(subcat);
              handleNavigate('parking-subcategory', { parkingSolutionsSubcategory: subcat });
            }}
            onSelectProduct={(prod) => {
              setSelectedProductId(prod.id);
              handleNavigate('product-page', { productId: prod.id });
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
            onOpenDownloadModal={(title, prod) => handleOpenDownloadModal(prod, {
              title,
              type: 'Datasheet',
              filename: prod.datasheetName || `${prod.modelCode}_Datasheet.pdf`,
              fileSize: '1.8 MB'
            })}
          />
        )}

        {currentPage === 'case-study-detail' && selectedCaseStudy && (
          <CaseStudyDetailPage
            caseStudy={selectedCaseStudy}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToCaseStudiesList={() => handleNavigate('case-studies')}
            onSelectCaseStudy={(study) => {
              setSelectedCaseStudy(study);
              handleNavigate('case-study-detail', { caseStudySlug: study.id });
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'event-detail' && selectedEvent && (
          <EventDetailPage
            event={selectedEvent}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToEventsList={() => handleNavigate('events')}
            onSelectEvent={(ev) => {
              setSelectedEvent(ev);
              handleNavigate('event-detail', { eventSlug: ev.id });
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'case-studies' && (
          <CaseStudiesPage
            onNavigateToCaseStudy={(slug) => handleNavigate('case-study-detail', { caseStudySlug: slug })}
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'events' && (
          <EventsPage
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigateToEvent={(slug) => handleNavigate('event-detail', { eventSlug: slug })}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'faqs' && (
          <FaqsPage
            onOpenQuoteModal={handleOpenQuoteModal}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateToBlogPost={(slug) => handleNavigate('blog-post', { blogSlug: slug })}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'site-structure' && (
          <SiteStructurePage onNavigate={handleNavigate} />
        )}

      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Floating Action Controls */}
      <FloatingCTAs
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigate={handleNavigate}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onOpenQuoteModal={handleOpenQuoteModal}
        onSelectRelatedProduct={handleSelectProduct}
        onNavigateToProductPage={(productId) => {
          setSelectedProductForModal(null);
          handleNavigate('product-page', { productId });
        }}
      />

      {/* Product Hardware Comparison Modal */}
      <ProductCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onOpenQuoteModal={handleOpenQuoteModal}
        onNavigateToProductPage={(productId) => {
          setIsCompareModalOpen(false);
          handleNavigate('product-page', { productId });
        }}
      />

      {/* Request a Quote Consultation Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProductOrSolution={quoteInitialSubject}
      />

      {/* Global Gated Technical Document Download Modal */}
      {downloadModalProduct && (
        <DownloadModal
          isOpen={isGlobalDownloadModalOpen}
          onClose={() => setIsGlobalDownloadModalOpen(false)}
          product={downloadModalProduct}
          resource={downloadModalResource}
          onOpenConsultation={(pName) => handleOpenQuoteModal(`Tender Consultation: ${pName}`)}
        />
      )}

    </div>
  );
}
