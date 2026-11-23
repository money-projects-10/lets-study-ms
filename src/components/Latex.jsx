import React, { useState, useEffect, useRef } from 'react';

/**
 * Latex component that loads KaTeX from CDN in the background
 * and renders LaTeX strings dynamically.
 * Features:
 * - Persistent KaTeX CDN loader
 * - Loading placeholder
 * - Safe error handling
 */
const Latex = ({ children, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if katex is already on window
    if (window.katex) {
      setIsLoaded(true);
      return;
    }

    // Otherwise, find or create the script
    let script = document.querySelector('script[src*="katex.min.js"]');
    if (!script) {
      // Add CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      document.head.appendChild(link);

      // Add Script
      script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => setIsLoaded(true);
    script.addEventListener('load', handleLoad);
    
    // Check periodically if katex becomes available (fail-safe)
    const interval = setInterval(() => {
      if (window.katex) {
        setIsLoaded(true);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      script.removeEventListener('load', handleLoad);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && window.katex) {
      try {
        window.katex.render(children, containerRef.current, {
          throwOnError: false,
          displayMode: false
        });
      } catch (err) {
        console.error("KaTeX error:", err);
      }
    }
  }, [isLoaded, children]);

  return (
    <span ref={containerRef} className={`${className} inline-flex items-center min-w-[10px]`}>
      {!isLoaded && <span className="opacity-40 animate-pulse">{children}</span>}
    </span>
  );
};

export default Latex;
