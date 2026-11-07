import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Send, Mail, Phone, MapPin, ArrowUp, ExternalLink, GraduationCap } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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

  const socials = [
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61584835031140' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/the.ls2m?dlrf=MW9ocHp4YWIzdGdlMw==' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/let-s-study-school-of-mathematics-3443073a4/' },
    { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@letsstudysom' },
    { icon: Send, label: 'Telegram', url: 'https://t.me/LetsstudySOM' }
  ];

  const heading = 'text-xs uppercase tracking-widest font-bold text-[#E9CF86] mb-5';
  const link = 'text-[#EFE6CC]/70 hover:text-[#EFE6CC] transition-colors text-sm';

  return (
    <footer className="bg-[#051F1A] text-[#EFE6CC]">
      <div className="container mx-auto pt-20 pb-10">
        {/* Sister institute: School Division banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-r from-[#174A3F] via-[#14443A] to-[#1E5347] border border-[#EFE6CC]/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#E9CF86]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#E9CF86]/15 transition-all duration-700" aria-hidden="true" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl bg-[#F6F1E3] text-[#051F1A] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <GraduationCap size={30} />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#EFE6CC] bg-[#EFE6CC]/10 px-3.5 py-1 rounded-full border border-[#EFE6CC]/20">
                    School Academic Division • <span className="whitespace-nowrap">Std 5–12</span>
                  </span>
                  <span className="text-xs font-semibold text-[#EFE6CC]/60 hidden sm:inline">
                    CBSE • ICSE • WB Board
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-[28px] font-black text-[#F6F1E3] mt-2 tracking-tight">
                  Looking for School Coaching? Explore Let's Study School
                </h3>
                <p className="text-sm sm:text-base text-[#EFE6CC]/65 mt-1.5 max-w-3xl leading-relaxed">
                  Dedicated micro-batches (3–5 students) across Physics, Chemistry, Biology, Mathematics &amp; English with direct continuity to IIT JAM / ISI higher academic prep.
                </p>
              </div>
            </div>
            <a
              href="https://ls2mschool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#F6F1E3] text-[#051F1A] font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap hover:bg-white transition-all shadow-md hover:shadow-xl hover:scale-105"
            >
              <span>Visit ls2mschool.com</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-3">
              <img
                src="/images/logo-badge.png"
                alt="Let's Study MS - School of Mathematics Logo"
                width="56"
                height="56"
                loading="lazy"
                className="h-14 w-14 rounded-full"
              />
              <span className="leading-none">
                <span className="block font-display font-black text-2xl">Let's Study</span>
                <span className="block font-accent italic text-sm text-[#E9CF86] mt-1">School of Mathematics</span>
              </span>
            </Link>
            <p className="text-[#EFE6CC]/70 text-sm leading-relaxed max-w-sm mt-6">
              One of West Bengal's leading mathematical institutes, dedicated to nurturing analytical brilliance through expert mentorship.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center border border-[#EFE6CC]/20 rounded-sm text-[#EFE6CC]/80 hover:bg-[#E9CF86] hover:text-[#051F1A] hover:border-[#E9CF86] transition-colors"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h4 className={heading}>Explore</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleScrollToSection('courses')} className={link}>Programmes</button></li>
              <li><Link to="/testimonials" onClick={() => window.scrollTo(0, 0)} className={link}>Success Stories</Link></li>
              <li><button onClick={() => handleScrollToSection('team')} className={link}>Mentors</button></li>
              <li><Link to="/login" onClick={() => window.scrollTo(0, 0)} className={link}>Study Material</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className={link}>Admissions</Link></li>
            </ul>
          </div>

          {/* Programmes */}
          <div className="md:col-span-3">
            <h4 className={heading}>Programmes</h4>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c.name}>
                  <Link to={c.path} onClick={() => window.scrollTo(0, 0)} className={link}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className={heading}>Get in touch</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#E9CF86] shrink-0 mt-0.5" />
                <span className="text-[#EFE6CC]/70 leading-relaxed">118/105, Rabindrapally, Khardaha,<br />Kolkata - 700117</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-[#E9CF86] shrink-0 mt-0.5" />
                <a href="mailto:letsstudy2022bu@gmail.com" className={`${link} break-all`}>letsstudy2022bu@gmail.com</a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-[#E9CF86] shrink-0 mt-0.5" />
                <span className="flex flex-col gap-1">
                  <a href="tel:+918777484102" className={link}>+91 87774 84102</a>
                  <a href="tel:+918481819726" className={link}>+91 84818 19726</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark */}
        <p
          className="font-accent italic text-[9vw] 2xl:text-[9rem] leading-none text-[#EFE6CC]/[0.06] mt-16 select-none whitespace-nowrap overflow-hidden"
          aria-hidden="true"
        >
          Let's Study MS
        </p>

        <div className="pt-8 border-t border-[#EFE6CC]/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pr-20 md:pr-24">
          <p className="text-[#EFE6CC]/50 text-xs">
            © {new Date().getFullYear()} Let's Study MS - School of Mathematics. Dedicated to Analytical Brilliance.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#EFE6CC]/70 hover:text-[#E9CF86] transition-colors"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
