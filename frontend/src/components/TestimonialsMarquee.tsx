import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/siteContent';

export const TestimonialsMarquee: React.FC = () => {
  // Duplicate array for seamless infinite looping
  const row1 = [...testimonialsData, ...testimonialsData];

  const partners = [
    {
      name: "ChileCompra",
      category: "Mercado Público",
      logoSrc: "/partners/Logo_ChC.png",
      imgClass: "max-h-8 md:max-h-9 max-w-[160px] scale-150",
    },
    {
      name: "AWS",
      category: "Cloud Infrastructure",
      logoSrc: "/partners/AWS.png",
      imgClass: "max-h-8 md:max-h-9 max-w-[140px] scale-110",
    },
    {
      name: "Google Cloud Platform (GCP)",
      category: "Cloud & AI Infrastructure",
      logoSrc: "/partners/Logo_GpN.png",
      imgClass: "max-h-11 md:max-h-12 max-w-[180px] scale-210",
    },
    {
      name: "Gobierno de Chile",
      category: "Institucional & Normativa",
      logoSrc: "/partners/Logo_GdC.png",
      imgClass: "max-h-11 md:max-h-12 max-w-[180px] scale-140",
    },
  ];

  return (
    <section id="casos-de-exito" className="py-14 md:py-20 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 mb-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-brand-highlight shadow-xs mb-6">
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Casos de Éxito</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-brand-tertiary leading-[1.1] tracking-tight mb-4">
            Lo que dicen quienes escalaron con nosotros.
          </h2>
          <p className="text-brand-support text-base md:text-lg">
            Empresas y marcas que transformaron su presencia digital, se hicieron más eficientes y redujeron sus costos con Gliro.
          </p>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative w-full overflow-hidden hover-pause mb-14">
        {/* Row 1 - Left to Right */}
        <div className="flex overflow-hidden relative">
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

                <div className="pt-2 border-t border-slate-100">
                  <p className="font-poppins font-bold text-brand-tertiary text-sm">{item.name}</p>
                  <p className="text-xs text-brand-support font-medium">{item.company} • {item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partnerships & Ecosystem Strip */}
      <div className="max-w-[1350px] mx-auto px-6 md:px-12">
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-tertiary font-bold px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 inline-block mb-3">
              Partnerships & Ecosistema
            </span>
            {/*<h3 className="text-xl md:text-2xl font-poppins font-bold text-brand-tertiary">
              Conectados con las plataformas e infraestructura líder
            </h3>*/}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="
                  p-6 rounded-2xl bg-slate-50 border border-slate-200/80 
                  hover:bg-white hover:border-brand-highlight/70 hover:shadow-md 
                  transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center group
                "
              >
                <div className="h-14 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={partner.logoSrc}
                    alt={partner.name}
                    className={`w-auto object-contain transition-transform ${partner.imgClass}`}
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-medium text-brand-support group-hover:text-brand-tertiary transition-colors">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
