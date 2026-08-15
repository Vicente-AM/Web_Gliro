import React from 'react';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { siteBrand, heroStats } from '../data/siteContent';

export const Hero: React.FC = () => {
  return (
    <main
      id="inicio"
      className="
        relative min-h-[640px] md:min-h-[calc(100vh-2rem)] m-2.5 md:m-4 rounded-[2.5rem] 
        overflow-hidden flex flex-col justify-center items-center shadow-2xl ring-1 ring-slate-900/10 group py-16 md:py-20
      "
    >
      {/* Background Image with Dark Vignette and Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
          alt="Gliro Software e Innovación"
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[12s] ease-out"
        />
        <div className="absolute inset-0 bg-brand-tertiary/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-brand-tertiary/70 to-black/50"></div>
        {/* Glow Accent Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-highlight/20 rounded-full blur-[130px] pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center animate-fade-in-up">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-8 hover:bg-white/20 transition-all duration-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-highlight animate-pulse" />
          <span>Software · Automatización · IA</span>
        </div>

        {/* Title */}
        <div className="space-y-6 max-w-4xl mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-[5rem] font-poppins font-black text-white tracking-tight leading-[1.08] drop-shadow-2xl text-balance">
            Innovación y automatización <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-highlight">
              a tu medida
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed font-light text-balance">
            Desarrollamos software personalizado, automatizamos procesos con IA y creamos soluciones SaaS que ahorran tiempo y dinero a empresas en Chile.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center w-full max-w-md sm:max-w-none mb-12">
          <a
            href={siteBrand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-brand-highlight text-brand-tertiary px-8 py-4 rounded-full font-poppins font-bold 
              hover:bg-white hover:scale-105 active:scale-95 
              transition-all duration-300 shadow-xl shadow-brand-highlight/20 w-full sm:w-auto min-w-[240px] text-center flex items-center justify-center gap-2.5
            "
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Conversemos por WhatsApp</span>
          </a>
          <a
            href="#productos"
            className="
              px-8 py-4 text-white font-medium hover:text-brand-highlight hover:border-brand-highlight/40 flex items-center gap-2 group 
              transition-all bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-full border border-white/20 
              w-full sm:w-auto min-w-[220px] justify-center active:scale-95
            "
          >
            <span>Ver nuestros productos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl w-full pt-6 border-t border-white/15">
          {heroStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
              <span className="text-2xl md:text-3xl font-poppins font-black text-brand-highlight">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-slate-300 font-medium text-center mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
