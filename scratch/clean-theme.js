const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

console.log('Original CSS length:', css.length);

function removeDarkRules(content) {
  let result = '';
  let i = 0;
  const len = content.length;

  while (i < len) {
    if (content.slice(i, i + 2) === '/*') {
      const commentEnd = content.indexOf('*/', i + 2);
      if (commentEnd === -1) {
        result += content.slice(i);
        break;
      }
      const comment = content.slice(i, commentEnd + 2);
      if (comment.includes('THEME: DARK')) {
        i = commentEnd + 2;
        continue;
      }
      result += comment;
      i = commentEnd + 2;
      continue;
    }

    const openBrace = content.indexOf('{', i);
    if (openBrace === -1) {
      result += content.slice(i);
      break;
    }

    const selector = content.slice(i, openBrace);
    let braceCount = 1;
    let j = openBrace + 1;
    while (j < len && braceCount > 0) {
      if (content[j] === '{') braceCount++;
      else if (content[j] === '}') braceCount--;
      j++;
    }

    const block = content.slice(i, j);

    if (selector.trim().startsWith('@media') || selector.trim().startsWith('@supports')) {
      const innerContent = content.slice(openBrace + 1, j - 1);
      const cleanedInner = removeDarkRules(innerContent);
      result += selector + '{' + cleanedInner + '}';
      i = j;
      continue;
    }

    if (selector.includes('[data-theme="dark"]') || selector.includes("[data-theme='dark']")) {
      const parts = selector.split(',').map(s => s.trim());
      const nonDarkParts = parts.filter(p => !p.includes('data-theme="dark"') && !p.includes("data-theme='dark'"));
      
      if (nonDarkParts.length === 0) {
        i = j;
        continue;
      } else {
        const newSelector = nonDarkParts.join(', ');
        const body = content.slice(openBrace, j);
        result += newSelector + ' ' + body;
        i = j;
        continue;
      }
    }

    result += block;
    i = j;
  }

  return result;
}

// 1. Remove all dark theme rules
let cleaned = removeDarkRules(css);

// 2. Hide Theme Toggle Button permanently
cleaned = cleaned.replace(
  /\.theme-toggle-btn\s*\{[^}]*\}/g,
  `.theme-toggle-btn {
  display: none !important;
}`
);

// 3. Update Hero slide title to ensure rich contrast on light background
cleaned = cleaned.replace(
  /\.hero-slider-section \.slide-title\s*\{[^}]*\}/g,
  `.hero-slider-section .slide-title {
  background: linear-gradient(115deg, #2D4897 0%, #1A3478 30%, #D32628 72%, #56ACDD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: var(--color-logo-blue);
}`
);

// 4. Update Hero QR card to clean light frosted card
cleaned = cleaned.replace(
  /\.hero-slide-qr-card\s*\{[^}]*\}/g,
  `.hero-slide-qr-card {
  display: inline-flex;
  align-items: center;
  gap: 0.95rem;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid #D2E0EE;
  border-radius: 12px;
  padding: 0.5rem 0.95rem;
  margin-top: 0.45rem;
  margin-bottom: 0.45rem;
  box-shadow: 0 10px 24px rgba(45, 72, 151, 0.12), 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-normal);
}`
);

cleaned = cleaned.replace(
  /\.slide-qr-tag\s*\{[^}]*\}/g,
  `.slide-qr-tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-logo-blue);
  text-transform: uppercase;
}`
);

cleaned = cleaned.replace(
  /\.slide-qr-title\s*\{[^}]*\}/g,
  `.slide-qr-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: #080E20;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.15;
}`
);

// 5. Update Card image boxes & Category badges
cleaned = cleaned.replace(
  /\.matrix-card-img-wrap\s*\{[^}]*background:\s*#080E20;[^}]*\}/g,
  (m) => m.replace('background: #080E20;', 'background: #F0F4F8;')
);

cleaned = cleaned.replace(
  /\.card-image-box\s*\{[^}]*background:\s*#080E20;[^}]*\}/g,
  (m) => m.replace('background: #080E20;', 'background: #F0F4F8;')
);

cleaned = cleaned.replace(
  /\.matrix-card-category-badge\s*\{[^}]*\}/g,
  `.matrix-card-category-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--theme-border);
  backdrop-filter: blur(8px);
  color: var(--color-logo-blue);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.22rem 0.55rem;
  border-radius: var(--radius-sm);
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}`
);

