import { ReactNode } from 'react';

export const PURPLE = '#6B21F5';
export const PURPLE_LIGHT = '#A78BFA';
export const PURPLE_SOFT = '#F3EFFF';
export const BG = '#0D0B1F';
export const BG_ALT = '#14102B';
export const INK = '#0B0B14';
export const MUTED = '#5B5B6B';
export const BORDER = '#E6E4EF';
export const SURFACE = '#FFFFFF';
export const SURFACE_ALT = '#F8F7FB';
export const DARK = '#0B0420';

// ─── Dark-section surface & overlay tokens ───────────────────────────────────
export const SURFACE_DARK = '#16122B';
export const PURPLE_DIM = 'rgba(107,33,245,0.12)';
export const PURPLE_BORDER = 'rgba(107,33,245,0.25)';
export const TEXT_MUTED = 'rgba(255,255,255,0.55)';
export const TEXT_DIM = 'rgba(255,255,255,0.35)';

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-wide uppercase"
      style={{
        backgroundColor: PURPLE_SOFT,
        color: PURPLE,
        border: `1px solid ${BORDER}`,
      }}
    >
      {children}
    </span>
  );
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm"
      style={{
        borderColor: PURPLE_BORDER,
        backgroundColor: PURPLE_DIM,
        color: '#C4B5FD',
      }}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = '',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-3 rounded-lg transition-all hover:opacity-95 hover:-translate-y-0.5 ${className}`}
      style={{
        background: PURPLE,
        color: 'white',
        boxShadow: '0 6px 16px rgba(107, 33, 245, 0.25)',
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-lg border transition-colors hover:bg-[#F3EFFF] ${className}`}
      style={{
        borderColor: BORDER,
        color: INK,
        background: 'white',
      }}
    >
      {children}
    </button>
  );
}

export function AkepLogo({ dark = false, size = 32 }: { dark?: boolean; size?: number }) {
  const LOGO_NAVY = '#0D1B3E';
  const LOGO_GOLD = '#F59E0B';
  return (
    <div className="flex items-center gap-2.5">
      {/* Mark: navy rounded square with gold "A" lettermark */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.28),
          background: LOGO_NAVY,
          border: `1.5px solid rgba(245,158,11,${dark ? '0.55' : '0.40'})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: dark
            ? '0 0 0 1px rgba(245,158,11,0.12)'
            : '0 2px 8px rgba(13,27,62,0.18)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 20 20" fill="none">
          {/* Stylised "A" lettermark */}
          <path
            d="M3.5 16L10 4L16.5 16"
            stroke={LOGO_GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 11.5h8"
            stroke={LOGO_GOLD}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* Wordmark: Playfair Display for academic character */}
      <span
        style={{
          color: dark ? '#FFFFFF' : LOGO_NAVY,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: size * 0.56,
          letterSpacing: '0.06em',
          lineHeight: 1,
        }}
      >
        AKEP
      </span>
    </div>
  );
}
