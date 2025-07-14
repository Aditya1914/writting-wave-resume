import { useState, useEffect } from 'react';
import { TypingAnimation } from './TypingAnimation';
import { CyclingText } from './CyclingText';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import profileHeroImage from '../assets/profile-hero.png';

// Use imported image for proper Vite handling
const profileImage = profileHeroImage;

export const Hero = () => {
  const [showDesignation, setShowDesignation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [nameTypingComplete, setNameTypingComplete] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Calculate name typing duration
    const nameText = "R Aditya Subramanyam";
    const typingSpeed = isMobile ? 80 : 100;
    const nameTypingDuration = nameText.length * typingSpeed + 500; // Add buffer

    // Show designation after name animation completes
    const designationTimer = setTimeout(() => {
      setNameTypingComplete(true);
      setShowDesignation(true);
    }, nameTypingDuration);
    
    // Show rest of content
    const contentTimer = setTimeout(() => setShowContent(true), nameTypingDuration + 1000);

    return () => {
      clearTimeout(designationTimer);
      clearTimeout(contentTimer);
    };
  }, [isMobile]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Image */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl sm:rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <img 
                src={profileImage} 
                alt="R Aditya Subramanyam - Software Developer" 
                className="relative w-full max-w-sm sm:max-w-md mx-auto rounded-2xl sm:rounded-3xl shadow-2xl float-animation"
                loading="eager"
              />
            </div>
          </div>

          {/* Name and Info */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              {/* Greeting */}
              <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-accent font-medium text-base sm:text-lg">Hello, I'm</p>
              </div>

              {/* Animated Name */}
              <div className="space-y-2">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <TypingAnimation 
                    text="R Aditya Subramanyam"
                    className="gradient-text"
                    delay={500}
                    speed={isMobile ? 80 : 100}
                  />
                </h1>
                
                {/* Designation */}
                {showDesignation && (
                  <div className={`transition-all duration-1000 ${
                    nameTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light min-h-[2rem] sm:min-h-[3rem]">
                      <CyclingText 
                        texts={[
                          "Software Developer @Pyvision Technology",
                          "Prompt Engineer",
                          "Interactive Trainer for LLMs",
                          "Building Shopify (themes and apps) and SaaS MVPs",
                          "Vibe Coder",
                          "Algorithms Enthusiast"
                        ]}
                        delay={200}
                        typingSpeed={isMobile ? 40 : 50}
                        pauseDuration={isMobile ? 2000 : 2500}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {showContent && (
                <div className="slide-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Passionate about creating innovative digital solutions and building 
                    amazing user experiences with modern technologies.
                  </p>
                </div>
              )}

              {/* Social Links */}
              {showContent && (
                <div className="slide-up flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start" style={{ animationDelay: '0.6s' }}>
                  {[
                    { icon: Github, href: "https://github.com/Aditya1914", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/r-aditya-subramanyam/", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/adityaleo1411", label: "Twitter" },
                    { icon: Mail, href: "mailto:aditya75871@gmail.com", label: "Email" }
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-2.5 sm:p-3 rounded-xl hover:glow-effect transition-all duration-300 group touch-spacing"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {showContent && (
                <div className="slide-up" style={{ animationDelay: '0.8s' }}>
                  <button 
                    className="btn-sleek-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base w-full sm:w-auto font-semibold"
                    onClick={() => {
                      const projectsSection = document.querySelector('#projects');
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    View My Work
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile-optimized additional info */}
        {showContent && isMobile && (
          <div className="slide-up mt-8 sm:mt-12 text-center" style={{ animationDelay: '1s' }}>
            <div className="glass-card p-4 rounded-xl max-w-sm mx-auto">
              <p className="text-xs text-muted-foreground mb-3">
                Swipe up to explore more
              </p>
              {/* Professional down arrow */}
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-muted-foreground/40 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-muted-foreground/60 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator - Hidden on mobile to save space */}
      {showContent && !isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 slide-up" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      )}
    </section>
  );
};