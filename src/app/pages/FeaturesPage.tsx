import { useState } from 'react';
import { Layout } from '../Layout';
import { AkepSpotlight } from '../components/akep/AkepSpotlight';
import { AkepFeatures } from '../components/akep/AkepFeatures';
import { AkepWaitlist } from '../components/akep/AkepWaitlist';
import { AkepModal } from '../components/akep/AkepModal';

export function FeaturesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <Layout onCta={() => setDemoOpen(true)}>
      <AkepSpotlight />
      <AkepFeatures />
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
