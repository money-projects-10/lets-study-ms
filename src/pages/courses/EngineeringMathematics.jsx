import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Clock, Users, CheckCircle, ArrowRight,
  ChevronDown, BookOpen, Library, GraduationCap,
  Calculator, Sigma, Book, ScrollText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Curriculum Data Updated with accurate content
const CURRICULA = {
  gate: {
    name: "Mathematics for GATE",
    description: "Engineering Mathematics for GATE (CSE/ IT/ Electrical/ Mechanical/ Civil/ Electronics and Instrumentation/ Architecture).",
    type: "nested_topics",
    subOptions: [
      {
        id: "linear_algebra",
        name: "1. Linear Algebra",
        description: "Required for all branches; CSE/ IT needs deeper theory",
        topics: [
          "Matrices and Vectors", "Matrix Algebra", "Systems of Linear Equations",
          "Rank of a Matrix", "Determinants", "Eigenvalues & Eigenvectors",
          "Characteristic Polynomial", "Diagonalization", "Cayley–Hamilton Theorem",
          "Vector Spaces & Subspaces", "Basis & Dimension", "Linear Transformations"
        ]
      },
      {
        id: "calculus",
        name: "2. Calculus",
        description: "Very important for ECE/ EE/ ME and Civil (CSE uses only small parts)",
        topics: [
          "Limits & Continuity", "Mean Value Theorems", "Maxima & Minima (Single-variable)",
          "Taylor series", "Partial & Total derivatives", "Jacobians, Hessians",
          "Lagrange multipliers", "Indefinite & Definite integrals", "Improper integrals",
          "Area & Volume", "Gradient, Divergence, Curl", "Directional derivatives", "Line, Surface & Volume integrals",
          "Green’s, Stokes’ & Gauss Divergence Theorem"
        ]
      },
      {
        id: "differential_eq",
        name: "3. Differential Equations",
        description: "Civil/ Mechanical require PDEs heavily",
        topics: [
          "First-order ODEs", "Second-order ODEs (Constant Coefficients)",
          "Homogeneous & Non-homogeneous equations", "Cauchy–Euler equations",
          "Laplace transforms", "Formation of PDEs", "Linear PDEs",
          "Heat, Wave and Laplace Equations"
        ]
      },
      {
        id: "complex_analysis",
        name: "4. Complex Analysis",
        description: "Needed for ECE/ EE/ ME/ CIVIL, not for CSE",
        topics: [
          "Analytic functions", "Cauchy–Riemann equations", "Line integrals",
          "Cauchy Integral Formula", "Taylor & Laurent series", "Residue theorem",
          "Evaluation of real integrals using residues"
        ]
      },
      {
        id: "probability",
        name: "5. Probability & Statistics",
        description: "CSE/ IT require probability for algorithms/ ML; ECE/ EE heavily for signals; CE/ ME moderate",
        topics: [
          "Random variables (Discrete & Continuous)", "PDF & CDF",
          "Expectation, Variance, Moments", "Joint distributions",
          "Covariance & Correlation", "Law of Large Numbers &  Central Limit Theorem",
          "Distributions (Bernoulli, Binomial, Poisson, Geometric, Exponential, Normal)",
          "Hypothesis testing (Basic)", "Conditional probability", "Bayes' theorem"
        ]
      },
      {
        id: "numerical_methods",
        name: "6. Numerical Methods",
        description: "Important across all engineering branches",
        topics: [
          "Solution of Nonlinear equations (Newton–Raphson, Bisection, etc.)",
          "Numerical integration (Trapezoidal, Simpson)",
          "Interpolation (Lagrange, Newton)", "Numerical differentiation",
          "Solution of ODEs (Euler, Runge-Kutta)", "Error analysis"
        ]
      },
      {
        id: "vector_calculus",
        name: "7. Vector Calculus",
        description: "Heavily used in EE, ECE, Mechanical, Civil",
        topics: [
          "Vector operations", "Dot & Cross product", "Scalar & Vector triple product",
          "Gradient, divergence, curl", "Line & surface integrals",
          "Orthogonal curvilinear coordinates", "Green's theorem", "Stokes theorem"
        ]
      },
      {
        id: "fourier_series",
        name: "8. Fourier Series & Transforms",
        description: "Essential in ECE/ EE/ ME",
        topics: [
          "Fourier series", "Even/ Odd Functions", "Half-range expansions", "Fourier transform basics", "Applications in PDEs & signals"
        ]
      },
      {
        id: "laplace_transform",
        name: "9. Laplace Transform",
        description: "Essential in ECE/ EE/ ME",
        topics: [
          "Laplace Definition & properties", "Inverse Laplace", "Convolution",
          "Solving ODEs using Laplace"
        ]
      },
      {
        id: "discrete_math",
        name: "10. Discrete Mathematics",
        description: "CSE/ IT only, but included since you want combined",
        topics: [
          "Sets, relations, functions", "Propositional & predicate logic", "Satisfiability", "Quantifiers",
          "Combinatorics (Permutation, Combination, Pigeonhole  principle, Inclusion-Exclusion)",
          "Graph Theory (Trees, Connectivity, Coloring)", "Eulerian & Hamiltonian graphs", "Spanning trees", "Planarity", "Adjacency & incidence matrices",
          "Algebraic Structures (Groups, Rings, Fields (Basic))", "Equivalence relations", "Partial orders"
        ]
      }
    ]
  },
  semester: {
    name: "Semester Support",
    description: "Semester-wise batches available for various universities including JU, MAKAUT, and more.",
    type: "university_semester",
    subOptions: [
      {
        id: "ju_makaut",
        name: "University Curriculum",
        description: "Focusing on university-specific marking patterns and previous year questions.",
        semesters: [
          { title: "Calculus", topics: ["Limits", "Differentiation", "Integration", "Multivariable Calculus"] },
          { title: "Linear Algebra", topics: ["Matrices", "Determinants", "Vector Spaces", "Eigenvalues"] },
          { title: "Differential Equations", topics: ["First & Second Order ODEs", "Formation of PDEs"] },
          { title: "Probability & Statistics", topics: ["Random Variables", "Distributions", "Hypothesis Testing"] },
          { title: "Complex Analysis", topics: ["Complex Numbers", "Analytic Functions (Basic)"] },
          { title: "Numerical Methods", topics: ["Root Finding", "Interpolation", "Numerical Integration"] },
          { title: "Discrete Mathematics", topics: ["Logic & Proofs", "Sets & Relations", "Graphs (mainly for CS)"] }
        ]
      }
    ]
  }
};

