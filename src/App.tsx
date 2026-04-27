import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HeroStats from './components/HeroStats';
import MyServices from './components/MyServices';
import TechStack from './components/TechStack';
import AchievementWall from './components/AchievementWall';
import ProjectJourney from './components/ProjectJourney';
import CareerPath from './components/CareerPath';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CVDownloadButton from './components/CVDownload';
import Logo from './components/Logo';
import InteractiveBackground from './components/InteractiveBackground';
import ProjectDetailPage from './components/ProjectDetailPage';
import AllProjectsPage from './components/AllProjectsPage';
import { MoreVertical, X } from 'lucide-react';

// ── Shell wraps every page with Navbar, Cursor, Background ──
const Shell = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-nebula-purple selection:text-white">
      <CustomCursor />
      <CVDownloadButton />

      {/* Background Layer */}
      <div className="nebula-bg">
        <InteractiveBackground isDark={true} />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden glass p-3 rounded-2xl interactive z-[60]"
          >
            {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
          </button>
          <Logo isDark={true} />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <Navbar isOpen={false} setIsOpen={setIsMenuOpen} />
        </div>
        <div className="w-12 hidden md:block" />
      </header>

      {/* Mobile Navbar overlay */}
      <div className="md:hidden">
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>

      {children}

      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center opacity-30 text-sm">
        <p>© 2026 Joshua Theo Pasqualito. Crafted for the future.</p>
      </footer>
    </div>
  );
};

// ── Home page ──
const HomePage = () => (
  <main className="px-4 md:px-12">
    {/* Hero Section */}
    <section id="identity" className="relative lg:min-h-screen flex flex-col lg:flex-row items-stretch pt-24 lg:pt-0 overflow-hidden">
      <div className="w-full max-w-[85rem] mx-auto flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[55%] space-y-8 px-6 md:px-12 lg:pl-16 xl:pl-24 z-10 py-12 lg:py-32"
        >
          <div className="inline-block px-4 py-2 glass rounded-full text-sm font-bold text-nebula-purple uppercase tracking-widest">
            Future IT Project Manager
          </div>
          <h1 className="text-6xl md:text-7xl xl:text-8xl font-extrabold leading-[0.9] tracking-tighter">
            Joshua Theo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-purple to-nebula-pink">
              Pasqualito
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-60 max-w-lg leading-relaxed font-medium">
            Information Systems student at Telkom University (GPA 3.91).
            A meticulous individual with excellent time management skills and a passion for impactful solutions.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 mt-4">
            <a href="#contact" className="px-8 md:px-10 py-4 md:py-5 bg-nebula-purple text-white font-bold rounded-full hover:scale-105 transition-all interactive shadow-lg shadow-nebula-purple/20">
              Get In Touch
            </a>
            <a href="#projects" className="px-8 md:px-10 py-4 md:py-5 glass rounded-full font-bold hover:bg-white/10 transition-all interactive">
              View Projects
            </a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <div className="w-full lg:w-[35%] relative flex justify-end items-start h-full lg:min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="relative z-10 w-full h-full flex justify-end overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
          >
            <img
              src="/foto.png"
              alt="Joshua Theo Pasqualito"
              className="w-full max-w-lg lg:max-w-none h-auto lg:h-[100vh] object-cover object-top transition-transform duration-700 hover:scale-[1.02] shadow-2xl lg:shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <HeroStats />
    <MyServices />
    <TechStack />
    <ProjectJourney />
    <CareerPath />

    {/* Achievement Wall */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-4">Achievement & Honor Wall</h2>
          <p className="opacity-50">Recognition of excellence and dedication.</p>
        </div>
        <AchievementWall />
      </div>
    </section>

    <Testimonials />
    <Contact />
  </main>
);

// ── Root App with router ──
export default function App() {
  // Always dark mode
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
