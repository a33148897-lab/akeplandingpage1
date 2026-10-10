import { AkepLogo, MUTED, BORDER, INK } from './AkepUI';

export function AkepFooter() {
  const cols = [
    { title: 'Product', links: ['Features', 'How it works', 'Pricing', 'Demo'] },
    { title: 'Company', links: ['About', 'Careers', 'Contact', 'Press'] },
    { title: 'Resources', links: ['Docs', 'Blog', 'Security', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'DPA', 'Cookies'] },
  ];
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: 'white', borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <AkepLogo />
          <p className="mt-4 text-sm max-w-xs" style={{ color: MUTED }}>
            The AI-powered research and dissertation platform for modern universities.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="mb-4 text-sm" style={{ color: INK }}>
              {c.title}
            </div>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: MUTED }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="max-w-6xl mx-auto mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm"
        style={{ borderTop: `1px solid ${BORDER}`, color: MUTED }}
      >
        <div>© {new Date().getFullYear()} AKEP. All rights reserved.</div>
        <div>Built for African universities, designed for the world.</div>
      </div>
    </footer>
  );
}
