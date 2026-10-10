import { useState } from 'react';
import { Layout } from '../Layout';
import { AkepPricing } from '../components/akep/AkepPricing';
import { AkepWaitlist } from '../components/akep/AkepWaitlist';
import { AkepModal } from '../components/akep/AkepModal';

export function PricingPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <Layout onCta={() => setDemoOpen(true)}>
      <AkepPricing onCta={() => setDemoOpen(true)} />
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
