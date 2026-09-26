import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Library,
  GraduationCap,
  TrendingUp,
  Settings,
  Scroll,
  Zap,
  Download,
  Lock
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const { toast } = useToast();

  const handlePlaceholderClick = (sectionName) => {
    toast({
      title: `📂 ${sectionName}`,
      description: "Material is currently being compiled and will be uploaded shortly!",
      variant: "default",
    });
  };

  const materialSections = [
    {
      id: 1,
      title: 'Foundation Batch',
      description: 'Core concepts, basic algebra, and fundamental calculus notes.',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 2,
      title: 'Semester Batch',
      description: 'University specific modules, previous year papers, and semester notes.',
      icon: Library,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 3,
      title: 'M.Sc Mathematics Entrances',
      description: 'Study kits for JAM, TIFR, NBHM, and ISI entrances.',
      icon: GraduationCap,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 4,
      title: 'M.Tech / Data Science / Economics',
      description: 'Statistics, probability, and econometrics resources.',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 5,
      title: 'Engineering Mathematics',
      description: 'GATE syllabus coverage and engineering specific math topics.',
      icon: Settings,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 6,
      title: 'PhD Entrances',
      description: 'Advanced research topics, interview prep materials, and thesis guides.',
      icon: Scroll,
      color: 'bg-teal-100 text-teal-600',
    },
    {
      id: 7,
      title: 'Advance Courses',
      description: 'Specialized topics for research scholars and competitive excellence.',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>Free Math Study Material & Notes | Let's Study MS</title>
        <meta name="description" content="Access free higher mathematics study materials, curated notes, assignments and previous year questions for IIT JAM, CSIR NET, GATE and university exams." />
        <link rel="canonical" href="https://letsstudyms.com/login" />
        <meta property="og:title" content="Free Math Study Material & Notes | Let's Study MS" />
        <meta property="og:description" content="Access free higher mathematics study materials, notes, problem sets, and previous year questions for IIT JAM, CSIR NET, and college exams." />
        <meta property="og:url" content="https://letsstudyms.com/login" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Math Study Material & Notes | Let's Study MS" />
        <meta name="twitter:description" content="Free higher mathematics study resources, notes, assignments and PYQs for competitive exams." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://letsstudyms.com/" }, { "@type": "ListItem", "position": 2, "name": "Free Study Material", "item": "https://letsstudyms.com/login" }] })}</script>
      </Helmet>

      <Header />

      <div className="py-24">
        {/* Page Header */}
        <div className="container mx-auto px-4 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-black text-primary mb-6 shimmer-text tracking-tight">Study Repository</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Curated notes, assignments, and problem sets to help you excel in your exams.
              Access high-quality mathematical resources.
            </p>
          </motion.div>
        </div>

        {/* Grid Section */}
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {materialSections.map((section) => (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-card rounded-3xl shadow-sm border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group"
              >
                <div className="p-8 flex-1 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300`}>
                      <section.icon size={28} />
                    </div>
                    <Lock size={16} className="text-muted-foreground/30" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{section.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{section.description}</p>
                </div>

                <div className="p-6 bg-secondary/30 mt-auto relative z-10">
                  <button
                    onClick={() => handlePlaceholderClick(section.title)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-2xl transition-all duration-500 font-bold text-sm tracking-wide"
                  >
                    <Download size={18} />
                    Access Material
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mt-20 text-center bg-primary/5 rounded-[2.5rem] p-12 border border-primary/10"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join our student forum to request specific notes or solutions from our expert faculty.</p>
            <button
              onClick={() => handlePlaceholderClick("Student Forum")}
              className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Request Notes
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;