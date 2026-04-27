import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Github, ExternalLink, Play, X, Newspaper } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)$/i.test(src);

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);
  const otherProjects = PROJECTS.filter((p) => p.id !== id);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const otherScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Project not found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-nebula-purple text-white rounded-full">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const collage = project.collage ?? [];
  const mainMedia = collage[0];
  const sideMedia = collage.slice(1, 3);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const scrollOthers = (dir: 'left' | 'right') => {
    const el = otherScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* ── BREADCRUMB / BACK ── */}
      <div className="px-6 md:px-16 pt-28 pb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50">
        <Link to="/" className="hover:opacity-100 transition-opacity flex items-center gap-1">
          <ArrowLeft size={14} />
          Home
        </Link>
        <span>/</span>
        <Link to="/projects" className="hover:opacity-100 transition-opacity">Projects</Link>
        <span>/</span>
        <span className="opacity-100">{project.title}</span>
      </div>

      {/* ── HEADER INFO ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 md:px-16 mb-10"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 uppercase tracking-tight">{project.title}</h1>

        {/* Metadata row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-b border-black/10 dark:border-white/10 py-6">
          {project.device && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1 mb-1">
                Device <span className="opacity-60">↘</span>
              </div>
              <div className="text-sm font-semibold uppercase">{project.device}</div>
            </div>
          )}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1 mb-1">
              Role <span className="opacity-60">↘</span>
            </div>
            <div className="text-sm font-semibold uppercase">{project.role}</div>
          </div>
          {project.associatedWith && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1 mb-1">
                Associated With <span className="opacity-60">↘</span>
              </div>
              <div className="text-sm font-semibold uppercase">{project.associatedWith}</div>
            </div>
          )}
          {project.industry && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1 mb-1">
                Industry <span className="opacity-60">↘</span>
              </div>
              <div className="text-sm font-semibold uppercase">{project.industry}</div>
            </div>
          )}
          {project.year && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1 mb-1">
                Year <span className="opacity-60">↘</span>
              </div>
              <div className="text-sm font-semibold uppercase">{project.year}</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── PHOTO COLLAGE ── */}
      {collage.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 md:px-16 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 h-[320px] md:h-[520px]">
            {/* Main large item */}
            {mainMedia && (
              <div
                className="col-span-2 md:col-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                {mainMedia.type === 'video' ? (
                  <>
                    <video
                      src={mainMedia.src}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Play size={24} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={mainMedia.src}
                    alt={mainMedia.alt ?? project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
              </div>
            )}

            {/* Side items (up to 2) */}
            <div className="flex flex-col gap-3 md:gap-4 min-h-0">
              {sideMedia.map((media, i) => (
                <div
                  key={i}
                  className="flex-1 relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(i + 1)}
                >
                  {media.type === 'video' ? (
                    <>
                      <video
                        src={media.src}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                        loop
                        autoPlay
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <Play size={16} className="text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.src}
                      alt={media.alt ?? project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxOpen && collage[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={20} />
            </button>
            {collage.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + collage.length) % collage.length); }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % collage.length); }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {collage[lightboxIndex].type === 'video' ? (
                <video
                  src={collage[lightboxIndex].src}
                  className="w-full h-full object-contain rounded-2xl"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={collage[lightboxIndex].src}
                  alt={collage[lightboxIndex].alt}
                  className="w-full h-full object-contain rounded-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OVERVIEW + SKILLS ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 md:px-16 mb-16 grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {/* Left: Overview, Goal, Approach */}
        <div className="md:col-span-2 space-y-12">
          {project.overview && (
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-widest mb-4">Overview</h2>
              <p className="opacity-70 leading-relaxed text-base">
                {project.overview}
              </p>
            </div>
          )}

          {project.goal && (
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-widest mb-4">The Goal</h2>
              <p className="leading-relaxed text-base opacity-70">
                {project.goal}
              </p>
            </div>
          )}

          {project.approach && project.approach.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold uppercase tracking-widest mb-6">My Approach</h2>
              <div className="space-y-6">
                {project.approach.map((step, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-base mb-2">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="opacity-70 leading-relaxed text-sm">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[#24292e] hover:bg-[#1b1f23] text-white font-bold rounded-xl transition-colors"
              >
                <Github size={18} />
                Visit GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-gray-100 font-bold rounded-xl transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
            {project.articleUrl && (
              <a
                href={project.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[#e84118] hover:bg-[#c23616] text-white font-bold rounded-xl transition-colors"
              >
                <Newspaper size={18} />
                Read Article
              </a>
            )}
          </div>
        </div>

        {/* Right: Skills */}
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-widest mb-6">Skills</h2>
          <ul className="space-y-2">
            {(project.detailSkills ?? project.skills).map((skill, i) => (
              <li key={i} className="flex items-start gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nebula-purple shrink-0" />
                <span
                  className={
                    i % 3 === 0 ? 'font-semibold' :
                      i % 3 === 1 ? 'font-medium' : ''
                  }
                >
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── OTHER PROJECTS ── */}
      {otherProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 md:px-16 py-16 border-t border-black/10 dark:border-white/10"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold uppercase tracking-widest">Other Project</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollOthers('left')}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollOthers('right')}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={otherScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {otherProjects.map((p) => (
              <OtherProjectCard key={p.id} project={p} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const OtherProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/project/${project.id}`}
    className="group flex-shrink-0 w-[260px] md:w-[320px] relative rounded-2xl overflow-hidden block"
    style={{ height: '240px' }}
  >
    {isVideo(project.thumbnail ?? project.image) ? (
      <video
        src={project.thumbnail ?? project.image}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        muted
        loop
        autoPlay
        playsInline
      />
    ) : (
      <img
        src={project.thumbnail ?? project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">{project.role}</p>
      <h3 className="text-xl font-extrabold text-white leading-tight">{project.title}</h3>
      <p className="text-xs text-white/50 mt-1">{project.period}</p>
    </div>
    {/* Hover overlay */}
    <div className="absolute inset-0 border-2 border-nebula-purple/0 group-hover:border-nebula-purple/60 rounded-2xl transition-all duration-300" />
  </Link>
);

export default ProjectDetailPage;
