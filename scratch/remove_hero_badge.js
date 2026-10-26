const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /\s*<div class="hero-live-badge">[\s\S]*?<\/div>/g;
const matches = html.match(regex);
console.log('hero-live-badge matches:', matches ? matches.length : 0);

html = html.replace(regex, '');

fs.writeFileSync('index.html', html, 'utf8');

const remaining = (html.match(/hero-live-badge/g) || []).length;
console.log('Remaining hero-live-badge:', remaining);
