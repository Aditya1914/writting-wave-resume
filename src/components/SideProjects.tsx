import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code, Palette } from 'lucide-react';

export const SideProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Side Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the boundaries of e-commerce development
          </p>
        </div>

        {/* Project Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="glass-card p-8 rounded-2xl hover:glow-effect transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Shopify Development</h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Building my own Shopify themes and embedded apps using Liquid, Hydrogen, 
                  and the Admin/Storefront APIs. Focusing on creating seamless e-commerce 
                  experiences with modern web technologies.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Liquid', 'Hydrogen', 'Admin API', 'Storefront API', 'React', 'GraphQL'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="glass-card px-6 py-3 rounded-xl font-semibold hover:glow-effect transition-all duration-300 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Store
                  </button>
                  <button className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-medium py-3 px-4 rounded-xl hover:from-primary hover:to-accent hover:text-white transition-all duration-300 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Source Code
                  </button>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
                <div className="relative glass-card p-8 rounded-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      <div className="h-2 bg-muted/50 rounded-full w-3/4"></div>
                      <div className="h-2 bg-muted/50 rounded-full w-1/2"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-muted/50 rounded-full w-2/3"></div>
                      <div className="h-3 bg-gradient-to-r from-accent to-primary rounded-full w-5/6"></div>
                      <div className="h-2 bg-muted/50 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Palette className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};