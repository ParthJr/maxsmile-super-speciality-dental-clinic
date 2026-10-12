import React from 'react';
import { businessConfig } from '../config/businessConfig';

export const ClinicalInformation: React.FC = () => {
  return (
    <section className="w-full bg-[#20252B] text-white py-16 lg:py-24 border-b border-[#2D353E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#CDF05F] tracking-widest uppercase">
            MAKE INFORMED DECISIONS
          </span>
          <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            UNDERSTAND THE OPTIONS BEFORE YOU PROCEED.
          </h2>
          <p className="font-['Inter'] text-base text-[#878C93] leading-relaxed">
            Clear medical disclosure builds clinical trust. In every consultation at {businessConfig.shortName}, patients are encouraged to openly discuss each procedural parameter.
          </p>
        </div>

        {/* 6 Modular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessConfig.clinicalInfoCards.map((card) => (
            <div
              key={card.number}
              className="p-6 bg-[#1D252B] border border-[#2D353E] rounded-sm flex flex-col gap-3 hover:border-[#CDF05F]/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CDF05F]" />
                <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold text-[#E1E3E4] uppercase tracking-wider">
                  {`${card.number} · ${card.category}`}
                </span>
              </div>

              <h3 className="font-['IBM_Plex_Sans'] text-lg font-semibold text-white">
                {card.title}
              </h3>

              <p className="font-['Inter'] text-sm text-[#878C93] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
