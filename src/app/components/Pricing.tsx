import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Lock, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: { monthly: 0, yearly: 0 },
    features: [
      'Basic dashboard',
      'Up to 1GB logs/month',
      'Real-time monitoring',
      '7-day log retention',
      'Email support'
    ],
    limitations: [
      'No AI Assistant',
      'No team access',
      'Limited alerts'
    ],
    cta: 'Get Started',
    popular: false,
    color: '#6B7280'
  },
  {
    name: 'Standard',
    description: 'For growing teams',
    price: { monthly: 99, yearly: 990 },
    features: [
      'Full dashboard',
      'Unlimited log ingestion',
      'Real-time alerts',
      '90-day log retention',
      'Team access (up to 10 users)',
      'Role-based permissions',
      'Priority email support',
      'API access'
    ],
    limitations: [],
    cta: 'Start Free Trial',
    popular: true,
    color: '#2D6BFF'
  },
  {
    name: 'Premium',
    description: 'For enterprise security teams',
    price: { monthly: 299, yearly: 2990 },
    features: [
      'Everything in Standard',
      'AI Security Assistant',
      'Automated incident reports',
      'Advanced analytics',
      'Unlimited log retention',
      'Unlimited team members',
      'Priority support (24/7)',
      'Custom integrations',
      'Dedicated account manager'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
    premium: true,
    color: '#7C3AED'
  }
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-[#111827] to-[#0A0F1F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBBF24]/20 rounded-full mb-6">
            <Sparkles size={16} className="text-[#FBBF24]" />
            <span className="text-sm font-medium text-[#FBBF24]">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
            Choose the plan that fits your security needs
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#2D6BFF] text-white'
                  : 'text-[#6B7280] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#2D6BFF] text-white'
                  : 'text-[#6B7280] hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-[#00C2A8]/20 text-[#00C2A8] px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
              index={index}
            />
          ))}
        </div>

        {/* Enterprise Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Need a Custom Solution?</h3>
            <p className="text-[#6B7280] mb-6">
              Get in touch for enterprise pricing with custom features and dedicated support.
            </p>
            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-semibold transition-all">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  billingCycle,
  index
}: {
  plan: typeof plans[0];
  billingCycle: 'monthly' | 'yearly';
  index: number;
}) {
  const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
  const displayPrice = billingCycle === 'yearly' ? price / 12 : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative bg-gradient-to-br from-[#111827] to-[#1a1f35] rounded-xl p-8 border transition-all ${
        plan.popular
          ? 'border-[#2D6BFF] shadow-lg shadow-[#2D6BFF]/20'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="px-4 py-1.5 bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] rounded-full text-xs font-semibold text-white">
            Most Popular
          </div>
        </div>
      )}

      {/* Premium Badge */}
      {plan.premium && (
        <div className="absolute -top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#7C3AED] to-[#2D6BFF] rounded-full text-xs font-semibold text-white">
            <Sparkles size={12} />
            Premium
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-[#6B7280] text-sm">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold text-white">
            ${Math.floor(displayPrice)}
          </span>
          <span className="text-[#6B7280]">/month</span>
        </div>
        {billingCycle === 'yearly' && price > 0 && (
          <p className="text-sm text-[#00C2A8] mt-2">
            ${price} billed annually
          </p>
        )}
      </div>

      {/* CTA Button */}
      <button
        className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 ${
          plan.popular
            ? 'bg-gradient-to-r from-[#2D6BFF] to-[#00C2A8] hover:from-[#1E5AFF] hover:to-[#00B399] text-white shadow-lg shadow-[#2D6BFF]/30'
            : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
        }`}
        onClick={() => document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {plan.cta}
      </button>

      {/* Features */}
      <div className="space-y-3 mb-4">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
              style={{ backgroundColor: `${plan.color}20` }}
            >
              <Check size={14} style={{ color: plan.color }} />
            </div>
            <span className="text-sm text-white">{feature}</span>
          </div>
        ))}
      </div>

      {/* Limitations */}
      {plan.limitations.length > 0 && (
        <div className="pt-4 border-t border-white/10 space-y-3">
          {plan.limitations.map((limitation) => (
            <div key={limitation} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/5 mt-0.5">
                <Lock size={12} className="text-[#6B7280]" />
              </div>
              <span className="text-sm text-[#6B7280] line-through">{limitation}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
