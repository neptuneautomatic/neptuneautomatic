import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { NeptuneCompanyBuilding } from './NeptuneCompanyBuilding';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'Hardware Purchase & Quote'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (!formData.name || !formData.email || !formData.phone) return;

    const email = formData.email.trim().toLowerCase();
    const parts = email.split('@');
    const domain = parts[1] || '';
    const disposableDomains = ['tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com', 'sharklasers.com', '10minutemail.com', 'yopmail.com', 'trashmail.com', 'getairmail.com', 'fakeinbox.com', 'dispostable.com', 'temp-mail.org'];
    if (disposableDomains.includes(domain) || /^(temp|throwaway|fake|burner|dispos|trash|spam)/i.test(domain)) {
      setEmailError('Disposable and temporary email domains are not accepted. Please use a valid work email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRefCode(`NP-NOC-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact-section" className="py-20 bg-white border-t-2 border-slate-200 relative overflow-hidden">
      {/* Signature 3-Color Brand Accent Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] flex z-20">
        <div className="w-[50%] bg-[#1D438A]" />
        <div className="w-[30%] bg-[#00A8E8]" />
        <div className="w-[20%] bg-[#D7282F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-6 bg-[#00a8e8]"></div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00a8e8] uppercase">
              Noida Manufacturing HQ & Support
            </span>
            <div className="h-[2px] w-6 bg-[#00a8e8]"></div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0a1d37] tracking-tight">
            Connect With Our Engineering Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Consult on site dimensions, request CAD layouts, schedule a factory audit, or obtain official distributor pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information & Map Preview (Left Col) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Cards */}
            <div className="rounded-sm bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
              
              {/* Office 1: Neptune India Limited */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1D438A] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-display text-sm font-bold text-[#0a1d37]">
                      Neptune India Limited
                    </h4>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-xs bg-blue-50 text-[#1D438A] border border-blue-200">
                      Office
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    A-11, A Block, Sector 59, Noida, Uttar Pradesh 201309
                  </p>
                  <a href="tel:08010807000" className="inline-block mt-1 text-xs font-bold text-[#1D438A] hover:text-[#00a8e8]">
                    Phone: 080108 07000
                  </a>
                </div>
              </div>

              {/* Office 2: Neptune System Pvt Ltd */}
              <div className="flex items-start gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-display text-sm font-bold text-[#0a1d37]">
                      Neptune System Pvt Ltd
                    </h4>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-xs bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Corporate HQ & Production Facility
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Sector 156, Noida, Uttar Pradesh 201304
                  </p>
                  <a href="tel:08010807000" className="inline-block mt-1 text-xs font-bold text-emerald-700 hover:text-emerald-900">
                    Phone: 080108 07000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center text-[#00a8e8] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0a1d37]">
                    Direct Central Hotline
                  </h4>
                  <div className="mt-1 space-y-1">
                    <a href="tel:08010807000" className="block text-xs font-bold text-[#00a8e8] hover:text-[#0a1d37]">
                      080108 07000 (Central Desk / Hotline)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center text-[#00a8e8] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0a1d37]">
                    Official Email Communications
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    For quotes, technical tenders, & dealer applications:
                  </p>
                  <a href="mailto:connect@neptuneautomatic.com" className="text-xs font-bold text-[#00a8e8] hover:text-[#0a1d37] mt-0.5 block">
                    connect@neptuneautomatic.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#0a1d37]">
                    Manufacturing & Office Hours
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Monday to Saturday: 9:30 AM – 6:30 PM IST<br />
                    Sunday: Closed (Emergency field support active)
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Consultation Form (Right Col) */}
          <div className="lg:col-span-7">
            <div className="rounded-sm bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
              
              <div className="mb-6">
                <div className="flex items-center gap-2 text-[#00a8e8] text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Factory Enquiry</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0a1d37]">
                  Send a Message to Solutions Architects
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Guaranteed response within 4 business hours with preliminary engineering estimates.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-[#0a1d37]">
                    Enquiry Registered Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your reference number is <strong className="text-[#00a8e8] font-mono">{refCode}</strong>. A technical sales engineer from our Noida office will reach out shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', company: '', email: '', phone: '', message: '', inquiryType: 'Hardware Purchase & Quote' }); }}
                    className="px-5 py-2.5 rounded-sm bg-[#0a1d37] text-xs font-bold text-white hover:bg-[#1a3c6d] transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
                      />
                      {emailError && <p className="text-[10px] text-rose-500 mt-1">{emailError}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
                    >
                      <option value="Hardware Purchase & Quote">Hardware Purchase & Equipment Quote</option>
                      <option value="Turnkey Parking Automation (FASTag)">Turnkey Parking Automation (FASTag)</option>
                      <option value="Perimeter Crash Defense (Bollards/Blockers)">Perimeter Crash Defense (Bollards/Blockers)</option>
                      <option value="Distributor / System Integrator Partnership">Distributor / System Integrator Partnership</option>
                      <option value="Factory Visit & Audit Request">Factory Visit & Audit Request (Noida)</option>
                      <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Details & Site Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe arm span, vehicle frequency per minute, integration software, or site location..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-sm text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00a8e8] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Zero spam guarantee • Direct Indian engineering team
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-sm bg-[#0a1d37] hover:bg-[#1a3c6d] text-white font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-[#00a8e8]" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Enquiry'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
