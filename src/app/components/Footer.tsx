import { motion } from 'motion/react';
import { Mail, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { Logo } from './Logo';

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Pricing', href: '#pricing' }
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Security', href: '#security' },
    { name: 'Status', href: '#status' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' }
  ]
};

const socials = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' }
];

export function Footer() {
  return (
    <footer className="relative bg-[#0A0F1F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Logo variant="text" size="sm" />
            </motion.div>
            <p className="text-[#6B7280] text-sm mb-6">
              Security intelligence built for modern African institutions and beyond.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                  >
                    <Icon size={18} className="text-[#6B7280] group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[#6B7280] hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[#6B7280] hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-[#6B7280] hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-[#6B7280] text-sm mb-4">
              Get the latest updates on features, releases, and security insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#2D6BFF] transition-all"
              />
              <button className="px-6 py-2.5 bg-[#2D6BFF] hover:bg-[#1E5AFF] text-white rounded-lg font-medium transition-all text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6B7280] text-sm">
            © 2025 Afric-Analyzer. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#6B7280] hover:text-white transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-[#6B7280] hover:text-white transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-[#6B7280] hover:text-white transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}