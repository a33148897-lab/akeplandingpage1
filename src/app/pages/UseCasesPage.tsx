import { useState } from 'react';
import { Layout } from '../Layout';
import { AkepUseCases } from '../components/akep/AkepUseCases';
import { AkepWaitlist } from '../components/akep/AkepWaitlist';
import { AkepModal } from '../components/akep/AkepModal';

export function UseCasesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <Layout onCta={() => setDemoOpen(true)}>
      <AkepUseCases />
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
