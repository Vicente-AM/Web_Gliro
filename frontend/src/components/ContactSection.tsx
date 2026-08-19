import React, { useState } from 'react';
import { Clock, MessageSquareText, Handshake, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { siteBrand } from '../data/siteContent';
import type { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    goal: '',
    budget: '',
    contact_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSuccessMessage(response.message || '¡Tu mensaje ha sido enviado con éxito! Te contactaremos a la brevedad.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          website: '',
          goal: '',
          budget: '',
          contact_confirmation: '',
        });
      } else {
        setErrorMessage(response.message || 'No se pudo procesar la solicitud.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Ocurrió un error al enviar el formulario. Por favor intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-28 relative bg-white overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-grid-pattern"></div>
      <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-brand-highlight/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-[1350px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Value propositions */}
          <div className="max-w-xl">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-slate-50 border border-brand-highlight shadow-xs mb-6">
              <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Contacto</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-brand-tertiary leading-[1.1] tracking-tight mb-6">
              ¿Conversamos sobre <br /> tu proyecto?
            </h2>

            <p className="text-base sm:text-lg text-brand-support leading-relaxed mb-8">
              Cuéntanos qué proceso quieres automatizar o qué software necesitas. Te proponemos una solución técnica ágil y a tu medida.
            </p>

            {/* Direct WhatsApp Callout */}
            <a
              href={siteBrand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-brand-tertiary hover:bg-brand-highlight/20 hover:border-brand-highlight transition-all duration-300 mb-10 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs text-brand-support block">¿Prefieres respuesta inmediata?</span>
                <span className="font-poppins font-bold text-sm text-brand-tertiary group-hover:text-emerald-700">
                  Escríbenos al WhatsApp: {siteBrand.phone} →
                </span>
              </div>
            </a>

            {/* Feature Bullets */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-tertiary group-hover:bg-brand-highlight group-hover:border-brand-highlight transition-all duration-300 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-brand-tertiary text-base sm:text-lg">Respuesta rápida</h4>
                  <p className="text-xs sm:text-sm text-brand-support">Atención ágil por ingenieros de software.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-tertiary group-hover:bg-brand-highlight group-hover:border-brand-highlight transition-all duration-300 shadow-xs">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-brand-tertiary text-base sm:text-lg">Diagnóstico técnico</h4>
                  <p className="text-xs sm:text-sm text-brand-support">Evaluamos la viabilidad y arquitectura de tu solución.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-tertiary group-hover:bg-brand-highlight group-hover:border-brand-highlight transition-all duration-300 shadow-xs">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-brand-tertiary text-base sm:text-lg">Acompañamiento continuo</h4>
                  <p className="text-xs sm:text-sm text-brand-support">Garantía, mantenimiento y soporte operacional constante.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/60 p-7 sm:p-10 relative overflow-hidden">
            {successMessage ? (
              <div className="py-12 px-4 text-center space-y-6 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-brand-highlight/20 border border-brand-highlight text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-brand-highlight/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-poppins font-bold text-brand-tertiary">
                    ¡Mensaje Recibido!
                  </h3>
                  <p className="text-brand-support text-sm md:text-base max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccessMessage(null)}
                  className="px-6 py-3 rounded-full bg-brand-tertiary text-white font-semibold text-sm hover:bg-brand-highlight hover:text-brand-tertiary transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact_confirmation">Deja este campo vacío</label>
                  <input
                    id="contact_confirmation"
                    type="text"
                    name="contact_confirmation"
                    value={formData.contact_confirmation}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-brand-tertiary mb-1.5">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Martín González"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-highlight focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm md:text-base text-brand-secondary"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-brand-tertiary mb-1.5">
                      Correo Corporativo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="martin@empresa.cl"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-highlight focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm md:text-base text-brand-secondary"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-semibold text-brand-tertiary mb-1.5">
                      Teléfono / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+56 9 7563 8193"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-highlight focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm md:text-base text-brand-secondary"
                    />
                  </div>
                </div>

                {/* Website / Empresa (Optional) */}
                <div>
                  <label htmlFor="website" className="block text-xs md:text-sm font-semibold text-brand-tertiary mb-1.5">
                    Empresa o Sitio Web <span className="text-brand-support font-normal text-xs">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Ej. MiEmpresa SpA / miempresa.cl"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-highlight focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm md:text-base text-brand-secondary"
                  />
                </div>

                {/* Goal Select */}
                <div>
                  <label htmlFor="goal" className="block text-xs md:text-sm font-semibold text-brand-tertiary mb-1.5">
                    ¿Qué tipo de solución buscas? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    required
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-highlight focus:border-transparent outline-none transition-all text-sm md:text-base text-brand-secondary cursor-pointer"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="software_custom">Desarrollo de Software / App Web / Landing Page</option>
                    <option value="licitracker">Demo o Información de Licitracker (MercadoPúblico)</option>
                    <option value="traza">Demo o Información de Traza (ISO 9001)</option>
                    <option value="broker_ia">Demo o Información de Broker IA (Inmobiliarias)</option>
                    <option value="automation_ia">Automatización de Procesos & RPA con IA</option>
                    <option value="it_consulting">Servicios de TI, Infraestructura & Cloud</option>
                  </select>
                </div>

                {/* Budget Select */}
                {/*<div>
                  <label htmlFor="budget" className="block text-xs md:text-sm font-semibold text-brand-tertiary mb-1.5">
                    Presupuesto o Modalidad Estimada <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-highlight focus:border-transparent outline-none transition-all text-sm md:text-base text-brand-secondary cursor-pointer"
                  >
                    <option value="" disabled>Selecciona un rango</option>
                    <option value="saas_subscription">Suscripción SaaS / Pago Mensual</option>
                    <option value="under_1m">Proyecto menor a $1.500.000 CLP</option>
                    <option value="from_1m_to_4m">Proyecto entre $1.500.000 y $4.000.000 CLP</option>
                    <option value="over_4m">Proyecto corporativo más de $4.000.000 CLP</option>
                  </select>
                </div>*/}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full py-4 bg-brand-tertiary text-white rounded-xl font-poppins font-bold text-base md:text-lg 
                      hover:bg-brand-highlight hover:text-brand-tertiary transition-all duration-300 shadow-lg 
                      hover:shadow-brand-highlight/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
