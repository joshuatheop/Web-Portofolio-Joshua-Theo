import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    title: 'Project Management',
    description: 'Leading cross-functional teams to deliver projects on time, within scope, and on budget through strategic planning and agile methodologies.',
  },
  {
    title: 'ERP Implementation',
    description: 'Streamlining business processes by deploying robust Enterprise Resource Planning solutions tailored to organizational needs and objectives.',
  },
  {
    title: 'Business Analyst',
    description: 'Bridging the gap between IT and the business to improve efficiency through data-driven analysis and requirements gathering.',
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive, engaging, and user-centered interfaces that solve complex problems and elevate the overall human-computer interaction.',
  }
];

const MyServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="py-20 relative z-10 w-full max-w-[85rem] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Quality Services</h2>
      </div>

      <div className="flex flex-col space-y-4 md:space-y-6 w-full px-4 md:px-0">
        {SERVICES.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(0)}
              className={`group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 transition-all duration-500 cursor-pointer ${isHovered ? 'bg-nebula-purple border-transparent shadow-xl shadow-nebula-purple/20' : 'hover:bg-nebula-purple/5'
                }`}
            >
              <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
                <span className={`text-xl font-medium transition-colors duration-500 ${isHovered ? 'text-white' : 'text-nebula-purple'}`}>
                  0{index + 1}
                </span>
                <h3 className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${isHovered ? 'text-white' : 'text-black/80 dark:text-white/80'}`}>
                  {service.title}
                </h3>
              </div>

              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                <p className={`text-sm md:text-base leading-relaxed transition-opacity duration-300 ${isHovered ? 'opacity-100 text-white' : 'opacity-50'
                  }`}>
                  {service.description}
                </p>
              </div>

              <div className={`hidden md:flex items-center justify-center transition-transform duration-500 ${isHovered ? '' : 'rotate-90'}`}>
                <ArrowUpRight size={28} className={isHovered ? 'text-white' : 'text-black/30 dark:text-white/30'} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyServices;
