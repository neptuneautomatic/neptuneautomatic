import React from 'react';
import Image from 'next/image';

interface ClientLogo {
  name: string;
  src: string;
}

const clients: ClientLogo[] = [
  { name: 'Reliance Industries Limited', src: '/assets/images/clients/reliance-industries.png' },
  { name: 'Tata Consultancy Services', src: '/assets/images/clients/tcs.webp' },
  { name: 'Larsen & Toubro', src: '/assets/images/clients/larsen-toubro.webp' },
  { name: 'Airports Authority of India', src: '/assets/images/clients/aai.png' },
  { name: 'Reserve Bank of India', src: '/assets/images/clients/rbi.jpg' },
  { name: 'State Bank of India', src: '/assets/images/clients/sbi.png' },
  { name: 'HDFC Bank', src: '/assets/images/clients/hdfc-bank.png' },
  { name: 'ICICI Bank', src: '/assets/images/clients/icici-bank.webp' },
  { name: 'Punjab National Bank', src: '/assets/images/clients/pnb.webp' },
  { name: 'DRDO', src: '/assets/images/clients/drdo.png' },
  { name: 'AIIMS Delhi', src: '/assets/images/clients/aiims-delhi.svg' },
  { name: 'IIM Ahmedabad', src: '/assets/images/clients/iim-ahmedabad.jpg' },
  { name: 'Indian School of Business', src: '/assets/images/clients/isb.svg' },
  { name: 'National Stock Exchange', src: '/assets/images/clients/nse-india.svg' },
  { name: 'DLF CyberCity', src: '/assets/images/clients/dlf.png' },
  { name: 'Brookfield', src: '/assets/images/clients/brookfield.png' },
  { name: 'Godrej Properties', src: '/assets/images/clients/godrej-properties.jpg' },
  { name: 'Oberoi Realty', src: '/assets/images/clients/oberoi-realty.jpg' },
  { name: 'Lodha Group', src: '/assets/images/clients/lodha-group.png' },
  { name: 'Prestige Group', src: '/assets/images/clients/prestige-group.png' },
  { name: 'Sobha Realty', src: '/assets/images/clients/sobha-realty.png' },
  { name: 'Emaar Properties', src: '/assets/images/clients/emaar-properties.png' },
  { name: 'Hines', src: '/assets/images/clients/hines.png' },
  { name: 'CapitaLand', src: '/assets/images/clients/capitaland.webp' },
  { name: 'K Raheja Corp', src: '/assets/images/clients/k-raheja-corp.png' },
  { name: 'Bharti Realty', src: '/assets/images/clients/bharti-realty.webp' },
  { name: 'Max Estates', src: '/assets/images/clients/max-estates.webp' },
  { name: 'M3M India', src: '/assets/images/clients/m3m-india.jpg' },
  { name: 'Jaypee Group', src: '/assets/images/clients/jaypee-group.png' },
  { name: 'Maruti Suzuki', src: '/assets/images/clients/maruti-suzuki.png' },
  { name: 'Hyundai Motor', src: '/assets/images/clients/hyundai.svg' },
  { name: 'Mercedes-Benz', src: '/assets/images/clients/mercedes-benz.jpg' },
  { name: 'Bajaj', src: '/assets/images/clients/bajaj.jpg' },
  { name: 'Hero MotoCorp', src: '/assets/images/clients/hero-motocorp.png' },
  { name: 'Eicher Motors', src: '/assets/images/clients/eicher-motors.png' },
  { name: 'Infosys', src: '/assets/images/clients/infosys.webp' },
  { name: 'HCL Technologies', src: '/assets/images/clients/hcl-technologies.png' },
  { name: 'Tech Mahindra', src: '/assets/images/clients/tech-mahindra.webp' },
  { name: 'NTT DATA', src: '/assets/images/clients/ntt-data.png' },
  { name: 'CtrlS Datacenters', src: '/assets/images/clients/ctrls-datacenters.png' },
  { name: 'Nxtra Data by Airtel', src: '/assets/images/clients/nxtra-airtel.jpg' },
  { name: 'Yotta Data Services', src: '/assets/images/clients/yotta.png' },
  { name: 'Sify Technologies', src: '/assets/images/clients/sify.png' },
  { name: 'STMicroelectronics', src: '/assets/images/clients/stmicroelectronics.png' },
  { name: 'Indian Oil', src: '/assets/images/clients/indian-oil.webp' },
  { name: 'ONGC', src: '/assets/images/clients/ongc.webp' },
  { name: 'GAIL India', src: '/assets/images/clients/gail.webp' },
  { name: 'Tata Power', src: '/assets/images/clients/tata-power.png' },
  { name: 'JSW Group', src: '/assets/images/clients/jsw-group.webp' },
  { name: 'Adani Group', src: '/assets/images/clients/adani-group.png' },
  { name: 'Hindalco', src: '/assets/images/clients/hindalco.webp' },
  { name: 'BALCO', src: '/assets/images/clients/balco.jpg' },
  { name: 'REC Limited', src: '/assets/images/clients/rec-limited.webp' },
  { name: 'OTPC Power', src: '/assets/images/clients/otpc.jpg' },
  { name: 'Shell', src: '/assets/images/clients/shell.png' },
  { name: 'Yara International', src: '/assets/images/clients/yara.webp' },
  { name: 'IFFCO', src: '/assets/images/clients/iffco.png' },
  { name: 'Taj Hotels', src: '/assets/images/clients/taj-hotels.webp' },
  { name: 'The Oberoi Hotels', src: '/assets/images/clients/oberoi-hotels.jpg' },
  { name: 'The Leela Palaces', src: '/assets/images/clients/the-leela.png' },
  { name: 'JW Marriott', src: '/assets/images/clients/jw-marriott.webp' },
  { name: 'Hilton Hotels', src: '/assets/images/clients/hilton.webp' },
  { name: 'Hyatt', src: '/assets/images/clients/hyatt.png' },
  { name: 'Radisson Hotel Group', src: '/assets/images/clients/radisson.png' },
  { name: 'IHG Hotels & Resorts', src: '/assets/images/clients/ihg.webp' },
  { name: 'Le Méridien', src: '/assets/images/clients/le-meridien.png' },
  { name: 'Westin Hotels', src: '/assets/images/clients/westin-hotels.webp' },
  { name: 'Aloft Hotels', src: '/assets/images/clients/aloft-hotels.webp' },
  { name: 'Moxy Hotels', src: '/assets/images/clients/moxy-hotels.webp' },
  { name: 'The Roseate', src: '/assets/images/clients/the-roseate.png' },
  { name: 'Apollo Hospitals', src: '/assets/images/clients/apollo-hospitals.png' },
  { name: 'Max Healthcare', src: '/assets/images/clients/max-healthcare.png' },
  { name: 'Sir Ganga Ram Hospital', src: '/assets/images/clients/sir-ganga-ram-hospital.png' },
  { name: 'Amrita Hospital', src: '/assets/images/clients/amrita-hospital.png' },
  { name: 'CMC Vellore', src: '/assets/images/clients/cmc-vellore.png' },
  { name: 'National War Memorial', src: '/assets/images/clients/national-war-memorial.png' },
  { name: 'ITPO Bharat Mandapam', src: '/assets/images/clients/itpo.png' },
  { name: 'CSIR India', src: '/assets/images/clients/csir-india.png' },
  { name: 'Madhya Pradesh Police', src: '/assets/images/clients/mp-police.png' },
  { name: 'Government of Uttar Pradesh', src: '/assets/images/clients/up-government.webp' },
  { name: 'Embassy of Japan', src: '/assets/images/clients/embassy-of-japan.jpg' },
  { name: 'New Zealand Embassy', src: '/assets/images/clients/new-zealand-embassy.jpg' },
  { name: 'Australian Government', src: '/assets/images/clients/australian-government.png' },
  { name: 'British Council', src: '/assets/images/clients/british-council.webp' },
  { name: 'Ministry of Foreign Affairs Singapore', src: '/assets/images/clients/singapore-mfa.avif' },
  { name: 'The World Bank', src: '/assets/images/clients/world-bank.png' },
  { name: 'World Health Organization (WHO)', src: '/assets/images/clients/who.webp' },
  { name: 'UNICEF', src: '/assets/images/clients/unicef.png' },
  { name: 'SIDBI', src: '/assets/images/clients/sidbi.jpg' },
  { name: 'IKEA', src: '/assets/images/clients/ikea.jpg' },
  { name: 'LG Electronics', src: '/assets/images/clients/lg-electronics.webp' },
  { name: 'Vivo', src: '/assets/images/clients/vivo.png' },
  { name: 'Nestlé', src: '/assets/images/clients/nestle.jpg' },
  { name: 'Microsoft', src: '/assets/images/clients/microsoft.png' },
  { name: 'Schneider Electric', src: '/assets/images/clients/schneider.png' },
  { name: 'GMR Group', src: '/assets/images/clients/gmr.png' },
  { name: 'Mahindra', src: '/assets/images/clients/mahindra.png' },
  { name: 'Fortune Hotels - ITC Group', src: '/assets/images/clients/fortune.png' },
  { name: 'Airtel', src: '/assets/images/clients/airtel.png' },
  { name: 'Procter & Gamble (P&G)', src: '/assets/images/clients/pg.png' },
  { name: 'Cadbury (Mondelez)', src: '/assets/images/clients/cadbury.png' },
];

export default function ClientsMarquee() {
  return (
    <section className="clients-marquee-section" id="clients">
      <div className="layout-container">
        <div className="clients-marquee-header">
          <span className="mono-tag" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
            Trusted by India&apos;s Foremost Establishments
          </span>
        </div>
        <div className="marquee-track">
          {/* First set of logos */}
          {clients.map((c, i) => (
            <div key={`logo-1-${i}`} className="client-logo-item">
              <Image
                src={c.src}
                alt={c.name}
                width={120}
                height={50}
                style={{ objectFit: 'contain', width: 'auto', height: '36px' }}
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate set for infinite seamless CSS marquee animation */}
          {clients.map((c, i) => (
            <div key={`logo-2-${i}`} className="client-logo-item" aria-hidden="true">
              <Image
                src={c.src}
                alt=""
                width={120}
                height={50}
                style={{ objectFit: 'contain', width: 'auto', height: '36px' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
