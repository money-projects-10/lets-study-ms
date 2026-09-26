import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Clock, Users, CheckCircle, ArrowRight,
  ChevronDown, BookOpen, Book, ScrollText, Library,
  Layers, Calendar, ChevronRight, GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// CURRICULUM DATA STRUCTURE BASED ON YOUR SPECIFIC SYLLABUS
const CURRICULA = {
  jam: {
    name: "IIT-JAM",
    universities: {
      ju: {
        name: "Jadavpur University",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "winter", title: "Winter", topics: ["Real Analysis I - Sequences and Series of Real Numbers"] },
              { id: "sem4", title: "4th Semester", topics: ["Ordinary Differential Equation- Differential Equations", "Linear Algebra - Basic algebra"] },
              { id: "summer", title: "Summer", topics: ["Integral Analysis - Integral Calculus", "Real Analysis II - Functions of One Real Variable"] },
              { id: "sem5", title: "5th Semester", topics: ["Multivariable Calculus - Functions of Two or Three Real Variables", "Group Theory"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      },
      cu: {
        name: "Calcutta University",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "sem3", title: "Semester 3", topics: ["Real Analysis I", "Ordinary Differential Equations I", "Group Theory I"] },
              { id: "sem4", title: "Semester 4", topics: ["Real Analysis II", "Multivariable Calculus I", "Group Theory I"] },
              { id: "sem5", title: "Semester 5", topics: ["Linear Algebra I", "Real Analysis III and Series of functions"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      },
      sxu: {
        name: "St. Xavier's College",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "winter_4", title: "Winter + Sem 4", topics: ["Real Analysis", "Group Theory: Revision", "Ring Theory", "ODE", "Numerical Analysis"] },
              { id: "summer", title: "Summer Break", topics: ["Real Analysis: Sequence and Series", "Group Theory: Problems & Revision", "Linear Algebra", "PYQs"] },
              { id: "sem5", title: "5th Semester", topics: ["Linear algebra problems", "Multivariable Calculus", "Metric Spaces (Generalising Real Analysis)", "Differential Geometry"] },
              { id: "winter_rev", title: "Winter Break", topics: ["Revision", "Applied Mathematics", "January: Mock Tests"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "winter_6", title: "Winter + Sem 6", topics: ["Vector Calculus", "ODE & PDE", "Linear Algebra"] },
              { id: "summer_7", title: "Summer + Sem 7", topics: ["Real Analysis (JAM Syllabus)", "Group Theory (JAM Syllabus)", "Ring Theory (JAM 2027 update check)"] },
              { id: "final", title: "Winter Break", topics: ["Final Revisions", "Mock Test Series"] }
            ]
          }
        }
      },
      pu: {
        name: "Presidency University",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "winter", title: "Winter", topics: ["Differential Equations"] },
              { id: "sem4", title: "4th Semester", topics: ["Real Analysis I - Sequences and Series", "Linear Algebra - Basic algebra"] },
              { id: "summer", title: "Summer", topics: ["Integral Calculus", "Real Analysis II - Functions of One Real Variable"] },
              { id: "sem5", title: "5th Semester", topics: ["Multivariable Calculus", "Group Theory"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      },
      common: {
        name: "Common Track",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "sem3", title: "Semester 3", topics: ["Real Analysis I", "Ordinary Differential Equations I", "Group Theory I"] },
              { id: "sem4", title: "Semester 4", topics: ["Real Analysis II", "Multivariable Calculus I", "Group Theory I"] },
              { id: "sem5", title: "Semester 5", topics: ["Linear Algebra I", "Real Analysis III and Series of functions"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      }
    }
  },
  tifr: {
    name: "M.Math / TIFR",
    universities: {
      ju: {
        name: "Jadavpur University",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "winter", title: "Winter", topics: ["Real Analysis I - Sequences and Series"] },
              { id: "sem4", title: "4th Semester", topics: ["Ordinary Differential Equation", "Linear Algebra - Basic algebra"] },
              { id: "summer", title: "Summer Break", topics: ["Integral Analysis - Integral Calculus", "Real Analysis II"] },
              { id: "sem5", title: "5th Semester", topics: ["Multivariable Calculus", "Group Theory"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      },
      cu: {
        name: "Calcutta University",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "sem3", title: "Semester 3", topics: ["Real Analysis I", "Ordinary Differential Equations I ", "Group Theory I"] },
              { id: "sem4", title: "Semester 4", topics: ["Real Analysis II ", "Multivariable Calculus I", "Group Theory II", "Ring Theory I"] },
              { id: "sem5", title: "Semester 5", topics: ["Linear Algebra I", "Real Analysis III", "Series of Functions", "Ring Theory II"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["TBA"] },
              { id: "sem7", title: "Semester 7", topics: ["TBA"] }
            ]
          }
        }
      },
      sxu: {
        name: "St. Xavier's College",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "winter_4", title: "Winter + Sem 4", topics: ["Real Analysis", "Group Theory (Revision)", "Ring Theory", "ODE", "Numerical Analysis"] },
              { id: "summer", title: "Summer Break", topics: ["Real Analysis: Sequence & Series", "Group Theory Problems", "Linear Algebra", "PYQs"] },
              { id: "sem5", title: "5th Semester", topics: ["Linear algebra problems", "Multivariable Calculus", "Metric Spaces", "Differential Geometry"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year & Advance",
            sections: [
              { id: "winter_6", title: "Winter + Sem 6", topics: ["Vector Calculus", "ODE PDE", "Linear Algebra"] },
              { id: "summer_7", title: "Summer + Sem 7", topics: ["JAM Level Real Analysis", "JAM Level Group Theory", "Ring Theory"] },
              { id: "mmath", title: "M.Math/ IISER Special", topics: ["Ring Theory (Advanced)", "Metric Spaces", "Group actions & Sylow Theorems"] }
            ]
          }
        }
      },
      pu: {
        name: "Presidency University",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "winter", title: "Winter Break", topics: ["Differential Equations"] },
              { id: "sem4", title: "4th Semester", topics: ["Real Analysis I", "Linear Algebra"] },
              { id: "summer", title: "Summer Break", topics: ["Integral Calculus", "Real Analysis II"] },
              { id: "sem5", title: "5th Semester", topics: ["Multivariable Calculus", "Group Theory"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      },
      common: {
        name: "Common Track",
        years: {
          year2: {
            title: "Undergrad 2nd Year",
            sections: [
              { id: "sem3", title: "Semester 3", topics: ["Real Analysis I", "ODE I", "Group Theory I"] },
              { id: "sem4", title: "Semester 4", topics: ["Real Analysis II", "Multivariable Calculus I", "Group Theory II", "Ring Theory I"] },
              { id: "sem5", title: "Semester 5", topics: ["Linear Algebra I", "Real Analysis III", "Ring Theory II"] }
            ]
          },
          year3: {
            title: "Undergrad 3rd Year",
            sections: [
              { id: "sem6", title: "Semester 6", topics: ["To be announced"] },
              { id: "sem7", title: "Semester 7", topics: ["To be announced"] }
            ]
          }
        }
      }
    }
  }
};

