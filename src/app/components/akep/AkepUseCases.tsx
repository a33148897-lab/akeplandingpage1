import { GraduationCap, Building2, BookOpen, Microscope, ArrowUpRight } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

const cases = [
  {
    icon: Building2,
    title: 'Research offices',
    desc: 'Centralize every dissertation, defense schedule, and supervisor assignment in one place.',
    quote: 'Pilot feedback (anonymized): processing time on incoming submissions dropped meaningfully in the first term.',
    author: 'Research office, pilot university',
  },
  {
    icon: GraduationCap,
    title: 'Deans & program directors',
    desc: 'Real-time visibility into program health, completion rates, and supervisor workload.',
    quote: 'Pilot feedback (anonymized): a single source of truth for the PhD pipeline was the most-requested feature in discovery interviews.',
    author: 'Graduate studies director, pilot university',
  },
  {
    icon: BookOpen,
    title: 'Faculty & supervisors',
    desc: 'Skip the email chains. See your assigned students, deadlines, and review queue in one feed.',
    quote: 'Pilot feedback (anonymized): supervisors most valued a unified review queue replacing scattered emails.',
    author: 'Faculty supervisor, pilot university',
  },
  {
    icon: Microscope,
    title: 'Doctoral schools',
    desc: 'Track multi-year PhD pipelines with milestones, committees, and publication tracking.',
    quote: 'Pilot feedback (anonymized): exportable, audit-ready reports were rated essential for accreditation cycles.',
    author: 'Quality director, pilot university',
  },
];

export function AkepUseCases() {
  return (
    <section id="use-cases" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Customers</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            Built for every role in academic research
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-8 transition-all hover:shadow-md group"
              style={{ border: `1px solid ${BORDER}`, background: 'white' }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: PURPLE_SOFT }}
                >
                  <c.icon size={20} style={{ color: PURPLE }} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: PURPLE }}
                />
              </div>
              <h3 className="mt-5" style={{ color: INK }}>
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                {c.desc}
              </p>
              <div
                className="mt-5 pt-5 text-sm italic"
                style={{ borderTop: `1px solid ${BORDER}`, color: INK }}
              >
                {c.quote}
                <div className="mt-1 not-italic text-xs" style={{ color: MUTED }}>
                  — {c.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
