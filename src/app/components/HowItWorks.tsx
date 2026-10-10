import { motion } from 'motion/react';
import { Upload, BarChart3, MessageSquare } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Connect Your Systems',
    description: 'Send logs via API or deploy the lightweight agent. No complex setup required.',
    color: '#2D6BFF'
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Analyze & Visualize',
    description: 'Your dashboard organizes logs, detects anomalies, and highlights risks in real time.',
    color: '#00C2A8'
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Investigate with AI',
    description: 'Use the AI Assistant to ask natural-language questions and generate actionable insights.',
    color: '#7C3AED'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0F1F] to-[#111827]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Three Simple Steps
            </span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            From log collection to AI-powered insights in minutes
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2D6BFF] via-[#00C2A8] to-[#7C3AED] opacity-20" style={{ transform: 'translateY(-50%)' }} />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Card */}
      <div className="relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all group">
        {/* Number Badge */}
        <motion.div
          className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-[#0A0F1F]"
          style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}80)` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {step.number}
        </motion.div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
          style={{ backgroundColor: `${step.color}20` }}
        >
          <Icon size={32} style={{ color: step.color }} />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
        <p className="text-[#6B7280] leading-relaxed">{step.description}</p>
      </div>

      {/* Arrow for desktop */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent" style={{ transform: 'translateY(-50%)' }}>
          <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-white/40" style={{ transform: 'translate(50%, -50%)' }} />
        </div>
      )}
    </motion.div>
  );
}
