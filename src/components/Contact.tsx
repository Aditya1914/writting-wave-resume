import { useState } from 'react';
import { Mail, Phone, ChevronDown } from 'lucide-react';

export const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project
          </p>
        </div>

        {/* Contact Options */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 rounded-2xl">
            <div className="space-y-6">
              {/* Email Contact */}
              <a
                href="mailto:aditya75871@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:gradient-text transition-all duration-300">Email</h3>
                  <p className="text-muted-foreground">aditya75871@gmail.com</p>
                </div>
              </a>

              {/* Phone Contact with Hover Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/20 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:gradient-text transition-all duration-300">Phone</h3>
                    <p className="text-muted-foreground">Click to reveal number</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                </div>

                {/* Hover Mega Menu */}
                <div className={`absolute top-full left-0 right-0 mt-2 transition-all duration-300 z-50 ${
                  isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="glass-card p-6 rounded-xl border border-primary/20">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <a 
                            href="tel:+1234567890"
                            className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300"
                          >
                            <Phone className="w-4 h-4" />
                            <span>+91 98765 43210</span>
                          </a>
                          <p className="text-sm text-muted-foreground">
                            Available Mon-Fri, 9AM-6PM IST
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center pt-6 border-t border-border/50">
                <p className="text-muted-foreground mb-4">
                  Prefer a quick chat? Schedule a call or drop me a message!
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300">
                    Schedule Call
                  </button>
                  <button className="glass-card px-6 py-3 rounded-xl font-semibold hover:glow-effect transition-all duration-300">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};