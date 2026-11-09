import React, { useEffect, useState } from 'react';
import { 
  X, 
  Sparkles, 
  Building2, 
  Car, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Stethoscope, 
  Mic, 
  QrCode, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  FileCheck2
} from 'lucide-react';

interface CvetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvetModal: React.FC<CvetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'clinica' | 'domicilio' | 'salem'>('clinica');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Top Header */}
        <div className="relative bg-gradient-to-r from-brand-tertiary via-slate-900 to-brand-tertiary p-6 sm:p-8 text-white flex justify-between items-start border-b border-white/10 shrink-0">
          <div className="space-y-2 max-w-2xl pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-highlight/20 border border-brand-highlight/40 text-brand-highlight text-xs font-bold uppercase tracking-wider">
              <span>Software Veterinario</span>
              <span>•</span>
              <span>Hecho en Chile</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-poppins font-black leading-tight">
              Cvet <span className="text-brand-highlight">+ Salem IA</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              La ficha clínica de tu veterinaria, sin complicaciones. Atiende, hospitaliza, cobra y mantén a cada tutor informado con Salem —tu asistente con IA— ayudándote en cada atención.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 text-brand-secondary">
          
          {/* El Problema: "Tu veterinaria trabaja casi a ciegas" */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2.5 text-amber-900 font-poppins font-extrabold text-base sm:text-lg mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>¿Tu veterinaria trabaja casi a ciegas?</span>
            </div>
            <p className="text-amber-950 text-xs sm:text-sm mb-4 leading-relaxed">
              No es por falta de ganas — es porque las herramientas de siempre no acompañan. Esto pasa cada semana sin un sistema integral:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { title: 'Fichas en papel', desc: 'Historias en carpetas o un solo PC que no llegan al tutor ni al siguiente colega.' },
                { title: 'Exámenes extraviados', desc: 'Resultados sueltos en WhatsApp o impresos que se pierden entre consultas.' },
                { title: 'Recordatorios a mano', desc: 'Vacunas y controles que se avisan uno por uno… solo si alguien se acuerda.' },
                { title: 'Stock que vence', desc: 'Insumos y medicamentos que caducan en bodega porque nadie los controla.' },
                { title: 'Plata que se escapa', desc: 'Cobros y cuentas en cuaderno o planilla, con errores y sin respaldo.' },
                { title: 'Todo en islas', desc: 'Un software atrapado en un PC, una planilla y WhatsApp. Nada conversa entre sí.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/80 rounded-xl p-3 border border-amber-200/60 text-xs">
                  <span className="font-bold text-amber-950 block mb-1">{item.title}</span>
                  <span className="text-slate-600 leading-normal">{item.desc}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs sm:text-sm font-bold text-amber-900 text-center">
              ¿Cuántas horas a la semana se te van en esto? Cvet las devuelve para lo que de verdad importa: atender.
            </p>
          </div>

          {/* Por qué ahora: Contexto País */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-tertiary" />
              <h3 className="text-lg sm:text-xl font-poppins font-black text-brand-tertiary">
                Por qué ahora: Nunca fue tan necesario ni tan posible
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-sm text-brand-tertiary block mb-1">Ley 21.020 aprieta</span>
                <p className="text-xs text-brand-support leading-relaxed">
                  La Ley de Tenencia Responsable y el Registro Nacional empujan a formalizar microchip, vacunas y fichas. El papel ya no alcanza.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-sm text-brand-tertiary block mb-1">Mayor inversión en mascotas</span>
                <p className="text-xs text-brand-support leading-relaxed">
                  El cuidado animal crece y las clínicas con él. Ordenarse hoy es lo que separa a la clínica que escala de la que se queda atrás.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-sm text-brand-tertiary block mb-1">IA en español, recién hoy</span>
                <p className="text-xs text-brand-support leading-relaxed">
                  Salem resume historiales clínicos e interpreta exámenes en español nativo a un costo justo y accesible.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs: Para Clínica vs Domicilio vs Salem */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-lg sm:text-xl font-poppins font-black text-brand-tertiary">
                Todo lo que necesitas, con o sin local
              </h3>
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-full text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('clinica')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'clinica' ? 'bg-brand-tertiary text-white shadow-xs' : 'text-slate-600 hover:text-brand-tertiary'}`}
                >
                  Clínica con Local
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('domicilio')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'domicilio' ? 'bg-brand-tertiary text-white shadow-xs' : 'text-slate-600 hover:text-brand-tertiary'}`}
                >
                  Atención a Domicilio
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('salem')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'salem' ? 'bg-brand-highlight text-brand-tertiary shadow-xs' : 'text-slate-600 hover:text-brand-tertiary'}`}
                >
                  Salem (Asistente IA)
                </button>
              </div>
            </div>

            {/* Tab: Clínica con Local */}
            {activeTab === 'clinica' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {[
                  { icon: Stethoscope, title: 'Atenciones y ficha clínica', desc: 'Consultas, urgencias y controles acumulativos. Nada se pierde entre colegas.' },
                  { icon: Building2, title: 'Hospitalización', desc: 'Mapa de zonas y caniles, fluidoterapia, insumos y partes de turno con fotos.' },
                  { icon: Calendar, title: 'Agenda y sala de espera', desc: 'Agenda por profesional, sala con urgencias y pantalla TV para la recepción.' },
                  { icon: Sparkles, title: 'Estética y peluquería', desc: 'Servicios con estado del pelaje y registro fotográfico antes/después.' },
                  { icon: ShieldCheck, title: 'Inventario y farmacia', desc: 'Stock con lotes, vencimientos, control de insumos y alertas de quiebre.' },
                  { icon: FileCheck2, title: 'Caja y finanzas', desc: 'Caja diaria, cotizaciones e informes de ingresos y egresos exportables a CSV.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-highlight/60 transition-colors">
                    <item.icon className="w-5 h-5 text-emerald-600 mb-2" />
                    <span className="font-bold text-sm text-brand-tertiary block mb-1">{item.title}</span>
                    <span className="text-xs text-brand-support leading-relaxed block">{item.desc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: A Domicilio */}
            {activeTab === 'domicilio' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { icon: Car, title: 'Ruta del día', desc: 'Ordena tus visitas por comuna y abre la ruta directo en Google Maps o Waze.' },
                  { icon: Calendar, title: 'Solicitudes online', desc: 'Formulario público donde el tutor pide la visita; te llega lista para agendar.' },
                  { icon: ShieldCheck, title: 'Mi bolso / maletín', desc: 'Checklist de equipo e insumos antes de salir a terreno para no olvidar nada.' },
                  { icon: FileCheck2, title: 'Cobro en terreno', desc: 'Cobra en el lugar con boleta electrónica (SII), transferencia o pago online directo.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-brand-highlight/60 transition-colors">
                    <item.icon className="w-5 h-5 text-emerald-600 mb-2" />
                    <span className="font-bold text-sm text-brand-tertiary block mb-1">{item.title}</span>
                    <span className="text-xs text-brand-support leading-relaxed block">{item.desc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Salem IA */}
            {activeTab === 'salem' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { icon: Sparkles, title: 'Salem, tu copiloto clínico con IA', desc: 'Resume historiales, interpreta exámenes y redacta derivaciones citando tus guías clínicas, sin inventar.' },
                  { icon: Mic, title: 'Dicta y se transcribe solo', desc: 'Graba la atención por voz y Salem la pasa a texto estructurado: motivo y examen quedan escritos sin teclear.' },
                  { icon: FileCheck2, title: 'Conocimiento propio', desc: 'Sube tus protocolos (PDF o foto con OCR) y Salem responde citando tu propio criterio con respaldo.' },
                  { icon: QrCode, title: 'Carnet QR y Portal del tutor', desc: 'El tutor ve su ficha por QR o correo; recordatorios automáticos por WhatsApp y campañas a vacunas por vencer.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 shadow-2xs">
                    <item.icon className="w-5 h-5 text-emerald-600 mb-2" />
                    <span className="font-bold text-sm text-brand-tertiary block mb-1">{item.title}</span>
                    <span className="text-xs text-slate-700 leading-relaxed block">{item.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Características Transversales en Cualquier Plan */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-support block mb-3">
              Incluido en cualquier modalidad:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs text-slate-700">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Portal del tutor</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Carnet QR mascota</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Documentos con tu logo</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Reserva de horas online</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Recordatorios WhatsApp</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Red de rescate y ayuda</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> App instalable (PWA)</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Cumplimiento Ley 21.020</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-brand-support text-center sm:text-left">
            ¿Quieres ver una demo o implementar Cvet en tu clínica?
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <a
              href="https://cvet.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-tertiary hover:bg-brand-highlight hover:text-brand-tertiary text-white text-xs font-bold font-poppins transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>Ir a Cvet.cl</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

