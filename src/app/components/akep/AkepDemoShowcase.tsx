import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  GraduationCap,
  BookOpen,
  UserCheck,
  Pencil,
  Megaphone,
  FileText,
  Sparkles,
  ClipboardCheck,
  Users,
  BookMarked,
  CheckCircle2,
} from 'lucide-react';
import { SectionEyebrow, PURPLE, PURPLE_LIGHT, BG, SURFACE_DARK, PURPLE_DIM, PURPLE_BORDER, TEXT_MUTED, TEXT_DIM } from './AkepUI';

// ─── Role Data ────────────────────────────────────────────────────────────────

const roles = [
  {
    icon: Shield,
    label: 'University Admin',
    tagline: 'Runs the whole institution',
    color: '#6B21F5',
    bg: 'rgba(107,33,245,0.10)',
    border: 'rgba(107,33,245,0.25)',
    badge: '#6B21F5',
    badgeText: 'white',
    tasks: ['Opens dissertation calls', 'Manages users & structure', 'Controls AI settings'],
  },
  {
    icon: GraduationCap,
    label: 'Dean',
    tagline: 'Oversees the faculty',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.10)',
    border: 'rgba(37,99,235,0.25)',
    badge: '#2563EB',
    badgeText: 'white',
    tasks: ['Reviews faculty reports', 'Co-manages academic structure', 'Views dissertation calls'],
  },
  {
    icon: BookOpen,
    label: 'HOD',
    tagline: 'Head of Department',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.10)',
    border: 'rgba(13,148,136,0.25)',
    badge: '#0D9488',
    badgeText: 'white',
    tasks: ['Reviews topic submissions', 'Approves or rejects topics', 'Assigns supervisors'],
  },
  {
    icon: UserCheck,
    label: 'Supervisor',
    tagline: 'Guides the research',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.10)',
    border: 'rgba(217,119,6,0.25)',
    badge: '#D97706',
    badgeText: 'white',
    tasks: ['Reviews student chapters', 'Gives structured feedback', 'Tracks student progress'],
  },
  {
    icon: Pencil,
    label: 'Student',
    tagline: 'Drives the research',
    color: '#DB2777',
    bg: 'rgba(219,39,119,0.10)',
    border: 'rgba(219,39,119,0.25)',
    badge: '#DB2777',
    badgeText: 'white',
    tasks: ['Submits research topic', 'Works through chapters', 'Communicates with supervisor'],
  },
];

// ─── Lifecycle Steps ──────────────────────────────────────────────────────────

const steps = [
  {
    n: 1,
    icon: Megaphone,
    role: 'University Admin',
    roleColor: '#6B21F5',
    title: 'Admin opens a Dissertation Call',
    desc: 'Sets eligible programs, start & end dates, then publishes to all enrolled students.',
  },
  {
    n: 2,
    icon: FileText,
    role: 'Student',
    roleColor: '#DB2777',
    title: 'Student submits a topic',
    desc: 'Student finds the open call and submits their research topic proposal.',
  },
  {
    n: 3,
    icon: Sparkles,
    role: 'AI Engine',
    roleColor: '#A78BFA',
    title: 'AI evaluates the topic',
    desc: 'System checks for duplicate submissions and generates an originality snapshot report.',
  },
  {
    n: 4,
    icon: ClipboardCheck,
    role: 'HOD',
    roleColor: '#0D9488',
    title: 'HOD reviews the submission',
    desc: 'Head of Department approves or rejects the topic for their department.',
  },
  {
    n: 5,
    icon: Users,
    role: 'HOD / System',
    roleColor: '#0D9488',
    title: 'Supervisor is matched',
    desc: 'AKEP auto-matches a supervisor based on expertise tags and current workload.',
  },
  {
    n: 6,
    icon: BookMarked,
    role: 'Student + Supervisor',
    roleColor: '#D97706',
    title: 'Dissertation work begins',
    desc: 'Student works through chapters; supervisor reviews and gives structured feedback.',
  },
  {
    n: 7,
    icon: CheckCircle2,
    role: 'University Admin',
    roleColor: '#6B21F5',
    title: 'Admin closes the call',
    desc: 'Intake period ends. The call is closed and no new submissions are accepted.',
  },
];

// ─── Role Card ────────────────────────────────────────────────────────────────

