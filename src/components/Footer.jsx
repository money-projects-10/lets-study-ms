import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Send, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const courses = [
    { name: 'Foundation Batch', path: '/courses/foundation-batch' },
    { name: 'Semester Batch', path: '/courses/semester-batch' },
    { name: 'M.Sc Mathematics Entrances', path: '/courses/msc-mathematics' },
    { name: 'M.Tech/Data Science Entrances', path: '/courses/mtech-datascience' },
    { name: 'Engineering Mathematics', path: '/courses/engineering-mathematics' },
    { name: 'PhD Entrances', path: '/courses/phd-entrances' },
    { name: 'Advanced Courses', path: '/courses/advanced-courses' },
    { name: 'Personalized Coaching', path: '/contact' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <footer className="relative bg-card text-foreground pt-20 pb-10 border-t border-border overflow-hidden">
      {/* Footer Backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16"
        >

          {/* Brand Info */}
          <motion.div variants={fadeInUp} className="md:col-span-4 space-y-8">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="inline-block group">
              <img
                src="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg"
                alt="Let's Study MS - School of Mathematics Logo"
                className="h-20 w-auto rounded-2xl p-2 bg-background border border-border shadow-2xl transition-transform group-hover:rotate-2"
              />
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              One of West Bengal's leading mathematical institutes, dedicated to nurturing analytical brilliance through expert mentorship.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61584835031140' },
                { icon: Instagram, url: 'https://www.instagram.com/ls2m_maths?utm_source=qr' },
                { icon: Linkedin, url: 'https://www.linkedin.com/in/let-s-study-school-of-mathematics-3443073a4/' },
                { icon: Youtube, url: 'https://youtube.com/@letsstudysom' },
                { icon: Send, url: 'https://t.me/LetsstudySOM' }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-10 h-10 flex items-center justify-center bg-secondary/50 text-muted-foreground rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <item.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Exploration */}
          <motion.div variants={fadeInUp} className="md:col-span-2 space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-primary">Explore</h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleScrollToSection('courses')} className="text-muted-foreground hover:text-primary transition-all text-sm font-medium">Batches</button></li>
              <li><Link to="/testimonials" onClick={() => window.scrollTo(0,0)} className="text-muted-foreground hover:text-primary transition-all text-sm font-medium">Success Stories</Link></li>
              <li><button onClick={() => handleScrollToSection('team')} className="text-muted-foreground hover:text-primary transition-all text-sm font-medium">Mentors</button></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0,0)} className="text-muted-foreground hover:text-primary transition-all text-sm font-medium">Admissions</Link></li>
            </ul>
          </motion.div>

          {/* All 8 Courses */}
          <motion.div variants={fadeInUp} className="md:col-span-3 space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-primary">Our Curricula</h4>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link 
                    to={course.path} 
                    onClick={() => window.scrollTo(0, 0)} 
                    className="text-muted-foreground hover:text-primary transition-all text-[13px] font-medium block truncate flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 mr-2 group-hover:bg-primary transition-all" />
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={fadeInUp} className="md:col-span-3 space-y-6">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-primary">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-foreground">Visit Us</p>
                  <p className="text-muted-foreground leading-snug">
                    118/105, Rabindrapally, Khardaha,<br />
                    Kolkata - 700117
                  </p>
                </div>
              </div>
              <a 
                href="mailto:letsstudy2022bu@gmail.com" 
                className="flex items-start space-x-4 group hover:bg-primary/5 p-2 -m-2 rounded-xl transition-all"
              >
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Mail size={16} className="text-primary group-hover:text-primary-foreground" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-foreground">Email</p>
                  <p className="text-muted-foreground truncate max-w-[150px] lg:max-w-none">letsstudy2022bu@gmail.com</p>
                </div>
              </a>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-foreground">Call Us</p>
                  <a href="tel:+918777484102" className="text-muted-foreground hover:text-primary transition-colors block">+91 8777484102</a>
                  <a href="tel:+918481819726" className="text-muted-foreground hover:text-primary transition-colors block">+91 8481819726</a>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-muted-foreground text-xs font-medium italic">
            © {new Date().getFullYear()} Let's Study MS - School of Mathematics. Dedicated to Analytical Brilliance.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;