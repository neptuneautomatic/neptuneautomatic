const fs = require('fs');
const html = fs.readFileSync('c:/NAPL/index.html', 'utf8');

// Check selectors
const slideTrackMatches = html.match(/<div class="slider-track">([\s\S]*?)<\/div><!-- \/\.slider-track -->/);
if (slideTrackMatches) {
  const slides = slideTrackMatches[1].match(/<div class="slide\b/g);
  console.log('Slides inside slider-track:', slides ? slides.length : 0);
}

const edgeKeys = html.match(/class="slider-edge-key\b[^"]*"/g);
console.log('Edge keys:', edgeKeys);

const dots = html.match(/class="slider-dot\b[^"]*"/g);
console.log('Dots count:', dots ? dots.length : 0);
