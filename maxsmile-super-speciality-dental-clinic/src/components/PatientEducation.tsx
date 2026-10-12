import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const PatientEducation: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(id);
    }
  };

  return (
    <section className="w-full bg-[#F2F4F5] py-16 lg:py-24 border-b border-[#E1E3E4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
            PATIENT EDUCATION
          </span>
          <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#20252B]">
            QUESTIONS BEFORE YOUR VISIT.
          </h2>
          <p className="font-['Inter'] text-sm sm:text-base text-[#45474B] max-w-xl leading-relaxed">
            Treatment suitability depends on professional clinical assessment and individual circumstances. Here are answers to common inquiries.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="flex flex-col gap-3 w-full" role="region" aria-label="Patient Education Frequently Asked Questions">
          {businessConfig.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-sm border border-[#E1E3E4] overflow-hidden shadow-sm transition-all duration-200 hover:border-[#20252B]"
              >
                <button
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(faq.id)}
                  onKeyDown={(e) => handleKeyDown(e, faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-[#F8FAFB] focus:outline-none focus:ring-2 focus:ring-[#B7D94A]"
                >
                  <span className="font-['IBM_Plex_Sans'] text-base sm:text-lg font-semibold text-[#20252B]">
                    {faq.question}
                  </span>
                  <div className="p-1 bg-[#F2F4F5] rounded-full text-[#20252B] shrink-0">
                    {isOpen ? <Minus className="w-5 h-5 text-[#516600]" /> : <Plus className="w-5 h-5 text-[#20252B]" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-6 pb-6 pt-0 font-['Inter'] text-sm sm:text-base text-[#45474B] leading-relaxed border-t border-[#F2F4F5] mt-1 pt-4 animate-in fade-in-50 duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
