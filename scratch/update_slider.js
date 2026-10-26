const fs = require('fs');

let html = fs.readFileSync('c:/NAPL/index.html', 'utf8');

// Find every `<div class="slide-product-meta">` and remove until its matching closing div
// Each `slide-product-meta` has nested divs:
// <div class="slide-product-meta">
//   <div class="tech-spec-glass-card">
//     <div class="tech-card-header">...</div>
//     <div class="tech-specs-list">
//       <div class="tech-spec-item">...</div> x 4
//     </div>
//   </div>
// </div>
// It ends just before `</div>\s*</div>\s*</div>` (which closes layout-container, slide-content-wrapper, slide)

// Pattern matching:
const regex = /\s*(<!--\s*Right 70% Product\/Solution Technical Specs Card\s*-->)?\s*<div class="slide-product-meta">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*(?=\s*<\/div>\s*<\/div>\s*<\/div>)/g;

let count = 0;
html = html.replace(regex, (match) => {
  count++;
  return '';
});

console.log('Removed tech spec blocks:', count);

// Add the dedicated sliding keys to the hero section
const keyButtons = `
    <!-- Dedicated Sliding Keys (Left & Right Edge Navigation) -->
    <button class="slider-edge-key prev-key" title="Slide Left (Previous) [Key: ←]" aria-label="Slide Left">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      <span class="key-hint">←</span>
    </button>
    <button class="slider-edge-key next-key" title="Slide Right (Next) [Key: →]" aria-label="Slide Right">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      <span class="key-hint">→</span>
    </button>
`;

if (!html.includes('slider-edge-key')) {
  html = html.replace('</div><!-- /.slider-container -->', '</div><!-- /.slider-container -->\n' + keyButtons);
  console.log('Added slider edge keys');
}

fs.writeFileSync('c:/NAPL/index.html', html, 'utf8');
console.log('index.html updated successfully');
