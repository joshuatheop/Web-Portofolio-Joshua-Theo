import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AchievementWall = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedAchievements = showAll ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 6);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative glass rounded-3xl overflow-hidden aspect-[4/3] interactive"
            >
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-white/70">{achievement.issuer}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="glass px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-nebula-purple hover:text-white transition-all interactive"
        >
          {showAll ? (
            <>Show Less <ChevronUp size={20} /></>
          ) : (
            <>View All Achievements <ChevronDown size={20} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default AchievementWall;
