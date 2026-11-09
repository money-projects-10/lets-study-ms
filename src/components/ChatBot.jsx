import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Search,
  Bot,
  ChevronRight,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SEARCH_ITEMS = [
  { title: 'Foundation Batch', path: '/courses/foundation-batch', type: 'Course' },
  { title: 'Semester Batch', path: '/courses/semester-batch', type: 'Course' },
  { title: 'M.Sc Mathematics Entrances', path: '/courses/msc-mathematics', type: 'Entrance' },
  { title: 'M.Tech/Data Science', path: '/courses/mtech-datascience', type: 'Entrance' },
  { title: 'Engineering Mathematics', path: '/courses/engineering-mathematics', type: 'Course' },
  { title: 'PhD Entrances', path: '/courses/phd-entrances', type: 'Entrance' },
  { title: 'Advanced Courses', path: '/courses/advanced-courses', type: 'Specialized' },
  { title: 'Contact Support', path: '/contact', type: 'Page' },
  { title: 'Student Testimonials', path: '/testimonials', type: 'Page' },
  { title: 'Login Portal', path: '/login', type: 'Portal' },
  { title: 'Direct Coaching', path: '/contact', type: 'Service' },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! 👋 I\'m your Let\'s Study assistant. How can I help you today?' }
  ]);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Close chat when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const filteredItems = searchQuery
    ? SEARCH_ITEMS.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: searchQuery }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "I'm a simplified search assistant. Please use the search results above or contact us directly via WhatsApp for specific queries!"
      }]);
    }, 1000);

    setSearchQuery('');
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end space-y-4">

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] bg-card/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[550px] ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="bg-primary p-6 flex items-center justify-between text-primary-foreground relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 noise-bg" />
              <div className="flex items-center space-x-3 relative z-10">
                <div className="bg-primary-foreground/20 p-2 rounded-xl">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Assistant</h3>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/20 p-2 rounded-xl transition-all relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[400px]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${msg.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none shadow-lg'
                      : 'bg-secondary/50 border border-border text-foreground rounded-bl-none'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Search Interface inside Chat */}
              <div className="bg-secondary/30 p-4 rounded-2xl border border-border shadow-inner">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="flex items-center justify-between p-3 hover:bg-primary/5 rounded-xl group transition-all border border-transparent hover:border-primary/10"
                        >
                          <div>
                            <p className="text-sm font-black text-primary uppercase tracking-tighter">{item.title}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{item.type}</p>
                          </div>
                          <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-center text-muted-foreground py-2 font-medium">No results for "{searchQuery}"</p>
                    )}
                  </div>
                )}

                {/* Quick Links */}
                {!searchQuery && (
                  <div className="pt-2">
                    <p className="text-[10px] font-black text-muted-foreground mb-3 uppercase tracking-widest">Popular Tracks</p>
                    <div className="flex flex-wrap gap-2">
                      <Link to="/courses/foundation-batch" className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-tighter">
                        Foundation
                      </Link>
                      <Link to="/courses/msc-mathematics" className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-tighter">
                        Entrances
                      </Link>
                      <Link to="/contact" className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-tighter">
                        Help
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 bg-background/50 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 text-sm bg-secondary/50 border border-border rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={!searchQuery}
                className="bg-primary text-primary-foreground p-3 rounded-full hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons Container */}
      <div className="flex flex-col items-end gap-2.5 md:gap-6">

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/918481819726"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat with us on WhatsApp"
          className="bg-[#25D366] text-white p-2.5 md:p-4 rounded-2xl md:rounded-[1.25rem] shadow-xl md:shadow-2xl flex items-center justify-center transition-all relative group ring-2 md:ring-4 ring-[#25D366]/20"
        >
          <span className="hidden md:block absolute right-full mr-4 bg-gray-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-4 group-hover:translate-x-0">
            WhatsApp Support
          </span>
          <WhatsAppIcon size={24} className="text-white md:w-7 md:h-7" />
        </motion.a>

        {/* Chat Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
          className={`relative group p-2.5 md:p-4 rounded-2xl md:rounded-[1.25rem] shadow-xl md:shadow-2xl flex items-center justify-center transition-all ring-2 md:ring-4 ${isOpen ? 'bg-secondary text-foreground ring-foreground/5 rotate-90' : 'bg-primary text-primary-foreground ring-primary/20'
            }`}
        >
          <span className="hidden md:block absolute right-full mr-4 bg-gray-900 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-4 group-hover:translate-x-0">
            {isOpen ? 'Close' : 'Chat Assistant'}
          </span>

          {isOpen ? <X size={24} className="md:w-7 md:h-7" /> : <Bot size={24} className="md:w-7 md:h-7" />}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBot;