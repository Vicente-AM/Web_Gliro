import React from 'react';
import { ArrowRight } from 'lucide-react';
import { productsData } from '../data/siteContent';

export const ProductsSection: React.FC = () => {
  return (
    <section id="productos" className="py-20 md:py-28 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-brand-highlight shadow-xs mb-6">
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Nuestros Productos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-black text-brand-tertiary leading-[1.15] tracking-tight mb-4">
            Herramientas propias listas para impulsar tu negocio.
          </h2>
          <p className="text-brand-support text-base sm:text-lg">
            Soluciones SaaS desarrolladas por Gliro que ya resuelven problemas concretos en diferentes negocios.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              className="
                bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/90 shadow-md 
                hover:shadow-2xl hover:border-brand-highlight/60 transition-all duration-500 flex flex-col justify-between group
              "
            >
              {/* Product Cover Image */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-brand-highlight text-xs font-semibold">
                    {prod.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${prod.statusType === 'active' ? 'bg-emerald-500/20 text-brand-highlight border border-brand-highlight/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {prod.status}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-poppins font-black text-brand-tertiary mb-3 group-hover:text-brand-highlight transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-brand-support text-sm sm:text-base leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={prod.url}
                    target={prod.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-between w-full px-5 py-3 rounded-full 
                      bg-slate-50 hover:bg-brand-tertiary hover:text-white text-brand-tertiary font-poppins font-bold text-sm transition-all duration-300
                    "
                  >
                    <span>Conocer {prod.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
