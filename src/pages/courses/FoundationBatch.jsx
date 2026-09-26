import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, CheckCircle, ArrowRight, ChevronDown, Book, ScrollText, Library, Award, GraduationCap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Curriculum Data
const CURRICULA = {
  common: {
    name: "Common Track",
    description: "A unified rigorous curriculum designed to overlap with major competitive exams (IIT JAM, NBHM, TIFR) while building a solid undergraduate foundation.",
    specialNote: "We aim to complete the full curriculum of ISI B.Math course in your 4 year BS so that you don't face any difficulties while Pursuing your M.Sc no matter where it is from. The course pace will be according to your conveniences. Don't worry if you think the pace is too fast or slow.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Real Analysis 0", "Abstract Algebra 0"],
      refs: ["Bartle & Sherbert", "Artin", "Hungerford"],
      pyqs: "Standard University PYQs (2018-2023)"
    }, {
      id: 2,
      title: "Winter Break + Semester 2",
      topics: ["Real Analysis I", "Group I", "Rings I (Introduction)"],
      refs: ["Rudin", "Bartle–Sherbert", "Artin", "Hungerford"],
      pyqs: "ISI, CMI, TIFR, NBHM, JAM"
    }, {
      id: 3,
      title: "Summer Break + Semester 3",
      topics: ["Real Analysis II", "Rings I (continued)", "Linear Algebra I"],
      refs: ["Hoffman–Kunze", "Rudin", "Hungerford"],
      pyqs: "ISI, CMI, TIFR, NBHM, JAM"
    }, {
      id: 4,
      title: "Winter Break + Semester 4",
      topics: ["Real Analysis III", "Metric Spaces + Basic Topology", "Linear Algebra II"],
      refs: ["Hoffman–Kunze", "Rudin"],
      pyqs: "Standard Semester 4 Papers"
    }, {
      id: 5,
      title: "Semester 5",
      topics: ["Multivariate Calculus", "Rings and Modules II", "Topology (Basic)", "Quotient Topology"],
      refs: ["Spivak", "Munkres", "Armstrong", "Hungerford",],
      pyqs: "Previous 5 Years Honors Papers"
    }, {
      id: 6,
      title: "Winter Break + Semester 6",
      topics: ["Complex Analysis I", "Linear Algebra III", "Field Theory (Introduction)"],
      refs: ["Rudin", "Hoffman–Kunze", "Conway", "Hungerford", "Ridl"],
      pyqs: "All exams"
    }, {
      id: 7,
      title: "Summer Break + Semester 7",
      topics: ["Measure Theory", "Functional Analysis (Introduction)", "Complex Analysis II"],
      refs: ["Royden - Real Analysis", "Rudin", "IK Rana", "Halmos", "Folland"],
      pyqs: "All exams"
    }, {
      id: 8,
      title: "Winter Break + Semester 8 (Elective Specialisations)",
      topics: ["Differential Geometry", "Algebraic Topology", "Representation Theory", "Advanced Number Theory", "Advanced Algebra or Analysis"],
      refs: ["Spivak", "Hatcher", "Lee", "Lang", "Apostol", "Ireland & Rosen"],
      pyqs: "All Exams"
    }]
  },
  ju: {
    name: "Jadavpur University",
    description: "Tailored to the rigorous academic standards of Jadavpur University, focusing on deep analytical skills and applied mathematics.",
    specialNote: "(JU – 4th Year Target) During your final year, We aims to complete: Module over PID — Atiyah–Macdonald Chapter 2, Introduction to Algebraic Topology, Complex Analysis (advanced), Differential Geometry and Comprehensive PYQ training (ISI, TIFR, NBHM, CMI, JAM). This ensures you finish your UG degree with research-level foundations.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Linear Algebra I", "Real Analysis I"],
      refs: ["Hoffman–Kunze, Ch. 3", "Bartle–Sherbert", "Rudin"],
      pyqs: "JAM / ISI MMath / TIFR / NBHM / CMI"
    }, {
      id: 2,
      title: "Winter Break + Semester 2",
      topics: ["Group Theory I", "Real Analysis II", "Introduction to Ring Theory"],
      refs: ["Bartle–Sherbert", "Rudin, Ch. 4–5", "Dummit–Foote", "Hungerford"],
      pyqs: "JAM, ISI, TIFR, NBHM, CMI"
    }, {
      id: 3,
      title: "Summer Break + Semester 3",
      topics: ["Real Analysis (Brush-up)", "Group Theory (Brush-up)", "Ring Theory (continued)", "Real Analysis III"],
      refs: ["Bartle–Sherbert", "Rudin, Ch. 6–7", "Artin / Dummit–Foote", "Hungerford"],
      pyqs: "JAM, ISI, TIFR, NBHM, CMI"
    }, {
      id: 4,
      title: "Winter Break + Semester 4",
      topics: ["Metric Spaces (Introduction)", "Topology (Introduction)", "Linear Algebra II"],
      refs: ["Hoffman–Kunze (Ch. 6.2–6.4, 8)", "Rudin (Ch. 2)", "Hungerford", "Munkers", "Kumaresan", "G.F.Simmons", "Kelly", "Willard", "Dugunji", "Shirali"],
      pyqs: "JAM, ISI, TIFR, NBHM, CMI"
    }, {
      id: 5,
      title: "Summer Break + Semester 5",
      topics: ["General Topology (continued)", "Quotient Topology", "Multivariate Analysis", "Group Theory II"],
      refs: ["Armstrong", "Munkres", "Artin / Dummit–Foote", "Hungerford", "Spivak"],
      pyqs: "Intensive practice from JAM, ISI, TIFR,CMI"
    }, {
      id: 6,
      title: "Winter Break + Semester 6",
      topics: ["Complex Analysis I", "Field Theory", "Linear Algebra III"],
      refs: ["Conway", "Hoffman–Kunze", "Artin / Dummit–Foote", "Rudin", "Hungerford", "Stein-Shakarchi"],
      pyqs: "JAM, ISI, TIFR, NBHM, CMI"
    }, {
      id: 7,
      title: "Summer Break + Semester 7",
      topics: ["Complex Analysis — Problem Solving", "Measure Theory", "Functional Analysis"],
      refs: ["Conway", "Folland ", "Rudin", "IK-Rana", "Kesavan"],
      pyqs: "JAM, ISI, TIFR, NBHM, CMI"
    }, {
      id: 8,
      title: "Winter Break + Semester 8 - Elective Driven",
      topics: ["Algebraic Topology", "Field Theory", "Differential Geometry", "Measure Theory II", "Representation Theory", "Complex Analysis II"],
      refs: ["West - Graph Theory", "Conway - Functional Analysis", "Hatcher", "Hungerford", "Lee", "Thorpe", "Lang", "Montiel-Ros"],
      pyqs: "Research Track Papers"
    }]
  },
  cu: {
    name: "Calcutta University",
    description: "Ensuring broad coverage of both pure and applied mathematical concepts.",
    specialNote: `Since the ISI BMath syllabus is our bench mark, your cooperation in terms of willing to go beyond the semester syllabus is a necessary criteria to achieve our aim.  You may not have a proper semester break like some students from some other universities do. Here is how we plan to help you :-
    1. If you don't have a semester break or a very short semester break, it means that some of your previous semesters were way too long. We will use this to our advantage.
    2. We will start the syllabus for the next semester and start doing PYQs and exercises from Clasical Text books like Rudin, Hoffman, Artin.
    3. In this way you will always ahead of your syllabus and won't panick when the semester or entrance exams are coming thick and fast.`,
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Calculus I", "Coordinate Geometry", "Real Analysis 0 (Foundations)"],
      refs: ["Bartle–Sherbert", "Shifrin", "Velleman"],
      pyqs: "CU Previous Year Papers & ISI B.Math (Basic Level)"
    }, {
      id: 2,
      title: "Semester 2",
      topics: ["Abstract Algebra 0 (Foundations)", "Calculus II", "Algebra I", "Series & Convergence Tests"],
      refs: ["Bartle–Sherbert", "Shifrin", "Velleman", "Mafa"],
      pyqs: "CU Previous Year Papers & ISI B.Math (Basic Level)"
    }, {
      id: 3,
      title: "Semester 3",
      topics: ["Real Analysis I", "Group Theory I"],
      refs: ["Bartle & Sherbert", "Rudin", "Artin", "Dummit-Foote", "Hungerford"],
      pyqs: "JAM, ISI B.Math, CMI, NBHM, TIFR"
    }, {
      id: 4,
      title: "Semester 4",
      topics: ["Multivariate Calculus I", "Real Analysis II", "Group Theory II", "Rings I"],
      refs: ["Bartle–Sherbert", "Artin", "Hungerford"],
      pyqs: "JAM, ISI B.Math, CMI, NBHM, TIFR"
    }, {
      id: 5,
      title: "Semester 5",
      topics: ["Real Analysis III", "Ring Theory II", "Linear Algebra I"],
      refs: ["Bartle–Sherbert", "Dummit–Foote", "Hoffman–Kunze", "Hungerford"],
      pyqs: "JAM, ISI B.Math, CMI, NBHM Algebra, TIFR Algebra"
    }, {
      id: 6,
      title: "Semester 6",
      topics: ["Metric Spaces + Introduction to Topology", "Complex Analysis I", "Multivariable Calculus II"],
      refs: ["Conway", "Rudin", "Spivak", "Munkers"],
      pyqs: "JAM, ISI M.Math, TIFR, NBHM, CMI"
    }, {
      id: 7,
      title: "Semester 7 (to be updated)",
      topics: ["Measure Theory I", "Functional Analysis I", "Advanced Topology I", "Algebraic Structures "],
      refs: ["Munkres", "Rudin", "Folland", "Hungerford", "Conway"],
      pyqs: "CU MSc Semester 1"
    }, {
      id: 8,
      title: "Semester 8 (to be updated)",
      topics: ["Advanced Measure Theory", "Functional Analysis II", "Manifolds (Introduction)", "Module Theory", "Advanced Algebra IV"],
      refs: ["Artin", "Dummit–Foote", "Folland", "Hungerford", "Lee", "Conway"],
      pyqs: "ISI/ TIFR/ NBHM/ CMI & Research-oriented problem solving"
    }]
  },
  sxu: {
    name: "St. Xavier's College",
    description: "Focused on the autonomous curriculum of St. Xavier's, blending classical rigour with modern mathematical applications.",
    specialNote: "Since the ISI BMath syllabus is our bench mark, your cooperation in terms of willing to go beyond the semester syllabus is a necessary criteria to achieve our aim. We will have to utilize the 1 month winter breaks and the 2 month summer breaks you have.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Abstract Algebra 0", "Real Analysis 0 (if possible)"],
      refs: ["Bartle & Sherbert", "Hungerford"],
      pyqs: "SXU Previous Semester 1 Papers"
    }, {
      id: 2,
      title: "Winter Break + Semester 2",
      topics: ["Real Analysis I ", "Added training-rigor"],
      refs: ["Bartle & Sherbert", "Rudin"],
      pyqs: "SXU Previous Semester 2 Papers"
    }, {
      id: 3,
      title: "Summer Break + Semester 3",
      topics: ["Linear Algebra I", "Real Analysis II ", "Group Theory (Continued)"],
      refs: ["Bartle & Sherbert", "Rudin", "Hoffman & Kunze", "Dummit & Foote", "Hungerford"],
      pyqs: "SXU Previous Semester 3 Papers"
    }, {
      id: 4,
      title: "Winter Break + Semester 4",
      topics: ["Real Analysis (Integration + Series of Functions)", "Algebra Expansion", "Additional Enrichment"],
      refs: ["Bartle & Sherbert", "Rudin", "Hoffman & Kunze", "Dummit & Foote", "Hungerford"],
      pyqs: "University + JAM + CMI + ISI level"
    }, {
      id: 5,
      title: "Summer Break + Semester 5",
      topics: ["Metric Spaces & Topology", "Quotient Topology", "Rings & Modules", "FSV (Functions of Several Variables)"],
      refs: ["Armstrong", "Atiyah & Macdonald", "Rudin", "Spivak", "Hungerford"],
      pyqs: "SXC Honors Papers"
    }, {
      id: 6,
      title: "Winter Break + Semester 6",
      topics: ["FSV (Continued)", "Linear Algebra Expansion", "Introduction to Manifolds"],
      refs: ["Hoffman & Kunze", "Lee", "Spivak", "Munkers"],
      pyqs: "University + JAM + TIFR + ISI M.Math + NBHM"
    }, {
      id: 7,
      title: "Summer Break + Semester 7 (to be updated)",
      topics: ["Topology", "Early Measure Theory", "Algebra"],
      refs: ["Lee", "Spivak", "Hungerford", "Folland", "Munkers"],
      pyqs: "University + JAM + TIFR + ISI M.Math + NBHM"
    }, {
      id: 8,
      title: "Winter Break + Semester 8 (to be updated)",
      topics: ["Advanced electives", "Early research project", "Stochastic Processes"],
      refs: ["To be updated"],
      pyqs: "Exam-oriented problem solving"
    }]
  },
  pu: {
    name: "Presidency University",
    description: "Designed for Presidency University students, emphasizing pure mathematics and research-oriented topics from the very first year.",
    specialNote: `Since the ISI BMath syllabus is our bench mark, your cooperation in terms of willing to go beyond the semester syllabus is a necessary criteria to achieve our aim. Your semester breaks can be a bit short at times.
    1. Your semester breaks are short because your semesters take longer to be concluded. We will have to use this to our advantage.
    2. We will not leave things out for your semester breaks. We will mostly do the Pyqs of JAM, MMath, TIFR when the semester is going on along with your day to day college assignments.
    3. We will have to find a suitable time to teach you Functional Analysis since it is not currently offered in your Syllabus.`,
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Real Analysis 0", "Abstract Algebra 0"],
      refs: ["Bartle–Sherbert", "Artin", "Dummit–Foote", "Hungerford"],
      pyqs: "JAM, ISI B.Math/ M.Math, TIFR, NBHM, CMI"
    }, {
      id: 2,
      title: "Winter Break + Semester 2",
      topics: ["Real Analysis I", "Group Theory I", "Ring Theory I"],
      refs: ["Bartle–Sherbert", "Rudin", "Artin", "Dummit–Foote", "Hungerford"],
      pyqs: "JAM / ISI / TIFR / NBHM / CMI"
    }, {
      id: 3,
      title: "Summer Break + Semester 3",
      topics: ["Ring Theory (continued)", "Real Analysis II – Integration", "Linear Algebra (continued)"],
      refs: ["Hoffman-kunze", "Rudin", "Artin", "Hungerford"],
      pyqs: "JAM / ISI / TIFR / NBHM / CMI"
    }, {
      id: 4,
      title: "Winter Break + Semester 4",
      topics: ["Real Analysis III", "Metric Spaces"],
      refs: ["Bartle–Sherbert", "Rudin", "Shirali", "M.N. Mukherjee"],
      pyqs: "JAM / ISI / TIFR / NBHM / CMI"
    }, {
      id: 5,
      title: "Summer Break + Semester 5",
      topics: ["Multivariate Calculus", "Group Theory II", "Ring Theory II"],
      refs: ["Hungerford", "Spivak", "Artin / Dummit–Foote"],
      pyqs: "JAM / ISI / TIFR / NBHM / CMI"
    }, {
      id: 6,
      title: "Winter Break + Semester 6",
      topics: ["Complex Analysis I"],
      refs: [" Ahlfors or Brown–Churchill", "Ponnuswamy", "Stenin-Shakarchi"],
      pyqs: "ISI–TIFR–CMI targeted problem solving"
    }, {
      id: 7,
      title: "Semester 7",
      topics: ["General Topology", "Quotient Topology", "Algebraic Topology (Introduction)", "Elective Subject"],
      refs: ["Armstrong", "Munkres", "Hatcher", "Willard"],
      pyqs: "ISI–TIFR–CMI targeted problem solving"
    }, {
      id: 8,
      title: "Semester 8",
      topics: ["Multivariable Calculus (Revision)", "Introduction to Differential Geometry", "Elective Subject"],
      refs: ["Lee", "Munkers", "Spivak"],
      pyqs: "ISI–TIFR–CMI targeted problem solving"
    }]
  }
};

