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
        <svg viewBox="0 0 180 40" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="6" width="12" height="28" rx="2" fill="#003882"/>
          <rect x="15" y="6" width="12" height="28" rx="2" fill="#E31B23"/>
          <circle cx="6" cy="20" r="2.5" fill="#FFFFFF"/>
          <circle cx="21" cy="20" r="2.5" fill="#FFFFFF"/>
          <text x="35" y="27" fontFamily="Poppins, Inter, sans-serif" fontWeight="800" fontSize="19" fill="#282c2f">
            Chile<tspan fill="#E31B23">Compra</tspan>
          </text>
        </svg>
      ),
    },
    {
      name: "AWS",
      category: "Cloud Infrastructure",
      logo: (
        <svg viewBox="0 0 80 48" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 24.5c-1.8 0-3.3-.5-4.4-1.5s-1.6-2.3-1.6-4c0-1.8.6-3.1 1.7-4.1 1.1-1 2.7-1.5 4.6-1.5 1.1 0 2.1.2 3.1.5v-1.1c0-1-.3-1.8-.8-2.3-.5-.6-1.3-.8-2.3-.8-1.1 0-2.3.4-3.5 1.1l-1.3-2.5c1.6-1 3.3-1.5 5.2-1.5 2.1 0 3.7.6 4.9 1.8 1.2 1.2 1.8 2.8 1.8 5v10.8h-3.7v-2.2c-1 1.6-2.4 2.3-4.3 2.3zm.8-3c1.1 0 2-.4 2.8-1.1.7-.7 1.1-1.6 1.1-2.8v-1.3c-.7-.3-1.6-.5-2.6-.5-1.1 0-1.9.3-2.6.8-.6.5-.9 1.3-.9 2.2 0 .8.3 1.5.8 2 .6.5 1.3.7 2.2.7zm14 2.8l-5.4-17.4h4.1l3.4 12.5 3.4-12.5h3.7l3.4 12.5 3.4-12.5h4.1l-5.4 17.4h-4l-3.4-11.9-3.4 11.9h-4zm22.7.2c-1.9 0-3.6-.5-4.9-1.4l1.5-2.9c1.1.7 2.3 1.1 3.6 1.1 1 0 1.8-.2 2.3-.6.5-.4.8-.9.8-1.5 0-.5-.2-1-.6-1.3-.4-.3-1.1-.6-2.2-.9-1.5-.4-2.6-.9-3.4-1.6-.8-.7-1.2-1.7-1.2-3 0-1.6.6-2.8 1.8-3.7 1.2-.9 2.8-1.4 4.8-1.4 1.6 0 3.2.4 4.6 1.2l-1.4 2.8c-1.1-.6-2.3-.9-3.4-.9-.9 0-1.6.2-2.1.6-.5.4-.8.9-.8 1.4 0 .5.2.9.6 1.2.4.3 1.1.6 2.1.9 1.5.4 2.7.9 3.4 1.6.8.7 1.2 1.7 1.2 2.9 0 1.6-.6 2.9-1.8 3.8-1.2 1-2.9 1.4-5 1.4z" fill="#232F3E"/>
          <path d="M63 35.5c-7.1 5.3-17.5 8.1-26.5 8.1-12.5 0-23.8-4.6-32.3-12.3-.7-.6-.1-1.4.7-1 9.2 5.2 20.5 8.3 32.2 8.3 8 0 16.8-2.1 24.9-6.5 1.2-.7 2.2 1 1 2.4z" fill="#FF9900"/>
          <path d="M65.4 32.5c-.9-1.2-6-.6-8.3-.3-.7.1-.8-.5-.2-1 4.1-2.9 10.8-2.1 11.6-1.1.8 1-.2 7.7-4.1 10.9-.6.5-1.2.2-.9-.4.9-2.1 2.8-7 1.9-8.1z" fill="#FF9900"/>
        </svg>
      ),
    },
    {
      name: "Google",
      category: "Google Cloud Ecosystem",
      logo: (
        <svg viewBox="0 0 272 92" className="h-7 md:h-8 w-auto" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
          <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
          <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.62h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
          <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
          <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
          <path fill="#EA4335" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35 0 53.79 0 34.68S16.32 0 35.3 0c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.27 0 14.11 10.84 25.28 24.7 25.28 8.99 0 14.11-3.61 17.39-6.89 2.69-2.69 4.45-6.55 5.12-11.66H35.29z"/>
        </svg>
      ),
    },
    {
      name: "Gobierno de Chile",
      category: "Institucional & Normativa",
      logo: (
        <svg viewBox="0 0 180 40" className="h-8 md:h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="4" width="13" height="32" rx="1.5" fill="#003882"/>
          <rect x="13" y="4" width="13" height="32" rx="1.5" fill="#C8102E"/>
          <polygon points="6.5,13 7.8,17 12,17 8.6,19.5 9.9,23.5 6.5,21 3.1,23.5 4.4,19.5 1,17 5.2,17" fill="#FFFFFF"/>
          <text x="36" y="20" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="13" fill="#003882" letterSpacing="0.3">Gobierno</text>
          <text x="36" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="13" fill="#C8102E" letterSpacing="0.3">de Chile</text>
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
