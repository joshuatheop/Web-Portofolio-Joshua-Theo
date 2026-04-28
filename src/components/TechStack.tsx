import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const techGroups = [
  {
    category: "ERP",
    tools: [
      { name: "SAP", icon: "https://cdn.simpleicons.org/sap/white" },
      { name: "Odoo", icon: "https://cdn.simpleicons.org/odoo/white" }
    ]
  },
  {
    category: "Project Management",
    tools: [
      { name: "Notion", icon: "https://cdn.simpleicons.org/notion/white" },
      { name: "Jira", icon: "https://cdn.simpleicons.org/jira/white" },
      { name: "ClickUp", icon: "https://cdn.simpleicons.org/clickup/white" }
    ]
  },
  {
    category: "Analytics & Design",
    tools: [
      { name: "Meta Ads", icon: "https://cdn.simpleicons.org/meta/white" },
      { name: "Visual Paradigm", icon: "https://cdn.simpleicons.org/visualparadigm/white" } // Visual Paradigm is rare, using fallback or generic if needed, but let's just use text for it or an approximation. Meta is fine.
    ]
  },
  {
    category: "Code & Development",
    tools: [
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/white" },
      { name: "CSS3", icon: "https://cdn.simpleicons.org/css/white" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/white" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python/white" },
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/white" },
      { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/white" }
    ]
  }
];

// Flat list for the marquee
const allTools = techGroups.flatMap(group => group.tools);
// Duplicate for seamless marquee
const marqueeItems = [...allTools, ...allTools, ...allTools];

const TechStack = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <ScrollReveal yOffset={40} duration={0.8}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-12">
        <div className="text-center">
          <p className="opacity-50 max-w-2xl mx-auto">The software, languages, and platforms I use to bring ideas to life.</p>
        </div>
      </div>

      {/* Marquee horizontal strip */}
      <div className="relative flex w-full overflow-hidden py-8">
        {/* Fading edges that match the background instead of pure black */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-tech-marquee items-center gap-12 sm:gap-24 px-12">
          {marqueeItems.map((tool, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 group opacity-50 hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 glass rounded-2xl flex items-center justify-center p-4 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(109,40,217,0.4)]">
                <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>

      <style>{`
        @keyframes tech-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-tech-marquee {
          animation: tech-marquee 40s linear infinite;
        }
        .animate-tech-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
