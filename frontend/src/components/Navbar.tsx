import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { siteBrand } from '../data/siteContent';

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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 md:p-5 pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className={`
          pointer-events-auto w-full max-w-[1240px]
          transition-all duration-300 ease-in-out
          flex items-center justify-between
          px-5 py-3 md:px-7 md:py-3.5
          rounded-full
          ${
            scrolled
              ? 'bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5'
              : 'bg-white/95 backdrop-blur-md border border-slate-200/70 shadow-md'
          }
        `}
      >
        {/* Brand Logo in Poppins */}
        <a
          href="#inicio"
          className="flex items-center gap-1 group cursor-pointer focus:outline-none select-none"
        >
          <span className="font-poppins font-black text-2xl md:text-3xl tracking-tight text-brand-tertiary group-hover:opacity-90 transition-opacity">
            Gliro
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-brand-highlight inline-block shadow-[0_0_10px_rgba(31,240,128,0.8)] group-hover:scale-125 transition-transform duration-300"></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                px-4 py-2 rounded-full text-xs font-semibold text-brand-secondary 
                hover:text-brand-tertiary hover:bg-slate-100/80 
                transition-all duration-200 uppercase tracking-wider
              "
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={siteBrand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full text-brand-tertiary hover:bg-slate-100 transition-colors"
            title="Escribir por WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </a>
          <a
            href="#contacto"
            className="
              inline-flex items-center gap-2 px-6 py-2.5 rounded-full 
              bg-brand-tertiary text-white font-poppins font-bold text-xs md:text-sm
              hover:bg-brand-highlight hover:text-brand-tertiary hover:scale-105 active:scale-95
              transition-all duration-300 shadow-md hover:shadow-brand-highlight/20
            "
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
        <div className="pointer-events-auto fixed inset-x-4 top-20 z-50 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 lg:hidden animate-fade-in-up">
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
