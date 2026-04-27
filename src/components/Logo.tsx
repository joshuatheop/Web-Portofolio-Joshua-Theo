import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  isDark: boolean;
}

const Logo = ({ isDark }: LogoProps) => {
  const darkLogo = "/logo-dark.png";
  const lightLogo = "/logo-light.png";

  return (
    <Link to="/" aria-label="Go to home">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative w-12 h-12 flex items-center justify-center interactive overflow-hidden rounded-full border border-black/10 dark:border-white/10 shadow-sm bg-white dark:bg-black"
      >
        <img
          src={isDark ? darkLogo : lightLogo}
          alt="JTP Logo"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
