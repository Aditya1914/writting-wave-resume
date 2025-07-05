import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ChevronDown } from 'lucide-react';

export const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Ready to collaborate? Let's discuss your next project
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 rounded-2xl">
            <div className="space-y-6">
              {/* Email Contact */}
              <motion.a
                href="mailto:aditya75871@gmail.com"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold group-hover:gradient-text transition-all duration-300">Email</h3>
                  <p className="text-muted-foreground font-body">aditya75871@gmail.com</p>
                </div>
              </motion.a>

              {/* Phone Contact with Hover Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold group-hover:gradient-text transition-all duration-300">Phone</h3>
                    <p className="text-muted-foreground font-body">Click to reveal number</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                </motion.div>

                {/* Hover Menu - Fixed translucency */}
                <div className={`absolute top-full left-0 right-0 mt-2 transition-all duration-300 z-50 ${
                  isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="glass-menu p-6 rounded-xl">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-heading font-semibold mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <a 
                            href="tel:+919876543210"
                            className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="font-body">+91 98765 43210</span>
                          </a>
                          <p className="text-sm text-muted-foreground font-body">
                            Available Mon-Fri, 9AM-6PM IST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center pt-6 border-t border-border/30">
                <p className="text-muted-foreground mb-4 font-body">
                  Prefer a quick chat? Drop me a message!
                </p>
                <div className="flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glass px-8 py-3 rounded-xl font-semibold"
                  >
                    Send Message
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};