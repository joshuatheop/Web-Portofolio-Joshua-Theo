import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

const Testimonials = () => {
  // We duplicate array multiples times to make sure it covers wide screens smoothly 
  // and allows a 50% translation to look seamless since the first half matches the second half.
  const marqueeItemsRow1 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const marqueeItemsRow2 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].reverse();

  const renderCard = (t: any, i: number) => (
    <div
      key={i}
      className="glass p-8 rounded-3xl w-[350px] md:w-[450px] whitespace-normal flex flex-col gap-6 hover:-translate-y-2 transition-transform duration-300 border border-white/5 mx-4 shrink-0"
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, idx) => (
          <Star key={idx} size={18} className="fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-lg md:text-xl italic opacity-90 leading-relaxed font-medium">"{t.quote}"</p>
      <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nebula-purple to-nebula-blue flex justify-center items-center text-white text-xl font-bold shadow-lg shrink-0">
          {t.author.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-lg text-white">{t.author}</p>
          <p className="text-sm text-nebula-blue font-semibold uppercase tracking-wider">{t.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="py-24 overflow-hidden relative">
      {/* Title Section */}
      <div className="text-center mb-16 px-6 relative z-10">
        <h2 className="text-5xl font-bold mb-4">What They Say</h2>
        <p className="opacity-50 text-lg max-w-2xl mx-auto">Impact and impressions left on clients and colleagues.</p>
      </div>

      <div className="relative flex flex-col gap-8 w-full block">
        {/* Row 1: Moves Left */}
        <div className="flex w-max animate-marquee">
          {marqueeItemsRow1.map((t, i) => renderCard(t, i))}
        </div>
        
        {/* Row 2: Moves Right */}
        <div className="flex w-max animate-marquee-reverse">
          {marqueeItemsRow2.map((t, i) => renderCard(t, i))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 60s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
