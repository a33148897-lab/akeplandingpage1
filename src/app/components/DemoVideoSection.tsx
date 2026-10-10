import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Clock, Sparkles, Users, BarChart3, Building2 } from 'lucide-react';
import { AnimatedDemo } from './akep/AnimatedDemo';
import { PrimaryButton, GhostButton, INK, MUTED, PURPLE, PURPLE_LIGHT, PURPLE_DIM, PURPLE_BORDER } from './akep/AkepUI';

interface DemoVideoSectionProps {
  videoId?: string;
  onWaitlistClick: () => void;
  onDemoRequestClick: () => void;
}

const chapters = [
  { time: '00:00', seconds: 0, label: 'University Onboarding', icon: Building2 },
  { time: '00:45', seconds: 45, label: 'AI Duplicate Detection', icon: Sparkles },
  { time: '01:30', seconds: 90, label: 'Supervisor Matching', icon: Users },
  { time: '02:15', seconds: 135, label: 'Dashboard & Reporting', icon: BarChart3 },
];

// ── Fake UI elements that make the thumbnail look like a real product screenshot ──
function ThumbnailMockUI() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
      <div className="w-full max-w-lg opacity-60">
        {/* Mock top bar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div className="ml-3 flex-1 h-5 rounded-md bg-white/5 border border-white/10 flex items-center px-3">
            <span className="text-white/30 text-xs">akep.app/dashboard</span>
          </div>
        </div>
        {/* Mock stat cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Active Students', value: '1,284' },
            { label: 'Topics Submitted', value: '847' },
            { label: 'AI Screened', value: '831' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 border"
              style={{ background: PURPLE_DIM, borderColor: PURPLE_BORDER }}
            >
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* Mock dissertation rows */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(20,16,43,0.7)' }}
        >
          {[
            { name: 'Amara Diallo', topic: 'Machine Learning in Healthcare', status: 'AI Approved', color: '#22C55E' },
            { name: 'Kwame Asante', topic: 'Distributed Systems Security', status: 'HOD Review', color: '#F59E0B' },
            { name: 'Fatima Al-Rashid', topic: 'NLP for African Languages', status: 'Supervisor Matched', color: '#6B21F5' },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div>
                <div className="text-xs font-medium text-white/80">{row.name}</div>
                <div className="text-xs text-white/35 mt-0.5 truncate max-w-[160px]">{row.topic}</div>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: `${row.color}22`, color: row.color, border: `1px solid ${row.color}44` }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Lightbox modal that plays the video or animated demo ──
function VideoLightbox({
  videoId,
  onClose,
}: {
  videoId?: string;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl"
        style={{ aspectRatio: '16/9' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <X size={16} />
          Close (Esc)
        </button>

        <div
          className="w-full h-full rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}
        >
          {videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="AKEP Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <AnimatedDemo activeIndex={activeIndex} onSelect={setActiveIndex} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ──
export function DemoVideoSection({
  videoId,
  onWaitlistClick,
  onDemoRequestClick,
}: DemoVideoSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <section id="demo" className="py-24 px-6" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold" style={{ color: PURPLE }}>Product demo</span>
            <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
              See how AKEP works
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: MUTED }}>
              Watch how a university goes from chaotic dissertation management to a fully automated,
              AI‑powered research pipeline — in under 2 minutes.
            </p>
          </div>

          {/* Video thumbnail / play button */}
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl cursor-pointer group"
            style={{
              aspectRatio: '16 / 9',
              background: 'linear-gradient(135deg, #0B0420 0%, #16122B 50%, #0B0420 100%)',
              boxShadow: '0 30px 80px -20px rgba(107,33,245,0.35)',
              border: `1px solid ${PURPLE_BORDER}`,
            }}
            onClick={() => setLightboxOpen(true)}
            whileHover="hover"
          >
            {/* Purple glow orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(107,33,245,0.30) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Fake product UI in background */}
            <ThumbnailMockUI />

            {/* Dark overlay that lightens on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(11,4,32,0.45)' }}
              variants={{ hover: { background: 'rgba(11,4,32,0.25)' } }}
              transition={{ duration: 0.2 }}
            />

            {/* Duration badge top-right */}
            <div
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <Clock size={12} />
              1:30 min
            </div>

            {/* Chapter pills bottom-left */}
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              {chapters.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.time}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                    style={{
                      background: 'rgba(0,0,0,0.55)',
                      color: 'rgba(255,255,255,0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    <Icon size={11} style={{ color: PURPLE_LIGHT }} />
                    {c.label}
                  </div>
                );
              })}
            </div>

            {/* Play button — center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 80,
                  height: 80,
                  background: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 0 0 0 rgba(255,255,255,0.4)',
                }}
                variants={{
                  hover: {
                    scale: 1.10,
                    boxShadow: '0 0 0 16px rgba(255,255,255,0.10)',
                  },
                }}
                transition={{ duration: 0.2 }}
              >
                <Play
                  size={30}
                  fill={PURPLE}
                  style={{ color: PURPLE, marginLeft: 4 }}
                />
              </motion.div>
            </div>

            {/* "Watch demo" label below play button */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
              style={{ paddingTop: 112 }}
            >
              <motion.span
                className="text-sm font-medium"
                style={{ color: 'rgba(255,255,255,0.70)' }}
                variants={{ hover: { color: 'rgba(255,255,255,0.95)' } }}
              >
                Watch the demo
              </motion.span>
            </motion.div>
          </motion.div>

          {/* CTA row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <PrimaryButton onClick={onDemoRequestClick}>Request a live demo</PrimaryButton>
            <GhostButton onClick={onWaitlistClick}>Join the waitlist</GhostButton>
          </div>
        </div>
      </section>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxOpen && (
          <VideoLightbox videoId={videoId} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

