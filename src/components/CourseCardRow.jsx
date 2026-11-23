import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, ExternalLink } from 'lucide-react';

// Horizontally scrolling card row. Hover turns a card to the brand green (smooth colour fade).
// The plus button in the lower-right corner slides up the card's details; it works on touch too.
//
// Each item: { title, description, detail?, icon, path? | href?, external?, cta?, panelLabel? }
//   path        -> internal route (react-router)
//   href        -> plain link (external site or #anchor)
//   detail      -> text in the panel (falls back to description)
//   panelLabel  -> small heading in the panel (default "More")
//
// layout="scroll" (default): one horizontal row you swipe or scroll.
// layout="grid": a responsive grid with no horizontal scrolling.
const CourseCardRow = ({ items, label = 'Cards', layout = 'scroll' }) => {
  const isGrid = layout === 'grid';
  const [openIndex, setOpenIndex] = useState(null);
  // Scroll-row cards get a larger size on desktop only (lg and up). Mobile and grid layouts are unchanged.
  const big = (desktopClasses) => (isGrid ? '' : desktopClasses);

  const CardLink = ({ item, className, tabIndex, children }) => {
    if (item.path) {
      return (
        <Link to={item.path} onClick={() => window.scrollTo(0, 0)} className={className} tabIndex={tabIndex}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        className={className}
        tabIndex={tabIndex}
      >
        {children}
      </a>
    );
  };

  return (
    <div className="-mx-4 sm:mx-0">
      <ul
        className={
          isGrid
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'
            : 'flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 sm:px-2 pb-6 pt-2'
        }
        aria-label={label}
      >
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const Icon = item.icon;
          const hasLink = !!(item.path || item.href);
          return (
            <li
              key={item.title}
              className={isGrid ? 'min-w-0' : `snap-start shrink-0 w-[72vw] max-w-[260px] sm:w-[270px] ${big('lg:w-[340px] lg:max-w-none')}`}
            >
              <article className={`group relative h-[290px] sm:h-[300px] rounded-[1.75rem] overflow-hidden border border-border bg-card text-foreground shadow-md transition-[background-color,color,box-shadow] duration-700 ease-out hover:bg-primary hover:text-primary-foreground hover:shadow-2xl ${big('lg:h-[380px]')}`}>
                <div className={`flex h-full flex-col p-6 ${big('lg:p-8')}`}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 transition-colors duration-700 group-hover:bg-primary-foreground/15 group-hover:ring-primary-foreground/30 ${big('lg:h-16 lg:w-16')}`}>
                    <Icon size={24} className={`text-primary transition-colors duration-700 group-hover:text-primary-foreground ${big('lg:scale-125')}`} />
                  </div>

                  {hasLink ? (
                    <CardLink
                      item={item}
                      className={`mt-5 font-accent text-xl font-bold leading-tight outline-none after:absolute after:inset-0 after:content-[''] focus-visible:ring-2 focus-visible:ring-gold rounded-md ${big('lg:text-3xl')}`}
                    >
                      {item.title}
                      {item.external && <ExternalLink size={14} className="inline ml-2 -mt-1 opacity-70" aria-hidden="true" />}
                    </CardLink>
                  ) : (
                    <h3 className={`mt-5 font-accent text-xl font-bold leading-tight ${big('lg:text-3xl')}`}>{item.title}</h3>
                  )}

                  <p className={`mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-700 group-hover:text-primary-foreground/80 line-clamp-2 ${big('lg:text-base')}`}>
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? `Hide details for ${item.title}` : `Show details for ${item.title}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : i);
                  }}
                  className={`absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center ${big('lg:h-14 lg:w-14 lg:bottom-6 lg:right-6')} rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-500 hover:scale-110 group-hover:bg-gold group-hover:text-gold-foreground active:scale-95`}
                >
                  <Plus size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
                </button>

                {/* Details panel slides up from the bottom */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 rounded-t-[1.75rem] bg-background p-6 text-foreground shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.25)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gold-ink">{item.panelLabel || 'More'}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-6">{item.detail || item.description}</p>
                  {hasLink && (
                    <CardLink
                      item={item}
                      tabIndex={isOpen ? 0 : -1}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-gold-ink"
                    >
                      {item.cta || 'Learn more'} <ArrowRight size={14} />
                    </CardLink>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {!isGrid && <p className="mt-1 text-center text-xs uppercase tracking-widest text-muted-foreground sm:hidden">Swipe to see more</p>}
    </div>
  );
};

export default CourseCardRow;
