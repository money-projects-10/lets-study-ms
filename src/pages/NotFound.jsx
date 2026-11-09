import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden flex flex-col">
      <Helmet>
        <title>Page Not Found | Let's Study MS</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist. Return to Let's Study MS homepage." />
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl relative z-10"
        >
          <div className="text-[7rem] sm:text-[12rem] font-black leading-none shimmer-text select-none tracking-tighter mb-8 bg-gradient-to-br from-primary to-primary/40 bg-clip-text text-transparent opacity-80">
            404
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl break-words font-black text-foreground mb-6 tracking-tight uppercase">
            Coordinates Lost
          </h1>
          
          <p className="text-muted-foreground text-xl mb-12 font-medium leading-relaxed max-w-md mx-auto">
            The mathematical path you're seeking doesn't exist in our current domain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-10 py-5 rounded-[1.5rem] shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-widest flex items-center justify-center"
            >
              <Home size={22} className="mr-3" />
              Main Domain
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-card text-foreground font-black px-10 py-5 rounded-[1.5rem] border border-border hover:border-primary/40 transition-all duration-300 uppercase tracking-widest flex items-center justify-center group"
            >
              <ArrowLeft size={22} className="mr-3 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
