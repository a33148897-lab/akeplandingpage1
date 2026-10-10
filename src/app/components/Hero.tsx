import { motion } from 'motion/react';
import { ChevronRight, Shield, Activity, AlertTriangle, CheckCircle, Eye, Database } from 'lucide-react';
import { useState } from 'react';
import { RequestAccessModal } from './RequestAccessModal';

export function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] via-[#1a1f35] to-[#0A0F1F]" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#2D6BFF 1px, transparent 1px), linear-gradient(90deg, #2D6BFF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2D6BFF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C2A8]/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Security Intelligence Built for{' '}
                  <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
                    Modern African Institutions
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-[#6B7280] mb-8 leading-relaxed"
              >
                Real-time log analysis, threat detection, and AI-powered insights — designed for universities, enterprises, and security teams across Africa and beyond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 mb-6"
              >
                <button
                  className="group px-8 py-4 bg-[#2D6BFF] hover:bg-[#1E5AFF] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2D6BFF]/30"
                  onClick={() => setShowModal(true)}
                >
                  Request Early Access
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold transition-all"
                  onClick={() => document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join Waitlist
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm text-[#6B7280]"
              >
                No credit card required. Limited early-access seats available.
              </motion.p>
            </div>

            {/* Right Column - Animated Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <DashboardPreview />
            </motion.div>
          </div>
        </div>
      </section>

      <RequestAccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-2xl p-6 border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium text-[#6B7280]">Security Dashboard</h3>
            <p className="text-2xl font-bold text-white mt-1">Live Threat Monitor</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00C2A8]/20 rounded-full">
            <div className="w-2 h-2 bg-[#00C2A8] rounded-full animate-pulse" />
            <span className="text-xs text-[#00C2A8] font-medium">Real-time</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={<Shield size={20} className="text-[#00C2A8]" />}
            label="Threats Blocked"
            value="1,247"
            trend="+12%"
            delay={0.5}
          />
          <StatCard
            icon={<Activity size={20} className="text-[#2D6BFF]" />}
            label="Active Logs"
            value="89.2K"
            trend="+5%"
            delay={0.6}
          />
          <StatCard
            icon={<Eye size={20} className="text-[#7C3AED]" />}
            label="Anomalies Detected"
            value="34"
            trend="-8%"
            delay={0.7}
          />
          <StatCard
            icon={<Database size={20} className="text-[#FBBF24]" />}
            label="Data Processed"
            value="2.4TB"
            trend="+18%"
            delay={0.8}
          />
        </div>

        {/* Recent Alerts */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[#6B7280]">Recent Alerts</h4>
          <AlertItem
            icon={<AlertTriangle size={16} className="text-[#FBBF24]" />}
            title="Suspicious Login Attempt"
            time="2 min ago"
            severity="medium"
            delay={0.9}
          />
          <AlertItem
            icon={<CheckCircle size={16} className="text-[#00C2A8]" />}
            title="Security Scan Completed"
            time="5 min ago"
            severity="success"
            delay={1.0}
          />
          <AlertItem
            icon={<AlertTriangle size={16} className="text-[#EF4444]" />}
            title="High Volume Traffic Detected"
            time="8 min ago"
            severity="high"
            delay={1.1}
          />
        </div>
      </motion.div>

      {/* Floating AI Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#7C3AED] to-[#2D6BFF] rounded-xl p-4 shadow-xl border border-white/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <p className="text-xs text-white/80">AI Assistant</p>
            <p className="text-sm font-semibold text-white">Ready to help</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, delay }: { icon: React.ReactNode; label: string; value: string; trend: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white/5 rounded-lg p-4 border border-white/5"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-[#6B7280]">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">{value}</p>
        <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-[#00C2A8]' : 'text-[#EF4444]'}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}

function AlertItem({ icon, title, time, severity, delay }: { icon: React.ReactNode; title: string; time: string; severity: string; delay: number }) {
  const severityColors = {
    high: 'border-[#EF4444]/30 bg-[#EF4444]/5',
    medium: 'border-[#FBBF24]/30 bg-[#FBBF24]/5',
    success: 'border-[#00C2A8]/30 bg-[#00C2A8]/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex items-center gap-3 p-3 rounded-lg border ${severityColors[severity as keyof typeof severityColors]}`}
    >
      {icon}
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-[#6B7280]">{time}</p>
      </div>
    </motion.div>
  );
}