import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Link } from 'lucide-react';

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
    icon: "💻"
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
    icon: "🐙"
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
    icon: "💼"
  }
];

const achievementBadges = [
  { name: "Top Contributor", description: "GitHub Arctic Code Vault Contributor", color: "from-blue-500 to-cyan-500" },
  { name: "Algorithm Expert", description: "LeetCode Contest Rating 2100+", color: "from-orange-500 to-red-500" },
  { name: "Open Source", description: "Maintainer of 5+ popular repositories", color: "from-green-500 to-emerald-500" },
  { name: "Community Leader", description: "Tech meetup organizer & speaker", color: "from-purple-500 to-pink-500" }
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
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Professional Profiles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with me across different platforms and see my contributions
          </p>
        </div>

        {/* Achievement Badges */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Achievements & Recognition</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievementBadges.map((badge, index) => (
              <div
                key={badge.name}
                className={`transition-all duration-1000 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-4 scale-95'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="glass-card p-4 rounded-xl text-center hover:glow-effect transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h4 className="font-semibold mb-1">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Profiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <div
              key={profile.platform}
              ref={el => itemRefs.current[index + achievementBadges.length] = el}
              className={`transition-all duration-1000 ${
                visibleItems.includes(index + achievementBadges.length) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + achievementBadges.length) * 0.1}s` }}
            >
              <div className="glass-card p-6 rounded-2xl h-full hover:glow-effect transition-all duration-300 group">
                {/* Platform Header */}
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${profile.color} rounded-xl flex items-center justify-center text-2xl mr-4`}>
                    {profile.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{profile.platform}</h3>
                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 text-sm">
                  {profile.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(profile.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold gradient-text">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Visit Button */}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-medium py-3 px-4 rounded-xl hover:from-primary hover:to-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  Visit Profile
                  <Link className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Let's Connect & Collaborate</h3>
            <p className="text-muted-foreground mb-6">
              I'm always interested in discussing new opportunities, sharing knowledge, 
              or collaborating on exciting projects. Feel free to reach out!
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="mailto:aditya75871@gmail.com"
                className="bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="#resume-download"
                className="glass-card px-6 py-3 rounded-xl font-semibold hover:glow-effect transition-all duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};