import { motion } from 'motion/react';
import { Database, BarChart3, Brain, Lock } from 'lucide-react';

const cards = [
  {
    icon: Database,
    title: 'Real-Time Log Ingestion',
    description: 'Collect logs securely from any system, cloud, or environment with a lightweight, high-performance pipeline.',
    color: '#2D6BFF'
  },
  {
    icon: BarChart3,
    title: 'Intelligence Dashboard',
    description: 'Visualize threats, anomalies, and system health instantly with a clean, interactive dashboard.',
    color: '#00C2A8'
  },
  {
    icon: Brain,
    title: 'AI Security Assistant (Premium)',
    description: 'Ask questions, investigate incidents, and generate reports using LLM-powered analysis.',
    color: '#7C3AED'
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'Built with encryption, access control, and cloud-native isolation to protect sensitive data.',
    color: '#FBBF24'
  }
];

export function ValueProposition() {
  return (
    <section id="features" className="relative py-20 px-6 lg:px-8 bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Secure Your Infrastructure
            </span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Comprehensive security intelligence tools built for modern organizations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <ValueCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
        style={{ background: `radial-gradient(circle at center, ${card.color}30, transparent)` }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: `${card.color}20` }}
        >
          <Icon size={24} style={{ color: card.color }} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
        <p className="text-[#6B7280] leading-relaxed">{card.description}</p>
      </div>
    </motion.div>
  );
}
