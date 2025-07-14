import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';
import { SiGithub, SiLinkedin, SiLeetcode } from 'react-icons/si';
import { useIsMobile } from '@/hooks/use-mobile';

// Simple Graph Grid Component
const GraphGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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

    // Grid parameters
    const spacing = 16; // Tighter square grid spacing
    let breathe = 0;

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Very subtle breathing effect
      breathe = Math.sin(time * 0.002) * 0.1 + 0.1;

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const maxDistanceX = canvas.offsetWidth / 2;
      const maxDistanceY = canvas.offsetHeight / 2;

      // Draw horizontal lines with very gradual fade to vanish
      for (let y = 0; y <= canvas.offsetHeight; y += spacing) {
        const distanceFromCenter = Math.abs(y - centerY);
        const normalizedDistance = distanceFromCenter / maxDistanceY;
        // More gradual fade using power curve
        const fadeAmount = Math.max(0, Math.pow(1 - normalizedDistance, 2.5));
        const opacity = fadeAmount * 0.8 + breathe * 0.1;

        if (opacity > 0.02) { // Only draw if visible
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.offsetWidth, y);
          ctx.strokeStyle = `rgba(120, 119, 198, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw vertical lines with very gradual fade to vanish
      for (let x = 0; x <= canvas.offsetWidth; x += spacing) {
        const distanceFromCenter = Math.abs(x - centerX);
        const normalizedDistance = distanceFromCenter / maxDistanceX;
        // More gradual fade using power curve
        const fadeAmount = Math.max(0, Math.pow(1 - normalizedDistance, 2.5));
        const opacity = fadeAmount * 0.8 + breathe * 0.1;

        if (opacity > 0.02) { // Only draw if visible
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.offsetHeight);
          ctx.strokeStyle = `rgba(120, 119, 198, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Add 3D gradient overlay for depth effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(maxDistanceX, maxDistanceY)
      );
      gradient.addColorStop(0, 'rgba(120, 119, 198, 0.1)');
      gradient.addColorStop(0.3, 'rgba(120, 119, 198, 0.05)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const profiles = [
  {
    platform: "LeetCode",
    username: "adityaleo1411",
    stats: {
      solved: "900+",
      rank: "under 26k",
      contests: "35+"
    },
    description: "Competitive programming enthusiast with focus on algorithms and data structures",
    url: "https://leetcode.com/u/adityaleo1411/",
    color: "from-orange-500 to-yellow-500",
    icon: SiLeetcode
  },
  {
    platform: "GitHub",
    username: "Aditya1914",
    stats: {
      repositories: "30+",
      personal_projects: "10+",
      contributions: "250+"
    },
    description: "Open source contributor building SaaS MVPs and modern web applications",
    url: "https://github.com/Aditya1914",
    color: "from-gray-700 to-gray-900",
    icon: SiGithub
  },
  {
    platform: "LinkedIn",
    username: "r-aditya-subramanyam",
    stats: {
      connections: "3.5k+",
      posts: "25+",
      engagements: "250+"
    },
    description: "Professional network focused on software development and AI technologies",
    url: "https://www.linkedin.com/in/r-aditya-subramanyam/",
    color: "from-blue-600 to-blue-800",
    icon: SiLinkedin
  }
];

export const Profiles = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
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
  }, [isMobile]);

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      {/* Simple Graph Grid Background */}
      <div className="absolute inset-0">
        <GraphGrid />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold gradient-text mb-3 sm:mb-4">
            Professional Profiles
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-body px-4">
            Connect with me across different platforms and see my contributions
          </p>
        </motion.div>

        {/* Platform Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.platform}
              ref={el => itemRefs.current[index] = el}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={!isMobile ? { scale: 1.05, y: -10 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="neuro-card p-4 sm:p-6 rounded-xl sm:rounded-2xl h-full hover:glow-effect transition-all duration-500 group cursor-pointer touch-spacing">
                {/* Platform Header */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${profile.color} rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg`}>
                    <profile.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-heading font-bold truncate">{profile.platform}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm font-body leading-relaxed line-clamp-3">
                  {profile.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {Object.entries(profile.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm sm:text-lg font-bold gradient-text font-heading">{value}</div>
                      <div className="text-2xs sm:text-xs text-muted-foreground capitalize font-body break-words">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {/* Visit Button */}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-glass py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-2 group-hover:scale-105 transition-all duration-300 text-xs sm:text-sm min-h-[40px]"
                >
                  Visit Profile
                  <Link className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl max-w-3xl mx-auto hover:glow-effect transition-all duration-500 touch-spacing">
            <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">Let's Connect & Collaborate</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 font-body text-sm sm:text-base leading-relaxed px-2">
              I'm always interested in discussing new opportunities, sharing knowledge, 
              or collaborating on exciting projects. Feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:aditya75871@gmail.com"
                className="btn-sleek-primary px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px] flex items-center justify-center font-semibold"
              >
                Get In Touch
              </a>
              <a
                href="#resume-download"
                className="btn-sleek-glass px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px] flex items-center justify-center font-semibold"
                onClick={(e) => e.preventDefault()} // Prevent actual navigation for demo
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};