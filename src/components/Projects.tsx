import { useState, useEffect, useRef } from 'react';
import { Github, Link } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Network Grid Component
const NetworkGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const projectCardsRef = useRef<HTMLElement[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

          // Mouse tracking (disabled on mobile for performance)
      const handleMouseMove = (e: MouseEvent) => {
        if (!isMobile) {
          const rect = canvas.getBoundingClientRect();
          mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isInside: true
          };
        }
      };

      const handleMouseLeave = () => {
        mouseRef.current.isInside = false;
      };

      if (!isMobile) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
      }

    // Get project card positions for electromagnetic fields
    const updateProjectCards = () => {
      const cards = document.querySelectorAll('.project-card');
      projectCardsRef.current = Array.from(cards) as HTMLElement[];
    };

    updateProjectCards();

    // Create nodes with mobile optimization
    const createNodes = () => {
      const nodes = [];
      const spacing = isMobile ? 120 : 100; // Wider spacing on mobile for performance
      const cols = Math.ceil(canvas.offsetWidth / spacing) + 1;
      const rows = Math.ceil(canvas.offsetHeight / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            x: i * spacing + (Math.random() - 0.5) * (isMobile ? 20 : 30),
            y: j * spacing + (Math.random() - 0.5) * (isMobile ? 20 : 30),
            originalX: i * spacing,
            originalY: j * spacing,
            pulsePhase: Math.random() * Math.PI * 2,
            connectionStrength: Math.random(),
            activationLevel: 0,
            lastActivation: 0,
            magneticForce: { x: 0, y: 0 }
          });
        }
      }
      return nodes;
    };

    // Create particles for data flow
    const createParticles = () => {
      return [];
    };

    nodesRef.current = createNodes();
    particlesRef.current = createParticles();

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update node positions with mouse attraction and project card fields
      nodes.forEach(node => {
        // Mouse attraction
        if (mouse.isInside) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.3;
            node.magneticForce.x += (dx / distance) * force;
            node.magneticForce.y += (dy / distance) * force;
          }
        }

        // Project card electromagnetic fields
        projectCardsRef.current.forEach(card => {
          const rect = card.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          const cardX = rect.left - canvasRect.left + rect.width / 2;
          const cardY = rect.top - canvasRect.top + rect.height / 2;
          
          const dx = cardX - node.originalX;
          const dy = cardY - node.originalY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = (200 - distance) / 200 * 0.2;
            const repulsion = distance < 100 ? -0.5 : 0.3;
            node.magneticForce.x += (dx / distance) * force * repulsion;
            node.magneticForce.y += (dy / distance) * force * repulsion;
          }
        });

        // Apply forces and dampening
        node.magneticForce.x *= 0.85;
        node.magneticForce.y *= 0.85;
        
        // Floating animation + magnetic forces
        const floatX = Math.sin(time * 0.001 + node.pulsePhase) * 8;
        const floatY = Math.cos(time * 0.0015 + node.pulsePhase) * 5;
        node.x = node.originalX + floatX + node.magneticForce.x * 20;
        node.y = node.originalY + floatY + node.magneticForce.y * 20;
      });

      // Neural activation waves (reduced frequency on mobile)
      if (time % (isMobile ? 5000 : 3000) < 100) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.activationLevel = 1;
        randomNode.lastActivation = time;
      }

      // Spread activation through network
      nodes.forEach(node => {
        if (node.activationLevel > 0) {
          nodes.forEach(otherNode => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120 && otherNode.activationLevel < node.activationLevel * 0.8) {
              otherNode.activationLevel = node.activationLevel * 0.8;
              otherNode.lastActivation = time;
            }
          });
        }
        
        // Decay activation
        node.activationLevel *= 0.98;
      });

      // Draw connections with enhanced effects
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.2; // Reduced from 0.4
            const highlight = Math.sin(time * 0.002 + node.pulsePhase) * 0.2 + 0.2; // Reduced intensity
            const activation = Math.max(node.activationLevel, otherNode.activationLevel);
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            
            // More subtle gradient with less pink
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            const baseOpacity = opacity * highlight;
            const activatedOpacity = baseOpacity + activation * 0.3; // Reduced from 0.8
            
            gradient.addColorStop(0, `rgba(120, 119, 198, ${activatedOpacity})`);
            gradient.addColorStop(0.5, `rgba(160, 140, 220, ${activatedOpacity * 0.8})`); // Less intense pink
            gradient.addColorStop(1, `rgba(120, 119, 198, ${activatedOpacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + activation * 1; // Reduced line width
            ctx.stroke();

            // Create particles along strong connections (fewer on mobile)
            if (Math.random() < (isMobile ? 0.001 : 0.002) && distance < 100) { // Reduced particle frequency
              particles.push({
                x: node.x,
                y: node.y,
                targetX: otherNode.x,
                targetY: otherNode.y,
                progress: 0,
                life: 1,
                speed: 0.02 + Math.random() * 0.03,
                size: 2 + Math.random() * 3
              });
            }
          }
        });
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.progress += particle.speed;
        particle.life -= 0.01;

        if (particle.progress >= 1 || particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Interpolate position
        particle.x = particle.x + (particle.targetX - particle.x) * particle.progress;
        particle.y = particle.y + (particle.targetY - particle.y) * particle.progress;

        // Draw particle with trail
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.life * 0.8})`;
        ctx.fill();

        // Particle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 140, 220, ${particle.life * 0.15})`; // Reduced from 0.3 and less intense color
        ctx.fill();
      }

      // Draw enhanced nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time * 0.003 + node.pulsePhase) * 0.5 + 0.5;
        const baseSize = 2 + pulse * 2;
        const activationSize = baseSize + node.activationLevel * 6;
        
        // Mouse proximity glow
        let proximityGlow = 0;
        if (mouse.isInside) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          proximityGlow = Math.max(0, (100 - distance) / 100);
        }
        
        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, activationSize, 0, Math.PI * 2);
        const nodeOpacity = 0.4 + pulse * 0.4 + node.activationLevel * 0.6 + proximityGlow * 0.5;
        ctx.fillStyle = `rgba(120, 119, 198, ${nodeOpacity})`;
        ctx.fill();
        
        // Enhanced glow for special nodes
        if (node.connectionStrength > 0.7 || node.activationLevel > 0.3 || proximityGlow > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, activationSize * 2.5, 0, Math.PI * 2); // Reduced from * 3
          const glowOpacity = (pulse + node.activationLevel + proximityGlow) * 0.1; // Reduced from 0.2
          ctx.fillStyle = `rgba(160, 140, 220, ${glowOpacity})`; // Less intense color
          ctx.fill();
          
          // Super glow for activated nodes
          if (node.activationLevel > 0.5) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, activationSize * 3, 0, Math.PI * 2); // Reduced from * 5
            ctx.fillStyle = `rgba(255, 255, 255, ${node.activationLevel * 0.05})`; // Reduced from 0.1
            ctx.fill();
          }
        }
      });

      // Enhanced field visualization to cover entire canvas
      projectCardsRef.current.forEach(card => {
        const rect = card.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const cardX = rect.left - canvasRect.left + rect.width / 2;
        const cardY = rect.top - canvasRect.top + rect.height / 2;
        
        // Draw subtle field rings with reduced coverage
        for (let ring = 1; ring <= 2; ring++) { // Reduced from 4 to 2 rings
          const radius = ring * 50; // Reduced from 70
          const opacity = (3 - ring) * 0.02 * Math.sin(time * 0.003 + ring); // Reduced opacity
          
          ctx.beginPath();
          ctx.arc(cardX, cardY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(120, 119, 198, ${Math.abs(opacity)})`;
          ctx.lineWidth = 0.5; // Reduced from 0.8
          ctx.stroke();
        }
      });

      // Removed the bottom gradient overlay that was creating the dense pink pattern

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (!isMobile) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isMobile ? 0.5 : 0.7 }}
    />
  );
};

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "AI Task Manager",
    description: "Smart task management app with AI-powered prioritization and natural language processing.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "Scalable chat platform with video calls, file sharing, and end-to-end encryption.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop",
    technologies: ["React", "Socket.io", "WebRTC", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for complex data analysis with real-time updates and custom charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 5,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with social features and gamification.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    technologies: ["React Native", "Expo", "Firebase", "Health APIs"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on blockchain technology.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    technologies: ["Solidity", "Web3.js", "React", "IPFS"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

export const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

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
        { threshold: isMobile ? 0.1 : 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [projects, isMobile]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Full-Coverage Animated Network Grid Background */}
      <div className="absolute inset-0 bg-background">
        <NetworkGrid />
      </div>
      
      {/* Seamless overlay to ensure full coverage */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/5 via-transparent to-background/10" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-3 sm:mb-4">
            Projects
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
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
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-4 sm:mb-6 group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex gap-2">
                    <a
                      href={project.githubUrl}
                      className="glass-card p-2 rounded-lg hover:glow-effect transition-all duration-300 touch-spacing"
                      aria-label="View on GitHub"
                      onClick={(e) => e.preventDefault()} // Prevent actual navigation for demo
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      className="glass-card p-2 rounded-lg hover:glow-effect transition-all duration-300 touch-spacing"
                      aria-label="View Live Demo"
                      onClick={(e) => e.preventDefault()} // Prevent actual navigation for demo
                    >
                      <Link className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-bold group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-muted/50 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Mobile-specific project actions */}
                {isMobile && (
                  <div className="flex gap-2 pt-2">
                    <button 
                      className="flex-1 glass-card px-3 py-2 rounded-lg font-medium text-xs hover:glow-effect transition-all duration-300"
                      onClick={(e) => e.preventDefault()}
                    >
                      View Code
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-medium py-2 px-3 rounded-lg text-xs transition-all duration-300"
                      onClick={(e) => e.preventDefault()}
                    >
                      Live Demo
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};