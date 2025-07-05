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
      
      <div className="pt-20">
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
          <section id="profiles" className="pt-12">
            <Profiles />
          </section>

          {/* Contact Section */}
          <Contact />

          {/* Footer */}
          <footer className="py-16 border-t border-border/30 bg-gradient-to-b from-transparent to-neuro-shadow-dark/20">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Left Section - CTA */}
                <div className="text-center md:text-left">
                  <div className="mb-8">
                    <h3 className="text-3xl font-heading font-bold gradient-text mb-3">Ready to Start Something Amazing?</h3>
                    <p className="text-muted-foreground text-lg">Let's turn your ideas into reality</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a
                      href="mailto:aditya75871@gmail.com"
                      className="btn-primary px-6 py-3 rounded-xl font-semibold text-center"
                    >
                      Start a Project
                    </a>
                    <a
                      href="#resume-view"
                      className="btn-glass px-6 py-3 rounded-xl font-semibold text-center"
                    >
                      View Resume
                    </a>
                  </div>
                </div>

                {/* Right Section - Feedback */}
                <div className="text-center md:text-right">
                  <div className="mb-8">
                    <h3 className="text-3xl font-heading font-bold gradient-text mb-3">Love the Design?</h3>
                    <p className="text-muted-foreground text-lg">Share your thoughts about this portfolio</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                    <a
                      href="mailto:aditya75871@gmail.com?subject=Portfolio Feedback"
                      className="btn-glass px-6 py-3 rounded-xl font-semibold text-center"
                    >
                      Send Feedback
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Explorer Section */}
              <div className="text-center relative">
                <div className="glass-card p-12 rounded-3xl mb-8">
                  <h2 className="text-8xl md:text-9xl font-heading font-black gradient-text tracking-wider opacity-90">
                    EXPLORER
                  </h2>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl"></div>
                </div>
                
                <div className="text-sm text-muted-foreground/70">
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
