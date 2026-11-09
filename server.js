// Production server for letsstudyms.com (Hostinger Node.js app, entry file).
// No dependencies: serves the prerendered build in dist/ and adds what a static host cannot:
//   - real 404 status for unknown URLs
//   - Markdown responses when an agent sends `Accept: text/markdown`
//   - RFC 8288 Link headers pointing at llms.txt and the Markdown twin
//   - a read-only MCP endpoint at /mcp (Streamable HTTP, JSON responses, stateless)
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { pages, institute, SITE_URL } from './src/data/site.js';
import { agentTools } from './src/data/agent-tools.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 3000;
const VERSION = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8')).version;

const PAGE_PATHS = new Set(pages.map((p) => p.path));
const mdPathFor = (p) => (p === '/' ? '/index.md' : `${p}.md`);
const htmlPathFor = (p) => (p === '/' ? '/index.html' : `${p}/index.html`);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
};
const COMPRESSIBLE = /^(text\/|application\/(json|xml|manifest\+json)|image\/svg\+xml)/;

const BASE_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000',
};

// dist/ never changes while the process runs, so cache file bodies (and their compressed forms).
const cache = new Map();
async function load(rel) {
  if (cache.has(rel)) return cache.get(rel);
  const file = path.join(DIST, rel);
  if (!file.startsWith(DIST + path.sep)) return null;
  let entry = null;
  try {
    const stat = await fs.stat(file);
    if (stat.isFile()) {
      const body = await fs.readFile(file);
      const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
      entry = { body, type, etag: `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`, mtime: stat.mtime.toUTCString(), enc: {} };
    }
  } catch {
    entry = null;
  }
  cache.set(rel, entry);
  return entry;
}

function pickEncoding(req, entry) {
  if (!COMPRESSIBLE.test(entry.type) || entry.body.length < 1024) return null;
  const ae = String(req.headers['accept-encoding'] || '');
  if (/\bbr\b/.test(ae)) return 'br';
  if (/\bgzip\b/.test(ae)) return 'gzip';
  return null;
}

function send(req, res, status, entry, extra = {}) {
  const headers = { ...BASE_HEADERS, 'Content-Type': entry.type, ETag: entry.etag, 'Last-Modified': entry.mtime, ...extra };
  if (COMPRESSIBLE.test(entry.type)) headers.Vary = headers.Vary ? `${headers.Vary}, Accept-Encoding` : 'Accept-Encoding';
  if (status === 200 && req.headers['if-none-match'] === entry.etag) {
    res.writeHead(304, headers);
    return res.end();
  }
  let body = entry.body;
  const enc = pickEncoding(req, entry);
  if (enc) {
    entry.enc[enc] ??= enc === 'br' ? zlib.brotliCompressSync(body) : zlib.gzipSync(body, { level: 9 });
    body = entry.enc[enc];
    headers['Content-Encoding'] = enc;
  }
  headers['Content-Length'] = body.length;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : body);
}

function sendText(res, status, text, extra = {}) {
  res.writeHead(status, { ...BASE_HEADERS, 'Content-Type': 'text/plain; charset=utf-8', ...extra });
  res.end(text);
}

// True when the client prefers text/markdown over text/html (q-values respected).
function wantsMarkdown(req) {
  const accept = String(req.headers.accept || '');
  if (!accept.includes('markdown')) return false;
  let md = 0;
  let html = 0;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    const qParam = params.find((p) => p.trim().startsWith('q='));
    const q = qParam ? Number(qParam.split('=')[1]) || 0 : 1;
    if (type === 'text/markdown' || type === 'text/x-markdown') md = Math.max(md, q);
    if (type === 'text/html') html = Math.max(html, q);
  }
  return md > 0 && md >= html;
}

const linkHeader = (p) =>
  [
    `<${mdPathFor(p)}>; rel="alternate"; type="text/markdown"`,
    '</llms.txt>; rel="describedby"; type="text/plain"',
    '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  ].join(', ');

async function servePage(req, res, p) {
  const markdown = wantsMarkdown(req);
  const entry = await load((markdown ? mdPathFor(p) : htmlPathFor(p)).slice(1));
  if (!entry) return sendText(res, 500, 'Page build missing. Run npm run build.');
  return send(req, res, 200, entry, {
    'Cache-Control': 'public, max-age=0, must-revalidate',
    Vary: 'Accept',
    Link: linkHeader(p),
  });
}

async function serveNotFound(req, res) {
  if (wantsMarkdown(req)) {
    return sendText(res, 404, `# Page not found\n\nThere is no page at this address. Start at ${SITE_URL}/ or see ${SITE_URL}/llms.txt\n`, {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    });
  }
  const entry = await load('404.html');
  if (!entry) return sendText(res, 404, 'Not found');
  return send(req, res, 404, entry, { 'Cache-Control': 'no-cache', Vary: 'Accept' });
}

// ---------------------------------------------------------------- MCP (read-only)
const MCP_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26', '2024-11-05'];
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, Mcp-Protocol-Version',
};

const mcpTools = [
  ...agentTools,
  {
    name: 'get_page_markdown',
    title: 'Page as Markdown',
    description: 'Get the full content of a page on letsstudyms.com as Markdown.',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', enum: [...PAGE_PATHS], description: "Site path, e.g. '/about'" } },
      required: ['path'],
      additionalProperties: false,
    },
    run: async ({ path: p } = {}) => {
      if (!PAGE_PATHS.has(p)) throw new Error(`Unknown page "${p}". Valid paths: ${[...PAGE_PATHS].join(', ')}`);
      const entry = await load(mdPathFor(p).slice(1));
      if (!entry) throw new Error('Page content unavailable.');
      return entry.body.toString('utf8');
    },
  },
];

