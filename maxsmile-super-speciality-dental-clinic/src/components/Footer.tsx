import React, { useState } from 'react';
import { MaxsmileLogo } from './MaxsmileLogo';
import { businessConfig } from '../config/businessConfig';
import { PrivacyPolicyModal, TermsOfServiceModal } from './PolicyModals';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#20252B] border-t border-[#2D353E] py-12 text-[#E1E3E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <MaxsmileLogo variant="dark" size="md" />
          <p className="font-['Inter'] text-sm text-[#878C93] max-w-sm leading-relaxed">
            Super Speciality Dental Clinic delivering advanced oral rehabilitation, maxillofacial precision, and micro-endodontic diagnostics in Sargasan, Gandhinagar.
          </p>
          <div className="flex flex-col gap-1 pt-2">
            <span className="font-['IBM_Plex_Sans'] text-[11px] font-semibold text-[#CDF05F] uppercase tracking-wider">
              CLINICAL LOCATION
            </span>
            <p className="font-['Inter'] text-xs text-[#E1E3E4] leading-relaxed">
              {businessConfig.address}
            </p>
          </div>
        </div>

        {/* Practice Links */}
        <div className="flex flex-col gap-3">
          <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-white uppercase tracking-wider">
            PRACTICE
          </span>
          <div className="flex flex-col gap-2 font-['Inter'] text-sm">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              About Clinic
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              The Maxsmile Approach
            </a>
            <a
              href="#reputation-section"
              onClick={(e) => handleNavClick(e, '#reputation-section')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              Patient Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              Infrastructure
            </a>
          </div>
        </div>

        {/* Services Links */}
        <div className="flex flex-col gap-3">
          <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-white uppercase tracking-wider">
            SERVICES
          </span>
          <div className="flex flex-col gap-2 font-['Inter'] text-sm">
            {businessConfig.services.slice(0, 4).map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                onClick={(e) => handleNavClick(e, '#services-directory')}
                className="text-[#878C93] hover:text-white transition-colors"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>

        {/* Patient Desk Links */}
        <div className="flex flex-col gap-3">
          <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-white uppercase tracking-wider">
            PATIENT DESK
          </span>
          <div className="flex flex-col gap-2 font-['Inter'] text-sm">
            <a
              href="#patient-workflow"
              onClick={(e) => handleNavClick(e, '#patient-workflow')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              Patient Workflow
            </a>
            <a
              href="#consultation-booking"
              onClick={(e) => handleNavClick(e, '#consultation-booking')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              Consultation Intake
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-[#878C93] hover:text-white transition-colors"
            >
              Location & Map
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 pt-6 border-t border-[#2D353E] flex flex-col sm:flex-row items-center justify-between gap-4 font-['IBM_Plex_Sans'] text-xs text-[#878C93]">
        <p>© 2025 Maxsmile Super Speciality Dental Clinic. Sargasan, Gandhinagar. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setPrivacyOpen(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTermsOpen(true)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Clinical Service
          </button>
        </div>
      </div>

      {/* Policy Modals */}
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </footer>
  );
};
