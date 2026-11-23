import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full overflow-hidden group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 text-primary flex items-center justify-center"
        >
          {isDark ? (
            <div className="relative">
              <Moon size={20} fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles size={8} className="text-yellow-400" />
              </motion.div>
            </div>
          ) : (
            <Sun size={20} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
