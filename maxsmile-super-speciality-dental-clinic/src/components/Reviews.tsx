import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const Reviews: React.FC = () => {
  return (
    <section id="reputation-section" className="w-full bg-[#FFFFFF] py-16 lg:py-20 border-b border-[#E6E8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-[#F2F4F5] p-8 lg:p-12 rounded-sm border border-[#E1E3E4] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          
          {/* Left Column: Rating details */}
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEEF] rounded-sm w-fit border border-[#C5C6CB]/40">
              <span className="w-2 h-2 rounded-full bg-[#B7D94A]" />
              <span className="font-['IBM_Plex_Sans'] text-[11px] font-bold text-[#191C1D] tracking-wider uppercase">
                VERIFIED GOOGLE BUSINESS LISTING · SARGASAN
              </span>
            </div>

            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-['IBM_Plex_Sans'] text-4xl sm:text-5xl font-bold text-[#20252B]">
                {businessConfig.rating.toFixed(1)} / 5.0
              </span>
              <div className="flex text-[#516600]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#B7D94A] text-[#516600]" />
                ))}
              </div>
            </div>

            <p className="font-['Inter'] text-sm sm:text-base text-[#45474B] leading-relaxed max-w-xl">
              Based on {businessConfig.reviewCount} verified patient reviews on Google for {businessConfig.businessName} in Sargasan, Gandhinagar.
            </p>
          </div>

          {/* Right Column: CTA */}
          <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
            <a
              href={businessConfig.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#20252B] text-white font-['IBM_Plex_Sans'] text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-[#111519] transition-colors shadow-md"
            >
              <span>READ GOOGLE REVIEWS</span>
              <ExternalLink className="w-4 h-4 text-[#B7D94A]" />
            </a>

            <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold text-[#45474B] uppercase tracking-wider">
              GENUINE CLINICAL FEEDBACK
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
