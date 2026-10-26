const fs = require('fs');

const slidesData = [
  {
    num: 1,
    active: true,
    label: "1 of 9: Smart Security, Parking & Access Automation Solutions",
    bg: "assets/images/slide1-integrated.jpg",
    alt: "Integrated commercial facility showing boom barrier, automatic gate, and access control",
    loading: "eager",
    highlight: "Security • Parking • Access Automation",
    title: "Smart Security, Parking & Access Automation Solutions",
    desc: "Secure your premises, streamline vehicle movement and automate access with integrated solutions designed for modern commercial, industrial and high-security environments.",
    primaryCta: "Explore Solutions",
    secondaryCta: "Get a Quote",
    product: "Complete Security & Access Portfolio"
  },
  {
    num: 2,
    active: false,
    label: "2 of 9: Automatic Boom Barriers for Smarter Vehicle Access",
    bg: "assets/images/slide2-boom-barrier.jpg",
    alt: "Automatic boom barrier installed at a corporate campus entrance",
    loading: "lazy",
    highlight: "High-Frequency Vehicle Access",
    title: "Automatic Boom Barriers for Smarter Vehicle Access",
    desc: "Control vehicle entry and exit with reliable automatic boom barriers designed for seamless access management across commercial, industrial and high-traffic premises.",
    primaryCta: "Explore Boom Barriers",
    secondaryCta: "Get a Quote",
    product: "Automatic Boom Barriers"
  },
  {
    num: 3,
    active: false,
    label: "3 of 9: High-Security Automatic Bollards for Vehicle Protection",
    bg: "assets/images/slide3-bollards.jpg",
    alt: "High security automatic bollards installed at government entrance",
    loading: "lazy",
    highlight: "Hostile Vehicle Perimeter Defense",
    title: "High-Security Automatic Bollards for Vehicle Protection",
    desc: "Protect sensitive areas and control unauthorized vehicle movement with robust automatic bollards engineered for high-security access control.",
    primaryCta: "Explore Bollards",
    secondaryCta: "Get a Quote",
    product: "Automatic Bollards"
  },
  {
    num: 4,
    active: false,
    label: "4 of 9: Intelligent Parking Management, From Entry to Exit",
    bg: "assets/images/slide4-parking-management.jpg",
    alt: "Modern multi-level parking facility with entry barriers and automated kiosks",
    loading: "lazy",
    highlight: "Smart Parking Mobility & Revenue",
    title: "Intelligent Parking Management, From Entry to Exit",
    desc: "Simplify parking operations with integrated entry, payment, vehicle identification and exit solutions that deliver a smarter parking experience.",
    primaryCta: "Explore Parking Solutions",
    secondaryCta: "Get a Quote",
    product: "Intelligent Parking Management (PMS)"
  },
  {
    num: 5,
    active: false,
    label: "5 of 9: Find. Park. Go. Smarter.",
    bg: "assets/images/slide5-parking-guidance.jpg",
    alt: "Indoor parking facility with LED parking indicators and directional signage",
    loading: "lazy",
    highlight: "Real-Time Space Guidance",
    title: "Find. Park. Go. Smarter.",
    desc: "Guide drivers to available spaces with intelligent parking guidance and real-time occupancy information for faster, more efficient parking.",
    primaryCta: "Explore Parking Guidance",
    secondaryCta: "Get a Quote",
    product: "Smart Parking Guidance (PGS)"
  },
  {
    num: 6,
    active: false,
    label: "6 of 9: Automated Vehicle Identification & Access Control",
    bg: "assets/images/slide6-anpr-fastag.jpg",
    alt: "Vehicle approaching controlled lane with ANPR camera and FASTag reader",
    loading: "lazy",
    highlight: "AI Recognition & Contactless Toll",
    title: "Automated Vehicle Identification & Access Control",
    desc: "Enable faster, contactless vehicle access with ANPR, FASTag, RFID and intelligent identification technologies.",
    primaryCta: "Explore Access Control",
    secondaryCta: "Get a Quote",
    product: "ANPR & FASTag Solutions"
  },
  {
    num: 7,
    active: false,
    label: "7 of 9: Automate Your Gates. Simplify Access.",
    bg: "assets/images/slide7-gate-automation.jpg",
    alt: "Large automated sliding and swing gate operating smoothly for commercial premises",
    loading: "lazy",
    highlight: "Heavy-Duty Industrial Motors",
    title: "Automate Your Gates. Simplify Access.",
    desc: "Automate sliding and swing gates with reliable solutions designed for residential, commercial, industrial and high-security applications.",
    primaryCta: "Explore Gate Automation",
    secondaryCta: "Get a Quote",
    product: "Sliding & Swing Gate Automation"
  },
  {
    num: 8,
    active: false,
    label: "8 of 9: Advanced Vehicle Security for High-Risk Areas",
    bg: "assets/images/slide8-road-blocker.jpg",
    alt: "High security perimeter road blocker and crash barrier in action",
    loading: "lazy",
    highlight: "Hostile Vehicle Mitigation (HVM)",
    title: "Advanced Vehicle Security for High-Risk Areas",
    desc: "Strengthen perimeter protection with road blockers, tyre killers, crash barriers and other hostile vehicle mitigation solutions.",
    primaryCta: "Explore High-Security Solutions",
    secondaryCta: "Contact Us",
    product: "Road Blockers & Tyre Killers"
  },
  {
    num: 9,
    active: false,
    label: "9 of 9: One Partner. Complete Access & Parking Automation.",
    bg: "assets/images/slide9-portfolio.jpg",
    alt: "Composite real world facility showing integrated access and parking automation systems",
    loading: "lazy",
    highlight: "Turnkey Enterprise Integration",
    title: "One Partner. Complete Access & Parking Automation.",
    desc: "From vehicle access and parking management to high-security protection and gate automation, Neptune Automatic delivers integrated solutions for smarter, safer spaces.",
    primaryCta: "View All Solutions",
    secondaryCta: "Talk to an Expert",
    product: "Complete Enterprise Automation Portfolio"
  }
];

