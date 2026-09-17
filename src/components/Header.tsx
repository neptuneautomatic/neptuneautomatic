import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Phone, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  MapPin,
  ExternalLink,
  Star,
  Building2, 
  BookOpen, 
  Calendar, 
  HelpCircle, 
  FileText, 
  Download,
  Users,
  Briefcase,
  History,
  Award,
  Car,
  Radio,
  SlidersHorizontal,
  CreditCard,
  Camera,
  Activity,
  Home,
  Factory,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import { 
  NavPage, 
  ProductCategory, 
  AboutTab, 
  AccessAutomationCategory, 
  AccessControlSubcategory, 
  ParkingSolutionsSubcategory, 
  AccessoriesSubcategory 
} from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { ACCESS_AUTOMATION_CATEGORIES } from '../data/accessAutomationCategories';
import { NeptuneLogo } from './NeptuneLogo';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (
    page: NavPage, 
    extra?: { 
      category?: ProductCategory; 
      accessCategory?: AccessAutomationCategory; 
      accessControlSubcategory?: AccessControlSubcategory;
      parkingSolutionsSubcategory?: ParkingSolutionsSubcategory;
      accessoriesSubcategory?: AccessoriesSubcategory;
      solutionId?: string; 
      productId?: string; 
      resourceTab?: string; 
      aboutTab?: AboutTab;
    }
  ) => void;
  onOpenSearch: () => void;
  onOpenQuoteModal: (initialSolution?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  type DropdownKey = 'solutions' | 'products' | 'resources' | 'about' | null;
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (key: DropdownKey) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    page: NavPage, 
    extra?: { 
      category?: ProductCategory; 
      accessCategory?: AccessAutomationCategory; 
      accessControlSubcategory?: AccessControlSubcategory;
      parkingSolutionsSubcategory?: ParkingSolutionsSubcategory;
      accessoriesSubcategory?: AccessoriesSubcategory;
      solutionId?: string; 
      productId?: string; 
      resourceTab?: string; 
      aboutTab?: AboutTab;
    }
  ) => {
    onNavigate(page, extra);
    setMobileMenuOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="site-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Location & Google My Business Strip */}
      <div className="glass-top-strip text-white text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-[#00a8e8]" />
              <strong className="text-white font-semibold">Neptune Corporate HQ & Plant:</strong> Sector 156, Noida (201304) • Office: Sector 59, Noida (201309)
            </span>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Neptune+House+A-11+Sector+59+Noida"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#00a8e8] hover:text-white transition-colors"
              title="Open verified Google My Business listing"
            >
              <MapPin className="w-3 h-3" />
              <span>Google Verified (4.8 ★)</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>ISO 9001:2015 Certified</span>
            <span>•</span>
            <span>Direct Plant Desk: <a href="tel:08010807000" className="text-white hover:text-[#00a8e8] font-bold">080108 07000</a></span>
          </div>
        </div>
      </div>

      {/* Main Navbar with Frosted Glass Theme */}
      <div className={`transition-all duration-300 relative ${
        isScrolled 
          ? 'glass-header-scrolled py-2.5' 
          : 'glass-header-bar py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
          
          {/* Official Neptune Automatic Logo */}
          <button 
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none py-1 transition-transform hover:opacity-95 cursor-pointer"
            aria-label="Neptune Automatic Homepage"
          >
            <NeptuneLogo size="md" showTagline={false} />
          </button>

          {/* Desktop Navigation Links - Right Aligned with Glass Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 ml-auto mr-3 xl:mr-4">
            
            {/* 1. Home */}
            <button
              id="nav-home-link"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                currentPage === 'home' 
                  ? 'text-[#1D438A] bg-white/90 shadow-xs border border-blue-200/80 font-bold backdrop-blur-sm' 
                  : 'text-slate-700 hover:text-[#1D438A] hover:bg-white/70 hover:shadow-xs hover:border-slate-200/50'
              }`}
            >
              Home
            </button>

            {/* 2. Products Dropdown with Glass Mega-Menu (4 Comprehensive Pillars) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-products-link"
                onClick={() => handleNavClick('products')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  currentPage === 'products' || currentPage === 'access-automation' || currentPage === 'access-control' || currentPage === 'accessories' || currentPage === 'parking-solutions' || currentPage === 'parking-subcategory' || currentPage === 'category-detail' || currentPage === 'product-page'
                    ? 'text-[#1D438A] bg-white/90 shadow-xs border border-blue-200/80 font-bold backdrop-blur-sm' 
                    : 'text-slate-700 hover:text-[#1D438A] hover:bg-white/70 hover:shadow-xs hover:border-slate-200/50'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#258BD7] transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'products' && (
                <div 
                  className="absolute top-full -left-56 pt-2 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Invisible hover bridge */}
                  <div className="absolute -top-3 left-0 w-full h-3" aria-hidden="true" />

                  <div className="w-[1140px] p-4 glass-dropdown-panel rounded-2xl animate-in fade-in-50 slide-in-from-top-1 duration-150 grid grid-cols-4 divide-x divide-slate-200/60 shadow-2xl">
                    
                    {/* Col 1: Access Automation */}
                    <div className="px-3 space-y-1">
                      <div className="px-1.5 py-1 border-b border-slate-200/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        <span className="text-[#1D438A]">Access Automation</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50/80 text-[#1D438A] border border-blue-200/50">34 Models</span>
                      </div>
                      {ACCESS_AUTOMATION_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleNavClick('category-detail', { accessCategory: cat.id })}
                          className="w-full text-left px-2 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 flex items-center justify-between group cursor-pointer"
                        >
                          <div className="min-w-0 pr-1">
                            <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors truncate">
                              {cat.name}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {cat.productIds.length} Models • {cat.badge.split('•')[0].trim()}
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#1D438A] shrink-0 transition-transform" />
                        </button>
                      ))}
                      <div className="pt-2.5 border-t border-slate-200/60 mt-1">
                        <button
                          onClick={() => handleNavClick('access-automation')}
                          className="w-full text-left px-2 py-1 text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center justify-between group cursor-pointer"
                        >
                          <span>Explore Access Automation</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Col 2: Access Control */}
                    <div className="px-3 space-y-1">
                      <div className="px-1.5 py-1 border-b border-slate-200/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        <span className="text-[#1D438A]">Access Control</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50/80 text-[#1D438A] border border-blue-200/50">18 Models</span>
                      </div>

                      <button
                        onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'uhf-rfid' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Long Range UHF RFID Readers
                        </div>
                        <div className="text-[10px] text-slate-500">
                          LR_RF-01 & LR_RF-02 (865–868 MHz)
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'smart-card' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Smart Card & Proximity Readers
                        </div>
                        <div className="text-[10px] text-slate-500">
                          SR_RF-1 (13.56 MHz RFID / NFC)
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'pedestrian-gates' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Pedestrian Access Gates
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Tripod, Speed Gates, Flap & Full Height
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'vehicle-access' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Vehicle Access Control
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Tyre Killer, Road Blocker, Axle Breaker
                        </div>
                      </button>

                      <div className="pt-2.5 border-t border-slate-200/60 mt-1">
                        <button
                          onClick={() => handleNavClick('access-control')}
                          className="w-full text-left px-2 py-1 text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center justify-between group cursor-pointer"
                        >
                          <span>Explore Access Control Hub</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Col 3: Smart Parking Solutions (Transferred under Products) */}
                    <div className="px-3 space-y-1">
                      <div className="px-1.5 py-1 border-b border-slate-200/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        <span className="text-[#1D438A]">Smart Parking Solutions</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50/80 text-[#1D438A] border border-blue-200/50">16 Models</span>
                      </div>

                      <button
                        onClick={() => handleNavClick('parking-solutions', { parkingSolutionsSubcategory: 'management' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Parking Management (PMS)
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Auto Pay Stations & FASTag Auto-Debit
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('parking-solutions', { parkingSolutionsSubcategory: 'guidance' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Parking Guidance (PGS)
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Ultrasonic Sensors & RGB Bay Lamps
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('parking-solutions', { parkingSolutionsSubcategory: 'counting' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Parking Counting Solutions
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Loop Counters & Outdoor LED Totems
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('parking-solutions', { parkingSolutionsSubcategory: 'vehicular-access' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Vehicular Access Control
                        </div>
                        <div className="text-[10px] text-slate-500">
                          ANPR Cameras & UHF RFID Barriers
                        </div>
                      </button>

                      <div className="pt-2.5 border-t border-slate-200/60 mt-1">
                        <button
                          onClick={() => handleNavClick('parking-solutions')}
                          className="w-full text-left px-2 py-1 text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center justify-between group cursor-pointer"
                        >
                          <span>Explore Parking Solutions Hub</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Col 4: Accessories */}
                    <div className="px-3 space-y-1">
                      <div className="px-1.5 py-1 border-b border-slate-200/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        <span className="text-[#1D438A]">Certified Accessories</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50/80 text-[#1D438A] border border-blue-200/50">13 Models</span>
                      </div>

                      <button
                        onClick={() => handleNavClick('accessories', { accessoriesSubcategory: 'safety-devices' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Active Safety Devices
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Infrared Photocells & Loop Detectors
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('accessories', { accessoriesSubcategory: 'pulse-generators' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Simple Pulse Generators
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Two-Way Push Buttons & Key Switches
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('accessories', { accessoriesSubcategory: 'radio-transmitters' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Radio Transmitters & Receivers
                        </div>
                        <div className="text-[10px] text-slate-500">
                          433.92 MHz RF Modules (XF, RP, XR)
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('accessories', { accessoriesSubcategory: 'gate-locks' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Electric Gate Locks
                        </div>
                        <div className="text-[10px] text-slate-500">
                          12V Heavy-Duty Electric Locks
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('accessories', { accessoriesSubcategory: 'traffic-signals' })}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-lg transition-all duration-150 group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                          Traffic Signals & Flashing Lights
                        </div>
                        <div className="text-[10px] text-slate-500">
                          LED Signal Lights & Warning Beacons
                        </div>
                      </button>

                      <div className="pt-2.5 border-t border-slate-200/60 mt-1">
                        <button
                          onClick={() => handleNavClick('accessories')}
                          className="w-full text-left px-2 py-1 text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center justify-between group cursor-pointer"
                        >
                          <span>Explore Certified Accessories</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 3. Solutions Dropdown (Industry Solutions & Domestic Solutions) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-solutions-link"
                onClick={() => handleNavClick('solutions')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  currentPage === 'solutions' || currentPage === 'industries' || currentPage === 'domestic-solutions'
                    ? 'text-[#1D438A] bg-white/90 shadow-xs border border-blue-200/80 font-bold backdrop-blur-sm' 
                    : 'text-slate-700 hover:text-[#1D438A] hover:bg-white/70 hover:shadow-xs hover:border-slate-200/50'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#258BD7] transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div 
                  className="absolute top-full -left-12 pt-2 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('solutions')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Invisible hover bridge */}
                  <div className="absolute -top-3 left-0 w-full h-3" aria-hidden="true" />

                  <div className="w-[490px] py-3 glass-dropdown-panel rounded-2xl animate-in fade-in-50 slide-in-from-top-1 duration-150 shadow-2xl">
                    <div className="px-4 pb-2.5 mb-2 border-b border-slate-200/60 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#1D438A] flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#00a8e8]" />
                          <span>Turnkey Solution Architectures</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Mission-Critical Industry & Domestic Residential</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50/80 text-[#1D438A] border border-blue-200/60 shadow-2xs">
                        2 Portals
                      </span>
                    </div>

                    <div className="px-2 space-y-1">
                      {/* Option 1: Industry Solutions */}
                      <button
                        onClick={() => handleNavClick('industries')}
                        className="w-full text-left px-3 py-2.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 group cursor-pointer flex items-start gap-3"
                      >
                        <div className="p-2.5 rounded-lg bg-blue-50/90 border border-blue-100/80 text-[#1D438A] group-hover:bg-[#1D438A] group-hover:text-white transition-colors mt-0.5 shrink-0 shadow-2xs">
                          <Factory className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors flex items-center gap-1.5">
                            <span>Industry Solutions</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100/70 text-[#1D438A] border border-blue-200/50">9 Sectors</span>
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            Airports, defense perimeters, corporate IT parks, heavy manufacturing, logistics & mass transit.
                          </div>
                        </div>
                      </button>

                      {/* Option 2: Domestic Solutions */}
                      <button
                        onClick={() => handleNavClick('domestic-solutions')}
                        className="w-full text-left px-3 py-2.5 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 group cursor-pointer flex items-start gap-3"
                      >
                        <div className="p-2.5 rounded-lg bg-emerald-50/90 border border-emerald-100/80 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors mt-0.5 shrink-0 shadow-2xs">
                          <Home className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors flex items-center gap-1.5">
                            <span>Domestic Solutions</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100/70 text-emerald-800 border border-emerald-200/50">Residential & Villas</span>
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                            Bungalow swing & sliding gates, society boom barriers, hands-free windshield RFID & smart video intercoms.
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="mt-2.5 pt-2 px-3 border-t border-slate-200/60 bg-slate-50/60 backdrop-blur-sm rounded-b-2xl">
                      <button
                        onClick={() => handleNavClick('solutions')}
                        className="w-full text-center py-1.5 text-xs font-bold text-[#1D438A] hover:text-[#D7282F] flex items-center justify-center gap-1.5 group cursor-pointer"
                      >
                        <span>Explore Solutions Hub</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Resources with Glass Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-resources-link"
                onClick={() => handleNavClick('resources')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  currentPage === 'resources' 
                    ? 'text-[#1D438A] bg-white/90 shadow-xs border border-blue-200/80 font-bold backdrop-blur-sm' 
                    : 'text-slate-700 hover:text-[#1D438A] hover:bg-white/70 hover:shadow-xs hover:border-slate-200/50'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#258BD7] transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div 
                  className="absolute top-full left-0 pt-2 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Invisible hover bridge */}
                  <div className="absolute -top-3 left-0 w-full h-3" aria-hidden="true" />

                  <div className="w-80 py-2.5 glass-dropdown-panel rounded-2xl animate-in fade-in-50 slide-in-from-top-1 duration-150 shadow-2xl">
                    <div className="px-4 py-2 border-b border-slate-200/60 text-[11px] font-bold uppercase tracking-wider text-[#1D438A] flex items-center justify-between">
                      <span>Resources & Knowledge</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#00a8e8]" />
                    </div>

                    <div className="px-1.5 py-1 space-y-0.5">
                      {/* 1. Technical Resources */}
                      <button
                        onClick={() => handleNavClick('resources')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50/90 border border-blue-100/70 text-[#1D438A] mt-0.5 shrink-0 shadow-2xs">
                          <Download className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Technical Resources
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            Datasheets, CAD schematics, tender specs & manuals
                          </p>
                        </div>
                      </button>

                      {/* 2. Blogs */}
                      <button
                        onClick={() => handleNavClick('blog')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-sky-50/90 border border-sky-100/70 text-[#258BD7] mt-0.5 shrink-0 shadow-2xs">
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Blogs
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            10 engineering articles, standards guides & FAQs
                          </p>
                        </div>
                      </button>

                      {/* 3. Case Study */}
                      <button
                        onClick={() => handleNavClick('case-studies')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-red-50/90 border border-red-100/70 text-[#D7282F] mt-0.5 shrink-0 shadow-2xs">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Case Study
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            DMRC Metro, IGI Aerocity, DLF CyberCity & Adani Ports
                          </p>
                        </div>
                      </button>

                      {/* 4. Event & Expos */}
                      <button
                        onClick={() => handleNavClick('events')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-50/90 border border-emerald-100/70 text-emerald-700 mt-0.5 shrink-0 shadow-2xs">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Event & Expos
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            ELECRAMA 2025, trade fairs & Noida campus workshops
                          </p>
                        </div>
                      </button>

                      {/* 5. FAQs */}
                      <button
                        onClick={() => handleNavClick('faqs')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 mt-0.5 shrink-0 shadow-2xs">
                          <HelpCircle className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            FAQs
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            40 verified answers: duty cycles, crash depth & power
                          </p>
                        </div>
                      </button>
                    </div>

                    <div className="p-2 border-t border-slate-200/60 bg-slate-50/60 backdrop-blur-sm rounded-b-2xl">
                      <button
                        onClick={() => handleNavClick('resources')}
                        className="w-full text-center text-xs font-bold text-[#1D438A] hover:text-[#D7282F] py-1 flex items-center justify-center gap-1.5 cursor-pointer group"
                      >
                        <span>Explore Technical Resources</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. About Us with Glass Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-about-link"
                onClick={() => handleNavClick('about')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  currentPage === 'about' || currentPage === 'careers'
                    ? 'text-[#1D438A] bg-white/90 shadow-xs border border-blue-200/80 font-bold backdrop-blur-sm' 
                    : 'text-slate-700 hover:text-[#1D438A] hover:bg-white/70 hover:shadow-xs hover:border-slate-200/50'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#258BD7] transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <div 
                  className="absolute top-full right-0 pt-2 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Invisible hover bridge */}
                  <div className="absolute -top-3 left-0 w-full h-3" aria-hidden="true" />

                  <div className="w-80 py-2.5 glass-dropdown-panel rounded-2xl animate-in fade-in-50 slide-in-from-top-1 duration-150 shadow-2xl">
                    <div className="px-4 py-2 border-b border-slate-200/60 text-[11px] font-bold uppercase tracking-wider text-[#1D438A] flex items-center justify-between">
                      <span>Corporate Heritage & Team</span>
                      <Building2 className="w-3.5 h-3.5 text-[#258BD7]" />
                    </div>

                    <div className="px-1.5 py-1 space-y-0.5">
                      <button
                        onClick={() => handleNavClick('about', { aboutTab: 'story' })}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50/90 border border-blue-100/70 text-[#1D438A] mt-0.5 shrink-0 shadow-2xs">
                          <History className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Our Story
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            Two decades of indigenous engineering since 2005
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('about', { aboutTab: 'why' })}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-red-50/90 border border-red-100/70 text-[#D7282F] mt-0.5 shrink-0 shadow-2xs">
                          <Award className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Why Neptune
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            5 architectural pillars of physical security mastery
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('about', { aboutTab: 'leadership' })}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-sky-50/90 border border-sky-100/70 text-[#258BD7] mt-0.5 shrink-0 shadow-2xs">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Leadership / Our Team
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            Managing directors, R&D heads & engineering leaders
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('about', { aboutTab: 'achievements' })}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-50/90 border border-amber-100/70 text-amber-700 mt-0.5 shrink-0 shadow-2xs">
                          <Trophy className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] flex items-center gap-1.5">
                            <span>Achievements & Certifications</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold">20+ Yrs</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            ASTM/PAS 68 crash ratings, ISO 9001:2015 & 15,000+ deployments
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('careers')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer border-t border-slate-100/80"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-50/90 border border-emerald-100/70 text-emerald-700 mt-0.5 shrink-0 shadow-2xs">
                          <Briefcase className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] flex items-center gap-1.5">
                            <span>Careers at Neptune</span>
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-bold border border-emerald-200/60">Hiring</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            Active openings in CAD, firmware & sales engineering
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => handleNavClick('contact')}
                        className="w-full text-left px-3 py-2 hover:bg-white/90 hover:shadow-xs hover:border-slate-200/60 border border-transparent rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer border-t border-slate-100/80"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50/90 border border-blue-100/70 text-[#00a8e8] mt-0.5 shrink-0 shadow-2xs">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-[#1D438A] transition-colors">
                            Contact Us
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            Corporate headquarters & Sector 59/156 Noida offices
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action Tools & CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Search Trigger */}
            <button
              id="btn-search-trigger"
              onClick={onOpenSearch}
              aria-label="Search website"
              className="p-2 text-slate-600 hover:text-[#1D438A] bg-white/50 hover:bg-white/90 hover:shadow-xs rounded-lg border border-transparent hover:border-slate-200/60 backdrop-blur-xs transition-all cursor-pointer"
              title="Search products, solutions, specs"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Talk to an Expert Phone Shortcut */}
            <a
              id="btn-header-call"
              href="tel:+918010807000"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#1D438A] bg-white/70 hover:bg-white/95 backdrop-blur-md rounded-lg border border-blue-200/80 shadow-xs hover:shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#258BD7]" />
              <span>Talk to Expert</span>
            </a>

            {/* Get Enterprise Quote CTA in Neptune Bold Red with Glass Sheen */}
            <button
              id="btn-header-quote"
              onClick={() => onOpenQuoteModal()}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D7282F] to-[#B81D23] hover:from-[#E0353C] hover:to-[#C42228] text-white text-xs font-bold shadow-[0_4px_14px_rgba(215,40,47,0.35)] hover:shadow-[0_6px_20px_rgba(215,40,47,0.45)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#1D438A] bg-white/60 hover:bg-white/90 rounded-lg border border-slate-200/80 backdrop-blur-xs transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 4-Color Signature Brand Accent Ribbon Matching Official Logo */}
      <div className="w-full h-[3px] flex shadow-[0_1px_6px_rgba(29,67,138,0.18)]">
        <div className="w-[45%] bg-gradient-to-r from-[#183366] to-[#1D438A]" />
        <div className="w-[25%] bg-gradient-to-r from-[#1D438A] to-[#00A8E8]" />
        <div className="w-[15%] bg-gradient-to-r from-[#C1272D] to-[#D7282F]" />
        <div className="w-[15%] bg-gradient-to-r from-[#D7282F] to-[#ED1C24]" />
      </div>
    </div>

      {/* Mobile Navigation Drawer with Glass Theme */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="lg:hidden glass-dropdown-panel px-4 pt-3 pb-6 space-y-3 mt-1 animate-in slide-in-from-top-3 duration-200 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                currentPage === 'home' ? 'bg-white/95 text-[#1D438A] font-bold shadow-xs border border-blue-200/80' : 'text-slate-700 bg-white/60 hover:bg-white/90 border border-slate-200/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`p-2.5 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                currentPage === 'products' || currentPage === 'access-automation' || currentPage === 'access-control' || currentPage === 'accessories' || currentPage === 'parking-solutions' || currentPage === 'category-detail' || currentPage === 'product-page'
                  ? 'bg-white/95 text-[#1D438A] font-bold shadow-xs border border-blue-200/80' 
                  : 'text-slate-700 bg-white/60 hover:bg-white/90 border border-slate-200/50'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick('solutions')}
              className={`p-2.5 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                currentPage === 'solutions' || currentPage === 'industries' || currentPage === 'domestic-solutions'
                  ? 'bg-white/95 text-[#1D438A] font-bold shadow-xs border border-blue-200/80' 
                  : 'text-slate-700 bg-white/60 hover:bg-white/90 border border-slate-200/50'
              }`}
            >
              Solutions
            </button>
            <button
              onClick={() => handleNavClick('resources', { resourceTab: 'all' })}
              className={`p-2.5 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                currentPage === 'resources' ? 'bg-white/95 text-[#1D438A] font-bold shadow-xs border border-blue-200/80' : 'text-slate-700 bg-white/60 hover:bg-white/90 border border-slate-200/50'
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`p-2.5 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                currentPage === 'about' ? 'bg-white/95 text-[#1D438A] font-bold shadow-xs border border-blue-200/80' : 'text-slate-700 bg-white/60 hover:bg-white/90 border border-slate-200/50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className={`p-2.5 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                currentPage === 'careers' ? 'bg-white/95 text-[#1D438A] font-bold shadow-xs border border-blue-200/80' : 'text-slate-700 bg-white/60 hover:bg-white/90 border border-slate-200/50'
              }`}
            >
              Careers
            </button>
          </div>

          {/* Solutions Portals Quick Access for Mobile */}
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 backdrop-blur-sm shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 uppercase tracking-wider px-1">
              <span>Turnkey Solution Portals</span>
              <span className="font-mono text-[10px] text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-emerald-200/60">2 Portals</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleNavClick('industries')}
                className="p-2.5 rounded-xl text-left bg-white/90 hover:bg-white text-slate-800 border border-emerald-200/60 shadow-2xs flex flex-col justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <Factory className="w-4 h-4 text-[#1D438A]" />
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">Industry Solutions</div>
                <div className="text-[10px] text-slate-500">Airports, Defense, Ports</div>
              </button>

              <button
                onClick={() => handleNavClick('domestic-solutions')}
                className="p-2.5 rounded-xl text-left bg-white/90 hover:bg-white text-slate-800 border border-emerald-200/60 shadow-2xs flex flex-col justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <Home className="w-4 h-4 text-emerald-600" />
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
                <div className="font-bold text-xs text-slate-900 mt-1">Domestic Solutions</div>
                <div className="text-[10px] text-slate-500">Villas, Societies, RFID</div>
              </button>
            </div>
          </div>

          {/* Access Automation Quick Submenu for Mobile */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2 backdrop-blur-sm shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#1D438A] uppercase tracking-wider px-1">
              <span>Access Automation Ecosystem</span>
              <span className="font-mono text-[10px] text-[#D7282F] font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-blue-200/60">34 Models</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              {ACCESS_AUTOMATION_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick('category-detail', { accessCategory: cat.id })}
                  className="p-1.5 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/90 border border-transparent hover:border-blue-100 flex items-center justify-between cursor-pointer transition-all"
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-1">({cat.productIds.length})</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => handleNavClick('access-automation')}
              className="w-full text-center py-2 text-xs font-bold text-white bg-[#1D438A] hover:bg-[#153266] rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer mt-1 shadow-xs"
            >
              <span>Explore All 34 Access Models</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Access Control Quick Submenu for Mobile */}
          <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2 backdrop-blur-sm shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#1D438A] uppercase tracking-wider px-1">
              <span>Access Control Systems</span>
              <span className="font-mono text-[10px] text-[#D7282F] font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/60">18 Models</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'uhf-rfid' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/90 border border-transparent hover:border-slate-200/60 flex items-center justify-between cursor-pointer transition-all"
              >
                <span>UHF RFID</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'smart-card' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/90 border border-transparent hover:border-slate-200/60 flex items-center justify-between cursor-pointer transition-all"
              >
                <span>Smart Card</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'pedestrian-gates' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/90 border border-transparent hover:border-slate-200/60 flex items-center justify-between cursor-pointer transition-all"
              >
                <span>Pedestrian Gates</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('access-control', { accessControlSubcategory: 'vehicle-access' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/90 border border-transparent hover:border-slate-200/60 flex items-center justify-between cursor-pointer transition-all"
              >
                <span>Vehicle Access</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            </div>
            <button
              onClick={() => handleNavClick('access-control')}
              className="w-full text-center py-1 text-xs font-bold text-[#1D438A] hover:underline flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Access Control Hub</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Parking Solutions & Accessories Mobile Row */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNavClick('parking-solutions')}
              className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200/70 text-left hover:bg-white/90 transition-all cursor-pointer shadow-2xs backdrop-blur-sm"
            >
              <div className="font-bold text-[#1D438A] flex items-center justify-between">
                <span>Parking Hub</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">FASTag, PGS & Counting</p>
            </button>
            <button
              onClick={() => handleNavClick('accessories')}
              className="p-3 rounded-2xl bg-slate-50/60 border border-slate-200/70 text-left hover:bg-white/90 transition-all cursor-pointer shadow-2xs backdrop-blur-sm"
            >
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>Accessories</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Photocells, RF & Locks</p>
            </button>
          </div>

          {/* About Us Quick Submenu for Mobile */}
          <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 backdrop-blur-sm shadow-2xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
              About Us, Achievements & Careers
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => handleNavClick('about', { aboutTab: 'story' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <History className="w-3.5 h-3.5 text-[#1D438A]" />
                <span>Our Story</span>
              </button>
              <button
                onClick={() => handleNavClick('about', { aboutTab: 'why' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-[#D7282F]" />
                <span>Why Neptune</span>
              </button>
              <button
                onClick={() => handleNavClick('about', { aboutTab: 'leadership' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-[#258BD7]" />
                <span>Our Team</span>
              </button>
              <button
                onClick={() => handleNavClick('about', { aboutTab: 'achievements' })}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Achievements</span>
              </button>
            </div>
          </div>

          {/* Resources Quick Submenu for Mobile */}
          <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 backdrop-blur-sm shadow-2xs">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
              Resources Quick Access
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => handleNavClick('resources')}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#1D438A]" />
                <span>Technical Resources</span>
              </button>
              <button
                onClick={() => handleNavClick('blog')}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#258BD7]" />
                <span>Blogs</span>
              </button>
              <button
                onClick={() => handleNavClick('case-studies')}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#D7282F]" />
                <span>Case Study</span>
              </button>
              <button
                onClick={() => handleNavClick('events')}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Event & Expos</span>
              </button>
              <button
                onClick={() => handleNavClick('faqs')}
                className="p-2 rounded-lg text-left text-slate-700 hover:text-[#1D438A] hover:bg-white/80 flex items-center gap-1.5 cursor-pointer transition-colors col-span-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00A8E8]" />
                <span>FAQs</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
            <a 
              href="tel:+918010807000"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/70 hover:bg-white/95 text-slate-800 border border-slate-200/80 text-xs font-bold shadow-xs transition-all"
            >
              <Phone className="w-4 h-4 text-[#00a8e8]" />
              <span>Call Helpline: +91 8010 807 000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
