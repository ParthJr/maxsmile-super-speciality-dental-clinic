import React from 'react';
import { MapPin, Navigation, Clock, Phone, Mail } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-[#FFFFFF] py-16 lg:py-24 border-b border-[#E6E8E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
            LOCATION & ACCESSIBILITY
          </span>
          <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#20252B]">
            FIND MAXSMILE.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Address & Details Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#F2F4F5] p-6 sm:p-8 rounded-sm border border-[#E1E3E4] flex flex-col gap-6 shadow-sm">
              
              <div className="flex flex-col gap-2">
                <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] uppercase tracking-wider">
                  PRIMARY SURGICAL FACILITY
                </span>
                <h3 className="font-['IBM_Plex_Sans'] text-xl font-semibold text-[#20252B]">
                  Sargasan, Gandhinagar
                </h3>
                <p className="font-['Inter'] text-sm text-[#45474B] leading-relaxed">
                  {businessConfig.address}
                </p>
              </div>

              {/* Operating Schedule */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#E1E3E4]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#516600]" />
                  <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                    OPERATING SCHEDULE
                  </span>
                </div>
                <div className="flex items-center justify-between font-['Inter'] text-xs text-[#45474B] py-1">
                  <span>Daily Morning Hours</span>
                  <span className="font-semibold text-[#111519]">From {businessConfig.openingTime} onwards</span>
                </div>
                <span className="font-['IBM_Plex_Sans'] text-[11px] text-[#45474B] italic leading-relaxed">
                  {businessConfig.weeklyScheduleNote}
                </span>
              </div>

              {/* Verified Phone Contact Link (Only shown if phone exists & configured) */}
              {businessConfig.phone && businessConfig.enablePhoneCTA && (
                <div className="flex flex-col gap-2 pt-2 border-t border-[#E1E3E4]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#516600]" />
                    <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                      TELEPHONE ENQUIRIES
                    </span>
                  </div>
                  <a
                    href={`tel:${businessConfig.phone}`}
                    className="font-['Inter'] text-sm font-semibold text-[#20252B] hover:text-[#516600] underline"
                  >
                    {businessConfig.phone}
                  </a>
                </div>
              )}

              {/* Directions Button */}
              <a
                href={businessConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ECEEEF] text-[#20252B] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-wider uppercase border border-[#C5C6CB] rounded-sm hover:bg-[#E1E3E4] transition-colors mt-2"
              >
                <Navigation className="w-4 h-4 text-[#516600]" />
                <span>GET DIRECTIONS VIA GOOGLE MAPS</span>
              </a>

            </div>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="lg:col-span-7">
            <div className="w-full h-[400px] lg:h-[420px] rounded-sm border border-[#E1E3E4] shadow-md relative overflow-hidden bg-[#ECEEEF] flex flex-col justify-between">
              
              {/* Embedded Google Maps View for Sargasan, Gandhinagar */}
              <iframe
                title="Maxsmile Dental Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.012589085817!2d72.631111!3d23.178056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEwJzQxLjAiTiA3MsKwMzcnNTIuMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Footer Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-sm border border-[#20252B]/20 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#F2F4F5] rounded-full text-[#516600]">
                    <MapPin className="w-5 h-5 text-[#516600]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['IBM_Plex_Sans'] text-sm font-bold text-[#111519]">
                      {businessConfig.businessName}
                    </span>
                    <span className="font-['Inter'] text-xs text-[#45474B]">
                      {businessConfig.cityStatePincode}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-[#B7D94A] text-[#111519] font-['IBM_Plex_Sans'] text-[11px] font-bold rounded uppercase shrink-0 text-center">
                  LANDMARK: {businessConfig.landmark}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
