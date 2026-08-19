import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteBrand } from '../data/siteContent';
import FaultyTerminal from './FaultyTerminal';

export const AdvisorBanner: React.FC = () => {
  return (
    <section className="py-8 md:py-12 px-4 md:px-8 bg-white">
      <div className="max-w-[1350px] mx-auto">
        <div
          className="
            relative rounded-[2.5rem] overflow-hidden 
            bg-brand-tertiary text-white 
            border border-slate-700/50 shadow-2xl
          "
        >
          {/* Interactive WebGL FaultyTerminal Background */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-brand-tertiary">
            <FaultyTerminal
              scale={2}
              gridMul={[2, 1]}
              digitSize={1}
              timeScale={0.5}
              pause={false}
              scanlineIntensity={0.6}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.15}
              tint="#1ff080"
              mouseReact
              mouseStrength={0.5}
              pageLoadAnimation
              brightness={0.8}
              className="w-full h-full"
            />
            {/* Dark overlay for optimal text contrast */}
            <div className="absolute inset-0 bg-brand-tertiary/70 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-brand-tertiary/60 to-black/80 pointer-events-none"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 gap-8 relative z-10">
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="inline-block text-brand-highlight font-mono text-xs uppercase tracking-widest font-bold px-3.5 py-1 rounded-full bg-white/10 border border-white/10">
                Atención Directa
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-black leading-tight">
                ¿Tienes un desafío técnico o quieres ver un demo?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Habla directamente con nuestro equipo de ingeniería y producto. Analizamos tu proceso actual y te orientamos sin costo.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a
                href={siteBrand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-3 px-8 py-4 
                  bg-brand-highlight text-brand-tertiary rounded-full font-poppins font-bold text-base 
                  hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl w-full sm:w-auto
                "
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Escribir al WhatsApp</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
