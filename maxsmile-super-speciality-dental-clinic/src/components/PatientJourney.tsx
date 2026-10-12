import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessConfig } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

export const PatientJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate connecting timeline bar
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Animate stages
      gsap.fromTo(
        stagesRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="patient-workflow"
      ref={containerRef}
      className="w-full bg-[#F8FAFB] py-16 lg:py-24 border-b border-[#E1E3E4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
            PATIENT WORKFLOW
          </span>
          <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#20252B]">
            A CLEAR PROCESS. INFORMED NEXT STEPS.
          </h2>
        </div>

        {/* 4-Stage Horizontal Progression Track */}
        <div className="relative">
          {/* Animated Connecting Line (Hidden on mobile, visible on lg) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#B7D94A] origin-left z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {businessConfig.patientJourney.map((step, idx) => (
              <div
                key={step.stageNumber}
                ref={(el) => {
                  if (el) stagesRef.current[idx] = el;
                }}
                className="bg-white p-6 rounded-sm border border-[#A8B0B8]/30 flex flex-col gap-4 shadow-sm hover:border-[#20252B] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['IBM_Plex_Sans'] text-[11px] font-bold px-2.5 py-1 bg-[#F2F4F5] text-[#20252B] rounded">
                    STAGE {step.stageNumber}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B7D94A]" />
                </div>

                <h3 className="font-['IBM_Plex_Sans'] text-xl font-semibold text-[#20252B]">
                  {step.title}
                </h3>

                <p className="font-['Inter'] text-sm text-[#45474B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
