import React, { useState, useEffect } from 'react';
import { MaxsmileLogo } from './MaxsmileLogo';
import { businessConfig } from '../config/businessConfig';
import { Menu, X, Phone, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['home', 'about', 'services-directory', 'patient-workflow', 'consultation-booking', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Dental Services', href: '#services-directory', id: 'services-directory' },
    { name: 'Patient Guide', href: '#patient-workflow', id: 'patient-workflow' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#20252B] border-b border-[#2D353E] ${
        scrolled ? 'shadow-lg py-2.5' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#B7D94A] rounded-sm">
          <MaxsmileLogo variant="dark" size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 font-['Inter'] text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'text-[#B7D94A] bg-[#1D252B]'
                    : 'text-[#E1E3E4] hover:text-white hover:bg-[#1D252B]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Configurable Telephone CTA (Only shown if phone is configured & enabled) */}
          {businessConfig.phone && businessConfig.enablePhoneCTA && (
            <a
              href={`tel:${businessConfig.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1D252B] text-white font-['IBM_Plex_Sans'] text-xs font-semibold tracking-wider uppercase border border-[#A8B0B8]/30 hover:border-[#B7D94A] hover:text-[#B7D94A] transition-colors rounded-md"
            >
              <Phone className="w-3.5 h-3.5 text-[#B7D94A]" />
              <span>{businessConfig.phone}</span>
            </a>
          )}

          {/* Primary Consultation Button */}
          <a
            href="#consultation-booking"
            onClick={(e) => handleNavClick(e, '#consultation-booking')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#20252B] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-wider uppercase border border-[#B7D94A] hover:bg-[#B7D94A] hover:text-[#111519] transition-all duration-200 rounded-md shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>REQUEST A CONSULTATION</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-[#E1E3E4] hover:text-white hover:bg-[#1D252B] rounded-md transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#20252B] border-t border-[#2D353E] px-4 pt-3 pb-6 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2.5 text-base font-medium text-[#E1E3E4] hover:text-[#B7D94A] hover:bg-[#1D252B] rounded-md transition-colors flex items-center justify-between"
            >
              <span>{link.name}</span>
              <span className="text-xs text-[#878C93] font-mono">→</span>
            </a>
          ))}

          <div className="pt-4 border-t border-[#2D353E] flex flex-col gap-3">
            {businessConfig.phone && businessConfig.enablePhoneCTA && (
              <a
                href={`tel:${businessConfig.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1D252B] text-white font-['IBM_Plex_Sans'] text-xs font-semibold tracking-wider uppercase border border-[#A8B0B8]/40 rounded-md"
              >
                <Phone className="w-4 h-4 text-[#B7D94A]" />
                <span>Call {businessConfig.phone}</span>
              </a>
            )}

            <a
              href="#consultation-booking"
              onClick={(e) => handleNavClick(e, '#consultation-booking')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#B7D94A] text-[#111519] font-['IBM_Plex_Sans'] text-xs font-bold tracking-wider uppercase rounded-md shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>REQUEST A CONSULTATION</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
