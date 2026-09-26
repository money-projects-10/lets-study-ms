import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Clock, Users, CheckCircle, ArrowRight,
  ChevronDown, BookOpen, Library
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Curriculum Data
const CURRICULA = {
  ju: {
    name: "Jadavpur University",
    description: "Comprehensive semester preparation aligned with Jadavpur University's rigorous curriculum.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Real Analysis", "Geometry", "Linear algebra"]
    }, {
      id: 2,
      title: "Semester 2",
      topics: ["Algebra", "Theory of real functions", "Riemann integration and series of functions"]
    }, {
      id: 3,
      title: "Semester 3",
      topics: ["Ring Theory", "Ordinary differential Equations", "Numerical Analysis"]
    }, {
      id: 4,
      title: "Semester 4",
      topics: ["Metric spaces and Differential geometry", "Linear Algebra", "Partial differential equations", "Multivariable calculus"]
    }, {
      id: 5,
      title: "Semester 5",
      topics: ["Topology", "Group Theory", "Linear optimization and Game Theory", "Probability and Markov Chain"]
    }, {
      id: 6,
      title: "Semester 6",
      topics: ["Complex Analysis", "Integral equation, Integral transform, Calculus of variation", "Measure Theory", "Field theory and canonical form of matrics "]
    }, {
      id: 7,
      title: "Semester 7",
      topics: ["General Mechanics", "Functional analysis"]
    }]
  },
  cu: {
    name: "Calcutta University",
    description: "Targeted preparation for Calcutta University's CBCS syllabus, focusing on high-scoring areas.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Calculus", "Geometry", "Vector Analysis"]
    }, {
      id: 2,
      title: "Semester 2",
      topics: ["Basic Algebra"]
    }, {
      id: 3,
      title: "Semester 3",
      topics: ["Real Analysis", "Ordinary Differential Equations I and Group Theory I", "Linear Programming and Rectangular Games"]
    }, {
      id: 4,
      title: "Semester 4",
      topics: ["Theory of Real Functions", "Mechanics I", "Multivariable Calculus I and Partial Differential Equations I", "Group Theory II and Ring Theory I"]
    }, {
      id: 5,
      title: "Semester 5",
      topics: ["Probability and Statistics", "Ring Theory II and Linear Algebra I", "Riemann Integration and Series of functions", "Mechanics II"]
    }, {
      id: 6,
      title: "Semester 6",
      topics: ["Metric Spaces + Complex Analysis I", "Numerical Analysis", "Multivariable Calculus II and Application of Calculus"]
    }]
  },
  sxu: {
    name: "St. Xavier's College",
    description: "Specialized coaching for St. Xavier's autonomous curriculum with emphasis on conceptual clarity.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Differential Equation I", "Algebra I"]
    }, {
      id: 2,
      title: "Semester 2",
      topics: ["Analysis I", "Vector Algebra and Geometry"]
    }, {
      id: 3,
      title: "Semester 3",
      topics: ["Algebra II", "Analysis II"]
    }, {
      id: 4,
      title: "Semester 4",
      topics: ["Algebra III", "Analysis III"]
    }, {
      id: 5,
      title: "Semester 5",
      topics: ["Probability theory", "Metric Spaces", "Numerical Analysis", "Analysis IV"]
    }, {
      id: 6,
      title: "Semester 6",
      topics: ["Algebra IV", "Analysis V", "Differential Equation II", "Mechanics I"]
    }]
  },
  pu: {
    name: "Presidency University",
    description: "Research-oriented approach aligning with Presidency University's advanced mathematics syllabus.",
    semesters: [{
      id: 1,
      title: "Semester 1",
      topics: ["Geometry and Introduction to Real numbers", "Algebra", "Differential Calculus"]
    }, {
      id: 2,
      title: "Semester 2",
      topics: ["Real Analysis I", "Group Theory I", "Ring Theory I"]
    }, {
      id: 3,
      title: "Semester 3",
      topics: ["Linear Algebra", "Real Analysis II + ODE"]
    }, {
      id: 4,
      title: "Semester 4",
      topics: ["Numerical Methods", "Sequence and series of functions + Metric space"]
    }, {
      id: 5,
      title: "Semester 5",
      topics: ["Multivariable Calculus", "Group Theory II", "Probability theory"]
    }, {
      id: 6,
      title: "Semester 6",
      topics: ["Complex Analysis", "PDE", "Optimization Techniques", "Mathematical Methods + Graph Theory"]
    }, {
      id: 7,
      title: "Semester 7",
      topics: ["Topology", "Advance ODE"]
    }, {
      id: 8,
      title: "Semester 8",
      topics: ["Differential Geometry", "Classical Mechanics"]
    }]
  }
};

