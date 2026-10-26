const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Count card-3d-tag
const tagRegex = /\s*<span class="card-3d-tag">[^<]*<\/span>/g;
const tagMatches = html.match(tagRegex);
console.log('card-3d-tag matches:', tagMatches ? tagMatches.length : 0);

// 2. Count matrix-card-eyebrow
const eyebrowRegex = /\s*<span class="matrix-card-eyebrow">[^<]*<\/span>/g;
const eyebrowMatches = html.match(eyebrowRegex);
console.log('matrix-card-eyebrow matches:', eyebrowMatches ? eyebrowMatches.length : 0);

// Remove both
html = html.replace(tagRegex, '');
html = html.replace(eyebrowRegex, '');

fs.writeFileSync('index.html', html, 'utf8');

console.log('Remaining card-3d-tag:', (html.match(/card-3d-tag/g) || []).length);
console.log('Remaining matrix-card-eyebrow:', (html.match(/matrix-card-eyebrow/g) || []).length);
