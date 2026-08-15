import React from 'react';
import { Sparkles, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { methodologySteps, siteBrand } from '../data/siteContent';

export const SvaMethodology: React.FC = () => {
  const icons = [Zap, Target, TrendingUp];

  return (
    <section id="sva" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[1350px] mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden px-6 py-14 md:px-16 md:py-20 bg-brand-tertiary text-white shadow-2xl border border-slate-700/50">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-highlight/15 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Section Heading */}
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-highlight text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Metodología Exclusiva Gliro</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-black leading-[1.1] tracking-tight">
              Escala tus Resultados con la <br className="hidden sm:inline" />
              <span className="text-brand-highlight">Metodología SVA</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Google Ads Estratégico es el motor más rápido para capturar demanda. Cuando la base está validada, integramos el Sistema de Valor Aumentado (SVA) para desbloquear un crecimiento exponencial.
            </p>
          </div>

          {/* 3 Steps Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {methodologySteps.map((item, idx) => {
              const IconComponent = icons[idx] || Zap;
              return (
                <div
                  key={item.step}
                  className="
                    p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm 
                    hover:bg-white/10 hover:border-brand-highlight/50 transition-all duration-300 flex flex-col justify-between group
                  "
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-poppins font-black text-brand-highlight/80 group-hover:text-brand-highlight transition-colors">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-highlight group-hover:bg-brand-highlight group-hover:text-brand-tertiary transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-poppins font-bold text-white mb-3 group-hover:text-brand-highlight transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SVA CTA */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 text-center">
            <a
              href={siteBrand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-8 py-4 bg-brand-highlight text-brand-tertiary 
                rounded-full font-poppins font-bold text-base md:text-lg hover:bg-white hover:scale-105 active:scale-95 
                transition-all duration-300 shadow-xl shadow-brand-highlight/20
              "
            >
              <span>Comienza Ahora</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contacto"
              className="px-6 py-4 text-white hover:text-brand-highlight text-sm md:text-base font-semibold transition-colors"
            >
              Solicitar diagnóstico gratuito
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
