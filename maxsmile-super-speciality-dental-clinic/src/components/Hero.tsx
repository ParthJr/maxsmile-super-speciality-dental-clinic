import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, ArrowRight } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, delay: 0.2 }
      )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          '-=0.5'
        )
        .fromTo(
          ratingRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1 },
          '-=0.4'
        )
        .fromTo(
          imageFrameRef.current,
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert(); // Proper GSAP cleanup
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative w-full bg-[#FFFFFF] overflow-hidden pt-12 pb-16 lg:py-20 border-b border-[#E6E8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Technical Location Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#F2F4F5] border border-[#E1E3E4] rounded-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-[#B7D94A] animate-pulse" />
              <span className="font-['IBM_Plex_Sans'] text-xs font-semibold tracking-wider text-[#191C1D] uppercase">
                {businessConfig.shortName} · SARGASAN · GANDHINAGAR
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-['IBM_Plex_Sans'] text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#20252B] leading-[1.15]"
            >
              SMARTER PLANNING FOR BETTER DENTAL CARE.
            </h1>

            {/* Subtitle Narrative */}
            <p
              ref={paragraphRef}
              className="font-['Inter'] text-base sm:text-lg text-[#45474B] leading-relaxed max-w-xl"
            >
              Understand your dental concerns, explore relevant treatment options, and prepare for a professional assessment tailored to your needs.
            </p>

            {/* Action Buttons Stack */}
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#services-directory"
                onClick={(e) => handleScrollTo(e, 'services-directory')}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#20252B] text-white font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#111519] transition-all duration-200 group shadow-md"
              >
                <span>EXPLORE DENTAL SERVICES</span>
                <span className="w-2 h-2 rounded-full bg-[#B7D94A] group-hover:scale-125 transition-transform" />
              </a>

              <a
                href="#consultation-booking"
                onClick={(e) => handleScrollTo(e, 'consultation-booking')}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#F2F4F5] text-[#20252B] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest uppercase border border-[#A8B0B8]/40 rounded-sm hover:bg-[#E6E8E9] transition-colors"
              >
                REQUEST A CONSULTATION
              </a>
            </div>

            {/* Reputation Micro-module */}
            <div ref={ratingRef} className="flex items-center gap-4 pt-4 border-t border-[#F2F4F5]">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F2F4F5] rounded-sm border border-[#E1E3E4]">
                <span className="font-['IBM_Plex_Sans'] text-xl font-bold text-[#111519]">
                  {businessConfig.rating.toFixed(1)}
                </span>
                <div className="flex text-[#516600]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B7D94A] text-[#516600]" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold tracking-wider text-[#45474B] uppercase">
                  VERIFIED CLINIC SCORE
                </span>
                <a
                  href="#reputation-section"
                  onClick={(e) => handleScrollTo(e, 'reputation-section')}
                  className="font-['Inter'] text-xs font-semibold text-[#111519] underline underline-offset-4 hover:text-[#516600] transition-colors"
                >
                  {businessConfig.reviewCount} Google reviews
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Operatory Frame & Diagnostic Metadata */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageFrameRef}
              className="relative bg-[#20252B] rounded-sm overflow-hidden shadow-2xl border border-[#20252B]"
            >
              {/* Clinical Operatory Image */}
              <img
                src={businessConfig.operatoryImageUrl}
                alt="Maxsmile Clinical Operatory & Digital Radiography Suite"
                className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                loading="eager"
              />

              {/* Technical Overlay Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#0B1015]/85 backdrop-blur-md text-white rounded-sm border border-[#A8B0B8]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7D94A]" />
                <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold tracking-widest uppercase">
                  SUITE 01 · OPERATORY & CBCT
                </span>
              </div>

              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-md text-[#111519] rounded-sm border border-[#20252B]/20 shadow-md">
                <span className="font-['IBM_Plex_Sans'] text-[11px] font-bold tracking-wider uppercase">
                  {businessConfig.coordinates}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
