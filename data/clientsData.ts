export interface ClientItem {
  id: string;
  name: string;
  src: string;
  category: ClientCategory;
  sectorLabel: string;
  featured?: boolean;
  highlight?: string;
}

export type ClientCategory =
  | 'all'
  | 'government-defense'
  | 'banking-financial'
  | 'real-estate-tech-parks'
  | 'it-data-centers'
  | 'industrial-automotive'
  | 'luxury-hospitality'
  | 'healthcare-education';

export interface SectorTab {
  id: ClientCategory;
  label: string;
  count: number;
}

export const CLIENT_CATEGORIES: SectorTab[] = [
  { id: 'all', label: 'All Organizations', count: 102 },
  { id: 'government-defense', label: 'Govt, Defense & Embassies', count: 15 },
  { id: 'banking-financial', label: 'Banking & Financial', count: 7 },
  { id: 'real-estate-tech-parks', label: 'Tech Parks & Real Estate', count: 16 },
  { id: 'it-data-centers', label: 'IT, Telecom & Data Centers', count: 12 },
  { id: 'industrial-automotive', label: 'Industrial & Automotive', count: 29 },
  { id: 'luxury-hospitality', label: 'Luxury Hospitality', count: 14 },
  { id: 'healthcare-education', label: 'Healthcare & Institutions', count: 8 },
];

