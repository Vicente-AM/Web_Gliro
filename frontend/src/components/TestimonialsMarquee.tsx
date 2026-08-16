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
      logo: (
        <svg viewBox="0 0 190 42" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0, 3)">
            <rect x="0" y="2" width="13" height="28" rx="3" fill="#003882"/>
            <rect x="16" y="2" width="13" height="28" rx="3" fill="#E31B23"/>
            <circle cx="6.5" cy="16" r="2.5" fill="#FFFFFF"/>
            <circle cx="22.5" cy="16" r="2.5" fill="#FFFFFF"/>
          </g>
          <text x="36" y="24" fontFamily="Poppins, Inter, sans-serif" fontWeight="800" fontSize="17" fill="#282c2f">Chile</text>
          <text x="80" y="24" fontFamily="Poppins, Inter, sans-serif" fontWeight="800" fontSize="17" fill="#E31B23">Compra</text>
          <text x="36" y="35" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="7.5" fill="#636160" letterSpacing="0.8">MERCADO PÚBLICO</text>
        </svg>
      ),
    },
    {
      name: "AWS",
      category: "Cloud Infrastructure",
      logo: (
        <svg viewBox="0 0 140 45" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(5, 4)">
            {/* Letter 'a' */}
            <path d="M12.5 12h5.5l8 17h-6l-1.6-3.8H12l-1.6 3.8H4.5l8-17zm3.4 9.2l-2-4.9-2 4.9h4z" fill="#232F3E"/>
            {/* Letter 'w' */}
            <path d="M30 12h5.5l3.8 11.4 4-11.4h5.2l4 11.4 3.8-11.4h5.5l-6.8 17h-5.4l-4-10.8-4 10.8h-5.4L30 12z" fill="#232F3E"/>
            {/* Letter 's' */}
            <path d="M64 25.5c1.5 1 3.4 1.5 5.3 1.5 2.7 0 4.1-1.2 4.1-2.7 0-1.6-1.2-2.3-4-3-4-1-6.8-2.3-6.8-6.1 0-3.6 3-6 7.5-6 2.7 0 4.8.7 6.4 1.8l-2.1 4c-1.2-.7-2.8-1.3-4.3-1.3-2.1 0-3.2 1-3.2 2.1 0 1.3 1.1 2 3.8 2.7 4.2 1.1 7 2.3 7 6.2 0 3.9-3.1 6.3-8.3 6.3-3 0-5.7-.9-7.6-2.3l2.2-4.2z" fill="#232F3E"/>
            {/* Smile Arrow */}
            <path d="M10 33c23 7.5 60 7.5 83 0 2.2-.7 3.7.7 2.6 2.3-12.4 9.3-60.3 10.2-87.8 1-1.7-.5-.6-2.7 2.2-3.3z" fill="#FF9900"/>
            <path d="M94.5 30.5l8 5.7-9.8 1.3 1.8-7z" fill="#FF9900"/>
          </g>
        </svg>
      ),
    },
    {
      name: "Google",
      category: "Google Cloud Ecosystem",
      logo: (
        <svg viewBox="0 0 160 42" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0, 4)">
            {/* Google Multi-color G */}
            <g transform="translate(2, 1)">
              <path d="M18 14.5c0-1-.1-2-.3-3H0v6h10.2c-.5 2.4-1.8 4.4-3.8 5.8v4.8h6.2c3.6-3.4 5.7-8.3 5.7-13.6z" fill="#4285F4"/>
              <path d="M12.8 27.5c3.5 0 6.4-1.1 8.5-3.1l-6.2-4.8c-1.8 1.2-4 1.8-6.3 1.8-4.8 0-8.9-3.2-10.3-7.6H-3.8v4.9C.3 23.7 6.1 27.5 12.8 27.5z" fill="#34A853" transform="translate(5, 0)"/>
              <path d="M7.5 13.8c-.4-1.2-.6-2.4-.6-3.8s.2-2.6.6-3.8V1.3H1.3C-.1 4.1-.9 7.2-.9 10s.8 5.9 2.2 8.7l6.2-4.9z" fill="#FBBC05"/>
              <path d="M12.8 4.6c1.9 0 3.5.7 4.9 1.9l3.6-3.6C19.2 1 16.3 0 12.8 0 6.1 0 .3 3.8-3.8 8.8l6.3 4.9c1.4-4.4 5.5-9.1 10.3-9.1z" fill="#EA4335" transform="translate(5, 0)"/>
            </g>
            <text x="38" y="21" fontFamily="Product Sans, Inter, sans-serif" fontWeight="700" fontSize="18" fill="#282c2f">Google</text>
            <text x="38" y="31" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="7" fill="#636160" letterSpacing="0.8">CLOUD PARTNER</text>
          </g>
        </svg>
      ),
    },
    {
      name: "Gobierno de Chile",
      category: "Institucional & Normativa",
      logo: (
        <svg viewBox="0 0 180 42" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0, 3)">
            {/* Chile Seal */}
            <rect x="0" y="2" width="13" height="28" rx="2" fill="#003882"/>
            <rect x="13" y="2" width="13" height="28" rx="2" fill="#C8102E"/>
            <polygon points="6.5,10 7.7,13.5 11.2,13.5 8.4,15.5 9.5,19 6.5,16.8 3.5,19 4.6,15.5 1.8,13.5 5.3,13.5" fill="#FFFFFF"/>
          </g>
          <text x="33" y="17" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" fill="#003882" letterSpacing="0.3">Gobierno</text>
          <text x="33" y="29" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" fill="#C8102E" letterSpacing="0.3">de Chile</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="casos-de-exito" className="py-14 md:py-20 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 mb-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-xs mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-highlight shadow-[0_0_8px_rgba(31,240,128,0.8)]"></div>
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
            <h3 className="text-xl md:text-2xl font-poppins font-bold text-brand-tertiary">
              Conectados con las plataformas e infraestructura líder
            </h3>
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
                <div className="h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  {partner.logo}
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
