import React from 'react';

/**
 * AmbientBackground — Floating mathematical symbols as decorative watermarks.
 * Hidden on mobile (< md). Very low opacity for atmosphere without distraction.
 * Place this inside any page wrapper, below the main content's z-index.
 */
const symbols = [
  { char: '∫', top: '12%', left: '8%', size: 'text-6xl', rotate: '-15deg', opacity: 0.035 },
  { char: 'Σ', top: '25%', right: '6%', size: 'text-5xl', rotate: '12deg', opacity: 0.03 },
  { char: '∂', top: '45%', left: '5%', size: 'text-4xl', rotate: '-8deg', opacity: 0.025 },
  { char: 'π', top: '60%', right: '10%', size: 'text-7xl', rotate: '20deg', opacity: 0.04 },
  { char: '∞', top: '78%', left: '12%', size: 'text-5xl', rotate: '-25deg', opacity: 0.03 },
  { char: '√', top: '35%', right: '15%', size: 'text-4xl', rotate: '10deg', opacity: 0.025 },
  { char: 'Δ', top: '88%', right: '8%', size: 'text-6xl', rotate: '-18deg', opacity: 0.035 },
  { char: 'λ', top: '15%', left: '45%', size: 'text-3xl', rotate: '5deg', opacity: 0.02 },
  { char: '∇', top: '55%', left: '70%', size: 'text-4xl', rotate: '-12deg', opacity: 0.025 },
  { char: 'ε', top: '72%', left: '35%', size: 'text-3xl', rotate: '15deg', opacity: 0.02 },
];

const AmbientBackground = () => {
  return (
    <div 
      className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden select-none" 
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {symbols.map((sym, i) => (
        <span
          key={i}
          className={`absolute ${sym.size} font-serif text-primary dark:text-gold transition-opacity duration-500`}
          style={{
            top: sym.top,
            left: sym.left,
            right: sym.right,
            transform: `rotate(${sym.rotate})`,
            opacity: sym.opacity,
          }}
        >
          {sym.char}
        </span>
      ))}
    </div>
  );
};

export default AmbientBackground;
