import { Shield } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-base', iconBox: 8 },
    md: { icon: 40, text: 'text-xl', iconBox: 10 },
    lg: { icon: 56, text: 'text-3xl', iconBox: 14 },
    xl: { icon: 72, text: 'text-4xl', iconBox: 18 }
  };

  const currentSize = sizes[size];

  if (variant === 'icon') {
    return (
      <div className={className}>
        <LogoIcon size={currentSize.icon} />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <LogoIcon size={currentSize.icon} />
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-none`}>
            AFRIC-ANALYZER
          </span>
          <span className="text-xs text-[#00C2A8] font-medium tracking-wider mt-0.5">
            SECURITY INTELLIGENCE
          </span>
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={currentSize.icon} />
      <span className={`${currentSize.text} font-bold text-white`}>
        AFRIC-ANALYZER
      </span>
    </div>
  );
}

function LogoIcon({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background gradient circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D6BFF] to-[#00C2A8] rounded-xl" />
      
      {/* Inner shield with network pattern */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Shield outline */}
        <path
          d="M20 4L8 9V16C8 24 12 30 20 36C28 30 32 24 32 16V9L20 4Z"
          fill="white"
          fillOpacity="0.15"
        />
        
        {/* Letter A integrated with data nodes */}
        <path
          d="M20 12L16 22H18L18.5 20.5H21.5L22 22H24L20 12ZM19 19L20 16L21 19H19Z"
          fill="white"
        />
        
        {/* Network nodes - representing data/analytics */}
        <circle cx="14" cy="18" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="26" cy="18" r="1.5" fill="white" fillOpacity="0.6" />
        <circle cx="20" cy="26" r="1.5" fill="white" fillOpacity="0.6" />
        
        {/* Connection lines */}
        <line x1="14" y1="18" x2="18.5" y2="20" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="26" y1="18" x2="21.5" y2="20" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="20" y1="26" x2="20" y2="22" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      </svg>
    </div>
  );
}

// Alternative minimal logo design
export function LogoMinimal({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6BFF" />
          <stop offset="100%" stopColor="#00C2A8" />
        </linearGradient>
      </defs>
      
      {/* Hexagonal shield shape */}
      <path
        d="M20 2L35 10V20C35 28 28 35 20 38C12 35 5 28 5 20V10L20 2Z"
        fill="url(#logoGradient)"
      />
      
      {/* Stylized "A" with scan lines */}
      <path
        d="M20 12L14 26H17L18 23H22L23 26H26L20 12Z M19 21L20 17L21 21H19Z"
        fill="white"
      />
      
      {/* Scan line effect */}
      <line x1="12" y1="15" x2="28" y2="15" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
      <line x1="13" y1="19" x2="27" y2="19" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
      <line x1="14" y1="23" x2="26" y2="23" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
    </svg>
  );
}

// Logo mark for Africa with analytics theme
export function LogoAfrica({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="africaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D6BFF" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#00C2A8" />
        </linearGradient>
      </defs>
      
      <rect width="40" height="40" rx="8" fill="url(#africaGradient)" />
      
      {/* Simplified Africa continent outline with data point */}
      <path
        d="M20 8 C22 8 24 10 24 12 L25 14 C26 14 27 15 27 17 L28 20 C28 22 27 24 25 26 L23 28 C21 30 19 31 17 30 L15 28 C13 26 12 24 12 22 L11 18 C11 16 12 14 14 13 L16 11 C17 9 18 8 20 8Z"
        fill="white"
        fillOpacity="0.9"
      />
      
      {/* Network nodes overlay */}
      <circle cx="20" cy="15" r="1.5" fill="#2D6BFF" />
      <circle cx="17" cy="20" r="1.5" fill="#00C2A8" />
      <circle cx="23" cy="22" r="1.5" fill="#7C3AED" />
      
      {/* Letter A integrated */}
      <path
        d="M20 16L18 21H18.8L19 20H21L21.2 21H22L20 16ZM19.5 19.5L20 17.5L20.5 19.5H19.5Z"
        fill="#0A0F1F"
        opacity="0.6"
      />
    </svg>
  );
}

// Wordmark logo for headers/documents
export function LogoWordmark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ maxHeight: '60px' }}
    >
      <defs>
        <linearGradient id="wordmarkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D6BFF" />
          <stop offset="100%" stopColor="#00C2A8" />
        </linearGradient>
      </defs>
      
      {/* AFRIC-ANALYZER text */}
      <text
        x="0"
        y="40"
        fontSize="32"
        fontWeight="700"
        fill="url(#wordmarkGradient)"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        AFRIC-ANALYZER
      </text>
      
      {/* Tagline */}
      <text
        x="0"
        y="55"
        fontSize="10"
        fontWeight="500"
        fill="#00C2A8"
        letterSpacing="2"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        SECURITY INTELLIGENCE PLATFORM
      </text>
    </svg>
  );
}
