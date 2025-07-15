import { useState, useEffect, useRef } from 'react';
import { Github, Link } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
// Import the sorting visualizer image
import sortingVisualizerImg from '@/assets/sorting_visualizer.png';

// Optimized Network Grid Component
const NetworkGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const projectCardsRef = useRef<HTMLElement[]>([]);
  const isMobile = useIsMobile();
  const isVisibleRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);
  const measurementIntervalRef = useRef<number | null>(null);

  // Throttle card position updates for better performance
  const updateProjectCards = () => {
    const now = Date.now();
    // Only update card positions every 1000ms
    if (now - lastUpdateTimeRef.current > 1000) {
      lastUpdateTimeRef.current = now;
      const cards = document.querySelectorAll('.project-card');
      projectCardsRef.current = Array.from(cards) as HTMLElement[];
    }
  };

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

    // Initialize project cards
    updateProjectCards();
    
    // Set up periodic measurement to avoid constant DOM reads
    measurementIntervalRef.current = window.setInterval(updateProjectCards, 1000);

    // Create nodes with fewer nodes for better performance
    const createNodes = () => {
      const nodes = [];
      // Increase spacing to reduce total node count
      const spacing = isMobile ? 150 : 120; 
      const cols = Math.ceil(canvas.offsetWidth / spacing) + 1;
      const rows = Math.ceil(canvas.offsetHeight / spacing) + 1;

      // Limit the maximum number of nodes for performance
      const maxNodes = isMobile ? 50 : 100;
      let count = 0;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (count >= maxNodes) break;
          
          // Skip some nodes for a more natural pattern
          if (Math.random() > 0.8) continue;
          
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
          count++;
        }
        if (count >= maxNodes) break;
      }
      return nodes;
    };

    // Create particles for data flow (simplified)
    const createParticles = () => {
      return [];
    };

    nodesRef.current = createNodes();
    particlesRef.current = createParticles();

    // Check if component is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Optimized animation loop
    const animate = (time: number) => {
      // Skip rendering when not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
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

        // Project card electromagnetic fields (with fewer calculations)
        // Only process first 4 cards for better performance
        projectCardsRef.current.slice(0, 4).forEach(card => {
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
        
        // Floating animation + magnetic forces (increased movement)
        const floatX = Math.sin(time * 0.0015 + node.pulsePhase) * 12;
        const floatY = Math.cos(time * 0.002 + node.pulsePhase) * 8;
        node.x = node.originalX + floatX + node.magneticForce.x * 25;
        node.y = node.originalY + floatY + node.magneticForce.y * 25;
      });

      // Neural activation waves (increased frequency for more intensity)
      if (time % (isMobile ? 4000 : 3000) < 100) {
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
      // Use fewer connections for better performance
      nodes.forEach((node, i) => {
        // Only connect to nearest nodes, not all nodes
        const nearestNodes = nodes
          .slice(i + 1)
          .filter((otherNode) => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < 150;
          })
          .slice(0, isMobile ? 2 : 4); // Limit connections per node

        nearestNodes.forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const opacity = (1 - distance / 150) * 0.4; // Increased base opacity
          const highlight = Math.sin(time * 0.003 + node.pulsePhase) * 0.3 + 0.3; // More pronounced highlight
          const activation = Math.max(node.activationLevel, otherNode.activationLevel);
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          
          // Enhanced gradient with more intensity
          const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
          const baseOpacity = opacity * highlight;
          const activatedOpacity = baseOpacity + activation * 0.5; // Increased activation visibility
          
          gradient.addColorStop(0, `rgba(120, 119, 198, ${activatedOpacity})`);
          gradient.addColorStop(0.5, `rgba(160, 140, 220, ${activatedOpacity * 0.8})`);
          gradient.addColorStop(1, `rgba(120, 119, 198, ${activatedOpacity})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5 + activation * 2; // Thicker lines with more variation
          ctx.stroke();
        });
      });

      // Draw enhanced nodes with increased intensity
      nodes.forEach(node => {
        const pulse = Math.sin(time * 0.004 + node.pulsePhase) * 0.6 + 0.6; // Faster, more pronounced pulse
        const baseSize = 2.5 + pulse * 3; // Larger base size and pulse range
        const activationSize = baseSize + node.activationLevel * 8; // More dramatic activation growth
        
        // Mouse proximity glow
        let proximityGlow = 0;
        if (mouse.isInside) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          proximityGlow = Math.max(0, (100 - distance) / 100);
        }
        
        // Main node with enhanced visibility
        ctx.beginPath();
        ctx.arc(node.x, node.y, activationSize, 0, Math.PI * 2);
        const nodeOpacity = 0.5 + pulse * 0.5 + node.activationLevel * 0.8 + proximityGlow * 0.6; // Increased opacity
        ctx.fillStyle = `rgba(120, 119, 198, ${nodeOpacity})`;
        ctx.fill();
        
        // Enhanced glow with lower threshold for more visible effects
        if (node.activationLevel > 0.2 || proximityGlow > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, activationSize * 2.5, 0, Math.PI * 2); // Larger glow radius
          const glowOpacity = (pulse + node.activationLevel + proximityGlow) * 0.15; // Brighter glow
          ctx.fillStyle = `rgba(160, 140, 220, ${glowOpacity})`;
          ctx.fill();
        }
      });

      // Skip field visualization for better performance
      
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
      observer.disconnect();
      if (measurementIntervalRef.current) {
        clearInterval(measurementIntervalRef.current);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isMobile ? 0.7 : 0.9 }} // Increased overall canvas opacity
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
    title: "Sorting Visualizer",
    description: "Web based sorting visualizer with real-time bar chart animations, JavaScript controls, C++ code samples, and complexity metrics.",
    image: sortingVisualizerImg,
    technologies: ["React", "JavaScript", "C++"],
    githubUrl: "https://github.com/Aditya1914/Sorting_Visualizer",
    liveUrl: "https://sorting-visualizer-lovat-mu.vercel.app/"
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
  const isMobile = useIsMobile();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Header animation
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

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
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 overflow-visible"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6 leading-tight pb-2">
            Projects
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Project Image - removed transition classes that could conflict */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-4 sm:mb-6 group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110"
                  style={{ transition: "transform 0.3s ease" }}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100" 
                     style={{ transition: "opacity 0.3s ease" }}>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex gap-2">
                    <a
                      href={project.githubUrl}
                      className="glass-card p-2 rounded-lg hover:glow-effect touch-spacing"
                      aria-label="View on GitHub"
                      onClick={(e) => e.preventDefault()} // Prevent actual navigation for demo
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      className="glass-card p-2 rounded-lg hover:glow-effect touch-spacing"
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
                <h3 className="text-lg sm:text-xl font-bold hover:gradient-text" 
                    style={{ transition: "color 0.3s ease" }}>
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
                      className="flex-1 glass-card px-3 py-2 rounded-lg font-medium text-xs hover:glow-effect"
                      onClick={(e) => e.preventDefault()}
                    >
                      View Code
                    </button>
                    <button 
                      className="flex-1 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-medium py-2 px-3 rounded-lg text-xs"
                      onClick={(e) => e.preventDefault()}
                    >
                      Live Demo
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};