import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { PrimaryButton, INK, MUTED, BORDER } from './AkepUI';
import { submitContact, submitWaitlist } from '../../lib/api';

interface AkepModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subject?: string;
}

export function AkepModal({ isOpen, onClose, title, subject }: AkepModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState(subject || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isWaitlist = /waitlist/i.test(title) || /waitlist/i.test(subject || '');
      if (isWaitlist) {
        await submitWaitlist({
          name,
          email,
          institution: org,
          challenge: message,
          source: 'Modal waitlist request',
        });
      } else {
        await submitContact({
          name,
          email,
          institution: org,
          subject: subject || 'Live Demo Request',
          message,
        });
      }
      toast.success(`Thanks ${name || 'there'} — we'll reach out within 24h.`);
      setName('');
      setEmail('');
      setOrg('');
      setMessage(subject || '');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    borderColor: BORDER,
    backgroundColor: 'white',
    color: INK,
  } as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(11, 4, 32, 0.45)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{
          border: `1px solid ${BORDER}`,
          background: 'white',
          boxShadow: '0 30px 80px -20px rgba(11, 4, 32, 0.3)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:opacity-70"
          style={{ color: MUTED }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h3 style={{ color: INK }}>{title}</h3>
        <p className="mt-2 text-sm" style={{ color: MUTED }}>
          Tell us a bit about your institution and we'll get back within one business day.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-lg border outline-none focus:border-[#6B21F5]"
            style={inputStyle}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            className="w-full px-4 py-3 rounded-lg border outline-none focus:border-[#6B21F5]"
            style={inputStyle}
          />
          <input
            type="text"
            required
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="University / Organization"
            className="w-full px-4 py-3 rounded-lg border outline-none focus:border-[#6B21F5]"
            style={inputStyle}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to discuss?"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border outline-none focus:border-[#6B21F5] resize-none"
            style={inputStyle}
          />
          <PrimaryButton type="submit" className="w-full">
            {isSubmitting ? 'Sending...' : 'Send request'}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
