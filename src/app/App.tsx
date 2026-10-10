import { useState } from 'react';
import { Layout } from './Layout';
import { AkepHero } from './components/akep/AkepHero';
import { AkepLogoCloud } from './components/akep/AkepLogoCloud';
import { AkepProblems } from './components/akep/AkepProblems';
import { AkepWaitlist } from './components/akep/AkepWaitlist';
import { AkepModal } from './components/akep/AkepModal';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else setWaitlistOpen(true);
  };

  return (
    <Layout onCta={() => setDemoOpen(true)}>
      <AkepHero onPrimary={() => setDemoOpen(true)} onSecondary={scrollToWaitlist} />
      <AkepLogoCloud />
      <AkepProblems />
      <AkepWaitlist />

      <AkepModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Request a Live Demo"
        subject="Live Demo Request"
      />
      <AkepModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        title="Join the Waitlist"
      />
    </Layout>
  );
}

