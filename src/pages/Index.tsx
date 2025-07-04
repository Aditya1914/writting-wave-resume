import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Profiles } from '@/components/Profiles';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
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

      {/* Profiles Section */}
      <section id="profiles">
        <Profiles />
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">Ready to Start Something Amazing?</h3>
            <p className="text-muted-foreground">Let's turn your ideas into reality</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="mailto:your.email@example.com"
              className="bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
            >
              Start a Project
            </a>
            <a
              href="#"
              className="glass-card px-6 py-3 rounded-xl font-semibold hover:glow-effect transition-all duration-300"
            >
              View Resume
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2024 Your Name. Crafted with passion and modern technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
