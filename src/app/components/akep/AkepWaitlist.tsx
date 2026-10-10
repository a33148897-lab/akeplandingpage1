import { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import { DARK } from './AkepUI';
import { submitWaitlist } from '../../lib/api';

export function AkepWaitlist() {
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await submitWaitlist({
        email,
        institution: org,
        source: 'Homepage waitlist section',
      });
      toast.success(`You're on the list, ${org || 'friend'}! We'll be in touch.`);
      setEmail('');
      setOrg('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to join waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 px-6 overflow-hidden" style={{ background: DARK }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(107, 33, 245, 0.4) 0%, rgba(11, 4, 32, 0) 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(167, 139, 250, 0.25) 0%, rgba(11, 4, 32, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-white" style={{ letterSpacing: '-0.01em' }}>
          Your university could be live on AKEP in 24 hours
        </h2>
        <p className="mt-4 text-white/70">
          Join 40+ research offices already on the waitlist. Early access is free — includes
          onboarding and 6 months of University-tier access on launch.
        </p>
        <form
          onSubmit={submit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="University name"
            className="flex-1 px-4 py-3 rounded-lg text-white placeholder-white/40 outline-none border focus:border-white/40"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            className="flex-1 px-4 py-3 rounded-lg text-white placeholder-white/40 outline-none border focus:border-white/40"
            style={{
              borderColor: 'rgba(255,255,255,0.12)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
            style={{ background: 'white', color: DARK }}
          >
            {isSubmitting ? 'Submitting…' : 'Reserve My Spot'} <ArrowRight size={16} />
          </button>
        </form>
        <p className="mt-4 text-xs text-white/45">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
