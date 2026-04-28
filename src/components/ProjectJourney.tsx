import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowRight, ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)$/i.test(src);

const ProjectJourney = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const project = PROJECTS[activeIndex];

  const handleNext = useCallback(() => {
    if (activeIndex < PROJECTS.length - 1) {
      setDirection(1);
      setActiveIndex((i) => i + 1);
    }
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex((i) => i - 1);
    }
  }, [activeIndex]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <ScrollReveal yOffset={30}>
          <div>
            <h2 className="text-5xl font-bold mb-2">Project Showcase</h2>
            <p className="opacity-50 text-sm">
              My professional journey and selected works.
            </p>
          </div>
        </ScrollReveal>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 px-6 py-3 glass rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all interactive border border-white/20 shrink-0 group"
        >
          Lihat Semua
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* ── Main Stage ── */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-0 md:gap-8 items-center min-h-[500px]"
          >
            {/* ── LEFT PANEL ── */}
            <div className="hidden md:flex flex-col justify-between h-full py-8 pr-4 border-r border-white/10">
              {/* Top label */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-40 mb-1">
                  Project Showcase
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-20">
                  Joshua Theo Portfolio
                </p>
              </div>

              {/* Big Title */}
              <div>
                <h3 className="text-4xl xl:text-5xl font-extrabold uppercase leading-tight tracking-tighter mb-3">
                  {project.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                  {project.role}
                </p>
              </div>

              {/* Skills preview */}
              <div className="space-y-1.5">
                {(project.detailSkills ?? project.skills).slice(0, 4).map((s, i) => (
                  <p key={i} className="text-[11px] uppercase tracking-widest opacity-30 font-medium">
                    — {s}
                  </p>
                ))}
              </div>
            </div>

            {/* ── CENTER IMAGE ── */}
            <div className="relative group cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
              {/* Index watermark */}
              <p className="absolute -top-6 left-0 text-[10px] font-bold uppercase tracking-[0.3em] opacity-20 z-10">
                {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </p>

              {/* Image/Video container */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
                {isVideo(project.image) ? (
                  <video
                    src={project.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                </div>
              </div>

              {/* Mobile title */}
              <div className="md:hidden mt-4">
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">{project.role}</p>
                <h3 className="text-3xl font-extrabold uppercase tracking-tight">{project.title}</h3>
              </div>

              {/* Bottom bar */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest opacity-30">
                  {project.period}
                </p>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, '_blank'); }}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <Github size={12} />
                      GitHub
                    </button>
                  )}
                  {project.demoUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); window.open(project.demoUrl, '_blank'); }}
                      className="px-3 py-1.5 bg-nebula-purple/80 hover:bg-nebula-purple border border-nebula-purple/40 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors text-white"
                    >
                      <ExternalLink size={12} />
                      Demo
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.id}`); }}
                    className="px-3 py-1.5 bg-white text-black hover:bg-white/90 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    Detail
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="hidden md:flex flex-col justify-between h-full py-8 pl-4 border-l border-white/10">
              {/* Top label */}
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-40 mb-1">
                  {project.industry ?? project.category}
                </p>
                {project.associatedWith && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-20">
                    {project.associatedWith}
                  </p>
                )}
              </div>

              {/* Big number */}
              <div className="text-right">
                <p className="text-8xl font-extrabold leading-none tabular-nums"
                  style={{ opacity: 0.06 }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-30 -mt-2">
                  /{String(PROJECTS.length).padStart(2, '0')}
                </p>
                <p className="text-sm font-bold mt-4 opacity-60 leading-relaxed text-right max-w-[180px] ml-auto">
                  {project.description}
                </p>
              </div>

              {/* Category */}
              <div className="text-right">
                <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {project.category}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── NAVIGATION ── */}
        <div className="mt-8 flex items-center justify-between">
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                className="transition-all duration-300"
                aria-label={`Go to project ${i + 1}`}
              >
                <div
                  className="rounded-full bg-white transition-all duration-300"
                  style={{
                    width: i === activeIndex ? '24px' : '8px',
                    height: '8px',
                    opacity: i === activeIndex ? 1 : 0.3,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === PROJECTS.length - 1}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 hover:bg-white/15 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectJourney;