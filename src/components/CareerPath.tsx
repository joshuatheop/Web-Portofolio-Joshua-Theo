import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREERS, ORGANIZATIONS } from '../constants';
import { Calendar, Briefcase, Award, Building } from 'lucide-react';

type Tab = 'career' | 'organization';

const CareerPath = () => {
  const [activeTab, setActiveTab] = useState<Tab>('career');

  const tabs = [
    { id: 'career', label: 'Career', icon: Briefcase, data: CAREERS },
    { id: 'organization', label: 'Organization', icon: Building, data: ORGANIZATIONS },
  ] as const;

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || CAREERS;

  return (
    <section id="career" className="py-20 relative px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Journey & Roadmap</h2>
          <p className="opacity-50 mb-12">My evolution through organizations and professional roles.</p>
          
          {/* Toggle Switch Design */}
          <div className="flex justify-center mb-16 w-full px-2 lg:px-0">
            <div className="flex w-full max-w-3xl glass p-2 rounded-2xl relative z-10 overflow-x-auto sm:overflow-visible">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-base transition-colors z-20 flex-1 min-w-[120px] sm:min-w-0 whitespace-nowrap ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-nebula-purple rounded-xl -z-10 shadow-[0_0_20px_rgba(109,40,217,0.5)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-nebula-purple via-nebula-blue to-transparent md:-translate-x-1/2 opacity-30" />

          <div className="space-y-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-32"
              >
                {currentData.map((exp, index) => (
                  <div
                    key={exp.title + exp.company}
                    className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${!exp.image ? 'justify-center' : index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content Card */}
                    <div className={`w-full ${exp.image ? 'md:w-1/2' : 'md:w-3/4'} relative`}>
                      <motion.div
                        initial={{ opacity: 0, x: !exp.image ? 0 : index % 2 === 0 ? -50 : 50, y: !exp.image ? 30 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <div className="glass p-10 rounded-[40px] relative group hover:border-nebula-purple/50 transition-all z-20 bg-black/40 dark:bg-black/40">
                          {/* Timeline Dot */}
                          <div className={`absolute w-4 h-4 rounded-full bg-nebula-purple z-10 hidden md:block shadow-[0_0_20px_rgba(109,40,217,0.8)]
                            ${!exp.image 
                              ? 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2' 
                              : `top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-right-[58px]' : '-left-[58px]'}`
                            }`}
                          />

                          <div className="flex items-center gap-3 text-nebula-purple text-xs font-black uppercase tracking-widest mb-6">
                            <Calendar size={14} /> {exp.period}
                          </div>
                          
                          <h3 className="text-3xl font-bold mb-4 leading-tight">{exp.title}</h3>
                          
                          <div className="flex items-center gap-2 opacity-60 mb-6 font-medium">
                            {activeTab === 'career' && <Briefcase size={18} />}
                            {activeTab === 'organization' && <Building size={18} />}
                            <span>{exp.company}</span>
                          </div>

                          <p className="opacity-70 leading-relaxed mb-8 text-lg whitespace-pre-line">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map(skill => (
                              <span key={skill} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Collage Image */}
                    {exp.image && (
                      <div className="w-full md:w-1/2 relative">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                        >
                          <div className="relative group">
                            <div className="absolute -inset-4 bg-nebula-purple/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative glass p-3 rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                              <img
                                src={exp.image}
                                alt={exp.title}
                                className="w-full aspect-[4/3] object-cover rounded-[32px] transition-transform duration-700 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-6 right-6 glass p-4 rounded-2xl flex items-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <Award className="text-nebula-purple" size={20} />
                                <span className="text-xs font-bold uppercase">Key Milestone</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPath;

