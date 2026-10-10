import { INK, MUTED, PURPLE, BORDER } from './AkepUI';

const stats = [
  { value: '~40h', label: 'Target time saved per faculty / term' },
  { value: '<1%', label: 'Target post-screen duplicate rate' },
  { value: '4', label: 'Pilot universities engaged in 2026' },
  { value: '24h', label: 'Onboarding window we design for' },
];

export function AkepStats() {
  return (
    <section className="py-20 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ color: INK, letterSpacing: '-0.01em' }}>What AKEP is designed to deliver</h2>
          <p className="mt-3 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Design targets based on workflows we've modeled with pilot universities. We'll publish
            verified numbers as pilots conclude.
          </p>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${BORDER}`, background: 'white' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="p-8 text-center"
              style={{
                borderRight: i < stats.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}
            >
              <div style={{ color: PURPLE, fontSize: '2.5rem', letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <div className="mt-2 text-sm" style={{ color: MUTED }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
