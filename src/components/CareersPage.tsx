import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Building2, 
  HeartHandshake, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  X,
  FileText,
  Mail,
  User,
  Phone
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { NeptuneLogo } from './NeptuneLogo';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-firmware-eng',
    title: 'Senior Embedded Firmware Architect',
    department: 'Research & Development (Firmware)',
    location: 'Noida HQ (Sector 59)',
    experience: '4 - 8 Years',
    type: 'Full-Time',
    description: 'Lead embedded firmware engineering for high-speed BLDC boom barrier controllers, CAN-bus networks, and NPCI FASTag toll integration micro-controllers.',
    requirements: [
      'Strong proficiency in Embedded C/C++ for ARM Cortex-M microcontrollers (STM32, NXP)',
      'Hands-on experience with FreeRTOS, hardware timers, PWM motor control, and encoder feedback',
      'Solid knowledge of industrial protocols: RS-485, Modbus-RTU, CAN Bus, and TCP/IP',
      'Familiarity with NPCI FASTag reader protocols and automated toll transaction logic'
    ],
    responsibilities: [
      'Design fail-safe firmware architectures for sub-second high-cycle barrier systems',
      'Collaborate with hardware engineers on PCB bring-up, EMI/EMC compliance, and field debugging',
      'Implement over-the-air (OTA) telemetry and cloud diagnostics for enterprise clients'
    ]
  },
  {
    id: 'job-mech-designer',
    title: 'Mechanical Design Engineer (SolidWorks & FEA)',
    department: 'Hardware Engineering & R&D',
    location: 'Noida Manufacturing Campus',
    experience: '3 - 6 Years',
    type: 'Full-Time',
    description: 'Design robust mechanical chassis, planetary gearboxes, hydraulic ram systems, and ASTM crash-rated bollard assemblies for hostile vehicle mitigation.',
    requirements: [
      'B.Tech / B.E. in Mechanical Engineering with high proficiency in SolidWorks 3D CAD',
      'Experience in heavy sheet-metal fabrication, structural steel frames, and hydraulic cylinder sizing',
      'Hands-on knowledge of Finite Element Analysis (FEA) for impact and stress calculations',
      'Understanding of industrial machining tolerances (GD&T) and protective coatings (galvanizing, powder coat)'
    ],
    responsibilities: [
      'Develop 3D models and detailed manufacturing drafting drawings for production bays',
      'Perform crash kinetic energy dissipation simulation for M30 and M50 security barriers',
      'Conduct prototype fitting tests and optimize production BOMs for indigenous manufacturing'
    ]
  },
  {
    id: 'job-enterprise-sales',
    title: 'Enterprise Solution Sales Manager',
    department: 'Technical Sales & Infrastructure Tenders',
    location: 'Delhi NCR / Regional Travel',
    experience: '5 - 9 Years',
    type: 'Full-Time',
    description: 'Drive high-value turnkey physical security, automated gate, and FASTag parking projects with tier-1 real estate developers, transit authorities, and government agencies.',
    requirements: [
      'Proven track record in B2B project sales within access control, parking automation, or building security',
      'Established network with EPC contractors, security consultants, and facility management firms',
      'Ability to understand electrical schematics and formulate tender compliant techno-commercial bids',
      'Excellent presentation, contract negotiation, and customer relationship skills'
    ],
    responsibilities: [
      'Identify enterprise pipeline opportunities across IT parks, commercial airports, and industrial estates',
      'Lead tender presentations and coordinate with factory design engineers for bespoke configurations',
      'Manage sales lifecycle from initial site survey and architectural spec-in to handover and AMC'
    ]
  },
  {
    id: 'job-commissioning-tech',
    title: 'Field Commissioning & Systems Specialist',
    department: 'Customer Engineering & Site Operations',
    location: 'Pan-India (Regional Hubs)',
    experience: '2 - 5 Years',
    type: 'Full-Time',
    description: 'Execute on-site installation, commissioning, and integration of automatic bollards, road blockers, ANPR cameras, and pedestrian speed gates.',
    requirements: [
      'Diploma or Degree in Electrical/Electronics Engineering or Mechatronics',
      'Practical knowledge of loop detectors, hydraulic power packs, photocells, and access controllers',
      'Troubleshooting competence with multimeters, wiring looms, and system integration software',
      'Willingness to travel to project sites across major Indian infrastructure corridors'
    ],
    responsibilities: [
      'Supervise physical installation and civil coordination for foundation depth and conduit piping',
      'Perform site acceptance testing (SAT) and train client security staff on system operations',
      'Provide rapid diagnostic assistance and periodic preventative maintenance'
    ]
  }
];

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [appliedRole, setAppliedRole] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '3-5 Years',
    portfolioUrl: '',
    coverNote: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApply = (jobTitle: string) => {
    setAppliedRole(jobTitle);
    setIsApplyModalOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Strip */}
      <section className="bg-white text-slate-900 py-16 sm:py-20 relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#1D438A]">
            <Sparkles className="w-3.5 h-3.5 text-[#00a8e8]" />
            <span>JOIN THE NEPTUNE ENGINEERING TEAM</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-[#0a1d37]">
            Engineer the Future of India’s Physical Infrastructure
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            At Neptune Automatic, we design, simulate, and manufacture indigenous access automation systems that protect millions of lives daily. Build hardware and firmware that matters.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-6 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#1D438A]" />
              50,000+ Sq. Ft. Integrated Campus
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Made in India Manufacturing
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              20+ Years Engineering Heritage
            </span>
          </div>
        </div>
      </section>

      {/* Engineering Culture Pillars */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0a1d37]">
              Why Build Your Career at Neptune?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We empower engineers, designers, and innovators to work on critical physical infrastructure from first principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-sm bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1D438A]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0a1d37]">
                True Full-Stack Engineering
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work across the entire engineering continuum: finite element mechanics, high-pressure hydraulics, embedded microcontrollers, and cloud-synced FASTag architectures.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-sm bg-red-50 border border-red-200 flex items-center justify-center text-[#D7282F]">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0a1d37]">
                Indigenous R&D & Prototyping
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experience the pride of seeing your CAD designs and firmware deployed in landmark airports, metro networks, and tech parks nationwide.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0a1d37]">
                Empowerment & Stability
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy collaborative mentorship under veteran engineering leadership, comprehensive healthcare coverage, competitive compensation, and clear growth paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-mono font-bold text-[#1D438A] uppercase tracking-wider mb-1">
              Active Openings
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0a1d37]">
              Current Career Opportunities
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Sector-59 Noida Campus & Regional Infrastructure Corridors
          </p>
        </div>

        <div className="space-y-4">
          {JOB_OPENINGS.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-sm bg-white border border-slate-200 hover:border-[#1D438A] transition-all shadow-xs space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-xs bg-blue-50 text-[#1D438A] font-mono text-[11px] font-bold border border-blue-200">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-xs bg-slate-100 text-slate-700 font-mono text-[11px] font-bold">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#0a1d37]">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.experience} Experience
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                    className="px-4 py-2 text-xs font-bold text-[#1D438A] hover:bg-blue-50 rounded-xs transition-colors border border-blue-200 cursor-pointer"
                  >
                    {selectedJob?.id === job.id ? 'Hide Details' : 'View Requirements'}
                  </button>
                  <button
                    onClick={() => handleApply(job.title)}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#D7282F] hover:bg-[#B81D23] rounded-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {job.description}
              </p>

              {/* Collapsible details */}
              {selectedJob?.id === job.id && (
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in-50 duration-200">
                  <div className="space-y-2">
                    <h4 className="font-display text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                      Key Qualifications & Experience:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-xs font-bold text-[#0a1d37] uppercase tracking-wider">
                      Core Responsibilities:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1D438A] shrink-0 mt-1.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* General Application Callout */}
        <div className="p-8 rounded-sm bg-[#0a1d37] text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl font-bold">
              Don’t See a Suitable Role Listed?
            </h3>
            <p className="text-xs text-slate-300">
              We are continually seeking exceptional mechanical engineers, embedded developers, and technical sales leaders. Send your resume directly to our HR team.
            </p>
          </div>
          <button
            onClick={() => handleApply('General Engineering Application')}
            className="px-6 py-3 rounded-xs bg-white text-[#0a1d37] hover:bg-slate-100 text-xs font-bold shrink-0 transition-colors shadow-sm cursor-pointer"
          >
            Submit General Resume
          </button>
        </div>
      </section>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="fixed inset-0" onClick={() => setIsApplyModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-sm shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0a1d37]">
                  Submit Application
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {appliedRole}
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#0a1d37]">
                  Application Received!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Our human resources and technical lead team will review your credentials and contact you within 5 business days.
                </p>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-6 py-2.5 rounded-xs bg-[#1D438A] text-white text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-[#1D438A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@domain.com"
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-[#1D438A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-[#1D438A]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Relevant Experience *
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-[#1D438A]"
                  >
                    <option value="1-2 Years">1 - 2 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="6-9 Years">6 - 9 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    LinkedIn / Online Portfolio URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-[#1D438A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Brief Introduction / Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Share brief notes on your technical projects, core tools, and notice period..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xs text-xs text-slate-900 focus:outline-none focus:border-[#1D438A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1D438A] hover:bg-[#15346D] text-white text-xs font-bold rounded-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
