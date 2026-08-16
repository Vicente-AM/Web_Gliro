import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/siteContent';

export const TestimonialsMarquee: React.FC = () => {
  // Duplicate array for seamless infinite looping
  const row1 = [...testimonialsData, ...testimonialsData];
  const row2 = [...testimonialsData.slice().reverse(), ...testimonialsData.slice().reverse()];

  return (
    <section id="casos-de-exito" className="py-16 md:py-24 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 mb-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-xs mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-highlight shadow-[0_0_8px_rgba(31,240,128,0.8)]"></div>
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Casos de Éxito</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-brand-tertiary leading-[1.1] tracking-tight mb-4">
            Lo que dicen quienes escalaron con nosotros.
          </h2>
          <p className="text-brand-support text-base md:text-lg">
            Empresas y marcas que transformaron su presencia digital y multiplicaron sus ventas con Gliro.
          </p>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative w-full overflow-hidden hover-pause">
        {/* Row 1 - Left to Right */}
        <div className="flex overflow-hidden relative mb-6">
          <div className="flex animate-marquee w-max gap-6">
            {row1.map((item, idx) => (
              <div
                key={`r1-${item.id}-${idx}`}
                className="
                  w-[80vw] sm:w-[420px] md:w-[460px] 
                  shrink-0 
                  bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 
                  shadow-sm hover:shadow-xl hover:border-brand-highlight/60 
                  transition-all duration-300 
                "
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 transform scale-x-[-1]" />
                </div>

                <p className="text-brand-secondary leading-relaxed mb-6 font-normal text-sm md:text-base italic">
                  “{item.text}”
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-brand-tertiary text-brand-highlight font-poppins font-bold text-xs flex items-center justify-center shadow-inner">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="font-poppins font-bold text-brand-tertiary text-sm">{item.name}</p>
                    <p className="text-xs text-brand-support font-medium">{item.company} • {item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex overflow-hidden relative">
          <div className="flex animate-marquee-reverse w-max gap-6">
            {row2.map((item, idx) => (
              <div
                key={`r2-${item.id}-${idx}`}
                className="
                  w-[80vw] sm:w-[420px] md:w-[460px] 
                  shrink-0 
                  bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 
                  shadow-sm hover:shadow-xl hover:border-brand-highlight/60 
                  transition-all duration-300 
                "
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 transform scale-x-[-1]" />
                </div>

                <p className="text-brand-secondary leading-relaxed mb-6 font-normal text-sm md:text-base italic">
                  “{item.text}”
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-brand-tertiary text-brand-highlight font-poppins font-bold text-xs flex items-center justify-center shadow-inner">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="font-poppins font-bold text-brand-tertiary text-sm">{item.name}</p>
                    <p className="text-xs text-brand-support font-medium">{item.company} • {item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