const FoundationBatch = () => {
  const [selectedTrack, setSelectedTrack] = useState('common');
  
  const features = [
    { text: 'Comprehensive coverage of basic mathematical concepts', icon: Target },
    { text: 'Interactive problem-solving sessions', icon: Users },
    { text: 'Regular assessments and progress tracking', icon: Award },
    { text: 'Doubt clearing sessions with expert faculty', icon: GraduationCap },
    { text: 'Study material and practice worksheets', icon: ScrollText },
    { text: 'Focus on building strong fundamentals', icon: BookOpen }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>Foundation Batch | BSc Maths Coaching West Bengal</title>
        <meta name="description" content="Foundation Batch at Let's Study MS: Syllabus-aligned curriculum for Jadavpur, Calcutta, St. Xavier's & Presidency BSc students. Build strong math foundations." />
        <link rel="canonical" href="https://letsstudyms.com/courses/foundation-batch" />
        <meta property="og:title" content="Foundation Batch | BSc Maths Coaching West Bengal" />
        <meta property="og:description" content="University-specific math coaching for Jadavpur, Calcutta, St. Xavier's & Presidency University students. Build a world-class mathematical foundation." />
        <meta property="og:url" content="https://letsstudyms.com/courses/foundation-batch" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Foundation Batch | BSc Maths Coaching West Bengal" />
        <meta name="twitter:description" content="University-specific math coaching for West Bengal BSc students. Build world-class foundations from faculty at IITs and ISI." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"Foundation Batch","item":"https://letsstudyms.com/courses/foundation-batch"}]})}</script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 ring-1 ring-primary/20">
              <BookOpen size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase leading-tight">Foundation Batch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Build strong mathematical fundamentals for undergraduate studies and competitive excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight uppercase">Level Up Your Thinking</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our Foundation Batch is designed for students beginning their journey in higher mathematics. 
                  This program goes beyond standard university syllabi, bridging the gap between typical BSc courses and research-level depth.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With a faculty that includes alumni from IITs and ISI, we ensure that every concept is understood from first principles.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
               <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <img className="relative w-full h-[500px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="Undergraduate students learning foundational mathematics at Let's Study MS" loading="lazy" src="https://images.unsplash.com/photo-1561089489-f13d5e730d72" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Curriculum Explorer</h2>
            <p className="text-muted-foreground text-lg mb-10">Compare university tracks and see your path to mastery.</p>

            <div className="relative max-w-md mx-auto">
              <select 
                value={selectedTrack} 
                onChange={e => setSelectedTrack(e.target.value)} 
                className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
              >
                <option value="ju">Jadavpur University</option>
                <option value="cu">Calcutta University</option>
                <option value="sxu">St. Xavier's College</option>
                <option value="pu">Presidency University</option>
                <option value="common">Common Track (Competitive)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                <ChevronDown size={24} />
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedTrack} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              transition={{ duration: 0.5, ease: "circOut" }} 
              className="max-w-6xl mx-auto"
            >
              <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border mb-12 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mr-6 ring-1 ring-primary/20">
                      <Library className="text-primary" size={36} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-primary leading-tight">
                        {CURRICULA[selectedTrack].name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-medium pl-22">{CURRICULA[selectedTrack].description}</p>

                  {CURRICULA[selectedTrack].specialNote && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-2xl ml-22"
                    >
                      <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2 flex items-center">
                        <GraduationCap size={16} className="mr-2" /> Academic Roadmap
                      </h4>
                      <p className="text-foreground leading-relaxed whitespace-pre-line text-sm opacity-80 italic font-medium">
                        {CURRICULA[selectedTrack].specialNote}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CURRICULA[selectedTrack].semesters.map((sem, index) => (
                  <motion.div 
                    key={sem.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.05 }} 
                    className="bg-card rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border group hover-lift"
                  >
                    <div className="bg-secondary/50 p-6 border-b border-border flex justify-between items-center">
                      <h4 className="font-black text-primary text-xl uppercase tracking-tight">{sem.title}</h4>
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">SEM {sem.id}</div>
                    </div>
                    <div className="p-8 space-y-8">
                      <div>
                        <h5 className="text-primary font-black text-xs uppercase tracking-widest flex items-center mb-4">
                          <BookOpen size={16} className="mr-2" /> Topics 
                        </h5>
                        <ul className="grid grid-cols-1 gap-2">
                          {sem.topics.map((topic, i) => (
                            <li key={i} className="flex items-center text-sm text-foreground/80 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-primary font-black text-xs uppercase tracking-widest flex items-center mb-4">
                          <Book size={16} className="mr-2" /> Standard References
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {sem.refs.map((ref, i) => (
                            <span key={i} className="text-[10px] font-bold bg-secondary/50 text-foreground/70 px-3 py-1.5 rounded-lg border border-border group-hover:border-primary/20 transition-colors uppercase tracking-tight">
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>

                      {sem.pyqs && (
                        <div className="pt-6 border-t border-border">
                          <h5 className="text-primary font-black text-xs uppercase tracking-widest flex items-center mb-3">
                            <Award size={16} className="mr-2" /> Exam Focus
                          </h5>
                          <p className="text-xs text-muted-foreground bg-primary/5 p-3 rounded-xl italic font-medium leading-relaxed">
                            {sem.pyqs}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">What Sets Us Apart</h2>
            <p className="text-muted-foreground text-lg font-medium">Rigorous training, expert mentorship, and a commitment to excellence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                {...fadeInUp} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="bg-card p-10 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <feature.icon size={28} />
                </div>
                <p className="text-foreground text-left font-bold text-lg leading-tight uppercase tracking-tight">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary">
          <div className="absolute inset-0 opacity-10 noise-bg" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeInUp}>
              <h2 className="text-6xl font-black text-primary-foreground mb-8 tracking-tighter uppercase leading-none">Ready to Master Mathematics?</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
                Join the most ambitious community of mathematicians in West Bengal. Start your journey today.
              </p>
              <Link to="/contact">
                <button className="bg-primary-foreground text-primary hover:scale-105 transition-all font-black px-12 py-5 rounded-2xl text-lg shadow-2xl flex items-center mx-auto uppercase tracking-widest">
                  ENROLL NOW <ArrowRight className="ml-3" size={24} />
                </button>
              </Link>
            </motion.div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoundationBatch;