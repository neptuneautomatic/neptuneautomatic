const fs = require('fs');
const html = fs.readFileSync('c:/NAPL/index.html', 'utf8');

console.log('Includes slider-track:', html.includes('class="slider-track"'));
console.log('Includes slider-edge-key:', html.includes('slider-edge-key'));
console.log('Includes arrow-btn:', html.includes('arrow-btn'));
console.log('Includes slider-dot:', html.includes('slider-dot'));

// Check slides
const slideMatches = html.match(/<div class="slide\b[^"]*"/g);
console.log('Slide divs count:', slideMatches ? slideMatches.length : 0);
if (slideMatches) {
  console.log(slideMatches);
}

// Check script tag in index.html
console.log('Script tags:', html.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/g));
