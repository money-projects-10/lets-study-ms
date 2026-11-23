// Build-time renderer used by scripts/prerender.mjs. Not shipped to browsers.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import App from '@/App';

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  return {
    html,
    head: [helmet.title, helmet.meta, helmet.link, helmet.script].map((h) => h.toString()).join('\n'),
  };
}
