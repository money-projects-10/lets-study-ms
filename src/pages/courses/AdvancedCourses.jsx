import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, CheckCircle, ChevronDown, BookOpen,
  Library, GraduationCap, Sigma, Binary, Box, Layers, Book
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// === CDN LOADER ===
const Latex = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadKatex = () => {
      if (window.katex) {
        setIsLoaded(true);
        return;
      }
      if (!document.getElementById('katex-css')) {
        const link = document.createElement('link');
        link.id = 'katex-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
        document.head.appendChild(link);
      }
      if (!document.getElementById('katex-js')) {
        const script = document.createElement('script');
        script.id = 'katex-js';
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
      } else {
        const check = setInterval(() => {
          if (window.katex) {
            setIsLoaded(true);
            clearInterval(check);
          }
        }, 100);
      }
    };
    loadKatex();
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current && window.katex) {
      const text = children || "";
      const parts = text.split(/(\\\[.*?\\\]|\\\(.*?\\\))/);

      const html = parts.map(part => {
        if (part.startsWith('\\(') || part.startsWith('\\[')) {
          const math = part.replace(/^\\\(|\\\)$|^\\\[|\\\]$/g, "");
          const displayMode = part.startsWith('\\[');
          try {
            return window.katex.renderToString(math, { displayMode, throwOnError: false });
          } catch (e) {
            return part;
          }
        }
        return part;
      }).join("");

      containerRef.current.innerHTML = html;
    } else if (containerRef.current) {
      containerRef.current.innerText = children;
    }
  }, [children, isLoaded]);

  return <span ref={containerRef} />;
};

// This function strips ALL LaTeX syntax for the dropdown menu
const cleanText = (text) => {
  if (!text) return "";
  return text
    // 1. Replace specific symbols manually if needed
    .replace(/\\wp/g, "P")
    // 2. Remove Math wrappers
    .replace(/\\\(|\\\)|\\\[|\\\]/g, "")
    // 3. Remove commands like \mathfrak, \mathbb, \text but keep the content inside { }
    // Example: \mathfrak{sl} becomes {sl}, which lets step 4 clean it to "sl"
    .replace(/\\[a-zA-Z]+/g, "")
    // 4. Remove all syntax characters: _, ^, {, }
    .replace(/[_^{}]/g, "")
    // 5. Collapse multiple spaces into one
    .replace(/\s+/g, " ")
    .trim();
};

