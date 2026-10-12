import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowRight, ShieldCheck, Activity, Stethoscope, Sparkles, Smile, Crown } from 'lucide-react';
import { businessConfig, TreatmentService } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

interface TreatmentDirectoryProps {
  onSelectServiceForForm?: (serviceId: string) => void;
}

export const TreatmentDirectory: React.FC<TreatmentDirectoryProps> = ({ onSelectServiceForForm }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'health_and_safety':
        return <ShieldCheck className="w-6 h-6 text-[#20252B]" />;
      case 'vital_signs':
        return <Activity className="w-6 h-6 text-[#20252B]" />;
      case 'medical_services':
        return <Stethoscope className="w-6 h-6 text-[#20252B]" />;
      case 'flare':
        return <Sparkles className="w-6 h-6 text-[#20252B]" />;
      case 'child_care':
        return <Smile className="w-6 h-6 text-[#20252B]" />;
      case 'dentistry':
        return <Crown className="w-6 h-6 text-[#20252B]" />;
      default:
        return <Activity className="w-6 h-6 text-[#20252B]" />;
    }
  };

  const handleEnquire = (e: React.MouseEvent<HTMLAnchorElement>, service: TreatmentService) => {
    e.preventDefault();
    if (onSelectServiceForForm) {
      onSelectServiceForForm(service.id);
    }
    const target = document.getElementById('consultation-booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services-directory"
      ref={containerRef}
      className="w-full bg-[#FFFFFF] py-16 lg:py-24 border-b border-[#E6E8E9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
            EXPLORE DENTAL SERVICES
          </span>
          <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#20252B]">
            THE RIGHT INFORMATION FOR YOUR NEXT STEP.
          </h2>
          <p className="font-['Inter'] text-base text-[#45474B] max-w-2xl leading-relaxed">
            Super-speciality protocols delivered with technical accuracy. Review key focal areas before booking your diagnostic session.
          </p>
        </div>

        {/* 2-Column Editorial System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Static Treatment Index Ledger */}
          <div className="lg:col-span-4 bg-[#F2F4F5] p-6 rounded-sm border border-[#E1E3E4] flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#E1E3E4]">
              <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#111519] tracking-wider uppercase">
                CLINICAL INDEX
              </span>
              <span className="px-2 py-0.5 bg-[#E1E3E4] text-[#45474B] font-['IBM_Plex_Sans'] text-[11px] font-semibold rounded">
                {businessConfig.services.length} MODULES
              </span>
            </div>

            <div className="flex flex-col gap-1.5 font-['IBM_Plex_Sans'] text-sm text-[#45474B]">
              {businessConfig.services.map((service, index) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="p-2.5 rounded hover:bg-white hover:text-[#111519] transition-all flex items-center justify-between font-medium group"
                >
                  <span>{`0${index + 1} ${service.title.split('&')[0].trim()}`}</span>
                  <ChevronRight className="w-4 h-4 text-[#A8B0B8] group-hover:text-[#20252B] group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>

            <div className="mt-4 p-3.5 bg-[#ECEEEF] rounded-sm border border-[#C5C6CB]/40">
              <span className="font-['IBM_Plex_Sans'] text-[11px] text-[#45474B] leading-relaxed block">
                * Services configurable upon clinical verification and individualized anatomical diagnostic review.
              </span>
            </div>
          </div>

          {/* Right: Detailed Treatment Modules */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {businessConfig.services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                ref={(el) => {
                  if (el) rowsRef.current[idx] = el;
                }}
                className="bg-[#F2F4F5] p-6 sm:p-8 rounded-sm border border-[#E1E3E4] flex flex-col gap-4 hover:border-[#20252B] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
                    {service.code}
                  </span>
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="font-['IBM_Plex_Sans'] text-xl sm:text-2xl font-semibold text-[#20252B]">
                  {service.title}
                </h3>

                <p className="font-['Inter'] text-sm sm:text-base text-[#45474B] leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E1E3E4]">
                  <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold text-[#45474B] tracking-wider uppercase">
                    {service.frequencyOrGoal}
                  </span>

                  <a
                    href="#consultation-booking"
                    onClick={(e) => handleEnquire(e, service)}
                    className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#111519] hover:text-[#516600] inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>Enquire about this treatment</span>
                    <ArrowRight className="w-4 h-4 text-[#516600] group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
