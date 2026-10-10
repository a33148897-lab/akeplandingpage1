import { Logo, LogoMinimal, LogoAfrica, LogoWordmark } from './Logo';
import { motion } from 'motion/react';
import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function BrandShowcase() {
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1F] to-[#111827] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            AFRIC-ANALYZER{' '}
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Brand Guidelines
            </span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            Professional logo system and brand assets
          </p>
        </motion.div>

        {/* Logo Variations */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Logo Variations</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-[#00C2A8]">PRIMARY</span>
                <h3 className="text-xl font-bold text-white mt-2">Full Logo</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-12 flex items-center justify-center mb-4">
                <Logo variant="full" size="lg" />
              </div>
              <p className="text-sm text-[#6B7280]">
                Use for headers, navigation, and primary branding
              </p>
            </motion.div>

            {/* Logo with Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-[#00C2A8]">EXTENDED</span>
                <h3 className="text-xl font-bold text-white mt-2">Logo with Tagline</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-12 flex items-center justify-center mb-4">
                <Logo variant="text" size="md" />
              </div>
              <p className="text-sm text-[#6B7280]">
                Use for footers, documents, and official communications
              </p>
            </motion.div>

            {/* Icon Only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-[#00C2A8]">ICON</span>
                <h3 className="text-xl font-bold text-white mt-2">Logo Mark</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-12 flex items-center justify-center mb-4">
                <Logo variant="icon" size="xl" />
              </div>
              <p className="text-sm text-[#6B7280]">
                Use for favicons, app icons, and social media profiles
              </p>
            </motion.div>

            {/* Minimal Version */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <div className="mb-6">
                <span className="text-sm font-semibold text-[#00C2A8]">MINIMAL</span>
                <h3 className="text-xl font-bold text-white mt-2">Minimal Badge</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-12 flex items-center justify-center mb-4">
                <LogoMinimal size={80} />
              </div>
              <p className="text-sm text-[#6B7280]">
                Use for small spaces and mobile applications
              </p>
            </motion.div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Color Palette</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ColorCard
              name="Deep Navy"
              hex="#0A0F1F"
              rgb="10, 15, 31"
              description="Primary background and dark surfaces"
            />
            <ColorCard
              name="Electric Blue"
              hex="#2D6BFF"
              rgb="45, 107, 255"
              description="Primary brand color, CTAs, and links"
            />
            <ColorCard
              name="Cyber Teal"
              hex="#00C2A8"
              rgb="0, 194, 168"
              description="Accent color, success states, highlights"
            />
            <ColorCard
              name="Royal Purple"
              hex="#7C3AED"
              rgb="124, 58, 237"
              description="Premium features and AI-powered elements"
            />
            <ColorCard
              name="Slate Gray"
              hex="#6B7280"
              rgb="107, 114, 128"
              description="Secondary text and muted elements"
            />
            <ColorCard
              name="Pure White"
              hex="#FFFFFF"
              rgb="255, 255, 255"
              description="Primary text and bright elements"
            />
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Typography</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">Headings</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2">Inter / Poppins - Bold</p>
                  <p className="text-4xl font-bold text-white">Security Intelligence</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-2">Large Headlines</p>
                  <p className="text-2xl font-bold text-white">Real-time Threat Detection</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">Body Text</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2">Inter / Roboto - Regular</p>
                  <p className="text-base text-white">
                    Monitor, analyze, and protect your infrastructure with AI-powered security intelligence.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-2">Small Text</p>
                  <p className="text-sm text-[#6B7280]">
                    Get real-time alerts and actionable insights from your security logs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Spacing System */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Spacing System</h2>
          
          <div className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <SpacingExample size={4} label="4px" description="xs" />
              <SpacingExample size={8} label="8px" description="sm" />
              <SpacingExample size={16} label="16px" description="md" />
              <SpacingExample size={24} label="24px" description="lg" />
              <SpacingExample size={32} label="32px" description="xl" />
              <SpacingExample size={48} label="48px" description="2xl" />
              <SpacingExample size={64} label="64px" description="3xl" />
              <SpacingExample size={96} label="96px" description="4xl" />
            </div>
          </div>
        </section>

        {/* Button Styles */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Button Styles</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-6">Primary</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] hover:from-[#1E5AFF] hover:to-[#00B399] text-white rounded-lg font-semibold transition-all shadow-lg shadow-[#2D6BFF]/30">
                Get Started
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-6">Secondary</h3>
              <button className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all">
                Learn More
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-6">Ghost</h3>
              <button className="w-full px-6 py-3 text-white hover:bg-white/5 rounded-lg font-semibold transition-all">
                Cancel
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorCard({ name, hex, rgb, description }: { name: string; hex: string; rgb: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl overflow-hidden border border-white/10"
    >
      <div
        className="h-32 w-full"
        style={{ backgroundColor: hex }}
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            {copied ? (
              <Check size={16} className="text-[#00C2A8]" />
            ) : (
              <Copy size={16} className="text-[#6B7280]" />
            )}
          </button>
        </div>
        <div className="space-y-1 mb-4">
          <p className="text-sm font-mono text-white">{hex}</p>
          <p className="text-xs font-mono text-[#6B7280]">RGB: {rgb}</p>
        </div>
        <p className="text-sm text-[#6B7280]">{description}</p>
      </div>
    </motion.div>
  );
}

function SpacingExample({ size, label, description }: { size: number; label: string; description: string }) {
  return (
    <div className="text-center">
      <div className="bg-white/5 rounded-lg p-4 mb-2 flex items-center justify-center">
        <div
          className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] rounded"
          style={{ width: size, height: size }}
        />
      </div>
      <p className="text-sm font-semibold text-white">{description}</p>
      <p className="text-xs text-[#6B7280]">{label}</p>
    </div>
  );
}
