import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '../data/siteContent';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 flex flex-col items-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-xs mb-6">
            <span className="text-brand-tertiary text-xs font-bold uppercase tracking-widest">Resolvemos tus dudas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-extrabold text-brand-tertiary tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-brand-support text-sm md:text-base mt-3 max-w-lg">
            Todo lo que necesitas saber antes de iniciar tu proyecto con Gliro.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`
                  rounded-2xl border transition-all duration-300 overflow-hidden bg-white
                  ${isOpen ? 'border-brand-highlight shadow-lg shadow-brand-highlight/10 ring-1 ring-brand-highlight/50' : 'border-slate-200 shadow-sm hover:border-slate-300'}
                `}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base md:text-lg font-poppins font-bold transition-colors pr-6 ${isOpen ? 'text-brand-tertiary' : 'text-brand-secondary'}`}>
                    {item.question}
                  </span>
                  <div
                    className={`
                      shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${isOpen ? 'bg-brand-highlight text-brand-tertiary rotate-180' : 'bg-slate-100 text-brand-support hover:bg-slate-200'}
                    `}
                  >
                    {isOpen ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                </button>

                <div
                  className={`
                    grid transition-[grid-template-rows] duration-300 ease-out
                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-7 md:pb-7 text-brand-support leading-relaxed border-t border-slate-100 pt-4 text-sm md:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
