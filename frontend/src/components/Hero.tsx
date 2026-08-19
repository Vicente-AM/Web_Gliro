import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteBrand, heroStats } from '../data/siteContent';
import Scanner from './Scanner';

export const Hero: React.FC = () => {
  return (
    <main
      id="inicio"
      className="
        relative min-h-[620px] md:min-h-[calc(100vh-2rem)] m-2 sm:m-3 md:m-4 rounded-[2rem] md:rounded-[2.5rem] 
        overflow-hidden flex flex-col justify-center items-center shadow-2xl ring-1 ring-slate-900/10 group 
        pt-28 pb-12 sm:pt-32 sm:pb-16 md:py-20
      "
    >
      {/* Interactive WebGL Scanner Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-tertiary">
        <Scanner
          color1="#1ff080"
          color2="#636160"
          color3="#FFFFFF"
          speed={0.3}
          sweepSpeed={0.5}
          sweepWidth={1}
          sweepFalloff={6}
          scale={1.5}
          frequency={2}
          ripple={0.22}
          bandDensity={14}
          lineSharpness={2.5}
          glow={0.22}
          scanDirection="vertical"
          colorSpread={0.5}
          brightness={1}
          contrast={1.5}
          softness={1.4}
          vignette={0.3}
          scanline
          grain
          grainIntensity={0.2}
          opacity={1}
          mouseInteraction
          mouseRadius={0.5}
          mouseStrength={0.5}
          className="w-full h-full"
        />
        {/* Subtle dark vignette overlay for optimal text readability */}
        <div className="absolute inset-0 bg-brand-tertiary/50 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center animate-fade-in-up">
        {/* Title */}
        <div className="space-y-6 max-w-4xl mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-[5rem] font-poppins font-black text-white tracking-tight leading-[1.14] drop-shadow-2xl text-balance">
            Innovación y automatización a tu medida
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed font-light text-balance">
            Desarrollamos software, automatizamos procesos y creamos soluciones SaaS que ahorran tiempo y dinero a nuestros clientes.
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
              transition-all duration-300 shadow-lg w-full sm:w-auto min-w-[240px] text-center flex items-center justify-center gap-2.5
            "
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Agenda con nosotros</span>
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
