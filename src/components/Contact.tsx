import React from 'react';
import { Mail, Phone, Instagram, Linkedin, Github, Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { ScrollReveal } from './ScrollReveal';

const Contact = () => {
  const [state, handleSubmit] = useForm("mbdqeajk");

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <ScrollReveal yOffset={40}>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Let's build something <span className="text-nebula-purple">extraordinary</span> together.
              </h2>
            </ScrollReveal>

            <ScrollReveal yOffset={40} delay={0.2}>
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
            </ScrollReveal>

            <ScrollReveal yOffset={40} delay={0.4}>
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
            </ScrollReveal>
          </div>

          <ScrollReveal yOffset={60} delay={0.6}>
            <div className="glass p-10 rounded-[40px]">
            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center py-10">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Pesan Terkirim!</h3>
                <p className="text-white/60">Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-white/50">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-nebula-purple transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-white/50">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-nebula-purple transition-colors"
                    placeholder="your@email.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1 block" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-white/50">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-nebula-purple transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1 block" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-nebula-purple hover:bg-nebula-purple/80 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all interactive disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? 'Mengirim...' : 'Kirim Pesan'} <Send size={20} />
                </button>
              </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
