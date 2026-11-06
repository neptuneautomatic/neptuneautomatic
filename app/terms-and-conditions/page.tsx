import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions of Engineering Supply & Service | Neptune Automatic',
  description:
    'Read Neptune Automatic’s commercial B2B procurement terms, warranty guidelines, site readiness requirements, and SLA obligations for perimeter automation hardware.',
  keywords: [
    'Neptune Automatic Terms and Conditions',
    'B2B Equipment Procurement Terms',
    'Boom Barrier Warranty Terms India',
    'Crash Bollard Installation Guidelines',
    'Neptune Automatic Commercial Terms',
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <div className="terms-page" style={{ paddingTop: '140px', paddingBottom: '90px' }}>
      <div className="layout-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Terms &amp; Conditions</span>
        </nav>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--theme-border)', paddingBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-logo-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
            Commercial B2B Procurement Standards
          </span>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
            Terms &amp; Conditions of Sale &amp; Turnkey Supply
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>
            <strong>Last Updated:</strong> 1st January 2026 &bull; <strong>Issuing Entity:</strong> Neptune Automatic Pvt. Ltd.
          </p>
        </div>

        {/* Terms Content */}
        <div className="legal-content" style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--theme-text-secondary)' }}>
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              1. General Framework &amp; Scope of Proposal
            </h2>
            <p>
              These Terms &amp; Conditions govern all B2B quotations, purchase orders (PO), equipment supply agreements, and turnkey installation contracts executed between <strong>Neptune Automatic Pvt. Ltd.</strong> (&ldquo;Seller&rdquo; or &ldquo;Neptune&rdquo;) and the purchasing client, EPC contractor, or system integrator (&ldquo;Buyer&rdquo;). Any variation or modification to these terms must be explicitly confirmed in writing by an authorized Director of Neptune Automatic.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              2. Quotation Validity &amp; Proforma Order Confirmation
            </h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Validity Period:</strong> Formal quotations generated via our Quotation Cart or issued by our Sales Directorate remain valid for <strong>30 calendar days</strong> from issuance, unless otherwise stipulated on the face of the Proforma Invoice (PI).</li>
              <li><strong>Order Confirmation:</strong> An order is deemed accepted only upon receipt of a countersigned Purchase Order along with the stipulated advance mobilization payment.</li>
              <li><strong>Taxes &amp; Statutory Duties:</strong> All prices quoted exclude Goods &amp; Services Tax (GST 18%), octroi, entry taxes, or special site clearances unless explicitly quoted as &ldquo;All Inclusive Turnkey Price.&rdquo;</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              3. Payment Terms &amp; Dispatch Protocols
            </h2>
            <p>Standard B2B commercial terms for access automation and perimeter security equipment:</p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Equipment Supply Only:</strong> 50% advance along with Purchase Order; 50% balance against inspection or Proforma Invoice prior to dispatch from our Greater Noida plant.</li>
              <li><strong>Turnkey Supply &amp; Commissioning:</strong> 50% advance; 40% against material delivery at site; 10% upon successful testing and commissioning or 30 days from delivery (whichever occurs first).</li>
              <li><strong>Annual Maintenance Contracts (AMC):</strong> 100% advance payable annually or semi-annually prior to the commencement of the service coverage period.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              4. Manufacturer Warranty Coverage
            </h2>
            <p>
              Neptune Automatic stands behind the superior industrial reliability of its equipment:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Standard Warranty Duration:</strong> All Neptune automatic boom barriers, bollard hydraulic drive units, turnstiles, and sliding gate operators carry a standard <strong>24-Month Manufacturer Warranty</strong> from the date of supply or 18 months from commissioning, whichever expires earlier.</li>
              <li><strong>Scope of Warranty:</strong> Warranty covers defects in materials, motor winding burnouts under normal rated duty cycles, hydraulic cylinder seal leakages, and controller board failures. Defective components will be repaired or replaced F.O.R. our Greater Noida service facility.</li>
              <li><strong>Exclusions:</strong> Warranty does not cover damages resulting from vehicular ramming / impacts (except certified defense crash barriers within rated kinetic energy ratings), improper electrical grounding, severe input voltage surges (&gt;265V AC), unauthorized site modifications, or deliberate vandalism.</li>
              <li><strong>Spare Parts Availability:</strong> Neptune guarantees genuine spare parts and component availability for a minimum period of <strong>10 years</strong> from the original date of hardware manufacturing.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              5. Site Readiness &amp; Buyer Civil Scope
            </h2>
            <p>
              For turnkey contracts, the Buyer is responsible for delivering the following site prerequisites prior to Neptune installation mobilization:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Provision of clean single-phase / three-phase 230V/415V AC power supply terminated at the barrier/bollard cabinet island with dedicated copper earthing (&lt; 2 Ohms).</li>
              <li>Civil foundation base, ducting, and conduit routing as per Neptune engineering layout drawings approved prior to mobilization.</li>
              <li>For hydraulic bollards and road blockers: adequate site drainage / soak pit connection to prevent prolonged submersion in waterlogged conditions.</li>
              <li>Safe and dry storage space for electronic controllers and optical sensor barriers prior to erection.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              6. Intellectual Property &amp; Proprietary Schematics
            </h2>
            <p>
              All technical specifications, wiring schematics, CAD layouts, firmware algorithms, and design patents associated with Neptune Automatic and FAAC Technologies remain the exclusive intellectual property of Neptune Automatic Pvt. Ltd. and FAAC S.p.A. The Buyer is granted a non-exclusive license to operate the equipment and shall not reverse-engineer, duplicate, or extract firmware code.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.45rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.75rem' }}>
              7. Force Majeure &amp; Limitation of Liability
            </h2>
            <p>
              Neither party shall be liable for failure or delay in delivering equipment resulting from acts of God, governmental bans, war, terrorism, civil unrest, port blockades, or nationwide supply-chain embargoes. In no event shall Neptune’s aggregate financial liability exceed the total invoiced value of the specific hardware component giving rise to the claim.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem', background: '#F8FAFC', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--theme-border)' }}>
            <h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '0.5rem' }}>
              8. Dispute Resolution &amp; Jurisdiction
            </h2>
            <p style={{ margin: 0 }}>
              Any dispute, controversy, or claim arising out of or relating to this contract shall be settled in accordance with the Indian Arbitration and Conciliation Act, 1996, by a sole arbitrator mutually appointed by both parties. The seat and venue of arbitration shall be New Delhi, and the <strong>Courts of New Delhi, India</strong> shall possess exclusive jurisdiction.
            </p>
            <div style={{ marginTop: '0.75rem', fontWeight: 600, color: 'var(--theme-text-primary)' }}>
              Neptune Automatic Pvt. Ltd. &bull; Corporate Legal Directorate<br />
              Plot No. 8, Okhla Industrial Area, Phase-III, New Delhi - 110020, India<br />
              Email: <a href="mailto:info@neptuneautomatic.com" style={{ color: 'var(--color-logo-blue)' }}>info@neptuneautomatic.com</a> &bull; Phone: +91 8010 807 000
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
