import React from 'react';
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  FileCheck, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  Heart
} from 'lucide-react';
import { 
  NavPage, 
  ProductCategory, 
  AboutTab, 
  AccessAutomationCategory,
  ParkingSolutionsSubcategory,
  AccessControlSubcategory,
  AccessoriesSubcategory
} from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { NeptuneLogo } from './NeptuneLogo';

interface FooterProps {
  onNavigate: (
    page: NavPage, 
    extra?: { 
      category?: ProductCategory; 
      accessCategory?: AccessAutomationCategory; 
      parkingSolutionsSubcategory?: ParkingSolutionsSubcategory;
      accessControlSubcategory?: AccessControlSubcategory;
      accessoriesSubcategory?: AccessoriesSubcategory;
      solutionId?: string; 
      resourceTab?: string; 
      aboutTab?: AboutTab;
    }
  ) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <footer id="site-footer" className="bg-[#0a1d37] border-t border-slate-800 text-slate-300 text-sm">
      {/* 4-Color Signature Brand Accent Ribbon Matching Official Logo */}
      <div className="w-full h-[3.5px] flex shadow-[0_1px_6px_rgba(0,0,0,0.2)]">
        <div className="w-[45%] bg-gradient-to-r from-[#183366] to-[#1D438A]" />
        <div className="w-[25%] bg-gradient-to-r from-[#1D438A] to-[#00A8E8]" />
        <div className="w-[15%] bg-gradient-to-r from-[#C1272D] to-[#D7282F]" />
        <div className="w-[15%] bg-gradient-to-r from-[#D7282F] to-[#ED1C24]" />
      </div>

