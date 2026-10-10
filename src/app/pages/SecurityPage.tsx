import { useState } from 'react';
import { Layout } from '../Layout';
import { AkepSecurity } from '../components/akep/AkepSecurity';
import { AkepIntegrations } from '../components/akep/AkepIntegrations';
import { AkepWaitlist } from '../components/akep/AkepWaitlist';
import { AkepModal } from '../components/akep/AkepModal';

export function SecurityPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <Layout onCta={() => setDemoOpen(true)}>
      <AkepSecurity />
      <AkepIntegrations />
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
