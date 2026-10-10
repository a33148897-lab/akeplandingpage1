import { useState } from 'react';
import { Layout } from '../Layout';
import { AkepHowItWorks } from '../components/akep/AkepHowItWorks';
import { DemoVideoSection } from '../components/DemoVideoSection';
import { AkepWaitlist } from '../components/akep/AkepWaitlist';
import { AkepModal } from '../components/akep/AkepModal';

export function HowItWorksPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  const videoId = (import.meta as any).env?.VITE_DEMO_VIDEO_ID as string | undefined;

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout onCta={() => setDemoOpen(true)}>
      <AkepHowItWorks />
      <DemoVideoSection
        videoId={videoId}
        onDemoRequestClick={() => setDemoOpen(true)}
        onWaitlistClick={scrollToWaitlist}
      />
      <AkepWaitlist />
      <AkepModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Request a Live Demo"
        subject="Live Demo Request"
      />
    </Layout>
  );
}
