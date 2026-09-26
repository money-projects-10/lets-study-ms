import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPqQRzSOVM1ZaG18WxQn9VyZTOiGliJ5-qOFhK3bP7jpNfA3Q9xtOj_yBjY9R8n0zMEA/exec";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // --- FIX START: This ensures the page starts at the top ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // --- FIX END ---

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    otherUniversity: '',
    course: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CHANGED: We use 'text/plain' to prevent the browser from blocking the request
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(formData)
      });

      // Because of 'no-cors', we can't check data.status. We assume success.
      toast({
        title: 'Message sent successfully',
        description: 'We will contact you within 24 hours.'
      });

      setFormData({
        name: '', email: '', phone: '', university: '', otherUniversity: '', course: '', message: ''
      });

    } catch (err) {
      toast({
        variant: "destructive",
        title: 'Submission failed',
        description: 'Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground transition-colors duration-500">
      <Helmet>
        <title>Contact Let's Study MS | Mathematics Coaching Enquiry</title>
        <meta name="description" content="Contact Let's Study MS for mathematics coaching in West Bengal. Inquire about BSc foundation, MSc entrances, JAM, and PhD batches. Call +91 8777484102." />
        <link rel="canonical" href="https://letsstudyms.com/contact" />
        <meta property="og:title" content="Contact Let's Study MS | Mathematics Coaching Enquiry" />
        <meta property="og:description" content="Reach out for coaching enquiries. BSc foundation, MSc entrance, PhD prep and more. Call +91 8777484102 or visit us in Khardaha, Kolkata." />
        <meta property="og:url" content="https://letsstudyms.com/contact" />
        <meta property="og:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Let's Study MS | Mathematics Coaching Enquiry" />
        <meta name="twitter:description" content="Enquire about mathematics coaching in West Bengal. Call, email, or visit us in Khardaha, Kolkata." />
        <meta name="twitter:image" content="https://i.postimg.cc/SR35cFPJ/Lets_Study_Logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://letsstudyms.com/" }, { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://letsstudyms.com/contact" }] })}</script>
      </Helmet>

      <Header />

      <section className="relative py-24 px-4 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl font-black mb-6 shimmer-text tracking-tighter">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about our batches? We're here to help you on your mathematical journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Contact Info */}
            <motion.div {...fadeInUp} className="space-y-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6">Contact Information</h2>
                <p className="text-muted-foreground text-lg mb-8">Reach out via any of these channels. Our team typically responds within 24 hours.</p>
              </div>

              <div className="space-y-6">
                {[
                  { 
                    icon: MapPin, 
                    text: '118/105, Rabindrapally, Khardaha, Kolkata - 700117', 
                    subText: 'Near Maya Apartment, Landmark: Rabindrapally Kali Mandir',
                    label: 'Our Location' 
                  },
                  { 
                    icon: Phone, 
                    links: [
                      { text: '+91 8777484102', url: 'tel:+918777484102' },
                      { text: '+91 8481819726', url: 'tel:+918481819726' }
                    ], 
                    label: 'Call Us Anytime' 
                  },
                  { 
                    icon: Mail, 
                    text: 'letsstudy2022bu@gmail.com', 
                    links: [{ text: 'letsstudy2022bu@gmail.com', url: 'mailto:letsstudy2022bu@gmail.com' }],
                    label: 'Send an Email' 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-6 p-6 bg-card rounded-3xl shadow-sm border border-border group hover:border-primary transition-all duration-300"
                  >
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{item.label}</p>
                      {item.links ? (
                        <div className="flex flex-col">
                          {item.links.map((link, idx) => (
                            <a key={idx} href={link.url} className="text-foreground font-medium text-lg hover:text-primary transition-colors">
                              {link.text}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <p className="text-foreground font-medium text-lg">{item.text}</p>
                          {item.subText && <p className="text-muted-foreground text-sm mt-1">{item.subText}</p>}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="bg-card p-10 rounded-[2.5rem] shadow-xl border border-border relative overflow-hidden group">
                <h2 className="text-3xl font-bold text-foreground mb-8">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Name" />
                    <input name="email" value={formData.email} onChange={handleChange} required className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Email" />
                  </div>
                  
                  <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Phone Number" />

                  <select name="course" value={formData.course} onChange={handleChange} className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                    <option value="">Interested Batch</option>
                    <option value="Foundation Batch">Foundation Batch</option>
                    <option value="Semester Batch">Semester Batch</option>
                    <option value="M.Sc Mathematics Entrances">M.Sc Mathematics Entrances</option>
                    <option value="M.Tech/ Data Science/ M.Sc Economics">M.Tech/ Data Science/ M.Sc Economics</option>
                    <option value="Engineering Mathematics">Engineering Mathematics</option>
                  </select>

                  <select name="university" value={formData.university} onChange={handleChange} className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                    <option value="">Current University</option>
                    <option value="Jadavpur">Jadavpur University</option>
                    <option value="Calcutta">Calcutta University</option>
                    <option value="Xavier">Xaviers College</option>
                    <option value="Presidency">Presidency University</option>
                    <option value="other">Other</option>
                  </select>

                  {formData.university === 'other' && (
                    <input name="otherUniversity" value={formData.otherUniversity} onChange={handleChange} required className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Please specify university" />
                  )}

                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-5 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="How can we help?" />

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-lg tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    {loading ? "SENDING..." : <> SEND MESSAGE <Send className="ml-3" size={20} /> </>}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>

  );
};

export default ContactUs;