import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#inicio' },
    { name: 'Productos', href: '#productos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Clientes', href: '#portafolio' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none
        transition-all duration-300 ease-in-out
        ${scrolled ? 'pt-2 md:pt-3 px-3 md:px-6' : 'pt-3 sm:pt-4 md:pt-7 px-3.5 md:px-8'}
      `}
    >
      <nav
        aria-label="Navegación principal"
        className={`
          pointer-events-auto w-full
          transition-all duration-300 ease-in-out
          flex items-center justify-between
          rounded-full
          ${
            scrolled
              ? 'max-w-[1080px] px-4 py-2 md:px-6 md:py-2 bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5'
              : 'max-w-[1240px] px-4 py-2.5 md:px-8 md:py-4 bg-white/95 backdrop-blur-md border border-slate-200/70 shadow-md'
          }
        `}
      >
        {/* Brand Logo */}
        <a
          href="#inicio"
          className="flex items-center ml-2 md:ml-4 group cursor-pointer focus:outline-none select-none transition-all duration-300"
        >
          <img
            src="/media/Logo Gliro N SF.png"
            alt="Gliro"
            className={`
              w-auto object-contain transition-all duration-300 group-hover:opacity-90 scale-180 md:scale-240
              ${scrolled ? 'h-6 md:h-8 max-w-[110px] md:max-w-[120px]' : 'h-7 md:h-10 max-w-[120px] md:max-w-[140px]'}
            `}
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`
                rounded-full font-semibold text-brand-secondary 
                hover:text-brand-tertiary hover:bg-slate-100/80 
                transition-all duration-300 uppercase tracking-wider
                ${scrolled ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs md:text-sm'}
              `}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action: CTA Button */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contacto"
            className={`
              inline-flex items-center gap-2 rounded-full 
              bg-brand-tertiary text-white font-poppins font-bold
              hover:bg-brand-highlight hover:text-brand-tertiary hover:scale-105 active:scale-95
              transition-all duration-300 shadow-md hover:shadow-brand-highlight/20
              ${scrolled ? 'px-5 py-2 text-xs' : 'px-6 py-2.5 text-xs md:text-sm'}
            `}
          >
            <span>Conversemos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full text-brand-tertiary hover:bg-slate-100 focus:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`
            pointer-events-auto fixed inset-x-4 z-50 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 lg:hidden animate-fade-in-up transition-all duration-300
            ${scrolled ? 'top-16' : 'top-24'}
          `}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-base font-semibold text-brand-tertiary hover:bg-slate-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3.5 rounded-2xl bg-brand-tertiary text-white font-poppins font-bold text-sm hover:bg-brand-highlight hover:text-brand-tertiary transition-colors flex items-center justify-center gap-2"
          >
            <span>Conversemos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
