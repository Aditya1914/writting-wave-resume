import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code, Palette } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const SideProjects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: isMobile ? 0.1 : 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-3 sm:mb-4">
            Side Projects
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Exploring the boundaries of e-commerce development
          </p>
        </div>

        {/* Project Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:glow-effect transition-all duration-300 touch-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              {/* Project Info */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-accent rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Shopify Development</h3>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Building my own Shopify themes and embedded apps using Liquid, Hydrogen, 
                  and the Admin/Storefront APIs. Focusing on creating seamless e-commerce 
                  experiences with modern web technologies.
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Liquid', 'Hydrogen', 'Admin API', 'Storefront API', 'React', 'GraphQL'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-muted/50 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    className="glass-card px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:glow-effect transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Store
                  </button>
                  <button 
                    className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:from-primary hover:to-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Code className="w-4 h-4" />
                    Source Code
                  </button>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative order-first md:order-last">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl sm:rounded-2xl blur-xl"></div>
                <div className="relative glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-2 sm:h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                      <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full w-3/4"></div>
                      <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full w-1/2"></div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full w-2/3"></div>
                      <div className="h-2 sm:h-3 bg-gradient-to-r from-accent to-primary rounded-full w-5/6"></div>
                      <div className="h-1.5 sm:h-2 bg-muted/50 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 flex justify-center">
                    <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
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