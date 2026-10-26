const fs = require('fs');
const html = fs.readFileSync('c:/NAPL/index.html', 'utf8');

const startTrack = html.indexOf('<div class="slider-track">');
const endTrack = html.indexOf('</div><!-- /.slider-container -->');
const trackContent = html.substring(startTrack, endTrack);

console.log('Track start:', startTrack, 'Track end:', endTrack);

const opens = (trackContent.match(/<div\b/g) || []).length;
const closes = (trackContent.match(/<\/div>/g) || []).length;
console.log('Open divs:', opens, 'Close divs:', closes);
