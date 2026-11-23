// WebMCP: expose read-only site tools to AI agents running in the visitor's browser.
// https://webmachinelearning.github.io/webmcp/ — a no-op in browsers without navigator.modelContext.
import { agentTools } from '@/data/agent-tools';
import { pages, SITE_URL } from '@/data/site';

const text = (t) => ({ content: [{ type: 'text', text: t }] });

const tools = [
  ...agentTools.map(({ name, description, inputSchema, run }) => ({
    name,
    description,
    inputSchema,
    annotations: { readOnlyHint: true },
    execute: async (args) => {
      try {
        return text(run(args || {}));
      } catch (err) {
        return { ...text(err.message), isError: true };
      }
    },
  })),
  {
    name: 'open_page',
    description: "Navigate the browser to a page on letsstudyms.com, e.g. '/contact' or '/courses/msc-mathematics'.",
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', enum: pages.map((p) => p.path), description: 'Site path to open' } },
      required: ['path'],
    },
    execute: async ({ path } = {}) => {
      if (!pages.some((p) => p.path === path)) return { ...text(`Unknown page "${path}".`), isError: true };
      window.location.assign(path);
      return text(`Opening ${SITE_URL}${path}`);
    },
  },
];

export function registerWebMcpTools() {
  const mc = typeof navigator !== 'undefined' ? navigator.modelContext : undefined;
  if (!mc || typeof mc.registerTool !== 'function') return;
  for (const tool of tools) {
    try {
      mc.registerTool(tool);
    } catch (err) {
      console.warn(`WebMCP: could not register ${tool.name}`, err);
    }
  }
}
