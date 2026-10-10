import { Check, FileText, Sparkles, Users, BarChart3 } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

interface Spot {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  mock: 'submission' | 'duplicate' | 'supervisor' | 'reporting';
}

const spots: Spot[] = [
  {
    eyebrow: 'Submissions',
    title: 'Every dissertation in one queue',
    body:
      'Replace email threads, paper forms, and shared drives with a structured submission flow that captures metadata, supervisors, and committee members at the source.',
    bullets: [
      'Configurable submission forms per faculty',
      'Auto-validated metadata and formatting checks',
      'Versioned uploads with audit trail',
      'Status tracking visible to student, supervisor, and dean',
    ],
    mock: 'submission',
  },
  {
    eyebrow: 'AI Detection',
    title: 'Catch overlap before defense, not after',
    body:
      'A semantic similarity engine cross-checks every submission against your archive and external sources, flagging plagiarism and AI-generated text with confidence scores.',
    bullets: [
      'Semantic similarity beyond keyword match',
      'Confidence scoring with passage-level highlights',
      'AI-generated text detection signal',
      'Reviewer workflow for accept / dispute / escalate',
    ],
    mock: 'duplicate',
  },
  {
    eyebrow: 'Supervisor Matching',
    title: 'Match students to supervisors that actually fit',
    body:
      'AKEP ranks supervisors by topical fit, current load, and availability — so deans assign in minutes instead of weeks of back-and-forth.',
    bullets: [
      'Topical fit from supervisor publications',
      'Live workload caps and term availability',
      'Auto-notifications and acceptance tracking',
      'Manual override with full reasoning logged',
    ],
    mock: 'supervisor',
  },
  {
    eyebrow: 'Reporting',
    title: 'Accreditation-ready reports in one click',
    body:
      'Every action is logged. Dashboards and exports map to common accreditation frameworks — turn weeks of report prep into a single export.',
    bullets: [
      'Pre-built templates for accreditation cycles',
      'CSV / PDF exports with audit signature',
      'Faculty, supervisor, and program-level dashboards',
      'Historical comparisons across terms',
    ],
    mock: 'reporting',
  },
];

function MockSubmission() {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <FileText size={14} style={{ color: PURPLE }} /> Submission queue · Spring 2026
      </div>
      <div className="mt-4 space-y-2">
        {[
          { name: 'A. Diallo — Applied ML in agriculture', status: 'In AI review', tone: 'review' },
          { name: 'M. Okonkwo — Public health policy', status: 'Awaiting supervisor', tone: 'wait' },
          { name: 'L. Bensalem — Computational linguistics', status: 'Accepted', tone: 'ok' },
          { name: 'K. Nyong\'o — Water systems modeling', status: 'Flagged: overlap', tone: 'warn' },
        ].map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between text-sm rounded-lg px-3 py-2"
            style={{ background: '#F8F7FB' }}
          >
            <span style={{ color: INK }}>{r.name}</span>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={
                r.tone === 'ok'
                  ? { background: '#E6F7EE', color: '#0F8245' }
                  : r.tone === 'warn'
                  ? { background: '#FFF1E0', color: '#B45309' }
                  : r.tone === 'review'
                  ? { background: PURPLE_SOFT, color: PURPLE }
                  : { background: '#EEF1F8', color: '#3F3F52' }
              }
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockDuplicate() {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <Sparkles size={14} style={{ color: PURPLE }} /> AI similarity scan
      </div>
      <div className="mt-4">
        <div className="text-sm" style={{ color: INK }}>
          "Machine Learning Applications in Sub-Saharan Agriculture"
        </div>
        <div className="text-xs mt-0.5" style={{ color: MUTED }}>
          12,438 documents compared · 3.2s
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {[
          { src: 'ML for crop yield prediction (2023)', score: 87 },
          { src: 'Smart irrigation: a Sahel study (2022)', score: 54 },
          { src: 'AI in West African agritech (2024)', score: 31 },
        ].map((d) => (
          <div key={d.src}>
            <div className="flex justify-between text-xs" style={{ color: INK }}>
              <span>{d.src}</span>
              <span style={{ color: PURPLE }}>{d.score}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full" style={{ background: PURPLE_SOFT }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.score}%`,
                  background: `linear-gradient(90deg, ${PURPLE}, #A78BFA)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockSupervisor() {
  const rows = [
    { name: 'Prof. M. Sow', match: 96, load: '3 / 8', topic: 'Applied ML' },
    { name: 'Dr. F. Ndiaye', match: 89, load: '5 / 8', topic: 'AgriTech' },
    { name: 'Prof. K. Bâ', match: 74, load: '7 / 8', topic: 'Data Science' },
  ];
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <Users size={14} style={{ color: PURPLE }} /> Matching supervisor · A. Diallo
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center gap-3 rounded-lg p-3"
            style={{
              border: i === 0 ? `1px solid ${PURPLE}` : `1px solid ${BORDER}`,
              background: i === 0 ? PURPLE_SOFT : 'white',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, #A78BFA)` }}
            >
              {r.name.split(' ').slice(-1)[0][0]}
            </div>
            <div className="flex-1 text-sm" style={{ color: INK }}>
              <div>{r.name}</div>
              <div className="text-xs" style={{ color: MUTED }}>
                {r.topic} · load {r.load}
              </div>
            </div>
            <div className="text-sm" style={{ color: PURPLE }}>
              {r.match}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockReporting() {
  const bars = [42, 60, 55, 78, 70, 88, 84];
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'white', border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
        <BarChart3 size={14} style={{ color: PURPLE }} /> Submissions · last 7 weeks
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 mb-4">
        {[
          { v: '1,284', l: 'Active' },
          { v: '312', l: 'In review' },
          { v: '8,420', l: 'Completed' },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded-lg p-3"
            style={{ background: '#F8F7FB' }}
          >
            <div className="text-lg" style={{ color: INK }}>
              {k.v}
            </div>
            <div className="text-xs" style={{ color: MUTED }}>
              {k.l}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${b}%`,
              background: `linear-gradient(180deg, #A78BFA 0%, ${PURPLE} 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Mock({ kind }: { kind: Spot['mock'] }) {
  if (kind === 'submission') return <MockSubmission />;
  if (kind === 'duplicate') return <MockDuplicate />;
  if (kind === 'supervisor') return <MockSupervisor />;
  return <MockReporting />;
}

export function AkepSpotlight() {
  return (
    <section className="py-24 px-6" style={{ background: '#F8F7FB' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <SectionEyebrow>Product</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            A closer look at the workflows AKEP automates
          </h2>
        </div>

        <div className="space-y-20">
          {spots.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={s.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div className={flip ? 'lg:order-2' : ''}>
                  <SectionEyebrow>{s.eyebrow}</SectionEyebrow>
                  <h3 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                  <p className="mt-3" style={{ color: MUTED }}>
                    {s.body}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: INK }}
                      >
                        <Check size={16} style={{ color: PURPLE }} className="mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={flip ? 'lg:order-1' : ''}>
                  <div
                    className="rounded-2xl p-3"
                    style={{
                      background: 'white',
                      border: `1px solid ${BORDER}`,
                      boxShadow: '0 20px 50px -25px rgba(11,4,32,0.25)',
                    }}
                  >
                    <Mock kind={s.mock} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
