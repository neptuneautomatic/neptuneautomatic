const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

console.log('Original style.css length:', css.length);

// 1. Replace 'Poppins' with 'Lexend' in style.css
css = css.replace(/Poppins/g, 'Lexend');

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Updated style.css with Lexend font!');

// 2. Update all HTML files with Lexend Google Fonts import and cache-busting version
const dir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let htmlUpdated = 0;
const lexendFontUrl = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap';

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // Replace font comment if present
  html = html.replace(/Google Fonts:\s*Poppins[^\n<]*/g, 'Google Fonts: Lexend (Modern High-Legibility Typography)');

  // Replace Google Fonts CSS link
  html = html.replace(
    /<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*"[^>]*>/g,
    `<link href="${lexendFontUrl}" rel="stylesheet">`
  );

  // Cache bust style.css
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="css\/style\.css(\?[^"]*)?"\s*>/g,
    '<link rel="stylesheet" href="css/style.css?v=lexend-theme">'
  );

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    htmlUpdated++;
    console.log(`Updated HTML: ${file}`);
  }
});

console.log(`Total HTML files updated with Lexend: ${htmlUpdated}`);