export const CLIENTS_LIST: ClientItem[] = [
  // 1. Government, Defense & Embassies
  {
    id: 'aai',
    name: 'Airports Authority of India',
    src: '/assets/images/clients/aai.png',
    category: 'government-defense',
    sectorLabel: 'Government & Aviation',
    featured: true,
    highlight: 'Turnkey transit barrier automation & anti-ram perimeter defense across commercial air hubs.'
  },
  {
    id: 'drdo',
    name: 'DRDO',
    src: '/assets/images/clients/drdo.png',
    category: 'government-defense',
    sectorLabel: 'Defense Research',
    featured: true,
    highlight: 'Hostile Vehicle Mitigation (HVM) crash barriers protecting strategic R&D campuses.'
  },
  {
    id: 'national-war-memorial',
    name: 'National War Memorial',
    src: '/assets/images/clients/national-war-memorial.png',
    category: 'government-defense',
    sectorLabel: 'National Monument',
    featured: true,
    highlight: 'Architectural crash bollards and pedestrian security gates at India’s premier national memorial.'
  },
  {
    id: 'itpo',
    name: 'ITPO Bharat Mandapam',
    src: '/assets/images/clients/itpo.png',
    category: 'government-defense',
    sectorLabel: 'Convention & Diplomatic',
    featured: true,
    highlight: 'G20 Summit venue security: Hydraulic crash bollards & ANPR barrier infrastructure.'
  },
  {
    id: 'csir-india',
    name: 'CSIR India',
    src: '/assets/images/clients/csir-india.png',
    category: 'government-defense',
    sectorLabel: 'Scientific Research'
  },
  {
    id: 'mp-police',
    name: 'Madhya Pradesh Police',
    src: '/assets/images/clients/mp-police.png',
    category: 'government-defense',
    sectorLabel: 'Law Enforcement'
  },
  {
    id: 'up-government',
    name: 'Government of Uttar Pradesh',
    src: '/assets/images/clients/up-government.webp',
    category: 'government-defense',
    sectorLabel: 'State Secretariat'
  },
  {
    id: 'embassy-of-japan',
    name: 'Embassy of Japan',
    src: '/assets/images/clients/embassy-of-japan.jpg',
    category: 'government-defense',
    sectorLabel: 'Diplomatic Mission',
    highlight: 'Certified anti-ram automatic bollards & consular perimeter access controls.'
  },
  {
    id: 'new-zealand-embassy',
    name: 'New Zealand Embassy',
    src: '/assets/images/clients/new-zealand-embassy.jpg',
    category: 'government-defense',
    sectorLabel: 'Diplomatic Mission'
  },
  {
    id: 'australian-government',
    name: 'Australian Government',
    src: '/assets/images/clients/australian-government.png',
    category: 'government-defense',
    sectorLabel: 'High Commission'
  },
  {
    id: 'british-council',
    name: 'British Council',
    src: '/assets/images/clients/british-council.webp',
    category: 'government-defense',
    sectorLabel: 'Cultural & Diplomatic'
  },
  {
    id: 'singapore-mfa',
    name: 'Ministry of Foreign Affairs Singapore',
    src: '/assets/images/clients/singapore-mfa.avif',
    category: 'government-defense',
    sectorLabel: 'Foreign Affairs'
  },
  {
    id: 'world-bank',
    name: 'The World Bank',
    src: '/assets/images/clients/world-bank.png',
    category: 'government-defense',
    sectorLabel: 'International Agency'
  },
  {
    id: 'who',
    name: 'World Health Organization (WHO)',
    src: '/assets/images/clients/who.webp',
    category: 'government-defense',
    sectorLabel: 'United Nations Agency'
  },
  {
    id: 'unicef',
    name: 'UNICEF',
    src: '/assets/images/clients/unicef.png',
    category: 'government-defense',
    sectorLabel: 'United Nations Agency'
  },

  // 2. Banking & Financial
  {
    id: 'rbi',
    name: 'Reserve Bank of India',
    src: '/assets/images/clients/rbi.jpg',
    category: 'banking-financial',
    sectorLabel: 'Central Bank',
    featured: true,
    highlight: 'High-security crash-rated drop arms & hostile vehicle interceptors guarding currency vaults.'
  },
  {
    id: 'sbi',
    name: 'State Bank of India',
    src: '/assets/images/clients/sbi.png',
    category: 'banking-financial',
    sectorLabel: 'Public Sector Banking',
    featured: true,
    highlight: 'Corporate headquarters & administrative center boom barriers & RFID access integration.'
  },
  {
    id: 'hdfc-bank',
    name: 'HDFC Bank',
    src: '/assets/images/clients/hdfc-bank.png',
    category: 'banking-financial',
    sectorLabel: 'Private Banking',
    featured: true
  },
  {
    id: 'icici-bank',
    name: 'ICICI Bank',
    src: '/assets/images/clients/icici-bank.webp',
    category: 'banking-financial',
    sectorLabel: 'Private Banking'
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    src: '/assets/images/clients/pnb.webp',
    category: 'banking-financial',
    sectorLabel: 'Public Sector Banking'
  },
  {
    id: 'nse-india',
    name: 'National Stock Exchange',
    src: '/assets/images/clients/nse-india.svg',
    category: 'banking-financial',
    sectorLabel: 'Financial Exchange',
    featured: true,
    highlight: 'Zero-latency entrance control & speed gates safeguarding national bourse infrastructure.'
  },
  {
    id: 'sidbi',
    name: 'SIDBI',
    src: '/assets/images/clients/sidbi.jpg',
    category: 'banking-financial',
    sectorLabel: 'Development Financial Institution'
  },

  // 3. Real Estate & Tech Parks
  {
    id: 'dlf',
    name: 'DLF CyberCity',
    src: '/assets/images/clients/dlf.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Commercial IT Park',
    featured: true,
    highlight: 'Integrated multi-lane parking management (PMS), FASTag tolling & intelligent parking guidance.'
  },
  {
    id: 'brookfield',
    name: 'Brookfield Properties',
    src: '/assets/images/clients/brookfield.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Global Asset Management',
    featured: true
  },
  {
    id: 'godrej-properties',
    name: 'Godrej Properties',
    src: '/assets/images/clients/godrej-properties.jpg',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Premium Real Estate'
  },
  {
    id: 'oberoi-realty',
    name: 'Oberoi Realty',
    src: '/assets/images/clients/oberoi-realty.jpg',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Luxury Residential & Commercial'
  },
  {
    id: 'lodha-group',
    name: 'Lodha Group',
    src: '/assets/images/clients/lodha-group.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Luxury Real Estate'
  },
  {
    id: 'prestige-group',
    name: 'Prestige Group',
    src: '/assets/images/clients/prestige-group.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Integrated Townships'
  },
  {
    id: 'sobha-realty',
    name: 'Sobha Realty',
    src: '/assets/images/clients/sobha-realty.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Luxury Real Estate'
  },
  {
    id: 'emaar-properties',
    name: 'Emaar Properties',
    src: '/assets/images/clients/emaar-properties.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'International Real Estate'
  },
  {
    id: 'hines',
    name: 'Hines',
    src: '/assets/images/clients/hines.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Global Real Estate'
  },
  {
    id: 'capitaland',
    name: 'CapitaLand',
    src: '/assets/images/clients/capitaland.webp',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Business Parks & IT SEZs'
  },
  {
    id: 'k-raheja-corp',
    name: 'K Raheja Corp',
    src: '/assets/images/clients/k-raheja-corp.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Commercial Parks'
  },
  {
    id: 'bharti-realty',
    name: 'Bharti Realty',
    src: '/assets/images/clients/bharti-realty.webp',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Aerocity Hubs'
  },
  {
    id: 'max-estates',
    name: 'Max Estates',
    src: '/assets/images/clients/max-estates.webp',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Commercial Workspaces'
  },
  {
    id: 'm3m-india',
    name: 'M3M India',
    src: '/assets/images/clients/m3m-india.jpg',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Luxury Developments'
  },
  {
    id: 'jaypee-group',
    name: 'Jaypee Group',
    src: '/assets/images/clients/jaypee-group.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Townships & Infrastructure'
  },
  {
    id: 'gmr',
    name: 'GMR Group',
    src: '/assets/images/clients/gmr.png',
    category: 'real-estate-tech-parks',
    sectorLabel: 'Aerocities & Infrastructure',
    featured: true
  },

  // 4. IT, Telecom & Data Centers
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    src: '/assets/images/clients/tcs.webp',
    category: 'it-data-centers',
    sectorLabel: 'IT & Consulting',
    featured: true,
    highlight: 'Pan-campus vehicular barrier automation & smart contactless employee access control.'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    src: '/assets/images/clients/infosys.webp',
    category: 'it-data-centers',
    sectorLabel: 'IT & Software',
    featured: true,
    highlight: 'Integrated RFID long-range readers & automatic perimeter security across tech SEZs.'
  },
  {
    id: 'hcl-technologies',
    name: 'HCL Technologies',
    src: '/assets/images/clients/hcl-technologies.png',
    category: 'it-data-centers',
    sectorLabel: 'Enterprise IT'
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    src: '/assets/images/clients/tech-mahindra.webp',
    category: 'it-data-centers',
    sectorLabel: 'Telecom & IT'
  },
  {
    id: 'ntt-data',
    name: 'NTT DATA',
    src: '/assets/images/clients/ntt-data.png',
    category: 'it-data-centers',
    sectorLabel: 'Global Data Centers',
    featured: true,
    highlight: 'Hyperscale facility security: anti-ram hydraulic road blockers & biometrics.'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    src: '/assets/images/clients/microsoft.png',
    category: 'it-data-centers',
    sectorLabel: 'Global Technology',
    featured: true
  },
  {
    id: 'airtel',
    name: 'Airtel',
    src: '/assets/images/clients/airtel.png',
    category: 'it-data-centers',
    sectorLabel: 'Telecommunications'
  },
  {
    id: 'ctrls-datacenters',
    name: 'CtrlS Datacenters',
    src: '/assets/images/clients/ctrls-datacenters.png',
    category: 'it-data-centers',
    sectorLabel: 'Tier 4 Datacenters',
    highlight: 'Crash-rated bollards and anti-tailgating entry security for high-density server farms.'
  },
  {
    id: 'nxtra-airtel',
    name: 'Nxtra Data by Airtel',
    src: '/assets/images/clients/nxtra-airtel.jpg',
    category: 'it-data-centers',
    sectorLabel: 'Hyperscale Datacenters'
  },
  {
    id: 'yotta',
    name: 'Yotta Data Services',
    src: '/assets/images/clients/yotta.png',
    category: 'it-data-centers',
    sectorLabel: 'Cloud & Datacenters'
  },
  {
    id: 'sify',
    name: 'Sify Technologies',
    src: '/assets/images/clients/sify.png',
    category: 'it-data-centers',
    sectorLabel: 'ICT & Datacenters'
  },
  {
    id: 'stmicroelectronics',
    name: 'STMicroelectronics',
    src: '/assets/images/clients/stmicroelectronics.png',
    category: 'it-data-centers',
    sectorLabel: 'Semiconductors'
  },

  // 5. Industrial, Energy & Automotive
  {
    id: 'reliance-industries',
    name: 'Reliance Industries Limited',
    src: '/assets/images/clients/reliance-industries.png',
    category: 'industrial-automotive',
    sectorLabel: 'Energy & Petrochemicals',
    featured: true,
    highlight: 'Explosion-proof hazardous area barrier systems & heavy logistics vehicle flow automation.'
  },
  {
    id: 'larsen-toubro',
    name: 'Larsen & Toubro',
    src: '/assets/images/clients/larsen-toubro.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Heavy Engineering & Defense',
    featured: true,
    highlight: 'Severe-duty boom barriers & automated sliding gate operators for manufacturing hubs.'
  },
  {
    id: 'maruti-suzuki',
    name: 'Maruti Suzuki',
    src: '/assets/images/clients/maruti-suzuki.png',
    category: 'industrial-automotive',
    sectorLabel: 'Automotive Manufacturing',
    featured: true
  },
  {
    id: 'hyundai',
    name: 'Hyundai Motor',
    src: '/assets/images/clients/hyundai.svg',
    category: 'industrial-automotive',
    sectorLabel: 'Automotive'
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz',
    src: '/assets/images/clients/mercedes-benz.jpg',
    category: 'industrial-automotive',
    sectorLabel: 'Automotive'
  },
  {
    id: 'bajaj',
    name: 'Bajaj',
    src: '/assets/images/clients/bajaj.jpg',
    category: 'industrial-automotive',
    sectorLabel: 'Automotive & Power'
  },
  {
    id: 'hero-motocorp',
    name: 'Hero MotoCorp',
    src: '/assets/images/clients/hero-motocorp.png',
    category: 'industrial-automotive',
    sectorLabel: 'Two-Wheeler Manufacturing'
  },
  {
    id: 'eicher-motors',
    name: 'Eicher Motors',
    src: '/assets/images/clients/eicher-motors.png',
    category: 'industrial-automotive',
    sectorLabel: 'Commercial Vehicles & Royal Enfield'
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    src: '/assets/images/clients/mahindra.png',
    category: 'industrial-automotive',
    sectorLabel: 'Automotive & Aerospace'
  },
  {
    id: 'indian-oil',
    name: 'Indian Oil Corporation',
    src: '/assets/images/clients/indian-oil.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Oil & Gas'
  },
  {
    id: 'ongc',
    name: 'ONGC',
    src: '/assets/images/clients/ongc.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Energy Exploration'
  },
  {
    id: 'gail',
    name: 'GAIL India',
    src: '/assets/images/clients/gail.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Natural Gas Transmission'
  },
  {
    id: 'tata-power',
    name: 'Tata Power',
    src: '/assets/images/clients/tata-power.png',
    category: 'industrial-automotive',
    sectorLabel: 'Power & Utilities'
  },
  {
    id: 'jsw-group',
    name: 'JSW Group',
    src: '/assets/images/clients/jsw-group.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Steel & Minerals'
  },
  {
    id: 'adani-group',
    name: 'Adani Group',
    src: '/assets/images/clients/adani-group.png',
    category: 'industrial-automotive',
    sectorLabel: 'Ports & Infrastructure'
  },
  {
    id: 'hindalco',
    name: 'Hindalco',
    src: '/assets/images/clients/hindalco.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Metals & Mining'
  },
  {
    id: 'balco',
    name: 'BALCO',
    src: '/assets/images/clients/balco.jpg',
    category: 'industrial-automotive',
    sectorLabel: 'Aluminum Manufacturing'
  },
  {
    id: 'rec-limited',
    name: 'REC Limited',
    src: '/assets/images/clients/rec-limited.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Power Financing'
  },
  {
    id: 'otpc',
    name: 'OTPC Power',
    src: '/assets/images/clients/otpc.jpg',
    category: 'industrial-automotive',
    sectorLabel: 'Thermal Energy'
  },
  {
    id: 'shell',
    name: 'Shell',
    src: '/assets/images/clients/shell.png',
    category: 'industrial-automotive',
    sectorLabel: 'Energy Global'
  },
  {
    id: 'yara',
    name: 'Yara International',
    src: '/assets/images/clients/yara.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Chemicals'
  },
  {
    id: 'iffco',
    name: 'IFFCO',
    src: '/assets/images/clients/iffco.png',
    category: 'industrial-automotive',
    sectorLabel: 'Fertilizers'
  },
  {
    id: 'schneider',
    name: 'Schneider Electric',
    src: '/assets/images/clients/schneider.png',
    category: 'industrial-automotive',
    sectorLabel: 'Energy Automation'
  },
  {
    id: 'lg-electronics',
    name: 'LG Electronics',
    src: '/assets/images/clients/lg-electronics.webp',
    category: 'industrial-automotive',
    sectorLabel: 'Electronics Manufacturing'
  },
  {
    id: 'vivo',
    name: 'Vivo',
    src: '/assets/images/clients/vivo.png',
    category: 'industrial-automotive',
    sectorLabel: 'Smart Devices'
  },
  {
    id: 'nestle',
    name: 'Nestlé',
    src: '/assets/images/clients/nestle.jpg',
    category: 'industrial-automotive',
    sectorLabel: 'FMCG Manufacturing'
  },
  {
    id: 'pg',
    name: 'Procter & Gamble (P&G)',
    src: '/assets/images/clients/pg.png',
    category: 'industrial-automotive',
    sectorLabel: 'Consumer Goods'
  },
  {
    id: 'cadbury',
    name: 'Cadbury (Mondelez)',
    src: '/assets/images/clients/cadbury.png',
    category: 'industrial-automotive',
    sectorLabel: 'Food & Confectionery'
  },
  {
    id: 'ikea',
    name: 'IKEA',
    src: '/assets/images/clients/ikea.jpg',
    category: 'industrial-automotive',
    sectorLabel: 'Retail & Commercial'
  },

  // 6. Luxury Hospitality
  {
    id: 'taj-hotels',
    name: 'Taj Hotels (IHCL)',
    src: '/assets/images/clients/taj-hotels.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Luxury Hospitality',
    featured: true,
    highlight: 'Architectural silent hydraulic bollards & bespoke vehicular entrance systems.'
  },
  {
    id: 'the-oberoi',
    name: 'The Oberoi Hotels',
    src: '/assets/images/clients/oberoi-hotels.jpg',
    category: 'luxury-hospitality',
    sectorLabel: 'Luxury Hospitality',
    featured: true
  },
  {
    id: 'the-leela',
    name: 'The Leela Palaces',
    src: '/assets/images/clients/the-leela.png',
    category: 'luxury-hospitality',
    sectorLabel: 'Palace Hotels & Resorts',
    featured: true
  },
  {
    id: 'jw-marriott',
    name: 'JW Marriott',
    src: '/assets/images/clients/jw-marriott.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Luxury Hotel & Suites'
  },
  {
    id: 'hilton',
    name: 'Hilton Hotels',
    src: '/assets/images/clients/hilton.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Global Hospitality'
  },
  {
    id: 'hyatt',
    name: 'Hyatt',
    src: '/assets/images/clients/hyatt.png',
    category: 'luxury-hospitality',
    sectorLabel: 'Hospitality Brand'
  },
  {
    id: 'radisson',
    name: 'Radisson Hotel Group',
    src: '/assets/images/clients/radisson.png',
    category: 'luxury-hospitality',
    sectorLabel: 'International Hotels'
  },
  {
    id: 'ihg',
    name: 'IHG Hotels & Resorts',
    src: '/assets/images/clients/ihg.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Global Hotels'
  },
  {
    id: 'le-meridien',
    name: 'Le Méridien',
    src: '/assets/images/clients/le-meridien.png',
    category: 'luxury-hospitality',
    sectorLabel: 'Hospitality'
  },
  {
    id: 'westin-hotels',
    name: 'Westin Hotels',
    src: '/assets/images/clients/westin-hotels.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Hospitality'
  },
  {
    id: 'aloft-hotels',
    name: 'Aloft Hotels',
    src: '/assets/images/clients/aloft-hotels.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Urban Boutique Hotels'
  },
  {
    id: 'moxy-hotels',
    name: 'Moxy Hotels',
    src: '/assets/images/clients/moxy-hotels.webp',
    category: 'luxury-hospitality',
    sectorLabel: 'Lifestyle Hotels'
  },
  {
    id: 'the-roseate',
    name: 'The Roseate',
    src: '/assets/images/clients/the-roseate.png',
    category: 'luxury-hospitality',
    sectorLabel: 'Luxury Resorts'
  },
  {
    id: 'fortune',
    name: 'Fortune Hotels - ITC Group',
    src: '/assets/images/clients/fortune.png',
    category: 'luxury-hospitality',
    sectorLabel: 'ITC Hotel Group'
  },

  // 7. Healthcare & Education
  {
    id: 'aiims-delhi',
    name: 'AIIMS Delhi',
    src: '/assets/images/clients/aiims-delhi.svg',
    category: 'healthcare-education',
    sectorLabel: 'Apex Medical Institution',
    featured: true,
    highlight: 'Emergency ambulance fast-track automated barriers and patient-flow perimeter security.'
  },
  {
    id: 'apollo-hospitals',
    name: 'Apollo Hospitals',
    src: '/assets/images/clients/apollo-hospitals.png',
    category: 'healthcare-education',
    sectorLabel: 'Healthcare Chain',
    featured: true
  },
  {
    id: 'max-healthcare',
    name: 'Max Healthcare',
    src: '/assets/images/clients/max-healthcare.png',
    category: 'healthcare-education',
    sectorLabel: 'Super Specialty Hospital'
  },
  {
    id: 'sir-ganga-ram',
    name: 'Sir Ganga Ram Hospital',
    src: '/assets/images/clients/sir-ganga-ram-hospital.png',
    category: 'healthcare-education',
    sectorLabel: 'Premier Hospital'
  },
  {
    id: 'amrita-hospital',
    name: 'Amrita Hospital',
    src: '/assets/images/clients/amrita-hospital.png',
    category: 'healthcare-education',
    sectorLabel: 'Medical Research Institute'
  },
  {
    id: 'cmc-vellore',
    name: 'CMC Vellore',
    src: '/assets/images/clients/cmc-vellore.png',
    category: 'healthcare-education',
    sectorLabel: 'Apex Healthcare'
  },
  {
    id: 'iim-ahmedabad',
    name: 'IIM Ahmedabad',
    src: '/assets/images/clients/iim-ahmedabad.jpg',
    category: 'healthcare-education',
    sectorLabel: 'Premier Business School',
    featured: true
  },
  {
    id: 'isb',
    name: 'Indian School of Business',
    src: '/assets/images/clients/isb.svg',
    category: 'healthcare-education',
    sectorLabel: 'Executive Business School'
  }
];

