import { Lock, ShieldCheck, KeyRound, FileCheck2, Server, Globe } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

const pillars = [
  {
    icon: Lock,
    title: 'Encryption end-to-end',
    body: 'AES-256 at rest, TLS 1.3 in transit. Dissertation content is never exposed to model providers.',
  },
  {
    icon: KeyRound,
    title: 'SSO + role-based access',
    body: 'SAML / OIDC SSO out of the box. Fine-grained roles for student, supervisor, dean, and admin.',
  },
  {
    icon: FileCheck2,
    title: 'Full audit trail',
    body: 'Every action is logged immutably. Exportable for accreditation cycles and internal review.',
  },
  {
    icon: Server,
    title: 'Choice of region',
    body: 'EU and African region hosting. On-prem deployment available for the Consortium tier.',
  },
];

const badges = [
  { label: 'SOC 2 Type II', state: 'In progress' },
  { label: 'ISO 27001', state: 'Planned 2026' },
  { label: 'GDPR-ready', state: 'Compliant' },
  { label: 'FERPA-aligned', state: 'Compliant' },
];

const frameworks = ['CAMES', 'ANAQ-Sup', 'CHEA', 'AAU benchmarks', 'EUA reference'];

export function AkepSecurity() {
  return (
    <section id="security" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionEyebrow>Security & trust</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            Built for the data that matters most
          </h2>
          <p className="mt-4" style={{ color: MUTED }}>
            Dissertations are sensitive intellectual property. AKEP is engineered around encryption,
            least-privilege access, and verifiable audit trails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6"
              style={{ border: `1px solid ${BORDER}`, background: 'white' }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: PURPLE_SOFT }}
              >
                <p.icon size={20} style={{ color: PURPLE }} />
              </div>
              <h3 className="mt-5" style={{ color: INK }}>
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ background: '#F8F7FB', border: `1px solid ${BORDER}` }}
        >
          <div>
            <div className="flex items-center gap-2" style={{ color: PURPLE }}>
              <ShieldCheck size={16} /> <span className="text-sm">Certifications & posture</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="rounded-lg p-4"
                  style={{ background: 'white', border: `1px solid ${BORDER}` }}
                >
                  <div className="text-sm" style={{ color: INK }}>
                    {b.label}
                  </div>
                  <div className="text-xs mt-1" style={{ color: MUTED }}>
                    {b.state}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs" style={{ color: MUTED }}>
              We publish current posture honestly. Certifications still in progress are labeled as such.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2" style={{ color: PURPLE }}>
              <Globe size={16} /> <span className="text-sm">Accreditation frameworks supported</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {frameworks.map((f) => (
                <span
                  key={f}
                  className="text-sm px-3 py-1.5 rounded-full"
                  style={{
                    background: PURPLE_SOFT,
                    color: PURPLE,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-lg p-4 text-sm" style={{ background: 'white', border: `1px solid ${BORDER}`, color: INK }}>
              Reports map directly to the indicators these bodies request — no manual stitching.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
