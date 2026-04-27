import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SKILLS } from '../constants';

const SkillsOrbit = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.orbit-item');
    const radius = 180;
    const total = items.length;

    items.forEach((item, index) => {
      const angle = (index / total) * Math.PI * 2;
      
      gsap.set(item, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 0
      });

      gsap.to(item, {
        duration: 20,
        repeat: -1,
        ease: "none",
        onUpdate: function() {
          const progress = this.progress();
          const currentAngle = angle + progress * Math.PI * 2;
          gsap.set(item, {
            x: Math.cos(currentAngle) * radius,
            y: Math.sin(currentAngle) * radius,
            z: Math.sin(currentAngle) * 50,
            scale: 0.8 + (Math.sin(currentAngle) + 1) * 0.2,
            opacity: 0.5 + (Math.sin(currentAngle) + 1) * 0.25,
          });
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center perspective-1000">
      {SKILLS.map((skill, i) => (
        <div
          key={skill}
          className="orbit-item absolute glass px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

export default SkillsOrbit;
