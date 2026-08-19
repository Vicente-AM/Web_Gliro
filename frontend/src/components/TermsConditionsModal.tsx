import React, { useEffect } from 'react';
import { X, Scale, ShieldCheck, Code, Cloud, CreditCard, AlertCircle, Mail } from 'lucide-react';
import { siteBrand } from '../data/siteContent';

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({ isOpen, onClose }) => {
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
      aria-labelledby="terms-conditions-title"
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
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-brand-tertiary" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-support font-bold block">
                Marco Contractual & Legal
              </span>
              <h2 id="terms-conditions-title" className="text-xl sm:text-2xl md:text-3xl font-poppins font-black text-brand-tertiary">
                Términos y Condiciones de Servicio
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
          
          {/* Section 1: Aceptación y Condiciones Generales */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-brand-highlight" />
              <h3>1. Aceptación y Condiciones Generales</h3>
            </div>
            <p>
              Los presentes Términos y Condiciones regulan la contratación y prestación de servicios tecnológicos ofrecidos por <strong>Gliro</strong> (en adelante, «Gliro», «nosotros» o «la Empresa»), incluyendo desarrollo de software a medida, licenciamiento de productos SaaS (como <em>Licitracker</em> y <em>Traza</em>), automatizaciones de procesos con IA y despliegue de infraestructura cloud.
            </p>
            <p>
              La aceptación de una cotización formal, la suscripción a cualquiera de nuestras plataformas o el pago de un anticipo constituye un <strong>contrato vinculante</strong> entre el Cliente y Gliro, rigiéndose por los presentes términos y la legislación de la República de Chile.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
              <strong>Actualización de términos:</strong> Gliro se reserva el derecho de actualizar estos términos para incorporar mejoras en sus servicios. Los clientes con servicios activos serán notificados vía correo electrónico ante modificaciones sustanciales.
            </div>
          </section>

          {/* Section 2: Confidencialidad y Seguridad */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-brand-highlight" />
              <h3>2. Confidencialidad Absoluta (NDA)</h3>
            </div>
            <p>
              Gliro se compromete al <strong>secreto profesional y estricta confidencialidad</strong> respecto a toda la información técnica, comercial, operativa, credenciales de acceso, bases de datos o secretos de negocio suministrados por el Cliente. 
            </p>
            <p>
              Esta información será empleada exclusivamente para la ejecución de los servicios contratados y no será transferida a terceros sin consentimiento previo por escrito, salvo requerimiento judicial expreso.
            </p>
          </section>

          {/* Section 3: Servicios de Desarrollo de Software a Medida */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Code className="w-5 h-5 text-brand-highlight" />
              <h3>3. Desarrollo de Software & Automatizaciones a Medida</h3>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-brand-tertiary text-sm sm:text-base">3.1 Levantamiento y Entrega de Insumos</h4>
                <p className="text-slate-600">
                  Para iniciar el desarrollo, el Cliente debe proporcionar oportunamente las especificaciones de negocio, accesos a APIs o sistemas legados (ERP/CRM) y contenidos necesarios. Demoras significativas en la entrega de insumos suspenden proporcionalmente los plazos de entrega pactados.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-brand-tertiary text-sm sm:text-base">3.2 Validaciones y Aprobación de Entregables</h4>
                <p className="text-slate-600">
                  Trabajamos con metodología ágil mediante hitos y prototipos interactivos. Tras la entrega de un hito o maqueta funcional, el Cliente dispone de <strong>3 días hábiles</strong> para emitir observaciones o ajustes. Cumplido este plazo sin respuesta, el hito se entenderá validado para dar paso a la siguiente etapa.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-brand-tertiary text-sm sm:text-base">3.3 Entrega, Accesos y Propiedad del Código</h4>
                <p className="text-slate-600">
                  Una vez cancelado el 100% del valor pactado en proyectos de desarrollo a medida, Gliro hará entrega formal de las credenciales, repositorio y accesos correspondientes. <strong>La propiedad intelectual del código desarrollado a medida pertenece al Cliente.</strong> El Cliente asume la responsabilidad sobre modificaciones posteriores ejecutadas por personal externo a Gliro.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-brand-tertiary text-sm sm:text-base">3.4 Garantía Técnica Post-Lanzamiento</h4>
                <p className="text-slate-600">
                  Todo proyecto a medida cuenta con una <strong>garantía técnica de 30 días corridos</strong> desde su puesta en producción, cubriendo corrección de bugs o inconsistencias respecto a los requerimientos aprobados. La garantía no cubre fallas derivadas de manipulaciones no autorizadas o caídas de APIs de terceros ajenos a Gliro.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Plataformas SaaS y Suscripciones */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Cloud className="w-5 h-5 text-brand-highlight" />
              <h3>4. Soluciones SaaS (Licitracker, Traza, Broker IA)</h3>
            </div>
            <p>
              Para clientes que suscriben planes de software bajo modalidad SaaS:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-xs sm:text-sm">
              <li><strong>Licencia de uso:</strong> Se otorga una licencia no exclusiva, revocable e intransferible para el uso de la plataforma según el plan contratado.</li>
              <li><strong>Disponibilidad (SLA):</strong> Nos comprometemos a mantener una disponibilidad mensual superior al 99.5% de la infraestructura cloud, excluyendo ventanas de mantenimiento programadas.</li>
              <li><strong>Soporte y actualizaciones:</strong> Incluye soporte técnico continuo, mejoras de seguridad y nuevas funcionalidades liberadas para su plan.</li>
            </ul>
          </section>

          {/* Section 5: Infraestructura Cloud, Servidores y Seguridad */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <Cloud className="w-5 h-5 text-brand-highlight" />
              <h3>5. Infraestructura Cloud y Copias de Seguridad</h3>
            </div>
            <p>
              Nuestras aplicaciones se despliegan en infraestructura cloud enterprise (AWS, Google Cloud o servidores dedicados de alto rendimiento).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Respaldos Automatizados:</strong> Ejecutamos copias de seguridad periódicas de bases de datos para garantizar la recuperación ante contingencias.
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>• Uso Responsable:</strong> Queda prohibido el uso de los servidores para actividades ilícitas, envío de SPAM o almacenamiento no autorizado.
              </div>
            </div>
          </section>

          {/* Section 6: Política de Pagos y Facturación */}
          <section className="space-y-3 p-5 rounded-2xl bg-brand-highlight/10 border border-brand-highlight/30">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-base sm:text-lg">
              <CreditCard className="w-5 h-5 text-brand-tertiary" />
              <h3>6. Esquemas de Pago, Facturación y Cancelaciones</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li><strong>• Desarrollos a Medida:</strong> Modalidad por hitos (generalmente 50% anticipo al inicio y 50% contra entrega final en producción, o esquema acordado en la cotización).</li>
              <li><strong>• Suscripciones SaaS:</strong> Facturación recurrente mensual o anual anticipada mediante transferencia electrónica o pasarela de pago autorizada.</li>
              <li><strong>• Facturación Electrónica:</strong> Emisión de Factura Electrónica exenta o afecta a IVA según normativa tributaria del SII en Chile.</li>
              <li><strong>• Período de Gracia y Suspensión:</strong> Las suscripciones cuentan con un plazo de gracia de 5 días hábiles. Tras 30 días de mora no subsanada, el servicio podrá ser pausado temporalmente.</li>
              <li><strong>• Política de Devolución:</strong> Si el Cliente desiste de un proyecto dentro de los 3 días hábiles posteriores al anticipo y sin haberse iniciado el desarrollo, se reembolsará el 100%. Iniciados los trabajos, la devolución será proporcional a los recursos no devengados.</li>
            </ul>
          </section>

          {/* Section 7: Continuidad y Fuerza Mayor */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-lg">
              <AlertCircle className="w-5 h-5 text-brand-highlight" />
              <h3>7. Continuidad Operativa, Trato Respetuoso y Fuerza Mayor</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Gliro promueve relaciones de colaboración basadas en el respeto mutuo. Ante eventos fortuitos o de fuerza mayor (fallas de proveedores globales de internet, catástrofes naturales o cortes prolongados de suministro eléctrico), Gliro activará sus planes de contingencia para restablecer la operatividad en el menor tiempo factible, manteniendo comunicación transparente con el Cliente.
            </p>
          </section>

          {/* Section 8: Contacto y Jurisdicción */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-poppins font-bold text-brand-tertiary text-base sm:text-lg">
              8. Canales de Contacto y Resolución de Controversias
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Para cualquier consulta contractual, requerimiento técnico o formalización de servicios, nuestros canales oficiales son:
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-tertiary text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-brand-highlight font-mono font-bold uppercase tracking-wider block">
                  Atención Contractual & Legal
                </span>
                <p className="text-sm font-semibold">Equipo de Ingeniería & Contratos Gliro</p>
                <p className="text-xs text-slate-300">Santiago de Chile · Cobertura y soporte nacional</p>
              </div>
              <a
                href={`mailto:${siteBrand.email}?subject=Consulta%20sobre%20T%C3%A9rminos%20y%20Condiciones`}
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
            Vigente desde: Agosto {new Date().getFullYear()} · Gliro
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

export default TermsConditionsModal;
