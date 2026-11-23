import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

// Drop-in replacement for <select> with <option> children, styled to match the site on every
// device (native pickers render as plain system lists). onChange receives { target: { value } }
// so existing select handlers keep working.
const BrandSelect = ({ value, onChange, children, 'aria-label': ariaLabel }) => {
  const options = React.Children.toArray(children)
    .filter((c) => React.isValidElement(c) && c.type === 'option')
    .map((c) => ({ value: String(c.props.value), label: c.props.children, disabled: !!c.props.disabled }));

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === String(value)));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const choose = (i) => {
    const opt = options[i];
    if (!opt || opt.disabled) return;
    setOpen(false);
    if (opt.value !== String(value)) onChange?.({ target: { value: opt.value } });
  };

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    const last = options.length - 1;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(last, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(last); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
    else if (e.key === 'Tab') setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative ${open ? 'z-40' : 'z-10'}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`w-full flex items-center justify-between gap-3 text-left bg-card border-2 text-foreground font-bold text-base sm:text-lg py-4 sm:py-5 pl-5 sm:pl-8 pr-4 sm:pr-6 rounded-2xl shadow-xl outline-none transition-all focus-visible:ring-4 focus-visible:ring-primary/15 ${open ? 'border-primary/50' : 'border-primary/20 hover:border-primary/40'}`}
      >
        <span className="min-w-0 leading-snug">{selected?.label}</span>
        <ChevronDown size={22} className={`shrink-0 text-primary transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${listId}-${active}`}
          className="absolute left-0 right-0 top-full mt-2 max-h-[min(20rem,60vh)] overflow-y-auto overscroll-contain bg-card border border-primary/20 rounded-2xl shadow-2xl p-1.5 text-left"
        >
          {options.map((opt, i) => {
            const isSelected = i === selectedIndex;
            return (
              <li
                key={opt.value}
                id={`${listId}-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm sm:text-base leading-snug cursor-pointer select-none transition-colors ${
                  opt.disabled ? 'opacity-40 cursor-not-allowed' : ''
                } ${i === active ? 'bg-primary/10' : ''} ${isSelected ? 'font-bold text-primary' : 'font-medium text-foreground/85'}`}
              >
                <span className="flex-1 min-w-0">{opt.label}</span>
                {isSelected && <Check size={18} className="shrink-0 mt-0.5 text-primary" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BrandSelect;