function generateSlideHtml(s) {
  const activeClass = s.active ? ' active' : '';
  return `        <!-- SLIDE ${s.num} -->
        <div class="slide${activeClass}" data-slide="${s.num}" role="group" aria-roledescription="slide" aria-label="${s.label}">
          <div class="slide-bg">
            <img src="${s.bg}" alt="${s.alt}" loading="${s.loading}">
          </div>
          <div class="slide-overlay"></div>
          <div class="slide-content-wrapper">
            <div class="layout-container">
              <div class="slide-text-box">
                <div class="slide-highlight">
                  <span class="badge-highlight">
                    <span class="badge-dot"></span>
                    <span>${s.highlight}</span>
                  </span>
                </div>
                <h1 class="slide-title">${s.title}</h1>
                <p class="slide-desc">
                  ${s.desc}
                </p>
                <div class="slide-cta-group">
                  <a href="#solutions" class="btn btn-primary">
                    <span>${s.primaryCta}</span>
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <button type="button" class="btn btn-secondary" data-open-quote data-product="${s.product}">
                    <span>${s.secondaryCta}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
`;
}

const allSlidesHtml = slidesData.map(generateSlideHtml).join('\n');

const fullSliderTrackHtml = `      <div class="slider-track">
${allSlidesHtml}
      </div><!-- /.slider-track -->`;

let html = fs.readFileSync('c:/NAPL/index.html', 'utf8');

const regex = /<div class="slider-track">[\s\S]*?<\/div><!-- \/\.slider-track -->/;
if (!regex.test(html)) {
  console.error('Could not find slider-track block with regex');
  process.exit(1);
}

html = html.replace(regex, fullSliderTrackHtml);

fs.writeFileSync('c:/NAPL/index.html', html, 'utf8');
console.log('index.html slider-track replaced with perfectly balanced markup!');
