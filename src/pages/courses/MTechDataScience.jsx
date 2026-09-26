import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, CheckCircle, ChevronDown, BookOpen,
  Library, Sigma, BarChart, Book, ArrowRight // Added Book icon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// === 1. UPDATED DATA STRUCTURE ===
const CURRICULA = {
  ds: {
    name: "Data Science",
    type: "nested",
    subOptions: [
      {
        id: "cmi_rkmveri",
        name: "M.Sc - CMI / RKMVERI",
        description: "Focus on School Mathematics, Discrete Mathematics, Probability, and Programming basics.",
        topics: [
          {
            title: "School Mathematics",
            items: [
              "Arithmetic and geometric progressions",
              "Arithmetic, geometric, and harmonic means",
              "Polynomials",
              "Matrices: operations, inverse, transpose",
              "Determinants and solving linear equations",
              "Prime numbers, divisibility, GCD, LCM",
              "Modular arithmetic",
              "Logarithms",
              "Functions: domain, range, injective, surjective",
              "Basic calculus: differentiation, maxima–minima, integration"
            ]
          },
          {
            title: "Discrete Mathematics",
            items: [
              "Sets and relations",
              "Permutations and combinations",
              "Counting techniques",
              "Pigeonhole principle",
              "Binomial theorem",
              "Mathematical induction",
              "Boolean logic and truth tables"
            ]
          },
          {
            title: "Probability",
            items: [
              "Basic probability concepts",
              "Conditional probability and Bayes theorem",
              "Random variables",
              "PDFs and CDFs",
              "Common distributions (Gaussian etc.)",
              "Expectation and variance",
              "Summary statistics and basic data interpretation"
            ]
          },
          {
            title: "Programming",
            items: [
              "Reading simple pseudocode",
              "Understanding variables",
              "Conditionals and loops"
            ]
          }
        ],
        // === ADDED REFERENCES HERE ===
        refs: [
          "C. L. Liu – Elements of Discrete Mathematics",
          "Norman Biggs – Discrete Mathematics",
          "Sheldon Ross – A First Course in Probability",
          "Henk Tijms – Understanding Probability",
          "R. G. Dromey – How to Solve it by Computer"
        ]
      },
      {
        id: "gate",
        name: "GATE - Data Science & AI",
        description: "Comprehensive coverage of GATE Data Science & AI syllabus.",
        topics: [
          {
            title: "Probability & Statistics",
            items: [
              "Permutations, combinations",
              "Probability axioms, sample space, events",
              "Independence, mutual exclusivity",
              "Marginal, joint, conditional probability; Bayes",
              "Mean, median, mode, variance, SD; covariance, correlation",
              "Random variables: discrete/continuous",
              "Distributions: Uniform, Bernoulli, Binomial, Poisson, Exponential, Normal, Standard Normal, t, Chi-square",
              "PMF, PDF, CDF, conditional PDF",
              "CLT, Confidence intervals",
              "z-test, t-test, chi-square test"
            ]
          },
          {
            title: "Linear Algebra",
            items: [
              "Vector spaces, subspaces",
              "Linear dependence/independence",
              "Matrices: projection, orthogonal, idempotent, partition",
              "Quadratic forms",
              "Systems of linear equations; Gaussian elimination",
              "Determinant, rank, nullity",
              "Eigenvalues/eigenvectors",
              "LU decomposition, SVD"
            ]
          },
          {
            title: "Calculus & Optimization",
            items: [
              "Limit, continuity, differentiability",
              "Taylor series",
              "Maxima/minima of single-variable functions",
              "Single-variable optimization basics"
            ]
          },
          {
            title: "Programming, DS & Algorithms",
            items: [
              "Python basics",
              "Stacks, queues, linked lists, trees, hash tables",
              "Linear/binary search",
              "Sorting: selection, bubble, insertion, mergesort, quicksort",
              "Graph basics: BFS, DFS, shortest path"
            ]
          },
          {
            title: "DBMS & Data Warehousing",
            items: [
              "ER model, relational model",
              "Relational algebra, tuple calculus, SQL",
              "Constraints, normal forms",
              "File organization, indexing",
              "Data preprocessing: normalization, discretization, sampling, compression",
              "Data warehouse: schemas, hierarchies, measures"
            ]
          },
          {
            title: "Machine Learning",
            items: [
              "Supervised: Regression, Classification (logistic, k-NN, Naive Bayes, LDA), SVM, Decision trees",
              "Bias–variance trade-off",
              "Cross-validation: LOO, k-fold",
              "Neural nets: MLP, feed-forward",
              "Unsupervised: Clustering (k-means, k-medoid, hierarchical), PCA"
            ]
          },
          {
            title: "Artificial Intelligence",
            items: [
              "Search: informed, uninformed, adversarial",
              "Logic: propositional, predicate",
              "Probabilistic reasoning: conditional independence, variable elimination, sampling-based inference"
            ]
          }
        ]
      }
    ]
  },
  isi_mtech: {
    name: "ISI M.Tech (CS, CRS, QROR)",
    type: "nested",
    subOptions: [
      {
        id: "pca",
        name: "PCA",
        description: "Analytical reasoning and fundamental mathematical concepts.",
        topics: [
          {
            title: "General Mathematics",
            items: [
              "Analytical Reasoning",
              "Elementary Number Theory: Divisibility, Congruence, Primality",
              "Elementary Algebra: AP/GP/HP, Inequalities, Binomial/Multinomial Theorem, Polynomials"
            ]
          },
          {
            title: "Linear Algebra",
            items: [
              "Matrices, Determinants, Rank and Inverse",
              "Properties of Symmetric and Idempotent Matrices",
              "Vectors, Eigenvalues and Eigenvectors",
              "Quadratic Forms, System of Linear Equations"
            ]
          },
          {
            title: "Calculus & Geometry",
            items: [
              "Euclidean and Coordinate Geometry: Straight Lines, Circle, Triangles",
              "Calculus: Sequences, Series (Power, Taylor, Maclaurin)",
              "Convergence, Limits, Continuity",
              "Differentiation and Integration, Rolle’s Theorem, MVT, Maxima/Minima"
            ]
          },
          {
            title: "Discrete Math & Logic",
            items: [
              "Elementary Set Theory, Permutations and Combinations",
              "Functions and Relations, Recurrences",
              "Basic Graph Theory: Paths, Cycles, Connected Components, Trees, Digraphs",
              "Mathematical Logic: Boolean Algebra, Propositional Logic, Predicate Logic"
            ]
          },
          {
            title: "Probability & CS Basics",
            items: [
              "Combinatorial Probability, Conditional Probability, Bayes Theorem",
              "Basic Automata Theory: Strings, Languages, Finite State Automata, Regular Expressions",
              "Basic Algorithmic Concepts: Interpreting Simple Pseudocodes"
            ]
          }
        ]
      },
      {
        id: "pcb_non_cs",
        name: "PCB (Non-CS Group)",
        description: "Advanced mathematics and engineering sciences.",
        topics: [
          {
            title: "Topics in Mathematics",
            items: [
              "Logical Reasoning, Functions, Divisibility, Congruences, Primality",
              "Permutations, Combinations, Binomial/Multinomial, Recurrences",
              "Algorithms: Asymptotic Notation, Searching, Sorting, Graph Traversal, MST",
              "Linear Algebra: Systems, Rank, Vector Space, Eigenvalues, Symmetric/Idempotent Matrices",
              "Polynomials (Single and Multiple Variables)",
              "Probability: Combinatorial, Conditional, Bayes, Discrete Random Variables",
              "Graph Theory: Adjacency Matrix/List, Paths, Cycles, Trees, Connectivity, Planar Graphs",
              "Calculus: Sequences, Series, Convergence, Limits, Continuity, Diff/Integration, Max/Min, Several Variables",
              "Automata: Finite Automata, Regular Expressions, Pumping Lemma, PDA, CFG, Turing Machine, Undecidability"
            ]
          },
          {
            title: "Topics in Engineering Sciences",
            items: [
              "Elementary Circuit Theory: Node/Mesh Analysis, KVL/KCL, Superposition, Thevenin’s/Norton’s, Max Power Transfer",
              "Switching Theory & Logic: Boolean min, K-Maps, Quine-McCluskey, Adders, Mux/Demux, ROM, Flip-Flops, Counters, Registers, FSM",
              "Mechanics: Gravitation, Moments of Inertia, Particle Dynamics, Laws of Motion, Elasticity, Friction, Strength of Materials",
              "Thermodynamics: Laws (1st, 2nd, 3rd), Heat Engines, Efficiency, Carnot Cycle"
            ]
          }
        ]
      },
      {
        id: "mma",
        name: "MMA",
        description: "Objective-style higher mathematics.",
        topics: [
          {
            title: "Algebra & Number Theory",
            items: [
              "AP, GP, HP, Continued fractions",
              "Permutations and Combinations, Binomial theorem",
              "Theory of equations, Inequalities (AM-GM, Cauchy-Schwarz)",
              "Complex numbers and De Moivre’s theorem",
              "Elementary Set Theory, Functions and relations",
              "Elementary Number Theory: divisibility, congruence, primality",
              "Group properties, Principle of mathematical induction",
              "Polynomials: remainder theorem, factor theorem"
            ]
          },
          {
            title: "Linear Algebra",
            items: [
              "Matrices: determinant, rank, inverse",
              "Symmetric and idempotent matrices",
              "Eigenvalues and eigenvectors, quadratic forms",
              "System of linear equations"
            ]
          },
          {
            title: "Calculus & Geometry",
            items: [
              "Coordinate geometry: Straight line, Circle, Parabola, Ellipse, Hyperbola",
              "Sequences, Series (Power, Taylor, Maclaurin), convergence",
              "Limits, continuity, differentiation, integration (one variable)",
              "Rolle’s theorem, Mean value theorem, Definite integrals, Maxima/minima",
              "Functions of several variables: limits, continuity, differentiability",
              "Double integrals, Ordinary linear differential equations"
            ]
          },
          {
            title: "Probability & Trig",
            items: [
              "Combinatorial probability, Conditional probability, Bayes theorem",
              "Trigonometric functions and identities"
            ]
          }
        ]
      },
      {
        id: "pqb",
        name: "PQB",
        description: "Part I (Math) and Part II (Statistics or Engineering).",
        topics: [
          {
            title: "PART I: MATHEMATICS",
            items: [
              "Quadratic equation, Roots of polynomial, AP, GP, HP",
              "Divisibility, Prime numbers, Binomial theorem, Inequalities",
              "Permutation and combination, Complex numbers, De Moivre’s",
              "Set theory, Functions, Relations",
              "Matrices: determinant, rank, inverse, symmetric, Eigenvalues",
              "Trigonometry: multiple angles, inverse circular, properties of triangles",
              "Coordinate geometry (2D), Plane geometry, Mensuration",
              "Calculus: Sequences, Series, Limits, Continuity, Diff (max/min), Integration (area)",
              "Ordinary and partial differential equations (up to 2nd order)"
            ]
          },
          {
            title: "PART II (SEC S): STATISTICS",
            items: [
              "Descriptive statistics (univariate, bivariate, multivariate)",
              "Standard univariate probability distributions (Binomial, Poisson, Normal)",
              "Sampling distributions, Estimation, Tests of hypotheses",
              "Simple/Multiple linear regression, ANOVA",
              "Experimental designs (CRD, RBD, LSD)",
              "Non-parametric inference, Categorical data analysis",
              "Sample surveys (simple random, stratified, cluster)"
            ]
          },
          {
            title: "PART II (SEC S): PROBABILITY",
            items: [
              "Classical probability, conditional, independence",
              "Discrete Distributions: Bernoulli, Binomial, Multinomial, Hypergeometric, Poisson, Geometric, Negative Binomial",
              "Continuous Distributions: Uniform, Exponential, Normal, Gamma, Beta",
              "Bivariate distributions (Normal), Marginal/conditional distributions, Correlation/Regression",
              "Multivariate distributions, Order statistics",
              "Weak law of large numbers, Central limit theorem",
              "Basics of Markov chains and Poisson processes"
            ]
          },
          {
            title: "PART II (SEC E): ENGINEERING",
            items: [
              "Mechanics: Forces, trusses, friction, work-energy, moment of inertia, rigid bodies, strength of materials",
              "Thermodynamics: Laws, enthalpy, entropy, free energy, internal combustion engines",
              "Electrical: DC/AC circuits, machines, control theory, network analysis",
              "Electronics: Amplifiers, transistors, op-amps, analog/digital circuits, computer architecture",
              "Engineering Drawing: Projections (point, line, object), sectional views, isometric views"
            ]
          }
        ]
      }
    ]
  },
  isi_msqms: {
    name: "ISI MSQMS",
    type: "flat",
    description: "Master of Science in Quality Management Science entrance preparation.",
    topics: [
      {
        title: "Mathematics",
        items: [
          "Algebra",
          "Calculus",
          "Trigonometry",
          "Coordinate Geometry",
          "Elementary Complex Numbers"
        ]
      },
      {
        title: "Statistics & Reasoning",
        items: [
          "Descriptive Statistics",
          "Probability and Distributions",
          "Analytical Reasoning"
        ]
      }
    ]
  },
  msc_eco: {
    name: "M.Sc. Economics Entrances",
    type: "nested",
    subOptions: [
      {
        id: "full_syllabus",
        name: "Full Syllabus",
        description: "For ISI MSQE / CUET PG / IIT JAM / GATE Economics / MSE / IIFT",
        topics: [
          {
            title: "Mathematics",
            items: [
              "Algebra",
              "Linear Algebra",
              "Calculus"
            ]
          },
          {
            title: "Statistics",
            items: [
              "Elementary probability theory",
              "Measures of central tendency, Dispersion",
              "Correlation and regression",
              "Probability distributions",
              "Standard distributions: Binomial and Normal"
            ]
          },
          {
            title: "Microeconomics",
            items: [
              "Theory of consumer behaviour, Theory of production",
              "Market structure (Perfect competition, Monopoly)",
              "Price discrimination",
              "Duopoly (Cournot and Bertrand)",
              "Elementary strategic interaction",
              "Public goods, Externalities",
              "General equilibrium, Welfare economics"
            ]
          },
          {
            title: "Macroeconomics",
            items: [
              "National income accounting",
              "Simple Keynesian Model of income determination and multiplier",
              "IS-LM Model",
              "Models of aggregate demand and aggregate supply",
              "Money, banking and inflation",
              "Phillips curve",
              "Elementary open economy macroeconomics",
              "Harrod-Domar Model, Solow Model"
            ]
          }
        ]
      }
    ]
  }
};

