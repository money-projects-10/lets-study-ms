import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile/touch
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    // Pointer test for whatever is under the dot right now.
    const updateHover = (target) => {
      if (!target || !target.closest) return setIsPointer(false);
      const isClickable =
        target.closest('a, button') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(Boolean(isClickable));
    };

    const handleMouseMove = (e) => {
      lastPointer.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);
      setPosition({ x: e.clientX, y: e.clientY });
      updateHover(e.target);
    };

    // While scrolling, no mousemove fires, so re-read the element under the
    // last known pointer position. Otherwise the hover state goes stale.
    let scrollFrame = 0;
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const { x, y } = lastPointer.current;
        setPosition({ x, y });
        updateHover(document.elementFromPoint(x, y));
      });
    };

    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  // Don't render on mobile or if hidden
  if (isMobile || isHidden) return null;

  return (
    <>
      <div 
        className="cursor-dot transition-[transform] duration-200"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isPointer ? 'scale(1.5)' : 'scale(1)'}`
        }}
      />
      <div 
        className="cursor-outline"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isPointer ? 'scale(1.2)' : 'scale(1)'}`,
          borderColor: isPointer ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)',
          borderWidth: isPointer ? '2px' : '1px',
          boxShadow: isPointer ? '0 0 15px hsl(var(--primary) / 0.2)' : 'none'
        }}
      />
    </>
  );
};

export default CustomCursor;
