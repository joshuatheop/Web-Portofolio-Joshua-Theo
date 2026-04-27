import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS } from '../constants';

const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)$/i.test(src);

const CATEGORIES = ['All', 'Digital Product', 'Community Service', 'Research', 'Event'];

const AllProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* ── HEADER ── */}
      <div className="px-6 md:px-16 pt-28 pb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
        <Link to="/" className="hover:opacity-100 transition-opacity flex items-center gap-1">
          <ArrowLeft size={14} />
          Home
        </Link>
        <span>/</span>
        <span className="opacity-100">Projects</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 md:px-16 mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-center mb-10">
          My Projects
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <React.Fragment key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`text-sm md:text-base font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                  ? 'opacity-100'
                  : 'opacity-40 hover:opacity-70'
                  }`}
              >
                {cat}
              </button>
              {i < CATEGORIES.length - 1 && (
                <span className="opacity-20 text-sm">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

      </motion.div>

      {/* ── PROJECT GRID ── */}
      <div className="px-6 md:px-16 pb-24">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              >
                <Link
                  to={`/project/${project.id}`}
                  className="group block relative rounded-2xl overflow-hidden aspect-[4/3]"
                >
                  {isVideo(project.thumbnail ?? project.image) ? (
                    <video
                      src={project.thumbnail ?? project.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={project.thumbnail ?? project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">{project.role}</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">{project.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{project.period}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 opacity-40">
            <p className="text-xl font-bold">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;
