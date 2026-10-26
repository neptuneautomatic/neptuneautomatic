const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The video IDs to remove:
// 1. Smart Parking Solutions: OKq-umct7w4
// 2. FSIE BEC Mumbai: I_GICHVTyJE
// 3. Leadership Interview: iCtiVtfoZI4

const idsToRemove = ['OKq-umct7w4', 'I_GICHVTyJE', 'iCtiVtfoZI4'];

idsToRemove.forEach(id => {
  // Regex to match the article for this video
  const regex = new RegExp(`\\s*<!--[^>]*-->\\s*<article class="video-card"[^>]*data-video-id="${id}"[\\s\\S]*?<\\/article>`, 'g');
  if (regex.test(html)) {
    html = html.replace(regex, '');
    console.log(`Successfully removed video: ${id}`);
  } else {
    // Try matching without the preceding comment
    const regex2 = new RegExp(`\\s*<article class="video-card"[^>]*data-video-id="${id}"[\\s\\S]*?<\\/article>`, 'g');
    if (regex2.test(html)) {
      html = html.replace(regex2, '');
      console.log(`Successfully removed video (no comment): ${id}`);
    } else {
      console.log(`Warning: could not find video with id ${id}`);
    }
  }
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Video removal complete.');
