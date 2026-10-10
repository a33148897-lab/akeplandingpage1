import { useState } from 'react';
import { Check } from 'lucide-react';
import { GhostButton, PrimaryButton, INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

const tiers = [
  {
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    desc: 'For small departments piloting AKEP',
    features: [
      'Up to 50 active dissertations',
      'Basic duplicate detection',
      'Single faculty workspace',
      'Email support',
    ],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'University',
    monthly: 499,
    yearly: 399,
    desc: 'For full universities and research offices',
    features: [
      'Unlimited dissertations',
      'Advanced AI duplicate detection',
      'Supervisor matching engine',
      'Multi-faculty workspaces',
      'SSO + audit logs',
      'Priority support',
    ],
    cta: 'Request demo',
    highlight: true,
  },
  {
    name: 'Consortium',
    monthly: null,
    yearly: null,
    desc: 'For ministries and university networks',
    features: [
      'Multi-institution dashboards',
      'Cross-institution duplicate search',
      'Custom integrations & SLA',
      'Dedicated success manager',
      'On-prem deployment option',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

export function AkepPricing({ onCta }: { onCta: () => void }) {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            Simple, transparent pricing
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: MUTED }}>
            Pay per institution, not per student. Scale without surprises.
          </p>

          <div
            className="inline-flex items-center mt-8 p-1 rounded-full"
            style={{ background: 'white', border: `1px solid ${BORDER}` }}
          >
            <button
              onClick={() => setYearly(false)}
              className="px-5 py-2 rounded-full text-sm transition"
              style={
                !yearly
                  ? { background: PURPLE, color: 'white' }
                  : { color: MUTED, background: 'transparent' }
              }
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-5 py-2 rounded-full text-sm transition"
              style={
                yearly
                  ? { background: PURPLE, color: 'white' }
                  : { color: MUTED, background: 'transparent' }
              }
            >
              Yearly <span className="opacity-80">−20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => {
            const price = yearly ? t.yearly : t.monthly;
            return (
              <div
                key={t.name}
                className="rounded-2xl p-8 flex flex-col"
                style={{
                  border: t.highlight ? `2px solid ${PURPLE}` : `1px solid ${BORDER}`,
                  background: 'white',
                  boxShadow: t.highlight ? '0 20px 40px -20px rgba(107, 33, 245, 0.35)' : 'none',
                }}
              >
                {t.highlight && (
                  <div
                    className="self-start mb-4 px-3 py-1 rounded-full text-xs"
                    style={{ background: PURPLE_SOFT, color: PURPLE }}
                  >
                    Most popular
                  </div>
                )}
                <h3 style={{ color: INK }}>{t.name}</h3>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  {t.desc}
                </p>
                <div className="mt-6" style={{ color: INK }}>
                  {price === null ? (
                    <span style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>Custom</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}>${price}</span>
                      <span className="text-sm ml-2" style={{ color: MUTED }}>
                        / {yearly ? 'mo, billed yearly' : 'month'}
                      </span>
                    </>
                  )}
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm" style={{ color: INK }}>
                      <Check size={16} style={{ color: PURPLE }} className="mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {t.highlight ? (
                    <PrimaryButton onClick={onCta} className="w-full">
                      {t.cta}
                    </PrimaryButton>
                  ) : (
                    <GhostButton onClick={onCta} className="w-full">
                      {t.cta}
                    </GhostButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
