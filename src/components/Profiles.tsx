import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'lucide-react';
import { SiGithub, SiLinkedin, SiLeetcode } from 'react-icons/si';

const profiles = [
  {
    platform: "LeetCode",
    username: "adityaleo1411",
    stats: {
      solved: "200+",
      rating: "1850",
      contests: "25+"
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
      stars: "100+",
      contributions: "500+"
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
      connections: "1k+",
      posts: "50+",
      endorsements: "100+"
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

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
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
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
            Professional Profiles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Connect with me across different platforms and see my contributions
          </p>
        </motion.div>

        {/* Platform Profiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.platform}
              ref={el => itemRefs.current[index] = el}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="neuro-card p-6 rounded-2xl h-full hover:glow-effect transition-all duration-500 group cursor-pointer">
                {/* Platform Header */}
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${profile.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                    <profile.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">{profile.platform}</h3>
                    <p className="text-sm text-muted-foreground font-mono">@{profile.username}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 text-sm font-body leading-relaxed">
                  {profile.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(profile.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold gradient-text font-heading">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize font-body">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Visit Button */}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-glass py-2 px-4 rounded-xl font-medium flex items-center justify-center gap-2 group-hover:scale-105 transition-all duration-300"
                >
                  Visit Profile
                  <Link className="w-4 h-4" />
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
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto hover:glow-effect transition-all duration-500">
            <h3 className="text-2xl font-heading font-bold mb-4">Let's Connect & Collaborate</h3>
            <p className="text-muted-foreground mb-6 font-body">
              I'm always interested in discussing new opportunities, sharing knowledge, 
              or collaborating on exciting projects. Feel free to reach out!
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="mailto:aditya75871@gmail.com"
                className="btn-primary px-6 py-3 rounded-xl font-semibold"
              >
                Get In Touch
              </a>
              <a
                href="#resume-download"
                className="btn-glass px-6 py-3 rounded-xl font-semibold"
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