const rpcError = (id, code, message) => ({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });

async function handleRpc(msg) {
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return rpcError(msg?.id, -32600, 'Invalid Request');
  const isNotification = msg.id === undefined;
  const { id, method, params = {} } = msg;
  const ok = (result) => (isNotification ? null : { jsonrpc: '2.0', id, result });

  switch (method) {
    case 'initialize': {
      const requested = params.protocolVersion;
      return ok({
        protocolVersion: MCP_VERSIONS.includes(requested) ? requested : MCP_VERSIONS[0],
        capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
        serverInfo: { name: 'com.letsstudyms/site', title: institute.shortName, version: VERSION },
        instructions: `Read-only information about ${institute.name}, a mathematics institute in Kolkata, India. Use list_courses and get_course for programmes, get_contact_details for admissions, get_page_markdown for full page text.`,
      });
    }
    case 'ping':
      return ok({});
    case 'tools/list':
      return ok({
        tools: mcpTools.map(({ name, title, description, inputSchema }) => ({ name, title, description, inputSchema, annotations: { readOnlyHint: true, openWorldHint: false } })),
      });
    case 'tools/call': {
      const tool = mcpTools.find((t) => t.name === params.name);
      if (!tool) return rpcError(id, -32602, `Unknown tool: ${params.name}`);
      try {
        const text = await tool.run(params.arguments || {});
        return ok({ content: [{ type: 'text', text }], isError: false });
      } catch (err) {
        return ok({ content: [{ type: 'text', text: err.message }], isError: true });
      }
    }
    case 'resources/list':
      return ok({ resources: pages.map((p) => ({ uri: `${SITE_URL}${p.path}`, name: p.title, mimeType: 'text/markdown' })) });
    case 'resources/read': {
      const p = typeof params.uri === 'string' && params.uri.startsWith(SITE_URL) ? params.uri.slice(SITE_URL.length) || '/' : null;
      const entry = p && PAGE_PATHS.has(p) ? await load(mdPathFor(p).slice(1)) : null;
      if (!entry) return rpcError(id, -32002, `Resource not found: ${params.uri}`);
      return ok({ contents: [{ uri: params.uri, mimeType: 'text/markdown', text: entry.body.toString('utf8') }] });
    }
    default:
      if (isNotification) return null; // e.g. notifications/initialized, notifications/cancelled
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}

async function handleMcp(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { ...CORS, 'Access-Control-Max-Age': '86400' });
    return res.end();
  }
  if (req.method !== 'POST') {
    // Stateless server: no server-initiated SSE stream.
    return sendText(res, 405, 'Use POST with a JSON-RPC message. Server card: /.well-known/mcp/server-card.json', { ...CORS, Allow: 'POST, OPTIONS' });
  }

  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 100_000) return sendText(res, 413, 'Request too large', CORS);
    chunks.push(chunk);
  }
  let payload;
  try {
    payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    payload = undefined;
  }
  const json = (status, body) => {
    res.writeHead(status, { ...BASE_HEADERS, ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(body === undefined ? undefined : JSON.stringify(body));
  };
  if (payload === undefined) return json(400, rpcError(null, -32700, 'Parse error'));

  const batch = Array.isArray(payload);
  const messages = batch ? payload : [payload];
  if (messages.length === 0 || messages.length > 50) return json(400, rpcError(null, -32600, 'Invalid Request'));
  const replies = (await Promise.all(messages.map(handleRpc))).filter(Boolean);
  if (replies.length === 0) return json(202); // only notifications/responses were sent
  return json(200, batch ? replies : replies[0]);
}

// ---------------------------------------------------------------- router
const server = http.createServer(async (req, res) => {
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    } catch {
      return sendText(res, 400, 'Bad request');
    }
    if (pathname.includes('\0') || pathname.split('/').includes('..')) return sendText(res, 400, 'Bad request');

    if (pathname === '/mcp') return await handleMcp(req, res);
    if (req.method !== 'GET' && req.method !== 'HEAD') return sendText(res, 405, 'Method not allowed', { Allow: 'GET, HEAD' });

    // Canonical URLs have no trailing slash (except the root).
    if (pathname.length > 1 && pathname.endsWith('/')) {
      const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      res.writeHead(301, { ...BASE_HEADERS, Location: pathname.replace(/\/+$/, '') + query });
      return res.end();
    }

    if (PAGE_PATHS.has(pathname)) return await servePage(req, res, pathname);

    // Prerendered page HTML is only reachable through its clean URL.
    if (!pathname.endsWith('/index.html') && pathname !== '/404.html') {
      const entry = await load(pathname.slice(1));
      if (entry) {
        const cacheControl = pathname.startsWith('/assets/')
          ? 'public, max-age=31536000, immutable'
          : /\.(md|txt|xml|json)$/.test(pathname)
            ? 'public, max-age=3600'
            : 'public, max-age=86400';
        const extra = { 'Cache-Control': cacheControl };
        if (pathname.startsWith('/.well-known/')) extra['Access-Control-Allow-Origin'] = '*';
        return send(req, res, 200, entry, extra);
      }
    }

    return await serveNotFound(req, res);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) sendText(res, 500, 'Internal server error');
    else res.end();
  }
});

server.listen(PORT, () => console.log(`letsstudyms.com server listening on :${PORT}`));