const SemesterBatch = () => {
  const [selectedTrack, setSelectedTrack] = useState('ju');

  const features = [
    'Targeted preparation for semester examinations',
    'Syllabus-focused teaching methodology',
    'Previous year question paper analysis',
    'Weekly mock tests and assessments',
    'Personalized attention for weak areas',
    'Comprehensive notes and study materials'
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
        <title>Semester Batch | Maths Exam Coaching West Bengal</title>
        <meta name="description" content="Semester Batch at Let's Study MS — targeted maths coaching for Jadavpur, Calcutta, St. Xavier's & Presidency University semester exams by expert faculty." />
        <link rel="canonical" href="https://letsstudyms.com/courses/semester-batch" />
        <meta property="og:title" content="Semester Batch | Maths Exam Coaching West Bengal" />
        <meta property="og:description" content="Targeted semester exam coaching for West Bengal universities. Syllabus-aligned preparation, weekly mocks, and expert guidance from ISI and IIT alumni." />
        <meta property="og:url" content="https://letsstudyms.com/courses/semester-batch" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Semester Batch | Maths Exam Coaching West Bengal" />
        <meta name="twitter:description" content="Semester exam coaching for Jadavpur, Calcutta, Xavier's & Presidency. Syllabus-focused, expert-led classes." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"Semester Batch","item":"https://letsstudyms.com/courses/semester-batch"}]})}</script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 ring-1 ring-primary/20">
              <GraduationCap size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase">Semester Batch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Excel in your semester exams with targeted preparation aligned perfectly with your university syllabus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight">Structured to Succeed</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our Semester Batch is specially designed for college students who want to score high in their 
                  semester examinations. We provide focused preparation that aligns perfectly with your university syllabus.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With regular practice sessions, mock tests, and expert guidance, we ensure that you're fully prepared to tackle exams with confidence.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
              <img className="relative w-full h-[500px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="Students preparing for university mathematics semester exams at Let's Study MS" loading="lazy" src="https://i.postimg.cc/rpb1yX5v/pexels_karola_g_6256066.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">University Track Selection</h2>
            <p className="text-muted-foreground text-lg mb-10">Select your university to view the detailed semester-wise breakdown</p>

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
                  <h3 className="text-4xl font-black text-primary mb-4 flex items-center">
                    <Library className="mr-4" size={36} /> {CURRICULA[selectedTrack].name}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-0 leading-relaxed italic">{CURRICULA[selectedTrack].description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CURRICULA[selectedTrack].semesters.map((sem, index) => (
                  <motion.div 
                    key={sem.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.05 }} 
                    className="bg-card rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border group hover-lift"
                  >
                    <div className="bg-primary text-primary-foreground p-6 flex justify-between items-center">
                      <h4 className="font-bold text-xl">{sem.title}</h4>
                      <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">SEM {sem.id}</div>
                    </div>
                    <div className="p-8">
                      <h5 className="text-primary font-black text-xs uppercase tracking-widest flex items-center mb-6">
                        <BookOpen size={16} className="mr-2" /> Modules Covered
                      </h5>
                      <ul className="grid grid-cols-1 gap-3">
                        {sem.topics.map((topic, i) => (
                          <li key={i} className="flex items-center text-sm text-foreground/80 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-4" />
                            {topic}
                          </li>
                        ))}
                      </ul>
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
            <h2 className="text-5xl font-black text-foreground mb-4">What You'll Get</h2>
            <p className="text-muted-foreground text-lg">Everything you need to ace your semester exams.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                {...fadeInUp} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="bg-card p-8 rounded-3xl border border-border hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CheckCircle size={24} />
                </div>
                <p className="text-foreground text-left font-medium leading-relaxed">{feature}</p>
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
              <h2 className="text-5xl font-black text-primary-foreground mb-8">Ready to Excel in Your Exams?</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
                Join our Semester Batch and achieve the grades you deserve with expert guidance.
              </p>
              <Link to="/contact">
                <button className="bg-primary-foreground text-primary hover:scale-105 transition-all font-black px-12 py-5 rounded-2xl text-lg shadow-2xl flex items-center mx-auto uppercase tracking-widest">
                  Enroll Now <ArrowRight className="ml-3" size={24} />
                </button>
              </Link>
            </motion.div>
          </div>
      </section>

      <Footer />
    </div>

  );
};

export default SemesterBatch;