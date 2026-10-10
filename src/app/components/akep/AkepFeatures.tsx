import { Brain, ShieldCheck, Workflow, FileSearch, Users, LineChart } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

const features = [
  {
    icon: Brain,
    title: 'Catch Plagiarism Before It Reaches a Supervisor',
    desc: 'Semantic similarity engine compares every new submission against your full archive — catching plagiarism and overlap in seconds.',
  },
  {
    icon: Users,
    title: 'Match Students to Supervisors in Seconds, Not Weeks',
    desc: 'Match students to supervisors based on research interests, workload, and availability — without spreadsheets.',
  },
  {
    icon: Workflow,
    title: 'Zero Email Chains — Every Approval Tracked Automatically',
    desc: 'From submission to defense, every approval, signature, and deadline is tracked automatically.',
  },
  {
    icon: FileSearch,
    title: 'Search 10 Years of Dissertations in Under 3 Seconds',
    desc: 'Full-text search across years of dissertations with filters by faculty, topic, supervisor, and year.',
  },
  {
    icon: ShieldCheck,
    title: 'Accreditation-Ready Audit Reports — One Click',
    desc: 'Every action logged. Export accreditation-ready audit reports in one click.',
  },
  {
    icon: LineChart,
    title: 'Deans See Every Submission’s Status at a Glance',
    desc: 'KPIs for deans and program directors — submissions, completion rates, supervisor load.',
  },
];

export function AkepFeatures() {
  return (
    <section id="features" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SectionEyebrow>Platform</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            Replace Spreadsheets and Email Chains With One Platform
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: MUTED }}>
            AKEP replaces a dozen disconnected tools — Word templates, email chains, shared drives —
            with a single, AI-powered workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ border: `1px solid ${BORDER}`, background: 'white' }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: PURPLE_SOFT }}
              >
                <f.icon size={20} style={{ color: PURPLE }} />
              </div>
              <h3 className="mt-5" style={{ color: INK }}>
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