      {/* Pre-Footer Action Banner */}
      <div className="border-b border-slate-800 bg-[#071526] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-blue-950/60 border border-blue-800/50 text-[#3DA4ED] text-xs font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D7282F]"></span>
                <span>ESTABLISHED 2005 • NEPTUNE GROUP</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Engineering Safer, Smarter Access for Modern Infrastructure
              </h3>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                Consult with our engineering team for customized boom barriers, crash bollards, and automated parking architectures.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3 rounded-xs bg-[#D7282F] hover:bg-[#B81D23] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Request Enterprise Quote
              </button>
              <a
                href="tel:08010807000"
                className="px-5 py-3 rounded-xs bg-[#0a1d37] hover:bg-[#152e50] text-white border border-slate-700 font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#3DA4ED]" />
                <span>080108 07000</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand & Overview (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <NeptuneLogo variant="dark" size="md" />
            </div>
            
            <p className="text-xs text-slate-200 font-semibold">
              “Powering Innovation. Transforming Energies.”
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              Neptune Automatic Pvt. Ltd. and Neptune System Pvt. Ltd. are leaders in intelligent security automation, crash-rated vehicle barriers, optical speed gates, and FASTag parking management systems, proudly engineered in India for high-traffic environments.
            </p>

            {/* Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#071526] text-slate-300 text-[11px] border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Made in India Manufacturing
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#071526] text-slate-300 text-[11px] border border-slate-700">
                <FileCheck className="w-3 h-3 text-[#00a8e8]" />
                ISO 9001:2015 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#071526] text-slate-300 text-[11px] border border-slate-700">
                ★ 4.6 / 5 Google Reviews
              </span>
            </div>
          </div>

          {/* Smart Parking Solutions Col */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Parking Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('solutions', { parkingSolutionsSubcategory: 'management' })}
                  className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer"
                >
                  Parking Management (PMS)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('solutions', { parkingSolutionsSubcategory: 'guidance' })}
                  className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer"
                >
                  Parking Guidance (PGS)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('solutions', { parkingSolutionsSubcategory: 'counting' })}
                  className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer"
                >
                  Parking Counting Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('solutions', { parkingSolutionsSubcategory: 'vehicular-access' })}
                  className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer"
                >
                  Vehicular Access Control
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => onNavigate('solutions', { parkingSolutionsSubcategory: 'all' })}
                  className="text-[#00a8e8] hover:text-white font-semibold transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Parking Hub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Access Automation Hardware Col */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Access Automation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('category-detail', { accessCategory: 'automatic-boom-barriers' })}
                  className="hover:text-[#00a8e8] transition-colors text-left"
                >
                  Automatic Boom Barriers (7)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('category-detail', { accessCategory: 'high-security-automatic-bollards' })}
                  className="hover:text-[#00a8e8] transition-colors text-left"
                >
                  High-Security Bollards (4)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('category-detail', { accessCategory: 'crash-rated-drop-arm-barriers' })}
                  className="hover:text-[#00a8e8] transition-colors text-left"
                >
                  Crash-Rated Drop Arm Barriers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('category-detail', { accessCategory: 'swing-gate-automation' })}
                  className="hover:text-[#00a8e8] transition-colors text-left"
                >
                  Swing Gate Automation (11)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('category-detail', { accessCategory: 'sliding-gate-automation' })}
                  className="hover:text-[#00a8e8] transition-colors text-left"
                >
                  Sliding Gate Automation (7)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('category-detail', { accessCategory: 'automatic-rolling-shutters' })}
                  className="hover:text-[#00a8e8] transition-colors text-left"
                >
                  Automatic Rolling Shutters (4)
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => onNavigate('access-automation')}
                  className="font-bold text-[#00a8e8] hover:text-white transition-colors text-left flex items-center gap-1"
                >
                  <span>All 34 Access Models Hub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Resources Col */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  About Neptune (2005)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', { aboutTab: 'achievements' })} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer flex items-center gap-1.5 font-medium text-amber-400">
                  <span>Achievements & Honors</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded-xs">20+ Yrs</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('domestic-solutions')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer flex items-center gap-1">
                  <span>Domestic & Housing Solutions</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Industry Solutions (6 Sectors)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Technical Datasheets & CAD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('case-studies')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Case Studies & Deployments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Trade Expos & Events (ELECRAMA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Technical Engineering FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Careers at Neptune
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Engineering Insights Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#00a8e8] transition-colors text-left cursor-pointer">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Col */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Two Office Facilities
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-sm bg-[#071526] border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00a8e8] block">Office:</span>
                <span className="text-white font-bold block">Neptune India Limited</span>
                <span className="text-slate-300 block">A-11, A Block, Sector 59, Noida, UP 201309</span>
                <a href="tel:08010807000" className="text-slate-300 hover:text-white font-mono block">Phone: 080108 07000</a>
              </div>

              <div className="p-2.5 rounded-sm bg-[#071526] border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">Corporate HQ & Production Facility:</span>
                <span className="text-white font-bold block">Neptune System Pvt Ltd</span>
                <span className="text-slate-300 block">Sector 156, Noida, UP 201304</span>
                <a href="tel:08010807000" className="text-slate-300 hover:text-white font-mono block">Phone: 080108 07000</a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-[#00a8e8] shrink-0" />
                <a href="mailto:connect@neptuneautomatic.com" className="hover:text-white transition-colors text-slate-300">
                  connect@neptuneautomatic.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              <a 
                href="https://www.linkedin.com/company/neptune-automatic-pvt-ltd/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Neptune Automatic LinkedIn"
                className="w-8 h-8 rounded-sm bg-[#071526] hover:bg-[#00a8e8] text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/neptuneautomatic/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Neptune Automatic Facebook"
                className="w-8 h-8 rounded-sm bg-[#071526] hover:bg-[#00a8e8] text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/neptuneautomatic/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Neptune Automatic Instagram"
                className="w-8 h-8 rounded-sm bg-[#071526] hover:bg-[#00a8e8] text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com/neptuneauto" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Neptune Automatic Twitter"
                className="w-8 h-8 rounded-sm bg-[#071526] hover:bg-[#00a8e8] text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-[#071526] py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Neptune Automatic Pvt. Ltd. & Neptune System Pvt. Ltd.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">Neptune Group Enterprises</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('site-structure')} className="hover:text-[#00a8e8] font-semibold transition-colors cursor-pointer">
              Site Structure (Sitemap)
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              Locations
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
