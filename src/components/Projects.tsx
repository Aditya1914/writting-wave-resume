import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Link } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "AI Task Manager",
    description: "Smart task management app with AI-powered prioritization and natural language processing.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "Scalable chat platform with video calls, file sharing, and end-to-end encryption.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop",
    technologies: ["React", "Socket.io", "WebRTC", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for complex data analysis with real-time updates and custom charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false
  },
  {
    id: 5,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with social features and gamification.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    technologies: ["React Native", "Expo", "Firebase", "Health APIs"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on blockchain technology.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    technologies: ["Solidity", "Web3.js", "React", "IPFS"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false
  }
];

export const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = activeFilter === 'featured' 
    ? projects.filter(p => p.featured) 
    : projects;

  useEffect(() => {
    setVisibleCards([]);
    
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...prev, index]);
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
  }, [filteredProjects]);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my recent work and creative solutions
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            {(['all', 'featured'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'glass-card hover:glow-effect'
                }`}
              >
                {filter === 'all' ? 'All Projects' : 'Featured'}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={el => cardRefs.current[index] = el}
              className={`project-card transition-all duration-1000 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl mb-6 group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <a
                      href={project.githubUrl}
                      className="glass-card p-2 rounded-lg hover:glow-effect transition-all duration-300"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      className="glass-card p-2 rounded-lg hover:glow-effect transition-all duration-300"
                      aria-label="View Live Demo"
                    >
                      <Link className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-accent to-primary px-3 py-1 rounded-full text-xs font-semibold text-white">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="glass-card px-8 py-4 rounded-xl font-semibold hover:glow-effect transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};