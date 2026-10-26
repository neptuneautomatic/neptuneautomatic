const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /\s*<span class="faq-category-pill">[\s\S]*?<\/span>/g;
const matches = html.match(regex);
console.log('faq-category-pill matches:', matches ? matches.length : 0);

html = html.replace(regex, '');

fs.writeFileSync('index.html', html, 'utf8');

const remaining = (html.match(/faq-category-pill/g) || []).length;
console.log('Remaining faq-category-pill in index.html:', remaining);
