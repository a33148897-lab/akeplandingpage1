import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { AkepNav } from './components/akep/AkepNav';
import { AkepFooter } from './components/akep/AkepFooter';
import { Toaster } from './components/ui/sonner';

export function Layout({
  children,
  onCta,
}: {
  children: React.ReactNode;
  onCta?: () => void;
}) {
  const [scrollPct, setScrollPct] = useState(0);
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setScrollPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCta = () => {
    if (onCta) {
      onCta();
      return;
    }
    // Default: scroll to waitlist if present on this page
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: 'white', color: '#0B0B14' }}>
      {/* Gold scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-0.5 pointer-events-none"
        style={{ width: `${scrollPct}%`, background: '#F59E0B', transition: 'width 80ms linear' }}
      />
      <AkepNav onCta={handleCta} />
      {children}
      <AkepFooter />
      <Toaster />
    </div>
  );
}
