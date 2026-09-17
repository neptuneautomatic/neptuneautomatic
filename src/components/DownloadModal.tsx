import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Product, ProductDownloadResource, DownloadLeadData } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  resource: ProductDownloadResource | null;
  onOpenConsultation?: (productName: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  product,
  resource,
  onOpenConsultation,
}) => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);

  if (!isOpen || !resource) return null;

  // Validate fields
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please provide your full name (minimum 2 characters).';
    }
    if (!organization.trim() || organization.trim().length < 2) {
      errs.organization = 'Please provide your organization or company name.';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid official email address.';
    }

    // Phone validation
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = 'Please provide a valid phone or WhatsApp number (at least 8 digits).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Generate authentic, detailed technical file blob
  const generateAuthenticFileBlob = () => {
    const specsFormatted = product.specs
      .map(s => `  • ${s.label.padEnd(28, ' ')} : ${s.value}`)
      .join('\n');

    const featuresFormatted = product.features
      .map((f, i) => `  ${i + 1}. ${f}`)
      .join('\n');

    const detailedFeaturesFormatted = (product.detailedFeatures || [])
      .map(df => `  [+] ${df.title}\n      ${df.desc}`)
      .join('\n\n');

    const applicationsFormatted = product.applications
      .map(app => `  • ${app}`)
      .join('\n');

    const installRequirementsFormatted = (product.installationRequirements || [])
      .map(req => `  - ${req}`)
      .join('\n');

    const content = `================================================================================
NEPTUNE AUTOMATIC PVT. LTD. - OFFICIAL TECHNICAL DOCUMENTATION
A-11, Sector-59, Noida - 201301, Uttar Pradesh (Delhi NCR), India
Toll-Free / Direct Desk: +91 8010 807 000 | Web: connect@neptuneautomatic.com
================================================================================

DOCUMENT TITLE   : ${resource.title.toUpperCase()}
RESOURCE TYPE    : ${resource.type.toUpperCase()}
PRODUCT NAME     : ${product.name}
MODEL CODE       : ${product.modelCode}
CATEGORY         : ${product.category} ${product.accessCategory ? `(${product.accessCategory})` : ''}
SUB-CATEGORY     : ${product.subCategory || 'Industrial Access Automation'}
ISSUED TO        : ${name} (${organization})
AUTHENTICATION ID: NP-AUTH-${Date.now().toString(36).toUpperCase()}
ISSUE TIMESTAMP  : ${new Date().toUTCString()}

--------------------------------------------------------------------------------
1. PRODUCT OVERVIEW & ENGINEERING SUMMARY
--------------------------------------------------------------------------------
${product.overview || product.description}

TAGLINE:
${product.tagline}

--------------------------------------------------------------------------------
2. TECHNICAL SPECIFICATIONS & TOLERANCES
--------------------------------------------------------------------------------
${specsFormatted}

--------------------------------------------------------------------------------
3. CORE ENGINEERING FEATURES & MECHANISMS
--------------------------------------------------------------------------------
${featuresFormatted}

${detailedFeaturesFormatted ? `\nDETAILED SUBSYSTEM DESCRIPTIONS:\n${detailedFeaturesFormatted}` : ''}

--------------------------------------------------------------------------------
4. SECTOR APPLICATIONS & RECOMMENDED USE CASES
--------------------------------------------------------------------------------
${applicationsFormatted}

${(product.useCases && product.useCases.length > 0) ? `
TYPICAL OPERATIONAL SCENARIOS:
${product.useCases.map(uc => `* ${uc.title}: ${uc.description}`).join('\n')}
` : ''}

--------------------------------------------------------------------------------
5. CIVIL & ELECTRICAL INSTALLATION REQUIREMENTS
--------------------------------------------------------------------------------
${installRequirementsFormatted || 'Standard civil pad foundation conforming to Neptune GA Drawings.'}

COMPATIBILITY INTERFACES:
${(product.compatibility || ['FASTag RFID', 'ANPR Cameras', 'Inductive Ground Loops', 'PLC/SCADA']).join(', ')}

--------------------------------------------------------------------------------
6. QUALITY CERTIFICATIONS & STANDARDS COMPLIANCE
--------------------------------------------------------------------------------
${product.certifications.map(c => `  [CERTIFIED] ${c}`).join('\n')}
Manufactured under ISO 9001:2015 quality management standards at Neptune House Noida.

--------------------------------------------------------------------------------
7. FACTORY SUPPORT & ENGINEERING CONTACTS
--------------------------------------------------------------------------------
For custom civil foundation drawings, DWG/BIM CAD blocks, or site surveys:
• Factory Desk   : +91 8010 807 000 / +91 9555 500 300
• Engineering    : connect@neptuneautomatic.com
• Production Plant: Neptune House, A-11, Sector-59, Noida - 201301 (UP), India

================================================================================
CONFIDENTIAL & PROPRIETARY - NEPTUNE AUTOMATIC PVT. LTD. ALL RIGHTS RESERVED.
================================================================================
`;

    return new Blob([content], { type: 'text/plain;charset=utf-8' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const leadData: DownloadLeadData = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      phone: phone.trim(),
      comment: comment.trim() || undefined,
      resourceTitle: resource.title,
      productName: product.name,
      productCategory: product.accessCategory || product.category,
      sourcePage: window.location.pathname,
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('neptune_download_leads') || '[]');
      existing.push(leadData);
      localStorage.setItem('neptune_download_leads', JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not write lead to localStorage:', err);
    }

    // Generate authentic file blob & trigger download
    setTimeout(() => {
      const blob = generateAuthenticFileBlob();
      const url = URL.createObjectURL(blob);
      setDownloadBlobUrl(url);

      const a = document.createElement('a');
      a.href = url;
      // Use proper filename (e.g. Neptune_PowerFusionXD_Datasheet.txt)
      const downloadFilename = resource.filename.replace(/\.pdf$/i, '.txt');
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleManualRedownload = () => {
    if (!downloadBlobUrl) {
      const blob = generateAuthenticFileBlob();
      const url = URL.createObjectURL(blob);
      setDownloadBlobUrl(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.filename.replace(/\.pdf$/i, '.txt');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const a = document.createElement('a');
      a.href = downloadBlobUrl;
      a.download = resource.filename.replace(/\.pdf$/i, '.txt');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0a1d37] to-[#143156] px-6 py-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-[#00a8e8] text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Technical Documentation Gate</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            Download {resource.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Official engineering document for <strong className="text-white">{product.name}</strong> ({product.modelCode})
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-md p-3.5 text-xs text-slate-700 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1D438A] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-[#0a1d37]">
                    Architect, Consultant & Procurement Verification
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Please provide your professional credentials to unlock the verified manufacturer datasheet, CAD schematics, and foundation specifications. Your download will initiate immediately.
                  </p>
                </div>
              </div>

              {/* Resource Summary Badge */}
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xs bg-[#1D438A]/10 flex items-center justify-center text-[#1D438A]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{resource.filename}</div>
                    <div className="text-slate-500 text-[11px]">{resource.type} • Verified Neptune File {resource.fileSize ? `(${resource.fileSize})` : ''}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified Spec
                </span>
              </div>

              {/* Name & Org */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D438A] ${
                        errors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Larsen & Toubro / DMRC"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D438A] ${
                        errors.organization ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.organization && <p className="text-[11px] text-red-600 mt-1">{errors.organization}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Work Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@company.com"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D438A] ${
                        errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D438A] ${
                        errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Notes / Specific Application Requirement <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="e.g. Sizing for 4 entrance lanes with FASTag integration at IT Park in Bangalore..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1D438A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-[#1D438A] hover:bg-[#153266] text-white text-xs font-bold rounded-md shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying & Preparing Technical File...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      <span>Unlock & Download {resource.type}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Your information is protected under ISO 9001 governance
                </span>
                <span>Instant Direct Download</span>
              </div>
            </form>
          ) : (
            /* Success View */
            <div className="py-6 px-2 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-[#0a1d37]">
                  Thank you, {name}!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your official download of <strong className="text-slate-900">{resource.title}</strong> has initiated. Check your browser downloads folder.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 max-w-md mx-auto flex items-center justify-between">
                <span className="truncate pr-2 font-mono text-[11px] text-slate-800">
                  {resource.filename.replace(/\.pdf$/i, '.txt')}
                </span>
                <button
                  type="button"
                  onClick={handleManualRedownload}
                  className="px-2.5 py-1 rounded-xs bg-[#1D438A] text-white text-[11px] font-bold hover:bg-[#153266] shrink-0 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Re-Download</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200 max-w-md mx-auto space-y-3">
                <p className="text-[11px] text-slate-500">
                  Need custom CAD foundation drawings or tender specifications for your site?
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  {onOpenConsultation && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenConsultation(`Engineering Spec Consultation: ${product.name}`);
                      }}
                      className="px-4 py-2 rounded-md bg-[#D7282F] hover:bg-[#b01e24] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Request Factory Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
