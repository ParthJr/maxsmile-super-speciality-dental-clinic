import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Activity, CheckSquare } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

export const ClinicIntroduction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Assess',
      subtitle: 'PRIMARY EVALUATION',
      description:
        'Discuss your concerns and relevant dental history through focused conversation and comprehensive visual examinations.',
      icon: <FileText className="w-4 h-4 text-[#516600]" />,
    },
    {
      number: '02',
      title: 'Explain',
      subtitle: 'DIAGNOSTIC EVIDENCE',
      description:
        'Understand relevant findings, options, and alternatives using transparent digital imaging and radiographic review.',
      icon: <Activity className="w-4 h-4 text-[#516600]" />,
    },
    {
      number: '03',
      title: 'Plan',
      subtitle: 'COLLABORATIVE PLAN',
      description:
        'Discuss appropriate next steps, phased treatment timelines, clear clinical costs, and dedicated post-care routines.',
      icon: <CheckSquare className="w-4 h-4 text-[#516600]" />,
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full bg-[#F2F4F5] py-16 lg:py-24 border-b border-[#E1E3E4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
            THE {businessConfig.shortName} APPROACH
          </span>
          <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#20252B]">
            CLARITY AT EVERY STEP OF YOUR CARE.
          </h2>
          <p className="font-['Inter'] text-base text-[#45474B] leading-relaxed">
            Understanding your concerns, reviewing relevant findings, and discussing appropriate options are important parts of planning dental treatment.
          </p>
        </div>

        {/* 3-Column Sequential Technical Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="bg-white p-8 rounded-sm border border-[#A8B0B8]/30 flex flex-col justify-between h-full shadow-sm hover:border-[#20252B] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-['IBM_Plex_Sans'] text-2xl font-bold text-[#20252B]">
                    {step.number}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B7D94A] group-hover:scale-125 transition-transform" />
                </div>
                <h3 className="font-['IBM_Plex_Sans'] text-xl font-semibold text-[#20252B]">
                  {step.title}
                </h3>
                <p className="font-['Inter'] text-sm text-[#45474B] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F2F4F5] flex items-center gap-2">
                {step.icon}
                <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold text-[#45474B] tracking-wider uppercase">
                  {step.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
