import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'About', href: '#identity' },
    { name: 'Projects', href: '/projects' },
    { name: 'Career', href: '#career' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen?.(false);
    
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        // We are already on the home page, just scroll
        const el = document.getElementById(href.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // We are on another page, navigate to home with the hash
        navigate('/' + href);
      }
    } else {
      // It's a standard route like '/projects'
      if (location.pathname !== href) {
         navigate(href);
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      // Small delay to ensure the page has rendered before scrolling
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:block"
      >
        <div className="glass px-8 py-3 rounded-full flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href.startsWith('#') ? '/' + item.href : item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col items-start justify-center p-12 gap-10"
          >
            <div className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-4">Navigation</div>
            {navItems.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <a
                  href={item.href.startsWith('#') ? '/' + item.href : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-5xl font-extrabold hover:text-nebula-purple transition-all hover:translate-x-4 flex items-center gap-4 group cursor-pointer"
                >
                  <span className="text-nebula-purple opacity-0 group-hover:opacity-100 transition-opacity">/</span>
                  {item.name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
