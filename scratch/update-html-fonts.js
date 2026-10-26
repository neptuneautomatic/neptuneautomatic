const fs = require('fs');
const path = require('path');

const dir = 'c:/NAPL';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // 1. Replace multi-font Google Fonts link with pure Poppins link
  html = html.replace(
    /<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*"[^>]*>/g,
    '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">'
  );

  // 2. Cache-bust stylesheet link
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="css\/style\.css(\?v=[^"]*)?"\s*>/g,
    '<link rel="stylesheet" href="css/style.css?v=light-solid">'
  );

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    updated++;
    console.log(`Updated HTML: ${file}`);
  }
});

console.log(`Total HTML files updated: ${updated}`);
