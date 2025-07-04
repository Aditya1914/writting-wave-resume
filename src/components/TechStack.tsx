import { useState, useEffect, useRef } from 'react';

const techStacks = [
  {
    category: "Frontend",
    technologies: [
      "React", "TypeScript", "Next.js", "Vue.js", "Angular", "Tailwind CSS", 
      "Sass", "JavaScript", "HTML5", "CSS3", "Redux", "Zustand"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Backend",
    technologies: [
      "Node.js", "Express", "NestJS", "Python", "Django", "FastAPI", 
      "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST API", "Firebase"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    category: "DevOps & Tools",
    technologies: [
      "Docker", "AWS", "Vercel", "Git", "GitHub Actions", "Jest", 
      "Cypress", "Webpack", "Vite", "ESLint", "Prettier", "Figma"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    category: "Mobile & Others",
    technologies: [
      "React Native", "Expo", "Flutter", "Electron", "Socket.io", 
      "WebRTC", "Stripe", "Auth0", "Supabase", "Prisma", "tRPC", "Zod"
    ],
    color: "from-orange-500 to-red-500"
  }
];

export const TechStack = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, index]);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tech Categories */}
        <div className="grid lg:grid-cols-2 gap-8">
          {techStacks.map((stack, index) => (
            <div
              key={stack.category}
              ref={el => sectionRefs.current[index] = el}
              className={`transition-all duration-1000 ${
                visibleSections.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="glass-card p-8 rounded-2xl h-full">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stack.color} rounded-xl flex items-center justify-center mr-4`}>
                    <div className="w-6 h-6 bg-white rounded-md"></div>
                  </div>
                  <h3 className="text-2xl font-bold">{stack.category}</h3>
                </div>

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={`tech-badge transition-all duration-300 ${
                        visibleSections.includes(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 0.2 + techIndex * 0.05}s` 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Highlight */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Always Learning & Growing
            </h3>
            <p className="text-muted-foreground text-lg">
              I'm constantly exploring new technologies and improving my skills. 
              Currently diving deep into AI/ML integration, WebAssembly, and advanced cloud architectures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};