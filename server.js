const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = __dirname;
const PORTS_TO_TRY = [8080, 8081, 3001, 3002, 5000, 5001];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function startServer(portIndex = 0) {
  if (portIndex >= PORTS_TO_TRY.length) {
    console.error('All ports in list are busy.');
    process.exit(1);
  }

  const port = PORTS_TO_TRY[portIndex];
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || (reqPath.endsWith('.html') && !fs.existsSync(path.join(PUBLIC_DIR, reqPath)))) {
      reqPath = '/index.html';
    }

    let filePath = path.join(PUBLIC_DIR, reqPath);

    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });

      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying next...`);
      startServer(portIndex + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Server successfully started at http://localhost:${port}/`);
  });
}

startServer();
