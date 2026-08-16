import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { solutionsData } from '../data/siteContent';

export const SolutionsSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 420 : 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="servicios" className="pt-20 pb-12 md:pb-16 md:pt-28 relative overflow-hidden bg-white">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="w-full mb-12">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-slate-50 border border-brand-highlight shadow-xs mb-6">
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Servicios</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold text-brand-tertiary leading-[1.15] tracking-tight max-w-2xl">
                Desarrollamos soluciones tecnológicas a la medida de tu empresa.
              </h2>
              <p className="text-brand-support text-base md:text-lg mt-3 max-w-xl">
                Transformamos procesos manuales en sistemas inteligentes, seguros y de alto rendimiento.
              </p>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex gap-3 mb-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white text-brand-tertiary flex items-center justify-center hover:bg-brand-tertiary hover:text-white hover:border-brand-tertiary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                aria-label="Servicio anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white text-brand-tertiary flex items-center justify-center hover:bg-brand-tertiary hover:text-white hover:border-brand-tertiary transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                aria-label="Servicio siguiente"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={scrollContainerRef}
          className="
            flex gap-5 md:gap-7 
            overflow-x-auto pb-4 pt-2
            snap-x snap-mandatory 
            no-scrollbar scroll-smooth
          "
        >
          {solutionsData.map((item) => (
            <div
              key={item.id}
              className="
                w-[82vw] max-w-[340px] md:max-w-none
                md:w-[380px] lg:w-[410px]
                h-[440px] md:h-[520px] 
                shrink-0
                snap-center md:snap-start
                relative
                group
                cursor-pointer
              "
            >
              <div
                className="
                  w-full h-full
                  rounded-[2.5rem]
                  relative
                  overflow-hidden
                  shadow-md hover:shadow-2xl hover:shadow-brand-highlight/10 transition-all duration-500
                  border border-slate-200/80
                "
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-brand-tertiary/60 group-hover:bg-brand-tertiary/70 transition-colors duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-between z-10">
                  <div>
                    <span className="inline-block text-brand-highlight font-mono text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-slate-200 text-sm md:text-base leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                    <a
                      href="#contacto"
                      className="mt-4 inline-flex items-center gap-2 text-brand-highlight text-sm font-semibold group-hover:underline"
                    >
                      <span>Consultar por este servicio</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
