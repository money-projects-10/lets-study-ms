import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Study Material', path: '/login' },
    { label: 'Courses', action: () => scrollToSection('courses') },
    { label: 'Testimonials', action: () => scrollToSection('success-stories') },
    { label: 'Team', action: () => scrollToSection('team') },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className={`dynamic-island ${scrolled ? 'w-[95%] md:w-[85%] scale-[0.98]' : 'w-[90%] md:w-[80%]'} border border-border/50 bg-card/60 backdrop-blur-2xl transition-all duration-700`}>
      <div className="container mx-auto flex items-center justify-between h-14 md:h-16 px-6">
        <Link to="/" className="flex items-center group">
          <img
            src="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg"
            alt="Let's Study MS - School of Mathematics Logo"
            className="h-10 w-auto rounded-xl ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-500"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-primary/5 px-6 py-2 rounded-2xl border border-primary/10">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-foreground/70 hover:text-primary font-bold text-xs uppercase tracking-widest transition-all duration-300 px-4 py-1 rounded-lg hover:bg-primary/5"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.action}
                  className="text-foreground/70 hover:text-primary font-bold text-xs uppercase tracking-widest transition-all duration-300 px-4 py-1 rounded-lg hover:bg-primary/5"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 hover:bg-primary/10 rounded-2xl transition-all active:scale-90 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="lg:hidden p-4 space-y-1 bg-transparent border-t border-border/20"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="mobile-hover"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative z-10 block py-3 px-5 transition-colors duration-300 font-black uppercase text-[10px] tracking-[0.25em] text-center ${hoveredIndex === index ? 'text-primary' : 'text-foreground/80'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className={`relative z-10 block w-full text-center py-3 px-5 transition-colors duration-300 font-black uppercase text-[10px] tracking-[0.25em] ${hoveredIndex === index ? 'text-primary' : 'text-foreground/80'}`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>

  );
};

export default Header;