const MTechDataScience = () => {
  const [selectedComponent, setSelectedComponent] = useState('ds');
  const [selectedSubOption, setSelectedSubOption] = useState('cmi_rkmveri');

  const handleComponentChange = (e) => {
    const newVal = e.target.value;
    setSelectedComponent(newVal);
    if (CURRICULA[newVal].type === 'nested') {
      setSelectedSubOption(CURRICULA[newVal].subOptions[0].id);
    }
  };

  const features = [
    'Quantitative aptitude for GATE preparation',
    'Mathematics for data science programs',
    'Statistics and probability for economics',
    'Linear algebra and optimization techniques',
    'Mock tests modeled on actual exams',
    'Job Interview preparation and case studies'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const getCurrentData = () => {
    const main = CURRICULA[selectedComponent];
    if (main.type === 'nested' && main.subOptions) {
      return main.subOptions.find(o => o.id === selectedSubOption) || main.subOptions[0];
    }
    return main;
  };

  const currentComponentData = getCurrentData();

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>MTech Data Science & Economics Coaching West Bengal</title>
        <meta name="description" content="Expert coaching for MTech, Data Science & MSc Economics entrance exams in West Bengal. Strategic preparation and guidance from ISI and IIT alumni mentors." />
        <link rel="canonical" href="https://letsstudyms.com/courses/mtech-datascience" />
        <meta property="og:title" content="MTech Data Science & Economics Coaching West Bengal" />
        <meta property="og:description" content="Coaching for ISI MTech, GATE Data Science, CMI/RKMVERI Data Science and MSc Economics entrance exams. Mentors from ISI and IIT." />
        <meta property="og:url" content="https://letsstudyms.com/courses/mtech-datascience" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MTech Data Science & Economics Coaching West Bengal" />
        <meta name="twitter:description" content="Coaching for ISI MTech, GATE DA, CMI Data Science, and MSc Economics entrance exams by ISI and IIT alumni." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"MTech/Data Science","item":"https://letsstudyms.com/courses/mtech-datascience"}]})}</script>
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
              <TrendingUp size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase leading-tight">M.Tech | Data Science | Economics</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Specialized interdisciplinary preparation for the world's most sought-after research and technology programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight">Interdisciplinary Mastery</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  This specialized program caters to students aiming for fields that combine mathematics with technology, economics, or data science. We provide focused preparation for the quantitative components of various entrance examinations.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our curriculum is designed by alumni from ISI and IITs who understand the rigorous requirements of these programs, ensuring you're well-prepared for both exams and future research.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
               <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <img className="relative w-full h-[500px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="MTech Data Science, Machine Learning and mathematical analytics preparation" loading="lazy" src="https://i.postimg.cc/BQVQVS3C/pexels_cottonbro_6153354.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-foreground mb-6 tracking-tight">Curriculum Explorer</h2>
            <p className="text-muted-foreground text-lg mb-10">Select your specialization track to explore the deep dive syllabus</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="relative">
                <select 
                  value={selectedComponent} 
                  onChange={handleComponentChange}
                  className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                >
                  {Object.entries(CURRICULA).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                  <ChevronDown size={24} />
                </div>
              </div>

              {CURRICULA[selectedComponent].type === 'nested' ? (
                <div className="relative">
                  <select 
                    value={selectedSubOption} 
                    onChange={e => setSelectedSubOption(e.target.value)}
                    className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                  >
                    {CURRICULA[selectedComponent].subOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                    <ChevronDown size={24} />
                  </div>
                </div>
              ) : <div className="hidden md:block" />}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedComponent}-${selectedSubOption}`} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              transition={{ duration: 0.5, ease: "circOut" }} 
              className="max-w-6xl mx-auto"
            >
              <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border mb-12 relative overflow-hidden group">
                <h3 className="text-4xl font-black text-primary mb-2 flex items-center">
                  <Library className="mr-4" size={36} /> {currentComponentData.name}
                </h3>
                <p className="text-muted-foreground text-lg italic mt-4 font-medium pl-14">
                  {currentComponentData.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentComponentData.topics && currentComponentData.topics.map((category, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-border overflow-hidden hover-lift group"
                  >
                    <div className="bg-secondary/50 p-6 border-b border-border">
                      <h4 className="font-black text-primary flex items-center text-lg">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          {idx % 2 === 0 ? <Sigma size={20} /> : <BarChart size={20} />}
                        </div>
                        {category.title}
                      </h4>
                    </div>
                    <div className="p-8">
                      <ul className="space-y-3">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-foreground/80 font-medium flex items-start text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 mt-1.5 flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              {currentComponentData.refs && (
                <div className="mt-16 bg-card p-10 rounded-[2.5rem] border border-border shadow-2xl">
                   <h4 className="text-2xl font-black text-foreground mb-8 flex items-center">
                     <BookOpen size={28} className="mr-4 text-primary" /> Recommended Literature
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentComponentData.refs.map((book, idx) => (
                        <div key={idx} className="flex items-center p-4 bg-secondary/30 rounded-2xl border border-border hover:border-primary/30 transition-all">
                           <Book size={18} className="text-primary mr-4" />
                           <span className="text-foreground font-medium text-sm">{book}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4">Why Choose Our Program?</h2>
            <p className="text-muted-foreground text-lg">Specialized training for interdisciplinary success in competitive landscapes.</p>
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
              <h2 className="text-5xl font-black text-primary-foreground mb-8">Ready to Transition to Data Science?</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
                Join our specialized program and bridge the gap between mathematics and technology.
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

export default MTechDataScience;