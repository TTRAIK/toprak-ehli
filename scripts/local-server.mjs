import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

export function createLocalServer(directory) {
  const root = resolve(directory);
  return createServer(async (request, response) => {
    try {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
      }
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (pathname !== '/' && pathname !== '/index.html' && !pathname.startsWith('/src/')) {
        response.writeHead(404).end('Not found'); return;
      }
      const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(root + sep) || !types[extname(file)]) { response.writeHead(404).end('Not found'); return; }
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': types[extname(file)], 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch { response.writeHead(404).end('Not found'); }
  });
}
