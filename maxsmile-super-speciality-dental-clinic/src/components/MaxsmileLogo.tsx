import React from 'react';

interface MaxsmileLogoProps {
  variant?: 'dark' | 'light' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MaxsmileLogo: React.FC<MaxsmileLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
}) => {
  // Height and scale adjustments
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-9 lg:h-10',
    lg: 'h-12',
  };

  const isDarkBg = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 ${sizeClasses[size]} ${className}`}>
      {/* Icon: Rounded Dark Tile with Smiling Mouth & 3 Green Dots */}
      <svg
        viewBox="0 0 120 120"
        className="h-full w-auto aspect-square"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="120" height="120" rx="28" fill="#20252B" />
        {/* Smiling arc */}
        <path
          d="M 32 68 C 32 90, 88 90, 88 68"
          stroke="#FFFFFF"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left cheek dot */}
        <circle cx="32" cy="50" r="7" fill="#B7D94A" />
        {/* Right cheek dot */}
        <circle cx="88" cy="50" r="7" fill="#B7D94A" />
        {/* Center forehead dot */}
        <circle cx="60" cy="36" r="7" fill="#B7D94A" />
      </svg>

      {/* Typography: MAXSMILE + Lime dot on E + Subtitle */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline font-['IBM_Plex_Sans'] font-bold text-lg lg:text-xl tracking-tight">
          <span className={isDarkBg ? 'text-white' : 'text-[#0B1015]'}>MAXSMIL</span>
          <span className="relative inline-block">
            <span className={isDarkBg ? 'text-white' : 'text-[#0B1015]'}>E</span>
            <span className="absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full bg-[#B7D94A]" />
          </span>
        </div>
        <span
          className={`font-['IBM_Plex_Sans'] text-[10px] lg:text-[11px] font-semibold tracking-wider uppercase mt-0.5 ${
            isDarkBg ? 'text-[#878C93]' : 'text-[#45474B]'
          }`}
        >
          SUPER SPECIALITY DENTAL CLINIC
        </span>
      </div>
    </div>
  );
};