cleaned = cleaned.replace(
  /\.card-category-badge\s*\{[^}]*\}/g,
  `.card-category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--theme-border);
  backdrop-filter: blur(8px);
  color: var(--color-logo-blue);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}`
);

// 6. Update CTA Banner to vibrant brand gradient
cleaned = cleaned.replace(
  /\.cta-banner-section\s*\{[^}]*\}/g,
  `.cta-banner-section {
  background: linear-gradient(135deg, #2D4897 0%, #1A3478 50%, #D32628 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}`
);

// 7. Transform Footer into crisp Light Industrial Theme
cleaned = cleaned.replace(
  /\.site-footer\s*\{[^}]*\}/g,
  `.site-footer {
  background-color: #F4F8FC;
  color: #475569;
  border-top: 2px solid #D2E0EE;
  padding-top: 2.5rem;
}`
);

cleaned = cleaned.replace(
  /\.footer-top-grid\s*\{[^}]*\}/g,
  `.footer-top-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr 1.2fr;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #D2E0EE;
}`
);

cleaned = cleaned.replace(
  /\.footer-col-about img\s*\{[^}]*\}/g,
  `.footer-col-about img {
  height: 44px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 0.85rem;
}`
);

cleaned = cleaned.replace(
  /\.social-link\s*\{[^}]*\}/g,
  `.social-link {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-logo-blue);
  transition: all var(--transition-fast);
}`
);

cleaned = cleaned.replace(
  /\.footer-col-title\s*\{[^}]*\}/g,
  `.footer-col-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: #080E20;
  margin-bottom: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}`
);

cleaned = cleaned.replace(
  /\.footer-menu a\s*\{[^}]*\}/g,
  `.footer-menu a {
  font-size: 0.9rem;
  color: #475569;
  transition: color var(--transition-fast);
}`
);

cleaned = cleaned.replace(
  /\.footer-menu a:hover\s*\{[^}]*\}/g,
  `.footer-menu a:hover {
  color: var(--color-logo-blue);
}`
);

cleaned = cleaned.replace(
  /\.newsletter-input\s*\{[^}]*\}/g,
  `.newsletter-input {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  color: #080E20;
  font-family: var(--font-body);
  font-size: 0.9rem;
  width: 100%;
}`
);

cleaned = cleaned.replace(
  /\.newsletter-input:focus\s*\{[^}]*\}/g,
  `.newsletter-input:focus {
  outline: none;
  border-color: var(--color-logo-blue);
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(45, 72, 151, 0.15);
}`
);

cleaned = cleaned.replace(
  /\.footer-locations\s*\{[^}]*\}/g,
  `.footer-locations {
  padding: 2.5rem 0;
  border-bottom: 1px solid #D2E0EE;
}`
);

cleaned = cleaned.replace(
  /\.location-item h5\s*\{[^}]*\}/g,
  `.location-item h5 {
  font-size: 1.05rem;
  color: #080E20;
  margin-bottom: 0.35rem;
}`
);

cleaned = cleaned.replace(
  /\.location-item p\s*\{[^}]*\}/g,
  `.location-item p {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
}`
);

cleaned = cleaned.replace(
  /\.footer-bottom-bar\s*\{[^}]*\}/g,
  `.footer-bottom-bar {
  padding: 1.25rem 0;
  font-size: 0.85rem;
  color: #64748B;
  background-color: #EAF1F8;
  border-top: 1px solid #D2E0EE;
}`
);

cleaned = cleaned.replace(
  /\.footer-legal-links a\s*\{[^}]*\}/g,
  `.footer-legal-links a {
  color: #64748B;
  transition: color var(--transition-fast);
}`
);

cleaned = cleaned.replace(
  /\.footer-legal-links a:hover\s*\{[^}]*\}/g,
  `.footer-legal-links a:hover {
  color: var(--color-logo-blue);
}`
);

// 8. Ensure root and all theme attributes map strictly to light tokens
cleaned = cleaned.replace(
  /:root\s*\{/,
  `:root,
[data-theme="light"],
[data-theme="white"],
[data-theme="dark"] {`
);

// Save cleaned CSS
fs.writeFileSync(cssPath, cleaned, 'utf8');

console.log('Successfully wrote updated style.css!');
console.log('Final CSS length:', cleaned.length);
console.log('Remaining [data-theme="dark"]:', (cleaned.match(/\[data-theme="dark"\]/g) || []).length);
