import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { SideProjects } from '@/components/SideProjects';
import { Profiles } from '@/components/Profiles';
import { Contact } from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16 sm:pt-20">
        <div className="screen-container">
          {/* Hero Section */}
          <section id="home">
            <Hero />
          </section>

          {/* Tech Stack Section */}
          <section id="tech">
            <TechStack />
          </section>

          {/* Projects Section */}
          <section id="projects">
            <Projects />
          </section>

          {/* Side Projects Section */}
          <section id="side-projects">
            <SideProjects />
          </section>

          {/* Profiles Section */}
          <section id="profiles" className="pt-8 sm:pt-12">
            <Profiles />
          </section>

          {/* Contact Section */}
          <Contact />

          {/* Footer */}
          <footer className="py-12 sm:py-16 border-t border-border/30 bg-gradient-to-b from-transparent to-neuro-shadow-dark/20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
                {/* Left Section - CTA */}
                <div className="text-center md:text-left">
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold gradient-text mb-2 sm:mb-3">Ready to Start Something Amazing?</h3>
                    <p className="text-muted-foreground text-base sm:text-lg">Let's turn your ideas into reality</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                    <a
                      href="mailto:aditya75871@gmail.com"
                      className="btn-sleek-primary px-5 sm:px-6 py-2.5 sm:py-3 text-center text-sm sm:text-base min-h-[44px] flex items-center justify-center font-semibold"
                    >
                      Start a Project
                    </a>
                    <a
                      href="#resume-view"
                      className="btn-sleek-glass px-5 sm:px-6 py-2.5 sm:py-3 text-center text-sm sm:text-base min-h-[44px] flex items-center justify-center font-semibold"
                      onClick={(e) => e.preventDefault()}
                    >
                      View Resume
                    </a>
                  </div>
                </div>

                {/* Right Section - Feedback */}
                <div className="text-center md:text-right">
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold gradient-text mb-2 sm:mb-3">Love the Design?</h3>
                    <p className="text-muted-foreground text-base sm:text-lg">Share your thoughts about this portfolio</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-end">
                    <a
                      href="mailto:aditya75871@gmail.com?subject=Portfolio Feedback"
                      className="btn-sleek-glass px-5 sm:px-6 py-2.5 sm:py-3 text-center text-sm sm:text-base min-h-[44px] flex items-center justify-center font-semibold"
                    >
                      Send Feedback
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Explorer Section */}
              <div className="text-center relative">
                <div className="glass-card p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 relative overflow-hidden">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black gradient-text tracking-wider opacity-90 leading-none relative z-10">
                    EXPLORER
                  </h2>
                  
                  {/* Gentle Shine Sweep Effect */}
                  <div className="absolute inset-0 shine-sweep"></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
                </div>
                
                <div className="text-xs sm:text-sm text-muted-foreground/70 px-4">
                  <p>&copy; 2025 R Aditya Subramanyam. Crafted with passion and modern technologies.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
