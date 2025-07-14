import { useState } from 'react';
import { Mail, Phone, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Contact = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobilePhoneExpanded, setIsMobilePhoneExpanded] = useState(false);
  const isMobile = useIsMobile();

  const handlePhoneInteraction = () => {
    if (isMobile) {
      setIsMobilePhoneExpanded(!isMobilePhoneExpanded);
    } else {
      setIsHovered(!isHovered);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to collaborate? Let's discuss your next project
          </p>
        </div>

        {/* Contact Options */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl touch-spacing">
            <div className="space-y-4 sm:space-y-6">
              {/* Email Contact */}
              <a
                href="mailto:aditya75871@gmail.com"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-muted/20 transition-all duration-300 group min-h-[60px] touch-spacing"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-accent rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:gradient-text transition-all duration-300 text-sm sm:text-base">Email</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm truncate">aditya75871@gmail.com</p>
                </div>
              </a>

              {/* Phone Contact */}
              <div className="relative">
                <div 
                  className="relative"
                  onMouseEnter={() => !isMobile && setIsHovered(true)}
                  onMouseLeave={() => !isMobile && setIsHovered(false)}
                >
                  <div 
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-muted/20 transition-all duration-300 group cursor-pointer min-h-[60px] touch-spacing"
                    onClick={handlePhoneInteraction}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-accent to-primary rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:gradient-text transition-all duration-300 text-sm sm:text-base">Phone</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {isMobilePhoneExpanded && isMobile ? '+91 7569051904' : 'Tap to reveal number'}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 flex-shrink-0 ${
                      (isHovered && !isMobile) || (isMobilePhoneExpanded && isMobile) ? 'rotate-180' : ''
                    }`} />
                  </div>

                  {/* Desktop Hover Menu */}
                  {!isMobile && (
                    <div className={`absolute top-full left-0 right-0 mt-2 transition-all duration-300 z-50 ${
                      isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      <div className="backdrop-blur-xl border border-primary/20 rounded-xl p-4 sm:p-6" style={{
                        background: 'hsl(0 0% 8% / 0.95)',
                        borderColor: 'hsl(0 0% 20% / 0.3)',
                        boxShadow: '0 8px 32px hsl(0 0% 2% / 0.4), inset 0 1px 0 hsl(0 0% 15% / 0.1)'
                      }}>
                        <div className="space-y-3 sm:space-y-4">
                          <div className="text-center">
                            <h4 className="font-semibold mb-2 text-sm sm:text-base text-foreground">Contact Information</h4>
                            <div className="space-y-2">
                              <a 
                                href="tel:+917569051904"
                                className="flex items-center justify-center gap-2 p-2 sm:p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 text-sm sm:text-base text-foreground"
                              >
                                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>+91 7569051904</span>
                              </a>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                Available Mon-Fri, 9AM-6PM IST
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Expanded Info */}
                {isMobile && isMobilePhoneExpanded && (
                  <div className="mt-3 p-4 backdrop-blur-xl border border-primary/20 rounded-xl" style={{
                    background: 'hsl(0 0% 8% / 0.95)',
                    borderColor: 'hsl(0 0% 20% / 0.3)',
                    boxShadow: '0 4px 16px hsl(0 0% 2% / 0.3), inset 0 1px 0 hsl(0 0% 15% / 0.1)'
                  }}>
                    <div className="text-center space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Contact Information</h4>
                      <a 
                        href="tel:+917569051904"
                        className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 text-sm text-foreground"
                      >
                        <Phone className="w-4 h-4" />
                        <span>+91 7569051904</span>
                      </a>
                      <p className="text-xs text-muted-foreground">
                        Available Mon-Fri, 9AM-6PM IST
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="text-center pt-4 sm:pt-6 border-t border-border/50">
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base px-2">
                  Prefer a quick chat? Schedule a call or drop me a message!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button 
                    className="btn-sleek-primary px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px] font-semibold"
                    onClick={(e) => e.preventDefault()}
                  >
                    Schedule Call
                  </button>
                  <button 
                    className="btn-sleek-glass px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px] font-semibold"
                    onClick={(e) => e.preventDefault()}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Status - Available for both mobile and desktop */}
        <div className="mt-8 text-center">
          <div className="glass-card p-4 rounded-xl max-w-sm mx-auto">
            <h4 className="text-sm font-semibold mb-2 gradient-text">Quick Connect</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="font-bold text-primary">Email</div>
                <div className="text-muted-foreground">Best way</div>
              </div>
              <div>
                <div className="font-bold text-accent">Response</div>
                <div className="text-muted-foreground">Within 24h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};