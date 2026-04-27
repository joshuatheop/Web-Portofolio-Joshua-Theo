import React from 'react';
import { Mail, Phone, Instagram, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Simulation)");
  };

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Let's build something <span className="text-nebula-purple">extraordinary</span> together.
            </h2>

            <div className="space-y-6">
              <a href="mailto:joshuatheo1604@gmail.com" className="flex items-center gap-4 text-xl hover:text-nebula-purple transition-colors interactive">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <Mail size={20} />
                </div>
                joshuatheo1604@gmail.com
              </a>
              <a href="tel:+6285333947309" className="flex items-center gap-4 text-xl hover:text-nebula-purple transition-colors interactive">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                  <Phone size={20} />
                </div>
                +62 853 3394 7309
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <Instagram />, href: "https://www.instagram.com/joshuatheop" },
                { icon: <Linkedin />, href: "https://www.linkedin.com/in/joshua-theo-pasqualito" },
                { icon: <Github />, href: "https://github.com/joshuatheop" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-nebula-purple hover:scale-110 transition-all interactive"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-[40px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/50">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-nebula-purple transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/50">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-nebula-purple transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/50">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-nebula-purple transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-nebula-purple hover:bg-nebula-purple/80 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all interactive"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
