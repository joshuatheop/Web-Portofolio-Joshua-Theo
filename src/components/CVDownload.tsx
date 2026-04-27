import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const CVDownloadButton = () => {
  return (
    <motion.a
      href="/Joshua Theo Pasqualito Resume.pdf"
      download="Joshua Theo Pasqualito Resume.pdf"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Download CV"
      aria-label="Download CV"
      className="fixed top-6 right-6 z-[60] glass w-12 h-12 rounded-full flex items-center justify-center interactive"
    >
      <FileText size={20} />
    </motion.a>
  );
};

export default CVDownloadButton;
