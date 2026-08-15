import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteBrand } from '../data/siteContent';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-6 z-50 group">
      {/* Outer Pulse Animation Ring */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping-slow pointer-events-none"></span>

      {/* Floating Button */}
      <a
        href={siteBrand.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar con Gliro por WhatsApp"
        className="
          relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 md:p-4 rounded-full 
          shadow-2xl shadow-emerald-900/30 hover:shadow-emerald-500/40 transition-all duration-300 
          transform hover:scale-110 active:scale-95 flex items-center justify-center
        "
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-current" />
      </a>
    </aside>
  );
};
