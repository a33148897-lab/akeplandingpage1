import { motion } from 'motion/react';
import { Sparkles, Lock, ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';

const aiFeatures = [
  {
    icon: Zap,
    title: 'Instant Incident Analysis',
    description: 'Get AI-powered summaries of security incidents in seconds'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Threat Detection',
    description: 'Identify threats before they become critical incidents'
  },
  {
    icon: Shield,
    title: 'Automated Response',
    description: 'Generate security playbooks and response plans automatically'
  }
];

const chatMessages = [
  {
    type: 'user',
    message: 'Show me all failed login attempts from the last 24 hours',
    time: '2:34 PM'
  },
  {
    type: 'ai',
    message: 'I found 147 failed login attempts in the last 24 hours. Here\'s the breakdown:\n\n• 89 from IP range 192.168.1.x (internal network)\n• 42 from external IPs (possible brute force)\n• 16 from known malicious sources\n\nWould you like me to generate a detailed report or block suspicious IPs?',
    time: '2:34 PM'
  },
  {
    type: 'user',
    message: 'Block the malicious sources and generate a report',
    time: '2:35 PM'
  }
];

export function PremiumAI() {
  return (
    <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-[#0A0F1F] to-[#111827] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#2D6BFF]/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7C3AED]/20 to-[#2D6BFF]/20 rounded-full mb-6 border border-[#7C3AED]/30">
            <Sparkles size={16} className="text-[#7C3AED]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] bg-clip-text text-transparent">
              Premium Feature
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Meet Your{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] bg-clip-text text-transparent">
              AI Security Assistant
            </span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Ask questions in natural language and get instant, actionable insights from your security logs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Chat Interface Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ChatInterface />
          </motion.div>

          {/* Right: Features & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#2D6BFF]/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-[#6B7280]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-4"
              >
                <button
                  className="group px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] hover:from-[#6C2DD5] hover:to-[#1E5AFF] text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-[#7C3AED]/30"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Upgrade to Premium
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-[#6B7280] mt-3">
                  Start with a 14-day free trial. No credit card required.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChatInterface() {
  return (
    <div className="relative">
      {/* Lock Overlay for Demo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute inset-0 bg-[#0A0F1F]/60 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#2D6BFF] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#7C3AED]/30">
            <Lock size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Premium Feature</h3>
          <p className="text-[#6B7280] mb-6">Unlock AI insights with Premium</p>
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] hover:from-[#6C2DD5] hover:to-[#1E5AFF] text-white rounded-lg font-semibold transition-all"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Pricing
          </button>
        </div>
      </motion.div>

      {/* Chat Window */}
      <div className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#2D6BFF] rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">AI Security Assistant</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00C2A8] rounded-full animate-pulse" />
                <span className="text-xs text-[#6B7280]">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {chatMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-[#2D6BFF] text-white'
                      : 'bg-white/5 text-white border border-white/10'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.message}</p>
                </div>
                <span className="text-xs text-[#6B7280] mt-1 block">{msg.time}</span>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="flex items-center gap-2"
          >
            <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-white/10 p-4 bg-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about your security logs..."
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#7C3AED] transition-all"
              disabled
            />
            <button
              className="px-4 py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] text-white rounded-lg font-medium transition-all disabled:opacity-50"
              disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
