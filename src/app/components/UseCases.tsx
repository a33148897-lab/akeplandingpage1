import { motion } from 'motion/react';
import { GraduationCap, Building2, ShieldAlert } from 'lucide-react';

const useCases = [
  {
    icon: GraduationCap,
    title: 'Universities',
    description: 'Monitor campus networks, detect threats, and support cybersecurity research.',
    benefits: [
      'Protect student and faculty data',
      'Monitor research infrastructure',
      'Support cybersecurity education',
      'Detect insider threats'
    ],
    color: '#2D6BFF'
  },
  {
    icon: Building2,
    title: 'Enterprises',
    description: 'Gain visibility into infrastructure, applications, and user activity.',
    benefits: [
      'Centralized log management',
      'Compliance reporting',
      'Business intelligence',
      'Performance monitoring'
    ],
    color: '#00C2A8'
  },
  {
    icon: ShieldAlert,
    title: 'Security Teams',
    description: 'Accelerate investigations with AI-powered insights and automated reporting.',
    benefits: [
      'Rapid incident response',
      'Threat intelligence',
      'Automated forensics',
      'Collaborative investigations'
    ],
    color: '#7C3AED'
  }
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-[#111827] to-[#0A0F1F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Built for{' '}
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Your Organization
            </span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Tailored solutions for universities, enterprises, and security professionals
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({ useCase, index }: { useCase: typeof useCases[0]; index: number }) {
  const Icon = useCase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all group"
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
        style={{ background: `radial-gradient(circle at top, ${useCase.color}30, transparent)` }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          style={{ backgroundColor: `${useCase.color}20` }}
        >
          <Icon size={32} style={{ color: useCase.color }} />
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
        <p className="text-[#6B7280] mb-6 leading-relaxed">{useCase.description}</p>

        {/* Benefits List */}
        <ul className="space-y-3">
          {useCase.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: useCase.color }}
              />
              <span className="text-sm text-[#6B7280]">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
