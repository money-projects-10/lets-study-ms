import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, Award, TrendingUp,
  GraduationCap, Brain, Trophy, Target, Quote, ExternalLink, ArrowRight
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home = () => {
  const { hash } = useLocation();

  // FIX INTERNAL ANCHOR SCROLLING
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [hash]);

  // UPDATED: Added 'link' and 'isExternal' properties
  const whyJoinUsItems = [
    {
      icon: BookOpen,
      title: 'Expert Faculty',
      description: 'Learn from experienced mathematicians and educators with proven track records in competitive exam preparation.',
      link: '#team', // Scroll to Team section
      isExternal: false
    },
    {
      icon: Target,
      title: 'Comprehensive Curriculum',
      description: 'Our structured courses cover all topics systematically, ensuring no stone is left unturned in your preparation.',
      link: '/courses/foundation-batch', // Link to Foundation Page
      isExternal: false
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description: 'Join Hundreds of successful students who have achieved their academic goals through our guidance.',
      link: '/testimonials',  // Study Mterial
      isExternal: false
    },
    {
      icon: Users,
      title: 'Mock Interview',
      description: 'Helping students practice and refine their interviewing skills in a realistic, low-pressure environment.',
      link: 'https://www.youtube.com/playlist?list=PLsXv7MTc8v3ZKulf2ng-4jwVEkxvPOjYu',
      isExternal: true
    }
  ];

  const courses = [
    {
      title: 'Foundation Batch',
      description: 'Build strong mathematical fundamentals for undergraduate studies',
      icon: BookOpen,
      color: '#0F5A7A',
      path: '/courses/foundation-batch'
    },
    {
      title: 'Semester Batch',
      description: 'Excel in your semester exams with targeted preparation',
      icon: GraduationCap,
      color: '#0d4a63',
      path: '/courses/semester-batch'
    },
    {
      title: 'M.Sc Mathematics Entrances',
      description: 'Master entrance exams for top mathematics programs',
      icon: Brain,
      color: '#0F5A7A',
      path: '/courses/msc-mathematics'
    },
    {
      title: 'M.Tech/Data Science/M.Sc Economics',
      description: 'Specialized preparation for interdisciplinary programs',
      icon: TrendingUp,
      color: '#0d4a63',
      path: '/courses/mtech-datascience'
    },
    {
      title: 'Engineering Mathematics',
      description: 'Comprehensive engineering mathematics for all branches',
      icon: Award,
      color: '#0F5A7A',
      path: '/courses/engineering-mathematics'
    },
    {
      title: 'PhD Entrances',
      description: 'Advanced preparation for doctoral program admissions',
      icon: Trophy,
      color: '#0d4a63',
      path: '/courses/phd-entrances'
    },
    {
      title: 'Advanced Courses',
      description: 'Specialized topics for research and competitive excellence',
      icon: Target,
      color: '#0F5A7A',
      path: '/courses/advanced-courses'
    },
    {
      title: 'Personalized Coaching',
      description: 'One-on-one mentorship tailored to your specific needs',
      icon: Users,
      color: '#0d4a63',
      path: '/contact'
    }
  ];

  const testimonials = [
    {
      name: 'Sourajyoti Maiti',
      achievement: "B.Sc St.Xavier's Kolkata, Cracked M.Sc RKMVERI",
      current: 'Currently in University of Connecticut (PhD)',
      quote: 'The rigorous training and conceptual clarity I gained here were instrumental in my journey to a PhD program in the USA.',
      image: 'https://i.postimg.cc/HxZcnMJS/Suryajyoti_maiti.jpg'
    },
    {
      name: 'Divesh Bhalotia',
      achievement: 'IOMA, ISI M.Math (2025), JAM (2025) AIR 37, HRI (2025)',
      current: 'Currently in HRI',
      quote: 'Securing AIR 37 in JAM was possible only due to the deep analytical approach taught here.',
      image: 'https://i.postimg.cc/VNtkmXfN/Divesh_Bhalotia.jpg'
    },
    {
      name: 'Samiul Islam',
      achievement: 'M.Sc Calcutta University, Cracked: ISI M.Tech (2022)',
      current: 'GenAI Engineer at BizAcuity Solution Pvt.Ltd.',
      quote: 'Strong mathematical foundations helped me transition into High-End AI Engineering effortlessly.',
      image: 'https://i.postimg.cc/T34sv5Kh/Samuel-islam.jpg'
    },
    {
      name: 'Chandreyee Banerjee',
      achievement: "B.Sc St. Xavier's Kolkata, Cracked: IISER Kolkata (2025)",
      current: 'Currently in ISI Bangalore',
      quote: 'The exposure to higher-level mathematics prepared me for the most prestigious institutes in India.',
      image: 'https://i.postimg.cc/90m9DLz5/chandreyee_banerjee.jpg'
    }
  ];

  const teamMembers = [
    {
      name: 'Debabrata Krishna',
      highlight: 'IIT Kanpur | JAM AIR: 104',
      details: [
        'Graduation: University of Gour Banga (Malda College)',
        'Post Graduation: IIT Kanpur',
        'JAM AIR: 104 (2021)',
        'CSIR-NET AIR: 35 (2024)'
      ]
    },
    {
      name: 'Sourish',
      highlight: 'ISI Kolkata | CSIR-NET AIR: 33',
      details: [
        'Graduation: Jadavpur University',
        'Post Graduation: ISI Kolkata (M.MATH)',
        'CSIR-NET AIR: 33 (June 2024)',
        'Cracked PhD: TIFR Mumbai, HRI, IIT Madras, University of Tokyo'
      ]
    },
    {
      name: 'Urmi Daniella',
      highlight: 'IISC Bangalore | CSIR-NET AIR: 6',
      details: [
        'Graduation: IISC Bangalore',
        'Post Graduation: IISC Bangalore',
        'CSIR-NET AIR: 20 (2018), 6 (2022), 15 (2024)'
      ]
    },
    {
      name: 'Jeet',
      highlight: 'ISI Kolkata | JAM AIR: 597',
      details: [
        "Graduation: St. Xavier's College (Autonomous), Kolkata",
        'Post Graduation: ISI Kolkata (M.Math)',
        'JAM AIR: 597 (2023)'
      ]
    },
    {
      name: 'Deepta',
      highlight: 'IISER KOLKATA | GATE AIR: 250',
      details: [
        'Graduation: Jadavpur University',
        'Post Graduation: IISER KOLKATA',
        'JAM AIR: 300 (2023)',
        'GATE AIR: 250 (2025)'
      ]
    },
    {
      name: 'Shleena',
      highlight: 'MSc Jadavpur University | IISER Bhopal',
      details: [
        "Graduation: BSc St Xavier's College Kolkata",
        'Post Graduation: MSc Jadavpur University',
        'Cracked IISER Bhopal IPhD'
      ]
    },
    {
      name: 'Avik',
      highlight: 'PhD: IIT Bombay',
      details: [
        'Graduation: Scottish Church College',
        'Post Graduation: Jadavpur University',
        'PhD: IIT Bombay'
      ]
    },
    {
      name: 'Aritra',
      highlight: 'Data Science (RKMVERI)',
      details: [
        'Graduation: RKM Narendrapur',
        'Post Graduation: (Data Science) RKMVERI',
        'Currently: Assistant Manager - Analytics at EXL Services'
      ]
    },
    {
      name: 'Samiul',
      highlight: 'ISI MTech (2022)',
      details: [
        'MSC: Calcutta University',
        'Post Graduation: ISI MTech (2022)',
        'Currently: GenAI Engineer at BizAcuity Solutions Pvt. Ltd.'
      ]
    },
    {
      name: 'Sukhomoy Debnath',
      highlight: 'Consultant, KPMG',
      details: [
        'Consultant at KPMG',
        'Industry Expert & Alumni Mentor'
      ]
    },
    {
      name: 'Rahul',
      highlight: 'CSIR-NET AIR: 184',
      details: [
        'Graduation: IISER Kolkata',
        'Post Graduation: IISER Kolkata',
        'CSIR-NET AIR: 184 (June, 2024)'
      ]
    },
    {
      name: 'Arijit',
      highlight: 'IISER Mohali',
      details: [
        'Graduation: Ramakrishna Mission Vidyamandir',
        'IPhD, IISER Mohali',
        'JAM AIR: 78 (2023)',
        'NBHM Doctoral Fellowship (2025)'
      ]
    },
    {
      name: 'Abir Rangan',
      highlight: 'ISI Kolkata | GATE AIR: 25',
      details: [
        'Graduation: Ramakrishna mission residential college, Narendrapur',
        'Post Graduation: ISI Kolkata (M.Math)',
        'GATE AIR: 25 (2024)',
        'CSIR-NET AIR: 95 (2024)'
      ]
    },
    {
      name: 'Pranjal Das',
      highlight: 'ISI Delhi | MSQE\'24 | Ex-EY',
      details: [
        'Graduation: B.Sc. Economics Hons., Scottish Church College',
        'Post Graduation: ISI Delhi (MSQE\'24)',
        'Previously: Worked at Ernst and Young'
      ]
    },
    {
      name: 'Sirsha Das',
      highlight: 'IIT JAM ST AIR 16 | GATE ST AIR 8',
      details: [
        'Graduation: B.Sc. : Lady Brabourne College',
        'Post Graduation: M.Sc. : Indian Institute of Technology, Bombay',
        'IIT JAM ST AIR 16',
        'GATE ST AIR 8'
      ]
    }

  ];

  // Logic for the New Layout
  const leftSideMembers = teamMembers.slice(0, 3);
  const rightSideMembers = teamMembers.slice(3, 6);
  const bottomSideMembers = teamMembers.slice(6);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const MemberCard = ({ member }) => (
    <div className="group bg-card rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-500 border border-border cursor-default hover-lift">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
          <Users className="text-primary group-hover:text-primary-foreground transition-colors duration-300" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{member.name}</h3>
          <p className="text-primary text-xs font-bold uppercase tracking-wide">{member.highlight}</p>
        </div>
      </div>
      <div className="max-h-0 overflow-hidden group-hover:max-h-96 transition-all duration-500 ease-in-out">
        <div className="pt-4 mt-4 border-t border-border text-sm text-muted-foreground space-y-2">
          {member.details.map((line, i) => (
            <div key={i} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <p className="leading-snug">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  const floatingSymbols = [
    { icon: '∑', top: '15%', left: '10%', delay: 0 },
    { icon: 'π', top: '25%', left: '85%', delay: 1 },
    { icon: '∫', top: '75%', left: '15%', delay: 2 },
    { icon: '√', top: '65%', left: '80%', delay: 0.5 },
    { icon: '∞', top: '45%', left: '5%', delay: 1.5 },
    { icon: '∆', top: '10%', left: '90%', delay: 2.5 },
  ];

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      <Helmet>
        <title>Let's Study MS | Top Math Institute in West Bengal</title>
        <meta name="description" content="Top mathematics institute in West Bengal for higher education. Expert coaching for IIT JAM, MSc Entrances, TIFR, ISI & PhD. Faculty from IIT, ISI & IISc." />
        <meta name="keywords" content="mathematical institutes in west bengal, mathematics institute west bengal higher education, mathematics coaching West Bengal, college maths tutor Kolkata, IIT JAM coaching, BSc mathematics coaching, MSc entrance preparation West Bengal, higher education maths West Bengal, best maths coaching kolkata" />
        <link rel="canonical" href="https://letsstudyms.com/" />
        <meta property="og:title" content="Let's Study MS | Top Math Institute in West Bengal" />
        <meta property="og:description" content="Top mathematics institute in West Bengal for higher education. Expert coaching for IIT JAM, MSc Entrances, TIFR, ISI & PhD. Faculty from IIT, ISI & IISc." />
        <meta property="og:url" content="https://letsstudyms.com/" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Let's Study MS | Top Math Institute in West Bengal" />
        <meta name="twitter:description" content="Top math institute in West Bengal for higher education. Expert coaching for IIT JAM, MSc Entrances, TIFR, ISI, & PhD." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://letsstudyms.com/" }, { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://letsstudyms.com/#courses" }, { "@type": "ListItem", "position": 3, "name": "Contact", "item": "https://letsstudyms.com/contact" }] })}</script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Floating Math Symbols */}
        {floatingSymbols.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: item.delay }}
            className="absolute pointer-events-none select-none text-primary/20 font-bold text-4xl"
            style={{ top: item.top, left: item.left }}
          >
            {item.icon}
          </motion.div>
        ))}

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative inline-block mb-10 group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl group-hover:bg-primary/30 transition-all duration-700 opacity-50" />
              <img
                src="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg"
                alt="Let's Study MS School of Mathematics Logo - Premier Mathematics Institute West Bengal"
                className="h-32 md:h-40 w-auto mx-auto relative z-10 rounded-3xl p-2 bg-background border border-border shadow-2xl transform transition-transform group-hover:rotate-2"
              />
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              LET'S <span className="shimmer-text pr-2">STUDY </span> MS
            </h1>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[1px] w-12 bg-primary/50" />
              <p className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">School of Mathematics</p>
              <div className="h-[1px] w-12 bg-primary/50" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm md:text-base font-semibold tracking-wide mt-2 shadow-sm backdrop-blur-sm"
            >
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span>Affiliated with Ramanujan School of Mathematics (RSM)</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed mt-8"
            >
              "Where logical thinking transcends mere numbers, <br className="hidden md:block" />
              shaping the analytical minds of tomorrow."
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex flex-col items-center"
            >
              <button
                onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold overflow-hidden transition-all hover:pr-12"
              >
                <span className="relative z-10">EXPLORE COURSES</span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight size={20} />
                </div>
              </button>


            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Why Join Us */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12 transition-colors">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {whyJoinUsItems.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className="bg-card hover:bg-primary/5 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover-lift border border-border"
              >
                {/* LOGIC: Check if it has a link, then check if external or internal */}
                {item.link ? (
                  item.isExternal ? (
                    // 1. External Link (YouTube) - Whole Card Clickable
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-8 h-full text-foreground cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <item.icon size={48} className="mb-4 text-primary group-hover:scale-110 transition-transform" />
                        <ExternalLink size={20} className="text-primary/50" />
                      </div>
                      {/* No underline classes here */}
                      <h3 className="text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                      <p className="text-justify text-muted-foreground">{item.description}</p>
                    </a>
                  ) : (
                    // 2. Internal Link (Foundation/Team) - Whole Card Clickable
                    <Link
                      to={item.link}
                      // Using onClick to ensure scroll to top
                      onClick={() => {
                        if (item.link.startsWith('#')) {
                          // Handle anchor scroll manually if needed, or let standard behavior work
                          const id = item.link.replace('#', '');
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.scrollTo(0, 0);
                        }
                      }}
                      className="block p-8 h-full text-foreground cursor-pointer group"
                    >
                      <item.icon size={48} className="mb-4 text-primary group-hover:scale-110 transition-transform" />
                      {/* Removed underline classes */}
                      <h3 className="text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                      <p className="text-justify text-muted-foreground">{item.description}</p>
                    </Link>
                  )
                ) : (
                  // 3. No Link (Proven Results) - Just a div
                  <div className="block p-8 h-full text-foreground cursor-default">
                    <item.icon size={48} className="mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                    <p className="text-justify text-muted-foreground">{item.description}</p>

                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-background scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Explore Our Batches</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {courses.map((course, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                }}
              >
                <Link to={course.path} onClick={() => window.scrollTo(0, 0)} className="block h-full">
                  <div className="bg-card p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-border h-full hover-lift group overflow-hidden relative">
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                        <course.icon size={32} className="text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                      </div>
                      <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight">{course.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow font-medium">{course.description}</p>
                      <div className="mt-8 pt-6 border-t border-border flex items-center text-primary text-xs font-black uppercase tracking-[0.2em] transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        View Details <ArrowRight size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center text-primary mb-16">Success Stories</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((student, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Link to="/testimonials" onClick={() => window.scrollTo(0, 0)} className="block h-full">
                  <div className="bg-card p-6 rounded-2xl shadow-xl border border-border flex flex-col items-center text-center group hover:border-primary transition-all h-full hover-lift">
                    <div className="relative -mt-16 mb-4">
                      <img src={student.image} alt={`${student.name} - ${student.achievement}`} loading="lazy" className="w-24 h-24 rounded-full border-4 border-card shadow-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{student.name}</h3>
                    <p className="text-primary text-[11px] font-bold uppercase tracking-tight mt-1">{student.achievement}</p>
                    <p className="text-muted-foreground text-[10px] mb-4">{student.current}</p>
                    <div className="relative italic text-muted-foreground text-sm">
                      <Quote size={12} className="inline mr-1 opacity-20" /> {student.quote}
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link to="/testimonials" onClick={() => window.scrollTo(0, 0)}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:bg-primary/90 transition-all"
              >
                Read Success Stories
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-20 bg-secondary/50 scroll-mt-20 overflow-hidden">
        <div className="container mx-auto px-4">

          <motion.h2
            {...fadeInUp}
            className="text-4xl font-bold text-center text-primary mb-16 drop-shadow-sm transition-colors"
          >
            Our Team of Mentors
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-center">
            <div className="space-y-6">
              {leftSideMembers.map((member, index) => (
                <motion.div
                  key={`left-${index}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center items-center py-6 lg:py-0">
              <img
                src="https://i.postimg.cc/8C37fr0X/undraw-educator-6dgp-Photoroom-(1).png"
                alt="Expert Faculty Illustration - Let's Study MS School of Mathematics"
                loading="lazy"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            <div className="space-y-6">
              {rightSideMembers.map((member, index) => (
                <motion.div
                  key={`right-${index}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {bottomSideMembers.map((member, index) => (
              <motion.div
                key={`bottom-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <MemberCard member={member} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Year Target Badge */}
      <div className="mt-12 mb-24 bg-gradient-to-r from-[#0d4a63] to-[#0F5A7A] p-8 text-white text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <Award size={40} className="text-yellow-400" />
        </div>
        <p className="text-white px-4 md:px-12 leading-relaxed">
          You will never prepare alone - at every step, an exam expert stands with you, <br />
          guiding, correcting, and strengthening your journey until success.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Home;