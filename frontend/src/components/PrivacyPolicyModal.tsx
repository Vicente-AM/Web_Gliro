import React, { useEffect } from 'react';
import { X, Shield, Lock, Eye, FileText, CheckCircle2, Mail } from 'lucide-react';
import { siteBrand } from '../data/siteContent';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md animate-fade-in-up"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-highlight/20 border border-brand-highlight flex items-center justify-center text-brand-tertiary">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-brand-tertiary" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-support font-bold block">
                Transparencia & Seguridad
              </span>
              <h2 id="privacy-policy-title" className="text-xl sm:text-2xl md:text-3xl font-poppins font-black text-brand-tertiary">
                Política de Privacidad
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-brand-tertiary hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 text-slate-600 space-y-8 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1: Introducción */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <FileText className="w-5 h-5 text-brand-highlight" />
              <h3>1. Introducción</h3>
            </div>
            <p>
              <strong>Gliro</strong> (en adelante, «Gliro», «nosotros» o «nos») está profundamente comprometido con la protección de la privacidad y los datos personales de sus usuarios y clientes. Esta Política de Privacidad describe de forma clara y transparente cómo recolectamos, utilizamos, almacenamos y protegemos su información cuando utiliza nuestro sitio web oficial (el «Sitio web») y todas las soluciones de software, SaaS y servicios de automatización ofrecidos por Gliro (en conjunto, los «Servicios»).
            </p>
          </section>

          {/* Section 2: Recopilación de información */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Eye className="w-5 h-5 text-brand-highlight" />
              <h3>2. Recopilación de Información Personal</h3>
            </div>
            <p>Recopilamos dos categorías principales de información:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-brand-tertiary text-sm sm:text-base">A. Información que usted nos proporciona directamente:</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Incluye datos de contacto como nombre, correo electrónico, número de teléfono, empresa y detalles de requerimientos técnicos cuando completa formularios de contacto, agenda reuniones de diagnóstico o se suscribe a nuestras comunicaciones.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-brand-tertiary text-sm sm:text-base">B. Información recolectada automáticamente:</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Dirección IP anonimizada, tipo de navegador, sistema operativo, páginas visitadas, tiempo de sesión e interacciones mediante cookies analíticas orientadas exclusivamente a mejorar la usabilidad y rendimiento de nuestro sitio web.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Uso de la información */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-brand-highlight" />
              <h3>3. Finalidad y Uso de la Información</h3>
            </div>
            <p>Utilizamos su información personal exclusivamente para los siguientes propósitos:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-sm sm:text-base">
              <li>Proveer, personalizar y mejorar nuestras soluciones de software a medida, SaaS y automatizaciones.</li>
              <li>Responder oportunamente a consultas técnicas, presupuestos y solicitudes de demostración.</li>
              <li>Gestionar la relación comercial, contractual y soporte técnico post-implementación.</li>
              <li>Enviar comunicaciones informativas sobre mejoras en nuestros productos (con opción permanente de desuscripción).</li>
              <li>Garantizar la seguridad de la infraestructura y prevenir actividades fraudulentas o accesos no autorizados.</li>
            </ul>
          </section>

          {/* Section 4: Divulgación y Terceros */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Lock className="w-5 h-5 text-brand-highlight" />
              <h3>4. Confidencialidad y Divulgación a Terceros</h3>
            </div>
            <p>
              <strong>Gliro no vende, comercializa ni arrienda su información personal a terceros.</strong> Solo podemos compartir datos estrictamente necesarios con proveedores de infraestructura cloud de primer nivel (como AWS o Google Cloud) que cumplen con rigurosos estándares internacionales de seguridad y bajo cláusulas de estricta confidencialidad.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 italic">
              Asimismo, divulgaremos información si es requerido formalmente por mandatos legales vigentes o autoridades judiciales competentes en la República de Chile.
            </p>
          </section>

          {/* Section 5: Base Legal en Chile */}
          <section className="space-y-3 p-5 rounded-2xl bg-brand-highlight/10 border border-brand-highlight/30">
            <h3 className="font-poppins font-bold text-brand-tertiary text-base sm:text-lg">
              5. Base Legal del Tratamiento de Datos
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">
              El tratamiento de datos personales realizado por Gliro se fundamenta en las disposiciones de la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> de la República de Chile:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li><strong>• Consentimiento del titular (Art. 4°):</strong> Otorgado voluntariamente al contactarnos o solicitar servicios.</li>
              <li><strong>• Ejecución contractual (Art. 10°):</strong> Tratamiento necesario para cumplir con propuestas comerciales y contratos de desarrollo y SaaS.</li>
              <li><strong>• Obligación legal (Art. 11°):</strong> Cumplimiento de obligaciones tributarias, comerciales y regulatorias aplicables.</li>
            </ul>
          </section>

          {/* Section 6: Derechos ARCO */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Shield className="w-5 h-5 text-brand-highlight" />
              <h3>6. Derechos del Usuario (Acceso, Rectificación, Cancelación y Oposición)</h3>
            </div>
            <p>Conforme a la Ley N° 19.628 (Artículos 8° y 12°), usted tiene derecho en todo momento a:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Derecho de Acceso:</strong> Conocer qué datos personales suyos mantenemos registrados y su origen.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Derecho de Rectificación:</strong> Modificar o actualizar datos erróneos, inexactos o desactualizados.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Derecho de Cancelación / Eliminación:</strong> Solicitar el borrado de sus datos cuando ya no sean necesarios.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Derecho de Bloqueo / Oposición:</strong> Oponerse al uso de sus datos para fines comerciales o de difusión.
              </div>
            </div>
          </section>

          {/* Section 7: Seguridad y Cookies */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Lock className="w-5 h-5 text-brand-highlight" />
              <h3>7. Seguridad de la Información y Preferencias de Cookies</h3>
            </div>
            <p>
              Implementamos protocolos de seguridad estándar como cifrado SSL/TLS en tránsito, autenticación segura y políticas de mínimo privilegio. Puede gestionar o deshabilitar las cookies analíticas en cualquier momento a través de la configuración de su navegador web.
            </p>
          </section>

          {/* Section 8: Modificaciones y Contacto */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-poppins font-bold text-brand-tertiary text-base sm:text-lg">
              8. Modificaciones y Canales de Contacto
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Gliro se reserva el derecho de actualizar esta política para reflejar cambios normativos o mejoras en nuestros servicios. Cualquier modificación será publicada directamente en este apartado con fecha de actualización visible.
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-tertiary text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-brand-highlight font-mono font-bold uppercase tracking-wider block">
                  Canal de Privacidad
                </span>
                <p className="text-sm font-semibold">¿Deseas ejercer tus derechos o tienes alguna duda?</p>
                <p className="text-xs text-slate-300">Escríbenos a nuestro equipo de privacidad y soporte técnico.</p>
              </div>
              <a
                href={`mailto:${siteBrand.email}?subject=Consulta%20sobre%20Pol%C3%ADtica%20de%20Privacidad`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-highlight text-brand-tertiary font-poppins font-bold text-xs sm:text-sm hover:bg-white transition-colors shrink-0"
              >
                <Mail className="w-4 h-4" />
                <span>{siteBrand.email}</span>
              </a>
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Última actualización: Agosto {new Date().getFullYear()}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-brand-tertiary text-white font-poppins font-bold text-xs sm:text-sm hover:bg-brand-highlight hover:text-brand-tertiary transition-all duration-200 cursor-pointer shadow-xs"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
