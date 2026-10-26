const fs = require('fs');
const path = require('path');

const dir = 'c:/NAPL';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // 1. Replace data-theme="white" or data-theme="dark" with data-theme="light"
  html = html.replace(/<html([^>]*)data-theme=["'][^"']*["']/g, '<html$1data-theme="light"');

  // 2. Remove theme-toggle-btn block
  html = html.replace(/\s*<!--\s*Theme Mode Switcher[^>]*-->\s*<button[^>]*id="themeToggleBtn"[^>]*>[\s\S]*?<\/button>/g, '');
  // Also any stray button without comment
  html = html.replace(/\s*<button[^>]*id="themeToggleBtn"[^>]*>[\s\S]*?<\/button>/g, '');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    modifiedCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Finished! Total HTML files updated: ${modifiedCount}`);
