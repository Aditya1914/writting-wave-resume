import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Settings, Smartphone } from 'lucide-react';
import { TechCarousel } from './TechCarousel';

const techStacks = [
  {
    category: "Frontend",
    technologies: [
      "React", "TypeScript", "Next.js", "Vue.js", "Angular", "Tailwind CSS", 
      "Sass", "JavaScript", "HTML5", "CSS3", "Redux", "Zustand"
    ],
    color: "from-blue-500 to-cyan-500",
    icon: Code
  },
  {
    category: "Backend",
    technologies: [
      "Node.js", "Express", "NestJS", "Python", "Django", "FastAPI", 
      "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST API", "Firebase"
    ],
    color: "from-green-500 to-emerald-500",
    icon: Server
  },
  {
    category: "DevOps & Tools",
    technologies: [
      "Docker", "AWS", "Vercel", "Git", "GitHub Actions", "Jest", 
      "Cypress", "Webpack", "Vite", "ESLint", "Prettier", "Figma"
    ],
    color: "from-purple-500 to-pink-500",
    icon: Settings
  },
  {
    category: "Mobile & Others",
    technologies: [
      "React Native", "Expo", "Flutter", "Electron", "Socket.io", 
      "WebRTC", "Stripe", "Auth0", "Supabase", "Prisma", "tRPC", "Zod"
    ],
    color: "from-orange-500 to-red-500",
    icon: Smartphone
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid lg:grid-cols-2 gap-8">
          {techStacks.map((stack, index) => (
            <motion.div
              key={stack.category}
              ref={el => sectionRefs.current[index] = el}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="h-full"
            >
              <div className="neuro-card p-6 rounded-2xl h-full hover:glow-effect transition-all duration-500">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stack.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                    <stack.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold">{stack.category}</h3>
                </div>

                {/* Technologies Carousel */}
                <div className="min-h-[120px]">
                  <TechCarousel 
                    technologies={stack.technologies}
                    speed={2500 + (index * 200)} // Different speeds for each category
                    className="mb-4"
                  />
                  
                  {/* Static preview of all technologies */}
                  <div className="flex flex-wrap gap-2 mt-4 opacity-60">
                    {stack.technologies.slice(0, 6).map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-muted/20 rounded-md text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {stack.technologies.length > 6 && (
                      <span className="text-xs px-2 py-1 bg-muted/20 rounded-md text-muted-foreground">
                        +{stack.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto hover:glow-effect transition-all duration-500">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Always Learning & Growing
            </h3>
            <p className="text-muted-foreground text-lg font-body">
              I'm constantly exploring new technologies and improving my skills. 
              Currently diving deep into AI/ML integration, WebAssembly, and advanced cloud architectures.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};