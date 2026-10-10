import { SectionEyebrow } from './AkepUI';

const steps = [
  {
    n: '01',
    title: 'Onboard your university',
    desc: 'Connect SSO, import faculties and your existing dissertation archive. No IT team needed — live in under 24 hours.',
  },
  {
    n: '02',
    title: 'AI screens every submission',
    desc: 'Every new dissertation is automatically checked for duplicates, formatting compliance, and metadata completeness.',
  },
  {
    n: '03',
    title: 'Workflows run themselves',
    desc: 'Supervisors are notified, defenses are scheduled, signatures collected — no email chains, no chasing.',
  },
  {
    n: '04',
    title: 'Everyone sees what they need',
    desc: 'Deans track every dissertation in real time. Faculty see their workload. Students see their deadlines.',
  },
];

export function AkepHowItWorks() {
  return (
    <section
      id="how"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#0B0420' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(107,33,245,0.25) 0%, rgba(11,4,32,0) 60%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-4 text-white" style={{ letterSpacing: '-0.01em' }}>
            Live in One Day. Fully Automated by Week One.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl p-6 transition-all hover:-translate-y-0.5"
              style={{
                background: '#16122B',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 20px 50px -25px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm"
                style={{
                  background: 'rgba(107,33,245,0.18)',
                  color: '#A78BFA',
                  border: '1px solid rgba(167,139,250,0.25)',
                }}
              >
                {s.n}
              </div>
              <h3 className="mt-5 text-white">{s.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