export interface CaseStudy {
  clientName: string;
  projectTitle: string;
  location: string;
  systemsDeployed: string[];
  description: string;
  badge: string;
}

export const LANDMARK_PROJECTS: CaseStudy[] = [
  {
    clientName: 'ITPO Bharat Mandapam',
    projectTitle: 'G20 Leaders’ Summit Venue Perimeter Hardening',
    location: 'Pragati Maidan, New Delhi',
    systemsDeployed: [
      'ASTM M50 Crash Bollards',
      'High-Speed BLDC Boom Barriers',
      'ANPR Number Plate Analytics',
      'Hostile Vehicle Mitigation (HVM)'
    ],
    description:
      'Engineered and commissioned certified anti-ram hydraulic security bollards and automated perimeter barriers securing all diplomatic and head-of-state entryways for the G20 Leaders’ Summit.',
    badge: 'Mission-Critical National Defense'
  },
  {
    clientName: 'Reserve Bank of India (RBI)',
    projectTitle: 'Central Bank Vault & Regional Office Interceptors',
    location: 'Pan-India RBI Regional Centers',
    systemsDeployed: [
      'Crash Rated Drop Arm Barriers',
      'Under Vehicle Surveillance (UVIS)',
      'Heavy-Duty Road Blockers',
      'High-Frequency RFID Transits'
    ],
    description:
      'Zero-tolerance physical access protection safeguarding apex banking headquarters and currency vaults with PAS68 certified crash barriers and automated gate operators.',
    badge: 'National Financial Security'
  },
  {
    clientName: 'DLF CyberCity & Horizon Center',
    projectTitle: 'Smart High-Throughput Commercial Parking & Transit Ecosystem',
    location: 'Gurugram, NCR',
    systemsDeployed: [
      'Integrated FASTag Tolling PMS',
      'Ultrasonic Parking Guidance (PGS)',
      '100% Duty-Cycle Automatic Barriers',
      'Multi-Tenant RFID Access'
    ],
    description:
      'Unified automated vehicular mobility across India’s premier financial and corporate hub, managing over 45,000+ daily commuter and executive transit cycles with 99.9% uptime.',
    badge: 'Smart Mobility & FASTag'
  },
  {
    clientName: 'Airports Authority of India (AAI)',
    projectTitle: 'Multi-Airport Transit & Perimeter Entrance Controls',
    location: '15+ International & Domestic Terminals',
    systemsDeployed: [
      'Toll Barrier Gates',
      'Pedestrian Optical Turnstiles',
      'Emergency Breakout Automation',
      '24/7 Redundant Power Control'
    ],
    description:
      'Seamless passenger, commercial taxi, and VIP transit automation handling continuous round-the-clock throughput at key civil aviation hubs across India.',
    badge: 'Civil Aviation Transit'
  },
  {
    clientName: 'Reliance Industries (Jamnagar & Navi Mumbai)',
    projectTitle: 'Mega Petrochemical & Logistics Hub Traffic Automation',
    location: 'Jamnagar & Reliance Corporate Park',
    systemsDeployed: [
      'Explosion-Proof Barrier Automation',
      'Hydraulic Tyre Killers',
      'Heavy-Duty Industrial Road Blockers',
      'Heavy Commercial RFID Tracking'
    ],
    description:
      'Ruggedized perimeter engineering engineered to operate flawlessly in extreme weather, heavy dust, and petrochemical environments across India’s largest refinery complex.',
    badge: 'Heavy Industrial & Energy'
  },
  {
    clientName: 'The Leela Palaces, Taj & Oberoi Hotels',
    projectTitle: 'Architectural Silent Hydraulic Access & VIP Perimeter Protection',
    location: 'New Delhi, Mumbai, Bengaluru, Udaipur',
    systemsDeployed: [
      'Mirror-Finish Stainless Steel Bollards',
      'Silent Hydraulic Power Units',
      'VIP Hands-Free RFID Access',
      'Under-Chassis Inspection Scanners'
    ],
    description:
      'Preserving five-star architectural elegance with flush-to-ground hydraulic bollards delivering silent 2.5-second operation and high-security threat mitigation.',
    badge: 'Luxury Hospitality'
  }
];
