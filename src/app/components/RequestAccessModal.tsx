import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Mail, User, Building2 } from 'lucide-react';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.organization) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', organization: '' });
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl border border-white/10 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Request Early Access</h2>
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <X size={20} className="text-[#6B7280]" />
                      </button>
                    </div>
                    <p className="text-[#6B7280] mt-2">
                      Fill out the form below and we'll contact you within 24 hours to activate your dashboard.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2D6BFF] transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2D6BFF] transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Organization Field */}
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-white mb-2">
                        Organization *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" size={20} />
                        <input
                          id="organization"
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Your University or Company"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2D6BFF] transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] hover:from-[#1E5AFF] hover:to-[#00B399] text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#2D6BFF]/30"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Access'}
                    </button>

                    <p className="text-xs text-[#6B7280] text-center">
                      We respect your privacy. Your information will never be shared.
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#00C2A8] to-[#2D6BFF] rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle size={32} className="text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-[#6B7280] mb-6">
                    Thank you for your interest in Afric-Analyzer. We'll review your application and contact you within 24 hours at{' '}
                    <span className="text-white font-medium">{formData.email}</span>.
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-left">
                    <h4 className="text-sm font-semibold text-white mb-2">What's Next?</h4>
                    <ul className="space-y-2 text-sm text-[#6B7280]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C2A8] mt-1">•</span>
                        <span>We'll send you a confirmation email shortly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C2A8] mt-1">•</span>
                        <span>Our team will review your application</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#00C2A8] mt-1">•</span>
                        <span>You'll receive login credentials within 24 hours</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
