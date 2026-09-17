import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Phone, 
  Building2, 
  Mail, 
  User, 
  MapPin, 
  FileText,
  Clock,
  Sparkles,
  Download
} from 'lucide-react';
import { COMPANY_INFO, INDUSTRIES, SOLUTIONS, PRODUCTS } from '../data/companyData';
import { NeptuneLogo } from './NeptuneLogo';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductOrSolution?: string;
}

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com',
  'sharklasers.com', '10minutemail.com', 'yopmail.com', 'trashmail.com',
  'getairmail.com', 'fakeinbox.com', 'dispostable.com', 'generator.email',
  'temp-mail.org', 'fakeemail.net', 'temporary-mail.net', 'burnermail.io',
  'crazymailing.com', 'maildrop.cc', 'mohmal.com', 'inboxkitten.com',
  'fakemailgenerator.com', 'emailondeck.com', 'getnada.com', 'temp-mail.io',
  'dropmail.me', 'tempail.com', 'mytemp.email', 'disposablemail.com'
]);

function isDisposableEmail(email: string): boolean {
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return true;
  if (/^(temp|throwaway|fake|burner|dispos|trash|spam)/i.test(domain)) return true;
  return false;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialProductOrSolution = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    industry: 'Corporate Offices & IT Parks',
    solutionRequired: 'Vehicle Access Control (Boom Barriers)',
    estimatedRequirement: '3 to 5 Units / Points',
    message: ''
  });

  useEffect(() => {
    if (initialProductOrSolution) {
      const query = initialProductOrSolution.trim().toLowerCase();
      // Match with specific product
      const matchedProd = PRODUCTS.find(p => 
        p.name.toLowerCase() === query ||
        p.modelCode.toLowerCase() === query ||
        `${p.name} (${p.modelCode})`.toLowerCase() === query ||
        query.includes(p.name.toLowerCase())
      );
      if (matchedProd) {
        setFormData(prev => ({ ...prev, solutionRequired: `${matchedProd.name} (${matchedProd.modelCode})` }));
        return;
      }
      // Match with core solutions
      const coreSolutions = [
        'Vehicle Access Control (Boom Barriers)',
        'Perimeter Security (Bollards & Blockers)',
        'Parking Automation (FASTag & Guidance)',
        'Entrance Automation (Gates & Speed Lanes)'
      ];
      const matchedSol = coreSolutions.find(s => s.toLowerCase().includes(query) || query.includes(s.toLowerCase()));
      if (matchedSol) {
        setFormData(prev => ({ ...prev, solutionRequired: matchedSol }));
        return;
      }
      setFormData(prev => ({ ...prev, solutionRequired: initialProductOrSolution }));
    }
  }, [initialProductOrSolution, isOpen]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedRefNo, setSubmittedRefNo] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Contact Name is required';
    if (!formData.company.trim()) errs.company = 'Company / Organization is required';
    if (!formData.email.trim()) {
      errs.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid corporate work email address';
    } else if (isDisposableEmail(formData.email)) {
      errs.email = 'Disposable and temporary email domains are not accepted. Please use a valid work email.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) errs.city = 'City / Project Location is required';
    if (!formData.industry.trim()) errs.industry = 'Industry Sector is required';
    if (!formData.solutionRequired.trim()) errs.solutionRequired = 'Solution or Product is required';
    if (!formData.estimatedRequirement.trim()) errs.estimatedRequirement = 'Requirement scope is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      const refNumber = `NP-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRefNo(refNumber);
      setIsSuccess(true);
    }, 900);
  };

  const handleDownloadReceipt = () => {
    const content = `NEPTUNE AUTOMATIC PVT. LTD.\n` +
      `OFFICIAL CONSULTATION & QUOTE ENQUIRY ACKNOWLEDGEMENT\n\n` +
      `Reference Number: ${submittedRefNo}\n` +
      `Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}\n` +
      `Status: Assigned to Technical Sales & Solutions Architect\n\n` +
      `CLIENT DETAILS:\n` +
      `- Name: ${formData.name}\n` +
      `- Organization: ${formData.company}\n` +
      `- Email: ${formData.email}\n` +
      `- Phone: ${formData.phone}\n` +
      `- City/Region: ${formData.city}\n` +
      `- Sector: ${formData.industry}\n\n` +
      `REQUIREMENT:\n` +
      `- Solution / Product: ${formData.solutionRequired}\n` +
      `- Estimated Scale: ${formData.estimatedRequirement}\n` +
      `- Project Notes: ${formData.message || 'No additional notes specified.'}\n\n` +
      `SLA COMMITMENT:\n` +
      `A dedicated Neptune Automatic enterprise solutions engineer will review your project requirements and connect via phone/email within 4 business hours.\n\n` +
      `HEAD OFFICE & FACTORY:\n` +
      `Neptune Automatic Pvt. Ltd., A11, Sector-59, Noida - 201301, U.P., India.\n` +
      `Direct Helpline: +91 8010 807 000 | +91 9555 500 300\n` +
      `Email: connect@neptuneautomatic.com`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Neptune_Automatic_Quote_Request_${submittedRefNo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-sm shadow-2xl overflow-hidden z-10 my-auto flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NeptuneLogo size="sm" />
            <div className="border-l border-slate-200 pl-3 hidden sm:block">
              <h3 className="font-display text-sm font-bold text-[#0a1d37] leading-tight">
                Enterprise Solution Quotation
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct Technical Advisory from Noida Plant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-[#0a1d37] hover:bg-slate-100 rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {isSuccess ? (
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-2xl font-bold text-[#0a1d37]">
                  Enquiry Submitted Successfully
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-[#0a1d37]">{formData.name}</strong>. Your requirement has been registered with reference ID:
                </p>
                <div className="inline-block px-4 py-1.5 rounded-sm bg-slate-100 border border-slate-300 text-[#00a8e8] font-mono font-bold text-sm tracking-wider">
                  {submittedRefNo}
                </div>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Organization:</span>
                  <span className="font-bold text-[#0a1d37]">{formData.company}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Solution Requested:</span>
                  <span className="font-bold text-[#00a8e8]">{formData.solutionRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Response Time:</span>
                  <span className="font-bold text-emerald-600">Within 4 Business Hours</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleDownloadReceipt}
                  className="px-5 py-2.5 rounded-sm bg-white hover:bg-slate-50 text-[#0a1d37] text-xs font-bold border border-slate-300 flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 text-[#00a8e8]" />
                  <span>Download Enquiry Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-sm bg-[#0a1d37] hover:bg-[#1a3c6d] text-white text-xs font-bold transition-all shadow-md"
                >
                  Close & Continue Browsing
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500">
                Need urgent assistance? Call our direct support line at <a href="tel:+918010807000" className="text-[#00a8e8] font-bold underline">+91 8010 807 000</a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Contact Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full pl-9 pr-3 py-2 bg-white border ${
                        errors.name ? 'border-rose-500' : 'border-slate-300 focus:border-[#00a8e8]'
                      } rounded-sm text-xs sm:text-sm text-[#0a1d37] placeholder-slate-400 focus:outline-none`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. DLF CyberPark, GMR, L&T"
                      className={`w-full pl-9 pr-3 py-2 bg-white border ${
                        errors.company ? 'border-rose-500' : 'border-slate-300 focus:border-[#00a8e8]'
                      } rounded-sm text-xs sm:text-sm text-[#0a1d37] placeholder-slate-400 focus:outline-none`}
                    />
                  </div>
                  {errors.company && <p className="text-[10px] text-rose-500 mt-1">{errors.company}</p>}
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@company.com"
                      className={`w-full pl-9 pr-3 py-2 bg-white border ${
                        errors.email ? 'border-rose-500' : 'border-slate-300 focus:border-[#00a8e8]'
                      } rounded-sm text-xs sm:text-sm text-[#0a1d37] placeholder-slate-400 focus:outline-none`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-9 pr-3 py-2 bg-white border ${
                        errors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-[#00a8e8]'
                      } rounded-sm text-xs sm:text-sm text-[#0a1d37] placeholder-slate-400 focus:outline-none`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    City / Project Location <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Delhi NCR, Mumbai, Bengaluru"
                      className={`w-full pl-9 pr-3 py-2 bg-white border ${
                        errors.city ? 'border-rose-500' : 'border-slate-300 focus:border-[#00a8e8]'
                      } rounded-sm text-xs sm:text-sm text-[#0a1d37] placeholder-slate-400 focus:outline-none`}
                    />
                  </div>
                  {errors.city && <p className="text-[10px] text-rose-500 mt-1">{errors.city}</p>}
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Industry Sector <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border ${
                      errors.industry ? 'border-rose-500' : 'border-slate-300'
                    } rounded-sm text-xs sm:text-sm text-[#0a1d37] focus:outline-none focus:border-[#00a8e8]`}
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind.id} value={ind.title}>
                        {ind.title}
                      </option>
                    ))}
                    <option value="Government & Public Infrastructure">Government & Defence Infrastructure</option>
                    <option value="Other Commercial Project">Other Commercial Project</option>
                  </select>
                  {errors.industry && <p className="text-[10px] text-rose-500 mt-1">{errors.industry}</p>}
                </div>

              </div>

              {/* Solution Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Solution or Product Required <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.solutionRequired}
                    onChange={(e) => setFormData({ ...formData, solutionRequired: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border ${
                      errors.solutionRequired ? 'border-rose-500' : 'border-slate-300'
                    } rounded-sm text-xs sm:text-sm text-[#0a1d37] focus:outline-none focus:border-[#00a8e8]`}
                  >
                    {/* Fallback if passed custom value */}
                    {!PRODUCTS.some(p => `${p.name} (${p.modelCode})` === formData.solutionRequired || p.name === formData.solutionRequired) &&
                     !['Vehicle Access Control (Boom Barriers)', 'Perimeter Security (Bollards & Blockers)', 'Parking Automation (FASTag & Guidance)', 'Entrance Automation (Gates & Speed Lanes)'].includes(formData.solutionRequired) && (
                      <option value={formData.solutionRequired}>{formData.solutionRequired}</option>
                    )}
                    <optgroup label="Core Solutions">
                      <option value="Vehicle Access Control (Boom Barriers)">Vehicle Access Control (Boom Barriers)</option>
                      <option value="Perimeter Security (Bollards & Blockers)">Perimeter Security (Bollards & Blockers)</option>
                      <option value="Parking Automation (FASTag & Guidance)">Parking Automation (FASTag & Guidance)</option>
                      <option value="Entrance Automation (Gates & Speed Lanes)">Entrance Automation (Gates & Speed Lanes)</option>
                    </optgroup>
                    <optgroup label="Specific Products">
                      {PRODUCTS.map(p => (
                        <option key={p.id} value={`${p.name} (${p.modelCode})`}>
                          {p.name} ({p.modelCode})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.solutionRequired && <p className="text-[10px] text-rose-500 mt-1">{errors.solutionRequired}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                    Estimated Requirement Scope <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.estimatedRequirement}
                    onChange={(e) => setFormData({ ...formData, estimatedRequirement: e.target.value })}
                    className={`w-full px-3 py-2 bg-white border ${
                      errors.estimatedRequirement ? 'border-rose-500' : 'border-slate-300'
                    } rounded-sm text-xs sm:text-sm text-[#0a1d37] focus:outline-none focus:border-[#00a8e8]`}
                  >
                    <option value="1 to 2 Units / Access Lanes">1 to 2 Units / Access Lanes</option>
                    <option value="3 to 5 Units / Points">3 to 5 Units / Points</option>
                    <option value="6 to 15 Units (Medium Facility)">6 to 15 Units (Medium Facility)</option>
                    <option value="Complete Campus Turnkey Project">Complete Campus Turnkey Project</option>
                    <option value="Tender / Specification Stage">Tender / Specification Stage</option>
                  </select>
                  {errors.estimatedRequirement && <p className="text-[10px] text-rose-500 mt-1">{errors.estimatedRequirement}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#0a1d37] mb-1">
                  Project Notes / Specific Site Challenges (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention arm span, foundation constraints, FASTag requirements, or tender timelines..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-xs sm:text-sm text-[#0a1d37] placeholder-slate-400 focus:outline-none focus:border-[#00a8e8]"
                />
              </div>

              {/* Privacy notice */}
              <p className="text-[11px] text-slate-500 leading-normal">
                Your information is secure and will only be used by Neptune Automatic to respond to your technical enquiry. We respect your corporate privacy.
              </p>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-slate-500 hidden sm:flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00a8e8]" />
                  <span>Average response time: &lt; 4 hours</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-sm bg-[#00a8e8] hover:bg-[#0096d1] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request a Consultation</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
