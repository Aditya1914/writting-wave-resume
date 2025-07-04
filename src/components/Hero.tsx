import { useState, useEffect } from 'react';
import { TypingAnimation } from './TypingAnimation';
import { CyclingText } from './CyclingText';
const profileImage = '/lovable-uploads/5ea1a67a-9081-413e-8455-01173b7f5154.png';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Hero = () => {
  const [showDesignation, setShowDesignation] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show designation after name animation completes
    const designationTimer = setTimeout(() => setShowDesignation(true), 3000);
    // Show rest of content
    const contentTimer = setTimeout(() => setShowContent(true), 4000);

    return () => {
      clearTimeout(designationTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <img 
                src={profileImage} 
                alt="Profile" 
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl float-animation"
              />
            </div>
          </div>

          {/* Name and Info */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-6">
              {/* Greeting */}
              <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-accent font-medium text-lg">Hello, I'm</p>
              </div>

              {/* Animated Name */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <TypingAnimation 
                    text="R Aditya Subramanyam"
                    className="gradient-text"
                    delay={500}
                    speed={100}
                  />
                </h1>
                
                {/* Designation */}
                {showDesignation && (
                  <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="text-2xl lg:text-3xl text-muted-foreground font-light min-h-[3rem]">
                      <CyclingText 
                        texts={[
                          "Software Developer @Pyvision Technology",
                          "Prompt Engineer",
                          "Interactive Trainer for LLMs",
                          "Building SaaS MVPs",
                          "Vibe Coder",
                          "Algorithms Enthusiast"
                        ]}
                        delay={200}
                        typingSpeed={50}
                        pauseDuration={2500}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {showContent && (
                <div className="slide-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-lg text-muted-foreground max-w-lg">
                    Passionate about creating innovative digital solutions and building 
                    amazing user experiences with modern technologies.
                  </p>
                </div>
              )}

              {/* Social Links */}
              {showContent && (
                <div className="slide-up flex gap-4 justify-center lg:justify-start" style={{ animationDelay: '0.6s' }}>
                  {[
                    { icon: Github, href: "https://github.com/Aditya1914", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/r-aditya-subramanyam/", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/adityaleo1411", label: "Twitter" },
                    { icon: Mail, href: "mailto:aditya75871@gmail.com", label: "Email" }
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="glass-card p-3 rounded-xl hover:glow-effect transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {showContent && (
                <div className="slide-up" style={{ animationDelay: '0.8s' }}>
                  <button className="bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    View My Work
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showContent && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 slide-up" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      )}
    </section>
  );
};