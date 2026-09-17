import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigateHome }) => {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#258BD7]" />
            <span>LEGAL & DATA PROTECTION COMPLIANCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Effective Date: March 2025 • Governed under the Information Technology Act, 2000 (India)
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="p-6 rounded-sm bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-[#1D438A] font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>Corporate Commitment to Enterprise Privacy</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Neptune Automatic Pvt. Ltd. and its technology associate Neptune System Pvt. Ltd. (collectively referred to as "Neptune", "we", "our", or "us") respect the confidentiality of all enterprise clients, architects, security consultants, tender authorities, and portal visitors. We do not sell, barter, or distribute your corporate or personal information to third-party data brokers.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <span className="text-[#1D438A]">1.</span> Scope & Corporate Identity
            </h2>
            <p>
              This Privacy Policy applies to information collected through our official websites, digital quotation forms, CAD datasheet download portals, and communications directed to our Noida Headquarters and manufacturing facility.
            </p>
            <p className="font-mono text-xs bg-slate-100 p-3 rounded-xs border border-slate-200 text-slate-600">
              Operating Entities: Neptune Automatic Pvt. Ltd. (A-11, Sector-59, Noida, UP 201301) & Neptune System Pvt. Ltd. (Sector 156, Noida, UP 201304).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <span className="text-[#1D438A]">2.</span> Information We Collect
            </h2>
            <p>
              When you interact with our engineering teams or request quotes, we collect information necessary to evaluate your site parameters and fulfill procurement:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Contact & Corporate Credentials:</strong> Full name, corporate email address, business telephone/mobile number, company name, and project geographic location.</li>
              <li><strong>Technical & Architectural Scope:</strong> Desired barrier arm lengths, crash-rating parameters (M30/M50/K12), vehicle throughput estimates, and site-specific civil constraints.</li>
              <li><strong>Electronic Communications:</strong> Enquiries submitted via web forms, email correspondence, and CAD drawing requests.</li>
              <li><strong>Server & Telemetry Logs:</strong> IP address, browser type, referral URLs, and pages visited for security diagnostics and uptime monitoring.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <span className="text-[#1D438A]">3.</span> Purpose of Data Processing
            </h2>
            <p>
              The data we collect is processed strictly for legitimate industrial and engineering operations:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white border border-slate-200 rounded-xs">
                <div className="font-bold text-[#0a1d37] text-xs">Techno-Commercial Estimates</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Generating customized bill-of-quantities (BOQ) and formal tender quotations.</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xs">
                <div className="font-bold text-[#0a1d37] text-xs">Engineering Consultation</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Connecting client project teams with factory solutions architects in Noida.</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xs">
                <div className="font-bold text-[#0a1d37] text-xs">Warranty & Field Support</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Registering serial numbers for annual maintenance and 10-million-cycle MTBF coverage.</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xs">
                <div className="font-bold text-[#0a1d37] text-xs">Spam Prevention</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Filtering disposable and fraudulent email domains to safeguard engineering resources.</div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <span className="text-[#1D438A]">4.</span> Information Security & Data Retention
            </h2>
            <p>
              We implement industry-standard physical, electronic, and procedural safeguards conforming to the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. Data is hosted in secured environments with access limited strictly to authorized technical personnel. We retain project inquiry records only as long as necessary to service warranty obligations and tender compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <span className="text-[#1D438A]">5.</span> Cookies & Local Storage
            </h2>
            <p>
              Our website uses essential functional cookies and local session caching solely to preserve user interface selections (such as product comparisons, active tabs, and responsive layout preferences). We do not employ invasive cross-site advertising trackers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0a1d37] flex items-center gap-2">
              <span className="text-[#1D438A]">6.</span> Grievance Officer & Contact Details
            </h2>
            <p>
              In accordance with Information Technology Act 2000 and rules made thereunder, questions or grievances regarding data processing may be directed to our designated officer:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-1.5 font-mono text-xs text-slate-700">
              <div className="font-bold text-[#0a1d37]">Legal & Compliance Desk</div>
              <div>Neptune Automatic Pvt. Ltd.</div>
              <div>Plot A-11, Sector-59, Noida – 201301, Uttar Pradesh, India</div>
              <div>Email: <a href="mailto:connect@neptuneautomatic.com" className="text-[#1D438A] underline">connect@neptuneautomatic.com</a></div>
              <div>Direct Phone: +91 8010 807 000</div>
            </div>
          </section>

        </div>

        {/* Return Button */}
        <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={onNavigateHome}
            className="px-6 py-2.5 bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold rounded-xs transition-colors cursor-pointer"
          >
            ← Return to Homepage
          </button>
          <span className="text-xs text-slate-400 font-mono">
            Neptune Group • All Rights Reserved
          </span>
        </div>

      </div>
    </div>
  );
};
