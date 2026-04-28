import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  yOffset?: number;
  xOffset?: number;
  duration?: number;
  delay?: number;
  className?: string;
  width?: string;
}

export const ScrollReveal = ({
  children,
  yOffset = 50,
  xOffset = 0,
  duration = 0.8,
  delay = 0,
  className = "",
  width = "100%"
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "", delayChildren = 0.1, staggerChildren = 0.1 }: { children: React.ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", yOffset = 30 }: { children: React.ReactNode, className?: string, yOffset?: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