// === CURRICULUM DATA ===
const CURRICULA = {
  commutative_algebra: {
    name: "Commutative Algebra",
    description: "Advanced study of rings, ideals, and modules.",
    icon: Binary,
    subOptions: [
      {
        id: "ca_1",
        name: "Commutative Algebra I",
        topics: [
          "Rings and Ideals and modules",
          "Localization",
          "Primary Decomposition"
        ],
        refs: ["M.F. Atiyah, I.G. MacDonald, 1969, Introduction to Commutative Algebra", "Matsumara Hideyuki, Commutative Ring Theory"]
      },
      {
        id: "ca_2",
        name: "Commutative Algebra II",
        topics: [
          "Noetherian and Artinian Rings",
          "Discrete Valuation Rings and Dedekind Domains",
          "Completions",
          "Dimension Theory"
        ],
        refs: ["M.F. Atiyah, I.G. MacDonald, 1969, Introduction to Commutative Algebra", "Matsumara Hideyuki, Commutative Ring Theory", "Zariski & Samuel, Commutative Algebra I & II"]
      },
      {
        id: "ca_3",
        name: "Homological Methods",
        topics: [
          "Grade of an Ideal",
          "Regular Sequences and Depth",
          "Depth and Homological Algebra",
          "Cohen–Macaulay Modules and Rings",
          "Characterizations and Properties"
        ],
        refs: ["M.F. Atiyah, I.G. MacDonald, 1969, Introduction to Commutative Algebra", "Matsumara Hideyuki, Commutative Ring Theory", "Bruns-Herzog, Cohen-Macaulay Rings"]
      }
    ]
  },
  algebraic_topology: {
    name: "Algebraic Topology",
    description: "Study of topological spaces using algebraic methods.",
    icon: Box,
    subOptions: [
      {
        id: "at_foundations",
        name: "Foundations",
        topics: [
          "Quotient Topology",
          "Identification Spaces",
          "Topological Groups",
          "Groups acting on topological spaces"
        ],
        refs: ["Edwin H. Spanier, 1966, Algebraic Topology", "Allen Hatcher, Algebraic Topology, 2003", "M.A. Armstrong, Basic Topology"]
      },
      {
        id: "at_1",
        name: "Algebraic Topology I",
        topics: [
          "Homotopy and the Fundamental Group",
          "Covering Spaces and Fibrations",
          "Polyhedra and Simplicial Theory"
        ],
        refs: ["Edwin H. Spanier, 1966, Algebraic Topology", "Allen Hatcher, Algebraic Topology, 2003"]
      },
      {
        id: "at_2",
        name: "Algebraic Topology II",
        topics: [
          "Homology",
          "Products",
          "General Cohomology Theory and Duality"
        ],
        refs: ["Edwin H. Spanier, 1966, Algebraic Topology", "Allen Hatcher, Algebraic Topology, 2003"]
      }
    ]
  },
  algebraic_geometry: {
    name: "Algebraic Geometry",
    description: "The study of zeros of multivariate polynomials.",
    icon: Layers,
    subOptions: [
      {
        id: "ag_1",
        name: "Course 1 - Varieties",
        topics: [
          "Affine Varieties",
          "Projective Varieties",
          "Morphisms",
          "Rational Map",
          "Nonsingular Varieties",
          "Nonsingular Curves",
          "Intersections in Projective Space",
          "What Is Algebraic Geometry?"
        ],
        refs: ["Robin Hartshorne, Algebraic Geometry", "Joe Harris, Algebraic Geometry", "Igor R. Shafarevich, Basic Algebraic Geometry I"]
      },
      {
        id: "ag_2",
        name: "Course 2 - Schemes",
        topics: [
          "Sheaves",
          "Schemes",
          "First Properties of Schemes",
          "Separated and proper Morphisms",
          "Sheaves of Modules",
          "Divisors",
          "Projective Morphisms",
          "Differentials",
          "Formal Schemes"
        ],
        refs: ["Robin Hartshorne, Algebraic Geometry", "Igor R. Shafarevich, Basic Algebraic Geometry II"]
      }
    ]
  },
  representation_theory: {
    name: "Representation Theory",
    description: "Study of abstract algebraic structures by representing their elements as linear transformations.",
    icon: Sigma,
    subOptions: [
      {
        id: "week_1",
        name: "Week 1 — Foundations",
        topics: [
          "Groups, algebras, modules",
          "Representations over \\(\\mathbb{C}\\)",
          "Subrepresentations, quotient representations",
          "Homomorphisms, irreducibility",
          "Core Results: Maschke’s theorem, Schur’s lemma"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_2",
        name: "Week 2 — Complete Reducibility",
        topics: [
          "Semisimple modules",
          "Isotypic components",
          "Projection onto irreducible summands",
          "Endomorphism rings of simple modules",
          "Core Result: Every finite group representation over \\(\\mathbb{C}\\) is semisimple"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_3",
        name: "Week 3 — Characters I",
        topics: [
          "Character of a representation",
          "Class functions",
          "Conjugacy classes",
          "Orthogonality relations (1)",
          "Regular representation",
          "Core Results: Number of irreducibles = number of conjugacy classes"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_4",
        name: "Week 4 — Characters II",
        topics: [
          "Matrix coefficients",
          "Orthogonality relations (full set)",
          "Decomposition of tensor products, symmetric/exterior powers",
          "Induced representations (definition)",
          "Core Method: Using characters to compute multiplicities"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_5",
        name: "Week 5 — Induced & Restricted Representations",
        topics: [
          "Frobenius reciprocity",
          "Mackey decomposition (statement)",
          "Examples: Representations of \\( D_n, S_3, S_4, Q_8, A_5 \\) via induction",
          "Regular representation of subgroups"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_6",
        name: "Week 6 — Representation Theory of \\( S_n \\)",
        topics: [
          "Young diagrams, partitions",
          "Young symmetrizers",
          "Specht modules",
          "Hook-length formula",
          "Branching rules",
          "Frobenius character formula (outline)"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_7",
        name: "Week 7 — Rep. Theory of \\( SO(2), O(2), SU(2) \\)",
        topics: [
          "Motivation for Lie groups",
          "Continuous representations",
          "Characters of compact groups",
          "Peter–Weyl theorem (statement)",
          "Example: Irreducible representation of \\( SU(2) \\) = symmetric powers of the standard 2-d representation"
        ],
        refs: ["Fulton & Harris — Representation Theory", "Serre — Linear Representations of Finite Groups"]
      },
      {
        id: "week_8",
        name: "Week 8 — Introduction to Lie Algebra Representations",
        topics: [
          "Lie algebras, homomorphisms",
          "Universal enveloping algebra",
          "Representations as modules over \\( U(\\mathfrak{g}) \\)",
          "\\( \\mathfrak{sl}_2(\\mathbb{C}) \\): structure, basis, commutation"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      },
      {
        id: "week_9",
        name: "Week 9 — \\( \\mathfrak{sl}_2(\\mathbb{C}) \\) Representation Theory",
        topics: [
          "Weight spaces",
          "Highest weight theory (\\( \\mathfrak{sl}_2 \\) version)",
          "Classification of finite-dimensional irreps",
          "Clebsch–Gordan decomposition"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      },
      {
        id: "week_10",
        name: "Week 10 — Root Systems & Semisimple Lie Algebras",
        topics: [
          "Cartan subalgebra",
          "Roots, weights",
          "Weyl group (definition and examples)",
          "\\( \\mathfrak{sl}_n, \\mathfrak{so}_n, \\mathfrak{sp}_n \\)",
          "Goal: Enough theory to motivate highest weights"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      },
      {
        id: "week_11",
        name: "Week 11 — Highest Weight Theory (General Case)",
        topics: [
          "Dominant integral weights",
          "Construction of highest weight modules",
          "Weyl character formula (statement, simple proofs in low rank)"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      },
      {
        id: "week_12",
        name: "Week 12 — Representations of Algebras",
        topics: [
          "Associative algebras",
          "Group algebra \\( \\mathbb{C}[G] \\) as semisimple algebra (Wedderburn)",
          "Jacobson radical",
          "Simple modules and matrix blocks",
          "Artin–Wedderburn for finite-dimensional semisimple algebras"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      },
      {
        id: "week_13",
        name: "Week 13 — Fourier Analysis on Finite Groups",
        topics: [
          "Regular representation revisited",
          "Plancherel formula for finite groups",
          "Convolution algebras",
          "Applications: random walks, expanders via representation theory"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      },
      {
        id: "week_14",
        name: "Week 14 — Applications + Consolidation",
        topics: [
          "Representations in number theory (characters mod n, Dirichlet characters)",
          "Representations of quivers",
          "Compact group representation theory (\\( SO(n), SU(n) \\))",
          "Quantum groups (very light intro)",
          "Representations in physics (angular momentum)",
          "Wrap-up: How all the results fit into Maschke → characters → induction → Lie groups → semisimple algebras"
        ],
        refs: ["Fulton & Harris — Representation Theory"]
      }
    ]
  },
  differential_geometry: {
    name: "Differential Geometry",
    description: "Application of calculus to geometric problems.",
    icon: Layers,
    subOptions: [
      {
        id: "diff_geo_1",
        name: "Smooth Manifolds",
        topics: [
          "Smooth Manifolds",
          "Smooth Maps",
          "Tangent Vectors",
          "Submersions, Immersion, and Embeddings",
          "Submanifolds"
        ],
        refs: ["John M. Lee, Introduction to Smooth Manifolds, second edition"]
      }
    ]
  },
  advanced_functional: {
    name: "Advanced Functional Analysis",
    description: "Advanced topics in infinite-dimensional vector spaces.",
    icon: Sigma,
    subOptions: [
      {
        id: "afa_1",
        name: "1. Banach Algebras & \\( C^*- \\)Algebras",
        topics: [
          "Banach algebras: Basic theory",
          "Gelfand transform",
          "Characters & maximal ideal space",
          "Continuous functional calculus",
          "Examples: \\( C(X), L^1(G) \\)",
          "\\( C^*- \\)algebras:  \\( C^*- \\)identity, Representations, States",
          "GNS construction"
        ],
        refs: ["John B. Conway, A course in Functional Analysis", "John B. Conway, A course in Operator Theory", "Walter Rudin, Functional Analysis", "Jerard J.Murphy, \\( C^* - \\)Algebra and Operator Thoery"]
      },
      {
        id: "afa_2",
        name: "2. Advanced Spectral Theory",
        topics: [
          "Normal, self-adjoint, unitary operators",
          "Spectral theorem in Hilbert spaces",
          "Countable spectral measure version",
          "Borel functional calculus",
          "Applications to PDE/ODE"
        ],
        refs: ["Jerard J.Murphy, \\( C^* - \\)Algebra and Operator Thoery", "John B. Conway, A course in Functional Analysis", "Walter Rudin, Functional Analysis"]
      },
      {
        id: "afa_3",
        name: "3. Unbounded Operators",
        topics: [
          "Domains and graphs",
          "Symmetric vs self-adjoint",
          "Closed operators",
          "Stone’s theorem",
          "Examples: Differential operators, Momentum/position operators"
        ],
        refs: ["Jerard J.Murphy, \\( C^* - \\)Algebra and Operator Thoery", "John B. Conway, A course in Functional Analysis", "Walter Rudin, Functional Analysis"]
      },
      {
        id: "afa_4",
        name: "4. Semigroups of Operators",
        topics: [
          "\\( C_0 -\\)semigroups",
          "Hille–Yosida theorem",
          "Applications: Heat equation, Markov processes, Evolution equations"
        ],
        refs: ["John B. Conway, A course in Functional Analysis", "Walter Rudin, Functional Analysis"]
      },
      {
        id: "afa_5",
        name: "5. Distribution Theory (Weak Version)",
        topics: [
          "Test functions and distributions",
          "Convolution",
          "Fourier transform on \\( S^1 \\)",
          "Sobolev spaces \\( H_s \\)",
          "Weak derivatives"
        ],
        refs: ["Walter Rudin, Functional Analysis", "Loukas Grafakos, Modern Fourier Analysis"]
      },
      {
        id: "afa_6",
        name: "6. Advanced Banach Space Theory",
        topics: [
          "Basis in Banach spaces",
          "Uniform convexity & Clarkson inequalities",
          "James theorem",
          "Reflexivity criteria",
          "Weak compactness"
        ],
        refs: ["John B. Conway, A course in Funtional Analysis", "Walter Rudin, Funtional Analysis", "Joseph Diestel, Sequences adn Serier in Banach Space", "Marian Fabian et al, Banach Space Thoery", "___, Funtional Analysis and Infinite-Dimensional Geometry"]
      },
      {
        id: "afa_7",
        name: "7. Applications & Special Topics",
        topics: [
          "Fredholm operators & index",
          "Krein–Milman theorem",
          "Riesz–Markov–Kakutani representation",
          "Duality of \\( L^p \\) spaces",
          "Ergodic theorems (Mean, Pointwise)",
          "Nonlinear functional analysis"
        ],
        refs: ["John B. Conway, A course in Funtional Analysis", "Walter Rudin, Funtional Analysis"]
      }
    ]
  },
  riemann_surfaces: {
    name: "Riemann Surfaces",
    description: "Complex analysis on manifolds.",
    icon: Box,
    subOptions: [
      {
        id: "rs_1",
        name: "Riemann Surfaces",
        topics: [
          "Covering Spaces",
          "Compact Riemann Surfaces"
        ],
        refs: ["Otto Forster, 1937, Lectures On Riemann Surfaces", "H. M. Farkas, I. Kra, Riemann Surfaces"]
      }
    ]
  },
  advanced_complex: {
    name: "Advanced Complex Analysis",
    description: "Deeper dive into holomorphic functions.",
    icon: Sigma,
    subOptions: [
      {
        id: "aca_1",
        name: "1. Advanced Topics in Entire Functions",
        topics: [
          "Order & type of entire functions",
          "Hadamard factorization theorem",
          "Canonical products",
          "Jensen’s formula",
          "Poisson–Jensen"
        ],
        refs: ["Elias M. Stein & Rami Shakarchi, Complex Analysis", "Walter Rudin, Real and Complex Analysis"]
      },
      {
        id: "aca_2",
        name: "2. Analytic Continuation",
        topics: [
          "Germs of holomorphic functions",
          "Uniqueness",
          "Monodromy theorem",
          "Schwarz reflection principle",
          "Natural boundaries"
        ],
        refs: ["Elias M. Stein & Rami Shakarchi, Complex Analysis", "Walter Rudin, Real and Complex Analysis"]
      },
      {
        id: "aca_3",
        name: "3. Harmonic & Subharmonic Functions",
        topics: [
          "Poisson kernel",
          "Dirichlet problem on disk",
          "Harnack’s inequality",
          "Maximum principle (subharmonic case)"
        ],
        refs: ["Elias M. Stein & Rami Shakarchi, Complex Analysis", "Walter Rudin, Real and Complex Analysis"]
      },
      {
        id: "aca_4",
        name: "4. Normal Families",
        topics: [
          "Montel’s theorem",
          "Bloch’s theorem",
          "Normal convergence",
          "Vitali & Weierstrass theorems",
          "Marty’s criterion"
        ],
        refs: ["Elias M. Stein & Rami Shakarchi, Complex Analysis", "Walter Rudin, Real and Complex Analysis"]
      },
      {
        id: "aca_5",
        name: "5. Conformal Mapping (Advanced)",
        topics: [
          "Riemann Mapping Theorem",
          "Proof via normal families",
          "Applications to PDEs",
          "Extremal problems (Koebe distortion theorem)"
        ],
        refs: ["Elias M. Stein & Rami Shakarchi, Complex Analysis", "Walter Rudin, Real and Complex Analysis"]
      },
      {
        id: "aca_6",
        name: "6. Elliptic Functions",
        topics: [
          "Lattices",
          "Weierstrass \\( \\wp \\)-function",
          "Doubly periodic functions",
          "Modular invariants (j-invariant intro)"
        ],
        refs: ["Elias M. Stein & Rami Shakarchi, Complex Analysis", "Walter Rudin, Real and Complex Analysis", "Otto Forster, Lectures on Riemann Surfaces"]
      },
      {
        id: "aca_7",
        name: "7. Riemann Surfaces (Light Introduction)",
        topics: [
          "Algebraic functions as branched covers",
          "Topology of Riemann surfaces (genus, cuts)",
          "Holomorphic maps between surfaces",
          "Universal covering (statement)"
        ],
        refs: ["John B. Conway, Functions of one complex variable I", "Otto Forster, Lectures on Riemann Surfaces"]
      },
      {
        id: "aca_8",
        name: "8. Geometric Function Theory",
        topics: [
          "Schwarz–Pick theorem",
          "Univalent functions",
          "Bieberbach conjecture (statement)",
          "Loewner chains (very brief)"
        ],
        refs: ["John B. Conway, Functions of one complex variable I & II", "Stein-Shakarchi, Complex Analysis"]
      },
      {
        id: "aca_9",
        name: "9. Additional Special Topics",
        topics: [
          "Hardy spaces \\( H^p \\)",
          "Bergman spaces",
          "Zeta function and analytic continuation",
          "Mittag-Leffler theorem",
          "Runge’s theorem",
          "Approximation theorems (Mergelyan)"
        ],
        refs: ["Stein-Shakarchi, Complex Analysis", "John B. Conway, Functions of one complex variable I", "Walter Rudin, Real and Complex Analysis"]
      }
    ]
  }
};

const AdvancedCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState('commutative_algebra');
  const [selectedModule, setSelectedModule] = useState(CURRICULA.commutative_algebra.subOptions[0].id);

  const handleCourseChange = (e) => {
    const newVal = e.target.value;
    setSelectedCourse(newVal);
    setSelectedModule(CURRICULA[newVal].subOptions[0].id);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const currentCourse = CURRICULA[selectedCourse];
  const currentModuleData = currentCourse.subOptions.find(m => m.id === selectedModule) || currentCourse.subOptions[0];

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>Advanced Maths Courses West Bengal | Research Level</title>
        <meta name="description" content="Research-level advanced mathematics courses in West Bengal: Algebraic Topology, Differential Geometry, Functional Analysis, Representation Theory & more." />
        <link rel="canonical" href="https://letsstudyms.com/courses/advanced-courses" />
        <meta property="og:title" content="Advanced Maths Courses West Bengal | Research Level" />
        <meta property="og:description" content="Specialized research-level math courses: Commutative Algebra, Algebraic Geometry, Representation Theory, Differential Geometry and Functional Analysis." />
        <meta property="og:url" content="https://letsstudyms.com/courses/advanced-courses" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advanced Maths Courses West Bengal | Research Level" />
        <meta name="twitter:description" content="Research-level math courses: Algebraic Topology, Differential Geometry, Functional Analysis, and more by ISI and IIT faculty." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://letsstudyms.com/"},{"@type":"ListItem","position":2,"name":"Advanced Courses","item":"https://letsstudyms.com/courses/advanced-courses"}]})}</script>
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
              <Target size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase leading-tight">Advanced Research Tracks</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Specialized higher-order mathematics for doctoral aspirants and research excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-primary mb-8 tracking-tight uppercase">Expanding Frontiers</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our Advanced Courses program is designed for mathematics enthusiasts who want to delve deeper into specialized research topics. These courses are perfect for students targeting top-tier research fellowships.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Led by faculty with active research interests from ISI and IITs, these modules provide exposure to cutting-edge mathematical methodologies and rigorous inquiry.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
               <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />
               <img className="relative w-full h-[500px] rounded-[2.5rem] shadow-2xl object-cover border border-border" alt="Advanced higher mathematics and research track courses at Let's Study MS" loading="lazy" src="https://images.unsplash.com/photo-1581090124321-d19ad6d7cd5a" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Explorer */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Advanced Curriculum Explorer</h2>
            <p className="text-muted-foreground text-lg mb-10">Select a specialized track to discover advanced modules</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div className="relative">
                <select 
                  value={selectedCourse} 
                  onChange={handleCourseChange}
                  className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                >
                  {Object.entries(CURRICULA).map(([key, data]) => (
                    <option key={key} value={key}>{data.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                  <ChevronDown size={24} />
                </div>
              </div>

              <div className="relative">
                <select 
                  value={selectedModule} 
                  onChange={e => setSelectedModule(e.target.value)}
                  className="w-full appearance-none bg-card border-2 border-primary/20 text-foreground font-bold text-lg py-5 px-8 rounded-2xl shadow-xl focus:ring-4 focus:ring-primary/10 outline-none cursor-pointer transition-all hover:border-primary/40"
                >
                  {currentCourse.subOptions.map(option => (
                    <option key={option.id} value={option.id}>{cleanText(option.name)}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-primary">
                  <ChevronDown size={24} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Display */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedCourse}-${selectedModule}`} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              transition={{ duration: 0.5, ease: "circOut" }} 
              className="max-w-6xl mx-auto"
            >
              <div className="bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border mb-12 relative overflow-hidden group">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center mr-6 ring-1 ring-primary/20">
                    <currentCourse.icon className="text-primary" size={36} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-primary leading-tight">
                      <Latex>{currentCourse.name}</Latex>
                    </h3>
                    <div className="mt-2 text-xs font-black bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-widest inline-block">
                      <Latex>{currentModuleData.name}</Latex>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg italic pl-24 font-medium border-l-2 border-primary/20 ml-8">
                  {currentCourse.description}
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
                           <Latex>{topic}</Latex>
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
                         {currentModuleData.refs && currentModuleData.refs.map((ref, idx) => (
                           <div key={idx} className="flex items-center p-4 bg-secondary/30 rounded-2xl border border-border group-hover:border-primary/20 transition-all">
                              <Book size={18} className="text-primary mr-4 shrink-0" />
                              <span className="text-foreground text-sm font-medium leading-relaxed italic"><Latex>{ref}</Latex></span>
                           </div>
                         ))}
                      </div>
                      <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/20 text-sm text-foreground/80 font-medium">
                        <p className="font-black mb-2 flex items-center text-primary uppercase tracking-wider"><GraduationCap size={18} className="mr-2" /> Research Tip:</p>
                        "Reading original texts and working through proofs is essential for mastering these advanced topics."
                      </div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-5xl font-black text-foreground mb-4 tracking-tight uppercase">Why This Track?</h2>
            <p className="text-muted-foreground text-lg font-medium">Equipping the next generation of mathematical researchers with profound depth.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {['In-depth proof-based learning', 'Active research mentoring', 'Exposure to modern mathematics'].map((benefit, index) => (
              <motion.div 
                key={index} 
                {...fadeInUp} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className="bg-card p-10 rounded-[2.5rem] border border-border hover:border-primary/30 transition-all group shadow-sm"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CheckCircle size={28} />
                </div>
                <p className="text-foreground text-left font-bold text-lg leading-tight uppercase tracking-tight">{benefit}</p>
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
              <h2 className="text-6xl font-black text-primary-foreground mb-8 tracking-tighter uppercase leading-none">Pioneer Mathematical Discovery</h2>
              <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto font-medium">
                 Step beyond the textbook into the frontier of mathematical research.
              </p>
              <button className="bg-primary-foreground text-primary hover:scale-105 transition-all font-black px-12 py-5 rounded-2xl text-lg shadow-2xl flex items-center mx-auto uppercase tracking-widest">
                Enquire Now
              </button>
            </motion.div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdvancedCourses;