// Post-build step: turn the client-only SPA into real per-route HTML, plus Markdown twins
// for AI agents and the MCP server card. Runs after `vite build` and `vite build --ssr`.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import TurndownService from 'turndown';
import { pages, institute, courses, SITE_URL } from '../src/data/site.js';
import { agentTools } from '../src/data/agent-tools.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

export const mdPathFor = (p) => (p === '/' ? '/index.md' : `${p}.md`);
const htmlFileFor = (p) => path.join(dist, p === '/' ? 'index.html' : `${p.slice(1)}/index.html`);

// Drop the template's generic tags wherever the page's Helmet provides its own.
function mergeHead(tpl, head) {
  let out = tpl;
  if (/<title/i.test(head)) out = out.replace(/<title>[\s\S]*?<\/title>/i, '');
  for (const [, key] of head.matchAll(/<meta[^>]*?\s(?:name|property)="([^"]+)"/g)) {
    const re = new RegExp(`<meta\\s+(?:name|property)="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?>\\s*`, 'g');
    out = out.replace(re, '');
  }
  if (/rel="canonical"/.test(head)) out = out.replace(/<link rel="canonical"[^>]*>\s*/, '');
  return out.replace('</head>', `${head}\n</head>`);
}

const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
turndown.remove(['script', 'style', 'noscript', 'svg', 'button', 'header', 'footer', 'form', 'select', 'input', 'textarea']);
// Decorative nodes (floating maths symbols, glows) carry no meaning for an agent.
turndown.addRule('decorative', {
  filter: (node) =>
    node.getAttribute?.('aria-hidden') === 'true' || /\bselect-none\b/.test(node.getAttribute?.('class') || ''),
  replacement: () => '',
});
turndown.addRule('absoluteLinks', {
  filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
  replacement: (content, node) => {
    let href = node.getAttribute('href');
    if (href.startsWith('/')) href = SITE_URL + href;
    // Card links wrap headings and paragraphs: keep the block content and add a plain link after it.
    if (/^\s*#|\n\s*\n/.test(content)) return `\n\n${content.trim()}\n\n[Read more](${href})\n\n`;
    const label = content.replace(/\s+/g, ' ').trim();
    return label ? `[${label}](${href})` : '';
  },
});
turndown.addRule('images', { filter: 'img', replacement: () => '' });

const siteFooter = () =>
  [
    '---',
    '',
    `## ${institute.shortName}`,
    '',
    `${institute.address.street}, ${institute.address.locality} - ${institute.address.postalCode}, ${institute.address.region}, India`,
    `Phone: ${institute.phones.join(', ')} · Email: ${institute.email}`,
    '',
    `- [Home](${SITE_URL}/) · [About](${SITE_URL}/about) · [Contact](${SITE_URL}/contact) · [Success stories](${SITE_URL}/testimonials)`,
    `- Courses: ${courses.map((c) => `[${c.name}](${c.url})`).join(' · ')}`,
    `- [Terms of use](${SITE_URL}/terms) · [Privacy policy](${SITE_URL}/privacy) · [llms.txt](${SITE_URL}/llms.txt)`,
    '',
  ].join('\n');

function toMarkdown(html, page) {
  const body = turndown
    .turndown(html)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/^•\n+(.+)$/gm, '- $1') // "•" span + text rows → list items
    .replace(/^(- .+)\n\n(?=- )/gm, '$1\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return `---\ntitle: ${JSON.stringify(page.title)}\nurl: ${SITE_URL}${page.path === '/' ? '/' : page.path}\n---\n\n${body}\n\n${siteFooter()}`;
}

async function writePage(page, file, { markdown = true } = {}) {
  const { html, head } = render(page.path);
  const alt = markdown ? `\n<link rel="alternate" type="text/markdown" href="${mdPathFor(page.path)}" />` : '';
  const doc = mergeHead(template, head + alt).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  if (!doc.includes(html)) throw new Error(`#root placeholder not found while rendering ${page.path}`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, doc);
  if (markdown) {
    const mdFile = path.join(dist, mdPathFor(page.path).slice(1));
    await fs.mkdir(path.dirname(mdFile), { recursive: true });
    await fs.writeFile(mdFile, toMarkdown(html, page));
  }
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  console.log(`  ${page.path.padEnd(34)} h1=${h1s}${h1s === 1 ? '' : '  <-- expected exactly one'}`);
}

console.log('Prerendering routes:');
for (const page of pages) await writePage(page, htmlFileFor(page.path));
await writePage({ path: '/__not-found__', title: 'Page not found' }, path.join(dist, '404.html'), { markdown: false });

// MCP Server Card (SEP-1649) describing the read-only endpoint served by server.js at /mcp.
const card = {
  $schema: 'https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json',
  name: 'com.letsstudyms/site',
  title: institute.shortName,
  version: pkg.version,
  description: `Read-only facts about ${institute.name}: courses, contact details and page content.`,
  websiteUrl: `${SITE_URL}/`,
  documentationUrl: `${SITE_URL}/llms.txt`,
  iconUrl: `${SITE_URL}/images/favicon-192.png`,
  protocolVersion: '2025-11-25',
  serverInfo: { name: 'com.letsstudyms/site', title: institute.shortName, version: pkg.version },
  transport: { type: 'streamable-http', endpoint: `${SITE_URL}/mcp` },
  endpoint: `${SITE_URL}/mcp`,
  capabilities: { tools: { listChanged: false }, resources: { listChanged: false } },
  authentication: { required: false },
  tools: [
    ...agentTools.map(({ name, title, description, inputSchema }) => ({
      name, title, description, inputSchema, annotations: { readOnlyHint: true },
    })),
    {
      name: 'get_page_markdown',
      title: 'Page as Markdown',
      description: 'Get the full content of a page on letsstudyms.com as Markdown.',
      inputSchema: {
        type: 'object',
        properties: { path: { type: 'string', enum: pages.map((p) => p.path) } },
        required: ['path'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
    },
  ],
  resources: pages.map((p) => ({ uri: `${SITE_URL}${p.path}`, name: p.title, mimeType: 'text/markdown' })),
};
const cardFile = path.join(dist, '.well-known', 'mcp', 'server-card.json');
await fs.mkdir(path.dirname(cardFile), { recursive: true });
await fs.writeFile(cardFile, JSON.stringify(card, null, 2));
console.log('Wrote dist/.well-known/mcp/server-card.json');
