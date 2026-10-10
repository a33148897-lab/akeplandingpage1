import { motion } from 'motion/react';
import { Database, Gauge, Users, Shield, Sparkles, FileText, UserCheck, Lock, Activity, Bell, GitBranch, Archive } from 'lucide-react';

const features = [
  {
    category: 'Log Processing & Intelligence',
    icon: Database,
    color: '#2D6BFF',
    items: [
      'High-volume ingestion',
      'Normalization',
      'Correlation',
      'Threat scoring'
    ]
  },
  {
    category: 'AI-Powered Security (Premium)',
    icon: Sparkles,
    color: '#7C3AED',
    items: [
      'Incident summaries',
      'Attack signature detection',
      'Natural-language queries',
      'Automated reporting'
    ],
    premium: true
  },
  {
    category: 'Collaboration Tools',
    icon: Users,
    color: '#00C2A8',
    items: [
      'Multi-user access',
      'Role-based permissions',
      'Shared investigations',
      'Team workspaces'
    ]
  },
  {
    category: 'Security & Compliance',
    icon: Shield,
    color: '#FBBF24',
    items: [
      'Encryption at rest & in transit',
      'Audit logs',
      'Access control',
      'Cloud-native isolation'
    ]
  }
];

export function Features() {
  return (
    <section className="relative py-20 px-6 lg:px-8 bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Powerful Features
            </span>{' '}
            for Complete Security Intelligence
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Enterprise-grade capabilities designed for security teams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.category} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <MiniFeature icon={Activity} label="Real-time Monitoring" />
          <MiniFeature icon={Bell} label="Smart Alerts" />
          <MiniFeature icon={GitBranch} label="API Integration" />
          <MiniFeature icon={Archive} label="Log Archival" />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all group"
    >
      {/* Premium Badge */}
      {feature.premium && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] rounded-full text-xs font-semibold text-white flex items-center gap-1">
          <Lock size={12} />
          Premium
        </div>
      )}

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${feature.color}20` }}
      >
        <Icon size={28} style={{ color: feature.color }} />
      </div>

      {/* Category */}
      <h3 className="text-2xl font-bold text-white mb-6">{feature.category}</h3>

      {/* Feature List */}
      <ul className="space-y-3">
        {feature.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${feature.color}20` }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: feature.color }} />
            </div>
            <span className="text-[#6B7280]">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function MiniFeature({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all group">
      <div className="w-10 h-10 rounded-lg bg-[#2D6BFF]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={20} className="text-[#2D6BFF]" />
      </div>
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
}
