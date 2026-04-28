import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Teams Collaborated', value: '10+' },
  { label: 'Projects Led', value: '5+' },
  { label: 'Projects Completed', value: '10+' }
];

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const chars = '01#@$%&*^<>{}[]+=/\\!?';

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    let interval: any = null;

    interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Controls speed of settling
    }, 40);

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="inline-block relative glitch-text-hover"
      data-text={text}
    >
      {displayText}
    </span>
  );
};

const HeroStats = () => {
  return (
    <section className="py-12 relative z-20 mt-16 md:mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group relative cursor-crosshair pt-8 md:pt-0 first:pt-0 flex flex-col items-center justify-center"
            >
              <div className="text-5xl md:text-7xl font-black text-white relative inline-block leading-none font-mono tracking-tighter w-full min-h-[80px] flex items-center justify-center">
                <ScrambleText text={stat.value} />
              </div>
              <p className="text-xs md:text-sm text-white uppercase tracking-[0.2em] mt-2 font-bold opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:tracking-[0.3em] group-hover:text-nebula-blue">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .glitch-text-hover {
           transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .group:hover .glitch-text-hover {
           color: #fff;
           text-shadow: 2px 0px 5px rgba(0, 255, 249, 0.8), -2px 0px 5px rgba(255, 0, 193, 0.8);
        }
      `}</style>
    </section>
  );
};

export default HeroStats;
