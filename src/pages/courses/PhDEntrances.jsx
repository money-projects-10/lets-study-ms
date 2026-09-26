import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Clock, Users, CheckCircle, ArrowRight,
  ChevronDown, BookOpen, Library, GraduationCap,
  Sparkles, Rocket, Book
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CURRICULA = {
  rank_booster: {
    name: "Rank Booster Batch for NET & GATE",
    description: "An intensive program focused on mastering core subjects for high-rank performance in NET and GATE examinations.",
    icon: Rocket,
    subOptions: [
      {
        id: "rb_module_1",
        name: "Module 1: Real Analysis & Topology",
        description: "Fundamental analysis and spatial structures.",
        topics: ["Real Analysis", "Metric Space", "General Topology"],
        refs: ["Standard Reference Textbooks", "Rudin", "Munkres", "Kumaresan"]
      },
      {
        id: "rb_module_2",
        name: "Module 2: Algebra",
        description: "Core algebraic structures and linear systems.",
        topics: ["Linear Algebra", "Group Theory", "Ring Theory"],
        refs: ["Standard Reference Textbooks", "Hoffman-Kunze", "Hungerford", "Artin"]
      },
      {
        id: "rb_module_3",
        name: "Module 3: Complex Analysis",
        description: "Study of functions of complex variables.",
        topics: ["Complex Analysis"],
        refs: ["Standard Reference Textbooks", "Rudin", "Conway", "Stein-Shakarchi"]
      },
      {
        id: "rb_module_4",
        name: "Module 4: Applied Mathematics",
        description: "Differential equations and numerical methods.",
        topics: [
          "ODE - PDE",
          "Multivariate Calculus",
          "Calculus Of Variations",
          "Integral Equation",
          "Numerical Analysis",
          "Linear Programming"
        ],
        refs: ["Standard Reference Textbooks"]
      }
    ]
  },
  pioneer: {
    name: "Pioneer Batch for PhD",
    description: "Advanced research-oriented batch with a focus on classical texts and rigorous conceptual depth for PhD interviews.",
    icon: Sparkles,
    subOptions: [
      {
        id: "p_module_1",
        name: "Module 1: Analysis & Topology",
        description: "Rigorous foundations in analysis.",
        topics: ["Real Analysis", "Functions of Several Variables", "Metric Space", "General Topology"],
        refs: ["Rudin (Analysis)", "Munkres (Topology)", "Munkres (Analysis on Manifolds)"]
      },
      {
        id: "p_module_2",
        name: "Module 2: Advanced Algebra",
        description: "Deep dive into linear and abstract structures.",
        topics: ["Linear Algebra", "Group Theory", "Ring Theory", "Module Theory"],
        refs: ["Hoffmann Kunze", "Hungerford", "Artin"]
      },
      {
        id: "p_module_3",
        name: "Module 3: Differential Equations",
        description: "Analytical study of ODEs and PDEs.",
        topics: ["Differential Equations"],
        refs: ["S.L. Ross", "Coddington-Levinson"]
      },
      {
        id: "p_module_4",
        name: "Module 4: Complex Analysis",
        description: "Higher level complex function theory.",
        topics: ["Complex Analysis"],
        refs: ["Conway", "Rudin", "Stein-Shakachi"]
      },
      {
        id: "p_module_5",
        name: "Module 5: Modern Mathematics",
        description: "Research level topics and field theories.",
        topics: ["Measure Theory", "Functional Analysis", "Field Extension and Galois Theory"],
        refs: ["Hungerford (Galois Theory)", "Folland", "IK Rana", "Rudin"]
      }
    ]
  }
};