function RoleCard({ role, index }: { role: (typeof roles)[0]; index: number }) {
  const Icon = role.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1"
      style={{
        background: SURFACE_DARK,
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 50px -25px rgba(0,0,0,0.5)',
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{ background: role.bg, border: `1px solid ${role.border}` }}
      >
        <Icon size={22} style={{ color: role.color }} />
      </div>

      {/* Role badge */}
      <span
        className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-3"
        style={{
          background: role.badge,
          color: role.badgeText,
          letterSpacing: '0.02em',
        }}
      >
        {role.label}
      </span>

      <p className="text-sm mb-4" style={{ color: TEXT_MUTED }}>
        {role.tagline}
      </p>

      {/* Task list */}
      <ul className="mt-auto space-y-2">
        {role.tasks.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.70)' }}>
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: role.color }}
            />
            {t}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Lifecycle Step ───────────────────────────────────────────────────────────

function LifecycleStep({
  step,
  isActive,
  isDone,
  onClick,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
  isDone: boolean;
  onClick: () => void;
}) {
  const Icon = step.icon;
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left flex items-start gap-4 rounded-xl px-4 py-4 transition-all"
      style={{
        background: isActive ? PURPLE_DIM : 'transparent',
        border: `1px solid ${isActive ? PURPLE_BORDER : 'rgba(255,255,255,0.05)'}`,
        cursor: 'pointer',
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      {/* Step number / icon */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold"
          style={{
            background: isActive
              ? PURPLE
              : isDone
              ? PURPLE_DIM
              : 'rgba(255,255,255,0.06)',
            color: isActive ? 'white' : isDone ? PURPLE_LIGHT : TEXT_DIM,
            border: `1px solid ${isActive ? 'transparent' : isDone ? PURPLE_BORDER : 'rgba(255,255,255,0.08)'}`,
            transition: 'all 0.3s ease',
          }}
        >
          {isDone && !isActive ? (
            <CheckCircle2 size={16} style={{ color: '#A78BFA' }} />
          ) : (
            <Icon size={16} />
          )}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: `${step.roleColor}22`,
              color: step.roleColor,
              border: `1px solid ${step.roleColor}44`,
            }}
          >
            {step.role}
          </span>
          <span className="text-xs" style={{ color: TEXT_DIM }}>
            Step {step.n} of 7
          </span>
        </div>
        <p
          className="text-sm font-medium leading-snug"
          style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.65)' }}
        >
          {step.title}
        </p>
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs mt-1.5 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.50)' }}
            >
              {step.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AkepDemoShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance through steps
  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#0B0420' }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(107,33,245,0.18) 0%, rgba(11,4,32,0) 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Role Cards ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <SectionEyebrow>Five roles. One platform.</SectionEyebrow>
            <h2 className="mt-4 text-white" style={{ letterSpacing: '-0.01em' }}>
              Every stakeholder has their place
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-base"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              AKEP is built around your institution's hierarchy — from University Admin to student,
              every role gets exactly the access they need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roles.map((role, i) => (
              <RoleCard key={role.label} role={role} index={i} />
            ))}
          </div>
        </div>

        {/* ── Lifecycle Steps ── */}
        <div>
          <div className="text-center mb-12">
            <SectionEyebrow>Dissertation lifecycle</SectionEyebrow>
            <h2 className="mt-4 text-white" style={{ letterSpacing: '-0.01em' }}>
              From open call to closed intake in 7 steps
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-base"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              A dissertation call flows through every role automatically.
              No email chains. No chasing. Every handoff tracked.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: step list */}
            <div className="space-y-2">
              {steps.map((step, i) => (
                <LifecycleStep
                  key={step.n}
                  step={step}
                  isActive={activeStep === i}
                  isDone={i < activeStep}
                  onClick={() => setActiveStep(i)}
                />
              ))}
            </div>

            {/* Right: animated spotlight card */}
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl p-8 flex flex-col gap-6"
                  style={{
                    background: SURFACE_DARK,
                    border: `1px solid ${PURPLE_BORDER}`,
                    boxShadow: '0 0 60px -20px rgba(107,33,245,0.4)',
                    minHeight: 340,
                  }}
                >
                  {/* Step icon large */}
                  {(() => {
                    const StepIcon = steps[activeStep].icon;
                    return (
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{
                          background: PURPLE_DIM,
                          border: `1px solid ${PURPLE_BORDER}`,
                        }}
                      >
                        <StepIcon size={28} style={{ color: PURPLE_LIGHT }} />
                      </div>
                    );
                  })()}

                  {/* Step meta */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: `${steps[activeStep].roleColor}22`,
                          color: steps[activeStep].roleColor,
                          border: `1px solid ${steps[activeStep].roleColor}44`,
                        }}
                      >
                        {steps[activeStep].role}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.30)' }}>
                        {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white leading-snug">
                      {steps[activeStep].title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
                      {steps[activeStep].desc}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="mt-auto flex items-center gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className="rounded-full transition-all"
                        style={{
                          width: i === activeStep ? 20 : 6,
                          height: 6,
                          background: i === activeStep ? PURPLE : 'rgba(255,255,255,0.15)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
