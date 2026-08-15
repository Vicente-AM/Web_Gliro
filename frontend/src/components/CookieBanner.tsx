import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gliro_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gliro_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('gliro_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Preferencias de cookies y privacidad"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-xl p-5 shadow-2xl md:flex md:items-center md:gap-6 md:p-6 animate-fade-in-up"
    >
      <div className="mb-4 flex-1 md:mb-0">
        <h2 className="mb-1 text-base md:text-lg font-poppins font-bold text-brand-tertiary">
          Tu privacidad nos importa
        </h2>
        <p className="text-xs md:text-sm text-brand-support leading-relaxed">
          Utilizamos analítica para optimizar la experiencia de navegación en nuestro sitio. Puedes aceptar o configurar tus preferencias.
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleDecline}
          className="cursor-pointer rounded-full border border-slate-300 px-5 py-2.5 text-xs md:text-sm font-semibold text-brand-secondary hover:bg-slate-100 transition-colors"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="cursor-pointer rounded-full bg-brand-tertiary px-5 py-2.5 text-xs md:text-sm font-bold text-white hover:bg-brand-highlight hover:text-brand-tertiary transition-all duration-300 shadow-md"
        >
          Aceptar
        </button>
      </div>
    </aside>
  );
};
