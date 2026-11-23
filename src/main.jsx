import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { registerWebMcpTools } from '@/lib/webmcp';
import '@/index.css';

// #root holds prerendered HTML for crawlers and agents; React replaces it with the live app.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

registerWebMcpTools();
