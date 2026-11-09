import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  Bot,
  User,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { registerChatLead, sendChatMessage } from '../services/api';
import { siteBrand } from '../data/siteContent';
import type { ChatMessage, ChatRegisterData } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadId, setLeadId] = useState<number | null>(null);
  const [leadNombre, setLeadNombre] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [leadUpdatedNotice, setLeadUpdatedNotice] = useState(false);

  // Registration form state
  const [formData, setFormData] = useState<ChatRegisterData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore session from sessionStorage if present
  useEffect(() => {
    try {
      const savedId = sessionStorage.getItem('gliro_lead_id');
      const savedNombre = sessionStorage.getItem('gliro_lead_nombre');
      const savedMessages = sessionStorage.getItem('gliro_chat_messages');

      if (savedId) {
        setLeadId(Number(savedId));
        setLeadNombre(savedNombre || '');
        if (savedMessages) {
          const parsed = JSON.parse(savedMessages);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save messages to sessionStorage
  useEffect(() => {
    if (leadId && messages.length > 0) {
      try {
        sessionStorage.setItem('gliro_chat_messages', JSON.stringify(messages));
      } catch {
        // Ignore storage errors
      }
    }
  }, [messages, leadId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && leadId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen, leadId]);

  // Set initial bot greeting once lead is identified and messages are empty
  useEffect(() => {
    if (leadId && messages.length === 0) {
      const greeting = `¡Hola ${leadNombre ? leadNombre : ''}! Soy el asistente virtual de Gliro. Cuéntame en qué proyecto estás pensando (Licitracker, Traza, Software a medida, Automatización con IA) y te ayudo a ver la mejor solución técnica.`;
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [leadId, leadNombre, messages.length]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const nom = formData.nombre.trim();
    const em = (formData.email || '').trim();
    const tel = (formData.telefono || '').trim();

    if (!nom) {
      setErrorMsg('Por favor ingresa tu nombre.');
      return;
    }
    if (!em && !tel) {
      setErrorMsg('Déjanos al menos un correo o tu teléfono para poder darte seguimiento.');
      return;
    }

    setRegistering(true);
    try {
      const res = await registerChatLead({
        nombre: nom,
        email: em || undefined,
        telefono: tel || undefined,
        empresa: formData.empresa?.trim() || undefined,
      });

      if (res.ok && res.lead_id) {
        setLeadId(res.lead_id);
        setLeadNombre(res.nombre || nom);
        try {
          sessionStorage.setItem('gliro_lead_id', String(res.lead_id));
          sessionStorage.setItem('gliro_lead_nombre', res.nombre || nom);
        } catch {
          // Ignore
        }
        setTimeout(() => {
          inputRef.current?.focus();
        }, 200);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Ocurrió un error al registrar tus datos. Por favor intenta de nuevo.');
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || loading || !leadId) return;

    setErrorMsg(null);
    const updatedHistory: ChatMessage[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(updatedHistory);
    setInputValue('');
    setLoading(true);

    try {
      const res = await sendChatMessage(leadId, updatedHistory);
      if (res.reply) {
        setMessages([...updatedHistory, { role: 'assistant', content: res.reply }]);
        if (res.leadUpdated) {
          setLeadUpdatedNotice(true);
        }
      } else {
        setMessages([
          ...updatedHistory,
          { role: 'assistant', content: 'No pude generar una respuesta en este momento. Por favor intenta reformular tu mensaje.' },
        ]);
      }
    } catch (err) {
      const errorResponse =
        err instanceof Error
          ? err.message
          : 'No pude conectarme con el servidor. Puedes escribirnos directamente por WhatsApp al +56 9 7563 8193.';
      setMessages([...updatedHistory, { role: 'assistant', content: errorResponse }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleRestartChat = () => {
    try {
      sessionStorage.removeItem('gliro_lead_id');
      sessionStorage.removeItem('gliro_lead_nombre');
      sessionStorage.removeItem('gliro_chat_messages');
    } catch {
      // Ignore
    }
    setLeadId(null);
    setLeadNombre('');
    setMessages([]);
    setLeadUpdatedNotice(false);
    setFormData({ nombre: '', email: '', telefono: '', empresa: '' });
  };

  const quickQuestions = [
    '¿Qué es y cómo funciona Licitracker?',
    '¿Cómo me ayuda Traza con la norma ISO 9001?',
    'Quiero cotizar un software a medida',
    '¿Cómo automatizan procesos con IA?',
  ];

  return (
    <aside aria-label="Asistente Virtual Gliro" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Trigger Button */}
      <div className="relative flex items-center justify-end">
        {/* Pulsing ring animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-brand-highlight opacity-50 animate-ping-slow pointer-events-none"></span>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Cerrar chat de Gliro' : 'Abrir chat con el asistente de Gliro'}
          className={`
            relative p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform 
            hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer
            ${
              isOpen
                ? 'bg-brand-tertiary text-white ring-2 ring-brand-highlight/80 rotate-90 shadow-brand-tertiary/40'
                : 'bg-brand-tertiary text-white ring-2 ring-brand-highlight hover:bg-slate-800 shadow-xl'
            }
          `}
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-highlight ring-2 ring-brand-tertiary animate-pulse"></span>
            </div>
          )}
        </button>

        {/* Small Tooltip pill on hover when closed */}
        {!isOpen && (
          <div className="hidden md:flex absolute right-16 items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-tertiary/95 backdrop-blur-md text-white text-xs font-semibold shadow-lg border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-3.5 h-3.5 text-brand-highlight" />
            <span>Habla con nuestro Asistente IA</span>
          </div>
        )}
      </div>

      {/* Floating Chat Modal / Panel */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Chat con el Asistente Virtual Gliro"
        className={`
          fixed bottom-20 sm:bottom-24 right-4 sm:right-6
          w-[calc(100vw-2rem)] sm:w-[390px] md:w-[420px] 
          h-[540px] max-h-[calc(100vh-7rem)]
          bg-white rounded-[2rem] shadow-2xl border border-slate-200/90
          flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50
          ${
            isOpen
              ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
              : 'opacity-0 scale-95 pointer-events-none translate-y-4'
          }
        `}
      >
        {/* Header */}
        <div className="bg-brand-tertiary text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-brand-highlight relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 text-brand-highlight">
              <Bot className="w-5 h-5" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brand-highlight ring-2 ring-brand-tertiary"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-poppins font-bold text-sm sm:text-base leading-none">Consultor Gliro</h3>
                <span className="px-2 py-0.5 rounded-full bg-brand-highlight/20 border border-brand-highlight/40 text-[10px] font-bold text-brand-highlight uppercase tracking-wider">
                  IA
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-highlight animate-pulse"></span>
                <span>En línea · Respuesta inmediata</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* WhatsApp direct escape button */}
            <a
              href={siteBrand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir WhatsApp directo"
              className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white transition-colors flex items-center justify-center"
              aria-label="Hablar directo por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            {/* Close window */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panel Body: Step 1 Registration OR Step 2 Chat */}
        {!leadId ? (
          /* STEP 1: Registration Form */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/60 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-brand-tertiary font-poppins font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>¡Te damos la bienvenida a Gliro!</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-support leading-relaxed">
                  Para orientarte con la mejor solución técnica y responder tus dudas en detalle, cuéntanos primero quién eres:
                </p>
              </div>

              <form id="chat-register-form" onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-brand-tertiary uppercase tracking-wider mb-1">
                    Nombre completo <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Ej. Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:border-transparent text-brand-secondary placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-tertiary uppercase tracking-wider mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      maxLength={160}
                      placeholder="nombre@empresa.cl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:border-transparent text-brand-secondary placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-tertiary uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      maxLength={40}
                      placeholder="+56 9 1234 5678"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:border-transparent text-brand-secondary placeholder-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-tertiary uppercase tracking-wider mb-1">
                    Empresa u Organización <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={160}
                    placeholder="Ej. Mi Empresa SpA"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:border-transparent text-brand-secondary placeholder-slate-400"
                  />
                </div>

                <p className="text-[11px] text-brand-support leading-tight">
                  * Necesitamos al menos tu correo o tu WhatsApp para poder contactarte con el detalle técnico.
                </p>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={registering}
                  className="
                    w-full py-3 px-4 rounded-full bg-brand-highlight hover:bg-emerald-400 active:scale-98
                    text-brand-tertiary font-poppins font-bold text-sm transition-all duration-200 
                    shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60
                  "
                >
                  {registering ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <span>Empezar a chatear</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="pt-4 text-center">
              <span className="text-[11px] text-slate-400">
                Tus datos están protegidos según nuestra política de privacidad.
              </span>
            </div>
          </div>
        ) : (
          /* STEP 2: Interactive AI Chat */
          <div className="flex-1 flex flex-col justify-between bg-slate-50/40 overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {messages.map((msg, index) => {
                const isBot = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-xl bg-brand-tertiary text-brand-highlight flex items-center justify-center shrink-0 mb-0.5 border border-slate-700 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`
                        max-w-[84%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs
                        ${
                          isBot
                            ? 'bg-white border border-slate-200/90 text-brand-secondary rounded-bl-xs'
                            : 'bg-brand-tertiary text-white rounded-br-xs'
                        }
                      `}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-xl bg-slate-200 text-brand-tertiary flex items-center justify-center shrink-0 mb-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bot typing animated indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-7 h-7 rounded-xl bg-brand-tertiary text-brand-highlight flex items-center justify-center shrink-0 border border-slate-700">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200/90 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              {/* Lead Qualified confirmation alert */}
              {leadUpdatedNotice && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Un consultor de Gliro revisará tus requerimientos y te contactará a la brevedad.</span>
                </div>
              )}

              {/* Quick suggestion prompt chips (only shown when conversation has 1 message) */}
              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-bold text-brand-support uppercase tracking-wider block">
                    Preguntas frecuentes:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="
                          text-left text-xs p-2.5 rounded-xl bg-white border border-slate-200 
                          hover:border-brand-highlight hover:bg-slate-50 text-brand-secondary 
                          transition-all duration-200 cursor-pointer shadow-2xs font-medium
                        "
                      >
                        ⚡ {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar & Actions */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  maxLength={600}
                  placeholder="Escribe tu consulta..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={loading}
                  className="
                    flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-full bg-slate-50 border border-slate-200 
                    focus:outline-none focus:ring-2 focus:ring-brand-highlight focus:bg-white text-brand-secondary
                    placeholder-slate-400
                  "
                />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  aria-label="Enviar mensaje"
                  className="
                    w-10 h-10 rounded-full bg-brand-highlight text-brand-tertiary flex items-center justify-center 
                    hover:bg-emerald-400 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-40
                  "
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom bar options: WhatsApp + Reset chat */}
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-brand-support px-1">
                <a
                  href={siteBrand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>¿Prefieres WhatsApp? Hablar aquí</span>
                </a>

                <button
                  type="button"
                  onClick={handleRestartChat}
                  title="Reiniciar chat y datos"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatWidget;
