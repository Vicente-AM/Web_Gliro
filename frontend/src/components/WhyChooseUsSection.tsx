import React from 'react';
import { Zap, Puzzle, TrendingUp, Handshake } from 'lucide-react';
import { whyChooseUs, clientLogos } from '../data/siteContent';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Puzzle':
        return <Puzzle className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Handshake className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-6 transform hover:scale-105 transition-transform duration-300">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-highlight shadow-[0_0_8px_rgba(31,240,128,0.8)]"></div>
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">¿Por qué elegirnos?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-black text-brand-tertiary leading-[1.15] tracking-tight mb-4">
            No solo escribimos código: construimos productos que ya usan empresas reales.
          </h2>
          <p className="text-brand-support text-base sm:text-lg">
            Combinamos solidez técnica con visión de negocio para entregar valor tangible desde el día uno.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyChooseUs.map((pillar, idx) => (
            <div
              key={idx}
              className="
                p-8 rounded-[2rem] bg-slate-50 border border-slate-200/80 hover:bg-white 
                hover:border-brand-highlight/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group
              "
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-tertiary group-hover:bg-brand-highlight group-hover:border-brand-highlight transition-all duration-300 mb-6 shadow-xs">
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="text-xl font-poppins font-bold text-brand-tertiary mb-3 group-hover:text-brand-highlight transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-brand-support text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Trust Strip */}
        <div className="p-8 md:p-10 rounded-3xl bg-brand-tertiary text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="text-center md:text-left">
            <span className="text-brand-highlight font-mono text-xs uppercase tracking-widest font-bold block mb-1">
              Confianza Comprobada
            </span>
            <h4 className="font-poppins font-bold text-lg text-white">
              Empresas que ya ordenaron y automatizaron su operación con Gliro:
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {clientLogos.map((client, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-slate-200 font-semibold text-xs md:text-sm hover:bg-brand-highlight hover:text-brand-tertiary transition-colors"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
