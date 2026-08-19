import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteBrand } from '../data/siteContent';

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-brand-tertiary text-white pt-14 md:pt-20 pb-10 mx-2.5 md:mx-4 mb-4 rounded-[2.5rem] border border-slate-800/80">
      <div className="max-w-[1350px] mx-auto px-6 md:px-12 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start">
            <a href="#inicio" className="flex gap-2 mb-6 ml-10 group">
              <img src="/media/Logo Gliro SF.png" alt="Gliro Logo" className="h-8 object-contain scale-400" />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Innovación en software y automatización con IA. Transformamos procesos en soluciones inteligentes y productos SaaS de alto impacto.
            </p>
            <div className="flex gap-3">
              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gliro en LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-highlight hover:border-brand-highlight transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* WhatsApp Icon */}
              <a
                href={siteBrand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablar por WhatsApp"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-highlight hover:border-brand-highlight transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-poppins font-bold text-white mb-6 tracking-wide text-base">Navegación</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href="#inicio" className="text-slate-400 hover:text-brand-highlight transition-colors">Home</a>
              </li>
              <li>
                <a href="#productos" className="text-slate-400 hover:text-brand-highlight transition-colors">Nuestros Productos</a>
              </li>
              <li>
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Servicios a Medida</a>
              </li>
              <li>
                <a href="#portafolio" className="text-slate-400 hover:text-brand-highlight transition-colors">Clientes & Casos</a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-brand-highlight transition-colors">Preguntas Frecuentes</a>
              </li>
              <li>
                <a href="#contacto" className="text-slate-400 hover:text-brand-highlight transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Products & Services */}
          <div>
            <h4 className="font-poppins font-bold text-white mb-6 tracking-wide text-base">Soluciones</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href="https://licitracker.cl" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-highlight transition-colors">Licitracker (MercadoPúblico)</a>
              </li>
              <li>
                <a href="https://traza.gliro.cl" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-highlight transition-colors">Traza (ISO 9001)</a>
              </li>
              <li>
                <a href="#productos" className="text-slate-400 hover:text-brand-highlight transition-colors">Broker IA (Inmobiliarias)</a>
              </li>
              <li>
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Software a Medida</a>
              </li>
              <li>
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Automatización de Procesos</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-poppins font-bold text-white mb-6 tracking-wide text-base">Contacto</h4>
            <ul className="space-y-4 text-sm text-slate-400 flex flex-col items-center md:items-start">
              <li>
                <span className="block text-slate-500 text-xs mb-0.5">WhatsApp</span>
                <a
                  href={siteBrand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-highlight transition-colors font-medium text-white"
                >
                  {siteBrand.phone}
                </a>
              </li>
              <li>
                <span className="block text-slate-500 text-xs mb-0.5">Correo Electrónico</span>
                <a
                  href={`mailto:${siteBrand.email}`}
                  className="hover:text-brand-highlight transition-colors font-medium text-white"
                >
                  {siteBrand.email}
                </a>
              </li>
              <li>
                <span className="block text-slate-500 text-xs mb-0.5">Ubicación</span>
                <span>{siteBrand.location}</span>
              </li>
              <li>
                <span className="block text-slate-500 text-xs mb-0.5">Horario de Atención</span>
                <span>{siteBrand.schedule}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Gliro. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:text-brand-highlight"
            >
              Política de Privacidad
            </button>
            <a href="#contacto" className="hover:text-white transition-colors text-slate-400">
              Términos del Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
