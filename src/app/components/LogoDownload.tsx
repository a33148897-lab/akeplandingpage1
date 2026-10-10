import { Download } from 'lucide-react';
import { Logo, LogoMinimal, LogoAfrica } from './Logo';

export function LogoDownload() {
  const downloadSVG = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Primary Logo SVG
  const primaryLogoSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D6BFF" />
      <stop offset="100%" stop-color="#00C2A8" />
    </linearGradient>
  </defs>
  
  <!-- Shield Background -->
  <rect width="200" height="200" rx="40" fill="url(#logoGradient)" />
  
  <!-- Shield Outline -->
  <path d="M100 30L50 50V85C50 120 65 145 100 170C135 145 150 120 150 85V50L100 30Z" 
        fill="white" fill-opacity="0.15" />
  
  <!-- Letter A -->
  <path d="M100 60L80 110H90L92.5 102.5H107.5L110 110H120L100 60ZM95 95L100 80L105 95H95Z" 
        fill="white" />
  
  <!-- Network Nodes -->
  <circle cx="70" cy="90" r="7.5" fill="white" fill-opacity="0.6" />
  <circle cx="130" cy="90" r="7.5" fill="white" fill-opacity="0.6" />
  <circle cx="100" cy="130" r="7.5" fill="white" fill-opacity="0.6" />
  
  <!-- Connection Lines -->
  <line x1="70" y1="90" x2="92.5" y2="100" stroke="white" stroke-opacity="0.3" stroke-width="3" />
  <line x1="130" y1="90" x2="107.5" y2="100" stroke="white" stroke-opacity="0.3" stroke-width="3" />
  <line x1="100" y1="130" x2="100" y2="110" stroke="white" stroke-opacity="0.3" stroke-width="3" />
</svg>`;

  // Icon Only SVG
  const iconOnlySVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D6BFF" />
      <stop offset="100%" stop-color="#00C2A8" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" rx="80" fill="url(#iconGradient)" />
  
  <!-- Shield Outline -->
  <path d="M200 60L100 100V170C100 240 130 290 200 340C270 290 300 240 300 170V100L200 60Z" 
        fill="white" fill-opacity="0.15" />
  
  <!-- Letter A -->
  <path d="M200 120L160 220H180L185 205H215L220 220H240L200 120ZM190 190L200 160L210 190H190Z" 
        fill="white" />
  
  <!-- Network Nodes -->
  <circle cx="140" cy="180" r="15" fill="white" fill-opacity="0.6" />
  <circle cx="260" cy="180" r="15" fill="white" fill-opacity="0.6" />
  <circle cx="200" cy="260" r="15" fill="white" fill-opacity="0.6" />
  
  <!-- Connection Lines -->
  <line x1="140" y1="180" x2="185" y2="200" stroke="white" stroke-opacity="0.3" stroke-width="6" />
  <line x1="260" y1="180" x2="215" y2="200" stroke="white" stroke-opacity="0.3" stroke-width="6" />
  <line x1="200" y1="260" x2="200" y2="220" stroke="white" stroke-opacity="0.3" stroke-width="6" />
</svg>`;

  // Horizontal Logo with Text
  const horizontalLogoSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="horizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D6BFF" />
      <stop offset="100%" stop-color="#00C2A8" />
    </linearGradient>
  </defs>
  
  <!-- Icon -->
  <rect x="20" y="20" width="160" height="160" rx="32" fill="url(#horizGradient)" />
  <path d="M100 48L60 68V102C60 136 76 156 100 176C124 156 140 136 140 102V68L100 48Z" 
        fill="white" fill-opacity="0.15" />
  <path d="M100 72L88 104H94L95.5 100H104.5L106 104H112L100 72ZM97 97L100 88L103 97H97Z" 
        fill="white" />
  <circle cx="82" cy="94" r="4" fill="white" fill-opacity="0.6" />
  <circle cx="118" cy="94" r="4" fill="white" fill-opacity="0.6" />
  <circle cx="100" cy="118" r="4" fill="white" fill-opacity="0.6" />
  
  <!-- Text -->
  <text x="200" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="700" fill="white">
    AFRIC-ANALYZER
  </text>
  <text x="200" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#00C2A8" letter-spacing="3">
    SECURITY INTELLIGENCE
  </text>
</svg>`;

  // Minimal Badge SVG
  const minimalBadgeSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D6BFF" />
      <stop offset="100%" stop-color="#00C2A8" />
    </linearGradient>
  </defs>
  
  <!-- Hexagonal Shield -->
  <path d="M150 15L262.5 75V150C262.5 210 210 262.5 150 285C90 262.5 37.5 210 37.5 150V75L150 15Z" 
        fill="url(#badgeGradient)" />
  
  <!-- Letter A with scan lines -->
  <path d="M150 90L105 195H127.5L135 172.5H165L172.5 195H195L150 90ZM142.5 157.5L150 127.5L157.5 157.5H142.5Z" 
        fill="white" />
  
  <!-- Scan lines -->
  <line x1="90" y1="112.5" x2="210" y2="112.5" stroke="white" stroke-opacity="0.3" stroke-width="2" />
  <line x1="97.5" y1="142.5" x2="202.5" y2="142.5" stroke="white" stroke-opacity="0.3" stroke-width="2" />
  <line x1="105" y1="172.5" x2="195" y2="172.5" stroke="white" stroke-opacity="0.3" stroke-width="2" />
</svg>`;

  const logoFiles = [
    {
      name: 'Primary Logo (Square)',
      filename: 'afric-analyzer-logo-primary.svg',
      svg: primaryLogoSVG,
      preview: primaryLogoSVG,
      description: 'Use for app icons, favicons, and square placements'
    },
    {
      name: 'Icon Only (Large)',
      filename: 'afric-analyzer-icon.svg',
      svg: iconOnlySVG,
      preview: iconOnlySVG,
      description: 'High-resolution icon for social media profiles'
    },
    {
      name: 'Horizontal Logo with Text',
      filename: 'afric-analyzer-horizontal.svg',
      svg: horizontalLogoSVG,
      preview: horizontalLogoSVG,
      description: 'Use for headers, banners, and wide placements'
    },
    {
      name: 'Minimal Badge',
      filename: 'afric-analyzer-badge.svg',
      svg: minimalBadgeSVG,
      preview: minimalBadgeSVG,
      description: 'Modern hexagonal design for premium contexts'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1F] to-[#111827] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Download{' '}
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Logo Files
            </span>
          </h1>
          <p className="text-xl text-[#6B7280] mb-8">
            High-quality SVG files ready for any use case
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00C2A8]/20 rounded-full border border-[#00C2A8]/30">
            <span className="text-sm text-[#00C2A8]">
              All files are scalable vector graphics (SVG) - perfect quality at any size
            </span>
          </div>
        </div>

        {/* Logo Download Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {logoFiles.map((file, index) => (
            <div
              key={file.filename}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Preview Area */}
              <div className="bg-white/5 p-12 flex items-center justify-center min-h-[300px]">
                <div 
                  dangerouslySetInnerHTML={{ __html: file.preview }}
                  className="w-full max-w-[280px]"
                />
              </div>

              {/* Info Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{file.name}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{file.description}</p>
                
                <button
                  onClick={() => downloadSVG(file.svg, file.filename)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] hover:from-[#1E5AFF] hover:to-[#00B399] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2D6BFF]/30"
                >
                  <Download size={20} />
                  Download {file.filename}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download All Button */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Need all the files?</h3>
            <p className="text-[#6B7280] mb-6">
              Click each download button above to save all logo variations to your device
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#6B7280]">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="font-semibold text-white mb-1">Format</p>
                <p>SVG (Vector)</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="font-semibold text-white mb-1">Quality</p>
                <p>Infinite Resolution</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="font-semibold text-white mb-1">File Size</p>
                <p>&lt; 5KB each</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="font-semibold text-white mb-1">Usage</p>
                <p>Commercial Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-12 bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Usage Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-[#00C2A8]">✓</span> Do
              </h4>
              <ul className="space-y-2 text-[#6B7280]">
                <li>• Use on white, dark, or branded backgrounds</li>
                <li>• Scale proportionally to maintain aspect ratio</li>
                <li>• Ensure adequate clear space around the logo</li>
                <li>• Use official color gradients provided</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-500">✗</span> Don't
              </h4>
              <ul className="space-y-2 text-[#6B7280]">
                <li>• Rotate, skew, or distort the logo</li>
                <li>• Change colors or add effects</li>
                <li>• Place on busy or low-contrast backgrounds</li>
                <li>• Recreate or modify the logo design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