const EngineeringMathematics = () => {
  const [selectedComponent, setSelectedComponent] = useState('gate');
  const [selectedSubOption, setSelectedSubOption] = useState('linear_algebra');
  const [selectedUni, setSelectedUni] = useState('ju_makaut');

  const handleComponentChange = (e) => {
    const newVal = e.target.value;
    setSelectedComponent(newVal);
    if (newVal === 'gate') {
      setSelectedSubOption(CURRICULA.gate.subOptions[0].id);
    } else {
      setSelectedUni(CURRICULA.semester.subOptions[0].id);
    }
  };

  const features = [
    'Comprehensive coverage for all engineering branches',
    'Application-oriented problem solving',
    'GATE Mathematics preparation (Core Theory + Shortcuts)',
    'University exam-focused teaching (JU, MAKAUT, etc.)',
    'Branch-specific depth (CSE Theory vs ECE Signals)',
    'Doubt clearing and revision sessions'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const currentData = CURRICULA[selectedComponent];

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>Engineering Maths Coaching West Bengal | GATE Prep</title>
        <meta name="description" content="Engineering Mathematics coaching in West Bengal. Expert GATE maths prep, semester support for JU, MAKAUT and more. Theory and shortcuts by experienced faculty." />
        <link rel="canonical" href="https://letsstudyms.com/courses/engineering-mathematics" />
        <meta property="og:title" content="Engineering Maths Coaching West Bengal | GATE Preparation" />
        <meta property="og:description" content="GATE engineering mathematics preparation and semester coaching for JU, MAKAUT students. Expert faculty, branch-specific depth." />
        <meta property="og:url" content="https://letsstudyms.com/courses/engineering-mathematics" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Engineering Maths Coaching West Bengal | GATE Prep" />
        <meta name="twitter:description" content="GATE engineering mathematics and semester exam coaching in West Bengal. Expert faculty for JU, MAKAUT and all branches." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"Engineering Mathematics","item":"https://letsstudyms.com/courses/engineering-mathematics"}]})}</script>
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
              <Award size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase leading-tight">Engineering Mathematics</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Comprehensive training for GATE and Semester exams (JU, MAKAUT & More). Excellence in technical foundations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight uppercase">Strategic Foundations</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our Engineering Mathematics program is designed to help students excel in GATE as well as semester examinations of universities such as Jadavpur University (JU), MAKAUT, and other leading engineering institutions.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The course focuses on building strong conceptual foundations while training students to solve problems with speed, accuracy, and clarity. Guided by expert faculty, you gain the depth and confidence required to score high and stand out.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
               <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <img className="relative w-full h-[500px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="Engineering mathematics and GATE mathematics coaching students" loading="lazy" src="https://i.postimg.cc/8chj7RsB/pexels-jeswin-3380743.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Curriculum Explorer</h2>
            <p className="text-muted-foreground text-lg mb-10">Select your program track to explore modules</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="relative">
                <select 
                  value={selectedComponent} 
                  onChange={handleComponentChange}
                  className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                >
                  <option value="gate">Mathematics for GATE</option>
                  <option value="semester">Semester Support</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                  <ChevronDown size={24} />
                </div>
              </div>

              {currentData.type === 'nested_topics' && (
                <div className="relative">
                  <select 
                    value={selectedSubOption} 
                    onChange={e => setSelectedSubOption(e.target.value)}
                    className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                  >
                    {currentData.subOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                    <ChevronDown size={24} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedComponent}-${selectedSubOption}-${selectedUni}`} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              transition={{ duration: 0.5, ease: "circOut" }} 
              className="max-w-6xl mx-auto"
            >
              {currentData.type === 'nested_topics' && (() => {
                const topicData = currentData.subOptions.find(o => o.id === selectedSubOption);
                return (
                  <div className="space-y-12">
                     <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border relative overflow-hidden group">
                        <h3 className="text-4xl font-black text-primary mb-2 flex items-center">
                          <Calculator className="mr-4" size={36} /> {topicData.name}
                        </h3>
                        <p className="text-muted-foreground text-lg ml-14 font-medium italic">
                          {topicData.description}
                        </p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topicData.topics.map((t, idx) => (
                           <motion.div 
                             key={idx}
                             initial={{ opacity: 0, scale: 0.95 }}
                             whileInView={{ opacity: 1, scale: 1 }}
                             transition={{ delay: idx * 0.05 }}
                             className="bg-card p-5 rounded-2xl border border-border hover:border-primary/30 transition-all flex items-center shadow-sm"
                           >
                             <Sigma size={18} className="text-primary mr-3 flex-shrink-0" />
                             <span className="text-foreground font-medium text-sm">{t}</span>
                           </motion.div>
                        ))}
                     </div>
                  </div>
                );
              })()}

              {currentData.type === 'university_semester' && (() => {
                const uniData = currentData.subOptions.find(o => o.id === selectedUni);
                return (
                  <div className="space-y-16">
                    <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border relative overflow-hidden group text-center max-w-3xl mx-auto">
                      <h3 className="text-4xl font-black text-primary mb-2 inline-flex items-center">
                        <Library className="mr-4" size={36} /> {uniData.name}
                      </h3>
                      <p className="text-muted-foreground text-lg font-medium italic mt-4">{uniData.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {uniData.semesters.map((sem, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-card rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden group hover-lift"
                        >
                          <div className="bg-primary p-6">
                            <h4 className="font-black text-primary-foreground text-xl tracking-tight uppercase">{sem.title}</h4>
                          </div>
                          <div className="p-8">
                            <h5 className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center">
                               <ScrollText size={16} className="mr-2" /> Detailed Syllabus
                            </h5>
                            <ul className="space-y-4">
                              {sem.topics.map((t, i) => (
                                <li key={i} className="flex items-start text-foreground/80 font-medium text-sm">
                                   <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 mt-1.5 flex-shrink-0" />
                                   {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Why Partner With Us?</h2>
            <p className="text-muted-foreground text-lg font-medium">Strategic guidance for both academic excellence and competitive rank.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                {...fadeInUp} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="bg-card p-8 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CheckCircle size={28} />
                </div>
                <p className="text-foreground text-left font-bold text-lg leading-tight tracking-tight uppercase">{feature}</p>
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
              <h2 className="text-6xl font-black text-primary-foreground mb-8 tracking-tighter uppercase leading-none">Elevate Your Engineering Rank</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
                Master the core of technology with our expert-led mathematics program.
              </p>
              <Link to="/contact">
                <button className="bg-primary-foreground text-primary hover:scale-105 transition-all font-black px-12 py-5 rounded-2xl text-lg shadow-2xl flex items-center mx-auto uppercase tracking-widest">
                  Get Started Today <ArrowRight className="ml-3" size={24} />
                </button>
              </Link>
            </motion.div>
          </div>
      </section>

      <Footer />
    </div>

  );
};

export default EngineeringMathematics;