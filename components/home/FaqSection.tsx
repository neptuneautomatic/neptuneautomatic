'use client';

import React, { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  isHiddenByDefault?: boolean;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'What is the maximum boom arm length and opening speed of Neptune Automatic Boom Barriers?',
    answer: (
      <p>
        Neptune Automatic boom barriers accommodate arm lengths ranging from <strong>2.5 meters to 8 meters</strong>. For high-throughput transit points, toll plazas, and IT campus entrances, our ultra-fast brushless DC (BLDC) models achieve opening speeds as rapid as <strong>0.9 to 1.5 seconds</strong> with 100% continuous duty cycle ratings. For long-span industrial logistics gates (up to 8m), the opening cycle is calibrated between 3.0 and 6.0 seconds, accompanied by infrared safety beams, loop detectors, and impact-softening rubber profiles.
      </p>
    ),
  },
  {
    id: 2,
    question: 'Are Neptune Automatic hydraulic bollards crash-tested and certified against hostile vehicles?',
    answer: (
      <p>
        Yes. Neptune&apos;s high-security automatic bollards and shallow-mount road blockers are engineered and internationally tested according to <strong>ASTM F2656, PAS 68, and IWA 14-1</strong> crash standards. Our crash-rated M30 and M50 models are certified to arrest a 7.5-ton hostile truck traveling at 50 km/h and 80 km/h respectively with zero perimeter penetration. They also feature <strong>Emergency Fast Operation (EFO)</strong>, allowing immediate deployment in under 1.0 second during a high-alert scenario.
      </p>
    ),
  },
  {
    id: 3,
    question: 'How does Neptune’s Smart Parking Management System (PMS) integrate with FASTag and UPI payments?',
    answer: (
      <p>
        Neptune Smart PMS comes equipped with NPCI-certified dedicated <strong>FASTag overhead RFID readers</strong> and optical lane cameras at both entry and exit. FASTag-registered vehicles experience frictionless drive-through access with toll-style automated balance deduction. For non-FASTag visitors, our unattended Pay Stations (APMs) and lane entry dispensers provide dynamic UPI QR codes (Google Pay, PhonePe, Paytm), credit/debit card tap-to-pay, and ticketless license plate recognition (ANPR) with cloud revenue reconciliation.
      </p>
    ),
  },
  {
    id: 4,
    question: 'Can Neptune systems integrate with our existing building Access Control, ERP, and HRMS software?',
    answer: (
      <p>
        Absolutely. All Neptune automation control boards and cloud management modules feature open-architecture design. We support industry-standard protocols including <strong>REST APIs, Wiegand 26/34, RS-485, BACnet, and TCP/IP</strong>. This ensures seamless interoperability with enterprise access control software (e.g., Honeywell, Lenel, Schneider, Johnson Controls), SAP / Oracle ERP platforms, and corporate HRMS for employee badge and visitor management synchronisation.
      </p>
    ),
  },
  {
    id: 5,
    question: 'What built-in safety features prevent boom barriers or automatic gates from closing on a vehicle or pedestrian?',
    isHiddenByDefault: true,
    answer: (
      <p>
        Safety is our highest engineering priority. Every barrier and gate installation employs <strong>triple redundancy protection</strong>: (1) dual buried inductive magnetic loop detectors that lock the barrier in the open position while metal mass is present; (2) active infrared photocell safety beams; and (3) intelligent electronic torque auto-reversing sensors in our BLDC drives that instantly reverse the barrier&apos;s direction within milliseconds upon detecting any physical resistance.
      </p>
    ),
  },
  {
    id: 6,
    question: 'What is the typical civil foundation requirement and installation timeframe for automatic barriers and bollards?',
    isHiddenByDefault: true,
    answer: (
      <p>
        Standard automatic boom barriers require a minimal concrete foundation pad (approx. 450 × 450 × 500 mm) with conduit routing and can be mechanically anchored and fully commissioned within <strong>24 to 48 hours</strong>. For hydraulic rising bollards and road blockers, excavation depth varies between 350mm (shallow mount) and 1,200mm (deep embedment) with rebar reinforcement and submersible gravel drainage pits; civil work and electrical commissioning typically require <strong>3 to 7 working days</strong> per lane.
      </p>
    ),
  },
  {
    id: 7,
    question: 'What warranty, Annual Maintenance Contracts (AMC), and emergency SLA support does Neptune offer?',
    isHiddenByDefault: true,
    answer: (
      <p>
        All Neptune equipment includes a standard comprehensive <strong>1 to 3-year manufacturer warranty</strong> covering all drive motors, electronics, and hydraulic power units. For continuous operational readiness, we offer customized Annual Maintenance Contracts (Comprehensive &amp; Non-Comprehensive) backed by our direct nationwide network of factory-trained technicians stationed across 25+ Indian industrial hubs with guaranteed <strong>2 to 4-hour emergency response SLAs</strong> and 100% genuine OEM spare parts availability.
      </p>
    ),
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className="section-padding faqs-section" id="faqs" aria-label="Frequently Asked Questions">
      <div className="layout-container">
        <div className="section-header scroll-reveal">
          <div className="section-header-left">
            <span className="section-eyebrow">Enterprise Consultation &amp; Technical FAQs</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <p className="section-subtitle">
            Key answers regarding technical specifications, crash certifications, FASTag integration, civil works, and nationwide AMC maintenance SLAs.
          </p>
        </div>

        <div className={`faqs-accordion-list reveal-stagger ${isExpanded ? 'expanded' : ''}`}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const hiddenClass = faq.isHiddenByDefault && !isExpanded ? 'faq-item-hidden' : '';
            return (
              <div
                key={faq.id}
                className={`faq-item ${hiddenClass} ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(faq.id)}
                >
                  <div className="faq-trigger-main">
                    <span className="faq-question">{faq.question}</span>
                  </div>
                  <span className="faq-toggle-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  className="faq-panel"
                  style={{
                    display: isOpen ? 'block' : 'none',
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Row Toggle: View More / Show Less FAQs */}
        <div className="faqs-toggle-wrap">
          <button
            type="button"
            className="faqs-toggle-btn"
            id="faqToggleMoreBtn"
            aria-expanded={isExpanded}
            onClick={toggleExpand}
          >
            <span className="toggle-text">
              {isExpanded ? 'Show Fewer FAQs' : 'View All Technical FAQs (7 Total)'}
            </span>
            <svg
              className="toggle-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
