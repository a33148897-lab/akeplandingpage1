import { Mail, FileWarning, Search, Hourglass } from 'lucide-react';
import { INK, MUTED, PURPLE, BORDER, PURPLE_SOFT, SectionEyebrow } from './AkepUI';

const pains = [
  {
    icon: Mail,
    title: 'Submissions buried in email',
    body: 'Faculty manage dissertations across inboxes, shared drives, and printed forms. Critical deadlines get lost.',
  },
  {
    icon: FileWarning,
    title: 'Plagiarism caught too late',
    body: 'Duplicate or AI-generated work surfaces during defense, not at submission — damaging program credibility.',
  },
  {
    icon: Search,
    title: 'No visibility for deans',
    body: 'Program directors can\'t answer simple questions: how many dissertations are in review? Who is overloaded?',
  },
  {
    icon: Hourglass,
    title: 'Audit reports take weeks',
    body: 'Accreditation cycles consume entire teams pulling data from disconnected systems and spreadsheets.',
  },
];

export function AkepProblems() {
  return (
    <section className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <SectionEyebrow>The problem</SectionEyebrow>
          <h2 className="mt-4" style={{ color: INK, letterSpacing: '-0.01em' }}>
            Research operations were never meant to live in inboxes
          </h2>
          <p className="mt-4" style={{ color: MUTED }}>
            Universities run thousands of dissertations a year on tools designed for memos.
            AKEP replaces that with a system built for research.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6"
              style={{ border: `1px solid ${BORDER}`, background: '#F8F7FB' }}
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
      </div>
    </section>
  );
}
