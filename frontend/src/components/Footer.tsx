import React from 'react';
import { siteBrand } from '../data/siteContent';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
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
                href={siteBrand.linkedinUrl}
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
              {/* Instagram Icon */}
              <a
                href={siteBrand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gliro en Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-highlight hover:border-brand-highlight transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
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
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Servicios & Soluciones</a>
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
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Desarrollo de Software / App Web / Landing Page</a>
              </li>
              <li>
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Automatización de Procesos & IA</a>
              </li>
              <li>
                <a href="#servicios" className="text-slate-400 hover:text-brand-highlight transition-colors">Servicios de TI, Infraestructura & Cloud</a>
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
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:text-brand-highlight"
            >
              Términos del Servicio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
