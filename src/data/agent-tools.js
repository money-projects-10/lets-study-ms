// Read-only tools for AI agents, shared by the in-browser WebMCP registration (src/lib/webmcp.js)
// and the remote MCP endpoint (server.js). Each `run` returns plain text.
import { institute, courses, contactText, courseText } from './site.js';

export const agentTools = [
  {
    name: 'get_institute_info',
    title: 'Institute overview',
    description: "Get an overview of Let's Study MS: what it teaches, where it is, its affiliation and how to contact it.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    run: () =>
      [
        institute.name,
        institute.description,
        `Founded: ${institute.foundingYear}`,
        `Affiliation: ${institute.affiliation}`,
        `School division (Std 5–12): ${institute.schoolDivision.name}, ${institute.schoolDivision.url}`,
        '',
        contactText(),
      ].join('\n'),
  },
  {
    name: 'list_courses',
    title: 'List courses',
    description: "List every course (batch) Let's Study MS offers, with its slug, a one-line summary and its URL.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    run: () => courses.map((c) => `- ${c.name} [${c.slug}]: ${c.summary} ${c.url}`).join('\n'),
  },
  {
    name: 'get_course',
    title: 'Course details',
    description: 'Get details of one course by its slug (from list_courses): who it is for and where to read more.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string', enum: courses.map((c) => c.slug), description: 'Course slug' } },
      required: ['slug'],
      additionalProperties: false,
    },
    run: ({ slug } = {}) => {
      const c = courses.find((x) => x.slug === slug);
      if (!c) throw new Error(`Unknown course "${slug}". Valid slugs: ${courses.map((x) => x.slug).join(', ')}`);
      return courseText(c);
    },
  },
  {
    name: 'get_contact_details',
    title: 'Contact details',
    description: "Get the address, phone numbers and email of Let's Study MS, and the URL of its enquiry form.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    run: () => contactText(),
  },
];
