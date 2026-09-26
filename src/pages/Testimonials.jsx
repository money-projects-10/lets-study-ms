import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, GraduationCap, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Testimonials = () => {
  const studentSuccess = [
    {
      name: 'Aritra Raut',
      achievement: 'B.Sc RKM Narendrapur | M.Sc.(Data Science) RKMVERI',
      current: 'Currently in EXL Services, Assistent Manager Analytics',
      image: 'https://i.postimg.cc/yY8kqJwN/Aritra_Raut.jpg'
    },
    {
      name: 'Avik Ghosh',
      achievement: "M.Sc Jadavpur University | Cracked: CSIR NET",
      current: 'Currently in IIT Bombay (PhD)',
      image: 'https://i.postimg.cc/fTjvf3H4/Avik_Gosh.jpg'
    },
    {
      name: 'Sagnik Saha',
      achievement: 'Bsc Jadavpur University | Cracked: IMSc. (2025), IISER Pune (2025), JAM (2025) AIR 69, IISC Bangalore (2025)',
      current: 'Currently in IISc Bangalore',
      image: 'https://i.postimg.cc/7PS1qGr8/Sagnik_Saha.jpg'
    },
    {
      name: 'Sreetama Bhattachara',
      achievement: "Bsc St. Xavier's Kolkata | Cracked: IISER Kolkata (2025)",
      current: 'Currently in IISER Kolkata',
      image: 'https://i.postimg.cc/L4Cm1xbs/Sreetama_Bhattacharya.jpg'
    },
    {
      name: 'Ananda Mukherjee',
      achievement: 'Bsc RKM Rahara | Cracked: Msc IISER TVM',
      current: 'Currently in Kansas State University (PhD)',
      image: 'https://i.postimg.cc/sgpFwmwg/Ananda_Mukherjee.jpg'
    },
    {
      name: 'Ritobrata Mukherjee',
      achievement: "Bsc St. Xavier's College, Kolkata | Cracked: JAM (2023) AIR 891, GATE (2024) AIR 704",
      current: 'Currently in IIT Patna',
      image: 'https://i.postimg.cc/wMvyk7z8/Ritobrata_Mukherjee.jpg'
    },
    {
      name: 'Ayon Gangopadhyay',
      achievement: 'Bsc. RKM Narendrapur | Msc. (Data Science) RKMVERI',
      current: 'Currently in Netomi, Data Science',
      image: 'https://i.postimg.cc/1z3QX6rg/Ayon_Gangopadhyay.jpg'
    },
    {
      name: 'Ishan Chakraborty',
      achievement: "Bsc St. Xavier's Kolkata | Cracked: ISI Mmath (2025), JAM (2025) AIR 137, IISC Bangalore (2025)",
      current: 'Currently in IISC Bangalore',
      image: 'https://i.postimg.cc/XvFq958V/Ishan-Chakraborty.jpg'
    },
    {
      name: 'Debolina Ghosh',
      achievement: "Bsc St. Xavier's Kolkata | Cracked: JAM (2023) AIR 127",
      current: 'Currently in IIT Delhi (PhD)',
      image: 'https://i.postimg.cc/tgfd4Fgd/Debolina_Ghosh.jpg'
    },
    {
      name: 'Aryadeb Sengupta',
      achievement: "Bsc St. Xavier's Kolkata | Cracked: M.Sc RKMVERI (2024)",
      current: 'Currently in RKMVERI',
      image: 'https://i.postimg.cc/k4N68cVG/Aryadeb-Sengupta.jpg'
    },
    {
      name: 'Atim Kumar Sasmal',
      achievement: "M.Sc Ramkrishna Mission, Rahara | Cracked: ISI M.Tech (2025)",
      current: 'Currently in ISI Kolkata (2025)',
      image: 'https://i.postimg.cc/9Qf3ZFkQ/Atim-Kumar-Sasmal.jpg'
    },
    {
      name: 'Avikesh Ghosh',
      achievement: "BscMaharaja Manindra Chandra College | Cracked: IISER (2025)",
      current: 'Currently in IISER Bhopal',
      image: 'https://i.postimg.cc/htZkrRFr/Avikesh-Ghosh.jpg'
    },
    {
      name: 'Javed Akhtar',
      achievement: "Bsc Ramkrishna Mission, Narendrapur",
      current: 'Currently in IISER, Kolkata (2022)',
      image: 'https://i.postimg.cc/Qxhg6Bh8/Javed-Akhtar.jpg'
    },
    {
      name: 'Ripan Das',
      achievement: "B.Sc Jadavpur University | Cracked: ISI M.Math (2024)",
      current: 'Currently in ISI Kolkata',
      image: 'https://i.postimg.cc/8P04Xp5D/Ripan_Das.jpg'
    },
    {
      name: 'Silvia Hazari',
      achievement: "M.Sc Central University of Hariyana | Cracked: GATE (2025) AIR 401",
      current: '',
      image: 'https://i.postimg.cc/2SLwPsb2/Silvia-Hazari.jpg'
    },
    {
      name: 'Nikhil Chand',
      achievement: "Bsc Ramanada College, Bishnupur| M.Sc Vidyasagar University | Cracked: GATE (2025) AIR 1280",
      current: 'Currently in IISER Bhopal (Project Assistant)',
      image: 'https://i.postimg.cc/jq84Cxyn/Nikhil-Chand.jpg'
    },
    {
      name: 'Jeet Dhar',
      achievement: "Bsc St. Xavier's Kolkata | Cracked: IISER Bhopal (2024), Kolkata (2023), ISI M.Math (2024)",
      current: 'Currently in ISI Kolkata',
      image: 'https://i.postimg.cc/BvdRr5nK/Jeet_Dhar.jpg'
    },
    {
      name: 'Ayan Chawdhary',
      achievement: "Bsc St. Xavier's Kolkata | Cracked: IISC Banglore (2024)",
      current: 'Currently in IISC Banglore',
      image: 'https://i.postimg.cc/T1k06GJb/Ayan_Chodhury.jpg'
    },
    {
      name: 'Aditya Pratap Saha',
      achievement: "Future Institute of Engineering and Management | GATE DA AIR 91",
      current: 'AIR 91 in GATE DA Paper',
      image: '/images/Aditya_Pratap_Saha.png'
    },
    {
      name: 'Sukhomoy Debnath',
      achievement: "Consultant at KPMG",
      current: 'Currently Consultant at KPMG',
      image: '/images/Sukhomoy_Debnath.png'
    }
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
        <title>Student Success Stories & Results | Let's Study MS</title>
        <meta name="description" content="Real success stories from Let's Study MS students. Alumni secured IIT JAM AIR 37, CSIR NET AIR 6, joined ISI, TIFR, IIT Bombay, IISER & PhD programs in USA." />
        <link rel="canonical" href="https://letsstudyms.com/testimonials" />
        <meta property="og:title" content="Student Success Stories & Results | Let's Study MS" />
        <meta property="og:description" content="Alumni achievements: IIT JAM AIR 37, CSIR NET AIR 6, GATE AIR 25. Students at ISI, IISc, TIFR, HRI, IIT Bombay, and international universities." />
        <meta property="og:url" content="https://letsstudyms.com/testimonials" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Student Success Stories | Let's Study MS" />
        <meta name="twitter:description" content="Alumni at IIT, ISI, IISc, TIFR, HRI and international universities. See real results from West Bengal's top maths institute." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://letsstudyms.com/" }, { "@type": "ListItem", "position": 2, "name": "Testimonials", "item": "https://letsstudyms.com/testimonials" }] })}</script>
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
              <Trophy size={40} className="text-primary" />
            </div>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tight uppercase">Hall of Fame</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Celebrating the exceptional achievements of our students in the world's most prestigious mathematical institutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievement Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {studentSuccess.map((student, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-[2.5rem] overflow-hidden border border-border group hover-lift shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-72 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={`${student.name} - ${student.achievement}`}
                    loading="lazy"
                    src={student.image}
                  />

                </div>

                <div className="p-10">
                  <h3 className="text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">{student.name}</h3>

                  <div className="flex items-start space-x-3 mb-6">
                    <GraduationCap className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {student.achievement}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border flex items-center text-primary font-black text-xs uppercase tracking-[0.2em]">
                    <MapPin size={16} className="mr-3" />
                    {student.current || "Research Scholar"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10 noise-bg" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl font-black text-primary-foreground mb-8 tracking-tight">Want to be our next success story?</h2>
            <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
              Join our specialized batches and start your journey towards excellence in mathematics.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-primary-foreground text-primary hover:scale-105 transition-all font-black px-12 py-5 rounded-2xl text-lg shadow-2xl uppercase tracking-widest"
            >
              Enroll Now
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>

  );
};

export default Testimonials;