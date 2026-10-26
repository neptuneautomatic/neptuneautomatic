const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

console.log('Original CSS length:', css.length);

// 1. Remove [data-theme="dark"] from root selectors
css = css.replace(/\[data-theme="dark"\]\s*\{/g, '');
css = css.replace(/:root,\s*\[data-theme="light"\],\s*\[data-theme="white"\],\s*\[data-theme="dark"\]/g, ':root,\n[data-theme="light"],\n[data-theme="white"]');

// 2. Set SINGLE FONT: Poppins everywhere
css = css.replace(
  /--font-heading:\s*[^;]+;/g,
  "--font-heading: 'Poppins', sans-serif;"
);
css = css.replace(
  /--font-body:\s*[^;]+;/g,
  "--font-body: 'Poppins', sans-serif;"
);
css = css.replace(
  /--font-mono:\s*[^;]+;/g,
  "--font-mono: 'Poppins', sans-serif;"
);

// 3. Remove all gradient text fills and set ALL HEADINGS to SINGLE SOLID COLOR: #2D4897 (Neptune Royal Blue)
// Replace the entire heading gradient block (lines ~229 to ~283)
const headingPattern = /h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[\s\S]*?\.mono-tag\s*\{/;
const newHeadingBlock = `/* ==========================================================================
   Clean Solid Single-Color Headings (Strictly Single Logo Color: #2D4897)
   ========================================================================== */
h1, h2, h3, h4, h5, h6,
.slide-title,
.section-title,
.category-hero-title,
.product-hero-title,
.page-title,
.cta-banner-content h2,
.sector-title,
.card-3d-title,
.matrix-card-title,
.future-headline {
  font-family: 'Poppins', sans-serif !important;
  color: var(--color-logo-blue) !important;
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: var(--color-logo-blue) !important;
  background-clip: unset !important;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

h1, .slide-title, .category-hero-title, .product-hero-title, .page-title {
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.015em;
  margin-bottom: 0.85rem;
}

h2, .section-title, .cta-banner-content h2 {
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
}

h3, .card-3d-title, .matrix-card-title, .sector-title {
  font-weight: 700;
  line-height: 1.25;
}

.hero-slider-section .slide-title {
  color: var(--color-logo-blue) !important;
  -webkit-text-fill-color: var(--color-logo-blue) !important;
  background: none !important;
  -webkit-background-clip: unset !important;
  background-clip: unset !important;
}

.mono-tag {`;

css = css.replace(headingPattern, newHeadingBlock);

// 4. Enforce Single Font 'Poppins' on all global and common elements
css = css.replace(
  /\*,\s*\*::before,\s*\*::after\s*\{[^}]*\}/g,
  `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}`
);

css = css.replace(
  /body\s*\{[^}]*font-family:\s*var\(--font-body\);[^}]*\}/g,
  (m) => m.replace(/font-family:\s*var\(--font-body\);/, "font-family: 'Poppins', sans-serif;")
);

// 5. Clean up any remaining dark colors or gradient text
css = css.replace(/#080E20/g, '#1F3575');
css = css.replace(/#091024/g, '#1F3575');
css = css.replace(/#060B18/g, '#F4F8FC');
css = css.replace(/#050814/g, '#F4F8FC');

// Replace dark modal backdrops with clean frosted light/dim backdrops
css = css.replace(/rgba\(8,\s*14,\s*32,\s*0\.8\)/g, 'rgba(15, 23, 42, 0.5)');
css = css.replace(/rgba\(8,\s*14,\s*32,\s*0\.78\)/g, 'rgba(15, 23, 42, 0.45)');

// 6. Enforce Poppins font-family across all elements that had font-family overrides
css = css.replace(/font-family:\s*var\(--font-[a-z]+\);/g, "font-family: 'Poppins', sans-serif;");

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated style.css with Single Font and Single-Color Headings!');
console.log('New CSS length:', css.length);