const MScMathematics = () => {
  const [selectedComponent, setSelectedComponent] = useState('jam');
  const [selectedUni, setSelectedUni] = useState('common');

  const features = [
    'IIT JAM comprehensive preparation',
    'University-specific entrance exam coaching',
    'Advanced problem-solving techniques',
    'Regular full-length mock tests',
    'Previous year paper analysis (10+ years)',
    'M.Sc / Integrated PhD Interview preparation and guidance'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const currentData = CURRICULA[selectedComponent].universities[selectedUni];

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>MSc Maths Entrance Coaching | IIT JAM, TIFR & ISI</title>
        <meta name="description" content="Top MSc Mathematics entrance coaching in West Bengal. Prepare for IIT JAM, TIFR, ISI MMath, NBHM & CMI. Learn from faculty from IIT Kanpur and ISI Kolkata." />
        <link rel="canonical" href="https://letsstudyms.com/courses/msc-mathematics" />
        <meta property="og:title" content="MSc Maths Entrance Coaching | IIT JAM, TIFR & ISI" />
        <meta property="og:description" content="Comprehensive coaching for IIT JAM, TIFR, ISI MMath, NBHM and CMI entrance exams. Expert faculty from IIT Kanpur and ISI Kolkata." />
        <meta property="og:url" content="https://letsstudyms.com/courses/msc-mathematics" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MSc Maths Entrance Coaching | IIT JAM, TIFR & ISI" />
        <meta name="twitter:description" content="Expert coaching for IIT JAM, TIFR, ISI MMath, NBHM and CMI in West Bengal. Proven results." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"MSc Mathematics","item":"https://letsstudyms.com/courses/msc-mathematics"}]})}</script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 ring-1 ring-primary/20">
              <Brain size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase">M.Sc Mathematics</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Master entrance exams for India's most prestigious mathematics programs with specialized university-aligned preparation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight">Pathway to Excellence</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our M.Sc Mathematics Entrance program is designed to help you crack the most competitive entrance exams in India. We provide comprehensive coverage of all topics with special emphasis on problem-solving skills.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With our proven track record and expert faculty who are alumni of premier institutions, we ensure that you're fully prepared to secure admission in top universities.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
               <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <img className="relative w-full h-[500px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="MSc Mathematics entrance exam preparation for IIT JAM, TIFR and ISI" loading="lazy" src="https://i.postimg.cc/rmDD3mmr/pexels_ian_panelo_3729557.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">Entrance Roadmap</h2>
            <p className="text-muted-foreground text-lg mb-10">Select your target exam and university to view the detailed timeline</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="relative">
                <select 
                  value={selectedComponent} 
                  onChange={e => setSelectedComponent(e.target.value)}
                  className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                >
                  <option value="jam">IIT-JAM</option>
                  <option value="tifr">M.Math / TIFR</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                  <ChevronDown size={24} />
                </div>
              </div>

              <div className="relative">
                <select 
                  value={selectedUni} 
                  onChange={e => setSelectedUni(e.target.value)}
                  className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                >
                  <option value="common">Common Track</option>
                  <option value="ju">Jadavpur University</option>
                  <option value="cu">Calcutta University</option>
                  <option value="sxu">St. Xavier's College</option>
                  <option value="pu">Presidency University</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                  <ChevronDown size={24} />
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedComponent}-${selectedUni}`} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              transition={{ duration: 0.5, ease: "circOut" }} 
              className="max-w-6xl mx-auto"
            >
              <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border mb-12 relative overflow-hidden group">
                <h3 className="text-4xl font-black text-primary mb-2 flex items-center">
                  <Library className="mr-4" size={36} /> {CURRICULA[selectedComponent].name} 
                  <ChevronRight className="mx-4 text-muted-foreground opacity-30" size={24} /> 
                  <span className="text-foreground">{currentData.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mt-4">2026-2027 Academic Roadmap</p>
              </div>

              {Object.keys(currentData.years).map((yearKey) => (
                <div key={yearKey} className="mb-20">
                  <div className="flex items-center mb-10">
                    <div className="w-14 h-14 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mr-6 shadow-xl shadow-primary/20">
                      {yearKey === 'year2' ? <Layers size={28} /> : <GraduationCap size={28} />}
                    </div>
                    <h3 className="text-3xl font-black text-foreground tracking-tight">{currentData.years[yearKey].title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentData.years[yearKey].sections.map((section, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: idx * 0.05 }}
                        className="bg-card rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden hover-lift group"
                      >
                        <div className="bg-secondary/50 p-5 border-b border-border">
                          <h4 className="font-black text-xs uppercase tracking-widest text-primary flex items-center">
                            <Calendar size={14} className="mr-2" /> {section.title}
                          </h4>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-3">
                            {section.topics.map((topic, tIdx) => (
                              <li key={tIdx} className="text-sm text-foreground/80 font-medium flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 mt-1.5 flex-shrink-0" /> {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4">Complete Package</h2>
            <p className="text-muted-foreground text-lg">Everything you need to secure your seat in top institutions.</p>
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
              <h2 className="text-5xl font-black text-primary-foreground mb-8">Ready to Master Entrance Exams?</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
                Join our premium entrance preparation program and take the first step towards your dream university.
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

export default MScMathematics;