const PhDEntrances = () => {
  const [selectedBatch, setSelectedBatch] = useState('rank_booster');
  const [selectedModule, setSelectedModule] = useState(CURRICULA.rank_booster.subOptions[0].id);

  const handleBatchChange = (e) => {
    const newVal = e.target.value;
    setSelectedBatch(newVal);
    setSelectedModule(CURRICULA[newVal].subOptions[0].id);
  };

  const targetExams = [
    'CSIR NET Mathematics (JRF)',
    'GATE Mathematics',
    'NBHM PhD Entrance',
    'TIFR GS Mathematics',
    'ISI JRF Selection',
    'CMI PhD Entrance'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const currentBatchData = CURRICULA[selectedBatch];
  const currentModuleData = currentBatchData.subOptions.find(o => o.id === selectedModule);

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>PhD Maths Entrance Coaching West Bengal | TIFR CSIR</title>
        <meta name="description" content="PhD Mathematics entrance coaching in West Bengal. Prepare for TIFR, IIT, IISc, HRI & CSIR NET with faculty who cracked TIFR Mumbai, IIT Madras & Univ of Tokyo." />
        <meta name="keywords" content="phd mathematics coaching west bengal, TIFR coaching kolkata, CSIR NET mathematics coaching, GATE mathematics west bengal, doctoral entrance preparation india" />
        <link rel="canonical" href="https://letsstudyms.com/courses/phd-entrances" />
        <meta property="og:title" content="PhD Maths Entrance Coaching West Bengal | TIFR CSIR" />
        <meta property="og:description" content="Advanced PhD entrance prep for TIFR, IIT, IISc, HRI and CSIR NET. Expert faculty with first-hand experience cracking India's top doctoral programs." />
        <meta property="og:url" content="https://letsstudyms.com/courses/phd-entrances" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PhD Maths Entrance Coaching West Bengal | TIFR CSIR" />
        <meta name="twitter:description" content="Coaching for TIFR, IIT PhD, IISc, HRI and CSIR NET. Expert mentors from India's top math institutes." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"PhD Entrances","item":"https://letsstudyms.com/courses/phd-entrances"}]})}</script>
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
              <Trophy size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase leading-tight">PhD Foundations</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Advanced preparation for doctoral program admissions and research excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight uppercase">Research Track Overview</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our PhD Entrance preparation programs are tailored for aspiring researchers.
                  Whether you need a high rank in competitive exams like NET & GATE via our Rank Booster batch 
                  or deep conceptual mastery with our Pioneer batch, we provide the rigorous training required.
                </p>
              </div>

              {/* ===== PREMIUM ACADEMIC ROADMAP ===== */}
              <div className="mt-12 bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-2xl">
                <div className="bg-secondary/50 p-8 border-b border-border">
                   <h3 className="text-2xl font-black text-primary flex items-center uppercase tracking-tight">
                     <GraduationCap className="mr-3" /> Comprehensive Roadmap
                   </h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-black text-xs text-primary uppercase tracking-[0.2em] mb-4">Pure Portion</h4>
                    <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                      {['Metric Spaces & Topology (30+)', 'Functional Analysis (25+)', 'Complex Analysis (25+)', 'Rings & Modules (30)', 'Group Theory (30)', 'Linear Algebra (40)', 'Real Analysis (40)'].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3" /> {item} classes
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-xs text-primary uppercase tracking-[0.2em] mb-4">Applied Portion</h4>
                    <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                      {['ODE & PDE (30)', 'Numerical Analysis (6)', 'Calculus of Variations (5)', 'Integral Equations (3)', 'LPP (3)'].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3" /> {item} classes
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-primary p-6 text-center">
                   <p className="text-primary-foreground font-black uppercase tracking-widest text-xs">Total 270+ Intensive Classes & Mock PhD Interviews</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group lg:sticky lg:top-32">
               <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <img className="relative w-full h-[600px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="Doctoral research and PhD entrance mathematics preparation at Let's Study MS" loading="lazy" src="https://i.postimg.cc/kMk7Qjvc/pexels_mart_production_8472919.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Curriculum Explorer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="relative text-left">
                <label className="block text-xs font-black text-primary uppercase tracking-widest ml-4 mb-2">Track selection</label>
                <div className="relative">
                  <select 
                    value={selectedBatch} 
                    onChange={handleBatchChange} 
                    className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                  >
                    <option value="rank_booster">Rank Booster (NET & GATE)</option>
                    <option value="pioneer">Pioneer Batch (PhD Research)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                    <ChevronDown size={24} />
                  </div>
                </div>
              </div>

              <div className="relative text-left">
                <label className="block text-xs font-black text-primary uppercase tracking-widest ml-4 mb-2">Module details</label>
                <div className="relative">
                  <select 
                    value={selectedModule} 
                    onChange={(e) => setSelectedModule(e.target.value)} 
                    className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                  >
                    {currentBatchData.subOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                    <ChevronDown size={24} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedBatch}-${selectedModule}`} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              transition={{ duration: 0.5, ease: "circOut" }} 
              className="max-w-6xl mx-auto"
            >
              <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border mb-12 relative overflow-hidden group">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mr-6 ring-1 ring-primary/20">
                    <currentBatchData.icon className="text-primary" size={36} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-primary leading-tight">
                      {currentBatchData.name}
                    </h3>
                    <div className="mt-2 text-xs font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                      {currentModuleData.name}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg italic pl-24 font-medium border-l-2 border-primary/20 ml-8">
                  {currentBatchData.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Topics Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  className="bg-card rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden hover-lift group"
                >
                  <div className="bg-secondary/50 p-6 border-b border-border">
                    <h4 className="font-black text-primary flex items-center text-xl uppercase tracking-tight">
                       <BookOpen size={24} className="mr-3" /> Syllabus Breakdown
                    </h4>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-4">
                      {currentModuleData.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start text-foreground/80 font-medium text-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 mt-1.5 flex-shrink-0" />
                           {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* References Card */}
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} 
                   whileInView={{ opacity: 1, y: 0 }} 
                   className="bg-card rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden hover-lift group"
                >
                   <div className="bg-secondary/50 p-6 border-b border-border">
                     <h4 className="font-black text-primary flex items-center text-xl uppercase tracking-tight">
                        <Library size={24} className="mr-3" /> Recommended Literature
                     </h4>
                   </div>
                   <div className="p-8">
                      <div className="space-y-4">
                         {currentModuleData.refs.map((ref, idx) => (
                           <div key={idx} className="flex items-center p-4 bg-secondary/30 rounded-2xl border border-border group-hover:border-primary/20 transition-all">
                              <Book size={18} className="text-primary mr-4 shrink-0" />
                              <span className="text-foreground text-sm font-medium leading-relaxed italic">{ref}</span>
                           </div>
                         ))}
                      </div>
                      <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/20 text-sm text-foreground/80 font-medium">
                        <p className="font-black mb-2 flex items-center text-primary uppercase tracking-wider"><GraduationCap size={18} className="mr-2" /> Academic Note:</p>
                        "Focus on these specific authors to build the depth required for PhD interviews."
                      </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Target Exams */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Target Examinations</h2>
            <p className="text-muted-foreground text-lg font-medium">Comprehensive preparation for the world's most rigorous mathematics entrances.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
             {targetExams.map((exam, index) => (
               <motion.div 
                 key={index} 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 whileInView={{ opacity: 1, scale: 1 }} 
                 transition={{ delay: index * 0.05 }}
                 className="bg-card p-6 rounded-2xl border-l-[6px] border-primary shadow-sm hover:shadow-xl transition-all font-black text-primary text-sm uppercase tracking-tight text-left"
               >
                 {exam}
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 relative overflow-hidden bg-primary">
          <div className="absolute inset-0 opacity-10 noise-bg" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeInUp}>
              <h2 className="text-6xl font-black text-primary-foreground mb-8 tracking-tighter uppercase leading-none">Begin Your Research Career</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
                 Step beyond the textbook into the frontier of mathematical research.
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

export default PhDEntrances;