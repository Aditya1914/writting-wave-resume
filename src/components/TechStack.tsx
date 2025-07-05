import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Settings, Smartphone } from 'lucide-react';

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
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <div className="neuro-card p-8 rounded-2xl h-full hover:glow-effect transition-all duration-500">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${stack.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                    <stack.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">{stack.category}</h3>
                </div>

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.2 + techIndex * 0.05 
                      }}
                      className="tech-badge neuro-inset px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:text-primary"
                    >
                      {tech}
                    </motion.span>
                  ))}
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