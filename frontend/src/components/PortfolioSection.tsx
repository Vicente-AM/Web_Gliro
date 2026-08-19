import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, ExternalLink, X } from 'lucide-react';
import { portfolioData } from '../data/siteContent';

export const PortfolioSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ecommerce' | 'web' | 'corporate' | 'ads'>('all');

  const featuredProjects = portfolioData.slice(0, 4);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, featuredProjects.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const filteredProjects = selectedCategory === 'all'
    ? portfolioData
    : portfolioData.filter((p) => p.categoryKey === selectedCategory);

  return (
    <section id="portafolio" className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="w-full flex flex-col gap-8 md:gap-12">
        {/* Section Header */}
        <div className="max-w-[1350px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-slate-50 border border-brand-highlight shadow-xs mb-6">
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Portafolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-brand-tertiary leading-[1.1] tracking-tight">
            Algunos de <br className="hidden sm:inline" /> nuestros proyectos
          </h2>
        </div>

        {/* Big Showcase Carousel */}
        <div className="w-full relative h-[480px] sm:h-[540px] md:h-[70vh] max-h-[750px] flex items-center justify-center overflow-hidden px-4 md:px-10">
          <div className="relative w-full max-w-[1350px] h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-tertiary">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`
                  absolute inset-0 transition-all duration-700 ease-out
                  ${index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'}
                `}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>

                {/* Info Overlay */}
                <div className="absolute inset-0 p-5 sm:p-8 md:p-14 pb-20 sm:pb-24 md:pb-14 flex flex-col justify-between z-20">
                  <div className="flex justify-between items-start gap-2.5 sm:gap-3">
                    <span className="inline-flex items-center max-w-[calc(100%-110px)] sm:max-w-none px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-brand-highlight text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider truncate sm:whitespace-normal">
                      {project.category}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-brand-highlight hover:text-brand-tertiary transition-all duration-300 text-xs sm:text-sm font-semibold shrink-0"
                    >
                      <span>Ver Sitio</span>
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  </div>

                  <div className="max-w-3xl space-y-2 sm:space-y-3">
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-poppins font-black text-white leading-tight drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-brand-highlight text-xs sm:text-base md:text-xl font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-highlight inline-block animate-ping shrink-0"></span>
                      <span>{project.results}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Floating Controller Bar - Compact & Sleek */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-xl border border-white/15 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-2xl">
              <button
                onClick={prevSlide}
                className="text-white/70 hover:text-white p-1 sm:p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Proyecto anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 hover:bg-brand-highlight hover:text-brand-tertiary text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label={isPlaying ? 'Pausar carrusel' : 'Reanudar carrusel'}
              >
                {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={nextSlide}
                className="text-white/70 hover:text-white p-1 sm:p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Proyecto siguiente"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div className="w-px h-3.5 sm:h-4 bg-white/20 mx-0.5"></div>

              {/* Indicator Dots */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {featuredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 rounded-full h-1 sm:h-1.5 ${i === currentIndex ? 'w-4 sm:w-5 bg-brand-highlight' : 'w-1 sm:w-1.5 bg-white/40 hover:bg-white/70'}`}
                    aria-label={`Ir al proyecto ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Opener Button */}
        {/*<div className="flex justify-center px-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="
              inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold 
              bg-brand-tertiary text-white hover:bg-brand-highlight hover:text-brand-tertiary 
              transition-all duration-300 shadow-xl shadow-brand-tertiary/10 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-sm md:text-base
            "
          >
            <Grid className="w-4 h-4" />
            Ver todos los proyectos
          </button>
        </div>*/}
      </div>

      {/* Full Projects Modal / Gallery */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100">
              <div>
                <h3 className="text-2xl md:text-3xl font-poppins font-black text-brand-tertiary">
                  Galería de Proyectos Gliro
                </h3>
                <p className="text-brand-support text-sm mt-1">Explora nuestros casos de éxito y soluciones implementadas.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-11 h-11 rounded-full bg-slate-100 text-brand-tertiary flex items-center justify-center hover:bg-brand-tertiary hover:text-white transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 px-6 md:px-8 py-4 bg-slate-50 border-b border-slate-100">
              {[
                { label: 'Todos', key: 'all' },
                { label: 'E-Commerce', key: 'ecommerce' },
                { label: 'Desarrollo Web', key: 'web' },
                { label: 'Corporativos', key: 'corporate' },
                { label: 'Publicidad / Ads', key: 'ads' },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedCategory(filter.key as any)}
                  className={`
                    px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer
                    ${selectedCategory === filter.key ? 'bg-brand-tertiary text-white shadow-sm' : 'bg-white text-brand-secondary hover:bg-slate-200/70 border border-slate-200'}
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Grid of Projects */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group rounded-2xl overflow-hidden border border-slate-200/80 bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-highlight text-xs font-semibold">
                      {proj.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-poppins font-bold text-lg text-brand-tertiary group-hover:text-brand-highlight transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-brand-support text-xs font-semibold mt-2">
                        {proj.results}
                      </p>
                    </div>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-tertiary hover:text-brand-highlight transition-colors"
                    >
                      <span>Visitar proyecto</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
