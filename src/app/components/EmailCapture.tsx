import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { submitWaitlist } from '../lib/api';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitWaitlist({
        email,
        source: 'Email capture section',
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Successfully joined the waitlist!');

      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error instanceof Error ? error.message : 'Failed to submit email');
    }
  };

  return (
    <section id="email-capture" className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0F1F] to-[#111827]">
      <div className="max-w-5xl mx-auto">
        <CountdownTimer />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-12 border border-white/10 mt-12"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2D6BFF]/20 to-[#00C2A8]/20 blur-3xl opacity-50" />

          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Be Among the First to Experience{' '}
                <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
                  Afric-Analyzer
                </span>
              </h2>
              <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
                Request early access and we'll contact you within 24 hours to activate your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2D6BFF] transition-all"
                    disabled={isSubmitting || isSubmitted}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="px-8 py-4 bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] hover:from-[#1E5AFF] hover:to-[#00B399] text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Submitted!
                    </>
                  ) : (
                    'Request Access'
                  )}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              We respect your privacy. No spam — ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownTimer() {
  const targetDate = new Date('May 16, 2025 00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h3 className="text-2xl lg:text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
          Launching Public Beta
        </span>
      </h3>
      <p className="text-lg text-[#6B7280] mb-8">May 16, 2025</p>

      <div className="flex justify-center gap-4 lg:gap-8">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <p className="text-[#6B7280] mt-8">
        Join the waitlist to secure early access before launch.
      </p>
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl border border-white/10 flex items-center justify-center mb-2"
      >
        <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="text-sm text-[#6B7280] font-medium">{label}</span>
    </div>
  );
}
